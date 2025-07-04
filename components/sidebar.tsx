"use client"

import { Home, FolderOpen, History, Settings, Plus, ChevronDown, ChevronRight, Search, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

interface SidebarProps {
  onClose: () => void
}

export function Sidebar({ onClose }: SidebarProps) {
  const [expandedFolders, setExpandedFolders] = useState<string[]>(["recent"])
  const [searchQuery, setSearchQuery] = useState("")

  const toggleFolder = (folderId: string) => {
    setExpandedFolders((prev) => (prev.includes(folderId) ? prev.filter((id) => id !== folderId) : [...prev, folderId]))
  }

  const navigationItems = [
    { icon: Home, label: "Dashboard", active: true },
    { icon: FolderOpen, label: "Projects", count: 12 },
    { icon: History, label: "Recent", count: 8 },
    { icon: Star, label: "Favorites", count: 3 },
    { icon: Settings, label: "Settings" },
  ]

  const projects = [
    { name: "Marketing Copy Generator", type: "Active", progress: 75 },
    { name: "Blog Post Assistant", type: "Draft", progress: 45 },
    { name: "Code Documentation", type: "Complete", progress: 100 },
    { name: "Creative Writing", type: "Active", progress: 30 },
  ]

  return (
    <div className="h-full bg-white border-r border-gray-100 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-200">
          <Plus className="w-4 h-4 mr-2" />
          New Studio
        </Button>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-gray-200 focus:border-orange-300 focus:ring-orange-200"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1">
        {navigationItems.map((item) => (
          <Button
            key={item.label}
            variant="ghost"
            className={`w-full justify-start hover:bg-orange-50 hover:text-orange-600 transition-colors ${
              item.active ? "bg-orange-50 text-orange-600 border-r-2 border-orange-500" : ""
            }`}
          >
            <item.icon className="w-4 h-4 mr-3" />
            <span className="flex-1 text-left">{item.label}</span>
            {item.count && (
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{item.count}</span>
            )}
          </Button>
        ))}

        {/* Projects Section */}
        <div className="pt-6">
          <Button
            variant="ghost"
            onClick={() => toggleFolder("recent")}
            className="w-full justify-start text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            {expandedFolders.includes("recent") ? (
              <ChevronDown className="w-4 h-4 mr-2" />
            ) : (
              <ChevronRight className="w-4 h-4 mr-2" />
            )}
            Recent Projects
          </Button>

          {expandedFolders.includes("recent") && (
            <div className="ml-6 mt-2 space-y-1">
              {projects.map((project) => (
                <Button
                  key={project.name}
                  variant="ghost"
                  className="w-full justify-start text-sm hover:bg-orange-50 hover:text-orange-600 py-2 h-auto"
                >
                  <div className="flex-1 text-left">
                    <div className="font-medium truncate">{project.name}</div>
                    <div className="text-xs text-gray-500 flex items-center gap-2">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs ${
                          project.type === "Active"
                            ? "bg-green-100 text-green-700"
                            : project.type === "Complete"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {project.type}
                      </span>
                      <div className="flex-1 bg-gray-200 rounded-full h-1">
                        <div
                          className="bg-orange-400 h-1 rounded-full transition-all duration-300"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100">
        <div className="text-xs text-gray-500 space-y-1">
          <div className="flex justify-between">
            <span>Words Generated</span>
            <span className="font-medium text-orange-600">12,847</span>
          </div>
          <div className="flex justify-between">
            <span>Active Sessions</span>
            <span className="font-medium">3</span>
          </div>
        </div>
      </div>
    </div>
  )
}
