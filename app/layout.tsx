import "./globals.css"
import "@rainbow-me/rainbowkit/styles.css"
import "react-toastify/dist/ReactToastify.css"
import type { Metadata } from "next"
import { Public_Sans, IBM_Plex_Mono } from "next/font/google"
import { Providers } from "@/components/Providers"
import Navbar from "@/components/NavBar"
import { cn } from "@/lib/utils"
import { Toaster } from "sonner"
import { ConditionalNavbar } from "@/components/ConditionalNavbar"

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
          <ConditionalNavbar />
          <main className="flex-1">
            {children}
          </main>
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
