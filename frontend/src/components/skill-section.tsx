"use client";
import { motion } from "framer-motion";
import React from "react";
import { Skill } from "@/data/content";

interface SkillsSectionProps {
  skills: Skill[];
}

const SkillsRow = ({
  skills,
  duration,
  reverse = false,
}: {
  skills: Skill[];
  duration: number;
  reverse?: boolean;
}) => {
  const initialX = reverse ? "-100%" : "0%";
  const animateX = reverse ? "0%" : "-100%";
  return (
    <motion.div
      className="flex items-center gap-8"
      initial={{ x: initialX }}
      animate={{ x: animateX }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    >
      {skills.map((skill, index) => (
        <div
          key={`${skill.name}-${index}`}
          className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
        >
          {skill.icon}
          <span className="text-xl font-medium whitespace-nowrap">
            {skill.name}
          </span>
        </div>
      ))}
    </motion.div>
  );
};

export function SkillsSection({ skills }: SkillsSectionProps) {
  if (!skills || skills.length === 0) return null;

  const extendedSkills = [...skills, ...skills];
  const midPoint = Math.ceil(extendedSkills.length / 2);
  const row1 = extendedSkills.slice(0, midPoint);
  const row2 = extendedSkills.slice(midPoint);

  return (
    // PERBAIKAN: 'flex-shrink-0' mencegah seksi ini ter-squeeze oleh flex-grow di HeroSection
    <div className="w-full py-8 flex-shrink-0">
      <div
        className="relative w-full flex flex-col gap-6 overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div className="flex">
          <SkillsRow skills={row1} duration={40} />
        </div>
        <div className="flex">
          <SkillsRow skills={row2} duration={50} reverse={true} />
        </div>
      </div>
    </div>
  );
}
