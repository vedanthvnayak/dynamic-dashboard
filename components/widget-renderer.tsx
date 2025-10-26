"use client"

import type React from "react"
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
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

interface WidgetRendererProps {
  type: string
}

const analyticsData = [
  { name: "Mon", views: 4000 },
  { name: "Tue", views: 3000 },
  { name: "Wed", views: 2000 },
  { name: "Thu", views: 2780 },
  { name: "Fri", views: 1890 },
  { name: "Sat", views: 2390 },
  { name: "Sun", views: 3490 },
]

const trendingData = [
  { name: "Week 1", value: 65 },
  { name: "Week 2", value: 78 },
  { name: "Week 3", value: 72 },
  { name: "Week 4", value: 88 },
]

const performanceData = [
  { name: "CPU", value: 45 },
  { name: "Memory", value: 62 },
  { name: "Disk", value: 38 },
  { name: "Network", value: 55 },
]

const distributionData = [
  { name: "Product A", value: 35 },
  { name: "Product B", value: 25 },
  { name: "Product C", value: 20 },
  { name: "Product D", value: 20 },
]

const revenueData = [
  { name: "Jan", revenue: 4000 },
  { name: "Feb", revenue: 3000 },
  { name: "Mar", revenue: 2000 },
  { name: "Apr", revenue: 2780 },
  { name: "May", revenue: 1890 },
  { name: "Jun", revenue: 2390 },
]

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"]

