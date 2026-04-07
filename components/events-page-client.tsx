"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react"
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
  tagline: string
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

function EventCard({ event }: { event: EventItem }) {
  const [isExpanded, setIsExpanded] = useState(Boolean(event.defaultExpanded))
  const hasSocials = event.socials && Object.values(event.socials).some((link) => link && link !== "#")
  const hasLinks = event.links && event.links.length > 0

  return (
    <article className="w-full">
      <button
        type="button"
        onClick={() => setIsExpanded((value) => !value)}
        aria-expanded={isExpanded}
        className={`w-full bg-[#cba3dd] px-4 py-4 text-left transition-colors hover:bg-[#d3b0e2] sm:px-5 sm:py-5 ${
          isExpanded ? "rounded-t-[22px]" : "rounded-[22px]"
        }`}
      >
        <div className="flex items-stretch gap-4 sm:gap-5 md:gap-6">
          <div className="flex min-w-0 flex-1 flex-col justify-between">
            <div>
              <h2 className="font-display text-4xl font-bold leading-none text-[#452b57] sm:text-3xl md:text-7xl">
                {event.title}
              </h2>
              <p
                className="-mt-1 font-display text-2xl leading-none text-white sm:text-lg md:text-5xl"
                style={outlinedSubtitleStyle}
              >
                {event.subtitle}
              </p>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#452b57] sm:text-base">
                {event.tagline}
              </p>
            </div>

            <div className="mt-3 flex items-center gap-2 text-sm font-medium text-[#452b57] sm:text-base">
              {isExpanded ? <ChevronUp className="h-6 w-6" /> : <ChevronDown className="h-6 w-6" />}
              <span>{isExpanded ? "Less" : "More"}</span>
            </div>
          </div>

          <div className="relative h-36 w-36 shrink-0 overflow-hidden rounded-[16px] border-2 border-white/45 sm:h-44 sm:w-44 md:h-56 md:w-56">
            <Image
              src={event.image}
              alt={event.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 144px, (max-width: 768px) 176px, 224px"
            />
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
          <div className="rounded-b-[22px] bg-[#e2c7ef] px-4 pb-5 pt-4 text-[#452b57] sm:px-5 sm:pb-6 sm:pt-5">
            <p className="text-sm leading-relaxed sm:text-base">{event.description}</p>

            {hasLinks ? (
              <div className="mt-4 flex flex-wrap gap-3">
                {event.links?.map((link) => (
                  <a
                    key={`${event.id}-${link.label}`}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center gap-3 rounded-full border border-[#452b57]/20 bg-white/70 px-4 py-2 font-display text-xl uppercase tracking-wide text-[#452b57] transition-colors hover:bg-white sm:px-5 sm:py-2.5 sm:text-2xl md:px-6 md:py-3 md:text-3xl"
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
    <main className="min-h-screen overflow-x-hidden bg-[linear-gradient(180deg,_#5a3a72_0%,_#4d3163_38%,_#452b57_72%,_#3e254f_100%)]">
      <Header />

      <section className="pb-16 pt-24 sm:pb-20 sm:pt-28">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto w-full max-w-5xl">
            <div>
              <div className="mb-4 flex items-center justify-between gap-3 sm:gap-6">
                <div className="flex min-w-0 items-center gap-3 sm:flex-wrap sm:gap-6">
                  {eventsPageData.seasons.map((season) => {
                    const isSelected = season.id === selectedSeason.id

                    return (
                      <button
                        key={season.id}
                        type="button"
                        onClick={() => setSelectedSeasonId(season.id)}
                        className={`shrink-0 px-0 py-0 font-display text-2xl uppercase tracking-wide leading-none transition-colors sm:text-3xl md:text-[2.5rem] ${
                          isSelected ? "text-white" : "text-[#e6a6fd]"
                        }`}
                      >
                        {season.buttonLabel}
                      </button>
                    )
                  })}
                </div>

                <div className="relative w-[140px] shrink-0 sm:w-full sm:max-w-[170px]">
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

      <Footer />
    </main>
  )
}
