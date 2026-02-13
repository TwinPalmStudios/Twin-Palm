"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
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
      <div className="flex gap-4">
        <Button size="lg" onClick={() => scrollToSection(1)} className="btn-hover cinematic-glow">
          Explore Movies
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() => scrollToSection(2)}
          className="btn-hover"
          data-variant="outline"
        >
          Placeholder Text
        </Button>
      </div>
    </section>
  )
}
