"use client"

import { useForm } from "react-hook-form"
import { signUpWithProfile } from "@/lib/supabase/auth"
import { useState } from "react"

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()
  const [serverError, setServerError] = useState("")
  const [success, setSuccess] = useState(false)

  const onSubmit = async (data: any) => {
    setServerError("")
    setSuccess(false)
    const result = await signUpWithProfile(data)
    if (result.error) setServerError(result.error)
    else setSuccess(true)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ maxWidth: 400, margin: "0 auto" }}
    >
      <div>
        <input
          {...register("email", { required: "Email is required" })}
          placeholder="Email"
        />
        {typeof errors.email?.message === "string" && (
          <span>{errors.email.message}</span>
        )}
      </div>
      <div>
        <input
          {...register("password", { required: "Password is required" })}
          type="password"
          placeholder="Password"
        />
        {typeof errors.password?.message === "string" && (
          <span>{errors.password.message}</span>
        )}
      </div>
      <div>
        <input
          {...register("firstName", { required: "First name is required" })}
          placeholder="First Name"
        />
        {typeof errors.firstName?.message === "string" && (
          <span>{errors.firstName.message}</span>
        )}
      </div>
      <div>
        <input
          {...register("lastName", { required: "Last name is required" })}
          placeholder="Last Name"
        />
        {typeof errors.lastName?.message === "string" && (
          <span>{errors.lastName.message}</span>
        )}
      </div>
      <button type="submit" disabled={isSubmitting}>
        Sign Up
      </button>
      {serverError && <div style={{ color: "red" }}>{serverError}</div>}
      {success && <div style={{ color: "green" }}>Signup successful!</div>}
    </form>
  )
}
