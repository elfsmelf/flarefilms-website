"use client"

import { useEffect } from "react"
import useEmblaCarousel from "embla-carousel-react"
import Image from "next/image"

type CarouselItem = {
  id: number
  image: string
  label: string
}

const CAROUSEL_ITEMS: CarouselItem[] = [
  {
    id: 1,
    image: "/images/2023/01/ben-and-sierra-35.jpg",
    label: "Roma Street Parklands Wedding - Ben and Sierra",
  },
  {
    id: 2,
    image: "/images/2023/01/lewis-and-kristen7.jpg",
    label: "Factory 51 Wedding Film - Lewis and Kristen",
  },
  {
    id: 3,
    image: "/images/2023/01/simone-and-ged-24.jpg",
    label: "Bunnyconnellen Wedding Film - Simone and Ged",
  },
  {
    id: 4,
    image: "/images/2023/01/brianna-and-jaelen-12.jpg",
    label: "Burleigh Heads Surf Club - Brianna and Jaelen Wedding Film",
  },
  {
    id: 5,
    image: "/images/2023/01/matt-and-rebecca28.jpg",
    label: "Riverlife Wedding Venue - Matt and Rebecca",
  },
  {
    id: 6,
    image: "/images/2023/01/vlcsnap-2023-01-15-11h18m06s749.jpg",
    label: "Brisbane Marriot Hotel Wedding - Dasuni and Luke",
  },
  {
    id: 7,
    image: "/images/2023/01/brianna-and-jaelen-9.jpg",
    label: "Burleigh Heads Surf Club - Brianna and Jaelen Wedding Film",
  },
  {
    id: 8,
    image: "/images/2023/01/stef-and-dermott-32.jpg",
    label: "Brisbane Botanic Gardens Wedding Film - Stefanie and Dermott",
  },
  {
    id: 9,
    image: "/images/2023/01/jon-and-tiffanie7.jpg",
    label: "Sunshine Coast Hinterland Wedding - Jon and Tiffanie",
  },
]

export const ImageCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    skipSnaps: false,
    dragFree: true,
  })

  useEffect(() => {
    if (emblaApi) emblaApi.reInit()
  }, [emblaApi])

  return (
    <div className="w-full py-10 relative group" style={{ backgroundColor: "#24221D" }}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-2.5 md:-ml-5 touch-pan-y">
          {CAROUSEL_ITEMS.map((item) => (
            <div key={item.id} className="flex-[0_0_33.33%] min-w-0 pl-2.5 md:flex-[0_0_11.11%] md:pl-5 relative">
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="block relative h-[240px] w-full overflow-hidden cursor-pointer select-none transition-transform hover:opacity-90 active:scale-[0.98]"
                aria-label={item.label}
              >
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.label}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 33vw, 11vw"
                />
                <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
