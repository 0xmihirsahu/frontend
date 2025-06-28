import "./globals.css"
import "@rainbow-me/rainbowkit/styles.css"
import "react-toastify/dist/ReactToastify.css"
import type { Metadata } from "next"
import { Inter as FontSans } from "next/font/google"
import { Providers } from "@/components/Providers"
import Navbar from "@/components/NavBar"
import { cn } from "@/lib/utils"
import { Toaster } from "sonner"
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Spout Dashboard",
  description: "Spout Dashboard for asset tokenization and portfolio management",
  keywords: ["finance", "portfolio", "trading", "stocks", "investment"],
  viewport: "width=device-width, initial-scale=1",
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
          fontSans.variable
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
