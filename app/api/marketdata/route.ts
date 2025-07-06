// app/api/marketdata/route.ts
import { NextResponse } from "next/server"

interface AlpacaQuote {
  t: string // timestamp
  ap: number // ask price
  bp: number // bid price
  as: number // ask size
  bs: number // bid size
  ax: string // ask exchange
  bx: string // bid exchange
  c: string[] // conditions
  z: string // tape
}

interface AlpacaLatestResponse {
  quotes: {
    [symbol: string]: AlpacaQuote
  }
}

interface AlpacaHistoricalResponse {
  quotes: {
    [symbol: string]: AlpacaQuote[]
  }
  next_page_token?: string
}

interface AlpacaBar {
  c: number // close
  t: string // timestamp
}

interface AlpacaBarsResponse {
  bars: AlpacaBar[]
}

// Calculate mid price, handling cases where ask or bid is 0
function calculateMidPrice(quote: AlpacaQuote): number {
  // If both prices are valid, use the average
  if (quote.ap > 0 && quote.bp > 0) {
    return (quote.ap + quote.bp) / 2
  }
  // If only one price is valid, use that one
  if (quote.ap > 0) return quote.ap
  if (quote.bp > 0) return quote.bp
  // If neither price is valid, return 0
  return 0
}

// Get the last valid quote of the day
function getLastValidQuote(quotes: AlpacaQuote[]): AlpacaQuote | null {
  // Sort quotes by timestamp in descending order (latest first)
  const sortedQuotes = [...quotes].sort(
    (a, b) => new Date(b.t).getTime() - new Date(a.t).getTime()
  )

  // Find the first quote that has either a valid ask or bid price
  return sortedQuotes.find((quote) => quote.ap > 0 || quote.bp > 0) ?? null
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const symbol = searchParams.get("symbol") || "LQD"

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "APCA-API-KEY-ID": process.env.APCA_API_KEY_ID ?? "",
      "APCA-API-SECRET-KEY": process.env.APCA_API_SECRET_KEY ?? "",
    },
  }

  try {
    // 1. Fetch latest quote for current price
    const latestUrl = `https://data.alpaca.markets/v2/stocks/quotes/latest?symbols=${symbol}`
    console.log("Fetching latest quote from:", latestUrl)

    const latestRes = await fetch(latestUrl, options)
    if (!latestRes.ok) {
      throw new Error(
        `Alpaca API returned ${latestRes.status} for latest quote`
      )
    }

    const latestData = (await latestRes.json()) as AlpacaLatestResponse
    console.log("Latest quote response:", latestData)

    const latestQuote = latestData.quotes?.[symbol]
    if (!latestQuote) {
      throw new Error("No latest quote data available")
    }

    const midPrice = calculateMidPrice(latestQuote)

    // 2. Get the date from the latest quote timestamp
    const latestDate = new Date(latestQuote.t)

    // Get previous trading day
    const previousDay = new Date(latestDate)
    previousDay.setDate(previousDay.getDate() - 1)

    // Format dates as YYYY-MM-DD
    const previousDayStr = previousDay.toISOString().split("T")[0]

    const historicalUrl = `https://data.alpaca.markets/v2/stocks/quotes?symbols=${symbol}&start=${previousDayStr}&end=${previousDayStr}&limit=100`
    console.log("Fetching historical quotes from:", historicalUrl)

    const historicalRes = await fetch(historicalUrl, options)
    if (!historicalRes.ok) {
      throw new Error(
        `Alpaca API returned ${historicalRes.status} for historical quotes`
      )
    }

    const historicalData =
      (await historicalRes.json()) as AlpacaHistoricalResponse
    console.log(
      "Historical quotes response:",
      JSON.stringify(historicalData, null, 2)
    )

    // Get the last valid quote from yesterday
    const previousQuote = historicalData.quotes?.[symbol]
      ? getLastValidQuote(historicalData.quotes[symbol])
      : null

    console.log("Selected previous day quote:", previousQuote)

    const previousClose = previousQuote
      ? calculateMidPrice(previousQuote)
      : midPrice // Fallback to current if no previous

    console.log("Calculated prices:", {
      current: {
        ask: latestQuote.ap,
        bid: latestQuote.bp,
        mid: midPrice,
        time: latestQuote.t,
      },
      previous: {
        ask: previousQuote?.ap,
        bid: previousQuote?.bp,
        mid: previousClose,
        time: previousQuote?.t,
      },
    })

    const response = {
      symbol,
      price: midPrice,
      askPrice: latestQuote.ap,
      bidPrice: latestQuote.bp,
      timestamp: latestQuote.t,
      previousClose,
      dates: {
        latest: latestDate.toISOString(),
        previous: previousDayStr,
      },
    }

    console.log("Sending response:", response)
    return NextResponse.json(response)
  } catch (error) {
    console.error("Error fetching market data:", error)
    if (error instanceof Error) {
      console.error("Error details:", {
        message: error.message,
        stack: error.stack,
      })
    }
    return NextResponse.json(
      { error: "Failed to fetch market data" },
      { status: 500 }
    )
  }
}
