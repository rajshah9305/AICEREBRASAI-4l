"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Dashboard } from "@/components/dashboard"
import { FloatingComposer } from "@/components/floating-composer"
import { ThreeBackground } from "@/components/three-background"

export default function EnhancedClientRoot() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Ensure smooth loading
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Cerebras Studio...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white text-black overflow-hidden relative">
      {/* Three.js Background */}
      <ThreeBackground />

      {/* Main UI Layer */}
      <div className="relative z-10 flex h-screen">
        {/* Sidebar */}
        <AnimatePresence mode="wait">
          {sidebarOpen && (
            <motion.div
              initial={{ x: -320, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -320, opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: [0.4, 0.0, 0.2, 1],
              }}
              className="w-80 flex-shrink-0 relative z-20"
            >
              <div className="h-full bg-white/95 backdrop-blur-sm border-r border-gray-100/50">
                <Sidebar onClose={() => setSidebarOpen(false)} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="flex-1 flex flex-col relative z-10">
          <div className="bg-white/90 backdrop-blur-sm border-b border-gray-100/50">
            <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} sidebarOpen={sidebarOpen} />
          </div>

          <main className="flex-1 overflow-auto bg-gradient-to-br from-white/95 to-orange-50/30 backdrop-blur-sm">
            <Dashboard />
          </main>
        </div>
      </div>

      {/* Floating Composer */}
      <FloatingComposer />
    </div>
  )
}
