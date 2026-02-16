"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TeamMemberCard, type TeamMember } from "@/components/team-member-card"

// Team data
const directors: TeamMember[] = [
  {
    id: "isabella-greco",
    name: "ISABELLA GRECO",
    role: "OPERATIONS DIRECTOR",
    bio: "Bio coming soon...",
    image: "/images/icon.jpeg",
    socials: {
      twitter: "#",
      discord: "#",
      youtube: "#",
      twitch: "#",
    },
  },
  {
    id: "tristan-meyer-odell",
    name: "TRISTAN MEYER ODELL",
    role: "CREATIVE DIRECTOR",
    bio: "Bio coming soon...",
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
    id: "madeline-hanitijo",
    name: "MADELINE HANITIJO",
    role: "ART LEAD",
    bio: "Madeline \"STORMY\" Hanitijo is a multidisciplinary New Media artist with a crippling addiction to making interactive art, watching VTubers, and bragging about their friends.",
    image: "/images/headshots/madeline_hanitijo.png",
    socials: { instagram: "https://www.instagram.com/_stormwhy/?hl=en" },
  },
  {
    id: "ethan-wong",
    name: "ETHAN WONG",
    role: "SOUND DESIGN LEAD",
    bio: "Bio coming soon...",
    image: "/images/icon.jpeg",
    socials: {  },
  },
  {
    id: "sophie-ducharme",
    name: "SOPHIE DUCHARME",
    role: "WRITING LEAD",
    bio: "Hello! I’m in my third year of RTA Media Production, with a (now defunct) concentration in video game design. My specialties include storyboarding and concept design. I love detective games and turn-based combat!",
    image: "/images/headshots/sophie_ducharme.jpg",
    socials: { linkedin: "https://www.linkedin.com/in/sophie-ducharme-b4492a261" },
  },
  {
    id: "clare-lue-tam",
    name: "CLARE LUE TAM",
    role: "WRITING PRODUCER",
    bio: "Hi, I’m Clare! I’m a Philosophy student in my fifth year at TMU. I love reading, writing and drawing (whenever I have time). My areas of expertise include editing and narrative design! I love horror games and think that the Nintendo DS is the greatest console ever made :) ",
    image: "/images/headshots/clare_lue_tam.jpeg",
    socials: { linkedin: "https://www.linkedin.com/in/clare-lue-tam-085428255" },
  },
  {
    id: "michael-latka",
    name: "MICHAEL LATKA",
    role: "PROGRAMMING LEAD",
    bio: "Bio coming soon...",
    image: "/images/icon.jpeg",
    socials: {  },
  },
  {
    id: "talon-jiang",
    name: "TALON JIANG",
    role: "PROGRAMMING PRODUCER",
    bio: "Ah yes, the Introvert's greatest weakness: \"Tell me about yourself\". You fools! I may still be an introvert, but I have levelled up enough to have gained immunity to your attack! I can now boast about my 5 years of software development experience in Java/Python and my interests in Game Dev, CGI, VR, and Engineering! ",
    image: "/images/headshots/talon_jiang.jpg",
    socials: { github: "https://github.com/J-talon", linkedin: "https://www.linkedin.com/in/talon-jiang/" },
  },
  {
    id: "thomas-imada",
    name: "THOMAS IMADA",
    role: "QA LEAD",
    bio: "Bio coming soon...",
    image: "/images/icon.jpeg",
    socials: {  },
  },
  {
    id: "noah-friedman",
    name: "NOAH FRIEDMAN",
    role: "QA LEAD",
    bio: "Bio coming soon...",
    image: "/images/icon.jpeg",
    socials: {  },
  },
  {
    id: "stanislaw-jackowski",
    name: "STANISLAW JACKOWSKI",
    role: "GAME DESIGN LEAD",
    bio: "I'm a Computer Science student who’s into video games, both playing them and now making them. Also modding them as well on the side.",
    image: "/images/headshots/stanislaw_jackowski.jpg",
    socials: { linkedin: "https://www.linkedin.com/in/stanisław-jackowski-064908353"},
  },
  {
    id: "daniel-trakas",
    name: "DANIEL TRAKAS",
    role: "GAME DESIGN PRODUCER",
    bio: "Bio coming soon...",
    image: "/images/icon.jpeg",
    socials: {  },
  },
  {
    id: "erich-laylo",
    name: "ERICH LAYLO",
    role: "UI LEAD",
    bio: "Bio coming soon...",
    image: "/images/icon.jpeg",
    socials: {  },
  },
  {
    id: "arwen-phan",
    name: "ARWEN PHAN",
    role: "UI PRODUCER",
    bio: "Hi there! I’m Arwen, a 2nd year New Media student and your fellow tech-art enthusiast who happened to wander into the realm of game dev (UIUX things specifically) and fell in love! My favorite games currently are the holy hoyoverse trio, valorant and silent hill f,etc.\n\nCan’t wait to explore, co-lead and produce more awesome things for the team :) and if you also find yourself landing at the intersection between creative graphics and technical implementation, perhaps UI’s the place for you (totally not promoting)!",
    image: "/images/headshots/arwen_phan.jpeg",
    socials: { tiktok: "https://www.tiktok.com/@qp_solacee", linkedin: "https://www.linkedin.com/in/arwen-phan-69aa02334" },
  },
]

