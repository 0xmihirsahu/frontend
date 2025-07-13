"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
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
  LogOut,
} from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useSidebar, SidebarProvider } from "@/components/ui/sidebar"
import Image from "next/image"
import ProtectedRoute from "@/components/ProtectedRoute"
import { useAuthContext } from "@/context/AuthContext"
import SignOutButton from "@/components/SignOutButton"

import CustomConnectWallet from "@/components/custom-connect-wallet"

function SidebarNavContent({
  isActive,
}: {
  isActive: (path: string) => boolean
}) {
  const { open } = useSidebar()
  const router = useRouter()

  return (
    <>
      <SidebarHeader className="p-4 border-b">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center">
            <Image
              className="cursor-pointer"
              onClick={() => router.push("/app")}
              src="/Whale.png"
              alt="Spout Finance logo"
              width={32}
              height={32}
            />
          </div>
          {open && (
            <h1
              onClick={() => router.push("/app")}
              className="text-lg font-semibold text-gray-900 cursor-pointer"
            >
              Spout Finance
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
            <SidebarMenuButton className="flex items-center gap-3 ">
              <Link href="/app/profile" className="flex items-center gap-3">
                <Users className="h-4 w-4" />
                <span>Profule</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t">
        <div className="space-y-3">
          <div className="flex items-center gap-3 px-2 py-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Signed in</span>
          </div>
          <CustomConnectWallet />
          <SignOutButton className="w-full flex items-center gap-3 px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </SignOutButton>
          <div className="text-xs text-gray-500 text-center pt-2 border-t">
            © 2024 Spout Finance
          </div>
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
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === "/app") {
      return pathname === "/app"
    }
    return pathname.startsWith(path)
  }

  return (
    <ProtectedRoute>
      <SidebarProvider defaultOpen={true}>
        <div className="flex min-h-screen w-full bg-gray-50">
          <Sidebar collapsible="none" className="border-r bg-white">
            <SidebarNavContent isActive={isActive} />
          </Sidebar>

          <SidebarInset className="flex-1">
            <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b bg-white px-4">
              <Link
                href="/app"
                className={`ml-4 text-sm cursor-pointer ${
                  isActive("/app")
                    ? "text-gray-900 font-medium"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Dashboard
              </Link>
            </header>
            <main className="flex-1 p-6 bg-gray-50">{children}</main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </ProtectedRoute>
  )
}
