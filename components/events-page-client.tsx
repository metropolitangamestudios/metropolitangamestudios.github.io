"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { ChevronDown, ChevronUp, ExternalLink, Calendar, MapPin } from "lucide-react"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { SocialLinks } from "@/components/social-links"
import eventsPageDataJson from "@/data/events.json"

interface EventSocials {
  twitter?: string
  discord?: string
  youtube?: string
  twitch?: string
  linkedin?: string
  instagram?: string
  tiktok?: string
  github?: string
}

interface EventLink {
  label: string
  href: string
}

interface EventItem {
  id: string
  title: string
  subtitle: string
  description: string
  image: string
  imageAlt: string
  links?: EventLink[]
  socials?: EventSocials
  defaultExpanded?: boolean
}

interface EventSeason {
  id: string
  buttonLabel: string
  titleLabel: string
  events: EventItem[]
}

interface ArchiveOption {
  id: string
  label: string
}

interface EventsPageData {
  currentSeasonId: string
  archiveOptions: ArchiveOption[]
  seasons: EventSeason[]
}

const eventsPageData = eventsPageDataJson as EventsPageData

const outlinedSubtitleStyle = {
  WebkitTextStroke: "1px #000000",
  textShadow: "1px 0 0 #000, -1px 0 0 #000, 0 1px 0 #000, 0 -1px 0 #000",
}

function toTitleCase(s: string) {
  return s.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
}

