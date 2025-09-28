"use client";

import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { Experience as ExperienceType } from "@/types";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Briefcase, Users, Eye } from "lucide-react";
import { ExperienceModal } from "./experience-modal";

interface ExperienceProps {
  experiences: ExperienceType[];
}

const getIconForType = (type?: string) => {
  if (type === "organization") return <Users className="h-6 w-6" />;
  return <Briefcase className="h-6 w-6" />;
};

const ExperienceCard = ({
  item,
  onCardClick,
}: {
  item: ExperienceType;
  onCardClick: () => void;
}) => {
  return (
    <motion.div
      className="bg-card/70 backdrop-blur-xl border rounded-xl p-8 flex flex-col shadow-lg h-full cursor-pointer"
      whileHover={{
        scale: 1.02,
        transition: { type: "spring", stiffness: 400, damping: 20 },
      }}
      onClick={onCardClick}
      layout
    >
      <div className="absolute -top-5 left-8 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg ring-4 ring-background">
        {getIconForType(item.experienceType)}
      </div>
      <p className="text-sm font-semibold text-primary pt-6">{item.date}</p>
      <h3 className="mt-1 text-xl font-bold text-foreground">{item.title}</h3>
      <p className="mt-1 text-md text-muted-foreground">{item.company}</p>
      <p className="mt-4 text-base text-foreground/80 leading-relaxed text-left flex-grow line-clamp-4">
        {item.summary}
      </p>
      <div className="mt-4 text-sm font-semibold text-primary inline-flex items-center gap-2 self-start">
        View Details <Eye className="w-4 h-4" />
      </div>
    </motion.div>
  );
};

export function Experience({ experiences }: ExperienceProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedExperience, setSelectedExperience] =
    useState<ExperienceType | null>(null);

  if (!experiences || experiences.length === 0) {
    return (
      <p className="text-center text-muted-foreground">
        No experiences to display.
      </p>
    );
  }

  const handleNext = () =>
    setActiveIndex((prev) => (prev + 1) % experiences.length);
  const handlePrev = () =>
    setActiveIndex(
      (prev) => (prev - 1 + experiences.length) % experiences.length
    );

  const onDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.offset.x < -50) handleNext();
    else if (info.offset.x > 50) handlePrev();
  };

  const openModal = (experience: ExperienceType) => {
    setSelectedExperience(experience);
  };

  return (
    <>
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
            Setiap langkah adalah pengalaman belajar yang membentuk keahlian
            saya.
          </p>
        </div>

        {/* Kontainer Carousel yang disederhanakan */}
        <div className="relative w-full max-w-2xl h-[450px] flex items-center justify-center">
          <button
            onClick={handlePrev}
            className="absolute left-0 z-10 p-2 rounded-full bg-card/50 hover:bg-card border transition-all"
          >
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>

          <AnimatePresence mode="popLayout">
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
              className="w-full h-full p-4"
            >
              <ExperienceCard
                item={experiences[activeIndex]}
                onCardClick={() => openModal(experiences[activeIndex])}
              />
            </motion.div>
          </AnimatePresence>

          <button
            onClick={handleNext}
            className="absolute right-0 z-10 p-2 rounded-full bg-card/50 hover:bg-card border transition-all"
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

      <AnimatePresence>
        {selectedExperience && (
          <ExperienceModal
            experience={selectedExperience}
            onClose={() => setSelectedExperience(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
