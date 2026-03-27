import React, { useState } from 'react';
import { Search, User, PlayCircle, ChevronRight, Clock, Play } from 'lucide-react';
import './_group.css';
import {
  SEARCH_QUERY,
  SEARCH_RESULTS,
  MOMENTS,
  FILTERS,
  RELATED_SEARCHES,
  NAV_ITEMS,
  AXIS_LOGO,
} from './_shared/data';

export function TwoPanelSplit() {
  const [activeFilter, setActiveFilter] = useState(FILTERS[0]);

  // Group results by category for display
  const groupedResults = SEARCH_RESULTS.reduce((acc, item) => {
    let typeStr = '';
    switch (item.type) {
      case 'live': typeStr = 'Live'; break;
      case 'sport': typeStr = 'Sports'; break;
      case 'movie': typeStr = 'Movies'; break;
      case 'series': typeStr = 'Series'; break;
      case 'documentary': typeStr = 'Documentaries'; break;
      default: typeStr = 'Other';
    }
    if (!acc[typeStr]) acc[typeStr] = [];
    acc[typeStr].push(item);
    return acc;
  }, {} as Record<string, typeof SEARCH_RESULTS>);

  // Order of categories to display
  const categoryOrder = ['Live', 'Sports', 'Movies', 'Series', 'Documentaries', 'Other'];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans overflow-hidden">
      {/* Navigation */}
      <nav className="h-16 bg-[#1a1a1a] flex items-center justify-between px-6 z-20 shrink-0 border-b border-white/5">
        <div className="flex items-center gap-8">
          <img 
            src={AXIS_LOGO} 
            alt="AXIS" 
            className="h-6" 
            style={{ filter: 'brightness(0) invert(1)' }} 
          />
          <div className="hidden md:flex items-center gap-6">
            {NAV_ITEMS.map((item, idx) => (
              <button
                key={idx}
                className="text-sm font-medium text-[#ccc] hover:text-white transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-[#ccc] hover:text-white transition-colors">
            <Search size={20} />
          </button>
          <button className="text-[#ccc] hover:text-white transition-colors">
            <User size={20} />
          </button>
        </div>
      </nav>

      {/* Main Layout: Two Panels */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* LEFT SIDEBAR */}
        <aside className="w-[280px] bg-[#111] border-r border-white/10 flex flex-col shrink-0 overflow-y-auto no-scrollbar pb-8 z-10">
          <div className="p-6 pb-2">
            <h1 className="text-2xl font-bold mb-1">Search Results</h1>
            <p className="text-sm text-[var(--axis-text-tertiary)]">
              Showing {SEARCH_RESULTS.length} results for "{SEARCH_QUERY}"
            </p>
          </div>

          {/* Filters (Vertical) */}
          <div className="mt-4 flex flex-col">
            {FILTERS.map((filter) => {
              const isActive = filter === activeFilter;
              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`
                    px-6 py-3 text-left text-sm font-medium transition-colors border-l-4
                    ${isActive 
                      ? 'border-[var(--axis-brand)] bg-white/5 text-white' 
                      : 'border-transparent text-[var(--axis-text-secondary)] hover:bg-white/5 hover:text-white'
                    }
                  `}
                >
                  {filter}
                </button>
              );
            })}
          </div>

          <div className="w-full h-px bg-white/10 my-6" />

          {/* In-Video Moments */}
          <div className="px-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--axis-text-tertiary)] mb-4">
              In-Video Moments
            </h2>
            <div className="flex flex-col gap-3">
              {MOMENTS.map((moment) => (
                <div 
                  key={moment.id} 
                  className="flex gap-3 group cursor-pointer hover:bg-white/5 p-2 -mx-2 rounded transition-colors"
                >
                  <div className="relative w-16 h-9 shrink-0 bg-[#2a2a2a] overflow-hidden">
                    <img 
                      src={moment.thumbnailUrl} 
                      alt={moment.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <PlayCircle size={14} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <div className="flex flex-col justify-center min-w-0">
                    <h3 className="text-xs font-semibold truncate text-white group-hover:text-[var(--axis-brand)] transition-colors">
                      {moment.title}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[10px] bg-black/80 px-1 py-px text-white font-mono">
                        {moment.timestamp}
                      </span>
                      <span className="text-[10px] text-[var(--axis-text-tertiary)] truncate">
                        {moment.parentTitle}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full h-px bg-white/10 my-6" />

          {/* Related Searches */}
          <div className="px-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--axis-text-tertiary)] mb-4">
              Related Searches
            </h2>
            <div className="flex flex-col gap-2">
              {RELATED_SEARCHES.map((search, idx) => (
                <button
                  key={idx}
                  className="text-left text-sm text-[var(--axis-brand)] hover:text-[var(--axis-brand-hover)] transition-colors flex items-center gap-1 group"
                >
                  <Search size={14} className="opacity-50 group-hover:opacity-100" />
                  <span className="truncate">{search}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* RIGHT MAIN PANEL */}
        <main className="flex-1 overflow-y-auto no-scrollbar bg-[#000] p-8">
          
          <div className="max-w-6xl mx-auto flex flex-col gap-10 pb-20">
            {categoryOrder.map((category) => {
              const items = groupedResults[category];
              if (!items || items.length === 0) return null;

              // If filtering is active, only show the active category unless "All Content" is selected
              if (activeFilter !== 'All Content' && activeFilter !== category && !(activeFilter === 'Documentaries' && category === 'Documentaries')) {
                  // Minor mapping since activeFilter might be 'Live' but category is 'Live'
                  if (activeFilter === 'Sports' && category !== 'Sports') return null;
                  if (activeFilter === 'Movies' && category !== 'Movies') return null;
                  if (activeFilter === 'Series' && category !== 'Series') return null;
                  if (activeFilter === 'Live' && category !== 'Live') return null;
                  if (activeFilter === 'Documentaries' && category !== 'Documentaries') return null;
              }

              return (
                <section key={category} className="flex flex-col gap-4">
                  <div className="flex items-end justify-between border-b border-white/10 pb-2">
                    <h2 className="text-lg font-semibold text-white">
                      {category} <span className="text-[var(--axis-text-tertiary)] font-normal ml-1">({items.length})</span>
                    </h2>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                    {items.map((item) => (
                      <div 
                        key={item.id}
                        className="group relative flex flex-col cursor-pointer"
                      >
                        {/* Thumbnail */}
                        <div className="relative aspect-video bg-[#2a2a2a] overflow-hidden">
                          <img
                            src={item.thumbnailUrl}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          
                          {/* Top Badges */}
                          <div className="absolute top-2 left-2 flex gap-1.5 z-10">
                            {item.type === 'live' && (
                              <div className="bg-[var(--axis-live)] text-white text-[10px] font-bold uppercase px-1.5 py-px flex items-center gap-1 tracking-wider">
                                <span className="w-1 h-1 rounded-full bg-white animate-pulse" />
                                LIVE
                              </div>
                            )}
                            {item.personalizedScore && item.personalizedScore > 90 && (
                              <div className="bg-black text-white text-[10px] font-bold uppercase px-1.5 py-px tracking-wider">
                                TOP PICK
                              </div>
                            )}
                          </div>

                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center">
                            <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center bg-black/40 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                              <Play size={20} className="text-white ml-1" fill="currentColor" />
                            </div>
                          </div>
                          
                          {/* Duration/Year Badge (Bottom Right) */}
                          <div className="absolute bottom-2 right-2 bg-black/80 px-1.5 py-0.5 text-[10px] font-medium text-white">
                            {item.duration || item.year}
                          </div>
                        </div>

                        {/* Card Info */}
                        <div className="mt-3 flex flex-col gap-1">
                          <h3 className="text-sm font-semibold text-white group-hover:text-[var(--axis-brand)] transition-colors line-clamp-2 leading-snug">
                            {item.title}
                          </h3>
                          <div className="flex items-center gap-2 text-[11px] text-[var(--axis-text-tertiary)]">
                            {item.year && <span>{item.year}</span>}
                            {item.year && item.rating && <span className="w-0.5 h-0.5 rounded-full bg-white/30" />}
                            {item.rating && <span className="border border-white/20 px-1 rounded-sm">{item.rating}</span>}
                            {item.genre && item.genre.length > 0 && (
                              <>
                                <span className="w-0.5 h-0.5 rounded-full bg-white/30" />
                                <span>{item.genre[0]}</span>
                              </>
                            )}
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
