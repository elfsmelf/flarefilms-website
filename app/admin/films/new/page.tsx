import { requireAuth } from '@/lib/session'
import { getAllVenuesForDropdown } from '@/lib/actions/films'
import { FilmForm } from '../film-form'
import Link from 'next/link'

export default async function NewFilmPage() {
  await requireAuth()
  const venues = await getAllVenuesForDropdown()

  return (
    <div className="min-h-screen bg-[#E7E4DF]">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-cormorant text-[#5a534b] mb-2">Add New Film</h1>
          <p className="text-sm text-[#7B756C]">Create a new wedding film</p>
        </div>

        <FilmForm venues={venues} />

        <div className="mt-6">
          <Link
            href="/admin/films"
            className="text-sm text-[#7B756C] hover:text-[#b8a862] transition-colors"
          >
            ← Back to Films
          </Link>
        </div>
      </div>
    </div>
  )
}
