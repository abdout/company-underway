"use client"

import * as React from "react"
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"

import { MainNavItem } from "./type"
import { siteConfig } from "./constant"
import { cn } from "@/lib/utils"
import { Icons } from "./icons"
import { MobileNav } from "./mobile-nav"
import { useCurrentUser } from "@/hooks/use-current-user"

interface MainNavProps {
  items?: MainNavItem[]
  children?: React.ReactNode
}

export function MainNav({ items, children }: MainNavProps) {
  const segment = useSelectedLayoutSegment()
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false)
  const user = useCurrentUser()
  
  // Filter items based on user role
  const filteredItems = items?.filter(item => {
    // If the item doesn't have roleRequired, show it to everyone
    if (!item.roleRequired) return true
    
    // If user is not logged in or has no role, don't show role-restricted items
    if (!user || !user.role) return false
    
    // Check if user role is in the required roles list
    return item.roleRequired.includes(user.role)
  })

  return (
    <>
      <div className="mr-4 hidden md:flex">
        <Link href="/platform" className="mr-4 flex items-center space-x-2 lg:mr-6">
          <Icons.logo className="h-6 w-6" />
          <span className="hidden font-bold lg:inline-block">
            {siteConfig.name}
          </span>
        </Link>
        {filteredItems?.length ? (
          <nav className="flex items-center gap-4 text-sm lg:gap-6">
            {filteredItems?.map((item, index) => (
              <Link
                key={index}
                href={item.disabled ? "#" : item.href}
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  item.href.startsWith(`/${segment}`)
                    ? "text-foreground"
                    : "text-foreground/60",
                  item.disabled && "cursor-not-allowed opacity-80"
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        ) : null}
      </div>
      
      <button
        className="flex items-center space-x-2 md:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        {showMobileMenu ?
          <Icons.close className="h-5 w-5" /> : 
          <Icons.logo className="h-5 w-5" />
        }
        <span className="font-medium text-sm">Menu</span>
      </button>
      {showMobileMenu && filteredItems && (
        <MobileNav items={filteredItems}>{children}</MobileNav>
      )}
    </>
  )
}