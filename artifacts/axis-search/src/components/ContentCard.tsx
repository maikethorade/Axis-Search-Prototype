import { Play, Plus, ThumbsUp } from 'lucide-react';
import { ContentItem } from '../lib/mock-data';
import { motion } from 'framer-motion';

interface ContentCardProps {
  item: ContentItem;
  onClick: (item: ContentItem) => void;
  aspectRatio?: 'video' | 'poster';
  featured?: boolean;
}

export function ContentCard({ item, onClick, aspectRatio = 'video', featured = false }: ContentCardProps) {
  const isPoster = aspectRatio === 'poster';
  
  return (
    <motion.div
      whileHover={{ scale: 1.05, zIndex: 10 }}
      whileTap={{ scale: 0.98 }}
      className={`relative group cursor-pointer rounded-xl overflow-hidden shrink-0 bg-secondary/50 ${
        featured ? 'w-[400px] md:w-[600px]' : isPoster ? 'w-[160px] md:w-[220px]' : 'w-[280px] md:w-[320px]'
      }`}
      onClick={() => onClick(item)}
    >
      <div className={`w-full relative ${isPoster ? 'aspect-[2/3]' : 'aspect-video'}`}>
        <img 
          src={featured ? item.heroUrl : item.thumbnailUrl} 
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {item.type === 'live' && (
            <span className="px-2 py-0.5 rounded-md bg-destructive text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1 shadow-lg shadow-destructive/50">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> Live
            </span>
          )}
          {item.personalizedScore && item.personalizedScore > 90 && (
            <span className="px-2 py-0.5 rounded-md bg-primary text-white text-xs font-bold shadow-lg shadow-primary/30">
              Top Pick
            </span>
          )}
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 md:p-6">
          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="text-white font-bold text-lg md:text-xl line-clamp-2 leading-tight mb-2">
              {item.title}
            </h3>
            
            <div className="flex items-center gap-2 text-xs md:text-sm text-white/70 mb-4">
              {item.year && <span>{item.year}</span>}
              {item.rating && <span className="px-1.5 py-0.5 border border-white/20 rounded text-[10px]">{item.rating}</span>}
              {item.duration && <span>{item.duration}</span>}
              <span className="capitalize text-primary font-medium">{item.type}</span>
            </div>

            <div className="flex items-center gap-3">
              <button className="flex-1 bg-white text-black py-2 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-white/90 transition-colors">
                <Play className="w-4 h-4 fill-black" /> <span className="hidden md:inline">Play</span>
              </button>
              <button className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:border-white/40 transition-all">
                <Plus className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:border-white/40 transition-all">
                <ThumbsUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Persistent gradient for title readability when not hovered */}
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-background/90 to-transparent group-hover:opacity-0 transition-opacity duration-300 flex items-end p-4">
          <h3 className="text-white font-medium text-sm md:text-base line-clamp-1">
            {item.title}
          </h3>
        </div>
      </div>
    </motion.div>
  );
}
