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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export default async function PortfolioPage({ amount }: { amount: Number }) {
  const { username } = await getUser()
  return (
    <Card className="w-full mx-auto mt-12">
      <Tabs defaultValue="SUSC" className="w-full">
        <CardHeader className="items-center">
          <div className="flex w-full items-center justify-between">
            <h1 className="text-2xl font-bold">{username}</h1>
            <TabsList>
              <TabsTrigger value="SUSC">All Assets</TabsTrigger>
              <TabsTrigger value="Other Assets">Select Asset</TabsTrigger>
            </TabsList>
          </div>
          <div className="flex flex-row mt-2">
            <Icons.DollarSign />
            <p className="flex items-center text-lg font-bold text-muted-foreground text-black">
              1.78
            </p>
          </div>
          <CardDescription></CardDescription>
          <CardAction></CardAction>
        </CardHeader>
        <CardContent>
          <TabsContent value="SUSC">
            <div className="py-4">Overview visualisation goes here.</div>
          </TabsContent>
          <TabsContent value="Other Assets">
            <div className="py-4">Analytics visualisation goes here.</div>
          </TabsContent>
        </CardContent>
        <CardFooter className="flex-col gap-2"></CardFooter>
      </Tabs>
    </Card>
  )
}
