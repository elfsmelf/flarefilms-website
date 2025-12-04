'use client'

import { useState, useEffect } from 'react'
import { signIn, useSession } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const { data: session, isPending } = useSession()

  // Redirect if already logged in
  useEffect(() => {
    if (!isPending && session) {
      router.push('/admin')
    }
  }, [session, isPending, router])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await signIn.email({
        email,
        password,
      })

      if (result.error) {
        setError(result.error.message || 'Login failed')
        setLoading(false)
        return
      }

      // Redirect to admin dashboard
      router.push('/admin')
      router.refresh()
    } catch (err) {
      setError('An unexpected error occurred')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E7E4DF]">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-cormorant text-center text-[#5a534b] mb-8">
            Admin Login
          </h1>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-sans text-[#5a534b] mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-[#d4cfca] rounded focus:outline-none focus:ring-2 focus:ring-[#b8a862] focus:border-transparent"
                placeholder="admin@flarefilms.com.au"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-sans text-[#5a534b] mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-[#d4cfca] rounded focus:outline-none focus:ring-2 focus:ring-[#b8a862] focus:border-transparent"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#b8a862] text-white py-3 rounded font-sans text-sm uppercase tracking-[3px] hover:bg-[#a89752] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="text-center mt-6 text-sm text-[#7B756C]">
          Flare Films Admin Portal
        </p>
      </div>
    </div>
  )
}
