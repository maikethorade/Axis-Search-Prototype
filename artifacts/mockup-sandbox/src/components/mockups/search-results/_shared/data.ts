export interface ContentItem {
  id: string;
  title: string;
  description: string;
  type: 'movie' | 'series' | 'sport' | 'live' | 'documentary';
  genre: string[];
  thumbnailUrl: string;
  heroUrl: string;
  duration?: string;
  year?: string;
  rating?: string;
  personalizedScore?: number;
}

export interface Moment {
  id: string;
  title: string;
  timestamp: string;
  thumbnailUrl: string;
  parentTitle: string;
}

export const SEARCH_QUERY = "football";

export const SEARCH_RESULTS: ContentItem[] = [
  {
    id: "r1",
    title: "Premier League: Arsenal vs Liverpool",
    description: "A top-of-the-table clash between two title contenders.",
    type: "live",
    genre: ["Football", "Soccer"],
    thumbnailUrl: "https://image.tmdb.org/t/p/w500/sMBpav8cK7t7Nk0yf4tuNOqNUyW.jpg",
    heroUrl: "https://image.tmdb.org/t/p/w500/sMBpav8cK7t7Nk0yf4tuNOqNUyW.jpg",
    duration: "LIVE",
    year: "2024",
    personalizedScore: 95,
  },
  {
    id: "r2",
    title: "NBA Finals: Game 7",
    description: "The ultimate showdown for the championship ring.",
    type: "sport",
    genre: ["Basketball"],
    thumbnailUrl: "https://image.tmdb.org/t/p/w500/bv47XMjZUhptKGFKIEoVA8pVsMT.jpg",
    heroUrl: "https://image.tmdb.org/t/p/w500/bv47XMjZUhptKGFKIEoVA8pVsMT.jpg",
    duration: "2h 30m",
    year: "2024",
    personalizedScore: 88,
  },
  {
    id: "r3",
    title: "Wimbledon Men's Final",
    description: "An epic 5-set thriller on grass court.",
    type: "sport",
    genre: ["Tennis"],
    thumbnailUrl: "https://image.tmdb.org/t/p/w500/5QApZVV8FUFlVxQpIK3Ew6cqotq.jpg",
    heroUrl: "https://image.tmdb.org/t/p/w500/5QApZVV8FUFlVxQpIK3Ew6cqotq.jpg",
    duration: "4h 10m",
    year: "2023",
    personalizedScore: 75,
  },
  {
    id: "r4",
    title: "Free Solo",
    description: "Academy Award-winning documentary following Alex Honnold.",
    type: "documentary",
    genre: ["Adventure", "Sports"],
    thumbnailUrl: "https://image.tmdb.org/t/p/w500/v4QfYZMACODlWul9doN9RxE99ag.jpg",
    heroUrl: "https://image.tmdb.org/t/p/original/z2uuQasY4gQJ8VDAFki746JWeQJ.jpg",
    duration: "1h 40m",
    year: "2018",
    rating: "PG",
    personalizedScore: 88,
  },
  {
    id: "r5",
    title: "Marty Supreme",
    description: "Set in 1950s New York, a shoe salesman and table tennis hustler.",
    type: "movie",
    genre: ["Drama", "Sport"],
    thumbnailUrl: "https://image.tmdb.org/t/p/w500/qKWDHofjMHPSEOTLaixkC9ZmjTT.jpg",
    heroUrl: "https://image.tmdb.org/t/p/original/3iMoYSbI72Nwsvi7uSpqReLJVa6.jpg",
    duration: "2h 17m",
    year: "2025",
    rating: "15",
    personalizedScore: 99,
  },
  {
    id: "r6",
    title: "Olympics: 100m Sprint Final",
    description: "Sub-10 second performances and raw athletic excellence.",
    type: "sport",
    genre: ["Athletics", "Olympics"],
    thumbnailUrl: "https://image.tmdb.org/t/p/w500/jxAbDJWvz4p1hoFpJYG5vY2dQmq.jpg",
    heroUrl: "https://image.tmdb.org/t/p/w500/jxAbDJWvz4p1hoFpJYG5vY2dQmq.jpg",
    duration: "35m",
    year: "2024",
    personalizedScore: 91,
  },
  {
    id: "r7",
    title: "Tour de France: Stage 20",
    description: "The penultimate mountain stage through the Alps.",
    type: "sport",
    genre: ["Cycling"],
    thumbnailUrl: "https://image.tmdb.org/t/p/w500/mflBcox36s9ZPbsZPVOuhf6axaJ.jpg",
    heroUrl: "https://image.tmdb.org/t/p/w500/mflBcox36s9ZPbsZPVOuhf6axaJ.jpg",
    duration: "4h 30m",
    year: "2024",
  },
  {
    id: "r8",
    title: "Peaky Blinders",
    description: "A gangster family epic set in 1920s Birmingham.",
    type: "series",
    genre: ["Crime", "Drama"],
    thumbnailUrl: "https://image.tmdb.org/t/p/w500/8qPdsHxxJU493XbjeYAXStRo7z.jpg",
    heroUrl: "https://image.tmdb.org/t/p/original/wiE9doxiLwq3WCGamDIOb2PqBqc.jpg",
    duration: "6 Seasons",
    year: "2013-2022",
    rating: "18+",
    personalizedScore: 92,
  },
  {
    id: "r9",
    title: "Planet Earth II",
    description: "BAFTA-winning sequel showcasing wildlife in dazzling detail.",
    type: "documentary",
    genre: ["Nature", "Wildlife"],
    thumbnailUrl: "https://image.tmdb.org/t/p/w500/tUKomxy50suT4MyxjYfOJDkZUq3.jpg",
    heroUrl: "https://image.tmdb.org/t/p/original/1DYpBOVdb7Mzc9DgMCdIBTN1JEC.jpg",
    duration: "6 Episodes",
    year: "2016",
    rating: "U",
    personalizedScore: 92,
  },
  {
    id: "r10",
    title: "The White Lotus",
    description: "A satirical comedy-drama set at an exclusive tropical resort.",
    type: "series",
    genre: ["Drama", "Comedy"],
    thumbnailUrl: "https://image.tmdb.org/t/p/w500/7n06DhBEVVBDLxSwQK1RCUfeUbH.jpg",
    heroUrl: "https://image.tmdb.org/t/p/original/rCTLaPwuApDx8vLGjYZ9pRl7zRB.jpg",
    duration: "3 Seasons",
    year: "2021-2025",
    rating: "18+",
    personalizedScore: 98,
  },
  {
    id: "r11",
    title: "Spider-Man: Across the Spider-Verse",
    description: "Miles Morales catapults across the multiverse.",
    type: "movie",
    genre: ["Animation", "Action"],
    thumbnailUrl: "https://image.tmdb.org/t/p/w500/uc5U4GCZu9Z2Zb3yqk5fZfLwawR.jpg",
    heroUrl: "https://image.tmdb.org/t/p/original/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg",
    duration: "2h 20m",
    year: "2023",
    rating: "PG",
    personalizedScore: 85,
  },
  {
    id: "r12",
    title: "Rugby World Cup Final",
    description: "Two nations battle for the Webb Ellis Cup.",
    type: "sport",
    genre: ["Rugby"],
    thumbnailUrl: "https://image.tmdb.org/t/p/w500/ie1KbeYFG5E0GVr1QP7tDNuXvga.jpg",
    heroUrl: "https://image.tmdb.org/t/p/w500/ie1KbeYFG5E0GVr1QP7tDNuXvga.jpg",
    duration: "2h 10m",
    year: "2023",
  },
];

