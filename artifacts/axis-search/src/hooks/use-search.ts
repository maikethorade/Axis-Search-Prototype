import { useState, useMemo, useEffect } from 'react';
import { MOCK_CONTENT, ContentItem, ContentType } from '../lib/mock-data';
import { useDebounce } from 'use-debounce';

const SEMANTIC_MAP: Record<string, string[]> = {
  'exciting': ['action', 'thriller', 'sports', 'live', 'fast', 'intense', 'adventure'],
  'thrilling': ['action', 'thriller', 'sports', 'intense', 'suspense', 'crime'],
  'relaxing': ['documentary', 'nature', 'calm', 'ocean', 'space', 'earth', 'planet'],
  'chill': ['documentary', 'nature', 'calm', 'comedy'],
  'funny': ['comedy', 'laugh', 'humour', 'humor', 'sitcom'],
  'hilarious': ['comedy', 'laugh', 'funny', 'sitcom'],
  'game': ['sports', 'live', 'football', 'basketball', 'tennis', 'nba', 'premier league', 'match'],
  'match': ['sports', 'football', 'tennis', 'live', 'premier league', 'game'],
  'race': ['motorsport', 'f1', 'cars', 'formula', 'grand prix', 'racing'],
  'racing': ['motorsport', 'f1', 'cars', 'formula', 'grand prix', 'race'],
  'space': ['universe', 'stars', 'sci-fi', 'planet', 'cosmos', 'galaxy', 'earth'],
  'scary': ['horror', 'thriller', 'dark', 'suspense', 'crime', 'mystery'],
  'horror': ['scary', 'thriller', 'dark', 'suspense'],
  'romantic': ['romance', 'love', 'drama', 'relationship'],
  'love': ['romance', 'romantic', 'drama', 'relationship'],
  'crime': ['thriller', 'mystery', 'detective', 'police', 'investigation', 'murder'],
  'mystery': ['crime', 'thriller', 'detective', 'suspense', 'investigation'],
  'detective': ['crime', 'mystery', 'police', 'investigation'],
  'nature': ['documentary', 'earth', 'planet', 'ocean', 'wildlife', 'animals', 'environment'],
  'animals': ['nature', 'wildlife', 'documentary', 'planet', 'earth'],
  'wildlife': ['nature', 'animals', 'documentary', 'planet'],
  'history': ['documentary', 'historical', 'war', 'period'],
  'war': ['action', 'history', 'military', 'historical', 'drama'],
  'drama': ['emotional', 'serious', 'intense', 'story'],
  'football': ['sports', 'premier league', 'soccer', 'match', 'game', 'live', 'champions league'],
  'soccer': ['football', 'sports', 'premier league', 'match', 'live', 'champions league'],
  'champions': ['football', 'sports', 'champions league', 'premier league', 'live'],
  'premier': ['football', 'sports', 'premier league', 'live', 'match'],
  'tennis': ['sports', 'match', 'game', 'live', 'wimbledon'],
  'f1': ['motorsport', 'formula', 'racing', 'cars', 'grand prix'],
  'formula': ['f1', 'motorsport', 'racing', 'cars', 'grand prix'],
  'british': ['uk', 'bbc', 'itv', 'english', 'britain'],
  'uk': ['british', 'bbc', 'itv', 'english', 'britain'],
  'new': ['recent', '2024', '2025', '2026', 'latest', 'release'],
  'latest': ['recent', 'new', '2024', '2025', '2026'],
  'classic': ['old', 'retro', 'legendary', 'iconic'],
  'best': ['top', 'popular', 'trending', 'rated', 'award'],
  'popular': ['trending', 'top', 'best', 'hit'],
  'award': ['oscar', 'bafta', 'emmy', 'winning', 'best', 'acclaimed'],
  'oscar': ['award', 'winning', 'best', 'acclaimed', 'film'],
  'family': ['kids', 'children', 'animation', 'fun', 'cartoon'],
  'kids': ['family', 'children', 'animation', 'cartoon'],
  'dark': ['thriller', 'crime', 'mystery', 'noir', 'gritty'],
  'gritty': ['dark', 'thriller', 'crime', 'realistic', 'intense'],
  'epic': ['grand', 'spectacular', 'action', 'adventure', 'big'],
  'adventure': ['action', 'exciting', 'journey', 'quest', 'epic'],
  'sci-fi': ['science fiction', 'space', 'future', 'technology', 'alien'],
  'scifi': ['science fiction', 'space', 'future', 'technology', 'alien', 'sci-fi'],
  'science': ['sci-fi', 'documentary', 'space', 'nature', 'technology'],
  'tv': ['series', 'show', 'television', 'programme'],
  'show': ['series', 'tv', 'television', 'programme'],
  'film': ['movie', 'cinema', 'feature'],
  'movie': ['film', 'cinema', 'feature'],
  'series': ['tv', 'show', 'season', 'episodes'],
  'binge': ['series', 'tv', 'show', 'season', 'marathon'],
  'watch': ['stream', 'view', 'play'],
  'tonight': ['live', 'now', 'streaming', 'on'],
  'live': ['now', 'streaming', 'tonight', 'sports', 'event'],
  'sport': ['sports', 'game', 'match', 'athletic', 'competition'],
  'sports': ['sport', 'game', 'match', 'athletic', 'competition', 'live'],
  'documentary': ['doc', 'docu', 'real', 'factual', 'nature', 'history'],
  'doc': ['documentary', 'docu', 'factual'],
  'docu': ['documentary', 'doc', 'factual'],
};

