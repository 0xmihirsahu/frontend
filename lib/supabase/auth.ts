import { supabase } from "@/lib/supabase/supabase"

interface SignUpArgs {
  email: string
  password: string
  firstName: string
  lastName: string
}

interface SignInArgs {
  email: string
  password: string
}

async function signUpWithProfile({
  email,
  password,
  firstName,
  lastName,
}: SignUpArgs) {
  // Step 1: Sign up the user
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  })

  if (signUpError) {
    console.error("Signup error:", signUpError.message)
    return { error: signUpError.message }
  }

  const user = signUpData.user
  if (!user) {
    throw new Error("User not found")
  }

  // Step 2: Insert into profiles table
  const { error: insertError } = await supabase.from("profiles").insert({
    id: user.id,
    first_name: firstName,
    last_name: lastName,
    email: user.email,
  })

  if (insertError) {
    console.error("Insert profile error:", insertError.message)
    return { error: insertError.message }
  }

  return { success: true }
}

async function signInWithProfile({ email, password }: SignInArgs) {
  // Step 1: Sign in the user
  const { data: loginData, error: loginError } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    })

  if (loginError) {
    console.error("Login error:", loginError.message)
    return { error: loginError.message }
  }

  const user = loginData.user

  // Step 2: Fetch profile
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  if (profileError) {
    console.error("Fetch profile error:", profileError.message)
    return { error: profileError.message }
  }

  return { user, profile }
}

async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error("Sign out error:", error.message)
    return { error: error.message }
  }
  return { success: true }
}

// Keep the old function name for backward compatibility
async function loginAndFetchProfile(args: SignInArgs) {
  return signInWithProfile(args)
}

export { signUpWithProfile, signInWithProfile, signOut, loginAndFetchProfile }
