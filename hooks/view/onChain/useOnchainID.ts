"use client"

import { useEffect, useState } from "react"
import { ethers } from "ethers"
import idFactoryABI from "@/abi/idfactory.json"

export function useOnchainID({
  userAddress,
  idFactoryAddress,
  provider,
}: {
  userAddress: string | undefined | null
  idFactoryAddress: string
  provider: ethers.Provider
}) {
  const [hasOnchainID, setHasOnchainID] = useState<boolean | null>(null)
  const [onchainIDAddress, setOnchainIDAddress] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!userAddress || !idFactoryAddress || !provider) {
      setHasOnchainID(null)
      setOnchainIDAddress(null)
      setError(null)
      return
    }
    setLoading(true)
    setError(null)
    async function checkOnchainID() {
      try {
        const idFactory = new ethers.Contract(
          idFactoryAddress,
          idFactoryABI,
          provider
        )
        const onchainID = await idFactory.getIdentity(userAddress)
        if (!onchainID || onchainID === ethers.ZeroAddress) {
          setHasOnchainID(false)
          setOnchainIDAddress(null)
        } else {
          setHasOnchainID(true)
          setOnchainIDAddress(onchainID)
        }
      } catch (err: any) {
        setError(err.message || "Failed to check OnchainID")
        setHasOnchainID(null)
        setOnchainIDAddress(null)
      } finally {
        setLoading(false)
      }
    }
    checkOnchainID()
  }, [userAddress, idFactoryAddress, provider])

  return { hasOnchainID, onchainIDAddress, loading, error }
}
