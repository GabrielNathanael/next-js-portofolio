// components/chat/ChatWidget.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertCircle } from "lucide-react";
import Image from "next/image";
import { useChat } from "@/hooks/useChat";
import { useChatSession } from "@/hooks/useChatSession";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";
import QuickQuestions from "./QuickQuestions";
import { getRandomGreeting } from "@/lib/ai/prompts";
import { usePathname } from "next/navigation";

export default function ChatWidget() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [greeting] = useState(getRandomGreeting());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [isMounted, setIsMounted] = useState(false);

  const [timeLeft, setTimeLeft] = useState("");

  const { messages, isLoading, sendMessage, setMessages } = useChat();
  const {
    isReady,
    canSendMessage,
    incrementCount,
    getRemainingMessages,
    getTimeUntilReset,
  } = useChatSession();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen || getRemainingMessages() > 0) return;

    const updateTimer = () => {
      const minutes = getTimeUntilReset();
      if (minutes > 60) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        setTimeLeft(`${hours}h ${mins}m`);
      } else {
        setTimeLeft(`${minutes}m`);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [isOpen, getRemainingMessages, getTimeUntilReset]);

  // Auto-scroll to bottom when new message arrives
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Get current page context
  const getPageContext = ():
    | "home"
    | "projects"
    | "certificates"
    | "experience" => {
    if (pathname.includes("/projects")) return "projects";
    if (pathname.includes("/certificates")) return "certificates";
    if (pathname.includes("/experience")) return "experience";
    return "home";
  };

  const handleSend = async (message: string) => {
    const check = canSendMessage();

    if (!check.allowed) {
      if (check.reason === "rate_limit") {
        const resetDate = new Date(
          Date.now() + getTimeUntilReset() * 60 * 1000
        );
        const formattedDate = resetDate.toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });

        // Add system message (tidak consume token)
        const systemMessage = {
          id: `system-${Date.now()}`,
          role: "assistant" as const,
          content: `⚠️ **Chat limit reached!**\n\nYou've used all 15 messages for this session. Your limit will reset on **${formattedDate}**.\n\nFeel free to come back then, or reach out via email at gabrielnathanael81@gmail.com if you need immediate assistance!`,
          timestamp: Date.now(),
        };

        setMessages((prev) => [...prev, systemMessage]);
        return;
      } else if (check.reason === "cooldown") {
        return;
      }
      return;
    }

    await sendMessage(message);
    incrementCount();
  };

  // Handle quick question click
  const handleQuestionClick = (question: string) => {
    handleSend(question);
  };

  if (!isMounted || !isReady) return null;

  return (
    <div key={pathname}>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full 
                 bg-linear-to-r from-blue-500 to-cyan-500
                 hover:from-blue-600 hover:to-cyan-600
                 shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/60
                 flex items-center justify-center
                 transition-all duration-300
                 overflow-hidden"
        aria-label="Open chat"
      >
        <Image
          src="/images/nobody.webp"
          alt="AI Assistant"
          width={40}
          height={40}
          className="object-contain"
        />
      </motion.button>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed bottom-6 right-6 z-50 w-[90vw] sm:w-112.5 h-150 
                       bg-white dark:bg-neutral-900 
                       rounded-2xl shadow-2xl
                       flex flex-col overflow-hidden
                       border border-neutral-200 dark:border-neutral-800"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-linear-to-r from-blue-500 to-cyan-500">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center overflow-hidden">
                    <Image
                      src="/images/nobody.webp"
                      alt="AI Assistant"
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm">
                      Gabriel&apos;s Personal AI
                    </h3>
                    <p className="text-white/80 text-xs">
                      {getRemainingMessages() > 0 ? (
                        `${getRemainingMessages()} messages left`
                      ) : (
                        <span>Limit reset in {timeLeft}</span>
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center px-4">
                    <div className="w-32 h-32 mb-4 relative">
                      <Image
                        src="/images/hasbody.webp"
                        alt="AI Assistant"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <h4 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                      {greeting}
                    </h4>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
                      Ask me about Gabriel&apos;s projects, experience, or
                      skills!
                    </p>

                    {/* Quick Questions */}
                    <QuickQuestions
                      onQuestionClick={handleQuestionClick}
                      currentPage={getPageContext()}
                    />
                  </div>
                ) : (
                  <>
                    {messages.map((msg) => (
                      <ChatMessage key={msg.id} message={msg} />
                    ))}

                    {isLoading && <TypingIndicator />}
                    <div ref={messagesEndRef} />
                  </>
                )}
              </div>

              {/* Rate Limit Warning */}
              {getRemainingMessages() <= 3 && getRemainingMessages() > 0 && (
                <div className="px-5 py-2 bg-amber-50 dark:bg-amber-900/20 border-t border-amber-200 dark:border-amber-800">
                  <div className="flex items-center gap-2 text-xs text-amber-700 dark:text-amber-400">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>
                      {getRemainingMessages()} messages remaining. Resets in{" "}
                      {getTimeUntilReset()} min.
                    </span>
                  </div>
                </div>
              )}

              {/* Input Area */}
              <div className="px-5 py-4 border-t border-neutral-200 dark:border-neutral-800">
                <ChatInput
                  onSend={handleSend}
                  isLoading={isLoading}
                  disabled={getRemainingMessages() === 0}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
