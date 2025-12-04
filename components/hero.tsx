import Image from "next/image"

export function Hero() {
  return (
    <section className="relative h-[90vh]">
      <Image
        src="https://assets.guestsnapper.com/wedding-gallery-media/jess%20and%20braydon%20featured%20image2.webp"
        alt="Wedding bridal party - bride and groom walking together with groomsmen behind"
        fill
        className="object-cover"
        priority
        sizes="100vw"
        quality={80}
      />
      <div className="absolute inset-0 bg-black/20" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
        <p
          className="text-[28px] md:text-[34px] font-cormorant mb-4 tracking-wide font-light"
          style={{ textShadow: "rgba(0, 0, 0, 0.3) 0px 0px 10px" }}
        >
          <span className="font-light">Story-driven </span>
          <em className="italic font-serif">and</em>
          <span className="font-light"> candid</span>
        </p>
        <h1
          className="text-[40px] md:text-[50px] lg:text-[65px] font-cormorant tracking-[0.05em] uppercase mb-4 font-medium leading-[1.1]"
          style={{ textShadow: "rgba(0, 0, 0, 0.46) 0px 0px 10px" }}
        >
          Brisbane Wedding Videographer
        </h1>
        <p
          className="text-[24px] md:text-[34px] font-cormorant tracking-wide font-light"
          style={{ textShadow: "rgba(0, 0, 0, 0.3) 0px 0px 10px" }}
        >
          <em className="italic font-serif">Relive</em>
          <span> the most special day of your life.</span>
        </p>
      </div>
    </section>
  )
}
