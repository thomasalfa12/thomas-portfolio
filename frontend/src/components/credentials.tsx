"use client";

import { motion } from "framer-motion";
import { CertificateCard } from "@/components/certificate-card";
import { Credential } from "@/types"; // 1. Impor tipe data

// 2. Definisikan tipe untuk props
interface CredentialsProps {
  credentials: Credential[];
}

// 3. Terima props di sini
export function Credentials({ credentials }: CredentialsProps) {
  return (
    <motion.div
      key="credentials"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="w-full h-full flex flex-col"
    >
      <div className="text-center mb-12">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
          Credentials
        </h2>
        <p className="mt-2 text-lg text-muted-foreground">
          Sertifikasi dan pengakuan formal.
        </p>
      </div>
      <div className="flex-grow overflow-y-auto pr-4 scrollbar-hide">
        {!credentials || credentials.length === 0 ? (
          <p className="text-center text-muted-foreground">
            Tidak ada kredensial untuk ditampilkan.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 4. Gunakan props 'credentials' untuk me-render data */}
            {credentials.map((cred) => (
              <CertificateCard key={cred._id} credential={cred} />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
