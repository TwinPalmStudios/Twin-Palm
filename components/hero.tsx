"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useRef } from "react"

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
          }
        })
      },
      { threshold: 0.1 },
    )

    if (heroRef.current) {
      observer.observe(heroRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (pages: number) => {
    const viewportHeight = window.innerHeight
    const targetY = viewportHeight * pages
    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    })
  }

  return (
    <section
      ref={heroRef}
      className="container flex min-h-[calc(100vh-3.5rem)] max-w-screen-2xl flex-col items-center justify-center space-y-8 py-24 text-center md:py-32 opacity-0 translate-y-8 transition-all duration-1000"
    >
      <div className="space-y-4">
        <h1 className="bg-gradient-to-br from-foreground from-30% via-foreground/90 to-foreground/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
          Twin Palm Studios
        </h1>
        <p className="mx-auto max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          A new era of cinema
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
        {/* Primary CTA: narrower */}
        <Button
          size="lg"
          onClick={() => scrollToSection(1)}
          className="
            bg-primary text-primary-foreground border border-primary
            hover:bg-transparent hover:text-primary hover:border-primary/60
            hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.4)]
            hover:brightness-110
            transition-all duration-300 ease-out
            font-semibold
            rounded-md px-6 py-5 min-w-[160px]
          "
        >
          Explore Movies
        </Button>

        {/* Secondary: narrower */}
        <Button
          variant="outline"
          size="lg"
          onClick={() => scrollToSection(2)}
          className="
            border border-primary/60 text-primary bg-transparent
            hover:bg-primary hover:text-primary-foreground hover:border-primary
            hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.4)]
            hover:brightness-110
            transition-all duration-300 ease-out
            font-medium
            rounded-md px-6 py-5 min-w-[160px]
          "
        >
          Placeholder Text
        </Button>
      </div>
    </section>
  )
}