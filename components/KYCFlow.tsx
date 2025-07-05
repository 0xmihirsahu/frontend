"use client"

import React, { useState, useEffect } from "react"
import {
  useAccount,
  useWriteContract,
  useReadContract,
  useWaitForTransactionReceipt,
} from "wagmi"
import {
  concatHex,
  encodeAbiParameters,
  toBytes,
  toHex,
  createPublicClient,
  http,
} from "viem"
import { baseSepolia } from "viem/chains"
import { ethers } from "ethers"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  CheckCircle,
  AlertCircle,
  Loader2,
  Wallet,
  UserCheck,
  Shield,
} from "lucide-react"
import gatewayABI from "@/abi/gateway.json"
import idFactoryABI from "@/abi/idfactory.json"
import onchainidABI from "@/abi/onchainid.json"
import { countryCodes } from "@/lib/utils"
interface KYCSignatureResponse {
  signature: {
    r: string
    s: string
    v: number
  }
  issuerAddress: string
  dataHash: string
  topic: number
}

const gatewayAddress = "0xf04430Ffe6da40FE233c50909A9ebEA43dc8FDaB"
const idFactoryAddress = "0xb04eAce0e3D886Bc514e84Ed42a7C43FC2183536"

export default function KYCFlow() {
  const { address, isConnected } = useAccount()
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedCountry, setSelectedCountry] = useState<number>(91)
  const [onchainIDAddress, setOnchainIDAddress] = useState<string>("")
  const [kycSignature, setKycSignature] = useState<KYCSignatureResponse | null>(
    null
  )
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>("")
  const [claimAdded, setClaimAdded] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [claimEvents, setClaimEvents] = useState<any[]>([])
  const issuerAddress = "0xfBbB54Ea804cC2570EeAba2fea09d0c66582498F"

  // Contract interactions
  const {
    writeContract,
    data: deployHash,
    isPending: isDeploying,
  } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isDeployed } =
    useWaitForTransactionReceipt({
      hash: deployHash,
    })

  // Add claim to identity
  const {
    writeContract: writeAddClaim,
    data: addClaimHash,
    isPending: isAddingClaim,
  } = useWriteContract()
  const { isLoading: isConfirmingClaim, isSuccess: isClaimAdded } =
    useWaitForTransactionReceipt({
      hash: addClaimHash,
    })

  // Read contract to get identity address from IdFactory
  const { data: identityAddress, isLoading: isCheckingIdentity } =
    useReadContract({
      address: idFactoryAddress as `0x${string}`,
      abi: idFactoryABI as any,
      functionName: "getIdentity",
      args: [address as `0x${string}`],
      query: {
        enabled: !!address,
      },
    })

  // Check if identity exists (avoid unknown type in JSX)
  const hasExistingIdentity = Boolean(
    identityAddress &&
      typeof identityAddress === "string" &&
      identityAddress !== "0x0000000000000000000000000000000000000000"
  )

  const steps = [
    {
      id: 1,
      title: "Connect Wallet",
      description: "Connect your wallet to start the KYC process",
      icon: Wallet,
      status: isConnected ? "completed" : "current",
    },
    {
      id: 2,
      title: "Create OnchainID",
      description: "Deploy your onchain identity",
      icon: UserCheck,
      status: hasExistingIdentity
        ? "completed"
        : isDeployed
          ? "completed"
          : isConnected
            ? "current"
            : "pending",
    },
    {
      id: 3,
      title: "KYC Verification",
      description: "Complete KYC verification with signature",
      icon: Shield,
      status: kycSignature
        ? "completed"
        : hasExistingIdentity || isDeployed
          ? "current"
          : "pending",
    },
    {
      id: 4,
      title: "Add Claim to Identity",
      description: "Add KYC claim to your onchain identity",
      icon: Shield,
      status: isClaimAdded ? "completed" : kycSignature ? "current" : "pending",
    },
  ]

  const progress = ((currentStep - 1) / (steps.length - 1)) * 100

  // Handle identity deployment
  const handleDeployIdentity = async () => {
    if (!address) return

    try {
      setIsLoading(true)
      setError("")

      writeContract({
        address: gatewayAddress as `0x${string}`,
        abi: gatewayABI.abi,
        functionName: "deployIdentityForWallet",
        args: [address],
      })
      console.log("Deploy transaction hash:", deployHash)
    } catch (err) {
      setError("Failed to deploy identity")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  // Handle KYC signature request
  const handleKYCSignature = async () => {
    if (!address || !onchainIDAddress) return

    try {
      setIsLoading(true)
      setError("")

      const response = await fetch("/api/kyc-signature", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userAddress: address,
          onchainIDAddress: onchainIDAddress,
          claimData: "KYC passed",
          topic: 1,
          countryCode: selectedCountry,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to get KYC signature")
      }

      const data: KYCSignatureResponse = await response.json()
      console.log("KYC signature response:", data)
      setKycSignature(data)
      setCurrentStep(3)
    } catch (err) {
      setError("Failed to get KYC signature")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  // Handle adding claim to identity - EXACT MATCH with working Solidity script
  const handleAddClaim = async () => {
    if (!kycSignature || !onchainIDAddress) return

    try {
      setIsLoading(true)
      setError("")

      console.log("🔧 CORRECTED: Customer adds ClaimIssuer-signed claim")
      console.log("🎯 Recipient address:", address)
      console.log("🆔 OnchainID address:", onchainIDAddress)
      console.log("🏢 ClaimIssuer:", kycSignature.issuerAddress)

      const topic = 1
      // EXACT MATCH: Use ethers.toUtf8Bytes (v6 syntax)
      const claimData = ethers.toUtf8Bytes("KYC")
      // Hash the claim data like the script
      const claimDataHash = ethers.keccak256(claimData)

      console.log("✅ Claim data prepared:", ethers.hexlify(claimData))
      console.log("🔒 Claim data hash:", claimDataHash)

      // Use the signature from backend (already prepared correctly)
      // Reconstruct signature the same way as working script expects
      const r = (
        kycSignature.signature.r.startsWith("0x")
          ? kycSignature.signature.r
          : `0x${kycSignature.signature.r}`
      ) as `0x${string}`
      const s = (
        kycSignature.signature.s.startsWith("0x")
          ? kycSignature.signature.s
          : `0x${kycSignature.signature.s}`
      ) as `0x${string}`
      const v =
        `0x${kycSignature.signature.v.toString(16).padStart(2, "0")}` as `0x${string}`
      const signature = concatHex([r, s, v])

      console.log("🔍 Signature components:")
      console.log("   r:", r)
      console.log("   s:", s)
      console.log("   v:", v)
      console.log("   Final signature:", signature)

      // EXACT MATCH: Contract arguments like working script
      const contractArgs = [
        topic, // topic (KYC)
        1, // scheme
        kycSignature.issuerAddress as `0x${string}`, // issuer address
        signature as `0x${string}`, // signature
        claimDataHash, // EXACT MATCH: Use hashed claim data
        "", // uri
      ]

      console.log("📋 Contract arguments:", contractArgs)
      console.log("🔄 Customer adding ClaimIssuer-signed claim...")

      writeAddClaim({
        address: onchainIDAddress as `0x${string}`,
        abi: onchainidABI as any,
        functionName: "addClaim",
        args: contractArgs,
      })

      console.log("📡 Add claim transaction initiated")
    } catch (err) {
      console.error("❌ Error in handleAddClaim:", err)
      setError("Failed to add claim to identity")
    } finally {
      setIsLoading(false)
    }
  }

  // Function to fetch claim events from the blockchain
  const fetchClaimEvents = async () => {
    if (!onchainIDAddress) return

    try {
      setIsVerifying(true)

      const publicClient = createPublicClient({
        chain: baseSepolia,
        transport: http(process.env.NEXT_PUBLIC_RPC_URL),
      })

      // Get current block number and start from recent blocks
      const currentBlock = await publicClient.getBlockNumber()
      const fromBlock = currentBlock - BigInt(2000) // About ~1 hour worth of blocks on Base Sepolia (2 sec block time)

      // Get ClaimAdded events
      const claimAddedEvents = await publicClient.getLogs({
        address: onchainIDAddress as `0x${string}`,
        event: {
          type: "event",
          name: "ClaimAdded",
          inputs: [
            { name: "claimId", type: "bytes32", indexed: true },
            { name: "topic", type: "uint256", indexed: true },
            { name: "scheme", type: "uint256", indexed: false },
            { name: "issuer", type: "address", indexed: true },
            { name: "signature", type: "bytes", indexed: false },
            { name: "data", type: "bytes", indexed: false },
            { name: "uri", type: "string", indexed: false },
          ],
        },
        fromBlock: fromBlock,
      })

      // Get ClaimChanged events
      const claimChangedEvents = await publicClient.getLogs({
        address: onchainIDAddress as `0x${string}`,
        event: {
          type: "event",
          name: "ClaimChanged",
          inputs: [
            { name: "claimId", type: "bytes32", indexed: true },
            { name: "topic", type: "uint256", indexed: true },
            { name: "scheme", type: "uint256", indexed: false },
            { name: "issuer", type: "address", indexed: true },
            { name: "signature", type: "bytes", indexed: false },
            { name: "data", type: "bytes", indexed: false },
            { name: "uri", type: "string", indexed: false },
          ],
        },
        fromBlock: fromBlock,
      })

      // Combine and sort events by block number
      const allEvents = [...claimAddedEvents, ...claimChangedEvents].sort(
        (a, b) => Number(b.blockNumber) - Number(a.blockNumber)
      )

      console.log(
        `Found ${allEvents.length} claim events for identity ${onchainIDAddress} (searched blocks ${fromBlock} - ${currentBlock})`
      )

      const processedEvents = allEvents.map((event) => ({
        ...event,
        eventType:
          event.eventName ||
          (claimAddedEvents.includes(event) ? "ClaimAdded" : "ClaimChanged"),
        blockNumber: Number(event.blockNumber),
        isKYCClaim: event.args?.topic === BigInt(1),
        isFromOurIssuer:
          event.args?.issuer?.toLowerCase() === issuerAddress.toLowerCase(),
      }))

      setClaimEvents(processedEvents)
      return processedEvents
    } catch (error) {
      console.error("Error fetching claim events:", error)
      setError("Failed to fetch claim events")
    } finally {
      setIsVerifying(false)
    }
  }

  // Update current step based on state
  useEffect(() => {
    if (!isConnected) {
      setCurrentStep(1)
    } else if (isConnected && !hasExistingIdentity && !isDeployed) {
      setCurrentStep(2)
    } else if ((hasExistingIdentity || isDeployed) && !kycSignature) {
      setCurrentStep(3)
    } else if (kycSignature && !isClaimAdded) {
      setCurrentStep(4)
    } else if (isClaimAdded) {
      setCurrentStep(4)
    }
  }, [isConnected, isDeployed, kycSignature, hasExistingIdentity, isClaimAdded])

  // Update onchain ID address when identity is deployed or already exists
  useEffect(() => {
    if (hasExistingIdentity && typeof identityAddress === "string") {
      console.log("Identity address from contract:", identityAddress)
      setOnchainIDAddress(identityAddress)
    } else if (
      isDeployed &&
      identityAddress &&
      typeof identityAddress === "string"
    ) {
      console.log("Identity address from contract:", identityAddress)
      setOnchainIDAddress(identityAddress)
    }
  }, [isDeployed, identityAddress, hasExistingIdentity])

  // Track when claim is successfully added
  useEffect(() => {
    if (isClaimAdded) {
      setClaimAdded(true)
      console.log("KYC claim added successfully to identity")
    }
  }, [isClaimAdded])

  const getStepIcon = (step: (typeof steps)[0]) => {
    const Icon = step.icon
    if (step.status === "completed") {
      return <CheckCircle className="h-6 w-6 text-emerald-600" />
    } else if (step.status === "current") {
      return <Icon className="h-6 w-6 text-blue-600" />
    } else {
      return <Icon className="h-6 w-6 text-gray-400" />
    }
  }

  const getStepStatus = (step: (typeof steps)[0]) => {
    if (step.status === "completed") {
      return (
        <Badge variant="default" className="bg-emerald-100 text-emerald-800">
          Completed
        </Badge>
      )
    } else if (step.status === "current") {
      return (
        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
          In Progress
        </Badge>
      )
    } else {
      return (
        <Badge variant="outline" className="text-gray-500">
          Pending
        </Badge>
      )
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">KYC Verification</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Complete your Know Your Customer verification to access advanced
          trading features. This process creates your onchain identity and
          verifies your credentials.
        </p>
      </div>

      {/* Progress Bar */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">
                Progress
              </span>
              <span className="text-sm text-gray-500">
                {Math.round(progress)}%
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Steps */}
      <div className="grid gap-6">
        {steps.map((step, index) => (
          <Card
            key={step.id}
            className={`transition-all duration-300 ${
              step.status === "current" ? "ring-2 ring-blue-500" : ""
            }`}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100">
                    {getStepIcon(step)}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                    <CardDescription>{step.description}</CardDescription>
                  </div>
                </div>
                {getStepStatus(step)}
              </div>
            </CardHeader>

            <CardContent>
              {/* Step 1: Connect Wallet */}
              {step.id === 1 && (
                <div className="space-y-4">
                  {!isConnected ? (
                    <div className="text-center py-8">
                      <Wallet className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">
                        Please connect your wallet to continue
                      </p>
                      <Badge variant="outline" className="text-gray-500">
                        Use the connect button in the header
                      </Badge>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-3 p-4 bg-emerald-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-emerald-600" />
                      <div>
                        <p className="font-medium text-emerald-800">
                          Wallet Connected
                        </p>
                        <p className="text-sm text-emerald-600">{address}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 2: Create OnchainID */}
              {step.id === 2 && (
                <div className="space-y-4">
                  {isCheckingIdentity ? (
                    <div className="flex items-center space-x-3 p-4 bg-yellow-50 rounded-lg">
                      <Loader2 className="h-5 w-5 text-yellow-600 animate-spin" />
                      <div>
                        <p className="font-medium text-yellow-800">
                          Verifying...
                        </p>
                        <p className="text-sm text-yellow-600">
                          Checking for existing onchain identity
                        </p>
                      </div>
                    </div>
                  ) : !hasExistingIdentity && !isDeployed ? (
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-medium text-blue-800 mb-2">
                          Create Your Onchain Identity
                        </h4>
                        <p className="text-sm text-blue-600">
                          This will deploy a unique onchain identity for your
                          wallet address. This identity will be used for KYC
                          verification and future interactions.
                        </p>
                      </div>

                      <Button
                        onClick={handleDeployIdentity}
                        isDisabled={isDeploying || isConfirming || !isConnected}
                        className="w-full"
                      >
                        {isDeploying || isConfirming ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {isDeploying
                              ? "Deploying Identity..."
                              : "Confirming Transaction..."}
                          </>
                        ) : (
                          "Deploy Identity"
                        )}
                      </Button>

                      {error && (
                        <div className="flex items-center space-x-2 p-3 bg-red-50 rounded-lg">
                          <AlertCircle className="h-4 w-4 text-red-600" />
                          <span className="text-sm text-red-600">{error}</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center space-x-3 p-4 bg-emerald-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-emerald-600" />
                      <div>
                        <p className="font-medium text-emerald-800">
                          {hasExistingIdentity && !isDeployed
                            ? "Identity Already Exists"
                            : "Identity Deployed Successfully"}
                        </p>
                        <p className="text-sm text-emerald-600">
                          OnchainID Address: {onchainIDAddress || "Loading..."}
                        </p>
                        {hasExistingIdentity && !isDeployed && (
                          <p className="text-xs text-emerald-500 mt-1">
                            Your onchain identity was already created.
                            Proceeding to KYC verification.
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: KYC Verification */}
              {step.id === 3 && (
                <div className="space-y-4">
                  {!kycSignature ? (
                    <div className="space-y-4">
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <h4 className="font-medium text-purple-800 mb-2">
                          Complete KYC Verification
                        </h4>
                        <p className="text-sm text-purple-600">
                          Select your country and submit for KYC verification.
                          This will generate a cryptographic signature for your
                          identity.
                        </p>
                      </div>

                      <div className="space-y-3">
                        <label className="text-sm font-medium text-gray-700">
                          Country
                        </label>
                        <Select
                          value={selectedCountry.toString()}
                          onValueChange={(value: string) =>
                            setSelectedCountry(parseInt(value))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select your country" />
                          </SelectTrigger>
                          <SelectContent>
                            {countryCodes.map((country, index) => (
                              <SelectItem
                                key={`${country.code}-${country.name}`}
                                value={country.code.toString()}
                              >
                                {country.name} (+{country.code})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <Button
                        onClick={handleKYCSignature}
                        isDisabled={isLoading || !hasExistingIdentity}
                        className="w-full"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Getting KYC Signature...
                          </>
                        ) : (
                          "Get KYC Signature"
                        )}
                      </Button>

                      {error && (
                        <div className="flex items-center space-x-2 p-3 bg-red-50 rounded-lg">
                          <AlertCircle className="h-4 w-4 text-red-600" />
                          <span className="text-sm text-red-600">{error}</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 p-4 bg-emerald-50 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-emerald-600" />
                        <div>
                          <p className="font-medium text-emerald-800">
                            KYC Verification Complete
                          </p>
                          <p className="text-sm text-emerald-600">
                            Your identity has been verified successfully
                          </p>
                        </div>
                      </div>

                      <div className="p-4 bg-gray-50 rounded-lg space-y-2">
                        <h5 className="font-medium text-gray-800">
                          Verification Details
                        </h5>
                        <div className="text-sm space-y-1">
                          <p>
                            <span className="font-medium">Issuer:</span>{" "}
                            {kycSignature.issuerAddress}
                          </p>
                          <p>
                            <span className="font-medium">Topic:</span>{" "}
                            {kycSignature.topic}
                          </p>
                          <p>
                            <span className="font-medium">Data Hash:</span>{" "}
                            {kycSignature.dataHash}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 4: Add Claim to Identity */}
              {step.id === 4 && (
                <div className="space-y-4">
                  {!isClaimAdded ? (
                    <div className="space-y-4">
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <h4 className="font-medium text-purple-800 mb-2">
                          Add KYC Claim to Identity
                        </h4>
                        <p className="text-sm text-purple-600">
                          Add KYC claim to your onchain identity to complete the
                          verification process.
                        </p>
                      </div>

                      <Button
                        onClick={handleAddClaim}
                        isDisabled={
                          isAddingClaim || isConfirmingClaim || !kycSignature
                        }
                        className="w-full"
                      >
                        {isAddingClaim || isConfirmingClaim ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {isAddingClaim
                              ? "Adding KYC Claim..."
                              : "Confirming Transaction..."}
                          </>
                        ) : (
                          "Add KYC Claim"
                        )}
                      </Button>

                      {error && (
                        <div className="flex items-center space-x-2 p-3 bg-red-50 rounded-lg">
                          <AlertCircle className="h-4 w-4 text-red-600" />
                          <span className="text-sm text-red-600">{error}</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center space-x-3 p-4 bg-emerald-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-emerald-600" />
                      <div>
                        <p className="font-medium text-emerald-800">
                          KYC Claim Added
                        </p>
                        <p className="text-sm text-emerald-600">
                          KYC claim has been added to your identity
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary */}
      {isClaimAdded && (
        <Card className="bg-gradient-to-r from-emerald-50 to-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-emerald-600" />
              <span>KYC Verification Complete</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Congratulations! You have successfully completed the KYC
              verification process. Your onchain identity is now verified and
              you can access advanced trading features.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="p-3 bg-white rounded-lg">
                <p className="font-medium text-gray-800">Wallet Address</p>
                <p className="text-gray-600 font-mono">{address}</p>
              </div>
              <div className="p-3 bg-white rounded-lg">
                <p className="font-medium text-gray-800">OnchainID</p>
                <p className="text-gray-600 font-mono">{onchainIDAddress}</p>
              </div>
              <div className="p-3 bg-white rounded-lg">
                <p className="font-medium text-gray-800">Country Code</p>
                <p className="text-gray-600">+{selectedCountry}</p>
              </div>
            </div>
            <div className="mt-4 p-3 bg-emerald-100 rounded-lg">
              <p className="text-sm text-emerald-800">
                <strong>✓ KYC Claim Added:</strong> Your KYC verification has
                been successfully added to your onchain identity.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Verification Section */}
      {onchainIDAddress && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-blue-600" />
              Claim Verification
            </CardTitle>
            <CardDescription>
              Check if KYC claims have been successfully added to your onchain
              identity (searches recent ~2000 blocks)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={fetchClaimEvents}
              isDisabled={isVerifying}
              className="w-full"
            >
              {isVerifying ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Checking Events...
                </>
              ) : (
                "Check Claim Events"
              )}
            </Button>

            {claimEvents.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium text-sm">
                  Found {claimEvents.length} claim event(s):
                </h4>
                {claimEvents.map((event, index) => (
                  <div key={index} className="border rounded-lg p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          event.eventType === "ClaimAdded"
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {event.eventType}
                      </span>
                      <span className="text-xs text-gray-500">
                        Block #{event.blockNumber}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-gray-500">Topic:</span>{" "}
                        {Number(event.args?.topic)}
                        {event.isKYCClaim && (
                          <span className="ml-2 px-1 py-0.5 bg-green-100 text-green-700 rounded text-xs">
                            KYC
                          </span>
                        )}
                      </div>
                      <div>
                        <span className="text-gray-500">Scheme:</span>{" "}
                        {Number(event.args?.scheme)}
                      </div>
                      <div className="col-span-2">
                        <span className="text-gray-500">Issuer:</span>
                        <span
                          className={`ml-1 ${event.isFromOurIssuer ? "text-green-600 font-medium" : ""}`}
                        >
                          {event.args?.issuer}
                        </span>
                        {event.isFromOurIssuer && (
                          <span className="ml-2 px-1 py-0.5 bg-green-100 text-green-700 rounded text-xs">
                            Our Issuer
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {claimEvents.length === 0 && !isVerifying && (
              <div className="text-center py-4 text-gray-500">
                No claim events found for this identity
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
