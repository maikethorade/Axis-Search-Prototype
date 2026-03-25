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

const ITV_IMAGES = {
  sport_rail: 'https://images.ctfassets.net/zkw1wfs2si3w/RgOMWSnoRR0prUgKQCGjN/ed08ec87f9b0effe9a2f54bf634c3bd0/Rail_for_ITVX.jpg',
  trophy_lift: 'https://images.ctfassets.net/zkw1wfs2si3w/7aE3QxnN6GwdImorjBV1nb/001604cbb0ba8d28277ff5c896f5be49/TROPHY_LIFT_GFX.jpg',
  pen_moment: 'https://images.ctfassets.net/zkw1wfs2si3w/4NS73501RDBdySDzq5cB0P/8b1811922af3147155fbcf459ec76446/pen_winning_moment_gfx.jpg',
  players_celebs: 'https://images.ctfassets.net/zkw1wfs2si3w/3UslthKVJl1alH49p8jDMy/0667bb5d3dccd6d89e52c844aa42abfc/players_celebs_GFX.jpg',
  pundit_reax: 'https://images.ctfassets.net/zkw1wfs2si3w/7MPTgbMf7zq3BGWg2rafiV/fad88aa97bc6c11d1f6975e533add12e/PUNDIT_REAX_FINAL_GFX.jpg',
  russo_goal: 'https://images.ctfassets.net/zkw1wfs2si3w/7n7Q8bH6CApcsRpOMdJY5K/c87db9ae02d25f76b654314bce3859da/RUSSO_EQUALISER_GFX.jpg',
  analysis: 'https://images.ctfassets.net/zkw1wfs2si3w/4IHMFxemzWrfAp0CydPeag/ca99337b50f8117230fddf01f7e03bd1/ANALYSIS_GFX.jpg',
  eng_ivs: 'https://images.ctfassets.net/zkw1wfs2si3w/4tct68dZvF7rd5Ka8pAEPH/52ce802c6a56028cc50b5cde670926ba/ENG_IVS_GFX.jpg',
  barriers: 'https://images.ctfassets.net/zkw1wfs2si3w/2RyGsmvviyh4JlJn1rDbAi/1522d375d5bbbc2785cf1da1c9af66ff/breaking_down_barriers_gfx.jpg',
  wiegman: 'https://images.ctfassets.net/zkw1wfs2si3w/2LrBm9BFsRyqjejiV06Mz0/b6fe525d903e9427bbf901a17e3f9126/WIEGMAN_PRE_GFX.jpg',
  beth_mead: 'https://images.ctfassets.net/zkw1wfs2si3w/64UjnzEFcEj86vbW4HeKmj/bcb82e1b42fb3950e41bc65e4ce8c71c/BETH_MEAD_THUMBNAIL.jpg',
  comm_cam: 'https://images.ctfassets.net/zkw1wfs2si3w/3iCmczPPeeoy9wHwtenLDM/3737efb15b2726d8ecb06d6ce2e1793c/COMM_CAM_GFX.jpg',
  news_bg: 'https://images.ctfassets.net/pjshm78m9jt4/4NHfDls9G3pcVH0MIPFzsJ/f77c7ae20b330630ce4ea1eeef13d31f/news-background.jpg',
  whale: 'https://images.ctfassets.net/pjshm78m9jt4/1ZjmovBBc1H5ONXKwBKWnL/68a3c395daba06774b685458496cf27c/WHALE_ITVX_PAGE_THUMBNAILS.00_00_07_00.Still018.jpg',
  reporting: 'https://images.ctfassets.net/pjshm78m9jt4/2QHVzuVkLEOMstv5sdcOn3/359625d68c6eeda1a645722bd125b3f3/REPORTING_HISTORY_VERT_.jpg',
  weather: 'https://images.ctfassets.net/pjshm78m9jt4/6lDhpGPjDJgFNOK8IN33Ow/28f54bbbc436a6173b246c5ece32fb65/WEATHER_VERTICAL_THUMB.jpg',
  des_scandal: 'https://images.ctfassets.net/pjshm78m9jt4/kKqewPwD48yZcDE476VMw/5959d0f548a780e7051b3f6e04064c17/DES_Scandal_Rail_169.jpg',
  gino: 'https://images.ctfassets.net/pjshm78m9jt4/181RFaG08brQUE69cv9ivS/4f85fbb11369c677be42ae10a86cd228/GINO_PAGE_THUMB_.jpg',
  nazanin: 'https://images.ctfassets.net/pjshm78m9jt4/45pEpySHlMEqyiJ9fB27ig/9b0f9e31fb97016f93b060e07e0187d2/NAZANIN_THUMB.jpg',
  royal: 'https://images.ctfassets.net/pjshm78m9jt4/1WDEM4cAL5WK9mEPddBBw7/f10b50f422d6b9ca7f95fe727927be6d/THUMB_ROYAL_3.jpg',
  ghb: 'https://images.ctfassets.net/pjshm78m9jt4/5XCupn4CdsdfRenCgueSw7/8c5544f22852645821daec340a61b78d/GHB_AGAINST_THE_TIDE_-_THUMBNAIL_02.jpg',
  mi6: 'https://images.ctfassets.net/pjshm78m9jt4/3L2weDzLd6P5WuAOv8rQMU/e394fabdd9d4840c7367a757607cfcb9/NEW_MI6_HORIZ.jpg',
};

