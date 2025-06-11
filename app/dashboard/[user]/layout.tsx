import { getUser } from "@/lib/getUser"
import React from "react"

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { username } = await getUser()

  return <>{children}</>
}
