"use client";

import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { Project } from "@/types";
import React, { useState } from "react";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import { ExternalLink, Code, ChevronLeft, ChevronRight } from "lucide-react";
import { StatusBadge } from "./status-badge";

const CarouselProjectCard = ({ item }: { item: Project }) => {
  const imageUrl = item.thumbnail
    ? urlForImage(item.thumbnail)!.url()
    : "/placeholder.png";
  return (
    // PERBAIKAN 1: Hapus 'h-full' agar tinggi kartu adaptif
    <div className="relative bg-card/80 backdrop-blur-xl border border-border rounded-xl shadow-xl overflow-hidden flex flex-col group">
      <StatusBadge status={item.status} />
      <div className="relative w-full aspect-video flex-shrink-0 overflow-hidden bg-secondary max-h-[250px]">
        {item.thumbnail && (
          <Image
            src={imageUrl}
            alt={item.name}
            fill
            sizes="(max-width: 768px) 100vw, 700px"
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="flex flex-col p-4 md:p-5">
        <h3 className="font-heading text-lg md:text-xl font-bold text-foreground mb-2 line-clamp-2">
          {item.name}
        </h3>
        {/* PERBAIKAN 2: Hapus semua properti yang membatasi tinggi deskripsi */}
        <p className="text-xs md:text-sm text-muted-foreground leading-relaxed pr-1 mb-3">
          {item.description}
        </p>
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {item.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium bg-secondary/80 text-secondary-foreground px-2 py-1 rounded-full border border-border"
              >
                {tag}
              </span>
            ))}
            {item.tags.length > 4 && (
              <span className="text-xs font-medium bg-secondary/80 text-muted-foreground px-2 py-1 rounded-full border border-border">
                +{item.tags.length - 4}
              </span>
            )}
          </div>
        )}
        <div className="flex gap-2 pt-3 border-t border-border mt-auto">
          {item.projectUrl && (
            <a
              href={item.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs md:text-sm font-semibold text-primary-foreground bg-primary hover:bg-primary/90 px-3 py-2 rounded-lg transition-all duration-200"
            >
              <ExternalLink size={14} />
              <span>Live Preview</span>
            </a>
          )}
          {item.githubUrl && (
            <a
              href={item.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 text-xs md:text-sm font-semibold text-foreground bg-secondary hover:bg-secondary/80 px-3 py-2 rounded-lg transition-all duration-200 border border-border"
            >
              <Code size={14} />
              <span>Code</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export function FeaturedCarousel({ projects }: { projects: Project[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!projects || projects.length === 0)
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-center text-muted-foreground">
          No featured projects to display.
        </p>
      </div>
    );

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
    <div className="relative w-full h-full flex items-center justify-center">
      <button
        onClick={handlePrev}
        aria-label="Previous project"
        className="absolute left-1 md:left-2 z-30 p-2 md:p-3 rounded-full bg-card/90 hover:bg-card border border-border shadow-lg hover:shadow-xl transition-all duration-200 backdrop-blur-sm"
      >
        <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-foreground" />
      </button>

      {/* PERBAIKAN 3: Kontainer sekarang memiliki tinggi otomatis */}
      <div className="relative w-full max-w-lg md:max-w-2xl py-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={onDragEnd}
            dragElastic={0.2}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <CarouselProjectCard item={projects[activeIndex]} />
          </motion.div>
        </AnimatePresence>

        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-1.5">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to project ${index + 1}`}
              className={`transition-all duration-300 rounded-full ${index === activeIndex ? "w-6 h-1.5 bg-primary" : "w-1.5 h-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60"}`}
            />
          ))}
        </div>
      </div>

      <button
        onClick={handleNext}
        aria-label="Next project"
        className="absolute right-1 md:right-2 z-30 p-2 md:p-3 rounded-full bg-card/90 hover:bg-card border border-border shadow-lg hover:shadow-xl transition-all duration-200 backdrop-blur-sm"
      >
        <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-foreground" />
      </button>
    </div>
  );
}
