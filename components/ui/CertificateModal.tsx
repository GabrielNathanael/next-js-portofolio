// components\ui\CertificateModal.tsx
// components/ui/CertificateModal.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
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
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full"
          >
            <button
              onClick={onClose}
              className="absolute -top-12 right-0 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="space-y-4">
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <Image
                  src={certificate.image}
                  alt={certificate.title}
                  fill
                  className="object-contain bg-white"
                />
              </div>
              <div className="text-center text-white space-y-3">
                <h3 className="text-xl sm:text-2xl font-bold">
                  {certificate.title}
                </h3>
                {/* Issuer & Year with badge - centered layout */}
                <div className="flex items-center justify-center gap-3">
                  <span className="px-4 py-1.5 text-sm font-semibold bg-linear-to-r from-blue-600 to-blue-500 text-white rounded-full shadow-lg">
                    {certificate.issuer}
                  </span>
                  <span className="text-xl text-neutral-400">•</span>
                  <span className="font-bold text-lg">{certificate.year}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
