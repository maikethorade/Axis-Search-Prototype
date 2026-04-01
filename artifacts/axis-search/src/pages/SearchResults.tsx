import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useLocation } from 'wouter';
import { Navigation } from '../components/Navigation';
import { ContentCard } from '../components/ContentCard';
import { ContentModal } from '../components/ContentModal';
import { SearchOverlay } from '../components/SearchOverlay';
import { VoiceSearch } from '../components/VoiceSearch';
import { useSearch } from '../hooks/use-search';
import { ContentItem, MOCK_CONTENT, TRENDING_SEARCHES, RECENT_SEARCHES } from '../lib/mock-data';
import { PlayCircle, Search, Filter, Film, Tv, Trophy, Radio, BookOpen, Clock, TrendingUp, Sparkles, ChevronLeft, ChevronRight, ChevronDown, Check, ArrowUpDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FILTER_GENRES = ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Thriller', 'Romance', 'Documentary', 'Animation', 'Crime'];
const FILTER_SUBTITLES = ['English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese'];
const FILTER_CHANNELS = ['AXIS Originals', 'Sky Sports', 'BBC', 'ITV', 'Channel 4', 'HBO', 'Showtime', 'Paramount+', 'Discovery', 'Eurosport'];
const FILTER_TYPES = ['Movies', 'TV Shows', 'Videos', 'Shorts', 'Playlists', 'Channels'];
const FILTER_DURATIONS = ['Under 30 minutes', '30-60 minutes', 'Over 60 minutes'];
const FILTER_UPLOAD_DATES = ['Today', 'This week', 'This month', 'This year'];

function parseDurationMinutes(duration?: string): number {
  if (!duration) return 45;
  const parts = duration.match(/(\d+)\s*h/);
  const minParts = duration.match(/(\d+)\s*m/);
  let total = 0;
  if (parts) total += parseInt(parts[1]) * 60;
  if (minParts) total += parseInt(minParts[1]);
  if (total === 0) {
    const num = parseInt(duration);
    if (!isNaN(num)) total = num;
    else total = 45;
  }
  return total;
}

function matchesDuration(item: ContentItem, selected: string | null): boolean {
  if (!selected) return true;
  const mins = parseDurationMinutes(item.duration);
  switch (selected) {
    case 'Under 30 minutes': return mins < 30;
    case '30-60 minutes': return mins >= 30 && mins <= 60;
    case 'Over 60 minutes': return mins > 60;
    default: return true;
  }
}

function matchesUploadDate(item: ContentItem, selected: string | null): boolean {
  if (!selected) return true;
  const year = parseInt(item.year || '0');
  const currentYear = new Date().getFullYear();
  switch (selected) {
    case 'Today': return year >= currentYear;
    case 'This week': return year >= currentYear;
    case 'This month': return year >= currentYear;
    case 'This year': return year >= currentYear - 1;
    default: return true;
  }
}

function ResultsRail({ items, onSelect, aspectRatio = 'poster' as const }: {
  items: ContentItem[];
  onSelect: (item: ContentItem) => void;
  aspectRatio?: 'video' | 'poster';
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    return () => el.removeEventListener('scroll', checkScroll);
  }, [checkScroll, items]);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.75;
    el.scrollBy({ left: direction === 'right' ? amount : -amount, behavior: 'smooth' });
  };

  return (
    <div className="relative group/rail">
      <div ref={scrollRef} className="flex gap-4 overflow-x-auto overflow-y-hidden pb-4 no-scrollbar snap-x">
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            className="snap-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <ContentCard item={item} onClick={onSelect} aspectRatio={aspectRatio} />
          </motion.div>
        ))}
      </div>
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="hidden md:flex absolute left-0 top-0 bottom-4 w-12 items-center justify-center bg-gradient-to-r from-black/80 to-transparent z-10 opacity-0 group-hover/rail:opacity-100 transition-opacity duration-300 cursor-pointer"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-7 h-7 text-white" />
        </button>
      )}
      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="hidden md:flex absolute right-0 top-0 bottom-4 w-12 items-center justify-center bg-gradient-to-l from-black/80 to-transparent z-10 opacity-0 group-hover/rail:opacity-100 transition-opacity duration-300 cursor-pointer"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-7 h-7 text-white" />
        </button>
      )}
    </div>
  );
}

const TAB_LABELS: Record<string, string> = {
  all: 'All',
  unwatched: 'Unwatched',
  watched: 'Watched',
  recent: 'Recently uploaded',
  live: 'Live',
};

