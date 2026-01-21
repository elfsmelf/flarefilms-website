import { pgTable, text, boolean, integer, timestamp, index } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { createId } from '@paralleldrive/cuid2'

// Films table
export const films = pgTable('films', {
  id: text('id').$defaultFn(() => createId()).primaryKey(),
  slug: text('slug').notNull().unique(),
  oldSlugs: text('old_slugs'), // JSON array of previous slugs for automatic redirects
  title: text('title').notNull(),
  subtitle: text('subtitle').notNull(),
  tagline: text('tagline').notNull(),
  location: text('location').notNull(),
  headerImage: text('header_image').notNull(),
  videoUrl: text('video_url'),
  trailerUrl: text('trailer_url'),
  storyContent: text('story_content').notNull(),
  published: boolean('published').default(false).notNull(),
  featured: boolean('featured').default(false).notNull(),
  order: integer('order').default(0).notNull(),
  rating: integer('rating').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
}, (table) => ({
  slugIdx: index('films_slug_idx').on(table.slug),
  publishedFeaturedIdx: index('films_published_featured_idx').on(table.published, table.featured),
  ratingIdx: index('films_rating_idx').on(table.rating)
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
  venueTitle: text('venue_title').notNull(),
  shortDescription: text('short_description'),
  expandedText: text('expanded_text'),
  listingImage: text('listing_image'),
  venueAddress: text('venue_address'),
  phoneNumber: text('phone_number'),
  city: text('city'),
  cityPageUrl: text('city_page_url'),
  venueLocation: text('venue_location'),
  weddingTypes: text('wedding_types'),
  categories: text('categories'),
  price: text('price'),
  pricePerHead: text('price_per_head'),
  rating: integer('rating'),
  availableDaysAndTimes: text('available_days_and_times'),
  venueContact: text('venue_contact'),
  websiteUrl: text('website_url'),
  isParkingOnSite: text('is_parking_on_site'),
  canHaveCeremony: text('can_have_ceremony'),
  canHaveReception: text('can_have_reception'),
  wetWeatherOption: text('wet_weather_option'),
  marqueeRequired: text('marquee_required'),
  inHouseCatering: text('in_house_catering'),
  thirdPartyCatering: text('third_party_catering'),
  cateringOptions: text('catering_options'),
  covidInfo: text('covid_info'),
  howToGetMostOut: text('how_to_get_most_out'),
  weddingCost: text('wedding_cost'),
  themeStyle: text('theme_style'),
  address: text('address'),
  accommodationOptions: text('accommodation_options'),
  customCallToAction: text('custom_call_to_action'),
  timeRestriction: text('time_restriction'),
  musicEndBy: text('music_end_by'),
  ceremonyGuests: text('ceremony_guests'),
  receptionGuests: text('reception_guests'),
  html: text('html'),
  indoorOutdoor: text('indoor_outdoor'),
  published: boolean('published').default(false).notNull(),
  featured: boolean('featured').default(false).notNull(),
  order: integer('order').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
}, (table) => ({
  slugIdx: index('venues_slug_idx').on(table.slug),
  publishedIdx: index('venues_published_idx').on(table.published)
}))

// Venue gallery images table
export const venueGalleryImages = pgTable('venue_gallery_images', {
  id: text('id').$defaultFn(() => createId()).primaryKey(),
  venueId: text('venue_id').notNull().references(() => venues.id, { onDelete: 'cascade' }),
  url: text('url').notNull(),
  alt: text('alt').notNull(),
  order: integer('order').default(0).notNull()
}, (table) => ({
  venueIdIdx: index('venue_gallery_images_venue_id_idx').on(table.venueId)
}))

// Venue wedding films relation table
export const venueWeddingFilms = pgTable('venue_wedding_films', {
  id: text('id').$defaultFn(() => createId()).primaryKey(),
  venueId: text('venue_id').notNull().references(() => venues.id, { onDelete: 'cascade' }),
  filmId: text('film_id').notNull().references(() => films.id, { onDelete: 'cascade' }),
  order: integer('order').default(0).notNull()
}, (table) => ({
  venueIdIdx: index('venue_wedding_films_venue_id_idx').on(table.venueId),
  filmIdIdx: index('venue_wedding_films_film_id_idx').on(table.filmId)
}))

// Similar venues relation table
export const similarVenues = pgTable('similar_venues', {
  id: text('id').$defaultFn(() => createId()).primaryKey(),
  venueId: text('venue_id').notNull().references(() => venues.id, { onDelete: 'cascade' }),
  similarVenueId: text('similar_venue_id').notNull().references(() => venues.id, { onDelete: 'cascade' }),
  order: integer('order').default(0).notNull()
}, (table) => ({
  venueIdIdx: index('similar_venues_venue_id_idx').on(table.venueId)
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
  gallery: many(galleryImages),
  venueWeddingFilms: many(venueWeddingFilms)
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

export const venuesRelations = relations(venues, ({ many }) => ({
  gallery: many(venueGalleryImages),
  weddingFilms: many(venueWeddingFilms),
  similarVenues: many(similarVenues, { relationName: 'venue' })
}))

export const venueGalleryImagesRelations = relations(venueGalleryImages, ({ one }) => ({
  venue: one(venues, {
    fields: [venueGalleryImages.venueId],
    references: [venues.id]
  })
}))

export const venueWeddingFilmsRelations = relations(venueWeddingFilms, ({ one }) => ({
  venue: one(venues, {
    fields: [venueWeddingFilms.venueId],
    references: [venues.id]
  }),
  film: one(films, {
    fields: [venueWeddingFilms.filmId],
    references: [films.id]
  })
}))

export const similarVenuesRelations = relations(similarVenues, ({ one }) => ({
  venue: one(venues, {
    fields: [similarVenues.venueId],
    references: [venues.id],
    relationName: 'venue'
  }),
  similarVenue: one(venues, {
    fields: [similarVenues.similarVenueId],
    references: [venues.id],
    relationName: 'similarVenue'
  })
}))
