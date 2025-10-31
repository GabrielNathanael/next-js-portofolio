// app/certificates/page.tsx
import { certificates } from "@/lib/data/certificates";
import CertificatesGrid from "@/components/sections/CertificatesGrid";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function CertificatesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="grow pt-20 pb-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-bold">Certificates</h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl">
              A collection of certifications and achievements that represent my
              commitment to continuous learning and professional growth.
            </p>
          </div>
          <CertificatesGrid certificates={certificates} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
