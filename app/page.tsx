import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { EventsSection } from "@/components/events-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#412c58] overflow-x-hidden">
      <Header />
      <HeroSection />
      <AboutSection />
      <EventsSection />
      <Footer />
    </main>
  )
}
