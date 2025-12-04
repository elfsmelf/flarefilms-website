import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { films, vendors, galleryImages, user, account } from '@/lib/db/schema'
import { auth } from '@/lib/auth'
import { createId } from '@paralleldrive/cuid2'
import { eq } from 'drizzle-orm'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@flarefilms.com.au'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'
const ADMIN_NAME = process.env.ADMIN_NAME || 'Admin User'

export async function POST(request: Request) {
  try {
    // Check if seeding is allowed (only in development)
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        { error: 'Seeding is not allowed in production' },
        { status: 403 }
      )
    }

    console.log('🌱 Starting database seed...')

    // Delete existing admin user if exists
    const existingUser = await db.select().from(user).where(eq(user.email, ADMIN_EMAIL)).limit(1)
    if (existingUser.length > 0) {
      console.log('⚠️  Admin user exists, deleting...')
      await db.delete(account).where(eq(account.userId, existingUser[0].id))
      await db.delete(user).where(eq(user.email, ADMIN_EMAIL))
    }

    // Create admin user using Better Auth
    await auth.api.signUpEmail({
      body: {
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        name: ADMIN_NAME,
      },
    })

    console.log('✅ Created admin user')

    // Seed Films
    console.log('🎬 Seeding films...')

    const sampleFilms = [
      {
        id: createId(),
        slug: 'elena-and-lachlan-surat',
        title: 'Elena & Lachlan',
        subtitle: 'A Regional QLD Wedding',
        tagline: 'A beautiful country wedding celebration in the heart of Queensland',
        location: 'Surat, QLD',
        headerImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&h=900&fit=crop',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        storyContent: `<h1>A Regional QLD Wedding Video</h1><p>Elena and Lachlan's big day in Surat, Queensland, was the epitome of a laid-back, country vibe that felt like something out of a dream. These two lovebirds, who spend their days teaching at the same school, decided to tie the knot on a friend's property that was as beautiful as it was remote. It was clear from the get-go that this wasn't just any wedding; it was a heartfelt celebration of their journey from colleagues to soulmates, all set against a backdrop of stunning landscapes that could take your breath away.</p><p>The reception was where the party really kicked into high gear. Picture this: a live band cranking out tunes that got everyone—from little kids to the grandparents—dancing like there was no tomorrow. The energy was contagious, the laughs were non-stop, and the love in the air was tangible. Filming Elena and Lachlan's wedding was like capturing a slice of pure happiness; their day was a beautiful blend of love, community, and good old-fashioned fun that they, and their guests, will surely remember for years to come.</p>`,
        published: true,
        featured: true,
        order: 0,
      },
      {
        id: createId(),
        slug: 'sarah-and-james-byron-bay',
        title: 'Sarah & James',
        subtitle: 'A Coastal Byron Bay Wedding',
        tagline: 'Love and laughter by the ocean',
        location: 'Byron Bay, NSW',
        headerImage: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=1600&h=900&fit=crop',
        videoUrl: null,
        storyContent: `<h1>Their Story</h1><p>Sarah and James chose the stunning beaches of Byron Bay for their special day. The ceremony took place at sunset, with the golden light creating the perfect backdrop for their vows.</p><p>Their celebration was intimate and heartfelt, surrounded by close family and friends. The coastal breeze, the sound of waves, and the warmth of their love made for an unforgettable day.</p>`,
        published: true,
        featured: false,
        order: 1,
      },
    ]

    // Delete existing films
    await db.delete(films)
    console.log('✅ Cleared existing films')

    // Insert films with vendors and gallery
    for (const film of sampleFilms) {
      await db.insert(films).values(film)
      console.log(`✅ Created film: ${film.title}`)

      // Add vendors and gallery for Elena & Lachlan
      if (film.slug === 'elena-and-lachlan-surat') {
        await db.insert(vendors).values([
          {
            id: createId(),
            filmId: film.id,
            role: 'Photographer',
            name: 'Photos by Rebecca DB',
            link: 'https://example.com/photographer',
            order: 0,
          },
          {
            id: createId(),
            filmId: film.id,
            role: 'Venue',
            name: 'Private Property',
            link: null,
            order: 1,
          },
          {
            id: createId(),
            filmId: film.id,
            role: 'Catering',
            name: 'Country Kitchen Co',
            link: 'https://example.com/catering',
            order: 2,
          },
        ])

        await db.insert(galleryImages).values([
          {
            id: createId(),
            filmId: film.id,
            url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&h=600&fit=crop',
            alt: 'Elena & Lachlan - Image 1',
            order: 0,
          },
          {
            id: createId(),
            filmId: film.id,
            url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&h=600&fit=crop',
            alt: 'Elena & Lachlan - Image 2',
            order: 1,
          },
          {
            id: createId(),
            filmId: film.id,
            url: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&h=600&fit=crop',
            alt: 'Elena & Lachlan - Image 3',
            order: 2,
          },
        ])
      }

      // Add vendors and gallery for Sarah & James
      if (film.slug === 'sarah-and-james-byron-bay') {
        await db.insert(vendors).values([
          {
            id: createId(),
            filmId: film.id,
            role: 'Venue',
            name: 'Byron Bay Beach Club',
            link: 'https://example.com/venue',
            order: 0,
          },
        ])

        await db.insert(galleryImages).values([
          {
            id: createId(),
            filmId: film.id,
            url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=600&fit=crop',
            alt: 'Sarah & James - Image 1',
            order: 0,
          },
          {
            id: createId(),
            filmId: film.id,
            url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=600&fit=crop',
            alt: 'Sarah & James - Image 2',
            order: 1,
          },
        ])
      }
    }

    console.log(`✅ Created ${sampleFilms.length} films with vendors and gallery`)

    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully',
      credentials: {
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
      },
    })
  } catch (error) {
    console.error('❌ Seeding failed:', error)
    return NextResponse.json(
      { error: 'Seeding failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
