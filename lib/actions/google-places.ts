'use server'

import { uploadImageFromUrl } from './upload'

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY || 'AIzaSyBwsxISYBiEqMk4FpEOlCnnp4hRiHzMBkk'

interface PlacePhoto {
  name: string
  widthPx: number
  heightPx: number
}

interface PlaceSearchResult {
  places: Array<{
    id: string
    displayName: {
      text: string
    }
    photos?: PlacePhoto[]
  }>
}

interface PlaceDetailsResult {
  id: string
  displayName: {
    text: string
  }
  photos?: PlacePhoto[]
}

export async function fetchVenueImagesFromGooglePlaces(venueName: string, city?: string) {
  try {
    // Step 1: Search for the venue to get place_id
    const searchQuery = city ? `${venueName}, ${city}, Queensland, Australia` : `${venueName}, Queensland, Australia`

    const searchResponse = await fetch('https://places.googleapis.com/v1/places:searchText', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': GOOGLE_PLACES_API_KEY,
        'X-Goog-FieldMask': 'places.id,places.displayName,places.photos',
      },
      body: JSON.stringify({
        textQuery: searchQuery,
        maxResultCount: 1,
      }),
    })

    if (!searchResponse.ok) {
      const errorText = await searchResponse.text()
      console.error('Google Places search error:', errorText)
      return {
        success: false,
        error: `Failed to search for venue: ${searchResponse.status} ${searchResponse.statusText}`,
      }
    }

    const searchData: PlaceSearchResult = await searchResponse.json()

    if (!searchData.places || searchData.places.length === 0) {
      return {
        success: false,
        error: 'Venue not found in Google Places',
      }
    }

    const place = searchData.places[0]

    if (!place.photos || place.photos.length === 0) {
      return {
        success: false,
        error: 'No photos found for this venue',
      }
    }

    // Step 2: Get photo URLs and upload to R2 (take up to 20 photos)
    const photoPromises = place.photos.slice(0, 20).map(async (photo, index) => {
      try {
        // Extract the photo name (format: places/PLACE_ID/photos/PHOTO_ID)
        const photoMediaUrl = `https://places.googleapis.com/v1/${photo.name}/media?maxWidthPx=1600&maxHeightPx=1200&key=${GOOGLE_PLACES_API_KEY}`

        // The API returns a redirect to the actual image
        // We'll fetch it to get the image data
        const photoResponse = await fetch(photoMediaUrl, {
          method: 'GET',
          redirect: 'follow',
        })

        if (!photoResponse.ok) {
          console.error('Failed to fetch photo:', photoResponse.status)
          return null
        }

        // Get the image as a buffer
        const imageBuffer = await photoResponse.arrayBuffer()
        const buffer = Buffer.from(imageBuffer)

        // Convert to base64 for upload
        const base64Image = `data:image/jpeg;base64,${buffer.toString('base64')}`

        // Upload to R2
        const uploadResult = await uploadImageFromUrl(base64Image, 'venues/gallery')

        if (uploadResult.success && uploadResult.url) {
          return uploadResult.url
        }

        console.error('Failed to upload photo:', uploadResult.error)
        return null
      } catch (error) {
        console.error('Error processing photo:', error)
        return null
      }
    })

    const uploadedUrls = await Promise.all(photoPromises)
    const validUploadedUrls = uploadedUrls.filter((url): url is string => url !== null)

    if (validUploadedUrls.length === 0) {
      return {
        success: false,
        error: 'Failed to fetch and upload photos',
      }
    }

    return {
      success: true,
      data: {
        photos: validUploadedUrls,
        venueName: place.displayName.text,
        placeId: place.id,
      },
    }
  } catch (error) {
    console.error('Error fetching venue images from Google Places:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch venue images',
    }
  }
}
