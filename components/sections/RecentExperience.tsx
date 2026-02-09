// components/sections/RecentExperience.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  MapPin,
  ExternalLink,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Briefcase,
} from "lucide-react";
import { Experience } from "@/lib/contentful/types";
import { useIsMobile } from "@/hooks/useIsMobile";

interface RecentExperienceProps {
  experiences: Experience[];
}

export default function RecentExperience({
  experiences,
}: RecentExperienceProps) {
  const isMobile = useIsMobile();
  const [expandedId, setExpandedId] = useState<string | null>(null);

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
        return "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800";
      case "Internship":
        return "bg-violet-50 dark:bg-violet-950/30 text-violet-700 dark:text-violet-400 border-violet-200 dark:border-violet-800";
      case "Part-time":
        return "bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800";
      case "Contract":
        return "bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800";
      case "Freelance":
        return "bg-cyan-50 dark:bg-cyan-950/30 text-cyan-700 dark:text-cyan-400 border-cyan-200 dark:border-cyan-800";
      default:
        return "bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700";
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="space-y-12"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="space-y-2"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 bg-clip-text text-transparent">
            Recent Experiences
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <Link
            href="/experiences"
            className="group inline-flex items-center gap-2 px-4 py-2 text-sm md:text-base font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            View All
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>

      {/* Experience Timeline */}
      <div className="relative">
        {/* Desktop Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-blue-400/30 to-transparent dark:from-blue-400/50 dark:via-blue-500/30 hidden md:block" />

        {/* Experience Cards */}
        <div className="space-y-8 md:space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative group"
            >
              {/* Timeline Dot (Desktop) */}
              <div className="absolute left-8 top-8 w-4 h-4 -translate-x-1/2 hidden md:block z-10">
                <motion.div
                  className={`w-full h-full rounded-full border-4 ${
                    exp.iscurrent
                      ? "bg-blue-600 dark:bg-blue-400 border-white dark:border-neutral-950"
                      : "bg-white dark:bg-neutral-950 border-blue-500/50 dark:border-blue-400/50"
                  }`}
                  animate={exp.iscurrent ? { scale: [1, 1.2, 1] } : {}}
                  transition={
                    exp.iscurrent ? { duration: 2, repeat: Infinity } : {}
                  }
                />
                {exp.iscurrent && (
                  <motion.span
                    animate={{
                      scale: [1, 2],
                      opacity: [0.5, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                    className="absolute inset-0 rounded-full bg-blue-600 dark:bg-blue-400"
                  />
                )}
              </div>

              {/* Card */}
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="md:ml-20 bg-white dark:bg-neutral-900/50 backdrop-blur-sm border border-neutral-200 dark:border-neutral-800 rounded-xl md:rounded-2xl overflow-hidden hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-lg hover:shadow-neutral-200/50 dark:hover:shadow-neutral-900/50 transition-all duration-300"
              >
                {/* Card Header */}
                <div className="p-6 md:p-8 space-y-4">
                  {/* Title & Badges Row */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="space-y-3 flex-1">
                      {/* Position */}
                      <h3 className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white leading-tight">
                        {exp.position}
                      </h3>

                      {/* Company */}
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-neutral-500 dark:text-neutral-400 shrink-0" />
                        {exp.website ? (
                          <a
                            href={exp.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-base md:text-lg font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                          >
                            {exp.company}
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        ) : (
                          <span className="text-base md:text-lg font-semibold text-neutral-700 dark:text-neutral-300">
                            {exp.company}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2">
                      {exp.iscurrent && (
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 rounded-full text-sm font-medium">
                          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          Current
                        </span>
                      )}
                      <span
                        className={`px-3 py-1.5 border rounded-full text-sm font-medium ${getEmploymentTypeColor(
                          exp.employmentType,
                        )}`}
                      >
                        {exp.employmentType}
                      </span>
                    </div>
                  </div>

                  {/* Date & Location */}
                  <div className="flex flex-wrap gap-4 text-sm text-neutral-600 dark:text-neutral-400">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span className="font-medium">
                        {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span className="font-medium">{exp.location}</span>
                    </div>
                  </div>

                  {/* Expand Button */}
                  <button
                    onClick={() => toggleExpand(exp.id)}
                    className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors pt-2"
                  >
                    {expandedId === exp.id ? (
                      <>
                        Show Less
                        <ChevronUp className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        Show More Details
                        <ChevronDown className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

                {/* Collapsible Content */}
                <AnimatePresence>
                  {expandedId === exp.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: { duration: 0.3, ease: "easeInOut" },
                        opacity: { duration: 0.2 },
                      }}
                      className="overflow-hidden bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800"
                    >
                      <div className="p-6 md:p-8 space-y-6">
                        {/* Description */}
                        <div className="space-y-3">
                          <h4 className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                            About
                          </h4>
                          <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                            {exp.description}
                          </p>
                        </div>

                        {/* Technologies */}
                        {exp.technologies && exp.technologies.length > 0 && (
                          <div className="space-y-3">
                            <h4 className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                              Technologies
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {exp.technologies.map((tech) => (
                                <span
                                  key={tech}
                                  className="px-3 py-1.5 text-sm font-medium bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-lg border border-neutral-200 dark:border-neutral-700"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Tools */}
                        {exp.tools && exp.tools.length > 0 && (
                          <div className="space-y-3">
                            <h4 className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                              Tools & Platforms
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {exp.tools.map((tool) => (
                                <span
                                  key={tool}
                                  className="px-3 py-1.5 text-sm font-medium bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-lg border border-neutral-200 dark:border-neutral-700"
                                >
                                  {tool}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Responsibilities */}
                        {exp.responsibilities &&
                          exp.responsibilities.length > 0 && (
                            <div className="space-y-3">
                              <h4 className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                                Key Responsibilities
                              </h4>
                              <ul className="space-y-3">
                                {exp.responsibilities.map((resp, i) => (
                                  <li
                                    key={i}
                                    className="flex items-start gap-3 text-neutral-700 dark:text-neutral-300"
                                  >
                                    <span className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 shrink-0" />
                                    <span className="text-sm leading-relaxed">
                                      {resp}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                        {/* Project Websites */}
                        {exp.projectWebsite &&
                          exp.projectWebsite.length > 0 && (
                            <div className="space-y-3">
                              <h4 className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                                Project Websites
                              </h4>
                              <div className="flex flex-wrap gap-3">
                                {exp.projectWebsite.map((project, idx) => (
                                  <a
                                    key={idx}
                                    href={project.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-950/50 transition-colors"
                                  >
                                    <ExternalLink className="w-4 h-4" />
                                    {project.title}
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
