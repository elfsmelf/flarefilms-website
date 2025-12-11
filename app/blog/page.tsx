import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ImageCarousel } from "@/components/image-carousel"
import Image from "next/image"
import { getAllBlogPosts } from "@/lib/actions/blog"
import { BlogGrid } from "./blog-grid"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog - Wedding Tips & Inspiration",
  description: "Wedding planning tips, venue guides, and inspiration from Brisbane wedding videographer Flare Films. Expert advice for Queensland couples planning their perfect wedding day.",
  openGraph: {
    title: "Blog - Wedding Tips & Inspiration",
    description: "Wedding planning tips, venue guides, and inspiration from Brisbane wedding videographer",
    url: "https://flarefilms.com.au/blog",
    images: ['/images/2024/03/Jess-and-Braydan-21-scaled.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Blog - Wedding Tips & Inspiration",
    description: "Wedding planning tips, venue guides, and inspiration from Brisbane wedding videographer",
    images: ['/images/2024/03/Jess-and-Braydan-21-scaled.jpg'],
  },
}

export default async function BlogPage() {
  const allPosts = await getAllBlogPosts()
  const publishedPosts = allPosts.filter((post) => post.published)

  // Get featured post (first featured or most recent)
  const featuredPost = publishedPosts.find((post) => post.featured) || publishedPosts[0]
  const remainingPosts = publishedPosts.filter((post) => post.id !== featuredPost?.id)

  // Get unique categories
  const categories = Array.from(new Set(publishedPosts.map((post) => post.category)))

  return (
    <main className="min-h-screen bg-[#24221d]">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px]">
        <Image
          src="/images/2021/01/forest-v2.jpg"
          alt="Blog"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-[#24221d]" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <p className="font-sans text-xs md:text-sm uppercase tracking-[0.3em] text-[#b8a862] mb-4">
            Flare Films Journal
          </p>
          <h1
            className="text-[45px] md:text-[60px] lg:text-[75px] font-cormorant tracking-[0.08em] uppercase font-light leading-[1.1] mb-6"
            style={{ textShadow: "rgba(0, 0, 0, 0.5) 0px 0px 20px" }}
          >
            Wedding Advice
          </h1>
          <p className="font-serif text-base md:text-lg text-white/80 max-w-xl italic">
            Tips, insights & inspiration for your perfect day
          </p>
        </div>

        {/* Decorative scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-white/50 text-xs uppercase tracking-widest font-sans">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/50 to-transparent" />
        </div>
      </section>

      {/* Featured Post Section */}
      {featuredPost && (
        <section className="bg-[#24221d] py-16 md:py-24">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <div className="flex items-center gap-4 mb-10">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#b8a862]/30 to-transparent" />
              <span className="font-sans text-xs uppercase tracking-[0.3em] text-[#b8a862]">Featured Story</span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#b8a862]/30 to-transparent" />
            </div>

            <a href={`/blog/${featuredPost.slug}`} className="group block">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={featuredPost.image || "/placeholder.svg"}
                    alt={featuredPost.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <div className="lg:py-8">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="bg-[#b8a862] px-4 py-1.5 font-sans text-xs uppercase tracking-[0.15em] text-[#24221d]">
                      {featuredPost.category}
                    </span>
                    <span className="font-serif text-sm text-[#9B9589]">
                      {new Date(featuredPost.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  <h2 className="font-cormorant text-3xl md:text-4xl lg:text-5xl text-[#F5F3ED] group-hover:text-[#b8a862] transition-colors duration-300 mb-6 leading-tight">
                    {featuredPost.title}
                  </h2>

                  <p className="font-serif text-lg text-[#C7C5BF] leading-relaxed mb-8 line-clamp-3">
                    {featuredPost.excerpt}
                  </p>

                  <span className="inline-flex items-center gap-3 text-sm font-sans uppercase tracking-[0.15em] text-[#b8a862] group-hover:gap-5 transition-all duration-300">
                    Read Article
                    <svg width="24" height="8" viewBox="0 0 24 8" fill="none" className="transition-transform group-hover:translate-x-1">
                      <path d="M23.3536 4.35355C23.5488 4.15829 23.5488 3.84171 23.3536 3.64645L20.1716 0.464466C19.9763 0.269204 19.6597 0.269204 19.4645 0.464466C19.2692 0.659728 19.2692 0.976311 19.4645 1.17157L22.2929 4L19.4645 6.82843C19.2692 7.02369 19.2692 7.34027 19.4645 7.53553C19.6597 7.7308 19.9763 7.7308 20.1716 7.53553L23.3536 4.35355ZM0 4.5H23V3.5H0V4.5Z" fill="currentColor"/>
                    </svg>
                  </span>
                </div>
              </div>
            </a>
          </div>
        </section>
      )}

      {/* All Posts Section */}
      <section className="bg-[#E7E4DF] py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="font-cormorant text-4xl md:text-5xl tracking-wide text-[#5a534b] mb-4">
              All Articles
            </h2>
            <p className="font-serif text-lg text-[#7b756c] max-w-2xl mx-auto">
              Discover helpful tips and inspiration for your wedding day journey
            </p>
          </div>

          {/* Category Filter & Posts Grid */}
          <BlogGrid
            posts={remainingPosts}
            categories={categories}
            allPosts={publishedPosts}
          />
        </div>
      </section>

      <ImageCarousel />
      <Footer />
    </main>
  )
}
