import { motion } from "framer-motion";
import { Project } from "@/types";
import { urlForImage } from "@/sanity/lib/image";
import Image from "next/image";
import { LinkIcon } from "lucide-react";

function getScreenshotUrl(targetUrl: string): string {
  const apiKey = process.env.NEXT_PUBLIC_SCREENSHOTONE_API_KEY;
  if (!apiKey || !targetUrl.trim()) {
    return "/placeholder.png";
  }
  const encodedUrl = encodeURIComponent(targetUrl.trim());
  return `https://api.screenshotone.com/take?access_key=${apiKey}&url=${encodedUrl}&viewport_width=1280&viewport_height=720&format=jpeg&quality=80`;
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  let imageUrl: string = "/placeholder.png"; // Default ke placeholder
  if (project.thumbnail) {
    imageUrl = urlForImage(project.thumbnail)!.url();
  } else if (project.projectUrl) {
    imageUrl = getScreenshotUrl(project.projectUrl);
  }

  return (
    <motion.a
      href={project.projectUrl || project.githubUrl || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full group"
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="h-full flex flex-col bg-card border rounded-lg p-6 transition-all duration-300 hover:shadow-xl hover:border-primary">
        <div className="relative w-full h-40 mb-4 rounded-md overflow-hidden bg-secondary">
          <Image
            src={imageUrl}
            alt={project.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
            unoptimized
          />
        </div>
        <h3 className="font-heading text-xl font-semibold text-foreground mb-2 flex items-center">
          {project.name}
          {(project.projectUrl || project.githubUrl) && (
            <LinkIcon className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
          )}
        </h3>
        <p className="text-muted-foreground text-sm flex-grow mb-4">
          {project.description}
        </p>
        {project.tags && (
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.a>
  );
}
