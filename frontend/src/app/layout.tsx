// 1. 'Metadata' is imported here
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

// 2. 'Metadata' is used here to type the 'metadata' object
export const metadata: Metadata = {
  title: "Thomas Alfa Edison | Software Developer",
  description:
    "The personal portfolio of Thomas Alfa Edison, a software developer focusing on modern web solutions for SMEs and businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen font-sans bg-background text-foreground antialiased",
          inter.variable,
          sora.variable
        )}
      >
        {/* SVG for the 'gooey' dock effect, should you want to use it later */}
        <svg width="0" height="0" style={{ position: "absolute" }}>
          <defs>
            <filter id="gooey">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="10"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                result="goo"
              />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>
        {children}
      </body>
    </html>
  );
}
