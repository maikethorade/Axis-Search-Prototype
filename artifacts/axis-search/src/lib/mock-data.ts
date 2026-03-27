export type ContentType = 'movie' | 'series' | 'sport' | 'live' | 'documentary';

export interface Moment {
  id: string;
  title: string;
  timestamp: string;
  thumbnailUrl: string;
}

export interface ContentItem {
  id: string;
  title: string;
  description: string;
  type: ContentType;
  genre: string[];
  tags: string[];
  thumbnailUrl: string;
  heroUrl: string;
  duration?: string;
  year?: string;
  rating?: string;
  cast?: string[];
  moments?: Moment[];
  trending?: boolean;
  personalizedScore?: number;
}

const bbc16x9 = (id: string) => `https://ichef.bbci.co.uk/images/ic/960x540/${id}.jpg`;
const bbc2x3 = (id: string) => `https://ichef.bbci.co.uk/images/ic/480x720/${id}.jpg`;
const bbcHero = (id: string) => `https://ichef.bbci.co.uk/images/ic/1248x702/${id}.jpg`;

export const MOCK_CONTENT: ContentItem[] = [
  {
    id: "hero_marty",
    title: "Marty Supreme",
    description: "Set in 1950s New York, a shoe salesman and table tennis hustler pursues his obsessive dream of becoming world champion. Based on the extraordinary life of legendary ping-pong player Marty Reisman.",
    type: "movie",
    genre: ["Drama", "Sport", "Biography"],
    tags: ["marty supreme", "timothee chalamet", "ping pong", "table tennis", "a24", "josh safdie", "drama", "sport", "biography", "1950s", "new york"],
    thumbnailUrl: "https://image.tmdb.org/t/p/w500/qKWDHofjMHPSEOTLaixkC9ZmjTT.jpg",
    heroUrl: "https://image.tmdb.org/t/p/original/3iMoYSbI72Nwsvi7uSpqReLJVa6.jpg",
    duration: "2h 17m",
    year: "2025",
    rating: "15",
    cast: ["Timothée Chalamet", "Gwyneth Paltrow", "Tyler, the Creator"],
    trending: true,
    personalizedScore: 99
  },
  {
    id: "s1",
    title: "The White Lotus",
    description: "A satirical comedy-drama set at an exclusive tropical resort, following the vacations of various hotel guests over the span of a week as dark secrets unravel.",
    type: "series",
    genre: ["Drama", "Comedy"],
    tags: ["drama", "comedy", "series", "hbo", "resort", "satire", "thriller", "white lotus"],
    thumbnailUrl: "https://image.tmdb.org/t/p/w500/7n06DhBEVVBDLxSwQK1RCUfeUbH.jpg",
    heroUrl: "https://image.tmdb.org/t/p/original/rCTLaPwuApDx8vLGjYZ9pRl7zRB.jpg",
    duration: "3 Seasons",
    year: "2021-2025",
    rating: "18+",
    cast: ["Jennifer Coolidge", "Aubrey Plaza", "Walton Goggins"],
    trending: true,
    personalizedScore: 98,
    moments: [
      { id: "m1a", title: "Incredible opening goal", timestamp: "12:05", thumbnailUrl: bbc16x9("p0n5qpv8") },
      { id: "m1b", title: "VAR Review — Penalty decision", timestamp: "44:30", thumbnailUrl: bbc16x9("p0n7j775") },
      { id: "m1c", title: "Last minute dramatic save", timestamp: "89:15", thumbnailUrl: bbc16x9("p0mmh2ts") },
      { id: "m1d", title: "Post-match celebrations", timestamp: "92:00", thumbnailUrl: bbc16x9("p0n8g8jq") }
    ]
  },
  {
    id: "m1",
    title: "Spider-Man: Across the Spider-Verse",
    description: "Miles Morales catapults across the multiverse, where he encounters a team of Spider-People charged with protecting its very existence. But when the heroes clash on how to handle a new threat, Miles must redefine what it means to be a hero.",
    type: "movie",
    genre: ["Animation", "Action", "Adventure"],
    tags: ["animation", "action", "superhero", "marvel", "spider-man", "exciting", "multiverse", "adventure"],
    thumbnailUrl: "https://image.tmdb.org/t/p/w500/uc5U4GCZu9Z2Zb3yqk5fZfLwawR.jpg",
    heroUrl: "https://image.tmdb.org/t/p/original/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg",
    duration: "2h 20m",
    year: "2023",
    rating: "PG",
    cast: ["Shameik Moore", "Hailee Steinfeld", "Oscar Isaac"],
    trending: true,
    personalizedScore: 85
  },
  {
    id: "s2",
    title: "Peaky Blinders",
    description: "A gangster family epic set in 1920s Birmingham, England, centred on a gang who sew razor blades into the peaks of their caps. Tommy Shelby leads his fearless crew through the criminal underworld.",
    type: "series",
    genre: ["Crime", "Drama"],
    tags: ["crime", "drama", "series", "bbc", "gangster", "1920s", "thriller", "birmingham", "period"],
    thumbnailUrl: "https://image.tmdb.org/t/p/w500/8qPdsHxxJU493XbjeYAXStRo7z.jpg",
    heroUrl: "https://image.tmdb.org/t/p/original/wiE9doxiLwq3WCGamDIOb2PqBqc.jpg",
    duration: "6 Seasons",
    year: "2013-2022",
    rating: "18+",
    cast: ["Cillian Murphy", "Helen McCrory", "Paul Anderson"],
    trending: true,
    personalizedScore: 92
  },
  {
    id: "d1",
    title: "Free Solo",
    description: "Academy Award-winning documentary following Alex Honnold's attempt to climb El Capitan without ropes — a breathtaking portrait of obsession and risk.",
    type: "documentary",
    genre: ["Adventure", "Sports"],
    tags: ["climbing", "adventure", "sports", "nature", "documentary", "inspiring", "extreme"],
    thumbnailUrl: "https://image.tmdb.org/t/p/w500/v4QfYZMACODlWul9doN9RxE99ag.jpg",
    heroUrl: "https://image.tmdb.org/t/p/original/z2uuQasY4gQJ8VDAFki746JWeQJ.jpg",
    duration: "1h 40m",
    year: "2018",
    rating: "PG",
    personalizedScore: 88
  },

  // --- BBC iPlayer: Trending / Everyone's Watching ---
  {
    id: "ip_claudia",
    title: "The Claudia Winkleman Show",
    description: "Claudia welcomes the biggest names from the worlds of film, TV, music and beyond.",
    type: "series",
    genre: ["Entertainment", "Talk Show"],
    tags: ["claudia winkleman", "talk show", "entertainment", "celebrity", "comedy", "series", "bbc"],
    thumbnailUrl: bbc2x3("p0n6j86v"),
    heroUrl: bbcHero("p0n6j86v"),
    duration: "Series 1",
    year: "2026",
    rating: "PG",
    cast: ["Claudia Winkleman"],
    trending: true,
    personalizedScore: 91
  },
  {
    id: "ip_crookhaven",
    title: "Crookhaven",
    description: "Gabriel must decide whether to accept his place at a secret school for crooks.",
    type: "series",
    genre: ["Drama", "Thriller"],
    tags: ["crookhaven", "drama", "thriller", "school", "crime", "series", "bbc", "mystery"],
    thumbnailUrl: bbc2x3("p0n7j3zv"),
    heroUrl: bbcHero("p0n7j3zv"),
    duration: "Series 1",
    year: "2026",
    rating: "12+",
    trending: true,
    personalizedScore: 94
  },
  {
    id: "ip_other_bennet",
    title: "The Other Bennet Sister",
    description: "Mary Bennet hopes to win her family's approval at her first ball.",
    type: "series",
    genre: ["Drama", "Period"],
    tags: ["bennet", "period drama", "drama", "bbc", "series", "jane austen", "costume"],
    thumbnailUrl: bbc2x3("p0n6xmjk"),
    heroUrl: bbcHero("p0n6xmjk"),
    duration: "Series 1",
    year: "2026",
    rating: "PG",
    trending: true,
    personalizedScore: 87
  },
  {
    id: "ip_boarders",
    title: "Boarders",
    description: "It's the boarders' final term, but vandals unleash chaos. Who's behind the destruction?",
    type: "series",
    genre: ["Comedy", "Drama"],
    tags: ["boarders", "comedy", "drama", "school", "bbc", "series", "funny", "laugh"],
    thumbnailUrl: bbc2x3("p0n65f8v"),
    heroUrl: bbcHero("p0n65f8v"),
    duration: "Series 3",
    year: "2026",
    rating: "12+",
    trending: true,
    personalizedScore: 82
  },

  // --- BBC iPlayer: New & Trending ---
  {
    id: "ip_capture",
    title: "The Capture",
    description: "A devastating attack puts new boss of SO15, Rachel Carey, at the heart of a conspiracy.",
    type: "series",
    genre: ["Thriller", "Crime"],
    tags: ["capture", "thriller", "crime", "conspiracy", "bbc", "series", "intense", "detective"],
    thumbnailUrl: bbc2x3("p0n5qpv8"),
    heroUrl: bbcHero("p0n5qpv8"),
    duration: "Series 3",
    year: "2026",
    rating: "15+",
    cast: ["Holliday Grainger", "Paapa Essiedu"],
    trending: true,
    personalizedScore: 93
  },
  {
    id: "ip_matchmaker",
    title: "Muslim Matchmaker",
    description: "Matchmakers Hoda and Yasmin launch the dating journeys of three hopefuls looking for love.",
    type: "series",
    genre: ["Reality", "Entertainment"],
    tags: ["matchmaker", "reality", "dating", "love", "entertainment", "bbc", "series"],
    thumbnailUrl: bbc2x3("p0n7kxym"),
    heroUrl: bbcHero("p0n7kxym"),
    duration: "Series 1",
    year: "2026",
    rating: "PG"
  },
  {
    id: "ip_apprentice",
    title: "The Apprentice",
    description: "Lord Sugar's hopefuls jet off to Hong Kong to secure nine items at knock-down prices.",
    type: "series",
    genre: ["Reality", "Business"],
    tags: ["apprentice", "reality", "business", "lord sugar", "bbc", "series", "competition"],
    thumbnailUrl: bbc2x3("p0mxlqt8"),
    heroUrl: bbcHero("p0mxlqt8"),
    duration: "Series 20",
    year: "2026",
    rating: "PG",
    trending: true,
    personalizedScore: 80
  },
  {
    id: "ip_captive",
    title: "Captive Audience: A Real American Horror Story",
    description: "Seven-year-old Steven Stayner vanishes. His return seven years later stuns the nation.",
    type: "documentary",
    genre: ["True Crime", "Documentary"],
    tags: ["captive audience", "true crime", "documentary", "abduction", "bbc", "horror", "american"],
    thumbnailUrl: bbc2x3("p0n8qmb7"),
    heroUrl: bbcHero("p0n8qmb7"),
    duration: "Series 1",
    year: "2026",
    rating: "15+",
    personalizedScore: 86
  },
  {
    id: "ip_superpowers",
    title: "Clash of the Superpowers: America vs China",
    description: "In his first term, Trump upends America's relationship with Beijing.",
    type: "documentary",
    genre: ["Politics", "Documentary"],
    tags: ["superpowers", "america", "china", "politics", "documentary", "bbc", "geopolitics"],
    thumbnailUrl: bbc2x3("p0n7j775"),
    heroUrl: bbcHero("p0n7j775"),
    duration: "Series 1",
    year: "2026",
    rating: "12+",
    personalizedScore: 78
  },
  {
    id: "ip_salah",
    title: "Mo Salah: Never Give Up",
    description: "The story of Mo Salah's unlikely rise to global stardom.",
    type: "documentary",
    genre: ["Sport", "Biography"],
    tags: ["mo salah", "football", "soccer", "biography", "documentary", "bbc", "liverpool", "inspiring", "sports"],
    thumbnailUrl: bbc16x9("p0mmh2ts"),
    heroUrl: bbcHero("p0mmh2ts"),
    duration: "1h 30m",
    year: "2025",
    rating: "PG",
    trending: true,
    personalizedScore: 95
  },
  {
    id: "ip_ambulance",
    title: "Ambulance",
    description: "A night shift takes a violent turn as frontline staff come under attack from a patient.",
    type: "series",
    genre: ["Factual", "Documentary"],
    tags: ["ambulance", "nhs", "emergency", "factual", "bbc", "series", "medical", "hospital"],
    thumbnailUrl: bbc2x3("p0n8g8jq"),
    heroUrl: bbcHero("p0n8g8jq"),
    duration: "Series 16",
    year: "2026",
    rating: "15+"
  },
  {
    id: "ip_trying",
    title: "Trying",
    description: "Jason, resigned to Tyler being separated from his sister, treats the kids to a good time.",
    type: "series",
    genre: ["Comedy", "Drama"],
    tags: ["trying", "comedy", "drama", "family", "adoption", "series", "bbc", "funny", "laugh"],
    thumbnailUrl: bbc2x3("p0n4m0zr"),
    heroUrl: bbcHero("p0n4m0zr"),
    duration: "Series 3",
    year: "2026",
    rating: "12+",
    personalizedScore: 76
  },

  // --- BBC iPlayer: Films ---
  {
    id: "ip_duchess",
    title: "The Duchess",
    description: "The tumultuous life story of the 18th-century Duchess of Devonshire (Keira Knightley).",
    type: "movie",
    genre: ["Drama", "Period", "Biography"],
    tags: ["duchess", "period drama", "keira knightley", "biography", "costume", "bbc", "film", "historical"],
    thumbnailUrl: bbc2x3("p08lbk1x"),
    heroUrl: bbcHero("p08lbk1x"),
    duration: "1h 50m",
    year: "2008",
    rating: "12+",
    cast: ["Keira Knightley", "Ralph Fiennes", "Dominic Cooper"],
    personalizedScore: 81
  },
  {
    id: "ip_whitney",
    title: "Whitney Houston: I Wanna Dance with Somebody",
    description: "Drama portraying the rise and fall of superstar Whitney Houston.",
    type: "movie",
    genre: ["Drama", "Music", "Biography"],
    tags: ["whitney houston", "music", "biography", "drama", "bbc", "film", "rise and fall"],
    thumbnailUrl: bbc2x3("p0lrls7d"),
    heroUrl: bbcHero("p0lrls7d"),
    duration: "2h 26m",
    year: "2022",
    rating: "12+",
    cast: ["Naomi Ackie", "Stanley Tucci"],
    trending: true,
    personalizedScore: 83
  },
  {
    id: "ip_martian",
    title: "The Martian",
    description: "An astronaut stranded on Mars and presumed dead must find a way to contact Earth.",
    type: "movie",
    genre: ["Sci-Fi", "Adventure", "Drama"],
    tags: ["martian", "mars", "space", "sci-fi", "adventure", "matt damon", "film", "survival"],
    thumbnailUrl: bbc2x3("p0n4k7rm"),
    heroUrl: bbcHero("p0n4k7rm"),
    duration: "2h 24m",
    year: "2015",
    rating: "12+",
    cast: ["Matt Damon", "Jessica Chastain", "Jeff Daniels"],
    personalizedScore: 90
  },
  {
    id: "ip_training_day",
    title: "Training Day",
    description: "Taut urban crime drama following a rookie cop's first day of training.",
    type: "movie",
    genre: ["Crime", "Thriller", "Action"],
    tags: ["training day", "crime", "thriller", "action", "police", "denzel", "film", "exciting"],
    thumbnailUrl: bbc2x3("p0j7s2qk"),
    heroUrl: bbcHero("p0j7s2qk"),
    duration: "2h 02m",
    year: "2001",
    rating: "18+",
    cast: ["Denzel Washington", "Ethan Hawke"],
    personalizedScore: 88
  },
  {
    id: "ip_addams2",
    title: "The Addams Family 2",
    description: "As the Addams embark on a trip around America, Wednesday is haunted by feelings of doubt.",
    type: "movie",
    genre: ["Animation", "Comedy", "Family"],
    tags: ["addams family", "animation", "comedy", "family", "kids", "fun", "film"],
    thumbnailUrl: bbc2x3("p0h1kq6k"),
    heroUrl: bbcHero("p0h1kq6k"),
    duration: "1h 33m",
    year: "2021",
    rating: "PG",
    personalizedScore: 72
  },
  {
    id: "ip_licorice",
    title: "Licorice Pizza",
    description: "LA, 1973. Aimless 20-something Alana is drawn into the quirky world of 15-year-old Gary.",
    type: "movie",
    genre: ["Comedy", "Drama", "Romance"],
    tags: ["licorice pizza", "comedy", "drama", "romance", "1970s", "LA", "film", "coming of age"],
    thumbnailUrl: bbc2x3("p0gjdjc3"),
    heroUrl: bbcHero("p0gjdjc3"),
    duration: "2h 13m",
    year: "2021",
    rating: "15+",
    cast: ["Alana Haim", "Cooper Hoffman", "Bradley Cooper"],
    personalizedScore: 84
  },
  {
    id: "ip_madding",
    title: "Far from the Madding Crowd",
    description: "Romantic drama adapted from the classic novel by Thomas Hardy, starring Carey Mulligan.",
    type: "movie",
    genre: ["Drama", "Romance", "Period"],
    tags: ["madding crowd", "romance", "period drama", "thomas hardy", "carey mulligan", "film", "costume"],
    thumbnailUrl: bbc2x3("p06vvnl6"),
    heroUrl: bbcHero("p06vvnl6"),
    duration: "1h 59m",
    year: "2015",
    rating: "12+",
    cast: ["Carey Mulligan", "Matthias Schoenaerts", "Michael Sheen"]
  },
  {
    id: "ip_ammonite",
    title: "Ammonite",
    description: "A fossil hunter's solitary existence is changed by the arrival of a paleontologist's wife.",
    type: "movie",
    genre: ["Drama", "Romance"],
    tags: ["ammonite", "drama", "romance", "kate winslet", "historical", "film", "fossil"],
    thumbnailUrl: bbc2x3("p0g5c0js"),
    heroUrl: bbcHero("p0g5c0js"),
    duration: "1h 57m",
    year: "2020",
    rating: "15+",
    cast: ["Kate Winslet", "Saoirse Ronan"]
  },

  // --- BBC iPlayer: Most Popular / Drama ---
  {
    id: "ip_nightmanager",
    title: "The Night Manager",
    description: "Pine's past resurfaces as he's pulled into a deadly conspiracy that takes him to Colombia.",
    type: "series",
    genre: ["Thriller", "Drama", "Spy"],
    tags: ["night manager", "thriller", "spy", "drama", "bbc", "series", "le carre", "intense", "exciting"],
    thumbnailUrl: bbc2x3("p0mmfzxy"),
    heroUrl: bbcHero("p0mmfzxy"),
    duration: "Series 2",
    year: "2025",
    rating: "15+",
    cast: ["Tom Hiddleston", "Olivia Colman", "Hugh Laurie"],
    trending: true,
    personalizedScore: 96
  },
  {
    id: "ip_industry",
    title: "Industry",
    description: "A London-based payment processor unites old and new friends in the City's fintech space.",
    type: "series",
    genre: ["Drama", "Thriller"],
    tags: ["industry", "drama", "finance", "london", "thriller", "series", "bbc", "city"],
    thumbnailUrl: bbc2x3("p0msf7rz"),
    heroUrl: bbcHero("p0msf7rz"),
    duration: "Series 4",
    year: "2025",
    rating: "18+",
    personalizedScore: 89
  },
  {
    id: "ip_waterloo",
    title: "Waterloo Road",
    description: "Darius is tested by a violent new pupil, who also unlocks a secret from Agnes's past.",
    type: "series",
    genre: ["Drama", "School"],
    tags: ["waterloo road", "drama", "school", "bbc", "series", "pupils", "teachers"],
    thumbnailUrl: bbc2x3("p0mnzff9"),
    heroUrl: bbcHero("p0mnzff9"),
    duration: "Series 17",
    year: "2025",
    rating: "12+"
  },
  {
    id: "ip_lotf",
    title: "Lord of the Flies",
    description: "The boys try to work out how best to survive after their plane crashes on a desert island.",
    type: "series",
    genre: ["Drama", "Thriller"],
    tags: ["lord of the flies", "drama", "thriller", "survival", "bbc", "series", "desert island", "intense"],
    thumbnailUrl: bbc2x3("p0mxl4jw"),
    heroUrl: bbcHero("p0mxl4jw"),
    duration: "Series 1",
    year: "2025",
    rating: "15+",
    personalizedScore: 85
  },

  // --- BBC iPlayer: Comedy ---
  {
    id: "ip_one_more_laugh",
    title: "One More Laugh",
    description: "BBC Asian Network presents a night of stand-up comedy at the iconic Radio Theatre, London.",
    type: "series",
    genre: ["Comedy", "Stand-Up"],
    tags: ["comedy", "stand-up", "funny", "laugh", "bbc", "live", "fun"],
    thumbnailUrl: bbc2x3("p0n7k9s9"),
    heroUrl: bbcHero("p0n7k9s9"),
    duration: "Special",
    year: "2026",
    rating: "12+"
  },
  {
    id: "ip_regret",
    title: "We Might Regret This",
    description: "Freya struggles with her career and misses Jo, leading her to make an impulsive decision.",
    type: "series",
    genre: ["Comedy", "Drama"],
    tags: ["comedy", "drama", "romance", "bbc", "series", "funny", "relationships"],
    thumbnailUrl: bbc2x3("p0n1tsvs"),
    heroUrl: bbcHero("p0n1tsvs"),
    duration: "Series 2",
    year: "2026",
    rating: "15+"
  },
  {
    id: "ip_prophets",
    title: "Small Prophets",
    description: "A mystical recipe promises answers to the whereabouts of Michael's missing girlfriend.",
    type: "series",
    genre: ["Comedy", "Mystery"],
    tags: ["comedy", "mystery", "bbc", "series", "funny", "supernatural", "laugh"],
    thumbnailUrl: bbc2x3("p0mzcvch"),
    heroUrl: bbcHero("p0mzcvch"),
    duration: "Series 1",
    year: "2025",
    rating: "12+"
  },
  {
    id: "ip_gavin",
    title: "Gavin & Stacey",
    description: "After being phone buddies for months, Gavin and Stacey finally arrange a rendezvous.",
    type: "series",
    genre: ["Comedy", "Romance"],
    tags: ["gavin stacey", "comedy", "romance", "bbc", "series", "funny", "laugh", "classic", "british"],
    thumbnailUrl: bbc2x3("p089sc8j"),
    heroUrl: bbcHero("p089sc8j"),
    duration: "4 Series",
    year: "2007-2024",
    rating: "12+",
    cast: ["James Corden", "Mathew Horne", "Ruth Jones"],
    trending: true,
    personalizedScore: 88
  },
  {
    id: "ip_detectorists",
    title: "Detectorists",
    description: "After a chance encounter, Lance and Andy journey towards the discovery of a lifetime.",
    type: "series",
    genre: ["Comedy", "Drama"],
    tags: ["detectorists", "comedy", "drama", "bbc", "series", "funny", "relaxing", "calm", "british"],
    thumbnailUrl: bbc2x3("p027bhgg"),
    heroUrl: bbcHero("p027bhgg"),
    duration: "3 Series",
    year: "2014-2022",
    rating: "PG",
    cast: ["Mackenzie Crook", "Toby Jones"],
    personalizedScore: 86
  },
  {
    id: "ip_still_game",
    title: "Still Game",
    description: "Jack moves in with his best friend Victor when the old tenant dies.",
    type: "series",
    genre: ["Comedy"],
    tags: ["still game", "comedy", "scottish", "bbc", "series", "funny", "laugh", "classic"],
    thumbnailUrl: bbc2x3("p08d1sxx"),
    heroUrl: bbcHero("p08d1sxx"),
    duration: "9 Series",
    year: "2002-2019",
    rating: "12+"
  },
  {
    id: "ip_dinosaur",
    title: "Dinosaur",
    description: "Nina finds herself with a tough decision to make while working away on the Isle of Wight.",
    type: "series",
    genre: ["Comedy", "Drama"],
    tags: ["dinosaur", "comedy", "drama", "bbc", "series", "funny", "neurodivergent"],
    thumbnailUrl: bbc2x3("p0mxyr3q"),
    heroUrl: bbcHero("p0mxyr3q"),
    duration: "Series 2",
    year: "2025",
    rating: "12+"
  },
  {
    id: "ip_motherland",
    title: "Motherland",
    description: "Julia moves out of her comfort zone when she has a birthday party for her daughter.",
    type: "series",
    genre: ["Comedy"],
    tags: ["motherland", "comedy", "parenting", "bbc", "series", "funny", "laugh", "family"],
    thumbnailUrl: bbc2x3("p0k43stw"),
    heroUrl: bbcHero("p0k43stw"),
    duration: "4 Series",
    year: "2016-2023",
    rating: "12+",
    personalizedScore: 79
  },

  // --- BBC iPlayer: Documentaries ---
  {
    id: "ip_pa_salieu",
    title: "The Trials of Pa Salieu",
    description: "Rapper Pa Salieu returns to the stage after prison, turning a second chance into music.",
    type: "documentary",
    genre: ["Music", "Documentary"],
    tags: ["pa salieu", "music", "documentary", "rapper", "prison", "bbc", "inspiring"],
    thumbnailUrl: bbc2x3("p0n8j37j"),
    heroUrl: bbcHero("p0n8j37j"),
    duration: "1h 00m",
    year: "2026",
    rating: "15+",
    personalizedScore: 77
  },
  {
    id: "ip_just_one",
    title: "Just One Thing",
    description: "Clive Myrie advocates the health benefits of eating fish that are rich in omega-3.",
    type: "documentary",
    genre: ["Health", "Lifestyle"],
    tags: ["health", "lifestyle", "documentary", "bbc", "wellbeing", "food", "relaxing"],
    thumbnailUrl: bbc2x3("p0n7l03j"),
    heroUrl: bbcHero("p0n7l03j"),
    duration: "Series 2",
    year: "2026",
    rating: "U"
  },
  {
    id: "ip_sort_life",
    title: "Sort Your Life Out",
    description: "Stacey and her team meet the Kings, a family with three grown-up kids.",
    type: "series",
    genre: ["Lifestyle", "Entertainment"],
    tags: ["sort your life out", "lifestyle", "home", "stacey solomon", "bbc", "series", "family", "relaxing"],
    thumbnailUrl: bbc2x3("p0n4hxhx"),
    heroUrl: bbcHero("p0n4hxhx"),
    duration: "Series 6",
    year: "2026",
    rating: "U"
  },

  // --- BBC iPlayer: Renovation / Lifestyle ---
  {
    id: "ip_greek_job",
    title: "Amanda & Alan's Greek Job",
    description: "Besties Amanda Holden and Alan Carr roll up their sleeves for a big Greek renovation.",
    type: "series",
    genre: ["Reality", "Lifestyle"],
    tags: ["greek job", "renovation", "amanda holden", "alan carr", "reality", "bbc", "lifestyle"],
    thumbnailUrl: bbc2x3("p0mnx52b"),
    heroUrl: bbcHero("p0mnx52b"),
    duration: "Series 1",
    year: "2025",
    rating: "PG"
  },

  // --- BBC iPlayer: True Crime ---
  {
    id: "ip_outlaws",
    title: "The Outlaws",
    description: "Seven unlikely outlaws are forced together to complete a community payback sentence.",
    type: "series",
    genre: ["Comedy", "Crime", "Drama"],
    tags: ["outlaws", "comedy", "crime", "drama", "bbc", "series", "stephen merchant", "community"],
    thumbnailUrl: bbc2x3("p09z85fc"),
    heroUrl: bbcHero("p09z85fc"),
    duration: "3 Series",
    year: "2021-2024",
    rating: "15+",
    cast: ["Stephen Merchant", "Christopher Walken"],
    personalizedScore: 84
  },

  // --- BBC iPlayer: Classic Comedy ---
  {
    id: "ip_miranda",
    title: "Miranda",
    description: "Miranda gets overexcited by the prospect of her first real date.",
    type: "series",
    genre: ["Comedy"],
    tags: ["miranda", "comedy", "bbc", "series", "funny", "laugh", "classic", "slapstick"],
    thumbnailUrl: bbc2x3("p07s9bzm"),
    heroUrl: bbcHero("p07s9bzm"),
    duration: "3 Series",
    year: "2009-2015",
    rating: "PG",
    cast: ["Miranda Hart", "Tom Ellis"]
  },
  {
    id: "ip_inside_no9",
    title: "Inside No. 9",
    description: "At an engagement party, a bedroom with old baggage in it has been left unlocked...",
    type: "series",
    genre: ["Comedy", "Thriller", "Anthology"],
    tags: ["inside no 9", "comedy", "thriller", "anthology", "bbc", "series", "dark comedy", "twist"],
    thumbnailUrl: bbc2x3("p07jlz3d"),
    heroUrl: bbcHero("p07jlz3d"),
    duration: "9 Series",
    year: "2014-2024",
    rating: "15+",
    cast: ["Steve Pemberton", "Reece Shearsmith"],
    personalizedScore: 92
  },
  {
    id: "ip_outnumbered",
    title: "Outnumbered",
    description: "Comedy series about the daily rollercoaster of life with three young children.",
    type: "series",
    genre: ["Comedy", "Family"],
    tags: ["outnumbered", "comedy", "family", "bbc", "series", "funny", "laugh", "kids", "classic"],
    thumbnailUrl: bbc2x3("p07j4kgt"),
    heroUrl: bbcHero("p07j4kgt"),
    duration: "5 Series",
    year: "2007-2024",
    rating: "PG"
  },

  // --- BBC iPlayer: Sport (16:9 assets) ---
  {
    id: "ip_sport_live1",
    title: "FA Cup Quarter-Final Live",
    description: "Live coverage of the FA Cup Quarter-Final. The road to Wembley continues with four teams battling for a semi-final place.",
    type: "live",
    genre: ["Football", "FA Cup"],
    tags: ["fa cup", "football", "soccer", "live", "sports", "bbc", "quarter final", "exciting"],
    thumbnailUrl: bbc16x9("p0n2sb77"),
    heroUrl: bbcHero("p0n2sb77"),
    duration: "Live",
    year: "2026",
    personalizedScore: 94
  },
  {
    id: "ip_sport_live2",
    title: "Six Nations Rugby Live",
    description: "Live Six Nations Rugby Championship coverage. The biggest teams in European rugby compete for the coveted title.",
    type: "live",
    genre: ["Rugby", "Six Nations"],
    tags: ["six nations", "rugby", "live", "sports", "bbc", "england", "exciting", "international"],
    thumbnailUrl: bbc16x9("p0n52l2y"),
    heroUrl: bbcHero("p0n52l2y"),
    duration: "Live",
    year: "2026",
    personalizedScore: 91
  },
  {
    id: "ip_sport_live3",
    title: "Match of the Day Live",
    description: "Live Premier League football action. All the goals, drama and talking points from today's fixtures.",
    type: "live",
    genre: ["Football", "Premier League"],
    tags: ["match of the day", "motd", "premier league", "football", "soccer", "live", "sports", "bbc", "goals"],
    thumbnailUrl: bbc16x9("p0n64qy1"),
    heroUrl: bbcHero("p0n64qy1"),
    duration: "Live",
    year: "2026",
    personalizedScore: 97
  },
  {
    id: "ip_sport_live4",
    title: "Women's Super League Live",
    description: "Live coverage from the Barclays Women's Super League. Top-flight women's football at its finest.",
    type: "live",
    genre: ["Football", "WSL"],
    tags: ["wsl", "women", "football", "soccer", "live", "sports", "bbc", "barclays", "exciting"],
    thumbnailUrl: bbc16x9("p0n6gwl9"),
    heroUrl: bbcHero("p0n6gwl9"),
    duration: "Live",
    year: "2026"
  },
  {
    id: "ip_sport_live5",
    title: "BBC Sport: Cricket Live",
    description: "Live cricket coverage on the BBC. England take on the touring side in an eagerly anticipated Test match.",
    type: "live",
    genre: ["Cricket", "Test Match"],
    tags: ["cricket", "test match", "england", "live", "sports", "bbc", "summer"],
    thumbnailUrl: bbc16x9("p0n7373d"),
    heroUrl: bbcHero("p0n7373d"),
    duration: "Live",
    year: "2026"
  },
  {
    id: "ip_sport_live6",
    title: "BBC Sport: Athletics Live",
    description: "Live athletics coverage featuring top British athletes competing at the highest level.",
    type: "live",
    genre: ["Athletics", "Track & Field"],
    tags: ["athletics", "track", "field", "running", "live", "sports", "bbc", "olympics"],
    thumbnailUrl: bbc16x9("p0n7k99s"),
    heroUrl: bbcHero("p0n7k99s"),
    duration: "Live",
    year: "2026"
  },

  // --- BBC iPlayer: Sport replays / highlights (16:9) ---
  {
    id: "ip_sport_motd",
    title: "Match of the Day",
    description: "Gary Lineker presents highlights of the day's Premier League action with analysis from top pundits.",
    type: "sport",
    genre: ["Football", "Premier League"],
    tags: ["match of the day", "motd", "premier league", "football", "soccer", "highlights", "sports", "bbc", "gary lineker"],
    thumbnailUrl: bbc16x9("p0n64qy1"),
    heroUrl: bbcHero("p0n64qy1"),
    duration: "1h 20m",
    year: "2026",
    personalizedScore: 93,
    moments: [
      { id: "motd_1", title: "Stunning volley from 25 yards", timestamp: "12:30", thumbnailUrl: bbc16x9("p0n2sb77") },
      { id: "motd_2", title: "Controversial penalty decision", timestamp: "34:15", thumbnailUrl: bbc16x9("p0n52l2y") },
      { id: "motd_3", title: "Last-minute winner", timestamp: "67:45", thumbnailUrl: bbc16x9("p0n7373d") }
    ]
  },
  {
    id: "ip_sport_fa_highlights",
    title: "FA Cup Highlights",
    description: "All the goals, saves and drama from the FA Cup. Relive the best moments from England's most historic cup competition.",
    type: "sport",
    genre: ["Football", "FA Cup"],
    tags: ["fa cup", "football", "soccer", "highlights", "sports", "bbc", "goals", "knockout"],
    thumbnailUrl: bbc16x9("p0n2sb77"),
    heroUrl: bbcHero("p0n2sb77"),
    duration: "1h 00m",
    year: "2026"
  },
  {
    id: "ip_sport_6nations",
    title: "Six Nations Highlights",
    description: "Full highlights from the Six Nations Championship. Every try, conversion and dramatic moment from the weekend's fixtures.",
    type: "sport",
    genre: ["Rugby", "Six Nations"],
    tags: ["six nations", "rugby", "highlights", "sports", "bbc", "tries", "international"],
    thumbnailUrl: bbc16x9("p0n52l2y"),
    heroUrl: bbcHero("p0n52l2y"),
    duration: "50m",
    year: "2026",
    moments: [
      { id: "6n_1", title: "Incredible try from the halfway line", timestamp: "08:20", thumbnailUrl: bbc16x9("p0n6gwl9") },
      { id: "6n_2", title: "Yellow card controversy", timestamp: "23:50", thumbnailUrl: bbc16x9("p0n7k99s") }
    ]
  },
  {
    id: "ip_sport_wsl_highlights",
    title: "WSL Highlights",
    description: "Catch up on all the goals and drama from the Barclays Women's Super League. Every week's best action.",
    type: "sport",
    genre: ["Football", "WSL"],
    tags: ["wsl", "women", "football", "soccer", "highlights", "sports", "bbc"],
    thumbnailUrl: bbc16x9("p0n6gwl9"),
    heroUrl: bbcHero("p0n6gwl9"),
    duration: "45m",
    year: "2026"
  },
  {
    id: "ip_sport_cricket_highlights",
    title: "Cricket Highlights",
    description: "Full highlights from England's Test match. Every wicket, boundary and pivotal moment from the day's play.",
    type: "sport",
    genre: ["Cricket", "Test Match"],
    tags: ["cricket", "test match", "england", "highlights", "sports", "bbc", "wickets"],
    thumbnailUrl: bbc16x9("p0n7373d"),
    heroUrl: bbcHero("p0n7373d"),
    duration: "1h 00m",
    year: "2026"
  },
  {
    id: "ip_sport_athletics_highlights",
    title: "Athletics Championships",
    description: "Highlights from the British Athletics Championships. World-class performances on the track and field.",
    type: "sport",
    genre: ["Athletics", "Track & Field"],
    tags: ["athletics", "track", "field", "running", "highlights", "sports", "bbc", "championships"],
    thumbnailUrl: bbc16x9("p0n7k99s"),
    heroUrl: bbcHero("p0n7k99s"),
    duration: "1h 15m",
    year: "2026"
  },
];

export const SEARCH_CATEGORIES = [
  "Sports", "Movies", "Series", "Live Events", "Documentaries", "Action", "Comedy", "Sci-Fi"
];

export const RECENT_SEARCHES = [
  "Champions League", "F1 highlights", "Action movies", "Sci-fi series", "Tennis finals"
];

export const TRENDING_SEARCHES = [
  "Premier League Live", "The Capture", "Match of the Day", "New Documentaries", "Comedy Specials", "Mo Salah"
];
