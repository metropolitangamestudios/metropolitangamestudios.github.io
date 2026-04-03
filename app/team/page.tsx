"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TeamMemberCard, type TeamMember } from "@/components/team-member-card"
import teamDataJson from "@/data/team.json"

const teamData = teamDataJson as {
  directors: TeamMember[]
  developmentTeam: TeamMember[]
  operationsTeam: TeamMember[]
}

const { directors, developmentTeam, operationsTeam } = teamData

export default function MeetTheTeam() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[linear-gradient(180deg,_#5a3a72_0%,_#4d3163_38%,_#452b57_72%,_#3e254f_100%)]">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-20 sm:pt-24 pb-6 sm:pb-8 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-display font-bold text-[#dca8ff] text-center mb-0 leading-none">
            MEET THE TEAM!
          </h1>
        </div>
      </section>

      {/* Directors Section */}
      <section className="relative pt-0 pb-10 sm:pb-16 overflow-hidden">
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
      <section className="relative py-10 sm:py-16 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <h2 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white text-center mb-6 sm:mb-8 leading-none">
            DEVELOPMENT EXECUTIVES
          </h2>

          <div className="w-full max-w-5xl mx-auto border-t-2 border-white/30 pt-6 sm:pt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 items-start">
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
      <section className="relative py-10 sm:py-16 pb-16 sm:pb-24 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <h2 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white text-center mb-6 sm:mb-8 leading-none">
            OPERATIONS TEAM
          </h2>

          <div className="w-full max-w-5xl mx-auto border-t-2 border-white/30 pt-6 sm:pt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 items-start">
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
