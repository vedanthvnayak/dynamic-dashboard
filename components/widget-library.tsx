"use client"

import { X } from "lucide-react"
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

interface WidgetLibraryProps {
  onSelectWidget: (type: string) => void
  onClose: () => void
}

const widgetOptions = [
  { id: "analytics", name: "Analytics", icon: BarChart3, description: "View analytics data" },
  { id: "trending", name: "Trending", icon: TrendingUp, description: "Track trending metrics" },
  { id: "users", name: "Users", icon: Users, description: "User statistics" },
  { id: "calendar", name: "Calendar", icon: Calendar, description: "Calendar view" },
  { id: "timer", name: "Timer", icon: Clock, description: "Time tracking" },
  { id: "performance", name: "Performance", icon: Zap, description: "System performance" },
  { id: "goals", name: "Goals", icon: Target, description: "Goal tracking" },
  { id: "distribution", name: "Distribution", icon: PieChart, description: "Data distribution" },
  { id: "health", name: "Health", icon: Activity, description: "Health metrics" },
  { id: "messages", name: "Messages", icon: MessageSquare, description: "Recent messages" },
  { id: "settings", name: "Settings", icon: Settings, description: "Quick settings" },
  { id: "notifications", name: "Notifications", icon: Bell, description: "System alerts" },
  { id: "email", name: "Email", icon: Mail, description: "Email inbox" },
  { id: "documents", name: "Documents", icon: FileText, description: "Recent documents" },
  { id: "tasks", name: "Tasks", icon: CheckSquare, description: "Task list" },
  { id: "projects", name: "Projects", icon: Briefcase, description: "Active projects" },
  { id: "revenue", name: "Revenue", icon: DollarSign, description: "Revenue tracking" },
  { id: "favorites", name: "Favorites", icon: Heart, description: "Favorite items" },
  { id: "playlist", name: "Playlist", icon: Music, description: "Music playlist" },
  { id: "ideas", name: "Ideas", icon: Lightbulb, description: "Idea board" },
]

export function WidgetLibrary({ onSelectWidget, onClose }: WidgetLibraryProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="border-b border-border px-8 py-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">Add Widget</h2>
            <p className="text-sm text-muted-foreground mt-1">Choose from {widgetOptions.length} available widgets</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg transition-colors" aria-label="Close">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Widget Grid */}
        <div className="overflow-y-auto flex-1 p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {widgetOptions.map((widget) => {
              const Icon = widget.icon
              return (
                <button
                  key={widget.id}
                  onClick={() => onSelectWidget(widget.id)}
                  className="group p-4 rounded-xl border border-border hover:border-primary hover:bg-muted transition-all duration-200 text-left"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-muted group-hover:bg-primary/10 transition-colors">
                      <Icon className="w-5 h-5 text-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {widget.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">{widget.description}</p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