const SYNONYM_MAP: Record<string, string[]> = {
  'soccer': ['football'],
  'football': ['soccer'],
  'film': ['movie'],
  'movie': ['film'],
  'tv': ['series', 'show'],
  'show': ['series', 'tv'],
  'series': ['show', 'tv'],
  'scary': ['horror'],
  'horror': ['scary'],
  'funny': ['comedy'],
  'comedy': ['funny'],
  'cop': ['police', 'detective', 'crime'],
  'police': ['cop', 'detective', 'crime'],
  'murder': ['killing', 'crime', 'death'],
  'auto': ['car', 'motor', 'racing', 'f1'],
  'car': ['auto', 'motor', 'racing', 'f1'],
  'earth': ['planet', 'world', 'nature'],
  'planet': ['earth', 'world', 'nature'],
  'universe': ['space', 'cosmos'],
  'cosmos': ['space', 'universe'],
};

function levenshtein(a: string, b: string): number {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  const matrix: number[][] = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b[i - 1] === a[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

function fuzzyMatch(query: string, target: string): number {
  const q = query.toLowerCase();
  const t = target.toLowerCase();
  if (t === q) return 1.0;
  if (t.includes(q)) return 0.9;
  if (q.includes(t)) return 0.7;
  if (t.startsWith(q.substring(0, Math.min(3, q.length)))) return 0.6;

  const dist = levenshtein(q, t);
  const maxLen = Math.max(q.length, t.length);
  if (maxLen === 0) return 0;
  const similarity = 1 - dist / maxLen;
  if (similarity >= 0.6) return similarity * 0.8;

  const tWords = t.split(/\s+/);
  for (const tw of tWords) {
    const wordDist = levenshtein(q, tw);
    const wordMaxLen = Math.max(q.length, tw.length);
    const wordSim = 1 - wordDist / wordMaxLen;
    if (wordSim >= 0.65) return wordSim * 0.7;
  }

  return 0;
}

function getNgrams(str: string, n: number): Set<string> {
  const grams = new Set<string>();
  const s = str.toLowerCase();
  for (let i = 0; i <= s.length - n; i++) {
    grams.add(s.substring(i, i + n));
  }
  return grams;
}

function ngramSimilarity(a: string, b: string): number {
  if (a.length < 2 || b.length < 2) return 0;
  const gramsA = getNgrams(a, 2);
  const gramsB = getNgrams(b, 2);
  let intersection = 0;
  gramsA.forEach(g => { if (gramsB.has(g)) intersection++; });
  const union = gramsA.size + gramsB.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

function scoreItem(item: ContentItem, queryWords: string[], expandedTags: string[], lowerQuery: string): number {
  let score = 0;
  const titleLower = item.title.toLowerCase();
  const descLower = item.description.toLowerCase();
  const allSearchable = [
    titleLower,
    descLower,
    ...item.tags.map(t => t.toLowerCase()),
    ...item.genre.map(g => g.toLowerCase()),
    ...(item.cast || []).map(c => c.toLowerCase()),
    item.type,
  ];

  if (titleLower === lowerQuery) score += 100;
  else if (titleLower.includes(lowerQuery)) score += 60;

  for (const word of queryWords) {
    if (titleLower.includes(word)) score += 25;

    const titleFuzzy = fuzzyMatch(word, titleLower);
    if (titleFuzzy > 0 && !titleLower.includes(word)) score += titleFuzzy * 20;

    const titleWords = titleLower.split(/\s+/);
    for (const tw of titleWords) {
      const fm = fuzzyMatch(word, tw);
      if (fm >= 0.6) score += fm * 15;
    }

    if (descLower.includes(word)) score += 8;
    const descFuzzy = fuzzyMatch(word, descLower);
    if (descFuzzy > 0 && !descLower.includes(word)) score += descFuzzy * 5;

    if (item.cast) {
      for (const actor of item.cast) {
        const actorLower = actor.toLowerCase();
        if (actorLower.includes(word)) score += 20;
        const actorFuzzy = fuzzyMatch(word, actorLower);
        if (actorFuzzy >= 0.6) score += actorFuzzy * 12;
      }
    }
  }

  for (const tag of item.tags) {
    const tagLower = tag.toLowerCase();
    if (expandedTags.includes(tagLower)) score += 12;
    for (const word of queryWords) {
      const tagFuzzy = fuzzyMatch(word, tagLower);
      if (tagFuzzy >= 0.6) score += tagFuzzy * 8;
      const ngramSim = ngramSimilarity(word, tagLower);
      if (ngramSim >= 0.4) score += ngramSim * 6;
    }
  }

  for (const genre of item.genre) {
    const genreLower = genre.toLowerCase();
    if (expandedTags.includes(genreLower)) score += 12;
    for (const word of queryWords) {
      const genreFuzzy = fuzzyMatch(word, genreLower);
      if (genreFuzzy >= 0.6) score += genreFuzzy * 8;
    }
  }

  if (expandedTags.includes(item.type)) score += 10;

  if (item.year) {
    for (const word of queryWords) {
      if (item.year.includes(word)) score += 15;
    }
  }

  const fullNgram = ngramSimilarity(lowerQuery, titleLower);
  if (fullNgram >= 0.3) score += fullNgram * 15;

  return score;
}

export function useSearch(initialQuery: string = '') {
  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery] = useDebounce(query, 300);
  const [activeFilter, setActiveFilter] = useState<ContentType | 'all'>('all');
  
  const results = useMemo(() => {
    if (!debouncedQuery.trim()) {
      return {
        items: [],
        moments: [],
        suggestions: [],
        exactMatch: false,
        totalCount: 0
      };
    }

    const lowerQuery = debouncedQuery.toLowerCase().trim();
    const queryWords = lowerQuery.split(/\s+/);
    
    let expandedTags = [...queryWords];
    queryWords.forEach(word => {
      if (SEMANTIC_MAP[word]) {
        expandedTags = [...expandedTags, ...SEMANTIC_MAP[word]];
      }
      if (SYNONYM_MAP[word]) {
        expandedTags = [...expandedTags, ...SYNONYM_MAP[word]];
      }
      Object.entries(SEMANTIC_MAP).forEach(([key, values]) => {
        if (values.includes(word) && !expandedTags.includes(key)) {
          expandedTags.push(key);
        }
      });
    });

    const scoredItems = MOCK_CONTENT.map(item => ({
      item,
      score: scoreItem(item, queryWords, expandedTags, lowerQuery)
    })).filter(x => x.score > 0);

    scoredItems.sort((a, b) => b.score - a.score);
    
    let filteredItems = scoredItems.map(x => x.item);
    
    if (activeFilter !== 'all') {
      filteredItems = filteredItems.filter(item => item.type === activeFilter);
    }

    const matchedMoments = filteredItems.flatMap(item => {
      if (!item.moments) return [];
      return item.moments.map(moment => ({
        ...moment,
        parentTitle: item.title,
        parentId: item.id
      }));
    }).slice(0, 4);

    return {
      items: filteredItems,
      moments: matchedMoments,
      exactMatch: scoredItems.length > 0 && scoredItems[0].score >= 50,
      totalCount: filteredItems.length
    };
  }, [debouncedQuery, activeFilter]);

  return {
    query,
    setQuery,
    debouncedQuery,
    results,
    activeFilter,
    setActiveFilter,
    isSearching: query !== debouncedQuery
  };
}

export function useHomeData() {
  const liveSports = MOCK_CONTENT.filter(c => c.type === 'live');
  const sportHighlights = MOCK_CONTENT.filter(c => c.type === 'sport');

  return {
    heroItems: [
      MOCK_CONTENT.find(c => c.id === 'hero_marty')!,
      MOCK_CONTENT.find(c => c.id === 's1')!,
      MOCK_CONTENT.find(c => c.id === 'm1')!,
      MOCK_CONTENT.find(c => c.id === 's2')!,
      MOCK_CONTENT.find(c => c.id === 'mov_oppenheimer')!,
    ].filter(Boolean),
    trending: MOCK_CONTENT.filter(c => c.trending),
    personalized: [...MOCK_CONTENT]
      .filter(c => c.personalizedScore)
      .sort((a, b) => (b.personalizedScore || 0) - (a.personalizedScore || 0))
      .filter(c => !c.trending)
      .concat([...MOCK_CONTENT].filter(c => c.trending && c.personalizedScore).sort((a, b) => (b.personalizedScore || 0) - (a.personalizedScore || 0)))
      .slice(0, 10),
    liveSports,
    sportHighlights,
    movies: [...MOCK_CONTENT].filter(c => c.type === 'movie').sort((a, b) => {
      const order = ['mov_oppenheimer', 'mov_dune2', 'mov_banshees', 'mov_garfield', 'hero_marty'];
      const ai = order.indexOf(a.id);
      const bi = order.indexOf(b.id);
      if (ai !== -1 && bi !== -1) return ai - bi;
      if (ai !== -1) return -1;
      if (bi !== -1) return 1;
      return 0;
    }),
    series: [...MOCK_CONTENT].filter(c => c.type === 'series').sort((a, b) => {
      const order = ['tv_happy_valley', 'tv_fleabag', 'tv_sherlock', 'tv_the_crown', 'tv_bodyguard'];
      const ai = order.indexOf(a.id);
      const bi = order.indexOf(b.id);
      if (ai !== -1 && bi !== -1) return ai - bi;
      if (ai !== -1) return -1;
      if (bi !== -1) return 1;
      return 0;
    }),
    documentaries: MOCK_CONTENT.filter(c => c.type === 'documentary'),
    newReleases: [...MOCK_CONTENT]
      .filter(c => c.year?.includes('2024') || c.year?.includes('2025') || c.year?.includes('2026'))
      .filter(c => !c.trending)
      .slice(0, 10),
  };
}
