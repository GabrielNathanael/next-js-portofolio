// hooks/useChatSession.ts
"use client";

import { useState } from "react";
import { ChatSession } from "@/types/chat";

const SESSION_KEY = "chatbot_session";
const MAX_MESSAGES_PER_SESSION = 15;
const SESSION_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds
const MESSAGE_COOLDOWN = 3000; // 3 seconds

/**
 * Hook untuk manage chat session dengan localStorage
 * - Rate limiting: max 15 messages per hour
 * - Cooldown: 3 seconds between messages
 */
export function useChatSession() {
  // Lazy initialization - runs only once on mount
  const [session, setSession] = useState<ChatSession>(() => {
    if (typeof window === "undefined")
      return {
        count: 0,
        resetAt: Date.now() + SESSION_DURATION,
        lastMessageAt: 0,
      };

    const stored = localStorage.getItem(SESSION_KEY);
    const now = Date.now();

    if (stored) {
      try {
        const parsed: ChatSession = JSON.parse(stored);

        // Check if session expired
        if (now > parsed.resetAt) {
          // Reset session
          const newSession: ChatSession = {
            count: 0,
            resetAt: now + SESSION_DURATION,
            lastMessageAt: 0,
          };
          localStorage.setItem(SESSION_KEY, JSON.stringify(newSession));
          return newSession;
        }
        return parsed;
      } catch (error) {
        console.error("Failed to parse chat session:", error);
        // Create new session if parsing fails
        const newSession: ChatSession = {
          count: 0,
          resetAt: now + SESSION_DURATION,
          lastMessageAt: 0,
        };
        localStorage.setItem(SESSION_KEY, JSON.stringify(newSession));
        return newSession;
      }
    }

    // Create new session
    const newSession: ChatSession = {
      count: 0,
      resetAt: now + SESSION_DURATION,
      lastMessageAt: 0,
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(newSession));
    return newSession;
  });

  const [isReady] = useState(() => true);

  /**
   * Check if user can send message
   */
  const canSendMessage = (): {
    allowed: boolean;
    reason?: "rate_limit" | "cooldown";
  } => {
    const now = Date.now();

    // Check rate limit
    if (session.count >= MAX_MESSAGES_PER_SESSION) {
      return { allowed: false, reason: "rate_limit" };
    }

    // Check cooldown
    if (now - session.lastMessageAt < MESSAGE_COOLDOWN) {
      return { allowed: false, reason: "cooldown" };
    }

    return { allowed: true };
  };

  /**
   * Increment message count
   */
  const incrementCount = () => {
    const now = Date.now();
    const updated: ChatSession = {
      ...session,
      count: session.count + 1,
      lastMessageAt: now,
    };

    localStorage.setItem(SESSION_KEY, JSON.stringify(updated));
    setSession(updated);
  };

  /**
   * Get remaining messages
   */
  const getRemainingMessages = (): number => {
    return Math.max(0, MAX_MESSAGES_PER_SESSION - session.count);
  };

  /**
   * Get time until reset (in minutes)
   */
  const getTimeUntilReset = (): number => {
    const now = Date.now();
    const diff = session.resetAt - now;
    return Math.max(0, Math.ceil(diff / 60000)); // Convert to minutes
  };

  return {
    isReady,
    canSendMessage,
    incrementCount,
    getRemainingMessages,
    getTimeUntilReset,
  };
}
