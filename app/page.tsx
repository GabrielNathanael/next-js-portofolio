// app/page.tsx
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import RecentExperience from "@/components/sections/RecentExperience";
import LatestCertificates from "@/components/sections/LatestCertificates";
import TechStack from "@/components/sections/TechStack";
import ContactForm from "@/components/sections/Contact";
import LoadingScreen from "@/components/ui/LoadingScreen";
import ClientWrapper from "@/components/layout/ClientWrapper";
import {
  getFeaturedProjects,
  getLatestCertificates,
  getRecentExperience,
  getProfile,
} from "@/lib/contentful/api";
import {
  siteConfig,
  jsonLdWebsite,
  jsonLdProfilePage,
  jsonLdBreadcrumb,
} from "@/lib/seo/config";
import type { Metadata } from "next";

// ISR: Revalidate every 6 hours (21600 seconds)
export const revalidate = 21600;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} - Full Stack Developer`,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author.name, url: siteConfig.author.url }],
  creator: siteConfig.creator,
  publisher: siteConfig.publisher,

  // Open Graph
  openGraph: {
    type: "profile",
    locale: siteConfig.locale,
    alternateLocale: siteConfig.alternateLocale,
    url: siteConfig.url,
    title: `${siteConfig.name} - Full Stack Developer`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Full Stack Developer`,
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} - Full Stack Developer`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@gabrielnp",
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

  const breadcrumb = jsonLdBreadcrumb([{ name: "Home", url: "/" }]);

  return (
    <>
      {/* Enhanced JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdProfilePage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <div className="bg-white dark:bg-neutral-950 min-h-screen">
        <LoadingScreen />
        <ClientWrapper>
          <Navbar />
          <main className="min-h-screen overflow-x-hidden">
            {/* Hero Section */}
            <Hero profile={profile} />

            {/* Main Content - WITH CONTAINER */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-32 md:space-y-12">
              {/* About Section */}
              <div className="w-full">
                <About />
              </div>

              {/* Experience */}
              {recentExperience && (
                <div className="w-full">
                  <RecentExperience experience={recentExperience} />
                </div>
              )}

              {/* Featured Projects */}
              <div className="w-full">
                <FeaturedProjects projects={featuredProjects} />
              </div>

              {/* Certificates */}
              <div className="w-full">
                <LatestCertificates certificates={latestCertificates} />
              </div>
            </section>

            {/* Tech Stack - FULL WIDTH MARQUEE */}
            <section className="w-full py-20">
              <TechStack />
            </section>

            {/* Contact Form - BACK TO CONTAINER */}
            <section className="relative w-full py-20">
              <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <ContactForm />
              </div>
            </section>
          </main>
          <Footer />
        </ClientWrapper>
      </div>
    </>
  );
}
