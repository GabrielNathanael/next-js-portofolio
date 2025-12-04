// components\sections\TechStack.tsx
"use client";
import { techStack } from "@/lib/data/techstack";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Marquee from "react-fast-marquee";
import { useTheme } from "next-themes";

export default function TechStack() {
  const { theme } = useTheme();

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Split tech stack into rows (6 items per row)
  const itemsPerRow = 6;
  const rows: (typeof techStack)[] = [];
  for (let i = 0; i < techStack.length; i += itemsPerRow) {
    rows.push(techStack.slice(i, i + itemsPerRow));
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Title with slide animation */}
      <motion.h2
        initial={{ opacity: 0, x: -30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-3xl font-bold from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 bg-clip-text text-transparent bg-linear-to-r"
      >
        Technologies I&apos;ve Worked With
      </motion.h2>

      {/* Description with slide from right */}
      <motion.p
        initial={{ opacity: 0, x: 30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-neutral-600 dark:text-neutral-300 max-w-xl text-justify"
      >
        A collection of languages, frameworks, and tools I&apos;ve used or
        explored throughout my studies, work experience, and personal projects.
      </motion.p>

      {/* Marquee rows with staggered fade-in */}
      <div className="space-y-4">
        {rows.map((row, rowIdx) => (
          <motion.div
            key={rowIdx}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.7,
              delay: 0.3 + rowIdx * 0.15,
              ease: "easeOut",
            }}
          >
            <Marquee
              speed={70}
              gradient={true}
              gradientColor={
                theme === "dark"
                  ? "rgba(10, 10, 10, 1)"
                  : "rgba(248, 250, 252, 1)"
              }
              gradientWidth={50}
              direction={rowIdx % 2 === 0 ? "left" : "right"}
              pauseOnHover={true}
            >
              {[...row, ...row].map((tech, idx) => {
                const Icon = tech.icon;
                return (
                  <div
                    key={`${tech.name}-${idx}`}
                    className="mx-2 p-5 md:p-6 flex flex-col items-center gap-3 text-center group cursor-pointer w-28 md:w-36 lg:w-40 transition-all duration-300"
                  >
                    <Icon
                      className={`w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 ${tech.color} group-hover:scale-110 transition-transform duration-300`}
                    />
                    <span className="text-xs md:text-sm font-medium text-neutral-700 dark:text-neutral-200">
                      {tech.name}
                    </span>
                  </div>
                );
              })}
            </Marquee>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
