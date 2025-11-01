"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Github, ExternalLink, User, Users, ChevronDown } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Card from "@/components/ui/Card";
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

  const getProjectTypeBadge = (type: "Indie" | "Collab") => {
    const config = {
      Indie: {
        icon: User,
        bgColor: "bg-emerald-500",
        textColor: "text-white",
      },
      Collab: {
        icon: Users,
        bgColor: "bg-violet-500",
        textColor: "text-white",
      },
    };
    const { icon: Icon, bgColor, textColor } = config[type];
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${bgColor} ${textColor} text-sm font-semibold shadow-md`}
      >
        <Icon className="w-4 h-4" />
        {type}
      </span>
    );
  };

  const hasDemo = !!project.demoUrl;
  const hasGithub = !!project.githubUrl;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="max-w-2xl w-full max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-300 dark:scrollbar-thumb-neutral-700 scrollbar-track-transparent rounded-lg"
          >
            <Card className="p-6 space-y-5 rounded-lg dark:bg-neutral-900 dark:border dark:border-neutral-800">
              {/* Image */}
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
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, 672px"
                  className="object-contain bg-white dark:bg-neutral-950"
                />
              </div>

              {/* Header – Desktop */}
              <div className="hidden sm:flex items-start justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3 flex-1">
                  <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                    {project.title}
                  </h3>
                  {getProjectTypeBadge(project.projectType)}
                </div>
                <span className="text-lg font-medium text-neutral-600 dark:text-neutral-400 shrink-0">
                  {project.year}
                </span>
              </div>

              {/* Header – Mobile */}
              <div className="flex sm:hidden flex-col space-y-3">
                <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                  {project.title}
                </h3>
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  {getProjectTypeBadge(project.projectType)}
                  <span className="text-base font-medium text-neutral-600 dark:text-neutral-400">
                    {project.year}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-justify">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex flex-col items-center gap-3 pt-4">
                {/* Case 1: Both links → Dropdown */}
                {hasDemo && hasGithub && (
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                      <button className="w-full group py-3 px-6 text-base font-semibold bg-linear-to-r from-blue-600 to-violet-500 hover:from-blue-700 hover:to-violet-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2">
                        View Project
                        <ChevronDown className="w-5 h-5 group-data-[state=open]:rotate-180 transition-transform duration-200" />
                      </button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Portal>
                      <DropdownMenu.Content
                        className="min-w-60 bg-white dark:bg-neutral-800 rounded-lg shadow-2xl border border-neutral-200 dark:border-neutral-700 p-2 z-50 animate-in fade-in-0 zoom-in-95"
                        sideOffset={8}
                        align="center"
                      >
                        <DropdownMenu.Item asChild>
                          <a
                            href={project.demoUrl!}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md cursor-pointer transition-colors"
                          >
                            <ExternalLink className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            <div className="flex flex-col">
                              <span className="font-semibold">Live Demo</span>
                              <span className="text-xs text-neutral-500 dark:text-neutral-400">
                                View live project
                              </span>
                            </div>
                          </a>
                        </DropdownMenu.Item>

                        <DropdownMenu.Item asChild>
                          <a
                            href={project.githubUrl!}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-700 rounded-md cursor-pointer transition-colors"
                          >
                            <Github className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
                            <div className="flex flex-col">
                              <span className="font-semibold">
                                GitHub Repository
                              </span>
                              <span className="text-xs text-neutral-500 dark:text-neutral-400">
                                View source code
                              </span>
                            </div>
                          </a>
                        </DropdownMenu.Item>
                      </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                  </DropdownMenu.Root>
                )}

                {/* Case 2: Only Demo */}
                {!hasGithub && hasDemo && (
                  <a
                    href={project.demoUrl!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-6 text-base font-semibold bg-linear-to-r from-blue-600 to-violet-500 hover:from-blue-700 hover:to-violet-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="w-5 h-5" />
                    Live Demo
                  </a>
                )}

                {/* Case 3: Only GitHub */}
                {!hasDemo && hasGithub && (
                  <a
                    href={project.githubUrl!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-6 text-base font-semibold bg-neutral-800 hover:bg-neutral-900 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Github className="w-5 h-5" />
                    GitHub Repository
                  </a>
                )}

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors duration-200 opacity-70 hover:opacity-100"
                >
                  Close
                </button>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
