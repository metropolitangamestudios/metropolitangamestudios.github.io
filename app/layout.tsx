import type React from "react"
import type { Metadata } from "next"
import { Quicksand } from "next/font/google"
import { League_Spartan } from "next/font/google"
import localFont from "next/font/local"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { SmoothScroll } from "@/components/smooth-scroll"
import "./globals.css"

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  display: "swap",
})

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  weight: ["100","200","300","400","500","600","700","800","900"],
  variable: "--font-league-spartan",
  display: "swap",
})
export const metadata: Metadata = {
  title: "Met Game Studios",
  description: "Toronto Metropolitan University's student gaming studio creating amazing experiences",
  generator: "v0.app",
  icons: {
    icon: "/images/icon.png",
    shortcut: "/images/icon.png",
    apple: "/images/icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${quicksand.variable} ${leagueSpartan.variable}`}>
        <SmoothScroll>
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </SmoothScroll>
        <Analytics />
      </body>
    </html>
  )
}
