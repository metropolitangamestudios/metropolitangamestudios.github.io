import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiscord, faXTwitter, faYoutube, faTwitch } from '@fortawesome/free-brands-svg-icons'

interface SocialLinksProps {
  socials: {
    twitter?: string
    discord?: string
    youtube?: string
    twitch?: string
  }
  size?: "sm" | "md" | "lg"
  centered?: boolean
}

export function SocialLinks({ socials, size = "lg", centered = false }: SocialLinksProps) {
  const iconSizes = {
    sm: "24px",
    md: "32px",
    lg: "40px",
  }

  const iconSize = iconSizes[size]

  return (
    <div className={`flex gap-4 ${centered ? "justify-center" : ""}`}>
      {socials.twitter && (
        <a
          href={socials.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80 transition-opacity"
          aria-label="Twitter"
        >
          <FontAwesomeIcon icon={faXTwitter} style={{color: "#3a0c77", width: iconSize, height: iconSize}} />
        </a>
      )}
      {socials.discord && (
        <a
          href={socials.discord}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80 transition-opacity"
          aria-label="Discord"
        >
          <FontAwesomeIcon icon={faDiscord} style={{color: "#3a0c77", width: iconSize, height: iconSize}} />
        </a>
      )}
      {socials.youtube && (
        <a
          href={socials.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80 transition-opacity"
          aria-label="YouTube"
        >
          <FontAwesomeIcon icon={faYoutube} style={{color: "#3a0c77", width: iconSize, height: iconSize}} />
        </a>
      )}
      {socials.twitch && (
        <a
          href={socials.twitch}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80 transition-opacity"
          aria-label="Twitch"
        >
          <FontAwesomeIcon icon={faTwitch} style={{color: "#3a0c77", width: iconSize, height: iconSize}} />
        </a>
      )}
    </div>
  )
}
