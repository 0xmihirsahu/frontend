"use client"

import { useForm } from "react-hook-form"
import { signInWithProfile } from "@/lib/supabase/auth"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Waves } from "@/components/wave-background"

interface SignInFormData {
  email: string
  password: string
}

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>()
  const [serverError, setServerError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const onSubmit = async (data: SignInFormData) => {
    setServerError("")
    setIsLoading(true)
    try {
      const result = await signInWithProfile(data)
      if (result.error) {
        setServerError(result.error)
      } else {
        router.push("/app")
      }
    } catch (error) {
      setServerError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-white to-emerald-50">
        <Waves className="absolute top-0 left-0 w-full h-full" />
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-emerald-100 p-10 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Sign in to Spout</h1>
          <p className="text-slate-600 text-lg">Welcome back! Please enter your details.</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-emerald-50 text-slate-900 text-base"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters"
                }
              })}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-emerald-50 text-slate-900 text-base"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting || isLoading}
            className="w-full bg-emerald-600 text-white py-3 px-4 rounded-2xl hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold text-lg shadow-lg"
          >
            {isSubmitting || isLoading ? "Signing In..." : "Sign In"}
          </button>
          {serverError && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <p className="text-sm text-red-600">{serverError}</p>
            </div>
          )}
        </form>
        <div className="mt-8 text-center space-y-2">
          <a href="/auth/forgot-password" className="text-emerald-600 hover:underline mr-4 font-medium">
            Forgot password?
          </a>
          <div>
            <span className="text-slate-700">Don't have an account? </span>
            <Link href="/auth/register" className="font-semibold text-emerald-600 hover:text-emerald-700">
              Sign up here
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 