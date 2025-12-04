# Admin Panel + PostgreSQL + SSG Implementation Plan

## Overview
Add a custom admin panel with PostgreSQL database to manage wedding films, venues, and blog posts while maintaining Static Site Generation (SSG) for optimal performance.

## Architecture Summary

```
Neon PostgreSQL Database
    ↓
Prisma ORM (Type-safe queries)
    ↓
NextAuth.js (Admin authentication)
    ↓
Custom Admin Panel (/admin/*)
    ↓
Server Actions (CRUD operations)
    ↓
SSG + On-Demand Revalidation
    ↓
Cloudflare R2 (Image storage)
```

## Key Decisions

- **Database**: Neon PostgreSQL (serverless, optimized for Vercel)
- **ORM**: Drizzle (lightweight, type-safe, better performance than Prisma)
- **Auth**: Better Auth (modern, type-safe, simpler than NextAuth)
- **Images**: Cloudflare R2 for new uploads, keep existing local images
- **Editor**: Tiptap WYSIWYG for blog posts
- **Revalidation**: On-demand only (no scheduled rebuilds)
- **Priority**: Films → Venues → Blog Posts (Testimonials later)

---

## Phase 1: Database Setup

### 1.1 Install Dependencies
```bash
npm install drizzle-orm postgres
npm install -D drizzle-kit
npm install better-auth
npm install bcryptjs
npm install -D @types/bcryptjs
```

### 1.2 Database Schema
Create `lib/db/schema.ts`:

```typescript
import { pgTable, text, boolean, integer, timestamp, index } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { createId } from '@paralleldrive/cuid2'

// Films table
export const films = pgTable('films', {
  id: text('id').$defaultFn(() => createId()).primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  subtitle: text('subtitle').notNull(),
  tagline: text('tagline').notNull(),
  location: text('location').notNull(),
  headerImage: text('header_image').notNull(),
  videoUrl: text('video_url'),
  storyHeading: text('story_heading').notNull(),
  storyParagraphs: text('story_paragraphs').array().notNull(),
  published: boolean('published').default(false).notNull(),
  featured: boolean('featured').default(false).notNull(),
  order: integer('order').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
}, (table) => ({
  slugIdx: index('films_slug_idx').on(table.slug),
  publishedFeaturedIdx: index('films_published_featured_idx').on(table.published, table.featured)
}))

// Vendors table
export const vendors = pgTable('vendors', {
  id: text('id').$defaultFn(() => createId()).primaryKey(),
  filmId: text('film_id').notNull().references(() => films.id, { onDelete: 'cascade' }),
  role: text('role').notNull(),
  name: text('name').notNull(),
  link: text('link'),
  order: integer('order').default(0).notNull()
}, (table) => ({
  filmIdIdx: index('vendors_film_id_idx').on(table.filmId)
}))

// Gallery images table
export const galleryImages = pgTable('gallery_images', {
  id: text('id').$defaultFn(() => createId()).primaryKey(),
  filmId: text('film_id').notNull().references(() => films.id, { onDelete: 'cascade' }),
  url: text('url').notNull(),
  alt: text('alt').notNull(),
  order: integer('order').default(0).notNull()
}, (table) => ({
  filmIdIdx: index('gallery_images_film_id_idx').on(table.filmId)
}))

// Venues table
export const venues = pgTable('venues', {
  id: text('id').$defaultFn(() => createId()).primaryKey(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  location: text('location').notNull(),
  capacity: text('capacity').notNull(),
  style: text('style').notNull(),
  costPerHead: text('cost_per_head').notNull(),
  image: text('image').notNull(),
  description: text('description'),
  published: boolean('published').default(false).notNull(),
  featured: boolean('featured').default(false).notNull(),
  order: integer('order').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
}, (table) => ({
  slugIdx: index('venues_slug_idx').on(table.slug),
  publishedIdx: index('venues_published_idx').on(table.published)
}))

// Blog posts table
export const blogPosts = pgTable('blog_posts', {
  id: text('id').$defaultFn(() => createId()).primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  excerpt: text('excerpt').notNull(),
  content: text('content').notNull(),
  image: text('image').notNull(),
  date: timestamp('date').notNull(),
  category: text('category').notNull(),
  published: boolean('published').default(false).notNull(),
  featured: boolean('featured').default(false).notNull(),
  metaTitle: text('meta_title'),
  metaDescription: text('meta_description'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
}, (table) => ({
  slugIdx: index('blog_posts_slug_idx').on(table.slug),
  publishedDateIdx: index('blog_posts_published_date_idx').on(table.published, table.date)
}))

// Better Auth tables (user, session, account, verification)
export const user = pgTable('user', {
  id: text('id').$defaultFn(() => createId()).primaryKey(),
  name: text('name'),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').default(false).notNull(),
  image: text('image'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
})

export const session = pgTable('session', {
  id: text('id').$defaultFn(() => createId()).primaryKey(),
  expiresAt: timestamp('expires_at').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' })
})

export const account = pgTable('account', {
  id: text('id').$defaultFn(() => createId()).primaryKey(),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
})

export const verification = pgTable('verification', {
  id: text('id').$defaultFn(() => createId()).primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
})

// Relations
export const filmsRelations = relations(films, ({ many }) => ({
  vendors: many(vendors),
  gallery: many(galleryImages)
}))

export const vendorsRelations = relations(vendors, ({ one }) => ({
  film: one(films, {
    fields: [vendors.filmId],
    references: [films.id]
  })
}))

export const galleryImagesRelations = relations(galleryImages, ({ one }) => ({
  film: one(films, {
    fields: [galleryImages.filmId],
    references: [films.id]
  })
}))

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account)
}))

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id]
  })
}))

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id]
  })
}))
```

