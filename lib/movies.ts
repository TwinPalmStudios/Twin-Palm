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
    year: "2025",
    runtime: "1h 53m",
    rating: "PG-13",
    description: "The original Four Horsemen magicians reunite with a new generation to pull off a globe-spanning diamond heist against a powerful criminal empire.",
    posterUrl: "/posters/nysm-nyd.jpg" , // Replace with real
    url: "/movies/nysm-nyd",
    releaseDate: "2025-11-14",
  },
  {
    title: "Resident Alien",
    year: "2021",
    runtime: "44m",
    rating: "TV-14",
    description: "An alien posing as a small-town doctor struggles with his mission while building bonds with the quirky locals.",
    posterUrl: "/posters/resident-alien.jpg" , // Replace with real
    url: "/tv/resident-alien",
    releaseDate: "2021-01-27",
  },
  {
    title: "Young Sheldon",
    year: "2017",
    runtime: "21m",
    rating: "TBD",
    description: "A young genius navigates school and family life as a child prodigy in East Texas.",
    posterUrl: "/posters/young-sheldon.jpg" , // Replace with real
    url: "/tv/young-sheldon",
    releaseDate: "2017-09-25",
  },
    {
    title: "Rush Hour",
    year: "1998",
    runtime: "1h 38m",
    rating: "PG-13",
    description: "A by-the-book Hong Kong detective is stuck with a loudmouthed LAPD cop and must overcome their chaos to save a kidnapped girl.",
    posterUrl: "/posters/rush-hour.jpg" , // Replace with real
    url: "/movies/rush-hour",
    releaseDate: "1998-09-18",
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