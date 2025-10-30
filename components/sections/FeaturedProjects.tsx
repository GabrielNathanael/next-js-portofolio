// components\sections\FeaturedProjects.tsx
// components/sections/FeaturedProjects.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import ProjectModal from "@/components/ui/ProjectModal";
import { projects } from "@/lib/data/projects";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function FeaturedProjects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  // Filter by featured projects
  const featuredProjects = projects.filter((p) => p.featured);

  // Get selected project object
  const currentProject = projects.find((p) => p.id === selectedProject) || null;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Featured Projects</h2>
        <Link href="/projects">
          <Button variant="ghost" size="sm" className="group">
            View All
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredProjects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <Card
              className="overflow-hidden cursor-pointer group"
              onClick={() => setSelectedProject(project.id)}
            >
              <div
                className={`relative ${
                  project.orientation === "vertical"
                    ? "aspect-3/4"
                    : "aspect-4/3"
                } overflow-hidden`}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6 space-y-3">
                <h3 className="text-xl font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
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
                    <span className="px-3 py-1 text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-full">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={currentProject}
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
      />
    </motion.div>
  );
}
