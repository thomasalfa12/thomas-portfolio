"use client";

import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { Experience as ExperienceType } from "@/types";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Briefcase, Users } from "lucide-react";

// Definisikan tipe untuk props
interface ExperienceProps {
  experiences: ExperienceType[];
}

// Fungsi untuk memilih ikon berdasarkan tipe dari Sanity
const getIconForType = (type?: string) => {
  if (type === "organization") return <Users className="h-6 w-6" />;
  return <Briefcase className="h-6 w-6" />; // Default ke Work
};

const ExperienceCard = ({ item }: { item: ExperienceType }) => {
  return (
    <div className="w-[80%] max-w-lg h-full mx-auto bg-card/70 backdrop-blur-md border rounded-xl p-8 flex flex-col justify-center shadow-lg">
      <div className="absolute -top-5 left-8 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg ring-4 ring-background">
        {getIconForType(item.experienceType)}
      </div>
      <p className="text-sm font-semibold text-primary pt-6">{item.date}</p>
      <h3 className="mt-1 text-xl font-bold text-foreground">{item.title}</h3>
      <p className="mt-1 text-md text-muted-foreground">{item.company}</p>
      <p className="mt-4 text-base text-foreground/80 leading-relaxed text-left">
        {item.description}
      </p>
    </div>
  );
};

export function Experience({ experiences }: ExperienceProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!experiences || experiences.length === 0) {
    return (
      <div className="text-center text-muted-foreground">
        No experiences to display.
      </div>
    );
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % experiences.length);
  };

  const handlePrev = () => {
    setActiveIndex(
      (prev) => (prev - 1 + experiences.length) % experiences.length
    );
  };

  const onDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const dragThreshold = 50;
    if (info.offset.x < -dragThreshold) {
      handleNext();
    } else if (info.offset.x > dragThreshold) {
      handlePrev();
    }
  };

  return (
    <motion.div
      key="experience"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="w-full h-full flex flex-col justify-center items-center"
    >
      <div className="text-center mb-12">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
          My Journey
        </h2>
        <p className="mt-2 text-lg text-muted-foreground max-w-2xl">
          Setiap langkah adalah pengalaman belajar yang membentuk keahlian saya.
        </p>
      </div>
      <div className="relative w-full h-[350px] flex items-center justify-center">
        <button
          onClick={handlePrev}
          className="absolute left-0 md:left-10 z-20 p-2 rounded-full bg-card/50 hover:bg-card border transition-all"
        >
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>
        <div
          className="relative w-full md:w-[70%] h-full"
          style={{ perspective: "1000px" }}
        >
          <AnimatePresence initial={false}>
            {experiences.map((item, index) => {
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
                case -(experiences.length - 1):
                  animateProps = {
                    x: "50%",
                    scale: 0.8,
                    rotateY: -30,
                    opacity: 0.6,
                    zIndex: 2,
                  };
                  break;
                case -1:
                case experiences.length - 1:
                  animateProps = {
                    x: "-50%",
                    scale: 0.8,
                    rotateY: 30,
                    opacity: 0.6,
                    zIndex: 2,
                  };
                  break;
                default:
                  animateProps = {
                    x: position > 0 ? "100%" : "-100%",
                    scale: 0.7,
                    opacity: 0,
                    zIndex: 1,
                    rotateY: position > 0 ? -45 : 45,
                  };
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
                  className="absolute w-full h-full p-4"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <ExperienceCard item={item} />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
        <button
          onClick={handleNext}
          className="absolute right-0 md:right-10 z-20 p-2 rounded-full bg-card/50 hover:bg-card border transition-all"
        >
          <ChevronRight className="w-6 h-6 text-foreground" />
        </button>
      </div>
      <div className="mt-8 flex gap-2">
        {experiences.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === activeIndex ? "w-6 bg-primary" : "bg-muted-foreground/50"}`}
          ></button>
        ))}
      </div>
    </motion.div>
  );
}
