"use client"

import PosterCard from "./poster-card"

const movies = [
  {
    title: "???",
    year: "2026",
    runtime: "???",
    rating: "???",
    description: "???",
    posterUrl:
      "https://m.media-amazon.com/images/M/MV5BOTVjNTA0ZWEtNzU2Ny00Njg1LWE1MmEtZTUyZGQzYTVlY2Q5XkEyXkFqcGc@.V1.jpg",
    url: "/placeholder",
  },
  {
    title: "The Brief Case",
    year: "2025",
    runtime: "TBD",
    rating: "PG-13",
    description: "Coming Soon..",
    posterUrl:
      "https://m.media-amazon.com/images/M/MV5BOTVjNTA0ZWEtNzU2Ny00Njg1LWE1MmEtZTUyZGQzYTVlY2Q5XkEyXkFqcGc@.V1.jpg",
    url: "/placeholder",
  },
  {
    title: "???",
    year: "2026",
    runtime: "???",
    rating: "???",
    description: "???",
    posterUrl:
      "https://m.media-amazon.com/images/M/MV5BOTVjNTA0ZWEtNzU2Ny00Njg1LWE1MmEtZTUyZGQzYTVlY2Q5XkEyXkFqcGc@.V1.jpg",
    url: "/placeholder",
  },
]

export default function PosterGallery() {
  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto max-w-[58rem] text-center mb-16">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">Featured Films</h2>
        <p className="mt-4 text-muted-foreground sm:text-lg">
          Discover the cinematic excellence that defines Twin Palm Studios.
        </p>
      </div>

      <div className="flex justify-center items-end gap-6 md:gap-12 px-8 md:px-16 py-16">
        {/* Left Card - Angled inward */}
        <div className="w-56 md:w-64">
          <PosterCard {...movies[0]} className="poster-left" initialRotateY={12} />
        </div>

        {/* Center Card - Slightly bigger and straight */}
        <div className="w-60 md:w-72 z-10">
          <PosterCard {...movies[1]} className="poster-center" initialRotateY={0} isCenter={true} />
        </div>

        {/* Right Card - Angled inward */}
        <div className="w-56 md:w-64">
          <PosterCard {...movies[2]} className="poster-right" initialRotateY={-12} />
        </div>
      </div>
    </section>
  )
}
