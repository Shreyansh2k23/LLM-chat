"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { BUILDINGS } from "@/lib/constants"
import PathFinder from "@/components/Map/PathFinder"

export default function MapPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredBuildings = BUILDINGS.filter((building) =>
    building.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="container mx-auto p-4 h-full">
      <h1 className="text-2xl font-bold mb-6">Campus Map</h1>

      <div className="flex flex-col md:flex-row gap-4 h-[calc(100vh-150px)]">
        <div className="md:w-1/4 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
          <div className="relative mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search buildings..."
              className="w-full p-2 pl-8 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800"
            />
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          </div>

          <h2 className="text-lg font-semibold mb-2">Buildings</h2>
          <div className="overflow-y-auto max-h-[calc(100vh-300px)]">
            <ul className="space-y-2">
              {filteredBuildings.map((building) => (
                <li key={building.id}>
                  <button className="w-full text-left p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    {building.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-md">
            <h3 className="font-medium text-sm mb-1">How to use:</h3>
            <ol className="text-xs space-y-1 text-gray-700 dark:text-gray-300">
              <li>1. Click "Select Start" and choose a building</li>
              <li>2. Click "Select End" and choose destination</li>
              <li>3. View the shortest path between buildings</li>
              <li>4. Use mouse wheel to zoom and drag to pan</li>
            </ol>
          </div>
        </div>

        <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 overflow-auto">
          <PathFinder />
        </div>
      </div>
    </div>
  )
}
