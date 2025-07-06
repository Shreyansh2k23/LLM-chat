"use client"

import type React from "react"

import Link from "next/link"

interface NavItemProps {
  item: {
    name: string
    href: string
    icon: React.ElementType
  }
  isExpanded: boolean
  isActive: boolean
}

export default function NavItem({ item, isExpanded, isActive }: NavItemProps) {
  const { name, href, icon: Icon } = item

  return (
    <li>
      <Link
        href={href}
        className={`flex items-center px-4 py-2 ${isExpanded ? "justify-start" : "justify-center"} ${
          isActive
            ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
            : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
        } rounded-md transition-all duration-200`}
        title={!isExpanded ? name : undefined}
      >
        <Icon className="h-5 w-5" />
        {isExpanded && <span className="ml-3">{name}</span>}
      </Link>
    </li>
  )
}
