"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Sun, Moon } from "lucide-react"

interface ThemeToggleProps {
  isExpanded: boolean
}

export default function ThemeToggle({ isExpanded }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <button
      onClick={toggleTheme}
      className={`flex items-center ${
        isExpanded ? "justify-start w-full" : "justify-center"
      } p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors`}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <>
          <Sun className="h-5 w-5" />
          {isExpanded && <span className="ml-2">Light Mode</span>}
        </>
      ) : (
        <>
          <Moon className="h-5 w-5" />
          {isExpanded && <span className="ml-2">Dark Mode</span>}
        </>
      )}
    </button>
  )
}
