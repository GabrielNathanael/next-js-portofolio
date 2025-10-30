// components\sections\TechStack.tsx
"use client";
import Card from "@/components/ui/Card";
import { techStack } from "@/lib/data/techstack";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Marquee from "react-fast-marquee";

export default function TechStack() {
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
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="space-y-6"
    >
      <h2 className="text-3xl font-bold bg-linear-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
        Technologies I’ve Worked With
      </h2>
      <p className="text-neutral-600 dark:text-neutral-400 max-w-xl text-justify">
        A collection of languages, frameworks, and tools I’ve used or explored
        throughout my studies, work experience, and personal projects.
      </p>

      <div className="space-y-4">
        {rows.map((row, rowIdx) => (
          <Marquee
            key={rowIdx}
            speed={70}
            gradient={true}
            gradientColor="#f8fafc"
            gradientWidth={50}
            direction={rowIdx % 2 === 0 ? "left" : "right"}
            pauseOnHover={true}
          >
            {[...row, ...row].map((tech, idx) => {
              const Icon = tech.icon;
              return (
                <div key={`${tech.name}-${idx}`} className="mx-2">
                  <Card className="p-6 flex flex-col items-center gap-3 text-center group cursor-pointer w-40">
                    <Icon
                      className={`w-12 h-12 ${tech.color} group-hover:scale-110 transition-transform`}
                    />
                    <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      {tech.name}
                    </span>
                  </Card>
                </div>
              );
            })}
          </Marquee>
        ))}
      </div>
    </motion.div>
  );
}
