import createImageUrlBuilder from '@sanity/image-url'
import type { Image } from 'sanity'

import { dataset, projectId } from '../env'

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
})

export const urlForImage = (source: Image) => {
  // Pastikan source ada dan memiliki asset._ref sebelum memanggil builder
  if (!source?.asset?._ref) {
    return undefined;
  }
  
  return imageBuilder?.image(source).auto('format').fit('max')
}