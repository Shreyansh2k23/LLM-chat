"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { BUILDINGS } from "@/lib/constants"

interface CampusSVGProps {
  startBuilding: string | null
  endBuilding: string | null
  path: string[] | null
  onBuildingClick: (buildingId: string) => void
}

export default function CampusSVG({ startBuilding, endBuilding, path, onBuildingClick }: CampusSVGProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [transform, setTransform] = useState({ scale: 1, x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  // Handle zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? -0.1 : 0.1
    const newScale = Math.max(0.5, Math.min(2, transform.scale + delta))

    setTransform((prev) => ({
      ...prev,
      scale: newScale,
    }))
  }

  // Handle drag start
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return // Only left mouse button

    setIsDragging(true)
    setDragStart({
      x: e.clientX - transform.x,
      y: e.clientY - transform.y,
    })
  }

  // Handle drag move
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return

    setTransform((prev) => ({
      ...prev,
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    }))
  }

  // Handle drag end
  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Handle touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return

    setIsDragging(true)
    setDragStart({
      x: e.touches[0].clientX - transform.x,
      y: e.touches[0].clientY - transform.y,
    })
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return

    setTransform((prev) => ({
      ...prev,
      x: e.touches[0].clientX - dragStart.x,
      y: e.touches[0].clientY - dragStart.y,
    }))
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  // Clean up event listeners
  useEffect(() => {
    const handleMouseUpGlobal = () => {
      setIsDragging(false)
    }

    window.addEventListener("mouseup", handleMouseUpGlobal)
    return () => {
      window.removeEventListener("mouseup", handleMouseUpGlobal)
    }
  }, [])

  // Generate path lines if path exists
  const renderPath = () => {
    if (!path || path.length < 2) return null

    const pathElements = []

    for (let i = 0; i < path.length - 1; i++) {
      const startId = path[i]
      const endId = path[i + 1]

      const startBuilding = BUILDINGS.find((b) => b.id === startId)
      const endBuilding = BUILDINGS.find((b) => b.id === endId)

      if (startBuilding && endBuilding) {
        const x1 = startBuilding.x + startBuilding.width / 2
        const y1 = startBuilding.y + startBuilding.height / 2
        const x2 = endBuilding.x + endBuilding.width / 2
        const y2 = endBuilding.y + endBuilding.height / 2

        pathElements.push(<line key={`path-${startId}-${endId}`} x1={x1} y1={y1} x2={x2} y2={y2} className="path" />)
      }
    }

    return pathElements
  }

  return (
    <div
      className="map-container w-full h-full min-h-[400px] border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-900"
      onWheel={handleWheel}
    >
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox="0 0 500 500"
        className="map-svg"
        style={{
          transform: `scale(${transform.scale}) translate(${transform.x}px, ${transform.y}px)`,
          cursor: isDragging ? "grabbing" : "grab",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Grid lines */}
        {Array.from({ length: 10 }).map((_, i) => (
          <line
            key={`h-${i}`}
            x1="0"
            y1={i * 50}
            x2="500"
            y2={i * 50}
            stroke="rgba(156, 163, 175, 0.2)"
            strokeWidth="1"
          />
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <line
            key={`v-${i}`}
            x1={i * 50}
            y1="0"
            x2={i * 50}
            y2="500"
            stroke="rgba(156, 163, 175, 0.2)"
            strokeWidth="1"
          />
        ))}

        {/* Path between buildings */}
        {renderPath()}

        {/* Buildings */}
        {BUILDINGS.map((building) => (
          <g key={building.id}>
            <rect
              x={building.x}
              y={building.y}
              width={building.width}
              height={building.height}
              className={`building ${startBuilding === building.id || endBuilding === building.id ? "selected" : ""}`}
              fill={startBuilding === building.id ? "#4ade80" : endBuilding === building.id ? "#f87171" : "#9ca3af"}
              stroke="#1f2937"
              strokeWidth="2"
              rx="4"
              onClick={() => onBuildingClick(building.id)}
            />
            <text
              x={building.x + building.width / 2}
              y={building.y + building.height / 2}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
              fontSize="10"
              fontWeight="bold"
              pointerEvents="none"
            >
              {building.name}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}
