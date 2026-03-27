import React from 'react';
import { Search, X, Mic, Clock, TrendingUp } from 'lucide-react';
import './_group.css';
import {
  RECENT_SEARCHES,
  TRENDING_CONTENT,
  CATEGORY_CARDS,
  AXIS_LOGO,
} from './_shared/data';

export function VisualDiscovery() {
  return (
    <div className="min-h-screen text-white flex flex-col font-sans" style={{ background: 'rgba(0,0,0,0.98)' }}>
      {/* Header / Search Input Area - Sticky */}
      <div className="sticky top-0 z-10 px-6 py-6" style={{ background: 'rgba(0,0,0,0.98)' }}>
        <div className="flex items-center gap-4 max-w-5xl mx-auto">
          {/* Logo */}
          <div className="hidden md:block mr-4">
            <img 
              src={AXIS_LOGO} 
              alt="AXIS" 
              className="h-6" 
              style={{ filter: 'brightness(0) invert(1)' }} 
            />
          </div>

          {/* Search Bar */}
          <div className="flex-1 flex items-center gap-3">
            <div className="flex-1 flex items-center rounded-lg px-4 h-14 backdrop-blur-md" style={{ background: 'hsla(0,0%,100%,0.2)' }}>
              <Search className="w-5 h-5 text-white/40" />
              <input
                type="text"
                className="flex-1 bg-transparent border-none outline-none text-white px-3 placeholder:text-white/30 text-lg"
                placeholder="Search for movies, sports, genres, or moods..."
                defaultValue=""
                autoFocus
              />
              <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <Mic className="w-5 h-5 text-white" />
              </button>
            </div>
            
            {/* Close Button */}
            <button className="h-14 w-14 flex items-center justify-center rounded-lg hover:bg-white/20 transition-colors" style={{ background: 'hsla(0,0%,100%,0.1)' }}>
              <X className="w-6 h-6 text-white/70" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-20">
        <div className="max-w-7xl mx-auto space-y-12 mt-4">
          
          {/* Section 1: Trending Now (Poster Rail) */}
          <section className="px-6 md:px-12">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-4 h-4 text-white/50" />
              <h2 className="text-xs font-bold tracking-wider uppercase text-white/50">Trending Now</h2>
            </div>
            
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-6 px-6 md:-mx-12 md:px-12">
              {TRENDING_CONTENT.map((item, idx) => (
                <div 
                  key={idx} 
                  className="flex-shrink-0 relative rounded-xl overflow-hidden group cursor-pointer"
                  style={{ width: '160px', aspectRatio: '2/3' }}
                >
                  <img 
                    src={item.thumbnailUrl} 
                    alt={item.title} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <div className="text-[10px] font-semibold tracking-wider text-white/70 uppercase mb-1">
                      {item.type}
                    </div>
                    <div className="font-medium text-sm leading-tight line-clamp-2">
                      {item.title}
                    </div>
                  </div>
                  
                  <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded text-[10px] font-bold text-white/90">
                    #{idx + 1}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 2: Explore Categories (Large Image Grid) */}
          <section className="px-6 md:px-12 max-w-5xl mx-auto">
            <h2 className="text-xs font-bold tracking-wider uppercase text-white/50 mb-6">Explore Categories</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {CATEGORY_CARDS.map((card, idx) => (
                <div 
                  key={idx}
                  className="relative rounded-xl overflow-hidden aspect-video cursor-pointer group"
                >
                  <img 
                    src={card.thumbnailUrl} 
                    alt={card.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Dynamic gradient overlay from data */}
                  <div className={`absolute inset-0 bg-gradient-to-tr ${card.gradient} opacity-90 group-hover:opacity-100 transition-opacity`} />
                  
                  <div className="absolute inset-0 flex items-end p-4">
                    <span className="font-bold text-lg md:text-xl tracking-tight">
                      {card.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3: Recent Searches (Text Chips) */}
          <section className="px-6 md:px-12 max-w-5xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-4 h-4 text-white/50" />
              <h2 className="text-xs font-bold tracking-wider uppercase text-white/50">Recent Searches</h2>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {RECENT_SEARCHES.map((search, idx) => (
                <button 
                  key={idx}
                  className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-medium hover:bg-white/10 hover:border-white/20 transition-colors flex items-center gap-2"
                >
                  <Search className="w-3.5 h-3.5 text-white/40" />
                  {search}
                </button>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
