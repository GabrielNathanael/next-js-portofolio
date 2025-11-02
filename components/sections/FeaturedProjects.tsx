// components\sections\FeaturedProjects.tsx
// components/sections/FeaturedProjects.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, User, Users } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import ProjectModal from "@/components/ui/ProjectModal";
import { Project } from "@/lib/contentful/types";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useIsMobile } from "@/hooks/useIsMobile";

interface FeaturedProjectsProps {
  projects: Project[];
}

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const isMobile = useIsMobile();
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const currentProject = projects.find((p) => p.id === selectedProject) || null;

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

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
      className="space-y-6 relative"
    >
      {/* Decorative floating blob - left side */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: isMobile ? 0.05 : 0.08, scale: 1 } : {}}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute -top-2 -left-16 w-56 h-56 bg-linear-to-br from-cyan-400 to-blue-500 rounded-full blur-2xl pointer-events-none"
      />

      {/* Header with decorative elements */}
      <div className="flex items-center justify-between relative">
        <motion.h2
          initial={{ opacity: 0, x: isMobile ? 0 : -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl font-bold from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 bg-clip-text text-transparent bg-linear-to-r"
        >
          Featured Projects
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, x: isMobile ? 0 : 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link href="/projects">
            <Button variant="ghost" size="sm" className="group">
              View All
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Projects Grid with staggered positioning */}
      <div className="grid md:grid-cols-3 gap-6 relative">
        {projects.map((project, idx) => {
          const isVertical = idx === 1;

          // Mobile: simple fade in
          // Desktop: complex animation
          const getInitialPosition = () => {
            if (isMobile) return {};
            if (idx === 0) return { x: -40, y: 20 };
            if (idx === 1) return { x: 0, y: -40 };
            return { x: 40, y: 20 };
          };

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, ...getInitialPosition() }}
              animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
              transition={{
                duration: isMobile ? 0.5 : 0.7,
                delay: 0.3 + idx * (isMobile ? 0.1 : 0.15),
                ease: "easeOut",
              }}
              className="relative"
              style={{
                marginTop: isMobile ? 0 : idx === 1 ? "0" : "1.5rem",
              }}
            >
              <Card
                className="overflow-hidden cursor-pointer group relative"
                onClick={() => setSelectedProject(project.id)}
              >
                <div
                  className={`relative ${
                    isVertical ? "aspect-3/4" : "aspect-4/3"
                  } overflow-hidden`}
                >
                  {getProjectTypeBadge(project.projectType)}

                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 400px"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-6 space-y-3 relative">
                  {/* Subtle decorative line on card body - disable on mobile */}
                  {!isMobile && idx === 1 && (
                    <motion.div
                      initial={{ width: 0, opacity: 0 }}
                      animate={inView ? { width: "2rem", opacity: 1 } : {}}
                      transition={{ duration: 0.6, delay: 0.8 }}
                      className="absolute top-3 right-6 h-0.5 bg-linear-to-r from-blue-500 to-cyan-400 rounded-full"
                    />
                  )}

                  <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 rounded-full">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Subtle glow on hover - disable on mobile */}
                {!isMobile && (
                  <motion.div
                    className={`absolute ${
                      idx === 0
                        ? "-bottom-8 -left-8"
                        : idx === 1
                        ? "-top-8 -right-8"
                        : "-bottom-8 -right-8"
                    } w-24 h-24 bg-linear-to-br from-cyan-400 to-blue-500 rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
                  />
                )}
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom right decorative accent blob */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: isMobile ? 0.05 : 0.1, scale: 1 } : {}}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute -bottom-20 -right-20 w-64 h-64 bg-linear-to-tl from-blue-500 to-cyan-400 rounded-full blur-3xl pointer-events-none"
      />

      {/* Project Detail Modal */}
      <ProjectModal
        project={currentProject}
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
      />
    </motion.div>
  );
}
