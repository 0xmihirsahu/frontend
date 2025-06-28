import { NextRequest, NextResponse } from 'next/server'

// Alpha Vantage API configuration
const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY || ''

interface AlphaVantageTimeSeries {
  [date: string]: {
    '1. open': string
    '2. high': string
    '3. low': string
    '4. close': string
    '5. volume': string
  }
}

interface AlphaVantageResponse {
  'Meta Data'?: {
    '1. Information': string
    '2. Symbol': string
    '3. Last Refreshed': string
    '4. Output Size': string
    '5. Time Zone': string
  }
  'Time Series (Daily)'?: AlphaVantageTimeSeries
  'Error Message'?: string
  'Note'?: string
  'Information'?: string
}

// Generate mock data for fallback
function generateMockData(ticker: string) {
  const basePrice = {
    'AAPL': 189.84,
    'TSLA': 248.42,
    'MSFT': 424.58,
    'GOOGL': 142.65,
    'AMZN': 153.75,
    'META': 487.25,
    'NVDA': 875.30,
    'NFLX': 485.50
  }[ticker] || 150.00

  const data = []
  const today = new Date()
  
  for (let i = 99; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    
    // Skip weekends
    if (date.getDay() === 0 || date.getDay() === 6) continue
    
    const randomFactor = 0.95 + Math.random() * 0.1 // ±5% variation
    const price = basePrice * randomFactor
    const variance = price * 0.02 // 2% intraday variance
    
    const open = price + (Math.random() - 0.5) * variance
    const close = price + (Math.random() - 0.5) * variance
    const high = Math.max(open, close) + Math.random() * variance * 0.5
    const low = Math.min(open, close) - Math.random() * variance * 0.5
    const volume = Math.floor(50000000 + Math.random() * 100000000) // 50M-150M volume
    
    data.push({
      time: date.toISOString().split('T')[0],
      open: Math.round(open * 100) / 100,
      high: Math.round(high * 100) / 100,
      low: Math.round(low * 100) / 100,
      close: Math.round(close * 100) / 100,
      volume
    })
  }
  
  return data
}

async function fetchRealStockData(ticker: string, retryCount = 0): Promise<any[]> {
  try {
    const apiurl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&outputsize=compact&apikey=${ALPHA_VANTAGE_API_KEY}`
    
    console.log(`Fetching data for ${ticker}, attempt ${retryCount + 1}`)
    
    const response = await fetch(apiurl, {
      headers: {
        'User-Agent': 'SpoutDashboard/1.0'
      }
    })
    
    if (!response.ok) {
      throw new Error(`Alpha Vantage API error: ${response.status}`)
    }
    
    const data: AlphaVantageResponse = await response.json()
    
    console.log('API Response keys:', Object.keys(data))
    
    // Check for various error conditions
    if (data['Error Message']) {
      console.error('API Error Message:', data['Error Message'])
      throw new Error('Invalid ticker symbol or API error')
    }
    
    if (data['Note']) {
      console.error('API Rate Limit:', data['Note'])
      throw new Error('API_RATE_LIMIT')
    }
    
    if (data['Information']) {
      console.error('API Information:', data['Information'])
      // This typically means rate limit or premium feature needed
      throw new Error('API_RATE_LIMIT')
    }
    
    if (!data['Time Series (Daily)']) {
      console.error('Missing Time Series data. Available keys:', Object.keys(data))
      
      // If we have meta data but no time series, it might be a partial response
      if (data['Meta Data']) {
        console.log('Meta Data found:', data['Meta Data'])
      }
      
      throw new Error('NO_TIME_SERIES_DATA')
    }
    
    // Convert Alpha Vantage data to our format
    const timeSeries = data['Time Series (Daily)']
    
    const stockData = Object.entries(timeSeries)
      .map(([date, values]: [string, any]) => ({
        time: date,
        open: parseFloat(values['1. open']),
        high: parseFloat(values['2. high']),
        low: parseFloat(values['3. low']),
        close: parseFloat(values['4. close']),
        volume: parseInt(values['5. volume'])
      }))
      .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime())
      .slice(-100) // Get last 100 days
    
    console.log(`Successfully fetched ${stockData.length} data points for ${ticker}`)
    return stockData
    
  } catch (error) {
    console.error(`Error fetching real stock data for ${ticker}:`, error)
    
    // If it's a rate limit error and we haven't retried, wait and try once more
    if (error instanceof Error && error.message === 'API_RATE_LIMIT' && retryCount === 0) {
      console.log('Rate limited, waiting 2 seconds before retry...')
      await new Promise(resolve => setTimeout(resolve, 2000))
      return fetchRealStockData(ticker, retryCount + 1)
    }
    
    throw error
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ ticker: string }> }
) {
  try {
    const { ticker } = await params
    
    if (!ticker) {
      return NextResponse.json(
        { error: 'Ticker symbol is required' },
        { status: 400 }
      )
    }
    
    const upperTicker = ticker.toUpperCase()
    let stockData: any[] = []
    let dataSource = 'real'
    let errorMessage = ''
    
    try {
      // Try to fetch real data first
      stockData = await fetchRealStockData(upperTicker)
      console.log(`✅ Real data fetched successfully for ${upperTicker}`)
    } catch (error) {
      console.log(`❌ Real data fetch failed for ${upperTicker}, using mock data`)
      
      if (error instanceof Error) {
        errorMessage = error.message
        console.log('Error details:', errorMessage)
      }
      
      // Fall back to mock data
      stockData = generateMockData(upperTicker)
      dataSource = 'mock'
    }
    
    if (!stockData || stockData.length === 0) {
      console.error('No stock data available (real or mock)')
      return NextResponse.json(
        { error: 'No data available for this ticker' },
        { status: 404 }
      )
    }
    
    // Get current price info
    const latestData = stockData[stockData.length - 1]
    const previousData = stockData[stockData.length - 2]
    
    if (!latestData || !previousData) {
      console.error('Insufficient data points')
      return NextResponse.json(
        { error: 'Insufficient data points' },
        { status: 400 }
      )
    }
    
    const priceChange = latestData.close - previousData.close
    const priceChangePercent = (priceChange / previousData.close) * 100
    
    // Calculate market cap (simplified estimation)
    const estimatedShares = {
      'AAPL': 15500000000,
      'TSLA': 3170000000,
      'MSFT': 7440000000,
      'GOOGL': 12600000000,
      'AMZN': 10700000000,
      'META': 2540000000,
      'NVDA': 2470000000,
      'NFLX': 440000000
    }[upperTicker] || 1000000000
    
    const marketCap = latestData.close * estimatedShares
    
    const responseData = {
      ticker: upperTicker,
      data: stockData,
      currentPrice: Math.round(latestData.close * 100) / 100,
      priceChange: Math.round(priceChange * 100) / 100,
      priceChangePercent: Math.round(priceChangePercent * 100) / 100,
      volume: latestData.volume,
      marketCap: marketCap,
      dataSource,
      lastUpdated: latestData.time,
      ...(dataSource === 'mock' && { mockDataReason: errorMessage || 'API unavailable' })
    }
    
    console.log(`📊 Returning ${dataSource} data for ${upperTicker}`)
    return NextResponse.json(responseData)
    
  } catch (error) {
    console.error('Critical error in stock API:', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch stock data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
} 