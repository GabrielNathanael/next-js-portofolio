// components\ui\ProjectModal.tsx
// components/ui/ProjectModal.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Github } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Project } from "@/lib/data/projects";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({
  project,
  isOpen,
  onClose,
}: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="max-w-2xl w-full max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-300 dark:scrollbar-thumb-neutral-700 scrollbar-track-transparent hover:scrollbar-thumb-neutral-400 dark:hover:scrollbar-thumb-neutral-600 scrollbar-thumb-rounded-full rounded-lg"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "rgb(212 212 212) transparent",
            }}
          >
            <Card className="p-6 space-y-4 rounded-lg">
              {/* Dynamic Image based on orientation */}
              <div
                className={`relative rounded-lg overflow-hidden mx-auto ${
                  project.orientation === "vertical"
                    ? "aspect-3/4 max-w-md"
                    : "aspect-video w-full"
                }`}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Title and Year */}
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-2xl font-bold flex-1">{project.title}</h3>
                <span className="text-lg font-medium text-neutral-500 dark:text-neutral-400">
                  {project.year}
                </span>
              </div>

              {/* Description */}
              <p className="text-neutral-600 dark:text-neutral-400">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex flex-col items-center gap-3 pt-4">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button
                    variant="primary"
                    className="w-full group py-3 text-base font-semibold bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Github className="w-5 h-5 mr-2" />
                    View on GitHub
                  </Button>
                </a>
                <button
                  onClick={onClose}
                  className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors duration-200 opacity-60 hover:opacity-100"
                >
                  Close
                </button>
              </div>
            </Card>
          </motion.div>

          <style jsx global>{`
            /* Custom scrollbar styles for webkit browsers */
            .scrollbar-thin::-webkit-scrollbar {
              width: 6px;
            }

            .scrollbar-thin::-webkit-scrollbar-track {
              background: transparent;
              border-radius: 100px;
            }

            .scrollbar-thin::-webkit-scrollbar-thumb {
              background: rgb(212 212 212);
              border-radius: 100px;
            }

            .dark .scrollbar-thin::-webkit-scrollbar-thumb {
              background: rgb(64 64 64);
            }

            .scrollbar-thin::-webkit-scrollbar-thumb:hover {
              background: rgb(163 163 163);
            }

            .dark .scrollbar-thin::-webkit-scrollbar-thumb:hover {
              background: rgb(82 82 82);
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
