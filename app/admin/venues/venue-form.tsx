'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ImageUpload } from '@/components/admin/image-upload'
import { MultiImageUpload } from '@/components/admin/multi-image-upload'
import { RichTextEditor } from '@/components/admin/rich-text-editor'
import { createVenue, updateVenue } from '@/lib/actions/venues'
import type { VenueFormData, VenueGalleryImageFormData } from '@/lib/actions/venues'
import { fetchVenueDataFromPerplexity, generateVenueBlogArticle } from '@/lib/actions/perplexity'
import { fetchVenueImagesFromGooglePlaces } from '@/lib/actions/google-places'
import { Loader2, Sparkles, Images } from 'lucide-react'

interface VenueFormProps {
  venue?: {
    id: string
    slug: string
    venueTitle: string
    shortDescription: string | null
    expandedText: string | null
    listingImage: string | null
    venueAddress: string | null
    phoneNumber: string | null
    city: string | null
    cityPageUrl: string | null
    venueLocation: string | null
    weddingTypes: string | null
    categories: string | null
    price: string | null
    pricePerHead: string | null
    rating: number | null
    availableDaysAndTimes: string | null
    venueContact: string | null
    websiteUrl: string | null
    isParkingOnSite: string | null
    canHaveCeremony: string | null
    canHaveReception: string | null
    wetWeatherOption: string | null
    marqueeRequired: string | null
    inHouseCatering: string | null
    thirdPartyCatering: string | null
    cateringOptions: string | null
    covidInfo: string | null
    howToGetMostOut: string | null
    weddingCost: string | null
    themeStyle: string | null
    address: string | null
    accommodationOptions: string | null
    customCallToAction: string | null
    timeRestriction: string | null
    musicEndBy: string | null
    ceremonyGuests: string | null
    receptionGuests: string | null
    html: string | null
    indoorOutdoor: string | null
    published: boolean
    featured: boolean
    order: number
    gallery: Array<{
      id: string
      url: string
      alt: string
    }>
    weddingFilms: Array<{
      film: {
        id: string
        title: string
      }
    }>
    similarVenues: Array<{
      id: string
    }>
  }
  allFilms?: Array<{
    id: string
    title: string
  }>
  allVenues?: Array<{
    id: string
    venueTitle: string
  }>
}

const cityOptions = [
  { value: 'Brisbane', label: 'Brisbane' },
  { value: 'Gold Coast', label: 'Gold Coast' },
  { value: 'Sunshine Coast', label: 'Sunshine Coast' },
  { value: 'Byron Bay', label: 'Byron Bay' },
  { value: 'Toowoomba', label: 'Toowoomba' },
]

const cityPageUrlOptions = [
  { value: 'https://flarefilms.com.au/brisbane-wedding-videographer/', label: 'Brisbane' },
  { value: 'https://flarefilms.com.au/gold-coast-wedding-videographer/', label: 'Gold Coast' },
  { value: 'https://flarefilms.com.au/byron-bay-wedding-videographer/', label: 'Byron Bay' },
  { value: 'https://flarefilms.com.au/toowoomba-wedding-videographer/', label: 'Toowoomba' },
  { value: 'https://flarefilms.com.au/moreton-bay-wedding-videographer/', label: 'Moreton Bay' },
  { value: 'https://flarefilms.com.au/noosa-wedding-videographer/', label: 'Noosa' },
  { value: 'https://flarefilms.com.au/sunshine-coast-wedding-videographer/', label: 'Sunshine Coast' },
]

const weddingTypeOptions = [
  { value: 'Ceremony', label: 'Ceremony' },
  { value: 'Reception', label: 'Reception' },
  { value: 'Accomodation', label: 'Accomodation' },
]

const categoryOptions = [
  { value: 'Affordable', label: 'Affordable' },
  { value: 'Beach', label: 'Beach' },
  { value: 'Castle Palaces', label: 'Castle Palaces' },
  { value: 'Golf Club', label: 'Golf Club' },
  { value: 'Hotel', label: 'Hotel' },
  { value: 'Intimite', label: 'Intimite' },
  { value: 'Luxury', label: 'Luxury' },
  { value: 'Manor Houses', label: 'Manor Houses' },
  { value: 'Marquee', label: 'Marquee' },
  { value: 'Modern', label: 'Modern' },
  { value: 'Museums', label: 'Museums' },
  { value: 'Outdoor', label: 'Outdoor' },
  { value: 'Restaurant', label: 'Restaurant' },
  { value: 'Rustic / Country / Farm', label: 'Rustic / Country / Farm' },
  { value: 'Traditional', label: 'Traditional' },
  { value: 'Unique', label: 'Unique' },
  { value: 'Warehouse / Industrial', label: 'Warehouse / Industrial' },
  { value: 'Waterview', label: 'Waterview' },
  { value: 'Winery', label: 'Winery' },
]

const priceOptions = [
  { value: '$', label: '$' },
  { value: '$$', label: '$$' },
]

