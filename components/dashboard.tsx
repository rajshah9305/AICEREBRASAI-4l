"use client"

import { motion } from "framer-motion"
import { StudioCard } from "@/components/studio-card"
import { QuickStats } from "@/components/quick-stats"
import { RecentActivity } from "@/components/recent-activity"

export function Dashboard() {
  const studios = [
    {
      id: "1",
      title: "Marketing Copy Generator",
      description: "AI-powered marketing content creation with brand voice consistency",
      category: "Marketing",
      progress: 75,
      lastUsed: "2 hours ago",
      status: "active",
      color: "orange",
    },
    {
      id: "2",
      title: "Technical Documentation",
      description: "Automated code documentation and API reference generation",
      category: "Development",
      progress: 45,
      lastUsed: "1 day ago",
      status: "draft",
      color: "blue",
    },
    {
      id: "3",
      title: "Creative Writing Assistant",
      description: "Story development, character creation, and narrative enhancement",
      category: "Creative",
      progress: 90,
      lastUsed: "3 hours ago",
      status: "active",
      color: "purple",
    },
    {
      id: "4",
      title: "Data Analysis Reporter",
      description: "Transform raw data into comprehensive business insights",
      category: "Analytics",
      progress: 100,
      lastUsed: "5 minutes ago",
      status: "complete",
      color: "green",
    },
    {
      id: "5",
      title: "Email Campaign Builder",
      description: "Personalized email sequences with A/B testing optimization",
      category: "Marketing",
      progress: 30,
      lastUsed: "1 week ago",
      status: "draft",
      color: "orange",
    },
    {
      id: "6",
      title: "Research Synthesizer",
      description: "Academic paper analysis and literature review automation",
      category: "Research",
      progress: 60,
      lastUsed: "2 days ago",
      status: "active",
      color: "indigo",
    },
  ]

  return (
    <div className="p-8 space-y-8">
      {/* Welcome Section */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-black via-gray-800 to-orange-600 bg-clip-text text-transparent">
          Welcome back to your Studio
        </h1>
        <p className="text-gray-600">Continue your AI-powered creative workflow or start something new</p>
      </motion.div>

      {/* Quick Stats */}
      <QuickStats />

      {/* Studio Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Your Studios</h2>
          <div className="flex gap-2">
            <button className="px-4 py-2 text-sm bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-colors">
              All
            </button>
            <button className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
              Active
            </button>
            <button className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
              Recent
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studios.map((studio, index) => (
            <motion.div
              key={studio.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <StudioCard studio={studio} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <RecentActivity />
    </div>
  )
}
