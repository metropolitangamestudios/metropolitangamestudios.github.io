"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import Image from "next/image"
import { SocialLinks } from "@/components/social-links"
import type { TeamMember } from "@/components/team-member-card"

interface MobileTeamGridProps {
  members: TeamMember[]
}

export function MobileTeamGrid({ members }: MobileTeamGridProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const rows = [] as TeamMember[][]

  for (let index = 0; index < members.length; index += 2) {
    rows.push(members.slice(index, index + 2))
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:hidden">
      {rows.map((row) => {
        const expandedMember = row.find((member) => member.id === expandedId)

        return (
          <div key={row.map((member) => member.id).join("-")} className="col-span-2">
            <div className="grid grid-cols-2 gap-4 items-start">
              {row.map((member) => {
                const isExpanded = expandedId === member.id

                return (
                  <button
                    key={member.id}
                    type="button"
                    onClick={() => setExpandedId((current) => (current === member.id ? null : member.id))}
                    aria-expanded={isExpanded}
                    className="w-full rounded-lg bg-[#a584bf] p-4 transition-colors hover:bg-[#b594cf]"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className="relative h-24 w-24 overflow-hidden rounded-full bg-[#9374ac]">
                        <Image
                          src={member.image || "/placeholder.svg"}
                          alt={member.name}
                          fill
                          className="object-cover"
                          style={{
                            objectPosition: member.imagePosition || "center",
                            transform: `scale(${member.imageZoom || 1})`,
                          }}
                        />
                      </div>

                      <div className="w-full text-center">
                        <h3 className="font-display text-2xl font-bold leading-none whitespace-pre-line text-[#412c58]">
                          {member.name.split(" ").length === 2
                            ? member.name.split(" ").join("\n")
                            : member.name.split(" ").length === 3
                              ? `${member.name.split(" ")[0]}\n${member.name.split(" ").slice(1).join(" ")}`
                              : member.name}
                        </h3>
                        <p className="mt-2 font-display text-base leading-tight text-white">
                          {member.role}
                        </p>
                      </div>

                      <div className="flex items-center justify-center text-[#4A3B5C]">
                        {isExpanded ? <ChevronUp className="h-6 w-6" /> : <ChevronDown className="h-6 w-6" />}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>

            {expandedMember ? (
              <div className="mt-3 rounded-lg bg-[#ae98c0] px-4 pb-4 pt-4 text-[#4A3B5C]">
                <p className="mb-3 whitespace-pre-line text-sm leading-relaxed">{expandedMember.bio}</p>
                {expandedMember.socials &&
                Object.values(expandedMember.socials).some((link) => link && link !== "#") ? (
                  <SocialLinks socials={expandedMember.socials} size="sm" centered />
                ) : null}
              </div>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}
