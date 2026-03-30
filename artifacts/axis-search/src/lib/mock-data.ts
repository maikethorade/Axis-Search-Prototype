export type ContentType = 'movie' | 'series' | 'sport' | 'live' | 'documentary';

export interface Moment {
  id: string;
  title: string;
  timestamp: string;
  thumbnailUrl: string;
  episode?: string;
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
  badge?: string;
}

const bbc16x9 = (id: string) => `https://ichef.bbci.co.uk/images/ic/960x540/${id}.jpg`;
const bbcHero = (id: string) => `https://ichef.bbci.co.uk/images/ic/1248x702/${id}.jpg`;
const tmdb = (path: string) => `https://image.tmdb.org/t/p/w500/${path}`;
const tmdbHero = (path: string) => `https://image.tmdb.org/t/p/original/${path}`;

export const MOCK_CONTENT: ContentItem[] = [
  {
    id: "hero_marty",
    title: "Marty Supreme",
    description: "Set in 1950s New York, a shoe salesman and table tennis hustler pursues his obsessive dream of becoming world champion. Based on the extraordinary life of legendary ping-pong player Marty Reisman.",
    type: "movie",
    genre: ["Drama", "Sport", "Biography"],
    tags: ["marty supreme", "timothee chalamet", "ping pong", "table tennis", "a24", "josh safdie", "drama", "sport", "biography", "1950s", "new york"],
    thumbnailUrl: tmdb("lYWEXbQgRTR4ZQleSXAgRbxAjvq.jpg"),
    heroUrl: tmdbHero("sfr7Lc92lva5yqFamLzijX3YHLC.jpg"),
    duration: "2h 17m",
    year: "2025",
    rating: "15",
    cast: ["Timothée Chalamet", "Gwyneth Paltrow", "Tyler, the Creator"],
    trending: true,
    personalizedScore: 99,
    badge: "New"
  },
  {
    id: "s1",
    title: "The White Lotus",
    description: "A satirical comedy-drama set at an exclusive tropical resort, following the vacations of various hotel guests over the span of a week as dark secrets unravel.",
    type: "series",
    genre: ["Drama", "Comedy"],
    tags: ["drama", "comedy", "series", "hbo", "resort", "satire", "thriller", "white lotus"],
    thumbnailUrl: tmdb("gbSaK9v1CbcYH1ISgbM7XObD2dW.jpg"),
    heroUrl: tmdbHero("rahhXHBUZ25BIhbKxYJgizCZ9Al.jpg"),
    duration: "3 Seasons",
    year: "2021-2025",
    rating: "18+",
    cast: ["Jennifer Coolidge", "Aubrey Plaza", "Walton Goggins"],
    trending: true,
    personalizedScore: 98,
    moments: [
      { id: "m1a", title: "Tanya's poolside breakdown", timestamp: "18:32", thumbnailUrl: tmdbHero("rahhXHBUZ25BIhbKxYJgizCZ9Al.jpg"), episode: "S1 E3 — Mysterious Monkeys" },
      { id: "m1b", title: "The dinner confrontation", timestamp: "34:10", thumbnailUrl: tmdbHero("lFwykSz3Ykj1Q3JXJURnGUTNf1o.jpg"), episode: "S1 E5 — The Lotus-Eaters" },
      { id: "m1c", title: "Shocking finale reveal", timestamp: "51:45", thumbnailUrl: tmdb("gbSaK9v1CbcYH1ISgbM7XObD2dW.jpg"), episode: "S1 E6 — Departures" },
      { id: "m1d", title: "The boat scene twist", timestamp: "44:20", thumbnailUrl: tmdb("pE8CScObQURsFZ723PSW1K9EGYp.jpg"), episode: "S2 E7 — Arrivederci" }
    ]
  },
  {
    id: "m1",
    title: "Spider-Man: Across the Spider-Verse",
    description: "Miles Morales catapults across the multiverse, where he encounters a team of Spider-People charged with protecting its very existence. But when the heroes clash on how to handle a new threat, Miles must redefine what it means to be a hero.",
    type: "movie",
    genre: ["Animation", "Action", "Adventure"],
    tags: ["animation", "action", "superhero", "marvel", "spider-man", "exciting", "multiverse", "adventure"],
    thumbnailUrl: tmdb("8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg"),
    heroUrl: tmdbHero("1kTSDu4AkudOIWT2RssOyTHj6YU.jpg"),
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
    thumbnailUrl: tmdb("pE8CScObQURsFZ723PSW1K9EGYp.jpg"),
    heroUrl: tmdbHero("6n63aBdgPH22PzNgd1kcDZlmwkM.jpg"),
    duration: "6 Seasons",
    year: "2013-2022",
    rating: "18+",
    cast: ["Cillian Murphy", "Helen McCrory", "Paul Anderson"],
    trending: true,
    personalizedScore: 92,
    badge: "Top Pick"
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

  {
    id: "mov_garfield",
    title: "The Garfield Movie",
    description: "Garfield, the world-famous Monday-hating, lasagna-loving indoor cat, is about to have a wild outdoor adventure when he is reunited with his long-lost father.",
    type: "movie",
    genre: ["Animation", "Comedy", "Family"],
    tags: ["garfield", "animation", "comedy", "family", "kids", "fun", "cat", "chris pratt", "adventure"],
    thumbnailUrl: tmdb("xYduFGuch9OwbCOEUiamml18ZoB.jpg"),
    heroUrl: tmdbHero("xYduFGuch9OwbCOEUiamml18ZoB.jpg"),
    duration: "1h 41m",
    year: "2024",
    rating: "U",
    cast: ["Chris Pratt", "Samuel L. Jackson", "Hannah Waddingham"],
    trending: true,
    personalizedScore: 78
  },

  // --- Trending / Everyone's Watching ---
  {
    id: "tv_trigger_point",
    title: "Trigger Point",
    description: "Bomb disposal expert Lana Washington faces a terrorist campaign targeting London. As the pressure mounts, she must use her nerve and expertise to keep the city safe.",
    type: "series",
    genre: ["Thriller", "Crime", "Drama"],
    tags: ["trigger point", "thriller", "bomb disposal", "itv", "series", "vicky mcclure", "london", "terrorism", "intense", "exciting"],
    thumbnailUrl: tmdb("cjMpwyWL0l1n0EkNw88QyzWRsHW.jpg"),
    heroUrl: tmdbHero("cjMpwyWL0l1n0EkNw88QyzWRsHW.jpg"),
    duration: "2 Series",
    year: "2022-2024",
    rating: "15+",
    cast: ["Vicky McClure", "Adrian Lester", "Mark Stanley"],
    trending: true,
    personalizedScore: 93
  },
  {
    id: "tv_broadchurch",
    title: "Broadchurch",
    description: "The murder of a young boy in a small coastal town has a devastating effect on the community. DI Hardy and DS Miller must find the killer while the town falls apart under media scrutiny.",
    type: "series",
    genre: ["Crime", "Drama", "Mystery"],
    tags: ["broadchurch", "crime", "drama", "mystery", "itv", "series", "detective", "david tennant", "coastal", "murder"],
    thumbnailUrl: tmdb("2NhBFUTg5KVBmGwafxtLwVdsqrr.jpg"),
    heroUrl: tmdbHero("2NhBFUTg5KVBmGwafxtLwVdsqrr.jpg"),
    duration: "3 Series",
    year: "2013-2017",
    rating: "15+",
    cast: ["David Tennant", "Olivia Colman", "Jodie Whittaker"],
    trending: true,
    personalizedScore: 94,
    badge: "Trending"
  },
  {
    id: "tv_playing_nice",
    title: "Playing Nice",
    description: "Two couples discover their toddlers were switched at birth. As they try to do the right thing, buried secrets and hidden agendas threaten to tear both families apart.",
    type: "series",
    genre: ["Thriller", "Drama"],
    tags: ["playing nice", "thriller", "drama", "itv", "series", "family", "switched at birth", "suspense", "james norton"],
    thumbnailUrl: tmdb("dqZENchTd7lp5zht7BdlqM7RBhD.jpg"),
    heroUrl: tmdbHero("dqZENchTd7lp5zht7BdlqM7RBhD.jpg"),
    duration: "Series 1",
    year: "2025",
    rating: "15+",
    cast: ["James Norton", "Niamh Algar"],
    trending: true,
    personalizedScore: 91
  },
  {
    id: "tv_line_of_duty",
    title: "Line of Duty",
    description: "DS Steve Arnott is transferred to AC-12, an anti-corruption unit. He and his team investigate cases of corruption within the police force in gripping fashion.",
    type: "series",
    genre: ["Crime", "Thriller", "Drama"],
    tags: ["line of duty", "crime", "thriller", "police", "corruption", "bbc", "series", "ac-12", "intense", "detective"],
    thumbnailUrl: tmdb("glKDfE6btIRcVB5zrjspRIs4r52.jpg"),
    heroUrl: tmdbHero("glKDfE6btIRcVB5zrjspRIs4r52.jpg"),
    duration: "6 Series",
    year: "2012-2021",
    rating: "15+",
    cast: ["Adrian Dunbar", "Vicky McClure", "Martin Compston"],
    trending: true,
    personalizedScore: 96
  },

  // --- Drama ---
  {
    id: "tv_happy_valley",
    title: "Happy Valley",
    description: "Sergeant Catherine Cawood polices the Calder Valley, where the kidnapping of a young girl leads her on a collision course with a man she has spent years trying to forget.",
    type: "series",
    genre: ["Crime", "Drama", "Thriller"],
    tags: ["happy valley", "crime", "drama", "thriller", "bbc", "series", "sarah lancashire", "yorkshire", "detective", "intense"],
    thumbnailUrl: tmdb("ujTbnUjo7e0eRiFKMlEWlR17acQ.jpg"),
    heroUrl: tmdbHero("ujTbnUjo7e0eRiFKMlEWlR17acQ.jpg"),
    duration: "3 Series",
    year: "2014-2023",
    rating: "15+",
    cast: ["Sarah Lancashire", "James Norton", "Siobhan Finneran"],
    personalizedScore: 97,
    badge: "Must Watch"
  },
  {
    id: "tv_the_night_manager",
    title: "The Night Manager",
    description: "Pine's past resurfaces as he's pulled into a deadly conspiracy that takes him to Colombia. A night manager at a luxury hotel is recruited by intelligence operatives to infiltrate an arms dealer's network.",
    type: "series",
    genre: ["Thriller", "Drama", "Spy"],
    tags: ["night manager", "thriller", "spy", "drama", "bbc", "series", "le carre", "intense", "exciting", "tom hiddleston"],
    thumbnailUrl: tmdb("1MccRnw41qQjREuZkovqP2UX1i3.jpg"),
    heroUrl: tmdbHero("1MccRnw41qQjREuZkovqP2UX1i3.jpg"),
    duration: "2 Series",
    year: "2016-2025",
    rating: "15+",
    cast: ["Tom Hiddleston", "Olivia Colman", "Hugh Laurie"],
    trending: true,
    personalizedScore: 95
  },
  {
    id: "tv_bodyguard",
    title: "Bodyguard",
    description: "A war veteran is assigned to protect the Home Secretary, whose politics he despises. As threats escalate, so does the tension between duty and conviction.",
    type: "series",
    genre: ["Thriller", "Drama", "Political"],
    tags: ["bodyguard", "thriller", "drama", "political", "bbc", "series", "richard madden", "keeley hawes", "intense"],
    thumbnailUrl: tmdb("fm7pHwGnzkeM8EOE9cglys32bL8.jpg"),
    heroUrl: tmdbHero("fm7pHwGnzkeM8EOE9cglys32bL8.jpg"),
    duration: "Series 1",
    year: "2018",
    rating: "15+",
    cast: ["Richard Madden", "Keeley Hawes"],
    personalizedScore: 90
  },
  {
    id: "tv_killing_eve",
    title: "Killing Eve",
    description: "A bored MI5 security officer becomes obsessed with a psychopathic assassin. An exhilarating cat-and-mouse game unfolds across Europe.",
    type: "series",
    genre: ["Thriller", "Drama", "Spy"],
    tags: ["killing eve", "thriller", "spy", "drama", "bbc", "series", "assassin", "sandra oh", "jodie comer", "cat and mouse"],
    thumbnailUrl: tmdb("igkn0M1bgMeATz59LShvVxZNdVd.jpg"),
    heroUrl: tmdbHero("igkn0M1bgMeATz59LShvVxZNdVd.jpg"),
    duration: "4 Series",
    year: "2018-2022",
    rating: "15+",
    cast: ["Sandra Oh", "Jodie Comer", "Fiona Shaw"],
    personalizedScore: 91
  },
  {
    id: "tv_unforgotten",
    title: "Unforgotten",
    description: "DCI Cassie Stuart and DI Sunny Khan investigate cold cases, uncovering decades-old secrets that still have the power to destroy lives.",
    type: "series",
    genre: ["Crime", "Drama", "Mystery"],
    tags: ["unforgotten", "crime", "drama", "mystery", "itv", "series", "cold case", "detective", "nicola walker"],
    thumbnailUrl: tmdb("bfysfq7JDBWKLpkKPaOU2FpfmB.jpg"),
    heroUrl: tmdbHero("bfysfq7JDBWKLpkKPaOU2FpfmB.jpg"),
    duration: "5 Series",
    year: "2015-2023",
    rating: "15+",
    cast: ["Nicola Walker", "Sanjeev Bhaskar"],
    personalizedScore: 87
  },
  {
    id: "tv_grace",
    title: "Grace",
    description: "Detective Superintendent Roy Grace uses unorthodox methods to solve challenging cases in and around Brighton, drawing on cutting-edge forensic evidence and old-fashioned intuition.",
    type: "series",
    genre: ["Crime", "Drama"],
    tags: ["grace", "crime", "drama", "itv", "series", "detective", "john simm", "brighton", "peter james"],
    thumbnailUrl: tmdb("1BpIVXSmbcKqkuHOBKXFfjDTRBd.jpg"),
    heroUrl: tmdbHero("1BpIVXSmbcKqkuHOBKXFfjDTRBd.jpg"),
    duration: "4 Series",
    year: "2021-2025",
    rating: "15+",
    cast: ["John Simm", "Richie Campbell"],
    personalizedScore: 84
  },
  {
    id: "tv_the_crown",
    title: "The Crown",
    description: "The inside story of Queen Elizabeth II's reign. Political rivalries, romance, and personal dramas play out against the backdrop of great events shaping the second half of the 20th century.",
    type: "series",
    genre: ["Drama", "Period", "Biography"],
    tags: ["the crown", "drama", "period", "royal", "queen", "netflix", "series", "historical", "british", "monarchy"],
    thumbnailUrl: tmdb("1fH41ccMKvgDTbbcCxWWH6fznah.jpg"),
    heroUrl: tmdbHero("1fH41ccMKvgDTbbcCxWWH6fznah.jpg"),
    duration: "6 Series",
    year: "2016-2023",
    rating: "15+",
    cast: ["Claire Foy", "Olivia Colman", "Imelda Staunton"],
    personalizedScore: 89
  },
  {
    id: "tv_vigil",
    title: "Vigil",
    description: "DCI Amy Silva is called to investigate a suspicious death on board a Trident nuclear submarine. Cut off from the outside world, she must navigate a web of conspiracy.",
    type: "series",
    genre: ["Thriller", "Crime", "Drama"],
    tags: ["vigil", "thriller", "crime", "submarine", "bbc", "series", "mystery", "suranne jones", "intense"],
    thumbnailUrl: tmdb("gNbdjDi1HamTCrfvM9JeA94bNi2.jpg"),
    heroUrl: tmdbHero("gNbdjDi1HamTCrfvM9JeA94bNi2.jpg"),
    duration: "2 Series",
    year: "2021-2023",
    rating: "15+",
    cast: ["Suranne Jones", "Rose Leslie"],
    personalizedScore: 86
  },
  {
    id: "tv_sherlock",
    title: "Sherlock",
    description: "A modern update of Sir Arthur Conan Doyle's detective stories. Sherlock Holmes and Doctor John Watson solve crimes in 21st-century London.",
    type: "series",
    genre: ["Crime", "Drama", "Mystery"],
    tags: ["sherlock", "crime", "mystery", "bbc", "series", "detective", "benedict cumberbatch", "london", "classic"],
    thumbnailUrl: tmdb("wt5hfI0HIvV7JRkaNURCr8G1lrj.jpg"),
    heroUrl: tmdbHero("wt5hfI0HIvV7JRkaNURCr8G1lrj.jpg"),
    duration: "4 Series",
    year: "2010-2017",
    rating: "12+",
    cast: ["Benedict Cumberbatch", "Martin Freeman"],
    trending: true,
    personalizedScore: 93,
    badge: "Editor's Pick"
  },
  {
    id: "tv_the_tower",
    title: "The Tower",
    description: "When a veteran police officer and a teenage girl fall to their deaths from a tower block, DS Sarah Collins must piece together the chain of events leading to the tragedy.",
    type: "series",
    genre: ["Crime", "Thriller", "Drama"],
    tags: ["the tower", "crime", "thriller", "itv", "series", "detective", "police", "london", "mystery"],
    thumbnailUrl: tmdb("vL5BQvXH96cJzmNK5n7QliQxy90.jpg"),
    heroUrl: tmdbHero("vL5BQvXH96cJzmNK5n7QliQxy90.jpg"),
    duration: "3 Series",
    year: "2021-2024",
    rating: "15+",
    cast: ["Gemma Whelan", "Emmett J Scanlan"],
    personalizedScore: 82
  },
  {
    id: "tv_downton_abbey",
    title: "Downton Abbey",
    description: "The lives of the aristocratic Crawley family and their servants unfold in the grand country house during the early 20th century, from the sinking of the Titanic to the interwar period.",
    type: "series",
    genre: ["Drama", "Period", "Romance"],
    tags: ["downton abbey", "drama", "period", "itv", "series", "costume", "historical", "british", "aristocracy", "country house"],
    thumbnailUrl: tmdb("4ptpmWBVD9HY9hMh8Cbs6SMiy7p.jpg"),
    heroUrl: tmdbHero("4ptpmWBVD9HY9hMh8Cbs6SMiy7p.jpg"),
    duration: "6 Series",
    year: "2010-2015",
    rating: "PG",
    cast: ["Hugh Bonneville", "Maggie Smith", "Michelle Dockery"],
    personalizedScore: 88
  },
  {
    id: "tv_mr_bates",
    title: "Mr Bates vs The Post Office",
    description: "The true story of one of the greatest miscarriages of justice in British history. Sub-postmasters are wrongfully prosecuted due to a faulty computer system.",
    type: "series",
    genre: ["Drama", "True Story"],
    tags: ["mr bates", "post office", "drama", "itv", "series", "scandal", "justice", "true story", "toby jones", "inspiring"],
    thumbnailUrl: tmdb("sQWIaSoMbuPxDBiAcCeQIn3NLZx.jpg"),
    heroUrl: tmdbHero("sQWIaSoMbuPxDBiAcCeQIn3NLZx.jpg"),
    duration: "Series 1",
    year: "2024",
    rating: "12+",
    cast: ["Toby Jones", "Monica Dolan", "Julie Hesmondhalgh"],
    trending: true,
    personalizedScore: 92
  },
  {
    id: "tv_fleabag",
    title: "Fleabag",
    description: "A dry-witted woman, known only as Fleabag, navigates life in London while breaking the fourth wall to share her observations on love, loss, and family dysfunction.",
    type: "series",
    genre: ["Comedy", "Drama"],
    tags: ["fleabag", "comedy", "drama", "bbc", "series", "phoebe waller-bridge", "london", "funny", "dark comedy", "british"],
    thumbnailUrl: tmdb("sy2nV3rCcJQaRK5M0NWvvTU7CBx.jpg"),
    heroUrl: tmdbHero("sy2nV3rCcJQaRK5M0NWvvTU7CBx.jpg"),
    duration: "2 Series",
    year: "2016-2019",
    rating: "15+",
    cast: ["Phoebe Waller-Bridge", "Sian Clifford", "Andrew Scott"],
    personalizedScore: 95,
    badge: "Award Winner"
  },
  {
    id: "tv_liar",
    title: "Liar",
    description: "A schoolteacher accuses a respected surgeon of a terrible crime, launching a psychological battle of wits. Who is telling the truth?",
    type: "series",
    genre: ["Thriller", "Drama", "Mystery"],
    tags: ["liar", "thriller", "drama", "mystery", "itv", "series", "joanne froggatt", "psychological", "intense"],
    thumbnailUrl: tmdb("r8ODGmfNbZQlNhiJl2xQENE2jsk.jpg"),
    heroUrl: tmdbHero("r8ODGmfNbZQlNhiJl2xQENE2jsk.jpg"),
    duration: "2 Series",
    year: "2017-2020",
    rating: "15+",
    cast: ["Joanne Froggatt", "Ioan Gruffudd"],
    personalizedScore: 80
  },
  {
    id: "tv_the_bay",
    title: "The Bay",
    description: "A family liaison officer navigates the complex aftermath of violent crime in a seaside resort community, uncovering hidden truths along the way.",
    type: "series",
    genre: ["Crime", "Drama"],
    tags: ["the bay", "crime", "drama", "itv", "series", "detective", "seaside", "morecambe", "morven christie"],
    thumbnailUrl: tmdb("fbKE87mojpIETWepSbD5Qt741fp.jpg"),
    heroUrl: tmdbHero("fbKE87mojpIETWepSbD5Qt741fp.jpg"),
    duration: "4 Series",
    year: "2019-2023",
    rating: "15+",
    cast: ["Morven Christie", "Marsha Thomason"],
    personalizedScore: 79
  },
  {
    id: "tv_shetland",
    title: "Shetland",
    description: "DI Jimmy Perez investigates crime in the remote and starkly beautiful Shetland Islands, where small-town tensions mask deep secrets.",
    type: "series",
    genre: ["Crime", "Drama", "Mystery"],
    tags: ["shetland", "crime", "drama", "mystery", "bbc", "series", "detective", "scotland", "islands", "douglas henshall"],
    thumbnailUrl: tmdb("yxMpoHO0CXP5o9gB7IfsciilQS4.jpg"),
    heroUrl: tmdbHero("yxMpoHO0CXP5o9gB7IfsciilQS4.jpg"),
    duration: "8 Series",
    year: "2013-2024",
    rating: "12+",
    cast: ["Douglas Henshall", "Alison O'Donnell"],
    personalizedScore: 83
  },
  {
    id: "tv_marcella",
    title: "Marcella",
    description: "A former detective returns to the London Met to work on a cold case that may be linked to a series of current murders, all while battling her own psychological demons.",
    type: "series",
    genre: ["Crime", "Thriller", "Drama"],
    tags: ["marcella", "crime", "thriller", "itv", "series", "detective", "anna friel", "london", "dark", "intense"],
    thumbnailUrl: tmdb("oANi0vEE92nuijiZQgPZ88FSxqQ.jpg"),
    heroUrl: tmdbHero("oANi0vEE92nuijiZQgPZ88FSxqQ.jpg"),
    duration: "3 Series",
    year: "2016-2021",
    rating: "15+",
    cast: ["Anna Friel", "Ray Panthaki"],
    personalizedScore: 78
  },
  {
    id: "tv_the_pembrokeshire_murders",
    title: "The Pembrokeshire Murders",
    description: "When newly promoted DS Steve Wilkins reopens two unsolved double murders, he discovers forensic evidence links the killings to a string of burglaries.",
    type: "series",
    genre: ["Crime", "Drama", "True Story"],
    tags: ["pembrokeshire murders", "crime", "drama", "true crime", "itv", "series", "luke evans", "cold case", "detective"],
    thumbnailUrl: tmdb("ajaXSmdAlYYhnvx1EIsvpfN949y.jpg"),
    heroUrl: tmdbHero("ajaXSmdAlYYhnvx1EIsvpfN949y.jpg"),
    duration: "Series 1",
    year: "2021",
    rating: "15+",
    cast: ["Luke Evans", "Keith Allen"],
    personalizedScore: 81
  },
  {
    id: "tv_the_long_shadow",
    title: "The Long Shadow",
    description: "The story of Peter Sutcliffe's crimes and the police investigation to catch the Yorkshire Ripper, told through the eyes of the women whose lives were affected.",
    type: "series",
    genre: ["Crime", "Drama", "True Story"],
    tags: ["the long shadow", "crime", "drama", "true crime", "itv", "series", "yorkshire", "1970s", "historical"],
    thumbnailUrl: tmdb("2jZ5c4aPzKAyvzi1NuGRV7GZqm6.jpg"),
    heroUrl: tmdbHero("2jZ5c4aPzKAyvzi1NuGRV7GZqm6.jpg"),
    duration: "Series 1",
    year: "2023",
    rating: "15+",
    cast: ["Toby Jones", "David Morrissey", "Lee Ingleby"],
    personalizedScore: 77
  },
  {
    id: "tv_the_ipcress_file",
    title: "The Ipcress File",
    description: "In 1960s Cold War London, a former black marketeer is recruited into British intelligence and tasked with investigating the disappearance of a kidnapped nuclear scientist.",
    type: "series",
    genre: ["Thriller", "Spy", "Period"],
    tags: ["ipcress file", "thriller", "spy", "1960s", "cold war", "itv", "series", "joe cole", "espionage"],
    thumbnailUrl: tmdb("zEFKMNPBKq6JG7uuDkzTQ9WwErn.jpg"),
    heroUrl: tmdbHero("zEFKMNPBKq6JG7uuDkzTQ9WwErn.jpg"),
    duration: "Series 1",
    year: "2022",
    rating: "12+",
    cast: ["Joe Cole", "Lucy Boynton", "Tom Hollander"],
    personalizedScore: 83
  },

  // --- Entertainment / Reality ---
  {
    id: "tv_the_chase",
    title: "The Chase",
    description: "Contestants must outrun one of the country's finest quiz brains, known as Chasers, to win a cash prize. Tension, drama and the odd upset make this a firm favourite.",
    type: "series",
    genre: ["Entertainment", "Quiz"],
    tags: ["the chase", "quiz", "entertainment", "itv", "series", "bradley walsh", "game show", "fun"],
    thumbnailUrl: tmdb("7lX5QBix4QAk7pQDM3xdPKukOUJ.jpg"),
    heroUrl: tmdbHero("7lX5QBix4QAk7pQDM3xdPKukOUJ.jpg"),
    duration: "18 Series",
    year: "2009-2026",
    rating: "PG",
    cast: ["Bradley Walsh"],
    personalizedScore: 75
  },
  {
    id: "tv_im_a_celeb",
    title: "I'm a Celebrity... Get Me Out of Here!",
    description: "Celebrities are dropped into the Australian jungle where they face terrifying Bushtucker Trials, limited rations, and life without luxury as they compete to be crowned King or Queen of the Jungle.",
    type: "series",
    genre: ["Entertainment", "Reality"],
    tags: ["im a celebrity", "reality", "entertainment", "itv", "series", "jungle", "bushtucker", "ant and dec", "fun"],
    thumbnailUrl: tmdb("jgvW9n0EwKtq9nbztWhyTvvoqjS.jpg"),
    heroUrl: tmdbHero("jgvW9n0EwKtq9nbztWhyTvvoqjS.jpg"),
    duration: "24 Series",
    year: "2002-2025",
    rating: "PG",
    cast: ["Ant McPartlin", "Declan Donnelly"],
    personalizedScore: 76
  },
  {
    id: "tv_too_close",
    title: "Too Close",
    description: "Forensic psychiatrist Dr Emma Robertson is assigned to evaluate Connie Mortensen, who drove a car off a bridge with two children inside. But nothing is as it seems.",
    type: "series",
    genre: ["Thriller", "Drama", "Psychological"],
    tags: ["too close", "thriller", "drama", "psychological", "itv", "series", "emily watson", "denise gough", "intense"],
    thumbnailUrl: tmdb("bBmizqBXcjVYUzDJtTy7eyMvWrx.jpg"),
    heroUrl: tmdbHero("bBmizqBXcjVYUzDJtTy7eyMvWrx.jpg"),
    duration: "Series 1",
    year: "2021",
    rating: "15+",
    cast: ["Emily Watson", "Denise Gough"],
    personalizedScore: 81
  },

  // --- Movies ---
  {
    id: "mov_oppenheimer",
    title: "Oppenheimer",
    description: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II.",
    type: "movie",
    genre: ["Drama", "Biography", "History"],
    tags: ["oppenheimer", "drama", "biography", "history", "nolan", "atomic bomb", "ww2", "christopher nolan", "oscar"],
    thumbnailUrl: tmdb("8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg"),
    heroUrl: tmdbHero("nb3xI8XI3w4pMVZ38VijbsyBqP4.jpg"),
    duration: "3h 00m",
    year: "2023",
    rating: "15+",
    cast: ["Cillian Murphy", "Emily Blunt", "Robert Downey Jr."],
    trending: true,
    personalizedScore: 96,
    badge: "Award Winner"
  },
  {
    id: "mov_dune2",
    title: "Dune: Part Two",
    description: "Paul Atreides unites with the Fremen to wage war against House Harkonnen while trying to prevent a terrible future only he can foresee.",
    type: "movie",
    genre: ["Sci-Fi", "Adventure", "Drama"],
    tags: ["dune", "sci-fi", "adventure", "desert", "space", "timothee chalamet", "epic", "sequel"],
    thumbnailUrl: tmdb("6izwz7rsy95ARzTR3poZ8H6c5pp.jpg"),
    heroUrl: tmdbHero("6izwz7rsy95ARzTR3poZ8H6c5pp.jpg"),
    duration: "2h 46m",
    year: "2024",
    rating: "12+",
    cast: ["Timothée Chalamet", "Zendaya", "Austin Butler"],
    personalizedScore: 94,
    badge: "Trending"
  },
  {
    id: "mov_killers",
    title: "Killers of the Flower Moon",
    description: "Members of the Osage Nation are murdered one by one in 1920s Oklahoma, sparking an FBI investigation that reveals a chilling conspiracy.",
    type: "movie",
    genre: ["Crime", "Drama", "History"],
    tags: ["killers of the flower moon", "crime", "drama", "scorsese", "history", "leonardo dicaprio", "western", "true story"],
    thumbnailUrl: tmdb("dB6Krk806zeqd0YNp2ngQ9zXteH.jpg"),
    heroUrl: tmdbHero("dB6Krk806zeqd0YNp2ngQ9zXteH.jpg"),
    duration: "3h 26m",
    year: "2023",
    rating: "15+",
    cast: ["Leonardo DiCaprio", "Robert De Niro", "Lily Gladstone"],
    personalizedScore: 90
  },
  {
    id: "mov_banshees",
    title: "The Banshees of Inisherin",
    description: "On a remote island off the west coast of Ireland, two lifelong friends find themselves at an impasse when one abruptly ends their friendship.",
    type: "movie",
    genre: ["Comedy", "Drama"],
    tags: ["banshees", "inisherin", "comedy", "drama", "ireland", "colin farrell", "brendan gleeson", "dark comedy", "irish"],
    thumbnailUrl: tmdb("d07phJqCx6z5wILDYqkyraorDPi.jpg"),
    heroUrl: tmdbHero("d07phJqCx6z5wILDYqkyraorDPi.jpg"),
    duration: "1h 54m",
    year: "2022",
    rating: "15+",
    cast: ["Colin Farrell", "Brendan Gleeson", "Kerry Condon"],
    personalizedScore: 87
  },
  {
    id: "mov_inside_out_2",
    title: "Inside Out 2",
    description: "As Riley enters her teenage years, a new set of emotions joins the mix — including Anxiety — creating chaos in the headquarters of her mind.",
    type: "movie",
    genre: ["Animation", "Comedy", "Family"],
    tags: ["inside out", "animation", "pixar", "comedy", "family", "emotions", "kids", "fun", "sequel"],
    thumbnailUrl: tmdb("vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg"),
    heroUrl: tmdbHero("vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg"),
    duration: "1h 36m",
    year: "2024",
    rating: "U",
    personalizedScore: 82,
    badge: "Family Pick"
  },
  {
    id: "mov_kung_fu_panda_4",
    title: "Kung Fu Panda 4",
    description: "Po must train a new warrior to become the next Dragon Warrior while facing the powerful sorceress known as the Chameleon.",
    type: "movie",
    genre: ["Animation", "Comedy", "Action"],
    tags: ["kung fu panda", "animation", "comedy", "action", "family", "martial arts", "kids", "fun"],
    thumbnailUrl: tmdb("kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg"),
    heroUrl: tmdbHero("kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg"),
    duration: "1h 34m",
    year: "2024",
    rating: "PG",
    personalizedScore: 74
  },

  // --- Documentaries ---
  {
    id: "doc_planet_earth",
    title: "Planet Earth III",
    description: "David Attenborough presents a breathtaking exploration of the natural world, revealing the extraordinary ways animals and plants have adapted to survive in every habitat on our planet.",
    type: "documentary",
    genre: ["Nature", "Science"],
    tags: ["planet earth", "nature", "wildlife", "david attenborough", "bbc", "documentary", "animals", "science", "environment"],
    thumbnailUrl: tmdb("hNwJPvA0SaFGKLW2oExiHFNDpNs.jpg"),
    heroUrl: tmdbHero("hNwJPvA0SaFGKLW2oExiHFNDpNs.jpg"),
    duration: "8 Episodes",
    year: "2023",
    rating: "U",
    trending: true,
    personalizedScore: 95
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
  "Premier League Live", "Trigger Point", "Match of the Day", "Line of Duty", "Broadchurch", "Planet Earth"
];
