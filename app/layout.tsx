import type React from "react"
import type { Metadata } from "next"
import { Quicksand } from "next/font/google"
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

const brickSans = localFont({
  src: "../public/fonts/BrickSans-Bold.otf",
  weight: "700",
  style: "normal",
  variable: "--font-brick-sans",
  display: "swap",
  fallback: ["Impact", "Arial Black", "sans-serif"],
})

export const metadata: Metadata = {
  title: "Met Game Studios",
  description: "Gaming studio creating amazing experiences",
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
      <body className={`font-sans ${quicksand.variable} ${brickSans.variable}`}>
        <SmoothScroll>
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </SmoothScroll>
        <Analytics />
      </body>
    </html>
  )
}
