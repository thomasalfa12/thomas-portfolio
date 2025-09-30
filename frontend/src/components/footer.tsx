"use client";

import { Lock } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="w-full text-center p-4 mt-auto">
      <div className="text-xs text-muted-foreground">
        © {new Date().getFullYear()} Thomas Alfa Edison. All Rights Reserved.
        {/* Tombol akses tersembunyi ke Studio Anda */}
        <Link href="/studio" legacyBehavior>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block ml-2 opacity-30 hover:opacity-100 transition-opacity"
            title="Admin Login" // Menambahkan title untuk aksesibilitas
            aria-label="Admin Login"
          >
            <Lock size={12} />
          </a>
        </Link>
      </div>
    </footer>
  );
};
