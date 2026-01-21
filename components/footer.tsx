import Link from "next/link"

const locations = [
  { name: "Brisbane", href: "/" },
  { name: "Byron Bay", href: "/byron-bay-wedding-videographer" },
  { name: "Gold Coast", href: "/gold-coast-wedding-videographer" },
  { name: "Moreton Bay", href: "/moreton-bay-wedding-videographer" },
  { name: "Noosa", href: "/noosa-wedding-videographer" },
  { name: "St George", href: "/st-george-wedding-videographer" },
  { name: "Sunshine Coast", href: "/sunshine-coast-wedding-videographer" },
  { name: "Toowoomba", href: "/toowoomba-wedding-videographer" },
]

const socialLinks = [
  { name: "Instagram", href: "https://www.instagram.com/flarefilms.au/" },
  { name: "Facebook", href: "https://www.facebook.com/flarefilms.au/" },
  { name: "Pinterest", href: "https://www.Pinterest.com" },
]

export function Footer() {
  return (
    <footer className="bg-[#24221D]">
      <div className="w-full flex justify-center py-[45px]">
        <div className="w-full max-w-[1313px] mx-auto px-4 flex flex-col lg:flex-row items-stretch justify-center">
          {/* Left Column: Branding */}
          <div className="w-full lg:w-[460px] flex flex-col items-center justify-center p-4 lg:p-0 mb-8 lg:mb-0">
            <div className="text-center mb-6">
              <Link href="/" className="group block">
                <span className="block font-cormorant text-[51px] uppercase tracking-[0.03em] text-[#F5F3ED] mb-1.5">
                  FLARE FILMS
                </span>
                <span className="block font-sans text-[10px] uppercase tracking-[0.4em] text-[#C7C5BF]">
                  Brisbane Wedding Videographer
                </span>
              </Link>
            </div>

            <div className="text-center">
              <span className="font-sans text-[11px] uppercase tracking-[0.36em] text-[#C7C5BF] mr-2">EST</span>
              <span className="font-serif text-[18px] italic text-[#C7C5BF]">2018</span>
            </div>
          </div>

          {/* Middle Column: Main Areas Menu */}
          <div className="w-full lg:w-[561px] flex flex-col justify-center items-center lg:items-start p-[50px] border-y lg:border-y-0 lg:border-x border-[#3d3a35]">
            <div className="w-full pl-[23px]">
              <p className="font-serif italic text-[13px] leading-[15.6px] tracking-[0.15em] text-[#C7C5BF] mb-2.5">
                Main areas we film:
              </p>
            </div>

            <nav className="w-full">
              <ul className="flex flex-wrap justify-start m-0 p-0 list-none">
                {locations.map((location) => (
                  <li key={location.name} className="flex-grow flex">
                    <Link
                      href={location.href}
                      className="text-[#C7C5BF] uppercase tracking-[0.3em] text-[10px] font-sans transition-colors duration-400 hover:text-[#F5F3ED] px-[23px] py-[14px] leading-[15px] flex items-center whitespace-nowrap"
                    >
                      {location.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Right Column: Socials */}
          <div className="w-full lg:w-[288px] flex flex-col justify-center p-[50px] lg:pl-[70px]">
            <div className="w-full">
              <p className="font-serif italic text-[13px] leading-[15.6px] tracking-[0.15em] text-[#C7C5BF] mb-2.5">
                elsewhere
              </p>
            </div>

            <nav className="mt-[5px]">
              <ul className="list-none m-0 p-0">
                {socialLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#C7C5BF] uppercase tracking-[0.3em] text-[10px] font-sans transition-colors duration-400 hover:text-[#F5F3ED] py-[4px] leading-[5px] block mb-5 last:mb-0"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>

      <div className="border-t border-[#3d3a35] mx-6" />
      <div className="py-6 text-center">
        <p className="text-[#C7C5BF] text-[10px] tracking-[0.3em] uppercase font-sans">
          ©2025 FLARE FILMS | ALL RIGHTS RESERVED
        </p>
      </div>
    </footer>
  )
}