const TMDB_POSTERS: Record<string, string> = {
  vera: '/mxENo8tEvN0998PrNidYkN4wGGO.jpg',
  broadchurch: '/pQHLJEOEcKpPpyiIheh47AJ5INS.jpg',
  trigger_point: '/iwX7okUAyokzACVR0XdXJlYOPO.jpg',
  love_island: '/lU3vOX3vFVoVMFx93cD8jkuXCuK.jpg',
  the_chase: '/A2ImFCBhBfEjAetnfVGLJHDJf13.jpg',
  grace: '/tTiUpHt2raPRjEIeFvIh12cRGAt.jpg',
  emmerdale: '/6jqwZVoi3pRD55N4X90orx0iT5l.jpg',
  coronation_street: '/rfLDApdmWzNr2OyoqBZgvB7MppB.jpg',
  masked_singer: '/jUI9GaoCbmi7aHTThjJNkJF98Ov.jpg',
  saturday_takeaway: '/zslUO3icW44iHnwbBZH1rkqMGi3.jpg',
  im_a_celeb: '/lygAk9A7forypGW7H61m3hcalKH.jpg',
  after_the_flood: '/8kZTjHZcvmGo1W53DXM2mjXex2A.jpg',
  midsomer: '/59kecPxxPIO8uwzaRZAOSDE1l80.jpg',
  doc_martin: '/lCXZZt6vIFRu9YRrmGWCR4A0P1f.jpg',
  mcdonald_dodds: '/tJmX6cbc5TxHNQEuLLVFlD3KUEa.jpg',
  downton_abbey: '/lh3fpLrabTkEuJ6rDGaighy1N1C.jpg',
  railway_children: '/zEc6RlZLCAxu3hJvJLbocjMqGLZ.jpg',
};

const ITV_STUDIO_IMAGES = {
  the_heat_portrait: 'https://cdn.prod.website-files.com/65b289a41cea6e729db223d6/69a582a3ee51df880ae0a926_The%20Heat%20portrait.png',
  the_heat_wide: 'https://cdn.prod.website-files.com/65b289a41cea6e729db223d6/69a5bb63b74e663428b5900b_the%20heat%20cropped%20cropped%20.png',
  ai_confidential: 'https://cdn.prod.website-files.com/65b289a41cea6e729db223d6/69c1680d985c7211a8227be6_ai%20confidential%20with%20hannah%20%20copy.png',
  ai_confidential_wide: 'https://cdn.prod.website-files.com/65b289a41cea6e729db223d6/69a5bd873399500a3e916cba_ai%20confidential%20expanded%20image%20for%20CMS.png',
  after_flood_portrait: 'https://cdn.prod.website-files.com/65b289a41cea6e729db223d6/697888f6c41d2f783a2748ba_afterthefloodportraqit.webp',
  after_flood_wide: 'https://cdn.prod.website-files.com/65b289a41cea6e729db223d6/697257dd7b4d5b64726335b3_afterthefloodexpand.webp',
  scripted: 'https://cdn.prod.website-files.com/65b289a41cea6e729db223d6/6654d90b133cc4978680d88c_scripted.webp',
  non_scripted: 'https://cdn.prod.website-files.com/65b289a41cea6e729db223d6/6654d92446cf7613624fc86e_non-scripted.webp',
};

const itv = (key: keyof typeof ITV_IMAGES, w = 640, h = 360) =>
  `${ITV_IMAGES[key]}?w=${w}&h=${h}&fit=fill&fm=jpg&q=80`;

const img = (key: keyof typeof ITV_IMAGES) => itv(key, 640, 360);
const hero = (key: keyof typeof ITV_IMAGES) => itv(key, 1920, 1080);
const thumb = (key: keyof typeof ITV_IMAGES) => itv(key, 400, 225);

const tmdb = (key: keyof typeof TMDB_POSTERS, size: 'w342' | 'w500' | 'w780' | 'original' = 'w500') =>
  `https://image.tmdb.org/t/p/${size}${TMDB_POSTERS[key]}`;

const tmdbImg = (key: keyof typeof TMDB_POSTERS) => tmdb(key, 'w500');
const tmdbHero = (key: keyof typeof TMDB_POSTERS) => tmdb(key, 'original');

