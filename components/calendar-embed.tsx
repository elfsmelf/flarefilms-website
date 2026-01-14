"use client"

import { useEffect } from "react"

export function CalendarEmbed() {
  useEffect(() => {
    // Load the form embed script
    const script = document.createElement("script")
    script.src = "https://link.msgsndr.com/js/form_embed.js"
    script.type = "text/javascript"
    script.async = true
    document.body.appendChild(script)

    return () => {
      // Cleanup script on unmount
      document.body.removeChild(script)
    }
  }, [])

  return (
    <div className="w-full">
      <iframe
        src="https://api.leadconnectorhq.com/widget/booking/mnlSn1IPyEkB2cduBldC"
        style={{ width: "100%", border: "none", overflow: "hidden", minHeight: "700px" }}
        scrolling="no"
        id="mnlSn1IPyEkB2cduBldC_1768434344048"
      />
    </div>
  )
}
