// components/chat/TypingIndicator.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function TypingIndicator() {
  return (
    <div className="flex items-start gap-3">
      {/* Avatar - Bot Image */}
      <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-500 to-cyan-500 flex items-center justify-center shrink-0 overflow-hidden">
        <Image
          src="/images/nobody.webp"
          alt="AI Assistant"
          width={24}
          height={24}
          className="object-contain"
        />
      </div>

      {/* Typing bubble */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-neutral-100 dark:bg-neutral-800 rounded-2xl rounded-tl-sm px-4 py-3 max-w-xs"
      >
        <div className="flex items-center gap-1">
          <motion.div
            className="w-2 h-2 rounded-full bg-neutral-400 dark:bg-neutral-500"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: 0,
            }}
          />
          <motion.div
            className="w-2 h-2 rounded-full bg-neutral-400 dark:bg-neutral-500"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: 0.2,
            }}
          />
          <motion.div
            className="w-2 h-2 rounded-full bg-neutral-400 dark:bg-neutral-500"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: 0.4,
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}
