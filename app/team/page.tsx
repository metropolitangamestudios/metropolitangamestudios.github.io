"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TeamMemberCard, type TeamMember } from "@/components/team-member-card"
import { MobileTeamGrid } from "@/components/mobile-team-grid"
import teamDataJson from "@/data/team.json"

const teamData = teamDataJson as {
  directors: TeamMember[]
  artTeam: TeamMember[]
  gameDesignTeam: TeamMember[]
  programmingTeam: TeamMember[]
  soundDesignTeam: TeamMember[]
  uiTeam: TeamMember[]
  writingTeam: TeamMember[]
  qaTeam: TeamMember[]
  operationsTeam: TeamMember[]
}

const {
  directors,
  artTeam,
  gameDesignTeam,
  programmingTeam,
  soundDesignTeam,
  uiTeam,
  writingTeam,
  qaTeam,
  operationsTeam,
} = teamData

const developmentSections: { title: string; members: TeamMember[] }[] = [
  { title: "ART", members: artTeam },
  { title: "GAME DESIGN", members: gameDesignTeam },
  { title: "PROGRAMMING", members: programmingTeam },
  { title: "SOUND DESIGN", members: soundDesignTeam },
  { title: "UI", members: uiTeam },
  { title: "WRITING", members: writingTeam },
  { title: "QA", members: qaTeam },
]

export default function MeetTheTeam() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[linear-gradient(180deg,_#5a3a72_0%,_#4d3163_38%,_#452b57_72%,_#3e254f_100%)]">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-20 sm:pt-24 pb-6 sm:pb-8 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <h1 className="text-6xl sm:text-6xl md:text-8xl lg:text-9xl font-display font-bold text-[#dca8ff] text-center mb-0 leading-none">
            MEET THE TEAM!
          </h1>
        </div>
      </section>

      {/* Directors Section */}
      <section className="relative pt-0 pb-10 sm:pb-16 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <h2 className="text-5xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white text-center mb-6 sm:mb-8 leading-none">
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

      {developmentSections.map((section) => (
        <section key={section.title} className="relative py-10 sm:py-16 overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <h2 className="text-5xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white text-center mb-6 sm:mb-8 leading-none">
              {section.title}
            </h2>

            <div className="w-full max-w-5xl mx-auto border-t-2 border-white/30 pt-6 sm:pt-8">
              <MobileTeamGrid members={section.members} />
              <div className="hidden md:grid [grid-template-columns:repeat(auto-fit,minmax(280px,320px))] justify-center gap-4 sm:gap-6 items-start">
                {section.members.map((member) => (
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
      ))}

      {/* Operations Team Section */}
      <section className="relative py-10 sm:py-16 pb-16 sm:pb-24 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <h2 className="text-5xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white text-center mb-6 sm:mb-8 leading-none">
            OPERATIONS TEAM
          </h2>

          <div className="w-full max-w-5xl mx-auto border-t-2 border-white/30 pt-6 sm:pt-8">
            <MobileTeamGrid members={operationsTeam} />
            <div className="hidden md:grid [grid-template-columns:repeat(auto-fit,minmax(280px,320px))] justify-center gap-4 sm:gap-6 items-start">
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
