// components/sections/LatestCertificates.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Certificate } from "@/lib/contentful/types";

interface LatestCertificatesProps {
  certificates: Certificate[];
}

// REST: stacked deck
const FAN_REST = [
  { rotate: 8, x: 8, y: 14, scale: 0.93, z: 1 },
  { rotate: 3, x: 4, y: 6, scale: 0.96, z: 2 },
  { rotate: -1, x: 0, y: 0, scale: 1.0, z: 3 },
];

// SPREAD: hover — fan out, centered around middle card
const FAN_SPREAD = [
  { rotate: 18, x: 130, y: 48, scale: 0.93, z: 1 },
  { rotate: 0, x: -80, y: 10, scale: 0.97, z: 2 },
  { rotate: -16, x: -180, y: 22, scale: 1.0, z: 3 },
];

// SELECTED: one card comes forward, others pushed back
function getSelectedPositions(
  selectedIndex: number,
  spreadPositions: typeof FAN_SPREAD,
) {
  return spreadPositions.map((pos, i) => {
    if (i === selectedIndex) {
      return { ...pos, y: pos.y - 36, scale: 1.08, z: 10 };
    }
    return { ...pos, y: pos.y + 14, scale: pos.scale - 0.05, z: pos.z };
  });
}

const SPRING = { type: "spring", stiffness: 260, damping: 26 } as const;

export default function LatestCertificates({
  certificates,
}: LatestCertificatesProps) {
  const [hovered, setHovered] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  // highlight → front (index 2), others behind
  const sorted = (() => {
    const hi = certificates.find((c) => c.highlight);
    if (!hi) return certificates.slice(0, 3);
    const others = certificates.filter((c) => c !== hi).slice(0, 2);
    return [others[1] ?? hi, others[0] ?? hi, hi] as Certificate[];
  })();

  // Derive position per card based on current state
  const getPos = (i: number) => {
    if (!hovered) return FAN_REST[i];
    if (selected !== null) return getSelectedPositions(selected, FAN_SPREAD)[i];
    return FAN_SPREAD[i];
  };

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setSelected(null); // reset selection when leaving
  };

  const handleClick = (i: number) => {
    if (!hovered) return;
    setSelected((prev) => (prev === i ? null : i));
  };

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
          <p className="text-xs font-bold tracking-[0.22em] uppercase text-amber-500 dark:text-amber-400 mb-3">
            Certifications
          </p>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight text-neutral-900 dark:text-neutral-50 mb-5">
            Skills that are{" "}
            <span className="italic font-normal text-neutral-400 dark:text-neutral-500">
              verified,
            </span>
            <br />
            not just listed.
          </h2>

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
          className="relative flex items-center justify-center"
          style={{ width: 420, height: 340 }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {sorted.map((cert, i) => {
            const pos = getPos(i);
            const isSelected = selected === i;
            const isDimmed = selected !== null && !isSelected && hovered;

            return (
              <motion.div
                key={cert.title + i}
                animate={{
                  rotate: pos.rotate,
                  x: pos.x,
                  y: pos.y,
                  scale: pos.scale,
                  zIndex: pos.z,
                }}
                transition={SPRING}
                onClick={() => handleClick(i)}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: -128, // half of card height (340 * 3/4 / 2)
                  marginLeft: -170, // half of card width (340 / 2)
                  zIndex: pos.z,
                  cursor: hovered ? "pointer" : "default",
                }}
              >
                <motion.div
                  className="relative overflow-hidden rounded-2xl"
                  animate={{
                    boxShadow: isSelected
                      ? "0 32px 60px rgba(0,0,0,0.32)"
                      : "0 8px 28px rgba(0,0,0,0.18)",
                  }}
                  transition={SPRING}
                  style={{ width: 340, aspectRatio: "4/3" }}
                >
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    className="object-cover"
                    sizes="360px"
                    priority={i === 2}
                  />

                  {/* Dim overlay on non-selected cards */}
                  <AnimatePresence>
                    {isDimmed && (
                      <motion.div
                        className="absolute inset-0 bg-black/45 rounded-2xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
