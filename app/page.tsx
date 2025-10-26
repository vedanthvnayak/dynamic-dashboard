"use client"

import type React from "react"

import { useState } from "react"
import { Dashboard } from "@/components/dashboard"
import { WidgetSidebar } from "@/components/widget-sidebar"

export default function Home() {
  const [widgets, setWidgets] = useState<Array<{ id: string; type: string }>>([])
  const [draggedWidget, setDraggedWidget] = useState<string | null>(null)
  const [widgetSizes, setWidgetSizes] = useState<Record<string, { width: number; height: number }>>({})
  const [widgetPositions, setWidgetPositions] = useState<Record<string, { x: number; y: number }>>({})

  const handleDragStart = (type: string, e: React.DragEvent) => {
    e.dataTransfer.effectAllowed = "copy"
    e.dataTransfer.setData("widgetType", type)
    setDraggedWidget(type)
  }

  const handleDragEnd = () => {
    setDraggedWidget(null)
  }

  const handleDropOnCanvas = (e: React.DragEvent) => {
    e.preventDefault()
    const widgetType = e.dataTransfer.getData("widgetType")
    if (widgetType) {
      const newWidget = {
        id: `${widgetType}-${Date.now()}`,
        type: widgetType,
      }
      setWidgets([...widgets, newWidget])
      setWidgetSizes((prev) => ({
        ...prev,
        [newWidget.id]: { width: 350, height: 300 },
      }))
      setWidgetPositions((prev) => ({
        ...prev,
        [newWidget.id]: { x: 40 + widgets.length * 40, y: 40 + widgets.length * 40 },
      }))
      setDraggedWidget(null)
    }
  }

  const removeWidget = (id: string) => {
    setWidgets(widgets.filter((w) => w.id !== id))
    setWidgetSizes((prev) => {
      const newSizes = { ...prev }
      delete newSizes[id]
      return newSizes
    })
    setWidgetPositions((prev) => {
      const newPositions = { ...prev }
      delete newPositions[id]
      return newPositions
    })
  }
  const handleMoveWidget = (id: string, x: number, y: number) => {
    setWidgetPositions((prev) => ({
      ...prev,
      [id]: { x, y },
    }))
  }

  const handleResizeWidget = (id: string, width: number, height: number) => {
    setWidgetSizes((prev) => ({
      ...prev,
      [id]: { width: Math.max(300, width), height: Math.max(300, height) },
    }))
  }

  // Arrange widgets in a grid layout
  const arrangeWidgets = () => {
    const gap = 24;
    const defaultWidth = 350;
    const defaultHeight = 300;
    const columns = 3;
    // Arrange positions
    setWidgetPositions(() => {
      const newPositions: Record<string, { x: number; y: number }> = {};
      widgets.forEach((widget, idx) => {
        const col = idx % columns;
        const row = Math.floor(idx / columns);
        newPositions[widget.id] = {
          x: 40 + col * (defaultWidth + gap),
          y: 40 + row * (defaultHeight + gap),
        };
      });
      return newPositions;
    });
    // Reset sizes
    setWidgetSizes(() => {
      const newSizes: Record<string, { width: number; height: number }> = {};
      widgets.forEach((widget) => {
        newSizes[widget.id] = { width: defaultWidth, height: defaultHeight };
      });
      return newSizes;
    });
  };

  return (
    <div className="min-h-screen bg-background dark">
      <div className="flex h-screen">
        <WidgetSidebar onDragStart={handleDragStart} draggedWidget={draggedWidget} />
        <div className="flex-1 flex flex-col">
          <div className="p-4 flex gap-2">
            <button
              className="px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary/80 transition"
              onClick={arrangeWidgets}
              disabled={widgets.length === 0}
            >
              Arrange Widgets
            </button>
          </div>
          {/* Main dashboard area */}
          <Dashboard
            widgets={widgets}
            onRemoveWidget={removeWidget}
            onDropOnCanvas={handleDropOnCanvas}
            onDragEnd={handleDragEnd}
            draggedWidget={draggedWidget}
            widgetSizes={widgetSizes}
            widgetPositions={widgetPositions}
            onResizeWidget={handleResizeWidget}
            onMoveWidget={handleMoveWidget}
          />
        </div>
      </div>
    </div>
  )
}
