'use client'

import { useState, useRef, DragEvent, ChangeEvent } from 'react'
import { uploadImage } from '@/lib/actions/upload'
import { Upload, X, Loader2 } from 'lucide-react'
import Image from 'next/image'

interface UploadedImage {
  url: string
  key: string
  preview: string
}

interface MultiImageUploadProps {
  folder?: string
  onImagesChange?: (images: UploadedImage[]) => void
  existingImages?: UploadedImage[]
  maxImages?: number
  className?: string
}

export function MultiImageUpload({
  folder,
  onImagesChange,
  existingImages = [],
  maxImages = 20,
  className = '',
}: MultiImageUploadProps) {
  // ✅ Use prop directly instead of syncing to state
  const images = existingImages
  const [uploading, setUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files) {
      await handleFiles(Array.from(e.dataTransfer.files))
    }
  }

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files) {
      await handleFiles(Array.from(e.target.files))
    }
  }

  const handleFiles = async (files: File[]) => {
    setError(null)

    // Check if adding these files would exceed max
    if (images.length + files.length > maxImages) {
      setError(`Maximum ${maxImages} images allowed`)
      return
    }

    // Filter valid image files
    const validFiles = files.filter((file) => {
      if (!file.type.startsWith('image/')) {
        return false
      }
      if (file.size > 10 * 1024 * 1024) {
        return false
      }
      return true
    })

    if (validFiles.length === 0) {
      setError('No valid images selected')
      return
    }

    setUploading(true)

    try {
      const newImages: UploadedImage[] = []

      for (const file of validFiles) {
        // Create preview
        const preview = await createPreview(file)

        // Upload to R2
        const formData = new FormData()
        formData.append('file', file)
        if (folder) {
          formData.append('folder', folder)
        }

        const result = await uploadImage(formData)

        if (result.success && result.url && result.key) {
          newImages.push({
            url: result.url,
            key: result.key,
            preview,
          })
        }
      }

      const updatedImages = [...images, ...newImages]
      onImagesChange?.(updatedImages)
    } catch (err) {
      setError('Failed to upload some images')
    } finally {
      setUploading(false)
      if (inputRef.current) {
        inputRef.current.value = ''
      }
    }
  }

  const createPreview = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        resolve(reader.result as string)
      }
      reader.readAsDataURL(file)
    })
  }

  const handleRemove = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index)
    onImagesChange?.(updatedImages)
  }

  const handleMoveUp = (index: number) => {
    if (index === 0) return
    const updatedImages = [...images]
    ;[updatedImages[index - 1], updatedImages[index]] = [
      updatedImages[index],
      updatedImages[index - 1],
    ]
    onImagesChange?.(updatedImages)
  }

  const handleMoveDown = (index: number) => {
    if (index === images.length - 1) return
    const updatedImages = [...images]
    ;[updatedImages[index], updatedImages[index + 1]] = [
      updatedImages[index + 1],
      updatedImages[index],
    ]
    onImagesChange?.(updatedImages)
  }

  return (
    <div className={className}>
      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg transition-colors mb-4 ${
          dragActive
            ? 'border-[#b8a862] bg-[#b8a862]/5'
            : 'border-[#d4cfca] hover:border-[#b8a862]'
        } ${uploading ? 'pointer-events-none opacity-50' : ''} ${
          images.length >= maxImages ? 'opacity-50 pointer-events-none' : ''
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleChange}
          className="hidden"
          disabled={uploading || images.length >= maxImages}
        />

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="w-full p-8 flex flex-col items-center justify-center gap-3 text-[#7B756C] hover:text-[#b8a862] transition-colors"
          disabled={uploading || images.length >= maxImages}
        >
          {uploading ? (
            <>
              <Loader2 className="animate-spin" size={32} />
              <p className="text-sm font-sans">Uploading...</p>
            </>
          ) : (
            <>
              <Upload size={32} />
              <div className="text-center">
                <p className="text-sm font-sans font-medium mb-1">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs font-sans text-[#9B9589]">
                  Multiple images, PNG, JPG, WebP up to 10MB each
                </p>
                <p className="text-xs font-sans text-[#9B9589] mt-1">
                  {images.length} / {maxImages} images
                </p>
              </div>
            </>
          )}
        </button>
      </div>

      {error && <p className="mb-4 text-sm text-red-600 font-sans">{error}</p>}

      {/* Image Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={image.key}
              className="relative aspect-video overflow-hidden rounded-lg bg-gray-100 group"
            >
              <Image
                src={image.preview || image.url}
                alt={`Upload ${index + 1}`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => handleMoveUp(index)}
                  disabled={index === 0}
                  className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Move up"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="18 15 12 9 6 15" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => handleMoveDown(index)}
                  disabled={index === images.length - 1}
                  className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Move down"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="p-2 bg-white rounded-full shadow-lg hover:bg-red-100 transition-colors"
                  title="Remove"
                >
                  <X size={16} className="text-red-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
