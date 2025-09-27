"use client";

import { motion } from "framer-motion";
import { ContactData } from "@/data/content"; // Impor tipe dari content.ts

interface ContactProps {
  contactInfo: ContactData;
}

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
          {contactInfo.links.map((link) => (
            <motion.a
              key={link.type}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold transition-colors ${
                link.type === "email"
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-card border hover:bg-secondary"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Langsung render ikon dari JSX */}
              {link.icon} {link.label}
            </motion.a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
