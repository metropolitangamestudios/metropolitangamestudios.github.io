import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { GamesSection } from "@/components/games-section"
import { Footer } from "@/components/footer"

export default function Home() {
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
        <HeroSection />
        <AboutSection />
        <GamesSection />
        <Footer />
      </div>
    </main>
  )
}
