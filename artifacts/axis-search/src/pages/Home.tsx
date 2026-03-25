import { useState } from 'react';
import { Navigation } from '../components/Navigation';
import { ContentCard } from '../components/ContentCard';
import { SearchOverlay } from '../components/SearchOverlay';
import { ContentModal } from '../components/ContentModal';
import { useHomeData } from '../hooks/use-search';
import { ContentItem } from '../lib/mock-data';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';

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
  const { hero, trending, personalized, football, liveSports, otherSports, movies, series, documentaries, newReleases } = useHomeData();

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      <Navigation onOpenSearch={() => setIsSearchOpen(true)} />
      
      {hero && (
        <section className="relative w-full h-[80vh] md:h-[90vh] flex items-end pb-24">
          <div className="absolute inset-0 w-full h-full">
            <img 
              src={hero.heroUrl} 
              alt={hero.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="max-w-2xl"
            >
              <div className="flex items-center gap-2 mb-4">
                {hero.year && <span className="axis-metadata-badge" style={{ borderColor: '#fff', color: '#fff' }}>{hero.year}</span>}
                {hero.rating && <span className="axis-metadata-badge" style={{ borderColor: '#fff', color: '#fff' }}>{hero.rating}</span>}
                {hero.duration && <span className="axis-metadata-badge" style={{ borderColor: '#fff', color: '#fff' }}>{hero.duration}</span>}
                <span className="axis-metadata-badge capitalize" style={{ borderColor: 'var(--axis-brand)', color: 'var(--axis-brand)' }}>{hero.type}</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-[1.2] mb-5 drop-shadow-2xl">
                {hero.title}
              </h1>
              
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
          </div>
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
