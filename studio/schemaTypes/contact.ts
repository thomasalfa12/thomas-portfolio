import {defineField, defineType} from 'sanity'
import {EnvelopeIcon} from '@sanity/icons'

export default defineType({
  name: 'contact',
  title: 'Contact Info',
  type: 'document',
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Judul (English)',
      type: 'string',
      initialValue: 'Let\'s Collaborate!',
    }),
    defineField({
      name: 'description',
      title: 'Deskripsi (English)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'links',
      title: 'Tautan Kontak',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({
            name: 'label',
            title: 'Label',
            type: 'string'
          }),
          defineField({
            name: 'href',
            title: 'URL',
            type: 'string'
          }),
          defineField({
            name: 'linkType',
            title: 'Tipe Tautan (untuk Ikon & Style)',
            type: 'string',
            options: {
              list: [
                {title: 'Email (Tombol Utama)', value: 'email'},
                {title: 'LinkedIn', value: 'linkedin'},
                {title: 'GitHub', value: 'github'},
              ],
            },
          }),
        ],
      }],
    }),
  ],
})