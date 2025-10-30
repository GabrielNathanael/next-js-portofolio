"use client";

import Card from "@/components/ui/Card";
import { techStack } from "@/lib/data/techstack";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function TechStack() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="space-y-6"
    >
      <h2 className="text-3xl font-bold bg-linear-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
        Tech Stack
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {techStack.map((tech, idx) => {
          const Icon = tech.icon;
          return (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
            >
              <Card className="p-6 flex flex-col items-center gap-3 text-center group cursor-pointer h-full">
                <Icon
                  className={`w-12 h-12 ${tech.color} group-hover:scale-110 transition-transform`}
                />
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  {tech.name}
                </span>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
