// components/ui/CertificateModal.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Card from "@/components/ui/Card";
import { Certificate } from "@/lib/data/certificates";

interface CertificateModalProps {
  certificate: Certificate | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CertificateModal({
  certificate,
  isOpen,
  onClose,
}: CertificateModalProps) {
  if (!certificate) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            onClick={(e) => e.stopPropagation()}
            className="max-w-3xl w-full"
          >
            <Card className="p-6 space-y-2 rounded-xl shadow-2xl">
              {/* Certificate Image - No Border */}
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <Image
                  src={certificate.image}
                  alt={certificate.title}
                  fill
                  className="object-contain bg-white dark:bg-neutral-900"
                />
              </div>

              {/* Certificate Info */}
              <div className="space-y-3 text-center">
                {/* Title - responsif */}
                <h3 className="text-base sm:text-xl md:text-2xl font-semibold sm:font-bold text-neutral-900 dark:text-white leading-snug sm:leading-tight">
                  {certificate.title}
                </h3>

                {/* Issuer & Year with centered dot */}
                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-3">
                  <span className="px-3 sm:px-4 py-1 text-xs sm:text-sm font-semibold bg-linear-to-r from-blue-600 to-blue-500 text-white rounded-full shadow-md justify-self-end">
                    {certificate.issuer}
                  </span>
                  <span className="text-lg sm:text-xl text-neutral-300 dark:text-neutral-600">
                    •
                  </span>
                  <span className="font-medium sm:font-bold text-neutral-600 dark:text-neutral-300 text-sm sm:text-lg justify-self-start">
                    {certificate.year}
                  </span>
                </div>
              </div>

              {/* Close Button */}
              <div className="flex justify-center pt-0">
                <button
                  onClick={onClose}
                  className="px-6 py-2 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-all duration-200"
                >
                  Close
                </button>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
