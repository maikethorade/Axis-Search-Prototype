import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useLocation } from 'wouter';
import { Navigation } from '../components/Navigation';
import { ContentCard } from '../components/ContentCard';
import { ContentModal } from '../components/ContentModal';
import { SearchOverlay } from '../components/SearchOverlay';
import { useSearch } from '../hooks/use-search';
import { ContentItem, MOCK_CONTENT, TRENDING_SEARCHES, RECENT_SEARCHES } from '../lib/mock-data';
import { PlayCircle, Search, Filter, Film, Tv, Trophy, Radio, BookOpen, Clock, TrendingUp, Sparkles, ChevronLeft, ChevronRight, ChevronDown, Check, ArrowUpDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FILTER_GENRES = ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Thriller', 'Romance', 'Documentary', 'Animation', 'Crime'];
const FILTER_SUBTITLES = ['English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese'];
const FILTER_CHANNELS = ['AXIS Originals', 'Sky Sports', 'BBC', 'ITV', 'Channel 4', 'HBO', 'Showtime', 'Paramount+', 'Discovery', 'Eurosport'];

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

const FILTER_LABELS: Record<string, string> = {
  all: 'All Content',
  movie: 'Movies',
  series: 'Series',
  sport: 'Sports',
  live: 'Live',
  documentary: 'Documentaries',
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
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [freeToMe, setFreeToMe] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedSubtitles, setSelectedSubtitles] = useState<string[]>([]);
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'relevance' | 'recent' | 'a-z'>('relevance');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const filtersRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);
  
  const { query, setQuery, results, activeFilter, setActiveFilter, debouncedQuery } = useSearch(initialQuery);

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

  const activeFilterCount = selectedGenres.length + selectedSubtitles.length + selectedChannels.length + (freeToMe ? 1 : 0);

  useEffect(() => {
    const urlQuery = new URLSearchParams(window.location.search).get('q') || '';
    if (urlQuery && urlQuery !== query) {
      setQuery(urlQuery);
      setActiveFilter('all');
    }
  }, [location]);

  useEffect(() => {
    if (debouncedQuery.trim()) {
      const currentUrl = new URLSearchParams(window.location.search).get('q') || '';
      if (currentUrl !== debouncedQuery.trim()) {
        window.history.replaceState(null, '', `/search?q=${encodeURIComponent(debouncedQuery.trim())}`);
      }
    }
  }, [debouncedQuery]);

  const hasQuery = debouncedQuery.trim().length > 0;
  const hasResults = results.items.length > 0;

  const sortedItems = useMemo(() => {
    const items = [...results.items];
    if (sortBy === 'a-z') {
      items.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'recent') {
      items.sort((a, b) => {
        const yearA = parseInt(a.year || '0');
        const yearB = parseInt(b.year || '0');
        return yearB - yearA;
      });
    }
    return items;
  }, [results.items, sortBy]);

  const categorizedResults = useMemo(() => {
    if (activeFilter !== 'all') return null;
    const groups: Record<string, ContentItem[]> = {};
    sortedItems.forEach(item => {
      if (!groups[item.type]) groups[item.type] = [];
      groups[item.type].push(item);
    });
    return groups;
  }, [sortedItems, activeFilter]);

  const personalizedSuggestions = useMemo(() => {
    return [...MOCK_CONTENT]
      .sort((a, b) => (b.personalizedScore || 0) - (a.personalizedScore || 0))
      .slice(0, 10);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      <Navigation onOpenSearch={() => setIsSearchOpen(true)} searchQuery={query} onSearchQueryChange={setQuery} />
      
      <div className="pt-28 rails-container">
        {hasQuery ? (
          <>
            <div className="mb-8 pr-6 md:pr-12">
              <h1 className="text-2xl md:text-4xl font-bold text-white mb-3">
                Search Results
              </h1>
              <p className="text-base" style={{ color: 'var(--axis-text-secondary)' }}>
                Showing {results.totalCount} results for <span className="text-white font-medium">"{debouncedQuery}"</span>
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-5 border-b border-white/10 pr-6 md:pr-12">
              <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
                {(['all', 'movie', 'series', 'sport', 'live', 'documentary'] as const).map(filter => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className="px-5 py-2 rounded-sm text-sm font-medium whitespace-nowrap transition-colors"
                    style={activeFilter === filter 
                      ? { background: 'var(--axis-brand)', color: '#fff' } 
                      : { background: 'hsla(0, 0%, 100%, 0.05)', color: 'hsla(0, 0%, 100%, 0.7)' }
                    }
                  >
                    {FILTER_LABELS[filter]}
                  </button>
                ))}
              </div>
              
              <div className="flex items-center gap-2">
              <div className="relative" ref={sortRef}>
                <button
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className="flex items-center gap-2 px-4 py-2 rounded text-sm transition-colors"
                  style={{
                    border: `1px solid ${isSortOpen || sortBy !== 'relevance' ? 'var(--axis-brand)' : 'hsla(0, 0%, 100%, 0.1)'}`,
                    color: isSortOpen || sortBy !== 'relevance' ? '#fff' : 'hsla(0, 0%, 100%, 0.8)',
                    background: isSortOpen ? 'hsla(0, 0%, 100%, 0.05)' : 'transparent',
                  }}
                >
                  <ArrowUpDown className="w-4 h-4" />
                  {sortBy === 'relevance' ? 'Sort' : sortBy === 'recent' ? 'Recent' : 'A–Z'}
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
                        { value: 'relevance' as const, label: 'Relevance' },
                        { value: 'recent' as const, label: 'Most Recent' },
                        { value: 'a-z' as const, label: 'A–Z' },
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
                        { key: 'genres', label: 'Genres', items: FILTER_GENRES, selected: selectedGenres, setSelected: setSelectedGenres },
                        { key: 'subtitles', label: 'Subtitles', items: FILTER_SUBTITLES, selected: selectedSubtitles, setSelected: setSelectedSubtitles },
                        { key: 'channels', label: 'Channels', items: FILTER_CHANNELS, selected: selectedChannels, setSelected: setSelectedChannels },
                      ].map(section => (
                        <div key={section.key} className="border-b border-white/5 last:border-b-0">
                          <button
                            onClick={() => setOpenAccordion(openAccordion === section.key ? null : section.key)}
                            className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-white/90 hover:bg-white/5 transition-colors"
                          >
                            <span>
                              {section.label}
                              {section.selected.length > 0 && (
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
                                  {section.items.map(item => (
                                    <button
                                      key={item}
                                      onClick={() => toggleFilter(item, section.selected, section.setSelected)}
                                      className="w-full flex items-center gap-3 px-3 py-2 text-sm text-left rounded hover:bg-white/5 transition-colors"
                                      style={{ color: section.selected.includes(item) ? '#fff' : 'hsla(0, 0%, 100%, 0.7)' }}
                                    >
                                      <div
                                        className="w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors"
                                        style={{
                                          borderColor: section.selected.includes(item) ? 'var(--axis-brand)' : 'hsla(0, 0%, 100%, 0.3)',
                                          background: section.selected.includes(item) ? 'var(--axis-brand)' : 'transparent',
                                        }}
                                      >
                                        {section.selected.includes(item) && <Check className="w-3 h-3 text-white" />}
                                      </div>
                                      {item}
                                    </button>
                                  ))}
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

            {hasResults ? (
              <div className="space-y-14">
                {activeFilter === 'all' && categorizedResults && (() => {
                  const topResults = CATEGORY_CONFIG[0];
                  const items = categorizedResults[topResults.type];
                  if (!items || items.length === 0) return null;
                  return (
                    <motion.section
                      key={topResults.type}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="flex items-center gap-3 mb-1">
                        <h2 className="text-lg md:text-xl font-bold text-white">{topResults.label}</h2>
                        <span className="text-xs ml-auto pr-6 md:pr-12" style={{ color: 'var(--axis-text-tertiary)' }}>{items.length} result{items.length !== 1 ? 's' : ''}</span>
                      </div>
                      {topResults.tagline && <p className="text-sm mb-4" style={{ color: 'var(--axis-text-secondary)' }}>{topResults.tagline}</p>}
                      <ResultsRail
                        items={items}
                        onSelect={setSelectedItem}
                        aspectRatio={topResults.type === 'movie' || topResults.type === 'series' || topResults.type === 'documentary' ? 'poster' : 'video'}
                      />
                    </motion.section>
                  );
                })()}

                {results.moments.length > 0 && activeFilter === 'all' && (
                  <motion.section 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 md:p-8 rounded-2xl"
                    style={{ background: 'hsla(0, 0%, 100%, 0.05)', border: '1px solid hsla(0, 0%, 100%, 0.05)' }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <h2 className="text-lg md:text-xl font-bold text-white">Moments inside videos</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {results.moments.map(m => (
                        <div key={m.id} className="group cursor-pointer">
                          <div className="relative aspect-video overflow-hidden mb-3 border border-white/10 transition-colors">
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
                  </motion.section>
                )}

                {activeFilter === 'all' && categorizedResults ? (
                  CATEGORY_CONFIG.slice(1).map(({ type, label, tagline, icon }) => {
                    const items = categorizedResults[type];
                    if (!items || items.length === 0) return null;
                    return (
                      <motion.section 
                        key={type}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <div className="flex items-center gap-3 mb-1">
                          <h2 className="text-lg md:text-xl font-bold text-white">{label}</h2>
                          <span className="text-xs ml-auto pr-6 md:pr-12" style={{ color: 'var(--axis-text-tertiary)' }}>{items.length} result{items.length !== 1 ? 's' : ''}</span>
                        </div>
                        {tagline && <p className="text-sm mb-4" style={{ color: 'var(--axis-text-secondary)' }}>{tagline}</p>}
                        <ResultsRail
                          items={items}
                          onSelect={setSelectedItem}
                          aspectRatio={type === 'movie' || type === 'series' || type === 'documentary' ? 'poster' : 'video'}
                        />
                      </motion.section>
                    );
                  })
                ) : (
                  <section>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
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
                            aspectRatio={item.type === 'movie' || item.type === 'series' ? 'poster' : 'video'}
                            fillWidth
                          />
                        </motion.div>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            ) : (
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
                
                <div className="w-full max-w-2xl p-8 text-left" style={{ background: 'hsla(0, 0%, 100%, 0.05)', border: '1px solid hsla(0, 0%, 100%, 0.05)', borderRadius: '16px' }}>
                  <h3 className="text-base font-bold text-white mb-4">Did you mean to search for...</h3>
                  <div className="flex flex-wrap gap-3">
                    {['Action Thrillers', 'Live Sports', 'Documentaries'].map(s => (
                      <button 
                        key={s}
                        onClick={() => { setLocation(`/search?q=${encodeURIComponent(s)}`); }}
                        className="px-4 py-2 rounded text-white text-sm transition-colors hover:opacity-80"
                        style={{ background: 'var(--axis-brand)' }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
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
                <h2 className="text-lg font-bold text-white">Recent Searches</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {RECENT_SEARCHES.map(s => (
                  <button
                    key={s}
                    onClick={() => setLocation(`/search?q=${encodeURIComponent(s)}`)}
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
                    onClick={() => setLocation(`/search?q=${encodeURIComponent(s)}`)}
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
      <ContentModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
}
