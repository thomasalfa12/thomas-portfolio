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
      title: 'Nama Lengkap (English)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headline',
      title: 'Headline (English)',
      type: 'string',
      description: 'Contoh: Full-Stack Developer & SME Web Specialist',
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
      title: 'Bio Singkat (English)',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'profileImage',
      title: 'Foto Profil',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ctaButtonText',
      title: 'Teks Tombol CTA',
      type: 'string',
      description: 'Contoh: "View Projects" atau "Lihat Proyek"',
      initialValue: 'View Projects'
    }),

    defineField({
      name: 'ctaButtonLink',
      title: 'Link Tombol CTA',
      description: 'Pilih seksi tujuan saat tombol di-klik',
      type: 'string',
      options: {
          list: [
              {title: 'Projects', value: 'projects'},
              {title: 'Experience', value: 'experience'},
              {title: 'Credentials', value: 'credentials'},
              {title: 'Contact', value: 'contact'},
          ]
      },
      initialValue: 'projects',
      validation: Rule => Rule.required()
  }),
  defineField({
    name: 'dynamicHeadlines',
    title: 'Daftar Headline Dinamis',
    type: 'array',
    description: 'Teks yang akan ditampilkan bergantian. Contoh: Full-Stack Developer, Web3 Enthusiast, dll.',
    of: [{type: 'string'}]
})
  ],
})