export const MOMENTS: Moment[] = [
  {
    id: "m1",
    title: "Incredible opening goal",
    timestamp: "12:05",
    thumbnailUrl: "https://image.tmdb.org/t/p/w500/u525jeDOzg9hVdvYfeehTGnw7Aa.jpg",
    parentTitle: "Arsenal vs Liverpool",
  },
  {
    id: "m2",
    title: "VAR Review — Penalty decision",
    timestamp: "44:30",
    thumbnailUrl: "https://image.tmdb.org/t/p/w500/dlffgYbqr1BllWacVLhAFw23nLl.jpg",
    parentTitle: "Arsenal vs Liverpool",
  },
  {
    id: "m3",
    title: "Last minute dramatic save",
    timestamp: "89:15",
    thumbnailUrl: "https://image.tmdb.org/t/p/w500/sMBpav8cK7t7Nk0yf4tuNOqNUyW.jpg",
    parentTitle: "Arsenal vs Liverpool",
  },
  {
    id: "m4",
    title: "Buzzer beater three-pointer",
    timestamp: "119:45",
    thumbnailUrl: "https://image.tmdb.org/t/p/w500/bv47XMjZUhptKGFKIEoVA8pVsMT.jpg",
    parentTitle: "NBA Finals: Game 7",
  },
];

export const FILTERS = ["All Content", "Movies", "Series", "Sports", "Live", "Documentaries"];

export const RELATED_SEARCHES = ["Premier League highlights", "Champions League", "Football documentaries", "Live sports today"];

export const NAV_ITEMS = ["Home", "Sports", "Movies", "Series", "Live"];

export const AXIS_LOGO = "https://images.deltatre.com/image/private/t_q_best/v1711553662/prd/assets/products/logos/axis-logo.png";
