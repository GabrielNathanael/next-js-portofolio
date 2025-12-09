// app\certificates\page.tsx
// app/certificates/page.tsx
import CertificatesGrid from "@/components/sections/CertificatesGrid";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getCertificates } from "@/lib/contentful/api";
import { siteConfig, jsonLdBreadcrumb } from "@/lib/seo/config";
import type { Metadata } from "next";

// ISR: Revalidate every 6 hours (21600 seconds)
export const revalidate = 21600;

export const metadata: Metadata = {
  title: "Certificates",
  description:
    "Professional certifications and achievements of Gabriel Nathanael Purba in web development, full-stack technologies, and computer science. Committed to continuous learning and growth.",
  keywords: [
    ...siteConfig.keywords,
    "Certificates",
    "Certifications",
    "Professional Development",
    "Web Development Certificates",
    "Programming Certificates",
    "Technical Certifications",
    "Online Courses",
  ],

  openGraph: {
    title: `Certificates - ${siteConfig.name}`,
    description:
      "Professional certifications showcasing commitment to continuous learning in web development and technology.",
    url: `${siteConfig.url}/certificates`,
    type: "website",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `Certificates - ${siteConfig.name}`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: `Certificates - ${siteConfig.name}`,
    description:
      "Professional certifications showcasing commitment to continuous learning in web development.",
    images: [siteConfig.ogImage],
  },

  alternates: {
    canonical: `${siteConfig.url}/certificates`,
  },
};

const breadcrumbItems = [
  { name: "Home", url: "/" },
  { name: "Certificates", url: "/certificates" },
];

export default async function CertificatesPage() {
  // Fetch certificates dari Contentful
  const certificates = await getCertificates();

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
              <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-100">
                Certificates
              </h1>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl">
                A collection of certifications and achievements that represent
                my commitment to continuous learning and professional growth.
              </p>
            </div>
            <CertificatesGrid certificates={certificates} />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
