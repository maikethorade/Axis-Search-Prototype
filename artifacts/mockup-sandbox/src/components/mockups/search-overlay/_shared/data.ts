export const RECENT_SEARCHES = [
  "Champions League",
  "F1 highlights",
  "Action movies",
  "Sci-fi series",
  "Tennis finals",
];

export const TRENDING_SEARCHES = [
  "Premier League Live",
  "Spider-Man",
  "Basketball Finals",
  "New Documentaries",
  "Comedy Specials",
  "Olympics highlights",
];

export const SEARCH_CATEGORIES = [
  "Sports",
  "Movies",
  "Series",
  "Live Events",
  "Documentaries",
  "Action",
  "Comedy",
  "Sci-Fi",
];

export interface CategoryCard {
  name: string;
  thumbnailUrl: string;
  gradient: string;
}

export const CATEGORY_CARDS: CategoryCard[] = [
  {
    name: "Sports",
    thumbnailUrl: "https://image.tmdb.org/t/p/w500/bv47XMjZUhptKGFKIEoVA8pVsMT.jpg",
    gradient: "from-green-900/80 to-transparent",
  },
  {
    name: "Movies",
    thumbnailUrl: "https://image.tmdb.org/t/p/w500/3iMoYSbI72Nwsvi7uSpqReLJVa6.jpg",
    gradient: "from-blue-900/80 to-transparent",
  },
  {
    name: "Series",
    thumbnailUrl: "https://image.tmdb.org/t/p/w500/rCTLaPwuApDx8vLGjYZ9pRl7zRB.jpg",
    gradient: "from-purple-900/80 to-transparent",
  },
  {
    name: "Live Events",
    thumbnailUrl: "https://image.tmdb.org/t/p/w500/sMBpav8cK7t7Nk0yf4tuNOqNUyW.jpg",
    gradient: "from-red-900/80 to-transparent",
  },
  {
    name: "Documentaries",
    thumbnailUrl: "https://image.tmdb.org/t/p/w500/1DYpBOVdb7Mzc9DgMCdIBTN1JEC.jpg",
    gradient: "from-amber-900/80 to-transparent",
  },
  {
    name: "Action",
    thumbnailUrl: "https://image.tmdb.org/t/p/w500/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg",
    gradient: "from-orange-900/80 to-transparent",
  },
  {
    name: "Comedy",
    thumbnailUrl: "https://image.tmdb.org/t/p/w500/P82NAcEsLIYgQtrtn36tYsj41m.jpg",
    gradient: "from-yellow-900/80 to-transparent",
  },
  {
    name: "Sci-Fi",
    thumbnailUrl: "https://image.tmdb.org/t/p/w500/lCySuYjhXix3FzQdS4oceDDrXKI.jpg",
    gradient: "from-cyan-900/80 to-transparent",
  },
];

export interface TrendingItem {
  title: string;
  thumbnailUrl: string;
  type: string;
  year: string;
}

export const TRENDING_CONTENT: TrendingItem[] = [
  {
    title: "Marty Supreme",
    thumbnailUrl: "https://image.tmdb.org/t/p/w500/qKWDHofjMHPSEOTLaixkC9ZmjTT.jpg",
    type: "Movie",
    year: "2025",
  },
  {
    title: "The White Lotus",
    thumbnailUrl: "https://image.tmdb.org/t/p/w500/7n06DhBEVVBDLxSwQK1RCUfeUbH.jpg",
    type: "Series",
    year: "2021-2025",
  },
  {
    title: "Spider-Man: ATSV",
    thumbnailUrl: "https://image.tmdb.org/t/p/w500/uc5U4GCZu9Z2Zb3yqk5fZfLwawR.jpg",
    type: "Movie",
    year: "2023",
  },
  {
    title: "Peaky Blinders",
    thumbnailUrl: "https://image.tmdb.org/t/p/w500/8qPdsHxxJU493XbjeYAXStRo7z.jpg",
    type: "Series",
    year: "2013-2022",
  },
  {
    title: "The Garfield Movie",
    thumbnailUrl: "https://image.tmdb.org/t/p/w500/4kgVYUQBM0USgffyn1gzEv3a4t4.jpg",
    type: "Movie",
    year: "2024",
  },
  {
    title: "Free Solo",
    thumbnailUrl: "https://image.tmdb.org/t/p/w500/v4QfYZMACODlWul9doN9RxE99ag.jpg",
    type: "Documentary",
    year: "2018",
  },
];

export const NAV_ITEMS = ["Home", "Sports", "Movies", "Series", "Live"];

export const AXIS_LOGO = "https://images.deltatre.com/image/private/t_q_best/v1711553662/prd/assets/products/logos/axis-logo.png";
