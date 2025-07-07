"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import {
  Trophy,
  Store,
  FlaskConical,
  BarChart3,
  Users,
  Shield,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useSidebar, SidebarProvider } from "@/components/ui/sidebar"
import Image from "next/image"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import CustomConnectWallet from "@/components/custom-connect-wallet"

function SidebarNavContent() {
  const pathname = usePathname()
  const { open } = useSidebar()
  const router = useRouter()

  const isActive = (path: string) => {
    if (path === "/app") {
      return pathname === "/app"
    }
    return pathname.startsWith(path)
  }

  return (
    <>
      <SidebarHeader className="p-4 border-b">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center">
            <Image
              className="cursor-pointer"
              onClick={() => router.push("/")}
              src="/Whale.png"
              alt="spout finance logo"
              width={32}
              height={32}
            />
          </div>
          {open && (
            <h1
              onClick={() => router.push("/")}
              className="text-lg font-semibold text-gray-900 cursor-pointer"
            >
              spout finance
            </h1>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/app/trade")}>
              <Link href="/app/trade" className="flex items-center gap-3">
                <FlaskConical className="h-4 w-4" />
                <span>Trade</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/app/portfolio")}>
              <Link href="/app/portfolio" className="flex items-center gap-3">
                <Trophy className="h-4 w-4" />
                <span>Portfolio</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton className="flex items-center gap-3 opacity-75 cursor-not-allowed">
              <BarChart3 className="h-4 w-4" />
              <span>Earn</span>
              <Badge variant="secondary" className="ml-auto">
                Soon
              </Badge>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/app/kyc")}>
              <Link href="/app/kyc" className="flex items-center gap-3">
                <Shield className="h-4 w-4" />
                <span>KYC Verification</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive("/app/proof-of-reserve")}
            >
              <Link
                href="/app/proof-of-reserve"
                className="flex items-center gap-3"
              >
                <TrendingUp className="h-4 w-4" />
                <span>Proof of Reserve</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/app/markets")}>
              <Link href="/app/markets" className="flex items-center gap-3">
                <Store className="h-4 w-4" />
                <span>Markets</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton className="flex items-center gap-3 opacity-75 cursor-not-allowed">
              <Users className="h-4 w-4" />
              <span>Settings</span>
              <Badge variant="secondary" className="ml-auto">
                Soon
              </Badge>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t">
        <div className="text-xs text-gray-500 text-center">
          © 2024 Spout Finance
        </div>
      </SidebarFooter>
    </>
  )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-gray-50">
        <Sidebar collapsible="none" className="border-r bg-white">
          <SidebarNavContent />
        </Sidebar>

        <SidebarInset className="flex-1">
          <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b bg-white px-4">
            <div className="ml-4 text-sm text-gray-600">Dashboard</div>
            <CustomConnectWallet />
          </header>
          <main className="flex-1 p-6 bg-gray-50">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
