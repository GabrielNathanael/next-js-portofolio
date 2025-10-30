// app\projects\page.tsx

import { projects, TAG_CATEGORIES } from "@/lib/data/projects";
import ProjectsGrid from "@/components/sections/ProjectsGrid";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
export const metadata = {
  title: "Projects | Your Portfolio",
  description: "Explore all my projects and works",
};

export default function ProjectsPage() {
  // Server-side data preparation
  // Nanti ganti dengan fetch dari API
  const allProjects = projects;

  // Extract unique tags untuk filter
  const uniqueTags = Array.from(
    new Set(allProjects.flatMap((project) => project.tags))
  ).sort();

  return (
    <>
      <Navbar />
      <div className="min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="mb-12 space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">All Projects</h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl">
              A collection of my work spanning various technologies and domains.
              Each project represents a unique challenge and learning
              experience.
            </p>
          </div>

          {/* Projects Grid Component */}
          <ProjectsGrid
            projects={allProjects}
            availableTags={uniqueTags}
            tagCategories={TAG_CATEGORIES}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
