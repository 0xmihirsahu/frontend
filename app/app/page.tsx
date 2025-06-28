'use client';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, TrendingUp, Wallet, Settings, ArrowRight } from 'lucide-react';

export default function DashboardPage() {
  const features = [
    {
      title: 'Markets',
      description: 'Track real-time stock prices and market data',
      icon: BarChart3,
      href: '/markets',
      color: 'text-blue-600'
    },
    {
      title: 'Portfolio',
      description: 'Manage your investments and track performance',
      icon: TrendingUp,
      href: '/app/portfolio',
      color: 'text-green-600'
    },
    {
      title: 'Trade',
      description: 'Buy and sell stocks with ease',
      icon: Wallet,
      href: '/app/trade',
      color: 'text-purple-600'
    },
    {
      title: 'Settings',
      description: 'Configure your account preferences',
      icon: Settings,
      href: '/app/settings',
      color: 'text-gray-600'
    }
  ];

  return (
    <div className="flex flex-col min-h-full">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Spout Finance</h1>
        <p className="text-lg text-gray-600">Your comprehensive financial dashboard</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Portfolio Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,450.67</div>
            <div className="text-green-600 text-sm">+$234.12 (+1.92%)</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Positions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <div className="text-gray-600 text-sm">Stocks</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Today's P&L</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+$156.78</div>
            <div className="text-gray-600 text-sm">+1.28%</div>
          </CardContent>
        </Card>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature) => {
          const IconComponent = feature.icon;
          return (
            <Link key={feature.title} href={feature.href}>
              <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <IconComponent className={`h-8 w-8 ${feature.color}`} />
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/markets">
            <Button variant="outline">
              <BarChart3 className="mr-2 h-4 w-4" />
              View Markets
            </Button>
          </Link>
          <Link href="/app/trade">
            <Button variant="outline">
              <Wallet className="mr-2 h-4 w-4" />
              Start Trading
            </Button>
          </Link>
          <Link href="/app/portfolio">
            <Button variant="outline">
              <TrendingUp className="mr-2 h-4 w-4" />
              Check Portfolio
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
