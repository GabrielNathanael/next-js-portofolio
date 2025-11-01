"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { certificates } from "@/lib/data/certificates";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function LatestCertificates() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedCert, setSelectedCert] = useState<string | null>(null);
  const latestCerts = [...certificates]
    .sort((a, b) => Number(b.year) - Number(a.year))
    .slice(0, 3);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
      className="space-y-6 relative"
    >
      {/* Decorative floating blob - right side */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 0.1, scale: 1 } : {}}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute -top-24 -right-32 w-96 h-96 bg-gradient-to-bl from-blue-400 via-cyan-400 to-blue-500 rounded-full blur-3xl pointer-events-none"
      />

      {/* Header with decorative elements */}
      <div className="flex items-center justify-between relative">
        <motion.h2
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl font-bold from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 bg-clip-text text-transparent bg-linear-to-r"
        >
          Latest Certificates
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link href="/certificates">
            <Button
              variant="ghost"
              size="sm"
              className="group text-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-900"
            >
              View All
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Certificates Grid with asymmetric treatment */}
      <div className="grid md:grid-cols-3 gap-6 relative">
        {latestCerts.map((cert, idx) => {
          // Alternating animation pattern
          const getInitialPosition = () => {
            if (idx === 0) return { x: -30, y: 30 };
            if (idx === 1) return { y: -20 };
            return { x: 30, y: 30 };
          };

          return (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, ...getInitialPosition() }}
              animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.3 + idx * 0.12,
                ease: "easeOut",
              }}
              className="relative"
              style={{
                // Subtle staggered positioning
                marginTop: idx === 0 ? "1rem" : idx === 1 ? "0" : "1rem",
              }}
            >
              <Card
                className="overflow-hidden cursor-pointer group relative"
                onClick={() => setSelectedCert(cert.id)}
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Year badge with animation */}
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6 + idx * 0.12 }}
                    className="absolute top-3 right-3 px-3 py-1 bg-blue-500/90 dark:bg-blue-600/90 backdrop-blur-sm text-white text-xs font-bold rounded-full"
                  >
                    {cert.year}
                  </motion.div>
                </div>

                <div className="p-4 space-y-2 relative">
                  {/* Subtle corner accent on first card */}
                  {idx === 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={inView ? { opacity: 0.3, scale: 1 } : {}}
                      transition={{ duration: 0.6, delay: 0.8 }}
                      className="absolute bottom-2 right-2 w-16 h-16 bg-gradient-to-tl from-blue-400 to-cyan-300 rounded-full blur-xl"
                    />
                  )}

                  <h3 className="font-semibold text-neutral-800 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {cert.title}
                  </h3>

                  <div className="flex items-center justify-between text-sm text-neutral-600 dark:text-neutral-300">
                    <span className="font-medium">{cert.issuer}</span>
                  </div>
                </div>

                {/* Hover glow - different positions */}
                <motion.div
                  className={`absolute ${
                    idx === 0
                      ? "-bottom-6 -left-6"
                      : idx === 1
                      ? "top-1/2 -right-6 -translate-y-1/2"
                      : "-bottom-6 -right-6"
                  } w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-xl opacity-0 group-hover:opacity-25 transition-opacity duration-500`}
                />
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom left decorative blob */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 0.08, scale: 1 } : {}}
        transition={{ duration: 1, delay: 0.7 }}
        className="absolute -bottom-16 -left-24 w-72 h-72 bg-gradient-to-tr from-blue-500 to-cyan-400 rounded-full blur-3xl pointer-events-none"
      />

      {/* Certificate Preview Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full"
            >
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute -top-12 right-0 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              {(() => {
                const cert = certificates.find((c) => c.id === selectedCert);
                if (!cert) return null;
                return (
                  <div className="space-y-4">
                    <div className="relative aspect-video rounded-lg overflow-hidden">
                      <Image
                        src={cert.image}
                        alt={cert.title}
                        fill
                        className="object-contain bg-white"
                      />
                    </div>
                    <div className="text-center text-white space-y-2">
                      <h3 className="text-2xl font-bold">{cert.title}</h3>
                      <p className="text-lg">
                        {cert.issuer} • {cert.year}
                      </p>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
