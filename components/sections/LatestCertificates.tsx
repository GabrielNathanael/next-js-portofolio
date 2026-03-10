// components/sections/LatestCertificates.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Certificate } from "@/lib/contentful/types";

interface LatestCertificatesProps {
  certificates: Certificate[];
}

// REST: stacked like a deck — slight fan already visible
// SPREAD: full kipas ke kanan saat hover
const FAN_REST = [
  { rotate: 8, x: 16, y: 12, z: 1, scale: 0.95 }, // back
  { rotate: 3, x: 8, y: 5, z: 2, scale: 0.97 }, // middle
  { rotate: -1, x: 0, y: 0, z: 3, scale: 1.0 }, // front (highlight)
];

const FAN_SPREAD = [
  { rotate: 22, x: 240, y: 50, z: 1, scale: 0.93 },
  { rotate: -2, x: 24, y: 12, z: 2, scale: 0.97 },
  { rotate: -18, x: -100, y: 24, z: 3, scale: 1.0 },
];

export default function LatestCertificates({
  certificates,
}: LatestCertificatesProps) {
  const [hovered, setHovered] = useState(false);

  // highlight cert goes to front (index 2), others behind
  const sorted = (() => {
    const hi = certificates.find((c) => c.highlight);
    if (!hi) return certificates.slice(0, 3);
    const others = certificates.filter((c) => c !== hi).slice(0, 2);
    return [others[1] ?? hi, others[0] ?? hi, hi] as Certificate[];
  })();

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
      className="flex flex-col md:flex-row items-center gap-12 md:gap-0"
    >
      {/* ── LEFT: Copywriting ── */}
      <div className="flex-1 flex flex-col gap-6 md:pr-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.55 }}
          viewport={{ once: true }}
        >
          {/* Eyebrow */}
          <p className="text-xs font-bold tracking-[0.22em] uppercase text-amber-500 dark:text-amber-400 mb-3">
            Certifications
          </p>

          {/* Headline */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight text-neutral-900 dark:text-neutral-50 mb-5">
            Skills that are{" "}
            <span className="italic font-normal text-neutral-400 dark:text-neutral-500">
              verified,
            </span>
            <br />
            not just listed.
          </h2>

          {/* Body */}
          <p className="text-base text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-sm">
            A selection of certifications earned through courses, exams, and
            continuous learning.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.45 }}
          viewport={{ once: true }}
        >
          <Link
            href="/certificates"
            className="
              inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold w-fit
              bg-neutral-900 text-white hover:bg-neutral-700
              dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100
              transition-colors duration-200 shadow-md group
            "
          >
            See all certifications
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-150" />
          </Link>
        </motion.div>
      </div>

      {/* ── RIGHT: Fan Card Stack ── */}
      <motion.div
        className="flex-1 flex items-center justify-center"
        initial={{ opacity: 0, x: 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div
          className="relative"
          style={{ width: 360, height: 360 }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {sorted.map((cert, i) => {
            const pos = hovered ? FAN_SPREAD[i] : FAN_REST[i];
            const isFront = i === 2;

            return (
              <motion.div
                key={cert.title + i}
                animate={{
                  rotate: pos.rotate,
                  x: pos.x,
                  y: pos.y,
                  scale: pos.scale,
                }}
                style={{ zIndex: pos.z, position: "absolute", top: 0, left: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 24 }}
                whileHover={{
                  y: pos.y - 14,
                  transition: { type: "spring", stiffness: 320, damping: 22 },
                }}
                className="cursor-pointer"
              >
                {/* Card */}
                <div
                  className="relative overflow-hidden rounded-2xl shadow-2xl"
                  style={{ width: 340, aspectRatio: "4/3" }}
                >
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    className="object-cover"
                    sizes="360px"
                    priority={isFront}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
