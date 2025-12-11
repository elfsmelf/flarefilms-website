"use client"

import { useState, useEffect } from "react"

interface TocItem {
  id: string
  label: string
}

interface TableOfContentsProps {
  items: TocItem[]
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: "-20% 0% -35% 0%",
        threshold: 0,
      }
    )

    items.forEach((item) => {
      const element = document.getElementById(item.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [items])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <nav className="sticky top-24">
      <div className="bg-white p-6 shadow-lg">
        <h3 className="font-cormorant text-xl text-[#3d3a35] mb-4 pb-3 border-b border-[#e7e4df]">
          Table of Contents
        </h3>
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className={`block py-1.5 text-sm font-serif transition-colors duration-200 ${
                  activeId === item.id
                    ? "text-[#b8a862] font-medium"
                    : "text-[#7b756c] hover:text-[#5a534b]"
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
