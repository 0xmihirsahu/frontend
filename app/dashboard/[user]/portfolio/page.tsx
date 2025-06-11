import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getUser } from "@/lib/getUser"

import { Icons } from "@/components/icons/icons"

export default async function PortfolioPage() {
  const { username } = await getUser()
  return (
    <Card className="w-full mx-auto mt-12">
      <CardHeader className="items-center">
        <Icons.DollarSign className="mb-2" />
        {username}
        <CardTitle></CardTitle>
        <CardDescription></CardDescription>
        <CardAction></CardAction>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter className="flex-col gap-2"></CardFooter>
    </Card>
  )
}
