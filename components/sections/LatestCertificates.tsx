// components/sections/LatestCertificates.tsx
"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Certificate } from "@/lib/contentful/types";
import { useIsMobile } from "@/hooks/useIsMobile";
import gsap from "gsap";

interface LatestCertificatesProps {
  certificates: Certificate[];
}

export default function LatestCertificates({
  certificates,
}: LatestCertificatesProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const isMobile = useIsMobile();
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const currentCert = certificates[currentIndex];
  const prevIndex =
    (currentIndex - 1 + certificates.length) % certificates.length;
  const nextIndex = (currentIndex + 1) % certificates.length;

  // Navigation handlers
  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % certificates.length);
    setIsAutoPlaying(false);
  }, [certificates.length]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex(
      (prev) => (prev - 1 + certificates.length) % certificates.length,
    );
    setIsAutoPlaying(false);
  }, [certificates.length]);

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  // Auto-rotate carousel
  useEffect(() => {
    if (!isAutoPlaying || certificates.length <= 1) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % certificates.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, certificates.length]);

  // GSAP Smooth Slide Transition - card swap dengan momentum
  useEffect(() => {
    if (isMobile) return;

    const cards = cardsRef.current.filter(Boolean);
    if (cards.length === 0) return;

    const tl = gsap.timeline();

    // Determine slide direction
    const slideDirection = direction > 0 ? 1 : -1;

    // Animate outgoing card (current center becomes side)
    cards.forEach((card, idx) => {
      // Set initial states based on what card this will become
      if (idx === 1) {
        // This is the NEW center card (sliding in)
        gsap.set(card, {
          x: `${slideDirection * 100}%`,
          rotateY: slideDirection * -20,
          scale: 0.8,
          z: -300,
          opacity: 0,
          filter: "blur(4px)",
        });

        tl.to(
          card,
          {
            x: 0,
            rotateY: 0,
            scale: 1,
            z: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.8,
            ease: "power2.out",
          },
          0,
        );
      } else if (idx === 0) {
        // Previous/Left card - subtle positioning
        tl.to(
          card,
          {
            x: "-35%",
            rotateY: 15,
            scale: 0.85,
            z: -200,
            opacity: 0.5,
            filter: "blur(3px)",
            duration: 0.8,
            ease: "power2.out",
          },
          0,
        );
      } else if (idx === 2) {
        // Next/Right card - subtle positioning
        tl.to(
          card,
          {
            x: "35%",
            rotateY: -15,
            scale: 0.85,
            z: -200,
            opacity: 0.5,
            filter: "blur(3px)",
            duration: 0.8,
            ease: "power2.out",
          },
          0,
        );
      }
    });

    return () => {
      tl.kill();
    };
  }, [currentIndex, direction, isMobile]);

  // Swipe handlers for mobile
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) handleNext();
    if (touchStart - touchEnd < -75) handlePrev();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="space-y-12"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <motion.h2
          initial={{ opacity: 0, x: isMobile ? 0 : -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 bg-clip-text text-transparent"
        >
          Highlighted Certifications
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, x: isMobile ? 0 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 group"
          >
            View All
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>

      {/* Perspective Stack Carousel - Desktop */}
      {!isMobile ? (
        <div
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
          style={{ perspective: "2000px" }}
        >
          {/* 3D Cards Container */}
          <div className="relative h-[500px] flex items-center justify-center">
            {/* Previous Card (Left Back) */}
            <div
              ref={(el) => {
                cardsRef.current[0] = el;
              }}
              className="absolute w-[70%] max-w-[900px] h-[450px] cursor-pointer"
              style={{ transformStyle: "preserve-3d" }}
              onClick={handlePrev}
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-neutral-100 dark:bg-neutral-800">
                <Image
                  src={certificates[prevIndex].image}
                  alt={certificates[prevIndex].title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 900px"
                />
              </div>
            </div>

            {/* Current Card (Center Front) */}
            <div
              ref={(el) => {
                cardsRef.current[1] = el;
              }}
              className="absolute w-[70%] max-w-[900px] h-[450px] z-10"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-neutral-100 dark:bg-neutral-800">
                <Image
                  src={currentCert.image}
                  alt={currentCert.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 900px"
                  priority
                />

                {/* Counter Badge */}
                <div className="absolute top-4 right-4 px-4 py-2 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-md border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white font-bold text-sm rounded-full shadow-lg">
                  {currentIndex + 1} / {certificates.length}
                </div>
              </div>
            </div>

            {/* Next Card (Right Back) */}
            <div
              ref={(el) => {
                cardsRef.current[2] = el;
              }}
              className="absolute w-[70%] max-w-[900px] h-[450px] cursor-pointer"
              style={{ transformStyle: "preserve-3d" }}
              onClick={handleNext}
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-neutral-100 dark:bg-neutral-800">
                <Image
                  src={certificates[nextIndex].image}
                  alt={certificates[nextIndex].title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 900px"
                />
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          {certificates.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm shadow-xl hover:bg-white dark:hover:bg-neutral-700 transition-all hover:scale-110 flex items-center justify-center group z-20"
                aria-label="Previous certificate"
              >
                <ChevronLeft className="w-6 h-6 text-neutral-900 dark:text-white group-hover:-translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm shadow-xl hover:bg-white dark:hover:bg-neutral-700 transition-all hover:scale-110 flex items-center justify-center group z-20"
                aria-label="Next certificate"
              >
                <ChevronRight className="w-6 h-6 text-neutral-900 dark:text-white group-hover:translate-x-0.5 transition-transform" />
              </button>
            </>
          )}
        </div>
      ) : (
        // Mobile: Flat Carousel
        <div
          className="relative"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl bg-neutral-100 dark:bg-neutral-800">
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: direction > 0 ? 300 : -300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -300 : 300 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <Image
                  src={currentCert.image}
                  alt={currentCert.title}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />

                {/* Counter Badge */}
                <div className="absolute top-4 right-4 px-3 py-1.5 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-md border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white font-bold text-xs rounded-full shadow-lg">
                  {currentIndex + 1} / {certificates.length}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Certificate Info - Below Cards */}
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-4 text-center max-w-3xl mx-auto"
      >
        {/* Year Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-full shadow-lg"
        >
          <span className="font-bold text-sm">{currentCert.year}</span>
        </motion.div>

        {/* Title */}
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white leading-tight"
        >
          {currentCert.title}
        </motion.h3>

        {/* Issuer */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 font-semibold"
        >
          {currentCert.issuer}
        </motion.p>
      </motion.div>

      {/* Navigation Dots */}
      {certificates.length > 1 && (
        <div className="flex items-center justify-center gap-3 mt-8">
          {certificates.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`transition-all ${
                index === currentIndex
                  ? "w-12 h-3 bg-blue-600 dark:bg-blue-400 rounded-full"
                  : "w-3 h-3 bg-neutral-300 dark:bg-neutral-600 rounded-full hover:bg-neutral-400 dark:hover:bg-neutral-500"
              }`}
              aria-label={`Go to certificate ${index + 1}`}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
