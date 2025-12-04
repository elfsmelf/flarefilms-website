'use client'

import { useState, useRef, DragEvent, ChangeEvent } from 'react'
import { uploadImage } from '@/lib/actions/upload'
import { Upload, X, Loader2 } from 'lucide-react'
import Image from 'next/image'

interface ImageUploadProps {
  folder?: string
  onUploadComplete?: (url: string, key: string) => void
  onUploadError?: (error: string) => void
  currentImage?: string
  className?: string
}

export function ImageUpload({
  folder,
  onUploadComplete,
  onUploadError,
  currentImage,
  className = '',
}: ImageUploadProps) {
  // Validate initial image URL
  const getValidImageUrl = (url: string | undefined | null): string | null => {
    if (!url || url.trim() === '') return null
    // Check if it's a valid URL or data URL
    if (url.startsWith('data:') || url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/')) {
      return url
    }
    return null
  }

  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(getValidImageUrl(currentImage))
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

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await handleFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      await handleFile(e.target.files[0])
    }
  }

  const handleFile = async (file: File) => {
    setError(null)

    // Validate file type
    if (!file.type.startsWith('image/')) {
      const errorMsg = 'Please select an image file'
      setError(errorMsg)
      onUploadError?.(errorMsg)
      return
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      const errorMsg = 'Image must be less than 10MB'
      setError(errorMsg)
      onUploadError?.(errorMsg)
      return
    }

    // Show preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)

    // Upload to R2
    setUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)
      if (folder) {
        formData.append('folder', folder)
      }

      const result = await uploadImage(formData)

      if (result.success && result.url && result.key) {
        // Validate and update preview to show the actual uploaded URL
        const validUrl = getValidImageUrl(result.url)
        if (validUrl) {
          setPreview(validUrl)
          onUploadComplete?.(result.url, result.key)
        } else {
          const errorMsg = `Invalid image URL returned from upload: ${result.url}. Please check your R2_PUBLIC_URL environment variable.`
          console.error('Upload error:', errorMsg)
          setError(errorMsg)
          onUploadError?.(errorMsg)
          setPreview(null)
        }
      } else {
        const errorMsg = result.error || 'Upload failed'
        setError(errorMsg)
        onUploadError?.(errorMsg)
        setPreview(null)
      }
    } catch (err) {
      const errorMsg = 'Failed to upload image'
      setError(errorMsg)
      onUploadError?.(errorMsg)
      setPreview(null)
    } finally {
      setUploading(false)
    }
  }

  const handleClear = () => {
    setPreview(null)
    setError(null)
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  return (
    <div className={className}>
      <div
        className={`relative border-2 border-dashed rounded-lg transition-colors ${
          dragActive
            ? 'border-[#b8a862] bg-[#b8a862]/5'
            : 'border-[#d4cfca] hover:border-[#b8a862]'
        } ${uploading ? 'pointer-events-none opacity-50' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
          disabled={uploading}
        />

        {preview ? (
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <Image src={preview} alt="Preview" fill className="object-cover" />
            {!uploading && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
              >
                <X size={16} />
              </button>
            )}
            {uploading && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Loader2 className="animate-spin text-white" size={32} />
              </div>
            )}
          </div>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="w-full p-12 flex flex-col items-center justify-center gap-3 text-[#7B756C] hover:text-[#b8a862] transition-colors"
            disabled={uploading}
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
                    PNG, JPG, WebP up to 10MB
                  </p>
                </div>
              </>
            )}
          </button>
        )}
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-600 font-sans">{error}</p>
      )}
    </div>
  )
}
