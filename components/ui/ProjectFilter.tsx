// components/ui/ProjectFilter.tsx
"use client";

import * as Select from "@radix-ui/react-select";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, Check } from "lucide-react";
import { useState, useEffect } from "react";

interface ProjectFilterProps {
  availableTags: string[];
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  sortBy: "default" | "newest" | "oldest";
  onSortChange: (order: "newest" | "oldest") => void;
  totalResults: number;
  tagCategories: Record<string, string[]>;
}

export default function ProjectFilter({
  availableTags,
  selectedTags,
  onTagsChange,
  sortBy,
  onSortChange,
  totalResults,
  tagCategories,
}: ProjectFilterProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

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
    setExpandedCategories([]);
  };

  if (!isMounted) return null;

  return (
    <div className="space-y-6">
      {/* Sort Dropdown - Mobile First */}
      <div className="flex flex-col sm:hidden gap-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-neutral-600 dark:text-neutral-400">
            {totalResults} {totalResults === 1 ? "project" : "projects"}
          </span>

          <Select.Root
            value={sortBy === "default" ? "" : sortBy}
            onValueChange={(value) =>
              onSortChange(value as "newest" | "oldest")
            }
            onOpenChange={setIsOpen}
          >
            <Select.Trigger className="inline-flex items-center justify-between gap-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all min-w-40">
              <Select.Value placeholder="Sort by" />
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="flex items-center justify-center"
              >
                <ChevronDown className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
              </motion.div>
            </Select.Trigger>

            <Select.Content
              side="bottom"
              align="end"
              position="popper"
              avoidCollisions={false}
              sideOffset={4}
              className="z-50 min-w-(--radix-select-trigger-width) rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-md overflow-hidden"
            >
              <Select.Viewport
                className="p-1"
                style={{ scrollBehavior: "auto" }}
              >
                <Select.Item
                  value="newest"
                  className="flex items-center justify-between gap-2 cursor-pointer rounded-md px-3 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:bg-neutral-100 dark:focus:bg-neutral-700 focus:outline-none"
                >
                  <Select.ItemText>Newest First</Select.ItemText>
                  {sortBy === "newest" && (
                    <Check className="w-4 h-4 text-blue-600" />
                  )}
                </Select.Item>

                <Select.Item
                  value="oldest"
                  className="flex items-center justify-between gap-2 cursor-pointer rounded-md px-3 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:bg-neutral-100 dark:focus:bg-neutral-700 focus:outline-none"
                >
                  <Select.ItemText>Oldest First</Select.ItemText>
                  {sortBy === "oldest" && (
                    <Check className="w-4 h-4 text-blue-600" />
                  )}
                </Select.Item>
              </Select.Viewport>
            </Select.Content>
          </Select.Root>
        </div>
      </div>

      {/* Filter Header with Sort - Desktop */}
      <div className="hidden sm:flex sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <h3 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
            Filter by:
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

        {/* Sort Dropdown - Desktop */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-neutral-600 dark:text-neutral-400">
            {totalResults} {totalResults === 1 ? "project" : "projects"}
          </span>

          <Select.Root
            value={sortBy === "default" ? "" : sortBy}
            onValueChange={(value) =>
              onSortChange(value as "newest" | "oldest")
            }
            onOpenChange={setIsOpen}
          >
            <Select.Trigger className="inline-flex items-center justify-between gap-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all min-w-40">
              <Select.Value placeholder="Sort by" />
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="flex items-center justify-center"
              >
                <ChevronDown className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
              </motion.div>
            </Select.Trigger>

            <Select.Content
              side="bottom"
              align="end"
              position="popper"
              avoidCollisions={false}
              sideOffset={4}
              className="z-50 min-w-(--radix-select-trigger-width) rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-md overflow-hidden"
            >
              <Select.Viewport
                className="p-1"
                style={{ scrollBehavior: "auto" }}
              >
                <Select.Item
                  value="newest"
                  className="flex items-center justify-between gap-2 cursor-pointer rounded-md px-3 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:bg-neutral-100 dark:focus:bg-neutral-700 focus:outline-none"
                >
                  <Select.ItemText>Newest First</Select.ItemText>
                  {sortBy === "newest" && (
                    <Check className="w-4 h-4 text-blue-600" />
                  )}
                </Select.Item>

                <Select.Item
                  value="oldest"
                  className="flex items-center justify-between gap-2 cursor-pointer rounded-md px-3 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:bg-neutral-100 dark:focus:bg-neutral-700 focus:outline-none"
                >
                  <Select.ItemText>Oldest First</Select.ItemText>
                  {sortBy === "oldest" && (
                    <Check className="w-4 h-4 text-blue-600" />
                  )}
                </Select.Item>
              </Select.Viewport>
            </Select.Content>
          </Select.Root>
        </div>
      </div>

      {/* Filter Header - Mobile Only */}
      <div className="flex sm:hidden items-center gap-4">
        <h3 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
          Filter by:
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

      {/* Categorized Tag Chips */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(tagCategories).map(([category, tags]) => {
          const isExpanded = expandedCategories.includes(category);
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
