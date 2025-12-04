'use server'

import { uploadToR2, deleteFromR2, fileToBuffer } from '@/lib/r2'
import { requireAuth } from '@/lib/session'

export interface UploadResponse {
  success: boolean
  url?: string
  key?: string
  error?: string
}

/**
 * Server action to upload an image to R2
 * Requires authentication
 */
export async function uploadImage(formData: FormData): Promise<UploadResponse> {
  try {
    // Ensure user is authenticated
    await requireAuth()

    const file = formData.get('file') as File
    const folder = formData.get('folder') as string | null

    if (!file) {
      return {
        success: false,
        error: 'No file provided',
      }
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return {
        success: false,
        error: 'File must be an image',
      }
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      return {
        success: false,
        error: 'File size must be less than 10MB',
      }
    }

    // Convert to buffer and upload
    const buffer = await fileToBuffer(file)
    const result = await uploadToR2(buffer, file.name, folder || undefined)

    return {
      success: true,
      url: result.url,
      key: result.key,
    }
  } catch (error) {
    console.error('Upload error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to upload file',
    }
  }
}

/**
 * Server action to delete an image from R2
 * Requires authentication
 */
export async function deleteImage(key: string): Promise<UploadResponse> {
  try {
    // Ensure user is authenticated
    await requireAuth()

    if (!key) {
      return {
        success: false,
        error: 'No key provided',
      }
    }

    await deleteFromR2(key)

    return {
      success: true,
    }
  } catch (error) {
    console.error('Delete error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete file',
    }
  }
}

/**
 * Server action to upload an image from a URL or base64 string
 * Requires authentication
 */
export async function uploadImageFromUrl(
  imageData: string,
  folder?: string
): Promise<UploadResponse> {
  try {
    // Ensure user is authenticated
    await requireAuth()

    if (!imageData) {
      return {
        success: false,
        error: 'No image data provided',
      }
    }

    // Extract base64 data
    const base64Data = imageData.includes('base64,')
      ? imageData.split('base64,')[1]
      : imageData

    // Convert base64 to buffer
    const buffer = Buffer.from(base64Data, 'base64')

    // Validate size (max 10MB)
    const maxSize = 10 * 1024 * 1024
    if (buffer.length > maxSize) {
      return {
        success: false,
        error: 'Image size must be less than 10MB',
      }
    }

    // Generate a unique filename
    const timestamp = Date.now()
    const random = Math.random().toString(36).substring(7)
    const filename = `image-${timestamp}-${random}.jpg`

    // Upload to R2
    const result = await uploadToR2(buffer, filename, folder)

    return {
      success: true,
      url: result.url,
      key: result.key,
    }
  } catch (error) {
    console.error('Upload from URL error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to upload image',
    }
  }
}

/**
 * Server action to upload multiple images
 * Returns array of results
 */
export async function uploadMultipleImages(
  formData: FormData,
  folder?: string
): Promise<UploadResponse[]> {
  try {
    // Ensure user is authenticated
    await requireAuth()

    const files = formData.getAll('files') as File[]

    if (!files.length) {
      return [
        {
          success: false,
          error: 'No files provided',
        },
      ]
    }

    const results: UploadResponse[] = []

    for (const file of files) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        results.push({
          success: false,
          error: `${file.name}: File must be an image`,
        })
        continue
      }

      // Validate file size
      const maxSize = 10 * 1024 * 1024 // 10MB
      if (file.size > maxSize) {
        results.push({
          success: false,
          error: `${file.name}: File size must be less than 10MB`,
        })
        continue
      }

      try {
        const buffer = await fileToBuffer(file)
        const result = await uploadToR2(buffer, file.name, folder)

        results.push({
          success: true,
          url: result.url,
          key: result.key,
        })
      } catch (error) {
        results.push({
          success: false,
          error: `${file.name}: ${error instanceof Error ? error.message : 'Upload failed'}`,
        })
      }
    }

    return results
  } catch (error) {
    console.error('Multiple upload error:', error)
    return [
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to upload files',
      },
    ]
  }
}
