"use client"

import { useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

interface Topic {
  topic: string
  probability: number
}

interface ProbabilityChartProps {
  topics: Topic[]
  chartType?: "bar" | "pie"
}

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#6366f1"]

export default function ProbabilityChart({ topics, chartType = "bar" }: ProbabilityChartProps) {
  const [selectedChart, setSelectedChart] = useState<"bar" | "pie">(chartType)

  const renderBarChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={topics} margin={{ top: 20, right: 30, left: 20, bottom: 70 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="topic" angle={-45} textAnchor="end" height={70} tick={{ fontSize: 12 }} />
        <YAxis label={{ value: "Probability (%)", angle: -90, position: "insideLeft" }} domain={[0, 100]} />
        <Tooltip formatter={(value) => [`${value}%`, "Probability"]} />
        <Legend />
        <Bar dataKey="probability" fill="#3b82f6" name="Probability (%)" />
      </BarChart>
    </ResponsiveContainer>
  )

  const renderPieChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={topics}
          cx="50%"
          cy="50%"
          labelLine={true}
          label={({ topic, probability }) => `${topic}: ${probability}%`}
          outerRadius={100}
          fill="#8884d8"
          dataKey="probability"
          nameKey="topic"
        >
          {topics.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [`${value}%`, "Probability"]} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )

  return (
    <div className="w-full">
      <div className="flex justify-end mb-4">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            onClick={() => setSelectedChart("bar")}
            className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
              selectedChart === "bar"
                ? "bg-blue-500 text-white"
                : "bg-white dark:bg-gray-700 text-gray-700 dark:text-white"
            }`}
          >
            Bar Chart
          </button>
          <button
            type="button"
            onClick={() => setSelectedChart("pie")}
            className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
              selectedChart === "pie"
                ? "bg-blue-500 text-white"
                : "bg-white dark:bg-gray-700 text-gray-700 dark:text-white"
            }`}
          >
            Pie Chart
          </button>
        </div>
      </div>

      {selectedChart === "bar" ? renderBarChart() : renderPieChart()}
    </div>
  )
}
