// Load environment variables from .env.local before any other imports
import { config } from 'dotenv'
config({ path: '.env.local' })

// Import these statically (they don't depend on env vars)
import { createId } from '@paralleldrive/cuid2'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import bcrypt from 'bcryptjs'
import { user, account, films, vendors, galleryImages } from '../lib/db/schema.js'
import { eq } from 'drizzle-orm'

// Read from environment variables or use defaults
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@flarefilms.com.au'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'
const ADMIN_NAME = process.env.ADMIN_NAME || 'Admin User'

async function seed() {
  // Create direct database connection
  const connectionString = process.env.DATABASE_URL!
  const client = postgres(connectionString)
  const db = drizzle(client)

  console.log('🌱 Seeding database...')

  try {
    // Check if admin user already exists
    const existingUser = await db.select().from(user).where(eq(user.email, ADMIN_EMAIL)).limit(1)

    if (existingUser.length > 0) {
      console.log('⚠️  Admin user already exists, deleting and recreating...')
      await db.delete(account).where(eq(account.userId, existingUser[0].id))
      await db.delete(user).where(eq(user.email, ADMIN_EMAIL))
      console.log('✅ Deleted existing admin user')
    }

    // Create admin user directly
    const userId = createId()
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10)

    await db.insert(user).values({
      id: userId,
      email: ADMIN_EMAIL,
      name: ADMIN_NAME,
      emailVerified: true,
    })

    await db.insert(account).values({
      id: createId(),
      userId: userId,
      accountId: userId,
      providerId: 'credential',
      password: hashedPassword,
    })

    console.log('✅ Created admin user:', ADMIN_EMAIL)
    console.log('✅ Created admin account with password')
    console.log('\n📧 Admin credentials:')
    console.log(`   Email: ${ADMIN_EMAIL}`)
    console.log(`   Password: ${ADMIN_PASSWORD}`)
    console.log('\n⚠️  Make sure to change the password after first login!\n')

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

    // Delete existing films if any
    await db.delete(films)
    console.log('✅ Cleared existing films')

    // Insert films
    for (const film of sampleFilms) {
      await db.insert(films).values(film)
      console.log(`✅ Created film: ${film.title}`)

      // Add vendors for first film
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
        console.log(`✅ Added vendors for ${film.title}`)

        // Add gallery images
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
        console.log(`✅ Added gallery images for ${film.title}`)
      }

      // Add vendors for second film
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
        console.log(`✅ Added vendors for ${film.title}`)

        // Add gallery images
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
        console.log(`✅ Added gallery images for ${film.title}`)
      }
    }

    console.log(`✅ Created ${sampleFilms.length} films with vendors and gallery images`)
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    throw error
  } finally {
    // Close database connection
    await client.end()
  }
}

seed()
  .then(() => {
    console.log('✅ Seeding completed successfully')
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ Seeding failed:', error)
    process.exit(1)
  })
