import { useTokenBalance } from "./useTokenBalance"

interface BalanceDisplayProps {
  userAddress: string
}

export function BalanceDisplay({ userAddress }: BalanceDisplayProps) {
  const { balance, symbol, isLoading, isError } = useTokenBalance(userAddress)

  if (isLoading) {
    return <div>Loading balance...</div>
  }

  if (isError) {
    return <div>Error fetching balance</div>
  }

  return (
    <div>
      <p>
        Balance: {balance.toFixed(2)} {symbol}
      </p>
    </div>
  )
}

// Example usage:
// <BalanceDisplay userAddress="0x123..." />
