import { useState } from 'react';
import { Navigation } from '../components/Navigation';
import { ContentCard } from '../components/ContentCard';
import { SearchOverlay } from '../components/SearchOverlay';
import { ContentModal } from '../components/ContentModal';
import { useHomeData } from '../hooks/use-search';
import { ContentItem } from '../lib/mock-data';
import { Play, Info, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const { hero, trending, personalized, sports, movies } = useHomeData();

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      <Navigation onOpenSearch={() => setIsSearchOpen(true)} />
      
      {/* Hero Section */}
      {hero && (
        <section className="relative w-full h-[80vh] md:h-[90vh] flex items-end pb-24">
          <div className="absolute inset-0 w-full h-full">
            <img 
              src={hero.heroUrl} 
              alt={hero.title}
              className="w-full h-full object-cover"
            />
            {/* Cinematic Gradients */}
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="max-w-2xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-destructive text-white text-xs font-bold uppercase tracking-wider rounded flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" /> Live Now
                </span>
                <span className="text-white/80 font-medium text-sm">Champions League</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-[1.1] mb-6 drop-shadow-2xl">
                {hero.title}
              </h1>
              
              <p className="text-lg md:text-xl text-white/80 mb-8 line-clamp-3 max-w-xl">
                {hero.description}
              </p>
              
              <div className="flex items-center gap-4">
                <button className="bg-white text-black px-8 py-4 rounded-xl font-bold flex items-center gap-3 hover:bg-white/90 hover:scale-105 transition-all shadow-lg shadow-white/20">
                  <Play className="w-5 h-5 fill-black" /> Watch Live
                </button>
                <button 
                  onClick={() => setSelectedItem(hero)}
                  className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-3 hover:bg-white/20 hover:scale-105 transition-all"
                >
                  <Info className="w-5 h-5" /> Details
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Content Rows */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12 md:space-y-16 mt-[-40px] relative z-20">
        
        <section>
          <h2 className="text-xl md:text-2xl font-bold text-white mb-6">Trending Now</h2>
          <div className="flex gap-4 md:gap-6 overflow-x-auto pb-8 pt-4 -mt-4 -mx-6 px-6 md:-mx-12 md:px-12 no-scrollbar snap-x">
            {trending.map(item => (
              <div key={item.id} className="snap-start">
                <ContentCard item={item} onClick={setSelectedItem} aspectRatio="poster" />
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="bg-primary/20 text-primary p-1.5 rounded-lg"><TrendingUp className="w-5 h-5" /></span>
            Top Picks for You
          </h2>
          <div className="flex gap-4 md:gap-6 overflow-x-auto pb-8 pt-4 -mt-4 -mx-6 px-6 md:-mx-12 md:px-12 no-scrollbar snap-x">
            {personalized.map(item => (
              <div key={item.id} className="snap-start">
                <ContentCard item={item} onClick={setSelectedItem} aspectRatio="video" featured={item.id === personalized[0]?.id} />
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-bold text-white mb-6">Live & Upcoming Sports</h2>
          <div className="flex gap-4 md:gap-6 overflow-x-auto pb-8 pt-4 -mt-4 -mx-6 px-6 md:-mx-12 md:px-12 no-scrollbar snap-x">
            {sports.map(item => (
              <div key={item.id} className="snap-start">
                <ContentCard item={item} onClick={setSelectedItem} aspectRatio="video" />
              </div>
            ))}
          </div>
        </section>
      </div>

      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <ContentModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
}
