// hooks/useChat.ts
"use client";

import { useState, useCallback } from "react";
import { ChatMessage, ChatRequest, ChatResponse } from "@/types/chat";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { ERROR_MESSAGES } from "@/lib/ai/prompts";

/**
 * Hook untuk handle chat logic & API calls
 */
export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  /**
   * Get current page context
   */
  const getPageContext = useCallback(():
    | "home"
    | "projects"
    | "certificates"
    | "experience" => {
    if (pathname.includes("/projects")) return "projects";
    if (pathname.includes("/certificates")) return "certificates";
    if (pathname.includes("/experience")) return "experience";
    return "home";
  }, [pathname]);

  /**
   * Send message to API
   */
  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim()) {
        toast.error(ERROR_MESSAGES.EMPTY_MESSAGE);
        return;
      }

      // Add user message
      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        role: "user",
        content: content.trim(),
        timestamp: Date.now(),
      };

      // 🔥 FIX: Get current messages BEFORE updating state
      const currentMessages = [...messages];

      // Update UI with user message
      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      try {
        const page = getPageContext();

        // 🔥 FIX: Use current messages + new user message for history
        // Only send last 10 messages to save tokens
        const recentHistory = [...currentMessages, userMessage].slice(-10);

        const requestBody: ChatRequest = {
          message: content.trim(),
          page,
          history: recentHistory,
        };

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          const errorData = await response.json();

          // Handle specific errors
          if (response.status === 429) {
            toast.error(ERROR_MESSAGES.RATE_LIMIT);
          } else {
            toast.error(errorData.error || ERROR_MESSAGES.API_ERROR);
          }

          setIsLoading(false);
          return;
        }

        const data: ChatResponse = await response.json();

        // Add assistant message
        const assistantMessage: ChatMessage = {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: data.response,
          timestamp: Date.now(),
        };

        setMessages((prev) => [...prev, assistantMessage]);
      } catch (error) {
        console.error("Chat error:", error);
        toast.error(ERROR_MESSAGES.GENERIC);
      } finally {
        setIsLoading(false);
      }
    },
    [messages, getPageContext]
  );

  /**
   * Clear all messages
   */
  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    isLoading,
    sendMessage,
    clearMessages,
    setMessages,
  };
}
