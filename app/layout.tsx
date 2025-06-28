import "./globals.css"
import "@rainbow-me/rainbowkit/styles.css"
import "react-toastify/dist/ReactToastify.css"
import type { Metadata } from "next"
import { Public_Sans, IBM_Plex_Mono } from "next/font/google"
import { Providers } from "@/components/Providers"
import Navbar from "@/components/NavBar"
import { cn } from "@/lib/utils"
import { Toaster } from "sonner"
const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
})
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
})
export const metadata: Metadata = {
  title: "Spout FInance",
  description: "Spout Finance is a RWA platform tokenizing T-Bills and Corporate Bonds",
  keywords: ["finance", "portfolio", "trading", "stocks", "investment", "RWA", "T-Bills", "Corporate Bonds"],
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen flex flex-col bg-gray-50 font-sans antialiased",
          publicSans.variable,
          ibmPlexMono.variable
        )}
      >
        <Providers>
          <Navbar />
          <main className="flex-1 px-4 py-6 md:px-8 lg:px-12 xl:px-16 max-w-7xl mx-auto w-full">
            {children}
          </main>
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
