// components/chat/QuickQuestions.tsx
"use client";

import { motion } from "framer-motion";

type PageContext = "home" | "projects" | "certificates" | "experience";

interface QuickQuestionsProps {
  onQuestionClick: (question: string) => void;
  currentPage: PageContext;
}

const QUESTIONS: Record<PageContext, string[]> = {
  home: [
    "Tell me about yourself",
    "What's your latest project?",
    "What technologies do you use?",
    "Show me your work experience",
  ],
  projects: [
    "What's your most recent project?",
    "Show me your featured projects",
    "What type of projects have you built?",
    "Tell me about your tech stack",
  ],
  certificates: [
    "What's your latest certification?",
    "Show me your highlighted certifications",
    "What certifications do you have?",
    "Who issued your certifications?",
  ],
  experience: [
    "Tell me about your work experience",
    "What's your current role?",
    "What technologies have you used?",
    "Describe your responsibilities",
  ],
};

const QUESTION_LABELS: Record<PageContext, string[]> = {
  home: [
    "Who are you?",
    "Your latest work?",
    "What do you use?",
    "Where have you worked?",
  ],
  projects: [
    "What did you build?",
    "Show me your best work",
    "What can you make?",
    "Your tech stack?",
  ],
  certificates: [
    "Your latest cert?",
    "What are you certified in?",
    "Who certified you?",
    "Your achievements?",
  ],
  experience: [
    "Where did you work?",
    "What's your role now?",
    "What did you use?",
    "What did you do?",
  ],
};

export default function QuickQuestions({
  onQuestionClick,
  currentPage,
}: QuickQuestionsProps) {
  const questions = QUESTIONS[currentPage];
  const labels = QUESTION_LABELS[currentPage];

  return (
    <div className="grid grid-cols-2 gap-2 mt-4">
      {questions.map((question, index) => (
        <motion.button
          key={index}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onQuestionClick(question)}
          className="px-3 py-2 rounded-full text-xs font-medium
                     bg-neutral-100 dark:bg-neutral-800
                     text-neutral-700 dark:text-neutral-300
                     hover:bg-neutral-200 dark:hover:bg-neutral-700
                     transition-colors duration-200
                     text-center truncate"
        >
          {labels[index]}
        </motion.button>
      ))}
    </div>
  );
}
