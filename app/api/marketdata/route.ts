// app/api/marketdata/route.ts
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
    const data = await alpacaRes.json()
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch Alpaca data" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }
}
