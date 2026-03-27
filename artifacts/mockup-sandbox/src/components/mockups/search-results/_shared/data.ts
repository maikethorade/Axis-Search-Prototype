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
    thumbnailUrl: "https://images.ctfassets.net/zkw1wfs2si3w/3iCmczPPeeoy9wHwtenLDM/3737efb15b2726d8ecb06d6ce2e1793c/COMM_CAM_GFX.jpg?w=640&h=360&fit=fill&fm=jpg&q=80",
    heroUrl: "https://images.ctfassets.net/zkw1wfs2si3w/3iCmczPPeeoy9wHwtenLDM/3737efb15b2726d8ecb06d6ce2e1793c/COMM_CAM_GFX.jpg?w=1920&h=1080&fit=fill&fm=jpg&q=80",
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
    thumbnailUrl: "https://images.ctfassets.net/zkw1wfs2si3w/7n7Q8bH6CApcsRpOMdJY5K/c87db9ae02d25f76b654314bce3859da/RUSSO_EQUALISER_GFX.jpg?w=640&h=360&fit=fill&fm=jpg&q=80",
    heroUrl: "https://images.ctfassets.net/zkw1wfs2si3w/7n7Q8bH6CApcsRpOMdJY5K/c87db9ae02d25f76b654314bce3859da/RUSSO_EQUALISER_GFX.jpg?w=1920&h=1080&fit=fill&fm=jpg&q=80",
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
    thumbnailUrl: "https://images.ctfassets.net/zkw1wfs2si3w/4tct68dZvF7rd5Ka8pAEPH/52ce802c6a56028cc50b5cde670926ba/ENG_IVS_GFX.jpg?w=640&h=360&fit=fill&fm=jpg&q=80",
    heroUrl: "https://images.ctfassets.net/zkw1wfs2si3w/4tct68dZvF7rd5Ka8pAEPH/52ce802c6a56028cc50b5cde670926ba/ENG_IVS_GFX.jpg?w=1920&h=1080&fit=fill&fm=jpg&q=80",
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
    thumbnailUrl: "https://images.ctfassets.net/pjshm78m9jt4/18G0eBSNHv48HUNrrC8ME3/cfa727e14e9cf1d460d98f7ee46c95be/INFLATION_VERT.jpg?w=640&h=360&fit=fill&fm=jpg&q=80",
    heroUrl: "https://images.ctfassets.net/pjshm78m9jt4/18G0eBSNHv48HUNrrC8ME3/cfa727e14e9cf1d460d98f7ee46c95be/INFLATION_VERT.jpg?w=1920&h=1080&fit=fill&fm=jpg&q=80",
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
    thumbnailUrl: "https://images.ctfassets.net/pjshm78m9jt4/76oGeCIwGFoEcapTvFQU6U/6ae502f1ccbb6f782194a5df4e3898a9/GOLDERS_VERT.jpg?w=640&h=360&fit=fill&fm=jpg&q=80",
    heroUrl: "https://images.ctfassets.net/pjshm78m9jt4/76oGeCIwGFoEcapTvFQU6U/6ae502f1ccbb6f782194a5df4e3898a9/GOLDERS_VERT.jpg?w=1920&h=1080&fit=fill&fm=jpg&q=80",
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
    thumbnailUrl: "https://images.ctfassets.net/pjshm78m9jt4/2QHVzuVkLEOMstv5sdcOn3/359625d68c6eeda1a645722bd125b3f3/REPORTING_HISTORY_VERT_.jpg?w=640&h=360&fit=fill&fm=jpg&q=80",
    heroUrl: "https://images.ctfassets.net/pjshm78m9jt4/2QHVzuVkLEOMstv5sdcOn3/359625d68c6eeda1a645722bd125b3f3/REPORTING_HISTORY_VERT_.jpg?w=1920&h=1080&fit=fill&fm=jpg&q=80",
    duration: "2h 10m",
    year: "2023",
  },
];

export const MOMENTS: Moment[] = [
  {
    id: "m1",
    title: "Incredible opening goal",
    timestamp: "12:05",
    thumbnailUrl: "https://images.ctfassets.net/pjshm78m9jt4/4NHfDls9G3pcVH0MIPFzsJ/f77c7ae20b330630ce4ea1eeef13d31f/news-background.jpg?w=400&h=225&fit=fill&fm=jpg&q=80",
    parentTitle: "Arsenal vs Liverpool",
  },
  {
    id: "m2",
    title: "VAR Review — Penalty decision",
    timestamp: "44:30",
    thumbnailUrl: "https://images.ctfassets.net/zkw1wfs2si3w/4NS73501RDBdySDzq5cB0P/8b1811922af3147155fbcf459ec76446/pen_winning_moment_gfx.jpg?w=400&h=225&fit=fill&fm=jpg&q=80",
    parentTitle: "Arsenal vs Liverpool",
  },
  {
    id: "m3",
    title: "Last minute dramatic save",
    timestamp: "89:15",
    thumbnailUrl: "https://images.ctfassets.net/zkw1wfs2si3w/4IHMFxemzWrfAp0CydPeag/ca99337b50f8117230fddf01f7e03bd1/ANALYSIS_GFX.jpg?w=400&h=225&fit=fill&fm=jpg&q=80",
    parentTitle: "Arsenal vs Liverpool",
  },
  {
    id: "m4",
    title: "Buzzer beater three-pointer",
    timestamp: "119:45",
    thumbnailUrl: "https://images.ctfassets.net/zkw1wfs2si3w/64UjnzEFcEj86vbW4HeKmj/bcb82e1b42fb3950e41bc65e4ce8c71c/BETH_MEAD_THUMBNAIL.jpg?w=400&h=225&fit=fill&fm=jpg&q=80",
    parentTitle: "NBA Finals: Game 7",
  },
];

export const FILTERS = ["All Content", "Movies", "Series", "Sports", "Live", "Documentaries"];

export const RELATED_SEARCHES = ["Premier League highlights", "Champions League", "Football documentaries", "Live sports today"];

export const NAV_ITEMS = ["Home", "Sports", "Movies", "Series", "Live"];

export const AXIS_LOGO = "https://images.deltatre.com/image/private/t_q_best/v1711553662/prd/assets/products/logos/axis-logo.png";
