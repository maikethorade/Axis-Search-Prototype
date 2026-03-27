import React, { useState } from 'react';
import { Search, User, PlayCircle, Clock } from 'lucide-react';
import './_group.css';
import { 
  SEARCH_QUERY, 
  SEARCH_RESULTS, 
  MOMENTS, 
  FILTERS, 
  RELATED_SEARCHES, 
  NAV_ITEMS, 
  AXIS_LOGO 
} from './_shared/data';

export function GridGallery() {
  const [activeFilter, setActiveFilter] = useState("All Content");

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#4a6af7] selection:text-white pb-24">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-[#1a1a1a] z-50 flex items-center justify-between px-6 lg:px-12 border-b border-white/5">
        <div className="flex items-center gap-12">
          <img 
            src={AXIS_LOGO} 
            alt="AXIS" 
            className="h-6 object-contain"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item, i) => (
              <a 
                key={i} 
                href="#" 
                className={`text-sm tracking-wide transition-colors ${i === 0 ? 'text-[#ccc]' : 'text-[#ccc] hover:text-white'}`}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-6 text-[#ccc]">
          <button className="hover:text-white transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button className="hover:text-white transition-colors">
            <User className="w-5 h-5" />
          </button>
        </div>
      </nav>

      <main className="pt-24 px-4 md:px-8 lg:px-12 max-w-[1800px] mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-light mb-2">Search Results</h1>
          <p className="text-[#ccc] text-lg">
            Showing {SEARCH_RESULTS.length} results for <span className="text-white font-medium">"{SEARCH_QUERY}"</span>
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-10">
          {FILTERS.map(filter => {
            const isActive = filter === activeFilter;
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 text-sm transition-colors ${
                  isActive 
                    ? 'bg-[#4a6af7] text-white font-medium' 
                    : 'bg-white/5 text-[#ccc] hover:bg-white/10'
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* In-Video Moments */}
        <section className="bg-[#2a2a2a] -mx-4 md:-mx-8 lg:-mx-12 px-4 md:px-8 lg:px-12 py-8 mb-12 border-y border-white/5">
          <div className="flex items-center gap-2 mb-6">
            <PlayCircle className="w-5 h-5 text-[#4a6af7]" />
            <h2 className="text-xl font-medium">In-Video Moments</h2>
            <span className="text-[#ccc] ml-2 text-sm">Jump straight to the action</span>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {MOMENTS.map((moment) => (
              <div key={moment.id} className="group cursor-pointer relative">
                <div className="aspect-video relative overflow-hidden mb-3 bg-black">
                  <img 
                    src={moment.thumbnailUrl} 
                    alt={moment.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-black/60 flex items-center justify-center backdrop-blur-sm border border-white/20">
                      <PlayCircle className="w-6 h-6 text-white ml-1" />
                    </div>
                  </div>

                  <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-sm text-white text-xs px-2 py-1 font-medium flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-[#4a6af7]" />
                    {moment.timestamp}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white line-clamp-1 group-hover:text-[#4a6af7] transition-colors">{moment.title}</h3>
                  <p className="text-xs text-[#ccc] mt-1 line-clamp-1">{moment.parentTitle}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Main Grid Results */}
        <section className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12">
            {SEARCH_RESULTS.map((item) => {
              const isLive = item.type === 'live';
              const isTopPick = item.personalizedScore && item.personalizedScore > 90;

              return (
                <div key={item.id} className="group cursor-pointer flex flex-col relative">
                  <div className="aspect-video relative overflow-hidden mb-3 bg-[#1a1a1a]">
                    <img 
                      src={item.thumbnailUrl} 
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 pointer-events-none">
                      <p className="text-sm text-white line-clamp-2">{item.description}</p>
                    </div>

                    {/* Badges */}
                    <div className="absolute top-2 left-2 flex flex-col items-start gap-1">
                      {isLive && (
                        <div className="bg-[#ec0000] text-white uppercase text-[10px] font-bold px-2 py-1 tracking-wider flex items-center gap-1.5 shadow-lg">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                          LIVE
                        </div>
                      )}
                      {isTopPick && (
                        <div className="bg-black text-white uppercase text-[10px] font-bold px-1.5 py-px tracking-wider shadow-lg">
                          Top Pick
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-base font-medium text-white line-clamp-2 mb-1 group-hover:text-[#4a6af7] transition-colors leading-tight">
                      {item.title}
                    </h3>
                    
                    <div className="flex items-center gap-2 text-xs text-[#ccc] mt-auto pt-1">
                      {item.year && <span>{item.year}</span>}
                      {item.year && (item.duration || item.rating) && <span className="w-1 h-1 rounded-full bg-white/30" />}
                      {item.duration && <span>{item.duration}</span>}
                      {item.rating && (
                        <>
                          <span className="w-1 h-1 rounded-full bg-white/30" />
                          <span className="px-1 border border-white/30 text-[10px]">{item.rating}</span>
                        </>
                      )}
                      <span className="ml-auto capitalize text-white/50">{item.type}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Related Searches */}
        <section className="pt-8 border-t border-white/10">
          <h2 className="text-[#ccc] text-sm uppercase tracking-wider mb-4">Related Searches</h2>
          <div className="flex flex-wrap gap-2">
            {RELATED_SEARCHES.map((query) => (
              <button 
                key={query}
                className="px-4 py-2 bg-[#1a1a1a] border border-white/5 text-[#ccc] text-sm hover:bg-[#2a2a2a] hover:text-white transition-colors flex items-center gap-2"
              >
                <Search className="w-3.5 h-3.5 opacity-50" />
                {query}
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
