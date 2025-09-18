"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

interface PosterCardProps {
  title: string
  year: string
  runtime: string
  rating: string
  description: string
  posterUrl: string
  url: string
  className?: string
  initialRotateY?: number
  isCenter?: boolean
}

export default function PosterCard({
  title,
  year,
  runtime,
  rating,
  description,
  posterUrl,
  url,
  className = "",
  initialRotateY = 0,
  isCenter = false,
}: PosterCardProps) {
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = () => {
    router.push(url)
  }

  const getTransform = () => {
    const baseScale = isCenter ? 1.05 : 1
    const hoverScale = isCenter ? 1.12 : 1.08
    const scale = isHovered ? hoverScale : baseScale

    const rotateY = isHovered ? 0 : initialRotateY
    const rotateX = isHovered ? -5 : -1

    return `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`
  }

  return (
    <div
      className={`relative group cursor-pointer transition-all duration-700 transform-gpu ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      style={{
        transform: getTransform(),
        transformStyle: "preserve-3d",
        transformOrigin: "center center",
      }}
    >
      {/* Poster Image */}
      <div
        className={`relative w-full ${isCenter ? "h-[420px] md:h-[460px]" : "h-[400px] md:h-[440px]"} rounded-xl overflow-hidden shadow-2xl transition-all duration-700`}
      >
        <img
          src={posterUrl || "/placeholder.svg"}
          alt={title}
          className={`w-full h-full object-cover transition-all duration-700 ${
            isHovered ? "blur-sm scale-110" : "blur-0 scale-100"
          }`}
        />

        {/* Frosted Glass Overlay */}
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-md transition-all duration-700 flex flex-col justify-center items-center p-4 md:p-6 text-white ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <h3 className="text-xl md:text-2xl font-bold mb-2 text-center">{title}</h3>
          <div className="flex items-center gap-2 mb-3 text-xs md:text-sm opacity-90">
            <span>{year}</span>
            <span>•</span>
            <span>{runtime}</span>
            <span>•</span>
            <span>{rating}</span>
          </div>
          <p className="text-xs md:text-sm text-center leading-relaxed opacity-90 line-clamp-4">{description}</p>
        </div>
      </div>

      {/* Enhanced Shadow */}
      <div
        className={`absolute inset-0 rounded-xl transition-all duration-700 -z-10 ${
          isHovered ? "shadow-[0_35px_60px_-12px_rgba(0,0,0,0.6)]" : "shadow-[0_15px_35px_-5px_rgba(0,0,0,0.4)]"
        }`}
      />
    </div>
  )
}
