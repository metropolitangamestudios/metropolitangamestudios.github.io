"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"

import { Footer } from "@/components/footer"
import { Header } from "@/components/header"

interface JamGame {
  id: number
  title: string
  href: string
  award?: string
}

interface JamCategory {
  title: string
  theme: string
  yearLabel: string
  games: JamGame[]
}

const EMBED_RETRY_DELAYS = [2500, 5000, 8000]

const jamCategories: JamCategory[] = [
  {
    title: "2026 MGS x BMO Winter GameJam",
    theme: "Risk vs Reward",
    yearLabel: "Winter 2026",
    games: [
      { id: 4297890, title: "Hyper Comet", href: "https://seth-britton.itch.io/hyper-comet", award: "Winner!" },
      { id: 4307553, title: "Devil in the Chamber", href: "https://stormwhy.itch.io/devil-in-the-chamber" },
      { id: 4306920, title: "Last Bite", href: "https://lalasmack.itch.io/last-bite" },
      { id: 4306643, title: "Holo Raider", href: "https://knoxulla.itch.io/holo-raider" },
      { id: 4303264, title: "Golden Gavel", href: "https://the-noble-devil.itch.io/golden-gavel" },
      { id: 4304838, title: "Concrete Sunset", href: "https://hyaesia.itch.io/concrete-sunset" },
      { id: 4307904, title: "Heart of the Cards", href: "https://redsybil.itch.io/heart-of-the-cards" },
      { id: 4307583, title: "Money On The Line", href: "https://1oopy.itch.io/money-on-the-line" },
      { id: 4307984, title: "Riskfall", href: "https://tankd3stroyer.itch.io/riskfall" },
      {
        id: 4307996,
        title: "Imperishable Bullet Disentanglement",
        href: "https://cheesychurros21.itch.io/imperishable-bullet-disentanglement-web-edition",
      },
      { id: 4307928, title: "Dance, Debtor, Dance!", href: "https://jarfield.itch.io/dance-debtor-dance" },
      { id: 4307582, title: "The Sleeper", href: "https://speelbarrow.itch.io/sleeper-demo" },
      { id: 4305918, title: "SpaceQuiz", href: "https://lemonsnack.itch.io/spacequiz" },
    ],
  },
  {
    title: "2025 Fall GameJam",
    theme: "Something Lurks Below",
    yearLabel: "Fall 2025",
    games: [
      { id: 4159801, title: "Syncope", href: "https://kegnation.itch.io/syncope", award: "Winner!" },
      { id: 4190180, title: "Abyssum", href: "https://akkoxs.itch.io/abyssum" },
      { id: 4157883, title: "Crunch Culture", href: "https://chromechameleon.itch.io/crunchculture" },
      { id: 4155763, title: "Bump in the Basement", href: "https://seth-britton.itch.io/bump-in-the-basement" },
      { id: 4159798, title: "Echoes Underfoot", href: "https://cheesychurros21.itch.io/echoes-underfoot" },
    ],
  },
  {
    title: "2025 Winter GameJam",
    theme: "Growth",
    yearLabel: "Winter 2025",
    games: [
      { id: 3254643, title: "Fandemonium", href: "https://natsirtmo.itch.io/fandemonium" },
      { id: 3256674, title: "Sprout", href: "https://voxaidna.itch.io/sprout" },
      { id: 3255333, title: "Raising the Dead", href: "https://thereanimator57.itch.io/raising-the-dead" },
      { id: 3255799, title: "EvoCavern", href: "https://obsidiosteel.itch.io/evocavern" },
      { id: 3267618, title: "How NOT to train your dragon", href: "https://jarit.itch.io/htntyd" },
    ],
  },
  {
    title: "2024 Fall GameJam",
    theme: "Horror",
    yearLabel: "Fall 2024",
    games: [
      { id: 3049784, title: "RAVE", href: "https://dennsi.itch.io/rave" },
      { id: 3049305, title: "Dead Centre", href: "https://thereanimator57.itch.io/deadcentre" },
      { id: 3050556, title: "Anomaly", href: "https://taiyo10.itch.io/anomaly" },
      { id: 3049982, title: "The True Guide", href: "https://pt50hgm.itch.io/thetrueguide" },
      { id: 3050366, title: "The Lot", href: "https://natsirtmo.itch.io/the-lot" },
      { id: 3049677, title: "Clocking Out", href: "https://obsidiosteel.itch.io/clocking-out" },
    ],
  },
  {
    title: "2023 GMU LibreGameFest GameJam",
    theme: "Starting Fresh",
    yearLabel: "2023 Showcase",
    games: [
      { id: 2288630, title: "Guerilla Gardener", href: "https://guerillagardener.itch.io/guerilla-gardener" },
      { id: 2286503, title: "30 Seconds to Pack", href: "https://thai-duong.itch.io/30-seconds-to-pack" },
      { id: 2287318, title: "Fresh Movers Co.", href: "https://pt50hgm.itch.io/fresh-movers-co" },
      { id: 2288449, title: "Duckulator", href: "https://norinerd.itch.io/duckulator" },
      { id: 2288589, title: "CHROME-A", href: "https://artemisyl.itch.io/chrome-a" },
    ],
  },
  {
    title: "2021 GMU x IEEE CIC Indie GameJam",
    theme: "Bird",
    yearLabel: "2021 Showcase",
    games: [
      { id: 1325224, title: "Brib Video", href: "https://nor0i.itch.io/brib-video" },
      { id: 1331748, title: "Project Boids", href: "https://bilal-a-g.itch.io/project-boids" },
      { id: 1332538, title: "SteelWings", href: "https://argo.itch.io/steelwings" },
      { id: 1324929, title: "Pigeon Decision", href: "https://xavierwehrli.itch.io/pigeon-decision" },
    ],
  },
]