### 1.3 Create Drizzle Client
Create `lib/db/index.ts`:

```typescript
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

const connectionString = process.env.DATABASE_URL!

// For query purposes
const queryClient = postgres(connectionString)
export const db = drizzle(queryClient, { schema })

// For migrations
export const migrationClient = postgres(connectionString, { max: 1 })
```

### 1.4 Create Drizzle Config
Create `drizzle.config.ts` in the root:

```typescript
import type { Config } from 'drizzle-kit'

export default {
  schema: './lib/db/schema.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!
  }
} satisfies Config
```

### 1.5 Environment Variables
Add to `.env.local`:

```env
# Neon PostgreSQL
DATABASE_URL="postgresql://user:pass@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require"

# Better Auth
BETTER_AUTH_SECRET="generate-with-openssl-rand-base64-32"
BETTER_AUTH_URL="http://localhost:3000"

# Cloudflare R2 (add later in Phase 4)
R2_ACCOUNT_ID="your-account-id"
R2_ACCESS_KEY_ID="your-access-key"
R2_SECRET_ACCESS_KEY="your-secret-key"
R2_BUCKET_NAME="flare-films"
R2_PUBLIC_URL="https://your-r2-public-url.com"
```

### 1.6 Generate and Run Migrations
```bash
# Install cuid2 for ID generation
npm install @paralleldrive/cuid2

# Generate migration
npx drizzle-kit generate

# Run migration
npx drizzle-kit migrate
```

### 1.7 Seed Admin User
Create `scripts/seed.ts`:

```typescript
import { db } from '../lib/db'
import { user, account } from '../lib/db/schema'
import bcrypt from 'bcryptjs'
import { eq } from 'drizzle-orm'

async function main() {
  const email = 'admin@flarefilms.com'

  // Check if user already exists
  const existingUser = await db.query.user.findFirst({
    where: eq(user.email, email)
  })

  if (existingUser) {
    console.log('✓ Admin user already exists')
    return
  }

  // Create user
  const [newUser] = await db.insert(user).values({
    email,
    name: 'Admin User',
    emailVerified: true
  }).returning()

  // Create credentials account with hashed password
  const hashedPassword = await bcrypt.hash('admin123', 10)

  await db.insert(account).values({
    userId: newUser.id,
    accountId: email,
    providerId: 'credential',
    password: hashedPassword
  })

  console.log('✓ Admin user created: admin@flarefilms.com / admin123')
}

main()
  .catch(console.error)
  .finally(() => process.exit())
```

Update `package.json`:

```json
{
  "scripts": {
    "db:generate": "drizzle-kit generate",
    "db:migrate": "drizzle-kit migrate",
    "db:push": "drizzle-kit push",
    "db:studio": "drizzle-kit studio",
    "db:seed": "tsx scripts/seed.ts"
  }
}
```

Run seed:
```bash
npm install -D tsx
npm run db:seed
```

---

## Phase 2: Authentication with Better Auth

### 2.1 Create Auth Configuration
Create `lib/auth.ts`:

```typescript
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { db } from "./db"

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // For admin, we'll manually verify
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day (update session every day)
  },
  advanced: {
    cookiePrefix: "flare-admin",
  },
})
```