const yesNoOptions = [
  { value: 'Yes', label: 'Yes' },
  { value: 'No', label: 'No' },
]

const indoorOutdoorOptions = [
  { value: 'Indoors', label: 'Indoors' },
  { value: 'Outdoors', label: 'Outdoors' },
  { value: 'Indoors & Outdoors', label: 'Indoors & Outdoors' },
]

export function VenueForm({ venue, allFilms = [], allVenues = [] }: VenueFormProps) {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [autofilling, setAutofilling] = useState(false)
  const [fetchingMedia, setFetchingMedia] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Basic venue data
  const [slug, setSlug] = useState(venue?.slug || '')
  const [venueTitle, setVenueTitle] = useState(venue?.venueTitle || '')
  const [shortDescription, setShortDescription] = useState(venue?.shortDescription || '')
  const [expandedText, setExpandedText] = useState(venue?.expandedText || '')
  const [listingImage, setListingImage] = useState(venue?.listingImage || '')
  const [venueAddress, setVenueAddress] = useState(venue?.venueAddress || '')
  const [phoneNumber, setPhoneNumber] = useState(venue?.phoneNumber || '')
  const [city, setCity] = useState(venue?.city || '')
  const [cityPageUrl, setCityPageUrl] = useState(venue?.cityPageUrl || '')
  const [venueLocation, setVenueLocation] = useState(venue?.venueLocation || '')

  // Wedding types (stored as JSON array string)
  const [weddingTypes, setWeddingTypes] = useState<string[]>(
    venue?.weddingTypes ? JSON.parse(venue.weddingTypes) : []
  )

  // Categories (stored as JSON array string)
  const [categories, setCategories] = useState<string[]>(
    venue?.categories ? JSON.parse(venue.categories) : []
  )

  const [price, setPrice] = useState(venue?.price || '')
  const [pricePerHead, setPricePerHead] = useState(venue?.pricePerHead || '')
  const [rating, setRating] = useState(venue?.rating || 0)
  const [availableDaysAndTimes, setAvailableDaysAndTimes] = useState(venue?.availableDaysAndTimes || '')
  const [venueContact, setVenueContact] = useState(venue?.venueContact || '')
  const [websiteUrl, setWebsiteUrl] = useState(venue?.websiteUrl || '')
  const [isParkingOnSite, setIsParkingOnSite] = useState(venue?.isParkingOnSite || '')
  const [canHaveCeremony, setCanHaveCeremony] = useState(venue?.canHaveCeremony || '')
  const [canHaveReception, setCanHaveReception] = useState(venue?.canHaveReception || '')
  const [wetWeatherOption, setWetWeatherOption] = useState(venue?.wetWeatherOption || '')
  const [marqueeRequired, setMarqueeRequired] = useState(venue?.marqueeRequired || '')
  const [inHouseCatering, setInHouseCatering] = useState(venue?.inHouseCatering || '')
  const [thirdPartyCatering, setThirdPartyCatering] = useState(venue?.thirdPartyCatering || '')
  const [cateringOptions, setCateringOptions] = useState(venue?.cateringOptions || '')
  const [covidInfo, setCovidInfo] = useState(venue?.covidInfo || '')
  const [howToGetMostOut, setHowToGetMostOut] = useState(venue?.howToGetMostOut || '')
  const [weddingCost, setWeddingCost] = useState(venue?.weddingCost || '')
  const [themeStyle, setThemeStyle] = useState(venue?.themeStyle || '')
  const [address, setAddress] = useState(venue?.address || '')
  const [accommodationOptions, setAccommodationOptions] = useState(venue?.accommodationOptions || '')
  const [customCallToAction, setCustomCallToAction] = useState(venue?.customCallToAction || '')
  const [timeRestriction, setTimeRestriction] = useState(venue?.timeRestriction || '')
  const [musicEndBy, setMusicEndBy] = useState(venue?.musicEndBy || '')
  const [ceremonyGuests, setCeremonyGuests] = useState(venue?.ceremonyGuests || '')
  const [receptionGuests, setReceptionGuests] = useState(venue?.receptionGuests || '')
  const [html, setHtml] = useState(venue?.html || '')

  // Indoor/Outdoor (stored as JSON array string)
  const [indoorOutdoor, setIndoorOutdoor] = useState<string[]>(
    venue?.indoorOutdoor ? JSON.parse(venue.indoorOutdoor) : []
  )

  const [published, setPublished] = useState(venue?.published || false)
  const [featured, setFeatured] = useState(venue?.featured || false)
  const [order, setOrder] = useState(venue?.order || 0)

  // Gallery images
  const [galleryImages, setGalleryImages] = useState<
    Array<{ url: string; key: string; preview: string }>
  >(
    venue?.gallery.map((g) => ({
      url: g.url,
      key: g.url,
      preview: g.url,
    })) || []
  )

  // Wedding films
  const [selectedFilmIds, setSelectedFilmIds] = useState<string[]>(
    venue?.weddingFilms.map((wf) => wf.film.id) || []
  )

  // Similar venues
  const [selectedVenueIds, setSelectedVenueIds] = useState<string[]>(
    venue?.similarVenues.map((sv) => sv.id) || []
  )

  // Auto-generate slug from title
  const handleTitleChange = (value: string) => {
    setVenueTitle(value)
    if (!venue) {
      const generatedSlug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
      setSlug(generatedSlug)
    }
  }

  // Toggle checkbox
  const toggleCheckbox = (value: string, currentValues: string[], setter: (values: string[]) => void) => {
    if (currentValues.includes(value)) {
      setter(currentValues.filter((v) => v !== value))
    } else {
      setter([...currentValues, value])
    }
  }

  // Handle autofill from Perplexity API
  const handleAutofill = async () => {
    if (!venueTitle) {
      setError('Please enter a venue title first')
      return
    }

    setError(null)
    setSuccess(null)
    setAutofilling(true)

    try {
      // Call both APIs in parallel for better performance
      const [venueDataResult, blogArticleResult] = await Promise.all([
        fetchVenueDataFromPerplexity(venueTitle),
        generateVenueBlogArticle(venueTitle),
      ])

      let hasData = false

      // Fill in structured venue data
      if (venueDataResult.success && venueDataResult.data) {
        const data = venueDataResult.data
        hasData = true

        // Fill in all available fields
        if (data.venueTitle) setVenueTitle(data.venueTitle)
        if (data.shortDescription) setShortDescription(data.shortDescription)
        if (data.venueAddress) setVenueAddress(data.venueAddress)
        if (data.phoneNumber) setPhoneNumber(data.phoneNumber)
        if (data.city) setCity(data.city)
        if (data.websiteUrl) setWebsiteUrl(data.websiteUrl)

        // Checkbox fields
        if (data.weddingTypes && Array.isArray(data.weddingTypes)) {
          setWeddingTypes(data.weddingTypes)
        }
        if (data.categories && Array.isArray(data.categories)) {
          setCategories(data.categories)
        }
        if (data.indoorOutdoor && Array.isArray(data.indoorOutdoor)) {
          setIndoorOutdoor(data.indoorOutdoor)
        }

        // Price and rating
        if (data.price) setPrice(data.price)
        if (data.rating !== undefined) setRating(data.rating)

        if (data.ceremonyGuests) setCeremonyGuests(data.ceremonyGuests)
        if (data.receptionGuests) setReceptionGuests(data.receptionGuests)
        if (data.canHaveCeremony) setCanHaveCeremony(data.canHaveCeremony)
        if (data.canHaveReception) setCanHaveReception(data.canHaveReception)
        if (data.wetWeatherOption) setWetWeatherOption(data.wetWeatherOption)
        if (data.isParkingOnSite) setIsParkingOnSite(data.isParkingOnSite)
        if (data.inHouseCatering) setInHouseCatering(data.inHouseCatering)
        if (data.thirdPartyCatering) setThirdPartyCatering(data.thirdPartyCatering)
        if (data.cateringOptions) setCateringOptions(data.cateringOptions)
        if (data.accommodationOptions) setAccommodationOptions(data.accommodationOptions)
        if (data.availableDaysAndTimes) setAvailableDaysAndTimes(data.availableDaysAndTimes)
        if (data.timeRestriction) setTimeRestriction(data.timeRestriction)
        if (data.musicEndBy) setMusicEndBy(data.musicEndBy)
        if (data.themeStyle) setThemeStyle(data.themeStyle)

        // Update slug if creating new venue
        if (!venue && data.venueTitle) {
          const generatedSlug = data.venueTitle
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '')
          setSlug(generatedSlug)
        }
      }

      // Fill in comprehensive blog article for Expanded Text (already in HTML format)
      if (blogArticleResult.success && blogArticleResult.data) {
        hasData = true
        setExpandedText(blogArticleResult.data)
      }

      if (hasData) {
        setSuccess('Venue details and article autofilled successfully! Please review and update as needed.')
      } else {
        setError('Failed to fetch venue data. Please try again.')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching venue data')
    } finally {
      setAutofilling(false)
    }
  }

  // Handle fetching media from Google Places
  const handleGetMedia = async () => {
    if (!venueTitle) {
      setError('Please enter a venue title first')
      return
    }

    setError(null)
    setSuccess(null)
    setFetchingMedia(true)

    try {
      const result = await fetchVenueImagesFromGooglePlaces(venueTitle, city || undefined)

      if (result.success && result.data) {
        // Add the fetched photos to the gallery
        const newImages = result.data.photos.map((url, index) => ({
          url,
          key: `google-places-${Date.now()}-${index}`,
          preview: url,
        }))

        setGalleryImages([...galleryImages, ...newImages])

        // If no listing image is set, use the first photo
        if (!listingImage && newImages.length > 0) {
          setListingImage(newImages[0].url)
        }

        setSuccess(`Successfully fetched and uploaded ${result.data.photos.length} images from Google Places!`)
      } else {
        setError(result.error || 'Failed to fetch venue images')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching venue images')
    } finally {
      setFetchingMedia(false)
    }
  }

  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)

    try {
      // Validate
      if (!slug || !venueTitle) {
        setError('Please fill in required fields (Venue Title)')
        setSubmitting(false)
        return
      }

      // Prepare data
      const venueData: VenueFormData = {
        slug,
        venueTitle,
        shortDescription: shortDescription || undefined,
        expandedText: expandedText || undefined,
        listingImage: listingImage || undefined,
        venueAddress: venueAddress || undefined,
        phoneNumber: phoneNumber || undefined,
        city: city || undefined,
        cityPageUrl: cityPageUrl || undefined,
        venueLocation: venueLocation || undefined,
        weddingTypes: weddingTypes.length > 0 ? JSON.stringify(weddingTypes) : undefined,
        categories: categories.length > 0 ? JSON.stringify(categories) : undefined,
        price: price || undefined,
        pricePerHead: pricePerHead || undefined,
        rating: rating || undefined,
        availableDaysAndTimes: availableDaysAndTimes || undefined,
        venueContact: venueContact || undefined,
        websiteUrl: websiteUrl || undefined,
        isParkingOnSite: isParkingOnSite || undefined,
        canHaveCeremony: canHaveCeremony || undefined,
        canHaveReception: canHaveReception || undefined,
        wetWeatherOption: wetWeatherOption || undefined,
        marqueeRequired: marqueeRequired || undefined,
        inHouseCatering: inHouseCatering || undefined,
        thirdPartyCatering: thirdPartyCatering || undefined,
        cateringOptions: cateringOptions || undefined,
        covidInfo: covidInfo || undefined,
        howToGetMostOut: howToGetMostOut || undefined,
        weddingCost: weddingCost || undefined,
        themeStyle: themeStyle || undefined,
        address: address || undefined,
        accommodationOptions: accommodationOptions || undefined,
        customCallToAction: customCallToAction || undefined,
        timeRestriction: timeRestriction || undefined,
        musicEndBy: musicEndBy || undefined,
        ceremonyGuests: ceremonyGuests || undefined,
        receptionGuests: receptionGuests || undefined,
        html: html || undefined,
        indoorOutdoor: indoorOutdoor.length > 0 ? JSON.stringify(indoorOutdoor) : undefined,
        published,
        featured,
        order,
      }

      const galleryData: VenueGalleryImageFormData[] = galleryImages.map((g, idx) => ({
        url: g.url,
        alt: `${venueTitle} - Image ${idx + 1}`,
      }))

      // Submit
      const result = venue
        ? await updateVenue(venue.id, venueData, galleryData, selectedFilmIds, selectedVenueIds)
        : await createVenue(venueData, galleryData, selectedFilmIds, selectedVenueIds)

      if (result.success) {
        router.push('/admin/venues')
        router.refresh()
      } else {
        setError(result.error || 'Failed to save venue')
        setSubmitting(false)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded">
          {success}
        </div>
      )}

      {/* Basic Information */}
      <div className="bg-white p-8 shadow-sm">
        <h2 className="font-cormorant text-2xl text-[#5a534b] mb-6">Basic Information</h2>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-sans uppercase tracking-wider text-[#7B756C] mb-2">
              Venue Title *
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={venueTitle}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="flex-1 px-4 py-3 border border-[#d4cfca] focus:border-[#b8a862] focus:outline-none transition-colors font-serif text-[#5a534b]"
                required
                disabled={submitting || autofilling}
              />
              <button
                type="button"
                onClick={handleAutofill}
                disabled={!venueTitle || autofilling || submitting}
                className="bg-[#b8a862] px-6 py-3 text-sm font-sans uppercase tracking-[0.15em] text-white hover:bg-[#a89752] transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2 whitespace-nowrap"
                title="Autofill venue details using AI"
              >
                {autofilling ? (
                  <>
                    <Loader2 className="animate-spin" size={16} />
                    Autofilling...
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    Autofill
                  </>
                )}
              </button>
            </div>
            <p className="mt-1 text-xs text-[#9B9589]">
              Enter a venue name and click Autofill to fetch details automatically
            </p>
          </div>

          <div>
            <label className="block text-sm font-sans uppercase tracking-wider text-[#7B756C] mb-2">
              Slug *
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full px-4 py-3 border border-[#d4cfca] focus:border-[#b8a862] focus:outline-none transition-colors font-mono text-sm text-[#5a534b]"
              required
              disabled={submitting || autofilling}
              pattern="[a-z0-9-]+"
              title="Only lowercase letters, numbers, and hyphens"
            />
            <p className="mt-1 text-xs text-[#9B9589]">
              URL: /venues/{slug || 'your-venue-slug'}
            </p>
          </div>

          <div>
            <label className="block text-sm font-sans uppercase tracking-wider text-[#7B756C] mb-2">
              Short Description
            </label>
            <input
              type="text"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              className="w-full px-4 py-3 border border-[#d4cfca] focus:border-[#b8a862] focus:outline-none transition-colors font-sans text-[#5a534b]"
              disabled={submitting || autofilling}
            />
          </div>

          <div>
            <label className="block text-sm font-sans uppercase tracking-wider text-[#7B756C] mb-2">
              Expanded Text
            </label>
            <RichTextEditor
              content={expandedText}
              onChange={setExpandedText}
              disabled={submitting || autofilling}
              placeholder="Detailed venue description..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-sans uppercase tracking-wider text-[#7B756C] mb-2">
                Order
              </label>
              <input
                type="number"
                value={order}
                onChange={(e) => setOrder(parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-[#d4cfca] focus:border-[#b8a862] focus:outline-none transition-colors font-sans text-[#5a534b]"
                disabled={submitting}
              />
            </div>

            <div className="flex items-end">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="w-5 h-5 text-[#b8a862] border-[#d4cfca] rounded focus:ring-[#b8a862]"
                  disabled={submitting}
                />
                <span className="text-sm font-sans text-[#7B756C]">Published</span>
              </label>
            </div>

            <div className="flex items-end">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-5 h-5 text-[#b8a862] border-[#d4cfca] rounded focus:ring-[#b8a862]"
                  disabled={submitting}
                />
                <span className="text-sm font-sans text-[#7B756C]">Featured</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Media */}
      <div className="bg-white p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-cormorant text-2xl text-[#5a534b]">Media</h2>
          <button
            type="button"
            onClick={handleGetMedia}
            disabled={!venueTitle || fetchingMedia || autofilling || submitting}
            className="bg-[#5a534b] px-6 py-3 text-sm font-sans uppercase tracking-[0.15em] text-white hover:bg-[#7B756C] transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2 whitespace-nowrap"
            title="Fetch venue images from Google Places"
          >
            {fetchingMedia ? (
              <>
                <Loader2 className="animate-spin" size={16} />
                Fetching...
              </>
            ) : (
              <>
                <Images size={16} />
                Get Media
              </>
            )}
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-sans uppercase tracking-wider text-[#7B756C] mb-2">
              Listing Image
            </label>
            <ImageUpload
              folder="venues/listings"
              currentImage={listingImage}
              onUploadComplete={(url) => setListingImage(url)}
              onUploadError={(err) => setError(err)}
            />
          </div>

          <div>
            <label className="block text-sm font-sans uppercase tracking-wider text-[#7B756C] mb-2">
              Venue Gallery
            </label>
            <MultiImageUpload
              folder="venues/gallery"
              existingImages={galleryImages}
              onImagesChange={setGalleryImages}
              maxImages={30}
            />
          </div>
        </div>
      </div>

      {/* Location & Contact */}
      <div className="bg-white p-8 shadow-sm">
        <h2 className="font-cormorant text-2xl text-[#5a534b] mb-6">Location & Contact</h2>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-sans uppercase tracking-wider text-[#7B756C] mb-2">
                City
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-3 border border-[#d4cfca] focus:border-[#b8a862] focus:outline-none transition-colors font-sans text-[#5a534b]"
                disabled={submitting}
              >
                <option value="">Select a city</option>
                {cityOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-sans uppercase tracking-wider text-[#7B756C] mb-2">
                City Page URL
              </label>
              <select
                value={cityPageUrl}
                onChange={(e) => setCityPageUrl(e.target.value)}
                className="w-full px-4 py-3 border border-[#d4cfca] focus:border-[#b8a862] focus:outline-none transition-colors font-sans text-[#5a534b]"
                disabled={submitting}
              >
                <option value="">Select a city page</option>
                {cityPageUrlOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-sans uppercase tracking-wider text-[#7B756C] mb-2">
              Venue Address
            </label>
            <input
              type="text"
              value={venueAddress}
              onChange={(e) => setVenueAddress(e.target.value)}
              className="w-full px-4 py-3 border border-[#d4cfca] focus:border-[#b8a862] focus:outline-none transition-colors font-sans text-[#5a534b]"
              disabled={submitting}
            />
          </div>

          <div>
            <label className="block text-sm font-sans uppercase tracking-wider text-[#7B756C] mb-2">
              What is the address?
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-3 border border-[#d4cfca] focus:border-[#b8a862] focus:outline-none transition-colors font-sans text-[#5a534b]"
              disabled={submitting}
            />
          </div>

          <div>
            <label className="block text-sm font-sans uppercase tracking-wider text-[#7B756C] mb-2">
              Venue Location
            </label>
            <input
              type="text"
              value={venueLocation}
              onChange={(e) => setVenueLocation(e.target.value)}
              className="w-full px-4 py-3 border border-[#d4cfca] focus:border-[#b8a862] focus:outline-none transition-colors font-sans text-[#5a534b]"
              disabled={submitting}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-sans uppercase tracking-wider text-[#7B756C] mb-2">
                Phone Number
              </label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-4 py-3 border border-[#d4cfca] focus:border-[#b8a862] focus:outline-none transition-colors font-sans text-[#5a534b]"
                disabled={submitting}
              />
            </div>

            <div>
              <label className="block text-sm font-sans uppercase tracking-wider text-[#7B756C] mb-2">
                Venue Contact
              </label>
              <input
                type="text"
                value={venueContact}
                onChange={(e) => setVenueContact(e.target.value)}
                className="w-full px-4 py-3 border border-[#d4cfca] focus:border-[#b8a862] focus:outline-none transition-colors font-sans text-[#5a534b]"
                disabled={submitting}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-sans uppercase tracking-wider text-[#7B756C] mb-2">
              Website URL
            </label>
            <input
              type="text"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              className="w-full px-4 py-3 border border-[#d4cfca] focus:border-[#b8a862] focus:outline-none transition-colors font-mono text-sm text-[#5a534b]"
              disabled={submitting}
              placeholder="https://..."
            />
          </div>
        </div>
      </div>

      {/* Venue Details */}
      <div className="bg-white p-8 shadow-sm">
        <h2 className="font-cormorant text-2xl text-[#5a534b] mb-6">Venue Details</h2>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-sans uppercase tracking-wider text-[#7B756C] mb-2">
              Wedding Types
            </label>
            <div className="space-y-2">
              {weddingTypeOptions.map((option) => (
                <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={weddingTypes.includes(option.value)}
                    onChange={() => toggleCheckbox(option.value, weddingTypes, setWeddingTypes)}
                    className="w-4 h-4 text-[#b8a862] border-[#d4cfca] rounded focus:ring-[#b8a862]"
                    disabled={submitting}
                  />
                  <span className="text-sm font-sans text-[#7B756C]">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-sans uppercase tracking-wider text-[#7B756C] mb-2">
              Categories
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {categoryOptions.map((option) => (
                <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={categories.includes(option.value)}
                    onChange={() => toggleCheckbox(option.value, categories, setCategories)}
                    className="w-4 h-4 text-[#b8a862] border-[#d4cfca] rounded focus:ring-[#b8a862]"
                    disabled={submitting}
                  />
                  <span className="text-sm font-sans text-[#7B756C]">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-sans uppercase tracking-wider text-[#7B756C] mb-2">
              Indoor / Outdoor
            </label>
            <div className="space-y-2">
              {indoorOutdoorOptions.map((option) => (
                <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={indoorOutdoor.includes(option.value)}
                    onChange={() => toggleCheckbox(option.value, indoorOutdoor, setIndoorOutdoor)}
                    className="w-4 h-4 text-[#b8a862] border-[#d4cfca] rounded focus:ring-[#b8a862]"
                    disabled={submitting}
                  />
                  <span className="text-sm font-sans text-[#7B756C]">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-sans uppercase tracking-wider text-[#7B756C] mb-2">
                Price
              </label>
              <select
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-4 py-3 border border-[#d4cfca] focus:border-[#b8a862] focus:outline-none transition-colors font-sans text-[#5a534b]"
                disabled={submitting}
              >
                <option value="">Select price range</option>
                {priceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-sans uppercase tracking-wider text-[#7B756C] mb-2">
                Rating
              </label>
              <input
                type="number"
                value={rating}
                onChange={(e) => setRating(parseInt(e.target.value) || 0)}
                min="0"
                max="5"
                className="w-full px-4 py-3 border border-[#d4cfca] focus:border-[#b8a862] focus:outline-none transition-colors font-sans text-[#5a534b]"
                disabled={submitting}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-sans uppercase tracking-wider text-[#7B756C] mb-2">
              Price per head
            </label>
            <RichTextEditor
              content={pricePerHead}
              onChange={setPricePerHead}
              disabled={submitting}
              placeholder="Price per head information..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-sans uppercase tracking-wider text-[#7B756C] mb-2">
                Ceremony Guests
              </label>
              <input
                type="text"
                value={ceremonyGuests}
                onChange={(e) => setCeremonyGuests(e.target.value)}
                className="w-full px-4 py-3 border border-[#d4cfca] focus:border-[#b8a862] focus:outline-none transition-colors font-sans text-[#5a534b]"
                disabled={submitting}
              />
            </div>

            <div>
              <label className="block text-sm font-sans uppercase tracking-wider text-[#7B756C] mb-2">
                Reception Guests
              </label>
              <input
                type="text"
                value={receptionGuests}
                onChange={(e) => setReceptionGuests(e.target.value)}
                className="w-full px-4 py-3 border border-[#d4cfca] focus:border-[#b8a862] focus:outline-none transition-colors font-sans text-[#5a534b]"
                disabled={submitting}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-sans uppercase tracking-wider text-[#7B756C] mb-2">
              Available Days and Times
            </label>
            <textarea
              value={availableDaysAndTimes}
              onChange={(e) => setAvailableDaysAndTimes(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-[#d4cfca] focus:border-[#b8a862] focus:outline-none transition-colors font-sans text-[#5a534b]"
              disabled={submitting}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-sans uppercase tracking-wider text-[#7B756C] mb-2">
                Time Restriction
              </label>
              <input
                type="time"
                value={timeRestriction}
                onChange={(e) => setTimeRestriction(e.target.value)}
                className="w-full px-4 py-3 border border-[#d4cfca] focus:border-[#b8a862] focus:outline-none transition-colors font-sans text-[#5a534b]"
                disabled={submitting}
              />
            </div>

            <div>
              <label className="block text-sm font-sans uppercase tracking-wider text-[#7B756C] mb-2">
                Music end by
              </label>
              <input
                type="time"
                value={musicEndBy}
                onChange={(e) => setMusicEndBy(e.target.value)}
                className="w-full px-4 py-3 border border-[#d4cfca] focus:border-[#b8a862] focus:outline-none transition-colors font-sans text-[#5a534b]"
                disabled={submitting}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Facilities & Services */}
      <div className="bg-white p-8 shadow-sm">
        <h2 className="font-cormorant text-2xl text-[#5a534b] mb-6">Facilities & Services</h2>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-sans uppercase tracking-wider text-[#7B756C] mb-2">
              Can we have our wedding ceremony here?
            </label>
            <input
              type="text"
              value={canHaveCeremony}
              onChange={(e) => setCanHaveCeremony(e.target.value)}
              className="w-full px-4 py-3 border border-[#d4cfca] focus:border-[#b8a862] focus:outline-none transition-colors font-sans text-[#5a534b]"
              disabled={submitting}
            />
          </div>

          <div>
            <label className="block text-sm font-sans uppercase tracking-wider text-[#7B756C] mb-2">
              Can we have our wedding reception here?
            </label>
            <input
              type="text"
              value={canHaveReception}
              onChange={(e) => setCanHaveReception(e.target.value)}
              className="w-full px-4 py-3 border border-[#d4cfca] focus:border-[#b8a862] focus:outline-none transition-colors font-sans text-[#5a534b]"
              disabled={submitting}
            />
          </div>

          <div>
            <label className="block text-sm font-sans uppercase tracking-wider text-[#7B756C] mb-2">
              Is there a wet weather option here?
            </label>
            <input
              type="text"
              value={wetWeatherOption}
              onChange={(e) => setWetWeatherOption(e.target.value)}
              className="w-full px-4 py-3 border border-[#d4cfca] focus:border-[#b8a862] focus:outline-none transition-colors font-sans text-[#5a534b]"
              disabled={submitting}
            />
          </div>

          <div>
            <label className="block text-sm font-sans uppercase tracking-wider text-[#7B756C] mb-2">
              Is there parking on-site?
            </label>
            <RichTextEditor
              content={isParkingOnSite}
              onChange={setIsParkingOnSite}
              disabled={submitting}
              placeholder="Parking information..."
            />
          </div>

          <div>
            <label className="block text-sm font-sans uppercase tracking-wider text-[#7B756C] mb-2">
              Is a marquee required?
            </label>
            <select
              value={marqueeRequired}
              onChange={(e) => setMarqueeRequired(e.target.value)}
              className="w-full px-4 py-3 border border-[#d4cfca] focus:border-[#b8a862] focus:outline-none transition-colors font-sans text-[#5a534b]"
              disabled={submitting}
            >
              <option value="">Select option</option>
              {yesNoOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-sans uppercase tracking-wider text-[#7B756C] mb-2">
                In-house catering
              </label>
              <select
                value={inHouseCatering}
                onChange={(e) => setInHouseCatering(e.target.value)}
                className="w-full px-4 py-3 border border-[#d4cfca] focus:border-[#b8a862] focus:outline-none transition-colors font-sans text-[#5a534b]"
                disabled={submitting}
              >
                <option value="">Select option</option>
                {yesNoOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-sans uppercase tracking-wider text-[#7B756C] mb-2">
                3rd party catering
              </label>
              <select
                value={thirdPartyCatering}
                onChange={(e) => setThirdPartyCatering(e.target.value)}
                className="w-full px-4 py-3 border border-[#d4cfca] focus:border-[#b8a862] focus:outline-none transition-colors font-sans text-[#5a534b]"
                disabled={submitting}
              >
                <option value="">Select option</option>
                {yesNoOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-sans uppercase tracking-wider text-[#7B756C] mb-2">
              What catering options are there?
            </label>
            <RichTextEditor
              content={cateringOptions}
              onChange={setCateringOptions}
              disabled={submitting}
              placeholder="Catering options information..."
            />
          </div>

          <div>
            <label className="block text-sm font-sans uppercase tracking-wider text-[#7B756C] mb-2">
              What accommodation options are available?
            </label>
            <RichTextEditor
              content={accommodationOptions}
              onChange={setAccommodationOptions}
              disabled={submitting}
              placeholder="Accommodation options..."
            />
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="bg-white p-8 shadow-sm">
        <h2 className="font-cormorant text-2xl text-[#5a534b] mb-6">Additional Information</h2>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-sans uppercase tracking-wider text-[#7B756C] mb-2">
              How to get the most out of this venue
            </label>
            <RichTextEditor
              content={howToGetMostOut}
              onChange={setHowToGetMostOut}
              disabled={submitting}
              placeholder="Tips for making the most of this venue..."
            />
          </div>

          <div>
            <label className="block text-sm font-sans uppercase tracking-wider text-[#7B756C] mb-2">
              How much does a wedding cost here?
            </label>
            <RichTextEditor
              content={weddingCost}
              onChange={setWeddingCost}
              disabled={submitting}
              placeholder="Wedding cost information..."
            />
          </div>

          <div>
            <label className="block text-sm font-sans uppercase tracking-wider text-[#7B756C] mb-2">
              What kind of wedding theme or style best suits this venue?
            </label>
            <input
              type="text"
              value={themeStyle}
              onChange={(e) => setThemeStyle(e.target.value)}
              className="w-full px-4 py-3 border border-[#d4cfca] focus:border-[#b8a862] focus:outline-none transition-colors font-sans text-[#5a534b]"
              disabled={submitting}
            />
          </div>

          <div>
            <label className="block text-sm font-sans uppercase tracking-wider text-[#7B756C] mb-2">
              Can we get married here during COVID-19?
            </label>
            <RichTextEditor
              content={covidInfo}
              onChange={setCovidInfo}
              disabled={submitting}
              placeholder="COVID-19 information..."
            />
          </div>

          <div>
            <label className="block text-sm font-sans uppercase tracking-wider text-[#7B756C] mb-2">
              Custom Call to action
            </label>
            <input
              type="text"
              value={customCallToAction}
              onChange={(e) => setCustomCallToAction(e.target.value)}
              className="w-full px-4 py-3 border border-[#d4cfca] focus:border-[#b8a862] focus:outline-none transition-colors font-sans text-[#5a534b]"
              disabled={submitting}
            />
          </div>

          <div>
            <label className="block text-sm font-sans uppercase tracking-wider text-[#7B756C] mb-2">
              HTML
            </label>
            <RichTextEditor
              content={html}
              onChange={setHtml}
              disabled={submitting}
              placeholder="Additional HTML content..."
            />
          </div>
        </div>
      </div>

      {/* Related Content */}
      <div className="bg-white p-8 shadow-sm">
        <h2 className="font-cormorant text-2xl text-[#5a534b] mb-6">Related Content</h2>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-sans uppercase tracking-wider text-[#7B756C] mb-2">
              Weddings at this Venue
            </label>
            <div className="border border-[#d4cfca] rounded p-4 max-h-64 overflow-y-auto">
              {allFilms.length === 0 ? (
                <p className="text-sm text-[#9B9589]">No films available</p>
              ) : (
                <div className="space-y-2">
                  {allFilms.map((film) => (
                    <label key={film.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedFilmIds.includes(film.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedFilmIds([...selectedFilmIds, film.id])
                          } else {
                            setSelectedFilmIds(selectedFilmIds.filter((id) => id !== film.id))
                          }
                        }}
                        className="w-4 h-4 text-[#b8a862] border-[#d4cfca] rounded focus:ring-[#b8a862]"
                        disabled={submitting}
                      />
                      <span className="text-sm font-serif text-[#5a534b]">{film.title}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-sans uppercase tracking-wider text-[#7B756C] mb-2">
              Similar Wedding Venues
            </label>
            <div className="border border-[#d4cfca] rounded p-4 max-h-64 overflow-y-auto">
              {allVenues.filter((v) => v.id !== venue?.id).length === 0 ? (
                <p className="text-sm text-[#9B9589]">No other venues available</p>
              ) : (
                <div className="space-y-2">
                  {allVenues
                    .filter((v) => v.id !== venue?.id)
                    .map((otherVenue) => (
                      <label key={otherVenue.id} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedVenueIds.includes(otherVenue.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedVenueIds([...selectedVenueIds, otherVenue.id])
                            } else {
                              setSelectedVenueIds(
                                selectedVenueIds.filter((id) => id !== otherVenue.id)
                              )
                            }
                          }}
                          className="w-4 h-4 text-[#b8a862] border-[#d4cfca] rounded focus:ring-[#b8a862]"
                          disabled={submitting}
                        />
                        <span className="text-sm font-serif text-[#5a534b]">
                          {otherVenue.venueTitle}
                        </span>
                      </label>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={submitting}
          className="bg-[#b8a862] px-8 py-4 text-sm font-sans uppercase tracking-[0.15em] text-white hover:bg-[#a89752] transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
        >
          {submitting && <Loader2 className="animate-spin" size={16} />}
          {submitting ? 'Saving...' : venue ? 'Update Venue' : 'Create Venue'}
        </button>

        <button
          type="button"
          onClick={() => router.push('/admin/venues')}
          disabled={submitting}
          className="px-8 py-4 text-sm font-sans uppercase tracking-[0.15em] text-[#7B756C] border border-[#d4cfca] hover:border-[#b8a862] hover:text-[#b8a862] transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