function ItchEmbedCard({
  game,
}: {
  game: JamGame
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [shouldLoad, setShouldLoad] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    const card = cardRef.current
    if (!card || shouldLoad) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry?.isIntersecting) return

        setShouldLoad(true)
        observer.disconnect()
      },
      {
        rootMargin: "150px 0px",
        threshold: 0.1,
      }
    )

    observer.observe(card)

    return () => observer.disconnect()
  }, [shouldLoad])

  useEffect(() => {
    if (!shouldLoad || hasLoaded || retryCount >= EMBED_RETRY_DELAYS.length) return

    const timeout = window.setTimeout(() => {
      setRetryCount((currentRetryCount) => currentRetryCount + 1)
    }, EMBED_RETRY_DELAYS[retryCount])

    return () => window.clearTimeout(timeout)
  }, [hasLoaded, retryCount, shouldLoad])

  const embedSrc = `https://itch.io/embed/${game.id}?linkback=true&border_width=0&bg_color=241132&fg_color=f7f0ff&link_color=e6a6fd&attempt=${retryCount}`
  const isWinner = Boolean(game.award)

  return (
    <article
      className={`relative overflow-hidden rounded-[24px] border bg-[#f1e6f8]/10 p-3 shadow-[0_22px_50px_rgba(21,8,31,0.2)] backdrop-blur-sm sm:p-4 ${
        isWinner ? "border-white shadow-[0_0_0_2px_rgba(255,255,255,0.45),0_22px_50px_rgba(21,8,31,0.2)]" : "border-white/12"
      }`}
    >
      {isWinner ? (
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[24px]">
          <div className="absolute inset-y-0 left-[-30%] w-[22%] bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.04)_20%,rgba(255,255,255,0.28)_50%,rgba(255,255,255,0.04)_80%,transparent_100%)] [animation:winner-shine_4.8s_ease-in-out_infinite]" />
        </div>
      ) : null}

      <div ref={cardRef} className="overflow-hidden rounded-[18px] border border-white/10 bg-[#241132]">
        {shouldLoad ? (
          <iframe
            title={`${game.title} itch.io embed`}
            src={embedSrc}
            width="100%"
            height="167"
            loading="lazy"
            className="block w-full"
            onLoad={() => setHasLoaded(true)}
            onError={() => {
              if (retryCount < EMBED_RETRY_DELAYS.length) {
                setRetryCount((currentRetryCount) => currentRetryCount + 1)
              }
            }}
          >
            <a href={game.href}>{game.title}</a>
          </iframe>
        ) : (
          <div className="flex min-h-[167px] flex-col items-start justify-between bg-[linear-gradient(135deg,_#241132_0%,_#3d1d53_100%)] p-5">
            <div>
              <p className="font-display text-sm uppercase tracking-[0.22em] text-[#f3c6ff]">Itch.io Embed</p>
              <h3 className="mt-3 font-display text-3xl font-bold uppercase leading-none text-white sm:text-4xl">
                {game.title}
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-[#eadcf4] sm:text-base">
                This embed loads only when it scrolls into view, which keeps the page from requesting every Itch card up front.
              </p>
            </div>

            <div className="mt-5 rounded-full border border-white/20 bg-white/10 px-4 py-2 font-display text-sm uppercase tracking-[0.18em] text-[#f7d5ff] sm:text-base">
              Waiting On Scroll
            </div>
          </div>
        )}

        {shouldLoad && !hasLoaded ? (
          <div className="border-t border-white/10 bg-[#2c1640] px-5 py-3 text-sm text-[#eadcf4]">
            {retryCount >= EMBED_RETRY_DELAYS.length
              ? "Embed is taking longer than expected. You can use Open Itch while the browser keeps trying."
              : retryCount > 0
              ? `Retrying embed automatically (${retryCount}/${EMBED_RETRY_DELAYS.length})...`
              : "Loading embed..."}
          </div>
        ) : null}
      </div>

      <div className="flex items-center justify-between gap-3 px-1 pb-1 pt-4">
        <div>
          <h3 className="font-display text-3xl font-bold uppercase leading-none text-white sm:text-4xl md:text-5xl">
            {game.title}
          </h3>
          {game.award ? (
            <p className="mt-2 text-sm font-medium uppercase tracking-[0.22em] text-[#fff1a8] sm:text-base">
              {game.award}
            </p>
          ) : null}
        </div>
        <Link
          href={game.href}
          target="_blank"
          className="shrink-0 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium uppercase tracking-[0.18em] text-[#f7d5ff] transition-colors hover:bg-white/20 sm:text-base"
        >
          Open Itch.IO
        </Link>
      </div>
    </article>
  )
}

