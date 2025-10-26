"use client";

import type React from "react";

import { LayoutGrid } from "lucide-react";
import { WidgetContainer } from "./widget-container";

interface DashboardProps {
  widgets: Array<{ id: string; type: string }>;
  onRemoveWidget: (id: string) => void;
  onDropOnCanvas: (e: React.DragEvent) => void;
  onDragEnd: () => void;
  draggedWidget: string | null;
  widgetSizes: Record<string, { width: number; height: number }>;
  widgetPositions: Record<string, { x: number; y: number }>;
  onResizeWidget: (id: string, width: number, height: number) => void;
  onMoveWidget: (id: string, x: number, y: number) => void;
}

export function Dashboard({
  widgets,
  onRemoveWidget,
  onDropOnCanvas,
  onDragEnd,
  draggedWidget,
  widgetSizes,
  widgetPositions,
  onResizeWidget,
  onMoveWidget,
}: DashboardProps) {
  return (
    <div className="flex-1 flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/40 backdrop-blur-xl px-8 py-6 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <LayoutGrid className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-foreground">
                Dashboard
              </h1>
              <p className="text-xs text-muted-foreground mt-0.5">
                {widgets.length} widget{widgets.length !== 1 ? "s" : ""} • Drag
                from sidebar to add • Drag corner to resize
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Canvas */}
      <div
        className={`flex-1 overflow-auto p-8 transition-colors ${
          draggedWidget ? "bg-primary/5" : ""
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          e.dataTransfer.dropEffect = "copy";
        }}
        onDrop={onDropOnCanvas}
        onDragLeave={() => {}}
        onDragEnd={onDragEnd}
      >
        {widgets.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center max-w-md">
              <div className="w-20 h-20 rounded-2xl bg-muted/50 mx-auto mb-6 flex items-center justify-center">
                <LayoutGrid className="w-10 h-10 text-muted-foreground/50" />
              </div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                Your dashboard is empty
              </h2>
              <p className="text-muted-foreground mb-6">
                Open the sidebar and drag widgets here to get started
              </p>
            </div>
          </div>
        ) : (
          <div className="relative w-full h-full" style={{ minHeight: 600 }}>
            {widgets.map((widget) => (
              <WidgetContainer
                key={widget.id}
                id={widget.id}
                type={widget.type}
                onRemove={onRemoveWidget}
                size={widgetSizes[widget.id] || { width: 350, height: 350 }}
                position={widgetPositions[widget.id] || { x: 40, y: 40 }}
                onResize={onResizeWidget}
                onMove={onMoveWidget}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
