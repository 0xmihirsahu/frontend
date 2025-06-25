import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, TrendingUp, PieChart, FileText, Settings, BarChart3, DollarSign } from 'lucide-react'

export default function HomePage() {
  const features = [
    {
      icon: <TrendingUp className="h-8 w-8 text-blue-600" />,
      title: "Live Markets",
      description: "Real-time stock prices and interactive charts powered by Alpha Vantage API",
      href: "/markets",
      color: "bg-blue-50 border-blue-200"
    },
    {
      icon: <PieChart className="h-8 w-8 text-green-600" />,
      title: "Portfolio Management",
      description: "Track your investments and asset allocation with detailed analytics",
      href: "/portfolio",
      color: "bg-green-50 border-green-200"
    },
    {
      icon: <FileText className="h-8 w-8 text-purple-600" />,
      title: "Statements & Reports",
      description: "Access your trading statements and financial reports",
      href: "/statements",
      color: "bg-purple-50 border-purple-200"
    },
    {
      icon: <Settings className="h-8 w-8 text-gray-600" />,
      title: "Account Settings",
      description: "Manage your preferences and account configuration",
      href: "/settings",
      color: "bg-gray-50 border-gray-200"
    }
  ]

  const marketHighlights = [
    { symbol: "AAPL", name: "Apple Inc.", price: "$189.84", change: "+2.1%" },
    { symbol: "TSLA", name: "Tesla Inc.", price: "$248.42", change: "-1.3%" },
    { symbol: "MSFT", name: "Microsoft", price: "$424.58", change: "+0.8%" },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Your Financial
            <span className="text-blue-600 block">Dashboard</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Track markets, manage your portfolio, and make informed investment decisions with real-time data and professional-grade analytics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/markets">
              <Button size="lg" className="w-full sm:w-auto">
                <BarChart3 className="mr-2 h-5 w-5" />
                Explore Markets
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <PieChart className="mr-2 h-5 w-5" />
                View Portfolio
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Market Overview */}
      <section className="py-8 mb-12">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Market Snapshot</h2>
            <Link href="/markets">
              <Button variant="ghost" size="sm">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {marketHighlights.map((stock) => (
              <div key={stock.symbol} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{stock.symbol}</div>
                  <div className="text-sm text-gray-600">{stock.name}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">{stock.price}</div>
                  <div className={`text-sm ${stock.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stock.change}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything you need</h2>
          <p className="text-lg text-gray-600">
            Comprehensive tools for modern portfolio management
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature) => (
            <Link key={feature.title} href={feature.href}>
              <Card className={`hover:shadow-lg transition-all duration-300 cursor-pointer ${feature.color} hover:scale-105`}>
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-white rounded-lg shadow-sm">
                      {feature.icon}
                    </div>
                    <div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                      <CardDescription className="mt-2 text-gray-600">
                        {feature.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm font-medium text-gray-700">
                    Get started <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 mt-12 bg-gradient-to-r from-blue-50 to-indigo-100 rounded-xl">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Platform Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Stocks Available</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">Real-time</div>
              <div className="text-gray-600">Market Data</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-gray-600">Platform Access</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
