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
      title: 'Judul',
      type: 'string',
      initialValue: 'Let\'s Collaborate',
    }),
    defineField({
      name: 'description',
      title: 'Deskripsi',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'links',
      title: 'Tautan Kontak',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label Tombol',
              type: 'string',
              description: 'Contoh: Email Me',
            }),
            defineField({
              name: 'href',
              title: 'URL/Link',
              type: 'string',
              description: 'Contoh: mailto:email@anda.com',
            }),
            defineField({
              name: 'linkType',
              title: 'Tipe Tombol',
              type: 'string',
              options: {
                list: [
                  {title: 'Email (Utama)', value: 'email'},
                  {title: 'Lainnya (Sekunder)', value: 'other'},
                ],
                layout: 'radio'
              },
              initialValue: 'other'
            }),
          ],
        },
      ],
    }),
  ],
})