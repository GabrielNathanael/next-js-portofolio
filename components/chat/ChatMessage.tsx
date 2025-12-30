// components/chat/ChatMessage.tsx
"use client";

import { motion } from "framer-motion";
import { User } from "lucide-react";
import { ChatMessage as ChatMessageType } from "@/types/chat";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import Link from "next/link";
import Image from "next/image";

interface ChatMessageProps {
  message: ChatMessageType;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* Avatar */}
      <div
        className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center overflow-hidden ${
          isUser
            ? "bg-blue-500 text-white"
            : "bg-linear-to-br from-blue-500 to-cyan-500"
        }`}
      >
        {isUser ? (
          <User className="w-4 h-4" />
        ) : (
          <Image
            src="/images/nobody.webp"
            alt="AI Assistant"
            width={24}
            height={24}
            className="object-contain"
          />
        )}
      </div>

      {/* Message Bubble */}
      <div
        className={`flex-1 max-w-[75%] ${isUser ? "text-right" : "text-left"}`}
      >
        <div
          className={`inline-block px-4 py-2.5 rounded-2xl ${
            isUser
              ? "bg-blue-500 text-white rounded-tr-sm"
              : "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 rounded-tl-sm"
          }`}
        >
          <div className="text-sm leading-relaxed prose prose-sm max-w-none dark:prose-invert">
            <ReactMarkdown
              rehypePlugins={[rehypeSanitize]}
              components={{
                // Custom link renderer
                a: ({ href, children, ...props }) => {
                  // Check if internal link (starts with /)
                  if (href?.startsWith("/")) {
                    return (
                      <Link
                        href={href}
                        className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                      >
                        {children}
                      </Link>
                    );
                  }
                  // External link
                  return (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                      {...props}
                    >
                      {children}
                    </a>
                  );
                },
                // Remove default paragraph margins for inline text
                p: ({ children }) => <span>{children}</span>,
                // Style bold text
                strong: ({ children }) => (
                  <strong className="font-semibold">{children}</strong>
                ),
                // Style lists
                ul: ({ children }) => (
                  <ul className="list-disc list-inside my-2 space-y-1">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside my-2 space-y-1">
                    {children}
                  </ol>
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        </div>

        {/* Timestamp */}
        <p className="text-xs text-neutral-400 dark:text-neutral-600 mt-1 px-2">
          {new Date(message.timestamp).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </motion.div>
  );
}
