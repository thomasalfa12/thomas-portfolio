"use client";

import { GithubRepo } from "@/types";
import { GridProjectCard } from "./grid-project-card";
import GitHubCalendar from "react-github-calendar";

interface GithubActivityPageProps {
  githubRepos: GithubRepo[];
}

export function GithubActivityPage({ githubRepos }: GithubActivityPageProps) {
  const calendarTheme = {
    light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
    dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
  };

  return (
    <div className="w-full h-full flex flex-col mt-8 overflow-hidden">
      <div className="mb-8 p-6 bg-card border rounded-lg shadow-sm">
        <h3 className="font-heading text-2xl font-semibold text-foreground text-center mb-4">
          GitHub Contributions
        </h3>
        <div className="flex justify-center">
          <GitHubCalendar
            username="thomasalfa12"
            blockSize={12}
            blockMargin={4}
            fontSize={14}
            theme={calendarTheme}
          />
        </div>
      </div>

      {/* ▼▼▼ PERBAIKAN UTAMA PADA LAYOUT GRID DI SINI ▼▼▼ */}
      <div className="flex-grow overflow-y-auto pr-4 pb-24 scrollbar-hide">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {githubRepos.map((repo) => (
            <GridProjectCard key={repo.id} repo={repo} />
          ))}
        </div>
      </div>
    </div>
  );
}
