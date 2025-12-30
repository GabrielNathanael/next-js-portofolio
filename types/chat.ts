// types/chat.ts

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

export interface ChatRequest {
  message: string;
  page: "home" | "projects" | "certificates" | "experience";
  history?: ChatMessage[];
}

export interface ChatResponse {
  response: string;
  page: string;
}

export interface ChatSession {
  count: number;
  resetAt: number;
  lastMessageAt: number;
}
