import { Button } from "@/components/ui/button"
import { ArrowLeft, Construction } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ComingSoon() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-2xl mx-auto">
        <div className="bg-yellow-100 p-4 rounded-full inline-block mb-4">
          <Construction className="w-8 h-8 text-yellow-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900">Coming Soon</h1>
        <p className="text-xl text-gray-600">
          We're working hard to bring you an amazing new feature. Stay tuned!
        </p>
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="mt-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go Back
        </Button>
      </div>
    </div>
  )
}
