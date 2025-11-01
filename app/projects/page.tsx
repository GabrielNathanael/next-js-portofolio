// app/projects/page.tsx
import ProjectsGrid from "@/components/sections/ProjectsGrid";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getProjects, getTagsWithCategories } from "@/lib/contentful/api";
import { siteConfig, jsonLdBreadcrumb } from "@/lib/seo/config";
import type { Metadata } from "next";

// ISR: Revalidate every 1 hour (3600 seconds)
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore my portfolio of web development projects built with Next.js, React, TypeScript, and Laravel. From full-stack applications to responsive frontends, see how I solve real-world problems with code.",
  keywords: [
    ...siteConfig.keywords,
    "Web Development Projects",
    "Next.js Projects",
    "React Projects",
    "Full Stack Projects",
    "TypeScript Projects",
    "Portfolio Projects",
    "Web Applications",
  ],

  openGraph: {
    title: `Projects | ${siteConfig.name}`,
    description:
      "A collection of web development projects showcasing full-stack development with modern technologies.",
    url: `${siteConfig.url}/projects`,
    type: "website",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `Projects - ${siteConfig.name}`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: `Projects | ${siteConfig.name}`,
    description:
      "A collection of web development projects showcasing full-stack development with modern technologies.",
    images: [siteConfig.ogImage],
  },

  alternates: {
    canonical: `${siteConfig.url}/projects`,
  },
};

const breadcrumbItems = [
  { name: "Home", url: "/" },
  { name: "Projects", url: "/projects" },
];

export default async function ProjectsPage() {
  // Fetch projects dan tags dari Contentful dengan parallel requests
  const [allProjects, { tags, categories }] = await Promise.all([
    getProjects(),
    getTagsWithCategories(),
  ]);

  return (
    <>
      {/* JSON-LD Breadcrumb */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdBreadcrumb(breadcrumbItems)),
        }}
      />

      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-2">
          {/* Hero Section */}
          <div className="mb-12 space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold dark:text-neutral-100">
              All Projects
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl">
              A collection of projects I&apos;ve worked on, reflecting my
              journey in learning, building, and creating through technology.
            </p>
          </div>

          {/* Projects Grid Component */}
          <ProjectsGrid
            projects={allProjects}
            availableTags={tags}
            tagCategories={categories}
          />
        </div>
        <Footer />
      </div>
    </>
  );
}
