"use client"
import { useState, useCallback, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"

type TestimonialData = {
  id: number
  title: string
  image: string
  text: string
}

const TESTIMONIALS: TestimonialData[] = [
  {
    id: 1,
    title: "Lewis & Kristen",
    image: "https://assets.guestsnapper.com/wedding-gallery-media/lewis-1.webp",
    text: "Had Richard shoot mine and my now Wife's wedding. From the early start right through to the dancing he didn't miss a thing. Beyond ecstatic with the result and could not recommend highly enough. Thanks again fella!",
  },
  {
    id: 2,
    title: "Maddy & Ben",
    image: "https://assets.guestsnapper.com/wedding-gallery-media/maddy-and-ben-2.webp",
    text: "Flare Films did an amazing job of catching every moment of our perfect day which meant the world to us, especially as some of our family were unable to make it due to COVID. We absolutely love our wedding video and all our family and friends did too!! Richard was easy to communicate with, listened to all our requests and worked seamlessly with our photographer too. Thank you so much!!",
  },
  {
    id: 3,
    title: "Dasuni & Luke",
    image: "https://assets.guestsnapper.com/wedding-gallery-media/dasuni%20and%20luke.webp",
    text: "Thankyou Richard for the incredible wedding videos, great job of catching the feel of our ceremony and so creative too.",
  },
  {
    id: 4,
    title: "Jacey Hourn",
    image: "https://assets.guestsnapper.com/wedding-gallery-media/jacey.webp",
    text: "Richard does an incredible job, he is very easy going, and professional. He made us feel very comfortable throughout the entire day of filming our wedding. Highly recommend Flare Films if you are looking for a wedding videographer!",
  },
  {
    id: 5,
    title: "Lauren Starkey",
    image: "https://assets.guestsnapper.com/wedding-gallery-media/lauren.webp",
    text: "Richard was so easy to work with, understood our ideas and executed them perfectly. We are so in love with our wedding video and cannot wait to be able to look back on our wedding day for many years to come.",
  },
  {
    id: 6,
    title: "Kasun Wakwella",
    image: "https://assets.guestsnapper.com/wedding-gallery-media/kasun.webp",
    text: "Richard was fantastic and a great pleasure to work with for our wedding. We had an event with several different parts, through the course of the entire day, and he was flexible, proactive and helpful during the entire process. It was great being able to talk through highlights and the plan, and the finished products were fantastic!",
  },
  {
    id: 7,
    title: "Jasmine von-Senden",
    image: "https://assets.guestsnapper.com/wedding-gallery-media/rory.webp",
    text: "When I say our Feature Film has been on repeat in our house for the last 2 weeks, I'm not kidding. Each time we watch it, we notice something new. We can cherish the most incredible day forever now thanks to Richard! He also has kept all the raw footage, just in case we wanted to come back and get additional footage of our day. It gives us the choice to come back and ask for more memories. Especially since you don't initially know what extra parts of your wedding you might want after the day. Love Richard and his skills, we are so grateful! Thank you!",
  },
  {
    id: 8,
    title: "Maddie Worboys",
    image: "https://assets.guestsnapper.com/wedding-gallery-media/maddie.webp",
    text: "From our initial meeting to the final delivery, Richard exceeded all expectations. His professionalism, creativity, and attention to detail captured every special moment of our day beautifully. The final video was a beautiful narrative of our day, highlighting not just the big moments but the subtle, emotional ones as well. We are beyond grateful for this timeless keepsake and highly recommend Flare Films to anyone seeking to relive their special day through film. Thanks again Richard - The O'Tooles",
  },
  {
    id: 9,
    title: "Renae S",
    image: "https://assets.guestsnapper.com/wedding-gallery-media/renae.webp",
    text: "Oh my goodness... Words cannot even begin to describe how incredibly privileged we feel to have had Richard from Flare Films as our videographer. The footage, sound quality, and editing skills are absolutely phenomenal and we are so ecstatic about what he put together. It's well beyond what we could have ever imagined. From start to finish he's been so kind, professional, easy going, and just super lovely! I knew he was talented when I saw his previous work, but my gosh... how amazing. Thank you so so so much! We are forever grateful!",
  },
]

export function Testimonial() {
  const [api, setApi] = useState<CarouselApi>()
  const [currentIndex, setCurrentIndex] = useState(0)

  const onSelect = useCallback(() => {
    if (!api) return
    setCurrentIndex(api.selectedScrollSnap())
  }, [api])

  const scrollPrev = useCallback(() => {
    api?.scrollPrev()
  }, [api])

  const scrollNext = useCallback(() => {
    api?.scrollNext()
  }, [api])

  // Set up the select callback when API is ready
  useEffect(() => {
    if (!api) return
    api.on("select", onSelect)
    onSelect()

    return () => {
      api.off("select", onSelect)
    }
  }, [api, onSelect])

  return (
    <section className="py-20 px-6" style={{ backgroundColor: "#24221D" }}>
      {/* Header text */}
      <div className="text-center mb-8">
        <h2 className="font-cormorant text-4xl md:text-5xl text-[#F5F3ED] mb-4">
          Kind Words
        </h2>
        <p className="font-sans text-sm uppercase tracking-[0.2em] text-[#b8a862]">
          From Our Couples
        </p>
      </div>

      <div className="w-full pt-8 pb-8 md:pb-12 px-4 md:px-8 flex justify-center overflow-hidden">
        <div className="max-w-[1440px] w-full flex flex-col relative">
          {/* Header with Navigation */}
          <div className="flex items-center justify-between mb-8 md:mb-12 px-4 md:px-0">
            <div className="hidden md:block w-20"></div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-center min-w-[160px] text-[#b8a862] mx-auto md:mx-0">
              <button
                onClick={scrollPrev}
                className="relative w-8 h-8 flex items-center justify-center cursor-pointer hover:text-[#d4c9a0] transition-colors focus:outline-none"
                aria-label="Previous slide"
              >
                <ChevronLeft size={24} strokeWidth={1.5} />
              </button>

              <h5 className="mx-6 font-sans text-base md:text-lg tracking-[1px] uppercase text-[#F5F3ED]">
                {currentIndex + 1} / {TESTIMONIALS.length}
              </h5>

              <button
                onClick={scrollNext}
                className="relative w-8 h-8 flex items-center justify-center cursor-pointer hover:text-[#d4c9a0] transition-colors focus:outline-none"
                aria-label="Next slide"
              >
                <ChevronRight size={24} strokeWidth={1.5} />
              </button>
            </div>

            <div className="hidden md:block w-20"></div>
          </div>

          {/* Carousel */}
          <Carousel
            setApi={setApi}
            opts={{
              align: "center",
              loop: true,
              dragFree: false,
              watchDrag: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-0">
              {TESTIMONIALS.map((testimonial, index) => (
                <CarouselItem key={testimonial.id} className="pl-0">
                  {/* Main Content Area */}
                  <div className="flex flex-col md:flex-row items-center justify-between w-full relative gap-8 md:gap-4 lg:gap-12">
                    {/* Left Section: Title */}
                    <div className="w-full md:w-[25%] lg:w-[340px] text-center md:text-right order-1 md:order-1 z-10">
                      <h2 className="font-cormorant text-3xl md:text-5xl text-[#F5F3ED] leading-tight tracking-normal font-light">
                        {testimonial.title}
                      </h2>
                    </div>

                    {/* Center Section: Image */}
                    <div className="w-full md:w-[40%] lg:w-[380px] flex-shrink-0 relative order-2 md:order-2 h-[400px] md:h-[500px] lg:h-[579px]">
                      <img
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.title}
                        className="w-full h-full object-cover object-center shadow-md cursor-grab active:cursor-grabbing"
                        draggable={false}
                      />
                    </div>

                    {/* Right Section: Text */}
                    <div className="w-full md:w-[35%] lg:w-[480px] text-center md:text-left order-3 md:order-3">
                      <p className="font-sans text-base md:text-lg text-[#C7C5BF] leading-relaxed tracking-tight">
                        {testimonial.text}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>

      {/* View All Testimonials Button */}
      <div className="text-center mt-12">
        <Link
          href="/testimonials"
          className="inline-block border border-[#b8a862] text-[#b8a862] px-10 py-4 text-sm font-sans uppercase tracking-[0.2em] transition-colors duration-300 hover:bg-[#b8a862] hover:text-[#24221d]"
        >
          View All Testimonials
        </Link>
      </div>
    </section>
  )
}