const CATEGORY_CONFIG: { type: string; label: string; tagline?: string; icon: React.ReactNode }[] = [
  { type: 'movie', label: 'Top results', icon: <Film className="w-5 h-5" style={{ color: 'var(--axis-brand)' }} /> },
  { type: 'series', label: 'Just for you', tagline: 'Movies we think you might like', icon: <Tv className="w-5 h-5" style={{ color: 'var(--axis-brand)' }} /> },
  { type: 'documentary', label: 'Documentaries', icon: <BookOpen className="w-5 h-5" style={{ color: 'var(--axis-gold)' }} /> },
];

export default function SearchResults() {
  const [location, setLocation] = useLocation();
  const initialQuery = new URLSearchParams(window.location.search).get('q') || '';

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [freeToMe, setFreeToMe] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedSubtitles, setSelectedSubtitles] = useState<string[]>([]);
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);
  const [selectedUploadDate, setSelectedUploadDate] = useState<string | null>(null);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [prioritiseBy, setPrioritiseBy] = useState<'relevance' | 'popularity'>('relevance');
  const [sortBy, setSortBy] = useState<'none' | 'a-z' | 'z-a' | 'recency' | 'oldest'>('none');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const filtersRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);
  
  const { query, setQuery, results, debouncedQuery } = useSearch(initialQuery);
  const [activeTab, setActiveTab] = useState<string>('all');

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (filtersRef.current && !filtersRef.current.contains(e.target as Node)) {
        setIsFiltersOpen(false);
      }
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setIsSortOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleFilter = (value: string, selected: string[], setSelected: React.Dispatch<React.SetStateAction<string[]>>) => {
    setSelected(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
  };

  const activeFilterCount = selectedGenres.length + selectedSubtitles.length + selectedChannels.length + selectedTypes.length + (freeToMe ? 1 : 0) + (selectedDuration ? 1 : 0) + (selectedUploadDate ? 1 : 0);

  useEffect(() => {
    const urlQuery = new URLSearchParams(window.location.search).get('q') || '';
    if (urlQuery && urlQuery !== query) {
      setQuery(urlQuery);
      setActiveTab('all');
    }
  }, [location]);

  useEffect(() => {
    if (debouncedQuery.trim()) {
      const currentUrl = new URLSearchParams(window.location.search).get('q') || '';
      if (currentUrl !== debouncedQuery.trim()) {
        window.history.replaceState(null, '', `/search?q=${encodeURIComponent(debouncedQuery.trim())}`);
      }
      try {
        const stored = localStorage.getItem('axis-recent-searches');
        const recent: string[] = stored ? JSON.parse(stored) : [];
        const term = debouncedQuery.trim();
        const updated = [term, ...recent.filter(s => s.toLowerCase() !== term.toLowerCase())].slice(0, 6);
        localStorage.setItem('axis-recent-searches', JSON.stringify(updated));
      } catch {}
    }
  }, [debouncedQuery]);

  const hasQuery = debouncedQuery.trim().length > 0;
  const hasResults = results.items.length > 0;

  const hasActiveFilters = selectedTypes.length > 0 || selectedGenres.length > 0 || selectedChannels.length > 0 || selectedSubtitles.length > 0 || selectedDuration !== null || selectedUploadDate !== null || freeToMe;

  const typeMap: Record<string, string[]> = {
    'Movies': ['movie'],
    'TV Shows': ['series'],
    'Videos': ['sport'],
    'Shorts': ['live'],
    'Playlists': ['documentary'],
    'Channels': [],
  };

  const applyFilters = (items: ContentItem[]) => {
    if (selectedTypes.length > 0) {
      const allowedTypes = selectedTypes.flatMap(t => typeMap[t] || []);
      if (allowedTypes.length > 0) {
        items = items.filter(item => allowedTypes.includes(item.type));
      }
    }
    if (selectedGenres.length > 0) {
      items = items.filter(item =>
        item.genre.some(g => selectedGenres.some(sg => g.toLowerCase() === sg.toLowerCase()))
      );
    }
    if (selectedChannels.length > 0) {
      items = items.filter(item =>
        item.tags.some(t => selectedChannels.some(sc => t.toLowerCase().includes(sc.toLowerCase()))) ||
        selectedChannels.some(sc => item.description.toLowerCase().includes(sc.toLowerCase()))
      );
    }
    if (selectedSubtitles.length > 0) {
      items = items.filter(item =>
        item.tags.some(t => selectedSubtitles.some(ss => t.toLowerCase().includes(ss.toLowerCase())))
      );
    }
    items = items.filter(item => matchesDuration(item, selectedDuration));
    items = items.filter(item => matchesUploadDate(item, selectedUploadDate));
    return items;
  };

  const sortedItems = useMemo(() => {
    let items = [...results.items];

    if (activeTab === 'unwatched') {
      items = items.filter(item => !item.personalizedScore || item.personalizedScore < 50);
    } else if (activeTab === 'watched') {
      items = items.filter(item => item.personalizedScore && item.personalizedScore >= 50);
    } else if (activeTab === 'recent') {
      items = items.filter(item => item.year && item.year >= 2024);
    } else if (activeTab === 'live') {
      items = items.filter(item => item.type === 'live');
    }

    items = applyFilters(items);

    const filterCount = selectedTypes.length + selectedGenres.length + selectedChannels.length + selectedSubtitles.length + (selectedDuration ? 1 : 0) + (selectedUploadDate ? 1 : 0) + (freeToMe ? 1 : 0);
    if (filterCount > 0 && items.length > 0) {
      const maxItems = Math.max(1, Math.ceil(items.length * Math.max(0.2, 1 - filterCount * 0.15)));
      items = items.slice(0, maxItems);
    }

    if (prioritiseBy === 'popularity') {
      items.sort((a, b) => {
        const aScore = (a.personalizedScore || 0) + (a.trending ? 10 : 0);
        const bScore = (b.personalizedScore || 0) + (b.trending ? 10 : 0);
        return bScore - aScore;
      });
    }

    if (sortBy === 'a-z') {
      items.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'z-a') {
      items.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortBy === 'recency') {
      items.sort((a, b) => (b.year || 0) - (a.year || 0));
    } else if (sortBy === 'oldest') {
      items.sort((a, b) => (a.year || 0) - (b.year || 0));
    }

    return items;
  }, [results.items, activeTab, hasActiveFilters, prioritiseBy, sortBy, freeToMe, selectedDuration, selectedUploadDate, selectedTypes, selectedGenres, selectedChannels, selectedSubtitles]);

  const categorizedResults = useMemo(() => {
    if (activeTab !== 'all') return null;
    const groups: Record<string, ContentItem[]> = {};
    sortedItems.forEach(item => {
      if (!groups[item.type]) groups[item.type] = [];
      groups[item.type].push(item);
    });
    return groups;
  }, [sortedItems, activeTab]);

  const personalizedSuggestions = useMemo(() => {
    return [...MOCK_CONTENT]
      .sort((a, b) => (b.personalizedScore || 0) - (a.personalizedScore || 0))
      .slice(0, 10);
  }, []);

  const moreToExplore = useMemo(() => {
    const topIds = new Set(sortedItems.slice(0, 5).map(i => i.id));
    const remaining = sortedItems.slice(5);

    const recentYear = (item: ContentItem) => {
      const y = parseInt(item.year || '0');
      return y >= 2024 ? 3 : y >= 2022 ? 2 : y >= 2020 ? 1 : 0;
    };

    const seen = new Set(remaining.map(i => i.id));
    topIds.forEach(id => seen.add(id));

    const fillers = [...MOCK_CONTENT]
      .filter(item => !seen.has(item.id))
      .map(item => {
        let score = 0;
        score += (item.personalizedScore || 0) * 2;
        score += recentYear(item) * 3;
        score += item.trending ? 5 : 0;
        const searchTypes = new Set(sortedItems.map(i => i.type));
        if (searchTypes.has(item.type)) score += 4;
        const searchGenres = new Set(sortedItems.flatMap(i => i.genre.map(g => g.toLowerCase())));
        item.genre.forEach(g => { if (searchGenres.has(g.toLowerCase())) score += 3; });
        const searchTags = new Set(sortedItems.flatMap(i => i.tags.map(t => t.toLowerCase())));
        item.tags.forEach(t => { if (searchTags.has(t.toLowerCase())) score += 2; });
        return { item, score };
      })
      .sort((a, b) => b.score - a.score)
      .map(x => x.item);

    const combined = [...remaining, ...fillers];
    const uniqueIds = new Set<string>();
    return combined.filter(item => {
      if (uniqueIds.has(item.id) || topIds.has(item.id)) return false;
      uniqueIds.add(item.id);
      return true;
    }).slice(0, 10);
  }, [sortedItems]);

  return (
    <div className="min-h-screen bg-background text-foreground pb-24 overflow-x-hidden">
      <Navigation onOpenSearch={() => setIsSearchOpen(true)} onOpenVoice={() => setIsVoiceOpen(true)} searchQuery={query} onSearchQueryChange={setQuery} />
      
      <div className="pt-44 md:pt-32 rails-container">
        {hasQuery ? (
          <>
            <div className="mb-8" style={{ paddingRight: 'max(24px, calc((100vw - 1280px) / 2 + 48px))' }}>
              <h1 className="text-2xl md:text-4xl font-bold text-white mb-3">
                Search Results
              </h1>
              <p className="text-base" style={{ color: 'var(--axis-text-secondary)' }}>
                Showing {results.totalCount} results for <span className="text-white font-medium">"{debouncedQuery}"</span>
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-5 border-b border-white/10" style={{ paddingRight: 'max(24px, calc((100vw - 1280px) / 2 + 48px))' }}>
              <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
                {(['all', 'unwatched', 'watched', 'recent', 'live'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className="px-5 py-2 rounded-sm text-sm font-medium whitespace-nowrap transition-colors"
                    style={activeTab === tab 
                      ? { background: 'var(--axis-brand)', color: '#fff' } 
                      : { background: 'hsla(0, 0%, 100%, 0.05)', color: 'hsla(0, 0%, 100%, 0.7)' }
                    }
                  >
                    {TAB_LABELS[tab]}
                  </button>
                ))}
              </div>
              
              <div className="flex items-center gap-2">
              <div className="relative" ref={sortRef}>
                <button
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className="flex items-center gap-2 px-4 py-2 rounded text-sm transition-colors"
                  style={{
                    border: `1px solid ${isSortOpen || sortBy !== 'none' ? 'var(--axis-brand)' : 'hsla(0, 0%, 100%, 0.1)'}`,
                    color: isSortOpen || sortBy !== 'none' ? '#fff' : 'hsla(0, 0%, 100%, 0.8)',
                    background: isSortOpen ? 'hsla(0, 0%, 100%, 0.05)' : 'transparent',
                  }}
                >
                  <ArrowUpDown className="w-4 h-4" />
                  Sorting{sortBy !== 'none' ? ` · ${{ 'a-z': 'A–Z', 'z-a': 'Z–A', 'recency': 'Newest', 'oldest': 'Oldest' }[sortBy]}` : ''}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isSortOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-48 rounded-lg overflow-hidden z-50"
                      style={{ background: 'var(--axis-surface)', border: '1px solid hsla(0, 0%, 100%, 0.1)', boxShadow: '0 16px 48px rgba(0,0,0,0.5)' }}
                    >
                      {([
                        { value: 'none' as const, label: 'None' },
                        { value: 'a-z' as const, label: 'A–Z' },
                        { value: 'z-a' as const, label: 'Z–A' },
                        { value: 'recency' as const, label: 'Newest first' },
                        { value: 'oldest' as const, label: 'Oldest first' },
                      ]).map(option => (
                        <button
                          key={option.value}
                          onClick={() => { setSortBy(option.value); setIsSortOpen(false); }}
                          className="w-full flex items-center justify-between px-4 py-3 text-sm text-left hover:bg-white/5 transition-colors"
                          style={{ color: sortBy === option.value ? '#fff' : 'hsla(0, 0%, 100%, 0.7)' }}
                        >
                          {option.label}
                          {sortBy === option.value && <Check className="w-4 h-4" style={{ color: 'var(--axis-brand)' }} />}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="relative" ref={filtersRef}>
                <button
                  onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                  className="flex items-center gap-2 px-4 py-2 rounded text-sm transition-colors"
                  style={{
                    border: `1px solid ${isFiltersOpen || activeFilterCount > 0 ? 'var(--axis-brand)' : 'hsla(0, 0%, 100%, 0.1)'}`,
                    color: isFiltersOpen || activeFilterCount > 0 ? '#fff' : 'hsla(0, 0%, 100%, 0.8)',
                    background: isFiltersOpen ? 'hsla(0, 0%, 100%, 0.05)' : 'transparent',
                  }}
                >
                  <Filter className="w-4 h-4" />
                  Filters{activeFilterCount > 0 && ` (${activeFilterCount})`}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isFiltersOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isFiltersOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-72 rounded-lg overflow-hidden z-50"
                      style={{ background: 'var(--axis-surface)', border: '1px solid hsla(0, 0%, 100%, 0.1)', boxShadow: '0 16px 48px rgba(0,0,0,0.5)' }}
                    >
                      <div className="px-4 py-3 flex items-center justify-between border-b border-white/10">
                        <span className="text-sm font-semibold text-white">Free to me</span>
                        <button
                          onClick={() => setFreeToMe(!freeToMe)}
                          className="w-10 h-6 rounded-full transition-colors relative"
                          style={{ background: freeToMe ? 'var(--axis-brand)' : 'hsla(0, 0%, 100%, 0.15)' }}
                        >
                          <div
                            className="absolute top-1 w-4 h-4 rounded-full bg-white transition-transform"
                            style={{ left: freeToMe ? '22px' : '4px' }}
                          />
                        </button>
                      </div>

                      {[
                        { key: 'type', label: 'Type', items: FILTER_TYPES, type: 'multi' as const, selected: selectedTypes, setSelected: setSelectedTypes },
                        { key: 'genres', label: 'Genres', items: FILTER_GENRES, type: 'multi' as const, selected: selectedGenres, setSelected: setSelectedGenres },
                        { key: 'channels', label: 'Channels', items: FILTER_CHANNELS, type: 'multi' as const, selected: selectedChannels, setSelected: setSelectedChannels },
                        { key: 'subtitles', label: 'Subtitles', items: FILTER_SUBTITLES, type: 'multi' as const, selected: selectedSubtitles, setSelected: setSelectedSubtitles },
                        { key: 'duration', label: 'Duration', items: FILTER_DURATIONS, type: 'radio' as const, selectedValue: selectedDuration, onSelect: (v: string) => setSelectedDuration(selectedDuration === v ? null : v) },
                        { key: 'uploadDate', label: 'Upload date', items: FILTER_UPLOAD_DATES, type: 'radio' as const, selectedValue: selectedUploadDate, onSelect: (v: string) => setSelectedUploadDate(selectedUploadDate === v ? null : v) },
                        { key: 'priority', label: 'Priority', items: ['Relevance', 'Popularity'], type: 'radio' as const, selectedValue: prioritiseBy === 'relevance' ? 'Relevance' : 'Popularity', onSelect: (v: string) => setPrioritiseBy(v === 'Relevance' ? 'relevance' : 'popularity') },
                      ].map(section => (
                        <div key={section.key} className="border-b border-white/5 last:border-b-0">
                          <button
                            onClick={() => setOpenAccordion(openAccordion === section.key ? null : section.key)}
                            className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-white/90 hover:bg-white/5 transition-colors"
                          >
                            <span>
                              {section.label}
                              {section.type === 'radio' && section.selectedValue && (
                                <span className="ml-2 text-xs px-1.5 py-0.5 rounded-full" style={{ background: 'var(--axis-brand)', color: '#fff' }}>1</span>
                              )}
                              {section.type === 'multi' && section.selected && section.selected.length > 0 && (
                                <span className="ml-2 text-xs px-1.5 py-0.5 rounded-full" style={{ background: 'var(--axis-brand)', color: '#fff' }}>
                                  {section.selected.length}
                                </span>
                              )}
                            </span>
                            <ChevronDown className={`w-4 h-4 transition-transform text-white/50 ${openAccordion === section.key ? 'rotate-180' : ''}`} />
                          </button>
                          <AnimatePresence>
                            {openAccordion === section.key && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="px-2 pb-2">
                                  {section.type === 'radio' ? (
                                    section.items.map(item => (
                                      <button
                                        key={item}
                                        onClick={() => section.onSelect(item)}
                                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-left rounded hover:bg-white/5 transition-colors"
                                        style={{ color: section.selectedValue === item ? '#fff' : 'hsla(0, 0%, 100%, 0.7)' }}
                                      >
                                        <div
                                          className="w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors"
                                          style={{
                                            borderColor: section.selectedValue === item ? 'var(--axis-brand)' : 'hsla(0, 0%, 100%, 0.3)',
                                          }}
                                        >
                                          {section.selectedValue === item && <div className="w-2 h-2 rounded-full" style={{ background: 'var(--axis-brand)' }} />}
                                        </div>
                                        {item}
                                      </button>
                                    ))
                                  ) : (
                                    section.items.map(item => (
                                      <button
                                        key={item}
                                        onClick={() => toggleFilter(item, section.selected!, section.setSelected!)}
                                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-left rounded hover:bg-white/5 transition-colors"
                                        style={{ color: section.selected!.includes(item) ? '#fff' : 'hsla(0, 0%, 100%, 0.7)' }}
                                      >
                                        <div
                                          className="w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors"
                                          style={{
                                            borderColor: section.selected!.includes(item) ? 'var(--axis-brand)' : 'hsla(0, 0%, 100%, 0.3)',
                                            background: section.selected!.includes(item) ? 'var(--axis-brand)' : 'transparent',
                                          }}
                                        >
                                          {section.selected!.includes(item) && <Check className="w-3 h-3 text-white" />}
                                        </div>
                                        {item}
                                      </button>
                                    ))
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              </div>
            </div>

            {hasResults && sortedItems.length === 0 && hasActiveFilters && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-16 text-center"
                style={{ paddingRight: 'max(24px, calc((100vw - 1280px) / 2 + 48px))' }}
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5" style={{ background: 'var(--axis-surface)' }}>
                  <Filter className="w-7 h-7 text-white/20" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">No matches for these filters</h3>
                <p className="text-sm max-w-sm mb-6" style={{ color: 'var(--axis-text-tertiary)' }}>
                  Your current filter combination is too narrow. Try removing some filters to see more results for "{debouncedQuery}".
                </p>
                <div className="flex flex-wrap gap-2 justify-center mb-6 max-w-md">
                  {selectedTypes.map(t => (
                    <button key={t} onClick={() => setSelectedTypes(prev => prev.filter(x => x !== t))} className="px-3 py-1.5 rounded text-xs font-medium text-white/80 hover:bg-white/15 hover:text-white transition-colors cursor-pointer" style={{ background: 'hsla(0, 0%, 100%, 0.08)', border: '1px solid hsla(0, 0%, 100%, 0.1)' }}>
                      {t} ✕
                    </button>
                  ))}
                  {selectedGenres.map(g => (
                    <button key={g} onClick={() => setSelectedGenres(prev => prev.filter(x => x !== g))} className="px-3 py-1.5 rounded text-xs font-medium text-white/80 hover:bg-white/15 hover:text-white transition-colors cursor-pointer" style={{ background: 'hsla(0, 0%, 100%, 0.08)', border: '1px solid hsla(0, 0%, 100%, 0.1)' }}>
                      {g} ✕
                    </button>
                  ))}
                  {selectedChannels.map(c => (
                    <button key={c} onClick={() => setSelectedChannels(prev => prev.filter(x => x !== c))} className="px-3 py-1.5 rounded text-xs font-medium text-white/80 hover:bg-white/15 hover:text-white transition-colors cursor-pointer" style={{ background: 'hsla(0, 0%, 100%, 0.08)', border: '1px solid hsla(0, 0%, 100%, 0.1)' }}>
                      {c} ✕
                    </button>
                  ))}
                  {selectedSubtitles.map(s => (
                    <button key={s} onClick={() => setSelectedSubtitles(prev => prev.filter(x => x !== s))} className="px-3 py-1.5 rounded text-xs font-medium text-white/80 hover:bg-white/15 hover:text-white transition-colors cursor-pointer" style={{ background: 'hsla(0, 0%, 100%, 0.08)', border: '1px solid hsla(0, 0%, 100%, 0.1)' }}>
                      {s} ✕
                    </button>
                  ))}
                  {selectedDuration && (
                    <button onClick={() => setSelectedDuration(null)} className="px-3 py-1.5 rounded text-xs font-medium text-white/80 hover:bg-white/15 hover:text-white transition-colors cursor-pointer" style={{ background: 'hsla(0, 0%, 100%, 0.08)', border: '1px solid hsla(0, 0%, 100%, 0.1)' }}>
                      {selectedDuration} ✕
                    </button>
                  )}
                  {selectedUploadDate && (
                    <button onClick={() => setSelectedUploadDate(null)} className="px-3 py-1.5 rounded text-xs font-medium text-white/80 hover:bg-white/15 hover:text-white transition-colors cursor-pointer" style={{ background: 'hsla(0, 0%, 100%, 0.08)', border: '1px solid hsla(0, 0%, 100%, 0.1)' }}>
                      {selectedUploadDate} ✕
                    </button>
                  )}
                  {freeToMe && (
                    <button onClick={() => setFreeToMe(false)} className="px-3 py-1.5 rounded text-xs font-medium text-white/80 hover:bg-white/15 hover:text-white transition-colors cursor-pointer" style={{ background: 'hsla(0, 0%, 100%, 0.08)', border: '1px solid hsla(0, 0%, 100%, 0.1)' }}>
                      Free to me ✕
                    </button>
                  )}
                </div>
                <button
                  onClick={() => {
                    setSelectedTypes([]);
                    setSelectedGenres([]);
                    setSelectedChannels([]);
                    setSelectedSubtitles([]);
                    setSelectedDuration(null);
                    setSelectedUploadDate(null);
                    setFreeToMe(false);
                  }}
                  className="px-5 py-2 rounded text-sm font-medium transition-colors hover:opacity-90"
                  style={{ background: 'var(--axis-brand)', color: '#fff' }}
                >
                  Clear all filters
                </button>
              </motion.div>
            )}

            {sortedItems.length > 0 ? (
              <div className="space-y-14">
                {activeTab === 'all' && sortedItems.length > 0 && (() => {
                  const topItems = sortedItems.slice(0, 5);
                  return (
                    <motion.section
                      key="top-results"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{ paddingRight: 'max(24px, calc((100vw - 1280px) / 2 + 48px))' }}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <h2 className="text-lg md:text-xl font-bold text-white">Top results</h2>
                        <span className="text-xs ml-auto" style={{ color: 'var(--axis-text-tertiary)' }}>{sortedItems.length} result{sortedItems.length !== 1 ? 's' : ''}</span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {topItems.map((item, i) => (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                          >
                            <ContentCard item={item} onClick={setSelectedItem} fillWidth />
                          </motion.div>
                        ))}
                      </div>
                    </motion.section>
                  );
                })()}

                {results.moments.length > 0 && activeTab === 'all' && (
                  <motion.section 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative py-8"
                    style={{ paddingRight: 'max(24px, calc((100vw - 1280px) / 2 + 48px))' }}
                  >
                    <div className="absolute inset-0" style={{
                      background: 'hsla(0, 0%, 100%, 0.05)',
                      left: 'calc(-1 * max(24px, calc((100vw - 1280px) / 2 + 48px)))',
                      right: 'calc(-1 * max(24px, calc((100vw - 1280px) / 2 + 48px)))',
                    }} />
                    <div className="relative">
                      <div className="flex items-center gap-3 mb-6">
                        <h2 className="text-lg md:text-xl font-bold text-white">Moments inside videos</h2>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {results.moments.map(m => (
                          <div key={m.id} className="group cursor-pointer">
                            <div className="relative aspect-video overflow-hidden mb-3 transition-colors">
                              <img src={m.thumbnailUrl} alt={m.title} className="w-full h-full object-cover" />
                              <div className="absolute inset-0 group-hover:bg-black/20 transition-colors" style={{ background: 'var(--axis-overlay)' }} />
                              <div className="absolute bottom-2 right-2 px-2 py-1 text-xs font-mono text-white" style={{ background: 'rgba(0,0,0,0.8)' }}>
                                {m.timestamp}
                              </div>
                            </div>
                            <h4 className="font-bold text-sm text-white/90 group-hover:text-[var(--axis-brand)] transition-colors">{m.title}</h4>
                            <p className="text-xs truncate" style={{ color: 'var(--axis-text-tertiary)' }}>{m.episode ? `${m.episode} · ${m.timestamp}` : `Found in: ${m.parentTitle}`}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.section>
                )}

                {activeTab === 'all' && moreToExplore.length > 0 && (
                  <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ paddingRight: 'max(24px, calc((100vw - 1280px) / 2 + 48px))' }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <h2 className="text-lg md:text-xl font-bold text-white">More to explore</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                      {moreToExplore.map((item, i) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                        >
                          <ContentCard item={item} onClick={setSelectedItem} fillWidth />
                        </motion.div>
                      ))}
                    </div>
                  </motion.section>
                )}

                {activeTab !== 'all' && sortedItems.length > 0 && (
                  <section style={{ paddingRight: 'max(24px, calc((100vw - 1280px) / 2 + 48px))' }}>
                    <div className={activeTab === 'live'
                      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                      : "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
                    }>
                      {sortedItems.map((item, i) => (
                        <motion.div 
                          key={item.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                        >
                          <ContentCard 
                            item={item} 
                            onClick={setSelectedItem} 
                            aspectRatio={activeTab === 'live' ? 'video' : 'poster'}
                            fillWidth
                          />
                        </motion.div>
                      ))}
                    </div>
                  </section>
                )}

                {activeTab !== 'all' && sortedItems.length === 0 && !hasActiveFilters && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                    style={{ paddingRight: 'max(24px, calc((100vw - 1280px) / 2 + 48px))' }}
                  >
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5" style={{ background: 'var(--axis-surface)' }}>
                      {activeTab === 'unwatched' && <Sparkles className="w-7 h-7 text-white/20" />}
                      {activeTab === 'watched' && <Clock className="w-7 h-7 text-white/20" />}
                      {activeTab === 'recent' && <TrendingUp className="w-7 h-7 text-white/20" />}
                      {activeTab === 'live' && <Radio className="w-7 h-7 text-white/20" />}
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {activeTab === 'unwatched' && 'Nothing new to discover here'}
                      {activeTab === 'watched' && "You haven't watched anything matching this search"}
                      {activeTab === 'recent' && 'No recent uploads match your search'}
                      {activeTab === 'live' && 'No live content right now'}
                    </h3>
                    <p className="text-sm max-w-sm" style={{ color: 'var(--axis-text-tertiary)' }}>
                      {activeTab === 'unwatched' && 'All matching results have already been viewed. Try a different search to find fresh content.'}
                      {activeTab === 'watched' && 'Search for something you\'ve seen before, or switch to All to browse everything.'}
                      {activeTab === 'recent' && 'Nothing has been uploaded recently for this search. Check back soon or broaden your query.'}
                      {activeTab === 'live' && 'There are no live streams matching your search at the moment. Try again later or explore other tabs.'}
                    </p>
                    <button
                      onClick={() => setActiveTab('all')}
                      className="mt-6 px-5 py-2 rounded text-sm font-medium transition-colors hover:opacity-90"
                      style={{ background: 'var(--axis-brand)', color: '#fff' }}
                    >
                      View all results
                    </button>
                  </motion.div>
                )}
              </div>
            ) : !hasActiveFilters ? (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-20 text-center px-4"
              >
                <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6" style={{ background: 'var(--axis-surface)' }}>
                  <Search className="w-8 h-8 text-white/20" />
                </div>
                <h2 className="text-xl font-bold text-white mb-2">No results found</h2>
                <p className="max-w-md mb-8" style={{ color: 'var(--axis-text-tertiary)' }}>
                  We couldn't find anything matching "{debouncedQuery}". Try adjusting your filters or searching for something else.
                </p>
                
                <div className="w-full max-w-2xl p-8 text-center" style={{ background: 'hsla(0, 0%, 100%, 0.05)', border: '1px solid hsla(0, 0%, 100%, 0.05)', borderRadius: '16px' }}>
                  <h3 className="text-base font-bold text-white mb-4">Trending now</h3>
                  <div className="flex flex-wrap gap-3 justify-center">
                    {TRENDING_SEARCHES.map(s => (
                      <button 
                        key={s}
                        onClick={() => { setQuery(s); window.history.replaceState(null, '', `/search?q=${encodeURIComponent(s)}`); }}
                        className="px-4 py-2 rounded text-white text-sm transition-colors hover:opacity-80"
                        style={{ background: 'var(--axis-brand)' }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : null}
          </>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-14">
            <div className="pr-6 md:pr-12">
              <h1 className="text-2xl md:text-4xl font-bold text-white mb-3">
                Discover
              </h1>
              <p className="text-base" style={{ color: 'var(--axis-text-secondary)' }}>
                Browse trending content or search for something specific.
              </p>
            </div>

            <section>
              <div className="flex items-center gap-3 mb-5">
                <Clock className="w-5 h-5 text-white/50" />
                <h2 className="text-lg font-bold text-white">Recent Searches</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {RECENT_SEARCHES.map(s => (
                  <button
                    key={s}
                    onClick={() => { setQuery(s); window.history.replaceState(null, '', `/search?q=${encodeURIComponent(s)}`); }}
                    className="px-4 py-2.5 rounded text-white/80 transition-colors text-sm font-medium hover:text-white"
                    style={{ background: 'hsla(0, 0%, 100%, 0.05)', border: '1px solid hsla(0, 0%, 100%, 0.05)' }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-5">
                <h2 className="text-lg font-bold text-white">Trending Now</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {TRENDING_SEARCHES.map(s => (
                  <button
                    key={s}
                    onClick={() => { setQuery(s); window.history.replaceState(null, '', `/search?q=${encodeURIComponent(s)}`); }}
                    className="px-4 py-2.5 rounded text-white/80 transition-colors text-sm font-medium hover:text-white"
                    style={{ background: 'hsla(0, 0%, 100%, 0.05)', border: '1px solid hsla(0, 0%, 100%, 0.05)' }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </section>

            <section style={{ paddingRight: 'max(24px, calc((100vw - 1280px) / 2 + 48px))' }}>
              <div className="flex items-center gap-3 mb-5">
                <h2 className="text-lg font-bold text-white">Recommended for You</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {personalizedSuggestions.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <ContentCard item={item} onClick={setSelectedItem} fillWidth />
                  </motion.div>
                ))}
              </div>
            </section>
          </motion.div>
        )}
      </div>

      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <VoiceSearch
        isOpen={isVoiceOpen}
        onClose={() => setIsVoiceOpen(false)}
        onResult={(text: string) => {
          setIsVoiceOpen(false);
          setQuery(text);
          window.history.replaceState(null, '', `/search?q=${encodeURIComponent(text)}`);
        }}
      />
      <ContentModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
}
