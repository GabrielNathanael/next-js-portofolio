// components\sections\Hero.tsx
// components/sections/Hero.tsx
"use client";

import { MailOpen, Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Profile } from "@/lib/contentful/types";
import { useIsMobile } from "@/hooks/useIsMobile";

interface HeroProps {
  profile: Profile | null;
}

export default function Hero({ profile }: HeroProps) {
  const isMobile = useIsMobile();
  const photoUrl = profile?.photo || "/images/avatarful.webp";
  const resumeUrl = profile?.resume;

  const handleDownloadResume = () => {
    if (resumeUrl) {
      window.open(resumeUrl, "_blank");
    }
  };

  return (
    <section className="min-h-screen w-full bg-gray-50 dark:bg-neutral-950 relative">
      {/* Light Mode Grid */}
      <div
        className="absolute inset-0 z-0 dark:hidden"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e2e8f0 1px, transparent 1px),
            linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
          `,
          backgroundSize: "20px 30px",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
        }}
      />

      {/* Dark Mode Grid */}
      <div
        className="absolute inset-0 z-0 hidden dark:block"
        style={{
          backgroundImage: `
            linear-gradient(to right, #505050 1px, transparent 1px),
            linear-gradient(to bottom, #505050 1px, transparent 1px)
          `,
          backgroundSize: "22px 32px",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center px-4 pt-20 pb-16 min-h-screen">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Text */}
            {isMobile ? (
              <div className="space-y-6">
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-6xl font-bold from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 bg-clip-text text-transparent bg-linear-to-r">
                    <span className="block text-lg md:text-xl font-semibold mb-2">
                      Hi, I&apos;m
                    </span>
                    Gabriel Nathanael
                  </h1>

                  <div className="text-2xl md:text-3xl font-semibold text-neutral-700 dark:text-neutral-200 min-h-12">
                    <TypeAnimation
                      sequence={[
                        "Full Stack Developer",
                        2000,
                        "Cloud Enthusiast",
                        2000,
                        "Student",
                        2000,
                      ]}
                      wrapper="span"
                      speed={50}
                      repeat={Infinity}
                      cursor={true}
                    />
                  </div>
                </div>

                <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-xl text-justify">
                  From concept to production — solving challenges through
                  thoughtful code.
                </p>

                <div className="flex flex-wrap gap-4 pt-4 justify-center lg:justify-start">
                  <Link href="/#contact">
                    <Button variant="primary" size="lg" className="group">
                      Contact Me
                      <MailOpen className="w-5 h-5 ml-2 group-hover:animate-bounce transition-transform" />
                    </Button>
                  </Link>

                  {resumeUrl && (
                    <Button
                      variant="ghost"
                      size="lg"
                      className="group hover:bg-gray-100 dark:hover:bg-neutral-900"
                      onClick={handleDownloadResume}
                    >
                      <Download className="w-5 h-5 mr-2 group-hover:animate-bounce transition-transform" />
                      Get my Resume
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="text-4xl md:text-6xl font-bold from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 bg-clip-text text-transparent bg-linear-to-r"
                  >
                    <span className="block text-lg md:text-xl font-semibold mb-2">
                      Hi, I&apos;m
                    </span>
                    Gabriel Nathanael
                  </motion.h1>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="text-2xl md:text-3xl font-semibold text-neutral-700 dark:text-neutral-200 min-h-12"
                  >
                    <TypeAnimation
                      sequence={[
                        "Full Stack Developer",
                        2000,
                        "Cloud Enthusiast",
                        2000,
                        "Student",
                        2000,
                      ]}
                      wrapper="span"
                      speed={50}
                      repeat={Infinity}
                      cursor={true}
                    />
                  </motion.div>
                </div>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="text-lg text-neutral-600 dark:text-neutral-400 max-w-xl text-justify"
                >
                  From concept to production — solving challenges through
                  thoughtful code.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="flex flex-wrap gap-4 pt-4 justify-center lg:justify-start"
                >
                  <Link href="/#contact">
                    <Button variant="primary" size="lg" className="group">
                      Contact Me
                      <MailOpen className="w-5 h-5 ml-2 group-hover:animate-bounce transition-transform" />
                    </Button>
                  </Link>

                  {resumeUrl && (
                    <Button
                      variant="ghost"
                      size="lg"
                      className="group hover:bg-gray-100 dark:hover:bg-neutral-900"
                      onClick={handleDownloadResume}
                    >
                      <Download className="w-5 h-5 mr-2 group-hover:animate-bounce transition-transform" />
                      Get my Resume
                    </Button>
                  )}
                </motion.div>
              </motion.div>
            )}

            {/* Right Image */}
            {isMobile ? (
              <div className="relative">
                <div className="relative w-full aspect-square max-w-sm mx-auto">
                  {/* Image with fetchPriority="high" */}
                  <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-neutral-800 shadow-2xl">
                    <Image
                      src={photoUrl}
                      alt="Profile"
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 384px"
                      className="object-cover"
                      priority
                      fetchPriority="high"
                    />
                  </div>

                  {/* Static lights for mobile */}
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-blue-500 rounded-full blur-2xl opacity-30 dark:opacity-20" />
                  <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-violet-500 rounded-full blur-2xl opacity-30 dark:opacity-20" />
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                  delay: 0.3,
                }}
                className="relative"
              >
                <div className="relative w-full aspect-square max-w-sm mx-auto">
                  {/* Gradient Glow - desktop only */}
                  <div className="absolute inset-0 bg-linear-to-br from-blue-500 via-violet-500 to-purple-500 rounded-full blur-3xl opacity-30 animate-pulse dark:opacity-20" />

                  {/* Image with fetchPriority="high" */}
                  <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-neutral-800 shadow-2xl">
                    <Image
                      src={photoUrl}
                      alt="Profile"
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 384px"
                      className="object-cover"
                      priority
                      fetchPriority="high"
                    />
                  </div>

                  {/* Floating Lights - desktop only */}
                  <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute -top-4 -right-4 w-16 h-16 bg-blue-500 rounded-full blur-2xl opacity-40 dark:opacity-30"
                  />
                  <motion.div
                    animate={{ y: [0, 20, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute -bottom-4 -left-4 w-20 h-20 bg-violet-500 rounded-full blur-2xl opacity-40 dark:opacity-30"
                  />
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
