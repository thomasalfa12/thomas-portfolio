# Portofolio Pribadi - Next.js & Sanity

Ini adalah repositori untuk portofolio pribadi saya yang telah didesain ulang total, dibangun dengan arsitektur *headless* modern menggunakan Next.js untuk frontend dan Sanity.io sebagai CMS.

**✨ Tautan Live:**
* **Website Portofolio:** [**thomas-portfolio.vercel.app**](https://<LINK_WEBSITE_VERCEL_ANDA>) 
* **Dasbor CMS (Sanity Studio):** [**thomas-portfolio.sanity.studio**](https://<LINK_SANITY_STUDIO_ANDA>)

![Screenshot Portofolio](<SCREENSHOT_HALAMAN_UTAMA_ANDA>)

---

## 🎯 Filosofi Proyek

Proyek ini bertujuan untuk menciptakan identitas digital yang profesional, modern, dan interaktif. Arsitekturnya dipisah (*decoupled*) antara frontend dan CMS untuk fleksibilitas maksimal, kecepatan, dan kemudahan dalam mengelola konten.

* **Frontend (`/frontend`):** Dibangun dengan Next.js App Router untuk performa server-side rendering terbaik.
* **CMS (`/studio`):** Dikelola oleh Sanity.io, memungkinkan pembaruan konten (profil, pengalaman, proyek) secara *real-time* tanpa perlu menyentuh kode.

---

## 🛠️ Teknologi yang Digunakan

| Kategori      | Teknologi                                                                                                                              |
| :------------ | :------------------------------------------------------------------------------------------------------------------------------------- |
| **Framework** | ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white) ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) |
| **Styling** | ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)                  |
| **Animasi** | ![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)                       |
| **CMS** | ![Sanity.io](https://img.shields.io/badge/Sanity-F03E2F?style=for-the-badge&logo=sanity&logoColor=white)                                  |
| **Bahasa** | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)                       |

---

## 🚀 Menjalankan Proyek Secara Lokal

Proyek ini menggunakan struktur monorepo. Anda perlu menjalankan dua server development secara bersamaan.

### 1. Menjalankan Frontend (Next.js)

```bash
# Masuk ke folder frontend
cd frontend

# Install dependencies
npm install

# Jalankan server development
npm run dev
