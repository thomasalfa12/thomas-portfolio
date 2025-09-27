import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-sora",
});

export const metadata = {
  title: "Thomas Alfa Edison | Software Developer & UMKM Web Specialist",
  description:
    "Membangun solusi digital yang modern, cepat, dan fungsional untuk bisnis Anda.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen font-sans antialiased",
          inter.variable,
          sora.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
