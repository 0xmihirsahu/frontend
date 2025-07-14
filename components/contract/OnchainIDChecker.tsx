"use client"

import { useAccount } from "wagmi"
import { toast } from "sonner"
import { useOnchainID } from "@/hooks/view/onChain/useOnchainID"
import React from "react"
import { useRouter } from "next/navigation"

export default function OnchainIDChecker() {
  const { address: userAddress } = useAccount()
  const idFactoryAddress = "0xb04eAce0e3D886Bc514e84Ed42a7C43FC2183536" // Replace with your actual address if needed
  const { hasOnchainID, loading: onchainIDLoading } = useOnchainID({
    userAddress,
    idFactoryAddress,
  })
  const router = useRouter()

  React.useEffect(() => {
    if (hasOnchainID === false && !onchainIDLoading) {
      toast.warning(
        "Complete KYC and create your onchainIdentity to buy Spout tokens",
        {
          action: {
            label: "Complete Profile",
            onClick: () => router.push("/app/profile"),
          },
          duration: Infinity,
        }
      )
    }
  }, [hasOnchainID, onchainIDLoading, router])

  return null
}
