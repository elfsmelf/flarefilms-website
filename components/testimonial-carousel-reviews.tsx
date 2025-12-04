"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

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

// @component: TestimonialCarousel
export const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const nextSlide = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length)
  }
  const prevSlide = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  }
  const currentTestimonial = TESTIMONIALS[currentIndex]
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0,
    }),
  }

  // @return
  return (
    <div
      className="w-full pt-12 pb-24 md:pb-32 px-4 md:px-8 flex justify-center overflow-hidden"
      style={{ backgroundColor: "#e7e4df" }}
    >
      <div className="max-w-[1440px] w-full flex flex-col relative">
        {/* Header with Navigation */}
        <div className="flex items-center justify-between mb-8 md:mb-12 px-4 md:px-0">
          <div className="hidden md:block w-20"></div>

          {/* Pagination Controls */}
          <div className="flex items-center justify-center min-w-[160px] text-[#7b756c] mx-auto md:mx-0">
            <button
              onClick={prevSlide}
              className="relative w-8 h-8 flex items-center justify-center cursor-pointer hover:text-[#5a534b] transition-colors focus:outline-none"
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} strokeWidth={1.5} />
            </button>

            <h5 className="mx-6 font-sans text-base md:text-lg tracking-[1px] uppercase text-[#7b756c]">
              <span className="text-[#5a534b]">{currentIndex + 1}</span> / {TESTIMONIALS.length}
            </h5>

            <button
              onClick={nextSlide}
              className="relative w-8 h-8 flex items-center justify-center cursor-pointer hover:text-[#5a534b] transition-colors focus:outline-none"
              aria-label="Next slide"
            >
              <ChevronRight size={24} strokeWidth={1.5} />
            </button>
          </div>

          <div className="hidden md:block w-20"></div>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full relative gap-8 md:gap-4 lg:gap-12">
          {/* Left Section: Title */}
          <div className="w-full md:w-[25%] lg:w-[340px] text-center md:text-right order-1 md:order-1 z-10">
            <AnimatePresence mode="wait">
              <motion.h2
                key={currentIndex}
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -10,
                }}
                transition={{
                  duration: 0.4,
                  ease: "easeOut" as const,
                }}
                className="font-cormorant text-3xl md:text-5xl text-[#5a534b] leading-tight tracking-normal font-light"
              >
                {currentTestimonial.title}
              </motion.h2>
            </AnimatePresence>
          </div>

          {/* Center Section: Image */}
          <div className="w-full md:w-[40%] lg:w-[380px] flex-shrink-0 relative order-2 md:order-2 h-[400px] md:h-[500px] lg:h-[579px]">
            {/* Click zones for navigation over image */}
            <button
              type="button"
              className="absolute top-0 left-0 w-1/2 h-full z-20 cursor-pointer bg-transparent border-none"
              onClick={prevSlide}
              aria-label="Previous testimonial"
            />
            <button
              type="button"
              className="absolute top-0 right-0 w-1/2 h-full z-20 cursor-pointer bg-transparent border-none"
              onClick={nextSlide}
              aria-label="Next testimonial"
            />

            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: {
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  },
                  opacity: {
                    duration: 0.2,
                  },
                }}
                className="absolute inset-0 w-full h-full"
              >
                <img
                  src={currentTestimonial.image || "/placeholder.svg"}
                  alt={currentTestimonial.title}
                  className="w-full h-full object-cover object-center shadow-md"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Section: Text */}
          <div className="w-full md:w-[35%] lg:w-[480px] text-center md:text-left order-3 md:order-3">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentIndex}
                initial={{
                  opacity: 0,
                  x: 20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  x: -20,
                }}
                transition={{
                  duration: 0.4,
                  ease: "easeOut" as const,
                  delay: 0.1,
                }}
                className="font-sans text-base md:text-lg text-[#7b756c] leading-relaxed tracking-tight"
              >
                {currentTestimonial.text}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
