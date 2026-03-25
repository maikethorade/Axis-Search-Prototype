import { useState, useMemo, useEffect } from 'react';
import { MOCK_CONTENT, ContentItem, ContentType } from '../lib/mock-data';
import { useDebounce } from 'use-debounce';

// Semantic mapping: Map abstract intents to concrete tags
const SEMANTIC_MAP: Record<string, string[]> = {
  'exciting': ['action', 'thriller', 'sports', 'live', 'fast', 'intense'],
  'thrilling': ['action', 'thriller', 'sports', 'intense'],
  'relaxing': ['documentary', 'nature', 'calm', 'ocean', 'space'],
  'chill': ['documentary', 'nature', 'calm'],
  'funny': ['comedy', 'laugh'],
  'game': ['sports', 'live', 'football', 'basketball', 'tennis', 'nba'],
  'match': ['sports', 'football', 'tennis'],
  'race': ['motorsport', 'f1', 'cars'],
  'space': ['universe', 'stars', 'sci-fi']
};

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
    
    // 1. Expand query with semantic mapping
    let expandedTags = [...queryWords];
    queryWords.forEach(word => {
      if (SEMANTIC_MAP[word]) {
        expandedTags = [...expandedTags, ...SEMANTIC_MAP[word]];
      }
    });

    // 2. Score and filter items
    const scoredItems = MOCK_CONTENT.map(item => {
      let score = 0;
      
      const titleLower = item.title.toLowerCase();
      const descLower = item.description.toLowerCase();
      
      // Exact title match (high score)
      if (titleLower.includes(lowerQuery)) score += 50;
      // Partial title match
      if (queryWords.some(w => titleLower.includes(w))) score += 20;
      
      // Tag/Genre matching (Semantic)
      item.tags.forEach(tag => {
        if (expandedTags.includes(tag.toLowerCase())) score += 10;
      });
      item.genre.forEach(g => {
        if (expandedTags.includes(g.toLowerCase())) score += 10;
      });
      
      // Description match
      if (queryWords.some(w => descLower.includes(w))) score += 5;

      return { item, score };
    }).filter(x => x.score > 0);

    // Sort by score descending
    scoredItems.sort((a, b) => b.score - a.score);
    
    let filteredItems = scoredItems.map(x => x.item);
    
    // Apply content type filter
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
  const allSports = MOCK_CONTENT.filter(c => c.type === 'sport' || c.type === 'live');
  const football = MOCK_CONTENT.filter(c => c.genre.some(g => g === 'Football' || g === 'Soccer'));
  const liveSports = MOCK_CONTENT.filter(c => c.type === 'live');
  const nonFootballSports = allSports.filter(c => !c.genre.some(g => g === 'Football' || g === 'Soccer'));

  return {
    hero: MOCK_CONTENT.find(c => c.id === 'hero_marty'),
    trending: MOCK_CONTENT.filter(c => c.trending),
    personalized: [...MOCK_CONTENT].sort((a, b) => (b.personalizedScore || 0) - (a.personalizedScore || 0)).slice(0, 8),
    sports: allSports,
    football,
    liveSports,
    otherSports: nonFootballSports,
    movies: MOCK_CONTENT.filter(c => c.type === 'movie'),
    series: MOCK_CONTENT.filter(c => c.type === 'series'),
    documentaries: MOCK_CONTENT.filter(c => c.type === 'documentary'),
    newReleases: [...MOCK_CONTENT].filter(c => c.year?.includes('2024') || c.year?.includes('2025')).slice(0, 8),
  };
}
