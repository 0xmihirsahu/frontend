"use client"
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, BarChart3, TrendingUp, Wallet, Settings, Eye, RefreshCw, PieChart, Activity, Shield, Zap, Users } from 'lucide-react'
import { PixelTrail } from '@/components/ui/pixel-trail'
import { useScreenSize } from '@/hooks/use-screen-size'
import { GradientBars } from '@/components/gradient-bar'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Features } from '@/components/features'

export default function HomePage() {
  const screenSize = useScreenSize()
  
  const platformStats = [
    { value: "$2.4M", label: "Total Volume", change: "+12.5%" },
    { value: "1,247", label: "Active Users", change: "+8.2%" },
    { value: "99.9%", label: "Uptime", change: "Stable" },
    { value: "0.1%", label: "Trading Fees", change: "Low Cost" }
  ]

  const liveMarkets = [
    { symbol: "AAPL", price: "$189.84", change: "+2.1%", volume: "45.2M" },
    { symbol: "TSLA", price: "$248.42", change: "-1.3%", volume: "32.1M" },
    { symbol: "MSFT", price: "$424.58", change: "+0.8%", volume: "28.7M" },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-50 via-emerald-50/20 to-slate-100">
          <PixelTrail 
            fadeDuration={1200}
            delay={300} 
            pixelClassName="rounded-xl bg-emerald-600/15" 
            pixelSize={screenSize.lessThan('md') ? 40 : 60}
          />
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium bg-emerald-100 text-emerald-800 border-emerald-200">
              <Zap className="w-4 h-4 mr-2" />
              Live Trading Platform
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-8 tracking-tight">
              Spout Finance
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
              Professional trading platform with real-time market data, portfolio analytics, 
              and seamless token swapping. Built for serious investors.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
            <Link href="/app">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Launch Platform
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/markets">
              <Button variant="outline" size="lg" className="border-2 border-slate-300 hover:border-emerald-600 text-slate-700 hover:text-emerald-600 px-10 py-4 text-lg font-semibold rounded-2xl transition-all duration-300">
                <BarChart3 className="mr-3 h-5 w-5" />
                View Markets
              </Button>
            </Link>
          </div>

          {/* Live Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {platformStats.map((stat, index) => (
              <div key={index} className="text-center p-6 rounded-3xl bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-3xl font-bold text-slate-900 mb-2">{stat.value}</div>
                <div className="text-sm text-slate-600 mb-1">{stat.label}</div>
                <div className={`text-xs font-medium ${stat.change.includes('+') ? 'text-emerald-600' : stat.change.includes('-') ? 'text-red-500' : 'text-slate-500'}`}>
                  {stat.change}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Markets Section */}
      <section className="relative py-24 bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <GradientBars />
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">Live Market Data</h2>
            <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
              Real-time stock prices, volume data, and market analytics. 
              Updated every second.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {liveMarkets.map((stock, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 rounded-2xl">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="text-2xl font-bold text-white">{stock.symbol}</div>
                      <div className="text-emerald-200 text-sm">Live Price</div>
                    </div>
                    <div className={`px-4 py-2 rounded-full text-sm font-bold ${
                      stock.change.startsWith('+') 
                        ? 'bg-green-500/20 text-green-300' 
                        : 'bg-red-500/20 text-red-300'
                    }`}>
                      {stock.change}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-emerald-200">Price</span>
                      <span className="font-bold text-white text-xl">{stock.price}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-emerald-200">Volume</span>
                      <span className="font-semibold text-emerald-300">{stock.volume}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link href="/markets">
              <Button variant="outline" size="lg" className="border-2 border-white/30 hover:border-white text-white hover:bg-white/10 px-8 py-3 rounded-xl">
                View All Markets
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <Features />

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.1),transparent_50%)]"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold mb-6">
            Start Trading Today
          </h2>
          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
            Join thousands of traders using our platform for real-time market data, 
            portfolio management, and seamless trading.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/app">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-12 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                Launch Platform
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/markets">
              <Button variant="outline" size="lg" className="border-2 border-white/30 hover:border-white text-white hover:bg-white/10 px-12 py-4 text-lg font-semibold rounded-2xl">
                <Eye className="mr-3 h-5 w-5" />
                View Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}