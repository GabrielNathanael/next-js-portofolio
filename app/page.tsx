import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import RecentExperience from "@/components/sections/RecentExperience";
import LatestCertificates from "@/components/sections/LatestCertificates";
import TechStack from "@/components/sections/TechStack";
import Contact from "@/components/sections/Contact";
import SocialLinks from "@/components/sections/SocialLinks";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        {/* Hero Section */}
        <Hero />

        {/* Main Content */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-12">
          {/* About Section - Full Width */}
          <div className="w-full">
            <About />
          </div>

          {/* Experience - Responsive Grid */}
          <div className="w-full">
            <RecentExperience />
          </div>

          {/* Featured Projects - Full Width */}
          <div className="w-full">
            <FeaturedProjects />
          </div>

          {/* Certificates - 3 Columns */}
          <div className="w-full">
            <LatestCertificates />
          </div>

          {/* Tech Stack - Full Width dengan Grid */}
          <div className="w-full">
            <TechStack />
          </div>

          {/* Contact Form + Social Links */}
          <div className="grid lg:grid-cols-2 gap-8">
            <Contact />
            <SocialLinks />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
