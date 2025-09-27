import { ReactNode } from "react";

// Tipe untuk data Sanity Image
type SanityImage = {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
};

// --- TIPE DATA DARI SANITY ---
export type Profile = {
  _id: string;
  name: string;
  headline: string;
  bio: string;
  profileImage: SanityImage;
};

export type Experience = {
  _id: string;
  title: string;
  company: string;
  date: string;
  description: string;
  experienceType?: string;
};

export type Project = {
  _id: string;
  name: string;
  description: string;
  projectUrl?: string;
  githubUrl?: string; // <-- 1. Tambahkan ini
  thumbnail?: SanityImage; // <-- 2. Jadikan opsional dengan '?'
  tags?: string[]; // <-- Jadikan opsional dengan '?'
};

export type Credential = {
  _id: string;
  title: string;
  issuer: string;
  thumbnail: SanityImage;
  // 'pdfUrl' sekarang akan menjadi string URL yang bersih setelah diproses
  pdfUrl?: string; 
};

// --- TIPE DATA UNTUK UI ---
export type SectionId = 'home' | 'experience' | 'projects' | 'credentials' | 'contact';

export type DockSection = {
  id: SectionId;
  label: string;
};

export type Section = DockSection & {
  component: ReactNode;
};

export type GithubRepo = {
  id: string;
  name: string;
  description: string;
  url: string;
  stargazerCount: number;
  forkCount: number;
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
};
