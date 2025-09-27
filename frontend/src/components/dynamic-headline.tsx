"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Definisikan tipe untuk props
interface DynamicHeadlineProps {
  headlines?: string[];
}

const DynamicHeadline = ({ headlines }: DynamicHeadlineProps) => {
  // PERBAIKAN: Pindahkan semua Hooks ke bagian paling atas
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Tambahkan pengecekan di dalam useEffect
    if (!headlines || headlines.length === 0) {
      return; // Jangan lakukan apa-apa jika tidak ada headlines
    }

    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % headlines.length);
    }, 3000); // Ganti teks setiap 3 detik

    return () => clearInterval(interval);
  }, [headlines]); // Tambahkan headlines sebagai dependency

  // Pengecekan untuk fallback sekarang aman dilakukan setelah Hooks
  if (!headlines || headlines.length === 0) {
    return (
      <span className="inline-block font-bold text-primary">
        Full-Stack Developer
      </span>
    );
  }

  return (
    <span className="inline-block font-bold text-primary">
      <AnimatePresence mode="wait">
        <motion.span
          key={headlines[index]}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="inline-block"
        >
          {headlines[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

export default DynamicHeadline;
