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
  mum_vert: 'https://images.ctfassets.net/pjshm78m9jt4/3xFf4ovBaiGDpu3JGiq6Gy/9466b8e27a0099d9a5044827910373e2/mum_vert.jpg',
  teen_vert: 'https://images.ctfassets.net/pjshm78m9jt4/35aTCvT9fOIHQM4TAOBnFG/35c81a1a624dbbbc914e1093310b710b/TEEN_VERT.jpg',
  golders: 'https://images.ctfassets.net/pjshm78m9jt4/76oGeCIwGFoEcapTvFQU6U/6ae502f1ccbb6f782194a5df4e3898a9/GOLDERS_VERT.jpg',
  peds: 'https://images.ctfassets.net/pjshm78m9jt4/7xHNx9sQNxGbE3fd67S26k/b7afd2deb1150889bee00605c793b401/PEDS_VERT.jpg',
  inflation: 'https://images.ctfassets.net/pjshm78m9jt4/18G0eBSNHv48HUNrrC8ME3/cfa727e14e9cf1d460d98f7ee46c95be/INFLATION_VERT.jpg',
  podcast: 'https://images.ctfassets.net/pjshm78m9jt4/5I1H1eQg5nDeW86AUC46bM/e575eef4092c26e6a4a047e39c64cc75/PODCAST_THUMB__1_.jpg',
  whale: 'https://images.ctfassets.net/pjshm78m9jt4/1ZjmovBBc1H5ONXKwBKWnL/68a3c395daba06774b685458496cf27c/WHALE_ITVX_PAGE_THUMBNAILS.00_00_07_00.Still018.jpg',
  rhumb: 'https://images.ctfassets.net/pjshm78m9jt4/37YAD3tCVTKfJw8fRCuw8P/8382bfe41fda48ce1f256fcbd7e7dae7/ITVX_PORTRAIT_RHUMB.jpg',
  reporting: 'https://images.ctfassets.net/pjshm78m9jt4/2QHVzuVkLEOMstv5sdcOn3/359625d68c6eeda1a645722bd125b3f3/REPORTING_HISTORY_VERT_.jpg',
  weather: 'https://images.ctfassets.net/pjshm78m9jt4/6lDhpGPjDJgFNOK8IN33Ow/28f54bbbc436a6173b246c5ece32fb65/WEATHER_VERTICAL_THUMB.jpg',
  nina_ltn: 'https://images.ctfassets.net/pjshm78m9jt4/2YX35rm3WdQgp1rm4xqciA/c9fa0bee50a7084a551421674bad459e/nina_ltn_vert.png',
  lebanon: 'https://images.ctfassets.net/pjshm78m9jt4/7E1PsZGrdnqh0IsJj1cB1k/7066a7faa7333dc005fbaa2bdb1e6eab/LEBANON_PAGE_THUMB_.jpg',
  page_thumb1: 'https://images.ctfassets.net/pjshm78m9jt4/15kESCAPJ7EUNftxTXBxsC/0f8dae95218bd19e493822aa3ed40ef7/ITVX_PAGE_THUMBNAILS.00_00_02_18.Still006.jpg',
  page_thumb2: 'https://images.ctfassets.net/pjshm78m9jt4/3vwPbfh2QU2mIHKdLcxiQB/598774e0730c567056e3da6b6ed3882b/ITVX_PAGE_THUMBNAILS.00_00_02_23.Still006.jpg',
  westbank: 'https://images.ctfassets.net/pjshm78m9jt4/2fJt4CqGylQvAzj7KgfAVH/0e120bda40611372431e15cd839093a6/thumb_irvine_westbank_2_.jpg',
  youtube1: 'https://images.ctfassets.net/pjshm78m9jt4/5zwtQzBQVnbgM1Tn8wZoWe/875407d7e008bb99abdca9b3c20541a4/YOUTUBE_THUMBNAIL.00_01_24_12.Still022.jpg',
  dg_thumb: 'https://images.ctfassets.net/pjshm78m9jt4/7aatlgUPEB1umqu9acHXDQ/6127858f875dd2eade740ed753d18b8d/THUMB_DG_.jpg',
  iranian: 'https://images.ctfassets.net/pjshm78m9jt4/szkgF0guTVVwAhcPD02Kt/9e7ec9c26f93357222ccc0a468c39197/ITVX_PAGE_IRANIAN_THUMBNAILS.00_00_01_02.Still006.jpg',
  trump: 'https://images.ctfassets.net/pjshm78m9jt4/3FBqsFB1aeWP1E5d8oDpJ9/196d75d1a14dc07bb29e943c6ed16b8e/TRUMP_HORIZ.jpg',
  jesse_jackson: 'https://images.ctfassets.net/pjshm78m9jt4/3IngtKf6U7mbgq3MUfD37q/f3d3ef99a9124d2a246762e9b24ed131/JESSE_JACKSON_-_HORZ_-_THUMB.jpg',
  tortue: 'https://images.ctfassets.net/pjshm78m9jt4/2m7DGUkwp6BhYaFSueE252/a46c359595221863f68d8c1bc911611b/TORTUE_RAIL_THUMB.jpg',
  des_scandal: 'https://images.ctfassets.net/pjshm78m9jt4/kKqewPwD48yZcDE476VMw/5959d0f548a780e7051b3f6e04064c17/DES_Scandal_Rail_169.jpg',
  gino: 'https://images.ctfassets.net/pjshm78m9jt4/181RFaG08brQUE69cv9ivS/4f85fbb11369c677be42ae10a86cd228/GINO_PAGE_THUMB_.jpg',
  mccann: 'https://images.ctfassets.net/pjshm78m9jt4/37zvmuR9mYpptOIn2jew5A/ff2335ddda081d6d07d6dc8feb4396b8/MCCANN_THUMB.jpg',
  page_thumb3: 'https://images.ctfassets.net/pjshm78m9jt4/3HaCHEs727Bc1kX1Q0HehP/6ac6d9ae26ed14c91de272eab652e56d/ITVX_THUMB__1_.jpg',
  addenbrookes: 'https://images.ctfassets.net/pjshm78m9jt4/6xQBwIODuOZzvxIPbzRUKh/0464c54c069505f7657e1df6c5422f5e/ADDENBROOKES.JPEG',
  nazanin: 'https://images.ctfassets.net/pjshm78m9jt4/45pEpySHlMEqyiJ9fB27ig/9b0f9e31fb97016f93b060e07e0187d2/NAZANIN_THUMB.jpg',
  ratings: 'https://images.ctfassets.net/pjshm78m9jt4/qop4tX6x5vN6Eo0RzBgdA/16a787b2a1fbe44008a7bca4aa7392dc/RATINGS_FIX_PAGE_THUMB_.jpg',
  harding: 'https://images.ctfassets.net/pjshm78m9jt4/2NNHdrCnIz17S9d7uU47cx/93e70fbc07c46d772ac5d2b4b2bb14ad/HARDING.jpg',
  mi6: 'https://images.ctfassets.net/pjshm78m9jt4/3L2weDzLd6P5WuAOv8rQMU/e394fabdd9d4840c7367a757607cfcb9/NEW_MI6_HORIZ.jpg',
  ward_thomas: 'https://images.ctfassets.net/pjshm78m9jt4/7oBMrZvYGqFEgTh6G2g40/f1b205b2e7008a8a8731cf0bb17ef84c/WARD_THOMAS_2.jpg',
  bus_driver: 'https://images.ctfassets.net/pjshm78m9jt4/16DRSuYSpXrWpgeatOSt0c/bde931a770a0c563109ac9f02a8b8ace/BUS_DRIVER_THUMBNAIL.jpg',
  royal: 'https://images.ctfassets.net/pjshm78m9jt4/1WDEM4cAL5WK9mEPddBBw7/f10b50f422d6b9ca7f95fe727927be6d/THUMB_ROYAL_3.jpg',
  epstein: 'https://images.ctfassets.net/pjshm78m9jt4/13C2PRrL46GO8CjE6l8i4h/9d682ba1e9114eaa198e8a295cf9dfcd/THUMB_EPSTEIN_3_.jpg',
  ghb: 'https://images.ctfassets.net/pjshm78m9jt4/5XCupn4CdsdfRenCgueSw7/8c5544f22852645821daec340a61b78d/GHB_AGAINST_THE_TIDE_-_THUMBNAIL_02.jpg',
};

