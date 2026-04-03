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
          sizes="100vw"
        />
      </motion.div>

      {/* Optional overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/20" />

      <motion.div
        className="absolute left-4 sm:left-8 md:left-28 top-1/2 w-full h-1/2 sm:h-2/3 z-10"
        style={{ y: logoY }}
      >
        <motion.div
          className="relative h-full w-full"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/images/mgs-transparent-logo.png"
            alt="Met Game Studios Logo"
            fill
            className="object-contain object-left drop-shadow-[0_16px_22px_rgba(0,0,0,0.38)]"
            priority
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
