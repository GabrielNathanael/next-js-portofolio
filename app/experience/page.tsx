// app\experience\page.tsx

import { experiences } from "@/lib/data/experience";
import ExperienceGrid from "@/components/sections/ExperienceGrid";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function ExperiencePage() {
  return (
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
  );
}
