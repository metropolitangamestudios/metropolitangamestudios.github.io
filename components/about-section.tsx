"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const images = [
  "/images/PS14.jpg",
  "/images/PS15.jpg",
]

export function AboutSection() {
  const ref = useRef<HTMLElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMdUp, setIsMdUp] = useState(false)
  const touchStartXRef = useRef<number | null>(null)
  const touchStartYRef = useRef<number | null>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // On small screens, disable parallax offsets so stacked content doesn't visually overlap.
  const y = useTransform(scrollYProgress, [0, 1], isMdUp ? [60, -60] : [0, 0])
  const textY = useTransform(scrollYProgress, [0, 1], isMdUp ? [100, -100] : [0, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])

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
    <section ref={ref} className="relative pb-6 my-8 sm:my-16 mb-8 overflow-visible z-10">
      <div className="absolute -inset-y-16 sm:-inset-y-32 inset-x-0 bg-[#D4C4E8] transform -skew-y-2 origin-top-left"></div>
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
          <motion.div 
            style={{ y, opacity }}
            className="relative w-full rounded-lg aspect-video overflow-hidden mt-0 md:-mt-24 min-h-[250px] sm:min-h-[400px] md:min-h-[600px] max-w-[700px] shadow-2xl group touch-pan-y"
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
                  alt={`About Us Image ${currentIndex + 1}`}
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

          <motion.div style={{ y: textY }} className="space-y-4 sm:space-y-6">
            <h2 className="mb-2 sm:mb-0 md:-mb-6 text-[3rem] sm:text-[6rem] md:text-[9rem] lg:text-[11rem] font-display font-bold text-[#37214d] uppercase leading-[0.9] mt-0 md:-mt-10">
              About Us
            </h2>
            <p className="text-base sm:text-xl md:text-2xl text-[#4A3B5C] leading-relaxed font-sans">
              We are a student run game studio aiming to create an incredible, playable game demo, provide students with opportunities to gain experience in a game studio environment, and develop portfolio-ready work. This all comes together to help prepare students for the games industry in their desired field!
 We’re the newly re‑branded student game development group at TMU, building on our previous success as the Game Makers Union
            </p>
            <Button
              size="lg"
              className="text-xl sm:text-3xl md:text-4xl bg-[#6B5580] hover:bg-[#5A4670] text-white font-display uppercase tracking-wide px-5 sm:px-10 py-3 sm:py-6 pt-4 sm:pt-8 !mt-2 sm:!mt-4"
            >
              Read More
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
