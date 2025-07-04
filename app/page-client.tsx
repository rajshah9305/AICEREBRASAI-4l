"use client"

import dynamic from "next/dynamic"
import { Suspense } from "react"

// Enhanced loading component
function LoadingFallback() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-4"></div>
          <div
            className="absolute inset-0 w-12 h-12 border-4 border-transparent border-b-orange-300 rounded-full animate-spin mx-auto"
            style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
          ></div>
        </div>
        <p className="text-gray-600 font-medium">Loading Cerebras Studio...</p>
        <p className="text-gray-400 text-sm mt-1">Initializing 3D environment</p>
      </div>
    </div>
  )
}

// Error boundary component
function ErrorFallback() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-red-500 text-xl">⚠</span>
        </div>
        <p className="text-gray-600 font-medium">Unable to load 3D environment</p>
        <p className="text-gray-400 text-sm mt-1">Falling back to standard interface</p>
      </div>
    </div>
  )
}

// Dynamic import with enhanced error handling
const EnhancedClientRoot = dynamic(() => import("@/components/enhanced-client-root"), {
  ssr: false,
  loading: () => <LoadingFallback />,
})

export default function PageClient() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <EnhancedClientRoot />
    </Suspense>
  )
}
