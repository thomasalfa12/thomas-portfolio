"use client";

import { motion } from "framer-motion";
import { Experience, SanityImage } from "@/types"; // 1. Impor tipe SanityImage
import { PortableText, PortableTextComponentProps } from "@portabletext/react";
import { urlForImage } from "@/sanity/lib/image";
import Image from "next/image";
import { X } from "lucide-react";

interface ExperienceModalProps {
  experience: Experience;
  onClose: () => void;
}

// 2. Terapkan tipe yang benar untuk props komponen
const SanityImageComponent = ({
  value,
}: PortableTextComponentProps<SanityImage>) => {
  // Pastikan value dan asset ada sebelum merender
  if (!value?.asset) {
    return null;
  }
  return (
    <div className="relative w-full h-96 my-8 rounded-lg overflow-hidden shadow-lg">
      <Image
        src={urlForImage(value)!.url()}
        alt={value.alt || "Experience Image"}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 800px"
      />
    </div>
  );
};

export const ExperienceModal = ({
  experience,
  onClose,
}: ExperienceModalProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[90vh] bg-card border rounded-xl shadow-2xl flex flex-col"
      >
        <div className="p-6 border-b flex-shrink-0">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            {experience.title}
          </h2>
          <p className="text-md text-muted-foreground">{experience.company}</p>
        </div>

        {/* Tambahkan styling 'prose' untuk membuat teks lebih rapi */}
        <div className="p-6 overflow-y-auto prose prose-neutral dark:prose-invert prose-lg max-w-none">
          <PortableText
            value={experience.content}
            components={{
              types: {
                image: SanityImageComponent,
              },
            }}
          />
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </motion.div>
    </motion.div>
  );
};
