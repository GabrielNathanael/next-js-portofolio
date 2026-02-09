// components\sections\ExperienceGrid.tsx
"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  ExternalLink,
  MapPin,
  Calendar,
  Briefcase,
} from "lucide-react";
import Card from "@/components/ui/Card";
import ExperienceFilter from "@/components/ui/ExperienceFilter";
import { Experience } from "@/lib/contentful/types";

interface ExperienceGridProps {
  experiences: Experience[];
}

export default function ExperienceGrid({ experiences }: ExperienceGridProps) {
  const [selectedEmploymentTypes, setSelectedEmploymentTypes] = useState<
    string[]
  >([]);
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>(
    [],
  );
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Create a key that changes when filters change
  const filterKey = useMemo(
    () =>
      `${selectedEmploymentTypes.join(",")}|${selectedTechnologies.join(
        ",",
      )}|${selectedTools.join(",")}|${sortOrder}`,
    [selectedEmploymentTypes, selectedTechnologies, selectedTools, sortOrder],
  );

  const [currentFilterKey, setCurrentFilterKey] = useState(filterKey);
  const [loadMoreCount, setLoadMoreCount] = useState(0);

  // Get unique values for filters
  const availableEmploymentTypes = useMemo(() => {
    const types = new Set(experiences.map((exp) => exp.employmentType));
    return Array.from(types).sort();
  }, [experiences]);

  const availableTechnologies = useMemo(() => {
    const techs = new Set(experiences.flatMap((exp) => exp.technologies));
    return Array.from(techs).sort();
  }, [experiences]);

  const availableTools = useMemo(() => {
    const tools = new Set(experiences.flatMap((exp) => exp.tools || []));
    return Array.from(tools).sort();
  }, [experiences]);

  // Filter and sort logic
  const filteredAndSortedExperiences = useMemo(() => {
    let filtered = experiences;

    // Filter by employment types
    if (selectedEmploymentTypes.length > 0) {
      filtered = filtered.filter((exp) =>
        selectedEmploymentTypes.includes(exp.employmentType),
      );
    }

    // Filter by technologies
    if (selectedTechnologies.length > 0) {
      filtered = filtered.filter((exp) =>
        exp.technologies.some((tech) => selectedTechnologies.includes(tech)),
      );
    }

    // Filter by tools
    if (selectedTools.length > 0) {
      filtered = filtered.filter((exp) =>
        exp.tools?.some((tool) => selectedTools.includes(tool)),
      );
    }

    // Sort by date first
    const sorted = [...filtered].sort((a, b) => {
      const dateA = new Date(a.startDate);
      const dateB = new Date(b.startDate);
      return sortOrder === "newest"
        ? dateB.getTime() - dateA.getTime()
        : dateA.getTime() - dateB.getTime();
    });

    // Move current jobs to top (override sort)
    const currentJobs = sorted.filter((exp) => exp.iscurrent);
    const pastJobs = sorted.filter((exp) => !exp.iscurrent);

    return [...currentJobs, ...pastJobs];
  }, [
    experiences,
    selectedEmploymentTypes,
    selectedTechnologies,
    selectedTools,
    sortOrder,
  ]);

  // Reset load count when filters change
  if (filterKey !== currentFilterKey) {
    setCurrentFilterKey(filterKey);
    setLoadMoreCount(0);
  }

  // Calculate displayed count
  const displayedCount = 5 + loadMoreCount * 5;

  // Displayed experiences with infinite scroll
  const displayedExperiences = filteredAndSortedExperiences.slice(
    0,
    displayedCount,
  );
  const hasMore = displayedCount < filteredAndSortedExperiences.length;

  // Infinite scroll observer
  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setLoadMoreCount((prev) => prev + 1);
        }
      },
      { threshold: 0.1 },
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [hasMore]);

  // Toggle expand/collapse for all breakpoints
  const toggleExpand = (id: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

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

  // Get employment type color
  const getEmploymentTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      "Full-time":
        "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
      Internship:
        "bg-violet-50 dark:bg-violet-950/30 text-violet-700 dark:text-violet-400 border-violet-200 dark:border-violet-800",
      "Part-time":
        "bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800",
      Contract:
        "bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800",
      Freelance:
        "bg-cyan-50 dark:bg-cyan-950/30 text-cyan-700 dark:text-cyan-400 border-cyan-200 dark:border-cyan-800",
    };
    return (
      colors[type] ||
      "bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700"
    );
  };

  const clearAllFilters = () => {
    setSelectedEmploymentTypes([]);
    setSelectedTechnologies([]);
    setSelectedTools([]);
  };

  return (
    <div className="space-y-8">
      {/* Filter */}
      <ExperienceFilter
        availableEmploymentTypes={availableEmploymentTypes}
        availableTechnologies={availableTechnologies}
        availableTools={availableTools}
        selectedEmploymentTypes={selectedEmploymentTypes}
        selectedTechnologies={selectedTechnologies}
        selectedTools={selectedTools}
        onEmploymentTypesChange={setSelectedEmploymentTypes}
        onTechnologiesChange={setSelectedTechnologies}
        onToolsChange={setSelectedTools}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
        totalResults={filteredAndSortedExperiences.length}
      />

      {/* Timeline Grid */}
      {displayedExperiences.length > 0 ? (
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-3 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-blue-400/30 to-transparent dark:from-blue-400/50 dark:via-blue-500/30" />

          {/* Experience Items */}
          <div className="space-y-8">
            {displayedExperiences.map((exp, idx) => {
              const isExpanded = expandedItems.has(exp.id);

              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="relative pl-12"
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-0 top-6 flex items-center justify-center">
                    {exp.iscurrent ? (
                      <div className="relative">
                        <motion.div
                          className="w-6 h-6 rounded-full bg-blue-600 dark:bg-blue-400 border-4 border-white dark:border-neutral-950"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
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
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full border-4 bg-white dark:bg-neutral-950 border-blue-500/50 dark:border-blue-400/50" />
                    )}
                  </div>

                  {/* Experience Card */}
                  <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-neutral-300 dark:hover:border-neutral-700">
                    <div className="p-6 space-y-4">
                      {/* Header */}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="space-y-3 flex-1">
                          <h3 className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white leading-tight">
                            {exp.position}
                          </h3>
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
                            {formatDate(exp.startDate)} -{" "}
                            {formatDate(exp.endDate)}
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
                        {isExpanded ? (
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
                      {isExpanded && (
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
                          <div className="p-6 space-y-6">
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
                            {exp.technologies &&
                              exp.technologies.length > 0 && (
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
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Load More Trigger */}
          {hasMore && <div ref={loadMoreRef} className="h-10" />}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            No experiences found with the selected filters.
          </p>
          <button
            onClick={clearAllFilters}
            className="mt-4 px-6 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 font-medium transition-colors"
          >
            Clear Filters
          </button>
        </motion.div>
      )}
    </div>
  );
}
