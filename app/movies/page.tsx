import { movies } from "@/lib/movies"
import PosterCard from "@/components/poster-card"
import Link from "next/link"

export default function MoviesPage() {
  const sortedMovies = [...movies].sort((a, b) => {
    const dateA = a.releaseDate ? new Date(a.releaseDate).getTime() : 0
    const dateB = b.releaseDate ? new Date(b.releaseDate).getTime() : 0
    return dateB - dateA
  })

  return (
    <div className="container py-24">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">All Films</h1>
        <p className="text-xl text-muted-foreground">Explore our complete collection</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
        {sortedMovies.map((movie) => (
          <Link key={movie.title} href={movie.url} className="block">
            <PosterCard
              {...movie}
              className="hover:scale-105 transition-transform duration-300"
              initialRotateY={0}
            />
          </Link>
        ))}
      </div>
    </div>
  )
}
