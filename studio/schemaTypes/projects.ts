import {defineField, defineType} from 'sanity'
import {ProjectsIcon} from '@sanity/icons'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: ProjectsIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Nama Proyek',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Deskripsi Singkat',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Gambar Thumbnail',
      type: 'image',
      description: 'Gambar preview untuk proyek. Ukuran rekomendasi 1280x720px.',
      options: {hotspot: true},
      // PERUBAHAN: Jadikan field ini wajib diisi
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'projectUrl',
      title: 'URL Live Preview',
      type: 'url',
    }),
    defineField({
      name: 'githubUrl',
      title: 'URL GitHub Repository',
      type: 'url',
    }),
    defineField({
      name: 'tags',
      title: 'Teknologi yang Digunakan',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    }),
  ],
})