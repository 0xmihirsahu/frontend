"use client"
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, BarChart3 } from 'lucide-react'
import { PixelTrail } from '@/components/ui/pixel-trail'
import { useScreenSize } from '@/hooks/use-screen-size'
import { GradientBars } from '@/components/gradient-bar'

export default function HomePage() {

  const screenSize = useScreenSize()
  const marketHighlights = [
    { symbol: "AAPL", name: "Apple Inc.", price: "$189.84", change: "+2.1%" },
    { symbol: "TSLA", name: "Tesla Inc.", price: "$248.42", change: "-1.3%" },
    { symbol: "MSFT", name: "Microsoft", price: "$424.58", change: "+0.8%" },
  ]

  return (
    <div className="min-h-screen px-4 py-6 md:px-8 lg:px-12 xl:px-16 max-w-7xl mx-auto w-full">
      {/* Hero Section */}
      <section className="relative py-12 md:py-20">
        <div className="absolute inset-0 z-0">
          {/* <PixelTrail fadeDuration={0}
            delay={1200} pixelClassName="rounded-full bg-emerald-600" pixelSize={screenSize.lessThan(`md`) ? 48 : 80}/> */}
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Your Financial
            <span className="text-emerald-600 block">Dashboard</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Track markets, manage your portfolio, and make informed investment decisions with real-time data and professional-grade analytics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/markets" className="w-full sm:w-auto block">
              <Button size="lg" className="w-full bg-emerald-600 text-white hover:bg-emerald-700 transition-colors">
                <BarChart3 className="mr-2 h-5 w-5" />
                Explore Markets
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/app" className="w-full sm:w-auto block">
              <Button size="lg" className="w-full bg-emerald-600 text-white hover:bg-emerald-700 transition-colors">
                <ArrowRight className="ml-2 h-5 w-5" />
                Launch App
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
      {/* Stats Section */}
      <section className="relative py-12 mt-12 bg-gradient-to-r from-blue-50 to-indigo-100 rounded-xl">
        <div className="absolute inset-0 z-0">
          <GradientBars/>
        </div>
        <div className="relative z-10 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Platform Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-ibmPlexMono font-bold text-blue-600 mb-2">500+</div>
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
