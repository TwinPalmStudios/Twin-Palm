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
  const [hoveredMovie, setHoveredMovie] = useState<string | null>(null)
  const [dragOffset, setDragOffset] = useState(0)
  const [currentBg, setCurrentBg] = useState("")
  const [nextBg, setNextBg] = useState("")
  const [showNext, setShowNext] = useState(false)
  const dragStartX = useRef(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Generate color palette from movie title
  const getMovieColors = (title: string) => {
    // Simple hash function
    let hash = 0
    for (let i = 0; i < title.length; i++) {
      hash = title.charCodeAt(i) + ((hash << 5) - hash)
    }
    
    // Generate hue from hash (0-360)
    const hue1 = Math.abs(hash % 360)
    const hue2 = (hue1 + 60) % 360 // Complementary hue
    
    // Dark, saturated colors for cinematic feel
    const color1 = `hsl(${hue1}, 60%, 15%)`
    const color2 = `hsl(${hue2}, 50%, 20%)`
    
    return `linear-gradient(135deg, ${color1}, ${color2})`
  }

  // Get target gradient based on hover or center poster
  const targetGradient = useMemo(() => {
    if (hoveredMovie) {
      return getMovieColors(hoveredMovie)
    }
    const centerMovie = featuredMovies[currentIndex % featuredMovies.length]
    return centerMovie ? getMovieColors(centerMovie.title) : 'linear-gradient(135deg, rgb(20, 20, 30), rgb(40, 30, 50))'
  }, [currentIndex, featuredMovies, hoveredMovie])

  // Crossfade effect when target changes
  useEffect(() => {
    if (targetGradient === currentBg) return
    
    // Set next background
    setNextBg(targetGradient)
    setShowNext(true)
    
    // After transition, swap them
    const timeout = setTimeout(() => {
      setCurrentBg(targetGradient)
      setShowNext(false)
    }, 1000) // Match transition duration
    
    return () => clearTimeout(timeout)
  }, [targetGradient])

  // Initialize first background
  useEffect(() => {
    if (!currentBg) {
      setCurrentBg(targetGradient)
    }
  }, [targetGradient])

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

    if (dragOffset > 100) {
      setCurrentIndex((prev) => prev - 1)
    } else if (dragOffset < -100) {
      setCurrentIndex((prev) => prev + 1)
    }

    setDragOffset(0)
  }

  if (featuredMovies.length === 0) {
    return null
  }

  const extendedMovies = Array.from({ length: featuredMovies.length * 20 }, (_, i) => 
    featuredMovies[i % featuredMovies.length]
  )

  return (
    <>
      {/* Crossfade Background Layers */}
      <div 
        className="fixed inset-0 -z-10"
        style={{
          background: currentBg,
        }}
      />
      <div 
        className="fixed inset-0 -z-10 transition-opacity duration-1000 ease-in-out"
        style={{
          background: nextBg,
          opacity: showNext ? 1 : 0,
        }}
      />
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-background/60 via-background/40 to-background pointer-events-none" />

      <section className="relative w-full py-16 overflow-hidden">
        <div className="container px-4 md:px-6 relative z-10">
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
                const position = index - (currentIndex + featuredMovies.length * 10)
                const isVisible = position >= -1 && position <= 1
                
                const getWidth = () => {
                  return position === 0 ? 'w-60 md:w-72' : 'w-56 md:w-64'
                }
                
                const getRotation = () => {
                  if (position === 0) return 0
                  if (position === -1) return 12
                  if (position === 1) return -12
                  return 0
                }
                
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
                    onMouseEnter={() => setHoveredMovie(movie.title)}
                    onMouseLeave={() => setHoveredMovie(null)}
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

          {/* Keyboard hint - simple text */}
          <div className="mt-6 text-center text-xs text-muted-foreground/40">
            <span>← → to navigate • ESC to {isAutoplayPaused ? 'play' : 'pause'}</span>
          </div>
        </div>
      </section>
    </>
  )
}
