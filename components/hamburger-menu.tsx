"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Movies", path: "/movies" },
    { label: "Contact", path: "/contact" },
    { label: "News", path: "/news" },
    { label: "Shop", path: "/shop" },
    { label: "About", path: "/about" },
  ]

  return (
    <>
      {/* Hamburger Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-16 left-4 z-[60] p-2 rounded-lg bg-background/80 backdrop-blur-sm border border-border/40 hover:bg-background/90 transition-all duration-300"
      >
        <div className="w-5 h-5 flex flex-col justify-center items-center">
          <span
            className={`block w-4 h-0.5 bg-foreground transition-all duration-300 ${
              isOpen ? "rotate-45 translate-y-0.5" : "-translate-y-1"
            }`}
          />
          <span
            className={`block w-4 h-0.5 bg-foreground transition-all duration-300 ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block w-4 h-0.5 bg-foreground transition-all duration-300 ${
              isOpen ? "-rotate-45 -translate-y-0.5" : "translate-y-1"
            }`}
          />
        </div>
      </Button>

      {/* Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-50 transition-all duration-500 ease-out",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        )}
      >
        {/* Background - matches navbar blur + subtle tint for cinematic depth */}
        <div className="absolute inset-0 bg-background/95 backdrop-blur-xl" />

        {/* Content */}
        <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
          <nav className="w-full max-w-2xl">
            <ul className="space-y-8">
              {menuItems.map((item, index) => (
                <li
                  key={item.label}
                  className={cn(
                    "opacity-0 translate-y-8 transition-all duration-700 ease-out",
                    isOpen && "opacity-100 translate-y-0"
                  )}
                  style={{
                    transitionDelay: isOpen ? `${index * 80 + 150}ms` : "0ms",
                  }}
                >
                  <Link
                    href={item.path}
                    onClick={() => setIsOpen(false)}
                    className="block"
                  >
                    <div
                      className={cn(
                        // Exact same base style as desktop navbar links
                        "inline-flex items-center justify-center",
                        "px-8 py-6 text-lg md:text-2xl font-medium tracking-wider",
                        "text-foreground",
                        "border border-border/60 rounded-2xl",
                        "transition-all duration-300 ease-out",
                        "hover:border-primary hover:bg-primary/10 hover:text-primary",
                        "hover:scale-105 hover:shadow-lg",
                        "active:scale-95",
                        "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2",
                        // Full-width centered block for mobile menu
                        "w-full"
                      )}
                    >
                      {item.label}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  )
}