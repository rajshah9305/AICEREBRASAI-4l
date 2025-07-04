"use client"

import { Play, MoreHorizontal, Clock, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Studio {
  id: string
  title: string
  description: string
  category: string
  progress: number
  lastUsed: string
  status: "active" | "draft" | "complete"
  color: string
}

interface StudioCardProps {
  studio: Studio
}

export function StudioCard({ studio }: StudioCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700"
      case "complete":
        return "bg-blue-100 text-blue-700"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  const getCategoryColor = (color: string) => {
    switch (color) {
      case "orange":
        return "bg-orange-100 text-orange-700 border-orange-200"
      case "blue":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "purple":
        return "bg-purple-100 text-purple-700 border-purple-200"
      case "green":
        return "bg-green-100 text-green-700 border-green-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer hover:-translate-y-1">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(studio.color)}`}>
              {studio.category}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(studio.status)}`}>
              {studio.status}
            </span>
          </div>
          <h3 className="font-semibold text-lg mb-2 group-hover:text-orange-600 transition-colors">{studio.title}</h3>
          <p className="text-gray-600 text-sm line-clamp-2">{studio.description}</p>
        </div>

        <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>

      {/* Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">Progress</span>
          <span className="text-sm font-medium text-orange-600">{studio.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-orange-400 to-orange-500 h-2 rounded-full transition-all duration-1000"
            style={{ width: `${studio.progress}%` }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-gray-500 text-sm">
          <Clock className="w-4 h-4" />
          <span>{studio.lastUsed}</span>
        </div>

        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button size="sm" variant="outline" className="hover:bg-orange-50 hover:border-orange-300 bg-transparent">
            <TrendingUp className="w-4 h-4" />
          </Button>
          <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
            <Play className="w-4 h-4 mr-1" />
            Continue
          </Button>
        </div>
      </div>
    </div>
  )
}
