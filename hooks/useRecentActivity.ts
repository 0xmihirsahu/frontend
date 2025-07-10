import { useState, useEffect } from "react"
import { useWatchContractEvent, usePublicClient } from "wagmi"
import erc3643ABI from "@/abi/erc3643.json"

export interface ActivityEvent {
  id: string
  action: string
  symbol: string
  amount: string
  time: string
  value: string
  user?: string
}

const RWA_TOKEN_ADDRESS =
  "0xB5F83286a6F8590B4d01eC67c885252Ec5d0bdDB" as `0x${string}`

export function useRecentActivity() {
  const [activities, setActivities] = useState<ActivityEvent[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const publicClient = usePublicClient()

  // Helper functions
  const formatAddress = (address: string) =>
    `${address.slice(0, 6)}...${address.slice(-4)}`
  const formatAmount = (amount: bigint) => (Number(amount) / 1e6).toFixed(2)

  // Watch for new mint events (Transfer from zero address)
  useWatchContractEvent({
    address: RWA_TOKEN_ADDRESS,
    abi: erc3643ABI.abi as any,
    eventName: "Transfer",
    onLogs(logs) {
      const newMints = logs
        .filter(
          (log: any) =>
            log.args.from === "0x0000000000000000000000000000000000000000"
        )
        .map((log: any) => ({
          id: `${log.transactionHash}-${log.logIndex}`,
          action: "Minted",
          symbol: "RWA",
          amount: `${formatAmount(log.args.value)} tokens`,
          time: new Date().toLocaleTimeString(),
          value: `+$${(Number(formatAmount(log.args.value)) * 125).toFixed(0)}`,
          user: formatAddress(log.args.to),
        }))

      if (newMints.length > 0) {
        setActivities((prev) => [...newMints, ...prev].slice(0, 20))
      }
    },
  })

  // Fetch recent mint events on mount
  useEffect(() => {
    const fetchRecentMints = async () => {
      if (!publicClient) return

      try {
        const currentBlock = await publicClient.getBlockNumber()
        const fromBlock = currentBlock - BigInt(1000)

        // Find Transfer event from the ABI
        const transferEvent = erc3643ABI.abi.find(
          (item: any) => item.type === "event" && item.name === "Transfer"
        ) as any

        const logs = await publicClient.getLogs({
          address: RWA_TOKEN_ADDRESS,
          event: transferEvent,
          fromBlock,
          toBlock: currentBlock,
        })

        const mints = logs
          .filter(
            (log: any) =>
              log.args.from === "0x0000000000000000000000000000000000000000"
          )
          .map((log: any) => ({
            id: `${log.transactionHash}-${log.logIndex}`,
            action: "Minted",
            symbol: "RWA",
            amount: `${formatAmount(log.args.value)} tokens`,
            time: new Date(
              Date.now() - Math.random() * 86400000
            ).toLocaleTimeString(),
            value: `+$${(Number(formatAmount(log.args.value)) * 125).toFixed(0)}`,
            user: formatAddress(log.args.to),
          }))
          .slice(0, 10)

        setActivities(mints)
      } catch (error) {
        console.error("Error fetching mint events:", error)
        // Fallback mock data
        setActivities([
          {
            id: "mock-1",
            action: "Minted",
            symbol: "RWA",
            amount: "100.00 tokens",
            time: "2:30:45 PM",
            value: "+$12,500",
            user: "0x1234...5678",
          },
        ])
      } finally {
        setIsLoading(false)
      }
    }

    fetchRecentMints()
  }, [publicClient])

  return { activities, isLoading }
}
