"use client"

import { useEffect } from "react"
import sbjs from "sourcebuster"

// Storage keys for click IDs
const FBCLID_KEY = "flare_fbclid"
const GCLID_KEY = "flare_gclid"
const CLICK_ID_EXPIRY_DAYS = 30

// Helper to set a cookie with expiry
function setCookie(name: string, value: string, days: number) {
  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/`
}

// Helper to get a cookie value
function getCookie(name: string): string | null {
  const nameEQ = name + "="
  const ca = document.cookie.split(";")
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === " ") c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length))
  }
  return null
}

// Capture and store click IDs from URL
function captureClickIds() {
  if (typeof window === "undefined") return

  const params = new URLSearchParams(window.location.search)

  const fbclid = params.get("fbclid")
  const gclid = params.get("gclid")

  // Store fbclid if present
  if (fbclid) {
    setCookie(FBCLID_KEY, fbclid, CLICK_ID_EXPIRY_DAYS)
    localStorage.setItem(FBCLID_KEY, fbclid)
  }

  // Store gclid if present
  if (gclid) {
    setCookie(GCLID_KEY, gclid, CLICK_ID_EXPIRY_DAYS)
    localStorage.setItem(GCLID_KEY, gclid)
  }
}

// Get stored click IDs
export function getClickIds() {
  if (typeof window === "undefined") return { fbclid: null, gclid: null }

  return {
    fbclid: getCookie(FBCLID_KEY) || localStorage.getItem(FBCLID_KEY) || null,
    gclid: getCookie(GCLID_KEY) || localStorage.getItem(GCLID_KEY) || null,
  }
}

export function SourcebusterProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Capture click IDs from URL on page load
    captureClickIds()

    // Get the current domain dynamically for cookie storage
    const currentDomain = typeof window !== "undefined" ? window.location.hostname : "flarefilms.com.au"

    sbjs.init({
      domain: currentDomain,
      lifetime: 6,
      session_length: 30,
      referrals: [
        {
          host: "t.co",
          medium: "social",
          display: "twitter.com",
        },
        {
          host: "l.facebook.com",
          medium: "social",
          display: "facebook.com",
        },
        {
          host: "lm.facebook.com",
          medium: "social",
          display: "facebook.com",
        },
        {
          host: "l.instagram.com",
          medium: "social",
          display: "instagram.com",
        },
        {
          host: "www.tiktok.com",
          medium: "social",
          display: "tiktok.com",
        },
        {
          host: "www.pinterest.com",
          medium: "social",
          display: "pinterest.com",
        },
      ],
    })
  }, [])

  return <>{children}</>
}

// Helper function to get sourcebuster data for form submissions
export function getSourcebusterData() {
  if (typeof window === "undefined") return null

  try {
    const data = sbjs.get
    const clickIds = getClickIds()

    return {
      // Current source data
      current_type: data?.current?.typ || "",
      current_source: data?.current?.src || "",
      current_medium: data?.current?.mdm || "",
      current_campaign: data?.current?.cmp || "",
      current_content: data?.current?.cnt || "",
      current_term: data?.current?.trm || "",

      // Current visit additional info
      current_visit_date: data?.current_add?.fd || "",
      current_entrance_point: data?.current_add?.ep || "",
      current_referer: data?.current_add?.rf || "",

      // First source data (original source)
      first_type: data?.first?.typ || "",
      first_source: data?.first?.src || "",
      first_medium: data?.first?.mdm || "",
      first_campaign: data?.first?.cmp || "",
      first_content: data?.first?.cnt || "",
      first_term: data?.first?.trm || "",

      // First visit additional info
      first_visit_date: data?.first_add?.fd || "",
      first_entrance_point: data?.first_add?.ep || "",
      first_referer: data?.first_add?.rf || "",

      // Session data
      session_pages_viewed: data?.session?.pgs || "",
      session_current_page: data?.session?.cpg || "",

      // User data
      total_visits: data?.udata?.vst || "",
      user_agent: data?.udata?.uag || "",

      // Click IDs (Facebook & Google Ads)
      fbclid: clickIds.fbclid || "",
      gclid: clickIds.gclid || "",
    }
  } catch (error) {
    console.error("Error getting sourcebuster data:", error)
    return null
  }
}
