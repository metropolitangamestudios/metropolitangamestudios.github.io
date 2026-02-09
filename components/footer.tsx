import Link from "next/link"
import Image from "next/image"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiscord, faYoutube, faTwitch, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons'

export function Footer() {
  return (
    <footer className="bg-[#6b5b83] border-t border-[#B8A5D4] py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
            <Image
              src="/images/mgs-transparent-logo.png"
              alt="MET GAME STUDIOS"
              width={150}
              height={150}
              className="object-contain w-[140px] h-[140px] sm:w-[200px] sm:h-[200px]"
            />
          </Link>

          <nav className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
            <div className="hidden sm:block h-px bg-white/30 w-16 lg:w-32"></div>
            <Link
              href="/team"
              className="text-xl sm:text-3xl lg:text-5xl font-display uppercase tracking-wide text-white hover:text-[#D4C4E8] transition-colors text-center"
            >
              Meet the Team
            </Link>
            <div className="hidden sm:block h-px bg-white/30 w-8 lg:w-16"></div>
            <Link
              href="#games"
              className="text-xl sm:text-3xl lg:text-5xl font-display uppercase tracking-wide text-white hover:text-[#D4C4E8] transition-colors text-center"
            >
              Games
            </Link>
            <div className="hidden sm:block h-px bg-white/30 w-8 lg:w-16"></div>
            <Link
              href="#events"
              className="text-xl sm:text-3xl lg:text-5xl font-display uppercase tracking-wide text-white hover:text-[#D4C4E8] transition-colors text-center"
            >
              Events
            </Link>
            <div className="hidden sm:block h-px bg-white/30 w-16 lg:w-32"></div>
          </nav>

          <div className="flex items-center gap-6 sm:gap-8">
            <Link
              href="https://discord.com/invite/MDc6Cf7QFz"
              target="_blank"
              className="hover:opacity-80 transition-opacity block w-10 h-10 sm:w-16 sm:h-16"
              aria-label="Discord"
            >
              <FontAwesomeIcon icon={faDiscord} className="w-full h-full" style={{color: "#ffffff", width: "100%", height: "100%"}} />
            </Link>
            <Link
              href="https://www.youtube.com/@metgamestudio"
              target="_blank"
              className="hover:opacity-80 transition-opacity block w-10 h-10 sm:w-16 sm:h-16"
              aria-label="YouTube"
            >
              <FontAwesomeIcon icon={faYoutube} className="w-full h-full" style={{color: "#ffffff", width: "100%", height: "100%"}} />
            </Link>
            <Link
              href="https://www.twitch.tv/metgamestudio"
              target="_blank"
              className="hover:opacity-80 transition-opacity block w-10 h-10 sm:w-16 sm:h-16"
              aria-label="Twitch"
            >
              <FontAwesomeIcon icon={faTwitch} className="w-full h-full" style={{color: "#ffffff", width: "100%", height: "100%"}} />
            </Link>
            <Link
              href="https://www.instagram.com/metgamestudio/"
              target="_blank"
              className="hover:opacity-80 transition-opacity block w-10 h-10 sm:w-16 sm:h-16"
              aria-label="Instagram"
            >
              <FontAwesomeIcon icon={faInstagram} className="w-full h-full" style={{color: "#ffffff", width: "100%", height: "100%"}} />
            </Link>
            <Link
              href="https://www.linkedin.com/company/met-games"
              target="_blank"
              className="hover:opacity-80 transition-opacity block w-10 h-10 sm:w-16 sm:h-16"
              aria-label="LinkedIn"
            >
              <FontAwesomeIcon icon={faLinkedin} className="w-full h-full" style={{color: "#ffffff", width: "100%", height: "100%"}} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
