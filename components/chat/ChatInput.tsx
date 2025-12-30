// components/chat/ChatInput.tsx
"use client";

import { useState, KeyboardEvent, useRef, useEffect } from "react";
import { Send, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
  disabled?: boolean;
}

export default function ChatInput({
  onSend,
  isLoading,
  disabled = false,
}: ChatInputProps) {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input when component mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSend = () => {
    if (input.trim() && !isLoading && !disabled) {
      onSend(input);
      setInput("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex gap-2 items-center">
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask me anything..."
        disabled={isLoading || disabled}
        className="flex-1 px-4 py-2.5 rounded-full bg-neutral-100 dark:bg-neutral-800 
                 text-neutral-900 dark:text-neutral-100 text-sm
                 placeholder:text-neutral-500 dark:placeholder:text-neutral-500
                 focus:outline-none focus:ring-2 focus:ring-blue-500/50
                 disabled:opacity-50 disabled:cursor-not-allowed
                 transition-all"
      />

      <motion.button
        whileHover={{ scale: disabled || isLoading ? 1 : 1.05 }}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.95 }}
        onClick={handleSend}
        disabled={isLoading || disabled || !input.trim()}
        className="shrink-0 w-10 h-10 rounded-full 
                 bg-linear-to-r from-blue-500 to-cyan-500
                 hover:from-blue-600 hover:to-cyan-600
                 disabled:opacity-50 disabled:cursor-not-allowed
                 flex items-center justify-center
                 transition-all shadow-lg shadow-blue-500/30"
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 text-white animate-spin" />
        ) : (
          <Send className="w-4 h-4 text-white" />
        )}
      </motion.button>
    </div>
  );
}
