import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BarChart3, TrendingUp, DollarSign, Clock } from 'lucide-react'

export default function EarnPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Earn</h1>
        <p className="text-gray-600">Earn passive income through various investment strategies</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle>Coming Soon</CardTitle>
            <Badge variant="secondary">Beta</Badge>
          </div>
          <CardDescription>
            We're working hard to bring you advanced earning features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 border rounded-lg">
              <BarChart3 className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <h3 className="font-semibold mb-1">Yield Farming</h3>
              <p className="text-sm text-gray-600">Earn rewards by providing liquidity</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <h3 className="font-semibold mb-1">Staking</h3>
              <p className="text-sm text-gray-600">Stake your tokens for passive income</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <DollarSign className="h-8 w-8 mx-auto mb-2 text-purple-600" />
              <h3 className="font-semibold mb-1">Dividends</h3>
              <p className="text-sm text-gray-600">Receive dividend payments</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
