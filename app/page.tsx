import { useRouter } from "next/navigation"

const Home = () => {
  const router = useRouter()
  router.push("/portfolio")
  return (
    <div>
      <h1>Home</h1>
    </div>
  )
}

export default Home
