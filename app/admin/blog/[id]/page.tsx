import { getBlogPost } from "@/lib/actions/blog"
import { BlogForm } from "../blog-form"
import { notFound } from "next/navigation"

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  if (id === "new") {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Create New Blog Post</h1>
        <BlogForm />
      </div>
    )
  }

  const post = await getBlogPost(id)

  if (!post) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Edit Blog Post</h1>
      <BlogForm post={post} />
    </div>
  )
}
