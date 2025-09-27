"use client";

import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { Project } from "@/types";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FeaturedProjectCard } from "./featured-project-card";

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
    <div className="relative w-full h-full py-16 flex items-center justify-center">
      <AnimatePresence initial={false}>
        {projects.map((item, index) => {
          const position = index - activeIndex;
          let animateProps = {};
          switch (position) {
            case 0:
              animateProps = {
                x: "0%",
                scale: 1,
                rotateY: 0,
                opacity: 1,
                zIndex: 3,
              };
              break;
            case 1:
            case -(projects.length - 1):
              animateProps = {
                x: "50%",
                scale: 0.8,
                rotateY: -30,
                opacity: 0.6,
                zIndex: 2,
              };
              break;
            case -1:
            case projects.length - 1:
              animateProps = {
                x: "-50%",
                scale: 0.8,
                rotateY: 30,
                opacity: 0.6,
                zIndex: 2,
              };
              break;
            default:
              animateProps = { x: "100%", scale: 0.7, opacity: 0, zIndex: 1 };
              break;
          }
          return (
            <motion.div
              key={item._id}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={onDragEnd}
              dragElastic={0.1}
              initial={animateProps}
              animate={animateProps}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`absolute w-full max-w-xl p-4 ${index !== activeIndex ? "hidden md:block" : ""}`}
              style={{ transformStyle: "preserve-3d" }}
            >
              <FeaturedProjectCard item={item} />
            </motion.div>
          );
        })}
      </AnimatePresence>
      <button
        onClick={handlePrev}
        className="absolute left-0 md:left-8 z-20 p-2 rounded-full bg-card/50 hover:bg-card border transition-all"
      >
        <ChevronLeft className="w-6 h-6 text-foreground" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-0 md:right-8 z-20 p-2 rounded-full bg-card/50 hover:bg-card border transition-all"
      >
        <ChevronRight className="w-6 h-6 text-foreground" />
      </button>
    </div>
  );
}
