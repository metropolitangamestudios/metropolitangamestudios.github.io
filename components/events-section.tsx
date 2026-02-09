"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const images = [
  "/images/KDS07302.jpg",
  "/images/KDS07106.jpg",
  "/images/KDS06990.jpg",
]

export function EventsSection() {
  const ref = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMdUp, setIsMdUp] = useState(false)
  const touchStartXRef = useRef<number | null>(null)
  const touchStartYRef = useRef<number | null>(null)

  const { scrollYProgress } = useScroll({
    // Track the actual content, not the padded section,
    // so parallax/opacity start when the content is on screen.
    target: contentRef,
    offset: ["start end", "center center"],
  })

  // On small screens, disable parallax offsets so stacked content doesn't visually overlap.
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

    // Ignore mostly-vertical gestures (page scroll).
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
    <section ref={ref} className="pt-24 sm:pt-32 md:pt-40 pb-12 sm:pb-24 bg-[#412c58] text-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div ref={contentRef} className="grid md:grid-cols-2 gap-6 sm:gap-12 items-center">
          <motion.div 
            style={{ y, opacity }}
            className="relative w-full rounded-lg aspect-video overflow-hidden order-1 md:order-2 mt-0 md:mt-0 min-h-[220px] sm:min-h-[360px] md:min-h-[520px] max-w-[640px] shadow-2xl group touch-pan-y"
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
                  alt={`Past Event Image ${currentIndex + 1}`}
                  fill
                  className="object-cover"
                  priority={currentIndex === 0}
                />
              </motion.div>
            </AnimatePresence>
            
            <button 
              onClick={(e) => { e.preventDefault(); prevSlide(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors z-20 opacity-0 group-hover:opacity-100"
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={(e) => { e.preventDefault(); nextSlide(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors z-20 opacity-0 group-hover:opacity-100"
              aria-label="Next slide"
            >
              <ChevronRight size={24} />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? "bg-white w-4" : "bg-white/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>

          <motion.div style={{ y: textY }} className="space-y-4 sm:space-y-6 order-2 md:order-1 md:pt-10">
            <h2 className="text-[3.5rem] sm:text-[7rem] md:text-[9rem] lg:text-[11rem] font-display font-bold uppercase leading-[0.85]">
              Past
              <br />
              Events
            </h2>
            <p className="text-base sm:text-xl md:text-2xl text-[#D4C4E8] leading-relaxed font-sans">
              From playtests to panels, our events are where ideas turn into prototypes. Catch the best moments and what we learned.
            </p>
            <Button
              asChild
              size="lg"
              className="text-xl sm:text-3xl md:text-4xl bg-[#6B5580] hover:bg-[#5A4670] text-white font-display uppercase tracking-wide px-5 sm:px-10 py-3 sm:py-6 pt-4 sm:pt-8 !mt-2 sm:!mt-4"
            >
              <Link href="/events">Read More</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
