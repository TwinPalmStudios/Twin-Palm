// app/404.tsx  (with mouse glow)
"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMove)
    return () => window.removeEventListener("mousemove", handleMove)
  }, [])

  return (
    <>
      {/* Mouse glow layer – same as your MouseMoveEffect */}
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(800px at ${mousePos.x}px ${mousePos.y}px, rgba(29, 78, 216, 0.12), transparent 80%)`,
        }}
      />

      <div className="min-h-screen flex flex-col relative z-10">
        <div className="flex-1 flex items-center justify-center py-16 px-6">
          <div className="text-center space-y-8 max-w-lg">
            <h1 className="text-8xl sm:text-9xl font-bold tracking-tighter bg-gradient-to-br from-foreground via-foreground/90 to-foreground/60 bg-clip-text text-transparent">
              404
            </h1>

            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
                Page Not Found
              </h2>
              <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed max-w-prose mx-auto">
                Looks like this scene ended up on the cutting room floor.
              </p>
            </div>

            <div className="flex justify-center pt-8">
              <Button
                asChild
                size="lg"
                className="group bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 px-10 py-7 text-lg rounded-lg"
              >
                <Link href="/">
                  <ArrowLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
                  Return to Twin Palm
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}