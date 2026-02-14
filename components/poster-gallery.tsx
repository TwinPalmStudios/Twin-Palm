"use client"

import { useMemo, useState, useEffect, useRef } from "react"
import PosterCard from "./poster-card"
import { movies } from "@/lib/movies"

export default function PosterGallery() {
  // CONFIGURE THIS: Change to 3, 5, 10, or movies.length for all movies
  const NUM_FEATURED = 5 // <-- Change this number!

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
  const [dragOffset, setDragOffset] = useState(0)
  const dragStartX = useRef(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        setCurrentIndex((prev) => prev - 1)
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        setCurrentIndex((prev) => prev + 1)
      } else if (e.key === 'Escape') {
        e.preventDefault()
        setIsAutoplayPaused((prev) => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Auto-rotation
  useEffect(() => {
    if (isDragging || isHovered || isAutoplayPaused) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1)
    }, 4000)

    return () => clearInterval(interval)
  }, [featuredMovies.length, isDragging, isHovered, isAutoplayPaused])

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

    // Threshold for switching (100px drag = switch)
    if (dragOffset > 100) {
      // Dragged right, go to previous
      setCurrentIndex((prev) => prev - 1)
    } else if (dragOffset < -100) {
      // Dragged left, go to next
      setCurrentIndex((prev) => prev + 1)
    }

    setDragOffset(0)
  }

  if (featuredMovies.length === 0) {
    return null
  }

  // Create a large extended array for infinite scrolling
  const extendedMovies = Array.from({ length: featuredMovies.length * 20 }, (_, i) => 
    featuredMovies[i % featuredMovies.length]
  )

  return (
    <section className="relative w-full py-16 overflow-hidden bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Featured Films</h2>
          <p className="mt-4 text-lg text-muted-foreground">Our latest and upcoming cinematic works</p>
        </div>

        {/* Carousel Container */}
        <div 
          ref={containerRef}
          className="relative flex items-center justify-center h-[420px] md:h-[520px] cursor-grab active:cursor-grabbing select-none" 
          style={{ perspective: '1000px' }}
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
            {extendedMovies.map((movie, index) => {
              // Calculate position relative to current center
              const position = index - (currentIndex + featuredMovies.length * 10)
              
              // Determine if this card should be visible
              const isVisible = position >= -1 && position <= 1
              
              // Get width based on position
              const getWidth = () => {
                return position === 0 ? 'w-60 md:w-72' : 'w-56 md:w-64'
              }
              
              // Get rotation for PosterCard
              const getRotation = () => {
                if (position === 0) return 0
                if (position === -1) return 12
                if (position === 1) return -12
                return 0
              }
              
              // Calculate transform - position with drag offset
              const getTransform = () => {
                const dragAdjustment = isDragging ? dragOffset * 0.5 : 0
                
                if (position === 0) {
                  return `translateX(${dragAdjustment}px)`
                } else if (position === -1) {
                  return `translateX(calc(-120% + ${dragAdjustment}px))`
                } else if (position === 1) {
                  return `translateX(calc(120% + ${dragAdjustment}px))`
                } else if (position < -1) {
                  return `translateX(calc(-200% + ${dragAdjustment}px))`
                } else {
                  return `translateX(calc(200% + ${dragAdjustment}px))`
                }
              }

              return (
                <div
                  key={`${movie.title}-${index}`}
                  className={`absolute ${getWidth()} transition-all ${isDragging ? 'duration-0' : 'duration-700 ease-out'}`}
                  style={{
                    transform: getTransform(),
                    transformStyle: 'preserve-3d',
                    opacity: isVisible ? 1 : 0,
                    zIndex: position === 0 ? 20 : 10 - Math.abs(position),
                    pointerEvents: isVisible ? 'auto' : 'none',
                  }}
                >
                  <PosterCard
                    {...movie}
                    initialRotateY={getRotation()}
                    isCenter={position === 0}
                  />
                </div>
              )
            })}
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {featuredMovies.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex((prev) => {
                // Jump to this index while maintaining forward direction
                const currentMod = prev % featuredMovies.length
                const diff = (index - currentMod + featuredMovies.length) % featuredMovies.length
                return prev + diff
              })}
              className={`h-2 rounded-full transition-all duration-500 ease-out ${
                index === currentIndex % featuredMovies.length
                  ? 'bg-primary w-8'
                  : 'bg-muted-foreground/30 w-2 hover:bg-muted-foreground/50'
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
      </div>
    </section>
  )
}
