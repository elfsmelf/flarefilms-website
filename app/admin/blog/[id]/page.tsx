import { requireAuth } from '@/lib/session'
import { getBlogPost } from '@/lib/actions/blog'
import { BlogForm } from '../blog-form'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAuth()
  const { id } = await params

  if (id === 'new') {
    return (
      <div className="min-h-screen bg-[#E7E4DF]">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-cormorant text-[#5a534b] mb-2">Create New Post</h1>
            <p className="text-sm text-[#7B756C]">Add a new blog article</p>
          </div>

          <BlogForm />

          <div className="mt-6">
            <Link
              href="/admin/blog"
              className="text-sm text-[#7B756C] hover:text-[#b8a862] transition-colors"
            >
              ← Back to Blog Posts
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const post = await getBlogPost(id)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[#E7E4DF]">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-cormorant text-[#5a534b] mb-2">Edit Post</h1>
          <p className="text-sm text-[#7B756C]">Update blog article details</p>
        </div>

        <BlogForm post={post} />

        <div className="mt-6">
          <Link
            href="/admin/blog"
            className="text-sm text-[#7B756C] hover:text-[#b8a862] transition-colors"
          >
            ← Back to Blog Posts
          </Link>
        </div>
      </div>
    </div>
  )
}
