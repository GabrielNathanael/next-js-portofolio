// lib/ai/context-builder.ts
import { Project, Certificate, Experience } from "@/lib/contentful/types";
import { techStack, TechItem } from "@/lib/data/techstack";

// About info (dari component About.tsx)
const aboutInfo = {
  name: "Gabriel Nathanael Purba",
  role: "Full Stack Developer",
  education:
    "Computer Science student at Universitas Pendidikan Ganesha (Undiksha), Bali",
  bio: [
    "I build clean, scalable web applications using technologies like Next.js, React, Laravel, and TypeScript, with a focus on maintainable code and solid system design.",
    "I work across the full stack, from crafting responsive user interfaces to developing backend logic, RESTful APIs, and database-driven features.",
    "Beyond application development, I explore DevOps and cloud fundamentals such as deployment workflows, containerization, and basic infrastructure concepts, while also learning about cybersecurity principles and secure application design.",
  ],
  socials: {
    github: "https://github.com/GabrielNathanael",
    instagram: "https://www.instagram.com/gabrielnathanaelp",
    linkedin: "https://www.linkedin.com/in/gabriel-nathanael-purba-549273376/",
    email: "gabrielnathanael81@gmail.com",
  },
};

/**
 * Check if a date has passed (for validating job end dates)
 */
function isDateInPast(dateString: string): boolean {
  try {
    const date = new Date(dateString);
    const now = new Date();

    // Set both to start of month for comparison
    date.setDate(1);
    date.setHours(0, 0, 0, 0);
    now.setDate(1);
    now.setHours(0, 0, 0, 0);

    return date < now;
  } catch {
    return false;
  }
}

/**
 * Validate if experience is truly current
 * Handles edge cases: missing endDate, past endDate with iscurrent:true
 */
function isTrulyCurrentJob(exp: Experience): boolean {
  // If explicitly marked as not current
  if (!exp.iscurrent) {
    return false;
  }

  // If marked current but has endDate in the past -> NOT CURRENT
  if (exp.endDate && isDateInPast(exp.endDate)) {
    return false;
  }

  // If marked current and (no endDate OR endDate is future) -> CURRENT
  return true;
}

/**
 * Summarize projects (hemat token)
 */
function summarizeProjects(projects: Project[]): string {
  return projects
    .map(
      (p) =>
        `• ${p.title} (${p.year}): ${p.description.slice(
          0,
          120
        )}... | Tech: ${p.tags.slice(0, 5).join(", ")} | Type: ${p.projectType}`
    )
    .join("\n");
}

/**
 * Summarize certificates
 */
function summarizeCertificates(certs: Certificate[]): string {
  return certs.map((c) => `• ${c.title} - ${c.issuer} (${c.year})`).join("\n");
}

/**
 * Summarize single experience WITH CLEAR STATUS
 */
function summarizeExperience(exp: Experience): string {
  const isCurrent = isTrulyCurrentJob(exp);

  const period = isCurrent
    ? `${exp.startDate} - Present`
    : `${exp.startDate} - ${exp.endDate || "Unknown"}`;

  // 🔥 Clear status markers
  const status = isCurrent
    ? "🟢 **CURRENTLY WORKING HERE**"
    : "⚫ **PAST POSITION (ENDED)**";

  return `${status}
${exp.position} at ${exp.company} (${period}, ${exp.employmentType})
Location: ${exp.location}
Tech: ${exp.technologies.slice(0, 8).join(", ")}
${exp.description.slice(0, 150)}...`;
}

/**
 * Summarize tech stack by category
 */
function summarizeTechStack(): string {
  const grouped = techStack.reduce(
    (acc: Record<string, string[]>, tech: TechItem) => {
      if (!acc[tech.category]) acc[tech.category] = [];
      acc[tech.category].push(tech.name);
      return acc;
    },
    {} as Record<string, string[]>
  );

  return Object.entries(grouped)
    .map(([cat, items]: [string, string[]]) => `${cat}: ${items.join(", ")}`)
    .join("\n");
}

/**
 * Page context types
 */
export type PageContext = "home" | "projects" | "certificates" | "experience";

/**
 * Data yang dibutuhkan untuk build context
 */
export interface ContextData {
  projects?: Project[];
  certificates?: Certificate[];
  experience?: Experience | null;
  allExperiences?: Experience[];
}

/**
 * Build context string berdasarkan page yang sedang dibuka
 * Context ini akan di-inject ke system prompt Gemini
 */
