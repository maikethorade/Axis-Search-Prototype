import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Mic, Clock, TrendingUp, Play, Film, Tv, Trophy } from 'lucide-react';
import { useLocation } from 'wouter';
import { VoiceSearch } from './VoiceSearch';
import { useSearch } from '../hooks/use-search';
import { RECENT_SEARCHES, TRENDING_SEARCHES, SEARCH_CATEGORIES } from '../lib/mock-data';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [_, setLocation] = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const { query, setQuery, debouncedQuery } = useSearch();
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

  useEffect(() => {
    if (debouncedQuery.trim().length > 0 && isOpen) {
      addRecentSearch(debouncedQuery.trim());
      onClose();
      setLocation(`/search?q=${encodeURIComponent(debouncedQuery.trim())}`);
    }
  }, [debouncedQuery]);

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
            <div className="sticky top-0 z-10 backdrop-blur-md border-b border-white/10 pt-6 pb-6" style={{ background: 'rgba(26, 26, 26, 0.9)' }}>
              <div className="max-w-4xl mx-auto px-4 md:px-12 flex items-center gap-4">
                <form onSubmit={handleSearchSubmit} className="flex-1 relative group">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <Search className={`w-5 h-5 transition-colors ${query ? 'text-[var(--axis-brand)]' : 'text-white/40'}`} />
                  </div>
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Movies, shows, people, genres..."
                    className="w-full rounded-lg py-4 pl-12 pr-14 text-lg text-white placeholder:text-white/30 focus:outline-none transition-all"
                    style={{
                      background: query ? '#fff' : 'hsla(0, 0%, 100%, 0.2)',
                      color: query ? '#000' : '#fff',
                    }}
                  />
                  <button 
                    type="button"
                    onClick={() => setIsVoiceOpen(true)}
                    aria-label="Voice search"
                    className="absolute inset-y-0 right-4 flex items-center transition-colors"
                    style={{ color: query ? 'var(--axis-brand)' : 'white' }}
                  >
                    <Mic className="w-5 h-5" />
                  </button>
                  
                </form>
                
                <button 
                  onClick={onClose}
                  aria-label="Close search"
                  className="p-3 rounded-lg text-white/70 hover:text-white transition-colors"
                  style={{ background: 'hsla(0, 0%, 100%, 0.1)' }}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 md:px-12 md:pr-[108px] py-10 pb-24">
              
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
