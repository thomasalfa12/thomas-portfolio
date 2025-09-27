"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Project as SanityProject, GithubRepo } from "@/types";
import { FeaturedCarousel } from "./featured-carousel";
import { GithubActivityPage } from "./github-activity-page";

interface ProjectsPageProps {
  sanityProjects: SanityProject[];
  githubRepos: GithubRepo[];
}

type ViewMode = "featured" | "github";

export function ProjectsPage({
  sanityProjects,
  githubRepos,
}: ProjectsPageProps) {
  const [view, setView] = useState<ViewMode>("featured");
  const tabs = [
    { id: "featured", label: "Featured" },
    { id: "github", label: "GitHub" },
  ];

  return (
    <motion.div
      key="projects"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="w-full h-full flex flex-col"
    >
      <div className="text-center mb-4">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
          My Projects
        </h2>
      </div>

      {/* ▼▼▼ PERBAIKAN UTAMA PADA TOGGLE DI SINI ▼▼▼ */}
      <div className="flex justify-center">
        <div className="flex items-center gap-2 p-1 rounded-full bg-secondary">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setView(tab.id as ViewMode)}
              // 'relative' penting untuk posisi pill
              className={`relative px-4 py-2 text-sm font-semibold rounded-full transition-colors ${
                view === tab.id
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground/80"
              }`}
            >
              {/* Pill sekarang ada di dalam tombol yang aktif */}
              {view === tab.id && (
                <motion.div
                  layoutId="project-toggle-pill"
                  className="absolute inset-0 bg-card rounded-full shadow"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              {/* Teks harus relatif agar berada di atas pill */}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-grow relative overflow-hidden">
        {view === "featured" ? (
          <FeaturedCarousel projects={sanityProjects} />
        ) : (
          <GithubActivityPage githubRepos={githubRepos} />
        )}
      </div>
    </motion.div>
  );
}
