import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { venues } from '../lib/db/schema'
import { createId } from '@paralleldrive/cuid2'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

// Create database connection for script
const connectionString = process.env.DATABASE_URL!
const client = postgres(connectionString)
const db = drizzle(client)

const sampleVenues = [
  {
    slug: 'summergrove-estate',
    venueTitle: 'Summergrove Estate',
    shortDescription: 'Luxurious country estate perfect for romantic weddings',
    expandedText: '<p>Summergrove Estate is a stunning country estate located in the Gold Coast hinterland. With breathtaking views, elegant gardens, and world-class facilities, it\'s the perfect venue for your dream wedding.</p>',
    listingImage: 'https://images.unsplash.com/photo-1519167758481-83f29da8c2c0?w=800',
    venueAddress: '1 Summergrove Drive, Carool NSW 2486',
    phoneNumber: '(02) 6677 7359',
    city: 'Gold Coast',
    cityPageUrl: 'https://flarefilms.com.au/gold-coast-wedding-videographer/',
    venueLocation: 'Gold Coast Hinterland',
    weddingTypes: JSON.stringify(['Ceremony', 'Reception', 'Accomodation']),
    price: '$$',
    pricePerHead: '<p>From $180 per person for reception packages</p>',
    rating: 5,
    availableDaysAndTimes: 'Available 7 days a week. Ceremonies typically from 3pm, receptions from 6pm',
    venueContact: 'events@summergrove.com.au',
    websiteUrl: 'https://summergrove.com.au',
    isParkingOnSite: '<p>Yes, ample parking available on-site for up to 200 vehicles</p>',
    canHaveCeremony: 'Yes, multiple ceremony locations available',
    canHaveReception: 'Yes, indoor and outdoor reception spaces',
    wetWeatherOption: 'Yes, beautiful indoor chapel and reception halls',
    marqueeRequired: 'No',
    inHouseCatering: 'Yes',
    thirdPartyCatering: 'No',
    cateringOptions: '<p>Award-winning in-house catering with customizable menus. Options include plated meals, buffet, and cocktail style.</p>',
    covidInfo: '<p>We follow all current health guidelines and have flexible postponement policies.</p>',
    howToGetMostOut: '<p>Book an overnight stay in our luxurious accommodations to make the most of your wedding weekend. Take advantage of our stunning grounds for your photos during golden hour.</p>',
    weddingCost: '<p>Wedding packages start from $15,000 for 80 guests, including venue hire, catering, and beverages.</p>',
    themeStyle: 'Elegant, romantic, country estate, garden weddings',
    address: '1 Summergrove Drive, Carool NSW 2486',
    accommodationOptions: '<p>On-site accommodation for up to 40 guests in luxury suites and cottages. Additional accommodation available nearby in Tweed Heads.</p>',
    customCallToAction: 'Book your tour today',
    timeRestriction: '00:00',
    musicEndBy: '23:00',
    ceremonyGuests: 'Up to 200',
    receptionGuests: 'Up to 200',
    html: '<p>Experience the magic of Summergrove Estate</p>',
    indoorOutdoor: JSON.stringify(['Indoors', 'Outdoors', 'Indoors & Outdoors']),
    published: true,
    featured: true,
    order: 1,
  },
  {
    slug: 'tiffanys-maleny',
    venueTitle: 'Tiffany\'s Restaurant & Maleny Retreat',
    shortDescription: 'Intimate mountaintop venue with spectacular hinterland views',
    expandedText: '<p>Perched on the edge of an escarpment overlooking the Glasshouse Mountains, Tiffany\'s offers an intimate and romantic setting for your wedding celebration.</p>',
    listingImage: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800',
    venueAddress: '14 Cairncross St, Maleny QLD 4552',
    phoneNumber: '(07) 5499 9177',
    city: 'Brisbane',
    cityPageUrl: 'https://flarefilms.com.au/brisbane-wedding-videographer/',
    venueLocation: 'Maleny, Sunshine Coast Hinterland',
    weddingTypes: JSON.stringify(['Ceremony', 'Reception']),
    price: '$$',
    pricePerHead: '<p>From $165 per person for reception packages</p>',
    rating: 5,
    availableDaysAndTimes: 'Friday to Sunday. Ceremonies from 2pm, receptions from 5pm',
    venueContact: 'weddings@tiffanysmaleny.com',
    websiteUrl: 'https://tiffanysmaleny.com',
    isParkingOnSite: '<p>Limited on-site parking. Shuttle service available from nearby parking areas.</p>',
    canHaveCeremony: 'Yes, stunning outdoor ceremony location with mountain views',
    canHaveReception: 'Yes, restaurant and terrace areas',
    wetWeatherOption: 'Yes, covered terrace and indoor restaurant space',
    marqueeRequired: 'No',
    inHouseCatering: 'Yes',
    thirdPartyCatering: 'No',
    cateringOptions: '<p>Fine dining experience with seasonal menus featuring local produce. Choice of plated meals or cocktail style.</p>',
    covidInfo: '<p>Flexible booking policies and COVID-safe practices in place.</p>',
    howToGetMostOut: '<p>Schedule your ceremony during sunset for incredible photo opportunities. The views are absolutely spectacular at golden hour.</p>',
    weddingCost: '<p>Intimate weddings from $8,000 for 50 guests, including venue, catering, and beverages.</p>',
    themeStyle: 'Intimate, romantic, mountain views, fine dining',
    address: '14 Cairncross St, Maleny QLD 4552',
    accommodationOptions: '<p>Luxury accommodation available on-site. Additional options in Maleny township nearby.</p>',
    customCallToAction: 'Enquire about availability',
    timeRestriction: '22:30',
    musicEndBy: '22:00',
    ceremonyGuests: 'Up to 80',
    receptionGuests: 'Up to 80',
    html: '<p>Unforgettable views, exceptional food, intimate atmosphere</p>',
    indoorOutdoor: JSON.stringify(['Indoors & Outdoors']),
    published: true,
    featured: true,
    order: 2,
  },
  {
    slug: 'darlington-estate',
    venueTitle: 'Darlington Estate',
    shortDescription: 'Historic Byron Bay estate with lush gardens and ocean views',
    expandedText: '<p>Darlington Estate combines old-world charm with modern elegance. Set on 10 acres of manicured gardens with ocean glimpses, it\'s a perfect Byron Bay wedding venue.</p>',
    listingImage: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800',
    venueAddress: 'Darlington Drive, Darlington NSW 2473',
    phoneNumber: '(02) 6687 7196',
    city: 'Byron Bay',
    cityPageUrl: 'https://flarefilms.com.au/byron-bay-wedding-videographer/',
    venueLocation: 'Byron Bay Hinterland',
    weddingTypes: JSON.stringify(['Ceremony', 'Reception']),
    price: '$$',
    pricePerHead: '<p>From $195 per person for premium packages</p>',
    rating: 5,
    availableDaysAndTimes: 'Thursday to Sunday. Ceremonies from 3:30pm, receptions from 6:30pm',
    venueContact: 'info@darlingtonestate.com.au',
    websiteUrl: 'https://darlingtonestate.com.au',
    isParkingOnSite: '<p>Yes, extensive on-site parking available</p>',
    canHaveCeremony: 'Yes, multiple garden ceremony locations',
    canHaveReception: 'Yes, elegant pavilion and garden areas',
    wetWeatherOption: 'Yes, covered pavilion and indoor spaces',
    marqueeRequired: 'No',
    inHouseCatering: 'Yes',
    thirdPartyCatering: 'Yes',
    cateringOptions: '<p>Choose from our in-house catering or approved external caterers. Menus range from casual to fine dining.</p>',
    covidInfo: '<p>COVID-safe venue with outdoor spaces and flexible arrangements.</p>',
    howToGetMostOut: '<p>Explore all the photo opportunities across the 10-acre estate. The gardens provide endless beautiful backdrops.</p>',
    weddingCost: '<p>Wedding packages from $18,000 for 100 guests including venue, catering, and basic styling.</p>',
    themeStyle: 'Garden wedding, bohemian, elegant, Byron Bay style',
    address: 'Darlington Drive, Darlington NSW 2473',
    accommodationOptions: '<p>On-site cottage for bridal party. Plenty of accommodation options in nearby Byron Bay.</p>',
    customCallToAction: 'Schedule your venue tour',
    timeRestriction: '00:00',
    musicEndBy: '23:00',
    ceremonyGuests: 'Up to 150',
    receptionGuests: 'Up to 150',
    html: '<p>Where Byron Bay charm meets elegant celebrations</p>',
    indoorOutdoor: JSON.stringify(['Outdoors', 'Indoors & Outdoors']),
    published: true,
    featured: false,
    order: 3,
  },
  {
    slug: 'gabbinbar-homestead',
    venueTitle: 'Gabbinbar Homestead',
    shortDescription: 'Historic Toowoomba homestead with stunning gardens',
    expandedText: '<p>Gabbinbar Homestead is a beautifully restored 1907 Queenslander homestead set on 30 acres of English-style gardens. A classic country wedding venue.</p>',
    listingImage: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800',
    venueAddress: '148 Gabbinbar Road, Gabbinbar QLD 4352',
    phoneNumber: '(07) 4636 9988',
    city: 'Toowoomba',
    cityPageUrl: 'https://flarefilms.com.au/toowoomba-wedding-videographer/',
    venueLocation: 'Toowoomba',
    weddingTypes: JSON.stringify(['Ceremony', 'Reception', 'Accomodation']),
    price: '$',
    pricePerHead: '<p>From $145 per person for reception packages</p>',
    rating: 4,
    availableDaysAndTimes: 'Available 7 days. Ceremonies from 1pm, receptions from 5pm',
    venueContact: 'weddings@gabbinbar.com.au',
    websiteUrl: 'https://gabbinbar.com.au',
    isParkingOnSite: '<p>Yes, plenty of parking available on the property</p>',
    canHaveCeremony: 'Yes, beautiful garden ceremony locations',
    canHaveReception: 'Yes, multiple reception spaces available',
    wetWeatherOption: 'Yes, covered verandahs and indoor spaces',
    marqueeRequired: 'No',
    inHouseCatering: 'Yes',
    thirdPartyCatering: 'No',
    cateringOptions: '<p>Professional in-house catering with customizable menus featuring local and seasonal produce.</p>',
    covidInfo: '<p>Spacious outdoor areas and flexible arrangements for safe celebrations.</p>',
    howToGetMostOut: '<p>Take advantage of the extensive gardens for your photography. The historic homestead provides beautiful character for photos.</p>',
    weddingCost: '<p>Complete wedding packages from $12,000 for 80 guests.</p>',
    themeStyle: 'Classic, vintage, country garden, heritage',
    address: '148 Gabbinbar Road, Gabbinbar QLD 4352',
    accommodationOptions: '<p>Exclusive use accommodation in the homestead for bridal party. Additional accommodation in Toowoomba.</p>',
    customCallToAction: 'Visit our historic homestead',
    timeRestriction: '00:00',
    musicEndBy: '00:00',
    ceremonyGuests: 'Up to 120',
    receptionGuests: 'Up to 120',
    html: '<p>Historic elegance in the heart of Toowoomba</p>',
    indoorOutdoor: JSON.stringify(['Outdoors', 'Indoors & Outdoors']),
    published: true,
    featured: false,
    order: 4,
  },
]

async function seedVenues() {
  console.log('🌱 Starting venue seed...')

  try {
    for (const venueData of sampleVenues) {
      const venueId = createId()

      console.log(`Creating venue: ${venueData.venueTitle}...`)

      await db.insert(venues).values({
        id: venueId,
        ...venueData,
      })

      console.log(`✓ Created ${venueData.venueTitle}`)
    }

    console.log('\n✅ Venue seeding completed successfully!')
    console.log(`Created ${sampleVenues.length} venues`)

    await client.end()
    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding venues:', error)
    await client.end()
    process.exit(1)
  }
}

seedVenues()
