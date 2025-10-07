"use client";

import { useState, useMemo, ReactNode, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import { HeroSection } from "@/components/hero-section";
import { SkillsSection } from "@/components/skill-section";
import { InteractiveDock } from "@/components/interactive-dock";

// Impor komponen "lazy" yang baru kita buat
import {
  LazyExperienceSection,
  LazyProjectsPage,
  LazyCredentialsSection,
  LazyContactSection,
} from "@/components/lazy-section";

import {
  Profile,
  Experience,
  Project as SanityProject,
  GithubRepo,
  Credential,
  SectionId,
  DockSection,
  ContactInfo,
} from "@/types";
import { Skill } from "@/data/content";

interface ClientPageProps {
  profile: Profile;
  skills: Skill[];
  experiences: Experience[];
  sanityProjects: SanityProject[];
  githubRepos: GithubRepo[];
  credentials: Credential[];
  contactInfo: ContactInfo;
}

// Komponen loading sederhana untuk fallback Suspense
const LoadingSpinner = () => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export default function ClientPage({
  profile,
  skills,
  experiences,
  sanityProjects,
  githubRepos,
  credentials,
  contactInfo,
}: ClientPageProps) {
  const [activeSection, setActiveSection] = useState<SectionId>("home");

  const sections = useMemo(
    (): DockSection[] => [
      { id: "home", label: "Home" },
      { id: "experience", label: "Experience" },
      { id: "projects", label: "Projects" },
      { id: "credentials", label: "Credentials" },
      { id: "contact", label: "Contact" },
    ],
    []
  );

  const sectionComponents = useMemo(
    (): Record<SectionId, ReactNode> => ({
      home: (
        <div className="w-full h-full flex flex-col overflow-y-auto scrollbar-hide">
          <HeroSection profile={profile} setActiveSection={setActiveSection} />
          <SkillsSection skills={skills} />
        </div>
      ),
      // Gunakan komponen "lazy" di sini
      experience: <LazyExperienceSection experiences={experiences} />,
      projects: (
        <LazyProjectsPage
          sanityProjects={sanityProjects}
          githubRepos={githubRepos}
        />
      ),
      credentials: <LazyCredentialsSection credentials={credentials} />,
      contact: <LazyContactSection contactInfo={contactInfo} />,
    }),
    [
      profile,
      skills,
      experiences,
      sanityProjects,
      githubRepos,
      credentials,
      contactInfo,
      setActiveSection,
    ]
  );

  return (
    <main className="relative w-full min-h-screen flex flex-col items-center bg-background px-4 md:px-6">
      <div className="w-full max-w-7xl flex-grow pt-8 pb-24">
        <AnimatePresence mode="wait">
          {/* Bungkus dengan Suspense untuk menangani loading komponen lazy */}
          <Suspense fallback={<LoadingSpinner />}>
            {sectionComponents[activeSection]}
          </Suspense>
        </AnimatePresence>
      </div>
      <InteractiveDock
        sections={sections}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
    </main>
  );
}
