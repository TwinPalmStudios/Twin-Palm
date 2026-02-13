"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"

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
    let scale = isCenter ? 1.05 : 1.0
    let rotateX = -1
    let rotateY = initialRotateY

    if (isHovered) {
      scale = isCenter ? 1.12 : 1.08
      rotateX = -5
      rotateY = 0
    }

    return `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`
  }

  return (
    <div
      className={cn(
        "relative group cursor-pointer transform-gpu will-change-transform",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      style={{
        transform: getTransform(),
        transformStyle: "preserve-3d",
        transformOrigin: "center center",
        transition: "transform 0.48s ease-out", // hover animation only
      }}
    >
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-2xl shadow-xl",
          isCenter ? "h-[420px] md:h-[460px]" : "h-[400px] md:h-[440px]"
        )}
      >
        {/* Poster Image */}
        <img
          src={posterUrl || "/placeholder.svg"}
          alt={title}
          className={cn(
            "w-full h-full object-cover transition-[transform,filter] duration-[480ms] ease-out",
            isHovered ? "scale-105 blur-sm" : "scale-100 blur-0"
          )}
        />

        {/* Frosted Glass Overlay */}
        <div
          className={cn(
            "absolute inset-0 rounded-2xl flex flex-col justify-end p-5 md:p-7 text-white transition-[opacity,backdrop-filter] duration-[480ms] ease-out",
            isHovered
              ? "bg-black/65 backdrop-blur-[8px] backdrop-saturate-[100%] opacity-100"
              : "bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0"
          )}
        >
          <h3 className="text-xl md:text-2xl font-semibold leading-tight tracking-tight mb-2 text-balance">
            {title}
          </h3>

          {/* Single-line runtime/year/rating */}
          <div className="flex items-center gap-x-3 text-sm font-medium opacity-90 mb-3 whitespace-nowrap">
            <span className="flex-shrink-0">{runtime}</span>
            <span className="flex-shrink-0">•</span>
            <span className="flex-shrink-0">{year}</span>
            <span className="flex-shrink-0">•</span>
            <span className="flex-shrink-0">{rating}</span>
          </div>

          <p className="text-sm leading-relaxed opacity-85 line-clamp-3 md:line-clamp-4 text-pretty max-w-prose">
            {description}
          </p>
        </div>
      </div>

      {/* Shadow */}
      <div
        className={cn(
          "absolute inset-0 rounded-2xl -z-10 transition-[box-shadow] duration-[480ms] ease-out",
          isHovered
            ? "shadow-[0_35px_60px_-12px_rgba(0,0,0,0.6)]"
            : "shadow-[0_15px_35px_-10px_rgba(0,0,0,0.35)]"
        )}
      />
    </div>
  )
}
