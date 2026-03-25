import { useState } from 'react';
import { Navigation } from '../components/Navigation';
import { ContentCard } from '../components/ContentCard';
import { SearchOverlay } from '../components/SearchOverlay';
import { ContentModal } from '../components/ContentModal';
import { useHomeData } from '../hooks/use-search';
import { ContentItem } from '../lib/mock-data';
import { Play, Info, TrendingUp, Trophy, Zap, Film, BookOpen, Star, Sparkles, Clapperboard } from 'lucide-react';
import { motion } from 'framer-motion';

function ContentRail({ title, items, onSelect, icon, aspectRatio = 'video' as const, featured = false }: {
  title: string;
  items: ContentItem[];
  onSelect: (item: ContentItem) => void;
  icon?: React.ReactNode;
  aspectRatio?: 'video' | 'poster';
  featured?: boolean;
}) {
  if (!items.length) return null;
  return (
    <section>
      <h2 className="text-lg md:text-xl font-bold text-white mb-5 flex items-center gap-3">
        {icon}
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
  const { hero, trending, personalized, football, liveSports, otherSports, drama, entertainment, movies, series, documentaries, newReleases } = useHomeData();

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
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2.5 py-0.5 text-white text-xs font-bold uppercase tracking-wider rounded-sm flex items-center gap-1.5" style={{ background: 'var(--axis-live)' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> Live Now
                </span>
                <span className="text-white/80 font-medium text-sm">Champions League</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-[1.2] mb-5 drop-shadow-2xl">
                {hero.title}
              </h1>
              
              <p className="text-base md:text-lg mb-8 line-clamp-2 max-w-xl" style={{ color: 'var(--axis-text-secondary)', fontWeight: 400, lineHeight: 1.5 }}>
                {hero.description}
              </p>
              
              <div className="flex items-center gap-3">
                <button className="px-7 py-3.5 rounded-sm font-bold flex items-center gap-2 hover:opacity-90 transition-all shadow-lg text-sm" style={{ background: 'var(--axis-brand)', color: '#fff' }}>
                  <Play className="w-5 h-5 fill-white" /> Watch Live
                </button>
                <button 
                  onClick={() => setSelectedItem(hero)}
                  className="backdrop-blur-md text-white px-7 py-3.5 rounded-sm font-bold flex items-center gap-2 hover:bg-white/20 transition-all text-sm"
                  style={{ background: 'var(--axis-overlay)', border: '1px solid #fff' }}
                >
                  <Info className="w-5 h-5" /> Details
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
          icon={<span className="p-1.5 rounded" style={{ background: 'rgba(74, 106, 247, 0.2)' }}><TrendingUp className="w-4 h-4" style={{ color: 'var(--axis-brand)' }} /></span>}
          featured
        />

        <ContentRail
          title="Live & Upcoming Sports"
          items={liveSports}
          onSelect={setSelectedItem}
          icon={<span className="p-1.5 rounded" style={{ background: 'rgba(236, 0, 0, 0.2)' }}><Zap className="w-4 h-4" style={{ color: 'var(--axis-live)' }} /></span>}
        />

        <ContentRail
          title="Football"
          items={football}
          onSelect={setSelectedItem}
          icon={<span className="p-1.5 rounded" style={{ background: 'rgba(74, 106, 247, 0.2)' }}><Trophy className="w-4 h-4" style={{ color: 'var(--axis-brand)' }} /></span>}
        />

        <ContentRail
          title="More Sports"
          items={otherSports}
          onSelect={setSelectedItem}
          icon={<span className="p-1.5 rounded" style={{ background: 'rgba(255, 178, 0, 0.2)' }}><Trophy className="w-4 h-4" style={{ color: 'var(--axis-gold)' }} /></span>}
        />

        <ContentRail
          title="Drama"
          items={drama}
          onSelect={setSelectedItem}
          icon={<span className="p-1.5 rounded" style={{ background: 'rgba(236, 0, 0, 0.15)' }}><Star className="w-4 h-4" style={{ color: 'var(--axis-live)' }} /></span>}
          aspectRatio="poster"
        />

        <ContentRail
          title="Entertainment"
          items={entertainment}
          onSelect={setSelectedItem}
          icon={<span className="p-1.5 rounded" style={{ background: 'rgba(255, 178, 0, 0.2)' }}><Sparkles className="w-4 h-4" style={{ color: 'var(--axis-gold)' }} /></span>}
          aspectRatio="poster"
        />

        <ContentRail
          title="New Releases"
          items={newReleases}
          onSelect={setSelectedItem}
          icon={<span className="p-1.5 rounded" style={{ background: 'rgba(74, 106, 247, 0.2)' }}><Zap className="w-4 h-4" style={{ color: 'var(--axis-brand)' }} /></span>}
          aspectRatio="poster"
        />

        <ContentRail
          title="Movies"
          items={movies}
          onSelect={setSelectedItem}
          icon={<span className="p-1.5 rounded" style={{ background: 'rgba(255, 178, 0, 0.2)' }}><Film className="w-4 h-4" style={{ color: 'var(--axis-gold)' }} /></span>}
        />

        <ContentRail
          title="Series"
          items={series}
          onSelect={setSelectedItem}
          icon={<span className="p-1.5 rounded" style={{ background: 'rgba(74, 106, 247, 0.2)' }}><Clapperboard className="w-4 h-4" style={{ color: 'var(--axis-brand)' }} /></span>}
        />

        <ContentRail
          title="Documentaries"
          items={documentaries}
          onSelect={setSelectedItem}
          icon={<span className="p-1.5 rounded" style={{ background: 'rgba(74, 106, 247, 0.2)' }}><BookOpen className="w-4 h-4" style={{ color: 'var(--axis-brand)' }} /></span>}
        />

      </div>

      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <ContentModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
}