function EventCard({ event }: { event: EventItem }) {
  const [isExpanded, setIsExpanded] = useState(Boolean(event.defaultExpanded))
  const hasSocials = event.socials && Object.values(event.socials).some((link) => link && link !== "#")
  const hasLinks = event.links && event.links.length > 0

  return (
    <article className="w-full overflow-hidden rounded-[24px] border border-white/12 bg-[#f1e6f8]/10 shadow-[0_22px_50px_rgba(21,8,31,0.2)] backdrop-blur-sm">
      <button
        type="button"
        onClick={() => setIsExpanded((value) => !value)}
        aria-expanded={isExpanded}
        className={`w-full px-5 py-5 text-left transition-colors sm:px-6 sm:py-6 md:px-7 md:py-7 lg:px-8 lg:py-8`}
      >
        <div className="flex flex-col sm:flex-row items-stretch gap-4 sm:gap-5 md:gap-6">
          <div className="relative w-full h-42 shrink-0 overflow-hidden rounded-[12px] border-2 border-white/45 sm:h-44 sm:w-44 sm:order-last md:h-56 md:w-56">
            <Image
              src={event.image}
              alt={event.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 176px, 224px"
            />
          </div>

          <div className="flex min-w-0 flex-1 flex-col justify-between">
            <div>
              <h2 className="font-display text-4xl font-bold leading-none text-white sm:text-3xl md:text-7xl">
                {event.title}
              </h2>
              {(() => {
                const parts = (event.subtitle || "").split("|").map((s) => s.trim())
                const dateText = parts[0] || ""
                const locationText = parts[1] || ""
                const displayDate = dateText ? toTitleCase(dateText) : ""
                const displayLocation = locationText ? toTitleCase(locationText) : ""

                return (
                  <div className="mt-2 flex flex-col gap-1">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 shrink-0 sm:h-4 sm:w-4 md:h-6 md:w-6 text-[#f3c6ff]" />
                      <span className="font-medium text-base uppercase tracking-[0.24em] text-[#f3c6ff] sm:text-lg">{displayDate}</span>
                    </div>
                    {locationText ? (
                      <div className="flex items-center gap-3">
                        <MapPin className="h-4 w-4 shrink-0 sm:h-4 sm:w-4 md:h-6 md:w-6 text-[#f3c6ff]" />
                        <span className="font-medium text-base uppercase tracking-[0.24em] text-[#f3c6ff] sm:text-lg">{displayLocation}</span>
                      </div>
                    ) : null}
                  </div>
                )
              })()}
            </div>

            <div className="mt-3 flex items-center gap-2 text-sm font-medium text-white sm:text-base">
              {isExpanded ? <ChevronUp className="h-6 w-6" /> : <ChevronDown className="h-6 w-6" />}
              <span>{isExpanded ? "Less" : "More"}</span>
            </div>
          </div>
        </div>
      </button>

      <div
        className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
          isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div
          className={`overflow-hidden transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none ${
            isExpanded ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
          }`}
        >
          <div className="rounded-b-[24px] bg-[#f1e6f8]/70 border-t border-white/12 px-5 pb-6 pt-5 text-[#452b57] sm:px-6 sm:pb-7 sm:pt-6 md:px-7 md:pb-8 md:pt-7 lg:px-8 lg:pb-9 lg:pt-8">
            <p className="font-body text-sm sm:text-base md:text-lg mb-3 sm:mb-4 whitespace-pre-line leading-relaxed">{event.description}</p>

            {hasLinks ? (
              <div className="mt-4 flex flex-wrap gap-3">
                {event.links?.map((link) => (
                  <a
                    key={`${event.id}-${link.label}`}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 font-display text-xl uppercase tracking-wide text-white transition-colors hover:bg-white/20 sm:px-5 sm:py-2.5 sm:text-2xl md:px-6 md:py-3 md:text-3xl"
                  >
                    <span>{link.label}</span>
                    <ExternalLink className="h-5 w-5 md:h-6 md:w-6" />
                  </a>
                ))}
              </div>
            ) : null}

            {hasSocials ? (
              <div className="mt-5">
                <SocialLinks socials={event.socials || {}} size="sm" />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  )
}

export function EventsPageClient() {
  const [selectedSeasonId, setSelectedSeasonId] = useState(eventsPageData.currentSeasonId)

  const selectedSeason = useMemo(() => {
    return (
      eventsPageData.seasons.find((season) => season.id === selectedSeasonId) || eventsPageData.seasons[0]
    )
  }, [selectedSeasonId])

  return (
    <main className="relative isolate min-h-screen overflow-x-hidden">
      <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src="/images/mgs_website_bg.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="fixed inset-0 -z-10 bg-[rgba(69,43,87,0.62)] pointer-events-none" />

      <div className="relative z-10">
      <Header />

      <section className="pb-16 pt-24 sm:pb-20 sm:pt-28">
        <div className="container mx-auto px-4 sm:px-6 ">
          <div className="mx-auto w-full max-w-5xl">
            <div>
              <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                {/*
                <div className="relative w-full shrink-0 sm:w-[140px] sm:max-w-[170px] sm:order-last">
                  <select
                    aria-label="Archive"
                    defaultValue={eventsPageData.archiveOptions[0]?.id}
                  className="w-full appearance-none rounded-[14px] border-0 bg-[#cba3dd] px-3 py-2 pr-9 font-display text-xl uppercase tracking-wide text-[#452b57] outline-none sm:text-2xl"
                    disabled={eventsPageData.archiveOptions.length <= 1}
                  >
                    {eventsPageData.archiveOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-6 w-6 -translate-y-1/2 text-[#452b57]" />
                </div>
                */}

                <div className="flex min-w-0 flex-wrap items-center gap-3 sm:gap-6 sm:order-first">
                  {eventsPageData.seasons.map((season) => {
                    const isSelected = season.id === selectedSeason.id

                    return (
                      <button
                        key={season.id}
                        type="button"
                        onClick={() => setSelectedSeasonId(season.id)}
                        className={`relative cursor-pointer shrink-0 px-0 pb-2 pt-0 font-extrabold text-2xl uppercase tracking-wide leading-none transition-colors sm:text-3xl md:text-[2.5rem] ${
                          isSelected ? "text-white" : "text-[#e6a6fd]"
                        }`}
                      >
                        {season.buttonLabel}
                        {isSelected ? (
                          <motion.span
                            layoutId="season-selected-underline"
                            className="absolute -bottom-0.5 left-0 h-[3px] w-full rounded-full bg-white"
                            transition={{ type: "spring", stiffness: 450, damping: 34, mass: 0.35 }}
                          />
                        ) : null}
                      </button>
                    )
                  })}
                </div>
              </div>

              <h1 className="w-full font-display text-[2.65rem] font-bold uppercase leading-[0.9] sm:text-[4.5rem] md:text-[5.5rem] lg:text-[6.5rem]">
                <span className="text-[#e6a6fd]">Current Events:</span>
                <span className="block text-white sm:inline sm:pl-3">{selectedSeason.titleLabel}</span>
              </h1>
            </div>

            <div className="mt-6 border-t-2 border-white" />

            <div className="mt-8 space-y-5 sm:mt-10 sm:space-y-6">
              {selectedSeason.events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </div>
      </section>
      </div>

      <Footer />
    </main>
  )
}
