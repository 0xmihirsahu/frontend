"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart3, Zap } from "lucide-react"
import { PixelTrail } from "@/components/ui/pixel-trail"
import { useScreenSize } from "@/hooks/use-screen-size"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Features } from "@/components/features"
import DefaultFooter from "@/components/Footer"
import { Waves } from "@/components/wave-background"
import { useReserveContract } from "@/hooks/useReserveContract"
import { useTotalSupply } from "@/hooks/view/useTotalSupply"
import { useMarketData } from "@/hooks/useMarketData"

export default function HomePage() {
  const screenSize = useScreenSize()

  // Hooks for proof-of-reserve calculation
  const { totalSupply, isLoading: totalSupplyLoading } = useTotalSupply()
  const { price: currentPrice, isLoading: priceLoading } = useMarketData("LQD")
  const RESERVE_CONTRACT_ADDRESS = "0xf26c960Abf98875f87764502f64e8F5ef9134C20"
  const { totalReserves } = useReserveContract(RESERVE_CONTRACT_ADDRESS)

  // Calculate total volume using proof-of-reserve logic
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getTotalVolume = () => {
    if (totalSupplyLoading || priceLoading) {
      return "Loading..."
    }

    if (totalReserves) {
      // Use total reserves from contract (convert from wei) * price
      return formatCurrency((Number(totalReserves) / 1e6) * (currentPrice || 0))
    } else {
      // Fallback to total supply * price
      return formatCurrency(totalSupply * (currentPrice || 0))
    }
  }

  const platformStats = [
    { value: getTotalVolume(), label: "Total Volume", change: "+12.5%" },
    { value: "1,247", label: "Active Users", change: "+8.2%" },
    { value: "99.9%", label: "Uptime", change: "Stable" },
    { value: "0.1%", label: "Trading Fees", change: "Low Cost" },
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
        <div className="absolute inset-0 z-0">
          <PixelTrail
            fadeDuration={1200}
            delay={300}
            pixelClassName="rounded-2xl bg-emerald-600/15"
            pixelSize={screenSize.lessThan("md") ? 40 : 60}
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <Badge
              variant="secondary"
              className="mb-6 px-4 py-2 text-sm font-medium bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-100 hover:text-emerald-800 hover:border-emerald-200"
            >
              <Zap className="w-4 h-4 mr-2" />
              Live Trading Platform
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-8 tracking-tight">
              Spout Finance
            </h1>

            <p className="text-lg md:text-xl text-slate-600 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
              Professional trading platform with real-time market data,
              portfolio analytics, and seamless token swapping. Built for
              serious investors.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
            <Link href="/app">
              <Button
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Launch Platform
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/markets">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-slate-300 hover:border-emerald-600 text-slate-700 hover:text-emerald-600 px-10 py-4 text-lg font-semibold rounded-2xl transition-all duration-300"
              >
                <BarChart3 className="mr-3 h-5 w-5" />
                View Markets
              </Button>
            </Link>
          </div>

          {/* Live Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {platformStats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-3xl bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="text-3xl font-bold text-slate-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-600 mb-1">{stat.label}</div>
                <div
                  className={`text-xs font-medium ${stat.change.includes("+") ? "text-emerald-600" : stat.change.includes("-") ? "text-red-500" : "text-slate-500"}`}
                >
                  {stat.change}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proof of Reserve Section */}
      <section className="relative py-24 bg-gradient-to-b from-neutral-800 to-emerald-800 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Waves />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-slate-900 mb-6">
              Proof of Reserve
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Every token is fully backed 1:1 by investment-grade bond ETFs,
              held by qualified U.S. custodians for maximum security.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="bg-white/90 backdrop-blur-md border-emerald-200/30 hover:bg-white/95 transition-all duration-300 rounded-2xl shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-2xl font-bold text-slate-900">
                      $2.4B
                    </div>
                    <div className="text-slate-600 text-sm">
                      Total Reserve Value
                    </div>
                  </div>
                  <div className="px-4 py-2 rounded-full text-sm font-bold bg-emerald-100 text-emerald-800">
                    Verified
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Backing Ratio</span>
                    <span className="font-bold text-slate-900 text-xl">
                      1:1
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Last Audit</span>
                    <span className="font-semibold text-slate-900">Today</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-md border-emerald-200/30 hover:bg-white/95 transition-all duration-300 rounded-2xl shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-2xl font-bold text-slate-900">
                      AAA-Rated
                    </div>
                    <div className="text-slate-600 text-sm">ETF Backing</div>
                  </div>
                  <div className="px-4 py-2 rounded-full text-sm font-bold bg-blue-100 text-blue-800">
                    LQD
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Primary ETF</span>
                    <span className="font-bold text-slate-900 text-xl">
                      LQD
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Custodian</span>
                    <span className="font-semibold text-slate-900">
                      U.S. Qualified
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-md border-emerald-200/30 hover:bg-white/95 transition-all duration-300 rounded-2xl shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-2xl font-bold text-slate-900">
                      100%
                    </div>
                    <div className="text-slate-600 text-sm">Collateralized</div>
                  </div>
                  <div className="px-4 py-2 rounded-full text-sm font-bold bg-green-100 text-green-800">
                    Secure
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Reserve Type</span>
                    <span className="font-bold text-slate-900 text-xl">
                      Bonds
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Insurance</span>
                    <span className="font-semibold text-slate-900">FDIC</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-emerald-200/30">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  Investment-Grade Security
                </h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Each token is backed 1:1 by investment-grade bond ETFs like
                  LQD, held by a qualified U.S. custodian. This ensures maximum
                  security and stability for your investments.
                </p>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    AAA-rated corporate bond ETFs
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    Qualified U.S. custodian oversight
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    Real-time reserve verification
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  Transparent Reserves
                </h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Our proof of reserve system provides complete transparency.
                  View real-time data showing exactly how your tokens are backed
                  by high-quality, liquid assets.
                </p>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    Daily reserve audits
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    Public blockchain verification
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    Independent third-party validation
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link href="/app">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-slate-300 hover:border-emerald-600 text-slate-700 hover:text-emerald-600 px-8 py-3 rounded-xl"
              >
                View Reserve Details
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 bg-white overflow-hidden">
        <PixelTrail
          fadeDuration={1200}
          delay={300}
          pixelClassName="rounded-2xl bg-emerald-600/15"
          pixelSize={screenSize.lessThan("md") ? 40 : 60}
        />
        <Features />
      </section>

      {/* Animated Footer */}
      <DefaultFooter />
    </div>
  )
}
