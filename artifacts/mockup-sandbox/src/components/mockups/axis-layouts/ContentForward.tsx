import React from 'react';
import { Search, User, Play, Info } from 'lucide-react';
import './_group.css';
import { 
  HERO_ITEMS, 
  TRENDING, 
  TOP_PICKS, 
  LIVE_SPORTS, 
  NAV_ITEMS, 
  AXIS_LOGO,
  ContentItem
} from './_shared/data';

// --- Shared Subcomponents ---

const TopPickBadge = ({ score }: { score?: number }) => {
  if (!score || score <= 90) return null;
  return (
    <div className="absolute top-2 right-2 bg-black text-white uppercase text-[10px] font-bold px-1.5 py-px z-10">
      Top Pick
    </div>
  );
};

const LiveBadge = () => (
  <div className="absolute top-2 left-2 bg-[#ec0000] text-white uppercase text-[10px] font-bold px-1.5 py-px flex items-center gap-1 z-10">
    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
    Live
  </div>
);

const CardHoverOverlay = ({ item }: { item: ContentItem }) => (
  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
    <h3 className="text-white font-semibold text-sm md:text-base line-clamp-1">{item.title}</h3>
    <div className="flex items-center gap-2 text-xs text-[var(--axis-text-secondary)] mt-1">
      {item.year && <span>{item.year}</span>}
      {item.duration && <span>{item.duration}</span>}
      {item.genre && item.genre.length > 0 && (
        <>
          <span className="w-1 h-1 rounded-full bg-[var(--axis-text-tertiary)]"></span>
          <span>{item.genre[0]}</span>
        </>
      )}
    </div>
  </div>
);

// --- Layout Component ---

export function ContentForward() {
  const heroItem = HERO_ITEMS[0];
  
  // Take first 6 trending items for the featured grid
  const featuredItems = TRENDING.slice(0, 6);

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-[var(--axis-nav)] z-50 flex items-center justify-between px-6 md:px-12">
        <div className="flex items-center gap-8">
          <img 
            src={AXIS_LOGO} 
            alt="AXIS" 
            className="h-6"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-[var(--axis-text-secondary)]">
            {NAV_ITEMS.map((item, idx) => (
              <a key={idx} href="#" className={`hover:text-white transition-colors ${idx === 0 ? 'text-white' : ''}`}>
                {item}
              </a>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button className="text-[var(--axis-text-secondary)] hover:text-white transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button className="text-[var(--axis-text-secondary)] hover:text-white transition-colors">
            <User className="w-5 h-5" />
          </button>
        </div>
      </nav>

      <main className="pt-16 pb-20">
        {/* Compact Hero (~40vh) */}
        <section className="relative h-[40vh] min-h-[300px] w-full bg-[var(--axis-surface)] flex items-end">
          <div className="absolute inset-0">
            <img 
              src={heroItem.heroUrl} 
              alt={heroItem.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          </div>
          
          <div className="relative z-10 p-6 md:p-12 w-full max-w-4xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">{heroItem.title}</h1>
            <button className="flex items-center gap-2 bg-white text-black px-6 py-2 text-sm font-semibold hover:bg-gray-200 transition-colors">
              <Play className="w-4 h-4 fill-black" />
              WATCH
            </button>
          </div>
        </section>

        {/* Featured Grid Section */}
        <section className="px-6 md:px-12 mt-6">
          <h2 className="text-xl font-bold mb-4 text-[var(--axis-text-secondary)]">Featured</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredItems.map((item) => (
              <div key={item.id} className="group relative aspect-video bg-[var(--axis-surface)] overflow-hidden cursor-pointer">
                <img 
                  src={item.heroUrl || item.thumbnailUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <TopPickBadge score={item.personalizedScore} />
                {item.type === 'live' && <LiveBadge />}
                <CardHoverOverlay item={item} />
              </div>
            ))}
          </div>
        </section>

        {/* Rails Section */}
        <div className="mt-12 flex flex-col gap-8 px-6 md:px-12">
          
          {/* Trending Rail (Posters) */}
          <section className="flex">
            <div className="w-12 shrink-0 flex items-center justify-center">
              <h2 
                className="text-lg font-bold tracking-widest uppercase text-[var(--axis-text-tertiary)] whitespace-nowrap"
                style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
              >
                Trending Now
              </h2>
            </div>
            <div className="flex-1 flex gap-3 md:gap-4 overflow-x-auto no-scrollbar pl-4 border-l border-[var(--axis-surface)]">
              {TRENDING.map((item) => (
                <div key={item.id} className="group relative shrink-0 w-[160px] md:w-[200px] aspect-[2/3] bg-[var(--axis-surface)] overflow-hidden cursor-pointer">
                  <img 
                    src={item.thumbnailUrl} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <TopPickBadge score={item.personalizedScore} />
                  <CardHoverOverlay item={item} />
                </div>
              ))}
            </div>
          </section>

          {/* Live Sports Rail (Landscape) */}
          <section className="flex">
            <div className="w-12 shrink-0 flex items-center justify-center">
              <h2 
                className="text-lg font-bold tracking-widest uppercase text-[var(--axis-text-tertiary)] whitespace-nowrap"
                style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
              >
                Live Sports
              </h2>
            </div>
            <div className="flex-1 flex gap-3 md:gap-4 overflow-x-auto no-scrollbar pl-4 border-l border-[var(--axis-surface)]">
              {LIVE_SPORTS.map((item) => (
                <div key={item.id} className="group relative shrink-0 w-[280px] md:w-[320px] aspect-video bg-[var(--axis-surface)] overflow-hidden cursor-pointer">
                  <img 
                    src={item.thumbnailUrl} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <LiveBadge />
                  <TopPickBadge score={item.personalizedScore} />
                  <CardHoverOverlay item={item} />
                </div>
              ))}
            </div>
          </section>

          {/* Top Picks Rail (Landscape) */}
          <section className="flex">
            <div className="w-12 shrink-0 flex items-center justify-center">
              <h2 
                className="text-lg font-bold tracking-widest uppercase text-[var(--axis-text-tertiary)] whitespace-nowrap"
                style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
              >
                Top Picks
              </h2>
            </div>
            <div className="flex-1 flex gap-3 md:gap-4 overflow-x-auto no-scrollbar pl-4 border-l border-[var(--axis-surface)]">
              {TOP_PICKS.map((item) => (
                <div key={item.id} className="group relative shrink-0 w-[280px] md:w-[320px] aspect-video bg-[var(--axis-surface)] overflow-hidden cursor-pointer">
                  <img 
                    src={item.heroUrl || item.thumbnailUrl} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <TopPickBadge score={item.personalizedScore} />
                  <CardHoverOverlay item={item} />
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
