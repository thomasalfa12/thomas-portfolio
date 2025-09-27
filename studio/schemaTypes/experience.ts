import {defineField, defineType} from 'sanity'
import {UserIcon} from '@sanity/icons'

export default defineType({
  name: 'experience',
  title: 'Experience',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'company',
      title: 'Company / Organization',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'experienceType',
      title: 'Experience Type',
      type: 'string',
      options: {
        list: [
          {title: 'Work', value: 'work'},
          {title: 'Organization', value: 'organization'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'date',
      title: 'Date Range',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
     defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Gunakan untuk mengurutkan. Angka lebih kecil tampil lebih dulu.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'company',
    },
  },
})