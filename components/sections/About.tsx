// components\sections\About.tsx
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
            Hi, I’m Gabriel — a full-stack web developer and Computer Science
            student at Universitas Pendidikan Ganesha (Undiksha), based in Bali,
            Indonesia. I specialize in building modern, scalable web
            applications using technologies like Next.js, React, Laravel, and
            TypeScript.
          </p>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
            I enjoy working across the full stack — from crafting clean,
            responsive interfaces to developing robust backend logic and API
            integrations. My focus is on creating seamless, high-quality user
            experiences supported by efficient and maintainable codebases.
          </p>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Beyond development, I’m passionate about learning new technologies
            and exploring topics like cybersecurity, performance optimization,
            and cloud deployment to continually sharpen my skills and build
            better digital products.
          </p>
        </div>
      </Card>
    </motion.div>
  );
}
