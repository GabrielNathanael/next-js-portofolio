// components\sections\ProjectsGrid.tsx
// components/sections/ProjectsGrid.tsx
"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { User, Users } from "lucide-react";
import Masonry from "react-masonry-css";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import ProjectFilter from "@/components/ui/ProjectFilter";
import Pagination from "@/components/ui/Pagination";
import ProjectModal from "@/components/ui/ProjectModal";
import { Project } from "@/lib/contentful/types";

interface ProjectsGridProps {
  projects: Project[];
  availableTags: string[];
  tagCategories: Record<string, string[]>;
}

export default function ProjectsGrid({
  projects,
  availableTags,
  tagCategories,
}: ProjectsGridProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"default" | "newest" | "oldest">(
    "default"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  // Ref untuk scroll ke section grid
  const gridRef = useRef<HTMLDivElement>(null);
  const prevPageRef = useRef(currentPage);

  // Scroll HANYA saat pagination berubah (bukan initial load atau filter change)
  useEffect(() => {
    // Check if page actually changed from user clicking pagination
    if (prevPageRef.current !== currentPage && prevPageRef.current !== 0) {
      if (gridRef.current) {
        gridRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
    prevPageRef.current = currentPage;
  }, [currentPage]);

  // Handle responsive items per page
  useEffect(() => {
    const handleResize = () => {
      const newItemsPerPage = window.innerWidth < 768 ? 3 : 6;
      setItemsPerPage((prev) => {
        if (prev !== newItemsPerPage) {
          setCurrentPage(1);
          prevPageRef.current = 0; // Reset to prevent scroll on resize
        }
        return newItemsPerPage;
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Helper function for project type badge
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
      <div
        className={`absolute top-3 right-3 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full ${bgColor} ${textColor} backdrop-blur-sm bg-opacity-90 shadow-lg text-xs font-semibold`}
      >
        <Icon className="w-3.5 h-3.5" />
        {type}
      </div>
    );
  };

  // Filter dan sort logic
  const filteredAndSortedProjects = useMemo(() => {
    let filtered = projects;

    // Filter by tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter((project) =>
        selectedTags.some((tag) => project.tags.includes(tag))
      );
    }

    // Sort logic
    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === "default") {
        // Default: sort by sortOrder field only
        return a.sortOrder - b.sortOrder;
      }

      // newest/oldest: sort by year, then sortOrder as tiebreaker
      const yearSort = sortBy === "newest" ? b.year - a.year : a.year - b.year;

      if (a.year === b.year) {
        return a.sortOrder - b.sortOrder;
      }

      return yearSort;
    });

    return sorted;
  }, [projects, selectedTags, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProjects = filteredAndSortedProjects.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleFilterChange = (tags: string[]) => {
    setSelectedTags(tags);
    setCurrentPage(1);
    prevPageRef.current = 0; // Reset to prevent scroll on filter change
  };

  const handleSortChange = (order: "newest" | "oldest") => {
    setSortBy(order);
    setCurrentPage(1);
    prevPageRef.current = 0; // Reset to prevent scroll on sort change
  };

  const currentProject = projects.find((p) => p.id === selectedProject) || null;

  const breakpointColumns = {
    default: 3,
    1024: 2,
    640: 1,
  };

  return (
    <div ref={gridRef} className="space-y-8 scroll-mt-24">
      {/* Filter & Sort */}
      <ProjectFilter
        availableTags={availableTags}
        selectedTags={selectedTags}
        onTagsChange={handleFilterChange}
        sortBy={sortBy}
        onSortChange={handleSortChange}
        totalResults={filteredAndSortedProjects.length}
        tagCategories={tagCategories}
      />

      {/* Masonry Grid */}
      {paginatedProjects.length > 0 ? (
        <>
          <Masonry
            breakpointCols={breakpointColumns}
            className="flex -ml-6 w-auto"
            columnClassName="pl-6 bg-clip-padding"
          >
            {paginatedProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="mb-6"
              >
                <Card
                  className="overflow-hidden cursor-pointer group hover:shadow-xl transition-all duration-300"
                  onClick={() => setSelectedProject(project.id)}
                >
                  <div
                    className={`relative ${
                      project.orientation === "vertical"
                        ? "aspect-3/4"
                        : "aspect-4/3"
                    } overflow-hidden`}
                  >
                    {getProjectTypeBadge(project.projectType)}
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex-1 line-clamp-2">
                        {project.title}
                      </h3>
                      <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400 shrink-0">
                        {project.year}
                      </span>
                    </div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-full">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </Masonry>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center pt-4">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                totalItems={filteredAndSortedProjects.length}
                itemsPerPage={itemsPerPage}
              />
            </div>
          )}
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            No projects found with the selected filters.
          </p>
          <Button
            variant="ghost"
            onClick={() => {
              setSelectedTags([]);
              setCurrentPage(1);
              prevPageRef.current = 0; // Reset to prevent scroll
            }}
            className="mt-4"
          >
            Clear Filters
          </Button>
        </motion.div>
      )}

      {/* Project Detail Modal */}
      <ProjectModal
        project={currentProject}
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
