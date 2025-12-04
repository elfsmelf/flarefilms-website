import { requireAuth } from '@/lib/session'
import { getAllVenuesAdmin } from '@/lib/actions/venues'
import Link from 'next/link'
import { VenuesTable } from './venues-table'
import { Plus } from 'lucide-react'

export default async function AdminVenuesPage() {
  await requireAuth()
  const venues = await getAllVenuesAdmin()

  return (
    <div className="min-h-screen bg-[#E7E4DF]">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-cormorant text-[#5a534b] mb-2">Venues</h1>
            <p className="text-sm text-[#7B756C]">Manage wedding venues</p>
          </div>
          <Link
            href="/admin/venues/new"
            className="inline-flex items-center gap-2 bg-[#b8a862] px-6 py-3 text-sm font-sans uppercase tracking-[0.15em] text-white hover:bg-[#a89752] transition-colors"
          >
            <Plus size={18} />
            Add New Venue
          </Link>
        </div>

        {venues.length === 0 ? (
          <div className="bg-white p-12 text-center">
            <p className="text-[#7B756C] font-sans mb-4">No venues yet</p>
            <Link
              href="/admin/venues/new"
              className="inline-block bg-[#b8a862] px-6 py-3 text-sm font-sans uppercase tracking-[0.15em] text-white hover:bg-[#a89752] transition-colors"
            >
              Add Your First Venue
            </Link>
          </div>
        ) : (
          <VenuesTable venues={venues} />
        )}

        <div className="mt-6">
          <Link
            href="/admin"
            className="text-sm text-[#7B756C] hover:text-[#b8a862] transition-colors"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
