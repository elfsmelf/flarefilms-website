import { requireAuth } from '@/lib/session'
import { getVenueByIdAdmin, getAllVenuesAdmin } from '@/lib/actions/venues'
import { getAllFilmsAdmin } from '@/lib/actions/films'
import { VenueForm } from '../../venue-form'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function EditVenuePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  await requireAuth()
  const { id } = await params
  const venue = await getVenueByIdAdmin(id)

  if (!venue) {
    notFound()
  }

  // Get all films and venues for the relationship selectors
  const allFilms = await getAllFilmsAdmin()
  const allVenues = await getAllVenuesAdmin()

  return (
    <div className="min-h-screen bg-[#E7E4DF]">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-cormorant text-[#5a534b] mb-2">Edit Venue</h1>
          <p className="text-sm text-[#7B756C]">{venue.venueTitle}</p>
        </div>

        <VenueForm venue={venue} allFilms={allFilms} allVenues={allVenues} />

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
