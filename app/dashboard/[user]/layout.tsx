import { getUser } from "@/lib/getUser"
import React from "react"
import { UserContext } from "@/context/userContext"

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  console.log("User Context:", UserContext)
  const { username } = await getUser()

  return (
    <UserContext.Provider value={{ username }}>{children}</UserContext.Provider>
  )
}
