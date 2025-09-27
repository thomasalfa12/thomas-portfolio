import {defineField, defineType} from 'sanity'
import {ComposeIcon} from '@sanity/icons'

export default defineType({
  name: 'credential',
  title: 'Credential',
  type: 'document',
  icon: ComposeIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Nama Sertifikat / Penghargaan',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'issuer',
      title: 'Penerbit / Penyelenggara',
      type: 'string',
    }),
    defineField({
      name: 'thumbnail',
      title: 'Gambar Sertifikat (Thumbnail)',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
    // ▼▼▼ PERBAIKAN DI SINI ▼▼▼
    defineField({
      name: 'pdfFile', // Ganti nama agar lebih jelas
      title: 'File Dokumen/PDF',
      description: 'Unggah file sertifikat di sini.',
      type: 'file', // Ubah tipe dari 'url' menjadi 'file'
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'issuer',
      media: 'thumbnail',
    },
  },
})