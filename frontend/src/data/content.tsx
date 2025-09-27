import {
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiNodedotjs,
  SiPhp,
  SiLaravel,
  SiPython,
  SiGit,
  SiDocker,
} from "react-icons/si";
import React from "react";

// Tipe data untuk Skill
export type Skill = {
  name: string;
  icon: React.ReactElement;
};

// DATA STATIS (HANYA SKILLS)
export const skillsData: Skill[] = [
  { name: "Next.js", icon: <SiNextdotjs size={28} /> },
  { name: "React", icon: <SiReact size={28} /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss size={28} /> },
  { name: "Node.js", icon: <SiNodedotjs size={28} /> },
  { name: "PHP", icon: <SiPhp size={28} /> },
  { name: "Laravel", icon: <SiLaravel size={28} /> },
  { name: "Python", icon: <SiPython size={28} /> },
  { name: "Git", icon: <SiGit size={28} /> },
  { name: "Docker", icon: <SiDocker size={28} /> },
];
