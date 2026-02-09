// components\sections\Hero.tsx
// components/sections/Hero.tsx
"use client";

import { MailOpen, Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Profile } from "@/lib/contentful/types";
import { useIsMobile } from "@/hooks/useIsMobile";

interface HeroProps {
  profile: Profile | null;
}

export default function Hero({ profile }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const photoUrl = profile?.photo || "/images/avatarful.webp";
  const resumeUrl = profile?.resume;

  // Parallax Values
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yGrid = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0px", "200px"]);
  const yImage = useTransform(scrollYProgress, [0, 1], ["0px", "150px"]);
  const yDots1 = useTransform(scrollYProgress, [0, 1], ["0px", "-250px"]);
  const yDots2 = useTransform(scrollYProgress, [0, 1], ["0px", "-180px"]);
  const yDots3 = useTransform(scrollYProgress, [0, 1], ["0px", "-120px"]);
  const yDots4 = useTransform(scrollYProgress, [0, 1], ["0px", "-200px"]);

  const handleDownloadResume = () => {
    if (resumeUrl) {
      window.open(resumeUrl, "_blank");
    }
  };

  return (
    <section
      ref={containerRef}
      className="min-h-screen w-full bg-gray-50 dark:bg-neutral-950 relative overflow-hidden"
    >
      {/* Light Mode Grid */}
      <motion.div
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
          y: !isMobile ? yGrid : 0,
        }}
      />

      {/* Dark Mode Grid */}
      <motion.div
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
          y: !isMobile ? yGrid : 0,
          opacity: 0.3,
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
                  <h1 className="font-heading text-4xl md:text-6xl font-bold from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 bg-clip-text text-transparent bg-linear-to-r">
                    <motion.span
                      layoutId="gabriel-name"
                      transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 20,
                      }}
                      className="inline-block whitespace-nowrap"
                    >
                      Gabriel Nathanael
                    </motion.span>
                  </h1>
                  <div className="font-heading text-2xl md:text-3xl font-semibold text-neutral-700 dark:text-neutral-200 min-h-12">
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

                <p className="font-body text-lg text-neutral-600 dark:text-neutral-400 max-w-xl text-justify">
                  From concept to production, solving challenges through
                  thoughtful codes.
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
                style={{ y: yText }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <h1 className="font-heading text-4xl md:text-6xl font-bold from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 bg-clip-text text-transparent bg-linear-to-r">
                    <motion.span
                      layoutId="gabriel-name"
                      transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 20,
                      }}
                      className="inline-block whitespace-nowrap"
                    >
                      Gabriel Nathanael
                    </motion.span>
                  </h1>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="font-heading text-2xl md:text-3xl font-semibold text-neutral-700 dark:text-neutral-200 min-h-12"
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
                  className="font-body text-lg text-neutral-600 dark:text-neutral-400 max-w-xl text-justify"
                >
                  From concept to production, solving challenges through
                  thoughtful codes.
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
                  {/* Dots Pattern Container - Mobile */}
                  <div className="absolute inset-0 -m-8">
                    {/* Top Right Dots - Mobile */}
                    <div className="absolute top-0 right-0 w-20 h-20">
                      <svg width="100%" height="100%" viewBox="0 0 100 100">
                        <defs>
                          <linearGradient
                            id="dots-gradient-1-mobile"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                          >
                            <stop
                              offset="0%"
                              stopColor="#3b82f6"
                              stopOpacity="0.5"
                            />
                            <stop
                              offset="100%"
                              stopColor="#06b6d4"
                              stopOpacity="0.2"
                            />
                          </linearGradient>
                        </defs>
                        {Array.from({ length: 4 }).map((_, row) =>
                          Array.from({ length: 4 }).map((_, col) => (
                            <circle
                              key={`tr-m-${row}-${col}`}
                              cx={15 + col * 23}
                              cy={15 + row * 23}
                              r="2"
                              fill="url(#dots-gradient-1-mobile)"
                            />
                          )),
                        )}
                      </svg>
                    </div>

                    {/* Top Left Dots - Mobile */}
                    <div className="absolute top-4 left-0 w-16 h-16">
                      <svg width="100%" height="100%" viewBox="0 0 100 100">
                        <defs>
                          <linearGradient
                            id="dots-gradient-2-mobile"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                          >
                            <stop
                              offset="0%"
                              stopColor="#8b5cf6"
                              stopOpacity="0.5"
                            />
                            <stop
                              offset="100%"
                              stopColor="#a855f7"
                              stopOpacity="0.2"
                            />
                          </linearGradient>
                        </defs>
                        {Array.from({ length: 3 }).map((_, row) =>
                          Array.from({ length: 3 }).map((_, col) => (
                            <circle
                              key={`tl-m-${row}-${col}`}
                              cx={20 + col * 30}
                              cy={20 + row * 30}
                              r="2.5"
                              fill="url(#dots-gradient-2-mobile)"
                            />
                          )),
                        )}
                      </svg>
                    </div>

                    {/* Bottom Right Dots - Mobile */}
                    <div className="absolute bottom-0 right-4 w-18 h-18">
                      <svg width="100%" height="100%" viewBox="0 0 100 100">
                        <defs>
                          <linearGradient
                            id="dots-gradient-3-mobile"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                          >
                            <stop
                              offset="0%"
                              stopColor="#06b6d4"
                              stopOpacity="0.5"
                            />
                            <stop
                              offset="100%"
                              stopColor="#8b5cf6"
                              stopOpacity="0.2"
                            />
                          </linearGradient>
                        </defs>
                        {Array.from({ length: 3 }).map((_, row) =>
                          Array.from({ length: 3 }).map((_, col) => (
                            <circle
                              key={`br-m-${row}-${col}`}
                              cx={25 + col * 25}
                              cy={25 + row * 25}
                              r="2"
                              fill="url(#dots-gradient-3-mobile)"
                            />
                          )),
                        )}
                      </svg>
                    </div>

                    {/* Bottom Left Dots - Mobile */}
                    <div className="absolute bottom-4 left-2 w-14 h-14">
                      <svg width="100%" height="100%" viewBox="0 0 100 100">
                        <defs>
                          <linearGradient
                            id="dots-gradient-4-mobile"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                          >
                            <stop
                              offset="0%"
                              stopColor="#d946ef"
                              stopOpacity="0.5"
                            />
                            <stop
                              offset="100%"
                              stopColor="#3b82f6"
                              stopOpacity="0.2"
                            />
                          </linearGradient>
                        </defs>
                        {Array.from({ length: 3 }).map((_, row) =>
                          Array.from({ length: 3 }).map((_, col) => (
                            <circle
                              key={`bl-m-${row}-${col}`}
                              cx={20 + col * 30}
                              cy={20 + row * 30}
                              r="2.5"
                              fill="url(#dots-gradient-4-mobile)"
                            />
                          )),
                        )}
                      </svg>
                    </div>
                  </div>

                  {/* Profile Image - Mobile */}
                  <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-neutral-800 shadow-2xl z-10">
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

                  {/* Subtle Radial Glow - Mobile */}
                  <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 via-violet-500/5 to-purple-500/5 rounded-full blur-2xl -z-10" />
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                style={{ y: yImage }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                  delay: 0.3,
                }}
                className="relative"
              >
                <div className="relative w-full aspect-square max-w-sm mx-auto">
                  {/* Dots Pattern Container - Desktop */}
                  <div className="absolute inset-0 -m-12">
                    {/* Top Right Dots */}
                    <motion.div
                      className="absolute top-0 right-0 w-32 h-32"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{ y: yDots1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <svg width="100%" height="100%" viewBox="0 0 100 100">
                        <defs>
                          <linearGradient
                            id="dots-gradient-1"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                          >
                            <stop
                              offset="0%"
                              stopColor="#3b82f6"
                              stopOpacity="0.6"
                            />
                            <stop
                              offset="100%"
                              stopColor="#06b6d4"
                              stopOpacity="0.3"
                            />
                          </linearGradient>
                        </defs>
                        {Array.from({ length: 6 }).map((_, row) =>
                          Array.from({ length: 6 }).map((_, col) => (
                            <motion.circle
                              key={`tr-${row}-${col}`}
                              cx={10 + col * 15}
                              cy={10 + row * 15}
                              r="2"
                              fill="url(#dots-gradient-1)"
                              initial={{ scale: 0 }}
                              animate={{ scale: [0, 1, 0.8, 1] }}
                              transition={{
                                delay: 0.6 + (row + col) * 0.05,
                                duration: 1,
                                repeat: Infinity,
                                repeatDelay: 3,
                              }}
                            />
                          )),
                        )}
                      </svg>
                    </motion.div>

                    {/* Top Left Dots */}
                    <motion.div
                      className="absolute top-8 left-0 w-24 h-24"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{ y: yDots2 }}
                      transition={{ delay: 0.6 }}
                    >
                      <svg width="100%" height="100%" viewBox="0 0 100 100">
                        <defs>
                          <linearGradient
                            id="dots-gradient-2"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                          >
                            <stop
                              offset="0%"
                              stopColor="#8b5cf6"
                              stopOpacity="0.6"
                            />
                            <stop
                              offset="100%"
                              stopColor="#a855f7"
                              stopOpacity="0.3"
                            />
                          </linearGradient>
                        </defs>
                        {Array.from({ length: 5 }).map((_, row) =>
                          Array.from({ length: 5 }).map((_, col) => (
                            <motion.circle
                              key={`tl-${row}-${col}`}
                              cx={15 + col * 18}
                              cy={15 + row * 18}
                              r="2.5"
                              fill="url(#dots-gradient-2)"
                              initial={{ scale: 0 }}
                              animate={{ scale: [0, 1, 0.8, 1] }}
                              transition={{
                                delay: 0.7 + (row + col) * 0.06,
                                duration: 1,
                                repeat: Infinity,
                                repeatDelay: 4,
                              }}
                            />
                          )),
                        )}
                      </svg>
                    </motion.div>

                    {/* Bottom Right Dots */}
                    <motion.div
                      className="absolute bottom-0 right-8 w-28 h-28"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{ y: yDots3 }}
                      transition={{ delay: 0.7 }}
                    >
                      <svg width="100%" height="100%" viewBox="0 0 100 100">
                        <defs>
                          <linearGradient
                            id="dots-gradient-3"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                          >
                            <stop
                              offset="0%"
                              stopColor="#06b6d4"
                              stopOpacity="0.6"
                            />
                            <stop
                              offset="100%"
                              stopColor="#8b5cf6"
                              stopOpacity="0.3"
                            />
                          </linearGradient>
                        </defs>
                        {Array.from({ length: 5 }).map((_, row) =>
                          Array.from({ length: 5 }).map((_, col) => (
                            <motion.circle
                              key={`br-${row}-${col}`}
                              cx={20 + col * 16}
                              cy={20 + row * 16}
                              r="2"
                              fill="url(#dots-gradient-3)"
                              initial={{ scale: 0 }}
                              animate={{ scale: [0, 1, 0.8, 1] }}
                              transition={{
                                delay: 0.8 + (row + col) * 0.04,
                                duration: 1,
                                repeat: Infinity,
                                repeatDelay: 3.5,
                              }}
                            />
                          )),
                        )}
                      </svg>
                    </motion.div>

                    {/* Bottom Left Dots */}
                    <motion.div
                      className="absolute bottom-8 left-4 w-20 h-20"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{ y: yDots4 }}
                      transition={{ delay: 0.8 }}
                    >
                      <svg width="100%" height="100%" viewBox="0 0 100 100">
                        <defs>
                          <linearGradient
                            id="dots-gradient-4"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                          >
                            <stop
                              offset="0%"
                              stopColor="#d946ef"
                              stopOpacity="0.6"
                            />
                            <stop
                              offset="100%"
                              stopColor="#3b82f6"
                              stopOpacity="0.3"
                            />
                          </linearGradient>
                        </defs>
                        {Array.from({ length: 4 }).map((_, row) =>
                          Array.from({ length: 4 }).map((_, col) => (
                            <motion.circle
                              key={`bl-${row}-${col}`}
                              cx={20 + col * 20}
                              cy={20 + row * 20}
                              r="2.5"
                              fill="url(#dots-gradient-4)"
                              initial={{ scale: 0 }}
                              animate={{ scale: [0, 1, 0.8, 1] }}
                              transition={{
                                delay: 0.9 + (row + col) * 0.05,
                                duration: 1,
                                repeat: Infinity,
                                repeatDelay: 4.5,
                              }}
                            />
                          )),
                        )}
                      </svg>
                    </motion.div>
                  </div>

                  {/* Profile Image - Desktop */}
                  <motion.div
                    className="relative w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-neutral-800 shadow-2xl z-10"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={photoUrl}
                      alt="Profile"
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 384px"
                      className="object-cover"
                      priority
                      fetchPriority="high"
                    />
                  </motion.div>

                  {/* Subtle Radial Glow - Desktop */}
                  <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 via-violet-500/5 to-purple-500/5 rounded-full blur-2xl -z-10" />
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
