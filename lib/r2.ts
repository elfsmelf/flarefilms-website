import 'server-only'

import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { createId } from '@paralleldrive/cuid2'

// Initialize R2 client
const r2Client = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
})

const BUCKET_NAME = process.env.R2_BUCKET_NAME!
const PUBLIC_URL = process.env.R2_PUBLIC_URL!

export interface UploadResult {
  url: string
  key: string
}

/**
 * Upload a file to Cloudflare R2
 * @param file - The file to upload (as Buffer or Uint8Array)
 * @param filename - Original filename
 * @param folder - Optional folder prefix (e.g., 'films', 'venues')
 * @returns Object with public URL and storage key
 */
export async function uploadToR2(
  file: Buffer | Uint8Array,
  filename: string,
  folder?: string
): Promise<UploadResult> {
  // Generate unique filename to prevent collisions
  const ext = filename.split('.').pop()
  const uniqueFilename = `${createId()}.${ext}`
  const key = folder
    ? `wedding-gallery-media/general-storage/${folder}/${uniqueFilename}`
    : `wedding-gallery-media/general-storage/${uniqueFilename}`

  // Determine content type from extension
  const contentType = getContentType(ext || '')

  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    Body: file,
    ContentType: contentType,
  })

  await r2Client.send(command)

  // Return public URL
  const url = `${PUBLIC_URL}/${key}`

  return {
    url,
    key,
  }
}

/**
 * Delete a file from Cloudflare R2
 * @param key - The storage key of the file to delete
 */
export async function deleteFromR2(key: string): Promise<void> {
  const command = new DeleteObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  })

  await r2Client.send(command)
}

/**
 * Get content type from file extension
 */
function getContentType(ext: string): string {
  const contentTypes: Record<string, string> = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    webp: 'image/webp',
    svg: 'image/svg+xml',
    pdf: 'application/pdf',
    mp4: 'video/mp4',
    mov: 'video/quicktime',
  }

  return contentTypes[ext.toLowerCase()] || 'application/octet-stream'
}

/**
 * Convert a File object to Buffer
 * @param file - Browser File object
 */
export async function fileToBuffer(file: File): Promise<Buffer> {
  const arrayBuffer = await file.arrayBuffer()
  return Buffer.from(arrayBuffer)
}
