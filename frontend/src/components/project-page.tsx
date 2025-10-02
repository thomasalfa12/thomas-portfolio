"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
      className="w-full h-full flex flex-col overflow-hidden max-w-7xl mx-auto"
    >
      {/* Header - Fixed height */}
      <div className="text-center flex-shrink-0 px-4 pt-4 pb-3">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-1">
          My Projects
        </h2>
        <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
          ✨ Discover my featured projects or explore the full archive of my
          work.
        </p>
      </div>

      {/* Tab Switcher - Fixed height */}
      <div className="flex justify-center mb-4 flex-shrink-0">
        <div className="flex relative items-center gap-1 p-1 rounded-full bg-secondary/50 backdrop-blur-sm border border-border shadow-sm">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setView(tab.id as ViewMode)}
              className={`relative px-5 py-1.5 text-sm font-semibold rounded-full transition-all z-10 ${
                view === tab.id
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground/80"
              }`}
            >
              {view === tab.id && (
                <motion.div
                  layoutId="project-toggle-pill"
                  className="absolute inset-0 bg-card border border-border rounded-full shadow-md"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content Area - Takes remaining space */}
      <div className="flex-grow min-h-0 overflow-hidden pb-4 px-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            {view === "featured" ? (
              <FeaturedCarousel projects={sanityProjects} />
            ) : (
              <GithubActivityPage githubRepos={githubRepos} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
