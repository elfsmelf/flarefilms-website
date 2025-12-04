'use server'

// Note: Perplexity AI integration is disabled until a valid SDK is available
// The functions below return placeholder responses

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

export async function generateVenueBlogArticle(venueName: string): Promise<{
  success: boolean
  data?: string
  error?: string
}> {
  // Perplexity AI integration is not configured
  return {
    success: false,
    error: 'AI content generation is not configured. Please add venue content manually.',
  }
}

export async function fetchVenueDataFromPerplexity(venueName: string): Promise<{
  success: boolean
  data?: VenueAutofillData
  error?: string
}> {
  // Perplexity AI integration is not configured
  return {
    success: false,
    error: 'AI autofill is not configured. Please enter venue details manually.',
  }
}
