// app/page.tsx
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import RecentExperience from "@/components/sections/RecentExperience";
import LatestCertificates from "@/components/sections/LatestCertificates";
import TechStack from "@/components/sections/TechStack";
import {
  getFeaturedProjects,
  getLatestCertificates,
  getRecentExperience,
  getProfile,
} from "@/lib/contentful/api";
import { siteConfig, jsonLdWebsite, jsonLdPerson } from "@/lib/seo/config";
import type { Metadata } from "next";

// ISR: Revalidate every 1 hour (3600 seconds)
export const revalidate = 3600;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Full Stack Web Developer`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author.name, url: siteConfig.author.url }],
  creator: siteConfig.creator,
  publisher: siteConfig.publisher,

  // Open Graph
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    alternateLocale: siteConfig.alternateLocale,
    url: siteConfig.url,
    title: `${siteConfig.name} | Full Stack Web Developer`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Full Stack Web Developer`,
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Full Stack Web Developer`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@gabrielnathanaelp",
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Alternate languages
  alternates: {
    canonical: siteConfig.url,
    languages: {
      "en-US": siteConfig.url,
      "id-ID": siteConfig.url,
    },
  },

  // Additional
  category: "technology",
};

export default async function Home() {
  // Fetch data dari Contentful dengan parallel requests
  const [featuredProjects, latestCertificates, recentExperience, profile] =
    await Promise.all([
      getFeaturedProjects(),
      getLatestCertificates(),
      getRecentExperience(),
      getProfile(),
    ]);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
      />

      <div className="bg-white dark:bg-neutral-950 min-h-screen">
        <Navbar />
        <main className="min-h-screen overflow-x-hidden">
          {/* Hero Section */}
          <Hero profile={profile} />

          {/* Main Content */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-12">
            {/* About Section - Full Width */}
            <div className="w-full">
              <About />
            </div>

            {/* Experience - Responsive Grid */}
            {recentExperience && (
              <div className="w-full">
                <RecentExperience experience={recentExperience} />
              </div>
            )}

            {/* Featured Projects - Full Width */}
            <div className="w-full">
              <FeaturedProjects projects={featuredProjects} />
            </div>

            {/* Certificates - 3 Columns */}
            <div className="w-full">
              <LatestCertificates certificates={latestCertificates} />
            </div>

            {/* Tech Stack - Full Width dengan Grid */}
            <div className="w-full">
              <TechStack />
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
