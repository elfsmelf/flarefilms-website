"use client"

import { motion } from "framer-motion"
import Link from "next/link"

interface ArticleWrapperProps {
  excerpt: string
  content: string
  children?: React.ReactNode
}

export function ArticleWrapper({ excerpt, content, children }: ArticleWrapperProps) {
  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white shadow-lg"
      >
        <div className="p-8 md:p-12 lg:p-16">
          {/* Excerpt/Introduction */}
          <p className="font-serif text-xl md:text-2xl text-[#5a534b] leading-relaxed mb-12 italic border-l-4 border-[#b8a862] pl-6">
            {excerpt}
          </p>

          {/* Content */}
          <div className="blog-content font-serif text-[#3d3a35] text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </motion.article>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-12 bg-[#4a5347] p-8 md:p-12 text-center"
      >
        <h3 className="font-cormorant text-3xl md:text-4xl font-light text-[#d4c9a0] mb-4">Ready to tell your story?</h3>
        <p className="font-serif text-base text-[#e8e3d8] mb-6 max-w-2xl mx-auto">
          Let's create something beautiful together. Get in touch to check availability for your wedding date.
        </p>
        <Link
          href="/#contact"
          className="inline-block border border-[#d4c9a0] px-10 py-4 text-sm font-serif uppercase tracking-wide text-[#d4c9a0] hover:bg-[#d4c9a0] hover:text-[#4a5347] transition-colors duration-300"
        >
          Get in Touch
        </Link>
      </motion.div>

      {children}

      <style jsx global>{`
        .blog-content h2 {
          font-family: var(--font-cormorant);
          font-size: 2rem;
          font-weight: 600;
          color: #3d3a35;
          margin-top: 3rem;
          margin-bottom: 1.5rem;
          line-height: 1.3;
        }

        .blog-content p {
          margin-bottom: 1.5rem;
          line-height: 1.8;
        }

        .blog-content strong {
          color: #24221d;
          font-weight: 600;
        }

        .blog-content a {
          color: #b8a862;
          text-decoration: underline;
          text-underline-offset: 3px;
          transition: color 0.3s;
        }

        .blog-content a:hover {
          color: #d4c9a0;
        }
      `}</style>
    </>
  )
}
