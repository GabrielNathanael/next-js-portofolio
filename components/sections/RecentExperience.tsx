"use client";

import Link from "next/link";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { experiences } from "@/lib/data/experience";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function RecentExperience() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const recentExperiences = experiences.slice(0, 2);
  const showViewAll = experiences.length > 2;
  const isSingleExperience = recentExperiences.length === 1;

  const getEmploymentTypeColor = (type: string) => {
    switch (type) {
      case "Full-time":
        return "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300";
      case "Internship":
        return "bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300";
      case "Part-time":
        return "bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300";
      case "Contract":
        return "bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300";
      case "Freelance":
        return "bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300";
      default:
        return "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300";
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
      className="space-y-6 relative"
    >
      {/* Decorative floating blob - background accent */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 0.15, scale: 1 } : {}}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full blur-3xl pointer-events-none"
      />

      {/* Header with decorative bar */}
      <div className="flex items-center justify-between relative">
        <motion.h2
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl font-bold from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 bg-clip-text text-transparent bg-linear-to-r"
        >
          Work Experience
        </motion.h2>

        {showViewAll && (
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href="/experience">
              <Button variant="ghost" size="sm" className="group">
                View All
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        )}
      </div>

      {/* Single Experience Layout */}
      {isSingleExperience ? (
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, x: -40, y: 20 }}
            animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          >
            <Card className="p-8 group relative overflow-hidden" glass>
              {/* Decorative timeline marker */}
              <motion.div
                initial={{ height: 0 }}
                animate={inView ? { height: "100%" } : {}}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                className="absolute left-0 top-0 w-1 bg-gradient-to-b from-blue-500 via-cyan-400 to-transparent"
              />

              <div className="space-y-5 pl-4">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">
                      {recentExperiences[0].position}
                    </h3>
                    <p className="text-lg text-neutral-600 dark:text-neutral-300 font-medium">
                      {recentExperiences[0].company}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {!recentExperiences[0].endDate && (
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
                        <div className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full animate-pulse" />
                        Current
                      </div>
                    )}
                    <div
                      className={`px-3 py-1.5 rounded-full text-sm font-medium ${getEmploymentTypeColor(
                        recentExperiences[0].employmentType
                      )}`}
                    >
                      {recentExperiences[0].employmentType}
                    </div>
                  </div>
                </div>

                {/* Date & Location */}
                <div className="flex flex-wrap gap-4 text-sm text-neutral-600 dark:text-neutral-300">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span className="font-medium">
                      {recentExperiences[0].startDate} –{" "}
                      {recentExperiences[0].endDate || "Present"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span className="font-medium">
                      {recentExperiences[0].location}
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-neutral-200 dark:border-neutral-700" />

                {/* Description */}
                <p className="text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {recentExperiences[0].description}
                </p>

                {/* Technologies */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-200 uppercase tracking-wide">
                    Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {recentExperiences[0].technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 text-sm font-medium bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-lg hover:scale-105 transition-transform"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom right decorative accent */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 0.5, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-tl from-cyan-400 to-blue-500 rounded-full blur-2xl"
              />
            </Card>
          </motion.div>
        </div>
      ) : (
        // Multiple Experience Layout with alternating animations
        <div className="grid md:grid-cols-2 gap-6">
          {recentExperiences.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{
                opacity: 0,
                x: idx % 2 === 0 ? -40 : 40,
                y: 20,
              }}
              animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.3 + idx * 0.15,
                ease: "easeOut",
              }}
              className="relative"
            >
              {/* Small decorative dot per card */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.5 + idx * 0.15,
                  type: "spring",
                  stiffness: 200,
                }}
                className={`absolute ${
                  idx % 2 === 0
                    ? "-top-4 -left-4" // Card pertama → kiri atas
                    : "bottom-6 right-2" // Card kedua → bawah kanan tapi gak mepet
                } w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full blur-xl opacity-70`}
              />

              <Card className="p-6 h-full space-y-4 group" glass>
                <div className="flex flex-col space-y-1">
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {exp.position}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-300 font-medium">
                    {exp.company}
                  </p>
                  <div className="mt-2">
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-medium ${getEmploymentTypeColor(
                        exp.employmentType
                      )}`}
                    >
                      {exp.employmentType}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 text-sm text-neutral-600 dark:text-neutral-300">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {exp.startDate} – {exp.endDate || "Present"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{exp.location}</span>
                  </div>
                </div>

                <p className="text-neutral-600 dark:text-neutral-300 line-clamp-3">
                  {exp.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {exp.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
