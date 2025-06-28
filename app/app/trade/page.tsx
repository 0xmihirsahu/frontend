import Swapinterface from '@/components/interfaces/Swapinterface'
import React from 'react'

const page = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Trade</h1>
        <p className="text-gray-600">Buy and sell stocks with ease</p>
      </div>
      <div className="w-full max-w-2xl">
        <Swapinterface />
      </div>
    </div>
  )
}

export default page