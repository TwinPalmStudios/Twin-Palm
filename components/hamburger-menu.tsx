"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

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

  const menuItems = ["Home", "Movies", "Contact", "News", "Shop", "About"]

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
        className={`fixed inset-0 z-50 transition-all duration-1000 ease-out ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div
          className={`absolute inset-0 transition-all duration-1000 ease-out ${
            isOpen ? "hamburger-blur-open" : "hamburger-blur-closed"
          }`}
        />

        <div
          className={`absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/85 transition-all duration-1000 ease-out ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Menu Content */}
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <nav className="text-center">
            <ul className="space-y-6">
              {menuItems.map((item, index) => (
                <li key={item}>
                  <a
                    href="#"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className={`block text-2xl md:text-3xl font-light transition-all duration-700 ease-out hover:scale-110 ${
                      isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    } ${hoveredIndex !== null && hoveredIndex !== index ? "text-white/30 blur-sm" : "text-white"}`}
                    style={{
                      transitionDelay: isOpen ? `${index * 100}ms` : "0ms",
                      fontFamily: "inherit",
                    }}
                  >
                    {item}
                  </a>
                  {index < menuItems.length - 1 && (
                    <div
                      className={`w-1.5 h-1.5 bg-white rounded-full mx-auto mt-4 transition-all duration-700 ease-out ${
                        isOpen ? "opacity-100 scale-100" : "opacity-0 scale-0"
                      } ${hoveredIndex !== null && hoveredIndex !== index ? "opacity-30 blur-sm" : "opacity-100"}`}
                      style={{
                        transitionDelay: isOpen ? `${index * 100 + 50}ms` : "0ms",
                      }}
                    />
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  )
}
