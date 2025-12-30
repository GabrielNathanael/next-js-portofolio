import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  buildContext,
  PageContext,
  ContextData,
} from "@/lib/ai/context-builder";
import { BASE_SYSTEM_PROMPT } from "@/lib/ai/prompts";
import {
  getProjects,
  getCertificates,
  getExperiences,
} from "@/lib/contentful/api";
import { withFallback, hasAvailableKeys } from "@/lib/ai/api-keys";
import { ChatMessage } from "@/types/chat";
import { rateLimit } from "@/lib/rate-limit";
/* ================================
   RUNTIME
================================ */
export const runtime = "nodejs";

/* ================================
   LIMITS & CONSTANTS
================================ */
const MAX_BODY_SIZE = 1_000_000; // 1MB hard limit
const MAX_MESSAGE_LENGTH = 500;
const MAX_HISTORY_LENGTH = 10;

const VALID_PAGES = ["home", "projects", "certificates", "experience"] as const;

/* ================================
   SECURITY: PROMPT INJECTION GUARDS
================================ */
const SUSPICIOUS_PATTERNS = [
  /ignore\s+(all\s+)?previous\s+instructions?/i,
  /you\s+are\s+now/i,
  /pretend\s+(you|to\s+be)/i,
  /system\s+prompt/i,
  /new\s+instructions?/i,
  /admin\s+mode/i,
  /developer\s+mode/i,
  /jailbreak/i,
  /DAN\s+mode/i,
];

/* ================================
   VALIDATION
================================ */
function validateInput(
  message: string,
  page: string,
  history: ChatMessage[]
): { valid: boolean; error?: string } {
  if (!message || typeof message !== "string") {
    return { valid: false, error: "Message is required" };
  }

  const trimmed = message.trim();
  if (trimmed.length === 0) {
    return { valid: false, error: "Message cannot be empty" };
  }

  if (trimmed.length > MAX_MESSAGE_LENGTH) {
    return {
      valid: false,
      error: `Message too long (max ${MAX_MESSAGE_LENGTH} characters)`,
    };
  }

  for (const pattern of SUSPICIOUS_PATTERNS) {
    if (pattern.test(trimmed)) {
      console.warn("⚠️ Suspicious input detected");
      return {
        valid: false,
        error: "Your message contains suspicious content",
      };
    }
  }

  if (!VALID_PAGES.includes(page as PageContext)) {
    return { valid: false, error: "Invalid page context" };
  }

  if (!Array.isArray(history)) {
    return { valid: false, error: "History must be an array" };
  }

  for (const msg of history) {
    if (
      !msg ||
      typeof msg !== "object" ||
      !msg.role ||
      !msg.content ||
      !msg.timestamp
    ) {
      return { valid: false, error: "Invalid history format" };
    }

    if (!["user", "assistant"].includes(msg.role)) {
      return { valid: false, error: "Invalid history role" };
    }
  }

  return { valid: true };
}
function getClientIp(req: NextRequest) {
  const forwardedFor = req.headers.get("x-forwarded-for");
  return forwardedFor?.split(",")[0]?.trim() ?? "unknown";
}
/* ================================
   POST /api/chat
================================ */
export async function POST(req: NextRequest) {
  try {
    /* ===== RATE LIMIT (REDIS) ===== */
    const ip = getClientIp(req);
    const limit = await rateLimit(ip);

    if (!limit.allowed) {
      return NextResponse.json(
        {
          error: "Rate limit exceeded",
          resetIn: limit.resetInSeconds,
        },
        {
          status: 429,
          headers: {
            "Retry-After": limit.resetInSeconds.toString(),
          },
        }
      );
    }

    /* ===== BODY SIZE GUARD ===== */
    const contentLength = req.headers.get("content-length");
    if (contentLength && Number(contentLength) > MAX_BODY_SIZE) {
      return NextResponse.json({ error: "Payload too large" }, { status: 413 });
    }

    /* lanjut logic AI lo seperti biasa */

    /* -------- PARSE BODY -------- */
    const body = await req.json();
    const {
      message,
      page,
      history = [],
    } = body as {
      message: string;
      page: PageContext;
      history?: ChatMessage[];
    };

    /* -------- VALIDATION -------- */
    const validation = validateInput(message, page, history);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const sanitizedMessage = message.trim();

    /* -------- API KEY CHECK -------- */
    if (!hasAvailableKeys()) {
      console.error("❌ No API keys available");
      return NextResponse.json(
        { error: "Service temporarily unavailable" },
        { status: 503 }
      );
    }

    /* -------- FETCH CONTEXT DATA -------- */
    let contextData: ContextData = {};

    switch (page) {
      case "home": {
        const [projects, certificates, experiences] = await Promise.all([
          getProjects(),
          getCertificates(),
          getExperiences(),
        ]);

        contextData = {
          projects,
          certificates,
          allExperiences: experiences,
        };
        break;
      }

      case "projects":
        contextData.projects = await getProjects();
        break;

      case "certificates":
        contextData.certificates = await getCertificates();
        break;

      case "experience":
        contextData.allExperiences = await getExperiences();
        break;
    }

    /* -------- BUILD PROMPT -------- */
    const contextString = buildContext(page, contextData);
    const systemPrompt = `${BASE_SYSTEM_PROMPT}\n\n${contextString}`;

    const truncatedHistory = history.slice(-MAX_HISTORY_LENGTH);

    const geminiHistory = truncatedHistory.map((msg) => ({
      role: msg.role === "user" ? "user" : ("model" as const),
      parts: [{ text: msg.content }],
    }));

    /* -------- GEMINI CALL WITH FALLBACK -------- */
    const responseText = await withFallback(async (apiKey) => {
      const genAI = new GoogleGenerativeAI(apiKey);

      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
        generationConfig: {
          temperature: 0.7,
          topP: 0.95,
          topK: 40,
          maxOutputTokens: 500,
        },
      });

      const chat = model.startChat({
        history: [
          {
            role: "user",
            parts: [{ text: systemPrompt }],
          },
          {
            role: "model",
            parts: [
              {
                text: "Understood! I'm ready to help visitors learn about Gabriel's portfolio.",
              },
            ],
          },
          ...geminiHistory,
        ],
      });

      const result = await chat.sendMessage(sanitizedMessage);
      return result.response.text();
    });

    return NextResponse.json({
      response: responseText,
      page,
    });
  } catch (error) {
    console.error("❌ Chat API Error:", error);

    if (error instanceof Error) {
      if (error.message.includes("All API keys exhausted")) {
        return NextResponse.json(
          { error: "Service temporarily unavailable" },
          { status: 503 }
        );
      }

      if (
        error.message.includes("quota") ||
        error.message.includes("rate limit")
      ) {
        return NextResponse.json(
          { error: "Service busy. Please try again shortly." },
          { status: 429 }
        );
      }
    }

    return NextResponse.json(
      { error: "Unable to process request" },
      { status: 500 }
    );
  }
}

/* ================================
   GET /api/chat (Health Check)
================================ */
export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "Chat API is running",
    timestamp: new Date().toISOString(),
  });
}
