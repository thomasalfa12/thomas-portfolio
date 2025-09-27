import { Mail, Linkedin, Github } from "lucide-react";
import {
  SiTypescript,
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

// --- TIPE DATA STATIS ---
export type Skill = {
  name: string;
  icon: React.ReactElement;
};

export type ContactLink = {
  type: string;
  label: string;
  href: string;
  icon: React.ReactElement;
};

export type ContactData = {
  title: string;
  description: string;
  links: ContactLink[];
};

// --- DATA STATIS ---
export const skillsData: Skill[] = [
  { name: "TypeScript", icon: <SiTypescript size={28} /> },
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

export const contactData: ContactData = {
  title: "Ayo Berkolaborasi!",
  description:
    "Tertarik dengan portofolio saya? Mari diskusikan proyek atau peluang. Saya siap membantu Anda membangun solusi digital yang luar biasa.",
  links: [
    {
      type: "email",
      label: "Email",
      href: "mailto:edison.thomas52@gmail.com",
      icon: <Mail className="mr-2 h-4 w-4" />,
    },
    {
      type: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/thomas-alfa-edison/",
      icon: <Linkedin className="mr-2 h-4 w-4" />,
    },
    {
      type: "github",
      label: "GitHub",
      href: "https://github.com/thomasalfa12",
      icon: <Github className="mr-2 h-4 w-4" />,
    },
  ],
};
