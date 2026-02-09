"use client"

import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"])
  const logoY = useTransform(scrollYProgress, [0, 1], ["-50%", "10%"])

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 z-0"
    >
      <motion.div 
        className="absolute inset-0"
        style={{ y: backgroundY }}
      >
        <Image
          src="/images/hero.png"
          alt="Met Game Studios - Gaming cityscape with controller building"
          fill
          className="object-cover scale-110"
          priority
        />
      </motion.div>

      {/* Optional overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/20" />

      <motion.div
        className="absolute left-4 sm:left-8 md:left-28 top-1/2 w-full h-1/2 sm:h-2/3 z-10"
        style={{ y: logoY }}
      >
        <div className="relative h-full w-full">
          <Image
            src="/images/mgs-transparent-logo.png"
            alt="Met Game Studios Logo"
            fill
            className="object-contain object-left"
            priority
          />
        </div>
      </motion.div>
    </section>
  )
}
