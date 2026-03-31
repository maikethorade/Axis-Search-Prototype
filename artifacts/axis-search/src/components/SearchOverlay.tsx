import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Mic, Clock, TrendingUp, Flame, PlayCircle, Play, Film, Tv, Trophy, User } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { VoiceSearch } from './VoiceSearch';
import { useSearch } from '../hooks/use-search';
import { RECENT_SEARCHES, TRENDING_SEARCHES, SEARCH_CATEGORIES } from '../lib/mock-data';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Movies', href: '#' },
  { label: 'TV', href: '#' },
  { label: 'Live', href: '#' },
  { label: 'Sports', href: '#' },
];

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [location, setLocation] = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const { query, setQuery, results, isSearching, debouncedQuery } = useSearch();
  const [recentSearches, setRecentSearches] = useState([...RECENT_SEARCHES]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
    }
  }, [isOpen]);

  const addRecentSearch = (term: string) => {
    setRecentSearches(prev => {
      const filtered = prev.filter(s => s.toLowerCase() !== term.toLowerCase());
      return [term, ...filtered].slice(0, 6);
    });
  };

  const handleSearchSubmit = (e?: React.FormEvent, overrideQuery?: string) => {
    e?.preventDefault();
    const q = overrideQuery ?? query;
    if (q.trim()) {
      addRecentSearch(q.trim());
      onClose();
      setLocation(`/search?q=${encodeURIComponent(q)}`);
    }
  };

  const handleVoiceResult = (text: string) => {
    setQuery(text);
    setIsVoiceOpen(false);
    addRecentSearch(text.trim());
    setTimeout(() => {
      onClose();
      setLocation(`/search?q=${encodeURIComponent(text)}`);
    }, 800);
  };

  const renderCategoryIcon = (cat: string) => {
    switch(cat) {
      case 'Sports': return <Trophy className="w-4 h-4" />;
      case 'Movies': return <Film className="w-4 h-4" />;
      case 'TV': return <Tv className="w-4 h-4" />;
      case 'Live': return <Play className="w-4 h-4" fill="currentColor" />;
      default: return null;
    }
  };

  const removeRecentSearch = (search: string) => {
    setRecentSearches(prev => prev.filter(s => s !== search));
  };

  const showPredictive = debouncedQuery.length > 0;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Search"
            className="fixed inset-0 z-50 overflow-y-auto"
            style={{ background: 'rgba(0, 0, 0, 0.98)' }}
          >
            <div className="sticky top-0 z-10" style={{ background: 'linear-gradient(135deg, #4A6AF7 0%, #2544D0 100%)' }}>
              <div className="hidden md:block">
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between relative h-16">
                  <div className="flex items-center gap-10 h-full">
                    <Link href="/" onClick={onClose} className="flex items-center cursor-pointer">
                      <img src="/axis-logo.svg" alt="AXIS" className="h-6" />
                    </Link>
                    <nav className="hidden lg:flex items-center gap-7 h-full">
                      {NAV_ITEMS.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={onClose}
                          className={`axis-nav-item${location === item.href ? ' axis-nav-item--active' : ''}`}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </nav>
                  </div>
                  <nav className="flex lg:hidden items-center justify-center gap-7 absolute left-1/2 -translate-x-1/2 h-full">
                    {NAV_ITEMS.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={onClose}
                        className={`axis-nav-item${location === item.href ? ' axis-nav-item--active' : ''}`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </nav>
                  <div className="flex items-center gap-3">
                    <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                      <div className="absolute left-2.5 flex items-center pointer-events-none">
                        <Search className="w-3.5 h-3.5 text-white/50" />
                      </div>
                      <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Movies, shows, people, genres..."
                        className="h-8 w-52 lg:w-64 rounded-full pl-8 pr-16 text-xs text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-white/30 transition-all"
                        style={{ background: 'hsla(0, 0%, 100%, 0.15)' }}
                      />
                      <div className="absolute right-1 flex items-center gap-0.5">
                        {query && (
                          <button
                            type="button"
                            onClick={() => setQuery('')}
                            aria-label="Clear search"
                            className="w-6 h-6 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors hover:bg-white/10"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => setIsVoiceOpen(true)}
                          aria-label="Voice search"
                          className="w-6 h-6 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors hover:bg-white/10"
                        >
                          <Mic className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </form>
                    <div className="w-8 h-8 rounded-full border border-white/30 overflow-hidden flex items-center justify-center cursor-pointer" style={{ background: 'var(--axis-overlay)' }}>
                      <User className="w-full h-full p-1.5 text-white/90" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:hidden px-4 py-4">
                <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                  <div className="absolute left-3 flex items-center pointer-events-none">
                    <Search className="w-4 h-4 text-white/50" />
                  </div>
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Movies, shows, people, genres..."
                    className="h-10 w-full rounded-full pl-10 pr-20 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-white/30 transition-all"
                    style={{ background: 'hsla(0, 0%, 100%, 0.15)' }}
                  />
                  <div className="absolute right-1.5 flex items-center gap-1">
                    {query && (
                      <button
                        type="button"
                        onClick={() => setQuery('')}
                        aria-label="Clear search"
                        className="w-7 h-7 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors hover:bg-white/10"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setIsVoiceOpen(true)}
                      aria-label="Voice search"
                      className="w-7 h-7 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors hover:bg-white/10"
                    >
                      <Mic className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 md:px-12 md:pr-[108px] py-10 pb-24">
              
              {!showPredictive && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="space-y-12"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-10">
                      <div>
                        <h3 className="text-xs font-bold tracking-wider uppercase mb-4 flex items-center gap-2" style={{ color: 'hsla(0, 0%, 100%, 0.5)' }}>
                          <Clock className="w-4 h-4" /> Recent Searches
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {recentSearches.map(s => (
                            <div
                              key={s}
                              className="flex items-center gap-1 pl-4 pr-2 py-2 rounded text-white/80 transition-colors text-sm hover:text-white"
                              style={{ background: 'hsla(0, 0%, 100%, 0.05)', border: '1px solid hsla(0, 0%, 100%, 0.1)' }}
                            >
                              <button onClick={() => { setQuery(s); handleSearchSubmit(undefined, s); }}>
                                {s}
                              </button>
                              <button
                                onClick={(e) => { e.stopPropagation(); removeRecentSearch(s); }}
                                className="ml-1 p-0.5 rounded-full hover:bg-white/10 transition-colors text-white/40 hover:text-white"
                                aria-label={`Remove ${s}`}
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xs font-bold tracking-wider uppercase mb-4 flex items-center gap-2" style={{ color: 'hsla(0, 0%, 100%, 0.5)' }}>
                          <TrendingUp className="w-4 h-4" /> Trending Now
                        </h3>
                        <ul className="space-y-1">
                          {TRENDING_SEARCHES.map((s, i) => (
                            <li key={s}>
                              <button 
                                onClick={() => { setQuery(s); handleSearchSubmit(undefined, s); }}
                                className="w-full text-left px-4 py-3 rounded hover:bg-white/5 text-white/80 transition-colors flex items-center gap-4 group pl-[0px] pr-[0px]"
                              >
                                <span className="w-7 h-7 flex items-center justify-center rounded-full text-sm font-bold shrink-0" style={{ border: '1px solid hsla(0, 0%, 100%, 0.15)', color: 'hsla(0, 0%, 100%, 0.4)' }}>{i + 1}</span>
                                <span className="group-hover:text-white transition-colors">{s}</span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xs font-bold tracking-wider uppercase mb-4" style={{ color: 'hsla(0, 0%, 100%, 0.5)' }}>
                        Explore Categories
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        {SEARCH_CATEGORIES.map(cat => (
                          <button 
                            key={cat}
                            onClick={() => { setQuery(cat); handleSearchSubmit(undefined, cat); }}
                            className="p-4 rounded-lg transition-all flex flex-col gap-3 group text-left"
                            style={{ background: 'hsla(0, 0%, 100%, 0.05)', border: '1px solid hsla(0, 0%, 100%, 0.05)' }}
                          >
                            <div className="w-8 h-8 rounded-full flex items-center justify-center group-hover:scale-110 transition-all text-white/70 group-hover:text-[var(--axis-brand)]" style={{ background: 'hsla(0, 0%, 100%, 0.1)' }}>
                              {renderCategoryIcon(cat) || <Search className="w-4 h-4" />}
                            </div>
                            <span className="font-medium text-white/90">{cat}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {showPredictive && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <h2 className="text-xl font-bold text-white flex items-center gap-3">
                      {isSearching ? (
                        <span className="flex items-center gap-2">
                          <svg className="w-5 h-5 animate-spin text-white" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" /><path className="opacity-100" fill="currentColor" d="M4 12a8 8 0 018-8v3a5 5 0 00-5 5H4z" /></svg> Thinking...
                        </span>
                      ) : (
                        <span>Results for "{query}"</span>
                      )}
                    </h2>
                    <button onClick={() => handleSearchSubmit()} className="font-normal text-sm transition-colors hover:opacity-80" style={{ color: 'var(--axis-brand)' }}>
                      View all results &rarr;
                    </button>
                  </div>

                  {results.items.length === 0 && !isSearching ? (
                    <div className="py-20 text-center">
                      <p className="text-white/50 text-lg mb-2">No direct matches found.</p>
                      <p className="text-white/30 text-sm">Try asking differently or exploring categories.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
                      <div className="space-y-4">
                        <h3 className="text-xs font-bold tracking-wider uppercase" style={{ color: 'hsla(0, 0%, 100%, 0.5)' }}>Top Matches</h3>
                        <div className="grid grid-cols-2 gap-4">
                          {results.items.slice(0, 4).map(item => (
                            <button 
                              key={item.id}
                              onClick={() => { onClose(); }}
                              className="relative group text-left overflow-hidden"
                            >
                              <div className="w-full aspect-[2/3] overflow-hidden" style={{ background: 'var(--axis-surface)' }}>
                                <img src={item.thumbnailUrl} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                {item.type === 'live' && <div className="absolute top-2 left-2 w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--axis-live)' }} />}
                              </div>
                              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                                <h4 className="text-white font-bold text-sm line-clamp-1 mb-1">{item.title}</h4>
                                <p className="text-xs line-clamp-2" style={{ color: 'var(--axis-text-secondary)' }}>{item.description}</p>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-8">
                        {results.moments.length > 0 && (
                          <div className="p-4 space-y-4" style={{ background: 'hsla(0, 0%, 100%, 0.05)', borderRadius: '16px', border: '1px solid hsla(0, 0%, 100%, 0.05)' }}>
                            <h3 className="text-xs font-bold tracking-wider uppercase flex items-center gap-2" style={{ color: 'hsla(0, 0%, 100%, 0.5)' }}>
                              Moments inside videos
                            </h3>
                            <div className="space-y-3">
                              {results.moments.map(m => (
                                <button key={m.id} className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10 transition-all text-left group">
                                  <div className="w-16 aspect-video overflow-hidden relative shrink-0" style={{ background: 'var(--axis-surface)' }}>
                                     <img src={m.thumbnailUrl} className="w-full h-full object-cover" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-white/90 group-hover:text-white">{m.title}</p>
                                    <p className="text-xs" style={{ color: 'var(--axis-text-tertiary)' }}>{m.episode || m.parentTitle} · {m.timestamp}</p>
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <VoiceSearch 
        isOpen={isVoiceOpen} 
        onClose={() => setIsVoiceOpen(false)} 
        onResult={handleVoiceResult}
      />
    </>
  );
}