### 2.2 Create Auth API Route
Create `app/api/auth/[...all]/route.ts`:

```typescript
import { auth } from "@/lib/auth"

export const { GET, POST } = auth.handler
```

### 2.3 Create Auth Client
Create `lib/auth-client.ts`:

```typescript
import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000",
})

export const { signIn, signOut, useSession } = authClient
```

### 2.4 Create Middleware
Create `middleware.ts` (root):

```typescript
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { auth } from "./lib/auth"

export async function middleware(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers
  })

  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin")
  const isLoginPage = request.nextUrl.pathname === "/admin/login"

  if (isAdminRoute && !isLoginPage && !session) {
    return NextResponse.redirect(new URL("/admin/login", request.url))
  }

  if (isLoginPage && session) {
    return NextResponse.redirect(new URL("/admin", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"]
}
```

### 2.5 Create Login Page
Create `app/admin/login/page.tsx`:

```typescript
'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function AdminLogin() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      await signIn.email({
        email,
        password,
        callbackURL: '/admin'
      })

      router.push('/admin')
      router.refresh()
    } catch (err) {
      setError('Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h2 className="text-3xl font-cormorant font-bold text-center">Admin Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input name="email" type="email" placeholder="Email" required />
          <Input name="password" type="password" placeholder="Password" required />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
      </div>
    </div>
  )
}
```

### 2.6 Create Session Helper
Create `lib/session.ts`:

```typescript
import { auth } from './auth'
import { headers } from 'next/headers'

export async function getSession() {
  return await auth.api.getSession({
    headers: headers()
  })
}

export async function requireAuth() {
  const session = await getSession()
  if (!session) {
    throw new Error('Unauthorized')
  }
  return session
}
```

---

## Phase 3: Data Migration

### 3.1 Migrate Existing Films
Create `scripts/migrate-films.ts`:

```typescript
import { db } from '../lib/db'
import { films, vendors, galleryImages } from '../lib/db/schema'
import { filmsData } from '../lib/films-data'

async function migrateFilms() {
  console.log(`Starting migration of ${filmsData.length} films...`)

  for (const filmData of filmsData) {
    // Insert film
    const [newFilm] = await db.insert(films).values({
      slug: filmData.slug,
      title: filmData.title,
      subtitle: filmData.subtitle,
      tagline: filmData.tagline,
      location: filmData.location,
      headerImage: filmData.headerImage,
      videoUrl: filmData.videoUrl,
      storyHeading: filmData.story.heading,
      storyParagraphs: filmData.story.paragraphs,
      published: true,
      featured: true,
    }).returning()

    console.log(`✓ Created film: ${newFilm.title}`)

    // Insert vendors
    if (filmData.vendors.length > 0) {
      await db.insert(vendors).values(
        filmData.vendors.map((v, index) => ({
          filmId: newFilm.id,
          role: v.role,
          name: v.name,
          link: v.link,
          order: index
        }))
      )
      console.log(`  ✓ Added ${filmData.vendors.length} vendors`)
    }

    // Insert gallery images
    if (filmData.gallery.length > 0) {
      await db.insert(galleryImages).values(
        filmData.gallery.map((g, index) => ({
          filmId: newFilm.id,
          url: g.url,
          alt: g.alt,
          order: index
        }))
      )
      console.log(`  ✓ Added ${filmData.gallery.length} gallery images`)
    }
  }

  console.log(`\n✓ Successfully migrated ${filmsData.length} films`)
}

migrateFilms()
  .catch(console.error)
  .finally(() => process.exit())
```

Run migration:
```bash
npx tsx scripts/migrate-films.ts
```

### 3.2 Migrate Venues
Parse hardcoded venues from `app/venues/page.tsx` and create similar migration script.

### 3.3 Migrate Blog Posts
Parse hardcoded blog posts from `app/blog/page.tsx` and create similar migration script.

---

## Phase 4: Cloudflare R2 Setup

### 4.1 Install R2 SDK
```bash
npm install @aws-sdk/client-s3
npm install @aws-sdk/s3-request-presigner
```

### 4.2 Create R2 Upload Utility
Create `lib/r2-upload.ts`:

```typescript
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

const s3Client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
})

export async function uploadToR2(file: File, folder: string) {
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  const key = `${folder}/${Date.now()}-${file.name}`

  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME!,
    Key: key,
    Body: buffer,
    ContentType: file.type,
  })

  await s3Client.send(command)

  return `${process.env.R2_PUBLIC_URL}/${key}`
}
```

