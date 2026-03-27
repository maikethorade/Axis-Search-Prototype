import { useState, useMemo, useEffect } from 'react';
import { MOCK_CONTENT, ContentItem, ContentType } from '../lib/mock-data';
import { useDebounce } from 'use-debounce';

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
    
    let expandedTags = [...queryWords];
    queryWords.forEach(word => {
      if (SEMANTIC_MAP[word]) {
        expandedTags = [...expandedTags, ...SEMANTIC_MAP[word]];
      }
    });

    const scoredItems = MOCK_CONTENT.map(item => {
      let score = 0;
      
      const titleLower = item.title.toLowerCase();
      const descLower = item.description.toLowerCase();
      
      if (titleLower.includes(lowerQuery)) score += 50;
      if (queryWords.some(w => titleLower.includes(w))) score += 20;
      
      item.tags.forEach(tag => {
        if (expandedTags.includes(tag.toLowerCase())) score += 10;
      });
      item.genre.forEach(g => {
        if (expandedTags.includes(g.toLowerCase())) score += 10;
      });
      
      if (queryWords.some(w => descLower.includes(w))) score += 5;

      return { item, score };
    }).filter(x => x.score > 0);

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
      MOCK_CONTENT.find(c => c.id === 'd1')!,
    ].filter(Boolean),
    trending: MOCK_CONTENT.filter(c => c.trending),
    personalized: [...MOCK_CONTENT].sort((a, b) => (b.personalizedScore || 0) - (a.personalizedScore || 0)).slice(0, 10),
    liveSports,
    sportHighlights,
    movies: MOCK_CONTENT.filter(c => c.type === 'movie'),
    series: MOCK_CONTENT.filter(c => c.type === 'series'),
    documentaries: MOCK_CONTENT.filter(c => c.type === 'documentary'),
    newReleases: [...MOCK_CONTENT].filter(c => c.year?.includes('2025') || c.year?.includes('2026')).slice(0, 10),
  };
}
