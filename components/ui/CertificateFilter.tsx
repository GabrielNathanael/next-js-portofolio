// components/ui/CertificateFilter.tsx
"use client";

import * as Select from "@radix-ui/react-select";
import { motion } from "framer-motion";
import { SlidersHorizontal, ChevronDown, Check } from "lucide-react";
import { useState, useEffect } from "react";

interface CertificateFilterProps {
  availableIssuers: string[];
  selectedIssuers: string[];
  onIssuersChange: (issuers: string[]) => void;
  sortOrder: "newest" | "oldest";
  onSortChange: (order: "newest" | "oldest") => void;
  totalResults: number;
}

export default function CertificateFilter({
  availableIssuers,
  selectedIssuers,
  onIssuersChange,
  sortOrder,
  onSortChange,
  totalResults,
}: CertificateFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  const toggleIssuer = (issuer: string) => {
    if (selectedIssuers.includes(issuer)) {
      onIssuersChange(selectedIssuers.filter((i) => i !== issuer));
    } else {
      onIssuersChange([...selectedIssuers, issuer]);
    }
  };

  const clearFilters = () => {
    onIssuersChange([]);
  };

  const hasActiveFilters = selectedIssuers.length > 0;

  if (!isMounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* Header with Results Count */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
          <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
            {totalResults} {totalResults === 1 ? "certificate" : "certificates"}{" "}
            found
          </span>
        </div>

        {/* Sort Dropdown (Radix + Framer Motion) */}
        <Select.Root
          value={sortOrder}
          onValueChange={(value) => onSortChange(value as "newest" | "oldest")}
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
            <Select.Viewport className="p-1" style={{ scrollBehavior: "auto" }}>
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

      {/* Issuer Filter Tags */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
          Filter by Issuer:
        </span>
        {availableIssuers.map((issuer) => {
          const isSelected = selectedIssuers.includes(issuer);
          return (
            <button
              key={issuer}
              onClick={() => toggleIssuer(issuer)}
              className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                isSelected
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                  : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
              }`}
            >
              {issuer}
            </button>
          );
        })}

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline transition-colors"
          >
            Clear all ({selectedIssuers.length})
          </button>
        )}
      </div>
    </motion.div>
  );
}
