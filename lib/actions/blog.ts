"use server"

import { db } from "@/lib/db"
import { blogPosts } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export interface BlogPostData {
  slug: string
  title: string
  excerpt: string
  content: string
  image: string
  date: Date
  category: string
  published: boolean
  featured: boolean
  metaTitle?: string
  metaDescription?: string
}

export async function createBlogPost(data: BlogPostData) {
  try {
    const [post] = await db.insert(blogPosts).values({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    }).returning()

    revalidatePath("/admin/blog")
    revalidatePath("/blog")

    return { success: true, post }
  } catch (error) {
    console.error("Error creating blog post:", error)
    return { success: false, error: "Failed to create blog post" }
  }
}

export async function updateBlogPost(id: string, data: BlogPostData) {
  try {
    const [post] = await db
      .update(blogPosts)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(blogPosts.id, id))
      .returning()

    revalidatePath("/admin/blog")
    revalidatePath("/blog")
    revalidatePath(`/blog/${data.slug}`)

    return { success: true, post }
  } catch (error) {
    console.error("Error updating blog post:", error)
    return { success: false, error: "Failed to update blog post" }
  }
}

export async function deleteBlogPost(id: string) {
  try {
    await db.delete(blogPosts).where(eq(blogPosts.id, id))

    revalidatePath("/admin/blog")
    revalidatePath("/blog")

    return { success: true }
  } catch (error) {
    console.error("Error deleting blog post:", error)
    return { success: false, error: "Failed to delete blog post" }
  }
}

export async function getBlogPost(id: string) {
  try {
    const post = await db.query.blogPosts.findFirst({
      where: eq(blogPosts.id, id),
    })

    return post
  } catch (error) {
    console.error("Error fetching blog post:", error)
    return null
  }
}

export async function getAllBlogPosts() {
  try {
    const posts = await db.query.blogPosts.findMany({
      orderBy: (blogPosts, { desc }) => [desc(blogPosts.date)],
    })

    return posts
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return []
  }
}

export async function getBlogPostBySlug(slug: string) {
  try {
    const post = await db.query.blogPosts.findFirst({
      where: eq(blogPosts.slug, slug),
    })

    return post
  } catch (error) {
    console.error("Error fetching blog post by slug:", error)
    return null
  }
}

export async function toggleBlogPublished(id: string) {
  try {
    const post = await db.query.blogPosts.findFirst({
      where: eq(blogPosts.id, id),
    })

    if (!post) {
      return { success: false, error: "Blog post not found" }
    }

    await db
      .update(blogPosts)
      .set({
        published: !post.published,
        updatedAt: new Date(),
      })
      .where(eq(blogPosts.id, id))

    revalidatePath("/admin/blog")
    revalidatePath("/blog")

    return { success: true }
  } catch (error) {
    console.error("Error toggling blog published status:", error)
    return { success: false, error: "Failed to toggle published status" }
  }
}

export async function toggleBlogFeatured(id: string) {
  try {
    const post = await db.query.blogPosts.findFirst({
      where: eq(blogPosts.id, id),
    })

    if (!post) {
      return { success: false, error: "Blog post not found" }
    }

    await db
      .update(blogPosts)
      .set({
        featured: !post.featured,
        updatedAt: new Date(),
      })
      .where(eq(blogPosts.id, id))

    revalidatePath("/admin/blog")
    revalidatePath("/blog")

    return { success: true }
  } catch (error) {
    console.error("Error toggling blog featured status:", error)
    return { success: false, error: "Failed to toggle featured status" }
  }
}
