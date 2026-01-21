'use server'

import { marked } from 'marked'

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
  weddingTypes?: string[]
  categories?: string[]
  indoorOutdoor?: string[]
  price?: string
  rating?: number
}

const PERPLEXITY_API_URL = 'https://api.perplexity.ai/chat/completions'

async function callPerplexity(prompt: string): Promise<string | null> {
  const apiKey = process.env.PERPLEXITY_API_KEY

  if (!apiKey) {
    throw new Error('PERPLEXITY_API_KEY is not configured')
  }

  const response = await fetch(PERPLEXITY_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'sonar-pro',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.2,
      max_tokens: 4000,
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Perplexity API error: ${response.status} - ${errorText}`)
  }

  const data = await response.json()
  return data.choices?.[0]?.message?.content || null
}

export async function generateVenueBlogArticle(venueName: string): Promise<{
  success: boolean
  data?: string
  error?: string
}> {
  try {
    const prompt = `Research "${venueName}" wedding venue in Queensland, Australia and write a detailed informational guide about it.

Structure the information covering:
1. Overview and history of the venue
2. Key features and amenities available
3. Ceremony and reception spaces (capacity, layout, settings)
4. Catering arrangements and options
5. On-site accommodation (if available)
6. Unique characteristics of the venue
7. Practical considerations for couples (parking, accessibility, etc.)

Use Markdown formatting with:
- ## for section headings
- Regular paragraphs
- Bullet lists where appropriate
- **bold** for key details

Focus on factual, helpful information that would assist couples researching this venue.`

    const content = await callPerplexity(prompt)

    if (!content) {
      return {
        success: false,
        error: 'No content generated',
      }
    }

    // Clean up the response - remove any code blocks and citation references
    let cleanContent = content
      .replace(/```markdown\n?/g, '')
      .replace(/```\n?/g, '')
      .replace(/\[\d+\]/g, '') // Remove citation references like [1], [2], etc.
      .replace(/---+/g, '') // Remove horizontal rules
      .trim()

    // Convert Markdown to HTML
    const htmlContent = await marked(cleanContent)

    return {
      success: true,
      data: htmlContent,
    }
  } catch (error) {
    console.error('Error generating venue blog article:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to generate article',
    }
  }
}

export async function fetchVenueDataFromPerplexity(venueName: string): Promise<{
  success: boolean
  data?: VenueAutofillData
  error?: string
}> {
  try {
    const prompt = `Research the wedding venue "${venueName}" in Queensland, Australia and provide detailed information.

Return the data as a valid JSON object with these fields (use null for unknown values):
{
  "venueTitle": "Official venue name",
  "shortDescription": "A 1-2 sentence description of the venue (max 200 characters)",
  "venueAddress": "Full street address",
  "phoneNumber": "Phone number",
  "city": "City/suburb name only (e.g., Brisbane, Gold Coast, Sunshine Coast, Maleny, Toowoomba)",
  "websiteUrl": "Official website URL",
  "ceremonyGuests": "Maximum ceremony guest capacity as a number string",
  "receptionGuests": "Maximum reception guest capacity as a number string",
  "canHaveCeremony": "Yes or No",
  "canHaveReception": "Yes or No",
  "wetWeatherOption": "Yes or No - does venue have wet weather backup",
  "isParkingOnSite": "Yes or No",
  "inHouseCatering": "Yes or No",
  "thirdPartyCatering": "Yes or No - can bring external caterers",
  "accommodationOptions": "Description of on-site accommodation if available",
  "themeStyle": "Description of venue style/aesthetic",
  "weddingTypes": ["Choose from ONLY these exact values: Ceremony, Reception, Accomodation - include all that apply"],
  "categories": ["Choose from ONLY these exact values: Affordable, Beach, Castle Palaces, Golf Club, Hotel, Intimite, Luxury, Manor Houses, Marquee, Modern, Museums, Outdoor, Restaurant, Rustic / Country / Farm, Traditional, Unique, Warehouse / Industrial, Waterview, Winery - include all that apply to this venue"],
  "indoorOutdoor": ["Choose from ONLY these exact values: Indoors, Outdoors, Indoors & Outdoors - include all that apply"],
  "price": "Choose from ONLY these values: $ or $$ ($ for budget-friendly, $$ for premium)",
  "rating": 4.5
}

IMPORTANT: Return ONLY the JSON object, no other text or explanation. Make sure it's valid JSON.`

    const content = await callPerplexity(prompt)

    if (!content) {
      return {
        success: false,
        error: 'No data returned from API',
      }
    }

    // Try to extract JSON from the response
    let jsonContent = content.trim()

    // Remove markdown code blocks if present
    jsonContent = jsonContent
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim()

    // Try to find JSON object in the response
    const jsonMatch = jsonContent.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      jsonContent = jsonMatch[0]
    }

    const data = JSON.parse(jsonContent) as VenueAutofillData

    return {
      success: true,
      data,
    }
  } catch (error) {
    console.error('Error fetching venue data from Perplexity:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch venue data',
    }
  }
}