const operationsTeam: TeamMember[] = [
  {
    id: "emma-ko",
    name: "EMMA KO",
    role: "MARKETING MANAGER",
    bio: "Bio coming soon...",
    image: "/images/icon.jpeg",
    socials: {  },
  },
  {
    id: "rivan-jarjes",
    name: "RIVAN JARJES",
    role: "WEBSITE MANAGER",
    bio: "Bio coming soon...",
    image: "/images/icon.jpeg",
    socials: { linkedin: "https://linkedin.com/in/rivanjarjes", instagram: "https://instagram.com/rivan1186", github: "https://github.com/rivanjarjes" },
  },
  {
    id: "matthew-phang",
    name: "MATTHEW PHANG",
    role: "WEBSITE MANAGER",
    bio: "Bio coming soon...",
    image: "/images/icon.jpeg",
    socials: {  },
  },
  {
    id: "grace-tshimbalanga",
    name: "GRACE TSHIMBALANGA",
    role: "ACCOUNTANT",
    bio: "Bio coming soon...",
    image: "/images/icon.jpeg",
    socials: {  },
  },
  {
    id: "victoria-do",
    name: "VICTORIA DO",
    role: "HR",
    bio: "Bio coming soon...",
    image: "/images/icon.jpeg",
    socials: {  },
  },
  {
    id: "denzel-tucker",
    name: "DENZEL TUCKER",
    role: "CONTENT LEAD",
    bio: "Marketing student interested in authentic storytelling and visual communication in and outside school. And for some reason, Osmow’s follows me... not complaining",
    image: "/images/headshots/denzel_tucker.png",
    socials: { linkedin: "https://www.linkedin.com/in/denzel-tucker", instagram: "https://www.instagram.com/denzeltucker_/", twitch: "https://www.twitch.tv/dennziii" },
    imageZoom: 1.25
  },
  {
    id: "leanna-garong",
    name: "LEANNA GARONG",
    role: "SOCIAL MEDIA COORDINATOR",
    bio: "Hello! I'm Leanna, the Social Media Coordinator at Met Game Studios. I'm currently in the Marketing Management program at the Ted Rogers School of Management, hoping to step into the digital media industry! Gaming has been a meaningful part of my life since childhood, so getting to support Met Game Studios and connect with the community has been an amazing experience. If you’re interested in connecting with me, you can find me on LinkedIn and Instagram!",
    image: "/images/headshots/leanna_garong.jpg",
    socials: { linkedin: "https://www.linkedin.com/in/leanna-garong-284971350", instagram: "https://www.instagram.com/leanna.21/" },
    imageZoom: 1.5,
  },
  {
    id: "isabel-monteiro",
    name: "ISABEL MONTEIRO",
    role: "CONTENT CREATOR",
    bio: "Bio coming soon...",
    image: "/images/icon.jpeg",
    socials: {  },
  },
  {
    id: "isabel-kim",
    name: "ISABEL KIM",
    role: "LEAD GRAPHIC DESIGNER",
    bio: "Bio coming soon...",
    image: "/images/icon.jpeg",
    socials: {  },
  },
  {
    id: "edwin-deng",
    name: "EDWIN DENG",
    role: "PHOTOGRAPHER",
    bio: "Hey all! I’m one of the many people on the marketing team at Met Games Studios and is responsible for taking club photos. Love photography and looter shooters!",
    image: "/images/headshots/edwin_deng.jpeg",
    socials: { instagram: "https://www.instagram.com/edwinrta61/" },
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
      <section className="relative bg-[#412c58] py-10 sm:py-16 pb-16 sm:pb-24 overflow-hidden">
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
