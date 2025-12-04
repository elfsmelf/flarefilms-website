import { requireAuth } from '@/lib/session'
import { signOut } from '@/lib/auth-client'
import Link from 'next/link'

export default async function AdminDashboard() {
  const session = await requireAuth()

  return (
    <div className="min-h-screen bg-[#E7E4DF]">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-cormorant text-[#5a534b]">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-[#7B756C]">
              Welcome, {session.user.name || session.user.email}
            </span>
            <form action={async () => {
              'use server'
              await signOut()
            }}>
              <button
                type="submit"
                className="px-4 py-2 text-sm border border-[#5a534b] text-[#5a534b] hover:bg-[#5a534b] hover:text-white transition-colors"
              >
                Sign Out
              </button>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link
            href="/admin/films"
            className="bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="text-2xl font-cormorant text-[#5a534b] mb-2">Films</h2>
            <p className="text-sm text-[#7B756C]">Manage wedding films</p>
          </Link>

          <Link
            href="/admin/venues"
            className="bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="text-2xl font-cormorant text-[#5a534b] mb-2">Venues</h2>
            <p className="text-sm text-[#7B756C]">Manage wedding venues</p>
          </Link>

          <Link
            href="/admin/blog"
            className="bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="text-2xl font-cormorant text-[#5a534b] mb-2">Blog</h2>
            <p className="text-sm text-[#7B756C]">Manage blog posts</p>
          </Link>

          <Link
            href="/admin/test-upload"
            className="bg-white p-6 shadow-sm hover:shadow-md transition-shadow border-2 border-[#b8a862]"
          >
            <h2 className="text-2xl font-cormorant text-[#5a534b] mb-2">Test Upload</h2>
            <p className="text-sm text-[#7B756C]">Test R2 image uploads</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