const itv = (key: keyof typeof ITV_IMAGES, w = 640, h = 360) =>
  `${ITV_IMAGES[key]}?w=${w}&h=${h}&fit=fill&fm=jpg&q=80`;

const img = (key: keyof typeof ITV_IMAGES) => itv(key, 640, 360);
const hero = (key: keyof typeof ITV_IMAGES) => itv(key, 1920, 1080);
const thumb = (key: keyof typeof ITV_IMAGES) => itv(key, 400, 225);

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
    title: "Neon Horizon",
    description: "In a cyberpunk future, a rogue detective must uncover a conspiracy that threatens the entire city grid. A visually stunning sci-fi thriller.",
    type: "movie",
    genre: ["Action", "Sci-Fi", "Thriller"],
    tags: ["cyberpunk", "detective", "action", "thriller", "exciting", "future", "neon", "sci-fi"],
    thumbnailUrl: img("trophy_lift"),
    heroUrl: hero("trophy_lift"),
    duration: "2h 05m",
    year: "2024",
    rating: "18+",
    cast: ["Elena Rostova", "Marcus Chen", "David Park"],
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
      { id: "m2a", title: "Dramatic pit stop under safety car", timestamp: "Lap 32", thumbnailUrl: thumb("mum_vert") },
      { id: "m2b", title: "Overtake at the hairpin", timestamp: "Lap 48", thumbnailUrl: thumb("teen_vert") }
    ]
  },
  {
    id: "d1",
    title: "Ocean's Echo",
    description: "Dive deep into the unknown parts of the Pacific Ocean and discover species never before seen by human eyes. A breathtaking nature documentary.",
    type: "documentary",
    genre: ["Nature", "Science"],
    tags: ["ocean", "nature", "relaxing", "calm", "science", "water", "deep", "documentary", "marine"],
    thumbnailUrl: img("players_celebs"),
    heroUrl: hero("players_celebs"),
    duration: "1h 45m",
    year: "2023",
    rating: "PG",
    personalizedScore: 70
  },
  {
    id: "se1",
    title: "The Court",
    description: "Behind closed doors, a high-profile legal firm handles cases that shape the nation's future. Gripping courtroom drama with twists at every turn.",
    type: "series",
    genre: ["Drama", "Legal"],
    tags: ["drama", "law", "court", "intense", "series", "lawyer", "legal"],
    thumbnailUrl: img("pundit_reax"),
    heroUrl: hero("pundit_reax"),
    duration: "3 Seasons",
    year: "2021-2024",
    rating: "15+",
    cast: ["Sarah Mitchell", "James Okafor"],
    trending: true,
    personalizedScore: 78
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
    id: "m2",
    title: "Silent Peaks",
    description: "A solo climber attempts the impossible on the world's most dangerous mountain face. A story of human endurance against nature's fury.",
    type: "movie",
    genre: ["Adventure", "Drama"],
    tags: ["mountain", "climbing", "adventure", "snow", "intense", "survival"],
    thumbnailUrl: img("analysis"),
    heroUrl: hero("analysis"),
    duration: "1h 55m",
    year: "2023",
    rating: "12+",
    cast: ["Anna Larsson"]
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
    id: "d2",
    title: "Cosmic Origins",
    description: "Journey to the edge of the universe to understand how stars are born and galaxies form. Narrated with awe-inspiring visuals.",
    type: "documentary",
    genre: ["Space", "Science"],
    tags: ["space", "stars", "universe", "science", "relaxing", "educational", "documentary", "cosmos"],
    thumbnailUrl: img("barriers"),
    heroUrl: hero("barriers"),
    duration: "1h 20m",
    year: "2024",
    personalizedScore: 65
  },
  {
    id: "m3",
    title: "Midnight Drive",
    description: "An underground getaway driver gets pulled into a heist that goes terribly wrong. Non-stop action from start to finish.",
    type: "movie",
    genre: ["Action", "Crime"],
    tags: ["cars", "driving", "action", "heist", "crime", "exciting", "thriller", "fast"],
    thumbnailUrl: img("wiegman"),
    heroUrl: hero("wiegman"),
    duration: "1h 48m",
    year: "2022",
    rating: "15+",
    cast: ["Rico Alvarez", "Maya Knight"],
    trending: true,
    personalizedScore: 82
  },
  {
    id: "se2",
    title: "Signal Lost",
    description: "When a deep-space communication relay goes dark, a crew of engineers must travel to the edge of the solar system to find out why.",
    type: "series",
    genre: ["Sci-Fi", "Thriller"],
    tags: ["space", "sci-fi", "thriller", "exciting", "mystery", "series", "future"],
    thumbnailUrl: img("beth_mead"),
    heroUrl: hero("beth_mead"),
    duration: "2 Seasons",
    year: "2023-2024",
    rating: "15+",
    cast: ["Kenji Tanaka", "Zara Ahmed"],
    personalizedScore: 90
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
      { id: "m5a", title: "Goal from 30 yards", timestamp: "23:15", thumbnailUrl: thumb("whale") },
      { id: "m5b", title: "Controversial red card", timestamp: "67:00", thumbnailUrl: thumb("reporting") }
    ]
  },
  {
    id: "m4",
    title: "The Last Heist",
    description: "A retired thief is forced back into action for one final job. But nothing is as it seems in this twisting crime saga.",
    type: "movie",
    genre: ["Crime", "Thriller"],
    tags: ["heist", "crime", "thriller", "action", "exciting", "twist"],
    thumbnailUrl: img("news_bg"),
    heroUrl: hero("news_bg"),
    duration: "2h 12m",
    year: "2024",
    rating: "15+",
    cast: ["Robert Kane", "Lisa Park", "Omar Hassan"],
    personalizedScore: 80
  },
  {
    id: "d3",
    title: "Planet Earth: The Hidden Valleys",
    description: "Explore the most remote valleys on Earth, home to creatures and ecosystems untouched by civilisation.",
    type: "documentary",
    genre: ["Nature", "Wildlife"],
    tags: ["nature", "wildlife", "relaxing", "calm", "earth", "documentary", "animals"],
    thumbnailUrl: img("mum_vert"),
    heroUrl: hero("mum_vert"),
    duration: "50m",
    year: "2024",
    rating: "U",
    personalizedScore: 72
  },
  {
    id: "se3",
    title: "Breaking Point",
    description: "A gripping psychological thriller following a detective who starts to question her own reality while investigating a series of connected disappearances.",
    type: "series",
    genre: ["Thriller", "Mystery"],
    tags: ["thriller", "mystery", "detective", "intense", "series", "psychological"],
    thumbnailUrl: img("teen_vert"),
    heroUrl: hero("teen_vert"),
    duration: "1 Season",
    year: "2024",
    rating: "18+",
    cast: ["Clara Stone"],
    trending: true,
    personalizedScore: 87
  },
  {
    id: "s6",
    title: "Tour de France: Stage 20",
    description: "The penultimate mountain stage through the Alps. A gruelling test of endurance that will decide the yellow jersey.",
    type: "sport",
    genre: ["Cycling"],
    tags: ["cycling", "tour de france", "sports", "alps", "endurance", "race"],
    thumbnailUrl: img("golders"),
    heroUrl: hero("golders"),
    duration: "4h 30m",
    year: "2024"
  },
  {
    id: "m5",
    title: "Ember",
    description: "After a devastating wildfire, a community must come together to rebuild — but old secrets threaten to tear them apart.",
    type: "movie",
    genre: ["Drama"],
    tags: ["drama", "community", "fire", "emotional", "rebuilding"],
    thumbnailUrl: img("peds"),
    heroUrl: hero("peds"),
    duration: "1h 58m",
    year: "2023",
    rating: "12+",
    cast: ["Nina Brooks", "Sam Torres"]
  },
  {
    id: "s7",
    title: "Olympics: 100m Sprint Final",
    description: "The fastest humans on the planet compete for gold. Sub-10 second performances and raw athletic excellence.",
    type: "sport",
    genre: ["Athletics", "Olympics"],
    tags: ["olympics", "sprint", "athletics", "sports", "exciting", "fast", "gold"],
    thumbnailUrl: img("inflation"),
    heroUrl: hero("inflation"),
    duration: "35m",
    year: "2024",
    personalizedScore: 91,
    moments: [
      { id: "m7a", title: "Photo finish — 9.79 seconds", timestamp: "00:10", thumbnailUrl: thumb("peds") }
    ]
  },
  {
    id: "se4",
    title: "Kitchen Wars",
    description: "Celebrity chefs face off in intense culinary battles. High stakes, creative dishes, and dramatic eliminations.",
    type: "series",
    genre: ["Reality", "Food"],
    tags: ["cooking", "food", "comedy", "fun", "reality", "chef", "laugh"],
    thumbnailUrl: img("podcast"),
    heroUrl: hero("podcast"),
    duration: "5 Seasons",
    year: "2019-2024",
    rating: "PG"
  },
  {
    id: "d4",
    title: "The Algorithm",
    description: "How artificial intelligence is reshaping every aspect of modern life — from what we watch to how we vote.",
    type: "documentary",
    genre: ["Technology", "Society"],
    tags: ["ai", "technology", "future", "documentary", "society", "educational"],
    thumbnailUrl: img("whale"),
    heroUrl: hero("whale"),
    duration: "1h 35m",
    year: "2024",
    rating: "12+",
    personalizedScore: 68
  },
  {
    id: "m6",
    title: "Velocity",
    description: "Two rival street racers must team up to take down a corrupt racing syndicate that controls the underground circuit.",
    type: "movie",
    genre: ["Action", "Racing"],
    tags: ["cars", "racing", "action", "exciting", "fast", "thriller", "speed"],
    thumbnailUrl: img("rhumb"),
    heroUrl: hero("rhumb"),
    duration: "1h 52m",
    year: "2024",
    rating: "15+",
    cast: ["Jack Reeves", "Mei Lin"],
    personalizedScore: 76
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
    id: "se5",
    title: "Echoes",
    description: "Identical twins have secretly been swapping lives since they were teenagers. But when one goes missing, the truth starts to unravel.",
    type: "series",
    genre: ["Thriller", "Drama"],
    tags: ["twins", "mystery", "thriller", "drama", "series", "twist", "intense"],
    thumbnailUrl: img("weather"),
    heroUrl: hero("weather"),
    duration: "1 Season",
    year: "2024",
    rating: "15+",
    cast: ["Emma Cross", "Emma Cross"],
    personalizedScore: 83
  },
  {
    id: "m7",
    title: "Frost",
    description: "An Arctic research team discovers something beneath the ice that was never meant to be found. Sci-fi horror at its chilling best.",
    type: "movie",
    genre: ["Sci-Fi", "Horror"],
    tags: ["arctic", "horror", "sci-fi", "thriller", "cold", "scary", "exciting"],
    thumbnailUrl: img("nina_ltn"),
    heroUrl: hero("nina_ltn"),
    duration: "1h 42m",
    year: "2024",
    rating: "18+",
    cast: ["Dr. Alex Foster", "Yuki Ito"]
  },
  {
    id: "d5",
    title: "Serengeti: Circle of Life",
    description: "Follow the great migration across the African plains. Lions, elephants, and wildebeest in their most dramatic natural spectacle.",
    type: "documentary",
    genre: ["Nature", "Wildlife"],
    tags: ["africa", "wildlife", "nature", "relaxing", "animals", "documentary", "migration"],
    thumbnailUrl: img("lebanon"),
    heroUrl: hero("lebanon"),
    duration: "55m",
    year: "2023",
    rating: "U"
  },
  {
    id: "s9",
    title: "Australian Open: Women's Final",
    description: "An electrifying showdown under the Melbourne sun. Two titans of women's tennis battle for the first Grand Slam of the year.",
    type: "sport",
    genre: ["Tennis"],
    tags: ["tennis", "australian open", "sports", "match", "exciting", "women"],
    thumbnailUrl: img("page_thumb1"),
    heroUrl: hero("page_thumb1"),
    duration: "2h 45m",
    year: "2024"
  },
  {
    id: "m8",
    title: "The Informant",
    description: "A journalist infiltrates a powerful cartel, but when her cover is blown, she must fight to survive and get the story out.",
    type: "movie",
    genre: ["Thriller", "Crime"],
    tags: ["journalist", "thriller", "crime", "intense", "undercover", "action"],
    thumbnailUrl: img("page_thumb2"),
    heroUrl: hero("page_thumb2"),
    duration: "2h 01m",
    year: "2024",
    rating: "18+",
    cast: ["Sofia Vega"]
  },
  {
    id: "se6",
    title: "Laugh Track",
    description: "A behind-the-scenes comedy about the writers' room of a failing late-night talk show desperately trying to stay relevant.",
    type: "series",
    genre: ["Comedy"],
    tags: ["comedy", "funny", "laugh", "tv show", "behind the scenes", "fun"],
    thumbnailUrl: img("westbank"),
    heroUrl: hero("westbank"),
    duration: "2 Seasons",
    year: "2023-2024",
    rating: "12+",
    cast: ["Tim Baker", "Priya Kapoor"]
  },
  {
    id: "s10",
    title: "UFC 305: Championship Fight",
    description: "The main event sees two undefeated fighters clash for the middleweight championship belt in an unforgettable night of combat sports.",
    type: "live",
    genre: ["MMA", "Combat Sports"],
    tags: ["ufc", "mma", "fighting", "sports", "live", "exciting", "intense", "combat"],
    thumbnailUrl: img("youtube1"),
    heroUrl: hero("youtube1"),
    duration: "Live",
    year: "2024",
    personalizedScore: 86
  },
  {
    id: "d6",
    title: "Inside the Machine",
    description: "A rare look inside the world's most advanced particle accelerator and the scientists trying to unlock the secrets of the universe.",
    type: "documentary",
    genre: ["Science", "Technology"],
    tags: ["science", "physics", "documentary", "educational", "technology", "universe"],
    thumbnailUrl: img("dg_thumb"),
    heroUrl: hero("dg_thumb"),
    duration: "1h 28m",
    year: "2024",
    rating: "PG"
  },
  {
    id: "m9",
    title: "Glass Tower",
    description: "A hostage situation in the world's tallest building. One security guard. Forty floors of danger. An explosive action spectacle.",
    type: "movie",
    genre: ["Action", "Thriller"],
    tags: ["action", "thriller", "exciting", "building", "hostage", "explosive", "intense"],
    thumbnailUrl: img("iranian"),
    heroUrl: hero("iranian"),
    duration: "2h 08m",
    year: "2024",
    rating: "15+",
    cast: ["Marcus Webb", "Chen Yi"],
    personalizedScore: 79
  },
  {
    id: "se7",
    title: "Homestead",
    description: "Three families attempt to live completely off-grid in the Scottish Highlands. A heartwarming and sometimes hilarious reality series.",
    type: "series",
    genre: ["Reality", "Nature"],
    tags: ["reality", "nature", "relaxing", "scotland", "family", "calm", "off-grid"],
    thumbnailUrl: img("trump"),
    heroUrl: hero("trump"),
    duration: "1 Season",
    year: "2024",
    rating: "U"
  },
  {
    id: "s11",
    title: "Cricket World Cup Final",
    description: "Two cricketing nations clash in a dramatic final at Lord's. The atmosphere is electric as history is made.",
    type: "sport",
    genre: ["Cricket"],
    tags: ["cricket", "world cup", "sports", "final", "exciting"],
    thumbnailUrl: img("jesse_jackson"),
    heroUrl: hero("jesse_jackson"),
    duration: "8h",
    year: "2023"
  },
  {
    id: "m10",
    title: "Whisper",
    description: "A hearing-impaired woman discovers she can hear ghostly whispers from the walls of her new apartment. A slow-burn supernatural thriller.",
    type: "movie",
    genre: ["Horror", "Supernatural"],
    tags: ["horror", "supernatural", "thriller", "scary", "mystery"],
    thumbnailUrl: img("tortue"),
    heroUrl: hero("tortue"),
    duration: "1h 36m",
    year: "2024",
    rating: "15+",
    cast: ["Rose Kim"]
  },
  {
    id: "d7",
    title: "Flavours of the World",
    description: "A culinary journey through six continents, exploring how food defines culture, identity, and community.",
    type: "documentary",
    genre: ["Food", "Travel"],
    tags: ["food", "travel", "cooking", "culture", "relaxing", "documentary"],
    thumbnailUrl: img("des_scandal"),
    heroUrl: hero("des_scandal"),
    duration: "6 Episodes",
    year: "2024",
    rating: "U"
  },
  {
    id: "se8",
    title: "Dark Frequency",
    description: "A podcast host investigating urban legends starts receiving calls from something that shouldn't exist. Horror anthology series.",
    type: "series",
    genre: ["Horror", "Anthology"],
    tags: ["horror", "podcast", "scary", "thriller", "supernatural", "series", "mystery"],
    thumbnailUrl: img("gino"),
    heroUrl: hero("gino"),
    duration: "1 Season",
    year: "2024",
    rating: "18+"
  },
  {
    id: "s12",
    title: "Six Nations: England vs France",
    description: "Le Crunch — the fierce rugby rivalry crosses the Channel once more. A physical, tactical battle for Six Nations glory.",
    type: "sport",
    genre: ["Rugby"],
    tags: ["rugby", "six nations", "england", "france", "sports", "exciting"],
    thumbnailUrl: img("mccann"),
    heroUrl: hero("mccann"),
    duration: "2h 05m",
    year: "2024"
  },
  {
    id: "m11",
    title: "Starbound",
    description: "A family of space colonists must survive when their generation ship suffers a catastrophic malfunction halfway to their new home.",
    type: "movie",
    genre: ["Sci-Fi", "Adventure"],
    tags: ["space", "sci-fi", "adventure", "family", "survival", "future", "stars"],
    thumbnailUrl: img("page_thumb3"),
    heroUrl: hero("page_thumb3"),
    duration: "2h 22m",
    year: "2024",
    rating: "12+",
    cast: ["Dr. Lisa Okafor", "Ben Carter", "Maya Carter"],
    personalizedScore: 74
  },
  {
    id: "se9",
    title: "Stand Up: Raw",
    description: "The funniest comedians performing their most daring, uncensored sets in intimate venues across the globe.",
    type: "series",
    genre: ["Comedy", "Stand-Up"],
    tags: ["comedy", "funny", "laugh", "stand-up", "live", "fun"],
    thumbnailUrl: img("addenbrookes"),
    heroUrl: hero("addenbrookes"),
    duration: "3 Seasons",
    year: "2022-2024",
    rating: "18+"
  },
  {
    id: "d8",
    title: "The Polar Mission",
    description: "Scientists race against time to study melting ice caps in Antarctica. A sobering look at climate change through breathtaking footage.",
    type: "documentary",
    genre: ["Nature", "Climate"],
    tags: ["arctic", "nature", "climate", "science", "documentary", "ice", "relaxing", "ocean"],
    thumbnailUrl: img("nazanin"),
    heroUrl: hero("nazanin"),
    duration: "1h 50m",
    year: "2024",
    rating: "PG"
  },
  {
    id: "s13",
    title: "La Liga: Barcelona vs Atletico Madrid",
    description: "A tactical masterclass between two Spanish giants. Every pass and tackle matters in this pivotal league fixture.",
    type: "sport",
    genre: ["Football", "Soccer"],
    tags: ["la liga", "barcelona", "atletico", "football", "soccer", "sports", "match"],
    thumbnailUrl: img("lebanon"),
    heroUrl: hero("lebanon"),
    duration: "2h",
    year: "2024",
    moments: [
      { id: "m13a", title: "Free kick goal from 25 yards", timestamp: "34:20", thumbnailUrl: thumb("westbank") }
    ]
  },
  {
    id: "m12",
    title: "Last Light",
    description: "When the sun begins to die 500 years early, humanity has one chance to ignite it back to life. An epic sci-fi drama.",
    type: "movie",
    genre: ["Sci-Fi", "Drama"],
    tags: ["space", "sci-fi", "drama", "sun", "survival", "future", "epic"],
    thumbnailUrl: img("sport_rail"),
    heroUrl: hero("sport_rail"),
    duration: "2h 35m",
    year: "2024",
    rating: "12+",
    cast: ["James Adler", "Nora Svensen", "Dr. Raj Patel"]
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
    id: "se10",
    title: "The Investigation",
    description: "A gripping true-crime drama based on real events. A detective pieces together evidence in a case that shocked the nation.",
    type: "series",
    genre: ["Crime", "Drama"],
    tags: ["crime", "drama", "investigation", "detective", "series", "true crime", "intense"],
    thumbnailUrl: img("des_scandal"),
    heroUrl: hero("des_scandal"),
    duration: "4 Episodes",
    year: "2024",
    rating: "15+",
    cast: ["David Morrissey", "Keeley Hawes"],
    trending: true,
    personalizedScore: 88
  },
  {
    id: "se11",
    title: "Coastline Rescue",
    description: "Follow the brave RNLI crews and coastguard teams as they respond to emergencies along Britain's dramatic coastline.",
    type: "series",
    genre: ["Factual", "Reality"],
    tags: ["rescue", "coastguard", "reality", "drama", "sea", "factual", "heroes"],
    thumbnailUrl: img("whale"),
    heroUrl: hero("whale"),
    duration: "2 Seasons",
    year: "2023-2024",
    rating: "PG"
  },
  {
    id: "d9",
    title: "Our Planet: Hidden Waters",
    description: "Dive beneath the surface of Earth's most remote waterways to discover ecosystems teeming with life and facing unprecedented threats.",
    type: "documentary",
    genre: ["Nature", "Wildlife"],
    tags: ["nature", "ocean", "water", "wildlife", "documentary", "relaxing", "environmental"],
    thumbnailUrl: img("ghb"),
    heroUrl: hero("ghb"),
    duration: "50m",
    year: "2024",
    rating: "U",
    personalizedScore: 71
  },
  {
    id: "m13",
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
    personalizedScore: 84
  },
  {
    id: "se12",
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
  "Sports", "Movies", "Series", "Live Events", "Documentaries", "Action", "Comedy", "Sci-Fi"
];

export const RECENT_SEARCHES = [
  "Champions League", "F1 highlights", "Action movies", "Sci-fi series", "Tennis finals"
];

export const TRENDING_SEARCHES = [
  "Premier League Live", "Neon Horizon", "Basketball Finals", "New Documentaries", "Comedy Specials", "Olympics highlights"
];