const widgets: Record<string, { title: string; icon: React.ReactNode; content: React.ReactNode }> = {
  analytics: {
    title: "Analytics",
    icon: <BarChart3 className="w-5 h-5" />,
    content: (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Page Views</span>
          <span className="text-2xl font-semibold">12.5K</span>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={analyticsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="rgba(255,255,255,0.5)" />
            <YAxis tick={{ fontSize: 12 }} stroke="rgba(255,255,255,0.5)" />
            <Tooltip contentStyle={{ backgroundColor: "rgba(0,0,0,0.8)", border: "none", borderRadius: "8px" }} />
            <Line type="monotone" dataKey="views" stroke="#3b82f6" dot={false} strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    ),
  },
  trending: {
    title: "Trending",
    icon: <TrendingUp className="w-5 h-5" />,
    content: (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Growth Rate</span>
          <span className="text-2xl font-semibold text-green-500">+24%</span>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={trendingData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="rgba(255,255,255,0.5)" />
            <YAxis tick={{ fontSize: 12 }} stroke="rgba(255,255,255,0.5)" />
            <Tooltip contentStyle={{ backgroundColor: "rgba(0,0,0,0.8)", border: "none", borderRadius: "8px" }} />
            <Bar dataKey="value" fill="#10b981" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    ),
  },
  users: {
    title: "Users",
    icon: <Users className="w-5 h-5" />,
    content: (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-muted/50 rounded-lg p-3">
            <p className="text-xs text-muted-foreground mb-1">Total Users</p>
            <p className="text-2xl font-semibold">2,847</p>
          </div>
          <div className="bg-muted/50 rounded-lg p-3">
            <p className="text-xs text-muted-foreground mb-1">Active Today</p>
            <p className="text-2xl font-semibold">1,243</p>
          </div>
        </div>
        <div className="bg-muted/50 rounded-lg p-3">
          <p className="text-xs text-muted-foreground mb-2">Growth</p>
          <div className="w-full h-2 bg-background rounded-full overflow-hidden">
            <div className="h-full w-3/4 bg-blue-500 rounded-full" />
          </div>
        </div>
      </div>
    ),
  },
  calendar: {
    title: "Calendar",
    icon: <Calendar className="w-5 h-5" />,
    content: (
      <div className="space-y-3">
        <div className="text-sm text-muted-foreground mb-3">December 2024</div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 28 }).map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded text-xs font-medium flex items-center justify-center ${
                i % 7 === 0 || i % 7 === 6 ? "bg-muted/30 text-muted-foreground" : "bg-primary/20 text-primary"
              }`}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  timer: {
    title: "Timer",
    icon: <Clock className="w-5 h-5" />,
    content: (
      <div className="space-y-4">
        <div className="text-4xl font-mono font-semibold text-center text-primary">02:45:30</div>
        <div className="flex gap-2">
          <button className="flex-1 py-2 bg-primary/20 hover:bg-primary/30 rounded-lg text-sm font-medium transition-colors">
            Start
          </button>
          <button className="flex-1 py-2 bg-muted/50 hover:bg-muted transition-colors rounded-lg text-sm font-medium">
            Reset
          </button>
        </div>
      </div>
    ),
  },
  performance: {
    title: "Performance",
    icon: <Zap className="w-5 h-5" />,
    content: (
      <div className="space-y-4">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="rgba(255,255,255,0.5)" />
            <YAxis tick={{ fontSize: 12 }} stroke="rgba(255,255,255,0.5)" />
            <Tooltip contentStyle={{ backgroundColor: "rgba(0,0,0,0.8)", border: "none", borderRadius: "8px" }} />
            <Bar dataKey="value" fill="#f59e0b" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    ),
  },
  goals: {
    title: "Goals",
    icon: <Target className="w-5 h-5" />,
    content: (
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Q4 Target</span>
            <span className="font-semibold">78%</span>
          </div>
          <div className="w-full h-3 bg-muted/50 rounded-full overflow-hidden">
            <div className="h-full w-9/12 bg-orange-500 rounded-full" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Annual Goal</span>
            <span className="font-semibold">92%</span>
          </div>
          <div className="w-full h-3 bg-muted/50 rounded-full overflow-hidden">
            <div className="h-full w-11/12 bg-green-500 rounded-full" />
          </div>
        </div>
      </div>
    ),
  },
  distribution: {
    title: "Distribution",
    icon: <PieChart className="w-5 h-5" />,
    content: (
      <div className="flex items-center justify-center">
        <ResponsiveContainer width="100%" height={220}>
          <RechartsPieChart>
            <Pie
              data={distributionData}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={60}
              paddingAngle={2}
              dataKey="value"
            >
              {distributionData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: "rgba(0,0,0,0.8)", border: "none", borderRadius: "8px" }} />
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>
    ),
  },
  health: {
    title: "Health",
    icon: <Activity className="w-5 h-5" />,
    content: (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-muted/50 rounded-lg p-3">
            <p className="text-xs text-muted-foreground mb-1">Heart Rate</p>
            <p className="text-2xl font-semibold">72 bpm</p>
          </div>
          <div className="bg-muted/50 rounded-lg p-3">
            <p className="text-xs text-muted-foreground mb-1">Steps</p>
            <p className="text-2xl font-semibold">8.2K</p>
          </div>
        </div>
        <div className="bg-muted/50 rounded-lg p-3">
          <p className="text-xs text-muted-foreground mb-2">Daily Goal</p>
          <div className="w-full h-2 bg-background rounded-full overflow-hidden">
            <div className="h-full w-2/3 bg-red-500 rounded-full" />
          </div>
        </div>
      </div>
    ),
  },
  messages: {
    title: "Messages",
    icon: <MessageSquare className="w-5 h-5" />,
    content: (
      <div className="space-y-2">
        <div className="p-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors cursor-pointer">
          <p className="text-sm font-medium">Sarah Johnson</p>
          <p className="text-xs text-muted-foreground truncate">That sounds great! Let's schedule...</p>
          <p className="text-xs text-muted-foreground mt-1">2 minutes ago</p>
        </div>
        <div className="p-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors cursor-pointer">
          <p className="text-sm font-medium">Team Lead</p>
          <p className="text-xs text-muted-foreground truncate">Project update ready for review</p>
          <p className="text-xs text-muted-foreground mt-1">1 hour ago</p>
        </div>
      </div>
    ),
  },
  settings: {
    title: "Settings",
    icon: <Settings className="w-5 h-5" />,
    content: (
      <div className="space-y-3">
        <div className="flex justify-between items-center p-2 hover:bg-muted/50 rounded-lg transition-colors">
          <span className="text-sm">Dark Mode</span>
          <div className="w-10 h-6 bg-primary rounded-full" />
        </div>
        <div className="flex justify-between items-center p-2 hover:bg-muted/50 rounded-lg transition-colors">
          <span className="text-sm">Notifications</span>
          <div className="w-10 h-6 bg-primary rounded-full" />
        </div>
        <div className="flex justify-between items-center p-2 hover:bg-muted/50 rounded-lg transition-colors">
          <span className="text-sm">Auto-save</span>
          <div className="w-10 h-6 bg-muted/50 rounded-full" />
        </div>
      </div>
    ),
  },
  notifications: {
    title: "Notifications",
    icon: <Bell className="w-5 h-5" />,
    content: (
      <div className="space-y-2">
        <div className="flex gap-3 p-2 hover:bg-muted/50 rounded-lg transition-colors cursor-pointer">
          <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium">System Alert</p>
            <p className="text-xs text-muted-foreground">Update available</p>
          </div>
        </div>
        <div className="flex gap-3 p-2 hover:bg-muted/50 rounded-lg transition-colors cursor-pointer">
          <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium">New Feature</p>
            <p className="text-xs text-muted-foreground">Dark mode released</p>
          </div>
        </div>
      </div>
    ),
  },
  email: {
    title: "Email",
    icon: <Mail className="w-5 h-5" />,
    content: (
      <div className="space-y-2">
        <div className="p-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors cursor-pointer">
          <p className="text-sm font-medium">John Doe</p>
          <p className="text-xs text-muted-foreground truncate">Project update - Q4 results</p>
          <p className="text-xs text-muted-foreground mt-1">Today at 10:30 AM</p>
        </div>
        <div className="p-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors cursor-pointer">
          <p className="text-sm font-medium">Team Lead</p>
          <p className="text-xs text-muted-foreground truncate">Meeting scheduled for tomorrow</p>
          <p className="text-xs text-muted-foreground mt-1">Yesterday at 3:45 PM</p>
        </div>
      </div>
    ),
  },
  documents: {
    title: "Documents",
    icon: <FileText className="w-5 h-5" />,
    content: (
      <div className="space-y-2">
        <div className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded-lg cursor-pointer transition-colors">
          <div className="w-8 h-8 bg-red-500/10 rounded flex items-center justify-center flex-shrink-0">
            <FileText className="w-4 h-4 text-red-500" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Q4_Report.pdf</p>
            <p className="text-xs text-muted-foreground">2.4 MB</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded-lg cursor-pointer transition-colors">
          <div className="w-8 h-8 bg-blue-500/10 rounded flex items-center justify-center flex-shrink-0">
            <FileText className="w-4 h-4 text-blue-500" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Proposal_2024.docx</p>
            <p className="text-xs text-muted-foreground">1.2 MB</p>
          </div>
        </div>
      </div>
    ),
  },
  tasks: {
    title: "Tasks",
    icon: <CheckSquare className="w-5 h-5" />,
    content: (
      <div className="space-y-2">
        <div className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded-lg transition-colors">
          <input type="checkbox" className="w-4 h-4 rounded" defaultChecked />
          <span className="text-sm line-through text-muted-foreground">Complete project</span>
        </div>
        <div className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded-lg transition-colors">
          <input type="checkbox" className="w-4 h-4 rounded" />
          <span className="text-sm">Review feedback</span>
        </div>
        <div className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded-lg transition-colors">
          <input type="checkbox" className="w-4 h-4 rounded" />
          <span className="text-sm">Deploy to production</span>
        </div>
      </div>
    ),
  },
  projects: {
    title: "Projects",
    icon: <Briefcase className="w-5 h-5" />,
    content: (
      <div className="space-y-2">
        <div className="p-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors cursor-pointer">
          <p className="text-sm font-medium">Website Redesign</p>
          <p className="text-xs text-muted-foreground">In Progress • 65%</p>
          <div className="w-full h-1.5 bg-background rounded-full overflow-hidden mt-2">
            <div className="h-full w-2/3 bg-blue-500 rounded-full" />
          </div>
        </div>
        <div className="p-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors cursor-pointer">
          <p className="text-sm font-medium">Mobile App</p>
          <p className="text-xs text-muted-foreground">Planning • 20%</p>
          <div className="w-full h-1.5 bg-background rounded-full overflow-hidden mt-2">
            <div className="h-full w-1/5 bg-orange-500 rounded-full" />
          </div>
        </div>
      </div>
    ),
  },
  revenue: {
    title: "Revenue",
    icon: <DollarSign className="w-5 h-5" />,
    content: (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-muted/50 rounded-lg p-3">
            <p className="text-xs text-muted-foreground mb-1">This Month</p>
            <p className="text-2xl font-semibold">$45.2K</p>
          </div>
          <div className="bg-muted/50 rounded-lg p-3">
            <p className="text-xs text-muted-foreground mb-1">Growth</p>
            <p className="text-2xl font-semibold text-green-500">+12%</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="rgba(255,255,255,0.5)" />
            <YAxis tick={{ fontSize: 12 }} stroke="rgba(255,255,255,0.5)" />
            <Tooltip contentStyle={{ backgroundColor: "rgba(0,0,0,0.8)", border: "none", borderRadius: "8px" }} />
            <Line type="monotone" dataKey="revenue" stroke="#10b981" dot={false} strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    ),
  },
  favorites: {
    title: "Favorites",
    icon: <Heart className="w-5 h-5" />,
    content: (
      <div className="space-y-2">
        <div className="flex items-center gap-2 p-2 hover:bg-muted/50 rounded-lg cursor-pointer transition-colors">
          <Heart className="w-4 h-4 text-red-500 fill-red-500" />
          <span className="text-sm">Dashboard Analytics</span>
        </div>
        <div className="flex items-center gap-2 p-2 hover:bg-muted/50 rounded-lg cursor-pointer transition-colors">
          <Heart className="w-4 h-4 text-red-500 fill-red-500" />
          <span className="text-sm">Performance Metrics</span>
        </div>
        <div className="flex items-center gap-2 p-2 hover:bg-muted/50 rounded-lg cursor-pointer transition-colors">
          <Heart className="w-4 h-4 text-red-500 fill-red-500" />
          <span className="text-sm">Revenue Report</span>
        </div>
      </div>
    ),
  },
  playlist: {
    title: "Playlist",
    icon: <Music className="w-5 h-5" />,
    content: (
      <div className="space-y-3">
        <div className="p-3 bg-muted/50 rounded-lg">
          <p className="text-sm font-medium">Now Playing</p>
          <p className="text-xs text-muted-foreground mt-1">Beautiful Day - 3:45</p>
          <div className="w-full h-1 bg-background rounded-full overflow-hidden mt-2">
            <div className="h-full w-1/3 bg-primary rounded-full" />
          </div>
        </div>
        <div className="text-xs text-muted-foreground space-y-1">
          <p>Next: Wonderwall - 4:18</p>
          <p>Then: Fix You - 4:55</p>
        </div>
      </div>
    ),
  },
  ideas: {
    title: "Ideas",
    icon: <Lightbulb className="w-5 h-5" />,
    content: (
      <div className="space-y-2">
        <div className="p-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors cursor-pointer">
          <p className="text-sm font-medium">New feature idea</p>
          <p className="text-xs text-muted-foreground">Advanced dark mode toggle</p>
        </div>
        <div className="p-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors cursor-pointer">
          <p className="text-sm font-medium">Improvement</p>
          <p className="text-xs text-muted-foreground">Faster widget loading</p>
        </div>
        <div className="p-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors cursor-pointer">
          <p className="text-sm font-medium">Enhancement</p>
          <p className="text-xs text-muted-foreground">Custom widget themes</p>
        </div>
      </div>
    ),
  },
}

export function WidgetRenderer({ type }: WidgetRendererProps) {
  const widget = widgets[type]

  if (!widget) {
    return (
      <div className="text-center py-8">
        <p className="text-sm text-muted-foreground">Unknown widget</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="text-foreground">{widget.icon}</div>
        <h3 className="font-semibold text-foreground">{widget.title}</h3>
      </div>
      <div>{widget.content}</div>
    </div>
  )
}
