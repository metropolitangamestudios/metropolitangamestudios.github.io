"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TeamMemberCard, type TeamMember } from "@/components/team-member-card"

// Team data
const directors: TeamMember[] = [
  {
    id: "1",
    name: "JOHN DOE",
    role: "PRESIDENT",
    bio: "Hello my name is John lorem blah blah blah hello hello",
    image: "/images/icon.jpeg",
    socials: {
      twitter: "#",
      discord: "#",
      youtube: "#",
      twitch: "#",
    },
  },
  {
    id: "2",
    name: "JOHN DOE",
    role: "PRESIDENT",
    bio: "Hello my name is John lorem blah blah blah hello hello",
    image: "/images/icon.jpeg",
    socials: {
      twitter: "#",
      discord: "#",
      youtube: "#",
      twitch: "#",
    },
  }
]

const developmentTeam: TeamMember[] = [
  {
    id: "1",
    name: "JOHN DOE",
    role: "PRESIDENT",
    bio: "Hello my name is John lorem blah blah hello hello",
    image: "/images/icon.jpeg",
    socials: { twitter: "#", discord: "#", youtube: "#", twitch: "#" },
  },
  {
    id: "2",
    name: "JOHN DOE",
    role: "PRESIDENT",
    bio: "Hello my name is John lorem blah blah hello hello",
    image: "/images/icon.jpeg",
    socials: { twitter: "#", discord: "#", youtube: "#", twitch: "#" },
  },
  {
    id: "3",
    name: "JOHN DOE",
    role: "PRESIDENT",
    bio: "Hello my name is John lorem blah blah hello hello",
    image: "/images/icon.jpeg",
    socials: { twitter: "#", discord: "#", youtube: "#", twitch: "#" },
  },
  {
    id: "4",
    name: "JOHN DOE",
    role: "PRESIDENT",
    bio: "Hello my name is John lorem blah blah hello hello",
    image: "/images/icon.jpeg",
    socials: { twitter: "#", discord: "#", youtube: "#", twitch: "#" },
  },
  {
    id: "5",
    name: "JOHN DOE",
    role: "PRESIDENT",
    bio: "Hello my name is John lorem blah blah hello hello",
    image: "/images/icon.jpeg",
    socials: { twitter: "#", discord: "#", youtube: "#", twitch: "#" },
  },
  {
    id: "6",
    name: "JOHN DOE",
    role: "PRESIDENT",
    bio: "Hello my name is John lorem blah blah hello hello",
    image: "/images/icon.jpeg",
    socials: { twitter: "#", discord: "#", youtube: "#", twitch: "#" },
  },
]

const operationsTeam: TeamMember[] = [
  {
    id: "1",
    name: "JOHN DOE",
    role: "PRESIDENT",
    bio: "Hello my name is John lorem blah blah hello hello",
    image: "/images/icon.jpeg",
    socials: { twitter: "#", discord: "#", youtube: "#", twitch: "#" },
  },
  {
    id: "2",
    name: "JOHN DOE",
    role: "PRESIDENT",
    bio: "Hello my name is John lorem blah blah hello hello",
    image: "/images/icon.jpeg",
    socials: { twitter: "#", discord: "#", youtube: "#", twitch: "#" },
  },
  {
    id: "3",
    name: "JOHN DOE",
    role: "PRESIDENT",
    bio: "Hello my name is John lorem blah blah hello hello",
    image: "/images/icon.jpeg",
    socials: { twitter: "#", discord: "#", youtube: "#", twitch: "#" },
  },
]

export default function MeetTheTeam() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-[#412c58] pt-20 sm:pt-24 pb-6 sm:pb-8 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-display font-bold text-[#dca8ff] text-center mb-0 leading-none">
            MEET THE TEAM!
          </h1>
        </div>
      </section>

      {/* Directors Section */}
      <section className="relative bg-[#412c58] pt-0 pb-10 sm:pb-16 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <h2 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white text-center mb-6 sm:mb-8 leading-none">
            DIRECTORS
          </h2>

          <div className="w-full max-w-3xl mx-auto border-t-2 border-white/30 pt-6 sm:pt-8">
            <div className="space-y-3 sm:space-y-4">
              {directors.map((director, index) => (
                <TeamMemberCard
                  key={director.id}
                  member={director}
                  layout="horizontal"
                  defaultExpanded={index === 0}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Development Team Section */}
      <section className="relative bg-[#412c58] py-10 sm:py-16 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <h2 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white text-center mb-6 sm:mb-8 leading-none">
            DEVELOPMENT EXECUTIVES
          </h2>

          <div className="w-full max-w-5xl mx-auto border-t-2 border-white/30 pt-6 sm:pt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {developmentTeam.map((member) => (
                <TeamMemberCard
                  key={member.id}
                  member={member}
                  layout="vertical"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Operations Team Section */}
      <section className="relative bg-[#412c58] py-10 sm:py-16 pb-16 sm:pb-24 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <h2 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white text-center mb-6 sm:mb-8 leading-none">
            OPERATIONS TEAM
          </h2>

          <div className="w-full max-w-5xl mx-auto border-t-2 border-white/30 pt-6 sm:pt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {operationsTeam.map((member) => (
                <TeamMemberCard
                  key={member.id}
                  member={member}
                  layout="vertical"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
