"use client";

import React from "react";

import { X } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { WidgetRenderer } from "./widget-renderer";

interface WidgetContainerProps {
  id: string;
  type: string;
  onRemove: (id: string) => void;
  size: { width: number; height: number };
  position: { x: number; y: number };
  onResize: (id: string, width: number, height: number) => void;
  onMove: (id: string, x: number, y: number) => void;
}

export function WidgetContainer({
  id,
  type,
  onRemove,
  size,
  position,
  onResize,
  onMove,
}: WidgetContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [startSize, setStartSize] = useState({ width: 0, height: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  // Drag logic
  const handleDragStart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleDragMove = React.useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      onMove(id, newX, newY);
    },
    [isDragging, dragOffset, id, onMove]
  );

  const handleDragEnd = React.useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleDragMove);
      document.addEventListener("mouseup", handleDragEnd);
      return () => {
        document.removeEventListener("mousemove", handleDragMove);
        document.removeEventListener("mouseup", handleDragEnd);
      };
    }
  }, [isDragging, handleDragMove, handleDragEnd]);

  const handleClick = (e: React.MouseEvent) => {
    if (!isResizing) {
      setIsSelected(true);
      // Show a temporary tooltip with widget ID
      const tooltip = document.createElement("div");
      tooltip.textContent = `Widget ID: ${id}`;
      tooltip.style.position = "fixed";
      tooltip.style.left = `${e.clientX + 10}px`;
      tooltip.style.top = `${e.clientY + 10}px`;
      tooltip.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
      tooltip.style.color = "white";
      tooltip.style.padding = "4px 8px";
      tooltip.style.borderRadius = "4px";
      tooltip.style.fontSize = "12px";
      tooltip.style.zIndex = "1000";
      document.body.appendChild(tooltip);
      setTimeout(() => {
        document.body.removeChild(tooltip);
        setIsSelected(false);
      }, 2000);
    }
  };

  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    setStartPos({ x: e.clientX, y: e.clientY });
    if (containerRef.current) {
      setStartSize({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      });
    }
  };

  const handleResizeMove = React.useCallback(
    (e: MouseEvent) => {
      if (!isResizing || !containerRef.current) return;

      const deltaX = e.clientX - startPos.x;
      const deltaY = e.clientY - startPos.y;

      const newWidth = Math.max(300, startSize.width + deltaX);
      const newHeight = Math.max(300, startSize.height + deltaY);

      containerRef.current.style.width = `${newWidth}px`;
      containerRef.current.style.height = `${newHeight}px`;
    },
    [isResizing, startPos, startSize]
  );

  const handleResizeEnd = React.useCallback(() => {
    if (!isResizing || !containerRef.current) return;
    setIsResizing(false);

    const newWidth = containerRef.current.offsetWidth;
    const newHeight = containerRef.current.offsetHeight;

    onResize(id, newWidth, newHeight);
  }, [isResizing, id, onResize]);

  useEffect(() => {
    if (isResizing) {
      document.addEventListener("mousemove", handleResizeMove);
      document.addEventListener("mouseup", handleResizeEnd);
      return () => {
        document.removeEventListener("mousemove", handleResizeMove);
        document.removeEventListener("mouseup", handleResizeEnd);
      };
    }
  }, [isResizing, handleResizeMove, handleResizeEnd]);

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      className={`group absolute bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl shadow-sm hover:shadow-lg hover:border-border transition-all duration-300 ease-in-out animate-in fade-in slide-in-from-bottom-4 ${
        isSelected ? "ring-2 ring-primary ring-offset-2" : ""
      }`}
      style={{
        width: `${size.width}px`,
        height: `${size.height}px`,
        left: `${position.x}px`,
        top: `${position.y}px`,
        transition: isResizing
          ? "none"
          : "width 0.3s ease-in-out, height 0.3s ease-in-out",
        zIndex: isDragging ? 100 : undefined,
        cursor: isDragging ? "grabbing" : "default",
      }}
    >
      {/* Draggable Header */}
      <div
        className="absolute left-0 top-0 w-full h-10 rounded-t-2xl bg-card/80 cursor-move flex items-center px-4"
        style={{ zIndex: 2 }}
        onMouseDown={handleDragStart}
      >
        <span className="text-xs text-muted-foreground flex-1">
          Widget: {id}
        </span>
        <button
          onClick={() => onRemove(id)}
          className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-destructive/10 rounded-lg"
          aria-label="Remove widget"
        >
          <X className="w-4 h-4 text-destructive" />
        </button>
      </div>
      {/* Widget Content */}
      <div className="pt-10">
        <WidgetRenderer type={type} />
      </div>

      <div
        onMouseDown={handleResizeStart}
        className={`absolute bottom-0 right-0 w-6 h-6 cursor-se-resize opacity-0 group-hover:opacity-100 transition-opacity ${
          isResizing ? "opacity-100" : ""
        }`}
        style={{
          background: isResizing
            ? "linear-gradient(135deg, transparent 50%, rgb(99, 102, 241) 50%)"
            : "linear-gradient(135deg, transparent 50%, rgb(59, 130, 246) 50%)",
          borderBottomRightRadius: "1rem",
          transition: "background 0.2s ease-in-out",
        }}
        title="Drag to resize"
      />
    </div>
  );
}
