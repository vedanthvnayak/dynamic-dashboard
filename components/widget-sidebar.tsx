"use client"

import type React from "react"

import { useState } from "react"
import { Search, X } from "lucide-react"
import {
  BarChart3,
  TrendingUp,
  Users,
  Calendar,
  Clock,
  Zap,
  Target,
  PieChart,
  Activity,
  MessageSquare,
  Settings,
  Bell,
  Mail,
  FileText,
  CheckSquare,
  Briefcase,
  DollarSign,
  Heart,
  Music,
  Lightbulb,
} from "lucide-react"

interface WidgetSidebarProps {
  onDragStart: (type: string, e: React.DragEvent) => void
  draggedWidget: string | null
}

const widgetOptions = [
  { id: "analytics", name: "Analytics", icon: BarChart3, color: "bg-blue-500/10 text-blue-600" },
  { id: "trending", name: "Trending", icon: TrendingUp, color: "bg-green-500/10 text-green-600" },
  { id: "users", name: "Users", icon: Users, color: "bg-purple-500/10 text-purple-600" },
  { id: "calendar", name: "Calendar", icon: Calendar, color: "bg-orange-500/10 text-orange-600" },
  { id: "timer", name: "Timer", icon: Clock, color: "bg-red-500/10 text-red-600" },
  { id: "performance", name: "Performance", icon: Zap, color: "bg-yellow-500/10 text-yellow-600" },
  { id: "goals", name: "Goals", icon: Target, color: "bg-pink-500/10 text-pink-600" },
  { id: "distribution", name: "Distribution", icon: PieChart, color: "bg-indigo-500/10 text-indigo-600" },
  { id: "health", name: "Health", icon: Activity, color: "bg-cyan-500/10 text-cyan-600" },
  { id: "messages", name: "Messages", icon: MessageSquare, color: "bg-teal-500/10 text-teal-600" },
  { id: "settings", name: "Settings", icon: Settings, color: "bg-slate-500/10 text-slate-600" },
  { id: "notifications", name: "Notifications", icon: Bell, color: "bg-amber-500/10 text-amber-600" },
  { id: "email", name: "Email", icon: Mail, color: "bg-rose-500/10 text-rose-600" },
  { id: "documents", name: "Documents", icon: FileText, color: "bg-violet-500/10 text-violet-600" },
  { id: "tasks", name: "Tasks", icon: CheckSquare, color: "bg-lime-500/10 text-lime-600" },
  { id: "projects", name: "Projects", icon: Briefcase, color: "bg-fuchsia-500/10 text-fuchsia-600" },
  { id: "revenue", name: "Revenue", icon: DollarSign, color: "bg-emerald-500/10 text-emerald-600" },
  { id: "favorites", name: "Favorites", icon: Heart, color: "bg-red-500/10 text-red-600" },
  { id: "playlist", name: "Playlist", icon: Music, color: "bg-purple-500/10 text-purple-600" },
  { id: "ideas", name: "Ideas", icon: Lightbulb, color: "bg-yellow-500/10 text-yellow-600" },
]

export function WidgetSidebar({ onDragStart, draggedWidget }: WidgetSidebarProps) {
  const [search, setSearch] = useState("")
  const [isOpen, setIsOpen] = useState(true)

  const filteredWidgets = widgetOptions.filter((widget) => widget.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <>
      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "w-72" : "w-0"
        } border-r border-border/50 bg-card/40 backdrop-blur-xl transition-all duration-300 overflow-hidden flex flex-col`}
      >
        {/* Header */}
        <div className="border-b border-border/50 px-6 py-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Widgets</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 hover:bg-muted rounded-lg transition-colors"
              aria-label="Close sidebar"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search widgets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-muted/50 border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>

        {/* Widget List */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
          {filteredWidgets.map((widget) => {
            const Icon = widget.icon
            return (
              <div
                key={widget.id}
                draggable
                onDragStart={(e) => onDragStart(widget.id, e)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all cursor-grab active:cursor-grabbing group text-left ${
                  draggedWidget === widget.id
                    ? "bg-primary/20 border border-primary/50 opacity-50"
                    : "hover:bg-muted/50"
                }`}
              >
                <div className={`p-2 rounded-lg ${widget.color} flex-shrink-0`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {widget.name}
                </span>
              </div>
            )
          })}
          {filteredWidgets.length === 0 && (
            <div className="text-center py-8">
              <p className="text-sm text-muted-foreground">No widgets found</p>
            </div>
          )}
        </div>
      </div>

      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed left-4 top-1/2 -translate-y-1/2 p-3 rounded-lg bg-card border border-border/50 hover:bg-muted transition-colors z-40 shadow-lg"
          aria-label="Open sidebar"
        >
          <BarChart3 className="w-5 h-5 text-foreground" />
        </button>
      )}
    </>
  )
}
