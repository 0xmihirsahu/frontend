"use client"

import ProtectedRoute from "@/components/ProtectedRoute"
import { useAuthContext } from "@/context/AuthContext"
import SignOutButton from "@/components/SignOutButton"

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  )
}

function DashboardContent() {
  const { user, profile } = useAuthContext()

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <SignOutButton className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
              Sign Out
            </SignOutButton>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-blue-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">User Information</h2>
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-500">Email:</span>
                  <p className="text-gray-900">{user?.email}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Name:</span>
                  <p className="text-gray-900">
                    {profile?.first_name} {profile?.last_name}
                  </p>
                </div>

                <div>
                  <span className="text-sm font-medium text-gray-500">Member Since:</span>
                  <p className="text-gray-900">
                    {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : "N/A"}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                  View Portfolio
                </button>
                <button className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors">
                  Start Trading
                </button>
                <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors">
                  View Markets
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Welcome to Spout Finance</h2>
            <p className="text-gray-600">
              You're now logged in and ready to explore our RWA platform for tokenizing T-Bills and Corporate Bonds.
              Navigate through the platform to start trading and managing your investments.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 