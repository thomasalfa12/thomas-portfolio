"use client";

import Image from "next/image";
import { Project } from "@/types";
import { urlForImage } from "@/sanity/lib/image";
import { ExternalLink, Code } from "lucide-react";

// Komponen Badge Status
const StatusBadge = ({
  status,
}: {
  status?: "live" | "development" | "archived";
}) => {
  if (!status) return null;

  const statusConfig = {
    live: { text: "Live", led: "bg-green-500" },
    development: { text: "In Development", led: "bg-yellow-500" },
    archived: { text: "Archived", led: "bg-gray-500" },
  };
  const config = statusConfig[status];
  if (!config) return null;

  return (
    <div className="absolute top-4 right-4 inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold bg-card/80 backdrop-blur-md border border-white/20 text-foreground">
      <span
        className={`w-2 h-2 rounded-full ${config.led} animate-pulse`}
      ></span>
      <span>{config.text}</span>
    </div>
  );
};

export const FeaturedProjectCard = ({ item }: { item: Project }) => {
  const imageUrl = item.thumbnail
    ? urlForImage(item.thumbnail)!.url()
    : "/placeholder.png";

  return (
    <div className="relative bg-card/70 backdrop-blur-xl border rounded-xl p-6 flex flex-col shadow-lg h-full overflow-hidden group">
      {/* Tampilkan Badge Status di sini */}
      <StatusBadge status={item.status} />

      <div className="relative w-full aspect-[16/10] mb-4 rounded-md overflow-hidden bg-secondary">
        {item.thumbnail && (
          <Image
            src={imageUrl}
            alt={item.name}
            fill
            sizes="400px"
            className="object-cover object-top group-hover:scale-105 transition-transform duration-300 ease-in-out"
          />
        )}
      </div>

      <h3 className="font-heading text-xl font-bold text-foreground">
        {item.name}
      </h3>

      {/* Deskripsi sekarang bisa di-scroll jika terlalu panjang */}
      <div className="flex-grow my-2 overflow-y-auto scrollbar-hide max-h-[100px]">
        <p className="text-sm text-muted-foreground">{item.description}</p>
      </div>

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
