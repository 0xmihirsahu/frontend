// app/api/marketdata/route.ts
import { NextResponse } from "next/server"

interface AlpacaQuote {
  ap: number // ask price
  bp: number // bid price
  t: string // timestamp
}

interface AlpacaResponse {
  quotes: {
    [symbol: string]: AlpacaQuote
  }
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
    const alpacaRes = await fetch(
      `https://data.alpaca.markets/v2/stocks/quotes/latest?symbols=${symbol}`,
      options
    )

    if (!alpacaRes.ok) {
      throw new Error(`Alpaca API returned ${alpacaRes.status}`)
    }

    const data = (await alpacaRes.json()) as AlpacaResponse
    console.log("Alpaca response:", JSON.stringify(data, null, 2))

    // Validate the response structure
    if (!data.quotes?.[symbol]) {
      throw new Error("Invalid response structure from Alpaca")
    }

    const quote = data.quotes[symbol]
    const price = (quote.ap + quote.bp) / 2 // Calculate mid price

    // Return a simplified response with just what we need
    return NextResponse.json({
      symbol,
      price,
      askPrice: quote.ap,
      bidPrice: quote.bp,
      timestamp: quote.t,
    })
  } catch (error) {
    console.error("Error fetching market data:", error)
    // Log the full error for debugging
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
