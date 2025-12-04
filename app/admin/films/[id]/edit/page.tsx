import { requireAuth } from '@/lib/session'
import { getFilmByIdAdmin, getAllVenuesForDropdown } from '@/lib/actions/films'
import { FilmForm } from '../../film-form'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function EditFilmPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  await requireAuth()
  const { id } = await params
  const [film, venues] = await Promise.all([
    getFilmByIdAdmin(id),
    getAllVenuesForDropdown(),
  ])

  if (!film) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[#E7E4DF]">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-cormorant text-[#5a534b] mb-2">Edit Film</h1>
          <p className="text-sm text-[#7B756C]">{film.title}</p>
        </div>

        <FilmForm film={film} venues={venues} />

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
