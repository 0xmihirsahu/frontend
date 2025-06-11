import "./globals.css"
import "@rainbow-me/rainbowkit/styles.css"
import "react-toastify/dist/ReactToastify.css"
import type { Metadata } from "next"
import { Inter as FontSans } from "next/font/google"
import { Providers } from "@/components/Providers"
import { Header } from "@/components/Header"
import { ToastContainer } from "react-toastify"
import { cn } from "@/lib/utils"
import { headers } from "next/headers"
import { getUser } from "@/lib/getUser"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})
export const metadata: Metadata = {
  title: "Spout Dashboard",
  description: "Spout Dashboard for asset tokenization",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { username } = await getUser()

  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers>
          <div className="py-8 mb-10 px-10 md:px-28 lg:px-40 xl:px-56">
            <Header username={username} />
            {children}
          </div>
        </Providers>
        <ToastContainer />
      </body>
    </html>
  )
}
