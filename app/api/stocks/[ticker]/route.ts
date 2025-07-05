import { NextRequest, NextResponse } from "next/server"

// Alpha Vantage API configuration
const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY || ""

interface GlobalQuoteResponse {
  "Global Quote": {
    "01. symbol": string
    "02. open": string
    "03. high": string
    "04. low": string
    "05. price": string
    "06. volume": string
    "07. latest trading day": string
    "08. previous close": string
    "09. change": string
    "10. change percent": string
  }
}

interface AlphaVantageTimeSeries {
  [date: string]: {
    "1. open": string
    "2. high": string
    "3. low": string
    "4. close": string
    "5. volume": string
  }
}

interface AlphaVantageResponse {
  "Meta Data"?: {
    "1. Information": string
    "2. Symbol": string
    "3. Last Refreshed": string
    "4. Output Size": string
    "5. Time Zone": string
  }
  "Time Series (Daily)"?: AlphaVantageTimeSeries
  "Error Message"?: string
  Note?: string
  Information?: string
}

async function fetchCurrentPrice(ticker: string): Promise<any> {
  try {
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${ALPHA_VANTAGE_API_KEY}`
    console.log(`Fetching current price for ${ticker}`)

    const response = await fetch(url, {
      headers: {
        "User-Agent": "SpoutDashboard/1.0",
      },
    })

    if (!response.ok) {
      throw new Error(`Alpha Vantage API error: ${response.status}`)
    }

    const data: GlobalQuoteResponse = await response.json()
    console.log("Current price data:", data)

    if (!data["Global Quote"]) {
      throw new Error("No quote data available")
    }

    return {
      price: parseFloat(data["Global Quote"]["05. price"]),
      previousClose: parseFloat(data["Global Quote"]["08. previous close"]),
      change: parseFloat(data["Global Quote"]["09. change"]),
      changePercent: parseFloat(
        data["Global Quote"]["10. change percent"].replace("%", "")
      ),
      volume: parseInt(data["Global Quote"]["06. volume"]),
      lastUpdated: data["Global Quote"]["07. latest trading day"],
    }
  } catch (error) {
    console.error(`Error fetching current price for ${ticker}:`, error)
    throw error
  }
}

async function fetchHistoricalData(ticker: string): Promise<any[]> {
  try {
    const apiurl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&outputsize=compact&apikey=${ALPHA_VANTAGE_API_KEY}`

    console.log(`Fetching historical data for ${ticker}`)

    const response = await fetch(apiurl, {
      headers: {
        "User-Agent": "SpoutDashboard/1.0",
      },
    })

    if (!response.ok) {
      throw new Error(`Alpha Vantage API error: ${response.status}`)
    }

    const data: AlphaVantageResponse = await response.json()
    console.log("Historical data response:", JSON.stringify(data, null, 2))

    if (data["Error Message"]) {
      throw new Error("Invalid symbol or API error")
    }

    if (data["Note"] || data["Information"]) {
      throw new Error("API rate limit reached")
    }

    if (!data["Time Series (Daily)"]) {
      throw new Error("No time series data available")
    }

    const timeSeries = data["Time Series (Daily)"]

    const historicalData = Object.entries(timeSeries)
      .map(([date, values]: [string, any]) => ({
        time: date,
        open: parseFloat(values["1. open"]),
        high: parseFloat(values["2. high"]),
        low: parseFloat(values["3. low"]),
        close: parseFloat(values["4. close"]),
        volume: parseInt(values["5. volume"]),
      }))
      .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime())
      .slice(-100)

    console.log("Processed historical data:", historicalData)
    return historicalData
  } catch (error) {
    console.error(`Error fetching historical data for ${ticker}:`, error)
    throw error
  }
}

async function fetchETFProfile(ticker: string): Promise<any> {
  try {
    const url = `https://www.alphavantage.co/query?function=ETF_PROFILE&symbol=${ticker}&apikey=${ALPHA_VANTAGE_API_KEY}`
    console.log(`Fetching ETF profile for ${ticker}`)

    const response = await fetch(url, {
      headers: {
        "User-Agent": "SpoutDashboard/1.0",
      },
    })

    if (!response.ok) {
      throw new Error(`Alpha Vantage API error: ${response.status}`)
    }

    const data = await response.json()
    console.log("ETF profile data:", data)
    return data
  } catch (error) {
    console.error(`Error fetching ETF profile for ${ticker}:`, error)
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
      return NextResponse.json({ error: "Symbol is required" }, { status: 400 })
    }

    const upperTicker = ticker.toUpperCase()

    try {
      // Fetch all data in parallel
      const [currentPriceData, historicalData, etfProfile] = await Promise.all([
        fetchCurrentPrice(upperTicker),
        fetchHistoricalData(upperTicker),
        fetchETFProfile(upperTicker),
      ])

      if (!historicalData || historicalData.length === 0) {
        throw new Error("No historical data available")
      }

      const responseData = {
        ticker: upperTicker,
        data: historicalData,
        currentPrice: currentPriceData.price,
        priceChange: currentPriceData.change,
        priceChangePercent: currentPriceData.changePercent,
        volume: currentPriceData.volume,
        lastUpdated: currentPriceData.lastUpdated,
        etfProfile,
        dataSource: "real",
      }

      console.log(`📊 Final response data:`, responseData)
      return NextResponse.json(responseData)
    } catch (error) {
      console.error(`Error fetching data for ${upperTicker}:`, error)
      throw error
    }
  } catch (error) {
    console.error("Critical error in ETF data API:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch ETF data",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
