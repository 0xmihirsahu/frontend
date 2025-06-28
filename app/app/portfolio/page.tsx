import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PieChart, 
  Plus, 
  Minus,
  RefreshCw,
  Eye,
  Calendar,
  Target,
  Activity,
  BarChart3,
  Zap
} from 'lucide-react'
import Link from 'next/link'

export default async function PortfolioPage() {
  const username = "Paul van Mierlo"
  
  // Mock portfolio data - in real app, fetch from API
  const portfolioValue = 125847.52
  const dayChange = 2847.23
  const dayChangePercent = 2.31
  const totalReturn = 15847.52
  const totalReturnPercent = 14.4

  const holdings = [
    {
      symbol: "AAPL",
      name: "Apple Inc.",
      shares: 50,
      avgPrice: 175.23,
      currentPrice: 189.84,
      value: 9492.00,
      dayChange: 2.1,
      totalReturn: 14.61,
      allocation: 7.5
    },
    {
      symbol: "TSLA", 
      name: "Tesla Inc.",
      shares: 25,
      avgPrice: 220.50,
      currentPrice: 248.42,
      value: 6210.50,
      dayChange: -1.3,
      totalReturn: 12.7,
      allocation: 4.9
    },
    {
      symbol: "MSFT",
      name: "Microsoft Corp.",
      shares: 30,
      avgPrice: 385.75,
      currentPrice: 424.58,
      value: 12737.40,
      dayChange: 0.8,
      totalReturn: 10.1,
      allocation: 10.1
    },
    {
      symbol: "GOOGL",
      name: "Alphabet Inc.",
      shares: 15,
      avgPrice: 125.80,
      currentPrice: 142.65,
      value: 2139.75,
      dayChange: 1.2,
      totalReturn: 13.4,
      allocation: 1.7
    }
  ]

  const recentTransactions = [
    { type: "BUY", symbol: "AAPL", shares: 10, price: 189.50, date: "2024-01-15", value: 1895.00 },
    { type: "SELL", symbol: "TSLA", shares: 5, price: 245.30, date: "2024-01-14", value: 1226.50 },
    { type: "BUY", symbol: "MSFT", shares: 5, price: 420.75, date: "2024-01-12", value: 2103.75 },
  ]

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.1),transparent_50%)]"></div>
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  <Activity className="w-4 h-4 mr-2" />
                  Live Portfolio
                </Badge>
              </div>
              <h1 className="text-4xl font-bold mb-3">Portfolio Overview</h1>
              <p className="text-blue-100 text-lg">Welcome back, {username}</p>
            </div>
            <div className="mt-6 md:mt-0 text-right">
              <div className="text-3xl font-bold mb-2">${portfolioValue.toLocaleString()}</div>
              <div className={`flex items-center justify-end text-lg ${dayChange >= 0 ? 'text-green-300' : 'text-red-300'}`}>
                {dayChange >= 0 ? <TrendingUp className="h-5 w-5 mr-2" /> : <TrendingDown className="h-5 w-5 mr-2" />}
                ${Math.abs(dayChange).toLocaleString()} ({dayChangePercent >= 0 ? '+' : ''}{dayChangePercent}%)
              </div>
            </div>
          </div>
          <div className="flex gap-4 mt-6">
            <Link href="/app/trade">
              <Button className="bg-white text-blue-600 hover:bg-blue-50 font-semibold">
                <Plus className="h-4 w-4 mr-2" />
                Add Position
              </Button>
            </Link>
            <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
      </div>

      {/* Portfolio Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${portfolioValue.toLocaleString()}</div>
            <div className={`flex items-center text-xs ${dayChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {dayChange >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
              ${Math.abs(dayChange).toLocaleString()} ({dayChangePercent >= 0 ? '+' : ''}{dayChangePercent}%) today
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Return</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+${totalReturn.toLocaleString()}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +{totalReturnPercent}% all time
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Positions</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{holdings.length}</div>
            <p className="text-xs text-muted-foreground">Active holdings</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Diversity Score</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7.2</div>
            <p className="text-xs text-muted-foreground">Good diversification</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="holdings" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-slate-100">
          <TabsTrigger value="holdings" className="data-[state=active]:bg-white">Holdings</TabsTrigger>
          <TabsTrigger value="performance" className="data-[state=active]:bg-white">Performance</TabsTrigger>
          <TabsTrigger value="activity" className="data-[state=active]:bg-white">Activity</TabsTrigger>
        </TabsList>

        {/* Holdings Tab */}
        <TabsContent value="holdings" className="space-y-6">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Your Holdings</CardTitle>
                  <CardDescription>Current positions in your portfolio</CardDescription>
                </div>
                <Badge variant="secondary" className="bg-emerald-50 text-emerald-700">
                  <Zap className="w-3 h-3 mr-1" />
                  Live Prices
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {holdings.map((holding) => (
                  <div key={holding.symbol} className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                        <span className="font-bold text-white text-lg">{holding.symbol[0]}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{holding.symbol}</h3>
                        <p className="text-sm text-gray-600">{holding.name}</p>
                        <p className="text-xs text-gray-500">{holding.shares} shares @ ${holding.currentPrice}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-lg">${holding.value.toLocaleString()}</p>
                      <p className={`text-sm font-medium ${holding.dayChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {holding.dayChange >= 0 ? '+' : ''}{holding.dayChange}%
                      </p>
                      <p className="text-xs text-gray-500">{holding.allocation}% of portfolio</p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Link href={`/app/markets/${holding.symbol}`}>
                        <Button variant="outline" size="sm" className="hover:bg-blue-50">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button variant="outline" size="sm" className="hover:bg-red-50">
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Portfolio Allocation</CardTitle>
                <CardDescription>Distribution by holdings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {holdings.map((holding, index) => (
                    <div key={holding.symbol} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded-full ${
                          index === 0 ? 'bg-blue-500' : 
                          index === 1 ? 'bg-emerald-500' : 
                          index === 2 ? 'bg-purple-500' : 'bg-orange-500'
                        }`}></div>
                        <span className="text-sm font-medium">{holding.symbol}</span>
                      </div>
                      <span className="text-sm text-gray-600 font-semibold">{holding.allocation}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Key portfolio statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between p-3 bg-slate-50 rounded-xl">
                    <span className="text-sm text-gray-600">30-Day Return</span>
                    <span className="text-sm font-medium text-green-600">+5.2%</span>
                  </div>
                  <div className="flex justify-between p-3 bg-slate-50 rounded-xl">
                    <span className="text-sm text-gray-600">90-Day Return</span>
                    <span className="text-sm font-medium text-green-600">+12.8%</span>
                  </div>
                  <div className="flex justify-between p-3 bg-slate-50 rounded-xl">
                    <span className="text-sm text-gray-600">1-Year Return</span>
                    <span className="text-sm font-medium text-green-600">+{totalReturnPercent}%</span>
                  </div>
                  <div className="flex justify-between p-3 bg-slate-50 rounded-xl">
                    <span className="text-sm text-gray-600">Volatility</span>
                    <span className="text-sm font-medium">18.4%</span>
                  </div>
                  <div className="flex justify-between p-3 bg-slate-50 rounded-xl">
                    <span className="text-sm text-gray-600">Sharpe Ratio</span>
                    <span className="text-sm font-medium">1.24</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity" className="space-y-6">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest transactions and portfolio changes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((transaction, index) => (
                  <div key={index} className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors">
                    <div className="flex items-center space-x-4">
                      <Badge variant={transaction.type === 'BUY' ? 'default' : 'secondary'} className={
                        transaction.type === 'BUY' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }>
                        {transaction.type}
                      </Badge>
                      <div>
                        <p className="font-medium text-lg">{transaction.symbol}</p>
                        <p className="text-sm text-gray-600">
                          {transaction.shares} shares @ ${transaction.price}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-lg">${transaction.value.toLocaleString()}</p>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(transaction.date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}