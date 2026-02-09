"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faDiscord,
  faYoutube,
  faTwitch,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons"
import { Menu, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const SOCIAL_LINKS = [
  {
    href: "https://discord.com/invite/MDc6Cf7QFz",
    label: "Discord",
    icon: faDiscord,
  },
  {
    href: "https://www.youtube.com/@metgamestudio",
    label: "YouTube",
    icon: faYoutube,
  },
  {
    href: "https://www.twitch.tv/metgamestudio",
    label: "Twitch",
    icon: faTwitch,
  },
  {
    href: "https://www.instagram.com/metgamestudio/",
    label: "Instagram",
    icon: faInstagram,
  },
  {
    href: "https://www.linkedin.com/company/met-games",
    label: "LinkedIn",
    icon: faLinkedin,
  },
] as const

export function Header() {
  const pathname = usePathname()

  const [isVisible, setIsVisible] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const lastScrollYRef = useRef(0)

  const isHome = pathname === "/"
  const gamesHref = isHome ? "#games" : "/#games"
  const eventsHref = isHome ? "#events" : "/#events"

  useEffect(() => {
    const controlHeader = () => {
      if (isMenuOpen) return

      const currentScrollY = window.scrollY
      const lastScrollY = lastScrollYRef.current

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }

      lastScrollYRef.current = currentScrollY
    }

    window.addEventListener("scroll", controlHeader)
    return () => window.removeEventListener("scroll", controlHeader)
  }, [isMenuOpen])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!isMenuOpen) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false)
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [isMenuOpen])

  useEffect(() => {
    if (typeof window === "undefined") return

    const media = window.matchMedia("(min-width: 640px)")
    const onChange = () => {
      if (media.matches) setIsMenuOpen(false)
    }

    media.addEventListener("change", onChange)
    return () => media.removeEventListener("change", onChange)
  }, [])

  useEffect(() => {
    if (!isMenuOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isMenuOpen])

  return (
    <>
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 sm:hidden"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-[#D4C4E8] border-b border-[#B8A5D4] transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <nav className="flex items-center justify-between">
            <div className="flex-shrink-0">
              {!isHome && (
                <Link href="/" className="flex items-center transition-opacity hover:opacity-80 -my-2">
                  <Image
                    src="/images/mgs-transparent-logo-cropped.png"
                    alt="MGS Home"
                    width={120}
                    height={120}
                    className="h-10 w-auto"
                    priority
                    quality={100}
                  />
                </Link>
              )}
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-4 md:gap-8">
                <Link
                  href="/team"
                  className="text-lg md:text-2xl font-display uppercase tracking-wide text-[#382450] hover:text-[#6B5580] transition-colors"
                >
                  Meet the Team
                </Link>
                <Link
                  href={gamesHref}
                  className="text-lg md:text-2xl font-display uppercase tracking-wide text-[#382450] hover:text-[#6B5580] transition-colors"
                >
                  Games
                </Link>
                <Link
                  href={eventsHref}
                  className="text-lg md:text-2xl font-display uppercase tracking-wide text-[#382450] hover:text-[#6B5580] transition-colors"
                >
                  Events
                </Link>
              </div>

              <div className="hidden sm:block mx-4 md:mx-6 h-8 w-0.5 bg-[#382450]" />

              <div className="hidden sm:flex items-center gap-4 sm:gap-6">
                {SOCIAL_LINKS.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    className="text-[#4A3B5C] hover:text-[#6B5580] transition-colors block w-8 h-8"
                    aria-label={item.label}
                  >
                    <FontAwesomeIcon
                      icon={item.icon}
                      className="w-full h-full"
                      style={{ color: "#4b0770", width: "100%", height: "100%" }}
                    />
                  </Link>
                ))}
              </div>

              <button
                type="button"
                className="sm:hidden inline-flex items-center justify-center w-10 h-10 rounded-md border border-[#B8A5D4] bg-white/30 text-[#382450] hover:bg-white/50 transition-colors"
                onClick={() => setIsMenuOpen((v) => !v)}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-nav"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </nav>

          <div id="mobile-nav" className={`sm:hidden ${isMenuOpen ? "block" : "hidden"}`}>
            <div className="mt-3 rounded-lg border border-[#B8A5D4] bg-white/35 backdrop-blur px-4 py-4">
              <div className="flex flex-col gap-3">
                {!isHome && (
                  <Link
                    href="/"
                    className="text-lg font-display uppercase tracking-wide text-[#382450] hover:text-[#6B5580] transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </Link>
                )}
                <Link
                  href="/team"
                  className="text-lg font-display uppercase tracking-wide text-[#382450] hover:text-[#6B5580] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Meet the Team
                </Link>
                <Link
                  href={gamesHref}
                  className="text-lg font-display uppercase tracking-wide text-[#382450] hover:text-[#6B5580] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Games
                </Link>
                <Link
                  href={eventsHref}
                  className="text-lg font-display uppercase tracking-wide text-[#382450] hover:text-[#6B5580] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Events
                </Link>
              </div>

              <div className="mt-4 pt-4 border-t border-[#B8A5D4] flex items-center justify-between">
                {SOCIAL_LINKS.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    className="text-[#4A3B5C] hover:text-[#6B5580] transition-colors block w-8 h-8"
                    aria-label={item.label}
                  >
                    <FontAwesomeIcon
                      icon={item.icon}
                      className="w-full h-full"
                      style={{ color: "#4b0770", width: "100%", height: "100%" }}
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
