import {defineField, defineType} from 'sanity'
import {UserIcon} from '@sanity/icons'

export default defineType({
  name: 'profile',
  title: 'Profile',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Nama Lengkap',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      description: 'Contoh: Full-Stack Developer & UMKM Web Specialist',
      validation: (Rule) => Rule.required(),
    }),
     defineField({
      name: 'shortIntro',
      title: 'Intro Singkat (untuk Dynamic Headline)',
      type: 'string',
      description: 'Teks yang muncul sebelum headline dinamis. Contoh: "I am a" atau "Saya seorang"',
      initialValue: 'I am a'
    }),
    defineField({
      name: 'bio',
      title: 'Bio Singkat',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'profileImage',
      title: 'Foto Profil',
      type: 'image',
      options: {hotspot: true},
      // ▼▼▼ TAMBAHKAN FIELD INI ▼▼▼
      fields: [
        {
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          description: 'Deskripsi singkat tentang gambar (penting untuk SEO & aksesibilitas).',
        }
      ],
      validation: (Rule) => Rule.required(),
    }),
         
    defineField({
      name: 'ctaButtonText',
      title: 'Teks Tombol CTA',
      type: 'string',
      initialValue: 'View Projects'
    }),

    // --- PERUBAHAN UTAMA DI SINI ---
    defineField({
      name: 'ctaButtonActionType',
      title: 'Aksi Tombol CTA',
      type: 'string',
      options: {
        list: [
          {title: 'Pindah ke Seksi Internal', value: 'internal'},
          {title: 'Buka Link/File Eksternal', value: 'external'},
        ],
        layout: 'radio'
      },
      initialValue: 'internal'
    }),
    
    defineField({
      name: 'ctaInternalLink',
      title: 'Seksi Internal Tujuan',
      type: 'string',
      options: {
        list: [
          {title: 'Projects', value: 'projects'},
          {title: 'Experience', value: 'experience'},
          {title: 'Credentials', value: 'credentials'},
          {title: 'Contact', value: 'contact'},
        ]
      },
      // Muncul hanya jika 'Aksi Tombol CTA' adalah 'internal'
      hidden: ({document}) => document?.ctaButtonActionType !== 'internal',
      initialValue: 'projects'
    }),

    defineField({
      name: 'ctaExternalUrl',
      title: 'URL Eksternal Tujuan',
      description: 'Masukkan link lengkap (misal: link CV, link proyek khusus)',
      type: 'url',
      // Muncul hanya jika 'Aksi Tombol CTA' adalah 'external'
      hidden: ({document}) => document?.ctaButtonActionType !== 'external'
    }),
    
    // Field untuk mengunggah CV langsung ke Sanity (LEBIH BAIK)
    defineField({
        name: 'cvFile',
        title: 'File CV (PDF)',
        description: 'Unggah file CV Anda di sini. Jika diisi, ini akan lebih diprioritaskan daripada URL eksternal di atas untuk tautan CV.',
        type: 'file',
        options: {
            accept: '.pdf'
        }
    }),

    defineField({
      name: 'dynamicHeadlines',
      title: 'Daftar Headline Dinamis',
      type: 'array',
      of: [{type: 'string'}]
    })
  ],
})