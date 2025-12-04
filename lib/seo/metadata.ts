export function generateOGMetadata(params: {
  title: string
  description: string
  image?: string
  url: string
  type?: 'website' | 'article' | 'video.other'
}) {
  return {
    title: params.title,
    description: params.description,
    url: params.url,
    type: params.type || 'website',
    images: params.image ? [{ url: params.image }] : [],
    siteName: 'Flare Films',
  }
}

export function generateTwitterMetadata(params: {
  title: string
  description: string
  image?: string
}) {
  return {
    card: 'summary_large_image' as const,
    title: params.title,
    description: params.description,
    images: params.image ? [params.image] : [],
  }
}
