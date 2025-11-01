// app/experience/page.tsx
import ExperienceGrid from "@/components/sections/ExperienceGrid";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getExperiences } from "@/lib/contentful/api";
import { siteConfig, jsonLdBreadcrumb } from "@/lib/seo/config";
import type { Metadata } from "next";

// ISR: Revalidate every 1 hour (3600 seconds)
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Work Experience",
  description:
    "Professional journey of Gabriel Nathanael Purba as a Full Stack Web Developer. Explore my work experience, technical expertise, and impactful projects in web development.",
  keywords: [
    ...siteConfig.keywords,
    "Work Experience",
    "Professional Experience",
    "Software Engineer Experience",
    "Web Developer Career",
    "Full Stack Career",
    "Tech Career",
  ],

  openGraph: {
    title: `Work Experience | ${siteConfig.name}`,
    description:
      "Professional journey and impactful projects as a Full Stack Web Developer specializing in Next.js and React.",
    url: `${siteConfig.url}/experience`,
    type: "website",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `Work Experience - ${siteConfig.name}`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: `Work Experience | ${siteConfig.name}`,
    description:
      "Professional journey and impactful projects as a Full Stack Web Developer.",
    images: [siteConfig.ogImage],
  },

  alternates: {
    canonical: `${siteConfig.url}/experience`,
  },
};

const breadcrumbItems = [
  { name: "Home", url: "/" },
  { name: "Work Experience", url: "/experience" },
];

export default async function ExperiencePage() {
  // Fetch experiences dari Contentful
  const experiences = await getExperiences();

  return (
    <>
      {/* JSON-LD Breadcrumb */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdBreadcrumb(breadcrumbItems)),
        }}
      />

      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="grow pt-20 pb-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl font-bold dark:text-neutral-100">
                Work Experience
              </h1>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl">
                My professional journey and the impactful projects I&apos;ve
                contributed to. Each role has shaped my skills and passion for
                building great software.
              </p>
            </div>
            <ExperienceGrid experiences={experiences} />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
