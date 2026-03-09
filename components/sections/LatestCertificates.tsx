// components/sections/LatestCertificates.tsx
"use client";

import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import "./LatestCertificates.module.css";
import { Certificate } from "@/lib/contentful/types";

interface LatestCertificatesProps {
  certificates: Certificate[];
}

const TIME_AUTO_NEXT = 7000;

export default function LatestCertificates({
  certificates,
}: LatestCertificatesProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const autoNextRef = useRef<NodeJS.Timeout | null>(null);

  const resetProgress = useCallback(() => {
    const bar = progressRef.current;
    if (!bar) return;
    bar.style.animation = "none";
    void bar.offsetHeight; // force reflow
    bar.style.animation = `certProgress ${TIME_AUTO_NEXT / 1000}s linear 1 forwards`;
  }, []);

  const showSlider = useCallback(
    function handleSlider(type: "next" | "prev") {
      const list = listRef.current;
      const carousel = carouselRef.current;
      if (!list || !carousel) return;

      const items = list.querySelectorAll<HTMLDivElement>(".cert-item");

      if (type === "next") {
        list.appendChild(items[0]);
      } else {
        list.prepend(items[items.length - 1]);
      }

      resetProgress();

      // Schedule next slide using the internal function name
      if (autoNextRef.current) clearTimeout(autoNextRef.current);
      autoNextRef.current = setTimeout(
        () => handleSlider("next"),
        TIME_AUTO_NEXT,
      );
    },
    [resetProgress],
  );

  useEffect(() => {
    resetProgress();

    // Start initial timer
    if (autoNextRef.current) clearTimeout(autoNextRef.current);
    autoNextRef.current = setTimeout(() => showSlider("next"), TIME_AUTO_NEXT);

    const currentAutoNext = autoNextRef.current;
    return () => {
      if (currentAutoNext) clearTimeout(currentAutoNext);
    };
  }, [resetProgress, showSlider]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <motion.h2
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold bg-linear-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 bg-clip-text text-transparent"
        >
          Highlighted Certifications
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Link
            href="/certificates"
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 group"
          >
            View All
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>

      {/* Carousel — breaks out of parent container */}
      <div className="-mx-4 sm:-mx-6 md:mx-0">
        <div
          ref={carouselRef}
          className="cert-carousel relative w-full overflow-hidden rounded-none md:rounded-2xl bg-neutral-100 dark:bg-neutral-900"
        >
          {/* Progress bar */}
          <div className="absolute top-0 left-0 right-0 h-0.75 z-40 bg-black/10 dark:bg-white/10">
            <div ref={progressRef} className="h-full bg-blue-500" />
          </div>

          {/* Slide list — DOM manipulation target */}
          <div ref={listRef} className="absolute inset-0">
            {certificates.map((cert, i) => (
              <div
                key={cert.title}
                className="cert-item absolute overflow-hidden bg-neutral-200 dark:bg-neutral-800"
              >
                {/* Image */}
                <div className="relative w-full h-full">
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    className="cert-img"
                    sizes="(max-width: 768px) 100vw, 80vw"
                    priority={i < 2}
                  />
                </div>

                {/* Content — only visible when item is nth-child(2) via CSS */}
                <div className="cert-content absolute inset-0 z-10 pointer-events-none">
                  <div className="absolute bottom-16 left-6 md:left-10 space-y-1">
                    <span className="cert-year block text-[11px] font-bold tracking-[0.2em] uppercase text-blue-400">
                      {cert.year}
                    </span>
                    <h3 className="cert-title text-base md:text-lg font-extrabold text-white leading-snug max-w-xs line-clamp-3">
                      {cert.title}
                    </h3>
                    <p className="cert-issuer text-xs text-white/60 font-medium">
                      {cert.issuer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Nav buttons */}
          <div className="absolute bottom-5 left-6 md:left-10 z-30 flex items-center gap-2">
            <button
              onClick={() => showSlider("prev")}
              aria-label="Previous certificate"
              className="w-9 h-9 rounded-full bg-white/90 dark:bg-neutral-800/90 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500 text-neutral-900 dark:text-white flex items-center justify-center transition-colors duration-200 shadow-md backdrop-blur-sm"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => showSlider("next")}
              aria-label="Next certificate"
              className="w-9 h-9 rounded-full bg-white/90 dark:bg-neutral-800/90 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500 text-neutral-900 dark:text-white flex items-center justify-center transition-colors duration-200 shadow-md backdrop-blur-sm"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
