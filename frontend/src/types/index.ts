import { ReactNode } from "react";
import type { PortableTextBlock } from "sanity"; 

// Tipe untuk data Sanity Image
export type SanityImage = {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  // ▼▼▼ TAMBAHKAN PROPERTI OPSIONAL INI ▼▼▼
  alt?: string;
};

// --- TIPE DATA DARI SANITY ---
export type Profile = {
  _id: string;
  name: string;
  headline: string;
  bio: string;
  profileImage: SanityImage;
  shortIntro?: string;
  ctaButtonText?: string;
  // Tambahkan field-field baru
  ctaButtonActionType?: 'internal' | 'external';
  ctaInternalLink?: SectionId;
  ctaExternalUrl?: string;
  cvUrl?: string; // Kita akan dapatkan ini dari 'cvFile'
  dynamicHeadlines?: string[];
};


export type Experience = {
  _id: string;
  title: string;
  company: string;
  date: string;
  summary: string;
  // 2. Ganti 'any[]' dengan 'PortableTextBlock[]'
  content: PortableTextBlock[]; 
  experienceType?: string;
};

export type Project = {
  _id: string;
  name: string;
  description: string;
  projectUrl?: string;
  githubUrl?: string;
  thumbnail?: SanityImage;
  tags?: string[];
};

export type Credential = {
  _id: string;
  title: string;
  issuer: string;
  thumbnail: SanityImage;
  pdfUrl?: string;
};

// Tipe untuk data Contact dari Sanity
export type ContactLink = {
  _key: string;
  label: string;
  href: string;
  linkType: 'email' | 'linkedin' | 'github';
};

export type ContactInfo = {
  _id: string;
  title: string;
  description: string;
  links: ContactLink[];
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

// Tipe untuk repo dari GitHub
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