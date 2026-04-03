"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const images = [
  "/images/games/22+Z45.png",
  "/images/games/6CjnSq.png",
  "/images/games/DRNLIu.png",
  "/images/games/hGGlk5.png",
  "/images/games/MLM5ut.png",
  "/images/games/PFNaea.png",
]

export function GamesSection() {
  const ref = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMdUp, setIsMdUp] = useState(false)
  const touchStartXRef = useRef<number | null>(null)
  const touchStartYRef = useRef<number | null>(null)

  const { scrollYProgress } = useScroll({
    target: contentRef,
    offset: ["start end", "center center"],
  })

  const y = useTransform(scrollYProgress, [0.15, 0.85], isMdUp ? [50, -50] : [0, 0])
  const textY = useTransform(scrollYProgress, [0.15, 0.85], isMdUp ? [80, -80] : [0, 0])
  const opacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0]
    if (!t) return
    touchStartXRef.current = t.clientX
    touchStartYRef.current = t.clientY
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    const startX = touchStartXRef.current
    const startY = touchStartYRef.current
    touchStartXRef.current = null
    touchStartYRef.current = null

    const t = e.changedTouches[0]
    if (!t || startX === null || startY === null) return

    const deltaX = t.clientX - startX
    const deltaY = t.clientY - startY

    if (Math.abs(deltaY) > 60 || Math.abs(deltaX) < 40) return

    if (deltaX < 0) nextSlide()
    else prevSlide()
  }

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [currentIndex])

  useEffect(() => {
    if (typeof window === "undefined") return

    const media = window.matchMedia("(min-width: 768px)")
    const update = () => setIsMdUp(media.matches)
    update()

    media.addEventListener("change", update)
    return () => media.removeEventListener("change", update)
  }, [])

  return (
    <section ref={ref} className="bg-[#412c58] pb-12 pt-24 text-white overflow-hidden sm:pb-24 sm:pt-32 md:pt-40">
      <div className="container mx-auto px-4 sm:px-6">
        <div ref={contentRef} className="grid items-center gap-6 md:grid-cols-2 sm:gap-12">
          <motion.div
            style={{ y, opacity }}
            className="group relative order-1 mt-0 aspect-video min-h-[220px] w-full max-w-[640px] overflow-hidden rounded-lg bg-[#d7cae6] shadow-2xl touch-pan-y sm:min-h-[360px] md:order-2 md:mt-0 md:min-h-[520px]"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <AnimatePresence initial={false}>
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={images[currentIndex]}
                  alt={`Club game artwork ${currentIndex + 1}`}
                  fill
                  className="object-cover"
                  priority={currentIndex === 0}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>
            </AnimatePresence>

            <button
              onClick={(e) => { e.preventDefault(); prevSlide() }}
              className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white opacity-0 transition-colors hover:bg-black/50 group-hover:opacity-100"
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={(e) => { e.preventDefault(); nextSlide() }}
              className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white opacity-0 transition-colors hover:bg-black/50 group-hover:opacity-100"
              aria-label="Next slide"
            >
              <ChevronRight size={24} />
            </button>

            <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 w-2 rounded-full transition-all ${
                    index === currentIndex ? "w-4 bg-white" : "bg-white/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>

          <motion.div style={{ y: textY }} className="order-2 space-y-4 sm:space-y-6 md:order-1 md:pt-10">
            <h2 className="text-[3.5rem] font-display font-bold uppercase leading-[0.85] sm:text-[7rem] md:text-[9rem] lg:text-[11rem]">
              Our
              <br />
              Games
            </h2>
            <p className="font-sans text-base leading-relaxed text-[#D4C4E8] sm:text-xl md:text-2xl">
              Explore the games our club has brought to life across past seasons, from polished class projects to bold experimental prototypes built by multidisciplinary teams.
            </p>
            <Button
              asChild
              size="lg"
              className="!mt-2 border-2 border-white bg-[#6B5580] px-5 py-3 pt-4 font-display text-xl uppercase tracking-wide text-white hover:bg-[#5A4670] sm:!mt-4 sm:px-10 sm:py-6 sm:pt-8 sm:text-3xl md:text-4xl"
            >
              <Link href="/games">See Previous Games</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