export function GamesPageClient() {
  const totalGames = jamCategories.reduce((count, jam) => count + jam.games.length, 0)
  const [openJamIndices, setOpenJamIndices] = useState<number[]>([0])

  return (
    <main className="min-h-screen overflow-x-hidden bg-[linear-gradient(180deg,_#5a3a72_0%,_#4d3163_24%,_#3a214d_58%,_#241132_100%)]">
      <Header />

      <section className="pb-20 pt-24 sm:pt-28">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px flex-1 bg-white/30" />
              <p className="font-display text-lg uppercase tracking-[0.22em] text-[#e6a6fd] sm:text-2xl">
                Itch.io Archive
              </p>
              <span className="h-px flex-1 bg-white/30" />
            </div>

            <h1 className="text-center font-display text-[3rem] font-bold uppercase leading-[0.88] sm:text-[5rem] md:text-[7rem] lg:text-[8.5rem]">
              <span className="text-[#e6a6fd]">Game Jam</span>{" "}
              <span className="text-white">Library</span>
            </h1>

            <p className="mx-auto mt-5 max-w-4xl text-center text-base leading-relaxed text-[#eadcf4] sm:text-xl md:text-2xl">
              Browse {totalGames} Met Game Studio jam submissions, grouped by event.
            </p>

            <div className="mt-5 flex justify-center">
              <Link
                href="https://metgamestudio.itch.io/"
                target="_blank"
                className="rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium uppercase tracking-[0.18em] text-[#f7d5ff] transition-colors hover:bg-white/20 sm:text-base"
              >
                Visit Metropolitan Game Studios' Itch.io Page
              </Link>
            </div>

            <div className="mt-14 space-y-10">
              {jamCategories.map((jam, index) => {
                const isOpen = openJamIndices.includes(index)

                return (
                <section
                  key={`${jam.title}-${jam.theme}`}
                  className="rounded-[30px] border border-white/12 bg-[linear-gradient(135deg,_rgba(241,230,248,0.1)_0%,_rgba(130,84,161,0.12)_100%)] p-5 shadow-[0_26px_70px_rgba(18,7,27,0.22)] backdrop-blur-sm sm:p-7 md:p-8"
                >
                  <button
                    type="button"
                    onClick={() => {
                      setOpenJamIndices((currentIndices) =>
                        currentIndices.includes(index)
                          ? currentIndices.filter((currentIndex) => currentIndex !== index)
                          : [...currentIndices, index]
                      )
                    }}
                    className="flex w-full flex-col gap-4 text-left md:flex-row md:items-end md:justify-between"
                    aria-expanded={isOpen}
                  >
                    <div>
                      <p className="text-sm font-medium uppercase tracking-[0.24em] text-[#f3c6ff] sm:text-base">
                        {jam.yearLabel}
                      </p>
                      <h2 className="mt-3 font-display text-3xl font-bold uppercase leading-none text-white sm:text-5xl md:text-6xl">
                        {jam.title}
                      </h2>
                      <p className="mt-3 text-base uppercase tracking-[0.18em] text-[#eadcf4] sm:text-lg">
                        Theme: <span className="text-[#f3c6ff]">{jam.theme}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-3 self-start md:self-auto">
                      <div className="rounded-full border border-white/15 bg-white/10 px-4 py-2 font-display text-sm uppercase tracking-[0.18em] text-white sm:text-base">
                        {jam.games.length} games
                      </div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white">
                        <ChevronDown className={`h-6 w-6 transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`} />
                      </div>
                    </div>
                  </button>

                  {isOpen ? (
                    <div className="mt-6 border-t border-white/15 pt-6">
                      <div className="grid gap-5 lg:grid-cols-2">
                        {jam.games.map((game) => (
                          <ItchEmbedCard key={game.id} game={game} />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </section>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
