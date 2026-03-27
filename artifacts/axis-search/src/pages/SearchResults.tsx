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

type SortOption = 'relevance' | 'newest' | 'oldest' | 'a-z' | 'z-a' | 'duration-short' | 'duration-long';

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'relevance', label: 'Most Relevant' },
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'a-z', label: 'A — Z' },
  { value: 'z-a', label: 'Z — A' },
  { value: 'duration-short', label: 'Shortest' },
  { value: 'duration-long', label: 'Longest' },
];

function parseDuration(d?: string): number {
  if (!d) return 0;
  let mins = 0;
  const hMatch = d.match(/(\d+)\s*h/);
  const mMatch = d.match(/(\d+)\s*m/);
  const sMatch = d.match(/(\d+)\s*Season/i);
  const eMatch = d.match(/(\d+)\s*Episode/i);
  if (hMatch) mins += parseInt(hMatch[1]) * 60;
  if (mMatch) mins += parseInt(mMatch[1]);
  if (sMatch) mins += parseInt(sMatch[1]) * 600;
  if (eMatch) mins += parseInt(eMatch[1]) * 45;
  return mins;
}

function sortItems(items: ContentItem[], sort: SortOption): ContentItem[] {
  if (sort === 'relevance') return items;
  const sorted = [...items];
  switch (sort) {
    case 'newest':
      return sorted.sort((a, b) => parseInt(b.year || '0') - parseInt(a.year || '0'));
    case 'oldest':
      return sorted.sort((a, b) => parseInt(a.year || '0') - parseInt(b.year || '0'));
    case 'a-z':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case 'z-a':
      return sorted.sort((a, b) => b.title.localeCompare(a.title));
    case 'duration-short':
      return sorted.sort((a, b) => parseDuration(a.duration) - parseDuration(b.duration));
    case 'duration-long':
      return sorted.sort((a, b) => parseDuration(b.duration) - parseDuration(a.duration));
    default:
      return sorted;
  }
}

function ResultsRail({ items, onSelect, aspectRatio = 'video' as const }: {
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
      <div ref={scrollRef} className="flex gap-4 overflow-x-auto pb-4 no-scrollbar snap-x">
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

const CATEGORY_CONFIG: { type: string; label: string; icon: React.ReactNode }[] = [
  { type: 'sport', label: 'Sports', icon: <Trophy className="w-5 h-5" style={{ color: 'var(--axis-brand)' }} /> },
  { type: 'live', label: 'Live Events', icon: <Radio className="w-5 h-5" style={{ color: 'var(--axis-live)' }} /> },
  { type: 'movie', label: 'Movies', icon: <Film className="w-5 h-5" style={{ color: 'var(--axis-brand)' }} /> },
  { type: 'series', label: 'Series', icon: <Tv className="w-5 h-5" style={{ color: 'var(--axis-brand)' }} /> },
  { type: 'documentary', label: 'Documentaries', icon: <BookOpen className="w-5 h-5" style={{ color: 'var(--axis-gold)' }} /> },
];

export default function SearchResults() {
  const [location, setLocation] = useLocation();
  const initialQuery = new URLSearchParams(window.location.search).get('q') || '';

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);
  
  const { query, setQuery, results, activeFilter, setActiveFilter, debouncedQuery } = useSearch(initialQuery);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setIsSortOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const urlQuery = new URLSearchParams(window.location.search).get('q') || '';
    if (urlQuery && urlQuery !== query) {
      setQuery(urlQuery);
      setActiveFilter('all');
    }
  }, [location]);

  const hasQuery = debouncedQuery.trim().length > 0;
  const hasResults = results.items.length > 0;

  const sortedItems = useMemo(() => sortItems(results.items, sortBy), [results.items, sortBy]);

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
      <Navigation onOpenSearch={() => setIsSearchOpen(true)} />
      
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
                  {sortBy === 'relevance' ? 'Sort' : SORT_OPTIONS.find(o => o.value === sortBy)?.label}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isSortOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-52 rounded-lg overflow-hidden z-50 py-1"
                      style={{ background: 'var(--axis-surface)', border: '1px solid hsla(0, 0%, 100%, 0.1)', boxShadow: '0 16px 48px rgba(0,0,0,0.5)' }}
                    >
                      <div className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--axis-text-tertiary)' }}>
                        Sort by
                      </div>
                      {SORT_OPTIONS.map(option => (
                        <button
                          key={option.value}
                          onClick={() => { setSortBy(option.value); setIsSortOpen(false); }}
                          className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-left transition-colors hover:bg-white/5"
                          style={{ color: sortBy === option.value ? '#fff' : 'hsla(0, 0%, 100%, 0.7)' }}
                        >
                          <span className="w-4 h-4 flex items-center justify-center">
                            {sortBy === option.value && <Check className="w-4 h-4" style={{ color: 'var(--axis-brand)' }} />}
                          </span>
                          {option.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {hasResults ? (
              <div className="space-y-14 px-4">
                {results.moments.length > 0 && activeFilter === 'all' && (
                  <motion.section 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 md:p-8 rounded-2xl"
                    style={{ background: 'var(--axis-surface)', border: '1px solid hsla(0, 0%, 100%, 0.1)' }}
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
                          <p className="text-xs truncate" style={{ color: 'var(--axis-text-tertiary)' }}>Found in: {m.parentTitle}</p>
                        </div>
                      ))}
                    </div>
                  </motion.section>
                )}

                {activeFilter === 'all' && categorizedResults ? (
                  CATEGORY_CONFIG.map(({ type, label, icon }) => {
                    const items = categorizedResults[type];
                    if (!items || items.length === 0) return null;
                    return (
                      <motion.section 
                        key={type}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <div className="flex items-center gap-3 mb-5">
                          <h2 className="text-lg md:text-xl font-bold text-white">{label}</h2>
                          <span className="text-xs ml-auto pr-6 md:pr-12" style={{ color: 'var(--axis-text-tertiary)' }}>{items.length} result{items.length !== 1 ? 's' : ''}</span>
                        </div>
                        <ResultsRail
                          items={items}
                          onSelect={setSelectedItem}
                          aspectRatio={type === 'movie' || type === 'series' ? 'poster' : 'video'}
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
                
                <div className="w-full max-w-2xl p-8 text-left" style={{ background: 'var(--axis-surface)', border: '1px solid hsla(0, 0%, 100%, 0.1)' }}>
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
              <ResultsRail items={personalizedSuggestions} onSelect={setSelectedItem} />
            </section>
          </motion.div>
        )}
      </div>

      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <ContentModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
}
