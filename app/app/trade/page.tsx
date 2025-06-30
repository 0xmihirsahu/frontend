"use client"
import StockChart from '@/components/StockChart'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowUpDown, TrendingUp, Zap, Shield, Clock, DollarSign, ArrowDownCircle, ArrowUpCircle } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useAccount, useConfig } from 'wagmi'
import {encryptValue} from '@/lib/inco-lite'
import { useERC20Approve } from '@/hooks/useERC20Approve'
import { useConfidentialOrdersContract } from '@/hooks/useConfidentialOrdersContract'
import { waitForTransactionReceipt } from 'wagmi/actions'

const TOKENS = [
  { label: 'LQD', value: 'LQD' },
  { label: 'MSFT', value: 'MSFT' },
  { label: 'AAPL', value: 'AAPL' },
]

const CONFIDENTIAL_ORDERS_ADDRESS = '0x02A3bf058A4B74CeeA4A4cA141908Cef33990de0'
const USDC_ADDRESS = '0x036CbD53842c5426634e7929541eC2318f3dCF7e'
const RWA_TOKEN_ADDRESS = '0xB5F83286a6F8590B4d01eC67c885252Ec5d0bdDB'

const Page = () => {
  const [selectedToken, setSelectedToken] = useState('LQD')
  const [tokenData, setTokenData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [buyUsdc, setBuyUsdc] = useState('')
  const [sellToken, setSellToken] = useState('')

  // Mock balances
  const mockUsdcBalance = 1234.56
  const mockTokenBalance = 789.01

  const { address: userAddress } = useAccount()
  const { approve, isPending: isApprovePending } = useERC20Approve(USDC_ADDRESS)
  const { buyAsset, isBuyAssetPending } = useConfidentialOrdersContract(CONFIDENTIAL_ORDERS_ADDRESS)
  const config = useConfig()

  useEffect(() => {
    async function fetchTokenData() {
      setLoading(true)
      try {
        const res = await fetch(`/api/stocks/${selectedToken}`)
        const json = await res.json()
        setTokenData(json.data || [])
      } catch (e) {
        setTokenData([])
      }
      setLoading(false)
    }
    fetchTokenData()
  }, [selectedToken])

  // Get latest price
  const latestPrice = tokenData.length > 0 ? tokenData[tokenData.length - 1].close : 0

  // Estimate calculations
  const estimatedTokens = buyUsdc && latestPrice ? (parseFloat(buyUsdc) / latestPrice).toFixed(4) : ''
  const estimatedUsdc = sellToken && latestPrice ? (parseFloat(sellToken) * latestPrice).toFixed(2) : ''

  const handleBuy = async () => {
    if (!userAddress || !buyUsdc) return
    const amount = BigInt(Math.floor(Number(buyUsdc) * 1e6)) // USDC has 6 decimals
    try {
      console.log('Starting approve for', CONFIDENTIAL_ORDERS_ADDRESS, 'amount', amount.toString())
      const approveTx = await approve(CONFIDENTIAL_ORDERS_ADDRESS, amount)
      console.log('Approve tx sent:', approveTx)
      console.log('Waiting for approve confirmation...')
      await waitForTransactionReceipt(config, { hash: approveTx })
      console.log('Approve confirmed')
      // 2. Encrypt the amount
      console.log('Encrypting amount:', amount.toString())
      const encryptedAmount = await encryptValue({
        value: amount,
        address: userAddress,
        contractAddress: CONFIDENTIAL_ORDERS_ADDRESS,
      })
      console.log('Encrypted amount:', encryptedAmount)
      // 3. Call buyAsset
      console.log('Calling buyAsset with:', {
        asset: selectedToken,
        ticker: selectedToken,
        token: RWA_TOKEN_ADDRESS,
        encryptedAmount,
        subscriptionId: BigInt(379),
        orderAddr: userAddress
      })
      buyAsset(
        selectedToken, // asset
        selectedToken, // ticker
        RWA_TOKEN_ADDRESS as `0x${string}`,
        encryptedAmount as `0x${string}`,
        BigInt(379), // subscriptionId (mock)
        userAddress as `0x${string}`
      )
      console.log('buyAsset transaction sent')
    } catch (err) {
      console.error('Error in handleBuy:', err)
    }
  }
  const handleSell = () => {
    // TODO: Implement sell logic for selectedToken
    alert(`Sell ${sellToken} ${selectedToken} for ≈ ${estimatedUsdc} USDC`)
  }

  const recentTrades = [
    { pair: 'USDC → RWA', amount: '1,000', time: '2 min ago', status: 'Completed' },
    { pair: 'RWA → USDC', amount: '500', time: '15 min ago', status: 'Completed' },
    { pair: 'USDC → RWA', amount: '2,500', time: '1 hour ago', status: 'Completed' },
  ]

  return (
    <div className="space-y-8 max-w-5xl mx-auto px-2 md:px-0">
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
            Trade between supported tokens and USDC instantly with industry-leading low fees and lightning-fast execution.
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

      {/* Token Selector */}
      <div className="flex justify-center gap-4 mt-4">
        {TOKENS.map(token => (
          <Button
            key={token.value}
            variant={selectedToken === token.value ? 'default' : 'outline'}
            onClick={() => setSelectedToken(token.value)}
            className="min-w-[80px]"
          >
            {token.label}
          </Button>
        ))}
      </div>

      {/* Chart Section */}
      <div className="mb-8">
        <StockChart data={tokenData} ticker={selectedToken} />
      </div>
      {/* Buy/Sell Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Buy */}
        <Card className="shadow-lg border-0 bg-gradient-to-br from-emerald-50 to-white hover:shadow-xl transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="flex items-center gap-2">
              <ArrowDownCircle className="text-emerald-500 w-6 h-6" />
              <div>
                <CardTitle className="text-lg">Buy {selectedToken}</CardTitle>
                <CardDescription className="text-xs">Deposit USDC to receive {selectedToken}</CardDescription>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-500">USDC Balance</div>
              <div className="font-bold text-emerald-700 text-base">{mockUsdcBalance.toLocaleString()} USDC</div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="mb-4">
              <label className="block text-xs text-slate-600 mb-1">USDC Amount</label>
              <input
                type="number"
                min="0"
                value={buyUsdc}
                onChange={e => setBuyUsdc(e.target.value)}
                placeholder={`USDC to deposit`}
                className="border border-emerald-200 focus:border-emerald-400 rounded px-3 py-2 w-full bg-white shadow-sm focus:outline-none transition"
              />
            </div>
            {buyUsdc && latestPrice > 0 && (
              <div className="mb-4 p-3 rounded-lg bg-emerald-50 border border-emerald-100">
                <div className="text-sm text-emerald-700 mb-1">
                  You will receive ≈ <span className="font-bold">{estimatedTokens} {selectedToken}</span>
                </div>
                <div className="text-xs text-orange-500">
                  Slippage (1%): You may receive as little as <span className="font-semibold">{(parseFloat(estimatedTokens) * 0.99).toFixed(4)} {selectedToken}</span>
                </div>
              </div>
            )}
            <Button className="w-full mt-2 font-semibold text-base py-2" onClick={handleBuy} isDisabled={!buyUsdc || isApprovePending || isBuyAssetPending}>
              {isApprovePending || isBuyAssetPending ? 'Processing...' : `Buy ${selectedToken}`}
            </Button>
          </CardContent>
        </Card>
        {/* Sell */}
        <Card className="shadow-lg border-0 bg-gradient-to-br from-slate-50 to-white hover:shadow-xl transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="flex items-center gap-2">
              <ArrowUpCircle className="text-blue-500 w-6 h-6" />
              <div>
                <CardTitle className="text-lg">Sell {selectedToken}</CardTitle>
                <CardDescription className="text-xs">Sell {selectedToken} for USDC</CardDescription>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-500">{selectedToken} Balance</div>
              <div className="font-bold text-blue-700 text-base">{mockTokenBalance.toLocaleString()} {selectedToken}</div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="mb-4">
              <label className="block text-xs text-slate-600 mb-1">{selectedToken} Amount</label>
              <input
                type="number"
                min="0"
                value={sellToken}
                onChange={e => setSellToken(e.target.value)}
                placeholder={`Amount of ${selectedToken} to sell`}
                className="border border-blue-200 focus:border-blue-400 rounded px-3 py-2 w-full bg-white shadow-sm focus:outline-none transition"
              />
            </div>
            {sellToken && latestPrice > 0 && (
              <div className="mb-4 p-3 rounded-lg bg-blue-50 border border-blue-100">
                <div className="text-sm text-blue-700 mb-1">
                  You will receive ≈ <span className="font-bold">{estimatedUsdc} USDC</span>
                </div>
                <div className="text-xs text-orange-500">
                  Slippage (1%): You may receive as little as <span className="font-semibold">{(parseFloat(estimatedUsdc) * 0.99).toFixed(2)} USDC</span>
                </div>
              </div>
            )}
            <Button className="w-full mt-2 font-semibold text-base py-2" onClick={handleSell} isDisabled={!sellToken}>
              Sell {selectedToken}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Main Trading Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Swap Interface */}
        <div className="lg:col-span-2">
          {/* Placeholder for the Swapinterface */}
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

export default Page