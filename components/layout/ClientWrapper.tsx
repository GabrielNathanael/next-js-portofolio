"use client";

import { motion } from "framer-motion";
import { useLoading } from "@/components/providers/LoadingProvider";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading } = useLoading();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={!isLoading ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
