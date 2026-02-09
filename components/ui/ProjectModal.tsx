"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ExternalLink, Github, Calendar, User, Users } from "lucide-react";
import { Project } from "@/lib/contentful/types";
import { useEffect } from "react";

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
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
    }
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!project) return null;

  const hasDemo = !!project.demoUrl;
  const hasGithub = !!project.githubUrl;
  const hasAnyLink = hasDemo || hasGithub;

  const getProjectTypeBadge = (type: "Indie" | "Collab") => {
    const config = {
      Indie: {
        icon: User,
        bg: "bg-emerald-500 dark:bg-emerald-600",
        text: "text-white",
        label: "Indie",
      },
      Collab: {
        icon: Users,
        bg: "bg-violet-500 dark:bg-violet-600",
        text: "text-white",
        label: "Collab",
      },
    };
    const { icon: Icon, bg, text, label } = config[type];
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ${bg} ${text} text-xs md:text-sm font-semibold shadow-md`}
      >
        <Icon className="w-3.5 h-3.5" />
        {label}
      </span>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="min-h-full flex items-center justify-center p-4 sm:p-6 md:p-8">
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-4xl bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl overflow-hidden"
              >
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-neutral-800 transition-colors shadow-lg group"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5 text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors" />
                </button>

                {/* Content */}
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Left Side - Image */}
                  <div className="relative bg-neutral-100 dark:bg-neutral-950 flex items-center justify-center p-6 md:p-8 min-h-75 md:min-h-125">
                    <div className="relative w-full h-full flex items-center justify-center">
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={600}
                        height={600}
                        className="object-contain max-h-full w-auto"
                        priority
                      />
                    </div>
                  </div>

                  {/* Right Side - Content */}
                  <div className="flex flex-col p-6 md:p-8 md:pr-14 overflow-y-auto max-h-[70vh] md:max-h-150">
                    {/* Header */}
                    <div className="space-y-4 mb-6">
                      {/* Type Badge & Year */}
                      <div className="flex items-center gap-3 flex-wrap">
                        {getProjectTypeBadge(project.projectType)}
                        <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                          <Calendar className="w-4 h-4" />
                          <span className="font-medium">{project.year}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white leading-tight">
                        {project.title}
                      </h2>
                    </div>

                    {/* Description */}
                    <div className="mb-6 grow">
                      <p className="text-sm md:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed whitespace-pre-wrap">
                        {project.description}
                      </p>
                    </div>

                    {/* Tags */}
                    {project.tags && project.tags.length > 0 && (
                      <div className="mb-6">
                        <h3 className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-3">
                          Tags
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1.5 text-xs md:text-sm font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg border border-blue-100 dark:border-blue-800/50"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    {hasAnyLink && (
                      <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
                        <div className="flex flex-col sm:flex-row gap-3">
                          {/* Demo Link */}
                          {hasDemo && (
                            <a
                              href={project.demoUrl ?? undefined}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white rounded-lg font-semibold text-sm transition-all shadow-md hover:shadow-lg"
                            >
                              <ExternalLink className="w-4 h-4" />
                              Live Website
                            </a>
                          )}

                          {/* GitHub Link */}
                          {hasGithub && (
                            <a
                              href={project.githubUrl ?? undefined}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 ${
                                hasDemo
                                  ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                                  : "bg-neutral-900 dark:bg-neutral-800 text-white hover:bg-neutral-800 dark:hover:bg-neutral-700"
                              } rounded-lg font-semibold text-sm transition-all`}
                            >
                              <Github className="w-4 h-4" />
                              Source Code
                            </a>
                          )}
                        </div>
                      </div>
                    )}

                    {/* No Links Available */}
                    {!hasAnyLink && (
                      <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center italic">
                          Project details are private
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
