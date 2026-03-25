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

const axisImg = (imageId: number, w = 640, h = 360) =>
  `https://stable.axisstatic.com/api/shain/v1/dataservice/ResizeImage/%24value?Format=%27jpg%27&Quality=75&ImageId=%27${imageId}%27&EntityType=%27Item%27&EntityId=%272089%27&Width=${w}&Height=${h}&ResizeAction=%27fill%27`;

const img = (imageId: number) => axisImg(imageId, 640, 360);
const hero = (imageId: number) => axisImg(imageId, 1920, 1080);
const thumb = (imageId: number) => axisImg(imageId, 400, 225);

export const MOCK_CONTENT: ContentItem[] = [
  {
    id: "s1",
    title: "Champions League: Real Madrid vs Man City",
    description: "The thrilling semi-final clash between two European giants. Watch full match replays and highlights from this dramatic encounter at the Santiago Bernabéu.",
    type: "sport",
    genre: ["Football", "Soccer"],
    tags: ["champions league", "real madrid", "man city", "football", "soccer", "exciting", "thriller", "live", "sports", "match"],
    thumbnailUrl: img(134317),
    heroUrl: hero(134317),
    duration: "2h 15m",
    year: "2024",
    trending: true,
    personalizedScore: 98,
    moments: [
      { id: "m1a", title: "Incredible opening goal", timestamp: "12:05", thumbnailUrl: thumb(134300) },
      { id: "m1b", title: "VAR Review — Penalty decision", timestamp: "44:30", thumbnailUrl: thumb(134310) },
      { id: "m1c", title: "Last minute dramatic save", timestamp: "89:15", thumbnailUrl: thumb(134325) },
      { id: "m1d", title: "Post-match celebrations", timestamp: "92:00", thumbnailUrl: thumb(134335) }
    ]
  },
  {
    id: "m1",
    title: "Neon Horizon",
    description: "In a cyberpunk future, a rogue detective must uncover a conspiracy that threatens the entire city grid. A visually stunning sci-fi thriller.",
    type: "movie",
    genre: ["Action", "Sci-Fi", "Thriller"],
    tags: ["cyberpunk", "detective", "action", "thriller", "exciting", "future", "neon", "sci-fi"],
    thumbnailUrl: img(134305),
    heroUrl: hero(134305),
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
    thumbnailUrl: img(134310),
    heroUrl: hero(134310),
    duration: "Live",
    year: "2024",
    trending: true,
    personalizedScore: 92,
    moments: [
      { id: "m2a", title: "Dramatic pit stop under safety car", timestamp: "Lap 32", thumbnailUrl: thumb(427680) },
      { id: "m2b", title: "Overtake at the hairpin", timestamp: "Lap 48", thumbnailUrl: thumb(427685) }
    ]
  },
  {
    id: "d1",
    title: "Ocean's Echo",
    description: "Dive deep into the unknown parts of the Pacific Ocean and discover species never before seen by human eyes. A breathtaking nature documentary.",
    type: "documentary",
    genre: ["Nature", "Science"],
    tags: ["ocean", "nature", "relaxing", "calm", "science", "water", "deep", "documentary", "marine"],
    thumbnailUrl: img(134315),
    heroUrl: hero(134315),
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
    thumbnailUrl: img(134318),
    heroUrl: hero(134318),
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
    thumbnailUrl: img(134320),
    heroUrl: hero(134320),
    duration: "2h 30m",
    year: "2024",
    personalizedScore: 88,
    moments: [
      { id: "m3a", title: "Buzzer beater three-pointer", timestamp: "119:45", thumbnailUrl: thumb(134345) },
      { id: "m3b", title: "Incredible block at the rim", timestamp: "105:20", thumbnailUrl: thumb(134350) }
    ]
  },
  {
    id: "m2",
    title: "Silent Peaks",
    description: "A solo climber attempts the impossible on the world's most dangerous mountain face. A story of human endurance against nature's fury.",
    type: "movie",
    genre: ["Adventure", "Drama"],
    tags: ["mountain", "climbing", "adventure", "snow", "intense", "survival"],
    thumbnailUrl: img(134325),
    heroUrl: hero(134325),
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
    thumbnailUrl: img(134330),
    heroUrl: hero(134330),
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
    thumbnailUrl: img(134335),
    heroUrl: hero(134335),
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
    thumbnailUrl: img(134340),
    heroUrl: hero(134340),
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
    thumbnailUrl: img(134345),
    heroUrl: hero(134345),
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
    thumbnailUrl: img(134350),
    heroUrl: hero(134350),
    duration: "1h 55m",
    year: "2024",
    trending: true,
    personalizedScore: 95,
    moments: [
      { id: "m5a", title: "Goal from 30 yards", timestamp: "23:15", thumbnailUrl: thumb(641900) },
      { id: "m5b", title: "Controversial red card", timestamp: "67:00", thumbnailUrl: thumb(641905) }
    ]
  },
  {
    id: "m4",
    title: "The Last Heist",
    description: "A retired thief is forced back into action for one final job. But nothing is as it seems in this twisting crime saga.",
    type: "movie",
    genre: ["Crime", "Thriller"],
    tags: ["heist", "crime", "thriller", "action", "exciting", "twist"],
    thumbnailUrl: img(134300),
    heroUrl: hero(134300),
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
    thumbnailUrl: img(427680),
    heroUrl: hero(427680),
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
    thumbnailUrl: img(427685),
    heroUrl: hero(427685),
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
    thumbnailUrl: img(427690),
    heroUrl: hero(427690),
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
    thumbnailUrl: img(427693),
    heroUrl: hero(427693),
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
    thumbnailUrl: img(427695),
    heroUrl: hero(427695),
    duration: "35m",
    year: "2024",
    personalizedScore: 91,
    moments: [
      { id: "m7a", title: "Photo finish — 9.79 seconds", timestamp: "00:10", thumbnailUrl: thumb(427693) }
    ]
  },
  {
    id: "se4",
    title: "Kitchen Wars",
    description: "Celebrity chefs face off in intense culinary battles. High stakes, creative dishes, and dramatic eliminations.",
    type: "series",
    genre: ["Reality", "Food"],
    tags: ["cooking", "food", "comedy", "fun", "reality", "chef", "laugh"],
    thumbnailUrl: img(427700),
    heroUrl: hero(427700),
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
    thumbnailUrl: img(641900),
    heroUrl: hero(641900),
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
    thumbnailUrl: img(641901),
    heroUrl: hero(641901),
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
    thumbnailUrl: img(641905),
    heroUrl: hero(641905),
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
    thumbnailUrl: img(641910),
    heroUrl: hero(641910),
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
    thumbnailUrl: img(1103950),
    heroUrl: hero(1103950),
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
    thumbnailUrl: img(1103955),
    heroUrl: hero(1103955),
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
    thumbnailUrl: img(1103960),
    heroUrl: hero(1103960),
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
    thumbnailUrl: img(1103965),
    heroUrl: hero(1103965),
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
    thumbnailUrl: img(1103970),
    heroUrl: hero(1103970),
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
    thumbnailUrl: img(1197700),
    heroUrl: hero(1197700),
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
    thumbnailUrl: img(1197710),
    heroUrl: hero(1197710),
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
    thumbnailUrl: img(1197714),
    heroUrl: hero(1197714),
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
    thumbnailUrl: img(1197720),
    heroUrl: hero(1197720),
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
    thumbnailUrl: img(1377180),
    heroUrl: hero(1377180),
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
    thumbnailUrl: img(1377185),
    heroUrl: hero(1377185),
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
    thumbnailUrl: img(1377190),
    heroUrl: hero(1377190),
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
    thumbnailUrl: img(1377195),
    heroUrl: hero(1377195),
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
    thumbnailUrl: img(1595570),
    heroUrl: hero(1595570),
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
    thumbnailUrl: img(1595575),
    heroUrl: hero(1595575),
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
    thumbnailUrl: img(1595580),
    heroUrl: hero(1595580),
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
    thumbnailUrl: img(138197),
    heroUrl: hero(138197),
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
    thumbnailUrl: img(1103955),
    heroUrl: hero(1103955),
    duration: "2h",
    year: "2024",
    moments: [
      { id: "m13a", title: "Free kick goal from 25 yards", timestamp: "34:20", thumbnailUrl: thumb(1103970) }
    ]
  },
  {
    id: "m12",
    title: "Last Light",
    description: "When the sun begins to die 500 years early, humanity has one chance to ignite it back to life. An epic sci-fi drama.",
    type: "movie",
    genre: ["Sci-Fi", "Drama"],
    tags: ["space", "sci-fi", "drama", "sun", "survival", "future", "epic"],
    thumbnailUrl: img(134317),
    heroUrl: hero(134317),
    duration: "2h 35m",
    year: "2024",
    rating: "12+",
    cast: ["James Adler", "Nora Svensen", "Dr. Raj Patel"]
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
