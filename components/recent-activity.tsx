"use client"

import { motion } from "framer-motion"
import { FileText, MessageSquare, Zap, Clock } from "lucide-react"

export function RecentActivity() {
  const activities = [
    {
      icon: FileText,
      title: "Generated marketing copy",
      description: "Created 3 variations for product launch campaign",
      time: "2 hours ago",
      color: "orange",
    },
    {
      icon: MessageSquare,
      title: "Completed chat session",
      description: "Technical documentation Q&A with 15 exchanges",
      time: "4 hours ago",
      color: "blue",
    },
    {
      icon: Zap,
      title: "Optimized prompt template",
      description: "Improved creative writing assistant performance by 23%",
      time: "1 day ago",
      color: "purple",
    },
    {
      icon: FileText,
      title: "Exported final report",
      description: "Data analysis summary with visualizations",
      time: "2 days ago",
      color: "green",
    },
  ]

  const getColorClasses = (color: string) => {
    switch (color) {
      case "orange":
        return "bg-orange-50 text-orange-600"
      case "blue":
        return "bg-blue-50 text-blue-600"
      case "purple":
        return "bg-purple-50 text-purple-600"
      case "green":
        return "bg-green-50 text-green-600"
      default:
        return "bg-gray-50 text-gray-600"
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Recent Activity</h2>

      <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-50">
        {activities.map((activity, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <div className={`p-2 rounded-lg ${getColorClasses(activity.color)}`}>
                <activity.icon className="w-4 h-4" />
              </div>

              <div className="flex-1">
                <h3 className="font-medium mb-1">{activity.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{activity.description}</p>
                <div className="flex items-center gap-1 text-gray-500 text-xs">
                  <Clock className="w-3 h-3" />
                  <span>{activity.time}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
