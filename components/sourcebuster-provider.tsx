"use client"

import { useEffect } from "react"
import sbjs from "sourcebuster"

export function SourcebusterProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
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
    }
  } catch (error) {
    console.error("Error getting sourcebuster data:", error)
    return null
  }
}
