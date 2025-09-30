"use server";

import { client } from "@/sanity/lib/client";
import { Profile, Experience, Project, Credential, GithubRepo, ContactInfo } from "@/types";

// Helper function agar kita tidak mengulang-ulang kode fetch
async function sanityFetch<T>(query: string): Promise<T> {
  // Opsi `next: { revalidate: 3600 }` adalah untuk Incremental Static Regeneration (ISR)
  // Ini akan membuat data di-cache selama 1 jam, dan diperbarui saat ada permintaan baru
  // atau saat webhook dari Sanity dipanggil.
  return client.fetch(query, {}, { next: { revalidate: 3600 } });
}

// --- PROFILE ---
export async function getProfile(): Promise<Profile> {
  const query = `*[_type == "profile"][0]{
    ...,
    "cvUrl": cvFile.asset->url
  }`;
  return sanityFetch<Profile>(query);
}

// --- EXPERIENCES ---
export async function getExperiences(): Promise<Experience[]> {
  const query = `*[_type == "experience"]{
    _id,
    title,
    company,
    date,
    summary,
    content,
    experienceType
  } | order(order asc)`;
  return sanityFetch<Experience[]>(query);
}

// --- PROJECTS ---
export async function getProjects(): Promise<Project[]> {
  const query = `*[_type == "project"]{
    _id,
    name,
    status,
    description,
    thumbnail,
    projectUrl,
    githubUrl,
    tags
  } | order(_createdAt desc)`;
  return sanityFetch<Project[]>(query);
}

// --- CREDENTIALS ---
export async function getCredentials(): Promise<Credential[]> {
  const query = `*[_type == "credential"]{
    _id,
    title,
    issuer,
    thumbnail,
    "pdfUrl": pdfFile.asset->url
  } | order(_createdAt desc)`;
  return sanityFetch<Credential[]>(query);
}

// --- CONTACT INFO ---
export async function getContactInfo(): Promise<ContactInfo> {
  const query = `*[_type == "contact"][0]`;
  return sanityFetch<ContactInfo>(query);
}

// --- GITHUB REPOS ---
export async function getGithubPinnedRepos(): Promise<GithubRepo[]> {
  const GITHUB_USERNAME = 'thomasalfa12';
  const GITHUB_PAT = process.env.GH_TOKEN;

  if (!GITHUB_PAT) {
    console.warn('GitHub PAT (GH_TOKEN) not configured.');
    return [];
  }
  
  const query = `query GetPinnedRepos($username: String!) { user(login: $username) { pinnedItems(first: 6, types: REPOSITORY) { nodes { ... on Repository { id, name, description, url, forkCount, stargazerCount, primaryLanguage { name, color } } } } } }`;
  
  try {
    const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: { Authorization: `Bearer ${GITHUB_PAT}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables: { username: GITHUB_USERNAME } }),
        next: { revalidate: 3600 },
    });
    if (!response.ok) throw new Error(`GitHub API responded with ${response.status}`);
    const json = await response.json();
    if (json.errors) throw new Error(JSON.stringify(json.errors));
    return json.data.user.pinnedItems.nodes;
  } catch (error) {
    console.error('Failed to fetch pinned repositories:', error);
    return [];
  }
}