"use client";

import { useState, useMemo, ReactNode } from "react";
import { AnimatePresence } from "framer-motion";
import { HeroSection } from "@/components/hero-section";
import { Experience as ExperienceSection } from "@/components/experience";
import { ProjectsPage } from "@/components/project-page";
import { Credentials as CredentialsSection } from "@/components/credentials";
import { Contact as ContactSection } from "@/components/contact";
import { InteractiveDock } from "@/components/interactive-dock";
import { SkillsSection } from "@/components/skill-section";

import {
  Profile,
  Experience,
  Project as SanityProject,
  GithubRepo,
  Credential,
  SectionId,
  DockSection,
} from "@/types";
import { Skill, ContactData } from "@/data/content";

interface ClientPageProps {
  profile: Profile;
  skills: Skill[];
  experiences: Experience[];
  sanityProjects: SanityProject[];
  githubRepos: GithubRepo[];
  credentials: Credential[];
  contactInfo: ContactData;
}

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
          <HeroSection profile={profile} />
          <SkillsSection skills={skills} />
        </div>
      ),
      experience: <ExperienceSection experiences={experiences} />,
      projects: (
        <ProjectsPage
          sanityProjects={sanityProjects}
          githubRepos={githubRepos}
        />
      ),
      credentials: <CredentialsSection credentials={credentials} />,
      contact: <ContactSection contactInfo={contactInfo} />,
    }),
    [
      profile,
      skills,
      experiences,
      sanityProjects,
      githubRepos,
      credentials,
      contactInfo,
    ]
  );

  return (
    <main className="relative w-full min-h-screen flex flex-col items-center justify-center bg-background p-4 md:p-6">
      {/* ▼▼▼ PERBAIKAN UTAMA DI SINI ▼▼▼ */}
      <div className="w-full max-w-6xl h-[85vh] flex-grow">
        <AnimatePresence mode="wait">
          {sectionComponents[activeSection]}
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
