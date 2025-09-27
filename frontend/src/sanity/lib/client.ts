import {createClient} from 'next-sanity'
import {apiVersion, dataset, projectId} from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Gunakan `true` jika Anda ingin data yang di-cache di production
  // Gunakan `false` jika Anda selalu ingin data terbaru (baik untuk development)
  useCdn: false,
  // Perspektif 'published' berarti kita hanya melihat konten yang sudah di-publish
  // Ganti ke 'preview' jika Anda ingin melihat draf
  perspective: 'published',
})