### 4.3 Create Upload API Route
Create `app/api/upload/route.ts`:

```typescript
import { auth } from '@/auth'
import { uploadToR2 } from '@/lib/r2-upload'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const folder = formData.get('folder') as string || 'general'

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const url = await uploadToR2(file, folder)

    return NextResponse.json({ url })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
```

---

## Phase 5: Admin Panel UI

### 5.1 Install UI Dependencies
```bash
npm install @tanstack/react-table
npm install react-dropzone
npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-image @tiptap/extension-link
npm install date-fns
```

### 5.2 Create Admin Layout
Create `app/admin/layout.tsx`:

```typescript
import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import { signOut } from '@/lib/auth-client'

export default async function AdminLayout({
  children
}: {
  children: React.ReactNode
}) {
  const session = await getSession()

  if (!session) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-cormorant font-bold">Flare Films Admin</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{session.user?.email}</span>
            <form action={async () => {
              'use server'
              await signOut()
            }}>
              <button className="text-sm text-gray-600 hover:text-gray-900">Sign Out</button>
            </form>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-6">
          <nav className="space-y-2">
            <a href="/admin" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">Dashboard</a>
            <a href="/admin/films" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">Films</a>
            <a href="/admin/venues" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">Venues</a>
            <a href="/admin/blog" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">Blog</a>
            <hr className="my-4" />
            <a href="/" className="block px-4 py-2 text-gray-500 hover:bg-gray-100 rounded text-sm">View Site →</a>
          </nav>
        </aside>

        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
```

### 5.3 Create Dashboard
Create `app/admin/page.tsx`:

```typescript
import { db } from '@/lib/db'
import { films, venues, blogPosts } from '@/lib/db/schema'
import { eq, count } from 'drizzle-orm'

export default async function AdminDashboard() {
  const [filmsCount] = await db.select({ count: count() })
    .from(films)
    .where(eq(films.published, true))

  const [venuesCount] = await db.select({ count: count() })
    .from(venues)
    .where(eq(venues.published, true))

  const [postsCount] = await db.select({ count: count() })
    .from(blogPosts)
    .where(eq(blogPosts.published, true))

  return (
    <div>
      <h1 className="text-3xl font-cormorant font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Published Films</h3>
          <p className="text-3xl font-bold mt-2">{filmsCount.count}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Published Venues</h3>
          <p className="text-3xl font-bold mt-2">{venuesCount.count}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Published Posts</h3>
          <p className="text-3xl font-bold mt-2">{postsCount.count}</p>
        </div>
      </div>
    </div>
  )
}
```

### 5.4 Create Films Management
Create `app/admin/films/page.tsx`:

```typescript
import { db } from '@/lib/db'
import { films, vendors, galleryImages } from '@/lib/db/schema'
import { desc, eq, count } from 'drizzle-orm'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function AdminFilmsPage() {
  // Get all films with vendor and gallery counts
  const allFilms = await db
    .select({
      id: films.id,
      title: films.title,
      location: films.location,
      published: films.published,
      createdAt: films.createdAt,
    })
    .from(films)
    .orderBy(desc(films.createdAt))

  // Get counts for each film
  const filmsWithCounts = await Promise.all(
    allFilms.map(async (film) => {
      const [vendorCount] = await db
        .select({ count: count() })
        .from(vendors)
        .where(eq(vendors.filmId, film.id))

      const [galleryCount] = await db
        .select({ count: count() })
        .from(galleryImages)
        .where(eq(galleryImages.filmId, film.id))

      return {
        ...film,
        vendorCount: vendorCount.count,
        galleryCount: galleryCount.count,
      }
    })
  )

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-cormorant font-bold">Films</h1>
        <Link href="/admin/films/new">
          <Button>Add New Film</Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vendors</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Photos</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filmsWithCounts.map((film) => (
              <tr key={film.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{film.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{film.location}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${film.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {film.published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{film.vendorCount}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{film.galleryCount}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <Link href={`/admin/films/${film.id}`} className="text-blue-600 hover:text-blue-900">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
```

### 5.5 Create Server Actions for CRUD
Create `app/admin/films/actions.ts`:

