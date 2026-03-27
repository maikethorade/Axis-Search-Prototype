import React, { useState, useEffect } from 'react';
import { Search, User, Play, Info, Plus } from 'lucide-react';
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

export function CinemaSpotlight() {
  const [isScrolled, setIsScrolled] = useState(false);
  const heroItem = HERO_ITEMS[0]; // Marty Supreme

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const continueWatching = [
    { id: 'cw1', title: 'The White Lotus', progress: 65, img: TRENDING[1].thumbnailUrl },
    { id: 'cw2', title: 'Spider-Man: ATSV', progress: 30, img: TRENDING[2].thumbnailUrl },
    { id: 'cw3', title: 'Peaky Blinders', progress: 85, img: TRENDING[3].thumbnailUrl },
    { id: 'cw4', title: 'Free Solo', progress: 15, img: TRENDING[5].thumbnailUrl },
  ];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#4a6af7] selection:text-white pb-20">
      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-300 ${
          isScrolled ? 'bg-[#1a1a1a] shadow-lg' : 'bg-gradient-to-b from-black/80 to-transparent'
        }`}
      >
        <div className="flex items-center gap-10">
          <img 
            src={AXIS_LOGO} 
            alt="AXIS" 
            className="h-6"
            style={{ filter: 'brightness(0) invert(1)' }} 
          />
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-[#ccc]">
            {NAV_ITEMS.map(item => (
              <button key={item} className="hover:text-white transition-colors duration-200">
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-5 text-white">
          <button className="hover:text-[#4a6af7] transition-colors"><Search size={20} /></button>
          <button className="hover:text-[#4a6af7] transition-colors"><User size={20} /></button>
        </div>
      </nav>

      {/* 100vh Immersive Hero */}
      <div className="relative h-screen w-full flex flex-col justify-end">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroItem.heroUrl} 
            alt={heroItem.title}
            className="w-full h-full object-cover"
          />
          {/* Gradients for text readability and fade out at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 px-8 pb-32 md:pb-40 max-w-4xl">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-4 leading-none uppercase">
            {heroItem.title}
          </h1>
          
          <div className="flex items-center gap-4 text-sm font-medium mb-6 text-[#ccc]">
            <span className="text-white bg-[#2a2a2a] px-2 py-0.5">{heroItem.rating}</span>
            <span>{heroItem.year}</span>
            <span>{heroItem.duration}</span>
            <div className="flex items-center gap-2">
              {heroItem.genre.map((g, i) => (
                <React.Fragment key={g}>
                  <span className="text-white">{g}</span>
                  {i < heroItem.genre.length - 1 && <span className="w-1 h-1 rounded-full bg-gray-500" />}
                </React.Fragment>
              ))}
            </div>
            {heroItem.personalizedScore && heroItem.personalizedScore > 90 && (
              <span className="bg-black text-[10px] uppercase px-1.5 py-px border border-[#333] tracking-wider">
                Top Pick
              </span>
            )}
          </div>

          <p className="text-lg text-gray-300 mb-10 max-w-2xl leading-relaxed">
            {heroItem.description}
          </p>

          <div className="flex items-center gap-4">
            <button className="flex items-center justify-center gap-2 bg-white text-black px-8 py-3.5 font-bold hover:bg-gray-200 transition-colors">
              <Play size={20} fill="currentColor" />
              PLAY NOW
            </button>
            <button className="flex items-center justify-center gap-2 bg-[#2a2a2a]/80 text-white px-8 py-3.5 font-bold hover:bg-[#2a2a2a] transition-colors border border-gray-700/50">
              <Plus size={20} />
              MY LIST
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area - Dense Layout */}
      <div className="relative z-20 px-8 flex flex-col gap-12 mt-20 pb-20">
        
        {/* Continue Watching Strip */}
        <div className="w-full bg-[#111] p-6 flex flex-col md:flex-row items-center gap-8 shadow-2xl border-t border-[#333]">
          <h2 className="text-sm font-bold uppercase tracking-widest text-[#ccc] min-w-max">Continue<br/>Watching</h2>
          <div className="flex-1 flex gap-4 overflow-x-auto no-scrollbar w-full">
            {continueWatching.map(item => (
              <div key={item.id} className="group relative flex-shrink-0 w-48 cursor-pointer overflow-hidden">
                <div className="aspect-video w-full">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-10 h-10 rounded-full bg-black/60 flex items-center justify-center backdrop-blur-sm border border-white/20">
                      <Play size={16} fill="white" />
                    </div>
                  </div>
                </div>
                {/* Progress Bar */}
                <div className="w-full h-1 bg-[#2a2a2a]">
                  <div className="h-full bg-[#4a6af7]" style={{ width: `${item.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dense Rails */}
        <div className="flex flex-col gap-10 mt-10">
          <ContentRail title="Trending Now" items={TRENDING} isLandscape={false} />
          <ContentRail title="Top Picks for You" items={TOP_PICKS} isLandscape={true} />
          <ContentRail title="Live & Upcoming Sports" items={LIVE_SPORTS} isLandscape={true} isLive={true} />
          <ContentRail title="Movies" items={MOVIES} isLandscape={true} />
        </div>

      </div>
    </div>
  );
}

function ContentRail({ title, items, isLandscape, isLive = false }: { title: string, items: ContentItem[], isLandscape: boolean, isLive?: boolean }) {
  const cardWidthClass = isLandscape ? 'w-[200px] md:w-[240px]' : 'w-[120px] md:w-[140px]';
  const aspectClass = isLandscape ? 'aspect-video' : 'aspect-[2/3]';

  return (
    <div className="w-full">
      <div className="flex items-baseline justify-between mb-4 border-t border-[#222] pt-4">
        <h3 className="text-lg font-semibold tracking-wide">{title}</h3>
      </div>
      
      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-4 -mx-8 px-8">
        {items.map((item) => (
          <div 
            key={item.id} 
            className={`relative flex-shrink-0 cursor-pointer group ${cardWidthClass} ${aspectClass} bg-[#111] overflow-hidden transition-transform duration-300 hover:z-10`}
          >
            <img 
              src={isLandscape ? item.heroUrl : item.thumbnailUrl} 
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            
            {/* Badges */}
            <div className="absolute top-2 left-2 flex flex-col gap-1 z-20">
              {item.type === 'live' && (
                <div className="bg-[#ec0000] text-white text-[10px] font-bold uppercase px-1.5 py-0.5 flex items-center gap-1.5 shadow-md">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  LIVE
                </div>
              )}
              {item.personalizedScore && item.personalizedScore > 90 && (
                <div className="bg-black text-white text-[10px] uppercase px-1.5 py-px border border-[#333] shadow-md w-max">
                  Top Pick
                </div>
              )}
            </div>

            {/* Hover Content */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 z-10">
              <h4 className="font-bold text-sm mb-1 leading-tight">{item.title}</h4>
              <div className="flex items-center gap-2 text-[10px] text-[#ccc] mb-2">
                {item.year && <span>{item.year}</span>}
                {item.duration && <span>{item.duration}</span>}
                <span className="truncate">{item.genre.join(', ')}</span>
              </div>
              <div className="flex gap-2">
                <button className="bg-white text-black p-1.5 hover:bg-gray-200 transition-colors">
                  <Play size={12} fill="currentColor" />
                </button>
                <button className="bg-[#2a2a2a] text-white p-1.5 hover:bg-gray-600 transition-colors">
                  <Plus size={12} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}