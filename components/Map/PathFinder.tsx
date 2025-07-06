"use client"

import { useState } from "react"
import { BUILDINGS } from "@/lib/constants"
import { findShortestPath } from "@/lib/graph"
import CampusSVG from "./CampusSVG"

export default function PathFinder() {
  const [startBuilding, setStartBuilding] = useState<string | null>(null)
  const [endBuilding, setEndBuilding] = useState<string | null>(null)
  const [path, setPath] = useState<string[] | null>(null)
  const [selectionMode, setSelectionMode] = useState<"start" | "end">("start")

  const handleBuildingClick = (buildingId: string) => {
    if (selectionMode === "start") {
      setStartBuilding(buildingId)
      setSelectionMode("end")
      setPath(null)
    } else {
      setEndBuilding(buildingId)

      // Find path between buildings
      if (startBuilding) {
        const newPath = findShortestPath(startBuilding, buildingId)
        setPath(newPath)
      }
    }
  }

  const resetSelection = () => {
    setStartBuilding(null)
    setEndBuilding(null)
    setPath(null)
    setSelectionMode("start")
  }

  const switchSelectionMode = (mode: "start" | "end") => {
    setSelectionMode(mode)
    if (mode === "start") {
      setStartBuilding(null)
    } else {
      setEndBuilding(null)
    }
    setPath(null)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-4 h-4 rounded-full bg-green-400`}></div>
            <span className="text-sm font-medium">Start Building:</span>
            <span className="text-sm">
              {startBuilding ? BUILDINGS.find((b) => b.id === startBuilding)?.name : "Not selected"}
            </span>
            <button
              onClick={() => switchSelectionMode("start")}
              className={`ml-auto px-2 py-1 text-xs rounded ${
                selectionMode === "start"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              }`}
            >
              Select Start
            </button>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-4 h-4 rounded-full bg-red-400`}></div>
            <span className="text-sm font-medium">End Building:</span>
            <span className="text-sm">
              {endBuilding ? BUILDINGS.find((b) => b.id === endBuilding)?.name : "Not selected"}
            </span>
            <button
              onClick={() => switchSelectionMode("end")}
              className={`ml-auto px-2 py-1 text-xs rounded ${
                selectionMode === "end"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              }`}
            >
              Select End
            </button>
          </div>
        </div>

        <button
          onClick={resetSelection}
          className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          Reset
        </button>
      </div>

      <div className="flex-1 min-h-[400px]">
        <CampusSVG
          startBuilding={startBuilding}
          endBuilding={endBuilding}
          path={path}
          onBuildingClick={handleBuildingClick}
        />
      </div>

      {path && (
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-md">
          <h3 className="font-medium mb-1">Path Found:</h3>
          <p className="text-sm">
            {path.map((buildingId, index) => {
              const building = BUILDINGS.find((b) => b.id === buildingId)
              return (
                <span key={buildingId}>
                  {building?.name}
                  {index < path.length - 1 ? " → " : ""}
                </span>
              )
            })}
          </p>
        </div>
      )}
    </div>
  )
}
