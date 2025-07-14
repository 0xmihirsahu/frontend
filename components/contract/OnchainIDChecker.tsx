"use client"

import { useAccount } from "wagmi"
import { toast } from "sonner"
import { useOnchainID } from "@/hooks/view/onChain/useOnchainID"
import React from "react"

export default function OnchainIDChecker() {
  const { address: userAddress } = useAccount()
  const idFactoryAddress = "0xb04eAce0e3D886Bc514e84Ed42a7C43FC2183536" // Replace with your actual address if needed
  const { hasOnchainID, loading: onchainIDLoading } = useOnchainID({
    userAddress,
    idFactoryAddress,
  })

  React.useEffect(() => {
    if (hasOnchainID === false && !onchainIDLoading) {
      toast.warning(
        "You do not have an OnchainID yet. Please complete KYC to create one."
      )
    }
  }, [hasOnchainID, onchainIDLoading])

  return null
}
