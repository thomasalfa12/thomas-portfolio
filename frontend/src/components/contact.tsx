"use client";

import { motion } from "framer-motion";
import { ContactInfo, ContactLink } from "@/types";
import { Mail, Linkedin, Github } from "lucide-react";
import React from "react";

interface ContactProps {
  contactInfo: ContactInfo;
}

// PETA IKON & LABEL: Kunci untuk otomatisasi
// Kita definisikan ikon dan label default di sini berdasarkan 'linkType' dari Sanity
const linkDetailsMap = {
  email: {
    label: "Email",
    icon: <Mail className="mr-2 h-4 w-4" />,
  },
  linkedin: {
    label: "LinkedIn",
    icon: <Linkedin className="mr-2 h-4 w-4" />,
  },
  github: {
    label: "GitHub",
    icon: <Github className="mr-2 h-4 w-4" />,
  },
};

export function Contact({ contactInfo }: ContactProps) {
  if (!contactInfo) return null;

  return (
    <motion.div
      key="contact"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="w-full h-full flex flex-col justify-center items-center text-center"
    >
      <div className="max-w-2xl">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
          {contactInfo.title}
        </h2>
        <p className="mt-4 text-lg text-muted-foreground mx-auto">
          {contactInfo.description}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {contactInfo.links?.map((link: ContactLink) => {
            // Ambil detail (ikon & label) dari peta berdasarkan tipenya
            const details =
              linkDetailsMap[link.linkType] || linkDetailsMap.email;

            return (
              <motion.a
                key={link._key}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold transition-colors ${
                  link.linkType === "email"
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-card border hover:bg-secondary"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {details.icon} {details.label}
              </motion.a>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
