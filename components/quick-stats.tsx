"use client"

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
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-lg transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg border ${getColorClasses(stat.color)}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">{stat.change}</span>
          </div>

          <div>
            <div className="text-2xl font-bold mb-1">{stat.value}</div>
            <div className="text-gray-600 text-sm">{stat.label}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
