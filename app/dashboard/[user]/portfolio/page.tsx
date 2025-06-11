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

import { Icons } from "@/components/icons/icons"

export default function PortfolioPage({ username }: { username: string }) {
  return (
    <Card className="w-full mx-auto mt-12">
      <CardHeader className="items-center">
        <Icons.DollarSign className="mb-2" />
        <CardTitle></CardTitle>
        <CardDescription></CardDescription>
        <CardAction></CardAction>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter className="flex-col gap-2"></CardFooter>
    </Card>
  )
}
