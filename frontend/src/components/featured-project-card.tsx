"use client";

import Image from "next/image";
import { Project } from "@/types";
import { urlForImage } from "@/sanity/lib/image";
import { ExternalLink, Code } from "lucide-react";

export const FeaturedProjectCard = ({ item }: { item: Project }) => {
  const imageUrl = item.thumbnail
    ? urlForImage(item.thumbnail)!.url()
    : "/placeholder.png";

  return (
    <div className="bg-card/80 backdrop-blur-md border rounded-xl p-6 flex flex-col shadow-lg h-full overflow-hidden">
      <div className="relative w-full aspect-video mb-4 rounded-md overflow-hidden bg-secondary">
        {item.thumbnail && (
          <Image
            src={imageUrl}
            alt={item.name}
            fill
            sizes="400px"
            className="object-cover object-top"
          />
        )}
      </div>
      <h3 className="font-heading text-xl font-bold text-foreground">
        {item.name}
      </h3>
      <p className="text-sm text-muted-foreground flex-grow my-2 line-clamp-3">
        {item.description}
      </p>
      {item.tags && (
        <div className="flex flex-wrap gap-2 my-4">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      <div className="flex gap-4 mt-auto border-t border-border pt-4">
        {item.projectUrl && (
          <a
            href={item.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            <ExternalLink size={16} /> Live Preview
          </a>
        )}
        {item.githubUrl && (
          <a
            href={item.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            <Code size={16} /> View Code
          </a>
        )}
      </div>
    </div>
  );
};
