import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schema} from './schemaTypes'

// 1. Impor 'structure' dari file structure.ts Anda
import {structure} from './structure'

export default defineConfig({
  name: 'default',
  title: 'my-portfolio',

  projectId: '5ifsn7cc',
  dataset: 'production',

  // 2. Masukkan 'structure' ke dalam structureTool
  plugins: [structureTool({structure}), visionTool()],

  schema: {
    types: schema.types,
  },
})