```typescript
'use server'

import { db } from '@/lib/db'
import { films } from '@/lib/db/schema'
import { revalidatePath } from 'next/cache'
import { requireAuth } from '@/lib/session'
import { redirect } from 'next/navigation'
import { eq } from 'drizzle-orm'

export async function createFilm(formData: FormData) {
  await requireAuth()

  const data = {
    title: formData.get('title') as string,
    subtitle: formData.get('subtitle') as string,
    slug: formData.get('slug') as string,
    tagline: formData.get('tagline') as string,
    location: formData.get('location') as string,
    headerImage: formData.get('headerImage') as string,
    videoUrl: formData.get('videoUrl') as string || null,
    storyHeading: formData.get('storyHeading') as string,
    storyParagraphs: formData.getAll('storyParagraphs') as string[],
    published: formData.get('published') === 'on',
    featured: formData.get('featured') === 'on',
  }

  await db.insert(films).values(data)

  revalidatePath('/films')
  revalidatePath('/admin/films')

  redirect('/admin/films')
}

export async function updateFilm(id: string, formData: FormData) {
  await requireAuth()

  const data = {
    title: formData.get('title') as string,
    subtitle: formData.get('subtitle') as string,
    slug: formData.get('slug') as string,
    tagline: formData.get('tagline') as string,
    location: formData.get('location') as string,
    headerImage: formData.get('headerImage') as string,
    videoUrl: formData.get('videoUrl') as string || null,
    storyHeading: formData.get('storyHeading') as string,
    storyParagraphs: formData.getAll('storyParagraphs') as string[],
    published: formData.get('published') === 'on',
    featured: formData.get('featured') === 'on',
    updatedAt: new Date(),
  }

  const [film] = await db
    .update(films)
    .set(data)
    .where(eq(films.id, id))
    .returning()

  revalidatePath('/films')
  revalidatePath(`/films/${film.slug}`)
  revalidatePath('/admin/films')

  redirect('/admin/films')
}

export async function deleteFilm(id: string) {
  await requireAuth()

  await db.delete(films).where(eq(films.id, id))

  revalidatePath('/films')
  revalidatePath('/admin/films')
}
```

### 5.6 Create Image Upload Component
Create `components/admin/image-upload.tsx`:

```typescript
'use client'

import { useState } from 'react'
import { useDropzone } from 'react-dropzone'

export function ImageUpload({
  onUploadComplete,
  folder = 'general'
}: {
  onUploadComplete: (url: string) => void
  folder?: string
}) {
  const [uploading, setUploading] = useState(false)

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [] },
    maxFiles: 1,
    onDrop: async (files) => {
      if (files.length === 0) return

      setUploading(true)
      const formData = new FormData()
      formData.append('file', files[0])
      formData.append('folder', folder)

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        })

        const data = await response.json()
        if (data.url) {
          onUploadComplete(data.url)
        }
      } catch (error) {
        console.error('Upload error:', error)
      } finally {
        setUploading(false)
      }
    }
  })

  return (
    <div {...getRootProps()} className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400">
      <input {...getInputProps()} />
      {uploading ? (
        <p>Uploading...</p>
      ) : (
        <p className="text-gray-500">Drag & drop an image, or click to select</p>
      )}
    </div>
  )
}
```

### 5.7 Create Tiptap Editor
Create `components/admin/tiptap-editor.tsx`:

```typescript
'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import { Button } from '@/components/ui/button'

export function TiptapEditor({
  content,
  onChange
}: {
  content: string
  onChange: (html: string) => void
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  if (!editor) return null

  return (
    <div className="border rounded-lg">
      <div className="border-b p-2 flex gap-2 flex-wrap">
        <Button
          size="sm"
          variant="outline"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'bg-gray-200' : ''}
        >
          Bold
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'bg-gray-200' : ''}
        >
          Italic
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : ''}
        >
          H2
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor.isActive('heading', { level: 3 }) ? 'bg-gray-200' : ''}
        >
          H3
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'bg-gray-200' : ''}
        >
          Bullet List
        </Button>
      </div>
      <EditorContent editor={editor} className="prose max-w-none p-4" />
    </div>
  )
}
```

---

## Phase 6: SSG + Revalidation

### 6.1 Update Films Detail Page
Modify `app/films/[slug]/page.tsx`:

