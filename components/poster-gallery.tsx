"use client"

import { useMemo, useState, useEffect, useRef } from "react"
import PosterCard from "./poster-card"
import { movies } from "@/lib/movies"
import ColorThief from "colorthief"

export default function PosterGallery() {
  const NUM_FEATURED = 5

  const featuredMovies = useMemo(() => {
    return [...movies]
      .sort((a, b) => {
        const dateA = a.releaseDate ? new Date(a.releaseDate).getTime() : 0
        const dateB = b.releaseDate ? new Date(b.releaseDate).getTime() : 0
        return dateB - dateA
      })
      .slice(0, NUM_FEATURED)
  }, [])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false)
  const [isTabVisible, setIsTabVisible] = useState(true)
  const [hoveredMovie, setHoveredMovie] = useState<string | null>(null)
  const [dragOffset, setDragOffset] = useState(0)
  const dragStartX = useRef(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const [movieHues, setMovieHues] = useState<Record<string, { hue1: number; hue2: number }>>({})

  // RGB → HSL (h in 0–360)
  const rgbToHsl = (r: number, g: number, b: number): { h: number; s: number; l: number } => {
    r /= 255
    g /= 255
    b /= 255
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0
    let s = 0
    const l = (max + min) / 2

    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0)
          break
        case g:
          h = (b - r) / d + 2
          break
        case b:
          h = (r - g) / d + 4
          break
      }
      h /= 6
    }
    return { h: h * 360, s, l }
  }

  // Title-hash fallback
  const getFallbackHues = (title: string) => {
    let hash = 0
    for (let i = 0; i < title.length; i++) {
      hash = title.charCodeAt(i) + ((hash << 5) - hash)
    }
    const hue1 = Math.abs(hash % 360)
    const hue2 = (hue1 + 80) % 360
    return { hue1, hue2 }
  }

  // Extract colors from posters
  useEffect(() => {
    featuredMovies.forEach((movie) => {
      const img = new Image()
      img.src = movie.posterUrl

      img.onload = () => {
        try {
          const colorThief = new ColorThief()
          const palette = colorThief.getPalette(img, 10)

          if (palette && palette.length >= 1) {
            const colorInfos = palette.map(([r, g, b]: [number, number, number]) => {
              const { h, s, l } = rgbToHsl(r, g, b)
              return { h, s, l }
            })

            // Prefer vibrant colors
            let vibrant = colorInfos.filter((c) => c.s > 0.35)

            let hue1: number
            let hue2: number

            if (vibrant.length === 0) {
              hue1 = Math.round(colorInfos[0].h)
              hue2 = (hue1 + 80) % 360
            } else {
              vibrant.sort((a, b) => b.s - a.s)
              hue1 = Math.round(vibrant[0].h)

              if (vibrant.length === 1) {
                hue2 = (hue1 + 90) % 360
              } else {
                let maxDist = 0
                let bestHue = vibrant[1].h
                for (const c of vibrant.slice(1)) {
                  const diff = Math.abs(vibrant[0].h - c.h)
                  const dist = Math.min(diff, 360 - diff)
                  if (dist > maxDist) {
                    maxDist = dist
                    bestHue = c.h
                  }
                }
                hue2 = Math.round(bestHue)
              }
            }

            setMovieHues((prev) => ({
              ...prev,
              [movie.title]: { hue1, hue2 },
            }))
          } else {
            setMovieHues((prev) => ({
              ...prev,
              [movie.title]: getFallbackHues(movie.title),
            }))
          }
        } catch (err) {
          console.error(`Color extraction failed for ${movie.title}:`, err)
          setMovieHues((prev) => ({
            ...prev,
            [movie.title]: getFallbackHues(movie.title),
          }))
        }
      }

      img.onerror = () => {
        console.error(`Failed to load poster: ${movie.posterUrl}`)
        setMovieHues((prev) => ({
          ...prev,
          [movie.title]: getFallbackHues(movie.title),
        }))
      }
    })
  }, [featuredMovies])

  // Current hues
  const currentHues = useMemo(() => {
    let title: string | undefined
    if (hoveredMovie) {
      title = hoveredMovie
    } else {
      const centerMovie = featuredMovies[currentIndex % featuredMovies.length]
      title = centerMovie?.title
    }

    if (title && movieHues[title]) {
      return movieHues[title]
    }
    if (title) {
      return getFallbackHues(title)
    }
    return { hue1: 260, hue2: 340 }
  }, [currentIndex, featuredMovies, hoveredMovie, movieHues])

  // Visibility, keyboard, autoplay, drag – unchanged
  useEffect(() => {
    setIsTabVisible(!document.hidden)
    const handleVisibilityChange = () => setIsTabVisible(!document.hidden)
    document.addEventListener("visibilitychange", handleVisibilityChange)
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault()
        setCurrentIndex((prev) => prev - 1)
      } else if (e.key === "ArrowRight") {
        e.preventDefault()
        setCurrentIndex((prev) => prev + 1)
      } else if (e.key === "Escape") {
        e.preventDefault()
        setIsAutoplayPaused((prev) => !prev)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  useEffect(() => {
    if (isDragging || isHovered || isAutoplayPaused || !isTabVisible) return
    const interval = setInterval(() => setCurrentIndex((prev) => prev + 1), 4000)
    return () => clearInterval(interval)
  }, [featuredMovies.length, isDragging, isHovered, isAutoplayPaused, isTabVisible])

  const handleDragStart = (clientX: number) => {
    setIsDragging(true)
    dragStartX.current = clientX
    setDragOffset(0)
  }

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return
    const offset = clientX - dragStartX.current
    setDragOffset(offset)
  }

  const handleDragEnd = () => {
    if (!isDragging) return
    setIsDragging(false)
    if (dragOffset > 100) setCurrentIndex((prev) => prev - 1)
    else if (dragOffset < -100) setCurrentIndex((prev) => prev + 1)
    setDragOffset(0)
  }

  if (featuredMovies.length === 0) return null

  const visibleRange = Array.from({ length: 7 }, (_, i) => currentIndex + i - 3)

  return (
    <>
      {/* Dynamic background – flipped direction (315deg = 135deg + 180deg) to reverse color sides */}
      <div
        className="fixed inset-0 -z-10 transition-all duration-[1200ms] ease-in-out"
        style={{
          background: `linear-gradient(315deg, hsl(var(--hue1), 95%, 12%), hsl(var(--hue2), 85%, 18%))`,
          "--hue1": currentHues.hue1,
          "--hue2": currentHues.hue2,
        } as any}
      />
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-background/60 via-background/40 to-background pointer-events-none" />

      <section className="relative w-full py-16 overflow-hidden">
        <div className="container px-4 md:px-6 relative z-10">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Featured Films</h2>
            <p className="mt-4 text-lg text-muted-foreground">Our latest and upcoming cinematic works</p>
          </div>

          <div
            ref={containerRef}
            className="relative flex items-center justify-center h-[420px] md:h-[520px] cursor-grab active:cursor-grabbing select-none"
            style={{ perspective: "1000px" }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseDown={(e) => handleDragStart(e.clientX)}
            onMouseMove={(e) => handleDragMove(e.clientX)}
            onMouseUp={handleDragEnd}
            onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
            onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
            onTouchEnd={handleDragEnd}
          >
            <div className="relative w-full max-w-6xl h-full flex items-center justify-center">
              {visibleRange.map((absoluteIndex) => {
                const movieIndex =
                  ((absoluteIndex % featuredMovies.length) + featuredMovies.length) % featuredMovies.length
                const movie = featuredMovies[movieIndex]
                const position = absoluteIndex - currentIndex
                const isVisible = position >= -1 && position <= 1

                const getWidth = () => (position === 0 ? "w-60 md:w-72" : "w-56 md:w-64")

                const getRotation = () => {
                  if (position === 0) return 0
                  if (position === -1) return 12
                  if (position === 1) return -12
                  return 0
                }

                const getTransform = () => {
                  const dragAdjustment = isDragging ? dragOffset * 0.5 : 0
                  if (position === 0) return `translateX(${dragAdjustment}px)`
                  if (position === -1) return `translateX(calc(-120% + ${dragAdjustment}px))`
                  if (position === 1) return `translateX(calc(120% + ${dragAdjustment}px))`
                  if (position < -1) return `translateX(calc(-200% + ${dragAdjustment}px))`
                  return `translateX(calc(200% + ${dragAdjustment}px))`
                }

                return (
                  <div
                    key={absoluteIndex}
                    className={`absolute ${getWidth()} transition-all ${isDragging ? "duration-0" : "duration-700 ease-out"}`}
                    style={{
                      transform: getTransform(),
                      transformStyle: "preserve-3d",
                      opacity: isVisible ? 1 : 0,
                      zIndex: position === 0 ? 20 : 10 - Math.abs(position),
                      pointerEvents: isVisible ? "auto" : "none",
                    }}
                    onMouseEnter={() => setHoveredMovie(movie.title)}
                    onMouseLeave={() => setHoveredMovie(null)}
                  >
                    <PosterCard {...movie} initialRotateY={getRotation()} isCenter={position === 0} />
                  </div>
                )
              })}
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {featuredMovies.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  const currentMod = currentIndex % featuredMovies.length
                  const diff = (index - currentMod + featuredMovies.length) % featuredMovies.length
                  setCurrentIndex((prev) => prev + diff)
                }}
                className={`h-2 rounded-full transition-all duration-500 ease-out ${
                  index === currentIndex % featuredMovies.length
                    ? "bg-primary w-8"
                    : "bg-muted-foreground/30 w-2 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <div className="text-center mt-6">
            <a href="/movies" className="text-primary hover:underline text-lg">
              View All Films →
            </a>
          </div>

          <div className="mt-6 text-center text-xs text-muted-foreground/40">
            <span>← → to navigate • ESC to {isAutoplayPaused ? "play" : "pause"}</span>
          </div>
        </div>
      </section>
    </>
  )
}
