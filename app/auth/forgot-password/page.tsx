"use client"

import { useState } from "react"
import { sendPasswordResetEmail } from "@/lib/supabase/auth"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage("")
    setError("")
    setLoading(true)
    const result = await sendPasswordResetEmail(email)
    setLoading(false)
    if (result.error) setError(result.error)
    else setMessage("Password reset email sent! Check your inbox.")
  }

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send Reset Email"}
        </button>
        {message && <div className="text-green-600 text-sm mt-2">{message}</div>}
        {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
      </form>
    </div>
  )
} 