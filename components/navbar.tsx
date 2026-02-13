"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import HamburgerMenu from "./hamburger-menu"

export default function Navbar() {
  const scrollToSection = (pages: number) => {
    const viewportHeight = window.innerHeight
    const targetY = viewportHeight * pages
    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    })
  }

  return (
    <>
      <HamburgerMenu />

      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-14 w-full max-w-screen-2xl items-center px-4 sm:px-6 lg:px-8">

          {/* Left: Logo – pinned left */}
          <Link href="/" className="flex items-center space-x-2 font-bold text-lg shrink-0">
            Twin Palm
          </Link>

          {/* Center area – centered with small right nudge */}
          <div className="hidden md:flex flex-1 justify-center items-center">
            <nav className="flex items-center gap-x-6 translate-x-8 md:translate-x-12 lg:translate-x-16">
              <Link 
                href="#" 
                className="
                  inline-flex items-center justify-center 
                  px-4 py-2 text-sm font-medium 
                  text-foreground 
                  border border-border/60 rounded-md 
                  transition-all duration-300 ease-out
                  hover:border-primary hover:bg-primary/10 hover:text-primary
                  hover:scale-105 hover:shadow-sm
                  active:scale-95
                  focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2
                "
              >
                Movies
              </Link>
              <Link 
                href="#" 
                className="
                  inline-flex items-center justify-center 
                  px-4 py-2 text-sm font-medium 
                  text-foreground 
                  border border-border/60 rounded-md 
                  transition-all duration-300 ease-out
                  hover:border-primary hover:bg-primary/10 hover:text-primary
                  hover:scale-105 hover:shadow-sm
                  active:scale-95
                  focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2
                "
              >
                News
              </Link>
              <Link 
                href="#" 
                className="
                  inline-flex items-center justify-center 
                  px-4 py-2 text-sm font-medium 
                  text-foreground 
                  border border-border/60 rounded-md 
                  transition-all duration-300 ease-out
                  hover:border-primary hover:bg-primary/10 hover:text-primary
                  hover:scale-105 hover:shadow-sm
                  active:scale-95
                  focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2
                "
              >
                About
              </Link>
              <Link 
                href="#" 
                className="
                  inline-flex items-center justify-center 
                  px-4 py-2 text-sm font-medium 
                  text-foreground 
                  border border-border/60 rounded-md 
                  transition-all duration-300 ease-out
                  hover:border-primary hover:bg-primary/10 hover:text-primary
                  hover:scale-105 hover:shadow-sm
                  active:scale-95
                  focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2
                "
              >
                Shop
              </Link>
            </nav>
          </div>

          {/* Right: Actions – color swap on hover, no scale/shadow lift */}
          <div className="flex items-center gap-x-4 shrink-0">
            {/* Contact – subtle → solid on hover, no jump */}
            <Button 
              variant="outline" 
              size="sm" 
              className="
                hidden sm:inline-flex 
                border-primary/60 text-primary 
                bg-transparent
                hover:bg-primary hover:text-primary-foreground hover:border-primary
                transition-all duration-300 font-medium
                rounded-md px-5 py-2 shadow-sm
              "
            >
              Contact
            </Button>

            {/* Get Updates – solid → subtle on hover, no expand */}
            <Button 
              size="sm" 
              className="
                bg-primary text-primary-foreground border border-primary
                hover:bg-transparent hover:text-primary hover:border-primary/60
                transition-all duration-300 font-semibold
                rounded-md px-5 py-2 shadow-md
              "
            >
              Get Updates
            </Button>
          </div>

        </div>
      </header>
    </>
  )
}