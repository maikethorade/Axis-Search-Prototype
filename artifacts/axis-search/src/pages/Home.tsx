import { useState, useEffect, useCallback } from 'react';
import { Navigation } from '../components/Navigation';
import { ContentCard } from '../components/ContentCard';
import { SearchOverlay } from '../components/SearchOverlay';
import { ContentModal } from '../components/ContentModal';
import { useHomeData } from '../hooks/use-search';
import { ContentItem } from '../lib/mock-data';
import { Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function ContentRail({ title, items, onSelect, aspectRatio = 'video' as const, featured = false }: {
  title: string;
  items: ContentItem[];
  onSelect: (item: ContentItem) => void;
  aspectRatio?: 'video' | 'poster';
  featured?: boolean;
}) {
  if (!items.length) return null;
  return (
    <section>
      <h2 className="text-lg md:text-xl font-bold text-white mb-5">
        {title}
      </h2>
      <div className="flex gap-4 md:gap-5 overflow-x-auto pb-6 no-scrollbar snap-x">
        {items.map((item, i) => (
          <div key={item.id} className="snap-start">
            <ContentCard item={item} onClick={onSelect} aspectRatio={aspectRatio} featured={featured && i === 0} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const { heroItems, trending, personalized, football, liveSports, otherSports, movies, series, documentaries, newReleases } = useHomeData();

  const goToSlide = useCallback((index: number) => {
    setActiveHeroIndex(index);
  }, []);

  useEffect(() => {
    if (!heroItems.length) return;
    const timer = setInterval(() => {
      setActiveHeroIndex(prev => (prev + 1) % heroItems.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [heroItems.length]);

  const hero = heroItems[activeHeroIndex];

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      <Navigation onOpenSearch={() => setIsSearchOpen(true)} />
      
      {hero && (
        <section className="relative w-full h-[80vh] md:h-[90vh] flex items-end pb-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={hero.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 w-full h-full"
            >
              <img 
                src={hero.heroUrl} 
                alt={hero.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            </motion.div>
          </AnimatePresence>

          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={hero.id + '-content'}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl"
              >
                <h1 className="text-4xl md:text-6xl font-bold text-white leading-[1.2] mb-5 drop-shadow-2xl">
                  {hero.title}
                </h1>

                <div className="flex items-center gap-0 mb-6 text-white/90 text-sm font-medium">
                  {hero.year && <span>{hero.year}</span>}
                  {hero.rating && <><span className="mx-2 w-px h-3.5 bg-white/40 inline-block align-middle" /><span>{hero.rating}</span></>}
                  {hero.duration && <><span className="mx-2 w-px h-3.5 bg-white/40 inline-block align-middle" /><span>{hero.duration}</span></>}
                  <span className="mx-2 w-px h-3.5 bg-white/40 inline-block align-middle" /><span className="capitalize">{hero.type}</span>
                  {hero.id === 'hero_marty' && (
                    <>
                      <span className="mx-2 w-px h-3.5 bg-white/40 inline-block align-middle" />
                      <svg className="inline-block align-middle" width="80" height="16" viewBox="0 0 10510 3930" fill="white" xmlns="http://www.w3.org/2000/svg" aria-label="Dolby Vision">
                        <path d="M50 2905l0-1017 223 5c146 4 244 11 287 21 361 85 638 334 753 677 39 116 50 211 44 366-7 200-52 340-163 511-130 199-329 344-574 419-79 24-102 26-327 31l-243 4 0-1017z" transform="translate(0,3930) scale(1,-1)"/>
                        <path d="M2436 3904c-443-95-762-453-806-905-30-308 86-611 320-832 104-99 212-165 345-213 133-47 253-64 468-64l177 0 0 1015 0 1015-217-1c-152 0-239-5-287-15z" transform="translate(0,3930) scale(1,-1)"/>
                        <path d="M3552 2908l3-1013 425 0c309 0 443 4 490 13 213 43 407 148 550 299 119 124 194 255 247 428 25 84 27 103 27 270 1 158-2 189-22 259-72 251-221 458-424 590-97 63-170 97-288 134l-85 26-463 4-462 3 2-1013z m825 701c165-22 283-81 404-199 227-223 279-550 133-831-70-133-176-234-319-304-132-65-197-75-490-75l-245 0 0 703c0 387 3 707 7 710 11 11 425 8 510-4z" transform="translate(0,3930) scale(1,-1)"/>
                        <path d="M6035 3286c-253-49-460-232-542-481-23-70-26-96-26-210 0-114 3-140 26-210 37-113 90-198 177-286 84-85 170-138 288-177 67-22 94-26 207-26 113 0 140 4 207 26 119 39 204 92 288 177 87 89 140 174 177 286 22 67 26 99 27 200 1 137-14 207-69 320-134 277-457 440-760 381z m252-284c117-37 206-114 260-229 121-253-38-548-321-595-258-43-503 183-483 447 20 271 287 457 544 377z" transform="translate(0,3930) scale(1,-1)"/>
                        <path d="M7070 2905l0-1015 155 0 155 0 0 1015 0 1015-155 0-155 0 0-1015z" transform="translate(0,3930) scale(1,-1)"/>
                        <path d="M7640 2905l0-1015 150 0 150 0 0 60c0 33 2 60 5 60 2 0 33-15 67-34 202-110 433-113 648-9 79 38 108 59 180 132 72 71 95 102 134 181 102 207 102 414 1 625-120 251-394 411-670 391-115-8-225-42-307-93-21-13-42-23-48-23-7 0-10 125-10 370l0 370-150 0-150 0 0-1015z m832 95c219-67 348-310 280-527-62-198-268-328-466-295-96 15-168 52-235 119-131 132-164 311-87 478 27 60 101 145 158 181 100 63 234 80 350 44z" transform="translate(0,3930) scale(1,-1)"/>
                        <path d="M9059 3258c10-24 138-312 285-642l266-598-72-162c-39-88-78-171-86-183-37-58-132-80-208-48l-35 14-18-42c-10-23-37-84-60-135-23-52-39-97-36-102 3-4 40-23 83-41 70-31 86-34 177-34 93 0 105 2 167 33 76 37 149 104 180 166 29 57 799 1777 805 1799 5 16-6 17-161 15l-167-3-185-415c-102-228-192-431-200-450l-15-35-201 453-201 452-168 0-168 0 18-42z" transform="translate(0,3930) scale(1,-1)"/>
                        <path d="M2650 968c0-2 81-211 179-463l179-460 59-3 59-3 178 453c98 249 180 459 183 466 4 9-13 12-65 12-47 0-71-4-74-12-3-7-65-176-138-375-73-200-136-363-139-363-3 0-67 168-142 373l-136 372-72 3c-39 2-71 1-71 0z" transform="translate(0,3930) scale(1,-1)"/>
                        <path d="M3805 958c-3-7-4-215-3-463l3-450 63-3 62-3 0 466 0 465-60 0c-39 0-62-4-65-12z" transform="translate(0,3930) scale(1,-1)"/>
                        <path d="M4260 885c-124-27-196-100-209-213-7-63 8-113 51-164 48-57 109-82 258-107 148-25 190-44 190-88 0-65-73-99-195-89-74 6-124 24-197 71l-47 31-38-44-38-44 32-28c91-78 283-117 424-87 131 28 205 103 217 221 12 127-54 205-221 260-30 10-86 25-124 33-80 17-123 40-133 72-13 40 9 74 60 94 67 27 177 18 268-22l28-12 30 42c17 23 31 47 31 52 0 16-82 49-162 65-84 17-145 17-224-3z" transform="translate(0,3930) scale(1,-1)"/>
                        <path d="M5150 958c-3-7-4-215-3-463l3-450 63-3 62-3 0 466 0 465-60 0c-39 0-62-4-65-12z" transform="translate(0,3930) scale(1,-1)"/>
                        <path d="M5536 959c-3-8-56-141-117-296-61-155-111-290-111-300 0-10 49-145 110-300l110-283 63 0 63 0 112 288c62 158 113 294 113 302 1 9-49 146-110 305l-112 290-56 3c-42 2-59-1-65-9z m138-384l99-260-100-265c-55-146-102-267-105-269-3-3-50 113-106 258l-101 263 101 267c56 146 103 267 106 268 3 0 50-117 106-262z" transform="translate(0,3930) scale(1,-1)"/>
                      </svg>
                    </>
                  )}
                </div>
                
                <p className="text-base md:text-lg mb-8 line-clamp-2 max-w-xl" style={{ color: 'var(--axis-text-secondary)', fontWeight: 400, lineHeight: 1.5 }}>
                  {hero.description}
                </p>
                
                <div className="flex items-center gap-5">
                  <button className="cta-btn cta-btn--primary cta-btn--large">
                    <span className="cta-btn__icon">
                      <Play className="w-5 h-5 fill-white stroke-white" />
                    </span>
                    <span className="cta-btn__content">Watch</span>
                  </button>
                  <button 
                    onClick={() => setSelectedItem(hero)}
                    className="cta-toggle-btn"
                  >
                    <svg className="cta-toggle-btn__icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="currentColor"/>
                      <path d="M11.0682 16.5V9.95457H12.8835V16.5H11.0682ZM11.9801 9.11082C11.7102 9.11082 11.4787 9.02133 11.2855 8.84235C11.0952 8.66053 11 8.4432 11 8.19036C11 7.94036 11.0952 7.72587 11.2855 7.5469C11.4787 7.36508 11.7102 7.27417 11.9801 7.27417C12.25 7.27417 12.4801 7.36508 12.6705 7.5469C12.8636 7.72587 12.9602 7.94036 12.9602 8.19036C12.9602 8.4432 12.8636 8.66053 12.6705 8.84235C12.4801 9.02133 12.25 9.11082 11.9801 9.11082Z" fill="currentColor"/>
                    </svg>
                    <span className="cta-toggle-btn__label">More Info</span>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {heroItems.length > 1 && (
            <div className="indicator-blocks-container absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1">
              {heroItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`indicator-block ${index === activeHeroIndex ? 'indicator-block--active' : ''}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </section>
      )}

      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12 md:space-y-14 mt-[-40px] relative z-20">
        
        <ContentRail
          title="Trending Now"
          items={trending}
          onSelect={setSelectedItem}
          aspectRatio="poster"
        />

        <ContentRail
          title="Top Picks for You"
          items={personalized}
          onSelect={setSelectedItem}
          featured
        />

        <ContentRail
          title="Live & Upcoming Sports"
          items={liveSports}
          onSelect={setSelectedItem}
        />

        <ContentRail
          title="Football"
          items={football}
          onSelect={setSelectedItem}
        />

        <ContentRail
          title="More Sports"
          items={otherSports}
          onSelect={setSelectedItem}
        />

        <ContentRail
          title="New Releases"
          items={newReleases}
          onSelect={setSelectedItem}
          aspectRatio="poster"
        />

        <ContentRail
          title="Movies"
          items={movies}
          onSelect={setSelectedItem}
        />

        <ContentRail
          title="Series"
          items={series}
          onSelect={setSelectedItem}
        />

        <ContentRail
          title="Documentaries"
          items={documentaries}
          onSelect={setSelectedItem}
        />

      </div>

      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <ContentModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
}
