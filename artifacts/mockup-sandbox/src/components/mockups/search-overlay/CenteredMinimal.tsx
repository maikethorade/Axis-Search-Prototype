import React from 'react';
import './_group.css';
import { Search, X, Mic, Clock, TrendingUp, Sparkles, Film, Tv, Trophy } from 'lucide-react';
import { 
  RECENT_SEARCHES, 
  TRENDING_SEARCHES, 
  SEARCH_CATEGORIES, 
  AXIS_LOGO 
} from './_shared/data';

// Helper to map category names to icons
const getCategoryIcon = (categoryName: string) => {
  switch (categoryName.toLowerCase()) {
    case 'sports':
    case 'live events':
      return <Trophy className="w-4 h-4" />;
    case 'movies':
    case 'action':
    case 'comedy':
    case 'sci-fi':
      return <Film className="w-4 h-4" />;
    case 'series':
    case 'documentaries':
      return <Tv className="w-4 h-4" />;
    default:
      return <Sparkles className="w-4 h-4" />;
  }
};

export function CenteredMinimal() {
  return (
    <div className="min-h-screen w-full relative overflow-y-auto flex flex-col items-center" style={{ backgroundColor: 'rgba(0,0,0,0.98)' }}>
      {/* Absolute top-right close button */}
      <div className="absolute top-8 right-8 z-50">
        <button 
          className="p-3 rounded-lg flex items-center justify-center transition-colors hover:bg-white/20" 
          style={{ backgroundColor: 'hsla(0,0%,100%,0.1)', color: 'rgba(255,255,255,0.7)' }}
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Container - Vertically Centered (~40% from top) */}
      <div className="flex flex-col items-center justify-start w-full max-w-4xl px-6 pt-[30vh] pb-24">
        
        {/* Logo above input */}
        <div className="mb-8 flex justify-center w-full">
          <img 
            src={AXIS_LOGO} 
            alt="AXIS Logo" 
            className="h-8 opacity-80" 
            style={{ filter: 'brightness(0) invert(1)' }} 
          />
        </div>

        {/* Big Search Input */}
        <div className="w-full max-w-3xl relative mb-10">
          <div className="absolute inset-y-0 left-0 flex items-center pl-6 pointer-events-none">
            <Search className="w-6 h-6" style={{ color: 'rgba(255,255,255,0.4)' }} />
          </div>
          <input
            type="text"
            className="w-full py-5 pl-16 pr-16 text-xl font-light rounded-lg outline-none transition-all placeholder-white/30 text-white shadow-2xl"
            style={{ backgroundColor: 'hsla(0,0%,100%,0.2)' }}
            placeholder="Search for movies, sports, genres, or moods..."
            value=""
            readOnly
          />
          <button className="absolute inset-y-0 right-0 flex items-center pr-6 text-white hover:opacity-80 transition-opacity">
            <Mic className="w-6 h-6" />
          </button>
        </div>

        {/* Content Below Input */}
        <div className="flex flex-col items-center w-full space-y-8">
          
          {/* Recent Searches */}
          <div className="flex flex-wrap justify-center gap-3 w-full">
            {RECENT_SEARCHES.map((search, i) => (
              <button 
                key={`recent-${i}`}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all text-sm text-gray-300"
              >
                <Clock className="w-3.5 h-3.5 text-white/40" />
                {search}
              </button>
            ))}
          </div>

          {/* Trending Searches - Label on left of pill row */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full mt-2">
            <h3 className="text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 shrink-0" style={{ color: 'hsla(0,0%,100%,0.5)' }}>
              <TrendingUp className="w-3.5 h-3.5" />
              Trending
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {TRENDING_SEARCHES.map((search, i) => (
                <button 
                  key={`trending-${i}`}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-all text-sm text-white"
                >
                  <Search className="w-3.5 h-3.5 text-white/40" />
                  {search}
                </button>
              ))}
            </div>
          </div>

          <div className="h-4"></div>

          {/* Explore Categories */}
          <div className="flex flex-wrap justify-center gap-3 w-full max-w-3xl">
            {SEARCH_CATEGORIES.map((category, i) => (
              <button 
                key={`cat-${i}`}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/5 bg-gradient-to-br from-white/5 to-transparent hover:from-white/10 hover:to-white/5 transition-all text-sm text-white/90"
              >
                {getCategoryIcon(category)}
                {category}
              </button>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
