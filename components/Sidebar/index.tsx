"use client"

import { useState, useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { ChevronRight, ChevronLeft } from "lucide-react"
import { NAV_ITEMS, SIDEBAR_WIDTH, SIDEBAR_COLLAPSED_WIDTH, TRANSITION_DURATION } from "@/lib/constants"
import NavItem from "./NavItem"
import ThemeToggle from "../Theme/Toggle"

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const viewParam = searchParams.get("view")

  // Check if mobile on mount and add resize listener
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Check if localStorage has a saved preference
    const savedState = localStorage.getItem("sidebarExpanded")
    if (savedState !== null) {
      setIsExpanded(savedState === "true")
    }

    // Check if view param is set
    if (viewParam === "expanded") {
      setIsExpanded(true)
    } else if (viewParam === "collapsed") {
      setIsExpanded(false)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [viewParam])

  // Save sidebar state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("sidebarExpanded", isExpanded.toString())
  }, [isExpanded])

  // Close sidebar on navigation on mobile
  useEffect(() => {
    if (isMobile && isExpanded) {
      setIsExpanded(false)
    }
  }, [pathname, isMobile])

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <>
      {/* Overlay for mobile when sidebar is expanded */}
      {isMobile && isExpanded && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-10" onClick={() => setIsExpanded(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:relative z-20 h-full bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out ${
          isExpanded ? `w-[${SIDEBAR_WIDTH}px]` : `w-[${SIDEBAR_COLLAPSED_WIDTH}px]`
        }`}
        style={{
          width: isExpanded ? `${SIDEBAR_WIDTH}px` : `${SIDEBAR_COLLAPSED_WIDTH}px`,
          transition: `width ${TRANSITION_DURATION}ms ease-in-out`,
          transform: isMobile && !isExpanded ? `translateX(-${SIDEBAR_COLLAPSED_WIDTH}px)` : "translateX(0)",
        }}
      >
        <div className="flex flex-col h-full">
          {/* Toggle button */}
          <button
            onClick={toggleSidebar}
            className={`absolute top-4 ${
              isExpanded ? "right-4" : "left-0"
            } p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200`}
            aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
          >
            {isExpanded ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>

          {/* Logo/Title - only visible when expanded */}
          {isExpanded && (
            <div className="p-4 mb-4">
              <h1 className="text-xl font-bold">CampusCopilot</h1>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-2">
              {NAV_ITEMS.map((item) => (
                <NavItem key={item.name} item={item} isExpanded={isExpanded} isActive={pathname === item.href} />
              ))}
            </ul>
          </nav>

          {/* Theme toggle at bottom */}
          <div className={`p-4 border-t border-gray-200 dark:border-gray-700 ${!isExpanded && "flex justify-center"}`}>
            <ThemeToggle isExpanded={isExpanded} />
          </div>
        </div>
      </aside>
    </>
  )
}
