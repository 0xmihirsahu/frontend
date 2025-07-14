import { Sidebar, SidebarInset } from "@/components/ui/sidebar"

import { SidebarProvider } from "@/components/ui/sidebar"
import ProtectedRoute from "@/components/ProtectedRoute"
import OnchainIDChecker from "@/components/contract/OnchainIDChecker"
import {
  DashboardSidebarNavClient,
  DashboardNavbarHeaderClient,
} from "@/components/DashboardNavClient"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute>
      <SidebarProvider defaultOpen={true}>
        <div className="flex min-h-screen w-full bg-gray-50">
          <Sidebar collapsible="none" className="border-r bg-white">
            <DashboardSidebarNavClient />
          </Sidebar>

          <SidebarInset className="flex-1">
            <DashboardNavbarHeaderClient />
            <OnchainIDChecker />
            <main className="sflex-1 p-6 bg-gray-50">{children}</main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </ProtectedRoute>
  )
}
