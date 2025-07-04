"use client"

import { motion } from "framer-motion"
import { TrendingUp, Zap, Clock, Target } from "lucide-react"

export function QuickStats() {
  const stats = [
    {
      icon: Zap,
      label: "Words Generated",
      value: "12,847",
      change: "+23%",
      color: "orange",
    },
    {
      icon: Target,
      label: "Active Projects",
      value: "8",
      change: "+2",
      color: "blue",
    },
    {
      icon: Clock,
      label: "Time Saved",
      value: "47h",
      change: "+12h",
      color: "green",
    },
    {
      icon: TrendingUp,
      label: "Efficiency",
      value: "94%",
      change: "+8%",
      color: "purple",
    },
  ]

  const getColorClasses = (color: string) => {
    switch (color) {
      case "orange":
        return "bg-orange-50 text-orange-600 border-orange-100"
      case "blue":
        return "bg-blue-50 text-blue-600 border-blue-100"
      case "green":
        return "bg-green-50 text-green-600 border-green-100"
      case "purple":
        return "bg-purple-50 text-purple-600 border-purple-100"
      default:
        return "bg-gray-50 text-gray-600 border-gray-100"
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.6,
            delay: index * 0.1,
            ease: [0.4, 0.0, 0.2, 1],
          }}
          whileHover={{
            y: -4,
            scale: 1.02,
            transition: { duration: 0.2 },
          }}
          className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100/50 p-6 hover:shadow-lg transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <motion.div
              className={`p-3 rounded-lg border ${getColorClasses(stat.color)}`}
              whileHover={{ rotate: 5, scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <stat.icon className="w-5 h-5" />
            </motion.div>
            <motion.span
              className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
            >
              {stat.change}
            </motion.span>
          </div>

          <div>
            <motion.div
              className="text-2xl font-bold mb-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            >
              {stat.value}
            </motion.div>
            <div className="text-gray-600 text-sm">{stat.label}</div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
