"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Toaster } from "@/components/ui/sonner"
import { 
  FileTextIcon, 
  FileSpreadsheetIcon, 
  FileTextSearchIcon,
  FileInput,
  Settings2,
  FolderIcon
} from "lucide-react"

export default function FeatureLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  
  const navItems = [
    {
      href: "/feature/invoice",
      icon: <FileSpreadsheetIcon className="h-5 w-5" />,
      label: "Invoice Management"
    },
    {
      href: "/feature/timesheet",
      icon: <FileTextIcon className="h-5 w-5" />,
      label: "Timesheet"
    },
    {
      href: "/feature/pdf-extractor",
      icon: <FileTextSearchIcon className="h-5 w-5" />,
      label: "PDF Extractor"
    },
    {
      href: "/feature/report-generator",
      icon: <FileInput className="h-5 w-5" />,
      label: "Report Generator"
    },
    {
      href: "/feature/document-library",
      icon: <FolderIcon className="h-5 w-5" />,
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
              <Settings2 className="h-6 w-6" />
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
                  {item.icon}
                  <span className="ml-2">{item.label}</span>
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