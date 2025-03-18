"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Toaster } from "@/components/ui/sonner"

export default function FeatureLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  
  const navItems = [
    {
      href: "/feature/invoice",
      label: "Invoice Management"
    },
    {
      href: "/feature/timesheet",
      label: "Timesheet"
    },
    {
      href: "/feature/pdf-extractor",
      label: "PDF Extractor"
    },
    {
      href: "/feature/report-generator",
      label: "Report Generator"
    },
    {
      href: "/feature/document-library",
      label: "Document Library"
    }
  ]
  
  return (
    <div className="flex min-h-screen flex-col">
      {/* Top navigation */}
      <header className="sticky top-0 z-30 border-b bg-background">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="font-bold">Features</span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center ${
                    pathname === item.href || pathname.startsWith(item.href)
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-1">
        {children}
      </main>
      
      <Toaster />
    </div>
  )
} 