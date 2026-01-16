type ReviewsHeaderProps = {
  title?: string
  subtitle?: string
  className?: string
}

export const ReviewsHeader = ({
  title = "Reviews from Our Happy Couples",
  subtitle = "Here's what couples are saying...",
  className,
}: ReviewsHeaderProps) => {
  return (
    <div
      className={`w-full flex justify-center items-center ${className || ""}`}
      style={{ backgroundColor: "#e7e4df" }}
    >
      <div className="w-full max-w-[1440px] px-6 pt-16 pb-8 md:pt-[70px] md:pb-12 flex flex-col items-center justify-center text-center">
        <h2
          className="font-cormorant text-3xl md:text-5xl mb-0 text-center tracking-normal leading-tight font-light"
          style={{ color: "#5a534b" }}
        >
          {title}
        </h2>

        <p className="font-sans text-base md:text-lg mt-0 text-center" style={{ color: "#7b756c" }}>
          {subtitle}
        </p>

        <a
          href="/testimonials"
          className="mt-6 inline-block border border-[#b8a862] text-[#b8a862] px-8 py-3 text-sm font-serif uppercase tracking-wide transition-colors duration-300 hover:bg-[#b8a862] hover:text-[#24221d]"
        >
          View All Reviews
        </a>
      </div>
    </div>
  )
}
