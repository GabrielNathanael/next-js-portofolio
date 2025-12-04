// components\sections\About.tsx
"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { SiGithub, SiInstagram, SiLinkedin } from "react-icons/si";
import { SiGmail } from "react-icons/si";
import { useIsMobile } from "@/hooks/useIsMobile";

const socials = [
  {
    name: "GitHub",
    icon: SiGithub,
    href: "https://github.com/GabrielNathanael",
  },
  {
    name: "Instagram",
    icon: SiInstagram,
    href: "https://instagram.com/gabrielnathanaelp",
  },
  {
    name: "LinkedIn",
    icon: SiLinkedin,
    href: "https://www.linkedin.com/in/gabriel-nathanael-purba-549273376/",
  },
  {
    name: "Email",
    icon: SiGmail,
    href: "mailto:gabrielnathanael81@gmail.com",
  },
];

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const isMobile = useIsMobile();

  return (
    <div
      className="min-h-screen bg-white dark:bg-neutral-950 py-20 px-4 sm:px-6 lg:px-8 mt-4 relative"
      ref={ref}
    >
      {/* Decorative blobs - desktop only */}
      {!isMobile && (
        <>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 0.06, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="absolute -top-40 -left-40 w-96 h-96 bg-linear-to-br from-blue-400 to-cyan-500 rounded-full blur-3xl pointer-events-none"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 0.06, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute -bottom-40 -right-40 w-96 h-96 bg-linear-to-tl from-cyan-400 to-blue-500 rounded-full blur-3xl pointer-events-none"
          />
        </>
      )}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Grid Container */}
        <div className="grid grid-cols-12 gap-6 lg:gap-8">
          {/* About Me Title - Slide from Left */}
          <motion.div
            className="col-span-12 lg:col-span-6"
            initial={{ opacity: 0, x: isMobile ? -20 : -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: isMobile ? 0.5 : 0.8, ease: "easeOut" }}
          >
            <h2 className="text-6xl lg:text-8xl font-black tracking-tight">
              <span className="bg-linear-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 bg-clip-text text-transparent">
                About
              </span>
              <br />
              <span className="text-neutral-900 dark:text-white">Me</span>
            </h2>
          </motion.div>

          {/* Let's Connect (desktop position only) - Slide from Right */}
          <motion.div
            className="hidden lg:block col-span-12 lg:col-span-6 lg:col-start-7"
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          >
            <div className="lg:text-right">
              <h3 className="text-4xl lg:text-5xl font-bold tracking-tight mb-8">
                <span className="text-neutral-400 dark:text-neutral-600">
                  Let&apos;s
                </span>
                <br />
                <span className="bg-linear-to-r from-cyan-500 to-blue-600 dark:from-cyan-300 dark:to-blue-400 bg-clip-text text-transparent">
                  Connect
                </span>
              </h3>

              <div className="flex gap-6 justify-start lg:justify-end">
                {socials.map((social, idx) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                      animate={
                        inView ? { opacity: 1, scale: 1, rotate: 0 } : {}
                      }
                      transition={{
                        duration: 0.6,
                        delay: 0.4 + idx * 0.1,
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                      }}
                      whileHover={{
                        rotate: 8,
                        y: -3,
                        transition: { duration: 0.3, ease: "easeOut" },
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="transition-all duration-300"
                      title={social.name}
                    >
                      <Icon className="w-8 h-8 lg:w-10 lg:h-10 text-neutral-700 dark:text-neutral-300" />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* First Paragraph - Slide from Left */}
          <motion.div
            className="col-span-12 lg:col-span-6 lg:col-start-1 lg:mt-4"
            initial={{ opacity: 0, x: isMobile ? -15 : -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: isMobile ? 0.5 : 0.7,
              delay: isMobile ? 0.15 : 0.3,
              ease: "easeOut",
            }}
          >
            <p className="text-lg lg:text-[1.1rem] text-neutral-700 dark:text-neutral-300 leading-relaxed max-w-2xl">
              Hey, I&apos;m Gabriel — a full-stack developer and Computer
              Science student at Universitas Pendidikan Ganesha (Undiksha) in
              Bali. I focus on building clean, scalable web applications using
              technologies like Next.js, React, Laravel, and TypeScript.
            </p>
          </motion.div>

          {/* Second Paragraph - Slide from Right with decorative bar */}
          <motion.div
            className="col-span-12 lg:col-span-5 lg:col-start-7 lg:mt-36"
            initial={{ opacity: 0, x: isMobile ? 15 : 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: isMobile ? 0.5 : 0.7,
              delay: isMobile ? 0.25 : 0.5,
              ease: "easeOut",
            }}
          >
            <div className="relative pl-6">
              <motion.div
                className="absolute left-0 top-1 w-[3px] h-14 bg-linear-to-b from-blue-500 to-cyan-400 dark:from-blue-400 dark:to-cyan-300 rounded-full"
                initial={{ height: 0, opacity: 0 }}
                animate={inView ? { height: 56, opacity: 1 } : {}}
                transition={{
                  duration: isMobile ? 0.6 : 0.8,
                  delay: isMobile ? 0.35 : 0.7,
                  ease: "easeOut",
                }}
              />
              <p className="text-lg lg:text-[1.05rem] text-neutral-700 dark:text-neutral-300 leading-relaxed max-w-md">
                I work across the full stack — from crafting responsive,
                user-focused interfaces to developing solid backend logic and
                API integrations. My goal is to deliver high-quality digital
                experiences supported by efficient and maintainable code.
              </p>
            </div>
          </motion.div>

          {/* Third Paragraph - Slide from Left Bottom */}
          <motion.div
            className="col-span-12 lg:col-span-5 lg:col-start-2 lg:mt-10"
            initial={{
              opacity: 0,
              x: isMobile ? -15 : -40,
              y: isMobile ? 10 : 20,
            }}
            animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{
              duration: isMobile ? 0.5 : 0.7,
              delay: isMobile ? 0.35 : 0.7,
              ease: "easeOut",
            }}
          >
            <p className="text-lg lg:text-[1.05rem] text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-lg italic">
              I&apos;m also passionate about exploring new technologies,
              especially in areas like cloud deployment, performance
              optimization, and cybersecurity to keep improving as a developer.
            </p>
          </motion.div>

          {/* Let's Connect (mobile position) - Fade + Scale Up */}
          <motion.div
            className="col-span-12 block lg:hidden mt-12"
            initial={{
              opacity: 0,
              y: isMobile ? 20 : 40,
              scale: isMobile ? 0.98 : 0.95,
            }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{
              duration: isMobile ? 0.5 : 0.7,
              delay: isMobile ? 0.4 : 0.8,
              ease: "easeOut",
            }}
          >
            <div className="text-center">
              <h3 className="text-4xl font-bold tracking-tight mb-6">
                <span className="text-neutral-400 dark:text-neutral-600">
                  Let&apos;s
                </span>{" "}
                <span className="bg-linear-to-r from-cyan-500 to-blue-600 dark:from-cyan-300 dark:to-blue-400 bg-clip-text text-transparent">
                  Connect
                </span>
              </h3>

              <div className="flex justify-center gap-6">
                {socials.map((social, idx) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{
                        opacity: 0,
                        scale: 0.5,
                        y: isMobile ? 10 : 20,
                      }}
                      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                      transition={{
                        duration: isMobile ? 0.5 : 0.6,
                        delay: (isMobile ? 0.5 : 0.9) + idx * 0.1,
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                      }}
                      whileHover={
                        !isMobile ? { scale: 1.15, y: -5 } : undefined
                      }
                      whileTap={{ scale: 0.95 }}
                      className="transition-all duration-300"
                      title={social.name}
                    >
                      <Icon className="w-8 h-8 text-neutral-700 dark:text-neutral-300" />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
