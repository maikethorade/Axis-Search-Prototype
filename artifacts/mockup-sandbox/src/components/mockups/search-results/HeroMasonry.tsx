import React, { useState } from 'react';
import { Search, User, Play, Clock, PlayCircle } from 'lucide-react';
import {
  SEARCH_QUERY,
  SEARCH_RESULTS,
  MOMENTS,
  FILTERS,
  RELATED_SEARCHES,
  NAV_ITEMS,
  AXIS_LOGO,
} from './_shared/data';
import './_group.css';

export function HeroMasonry() {
  const [activeFilter, setActiveFilter] = useState("All Content");
  
  const bestMatch = SEARCH_RESULTS[0];
  const remainingResults = SEARCH_RESULTS.slice(1);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[var(--axis-brand)] selection:text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 bg-[var(--axis-nav)] border-b border-white/5">
        <div className="flex items-center gap-10">
          <img 
            src={AXIS_LOGO} 
            alt="AXIS" 
            className="h-6 object-contain"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a 
                key={item} 
                href="#" 
                className="text-sm font-medium text-[var(--axis-text-secondary)] hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-6 text-[var(--axis-text-secondary)]">
          <button className="hover:text-white transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button className="hover:text-white transition-colors">
            <User className="w-5 h-5" />
          </button>
        </div>
      </nav>

      <main className="pb-24">
        {/* Search Header & Filters */}
        <div className="px-8 pt-10 pb-6 space-y-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">Search Results</h1>
            <p className="text-[var(--axis-text-secondary)] text-sm">
              Showing {SEARCH_RESULTS.length} results for "{SEARCH_QUERY}"
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-1.5 text-sm font-medium transition-colors ${
                  activeFilter === filter
                    ? 'bg-[var(--axis-brand)] text-white'
                    : 'bg-white/5 text-[var(--axis-text-secondary)] hover:bg-white/10 hover:text-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Hero Section (Best Match) */}
        {bestMatch && (
          <section className="relative w-full h-[45vh] min-h-[400px] mb-12 group cursor-pointer">
            <div className="absolute inset-0">
              <img 
                src={bestMatch.heroUrl} 
                alt={bestMatch.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
            </div>
            
            <div className="absolute inset-0 px-8 flex flex-col justify-end pb-12">
              <div className="max-w-3xl space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-[var(--axis-brand)] font-bold text-sm tracking-widest uppercase">
                    Best Match
                  </span>
                  {bestMatch.personalizedScore && bestMatch.personalizedScore > 90 && (
                    <span className="bg-black text-white text-[10px] uppercase px-1.5 py-px font-semibold">
                      Top Pick
                    </span>
                  )}
                </div>
                
                <h2 className="text-5xl font-bold leading-tight">{bestMatch.title}</h2>
                <p className="text-lg text-[var(--axis-text-secondary)] max-w-2xl line-clamp-2">
                  {bestMatch.description}
                </p>
                
                <div className="flex items-center gap-4 text-sm font-medium pt-2">
                  {bestMatch.type === 'live' ? (
                    <div className="flex items-center gap-2 bg-[var(--axis-live)] text-white px-2 py-0.5 text-xs font-bold uppercase">
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                      Live
                    </div>
                  ) : (
                    bestMatch.duration && (
                      <span className="text-[var(--axis-text-secondary)]">{bestMatch.duration}</span>
                    )
                  )}
                  {bestMatch.year && <span className="text-[var(--axis-text-secondary)]">{bestMatch.year}</span>}
                  {bestMatch.rating && <span className="text-[var(--axis-text-secondary)]">{bestMatch.rating}</span>}
                </div>
                
                <div className="pt-4">
                  <button className="flex items-center gap-2 bg-white text-black px-6 py-2.5 font-bold hover:bg-gray-200 transition-colors">
                    <Play className="w-5 h-5 fill-black" />
                    {bestMatch.type === 'live' ? 'Watch Live' : 'Play Now'}
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* In-Video Moments */}
        <section className="px-8 mb-16">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <PlayCircle className="w-5 h-5 text-[var(--axis-brand)]" />
            In-Video Moments
          </h3>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
            {MOMENTS.map((moment) => (
              <div key={moment.id} className="flex-none w-[280px] group cursor-pointer">
                <div className="relative aspect-video mb-3 overflow-hidden bg-[var(--axis-surface)]">
                  <img 
                    src={moment.thumbnailUrl} 
                    alt={moment.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                  <div className="absolute bottom-2 right-2 bg-black/80 px-1.5 py-0.5 text-xs font-medium flex items-center gap-1 backdrop-blur-sm">
                    <Clock className="w-3 h-3" />
                    {moment.timestamp}
                  </div>
                </div>
                <h4 className="font-medium text-sm group-hover:text-[var(--axis-brand)] transition-colors line-clamp-1">{moment.title}</h4>
                <p className="text-xs text-[var(--axis-text-secondary)] mt-1">{moment.parentTitle}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Masonry Grid */}
        <section className="px-8 mb-16">
          <h3 className="text-xl font-semibold mb-6">More Results</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">
            {remainingResults.map((item, index) => {
              // Pattern: 0 is large, 1, 2 regular, 3 large, 4, 5 regular
              const isLarge = index % 3 === 0;
              
              return (
                <div 
                  key={item.id} 
                  className={`group relative bg-[var(--axis-surface)] overflow-hidden cursor-pointer ${
                    isLarge ? 'md:col-span-2 row-span-2' : 'col-span-1 row-span-1'
                  }`}
                >
                  {isLarge ? (
                    <>
                      <img 
                        src={item.heroUrl || item.thumbnailUrl} 
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="flex gap-2 mb-3">
                          {item.type === 'live' && (
                            <span className="bg-[var(--axis-live)] text-white px-2 py-0.5 text-[10px] font-bold uppercase flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                              Live
                            </span>
                          )}
                          {item.personalizedScore && item.personalizedScore > 90 && (
                            <span className="bg-black text-white text-[10px] uppercase px-1.5 py-px font-semibold">
                              Top Pick
                            </span>
                          )}
                        </div>
                        <h4 className="text-2xl font-bold mb-2 group-hover:text-[var(--axis-brand)] transition-colors">{item.title}</h4>
                        <p className="text-sm text-[var(--axis-text-secondary)] line-clamp-2 mb-3">
                          {item.description}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-[var(--axis-text-tertiary)] font-medium uppercase tracking-wider">
                          <span>{item.type}</span>
                          {item.year && (
                            <>
                              <span className="w-1 h-1 bg-current rounded-full" />
                              <span>{item.year}</span>
                            </>
                          )}
                          {item.duration && (
                            <>
                              <span className="w-1 h-1 bg-current rounded-full" />
                              <span>{item.duration}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col h-full">
                      <div className="relative w-full h-[60%] overflow-hidden">
                        <img 
                          src={item.thumbnailUrl} 
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-2 left-2 flex flex-col gap-1">
                          {item.type === 'live' && (
                            <span className="bg-[var(--axis-live)] text-white px-1.5 py-0.5 text-[9px] font-bold uppercase flex items-center gap-1 w-fit">
                              <span className="w-1 h-1 bg-white rounded-full animate-pulse" />
                              Live
                            </span>
                          )}
                          {item.personalizedScore && item.personalizedScore > 90 && (
                            <span className="bg-black text-white text-[9px] uppercase px-1.5 py-0.5 font-semibold w-fit">
                              Top Pick
                            </span>
                          )}
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/80 px-1.5 py-0.5 text-[10px] font-medium backdrop-blur-sm">
                          {item.duration || item.type}
                        </div>
                      </div>
                      <div className="p-4 flex flex-col flex-grow justify-between">
                        <div>
                          <h4 className="font-semibold text-sm line-clamp-2 group-hover:text-[var(--axis-brand)] transition-colors mb-1">{item.title}</h4>
                          <div className="text-[11px] text-[var(--axis-text-secondary)] flex items-center gap-2">
                            <span>{item.year}</span>
                            <span className="w-0.5 h-0.5 bg-current rounded-full" />
                            <span className="line-clamp-1">{item.genre.join(', ')}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Related Searches */}
        <section className="px-8 border-t border-white/10 pt-12">
          <h3 className="text-sm font-medium text-[var(--axis-text-secondary)] mb-4 uppercase tracking-wider">Related Searches</h3>
          <div className="flex flex-wrap gap-3">
            {RELATED_SEARCHES.map((search) => (
              <button
                key={search}
                className="px-4 py-2 bg-[var(--axis-surface)] hover:bg-white/10 transition-colors text-sm rounded-full flex items-center gap-2 group"
              >
                <Search className="w-4 h-4 text-[var(--axis-text-tertiary)] group-hover:text-white transition-colors" />
                {search}
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
