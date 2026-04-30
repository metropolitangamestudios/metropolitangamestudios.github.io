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

      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-20 sm:pt-24 pb-6 sm:pb-8 overflow-hidden z-10">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <h1 className="text-6xl sm:text-6xl md:text-8xl lg:text-9xl font-display font-bold text-[#dca8ff] text-center mb-0 leading-none">
            MEET THE TEAM!
          </h1>
        </div>
      </section>

      {/* Directors Section */}
      <section className="relative pt-0 pb-10 sm:pb-16 overflow-hidden z-10">
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

      {developmentSections.map((section) => {
        const leads = section.members.filter((member) => member.role && member.role.trim() !== "")
        const nonLeads = section.members.filter((member) => !member.role || member.role.trim() === "")

        return (
          <section key={section.title} className="relative py-10 sm:py-16 overflow-hidden z-10">
            <div className="container mx-auto px-4 sm:px-6 relative z-10">
              <h2 className="text-5xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white text-center mb-6 sm:mb-8 leading-none">
                {section.title}
              </h2>

              <div className="w-full max-w-5xl mx-auto border-t-2 border-white/30 pt-6 sm:pt-8">
                {leads.length > 0 && (
                  <>
                    <MobileTeamGrid members={leads} />
                    <div className="hidden md:grid [grid-template-columns:repeat(auto-fit,minmax(280px,320px))] justify-center gap-4 sm:gap-6 items-start">
                      {leads.map((member) => (
                        <TeamMemberCard
                          key={member.id}
                          member={member}
                          layout="vertical"
                        />
                      ))}
                    </div>
                  </>
                )}

                {nonLeads.length > 0 && (
                  <>
                    {leads.length > 0 && <div className="my-8 sm:my-12" />}
                    <MobileTeamGrid members={nonLeads} />
                    <div className="hidden md:grid [grid-template-columns:repeat(auto-fit,minmax(280px,320px))] justify-center gap-4 sm:gap-6 items-start">
                      {nonLeads.map((member) => (
                        <TeamMemberCard
                          key={member.id}
                          member={member}
                          layout="vertical"
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>
        )
      })}

      {/* Operations Team Section */}
      <section className="relative py-10 sm:py-16 pb-16 sm:pb-24 overflow-hidden z-10">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <h2 className="text-5xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white text-center mb-6 sm:mb-8 leading-none">
            OPERATIONS TEAM
          </h2>

          <div className="w-full max-w-5xl mx-auto border-t-2 border-white/30 pt-6 sm:pt-8">
            {(() => {
              const leads = operationsTeam.filter((member) => member.role && member.role.trim() !== "")
              const nonLeads = operationsTeam.filter((member) => !member.role || member.role.trim() === "")

              return (
                <>
                  {leads.length > 0 && (
                    <>
                      <MobileTeamGrid members={leads} />
                      <div className="hidden md:grid [grid-template-columns:repeat(auto-fit,minmax(280px,320px))] justify-center gap-4 sm:gap-6 items-start">
                        {leads.map((member) => (
                          <TeamMemberCard
                            key={member.id}
                            member={member}
                            layout="vertical"
                          />
                        ))}
                      </div>
                    </>
                  )}

                  {nonLeads.length > 0 && (
                    <>
                      {leads.length > 0 && <div className="my-8 sm:my-12" />}
                      <MobileTeamGrid members={nonLeads} />
                      <div className="hidden md:grid [grid-template-columns:repeat(auto-fit,minmax(280px,320px))] justify-center gap-4 sm:gap-6 items-start">
                        {nonLeads.map((member) => (
                          <TeamMemberCard
                            key={member.id}
                            member={member}
                            layout="vertical"
                          />
                        ))}
                      </div>
                    </>
                  )}
                </>
              )
            })()}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
