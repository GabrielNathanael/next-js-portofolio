"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useLoading } from "@/components/providers/LoadingProvider";

export default function LoadingScreen() {
  const { isLoading, setIsLoading } = useLoading();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const PROGRESS_DURATION = 900;
    const LOADING_DURATION = 1000;
    const STEP = 100;
    const INTERVAL = PROGRESS_DURATION / STEP;

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prev + 1;
      });
    }, INTERVAL);

    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, LOADING_DURATION);

    return () => {
      clearInterval(progressTimer);
      clearTimeout(loadingTimer);
    };
  }, [setIsLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-neutral-950"
        >
          <div className="relative w-full px-6 flex flex-col items-center">
            {/* NAME */}
            <motion.h1
              layoutId="gabriel-name"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 18,
              }}
              className="text-4xl md:text-6xl font-bold bg-linear-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 bg-clip-text text-transparent mb-8 whitespace-nowrap"
            >
              Gabriel Nathanael
            </motion.h1>

            {/* PROGRESS */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="w-full max-w-sm"
            >
              <div className="relative h-px w-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "linear" }}
                  className="absolute left-0 top-0 h-px bg-linear-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300"
                />
              </div>

              <div className="mt-4 flex justify-between text-[10px] tracking-[0.3em] font-mono uppercase text-neutral-400">
                <span>Initializing</span>
                <span>{progress}%</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
