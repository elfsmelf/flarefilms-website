"use client"

import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { deleteBlogPost } from "@/lib/actions/blog"
import { useState } from "react"

export function DeleteBlogButton({ id, title }: { id: string; title: string }) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) {
      return
    }

    setIsDeleting(true)
    const result = await deleteBlogPost(id)

    if (!result.success) {
      alert("Failed to delete blog post")
      setIsDeleting(false)
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={handleDelete} disabled={isDeleting}>
      <Trash2 className="w-4 h-4 text-red-500" />
    </Button>
  )
}
