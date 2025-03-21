"use client"

import React from "react"
import Link from "next/link"
import { Toaster } from "@/components/ui/sonner"

export default function MVPTrackerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Top navigation */}
      <header className="sticky top-0 z-30 border-b bg-background">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="font-bold">MVP Tracker</span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link 
                href="/feature" 
                className="text-muted-foreground hover:text-foreground"
              >
                <span>Back to Features</span>
              </Link>
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