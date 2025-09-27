"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import DynamicHeadline from "@/components/dynamic-headline";
import { Profile, SectionId } from "@/types";
import { urlForImage } from "@/sanity/lib/image";
import { ArrowRight } from "lucide-react";
import React from "react";

// Definisikan tipe untuk props
interface HeroProps {
  profile: Profile;
  setActiveSection: React.Dispatch<React.SetStateAction<SectionId>>;
}

// Varian animasi untuk stagger effect
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

export function HeroSection({ profile, setActiveSection }: HeroProps) {
  // Handler untuk klik tombol
  const handleCtaClick = () => {
    if (profile?.ctaButtonLink) {
      // Mengubah seksi aktif di ClientPage
      setActiveSection(profile.ctaButtonLink as SectionId);
    }
  };

  return (
    <motion.div
      key="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full flex-grow flex items-center"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Kolom Kiri: Gambar Profil */}
        <motion.div
          className="relative flex justify-center items-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
        >
          <div className="absolute w-[80%] h-[80%] bg-primary/10 rounded-full blur-3xl"></div>
          {profile?.profileImage && (
            <motion.div
              className="relative w-64 h-64 md:w-80 md:h-80"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                src={urlForImage(profile.profileImage)!
                  .width(500)
                  .height(500)
                  .quality(95)
                  .url()}
                alt={profile.name || "Foto Profil"}
                fill
                sizes="(max-width: 768px) 256px, 320px"
                className="object-cover rounded-full border-4 border-card shadow-xl"
                priority
              />
            </motion.div>
          )}
        </motion.div>

        {/* Kolom Kanan: Teks & CTA */}
        <motion.div
          className="text-center md:text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={itemVariants}
            className="font-heading text-5xl md:text-7xl font-bold text-foreground leading-tight tracking-tighter"
          >
            {profile?.name}
          </motion.h1>
          <motion.h2
            variants={itemVariants}
            className="mt-4 font-heading text-2xl md:text-3xl font-semibold text-foreground"
          >
            {profile?.shortIntro}{" "}
            <DynamicHeadline headlines={profile?.dynamicHeadlines} />
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-6 text-lg md:text-xl max-w-xl mx-auto md:mx-0 text-muted-foreground text-justify"
          >
            {profile?.bio}
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-wrap justify-center md:justify-start gap-4"
          >
            <button
              onClick={handleCtaClick}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-primary/90 transition-colors"
            >
              {profile?.ctaButtonText} <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
