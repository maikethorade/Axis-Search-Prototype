import React from 'react';
import { Search, X, Mic, Clock, TrendingUp, ArrowRight } from 'lucide-react';
import './_group.css';
import {
  RECENT_SEARCHES,
  TRENDING_SEARCHES,
  SEARCH_CATEGORIES,
  AXIS_LOGO,
} from './_shared/data';

export function CommandPalette() {
  return (
    <div 
      className="min-h-screen w-full font-sans" 
      style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
    >
      {/* Top Bar (replaces navigation) */}
      <div 
        className="w-full flex items-center px-6 py-4 z-50 relative"
        style={{ backgroundColor: 'var(--axis-nav)' }}
      >
        <img 
          src={AXIS_LOGO} 
          alt="AXIS" 
          className="h-6 mr-8 object-contain"
          style={{ filter: 'brightness(0) invert(1)' }}
        />
        
        {/* Search Input Area */}
        <div className="flex-1 flex items-center">
          <div className="relative w-full max-w-4xl mx-auto flex items-center">
            <Search className="absolute left-4 w-5 h-5 text-white/40" />
            <input 
              type="text" 
              placeholder="Search for movies, sports, genres, or moods..." 
              className="w-full h-12 pl-12 pr-12 rounded-lg text-white placeholder-white/30 outline-none text-lg"
              style={{ backgroundColor: 'hsla(0,0%,100%,0.2)' }}
            />
            <Mic className="absolute right-4 w-5 h-5 text-white cursor-pointer" />
          </div>
        </div>

        {/* Close Button */}
        <button className="ml-8 p-3 rounded-lg flex-shrink-0 flex items-center justify-center hover:bg-white/10 transition-colors" style={{ backgroundColor: 'hsla(0,0%,100%,0.1)' }}>
          <X className="w-5 h-5 text-white/70" />
        </button>
      </div>

      {/* Command Palette Dropdown Panel */}
      <div className="w-full flex justify-center mt-2 px-6 pb-20 relative z-40">
        <div 
          className="w-full max-w-2xl rounded-xl border border-white/10 shadow-2xl overflow-hidden flex flex-col"
          style={{ backgroundColor: '#111', maxHeight: '500px' }}
        >
          <div className="overflow-y-auto no-scrollbar p-2">
            
            {/* Recent Searches */}
            <div className="py-2">
              <h3 className="px-4 py-2 text-xs font-bold tracking-wider uppercase text-white/50">
                Recent Searches
              </h3>
              <div className="flex flex-col">
                {RECENT_SEARCHES.map((search, idx) => (
                  <button 
                    key={`recent-${idx}`}
                    className="flex items-center w-full px-4 py-2 text-left hover:bg-white/5 rounded-md group transition-colors h-[36px]"
                  >
                    <Clock className="w-4 h-4 text-white/40 mr-3 flex-shrink-0" />
                    <span className="text-white/80 text-sm font-medium truncate">{search}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="h-px w-full bg-white/10 my-2"></div>

            {/* Trending Searches */}
            <div className="py-2">
              <h3 className="px-4 py-2 text-xs font-bold tracking-wider uppercase text-white/50">
                Trending Right Now
              </h3>
              <div className="flex flex-col">
                {TRENDING_SEARCHES.map((search, idx) => (
                  <button 
                    key={`trending-${idx}`}
                    className="flex items-center w-full px-4 py-2 text-left hover:bg-white/5 rounded-md group transition-colors h-[36px]"
                  >
                    <span className="w-5 text-xs text-white/30 font-mono mr-2 flex-shrink-0">{idx + 1}</span>
                    <TrendingUp className="w-4 h-4 text-white/40 mr-3 flex-shrink-0" />
                    <span className="text-white/90 text-sm font-medium flex-1 truncate">{search}</span>
                    <ArrowRight className="w-4 h-4 text-white/0 group-hover:text-white/40 transition-colors flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            <div className="h-px w-full bg-white/10 my-2"></div>

            {/* Explore Categories */}
            <div className="py-2 px-4 mb-2">
              <h3 className="py-2 text-xs font-bold tracking-wider uppercase text-white/50 mb-1">
                Explore Categories
              </h3>
              <div className="flex flex-wrap gap-2 mt-1">
                {SEARCH_CATEGORIES.map((category, idx) => (
                  <button 
                    key={`category-${idx}`}
                    className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-xs text-white/80 font-medium transition-colors"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
