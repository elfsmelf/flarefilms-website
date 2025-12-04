'use client'

import { useState } from 'react'
import Link from 'next/link'
import { deleteVenue, togglePublished, toggleFeatured } from '@/lib/actions/venues'
import { Edit, Trash2, Eye, EyeOff, Star } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Venue {
  id: string
  slug: string
  venueTitle: string
  city: string | null
  published: boolean
  featured: boolean
  createdAt: Date
}

interface VenuesTableProps {
  venues: Venue[]
}

export function VenuesTable({ venues }: VenuesTableProps) {
  const router = useRouter()
  const [deleting, setDeleting] = useState<string | null>(null)
  const [toggling, setToggling] = useState<string | null>(null)

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) {
      return
    }

    setDeleting(id)
    const result = await deleteVenue(id)

    if (result.success) {
      router.refresh()
    } else {
      alert(result.error || 'Failed to delete venue')
      setDeleting(null)
    }
  }

  const handleTogglePublished = async (id: string) => {
    setToggling(id)
    const result = await togglePublished(id)

    if (result.success) {
      router.refresh()
    } else {
      alert(result.error || 'Failed to toggle published status')
    }
    setToggling(null)
  }

  const handleToggleFeatured = async (id: string) => {
    setToggling(id)
    const result = await toggleFeatured(id)

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
              Venue
            </th>
            <th className="text-left px-6 py-4 text-xs font-sans uppercase tracking-wider text-[#F5F3ED]">
              City
            </th>
            <th className="text-left px-6 py-4 text-xs font-sans uppercase tracking-wider text-[#F5F3ED]">
              Status
            </th>
            <th className="text-left px-6 py-4 text-xs font-sans uppercase tracking-wider text-[#F5F3ED]">
              Created
            </th>
            <th className="text-right px-6 py-4 text-xs font-sans uppercase tracking-wider text-[#F5F3ED]">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#E7E4DF]">
          {venues.map((venue) => (
            <tr
              key={venue.id}
              className={`hover:bg-[#E7E4DF]/50 transition-colors ${
                deleting === venue.id ? 'opacity-50' : ''
              }`}
            >
              <td className="px-6 py-4">
                <div>
                  <div className="font-serif text-[#5a534b] font-medium">{venue.venueTitle}</div>
                  <div className="text-sm text-[#9B9589] font-mono">/{venue.slug}</div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="text-sm text-[#7B756C] font-sans">{venue.city || '-'}</span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleTogglePublished(venue.id)}
                    disabled={toggling === venue.id}
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-sans ${
                      venue.published
                        ? 'bg-green-100 text-green-800 hover:bg-green-200'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    } transition-colors disabled:opacity-50`}
                    title={venue.published ? 'Published' : 'Draft'}
                  >
                    {venue.published ? (
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
                    onClick={() => handleToggleFeatured(venue.id)}
                    disabled={toggling === venue.id}
                    className={`p-1 rounded transition-colors disabled:opacity-50 ${
                      venue.featured
                        ? 'text-yellow-600 hover:bg-yellow-100'
                        : 'text-gray-400 hover:bg-gray-100'
                    }`}
                    title={venue.featured ? 'Featured' : 'Not featured'}
                  >
                    <Star size={14} fill={venue.featured ? 'currentColor' : 'none'} />
                  </button>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="text-sm text-[#9B9589] font-sans">
                  {new Date(venue.createdAt).toLocaleDateString()}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    href={`/admin/venues/${venue.id}/edit`}
                    className="p-2 text-[#7B756C] hover:text-[#b8a862] hover:bg-[#E7E4DF] rounded transition-colors"
                    title="Edit"
                  >
                    <Edit size={16} />
                  </Link>
                  <button
                    onClick={() => handleDelete(venue.id, venue.venueTitle)}
                    disabled={deleting === venue.id}
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
