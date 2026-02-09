// components/sections/FeaturedProjects.tsx
"use client";

import { useRef, useEffect, useState, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, User, Users } from "lucide-react";
import { Project } from "@/lib/contentful/types";
import { useIsMobile } from "@/hooks/useIsMobile";

// Dynamic import modal
const ProjectModal = lazy(() => import("@/components/ui/ProjectModal"));

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface FeaturedProjectsProps {
  projects: Project[];
}

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const currentProject = projects.find((p) => p.id === selectedProject) || null;

  useEffect(() => {
    // Skip GSAP animation on mobile
    if (isMobile) return;

    const container = containerRef.current;
    const scrollContainer = scrollRef.current;

    if (!container || !scrollContainer) return;

    const ctx = gsap.context(() => {
      // Calculate scroll width
      const scrollWidth = scrollContainer.scrollWidth - window.innerWidth;

      // Horizontal scroll animation
      gsap.to(scrollContainer, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${scrollWidth + window.innerHeight}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Image scale effect
      gsap.utils.toArray<HTMLElement>(".project-image").forEach((img) => {
        gsap.fromTo(
          img,
          { scale: 1.15 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
    }, container);

    return () => ctx.revert();
  }, [isMobile]);

  const getProjectTypeIndicator = (type: "Indie" | "Collab") => {
    const config = {
      Indie: {
        icon: User,
        bg: "bg-emerald-500 dark:bg-emerald-600",
        text: "text-white",
        label: "Indie",
      },
      Collab: {
        icon: Users,
        bg: "bg-violet-500 dark:bg-violet-600",
        text: "text-white",
        label: "Collab",
      },
    };

    const { icon: Icon, bg, text, label } = config[type];

    return (
      <span
        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full ${bg} ${text} text-sm font-semibold shadow-lg`}
      >
        <Icon className="w-4 h-4" />
        {label}
      </span>
    );
  };

  // Mobile view: vertical scrollable cards
  if (isMobile) {
    return (
      <section className="relative py-16 bg-white dark:bg-neutral-950">
        <div className="px-6">
          {/* Section Label */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 group"
            >
              View All
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Projects Grid */}
          <div className="space-y-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group cursor-pointer"
                onClick={() => setSelectedProject(project.id)}
              >
                <div className="relative h-75 overflow-hidden rounded-2xl">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-neutral-900 via-neutral-900/60 to-transparent" />

                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <div className="mb-3">
                      {getProjectTypeIndicator(project.projectType)}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-white/80 line-clamp-2 mb-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 5).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-3 py-1 border border-white/30 rounded-full text-white/90 backdrop-blur-sm"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 5 && (
                        <span className="text-xs px-3 py-1 border border-white/30 rounded-full text-white/90 backdrop-blur-sm">
                          +{project.tags.length - 5}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Index Number */}
                  <div
                    className="absolute top-4 right-4 font-bold text-5xl text-white/30"
                    style={{
                      textShadow: "0 0 20px rgba(255, 255, 255, 0.2)",
                      WebkitTextStroke: "1px rgba(255, 255, 255, 0.15)",
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Project Modal */}
        {selectedProject && (
          <Suspense fallback={null}>
            <ProjectModal
              project={currentProject}
              isOpen={selectedProject !== null}
              onClose={() => setSelectedProject(null)}
            />
          </Suspense>
        )}
      </section>
    );
  }

  // Desktop view: horizontal scroll
  return (
    <section
      ref={containerRef}
      className="relative h-screen overflow-hidden bg-white dark:bg-neutral-950"
    >
      {/* Section Label - Fixed */}
      <div className="absolute top-12 md:top-16 left-6 md:left-16 lg:left-24 z-20">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 bg-clip-text text-transparent">
          Featured Projects
        </h2>
      </div>

      {/* Horizontal Scroll Container */}
      <div
        ref={scrollRef}
        className="flex h-full items-center gap-8 md:gap-12 lg:gap-16 px-6 md:px-16 lg:px-24 pt-24"
        style={{ width: "max-content" }}
      >
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className="relative w-[80vw] md:w-[65vw] lg:w-[55vw] h-[65vh] md:h-[70vh] group cursor-pointer shrink-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            onClick={() => setSelectedProject(project.id)}
          >
            {/* Image Container */}
            <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-2xl">
              <div className="project-image absolute inset-0">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 80vw, (max-width: 1024px) 65vw, 55vw"
                  priority={index === 0}
                />
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-neutral-900 via-neutral-900/70 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-700" />
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
              <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                {/* Project Type */}
                <div className="mb-4">
                  {getProjectTypeIndicator(project.projectType)}
                </div>

                {/* Title */}
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-base md:text-lg text-white/80 mb-6 max-w-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 line-clamp-2">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200">
                  {project.tags.slice(0, 5).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs md:text-sm px-4 py-2 border border-white/30 rounded-full text-white/90 backdrop-blur-sm hover:bg-white/10 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 5 && (
                    <span className="text-xs md:text-sm px-4 py-2 border border-white/30 rounded-full text-white/90 backdrop-blur-sm">
                      +{project.tags.length - 5}
                    </span>
                  )}
                </div>

                {/* Click to view hint */}
                <p className="text-sm text-white/60 mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-300">
                  Click to view details →
                </p>
              </div>
            </div>

            {/* Index Number */}
            <div
              className="absolute top-8 right-8 font-bold text-7xl md:text-8xl lg:text-9xl text-white/20 pointer-events-none"
              style={{
                textShadow: "0 0 40px rgba(255, 255, 255, 0.1)",
                WebkitTextStroke: "1px rgba(255, 255, 255, 0.1)",
              }}
            >
              {String(index + 1).padStart(2, "0")}
            </div>
          </motion.div>
        ))}

        {/* End CTA Card */}
        <div className="w-[50vw] md:w-[40vw] h-[65vh] md:h-[70vh] flex items-center justify-center shrink-0">
          <div className="text-center space-y-6">
            <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 font-medium">
              View All Projects
            </p>
            <a
              href="/projects"
              className="inline-flex w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-blue-600 dark:border-blue-400 items-center justify-center mx-auto hover:bg-linear-to-br hover:from-blue-600 hover:to-cyan-500 hover:border-transparent hover:scale-110 transition-all duration-500 cursor-pointer group"
            >
              <ArrowRight className="w-6 h-6 md:w-8 md:h-8 text-blue-600 dark:text-blue-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </a>
          </div>
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <Suspense fallback={null}>
          <ProjectModal
            project={currentProject}
            isOpen={selectedProject !== null}
            onClose={() => setSelectedProject(null)}
          />
        </Suspense>
      )}
    </section>
  );
}
