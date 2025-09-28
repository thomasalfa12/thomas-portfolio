"use client";

import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { Project } from "@/types";
import React, { useState } from "react";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import { ExternalLink, Code, ChevronLeft, ChevronRight } from "lucide-react";

// Komponen Kartu Proyek
const CarouselProjectCard = ({ item }: { item: Project }) => {
  const imageUrl = item.thumbnail
    ? urlForImage(item.thumbnail)!.url()
    : "/placeholder.png";

  return (
    <div className="bg-card/70 backdrop-blur-xl border rounded-xl p-6 flex flex-col shadow-lg h-full overflow-hidden">
      <div className="relative w-full aspect-video mb-4 rounded-md overflow-hidden bg-secondary">
        {item.thumbnail && (
          <Image
            src={imageUrl}
            alt={item.name}
            fill
            sizes="(max-width: 768px) 80vw, 40vw"
            className="object-cover object-top"
          />
        )}
      </div>
      <h3 className="font-heading text-xl font-bold text-foreground">
        {item.name}
      </h3>
      <p className="text-sm text-muted-foreground flex-grow my-2 line-clamp-4">
        {item.description}
      </p>
      {item.tags && (
        <div className="flex flex-wrap gap-2 my-4">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      <div className="flex gap-4 mt-auto border-t border-border pt-4">
        {item.projectUrl && (
          <a
            href={item.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            <ExternalLink size={16} /> Live Preview
          </a>
        )}
        {item.githubUrl && (
          <a
            href={item.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            <Code size={16} /> View Code
          </a>
        )}
      </div>
    </div>
  );
};

// Komponen Carousel Utama (Total Refactor)
export function FeaturedCarousel({ projects }: { projects: Project[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!projects || projects.length === 0) {
    return (
      <p className="text-center text-muted-foreground">
        No featured projects to display.
      </p>
    );
  }

  const handleNext = () =>
    setActiveIndex((prev) => (prev + 1) % projects.length);
  const handlePrev = () =>
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);

  const onDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.offset.x < -50) handleNext();
    else if (info.offset.x > 50) handlePrev();
  };

  return (
    // Kontainer utama dengan padding vertikal agar tidak menabrak dock
    <div className="relative w-full h-full py-16 flex items-center justify-center">
      {/* Tombol navigasi kiri */}
      <button
        onClick={handlePrev}
        className="absolute left-2 md:left-12 z-20 p-2 rounded-full bg-card/50 hover:bg-card border transition-all"
      >
        <ChevronLeft className="w-6 h-6 text-foreground" />
      </button>

      {/* Area Carousel untuk 3D effect */}
      <div
        className="relative w-full md:w-3/5 h-full"
        style={{ perspective: "1000px" }}
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={activeIndex}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={onDragEnd}
            dragElastic={0.1}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute w-full h-full p-4"
          >
            <CarouselProjectCard item={projects[activeIndex]} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Kartu Preview Kiri (Hanya Desktop) */}
      <div className="absolute left-0 w-1/5 h-full hidden md:flex items-center justify-end">
        <motion.div
          key={activeIndex - 1}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 0.8, opacity: 0.5, rotateY: 30 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="w-full max-w-xs h-4/5"
        >
          <CarouselProjectCard
            item={
              projects[(activeIndex - 1 + projects.length) % projects.length]
            }
          />
        </motion.div>
      </div>

      {/* Kartu Preview Kanan (Hanya Desktop) */}
      <div className="absolute right-0 w-1/5 h-full hidden md:flex items-center justify-start">
        <motion.div
          key={activeIndex + 1}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 0.8, opacity: 0.5, rotateY: -30 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="w-full max-w-xs h-4/5"
        >
          <CarouselProjectCard
            item={projects[(activeIndex + 1) % projects.length]}
          />
        </motion.div>
      </div>

      {/* Tombol navigasi kanan */}
      <button
        onClick={handleNext}
        className="absolute right-2 md:right-12 z-20 p-2 rounded-full bg-card/50 hover:bg-card border transition-all"
      >
        <ChevronRight className="w-6 h-6 text-foreground" />
      </button>
    </div>
  );
}
