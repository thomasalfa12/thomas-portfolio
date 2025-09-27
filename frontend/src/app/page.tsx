import {
  getProfile,
  getExperiences,
  getProjects,
  getCredentials,
  getAllGithubRepos,
} from "@/lib/action";
import { skillsData, contactData } from "@/data/content";
import ClientPage from "./ClientPage";

export default async function Home() {
  const [profile, experiences, sanityProjects, allGithubRepos, credentials] =
    await Promise.all([
      getProfile(),
      getExperiences(),
      getProjects(),
      getAllGithubRepos(),
      getCredentials(),
    ]);

  return (
    <ClientPage
      profile={profile}
      experiences={experiences}
      sanityProjects={sanityProjects}
      githubRepos={allGithubRepos}
      credentials={credentials}
      skills={skillsData}
      contactInfo={contactData}
    />
  );
}
