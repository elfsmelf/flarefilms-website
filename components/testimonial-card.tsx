import type React from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"

type TestimonialCardProps = {
  /**
   * background color of the section
   * @default "#F8F6F1"
   */
  backgroundColor?: string
  /**
   * The small uppercase header text
   */
  header?: string
  /**
   * The main testimonial content
   */
  content?: React.ReactNode
  /**
   * Additional class names for the container
   */
  className?: string
  /**
   * Image URL for the testimonial
   */
  imageUrl?: string
}

// @component: TestimonialCard
export const TestimonialCard = ({
  backgroundColor = "#F8F6F1",
  header = "OUR CLIENTS HAVE THE SWEETEST THINGS TO SAY",
  content,
  className,
  imageUrl = "https://www.flarefilms.com.au/wp-content/uploads/2021/02/lewis-and-kristen-1024x1024.jpg",
}: TestimonialCardProps) => {
  // Default content if not provided
  const defaultContent = (
    <>
      Richard did the videography for our wedding last Friday and we must say that we couldn’t be more pleased with how
      it all went.
      <br />
      <br />
      Excellent, excellent videographer. He arrived on time, coordinated the utterly clueless bride and groom
      efficiently, and patiently held our hands all throughout the wedding day. Richard even stayed back really late as
      we and our guests as we danced through the night, documenting us all the while 😁
      <br />
      <br />
      Can’t recommend him enough!
    </>
  )

  // @return
  return (
    <section
      className={cn("w-full flex justify-center py-[120px] px-6 md:px-0", className)}
      style={{
        backgroundColor,
        fontFamily: "'Questrial', sans-serif", // Fallback for the section, specific elements override this
      }}
    >
      {/* Font Imports */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&family=Questrial&display=swap');
        `}
      </style>

      <div className="w-full max-w-[1200px] flex flex-col md:flex-row items-center gap-12 md:gap-16">
        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative w-full max-w-[500px] aspect-square">
            <Image src={imageUrl || "/placeholder.svg"} alt="Client testimonial" fill className="object-cover" />
          </div>
        </div>

        {/* Text Section */}
        <div className="w-full md:w-1/2 flex flex-col">
          {/* Header Section */}
          <div className="mb-6 text-left">
            <p
              className="m-0 p-0 text-sm font-normal uppercase tracking-[3px] text-[#1f2937]"
              style={{
                fontFamily: "'Questrial', sans-serif",
                lineHeight: "16.8px",
              }}
            >
              {header}
            </p>
          </div>

          {/* Testimonial Body */}
          <div className="w-full text-left">
            <div
              className="text-[#1f2937] text-[23px] italic leading-[34.6px]"
              style={{
                fontFamily: "'EB Garamond', serif",
              }}
            >
              {content || defaultContent}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
