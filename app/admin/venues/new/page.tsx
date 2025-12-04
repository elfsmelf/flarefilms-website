import { requireAuth } from '@/lib/session'
import { VenueForm } from '../venue-form'
import { getAllFilmsAdmin } from '@/lib/actions/films'
import { getAllVenuesAdmin } from '@/lib/actions/venues'
import Link from 'next/link'

export default async function NewVenuePage() {
  await requireAuth()

  // Get all films and venues for the relationship selectors
  const allFilms = await getAllFilmsAdmin()
  const allVenues = await getAllVenuesAdmin()

  return (
    <div className="min-h-screen bg-[#E7E4DF]">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-cormorant text-[#5a534b] mb-2">Add New Venue</h1>
          <p className="text-sm text-[#7B756C]">Create a new wedding venue</p>
        </div>

        <VenueForm allFilms={allFilms} allVenues={allVenues} />

        <div className="mt-6">
          <Link
            href="/admin/venues"
            className="text-sm text-[#7B756C] hover:text-[#b8a862] transition-colors"
          >
            ← Back to Venues
          </Link>
        </div>
      </div>
    </div>
  )
}
