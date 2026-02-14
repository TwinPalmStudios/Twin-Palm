// lib/movies.ts
export type Movie = {
  title: string;
  year: string; // e.g., "2026" or "Winter 2026"
  runtime: string; // e.g., "2h 15m" or "TBD"
  rating: string; // e.g., "R" or "TBD"
  description: string;
  posterUrl: string; // Recommend local: "/posters/my-movie.jpg" — but Amazon links work too
  url: string; // Link to individual movie page, e.g., "/movies/the-brief-case" or "/Movies/Coming-Soon"
  releaseDate: string; // ISO date for accurate sorting, e.g., "2026-12-01". Use far future for TBD/upcoming.
};

export const movies: Movie[] = [

  {
    title: "Now You See Me: Now You Don't",
    year: "Fall 2026",
    runtime: "TBD",
    rating: "PG-13",
    description: "Time’s ticking.. and so is the case.",
    posterUrl: "https://static1.srcdn.com/wordpress/wp-content/uploads/2025/05/now-you-see-me-now-you-dont-film-poster.jpg", // Replace with real
    url: "/movies/the-brief-case",
    releaseDate: "2026-09-01",
  },
  {
    title: "Resident Alien",
    year: "Winter 2026",
    runtime: "TBD",
    rating: "TBD",
    description: "",
    posterUrl: "https://image.tmdb.org/t/p/original/uJMbW9d1QqoJWmGOqJv8mAbegac.jpg", // Replace with real
    url: "/movies/coming-soon",
    releaseDate: "2026-12-01",
  },
  {
    title: "Young Sheldon",
    year: "Spring 2027",
    runtime: "TBD",
    rating: "TBD",
    description: "",
    posterUrl: "https://image.tmdb.org/t/p/original/m2afrpLRua2J4152Q9SVnGH7KpV.jpg", // Replace with real
    url: "/movies/coming-soon",
    releaseDate: "2027-02-01",
  },
  // ADD ALL YOUR MOVIES HERE — the more the better!
  // Example older one:
  // {
  //   title: "Previous Movie",
  //   year: "2025",
  //   runtime: "1h 55m",
  //   rating: "R",
  //   description: "...",
  //   posterUrl: "...",
  //   url: "/movies/previous-Movie",
  //   releaseDate: "2025-03-20",
  // },
];