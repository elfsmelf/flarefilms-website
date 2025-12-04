'use client'

import { useState } from 'react'
import { ImageUpload } from '@/components/admin/image-upload'
import { MultiImageUpload } from '@/components/admin/multi-image-upload'

export default function TestUploadPage() {
  const [singleImageUrl, setSingleImageUrl] = useState<string | null>(null)
  const [singleImageKey, setSingleImageKey] = useState<string | null>(null)
  const [multiImages, setMultiImages] = useState<
    Array<{ url: string; key: string; preview: string }>
  >([])

  return (
    <div className="min-h-screen bg-[#E7E4DF] p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-cormorant text-4xl text-[#5a534b] mb-2">
          R2 Upload Test
        </h1>
        <p className="font-sans text-sm text-[#7B756C] mb-8">
          Test Cloudflare R2 image upload functionality
        </p>

        {/* Single Image Upload */}
        <div className="bg-white p-8 rounded-lg shadow-sm mb-8">
          <h2 className="font-cormorant text-2xl text-[#5a534b] mb-4">
            Single Image Upload
          </h2>
          <ImageUpload
            folder="test"
            onUploadComplete={(url, key) => {
              setSingleImageUrl(url)
              setSingleImageKey(key)
              console.log('Uploaded:', { url, key })
            }}
            onUploadError={(error) => {
              console.error('Upload error:', error)
            }}
          />
          {singleImageUrl && (
            <div className="mt-4 p-4 bg-[#E7E4DF] rounded">
              <p className="font-sans text-sm text-[#5a534b] mb-2">
                <strong>Upload Successful!</strong>
              </p>
              <p className="font-mono text-xs text-[#7B756C] break-all mb-1">
                <strong>URL:</strong> {singleImageUrl}
              </p>
              <p className="font-mono text-xs text-[#7B756C] break-all">
                <strong>Key:</strong> {singleImageKey}
              </p>
            </div>
          )}
        </div>

        {/* Multiple Images Upload */}
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <h2 className="font-cormorant text-2xl text-[#5a534b] mb-4">
            Multiple Images Upload
          </h2>
          <MultiImageUpload
            folder="test"
            maxImages={10}
            onImagesChange={(images) => {
              setMultiImages(images)
              console.log('Images updated:', images)
            }}
          />
          {multiImages.length > 0 && (
            <div className="mt-4 p-4 bg-[#E7E4DF] rounded">
              <p className="font-sans text-sm text-[#5a534b] mb-2">
                <strong>Uploaded {multiImages.length} images:</strong>
              </p>
              <div className="space-y-2">
                {multiImages.map((img, idx) => (
                  <div
                    key={img.key}
                    className="font-mono text-xs text-[#7B756C] break-all"
                  >
                    <strong>#{idx + 1}:</strong> {img.url}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-8 p-6 bg-white rounded-lg shadow-sm border-l-4 border-[#b8a862]">
          <h3 className="font-cormorant text-xl text-[#5a534b] mb-3">
            Setup Instructions
          </h3>
          <div className="font-sans text-sm text-[#7B756C] space-y-2">
            <p>To use R2 uploads, add these environment variables to your <code className="bg-[#E7E4DF] px-2 py-1 rounded">.env.local</code>:</p>
            <pre className="bg-[#24221D] text-[#F5F3ED] p-4 rounded overflow-x-auto text-xs mt-3">
{`R2_ENDPOINT=https://<account-id>.r2.cloudflarestorage.com
R2_ACCESS_KEY_ID=your-r2-access-key-id
R2_SECRET_ACCESS_KEY=your-r2-secret-access-key
R2_BUCKET_NAME=your-bucket-name
R2_PUBLIC_URL=https://your-public-domain.com`}
            </pre>
            <p className="mt-4">
              <strong>Steps to set up Cloudflare R2:</strong>
            </p>
            <ol className="list-decimal list-inside space-y-1 ml-2">
              <li>Create a Cloudflare R2 bucket in your dashboard</li>
              <li>Generate R2 API tokens (Access Key ID & Secret Access Key)</li>
              <li>Configure a custom domain or use the R2.dev subdomain for public access</li>
              <li>Add the environment variables above</li>
              <li>Restart your development server</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
