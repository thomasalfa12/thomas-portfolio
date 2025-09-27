"use client";

import { motion } from "framer-motion";
import { GithubRepo } from "@/types";
import { Github, Star, GitFork } from "lucide-react";

interface GridProjectCardProps {
  repo: GithubRepo;
}

export function GridProjectCard({ repo }: GridProjectCardProps) {
  return (
    <motion.a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full group"
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="h-full flex flex-col bg-card border rounded-lg p-6 transition-all duration-300 hover:shadow-xl hover:border-primary">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-heading text-xl font-semibold text-foreground group-hover:text-primary transition-colors pr-2">
            {repo.name}
          </h3>
          <Github className="w-5 h-5 text-muted-foreground flex-shrink-0" />
        </div>

        <p className="text-muted-foreground text-sm flex-grow mb-4 line-clamp-3">
          {repo.description}
        </p>

        <div className="flex justify-between items-end mt-auto">
          {repo.primaryLanguage && (
            <div className="flex flex-wrap gap-2">
              <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
                {repo.primaryLanguage.name}
              </span>
            </div>
          )}
          <div className="flex items-center gap-4 text-sm text-muted-foreground ml-auto">
            <div className="flex items-center gap-1">
              <Star size={16} />
              <span>{repo.stargazerCount}</span>
            </div>
            <div className="flex items-center gap-1">
              <GitFork size={16} />
              <span>{repo.forkCount}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.a>
  );
}
