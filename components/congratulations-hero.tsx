import Image from "next/image"

export const CongratulationsHero = () => {
  return (
    <section className="relative w-full bg-[#24221d] text-white overflow-hidden selection:bg-orange-900/30 selection:text-white">
      {/* Background Decorative Line */}
      <div
        className="absolute top-0 right-0 bottom-0 w-[200%] md:w-[120%] lg:w-[150%] pointer-events-none opacity-60 mix-blend-soft-light lg:mix-blend-normal"
        style={{
          backgroundImage:
            'url("https://shared-pw-fonts.s3.us-west-2.amazonaws.com/pw-icons-theme-8/info-b-vector.svg")',
          backgroundRepeat: "no-repeat",
          backgroundPosition: "100% 50%",
          backgroundSize: "contain",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-40 lg:pb-[135px] flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-12 lg:gap-24">
        {/* Image Column */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end relative">
          <div className="relative w-full max-w-[480px]">
            {/* The Offset Dark Box (Underlay) */}
            <div
              className="absolute bg-[#302d26] w-full h-full hidden md:block"
              style={{
                top: 0,
                left: 0,
                transform: "translate(10px, 70px)",
                zIndex: 0,
              }}
            />

            {/* Image Wrapper */}
            <div className="relative z-10 w-full h-[500px] md:h-[695px]">
              <Image
                src="https://assets.guestsnapper.com/wedding-gallery-media/laura-celebration.webp"
                alt="Couple celebrating outdoors, walking away hand in hand"
                fill
                className="object-cover shadow-2xl"
                sizes="(max-width: 1024px) 100vw, 50vw"
                style={{
                  objectPosition: "50% 50%",
                }}
              />
            </div>
          </div>
        </div>

        {/* Text Column */}
        <div className="w-full lg:w-1/2 max-w-[600px] lg:pl-12 text-center lg:text-left relative z-20">
          <h2 className="text-4xl md:text-5xl lg:text-[48px] font-serif font-light leading-[1.1] mb-8 lg:mb-12 tracking-wide text-white/95">
            CONGRATULATIONS!
          </h2>

          <div className="space-y-6 text-base md:text-lg leading-relaxed text-gray-200 font-sans font-normal tracking-wide">
            <p>
              Thanks so much for reaching out and considering me to be your third wheel! It is honestly such a privilege
              and a pleasure to be able to join a pair of legends on the best day of your lives and make sure you
              remember it forever.
            </p>
            <p>
              An abundance of high fives and dance moves await, and I'd absolutely love to be a part of your
              celebrations. As a wedding videographer, I adore capturing the raw, unguarded moments of pure love.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
