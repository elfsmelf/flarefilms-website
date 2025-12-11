'use client'

import { useState } from 'react'
import Link from 'next/link'
import { deleteBlogPost, toggleBlogPublished, toggleBlogFeatured } from '@/lib/actions/blog'
import { Edit, Trash2, Eye, EyeOff, Star } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface BlogPost {
  id: string
  slug: string
  title: string
  category: string
  date: Date
  published: boolean
  featured: boolean
}

interface BlogTableProps {
  posts: BlogPost[]
}

export function BlogTable({ posts }: BlogTableProps) {
  const router = useRouter()
  const [deleting, setDeleting] = useState<string | null>(null)
  const [toggling, setToggling] = useState<string | null>(null)

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) {
      return
    }

    setDeleting(id)
    const result = await deleteBlogPost(id)

    if (result.success) {
      router.refresh()
    } else {
      alert(result.error || 'Failed to delete blog post')
      setDeleting(null)
    }
  }

  const handleTogglePublished = async (id: string) => {
    setToggling(id)
    const result = await toggleBlogPublished(id)

    if (result.success) {
      router.refresh()
    } else {
      alert(result.error || 'Failed to toggle published status')
    }
    setToggling(null)
  }

  const handleToggleFeatured = async (id: string) => {
    setToggling(id)
    const result = await toggleBlogFeatured(id)

    if (result.success) {
      router.refresh()
    } else {
      alert(result.error || 'Failed to toggle featured status')
    }
    setToggling(null)
  }

  return (
    <div className="bg-white shadow-sm overflow-hidden">
      <table className="w-full">
        <thead className="bg-[#24221D]">
          <tr>
            <th className="text-left px-6 py-4 text-xs font-sans uppercase tracking-wider text-[#F5F3ED]">
              Title
            </th>
            <th className="text-left px-6 py-4 text-xs font-sans uppercase tracking-wider text-[#F5F3ED]">
              Category
            </th>
            <th className="text-left px-6 py-4 text-xs font-sans uppercase tracking-wider text-[#F5F3ED]">
              Status
            </th>
            <th className="text-left px-6 py-4 text-xs font-sans uppercase tracking-wider text-[#F5F3ED]">
              Date
            </th>
            <th className="text-right px-6 py-4 text-xs font-sans uppercase tracking-wider text-[#F5F3ED]">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#E7E4DF]">
          {posts.map((post) => (
            <tr
              key={post.id}
              className={`hover:bg-[#E7E4DF]/50 transition-colors ${
                deleting === post.id ? 'opacity-50' : ''
              }`}
            >
              <td className="px-6 py-4">
                <div>
                  <div className="font-serif text-[#5a534b] font-medium">{post.title}</div>
                  <div className="text-sm text-[#9B9589] font-mono">/{post.slug}</div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="inline-flex px-2 py-1 text-xs font-sans rounded bg-[#b8a862]/20 text-[#5a534b]">
                  {post.category}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleTogglePublished(post.id)}
                    disabled={toggling === post.id}
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-sans ${
                      post.published
                        ? 'bg-green-100 text-green-800 hover:bg-green-200'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    } transition-colors disabled:opacity-50`}
                    title={post.published ? 'Published' : 'Draft'}
                  >
                    {post.published ? (
                      <>
                        <Eye size={12} /> Published
                      </>
                    ) : (
                      <>
                        <EyeOff size={12} /> Draft
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => handleToggleFeatured(post.id)}
                    disabled={toggling === post.id}
                    className={`p-1 rounded transition-colors disabled:opacity-50 ${
                      post.featured
                        ? 'text-yellow-600 hover:bg-yellow-100'
                        : 'text-gray-400 hover:bg-gray-100'
                    }`}
                    title={post.featured ? 'Featured' : 'Not featured'}
                  >
                    <Star size={14} fill={post.featured ? 'currentColor' : 'none'} />
                  </button>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="text-sm text-[#9B9589] font-sans">
                  {new Date(post.date).toLocaleDateString()}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    href={`/admin/blog/${post.id}`}
                    className="p-2 text-[#7B756C] hover:text-[#b8a862] hover:bg-[#E7E4DF] rounded transition-colors"
                    title="Edit"
                  >
                    <Edit size={16} />
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id, post.title)}
                    disabled={deleting === post.id}
                    className="p-2 text-[#7B756C] hover:text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-50"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
