"use client";
import { motion } from "framer-motion";
import { Home, Briefcase, Layers, Award, Mail } from "lucide-react";
import React from "react";
import { SectionId, DockSection } from "@/types";

interface DockProps {
  sections: DockSection[];
  activeSection: SectionId;
  setActiveSection: React.Dispatch<React.SetStateAction<SectionId>>;
}

const sectionIcons: Record<SectionId, React.ReactNode> = {
  home: <Home className="w-5 h-5" />,
  experience: <Briefcase className="w-5 h-5" />,
  projects: <Layers className="w-5 h-5" />,
  credentials: <Award className="w-5 h-5" />,
  contact: <Mail className="w-5 h-5" />,
};

export function InteractiveDock({
  sections,
  activeSection,
  setActiveSection,
}: DockProps) {
  return (
    <div className="fixed bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-50">
      <motion.div
        // Latar kaca yang lebih bening dan blur lebih kuat
        className="flex items-center gap-1 p-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-xl shadow-lg"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
        whileHover={{
          scale: 1.05,
          transition: { type: "spring", stiffness: 300, damping: 20 },
        }}
      >
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            // PERBAIKAN: Ganti warna teks menjadi gelap agar kontras
            className={`relative px-4 py-2 flex items-center justify-center rounded-full text-sm font-medium transition-colors ${
              activeSection === section.id
                ? "text-primary" // Teks aktif sekarang BIRU
                : "text-muted-foreground hover:text-foreground" // Teks non-aktif ABU-ABU
            }`}
          >
            <span className="relative z-10 md:hidden">
              {sectionIcons[section.id]}
            </span>
            <span className="relative z-10 hidden md:inline">
              {section.label}
            </span>
            {activeSection === section.id && (
              <motion.div
                layoutId="active-pill"
                // PERBAIKAN: Latar pill aktif menjadi PUTIH solid
                className="absolute inset-0 bg-card rounded-full shadow"
                transition={{ type: "spring", stiffness: 500, damping: 40 }}
              />
            )}
          </button>
        ))}
      </motion.div>
    </div>
  );
}
