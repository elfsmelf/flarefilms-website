"use client"

import type React from "react"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const NavLink = ({
  children,
  href = "#",
}: {
  children: React.ReactNode
  href?: string
}) => (
  <Link
    href={href}
    className="relative group flex items-center text-sm uppercase tracking-[0.2em] text-white/90 transition-colors duration-300 hover:text-white font-sans no-underline"
  >
    {children}
    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100" />
  </Link>
)

const MobileNavLink = ({
  children,
  href = "#",
}: {
  children: React.ReactNode
  href?: string
}) => (
  <Link
    href={href}
    className="block w-full text-center py-4 text-sm uppercase tracking-[0.2em] text-white/90 font-sans hover:bg-white/10 transition-colors"
  >
    {children}
  </Link>
)

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)

  return (
    <div className="w-full absolute top-0 left-0 z-50">
      <header
        className={`w-full transition-all duration-300 ${
          scrolled ? "py-2 backdrop-blur-md bg-[#24221D]/50" : "py-3 backdrop-blur-md bg-[#24221D]/50"
        }`}
      >
        <div className="max-w-[1936px] mx-auto px-4 sm:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between relative">
            <div className="lg:hidden w-full flex justify-between items-center mb-4">
              <div className="flex flex-col items-center justify-center w-full">
                <Link href="/" className="text-center group">
                  <span className="block font-cormorant text-3xl font-medium text-white tracking-[0.05em] mb-1">
                    FLARE FILMS
                  </span>
                  <span className="block font-sans text-[8px] uppercase tracking-[0.15em] text-white/80">
                    Brisbane Wedding Videographer
                  </span>
                </Link>
              </div>
              <button
                onClick={toggleMenu}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-white/80 hover:bg-white/10 rounded-md transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            <div className="hidden lg:flex w-1/3 justify-end lg:pr-4 xl:pr-8 2xl:pr-12">
              <nav>
                <ul className="flex items-center lg:space-x-6 xl:space-x-8 2xl:space-x-12">
                  <li>
                    <NavLink href="/about">About</NavLink>
                  </li>
                  <li>
                    <NavLink href="/films">Films</NavLink>
                  </li>
                  <li>
                    <NavLink href="/venues">Venues</NavLink>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="hidden lg:flex flex-col items-center justify-center lg:w-auto xl:w-[480px] 2xl:w-[545px] shrink-0 border-l border-r border-white/20 py-3 lg:px-4 xl:px-5 2xl:px-6 lg:mx-2 xl:mx-3 2xl:mx-4">
              <Link href="/" className="flex flex-col items-center group text-center">
                <span className="block font-cormorant lg:text-[36px] xl:text-[40px] 2xl:text-[42px] leading-tight font-medium text-white tracking-[0.05em] mb-0.5 transition-opacity hover:opacity-80">
                  FLARE FILMS
                </span>
                <span className="block font-sans text-[9px] uppercase tracking-[0.15em] text-white/80 font-light leading-tight">
                  Brisbane Wedding Videographer
                </span>
              </Link>
              <div className="mt-2 font-serif text-xs italic text-white/70 tracking-wide font-light">
                Established 2018
              </div>
            </div>

            <div className="hidden lg:flex w-1/3 justify-start lg:pl-4 xl:pl-8 2xl:pl-12">
              <nav>
                <ul className="flex items-center lg:space-x-6 xl:space-x-8 2xl:space-x-12">
                  <li>
                    <NavLink href="/pricing">Investment</NavLink>
                  </li>
                  <li>
                    <NavLink href="/blog">Advice</NavLink>
                  </li>
                  <li>
                    <NavLink href="/contact">Contact</NavLink>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden backdrop-blur-md bg-[#24221D]/60 border-t border-white/20 w-full absolute top-full left-0 z-50 shadow-lg"
          >
            <nav className="flex flex-col py-2">
              <MobileNavLink href="/about">About</MobileNavLink>
              <MobileNavLink href="/films">Films</MobileNavLink>
              <MobileNavLink href="/venues">Venues</MobileNavLink>
              <div className="w-16 h-[1px] bg-white/20 mx-auto my-2"></div>
              <MobileNavLink href="/pricing">Investment</MobileNavLink>
              <MobileNavLink href="/blog">Advice</MobileNavLink>
              <MobileNavLink href="/contact">Contact</MobileNavLink>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
