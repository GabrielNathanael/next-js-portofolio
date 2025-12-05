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
    []
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
        ","
      )}|${selectedTools.join(",")}|${sortOrder}`,
    [selectedEmploymentTypes, selectedTechnologies, selectedTools, sortOrder]
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
        selectedEmploymentTypes.includes(exp.employmentType)
      );
    }

    // Filter by technologies
    if (selectedTechnologies.length > 0) {
      filtered = filtered.filter((exp) =>
        exp.technologies.some((tech) => selectedTechnologies.includes(tech))
      );
    }

    // Filter by tools
    if (selectedTools.length > 0) {
      filtered = filtered.filter((exp) =>
        exp.tools?.some((tool) => selectedTools.includes(tool))
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
    displayedCount
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
      { threshold: 0.1 }
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
        "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
      Internship:
        "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
      "Part-time":
        "bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400",
      Contract:
        "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400",
      Freelance:
        "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400",
    };
    return (
      colors[type] ||
      "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
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
          <div className="absolute left-[11px] top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-neutral-700" />

          {/* Experience Items */}
          <div className="space-y-8">
            {displayedExperiences.map((exp, idx) => {
              const isExpanded = expandedItems.has(exp.id);
              const hasDetails =
                exp.responsibilities && exp.responsibilities.length > 0;

              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="relative pl-12"
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-0 top-6 flex items-center justify-center">
                    {exp.iscurrent ? (
                      <div className="relative">
                        <div className="w-6 h-6 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center z-10">
                          <div className="w-2 h-2 rounded-full bg-white" />
                        </div>
                        <div className="absolute inset-0 w-6 h-6 rounded-full bg-blue-600 dark:bg-blue-500 animate-ping opacity-75" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full border-2 border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-800" />
                    )}
                  </div>

                  {/* Experience Card */}
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="p-6 space-y-4">
                      {/* Header */}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                        <div className="space-y-2">
                          <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                            {exp.position}
                          </h3>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                            {exp.website ? (
                              <a
                                href={exp.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-lg font-semibold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1 w-fit"
                              >
                                {exp.company}
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            ) : (
                              <span className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                                {exp.company}
                              </span>
                            )}
                            <span
                              className={`px-3 py-1 text-xs font-medium rounded-full w-fit ${getEmploymentTypeColor(
                                exp.employmentType
                              )}`}
                            >
                              {exp.employmentType}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span className="font-medium">
                              {formatDate(exp.startDate)} -{" "}
                              {formatDate(exp.endDate)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{exp.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="space-y-2">
                        <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                          {exp.description}
                        </p>

                        {/* Toggle Button - Available on all breakpoints */}
                        {hasDetails && (
                          <button
                            onClick={() => toggleExpand(exp.id)}
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
                      </div>

                      {/* Details - Collapsible on all breakpoints */}
                      {hasDetails && (
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden space-y-4"
                            >
                              {/* Responsibilities */}
                              {exp.responsibilities && (
                                <div className="space-y-2">
                                  <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                                    Key Responsibilities:
                                  </h4>
                                  <ul className="list-disc list-inside space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                                    {exp.responsibilities.map((resp, i) => (
                                      <li key={i}>{resp}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {/* Technologies */}
                              <div className="space-y-2">
                                <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                                  Technologies:
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {exp.technologies.map((tech) => (
                                    <span
                                      key={tech}
                                      className="px-3 py-1 text-sm font-medium bg-gray-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-full"
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              {/* Tools */}
                              {exp.tools && exp.tools.length > 0 && (
                                <div className="space-y-2">
                                  <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                                    Tools:
                                  </h4>
                                  <div className="flex flex-wrap gap-2">
                                    {exp.tools.map((tool) => (
                                      <span
                                        key={tool}
                                        className="px-3 py-1 text-sm font-medium bg-gray-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-full"
                                      >
                                        {tool}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Project Websites */}
                              {exp.projectWebsite &&
                                exp.projectWebsite.length > 0 && (
                                  <div className="space-y-2">
                                    <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                                      Project Websites:
                                    </h4>
                                    <div className="flex flex-col gap-2">
                                      {exp.projectWebsite.map(
                                        (project, idx) => (
                                          <a
                                            key={idx}
                                            href={project.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline w-fit"
                                          >
                                            <ExternalLink className="w-4 h-4" />
                                            {project.title}
                                          </a>
                                        )
                                      )}
                                    </div>
                                  </div>
                                )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      )}

                      {/* Technologies - Show when no responsibilities */}
                      {!hasDetails && (
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                            Technologies:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="px-3 py-1 text-sm font-medium bg-gray-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-full"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Tools - Show when no responsibilities */}
                      {!hasDetails && exp.tools && exp.tools.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                            Tools:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {exp.tools.map((tool) => (
                              <span
                                key={tool}
                                className="px-3 py-1 text-sm font-medium bg-gray-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-full"
                              >
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Project Websites - Show when no responsibilities */}
                      {!hasDetails &&
                        exp.projectWebsite &&
                        exp.projectWebsite.length > 0 && (
                          <div className="space-y-2">
                            <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                              Project Websites:
                            </h4>
                            <div className="flex flex-col gap-2">
                              {exp.projectWebsite.map((project, idx) => (
                                <a
                                  key={idx}
                                  href={project.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline w-fit"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                  {project.title}
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                    </div>
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
            className="mt-4 px-6 py-2 rounded-lg bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 font-medium transition-colors"
          >
            Clear Filters
          </button>
        </motion.div>
      )}
    </div>
  );
}
