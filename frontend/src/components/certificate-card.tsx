import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { Credential } from "@/types";
import { urlForImage } from "@/sanity/lib/image";

interface CertificateCardProps {
  credential: Credential;
}

export const CertificateCard = ({ credential }: CertificateCardProps) => (
  // Link sekarang akan mengarah ke credential.pdfUrl jika ada
  <motion.a
    href={credential.pdfUrl || "#"}
    target="_blank"
    rel="noopener noreferrer"
    className="group relative block overflow-hidden rounded-lg border"
    whileHover={{ y: -5, scale: 1.02 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    {credential.thumbnail && (
      <Image
        src={urlForImage(credential.thumbnail)!.url()}
        alt={credential.title}
        width={400}
        height={565}
        className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
    )}
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
    <div className="absolute bottom-0 left-0 p-4">
      <h4 className="font-bold text-white">{credential.title}</h4>
      <p className="text-sm text-muted-foreground">{credential.issuer}</p>
    </div>
    {/* Ikon link hanya muncul jika ada PDF yang bisa dibuka */}
    {credential.pdfUrl && (
      <div className="absolute top-4 right-4 p-2 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
        <ExternalLink className="h-5 w-5 text-white" />
      </div>
    )}
  </motion.a>
);
