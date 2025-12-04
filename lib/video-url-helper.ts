/**
 * Converts video URLs to their embeddable format
 * Supports YouTube and Vimeo
 */
export function convertToEmbedUrl(url: string): string {
  if (!url || url.trim() === '') return ''

  const trimmedUrl = url.trim()

  // YouTube patterns
  const youtubeWatchPattern = /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]+)/
  const youtubeSharePattern = /(?:youtu\.be\/)([a-zA-Z0-9_-]+)/
  const youtubeEmbedPattern = /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/

  // Vimeo patterns
  const vimeoPattern = /(?:vimeo\.com\/)(\d+)/
  const vimeoPlayerPattern = /(?:player\.vimeo\.com\/video\/)(\d+)/

  // Check if it's already an embed URL
  if (youtubeEmbedPattern.test(trimmedUrl) || vimeoPlayerPattern.test(trimmedUrl)) {
    return trimmedUrl
  }

  // Convert YouTube watch URL to embed
  let match = trimmedUrl.match(youtubeWatchPattern)
  if (match) {
    return `https://www.youtube.com/embed/${match[1]}`
  }

  // Convert YouTube share URL to embed
  match = trimmedUrl.match(youtubeSharePattern)
  if (match) {
    return `https://www.youtube.com/embed/${match[1]}`
  }

  // Convert Vimeo URL to embed
  match = trimmedUrl.match(vimeoPattern)
  if (match) {
    return `https://player.vimeo.com/video/${match[1]}`
  }

  // Return original if no pattern matches
  return trimmedUrl
}

/**
 * Validates if a URL is a valid embed URL
 */
export function isValidEmbedUrl(url: string): boolean {
  if (!url || url.trim() === '') return false

  const trimmedUrl = url.trim()

  // Valid embed patterns
  const youtubeEmbedPattern = /^https:\/\/www\.youtube\.com\/embed\/[a-zA-Z0-9_-]+/
  const vimeoEmbedPattern = /^https:\/\/player\.vimeo\.com\/video\/\d+/

  return youtubeEmbedPattern.test(trimmedUrl) || vimeoEmbedPattern.test(trimmedUrl)
}
