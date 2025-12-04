'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ImageUpload } from '@/components/admin/image-upload'
import { MultiImageUpload } from '@/components/admin/multi-image-upload'
import { RichTextEditor } from '@/components/admin/rich-text-editor'
import { createFilm, updateFilm } from '@/lib/actions/films'
import type { FilmFormData, VendorFormData, GalleryImageFormData } from '@/lib/actions/films'
import { convertToEmbedUrl } from '@/lib/video-url-helper'
import { Plus, X, Loader2 } from 'lucide-react'

interface FilmFormProps {
  film?: {
    id: string
    slug: string
    title: string
    subtitle: string
    tagline: string
    location: string
    headerImage: string
    videoUrl: string | null
    trailerUrl: string | null
    storyContent: string
    published: boolean
    featured: boolean
    order: number
    rating: number
    vendors: Array<{
      id: string
      role: string
      name: string
      link: string | null
    }>
    gallery: Array<{
      id: string
      url: string
      alt: string
    }>
    venueWeddingFilms?: Array<{
      venueId: string
      venue: {
        id: string
        venueTitle: string
      }
    }>
  }
  venues: Array<{
    id: string
    venueTitle: string
  }>
}

export function FilmForm({ film, venues }: FilmFormProps) {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Basic film data
  const [slug, setSlug] = useState(film?.slug || '')
  const [title, setTitle] = useState(film?.title || '')
  const [subtitle, setSubtitle] = useState(film?.subtitle || '')
  const [tagline, setTagline] = useState(film?.tagline || '')
  const [location, setLocation] = useState(film?.location || '')
  const [headerImage, setHeaderImage] = useState(film?.headerImage || '')
  const [headerImageKey, setHeaderImageKey] = useState('')
  const [videoUrl, setVideoUrl] = useState(film?.videoUrl || '')
  const [trailerUrl, setTrailerUrl] = useState(film?.trailerUrl || '')
  const [storyContent, setStoryContent] = useState(film?.storyContent || '')
  const [published, setPublished] = useState(film?.published || false)
  const [featured, setFeatured] = useState(film?.featured || false)
  const [order, setOrder] = useState(film?.order || 0)
  const [rating, setRating] = useState(film?.rating || 0)
  const [venueId, setVenueId] = useState(
    film?.venueWeddingFilms?.[0]?.venueId || ''
  )

  // Vendors
  const [vendors, setVendors] = useState<VendorFormData[]>(
    film?.vendors.map((v) => ({
      role: v.role,
      name: v.name,
      link: v.link || undefined,
    })) || []
  )

  // Gallery images
  const [galleryImages, setGalleryImages] = useState<
    Array<{ url: string; key: string; preview: string }>
  >(
    film?.gallery.map((g) => ({
      url: g.url,
      key: g.url,
      preview: g.url,
    })) || []
  )

  // Auto-generate slug from title
  const handleTitleChange = (value: string) => {
    setTitle(value)
    if (!film) {
      // Only auto-generate slug for new films
      const generatedSlug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
      setSlug(generatedSlug)
    }
  }

  // Vendor handlers
  const addVendor = () => {
    setVendors([...vendors, { role: '', name: '', link: '' }])
  }

  const updateVendor = (index: number, field: keyof VendorFormData, value: string) => {
    const updated = [...vendors]
    updated[index] = { ...updated[index], [field]: value }
    setVendors(updated)
  }

  const removeVendor = (index: number) => {
    setVendors(vendors.filter((_, i) => i !== index))
  }

  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)

    try {
      // Validate
      if (!slug || !title || !subtitle || !tagline || !location || !headerImage) {
        setError('Please fill in all required fields')
        setSubmitting(false)
        return
      }

      if (!storyContent || storyContent.trim() === '' || storyContent === '<p></p>') {
        setError('Please add story content')
        setSubmitting(false)
        return
      }

      // Prepare data
      const filmData: FilmFormData = {
        slug,
        title,
        subtitle,
        tagline,
        location,
        headerImage,
        videoUrl: videoUrl || undefined,
        trailerUrl: trailerUrl || undefined,
        storyContent,
        published,
        featured,
        order,
        rating,
        venueId: venueId || undefined,
      }

      const vendorsData: VendorFormData[] = vendors
        .filter((v) => v.role && v.name)
        .map((v) => ({
          role: v.role,
          name: v.name,
          link: v.link || undefined,
        }))

      const galleryData: GalleryImageFormData[] = galleryImages.map((g, idx) => ({
        url: g.url,
        alt: `${title} - Image ${idx + 1}`,
      }))

      // Submit
      const result = film
        ? await updateFilm(film.id, filmData, vendorsData, galleryData)
        : await createFilm(filmData, vendorsData, galleryData)

      if (result.success) {
        router.push('/admin/films')
        router.refresh()
      } else {
        setError(result.error || 'Failed to save film')
        setSubmitting(false)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Basic Information */}
      <div className="bg-white p-8 shadow-sm">
        <h2 className="font-cormorant text-2xl text-[#5a534b] mb-6">Basic Information</h2>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-sans uppercase tracking-wider text-[#7B756C] mb-2">
              Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full px-4 py-3 border border-[#d4cfca] focus:border-[#b8a862] focus:outline-none transition-colors font-serif text-[#5a534b]"
              required
              disabled={submitting}
            />
          </div>

          <div>
            <label className="block text-sm font-sans uppercase tracking-wider text-[#7B756C] mb-2">
              Slug *
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full px-4 py-3 border border-[#d4cfca] focus:border-[#b8a862] focus:outline-none transition-colors font-mono text-sm text-[#5a534b]"
              required
              disabled={submitting}
              pattern="[a-z0-9-]+"
              title="Only lowercase letters, numbers, and hyphens"
            />
            <p className="mt-1 text-xs text-[#9B9589]">
              URL: /films/{slug || 'your-film-slug'}
            </p>
          </div>

          <div>
            <label className="block text-sm font-sans uppercase tracking-wider text-[#7B756C] mb-2">
              Subtitle *
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full px-4 py-3 border border-[#d4cfca] focus:border-[#b8a862] focus:outline-none transition-colors font-sans text-[#5a534b]"
              required
              disabled={submitting}
            />
          </div>

          <div>
            <label className="block text-sm font-sans uppercase tracking-wider text-[#7B756C] mb-2">
              Tagline *
            </label>
            <textarea
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              rows={2}
              className="w-full px-4 py-3 border border-[#d4cfca] focus:border-[#b8a862] focus:outline-none transition-colors font-serif italic text-[#5a534b]"
              required
              disabled={submitting}
            />
          </div>

          <div>
            <label className="block text-sm font-sans uppercase tracking-wider text-[#7B756C] mb-2">
              Location *
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-3 border border-[#d4cfca] focus:border-[#b8a862] focus:outline-none transition-colors font-sans text-[#5a534b]"
              required
              disabled={submitting}
            >
              <option value="">Select a location</option>
              <option value="Brisbane">Brisbane</option>
              <option value="Gold Coast">Gold Coast</option>
              <option value="Sunshine Coast">Sunshine Coast</option>
              <option value="Toowoomba">Toowoomba</option>
              <option value="Byron Bay">Byron Bay</option>
              <option value="Regional QLD">Regional QLD</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-sans uppercase tracking-wider text-[#7B756C] mb-2">
              Venue (optional)
            </label>
            <select
              value={venueId}
              onChange={(e) => setVenueId(e.target.value)}
              className="w-full px-4 py-3 border border-[#d4cfca] focus:border-[#b8a862] focus:outline-none transition-colors font-sans text-[#5a534b]"
              disabled={submitting}
            >
              <option value="">No venue selected</option>
              {venues.map((venue) => (
                <option key={venue.id} value={venue.id}>
                  {venue.venueTitle}
                </option>
              ))}
            </select>
            <p className="mt-1 text-xs text-[#9B9589]">
              Link this film to a venue to display it on the venue page
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-sans uppercase tracking-wider text-[#7B756C] mb-2">
                Order
              </label>
              <input
                type="number"
                value={order}
                onChange={(e) => setOrder(parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-[#d4cfca] focus:border-[#b8a862] focus:outline-none transition-colors font-sans text-[#5a534b]"
                disabled={submitting}
              />
            </div>

            <div>
              <label className="block text-sm font-sans uppercase tracking-wider text-[#7B756C] mb-2">
                Rating
              </label>
              <input
                type="number"
                value={rating}
                onChange={(e) => setRating(parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-[#d4cfca] focus:border-[#b8a862] focus:outline-none transition-colors font-sans text-[#5a534b]"
                disabled={submitting}
                min="0"
                max="100"
              />
              <p className="mt-1 text-xs text-[#9B9589]">Higher = displayed first</p>
            </div>

            <div className="flex items-end">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="w-5 h-5 text-[#b8a862] border-[#d4cfca] rounded focus:ring-[#b8a862]"
                  disabled={submitting}
                />
                <span className="text-sm font-sans text-[#7B756C]">Published</span>
              </label>
            </div>

            <div className="flex items-end">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-5 h-5 text-[#b8a862] border-[#d4cfca] rounded focus:ring-[#b8a862]"
                  disabled={submitting}
                />
                <span className="text-sm font-sans text-[#7B756C]">Featured</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Media */}
      <div className="bg-white p-8 shadow-sm">
        <h2 className="font-cormorant text-2xl text-[#5a534b] mb-6">Media</h2>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-sans uppercase tracking-wider text-[#7B756C] mb-2">
              Header Image *
            </label>
            <ImageUpload
              folder="films/headers"
              currentImage={headerImage}
              onUploadComplete={(url, key) => {
                setHeaderImage(url)
                setHeaderImageKey(key)
              }}
              onUploadError={(err) => setError(err)}
            />
          </div>

          <div>
            <label className="block text-sm font-sans uppercase tracking-wider text-[#7B756C] mb-2">
              Video URL (YouTube/Vimeo)
            </label>
            <input
              type="text"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              onBlur={(e) => {
                // Auto-convert to embed URL when user leaves the field
                const converted = convertToEmbedUrl(e.target.value)
                if (converted !== e.target.value) {
                  setVideoUrl(converted)
                }
              }}
              className="w-full px-4 py-3 border border-[#d4cfca] focus:border-[#b8a862] focus:outline-none transition-colors font-mono text-sm text-[#5a534b]"
              disabled={submitting}
              placeholder="Paste any YouTube or Vimeo URL - it will auto-convert to embed format"
            />
            <p className="mt-1 text-xs text-[#9B9589]">
              Paste any YouTube or Vimeo URL. It will automatically convert to the embed format.
            </p>
          </div>

          <div>
            <label className="block text-sm font-sans uppercase tracking-wider text-[#7B756C] mb-2">
              Wedding Trailer URL (YouTube/Vimeo)
            </label>
            <input
              type="text"
              value={trailerUrl}
              onChange={(e) => setTrailerUrl(e.target.value)}
              onBlur={(e) => {
                // Auto-convert to embed URL when user leaves the field
                const converted = convertToEmbedUrl(e.target.value)
                if (converted !== e.target.value) {
                  setTrailerUrl(converted)
                }
              }}
              className="w-full px-4 py-3 border border-[#d4cfca] focus:border-[#b8a862] focus:outline-none transition-colors font-mono text-sm text-[#5a534b]"
              disabled={submitting}
              placeholder="Paste any YouTube or Vimeo URL - it will auto-convert to embed format"
            />
            <p className="mt-1 text-xs text-[#9B9589]">
              Wedding trailer video URL. Will automatically convert to embed format.
            </p>
          </div>
        </div>
      </div>

      {/* Story */}
      <div className="bg-white p-8 shadow-sm">
        <h2 className="font-cormorant text-2xl text-[#5a534b] mb-6">Story</h2>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-sans uppercase tracking-wider text-[#7B756C] mb-2">
              Story Content *
            </label>
            <RichTextEditor
              content={storyContent}
              onChange={setStoryContent}
              disabled={submitting}
              placeholder="Write your story here... Use headings and paragraphs to format the content."
            />
            <p className="mt-2 text-xs text-[#9B9589]">
              Use the toolbar to format your content with headings, bold, italic, and lists.
            </p>
          </div>
        </div>
      </div>

      {/* Vendors */}
      <div className="bg-white p-8 shadow-sm">
        <h2 className="font-cormorant text-2xl text-[#5a534b] mb-6">Vendors</h2>

        <div className="space-y-4">
          {vendors.map((vendor, index) => (
            <div key={index} className="p-4 border border-[#d4cfca] rounded">
              <div className="flex justify-between items-start mb-4">
                <span className="text-sm font-sans text-[#9B9589]">Vendor {index + 1}</span>
                <button
                  type="button"
                  onClick={() => removeVendor(index)}
                  className="text-red-600 hover:bg-red-50 p-1 rounded transition-colors"
                  disabled={submitting}
                >
                  <X size={16} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-sans uppercase tracking-wider text-[#7B756C] mb-1">
                    Role
                  </label>
                  <input
                    type="text"
                    value={vendor.role}
                    onChange={(e) => updateVendor(index, 'role', e.target.value)}
                    className="w-full px-3 py-2 border border-[#d4cfca] focus:border-[#b8a862] focus:outline-none transition-colors font-sans text-sm text-[#5a534b]"
                    disabled={submitting}
                    placeholder="e.g., Venue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans uppercase tracking-wider text-[#7B756C] mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={vendor.name}
                    onChange={(e) => updateVendor(index, 'name', e.target.value)}
                    className="w-full px-3 py-2 border border-[#d4cfca] focus:border-[#b8a862] focus:outline-none transition-colors font-serif text-sm text-[#5a534b]"
                    disabled={submitting}
                    placeholder="Vendor name"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans uppercase tracking-wider text-[#7B756C] mb-1">
                    Link (optional)
                  </label>
                  <input
                    type="text"
                    value={vendor.link}
                    onChange={(e) => updateVendor(index, 'link', e.target.value)}
                    className="w-full px-3 py-2 border border-[#d4cfca] focus:border-[#b8a862] focus:outline-none transition-colors font-mono text-xs text-[#5a534b]"
                    disabled={submitting}
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addVendor}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-sans text-[#7B756C] hover:text-[#b8a862] border border-[#d4cfca] hover:border-[#b8a862] transition-colors"
            disabled={submitting}
          >
            <Plus size={16} />
            Add Vendor
          </button>
        </div>
      </div>

      {/* Gallery */}
      <div className="bg-white p-8 shadow-sm">
        <h2 className="font-cormorant text-2xl text-[#5a534b] mb-6">Gallery</h2>

        <MultiImageUpload
          folder="films/gallery"
          existingImages={galleryImages}
          onImagesChange={setGalleryImages}
          maxImages={100}
        />
      </div>

      {/* Submit */}
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={submitting}
          className="bg-[#b8a862] px-8 py-4 text-sm font-sans uppercase tracking-[0.15em] text-white hover:bg-[#a89752] transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
        >
          {submitting && <Loader2 className="animate-spin" size={16} />}
          {submitting ? 'Saving...' : film ? 'Update Film' : 'Create Film'}
        </button>

        <button
          type="button"
          onClick={() => router.push('/admin/films')}
          disabled={submitting}
          className="px-8 py-4 text-sm font-sans uppercase tracking-[0.15em] text-[#7B756C] border border-[#d4cfca] hover:border-[#b8a862] hover:text-[#b8a862] transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
