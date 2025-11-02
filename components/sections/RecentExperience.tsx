// components\sections\RecentExperience.tsx
// components/sections/RecentExperience.tsx
"use client";

import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  MapPin,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Experience } from "@/lib/contentful/types";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

interface RecentExperienceProps {
  experience: Experience;
}

export default function RecentExperience({
  experience,
}: RecentExperienceProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const isMobile = useIsMobile();
  const [isExpanded, setIsExpanded] = useState(false);

  // Format date helper
  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "Present";
    const [year, month] = dateStr.split("-");
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  const getEmploymentTypeColor = (type: string) => {
    switch (type) {
      case "Full-time":
        return "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300";
      case "Internship":
        return "bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300";
      case "Part-time":
        return "bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300";
      case "Contract":
        return "bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300";
      case "Freelance":
        return "bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300";
      default:
        return "bg-gray-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300";
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
      className="space-y-6 relative"
    >
      {/* Decorative floating blob - background accent - desktop only */}
      {!isMobile && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 0.15, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute -top-20 -right-20 w-64 h-64 bg-linear-to-br from-blue-500 to-cyan-400 rounded-full blur-3xl pointer-events-none"
        />
      )}

      {/* Header with decorative bar */}
      <div className="flex items-center justify-between relative">
        <motion.h2
          initial={{ opacity: 0, x: isMobile ? -20 : -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: isMobile ? 0.5 : 0.6, delay: 0.1 }}
          className="text-3xl font-bold from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 bg-clip-text text-transparent bg-linear-to-r"
        >
          Work Experience
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, x: isMobile ? 20 : 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: isMobile ? 0.5 : 0.6, delay: 0.2 }}
        >
          <Link href="/experience">
            <Button variant="ghost" size="sm" className="group">
              View All
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Recent Experience Card */}
      <div className="relative">
        <motion.div
          initial={{
            opacity: 0,
            x: isMobile ? -15 : -40,
            y: isMobile ? 10 : 20,
          }}
          animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
          transition={{
            duration: isMobile ? 0.5 : 0.7,
            delay: 0.3,
            ease: "easeOut",
          }}
        >
          <Card className="p-6 md:p-8 group relative overflow-hidden" glass>
            {/* Decorative timeline marker */}
            <motion.div
              initial={{ height: 0 }}
              animate={inView ? { height: "100%" } : {}}
              transition={{
                duration: isMobile ? 0.8 : 1,
                delay: isMobile ? 0.4 : 0.5,
                ease: "easeOut",
              }}
              className="absolute left-0 top-0 w-1 bg-linear-to-b from-blue-500 via-cyan-400 to-transparent"
            />

            <div className="space-y-4 md:space-y-5 pl-4">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div className="space-y-2">
                  <h3 className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-neutral-50">
                    {experience.position}
                  </h3>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    {experience.website ? (
                      <a
                        href={experience.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base md:text-lg text-blue-600 dark:text-blue-400 hover:underline font-medium inline-flex items-center gap-1 w-fit"
                      >
                        {experience.company}
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    ) : (
                      <span className="text-base md:text-lg text-neutral-700 dark:text-neutral-200 font-medium">
                        {experience.company}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {experience.iscurrent && (
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
                      <div className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full animate-pulse" />
                      Current
                    </div>
                  )}
                  <div
                    className={`px-3 py-1.5 rounded-full text-sm font-medium ${getEmploymentTypeColor(
                      experience.employmentType
                    )}`}
                  >
                    {experience.employmentType}
                  </div>
                </div>
              </div>

              {/* Date & Location */}
              <div className="flex flex-wrap gap-3 md:gap-4 text-sm text-neutral-600 dark:text-neutral-300">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span className="font-medium">
                    {formatDate(experience.startDate)} -{" "}
                    {formatDate(experience.endDate)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span className="font-medium">{experience.location}</span>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 dark:border-neutral-700" />

              {/* Description */}
              <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {experience.description}
              </p>

              {/* Toggle Button (Now Always Visible) */}
              {experience.responsibilities &&
                experience.responsibilities.length > 0 && (
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {isExpanded ? (
                      <>
                        <ChevronUp className="w-4 h-4" />
                        Hide Details
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4" />
                        Show Details
                      </>
                    )}
                  </button>
                )}

              {/* Responsibilities - Collapsible Everywhere */}
              {experience.responsibilities &&
                experience.responsibilities.length > 0 && (
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden space-y-4"
                      >
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-200 uppercase tracking-wide">
                            Key Responsibilities
                          </h4>
                          <ul className="list-disc list-inside space-y-1 text-sm text-neutral-600 dark:text-neutral-300">
                            {experience.responsibilities.map((resp, i) => (
                              <li key={i}>{resp}</li>
                            ))}
                          </ul>
                        </div>

                        {/* Technologies */}
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-200 uppercase tracking-wide">
                            Technologies
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {experience.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="px-3 py-1.5 text-sm font-medium bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-lg hover:scale-105 transition-transform"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Tools */}
                        {experience.tools && experience.tools.length > 0 && (
                          <div className="space-y-2">
                            <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-200 uppercase tracking-wide">
                              Tools
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {experience.tools.map((tool) => (
                                <span
                                  key={tool}
                                  className="px-3 py-1.5 text-sm font-medium bg-gray-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-lg hover:scale-105 transition-transform"
                                >
                                  {tool}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}

              {/* Technologies - Show on Desktop when no responsibilities */}
              {(!experience.responsibilities ||
                experience.responsibilities.length === 0) &&
                !isMobile && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-200 uppercase tracking-wide">
                      Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 text-sm font-medium bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-lg hover:scale-105 transition-transform"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              {/* Tools - Show on Desktop when no responsibilities */}
              {(!experience.responsibilities ||
                experience.responsibilities.length === 0) &&
                !isMobile &&
                experience.tools &&
                experience.tools.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-200 uppercase tracking-wide">
                      Tools
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {experience.tools.map((tool) => (
                        <span
                          key={tool}
                          className="px-3 py-1.5 text-sm font-medium bg-gray-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-lg hover:scale-105 transition-transform"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
            </div>

            {/* Bottom right decorative accent - desktop only */}
            {!isMobile && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 0.5, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="absolute -bottom-10 -right-10 w-32 h-32 bg-linear-to-tl from-cyan-400 to-blue-500 rounded-full blur-2xl"
              />
            )}
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
