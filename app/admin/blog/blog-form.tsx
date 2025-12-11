'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ImageUpload } from '@/components/admin/image-upload'
import { RichTextEditor } from '@/components/admin/rich-text-editor'
import { createBlogPost, updateBlogPost, type BlogPostData } from '@/lib/actions/blog'
import { autofillBlogPost } from '@/lib/actions/blog-autofill'
import { Loader2, Search, Sparkles } from 'lucide-react'

// Google Search Preview Component
function GoogleSearchPreview({
  title,
  slug,
  excerpt,
  metaTitle,
  metaDescription,
}: {
  title: string
  slug: string
  excerpt: string
  metaTitle: string
  metaDescription: string
}) {
  // Use meta title if provided, otherwise use post title
  const seoTitle = metaTitle || title || 'Post Title'

  // Use meta description if provided, otherwise use excerpt
  const seoDescription = metaDescription || excerpt || 'Post excerpt...'

  const url = `flarefilms.com.au › blog › ${slug || 'post-slug'}`

  // Truncate description to ~155 characters like Google does
  const truncatedDescription = seoDescription.length > 155
    ? seoDescription.substring(0, 155) + '...'
    : seoDescription

  return (
    <div className="border border-[#dfe1e5] rounded-lg p-6 bg-white max-w-2xl">
      {/* Google-style search result */}
      <div className="space-y-1">
        {/* URL breadcrumb */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-[#f1f3f4] flex items-center justify-center">
            <Search size={14} className="text-[#5f6368]" />
          </div>
          <span className="text-sm text-[#202124] truncate">{url}</span>
        </div>

        {/* Title */}
        <h3 className="text-xl text-[#1a0dab] hover:underline cursor-pointer leading-tight font-normal">
          {seoTitle}
        </h3>

        {/* Description */}
        <p className="text-sm text-[#4d5156] leading-relaxed">
          {truncatedDescription}
        </p>
      </div>

      {/* SEO Tips */}
      <div className="mt-6 pt-4 border-t border-[#e8eaed]">
        <p className="text-xs font-sans uppercase tracking-wider text-[#7B756C] mb-2">SEO Tips</p>
        <ul className="text-xs text-[#9B9589] space-y-1">
          <li>• Title length: {seoTitle.length}/60 characters {seoTitle.length > 60 ? '⚠️ Too long' : '✓'}</li>
          <li>• Description length: {seoDescription.length}/155 characters {seoDescription.length > 155 ? '⚠️ May be truncated' : '✓'}</li>
          {metaTitle && <li>• ✓ Custom meta title set</li>}
          {!metaTitle && <li>• 💡 Add a custom meta title for better SEO</li>}
          {metaDescription && <li>• ✓ Custom meta description set</li>}
          {!metaDescription && <li>• 💡 Add a custom meta description</li>}
        </ul>
      </div>
    </div>
  )
}

interface BlogFormProps {
  post?: {
    id: string
    slug: string
    title: string
    excerpt: string
    content: string
    image: string
    date: Date
    category: string
    published: boolean
    featured: boolean
    metaTitle: string | null
    metaDescription: string | null
  }
}

const categoryOptions = [
  { value: 'Wedding Tips', label: 'Wedding Tips' },
  { value: 'Venues', label: 'Venues' },
  { value: 'Wedding Films', label: 'Wedding Films' },
  { value: 'Behind the Scenes', label: 'Behind the Scenes' },
  { value: 'Real Weddings', label: 'Real Weddings' },
  { value: 'Planning', label: 'Planning' },
]

export function BlogForm({ post }: BlogFormProps) {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [autofilling, setAutofilling] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Autofill state
  const [seoKeyword, setSeoKeyword] = useState('')

  // Form state
  const [slug, setSlug] = useState(post?.slug || '')
  const [title, setTitle] = useState(post?.title || '')
  const [excerpt, setExcerpt] = useState(post?.excerpt || '')
  const [content, setContent] = useState(post?.content || '')
  const [image, setImage] = useState(post?.image || '')
  const [date, setDate] = useState(
    post?.date ? new Date(post.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
  )
  const [category, setCategory] = useState(post?.category || '')
  const [published, setPublished] = useState(post?.published || false)
  const [featured, setFeatured] = useState(post?.featured || false)
  const [metaTitle, setMetaTitle] = useState(post?.metaTitle || '')
  const [metaDescription, setMetaDescription] = useState(post?.metaDescription || '')

  // Auto-generate slug from title
  const handleTitleChange = (value: string) => {
    setTitle(value)
    if (!post) {
      const generatedSlug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
      setSlug(generatedSlug)
    }
  }

  // Handle autofill from AI
  const handleAutofill = async () => {
    if (!seoKeyword.trim()) {
      setError('Please enter an SEO keyword')
      return
    }

    setError(null)
    setSuccess(null)
    setAutofilling(true)

    try {
      const result = await autofillBlogPost(seoKeyword, title || undefined)

      if (result.success && result.data) {
        const data = result.data

        // Fill in all the fields
        if (data.title) {
          setTitle(data.title)
          // Generate slug from title
          const generatedSlug = data.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '')
          setSlug(generatedSlug)
        }
        if (data.excerpt) setExcerpt(data.excerpt)
        if (data.content) setContent(data.content)
        if (data.metaTitle) setMetaTitle(data.metaTitle)
        if (data.metaDescription) setMetaDescription(data.metaDescription)
        if (data.category) setCategory(data.category)

        setSuccess('Blog post generated successfully! Please review and add a featured image.')
      } else {
        setError(result.error || 'Failed to generate blog post')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while generating content')
    } finally {
      setAutofilling(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)

    try {
      // Validate required fields
      if (!slug || !title || !excerpt || !content || !image || !category) {
        setError('Please fill in all required fields')
        setSubmitting(false)
        return
      }

      const data: BlogPostData = {
        slug,
        title,
        excerpt,
        content,
        image,
        date: new Date(date),
        category,
        published,
        featured,
        metaTitle: metaTitle || undefined,
        metaDescription: metaDescription || undefined,
      }

      const result = post ? await updateBlogPost(post.id, data) : await createBlogPost(data)

      if (result.success) {
        router.push('/admin/blog')
        router.refresh()
      } else {
        setError(result.error || 'Failed to save blog post')
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

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded">
          {success}
        </div>
      )}

      {/* AI Autofill Section */}
      <div className="bg-gradient-to-r from-[#24221D] to-[#3a3730] p-8 shadow-sm">
        <h2 className="font-cormorant text-2xl text-[#F5F3ED] mb-2">AI Content Generator</h2>
        <p className="text-sm text-[#C7C5BF] mb-6">
          Enter an SEO keyword to automatically generate a fully optimized blog post using AI
        </p>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-sans uppercase tracking-wider text-[#C7C5BF] mb-2">
                SEO Keyword *
              </label>
              <input
                type="text"
                value={seoKeyword}
                onChange={(e) => setSeoKeyword(e.target.value)}
                className="w-full px-4 py-3 border border-[#5a534b] bg-white/10 focus:border-[#b8a862] focus:outline-none transition-colors font-sans text-[#F5F3ED] placeholder-[#9B9589]"
                placeholder="e.g., Brisbane wedding venues, wedding videographer tips..."
                disabled={submitting || autofilling}
              />
              <p className="mt-1 text-xs text-[#9B9589]">
                The AI will research this topic and write an SEO-optimized blog post
              </p>
            </div>

            <div className="flex items-end">
              <button
                type="button"
                onClick={handleAutofill}
                disabled={!seoKeyword.trim() || autofilling || submitting}
                className="w-full bg-[#b8a862] px-6 py-3 text-sm font-sans uppercase tracking-[0.15em] text-white hover:bg-[#a89752] transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
              >
                {autofilling ? (
                  <>
                    <Loader2 className="animate-spin" size={16} />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    Generate Post
                  </>
                )}
              </button>
            </div>
          </div>

          {autofilling && (
            <div className="text-sm text-[#C7C5BF] italic">
              Researching topic and writing content... This may take 30-60 seconds.
            </div>
          )}
        </div>
      </div>

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
              URL: /blog/{slug || 'your-post-slug'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-sans uppercase tracking-wider text-[#7B756C] mb-2">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 border border-[#d4cfca] focus:border-[#b8a862] focus:outline-none transition-colors font-sans text-[#5a534b]"
                required
                disabled={submitting}
              >
                <option value="">Select a category</option>
                {categoryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-sans uppercase tracking-wider text-[#7B756C] mb-2">
                Publish Date *
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-3 border border-[#d4cfca] focus:border-[#b8a862] focus:outline-none transition-colors font-sans text-[#5a534b]"
                required
                disabled={submitting}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-sans uppercase tracking-wider text-[#7B756C] mb-2">
              Excerpt *
            </label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-[#d4cfca] focus:border-[#b8a862] focus:outline-none transition-colors font-sans text-[#5a534b]"
              required
              disabled={submitting}
              placeholder="A short summary of the blog post..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
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

            <div className="flex items-center">
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

      {/* Featured Image */}
      <div className="bg-white p-8 shadow-sm">
        <h2 className="font-cormorant text-2xl text-[#5a534b] mb-6">Featured Image</h2>

        <div>
          <label className="block text-sm font-sans uppercase tracking-wider text-[#7B756C] mb-2">
            Image *
          </label>
          <ImageUpload
            folder="blog"
            currentImage={image}
            onUploadComplete={(url) => setImage(url)}
            onUploadError={(err) => setError(err)}
          />
        </div>
      </div>

      {/* Content */}
      <div className="bg-white p-8 shadow-sm">
        <h2 className="font-cormorant text-2xl text-[#5a534b] mb-6">Content</h2>

        <div>
          <label className="block text-sm font-sans uppercase tracking-wider text-[#7B756C] mb-2">
            Post Content *
          </label>
          <RichTextEditor
            content={content}
            onChange={setContent}
            disabled={submitting}
            placeholder="Write your blog post content here..."
          />
        </div>
      </div>

      {/* SEO Settings */}
      <div className="bg-white p-8 shadow-sm">
        <h2 className="font-cormorant text-2xl text-[#5a534b] mb-6">SEO Settings</h2>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-sans uppercase tracking-wider text-[#7B756C] mb-2">
              Meta Title
            </label>
            <input
              type="text"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              className="w-full px-4 py-3 border border-[#d4cfca] focus:border-[#b8a862] focus:outline-none transition-colors font-sans text-[#5a534b]"
              disabled={submitting}
              placeholder="Leave blank to use post title"
            />
          </div>

          <div>
            <label className="block text-sm font-sans uppercase tracking-wider text-[#7B756C] mb-2">
              Meta Description
            </label>
            <textarea
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              rows={2}
              className="w-full px-4 py-3 border border-[#d4cfca] focus:border-[#b8a862] focus:outline-none transition-colors font-sans text-[#5a534b]"
              disabled={submitting}
              placeholder="Leave blank to use excerpt"
            />
          </div>
        </div>
      </div>

      {/* Google Search Preview */}
      <div className="bg-white p-8 shadow-sm">
        <h2 className="font-cormorant text-2xl text-[#5a534b] mb-6">Google Search Preview</h2>
        <p className="text-sm text-[#9B9589] mb-6">
          Preview how this post will appear in Google search results
        </p>

        <GoogleSearchPreview
          title={title}
          slug={slug}
          excerpt={excerpt}
          metaTitle={metaTitle}
          metaDescription={metaDescription}
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
          {submitting ? 'Saving...' : post ? 'Update Post' : 'Create Post'}
        </button>

        <button
          type="button"
          onClick={() => router.push('/admin/blog')}
          disabled={submitting}
          className="px-8 py-4 text-sm font-sans uppercase tracking-[0.15em] text-[#7B756C] border border-[#d4cfca] hover:border-[#b8a862] hover:text-[#b8a862] transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
