"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import gamesDataJson from "@/data/games.json"

interface GameLink {
  label: string
  href: string
}

interface GameEntry {
  id: string
  title: string
  season: string
  status: string
  tagline: string
  description: string
  image: string
  imageAlt: string
  links?: GameLink[]
}

interface GamesPageData {
  eyebrow: string
  intro: string
  featuredGameIds: string[]
  games: GameEntry[]
  archiveWall: string[]
}

const gamesData = gamesDataJson as GamesPageData

function GameCard({ game }: { game: GameEntry }) {
  return (
    <article className="overflow-hidden rounded-[24px] border border-white/15 bg-[#cba3dd] shadow-[0_18px_50px_rgba(27,11,37,0.18)]">
      <div className="relative flex aspect-[4/3] items-center justify-center bg-[#dfd0e9] p-6 sm:p-8">
        <Image
          src={game.image}
          alt={game.imageAlt}
          fill
          className="object-contain p-6 sm:p-8"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="space-y-4 p-5 text-[#452b57] sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-white/70 px-3 py-1 font-display text-sm uppercase tracking-wide sm:text-base md:text-lg">
            {game.season}
          </span>
          <span className="rounded-full border border-[#452b57]/15 bg-[#e9daf2] px-3 py-1 font-display text-sm uppercase tracking-wide sm:text-base md:text-lg">
            {game.status}
          </span>
        </div>

        <div>
          <h2 className="font-display text-4xl font-bold uppercase leading-none sm:text-5xl md:text-6xl">
            {game.title}
          </h2>
          <p className="mt-2 text-sm font-medium leading-relaxed sm:text-base">{game.tagline}</p>
        </div>

        <p className="text-sm leading-relaxed sm:text-base">{game.description}</p>

        {game.links?.length ? (
          <div className="flex flex-wrap gap-3 pt-1">
            {game.links.map((link) => (
              <Link
                key={`${game.id}-${link.label}`}
                href={link.href}
                className="inline-flex items-center gap-2 rounded-full border border-white bg-[#6b5580] px-3 py-1.5 font-display text-lg uppercase tracking-wide text-white transition-colors hover:bg-[#5a4670] sm:px-4 sm:py-2 sm:text-xl md:text-2xl"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="h-5 w-5 md:h-6 md:w-6" />
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  )
}

export function GamesPageClient() {
  const featuredGames = useMemo(() => {
    return gamesData.featuredGameIds
      .map((id) => gamesData.games.find((game) => game.id === id))
      .filter((game): game is GameEntry => Boolean(game))
  }, [])

  const [selectedGameId, setSelectedGameId] = useState(featuredGames[0]?.id || gamesData.games[0]?.id)

  const selectedGame = useMemo(() => {
    return gamesData.games.find((game) => game.id === selectedGameId) || gamesData.games[0]
  }, [selectedGameId])

  return (
    <main className="min-h-screen overflow-x-hidden bg-[linear-gradient(180deg,_#5a3a72_0%,_#4d3163_38%,_#452b57_72%,_#3e254f_100%)]">
      <Header />

      <section className="pb-20 pt-24 sm:pt-28">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px flex-1 bg-white/30" />
              <p className="font-display text-lg uppercase tracking-[0.22em] text-[#e6a6fd] sm:text-2xl">
                {gamesData.eyebrow}
              </p>
              <span className="h-px flex-1 bg-white/30" />
            </div>

            <h1 className="text-center font-display text-[3rem] font-bold uppercase leading-[0.88] sm:text-[5rem] md:text-[7rem] lg:text-[8.5rem]">
              <span className="text-[#e6a6fd]">Our</span>{" "}
              <span className="text-white">Games</span>
            </h1>

            <p className="mx-auto mt-5 max-w-4xl text-center text-base leading-relaxed text-[#eadcf4] sm:text-xl md:text-2xl">
              {gamesData.intro}
            </p>

            <div className="mt-8 border-t-2 border-white/80" />

            {selectedGame ? (
              <section className="mt-10 rounded-[30px] border border-white/15 bg-[linear-gradient(135deg,_rgba(203,163,221,0.95)_0%,_rgba(174,133,192,0.95)_100%)] p-4 shadow-[0_30px_80px_rgba(21,8,31,0.25)] sm:p-6 md:p-8">
                <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-center">
                  <div className="space-y-5 text-[#452b57]">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-white px-4 py-1.5 font-display text-base uppercase tracking-wide text-[#452b57] sm:text-lg md:text-xl">
                        {selectedGame.season}
                      </span>
                      <span className="rounded-full border border-[#452b57]/15 bg-white/55 px-4 py-1.5 font-display text-base uppercase tracking-wide text-[#452b57] sm:text-lg md:text-xl">
                        {selectedGame.status}
                      </span>
                    </div>

                    <div>
                      <p className="font-display text-lg uppercase tracking-[0.3em] text-white sm:text-xl md:text-2xl">
                        Featured Shelf
                      </p>
                      <h2 className="mt-3 font-display text-5xl font-bold uppercase leading-none sm:text-6xl md:text-7xl lg:text-8xl">
                        {selectedGame.title}
                      </h2>
                      <p className="mt-3 max-w-2xl text-base font-medium leading-relaxed sm:text-lg md:text-xl">
                        {selectedGame.tagline}
                      </p>
                    </div>

                    <p className="max-w-2xl text-sm leading-relaxed sm:text-base md:text-lg">
                      {selectedGame.description}
                    </p>

                    <div className="flex flex-wrap gap-3 pt-1">
                      {selectedGame.links?.map((link) => (
                        <Link
                          key={`${selectedGame.id}-${link.label}`}
                          href={link.href}
                          className="inline-flex items-center gap-2 rounded-full border-2 border-white bg-[#6b5580] px-4 py-2 font-display text-xl uppercase tracking-wide text-white transition-colors hover:bg-[#5a4670] sm:px-5 sm:py-2.5 sm:text-2xl md:text-3xl"
                        >
                          <span>{link.label}</span>
                          <ArrowUpRight className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[24px] bg-[#eadff0] p-4 shadow-inner sm:p-5 md:p-6">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] bg-[#dfd0e9]">
                      <Image
                        src={selectedGame.image}
                        alt={selectedGame.imageAlt}
                        fill
                        className="object-contain p-6 sm:p-8 md:p-10"
                        sizes="(max-width: 768px) 100vw, 45vw"
                        priority
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex gap-3 overflow-x-auto pb-1">
                  {featuredGames.map((game) => {
                    const isActive = game.id === selectedGame.id

                    return (
                      <button
                        key={game.id}
                        type="button"
                        onClick={() => setSelectedGameId(game.id)}
                        className={`min-w-[180px] rounded-[18px] border px-4 py-3 text-left transition-colors sm:min-w-[220px] ${
                          isActive
                            ? "border-white bg-white text-[#452b57]"
                            : "border-white/20 bg-[#b88fd1]/70 text-white hover:bg-[#c39bda]"
                        }`}
                      >
                        <p className="font-display text-sm uppercase tracking-[0.22em] opacity-80 sm:text-base md:text-lg">
                          {game.season}
                        </p>
                        <p className="mt-2 font-display text-2xl uppercase leading-none sm:text-3xl md:text-4xl">
                          {game.title}
                        </p>
                      </button>
                    )
                  })}
                </div>
              </section>
            ) : null}

            <section className="mt-14">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="font-display text-lg uppercase tracking-[0.22em] text-[#e6a6fd] sm:text-2xl">
                    Prototype Archive
                  </p>
                  <h2 className="mt-2 font-display text-3xl font-bold uppercase leading-none text-white sm:text-5xl md:text-6xl">
                    Project Library
                  </h2>
                </div>
                <p className="hidden max-w-xl text-right text-base leading-relaxed text-[#eadcf4] md:block">
                  Each card is ready for final game summaries, team credits, downloadable builds, or case-study links.
                </p>
              </div>

              <div className="mt-6 border-t-2 border-white/30 pt-6 sm:pt-8" />

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                {gamesData.games.map((game) => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
            </section>

            <section className="mt-14 pb-4">
              <p className="font-display text-lg uppercase tracking-[0.22em] text-[#e6a6fd] sm:text-2xl">
                Visual Archive
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold uppercase leading-none text-white sm:text-5xl md:text-6xl">
                Artwork Wall
              </h2>
              <div className="mt-6 border-t-2 border-white/30 pt-6 sm:pt-8" />

              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
                {gamesData.archiveWall.map((image, index) => (
                  <div
                    key={`${image}-${index}`}
                    className="relative aspect-square overflow-hidden rounded-[22px] border border-white/12 bg-[#dfd0e9]"
                  >
                    <Image
                      src={image}
                      alt={`Game archive artwork ${index + 1}`}
                      fill
                      className="object-contain p-4"
                      sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 20vw"
                    />
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
