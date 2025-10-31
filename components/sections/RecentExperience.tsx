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
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 bg-clip-text text-transparent bg-linear-to-r">
          Work Experience
        </h2>
        {showViewAll && (
          <Link href="/experience">
            <Button variant="ghost" size="sm" className="group">
              View All
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        )}
      </div>

      {/* Single Experience Layout */}
      {isSingleExperience ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Card className="p-8 group" glass>
            <div className="space-y-5">
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
          </Card>
        </motion.div>
      ) : (
        // Multiple Experience Layout
        <div className="grid md:grid-cols-2 gap-6">
          {recentExperiences.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
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
