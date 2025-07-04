"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Dashboard } from "@/components/dashboard"
import { FloatingComposer } from "@/components/floating-composer"
import { ThreeBackground } from "@/components/three-background"
import { AnimatePresence, motion } from "framer-motion"

export default function ClientRoot() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-white text-black overflow-hidden">
      {/* Three.js background (client-only) */}
      <ThreeBackground />

      <div className="relative z-10 flex h-screen">
        {/* Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ x: -320, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -320, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-80 flex-shrink-0"
            >
              <Sidebar onClose={() => setSidebarOpen(false)} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main area */}
        <div className="flex-1 flex flex-col">
          <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} sidebarOpen={sidebarOpen} />
          <main className="flex-1 overflow-auto">
            <Dashboard />
          </main>
        </div>
      </div>

      {/* Composer */}
      <FloatingComposer />
    </div>
  )
}
