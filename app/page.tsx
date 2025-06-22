import { redirect } from "next/navigation"

const Home = () => {
  redirect("/dashboard")
  return null
}

export default Home
