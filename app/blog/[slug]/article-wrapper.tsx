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
        className="bg-white md:shadow-lg"
      >
        <div className="px-6 py-12 md:p-12 lg:p-16">
          {/* Excerpt/Introduction */}
          <p className="font-sans text-xl md:text-2xl text-[#5a534b] leading-relaxed mb-12 italic border-l-4 border-[#b8a862] pl-6">
            {excerpt}
          </p>

          {/* Content */}
          <div className="blog-content font-sans text-[#3d3a35] text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: content }} />
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
        <p className="font-sans text-base text-[#e8e3d8] mb-6 max-w-2xl mx-auto">
          Let's create something beautiful together. Get in touch to check availability for your wedding date.
        </p>
        <Link
          href="/#contact"
          className="inline-block border border-[#d4c9a0] px-10 py-4 text-sm font-sans uppercase tracking-wide text-[#d4c9a0] hover:bg-[#d4c9a0] hover:text-[#4a5347] transition-colors duration-300"
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

        .blog-content h3 {
          font-family: var(--font-cormorant);
          font-size: 1.5rem;
          font-weight: 600;
          color: #3d3a35;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          line-height: 1.3;
        }

        .blog-content h4 {
          font-family: var(--font-cormorant);
          font-size: 1.25rem;
          font-weight: 600;
          color: #3d3a35;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
          line-height: 1.4;
        }

        .blog-content p {
          margin-bottom: 1.5rem;
          line-height: 1.8;
        }

        .blog-content strong {
          color: #24221d;
          font-weight: 600;
        }

        .blog-content em {
          font-style: italic;
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

        .blog-content ul {
          list-style-type: disc;
          margin-left: 1.5rem;
          margin-bottom: 1.5rem;
          padding-left: 0.5rem;
        }

        .blog-content ol {
          list-style-type: decimal;
          margin-left: 1.5rem;
          margin-bottom: 1.5rem;
          padding-left: 0.5rem;
        }

        .blog-content li {
          margin-bottom: 0.75rem;
          line-height: 1.7;
          padding-left: 0.25rem;
        }

        .blog-content li::marker {
          color: #b8a862;
        }

        .blog-content blockquote {
          border-left: 4px solid #b8a862;
          padding-left: 1.5rem;
          margin: 2rem 0;
          font-style: italic;
          color: #5a534b;
        }

        .blog-content hr {
          border: none;
          border-top: 1px solid #d4cfca;
          margin: 2.5rem 0;
        }

        .blog-content img {
          max-width: 100%;
          height: auto;
          border-radius: 0.25rem;
          margin: 1.5rem 0;
        }

        .blog-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5rem 0;
        }

        .blog-content th,
        .blog-content td {
          border: 1px solid #d4cfca;
          padding: 0.75rem 1rem;
          text-align: left;
        }

        .blog-content th {
          background-color: #f5f3ed;
          font-weight: 600;
          color: #3d3a35;
        }

        .blog-content tr:nth-child(even) {
          background-color: #fafaf8;
        }
      `}</style>
    </>
  )
}
