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
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">Twin Palm</span>
          </Link>
          <nav className="flex flex-1 items-center space-x-6 text-sm font-medium">
            <Link href="#" className="link-hover transition-colors hover:text-primary">
              Placeholder Text
            </Link>
            <Link href="#" className="link-hover transition-colors hover:text-primary">
              Placeholder Text
            </Link>
            <Link href="#" className="link-hover transition-colors hover:text-primary">
              Placeholder Text
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="btn-hover" data-variant="ghost">
              Placeholder Text
            </Button>
            <Button size="sm" className="btn-hover">
              Placeholder Text
            </Button>
          </div>
        </div>
      </header>
    </>
  )
}