```typescript
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

// Generate static params at build time
export async function generateStaticParams() {
  const allFilms = await db
    .select({ slug: films.slug })
    .from(films)
    .where(eq(films.published, true))

  return allFilms.map((film) => ({
    slug: film.slug
  }))
}

// Revalidate on-demand only
export const revalidate = false

export default async function FilmPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  // Get film with vendors and gallery
  const film = await db.query.films.findFirst({
    where: eq(films.slug, slug) && eq(films.published, true),
    with: {
      vendors: {
        orderBy: (vendors, { asc }) => [asc(vendors.order)]
      },
      gallery: {
        orderBy: (gallery, { asc }) => [asc(gallery.order)]
      }
    }
  })

  if (!film) {
    notFound()
  }

  // Transform to existing interface format
  const filmData = {
    slug: film.slug,
    title: film.title,
    subtitle: film.subtitle,
    tagline: film.tagline,
    location: film.location,
    headerImage: film.headerImage,
    videoUrl: film.videoUrl,
    story: {
      heading: film.storyHeading,
      paragraphs: film.storyParagraphs
    },
    vendors: film.vendors.map(v => ({
      role: v.role,
      name: v.name,
      link: v.link
    })),
    gallery: film.gallery.map(g => ({
      url: g.url,
      alt: g.alt
    }))
  }

  // Reuse existing JSX (no changes needed to the UI)
  return (
    <main className="min-h-screen bg-white">
      {/* ... existing JSX from current implementation ... */}
    </main>
  )
}
```

### 6.2 Create Revalidation API
Create `app/api/revalidate/route.ts`:

```typescript
import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/session'

export async function POST(request: NextRequest) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { type, slug } = body

    switch (type) {
      case 'film':
        revalidatePath('/films')
        if (slug) revalidatePath(`/films/${slug}`)
        revalidatePath('/')
        break

      case 'venue':
        revalidatePath('/venues')
        if (slug) revalidatePath(`/venues/${slug}`)
        break

      case 'blog':
        revalidatePath('/blog')
        if (slug) revalidatePath(`/blog/${slug}`)
        break

      case 'all':
        revalidatePath('/', 'layout')
        break
    }

    return NextResponse.json({ revalidated: true })
  } catch (err) {
    return NextResponse.json({ error: 'Error revalidating' }, { status: 500 })
  }
}
```

---

## Phase 7: Repeat for Venues & Blog

Apply the same patterns from Films to:

1. **Venues** (`/app/admin/venues/*`)
   - Similar CRUD with simpler schema
   - No nested relations like vendors/gallery

2. **Blog Posts** (`/app/admin/blog/*`)
   - Add Tiptap editor for content field
   - Date picker for publish date
   - Category dropdown/tags

---

## Critical Files Summary

### New Files to Create:
- `prisma/schema.prisma` - Database schema
- `lib/prisma.ts` - Prisma client
- `lib/r2-upload.ts` - R2 upload utility
- `auth.ts` - NextAuth config
- `middleware.ts` - Auth middleware
- `app/api/auth/[...nextauth]/route.ts` - Auth API
- `app/api/upload/route.ts` - Upload API
- `app/api/revalidate/route.ts` - Revalidation API
- `app/admin/*` - All admin pages
- `components/admin/*` - Admin components
- `scripts/migrate-films.ts` - Migration script

### Files to Update:
- `app/films/[slug]/page.tsx` - Add generateStaticParams, fetch from DB
- `app/films/page.tsx` - Fetch from DB
- `app/venues/page.tsx` - Fetch from DB
- `app/blog/page.tsx` - Fetch from DB
- `components/featured-work.tsx` - Fetch from DB
- `next.config.ts` - Add R2 domain to remotePatterns
- `.env.local` - Add all environment variables
- `package.json` - Add scripts and prisma seed config

---

## Environment Setup Checklist

- [ ] Create Neon PostgreSQL database
- [ ] Set up Cloudflare R2 bucket
- [ ] Configure R2 public access
- [ ] Generate AUTH_SECRET (`openssl rand -base64 32`)
- [ ] Update all environment variables
- [ ] Run database migrations
- [ ] Seed admin user
- [ ] Test login flow
- [ ] Migrate existing data
- [ ] Test revalidation

---

## Deployment Checklist (Vercel)

- [ ] Add environment variables to Vercel project
- [ ] Ensure DATABASE_URL points to production Neon database
- [ ] Verify R2 credentials and public URL
- [ ] Test admin login in production
- [ ] Verify SSG pages are generated at build time
- [ ] Test on-demand revalidation works
- [ ] Monitor build times (should stay fast)

---

## Success Criteria

✅ Admin panel accessible at `/admin` with login
✅ Can create/edit/delete Films, Venues, Blog Posts
✅ Images upload to Cloudflare R2
✅ Public pages still statically generated at build time
✅ On-demand revalidation updates pages immediately
✅ Type-safe throughout (Prisma + TypeScript)
✅ Fast builds (<2 min for full site)
✅ No breaking changes to existing public pages
