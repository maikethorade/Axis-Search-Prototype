import { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'wouter';
import { Navigation } from '../components/Navigation';
import { ContentCard } from '../components/ContentCard';
import { ContentModal } from '../components/ContentModal';
import { SearchOverlay } from '../components/SearchOverlay';
import { useSearch } from '../hooks/use-search';
import { ContentItem, MOCK_CONTENT, TRENDING_SEARCHES, RECENT_SEARCHES } from '../lib/mock-data';
import { PlayCircle, Search, Filter, Film, Tv, Trophy, Radio, BookOpen, Clock, TrendingUp, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const FILTER_LABELS: Record<string, string> = {
  all: 'All Content',
  movie: 'Movies',
  series: 'Series',
  sport: 'Sports',
  live: 'Live',
  documentary: 'Documentaries',
};

const CATEGORY_CONFIG: { type: string; label: string; icon: React.ReactNode }[] = [
  { type: 'sport', label: 'Sports', icon: <Trophy className="w-5 h-5 text-green-400" /> },
  { type: 'live', label: 'Live Events', icon: <Radio className="w-5 h-5 text-red-400" /> },
  { type: 'movie', label: 'Movies', icon: <Film className="w-5 h-5 text-blue-400" /> },
  { type: 'series', label: 'Series', icon: <Tv className="w-5 h-5 text-purple-400" /> },
  { type: 'documentary', label: 'Documentaries', icon: <BookOpen className="w-5 h-5 text-amber-400" /> },
];

export default function SearchResults() {
  const [location, setLocation] = useLocation();
  const initialQuery = new URLSearchParams(window.location.search).get('q') || '';

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  
  const { query, setQuery, results, activeFilter, setActiveFilter, debouncedQuery } = useSearch(initialQuery);

  useEffect(() => {
    const urlQuery = new URLSearchParams(window.location.search).get('q') || '';
    if (urlQuery && urlQuery !== query) {
      setQuery(urlQuery);
    }
  }, [location]);

  const hasQuery = debouncedQuery.trim().length > 0;
  const hasResults = results.items.length > 0;

  const categorizedResults = useMemo(() => {
    if (activeFilter !== 'all') return null;
    const groups: Record<string, ContentItem[]> = {};
    results.items.forEach(item => {
      if (!groups[item.type]) groups[item.type] = [];
      groups[item.type].push(item);
    });
    return groups;
  }, [results.items, activeFilter]);

  const personalizedSuggestions = useMemo(() => {
    return [...MOCK_CONTENT]
      .sort((a, b) => (b.personalizedScore || 0) - (a.personalizedScore || 0))
      .slice(0, 10);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      <Navigation onOpenSearch={() => setIsSearchOpen(true)} />
      
      <div className="pt-32 max-w-7xl mx-auto px-6 md:px-12">
        {hasQuery ? (
          <>
            <div className="mb-10">
              <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
                Search Results
              </h1>
              <p className="text-white/60 text-lg">
                Showing {results.totalCount} results for <span className="text-white font-medium">"{debouncedQuery}"</span>
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
              <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
                {(['all', 'movie', 'series', 'sport', 'live', 'documentary'] as const).map(filter => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                      activeFilter === filter 
                        ? 'bg-white text-black' 
                        : 'bg-white/5 text-white/70 hover:bg-white/15'
                    }`}
                  >
                    {FILTER_LABELS[filter]}
                  </button>
                ))}
              </div>
              
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-white/80 hover:bg-white/5 transition-colors">
                <Filter className="w-4 h-4" /> Sort & Filter
              </button>
            </div>

            {hasResults ? (
              <div className="space-y-16">
                {results.moments.length > 0 && activeFilter === 'all' && (
                  <motion.section 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-primary/10 to-transparent p-6 md:p-8 rounded-2xl border border-primary/20"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <PlayCircle className="w-6 h-6 text-primary" />
                      <h2 className="text-xl md:text-2xl font-bold text-white">Moments inside videos</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {results.moments.map(m => (
                        <div key={m.id} className="group cursor-pointer">
                          <div className="relative aspect-video rounded-xl overflow-hidden mb-3 border border-white/10 group-hover:border-primary/50 transition-colors">
                            <img src={m.thumbnailUrl} alt={m.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                               <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform">
                                 <PlayCircle className="w-6 h-6 text-white" />
                               </div>
                            </div>
                            <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 rounded text-xs font-mono text-white">
                              {m.timestamp}
                            </div>
                          </div>
                          <h4 className="font-bold text-white/90 group-hover:text-primary transition-colors">{m.title}</h4>
                          <p className="text-sm text-white/50 truncate">Found in: {m.parentTitle}</p>
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
                        <div className="flex items-center gap-3 mb-6">
                          {icon}
                          <h2 className="text-xl md:text-2xl font-display font-bold text-white">{label}</h2>
                          <span className="text-sm text-white/40 ml-auto">{items.length} result{items.length !== 1 ? 's' : ''}</span>
                        </div>
                        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
                          {items.map((item, i) => (
                            <motion.div 
                              key={item.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.05 }}
                            >
                              <ContentCard 
                                item={item} 
                                onClick={setSelectedItem} 
                                aspectRatio={type === 'movie' || type === 'series' ? 'poster' : 'video'} 
                              />
                            </motion.div>
                          ))}
                        </div>
                      </motion.section>
                    );
                  })
                ) : (
                  <section>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                      {results.items.map((item, i) => (
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
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6">
                  <Search className="w-10 h-10 text-white/20" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">No results found</h2>
                <p className="text-white/50 max-w-md mb-8">
                  We couldn't find anything matching "{debouncedQuery}". Try adjusting your filters or searching for something else.
                </p>
                
                <div className="w-full max-w-2xl bg-white/5 border border-white/10 rounded-2xl p-8 text-left">
                  <h3 className="text-lg font-bold text-white mb-4">Did you mean to search for...</h3>
                  <div className="flex flex-wrap gap-3">
                    {['Action Thrillers', 'Live Sports', 'Documentaries'].map(s => (
                      <button 
                        key={s}
                        onClick={() => { setLocation(`/search?q=${encodeURIComponent(s)}`); }}
                        className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
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
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-16">
            <div>
              <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
                Discover
              </h1>
              <p className="text-white/60 text-lg">
                Browse trending content or search for something specific.
              </p>
            </div>

            <section>
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-5 h-5 text-white/50" />
                <h2 className="text-xl font-display font-bold text-white">Recent Searches</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {RECENT_SEARCHES.map(s => (
                  <button
                    key={s}
                    onClick={() => setLocation(`/search?q=${encodeURIComponent(s)}`)}
                    className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/15 border border-white/5 text-white/80 transition-colors text-sm font-medium"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="w-5 h-5 text-white/50" />
                <h2 className="text-xl font-display font-bold text-white">Trending Now</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {TRENDING_SEARCHES.map(s => (
                  <button
                    key={s}
                    onClick={() => setLocation(`/search?q=${encodeURIComponent(s)}`)}
                    className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/15 border border-white/5 text-white/80 transition-colors text-sm font-medium"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-display font-bold text-white">Recommended for You</h2>
              </div>
              <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
                {personalizedSuggestions.map(item => (
                  <ContentCard key={item.id} item={item} onClick={setSelectedItem} />
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
