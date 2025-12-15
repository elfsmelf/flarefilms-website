import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ImageCarousel } from "@/components/image-carousel"
import Image from "next/image"
import { getBlogPostBySlug, getAllBlogPosts } from "@/lib/actions/blog"
import { notFound } from "next/navigation"
import { BlogContent } from "./blog-content"
import { RecommendedArticle } from "./recommended-article"
import { ArticleWrapper } from "./article-wrapper"
import { SidebarWrapper } from "./sidebar-wrapper"
import type { Metadata } from "next"
import { generateOGMetadata, generateTwitterMetadata } from "@/lib/seo/metadata"
import { generateArticleSchema, generateBreadcrumbSchema } from "@/lib/seo/schema"
import { JsonLd } from "@/components/seo/JsonLd"

// Generate static params for all published blog posts
export async function generateStaticParams() {
  const posts = await getAllBlogPosts()
  return posts
    .filter((post) => post.published)
    .map((post) => ({
      slug: post.slug,
    }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post || !post.published) return {}

  const title = post.metaTitle || post.title
  const description = post.metaDescription || post.excerpt || `${post.title} - Flare Films Blog`
  const url = `https://flarefilms.com.au/blog/${slug}`

  return {
    title,
    description,
    keywords: [post.category, "wedding tips", "wedding planning", "Brisbane weddings"],
    authors: [{ name: "Richard Paynter" }],
    openGraph: generateOGMetadata({
      title,
      description,
      image: post.image || undefined,
      url,
      type: 'article',
    }),
    twitter: generateTwitterMetadata({
      title,
      description,
      image: post.image || undefined,
    }),
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post || !post.published) {
    notFound()
  }

  // Calculate read time (average reading speed: 200 words per minute)
  const wordCount = post.content.replace(/<[^>]*>/g, "").split(/\s+/).length
  const readTime = Math.ceil(wordCount / 200)

  // Get all posts for recommendations
  const allPosts = await getAllBlogPosts()
  const recommendedPosts = allPosts
    .filter((p) => p.id !== post.id && p.category === post.category && p.published)
    .slice(0, 3)

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const articleSchema = generateArticleSchema(post)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://flarefilms.com.au' },
    { name: 'Blog', url: 'https://flarefilms.com.au/blog' },
    { name: post.title, url: `https://flarefilms.com.au/blog/${slug}` },
  ])

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      <main className="min-h-screen bg-[#24221d]">
        <Header />

      {/* Hero Image with Overlay Title */}
      <section className="relative h-[70vh] md:h-[80vh]">
        <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

        {/* Hero Content */}
        <BlogContent category={post.category} title={post.title} date={formattedDate} readTime={`${readTime} min read`} />
      </section>

      {/* Article Content */}
      <section className="bg-[#E7E4DF] py-0 md:py-24">
        <div className="max-w-[1400px] mx-auto px-0 md:px-12">
          <div className={`grid grid-cols-1 ${recommendedPosts.length > 0 ? "lg:grid-cols-12" : ""} gap-12 lg:gap-16`}>
            {/* Main Content */}
            <div className={recommendedPosts.length > 0 ? "lg:col-span-9" : "max-w-4xl mx-auto"}>
              <ArticleWrapper excerpt={post.excerpt} content={post.content} />
            </div>

            {/* Sidebar - Only show if there are related posts */}
            {recommendedPosts.length > 0 && (
              <aside className="lg:col-span-3">
                <SidebarWrapper>
                  {recommendedPosts.map((recommendedPost) => (
                    <RecommendedArticle key={recommendedPost.id} post={recommendedPost} />
                  ))}
                </SidebarWrapper>
              </aside>
            )}
          </div>
        </div>
      </section>

        <ImageCarousel />
        <Footer />
      </main>
    </>
  )
}
