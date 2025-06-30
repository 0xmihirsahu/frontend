'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useReserveContract } from '@/hooks/useReserveContract';
import { 
  TrendingUp, 
  Shield, 
  DollarSign, 
  BarChart3, 
  RefreshCw, 
  Download,
  Eye,
  Calendar,
  Percent,
  ArrowUpRight,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

// Mock data for T-bills and Corporate Bonds
const tBillsData = {
  totalBalance: 425000, // $1.25B
  totalValue: 424500, // $1.24875B
  price: 99.90,
  change: 0.05,
  changePercent: 0.05,
  maturity: '3 months',
  yield: 2.15,
  lastUpdated: '2024-01-15T10:30:00Z',
  holdings: [
    { ticker: 'TB3M', name: '3-Month T-Bill', balance: 45000, value: 44955, price: 99.90, yield: 2.15 },
    { ticker: 'TB6M', name: '6-Month T-Bill', balance: 36000, value: 35976, price: 99.90, yield: 2.25 },
    { ticker: 'TB1Y', name: '1-Year T-Bill', balance: 31500, value: 31471.5, price: 99.90, yield: 2.35 }
  ]
};

const corporateBondsData = {
  totalBalance: 21500, // $1.15B
  totalValue: 21485, // $1.14885B
  price: 99.87,
  change: -0.03,
  changePercent: -0.03,
  rating: 'AAA',
  yield: 3.85,
  lastUpdated: '2024-01-15T10:30:00Z',
  holdings: [
    { ticker: 'LQD', name: 'iShares iBoxx $ Investment Grade Corporate Bond ETF', balance: 60000, value: 59922, price: 99.87, yield: 3.85 },
    { ticker: 'VCIT', name: 'Vanguard Intermediate-Term Corporate Bond ETF', balance: 35000, value: 34954.5, price: 99.87, yield: 3.95 },
    { ticker: 'IGIB', name: 'iShares Intermediate-Term Corporate Bond ETF', balance: 20000, value: 19974, price: 99.87, yield: 3.75 }
  ]
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const formatNumber = (num: number) => {
  return new Intl.NumberFormat('en-US').format(num);
};

const ProofOfReservePage = () => {
  const totalReserveValue = tBillsData.totalValue + corporateBondsData.totalValue;
  const totalBalance = tBillsData.totalBalance + corporateBondsData.totalBalance;
  const reserveRatio = (totalReserveValue / totalBalance) * 100;
  const RESERVE_CONTRACT_ADDRESS = '0xf26c960Abf98875f87764502f64e8F5ef9134C20'

  const { requestReserves, isRequestPending, totalReserves, refetchReserves } = useReserveContract(RESERVE_CONTRACT_ADDRESS);

  const handleRequestReserves = () => {
    requestReserves(BigInt(379));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between">
    <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Proof of Reserve</h1>
          <p className="text-gray-600">Real-time verification of our reserve holdings and backing</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline" size="sm" onClick={handleRequestReserves} isDisabled={isRequestPending}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isRequestPending ? 'animate-spin' : ''}`} />
            {isRequestPending ? 'Requesting...' : 'Request Reserves'}
          </Button>
          <Button variant="outline" size="sm" onClick={() => refetchReserves()}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reserve Value</CardTitle>
            <Shield className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalReserves ? formatCurrency(Number(totalReserves) / 1e6) : formatCurrency(totalReserveValue)}
            </div>
            <div className="flex items-center text-xs text-emerald-600">
              <CheckCircle className="h-3 w-3 mr-1" />
              Fully Backed
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reserve Ratio</CardTitle>
            <Percent className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reserveRatio.toFixed(2)}%</div>
            <div className="text-xs text-blue-600">1:1 Backing</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">T-Bills Value</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(tBillsData.totalValue)}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              {tBillsData.changePercent > 0 ? '+' : ''}{tBillsData.changePercent}%
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Corporate Bonds</CardTitle>
            <BarChart3 className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(corporateBondsData.totalValue)}</div>
            <div className="flex items-center text-xs text-purple-600">
              <Badge variant="secondary" className="text-xs">AAA-Rated</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="t-bills">T-Bills</TabsTrigger>
          <TabsTrigger value="corporate-bonds">Corporate Bonds</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Allocation Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Reserve Allocation</CardTitle>
                <CardDescription>Distribution of our reserve holdings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-500 rounded"></div>
                      <span className="text-sm">T-Bills</span>
                    </div>
                    <div className="text-sm font-medium">
                      {((tBillsData.totalValue / totalReserveValue) * 100).toFixed(1)}%
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${(tBillsData.totalValue / totalReserveValue) * 100}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-purple-500 rounded"></div>
                      <span className="text-sm">Corporate Bonds</span>
                    </div>
                    <div className="text-sm font-medium">
                      {((corporateBondsData.totalValue / totalReserveValue) * 100).toFixed(1)}%
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-500 h-2 rounded-full" 
                      style={{ width: `${(corporateBondsData.totalValue / totalReserveValue) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reserve Status */}
            <Card>
              <CardHeader>
                <CardTitle>Reserve Status</CardTitle>
                <CardDescription>Current verification status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="font-medium">Reserves Verified</span>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Active
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-blue-600" />
                      <span className="font-medium">Custodian Status</span>
                    </div>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      Secure
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-purple-600" />
                      <span className="font-medium">Last Audit</span>
                    </div>
                    <span className="text-sm text-gray-600">Today</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* T-Bills Tab */}
        <TabsContent value="t-bills" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Treasury Bills Holdings</CardTitle>
              <CardDescription>Government-backed securities with guaranteed returns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Summary Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{formatCurrency(tBillsData.totalValue)}</div>
                    <div className="text-sm text-gray-600">Total Value</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{tBillsData.price}</div>
                    <div className="text-sm text-gray-600">Average Price</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{tBillsData.yield}%</div>
                    <div className="text-sm text-gray-600">Average Yield</div>
                  </div>
                </div>

                {/* Holdings Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium">Ticker</th>
                        <th className="text-left py-3 px-4 font-medium">Name</th>
                        <th className="text-right py-3 px-4 font-medium">Balance</th>
                        <th className="text-right py-3 px-4 font-medium">Value</th>
                        <th className="text-right py-3 px-4 font-medium">Price</th>
                        <th className="text-right py-3 px-4 font-medium">Yield</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tBillsData.holdings.map((holding, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium">{holding.ticker}</td>
                          <td className="py-3 px-4">{holding.name}</td>
                          <td className="py-3 px-4 text-right">{formatCurrency(holding.balance)}</td>
                          <td className="py-3 px-4 text-right">{formatCurrency(holding.value)}</td>
                          <td className="py-3 px-4 text-right">{holding.price}</td>
                          <td className="py-3 px-4 text-right">{holding.yield}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Corporate Bonds Tab */}
        <TabsContent value="corporate-bonds" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Corporate Bonds Holdings</CardTitle>
              <CardDescription>AAA-rated investment-grade corporate bond ETFs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Summary Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{formatCurrency(corporateBondsData.totalValue)}</div>
                    <div className="text-sm text-gray-600">Total Value</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{corporateBondsData.price}</div>
                    <div className="text-sm text-gray-600">Average Price</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{corporateBondsData.yield}%</div>
                    <div className="text-sm text-gray-600">Average Yield</div>
                  </div>
                </div>

                {/* Holdings Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium">Ticker</th>
                        <th className="text-left py-3 px-4 font-medium">Name</th>
                        <th className="text-right py-3 px-4 font-medium">Balance</th>
                        <th className="text-right py-3 px-4 font-medium">Value</th>
                        <th className="text-right py-3 px-4 font-medium">Price</th>
                        <th className="text-right py-3 px-4 font-medium">Yield</th>
                      </tr>
                    </thead>
                    <tbody>
                      {corporateBondsData.holdings.map((holding, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium">{holding.ticker}</td>
                          <td className="py-3 px-4">{holding.name}</td>
                          <td className="py-3 px-4 text-right">{formatCurrency(holding.balance)}</td>
                          <td className="py-3 px-4 text-right">{formatCurrency(holding.value)}</td>
                          <td className="py-3 px-4 text-right">{holding.price}</td>
                          <td className="py-3 px-4 text-right">{holding.yield}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Verification Info */}
      <Card>
        <CardHeader>
          <CardTitle>Reserve Verification</CardTitle>
          <CardDescription>How we ensure transparency and security</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-semibold mb-2">Daily Audits</h4>
              <p className="text-sm text-gray-600">Automated verification of all reserve holdings every 24 hours</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-semibold mb-2">Custodian Oversight</h4>
              <p className="text-sm text-gray-600">All assets held by qualified U.S. custodians with regulatory oversight</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Eye className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="font-semibold mb-2">Public Verification</h4>
              <p className="text-sm text-gray-600">Blockchain-based proof allowing public verification of reserves</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProofOfReservePage; 