export const MOCK_CONTENT: ContentItem[] = [
  {
    id: "s1",
    title: "Champions League: Real Madrid vs Man City",
    description: "The thrilling semi-final clash between two European giants. Watch full match replays and highlights from this dramatic encounter at the Santiago Bernabéu.",
    type: "sport",
    genre: ["Football", "Soccer"],
    tags: ["champions league", "real madrid", "man city", "football", "soccer", "exciting", "thriller", "live", "sports", "match"],
    thumbnailUrl: img("sport_rail"),
    heroUrl: hero("sport_rail"),
    duration: "2h 15m",
    year: "2024",
    trending: true,
    personalizedScore: 98,
    moments: [
      { id: "m1a", title: "Incredible opening goal", timestamp: "12:05", thumbnailUrl: thumb("news_bg") },
      { id: "m1b", title: "VAR Review — Penalty decision", timestamp: "44:30", thumbnailUrl: thumb("pen_moment") },
      { id: "m1c", title: "Last minute dramatic save", timestamp: "89:15", thumbnailUrl: thumb("analysis") },
      { id: "m1d", title: "Post-match celebrations", timestamp: "92:00", thumbnailUrl: thumb("barriers") }
    ]
  },
  {
    id: "m1",
    title: "Downton Abbey: A New Era",
    description: "The Crawley family embark on a grand journey to the South of France to uncover the mystery of the Dowager Countess's newly inherited villa.",
    type: "movie",
    genre: ["Drama", "Period"],
    tags: ["period drama", "downton", "british", "family", "drama", "movie", "costume", "heritage"],
    thumbnailUrl: tmdbImg("downton_abbey"),
    heroUrl: tmdbHero("downton_abbey"),
    duration: "2h 05m",
    year: "2022",
    rating: "PG",
    cast: ["Maggie Smith", "Hugh Bonneville", "Michelle Dockery"],
    trending: true,
    personalizedScore: 85
  },
  {
    id: "s2",
    title: "F1 Grand Prix: Monaco",
    description: "Live coverage from the iconic streets of Monte Carlo. Who will master the tight corners and claim glory at the most prestigious race on the calendar?",
    type: "live",
    genre: ["Motorsport", "Racing"],
    tags: ["f1", "formula 1", "monaco", "racing", "motorsport", "live", "exciting", "fast", "cars", "race"],
    thumbnailUrl: img("pen_moment"),
    heroUrl: hero("pen_moment"),
    duration: "Live",
    year: "2024",
    trending: true,
    personalizedScore: 92,
    moments: [
      { id: "m2a", title: "Dramatic pit stop under safety car", timestamp: "Lap 32", thumbnailUrl: thumb("analysis") },
      { id: "m2b", title: "Overtake at the hairpin", timestamp: "Lap 48", thumbnailUrl: thumb("eng_ivs") }
    ]
  },
  {
    id: "d1",
    title: "Ocean's Echo",
    description: "Dive deep into the unknown parts of the Pacific Ocean and discover species never before seen by human eyes. A breathtaking nature documentary.",
    type: "documentary",
    genre: ["Nature", "Science"],
    tags: ["ocean", "nature", "relaxing", "calm", "science", "water", "deep", "documentary", "marine"],
    thumbnailUrl: img("whale"),
    heroUrl: hero("whale"),
    duration: "1h 45m",
    year: "2023",
    rating: "PG",
    personalizedScore: 70
  },
  {
    id: "se1",
    title: "Vera",
    description: "DCI Vera Stanhope investigates complex crimes across the rugged Northumberland landscape with her loyal colleague DS Aiden Healy.",
    type: "series",
    genre: ["Crime", "Drama"],
    tags: ["crime", "drama", "detective", "murder mystery", "british", "itv", "vera", "northumberland", "investigation"],
    thumbnailUrl: tmdbImg("vera"),
    heroUrl: tmdbHero("vera"),
    duration: "14 Seasons",
    year: "2011-2025",
    rating: "12+",
    cast: ["Brenda Blethyn", "Kenny Doughty"],
    trending: true,
    personalizedScore: 88
  },
  {
    id: "s3",
    title: "NBA Finals: Game 7",
    description: "It all comes down to this. The ultimate showdown for the championship ring in the most electrifying Game 7 in a decade.",
    type: "sport",
    genre: ["Basketball"],
    tags: ["nba", "basketball", "finals", "sports", "exciting", "intense", "game"],
    thumbnailUrl: img("russo_goal"),
    heroUrl: hero("russo_goal"),
    duration: "2h 30m",
    year: "2024",
    personalizedScore: 88,
    moments: [
      { id: "m3a", title: "Buzzer beater three-pointer", timestamp: "119:45", thumbnailUrl: thumb("beth_mead") },
      { id: "m3b", title: "Incredible block at the rim", timestamp: "105:20", thumbnailUrl: thumb("comm_cam") }
    ]
  },
  {
    id: "se2",
    title: "Broadchurch",
    description: "The murder of a young boy in a small coastal town brings a media frenzy that threatens to tear the community apart. Gripping crime drama.",
    type: "series",
    genre: ["Crime", "Drama", "Mystery"],
    tags: ["crime", "drama", "mystery", "detective", "british", "broadchurch", "dorset", "murder", "thriller"],
    thumbnailUrl: tmdbImg("broadchurch"),
    heroUrl: tmdbHero("broadchurch"),
    duration: "3 Seasons",
    year: "2013-2017",
    rating: "15+",
    cast: ["David Tennant", "Olivia Colman"],
    personalizedScore: 90
  },
  {
    id: "s4",
    title: "Wimbledon Men's Final",
    description: "Classic grass court action. An epic 5-set thriller that will go down in tennis history.",
    type: "sport",
    genre: ["Tennis"],
    tags: ["tennis", "wimbledon", "sports", "final", "grass", "exciting", "match"],
    thumbnailUrl: img("eng_ivs"),
    heroUrl: hero("eng_ivs"),
    duration: "4h 10m",
    year: "2023",
    personalizedScore: 75
  },
  {
    id: "se3",
    title: "Trigger Point",
    description: "Bomb disposal operative Lana Washington must use her expert skills to navigate a deadly terrorist campaign targeting London.",
    type: "series",
    genre: ["Thriller", "Drama"],
    tags: ["thriller", "bombs", "london", "action", "drama", "intense", "terrorism", "trigger point", "police"],
    thumbnailUrl: tmdbImg("trigger_point"),
    heroUrl: tmdbHero("trigger_point"),
    duration: "2 Seasons",
    year: "2022-2024",
    rating: "15+",
    cast: ["Vicky McClure", "Adrian Lester"],
    trending: true,
    personalizedScore: 87
  },
  {
    id: "m2",
    title: "The Railway Children Return",
    description: "A group of children are evacuated to a Yorkshire village during WWII, where they encounter a young soldier who, like them, is far from home.",
    type: "movie",
    genre: ["Family", "Drama"],
    tags: ["family", "drama", "british", "wartime", "children", "railway", "adventure", "historical"],
    thumbnailUrl: tmdbImg("railway_children"),
    heroUrl: tmdbHero("railway_children"),
    duration: "1h 38m",
    year: "2022",
    rating: "PG",
    cast: ["Jenny Agutter", "Sheridan Smith", "Tom Courtenay"]
  },
  {
    id: "se4",
    title: "Love Island",
    description: "A group of single contestants couple up in a stunning villa, competing in challenges and facing dramatic recouplings in the pursuit of love and the prize.",
    type: "series",
    genre: ["Reality", "Entertainment"],
    tags: ["reality", "love", "dating", "entertainment", "villa", "love island", "romance", "fun", "couples"],
    thumbnailUrl: tmdbImg("love_island"),
    heroUrl: tmdbHero("love_island"),
    duration: "11 Seasons",
    year: "2015-2025",
    rating: "15+",
    trending: true,
    personalizedScore: 82
  },
  {
    id: "s5",
    title: "Premier League: Arsenal vs Liverpool",
    description: "A top-of-the-table clash between two title contenders. The atmosphere at the Emirates was electric.",
    type: "sport",
    genre: ["Football", "Soccer"],
    tags: ["premier league", "arsenal", "liverpool", "football", "soccer", "sports", "match", "exciting"],
    thumbnailUrl: img("comm_cam"),
    heroUrl: hero("comm_cam"),
    duration: "1h 55m",
    year: "2024",
    trending: true,
    personalizedScore: 95,
    moments: [
      { id: "m5a", title: "Goal from 30 yards", timestamp: "23:15", thumbnailUrl: thumb("trophy_lift") },
      { id: "m5b", title: "Controversial red card", timestamp: "67:00", thumbnailUrl: thumb("pundit_reax") }
    ]
  },
  {
    id: "se5",
    title: "Grace",
    description: "Detective Superintendent Roy Grace uses unconventional methods to solve complex murder cases in and around the city of Brighton.",
    type: "series",
    genre: ["Crime", "Drama"],
    tags: ["crime", "drama", "detective", "brighton", "murder", "grace", "british", "investigation"],
    thumbnailUrl: tmdbImg("grace"),
    heroUrl: tmdbHero("grace"),
    duration: "4 Seasons",
    year: "2021-2024",
    rating: "15+",
    cast: ["John Simm", "Richie Campbell"],
    personalizedScore: 80
  },
  {
    id: "d2",
    title: "AI Confidential",
    description: "An eye-opening investigation into the rapid rise of artificial intelligence and its profound impact on jobs, privacy, and the future of humanity.",
    type: "documentary",
    genre: ["Technology", "Society"],
    tags: ["ai", "technology", "future", "documentary", "society", "educational", "artificial intelligence"],
    thumbnailUrl: ITV_STUDIO_IMAGES.ai_confidential,
    heroUrl: ITV_STUDIO_IMAGES.ai_confidential_wide,
    duration: "1h 35m",
    year: "2025",
    rating: "12+",
    personalizedScore: 68,
    trending: true
  },
  {
    id: "se6",
    title: "The Chase",
    description: "Contestants must pit their general knowledge against one of the ruthless Chasers. Can they outrun the beast and take home the cash?",
    type: "series",
    genre: ["Entertainment", "Game Show"],
    tags: ["quiz", "game show", "entertainment", "the chase", "general knowledge", "fun", "family", "competition"],
    thumbnailUrl: tmdbImg("the_chase"),
    heroUrl: tmdbHero("the_chase"),
    duration: "18 Seasons",
    year: "2009-2025",
    rating: "U",
    cast: ["Bradley Walsh"],
    personalizedScore: 73
  },
  {
    id: "s6",
    title: "Tour de France: Stage 20",
    description: "The penultimate mountain stage through the Alps. A gruelling test of endurance that will decide the yellow jersey.",
    type: "sport",
    genre: ["Cycling"],
    tags: ["cycling", "tour de france", "sports", "alps", "endurance", "race"],
    thumbnailUrl: img("players_celebs"),
    heroUrl: hero("players_celebs"),
    duration: "4h 30m",
    year: "2024"
  },
  {
    id: "se7",
    title: "Coronation Street",
    description: "Life, love, and drama on the most famous cobbled street in the world. Follow the residents of Weatherfield through their ups and downs.",
    type: "series",
    genre: ["Soap", "Drama"],
    tags: ["soap", "drama", "coronation street", "corrie", "family", "community", "british", "weatherfield"],
    thumbnailUrl: tmdbImg("coronation_street"),
    heroUrl: tmdbHero("coronation_street"),
    duration: "Ongoing",
    year: "1960-2025",
    rating: "12+",
    personalizedScore: 72
  },
  {
    id: "s7",
    title: "Olympics: 100m Sprint Final",
    description: "The fastest humans on the planet compete for gold. Sub-10 second performances and raw athletic excellence.",
    type: "sport",
    genre: ["Athletics", "Olympics"],
    tags: ["olympics", "sprint", "athletics", "sports", "exciting", "fast", "gold"],
    thumbnailUrl: img("trophy_lift"),
    heroUrl: hero("trophy_lift"),
    duration: "35m",
    year: "2024",
    personalizedScore: 91,
    moments: [
      { id: "m7a", title: "Photo finish — 9.79 seconds", timestamp: "00:10", thumbnailUrl: thumb("pen_moment") }
    ]
  },
  {
    id: "se8",
    title: "Emmerdale",
    description: "The lives, loves, and dramas of the villagers in the fictional Yorkshire Dales village of Emmerdale.",
    type: "series",
    genre: ["Soap", "Drama"],
    tags: ["soap", "drama", "emmerdale", "yorkshire", "family", "village", "british"],
    thumbnailUrl: tmdbImg("emmerdale"),
    heroUrl: tmdbHero("emmerdale"),
    duration: "Ongoing",
    year: "1972-2025",
    rating: "12+"
  },
  {
    id: "se9",
    title: "The Masked Singer UK",
    description: "Celebrities disguised in elaborate costumes perform for a panel of judges who must guess their identity. Outrageous fun and surprising reveals.",
    type: "series",
    genre: ["Entertainment", "Music"],
    tags: ["entertainment", "singing", "masked singer", "music", "fun", "celebrity", "guessing", "family"],
    thumbnailUrl: tmdbImg("masked_singer"),
    heroUrl: tmdbHero("masked_singer"),
    duration: "6 Seasons",
    year: "2020-2025",
    rating: "U",
    trending: true,
    personalizedScore: 76
  },
  {
    id: "d3",
    title: "The Heat",
    description: "An unflinching look at how rising global temperatures are affecting communities, ecosystems, and the fight for a sustainable future.",
    type: "documentary",
    genre: ["Nature", "Climate"],
    tags: ["climate", "environment", "nature", "documentary", "global warming", "sustainability", "heat"],
    thumbnailUrl: ITV_STUDIO_IMAGES.the_heat_portrait,
    heroUrl: ITV_STUDIO_IMAGES.the_heat_wide,
    duration: "1h 50m",
    year: "2025",
    rating: "PG"
  },
  {
    id: "se10",
    title: "Saturday Night Takeaway",
    description: "Ant & Dec host the ultimate Saturday night variety show packed with surprises, games, pranks, and celebrity guests.",
    type: "series",
    genre: ["Entertainment", "Variety"],
    tags: ["entertainment", "variety", "ant and dec", "saturday night", "fun", "family", "comedy", "games", "pranks"],
    thumbnailUrl: tmdbImg("saturday_takeaway"),
    heroUrl: tmdbHero("saturday_takeaway"),
    duration: "22 Seasons",
    year: "2002-2024",
    rating: "U",
    cast: ["Ant McPartlin", "Declan Donnelly"],
    personalizedScore: 78
  },
  {
    id: "se11",
    title: "I'm A Celebrity... Get Me Out of Here!",
    description: "Celebrities endure jungle trials, bushtucker challenges, and camp life in the Australian outback, all competing to be crowned King or Queen of the Jungle.",
    type: "series",
    genre: ["Reality", "Entertainment"],
    tags: ["reality", "jungle", "celebrity", "im a celeb", "entertainment", "challenges", "australia", "fun"],
    thumbnailUrl: tmdbImg("im_a_celeb"),
    heroUrl: tmdbHero("im_a_celeb"),
    duration: "24 Seasons",
    year: "2002-2025",
    rating: "PG",
    cast: ["Ant McPartlin", "Declan Donnelly"],
    trending: true,
    personalizedScore: 81
  },
  {
    id: "se12",
    title: "After The Flood",
    description: "When devastating floods hit a rural community, secrets long buried are unearthed. A gripping drama exploring loss, resilience, and hidden truths.",
    type: "series",
    genre: ["Drama", "Thriller"],
    tags: ["drama", "thriller", "flood", "community", "secrets", "british", "after the flood", "mystery"],
    thumbnailUrl: tmdbImg("after_the_flood"),
    heroUrl: ITV_STUDIO_IMAGES.after_flood_wide,
    duration: "1 Season",
    year: "2023",
    rating: "15+",
    cast: ["Sophie Rundle", "Jonas Armstrong"],
    personalizedScore: 79
  },
  {
    id: "se13",
    title: "Midsomer Murders",
    description: "DCI John Barnaby investigates the seemingly endless series of murders in the idyllic but deadly villages of Midsomer County.",
    type: "series",
    genre: ["Crime", "Drama", "Mystery"],
    tags: ["crime", "murder mystery", "british", "village", "detective", "midsomer", "cosy", "drama"],
    thumbnailUrl: tmdbImg("midsomer"),
    heroUrl: tmdbHero("midsomer"),
    duration: "24 Seasons",
    year: "1997-2025",
    rating: "12+",
    cast: ["Neil Dudgeon", "Nick Hendrix"],
    personalizedScore: 74
  },
  {
    id: "se14",
    title: "Doc Martin",
    description: "A London surgeon with a newly developed phobia of blood moves to a sleepy Cornish village to work as a GP, with often hilarious consequences.",
    type: "series",
    genre: ["Comedy", "Drama"],
    tags: ["comedy", "drama", "doc martin", "cornwall", "funny", "british", "doctor", "village", "laugh"],
    thumbnailUrl: tmdbImg("doc_martin"),
    heroUrl: tmdbHero("doc_martin"),
    duration: "10 Seasons",
    year: "2004-2022",
    rating: "12+",
    cast: ["Martin Clunes", "Caroline Catz"],
    personalizedScore: 71
  },
  {
    id: "se15",
    title: "McDonald & Dodds",
    description: "An unlikely detective duo — a reserved, overlooked DS and a brash, ambitious DCI — solve murders in the historic city of Bath.",
    type: "series",
    genre: ["Crime", "Drama"],
    tags: ["crime", "detective", "drama", "bath", "british", "mcdonald and dodds", "murder", "mystery"],
    thumbnailUrl: tmdbImg("mcdonald_dodds"),
    heroUrl: tmdbHero("mcdonald_dodds"),
    duration: "3 Seasons",
    year: "2020-2023",
    rating: "12+",
    cast: ["Tala Gouveia", "Jason Watkins"],
    personalizedScore: 75
  },
  {
    id: "s8",
    title: "Rugby World Cup Final",
    description: "The pinnacle of international rugby. Two nations battle for the Webb Ellis Cup in a ferocious contest.",
    type: "sport",
    genre: ["Rugby"],
    tags: ["rugby", "world cup", "sports", "intense", "exciting", "final"],
    thumbnailUrl: img("reporting"),
    heroUrl: hero("reporting"),
    duration: "2h 10m",
    year: "2023"
  },
  {
    id: "d4",
    title: "Nazanin: The True Story",
    description: "The incredible true story of Nazanin Zaghari-Ratcliffe's wrongful detention in Iran and the relentless campaign to bring her home.",
    type: "documentary",
    genre: ["True Story", "Politics"],
    tags: ["true story", "documentary", "iran", "politics", "human rights", "nazanin", "journalism"],
    thumbnailUrl: img("nazanin"),
    heroUrl: hero("nazanin"),
    duration: "1h 28m",
    year: "2024",
    rating: "12+"
  },
  {
    id: "d5",
    title: "Des: The Confession Tapes",
    description: "A chilling true-crime documentary examining the case of serial killer Dennis Nilsen through newly uncovered interview footage.",
    type: "documentary",
    genre: ["True Crime", "Society"],
    tags: ["true crime", "documentary", "crime", "serial killer", "investigation", "des"],
    thumbnailUrl: img("des_scandal"),
    heroUrl: hero("des_scandal"),
    duration: "3 Episodes",
    year: "2023",
    rating: "18+",
    personalizedScore: 77
  },
  {
    id: "m3",
    title: "The Last Stand",
    description: "A retired special forces operative is drawn back into action when his family is targeted by an international crime syndicate.",
    type: "movie",
    genre: ["Action", "Thriller"],
    tags: ["action", "thriller", "military", "crime", "exciting", "intense", "explosive"],
    thumbnailUrl: img("mi6"),
    heroUrl: hero("mi6"),
    duration: "2h 10m",
    year: "2024",
    rating: "15+",
    cast: ["Tom Hardy", "Florence Pugh"],
    personalizedScore: 84,
    trending: true
  },
  {
    id: "s9",
    title: "Australian Open: Women's Final",
    description: "An electrifying showdown under the Melbourne sun. Two titans of women's tennis battle for the first Grand Slam of the year.",
    type: "sport",
    genre: ["Tennis"],
    tags: ["tennis", "australian open", "sports", "match", "exciting", "women"],
    thumbnailUrl: img("wiegman"),
    heroUrl: hero("wiegman"),
    duration: "2h 45m",
    year: "2024"
  },
  {
    id: "s10",
    title: "UFC 305: Championship Fight",
    description: "The main event sees two undefeated fighters clash for the middleweight championship belt in an unforgettable night of combat sports.",
    type: "live",
    genre: ["MMA", "Combat Sports"],
    tags: ["ufc", "mma", "fighting", "sports", "live", "exciting", "intense", "combat"],
    thumbnailUrl: img("beth_mead"),
    heroUrl: hero("beth_mead"),
    duration: "Live",
    year: "2024",
    personalizedScore: 86
  },
  {
    id: "d6",
    title: "Reporting History",
    description: "How broadcast journalism shaped modern Britain. From war correspondents to royal interviews, the stories behind the stories that defined an era.",
    type: "documentary",
    genre: ["History", "Media"],
    tags: ["history", "journalism", "documentary", "media", "britain", "broadcasting", "news"],
    thumbnailUrl: img("reporting"),
    heroUrl: hero("reporting"),
    duration: "4 Episodes",
    year: "2024",
    rating: "PG"
  },
  {
    id: "s11",
    title: "Cricket World Cup Final",
    description: "Two cricketing nations clash in a dramatic final at Lord's. The atmosphere is electric as history is made.",
    type: "sport",
    genre: ["Cricket"],
    tags: ["cricket", "world cup", "sports", "final", "exciting"],
    thumbnailUrl: img("analysis"),
    heroUrl: hero("analysis"),
    duration: "8h",
    year: "2023"
  },
  {
    id: "d7",
    title: "Gino's Italian Escape",
    description: "Celebrity chef Gino D'Acampo takes a culinary road trip through Italy, exploring regional specialities and the people who make them.",
    type: "documentary",
    genre: ["Food", "Travel"],
    tags: ["food", "travel", "cooking", "italy", "gino", "chef", "relaxing", "culture"],
    thumbnailUrl: img("gino"),
    heroUrl: hero("gino"),
    duration: "6 Episodes",
    year: "2024",
    rating: "U",
    cast: ["Gino D'Acampo"]
  },
  {
    id: "se16",
    title: "Coastline Rescue",
    description: "Follow the brave RNLI crews and coastguard teams as they respond to emergencies along Britain's dramatic coastline.",
    type: "series",
    genre: ["Factual", "Reality"],
    tags: ["rescue", "coastguard", "reality", "drama", "sea", "factual", "heroes"],
    thumbnailUrl: img("ghb"),
    heroUrl: hero("ghb"),
    duration: "2 Seasons",
    year: "2023-2024",
    rating: "PG"
  },
  {
    id: "s12",
    title: "Six Nations: England vs France",
    description: "Le Crunch — the fierce rugby rivalry crosses the Channel once more. A physical, tactical battle for Six Nations glory.",
    type: "sport",
    genre: ["Rugby"],
    tags: ["rugby", "six nations", "england", "france", "sports", "exciting"],
    thumbnailUrl: img("pundit_reax"),
    heroUrl: hero("pundit_reax"),
    duration: "2h 05m",
    year: "2024"
  },
  {
    id: "d8",
    title: "The Polar Mission",
    description: "Scientists race against time to study melting ice caps in Antarctica. A sobering look at climate change through breathtaking footage.",
    type: "documentary",
    genre: ["Nature", "Climate"],
    tags: ["arctic", "nature", "climate", "science", "documentary", "ice", "relaxing", "ocean"],
    thumbnailUrl: img("weather"),
    heroUrl: hero("weather"),
    duration: "1h 50m",
    year: "2024",
    rating: "PG"
  },
  {
    id: "se17",
    title: "The Royal Household",
    description: "An unprecedented look behind the gates of Britain's most famous residences. Explore the history, staff, and daily life of the monarchy.",
    type: "series",
    genre: ["Factual", "History"],
    tags: ["royal", "history", "documentary", "britain", "factual", "palace"],
    thumbnailUrl: img("royal"),
    heroUrl: hero("royal"),
    duration: "3 Episodes",
    year: "2024",
    rating: "U"
  },
  {
    id: "s13",
    title: "La Liga: Barcelona vs Atletico Madrid",
    description: "A tactical masterclass between two Spanish giants. Every pass and tackle matters in this pivotal league fixture.",
    type: "sport",
    genre: ["Football", "Soccer"],
    tags: ["la liga", "barcelona", "atletico", "football", "soccer", "sports", "match"],
    thumbnailUrl: img("comm_cam"),
    heroUrl: hero("comm_cam"),
    duration: "2h",
    year: "2024",
    moments: [
      { id: "m13a", title: "Free kick goal from 25 yards", timestamp: "34:20", thumbnailUrl: thumb("trophy_lift") }
    ]
  },
  {
    id: "s14",
    title: "EFL Cup Final: Liverpool vs Chelsea",
    description: "A thrilling Wembley showdown between two Premier League heavyweights battling for the first domestic trophy of the season.",
    type: "sport",
    genre: ["Football", "Soccer"],
    tags: ["efl cup", "liverpool", "chelsea", "football", "soccer", "sports", "final", "wembley"],
    thumbnailUrl: img("russo_goal"),
    heroUrl: hero("russo_goal"),
    duration: "2h 05m",
    year: "2024",
    personalizedScore: 89,
    moments: [
      { id: "m14a", title: "Opening goal header", timestamp: "22:10", thumbnailUrl: thumb("trophy_lift") },
      { id: "m14b", title: "Penalty shootout drama", timestamp: "120:00", thumbnailUrl: thumb("pen_moment") }
    ]
  },
  {
    id: "s15",
    title: "Women's Euro 2025 Qualifiers",
    description: "England Lionesses take on their European rivals in a crucial qualifying match. Can they book their place at the tournament?",
    type: "live",
    genre: ["Football", "Soccer"],
    tags: ["women's football", "euros", "england", "lionesses", "football", "soccer", "sports", "live", "qualifying"],
    thumbnailUrl: img("wiegman"),
    heroUrl: hero("wiegman"),
    duration: "Live",
    year: "2025",
    trending: true,
    personalizedScore: 93,
    moments: [
      { id: "m15a", title: "Beth Mead equaliser", timestamp: "67:30", thumbnailUrl: thumb("beth_mead") }
    ]
  },
  {
    id: "s16",
    title: "International Football Highlights",
    description: "Catch up on all the goals and drama from this week's international fixtures. Every goal, every card, every moment.",
    type: "sport",
    genre: ["Football", "Soccer"],
    tags: ["international", "football", "highlights", "soccer", "sports", "goals"],
    thumbnailUrl: img("eng_ivs"),
    heroUrl: hero("eng_ivs"),
    duration: "45m",
    year: "2025"
  },
  {
    id: "s17",
    title: "Match Analysis: Tactical Breakdown",
    description: "Expert pundits break down the key tactical battles, formations, and pivotal moments from the biggest matches of the week.",
    type: "sport",
    genre: ["Football", "Soccer"],
    tags: ["analysis", "tactics", "football", "soccer", "sports", "pundit"],
    thumbnailUrl: img("pundit_reax"),
    heroUrl: hero("pundit_reax"),
    duration: "30m",
    year: "2025"
  },
  {
    id: "s18",
    title: "Breaking Barriers: Women in Sport",
    description: "A powerful documentary series following female athletes breaking records and challenging conventions across multiple disciplines.",
    type: "documentary",
    genre: ["Sport", "Society"],
    tags: ["women", "sport", "documentary", "inspiring", "athletics", "football", "barriers"],
    thumbnailUrl: img("barriers"),
    heroUrl: hero("barriers"),
    duration: "6 Episodes",
    year: "2024",
    rating: "PG",
    personalizedScore: 77
  },
  {
    id: "d9",
    title: "Our Planet: Hidden Waters",
    description: "Dive beneath the surface of Earth's most remote waterways to discover ecosystems teeming with life and facing unprecedented threats.",
    type: "documentary",
    genre: ["Nature", "Wildlife"],
    tags: ["nature", "ocean", "water", "wildlife", "documentary", "relaxing", "environmental"],
    thumbnailUrl: img("whale"),
    heroUrl: hero("whale"),
    duration: "50m",
    year: "2024",
    rating: "U",
    personalizedScore: 71
  },
  {
    id: "d10",
    title: "Extreme Weather: A Year of Storms",
    description: "From hurricanes to heatwaves, follow meteorologists tracking the most devastating weather events of the year.",
    type: "documentary",
    genre: ["Science", "Nature"],
    tags: ["weather", "science", "nature", "documentary", "climate", "storms"],
    thumbnailUrl: img("weather"),
    heroUrl: hero("weather"),
    duration: "1h 30m",
    year: "2024",
    rating: "PG"
  }
];

export const SEARCH_CATEGORIES = [
  "Sports", "Drama", "Entertainment", "Movies", "Series", "Live Events", "Documentaries", "Comedy", "Crime", "Reality"
];

export const RECENT_SEARCHES = [
  "Champions League", "Vera new series", "Love Island", "Action movies", "The Chase", "Tennis finals"
];

export const TRENDING_SEARCHES = [
  "Premier League Live", "Trigger Point", "I'm A Celebrity", "Broadchurch", "Masked Singer", "Saturday Night Takeaway"
];
