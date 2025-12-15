import type { ImageLoaderProps } from "next/image"

const CF_DOMAIN = "https://assets.guestsnapper.com"

export default function cloudflareLoader({ src, width, quality }: ImageLoaderProps): string {
  const q = quality ?? 75

  // If the src is already a full URL from assets.guestsnapper.com, use Cloudflare Image Resizing
  if (src.startsWith(CF_DOMAIN)) {
    const path = src.replace(CF_DOMAIN, "")
    return `${CF_DOMAIN}/cdn-cgi/image/width=${width},quality=${q},format=auto${path}`
  }

  // If it's a local path (starts with /), return as-is - Next.js will serve from public folder
  if (src.startsWith("/")) {
    return src
  }

  // If the src is a full URL from another domain, return as-is (no optimization)
  if (src.startsWith("http://") || src.startsWith("https://")) {
    return src
  }

  // Otherwise, assume it's a relative path on the CF domain
  return `${CF_DOMAIN}/cdn-cgi/image/width=${width},quality=${q},format=auto/${src}`
}
