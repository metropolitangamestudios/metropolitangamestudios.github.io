"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import Image from "next/image"
import { SocialLinks } from "./social-links"

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  image?: string
  imageZoom?: number
  imagePosition?: string
    socials: {
      twitter?: string
      discord?: string
      youtube?: string
      twitch?: string
      linkedin?: string
      instagram?: string
      tiktok?: string
      github?: string
      website?: string
    }
}

interface TeamMemberCardProps {
  member: TeamMember
  layout?: "horizontal" | "vertical"
  defaultExpanded?: boolean
  imageSize?: number
}

export function TeamMemberCard({ 
  member, 
  layout = "vertical", 
  defaultExpanded = false,
  imageSize = 120 
}: TeamMemberCardProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)
  const hasSocials = member.socials && Object.values(member.socials).some(link => link && link !== "#")
  const imageSrc = member.image?.trim()
  const normalizedImageSrc = imageSrc && imageSrc !== "/placeholder.svg" ? imageSrc : "/images/icon.jpeg"

  if (layout === "horizontal") {
    return (
      <div className="w-full overflow-hidden rounded-[24px] border border-white/12 bg-[#f1e6f8]/10 shadow-[0_22px_50px_rgba(21,8,31,0.2)] backdrop-blur-sm">
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
          className={`w-full transition-colors p-4 sm:p-6 flex items-center gap-3 sm:gap-4`}
        >
          <div className="rounded-full overflow-hidden w-20 h-20 sm:w-32 sm:h-32 shrink-0 aspect-square bg-[#3a214d]">
            <Image
              src={normalizedImageSrc}
              alt={member.name}
              width={imageSize * (member.imageZoom || 1)}
              height={imageSize * (member.imageZoom || 1)}
              className="w-full h-full object-cover"
              style={{ 
                objectPosition: member.imagePosition || "center",
                transform: `scale(${member.imageZoom || 1})`
              }}
            />
          </div>
          <div className="flex-1 text-left">
            <h3 className="mb-1 text-2xl sm:text-2xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-none">{member.name}</h3>
            <p className="text-base font-medium uppercase tracking-[0.24em] text-[#f3c6ff] sm:text-lg">{member.role}</p>
          </div>
          {isExpanded ? (
            <ChevronUp className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          ) : (
            <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          )}
        </button>

        <div
          className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
            isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div
            className={`overflow-hidden transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none ${
              isExpanded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"
            }`}
          >
            <div className="bg-[#f1e6f8]/70 rounded-b-[24px] border-t border-white/12 px-4 sm:px-6 pt-4 sm:pt-6 pb-4 sm:pb-6">
              <p className="text-[#452b57] font-body mb-3 sm:mb-4 text-sm sm:text-base md:text-lg whitespace-pre-line">{member.bio}</p>
              {hasSocials && <SocialLinks socials={member.socials} size="md" />}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full flex flex-col overflow-hidden rounded-[24px] border border-white/12 bg-[#f1e6f8]/10 shadow-[0_22px_50px_rgba(21,8,31,0.2)] backdrop-blur-sm">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        className={`w-full transition-colors p-4 sm:p-6 flex flex-col items-center gap-3 sm:gap-4`}
      >
        <div className="rounded-full overflow-hidden w-24 h-24 sm:w-32 sm:h-32 shrink-0 aspect-square bg-[#3a214d]">
          <Image
            src={normalizedImageSrc}
            alt={member.name}
            width={imageSize * (member.imageZoom || 1)}
            height={imageSize * (member.imageZoom || 1)}
            className="w-full h-full object-cover"
            style={{ 
              objectPosition: member.imagePosition || "center",
              transform: `scale(${member.imageZoom || 1})`
            }}
          />
        </div>
        <div className="flex-1 flex flex-col justify-between w-full">
          <div className="flex-1 flex items-center justify-center">
            <h3 className="text-2xl sm:text-3xl md:text-5xl lg:text-4xl font-display font-extrabold text-white leading-none whitespace-pre-line text-center">
              {member.name.split(" ").length === 2 
                ? member.name.split(" ").join("\n") 
                : member.name.split(" ").length === 3 
                  ? `${member.name.split(" ")[0]}\n${member.name.split(" ").slice(1).join(" ")}`
                  : member.name}
            </h3>
          </div>
          <div className="text-center mt-2">
            <p className="text-base font-medium uppercase tracking-[0.24em] text-[#f3c6ff] sm:text-lg">{member.role}</p>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-6 h-6 text-white" />
        ) : (
          <ChevronDown className="w-6 h-6 text-white" />
        )}
      </button>

      <div
        className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
          isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div
          className={`overflow-hidden transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none ${
            isExpanded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"
          }`}
        >
          <div className="bg-[#f1e6f8]/60 rounded-b-[24px] border-t border-white/12 px-4 sm:px-6 pt-4 sm:pt-6 pb-4 sm:pb-6">
            <p className="text-[#452b57] font-medium text-sm sm:text-base md:text-lg mb-3 sm:mb-4 whitespace-pre-line">{member.bio}</p>
            {hasSocials && <SocialLinks socials={member.socials} size="sm" centered />}
          </div>
        </div>
      </div>
    </div>
  )
}
