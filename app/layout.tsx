import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Vibe Check Quiz | Discover Your True Personality",
  description:
    "Take our fun 5-minute quiz to discover your unique vibe and personality traits. Share with friends and find your compatibility!",
  openGraph: {
    title: "Vibe Check Quiz | Discover Your True Personality",
    description:
      "Take our fun 5-minute quiz to discover your unique vibe and personality traits. Share with friends and find your compatibility!",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
