// components/ui/ExperienceFilter.tsx
"use client";

import * as Select from "@radix-ui/react-select";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, Check } from "lucide-react";
import { useState } from "react";

interface ExperienceFilterProps {
  availableEmploymentTypes: string[];
  availableTechnologies: string[];
  availableTools: string[];
  selectedEmploymentTypes: string[];
  selectedTechnologies: string[];
  selectedTools: string[];
  onEmploymentTypesChange: (types: string[]) => void;
  onTechnologiesChange: (techs: string[]) => void;
  onToolsChange: (tools: string[]) => void;
  sortOrder: "newest" | "oldest";
  onSortChange: (order: "newest" | "oldest") => void;
  totalResults: number;
}

export default function ExperienceFilter({
  availableEmploymentTypes,
  availableTechnologies,
  availableTools,
  selectedEmploymentTypes,
  selectedTechnologies,
  selectedTools,
  onEmploymentTypesChange,
  onTechnologiesChange,
  onToolsChange,
  sortOrder,
  onSortChange,
  totalResults,
}: ExperienceFilterProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleEmploymentType = (type: string) => {
    if (selectedEmploymentTypes.includes(type)) {
      onEmploymentTypesChange(
        selectedEmploymentTypes.filter((t) => t !== type)
      );
    } else {
      onEmploymentTypesChange([...selectedEmploymentTypes, type]);
    }
  };

  const toggleTechnology = (tech: string) => {
    if (selectedTechnologies.includes(tech)) {
      onTechnologiesChange(selectedTechnologies.filter((t) => t !== tech));
    } else {
      onTechnologiesChange([...selectedTechnologies, tech]);
    }
  };

  const toggleTool = (tool: string) => {
    if (selectedTools.includes(tool)) {
      onToolsChange(selectedTools.filter((t) => t !== tool));
    } else {
      onToolsChange([...selectedTools, tool]);
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
    onEmploymentTypesChange([]);
    onTechnologiesChange([]);
    onToolsChange([]);
    setExpandedCategories([]);
  };

  const getEmploymentTypeColor = (type: string, isSelected: boolean) => {
    if (!isSelected) {
      return "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700";
    }

    const colors: Record<string, string> = {
      "Full-time": "bg-blue-600 text-white shadow-lg shadow-blue-500/30",
      Internship: "bg-purple-600 text-white shadow-lg shadow-purple-500/30",
      "Part-time": "bg-violet-600 text-white shadow-lg shadow-violet-500/30",
      Contract: "bg-orange-600 text-white shadow-lg shadow-orange-500/30",
      Freelance: "bg-cyan-600 text-white shadow-lg shadow-cyan-500/30",
    };
    return (
      colors[type] || "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
    );
  };

  const totalSelectedFilters =
    selectedEmploymentTypes.length +
    selectedTechnologies.length +
    selectedTools.length;

  const categories = [
    {
      name: "Employment Type",
      items: availableEmploymentTypes,
      selectedItems: selectedEmploymentTypes,
      onToggle: toggleEmploymentType,
      getColorClass: getEmploymentTypeColor,
    },
    {
      name: "Technologies",
      items: availableTechnologies,
      selectedItems: selectedTechnologies,
      onToggle: toggleTechnology,
    },
    {
      name: "Tools",
      items: availableTools,
      selectedItems: selectedTools,
      onToggle: toggleTool,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Sort Dropdown - Mobile First */}
      <div className="flex flex-col sm:hidden gap-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-neutral-600 dark:text-neutral-400">
            {totalResults} {totalResults === 1 ? "experience" : "experiences"}
          </span>

          <Select.Root
            value={sortOrder}
            onValueChange={(value) =>
              onSortChange(value as "newest" | "oldest")
            }
            onOpenChange={setIsOpen}
          >
            <Select.Trigger className="inline-flex items-center justify-between gap-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all min-w-40">
              <Select.Value />
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
                  {sortOrder === "newest" && (
                    <Check className="w-4 h-4 text-blue-600" />
                  )}
                </Select.Item>

                <Select.Item
                  value="oldest"
                  className="flex items-center justify-between gap-2 cursor-pointer rounded-md px-3 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:bg-neutral-100 dark:focus:bg-neutral-700 focus:outline-none"
                >
                  <Select.ItemText>Oldest First</Select.ItemText>
                  {sortOrder === "oldest" && (
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
          {totalSelectedFilters > 0 && (
            <button
              onClick={clearAll}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Clear all ({totalSelectedFilters})
            </button>
          )}
        </div>

        {/* Sort Dropdown - Desktop */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-neutral-600 dark:text-neutral-400">
            {totalResults} {totalResults === 1 ? "experience" : "experiences"}
          </span>

          <Select.Root
            value={sortOrder}
            onValueChange={(value) =>
              onSortChange(value as "newest" | "oldest")
            }
            onOpenChange={setIsOpen}
          >
            <Select.Trigger className="inline-flex items-center justify-between gap-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all min-w-40">
              <Select.Value />
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
                  {sortOrder === "newest" && (
                    <Check className="w-4 h-4 text-blue-600" />
                  )}
                </Select.Item>

                <Select.Item
                  value="oldest"
                  className="flex items-center justify-between gap-2 cursor-pointer rounded-md px-3 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:bg-neutral-100 dark:focus:bg-neutral-700 focus:outline-none"
                >
                  <Select.ItemText>Oldest First</Select.ItemText>
                  {sortOrder === "oldest" && (
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
        {totalSelectedFilters > 0 && (
          <button
            onClick={clearAll}
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            Clear all ({totalSelectedFilters})
          </button>
        )}
      </div>

      {/* Categorized Filter Chips */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-6">
        {categories.map((category) => {
          if (category.items.length === 0) return null;

          const isExpanded = expandedCategories.includes(category.name);

          return (
            <div key={category.name} className="space-y-2">
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(category.name)}
                className="flex items-center gap-2 text-sm font-semibold text-neutral-700 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <motion.div
                  animate={{ rotate: isExpanded ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronRight className="w-4 h-4" />
                </motion.div>
                {category.name}
                <span className="text-xs text-neutral-500 dark:text-neutral-400">
                  ({category.items.length})
                </span>
              </button>

              {/* Category Items */}
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
                      {category.items.map((item) => {
                        const isSelected =
                          category.selectedItems.includes(item);
                        const colorClass = category.getColorClass
                          ? category.getColorClass(item, isSelected)
                          : isSelected
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105"
                          : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700";

                        return (
                          <motion.button
                            key={item}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => category.onToggle(item)}
                            className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${colorClass}`}
                          >
                            {item}
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
