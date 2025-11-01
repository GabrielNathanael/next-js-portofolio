// components/sections/CertificatesGrid.tsx
"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Card from "@/components/ui/Card";
import CertificateFilter from "@/components/ui/CertificateFilter";
import CertificateModal from "@/components/ui/CertificateModal";
import Pagination from "@/components/ui/Pagination";
import { Certificate } from "@/lib/data/certificates";

interface CertificatesGridProps {
  certificates: Certificate[];
}

export default function CertificatesGrid({
  certificates,
}: CertificatesGridProps) {
  const [selectedIssuers, setSelectedIssuers] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(
    null
  );
  const [itemsPerPage, setItemsPerPage] = useState(6);

  // Handle responsive items per page
  useEffect(() => {
    const handleResize = () => {
      const newItemsPerPage = window.innerWidth < 768 ? 3 : 6;
      setItemsPerPage((prev) => {
        // Reset to page 1 if items per page changes
        if (prev !== newItemsPerPage) {
          setCurrentPage(1);
        }
        return newItemsPerPage;
      });
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Get unique issuers
  const availableIssuers = useMemo(() => {
    const issuers = new Set(certificates.map((cert) => cert.issuer));
    return Array.from(issuers).sort();
  }, [certificates]);

  // Filter and sort logic
  const filteredAndSortedCertificates = useMemo(() => {
    let filtered = certificates;

    // Filter by issuers
    if (selectedIssuers.length > 0) {
      filtered = filtered.filter((cert) =>
        selectedIssuers.includes(cert.issuer)
      );
    }

    const sorted = [...filtered].sort((a, b) => {
      const yearA = parseInt(a.year);
      const yearB = parseInt(b.year);

      if (yearA === yearB) return a.sortOrder - b.sortOrder;

      return sortOrder === "newest" ? yearB - yearA : yearA - yearB;
    });

    return sorted;
  }, [certificates, selectedIssuers, sortOrder]);

  // Pagination logic
  const totalPages = Math.ceil(
    filteredAndSortedCertificates.length / itemsPerPage
  );
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCertificates = filteredAndSortedCertificates.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Reset to page 1 when filters change
  const handleIssuersChange = (issuers: string[]) => {
    setSelectedIssuers(issuers);
    setCurrentPage(1);
  };

  const handleSortChange = (order: "newest" | "oldest") => {
    setSortOrder(order);
    setCurrentPage(1);
  };

  // Get selected certificate object
  const currentCertificate =
    certificates.find((c) => c.id === selectedCertificate) || null;

  return (
    <div className="space-y-8">
      {/* Filter & Sort */}
      <CertificateFilter
        availableIssuers={availableIssuers}
        selectedIssuers={selectedIssuers}
        onIssuersChange={handleIssuersChange}
        sortOrder={sortOrder}
        onSortChange={handleSortChange}
        totalResults={filteredAndSortedCertificates.length}
      />

      {/* Grid */}
      {paginatedCertificates.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedCertificates.map((cert, idx) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Card
                  className="overflow-hidden cursor-pointer group hover:shadow-xl transition-all duration-300"
                  onClick={() => setSelectedCertificate(cert.id)}
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={cert.image}
                      alt={cert.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-5 space-y-3">
                    <h3 className="text-lg font-bold dark:text-neutral-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                      {cert.title}
                    </h3>
                    <div className="flex items-center justify-between gap-3">
                      <span className="px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
                        {cert.issuer}
                      </span>
                      <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                        {cert.year}
                      </span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center pt-4">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                totalItems={filteredAndSortedCertificates.length}
                itemsPerPage={itemsPerPage}
              />
            </div>
          )}
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            No certificates found with the selected filters.
          </p>
          <button
            onClick={() => {
              setSelectedIssuers([]);
              setCurrentPage(1);
            }}
            className="mt-4 px-6 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 font-medium transition-colors"
          >
            Clear Filters
          </button>
        </motion.div>
      )}

      {/* Certificate Modal */}
      <CertificateModal
        certificate={currentCertificate}
        isOpen={selectedCertificate !== null}
        onClose={() => setSelectedCertificate(null)}
      />
    </div>
  );
}
