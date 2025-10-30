// components\ui\ProjectFilter.tsx
// components/ui/ProjectFilter.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";

interface ProjectFilterProps {
  availableTags: string[];
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  sortOrder: "newest" | "oldest";
  onSortChange: (order: "newest" | "oldest") => void;
  totalResults: number;
  tagCategories: Record<string, string[]>;
}

export default function ProjectFilter({
  availableTags,
  selectedTags,
  onTagsChange,
  sortOrder,
  onSortChange,
  totalResults,
  tagCategories,
}: ProjectFilterProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter((t) => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  const toggleCategory = (category: string) => {
    if (expandedCategories.includes(category)) {
      setExpandedCategories(expandedCategories.filter((c) => c !== category));
    } else {
      setExpandedCategories([...expandedCategories, category]);
    }
  };

  const clearAll = () => {
    onTagsChange([]);
  };

  return (
    <div className="space-y-6">
      {/* Filter Header with Sort */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <h3 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
            Filter by Technology
          </h3>
          {selectedTags.length > 0 && (
            <button
              onClick={clearAll}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Clear all ({selectedTags.length})
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-neutral-600 dark:text-neutral-400">
            {totalResults} {totalResults === 1 ? "project" : "projects"}
          </span>
          <div className="relative">
            <select
              value={sortOrder}
              onChange={(e) =>
                onSortChange(e.target.value as "newest" | "oldest")
              }
              className="appearance-none pl-4 pr-10 py-2 text-sm font-medium bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Categorized Tag Chips */}
      <div className="flex flex-wrap gap-6">
        {Object.entries(tagCategories).map(([category, tags]) => {
          const isExpanded = expandedCategories.includes(category);
          // Filter tags that exist in availableTags
          const categoryTags = tags.filter((tag) =>
            availableTags.includes(tag)
          );

          if (categoryTags.length === 0) return null;

          return (
            <div key={category} className="space-y-2">
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(category)}
                className="flex items-center gap-2 text-sm font-semibold text-neutral-700 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <motion.div
                  animate={{ rotate: isExpanded ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronRight className="w-4 h-4" />
                </motion.div>
                {category}
                <span className="text-xs text-neutral-500 dark:text-neutral-400">
                  ({categoryTags.length})
                </span>
              </button>

              {/* Category Tags */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-wrap gap-2 pl-6">
                      {categoryTags.map((tag) => {
                        const isSelected = selectedTags.includes(tag);
                        return (
                          <motion.button
                            key={tag}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => toggleTag(tag)}
                            className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                              isSelected
                                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105"
                                : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                            }`}
                          >
                            {tag}
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
