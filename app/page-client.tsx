"use client"

import dynamic from "next/dynamic"

// Loading component
function LoadingFallback() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Loading Cerebras Studio...</p>
      </div>
    </div>
  )
}

// Use the minimal client root without Three.js and complex animations
const MinimalClientRoot = dynamic(() => import("@/components/minimal-client-root"), {
  ssr: false,
  loading: () => <LoadingFallback />,
})

export default function PageClient() {
  return <MinimalClientRoot />
}
