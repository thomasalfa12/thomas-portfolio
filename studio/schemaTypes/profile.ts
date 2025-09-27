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
      validation: (Rule) => Rule.required(),
    }),
  ],
})