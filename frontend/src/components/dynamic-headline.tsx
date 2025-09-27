"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const skills = [
  "Full-Stack Developer",
  "Creative Coder",
  "UI/UX Enthusiast",
  "UMKM Web Specialist",
];

const DynamicHeadline = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % skills.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-block font-bold text-primary">
      <AnimatePresence mode="wait">
        <motion.span
          key={skills[index]}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="inline-block"
        >
          {skills[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

export default DynamicHeadline;
