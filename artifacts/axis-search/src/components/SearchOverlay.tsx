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
      setQuery(''); // reset on close
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
      case 'Live Events': return <PlayCircle className="w-4 h-4 text-destructive" />;
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
            className="fixed inset-0 z-50 bg-background/98 backdrop-blur-2xl overflow-y-auto"
          >
            {/* Header / Input Area */}
            <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-white/10 pt-6 pb-6 px-4 md:px-12">
              <div className="max-w-5xl mx-auto flex items-center gap-4">
                <form onSubmit={handleSearchSubmit} className="flex-1 relative group">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <Search className={`w-6 h-6 transition-colors ${query ? 'text-primary' : 'text-white/40'}`} />
                  </div>
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for movies, sports, genres, or moods..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-16 text-xl text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all shadow-inner"
                  />
                  <button 
                    type="button"
                    onClick={() => setIsVoiceOpen(true)}
                    aria-label="Voice search"
                    className="absolute inset-y-0 right-4 flex items-center text-white/50 hover:text-white transition-colors"
                  >
                    <Mic className="w-6 h-6" />
                  </button>
                  
                  {/* Subtle pulsing glow when analyzing semantic intent */}
                  {query && !showPredictive && (
                    <div className="absolute inset-0 rounded-2xl ring-2 ring-primary/20 animate-pulse pointer-events-none" />
                  )}
                </form>
                
                <button 
                  onClick={onClose}
                  aria-label="Close search"
                  className="p-4 rounded-xl bg-white/5 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-5xl mx-auto px-4 md:px-12 py-10 pb-24">
              
              {/* DEFAULT STATE (Empty Input) */}
              {!showPredictive && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="space-y-12"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Recent & Trending */}
                    <div className="space-y-10">
                      <div>
                        <h3 className="text-sm font-bold tracking-wider text-white/50 uppercase mb-4 flex items-center gap-2">
                          <Clock className="w-4 h-4" /> Recent Searches
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {RECENT_SEARCHES.map(s => (
                            <button 
                              key={s} 
                              onClick={() => { setQuery(s); handleSearchSubmit(undefined, s); }}
                              className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/15 border border-white/5 text-white/80 transition-colors text-sm"
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-bold tracking-wider text-white/50 uppercase mb-4 flex items-center gap-2">
                          <TrendingUp className="w-4 h-4" /> Trending Now
                        </h3>
                        <ul className="space-y-1">
                          {TRENDING_SEARCHES.map((s, i) => (
                            <li key={s}>
                              <button 
                                onClick={() => { setQuery(s); handleSearchSubmit(undefined, s); }}
                                className="w-full text-left px-4 py-3 rounded-lg hover:bg-white/5 text-white/80 transition-colors flex items-center gap-4 group"
                              >
                                <span className="text-primary/50 font-bold w-4">{i + 1}</span>
                                <span className="group-hover:text-white transition-colors">{s}</span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Explore Categories */}
                    <div>
                      <h3 className="text-sm font-bold tracking-wider text-white/50 uppercase mb-4">
                        Explore Categories
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        {SEARCH_CATEGORIES.map(cat => (
                          <button 
                            key={cat}
                            onClick={() => { setQuery(cat); handleSearchSubmit(undefined, cat); }}
                            className="p-4 rounded-xl bg-gradient-to-br from-white/5 to-white/0 border border-white/5 hover:border-primary/30 hover:from-primary/10 transition-all flex flex-col gap-3 group text-left"
                          >
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/20 transition-all text-white/70 group-hover:text-primary">
                              {renderCategoryIcon(cat) || <Search className="w-4 h-4" />}
                            </div>
                            <span className="font-semibold text-white/90">{cat}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* PREDICTIVE STATE (Typing) */}
              {showPredictive && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <h2 className="text-2xl font-display font-bold text-white flex items-center gap-3">
                      {isSearching ? (
                        <span className="animate-pulse flex items-center gap-2">
                          <Flame className="w-5 h-5 text-primary" /> Analyzing intent...
                        </span>
                      ) : (
                        <span>Results for "{query}"</span>
                      )}
                    </h2>
                    <button onClick={() => handleSearchSubmit()} className="text-primary hover:text-primary-foreground font-medium text-sm transition-colors">
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
                      {/* Top Matches (Titles) */}
                      <div className="lg:col-span-2 space-y-4">
                        <h3 className="text-sm font-bold tracking-wider text-white/50 uppercase">Top Matches</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {results.items.slice(0, 6).map(item => (
                            <button 
                              key={item.id}
                              onClick={() => { onClose(); /* Handle navigation to detail in real app */ }}
                              className="flex gap-4 p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all text-left group"
                            >
                              <div className="w-24 aspect-video rounded-md overflow-hidden shrink-0 bg-white/10 relative">
                                <img src={item.thumbnailUrl} alt={item.title} className="w-full h-full object-cover" />
                                {item.type === 'live' && <div className="absolute top-1 left-1 w-2 h-2 bg-destructive rounded-full animate-pulse" />}
                              </div>
                              <div className="flex flex-col justify-center">
                                <span className="font-bold text-white/90 line-clamp-1 group-hover:text-primary transition-colors">{item.title}</span>
                                <span className="text-xs text-white/50 capitalize mt-1 flex items-center gap-2">
                                  <span className="px-1.5 py-0.5 rounded bg-white/10">{item.type}</span>
                                  {item.year && <span>{item.year}</span>}
                                </span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Moments & Metadata Matches */}
                      <div className="space-y-8">
                        {results.moments.length > 0 && (
                          <div className="space-y-4">
                            <h3 className="text-sm font-bold tracking-wider text-primary uppercase flex items-center gap-2">
                              <PlayCircle className="w-4 h-4" /> In-Video Moments
                            </h3>
                            <div className="space-y-3">
                              {results.moments.map(m => (
                                <button key={m.id} className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-primary/10 border border-transparent hover:border-primary/20 transition-all text-left group">
                                  <div className="w-16 aspect-video rounded bg-white/10 overflow-hidden relative shrink-0">
                                     <img src={m.thumbnailUrl} className="w-full h-full object-cover" />
                                     <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                        <PlayCircle className="w-5 h-5 text-white opacity-80" />
                                     </div>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-white/90 group-hover:text-white">{m.title}</p>
                                    <p className="text-xs text-white/50">{m.parentTitle} • {m.timestamp}</p>
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
