"use server";

import { client } from "@/sanity/lib/client";
import { Profile, Experience, Project, Credential, GithubRepo,  ContactInfo  } from "@/types";

// --- PROFILE ---
export async function getProfile(): Promise<Profile> {
  // Query-nya tidak perlu diubah, karena `...` sudah mengambil semua field
  const query = `*[_type == "profile"][0]`; 
  const data = await client.fetch(query);
  return data;
}

// --- EXPERIENCES ---
export async function getExperiences(): Promise<Experience[]> {
  // Ambil field 'summary' dan 'content' yang baru
  const query = `*[_type == "experience"]{
    _id,
    title,
    company,
    date,
    summary,
    content
  } | order(order asc)`;
  const data = await client.fetch(query);
  return data;
}

// --- PROJECTS ---
export async function getProjects(): Promise<Project[]> {
  const query = `*[_type == "project"] | order(_createdAt desc)`;
  const data = await client.fetch(query);
  return data;
}

// --- CREDENTIALS ---
export async function getCredentials(): Promise<Credential[]> {
  // ▼▼▼ PERBAIKAN QUERY GROQ DI SINI ▼▼▼
  const query = `*[_type == "credential"]{
    _id,
    title,
    issuer,
    thumbnail,
    "pdfUrl": pdfFile.asset->url // Mengambil URL dari file yang diunggah
  } | order(_createdAt desc)`;
  
  const data = await client.fetch(query);
  return data;
}
export async function getAllGithubRepos(): Promise<GithubRepo[]> {
  const GITHUB_USERNAME = 'thomasalfa12';
  const GITHUB_PAT = process.env.GH_TOKEN;

  if (!GITHUB_PAT) {
    console.warn('GitHub PAT (GH_TOKEN) not configured.');
    return [];
  }
  
  // Kita gunakan REST API untuk mengambil semua repo
  const apiUrl = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&direction=desc&per_page=100`;

  try {
    const response = await fetch(apiUrl, {
        headers: { Authorization: `Bearer ${GITHUB_PAT}` },
        next: { revalidate: 3600 }, // Cache selama 1 jam
    });

    if (!response.ok) throw new Error(`GitHub API responded with ${response.status}`);
    
    const repos = await response.json();

    // Format data agar sesuai dengan tipe GithubRepo kita
    return repos.map((repo: { id: number; name: string; description: string; html_url: string; stargazers_count: number; forks_count: number; language: string | null }): GithubRepo => ({
        id: repo.id.toString(),
        name: repo.name,
        description: repo.description,
        url: repo.html_url,
        stargazerCount: repo.stargazers_count,
        forkCount: repo.forks_count,
        primaryLanguage: repo.language ? { name: repo.language, color: '' } : null,
    }));
  } catch (error) {
    console.error('Failed to fetch all GitHub repos:', error);
    return [];
  }

}
export async function getContactInfo(): Promise<ContactInfo> {
  const query = `*[_type == "contact"][0]`;
  const data = await client.fetch(query);
  return data;
}