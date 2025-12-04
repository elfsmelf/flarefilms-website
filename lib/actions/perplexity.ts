'use server'

import { Perplexity } from '@perplexity-ai/perplexity_ai'

const client = new Perplexity({
  apiKey: process.env.PERPLEXITY_API_KEY!,
})

export interface VenueAutofillData {
  venueTitle: string
  shortDescription?: string
  expandedText?: string
  venueAddress?: string
  phoneNumber?: string
  city?: string
  websiteUrl?: string
  pricePerHead?: string
  ceremonyGuests?: string
  receptionGuests?: string
  canHaveCeremony?: string
  canHaveReception?: string
  wetWeatherOption?: string
  isParkingOnSite?: string
  inHouseCatering?: string
  thirdPartyCatering?: string
  cateringOptions?: string
  accommodationOptions?: string
  availableDaysAndTimes?: string
  timeRestriction?: string
  musicEndBy?: string
  themeStyle?: string
  weddingTypes?: string[] // ["Ceremony", "Reception", "Accomodation"]
  categories?: string[] // One or more from the category list
  indoorOutdoor?: string[] // ["Indoors", "Outdoors", "Indoors & Outdoors"]
  price?: string // "$" or "$$"
  rating?: number // 0-5
}

export async function generateVenueBlogArticle(venueName: string) {
  try {
    const completion = await client.chat.completions.create({
      model: 'sonar-pro',
      messages: [
        {
          role: 'user',
          content: `Write a comprehensive, engaging blog article about the wedding venue "${venueName}" in Queensland, Australia.

The article should be written in a warm, informative tone and cover ALL the following aspects that couples want to know:

1. Opening paragraph with a captivating description of the venue
2. Overview of the venue and its unique features
3. The venue experience - what makes it special
4. Detailed description of ceremony location options (including names and specific features)
5. Reception spaces and styling options
6. Catering and food service details
7. Facilities and amenities (parking, accommodation, wet weather options)
8. Capacity information (ceremony and reception)
9. The venue's history and heritage (if applicable)
10. Tips for getting the most out of the venue
11. Wedding videography/photography opportunities at the venue
12. Practical information (location, accessibility, nearby accommodations)

Format the article in proper HTML with:
- <h2> tags for main sections
- <h3> tags for subsections
- <p> tags for paragraphs
- <ul> and <li> for bullet points
- <ol> and <li> for numbered lists
- <strong> tags for emphasis on key features

IMPORTANT REQUIREMENTS:
- Write approximately 1500-2000 words
- Make it comprehensive, detailed, and helpful for couples planning their wedding
- Use specific details about the venue where available
- Maintain an elegant, sophisticated tone throughout
- DO NOT include any citation references like [1], [2], [3] etc. in the text
- DO NOT include any footnotes or reference numbers
- DO NOT include any specific pricing information or package costs
- Instead, encourage readers to contact the venue directly for current pricing and package details
- Return ONLY the HTML-formatted article content, no additional commentary
- Do not wrap the content in <html>, <body> or <article> tags - just the content itself`,
        },
      ],
    })

    const message = completion.choices[0]?.message
    if (!message?.content) {
      return {
        success: false,
        error: 'No response from Perplexity API',
      }
    }

    return {
      success: true,
      data: message.content,
    }
  } catch (error) {
    console.error('Error generating venue blog article:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to generate blog article',
    }
  }
}

