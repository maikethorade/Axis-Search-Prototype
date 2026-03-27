import React, { useState } from 'react';
import { Search, User, Play, Info } from 'lucide-react';
import './_group.css';
import { 
  HERO_ITEMS, 
  TRENDING, 
  TOP_PICKS, 
  LIVE_SPORTS, 
  MOVIES, 
  NAV_ITEMS, 
  AXIS_LOGO,
  ContentItem
} from './_shared/data';

export function EditorialSplit() {
  const heroItem = HERO_ITEMS[0];
  const trendingList = TRENDING.slice(0, 4);
  const continueWatching = MOVIES.slice(0, 5);
  
  // Row 1 data
  const row1Featured = TOP_PICKS[0];
  const row1Grid = TOP_PICKS.slice(1, 5);
  
  // Row 3 data
  const row3Featured = MOVIES[0];
  const row3Grid = MOVIES.slice(1, 5);

  return (
    <div className="min-h-screen bg-black text-white font-['Inter'] pb-20">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between bg-[#1a1a1a]/95 backdrop-blur border-b border-[#2a2a2a]">
        <div className="flex items-center gap-10">
          <img 
            src={AXIS_LOGO} 
            alt="AXIS" 
            className="h-6" 
            style={{ filter: 'brightness(0) invert(1)' }} 
          />
          <div className="hidden md:flex items-center gap-6">
            {NAV_ITEMS.map((item, i) => (
              <a 
                key={item} 
                href="#" 
                className={`text-sm tracking-wide transition-colors ${i === 0 ? 'text-white font-medium' : 'text-[#ccc] hover:text-white'}`}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button className="text-[#ccc] hover:text-white transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button className="text-[#ccc] hover:text-white transition-colors">
            <User className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* Top Section: Split-Screen Hero */}
      <div className="pt-16 min-h-[70vh] flex flex-col lg:flex-row border-b border-[#2a2a2a]">
        {/* LEFT 60%: Hero */}
        <div className="w-full lg:w-[60%] relative flex flex-col justify-end p-8 lg:p-12 min-h-[50vh] lg:min-h-full border-r border-[#2a2a2a]">
          <div className="absolute inset-0 z-0">
            <img 
              src={heroItem.heroUrl} 
              alt={heroItem.title} 
              className="w-full h-full object-cover"
            />
            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent"></div>
          </div>
          
          <div className="relative z-10 max-w-2xl">
            {heroItem.personalizedScore && heroItem.personalizedScore > 90 && (
              <div className="inline-block bg-black text-white uppercase text-[10px] tracking-wider px-1.5 py-px mb-4 border border-white/20">
                Top Pick
              </div>
            )}
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-4 uppercase">
              {heroItem.title}
            </h1>
            <div className="flex items-center gap-3 text-sm text-[#ccc] mb-6">
              <span className="text-white font-medium border border-[#2a2a2a] px-1">{heroItem.rating}</span>
              <span>{heroItem.year}</span>
              <span>•</span>
              <span>{heroItem.duration}</span>
              <span>•</span>
              <span>{heroItem.genre.join(', ')}</span>
            </div>
            <p className="text-lg text-[#ccc] mb-8 leading-relaxed max-w-xl line-clamp-3">
              {heroItem.description}
            </p>
            <div className="flex items-center gap-4">
              <button className="bg-white text-black px-8 py-3 flex items-center gap-2 font-medium hover:bg-gray-200 transition-colors">
                <Play className="w-5 h-5 fill-current" />
                Play Now
              </button>
              <button className="bg-[#2a2a2a] text-white px-8 py-3 flex items-center gap-2 font-medium hover:bg-[#3a3a3a] transition-colors border border-[#3a3a3a]">
                <Info className="w-5 h-5" />
                More Info
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT 40%: Trending Vertical Stack */}
        <div className="w-full lg:w-[40%] bg-[#0a0a0a] flex flex-col h-full overflow-hidden">
          <div className="p-6 border-b border-[#2a2a2a]">
            <h2 className="text-sm uppercase tracking-widest font-semibold text-[#ccc]">Trending Now</h2>
          </div>
          <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-6">
            {trendingList.map((item, idx) => (
              <div key={item.id} className="group flex gap-4 cursor-pointer">
                <div className="relative w-24 h-36 shrink-0 overflow-hidden bg-[#2a2a2a]">
                  <img 
                    src={item.thumbnailUrl} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-0 left-0 bg-black text-white text-xs font-bold w-6 h-6 flex items-center justify-center border-b border-r border-[#2a2a2a]">
                    {idx + 1}
                  </div>
                </div>
                <div className="flex flex-col justify-center py-2">
                  <h3 className="font-semibold text-lg group-hover:text-[#4a6af7] transition-colors line-clamp-2 leading-tight mb-2">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-grey">
                    <span>{item.year}</span>
                    <span>•</span>
                    <span>{item.genre[0]}</span>
                  </div>
                  {item.personalizedScore && item.personalizedScore > 90 && (
                    <div className="mt-2 inline-block bg-black text-white uppercase text-[9px] tracking-wider px-1.5 py-px border border-white/20 self-start">
                      Top Pick
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-6 lg:px-12 mt-16 space-y-20">
        
        {/* Continue Watching - Horizontal Rail */}
        <section>
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            Continue Watching
            <span className="text-sm font-normal text-grey ml-2 cursor-pointer hover:text-white transition-colors">View All</span>
          </h2>
          <div className="flex overflow-x-auto no-scrollbar gap-4 pb-4">
            {continueWatching.map((item) => (
              <ContentCard key={item.id} item={item} aspect="video" />
            ))}
          </div>
        </section>

        {/* Row 1: Asymmetric Left Featured, Right Grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Top Picks For You</h2>
            <span className="text-sm text-grey cursor-pointer hover:text-white transition-colors">View All</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Featured (takes ~40%) */}
            <div className="lg:col-span-5 h-[300px] lg:h-[400px]">
              <FeaturedCard item={row1Featured} />
            </div>
            {/* Right Grid (takes ~60%) */}
            <div className="lg:col-span-7 grid grid-cols-2 gap-4 h-[400px]">
              {row1Grid.map(item => (
                <GridCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </section>

        {/* Row 2: Live Sports Rail */}
        <section className="bg-[#111] -mx-6 lg:-mx-12 px-6 lg:px-12 py-10 border-y border-[#2a2a2a]">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-3 text-white">
            <span className="w-2 h-2 rounded-full bg-[#ec0000] animate-pulse"></span>
            Live & Upcoming Sports
          </h2>
          <div className="flex overflow-x-auto no-scrollbar gap-4 pb-4">
            {LIVE_SPORTS.map((item) => (
              <ContentCard key={item.id} item={item} aspect="video" isLive={item.type === 'live'} />
            ))}
          </div>
        </section>

        {/* Row 3: Asymmetric Left Grid, Right Featured */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Critically Acclaimed Movies</h2>
            <span className="text-sm text-grey cursor-pointer hover:text-white transition-colors">View All</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-col-reverse lg:flex-row">
            {/* Left Grid (takes ~60%) */}
            <div className="lg:col-span-7 grid grid-cols-2 gap-4 h-[400px] order-2 lg:order-1">
              {row3Grid.map(item => (
                <GridCard key={item.id} item={item} />
              ))}
            </div>
            {/* Right Featured (takes ~40%) */}
            <div className="lg:col-span-5 h-[300px] lg:h-[400px] order-1 lg:order-2">
              <FeaturedCard item={row3Featured} />
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

// Subcomponents

function ContentCard({ item, aspect = 'poster', isLive = false }: { item: ContentItem, aspect?: 'poster' | 'video', isLive?: boolean }) {
  const isPoster = aspect === 'poster';
  const widthClasses = isPoster ? "w-[160px] md:w-[200px]" : "w-[280px] md:w-[320px]";
  const aspectClass = isPoster ? "aspect-[2/3]" : "aspect-video";
  const imageSrc = isPoster ? item.thumbnailUrl : item.heroUrl;

  return (
    <div className={`group relative shrink-0 ${widthClasses} ${aspectClass} cursor-pointer bg-[#2a2a2a] overflow-hidden`}>
      <img 
        src={imageSrc} 
        alt={item.title} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      
      {/* Badges */}
      <div className="absolute top-2 left-2 flex flex-col gap-1 z-20">
        {isLive && (
          <div className="bg-[#ec0000] text-white text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
            LIVE
          </div>
        )}
        {item.personalizedScore && item.personalizedScore > 90 && !isLive && (
          <div className="bg-black text-white uppercase text-[10px] tracking-wider px-1.5 py-px border border-white/20 shadow-lg">
            Top Pick
          </div>
        )}
      </div>

      {/* Hover Information Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 z-10">
        <h3 className="text-white font-medium text-sm md:text-base mb-1 line-clamp-1">{item.title}</h3>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] md:text-xs text-[#ccc]">
          {item.year && <span>{item.year}</span>}
          {item.rating && <span className="border border-[#ccc] px-1">{item.rating}</span>}
          {item.genre && item.genre.length > 0 && <span>{item.genre[0]}</span>}
        </div>
      </div>
    </div>
  );
}

function FeaturedCard({ item }: { item: ContentItem }) {
  return (
    <div className="group relative w-full h-full cursor-pointer bg-[#2a2a2a] overflow-hidden border border-[#2a2a2a] hover:border-[#4a6af7]/50 transition-colors">
      <img 
        src={item.heroUrl} 
        alt={item.title} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
      
      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
        {item.personalizedScore && item.personalizedScore > 90 && (
          <div className="inline-block bg-black text-white uppercase text-[10px] tracking-wider px-1.5 py-px mb-3 border border-white/20">
            Top Pick
          </div>
        )}
        <h3 className="text-2xl font-bold mb-2 uppercase tracking-tight">{item.title}</h3>
        <p className="text-[#ccc] text-sm line-clamp-2 max-w-md mb-4">{item.description}</p>
        <div className="flex items-center gap-3 text-xs text-grey opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
          <span>{item.year}</span>
          <span>•</span>
          <span>{item.genre.join(', ')}</span>
        </div>
      </div>
    </div>
  );
}

function GridCard({ item }: { item: ContentItem }) {
  return (
    <div className="group relative w-full h-full cursor-pointer bg-[#2a2a2a] overflow-hidden border border-[#2a2a2a] hover:border-white/20 transition-colors">
      <img 
        src={item.heroUrl} 
        alt={item.title} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity"></div>
      
      <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
        <h3 className="text-base font-semibold mb-1 line-clamp-1">{item.title}</h3>
        <div className="flex items-center gap-2 text-[10px] text-[#ccc]">
          <span>{item.year}</span>
          {item.genre && item.genre.length > 0 && (
            <>
              <span>•</span>
              <span>{item.genre[0]}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
