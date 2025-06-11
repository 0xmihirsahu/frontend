import { useEffect, useState } from "react"

export function useCurrentUser() {
  const [user, setUser] = useState("Paul van Mierlo")
  const [username, setUsername] = useState("Paul van Mierlo")

  //   useEffect(() => {
  //     fetch("/api/user")
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setUser(data.user)
  //         setUsername(data.username)
  //       })
  //   }, [])

  return { user, username }
}