export async function fetchVenueDataFromPerplexity(venueName: string) {
  try {
    const completion = await client.chat.completions.create({
      model: 'sonar-pro',
      messages: [
        {
          role: 'user',
          content: `Find factual information about the wedding venue "${venueName}" in Queensland, Australia. Provide comprehensive details including address, contact information, capacity, facilities, and services. Format the response as JSON with the following structure:
{
  "venueTitle": "Full venue name",
  "shortDescription": "One sentence description of the venue",
  "venueAddress": "Full street address",
  "phoneNumber": "Contact phone number",
  "city": "City name (Brisbane, Gold Coast, Byron Bay, or Toowoomba)",
  "websiteUrl": "Venue website URL",
  "weddingTypes": ["Array of applicable types: Ceremony, Reception, Accomodation"],
  "categories": ["Array of one or more applicable categories from: Affordable, Beach, Castle Palaces, Golf Club, Hotel, Intimite, Luxury, Manor Houses, Marquee, Modern, Museums, Outdoor, Restaurant, Rustic / Country / Farm, Traditional, Unique, Warehouse / Industrial, Waterview, Winery"],
  "indoorOutdoor": ["Array of applicable settings: Indoors, Outdoors, or Indoors & Outdoors"],
  "price": "Price range: $ or $$",
  "rating": "Venue rating from 0-5 (numeric)",
  "ceremonyGuests": "Number of ceremony guests capacity (just the number)",
  "receptionGuests": "Number of reception guests capacity (just the number)",
  "canHaveCeremony": "Yes or No - whether ceremonies can be held at venue",
  "canHaveReception": "Yes or No - whether receptions can be held at venue",
  "wetWeatherOption": "Description of wet weather options",
  "isParkingOnSite": "Parking details in HTML format with <p> tags",
  "inHouseCatering": "Yes or No",
  "thirdPartyCatering": "Yes or No",
  "cateringOptions": "Description of catering options in HTML format with <p> tags",
  "accommodationOptions": "Description of accommodation options in HTML format with <p> tags",
  "availableDaysAndTimes": "Description of when venue is available",
  "timeRestriction": "Time restriction in 24hr format (e.g., 23:00)",
  "musicEndBy": "Time music must end by in 24hr format (e.g., 23:00)",
  "themeStyle": "What wedding theme or style suits this venue best"
}

IMPORTANT REQUIREMENTS:
- Only include fields where you have factual information
- Do not make up or assume information
- If information is not available, omit that field
- DO NOT include any specific pricing information per head or detailed package costs
- DO NOT include any citation references like [1], [2], [3] etc. in any text fields
- DO NOT include any footnotes or reference numbers`,
        },
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'venue_information',
          strict: true,
          schema: {
            type: 'object',
            properties: {
              venueTitle: { type: 'string' },
              shortDescription: { type: 'string' },
              venueAddress: { type: 'string' },
              phoneNumber: { type: 'string' },
              city: { type: 'string' },
              websiteUrl: { type: 'string' },
              weddingTypes: {
                type: 'array',
                items: { type: 'string' },
              },
              categories: {
                type: 'array',
                items: { type: 'string' },
              },
              indoorOutdoor: {
                type: 'array',
                items: { type: 'string' },
              },
              price: { type: 'string' },
              rating: { type: 'number' },
              ceremonyGuests: { type: 'string' },
              receptionGuests: { type: 'string' },
              canHaveCeremony: { type: 'string' },
              canHaveReception: { type: 'string' },
              wetWeatherOption: { type: 'string' },
              isParkingOnSite: { type: 'string' },
              inHouseCatering: { type: 'string' },
              thirdPartyCatering: { type: 'string' },
              cateringOptions: { type: 'string' },
              accommodationOptions: { type: 'string' },
              availableDaysAndTimes: { type: 'string' },
              timeRestriction: { type: 'string' },
              musicEndBy: { type: 'string' },
              themeStyle: { type: 'string' },
            },
            required: ['venueTitle'],
            additionalProperties: false,
          },
        },
      },
    })

    const message = completion.choices[0]?.message
    if (!message?.content) {
      return {
        success: false,
        error: 'No response from Perplexity API',
      }
    }

    const venueData: VenueAutofillData = JSON.parse(message.content)

    return {
      success: true,
      data: venueData,
    }
  } catch (error) {
    console.error('Error fetching venue data from Perplexity:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch venue data',
    }
  }
}
