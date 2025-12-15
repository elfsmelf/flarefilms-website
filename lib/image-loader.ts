import type { ImageLoaderProps } from "next/image"

const CF_DOMAIN = "https://assets.guestsnapper.com"

export default function cloudflareLoader({ src, width, quality }: ImageLoaderProps): string {
  const q = quality ?? 75

  // If the src is already a full URL from assets.guestsnapper.com, extract the path
  if (src.startsWith(CF_DOMAIN)) {
    const path = src.replace(CF_DOMAIN, "")
    return `${CF_DOMAIN}/cdn-cgi/image/width=${width},quality=${q},format=auto${path}`
  }

  // If the src is a full URL from another domain, return as-is (fallback)
  if (src.startsWith("http://") || src.startsWith("https://")) {
    return src
  }

  // If it's a local path (starts with /), use Vercel's default behavior
  if (src.startsWith("/")) {
    // For local images, we'll let Next.js handle them normally
    // Return a path that Next.js can optimize
    return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${q}`
  }

  // Otherwise, assume it's a relative path on the CF domain
  return `${CF_DOMAIN}/cdn-cgi/image/width=${width},quality=${q},format=auto/${src}`
}
