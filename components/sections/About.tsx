"use client";

import Card from "@/components/ui/Card";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <Card className="p-8 h-full" glass>
        <div className="space-y-4">
          <h2 className="text-3xl font-bold bg-linear-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
            I&apos;m a passionate full-stack developer with expertise in
            building modern web applications. With a strong foundation in both
            frontend and backend technologies, I specialize in creating scalable
            solutions that deliver exceptional user experiences.
          </p>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Currently working on innovative projects using Next.js, React, and
            cloud technologies. I love learning new technologies and solving
            complex problems.
          </p>
        </div>
      </Card>
    </motion.div>
  );
}
