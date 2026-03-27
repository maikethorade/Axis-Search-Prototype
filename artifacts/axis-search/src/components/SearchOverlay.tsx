import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Mic, Clock, TrendingUp, Flame, PlayCircle, Film, Tv, Trophy } from 'lucide-react';
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
  const { query, setQuery, results, isSearching, debouncedQuery } = useSearch();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
    }
  }, [isOpen]);

  const handleSearchSubmit = (e?: React.FormEvent, overrideQuery?: string) => {
    e?.preventDefault();
    const q = overrideQuery ?? query;
    if (q.trim()) {
      onClose();
      setLocation(`/search?q=${encodeURIComponent(q)}`);
    }
  };

  const handleVoiceResult = (text: string) => {
    setQuery(text);
    setIsVoiceOpen(false);
    setTimeout(() => {
      onClose();
      setLocation(`/search?q=${encodeURIComponent(text)}`);
    }, 800);
  };

  const renderCategoryIcon = (cat: string) => {
    switch(cat) {
      case 'Sports': return <Trophy className="w-4 h-4" />;
      case 'Movies': return <Film className="w-4 h-4" />;
      case 'Series': return <Tv className="w-4 h-4" />;
      case 'Live Events': return <PlayCircle className="w-4 h-4" style={{ color: 'var(--axis-live)' }} />;
      default: return null;
    }
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
                    placeholder="Search for movies, sports, genres, or moods..."
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
                  
                  {query && !showPredictive && (
                    <div className="absolute inset-0 rounded-lg ring-2 animate-pulse pointer-events-none" style={{ ringColor: 'var(--axis-brand)' }} />
                  )}
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
                          {RECENT_SEARCHES.map(s => (
                            <button 
                              key={s} 
                              onClick={() => { setQuery(s); handleSearchSubmit(undefined, s); }}
                              className="px-4 py-2 rounded text-white/80 transition-colors text-sm hover:text-white"
                              style={{ background: 'hsla(0, 0%, 100%, 0.05)', border: '1px solid hsla(0, 0%, 100%, 0.1)' }}
                            >
                              {s}
                            </button>
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
                                className="w-full text-left px-4 py-3 rounded hover:bg-white/5 text-white/80 transition-colors flex items-center gap-4 group"
                              >
                                <span className="font-bold w-4" style={{ color: 'var(--axis-brand)', opacity: 0.5 }}>{i + 1}</span>
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
                    <button onClick={() => handleSearchSubmit()} className="font-medium text-sm transition-colors hover:opacity-80" style={{ color: 'var(--axis-brand)' }}>
                      View all results &rarr;
                    </button>
                  </div>

                  {results.items.length === 0 && !isSearching ? (
                    <div className="py-20 text-center">
                      <p className="text-white/50 text-lg mb-2">No direct matches found.</p>
                      <p className="text-white/30 text-sm">Try asking differently or exploring categories.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      <div className="lg:col-span-2 space-y-4">
                        <h3 className="text-xs font-bold tracking-wider uppercase" style={{ color: 'hsla(0, 0%, 100%, 0.5)' }}>Top Matches</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {results.items.slice(0, 6).map(item => (
                            <button 
                              key={item.id}
                              onClick={() => { onClose(); }}
                              className="flex gap-3 p-3 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10 transition-all text-left group"
                            >
                              <div className="w-24 aspect-video overflow-hidden shrink-0 relative" style={{ background: 'var(--axis-surface)' }}>
                                <img src={item.thumbnailUrl} alt={item.title} className="w-full h-full object-cover" />
                                {item.type === 'live' && <div className="absolute top-1 left-1 w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--axis-live)' }} />}
                              </div>
                              <div className="flex flex-col justify-center min-w-0">
                                <span className="font-bold text-white/90 line-clamp-1 group-hover:text-[var(--axis-brand)] transition-colors text-sm">{item.title}</span>
                                <span className="text-xs mt-1 flex items-center gap-2" style={{ color: 'var(--axis-text-secondary)' }}>
                                  <span className="axis-metadata-badge">{item.type}</span>
                                  {item.year && <span>{item.year}</span>}
                                </span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-8">
                        {results.moments.length > 0 && (
                          <div className="p-4 space-y-4" style={{ background: 'var(--axis-surface)', borderRadius: '16px', border: '1px solid hsla(0, 0%, 100%, 0.1)' }}>
                            <h3 className="text-xs font-bold tracking-wider uppercase flex items-center gap-2" style={{ color: 'var(--axis-brand)' }}>
                              <PlayCircle className="w-4 h-4" /> In-Video Moments
                            </h3>
                            <div className="space-y-3">
                              {results.moments.map(m => (
                                <button key={m.id} className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10 transition-all text-left group">
                                  <div className="w-16 aspect-video overflow-hidden relative shrink-0" style={{ background: 'var(--axis-surface)' }}>
                                     <img src={m.thumbnailUrl} className="w-full h-full object-cover" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-white/90 group-hover:text-white">{m.title}</p>
                                    <p className="text-xs" style={{ color: 'var(--axis-text-tertiary)' }}>{m.parentTitle} · {m.timestamp}</p>
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
