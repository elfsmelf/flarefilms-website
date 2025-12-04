// Load environment variables before any other imports
import { config } from 'dotenv'
config({ path: '.env.local' })

import { films } from '../lib/films-data'
import { createId } from '@paralleldrive/cuid2'

async function migrateFilms() {
  // Dynamic import AFTER dotenv has loaded
  const { db } = await import('../lib/db/index.js')
  const { films: filmsTable, vendors, galleryImages } = await import('../lib/db/schema.js')

  console.log('🎬 Migrating films to database...')
  console.log(`Found ${films.length} film(s) to migrate\n`)

  try {
    for (const film of films) {
      console.log(`📹 Processing: ${film.title}`)

      // Check if film already exists
      const { eq } = await import('drizzle-orm')
      const existing = await db.query.films.findFirst({
        where: eq(filmsTable.slug, film.slug),
      })

      if (existing) {
        console.log(`   ⏭️  Film already exists, skipping...`)
        continue
      }

      // Insert film
      const [newFilm] = await db
        .insert(filmsTable)
        .values({
          id: createId(),
          slug: film.slug,
          title: film.title,
          subtitle: film.subtitle,
          tagline: film.tagline,
          location: film.location,
          headerImage: film.headerImage,
          videoUrl: film.videoUrl,
          storyHeading: film.story.heading,
          storyParagraphs: film.story.paragraphs,
          published: true,
          featured: true,
          order: 0,
        })
        .returning()

      console.log(`   ✅ Film inserted: ${newFilm.id}`)

      // Insert vendors
      if (film.vendors.length > 0) {
        const vendorsToInsert = film.vendors.map((vendor, index) => ({
          id: createId(),
          filmId: newFilm.id,
          role: vendor.role,
          name: vendor.name,
          link: vendor.link,
          order: index,
        }))

        await db.insert(vendors).values(vendorsToInsert)
        console.log(`   ✅ Inserted ${vendorsToInsert.length} vendor(s)`)
      }

      // Insert gallery images
      if (film.gallery.length > 0) {
        const galleryToInsert = film.gallery.map((image, index) => ({
          id: createId(),
          filmId: newFilm.id,
          url: image.url,
          alt: image.alt,
          order: index,
        }))

        await db.insert(galleryImages).values(galleryToInsert)
        console.log(`   ✅ Inserted ${galleryToInsert.length} gallery image(s)`)
      }

      console.log('')
    }

    console.log('✅ Migration completed successfully!')
  } catch (error) {
    console.error('❌ Migration failed:', error)
    throw error
  }
}

migrateFilms()
  .then(() => {
    console.log('✅ All films migrated')
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  })
