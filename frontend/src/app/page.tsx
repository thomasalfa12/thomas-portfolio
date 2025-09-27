// HANYA impor 'skillsData' dari content.ts
import { skillsData } from "@/data/content";
import {
  getProfile,
  getExperiences,
  getProjects,
  getCredentials,
  getAllGithubRepos,
  getContactInfo, // Impor fungsi untuk mengambil data kontak
} from "@/lib/action";
import ClientPage from "./ClientPage";

export default async function Home() {
  // Ambil SEMUA data dinamis, termasuk contactInfo, dari Sanity
  const [
    profile,
    experiences,
    sanityProjects,
    allGithubRepos,
    credentials,
    contactInfo,
  ] = await Promise.all([
    getProfile(),
    getExperiences(),
    getProjects(),
    getAllGithubRepos(),
    getCredentials(),
    getContactInfo(), // Panggil action untuk data kontak
  ]);

  return (
    <ClientPage
      profile={profile}
      experiences={experiences}
      sanityProjects={sanityProjects}
      githubRepos={allGithubRepos}
      credentials={credentials}
      skills={skillsData} // Berikan data skill statis
      contactInfo={contactInfo} // Berikan data kontak dinamis dari Sanity
    />
  );
}
