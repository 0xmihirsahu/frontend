import Swapinterface from '@/components/interfaces/Swapinterface'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowUpDown, TrendingUp, Zap, Shield, Clock, DollarSign } from 'lucide-react'
import React from 'react'

const page = () => {
  const tradingStats = [
    {
      title: 'Trading Fee',
      value: '0.1%',
      description: 'Industry-leading low fees',
      icon: DollarSign,
      color: 'text-emerald-600'
    },
    {
      title: 'Execution Speed',
      value: '<1s',
      description: 'Lightning-fast trades',
      icon: Clock,
      color: 'text-blue-600'
    },
    {
      title: 'Security',
      value: '100%',
      description: 'Bank-level protection',
      icon: Shield,
      color: 'text-purple-600'
    },
    {
      title: 'Success Rate',
      value: '99.9%',
      description: 'Reliable execution',
      icon: TrendingUp,
      color: 'text-green-600'
    }
  ]

  const recentTrades = [
    { pair: 'USDC → RWA', amount: '1,000', time: '2 min ago', status: 'Completed' },
    { pair: 'RWA → USDC', amount: '500', time: '15 min ago', status: 'Completed' },
    { pair: 'USDC → RWA', amount: '2,500', time: '1 hour ago', status: 'Completed' },
  ]

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.1),transparent_50%)]"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              <ArrowUpDown className="w-4 h-4 mr-2" />
              Live Trading
            </Badge>
          </div>
          <h1 className="text-4xl font-bold mb-3">Token Trading</h1>
          <p className="text-purple-100 text-lg mb-6 max-w-2xl">
            Swap between SUSC tokens and USDC instantly with industry-leading low fees and lightning-fast execution.
          </p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-300" />
              <span className="text-sm">Instant Settlement</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-300" />
              <span className="text-sm">Secure Trading</span>
            </div>
          </div>
        </div>
      </div>

      {/* Trading Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tradingStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-slate-50 rounded-xl">
                    <IconComponent className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                  <p className="text-sm text-slate-500">{stat.description}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Trading Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Swap Interface */}
        <div className="lg:col-span-2">
          <Swapinterface />
        </div>

        {/* Trading Info Sidebar */}
        <div className="space-y-6">
          {/* Market Info */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">Market Information</CardTitle>
              <CardDescription>Current trading conditions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-xl">
                <span className="text-sm font-medium">RWA Price</span>
                <span className="text-sm font-bold text-emerald-600">$1.00</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-xl">
                <span className="text-sm font-medium">24h Volume</span>
                <span className="text-sm font-bold text-blue-600">$2.4M</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-xl">
                <span className="text-sm font-medium">Liquidity</span>
                <span className="text-sm font-bold text-purple-600">$15.2M</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-orange-50 rounded-xl">
                <span className="text-sm font-medium">Slippage</span>
                <span className="text-sm font-bold text-orange-600">0.05%</span>
              </div>
            </CardContent>
          </Card>

          {/* Recent Trades */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">Recent Trades</CardTitle>
              <CardDescription>Your latest transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentTrades.map((trade, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                    <div>
                      <p className="text-sm font-medium">{trade.pair}</p>
                      <p className="text-xs text-slate-500">{trade.amount} tokens</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                        {trade.status}
                      </Badge>
                      <p className="text-xs text-slate-500 mt-1">{trade.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Trading Tips */}
          <Card className="border-0 shadow-md bg-gradient-to-br from-slate-50 to-slate-100">
            <CardHeader>
              <CardTitle className="text-lg">Trading Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                <p className="text-sm text-slate-600">Check slippage before large trades</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <p className="text-sm text-slate-600">Monitor gas fees during peak hours</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <p className="text-sm text-slate-600">Set price alerts for better timing</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default page