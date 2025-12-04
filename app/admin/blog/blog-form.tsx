"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { ImageUpload } from "@/components/admin/image-upload"
import { RichTextEditor } from "@/components/admin/rich-text-editor"
import { createBlogPost, updateBlogPost, type BlogPostData } from "@/lib/actions/blog"

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

export function BlogForm({ post }: BlogFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    slug: post?.slug || "",
    title: post?.title || "",
    excerpt: post?.excerpt || "",
    content: post?.content || "",
    image: post?.image || "",
    date: post?.date ? new Date(post.date).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
    category: post?.category || "",
    published: post?.published || false,
    featured: post?.featured || false,
    metaTitle: post?.metaTitle || "",
    metaDescription: post?.metaDescription || "",
  })

  // Auto-generate slug from title
  useEffect(() => {
    if (!post && formData.title) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
      setFormData((prev) => ({ ...prev, slug }))
    }
  }, [formData.title, post])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const data: BlogPostData = {
      ...formData,
      date: new Date(formData.date),
      metaTitle: formData.metaTitle || undefined,
      metaDescription: formData.metaDescription || undefined,
    }

    const result = post ? await updateBlogPost(post.id, data) : await createBlogPost(data)

    if (result.success) {
      router.push("/admin/blog")
      router.refresh()
    } else {
      alert(result.error || "Failed to save blog post")
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      {/* Title */}
      <div>
        <Label htmlFor="title">Title *</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>

      {/* Slug */}
      <div>
        <Label htmlFor="slug">Slug *</Label>
        <Input
          id="slug"
          value={formData.slug}
          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          required
        />
      </div>

      {/* Category */}
      <div>
        <Label htmlFor="category">Category *</Label>
        <Input
          id="category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          placeholder="e.g., Wedding Tips, Venues, Wedding Films"
          required
        />
      </div>

      {/* Date */}
      <div>
        <Label htmlFor="date">Publish Date *</Label>
        <Input
          id="date"
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          required
        />
      </div>

      {/* Excerpt */}
      <div>
        <Label htmlFor="excerpt">Excerpt *</Label>
        <Textarea
          id="excerpt"
          value={formData.excerpt}
          onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
          placeholder="A short summary of the blog post..."
          rows={3}
          required
        />
      </div>

      {/* Featured Image */}
      <div>
        <Label>Featured Image *</Label>
        <ImageUpload
          folder="blog"
          currentImage={formData.image}
          onUploadComplete={(url) => setFormData({ ...formData, image: url })}
        />
      </div>

      {/* Content (WYSIWYG) */}
      <div>
        <Label>Content *</Label>
        <RichTextEditor
          content={formData.content}
          onChange={(content) => setFormData({ ...formData, content })}
        />
      </div>

      {/* Meta Title */}
      <div>
        <Label htmlFor="metaTitle">Meta Title (SEO)</Label>
        <Input
          id="metaTitle"
          value={formData.metaTitle}
          onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
          placeholder="Leave blank to use post title"
        />
      </div>

      {/* Meta Description */}
      <div>
        <Label htmlFor="metaDescription">Meta Description (SEO)</Label>
        <Textarea
          id="metaDescription"
          value={formData.metaDescription}
          onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
          placeholder="Leave blank to use excerpt"
          rows={2}
        />
      </div>

      {/* Published */}
      <div className="flex items-center space-x-2">
        <Switch
          id="published"
          checked={formData.published}
          onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
        />
        <Label htmlFor="published">Published</Label>
      </div>

      {/* Featured */}
      <div className="flex items-center space-x-2">
        <Switch
          id="featured"
          checked={formData.featured}
          onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
        />
        <Label htmlFor="featured">Featured</Label>
      </div>

      {/* Submit Buttons */}
      <div className="flex gap-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : post ? "Update Post" : "Create Post"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/blog")}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
