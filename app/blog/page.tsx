import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ImageCarousel } from "@/components/image-carousel"
import Image from "next/image"
import { getAllBlogPosts } from "@/lib/actions/blog"
import { BlogCard } from "./blog-card"
import { BlogHeader } from "./blog-header"
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
  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[50vh]">
        <Image
          src="/images/2021/01/forest-v2.jpg"
          alt="Blog"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <h1
            className="text-[50px] md:text-[65px] lg:text-[80px] font-cormorant tracking-[0.05em] uppercase font-medium leading-[1.1] mb-4"
            style={{ textShadow: "rgba(0, 0, 0, 0.46) 0px 0px 10px" }}
          >
            Wedding Advice
          </h1>
          <p className="font-sans text-sm md:text-base uppercase tracking-[0.2em] text-white/90">
            Tips, Insights & Inspiration
          </p>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="bg-[#E7E4DF] py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          {/* Section Header */}
          <BlogHeader />

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
            {publishedPosts.length > 0 ? (
              publishedPosts.map((post, index) => <BlogCard key={post.id} post={post} index={index} />)
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="font-serif text-lg text-[#7b756c]">No blog posts yet. Check back soon!</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <ImageCarousel />
      <Footer />
    </main>
  )
}