export function buildContext(page: PageContext, data: ContextData): string {
  // 🔥 Sort experiences by start date (newest first)
  const sortedExperiences = (data.allExperiences || []).sort((a, b) => {
    const dateA = new Date(a.startDate);
    const dateB = new Date(b.startDate);
    return dateB.getTime() - dateA.getTime();
  });

  // 🔥 Get ALL truly current jobs (handles multiple concurrent positions)
  const currentJobs = sortedExperiences.filter(isTrulyCurrentJob);

  // 🔥 Build employment status message
  let employmentStatus: string;

  if (currentJobs.length === 0) {
    // No current jobs
    const lastJob = sortedExperiences[0];
    if (lastJob) {
      employmentStatus = `Not currently employed. Last position was ${
        lastJob.position
      } at ${lastJob.company}, which ended in ${
        lastJob.endDate || "recent past"
      }. Actively seeking new opportunities!`;
    } else {
      employmentStatus =
        "Not currently employed. Actively seeking opportunities to contribute and grow!";
    }
  } else if (currentJobs.length === 1) {
    // Single current job
    const job = currentJobs[0];
    employmentStatus = `Currently working as ${job.position} at ${job.company} (started ${job.startDate})`;
  } else {
    // Multiple current jobs
    const jobsList = currentJobs
      .map((j) => `${j.position} at ${j.company}`)
      .join(" and ");
    employmentStatus = `Currently working multiple positions: ${jobsList}`;
  }

  let context = `You are Gabriel's portfolio assistant. Answer questions naturally and casually.

# About Gabriel
${aboutInfo.bio.join(" ")}

Education: ${aboutInfo.education}
Contact: ${aboutInfo.socials.email}

# 🎯 CURRENT EMPLOYMENT STATUS (AS OF JANUARY 2026)
${employmentStatus}

IMPORTANT: When answering questions about current employment:
- Read the "CURRENT EMPLOYMENT STATUS" section above carefully
- If it says "Not currently employed" → Gabriel is NOT working right now
- If it says "Currently working as" → Gabriel IS working at that position
- NEVER assume someone is still working if their status says "Not currently employed"
- Be honest and direct about employment status
`;

  switch (page) {
    case "home":
      context += `
# All Projects
${data.projects ? summarizeProjects(data.projects) : "No projects available"}

# All Certificates
${
  data.certificates
    ? summarizeCertificates(data.certificates)
    : "No certificates available"
}

# All Work Experiences (Sorted by Most Recent)
${
  sortedExperiences.length > 0
    ? sortedExperiences.map(summarizeExperience).join("\n\n")
    : "No work experience yet. Fresh graduate actively seeking opportunities!"
}

# Tech Stack
${summarizeTechStack()}

You have access to the complete portfolio data. Feel free to discuss any project, certificate, or experience.
`;
      break;

    case "projects":
      context += `
# Current Page: Projects Page
You are currently on the Projects page where visitors can see Gabriel's work.

# All Projects
${data.projects ? summarizeProjects(data.projects) : "No projects available"}

# Tech Stack
${summarizeTechStack()}

Focus on project details, technologies used, and technical implementation.

IMPORTANT - Redirect Rules:
- If asked about certificates or certifications: ALWAYS respond with "I'd love to tell you about my certifications! Check them out at [/certificates](/certificates)"
- If asked about work experience or job history: ALWAYS respond with "You can view my work experience at [/experiences](/experiences)"
- NEVER say you don't have information - ALWAYS provide the redirect link
`;
      break;

    case "certificates":
      context += `
# Current Page: Certificates Page
You are currently on the Certificates page where visitors can see Gabriel's certifications.

# All Certificates
${
  data.certificates
    ? summarizeCertificates(data.certificates)
    : "No certificates available"
}

Focus on certifications, learning achievements, and professional development.

IMPORTANT - Redirect Rules:
- If asked about projects, portfolio work, or "what you built": ALWAYS respond with "I'd love to show you my projects! Check them out at [/projects](/projects)"
- If asked about work experience or job history: ALWAYS respond with "You can view my work experience at [/experiences](/experiences)"
- NEVER say you don't have information - ALWAYS provide the redirect link
`;
      break;

    case "experience":
      context += `
# Current Page: Experience Page
You are currently on the Experience page where visitors can see Gabriel's work history.

# All Work Experiences (Sorted by Most Recent)
${
  sortedExperiences.length > 0
    ? sortedExperiences.map(summarizeExperience).join("\n\n")
    : "No work experience yet. Fresh graduate actively seeking opportunities!"
}

# Tech Stack
${summarizeTechStack()}

Focus on work history, responsibilities, and professional achievements.

IMPORTANT - Redirect Rules:
- If asked about projects or portfolio work: ALWAYS respond with "I'd love to show you my projects! Check them out at [/projects](/projects)"
- If asked about certificates or certifications: ALWAYS respond with "Check out my certifications at [/certificates](/certificates)"
- NEVER say you don't have information - ALWAYS provide the redirect link
`;
      break;
  }

  context += `

# 🚨 CRITICAL RULES FOR EMPLOYMENT QUESTIONS

When user asks "Are you currently working?", "Do you have a job?", "What's your current position?":

1. **CHECK THE STATUS SECTION FIRST**
   - Look at "CURRENT EMPLOYMENT STATUS" at the top of this context
   
2. **IF STATUS SAYS "Not currently employed":**
   - Answer: "No, I'm not currently employed. My internship at Interlace Studies Bali ended in December 2025. I'm now actively seeking new opportunities to contribute my skills!"
   - DO NOT say "Yes, I'm working" or assume any position
   
3. **IF STATUS SAYS "Currently working as":**
   - Answer with the current position details
   - Example: "Yes! I'm currently working as [position] at [company]"
   
4. **IMPORTANT:**
   - 🟢 Positions marked with 🟢 = Currently working there
   - ⚫ Positions marked with ⚫ = Past positions (ended)
   - NEVER confuse past positions as current positions
   - If endDate has passed (e.g., December 2025 when now is January 2026) → job is ENDED

# Guidelines
- Be casual and friendly, like chatting with a colleague
- Keep answers concise (2-3 sentences max unless asked for details)
- If asked about things not in the data, politely say you don't have that info
- Don't make up information
- Use "I" when speaking as Gabriel (first person perspective)
- If someone asks about contacting Gabriel, provide the email: ${aboutInfo.socials.email}
- When redirecting to other pages, ALWAYS use the exact format: [page name](/path)
- Be honest about employment status - there's no shame in being between jobs!
`;

  return context;
}
