import { Play, Plus, ThumbsUp } from 'lucide-react';
import { ContentItem } from '../lib/mock-data';
import { motion } from 'framer-motion';

interface ContentCardProps {
  item: ContentItem;
  onClick: (item: ContentItem) => void;
  aspectRatio?: 'video' | 'poster';
  featured?: boolean;
  fillWidth?: boolean;
}

export function ContentCard({ item, onClick, aspectRatio = 'video', featured = false, fillWidth = false }: ContentCardProps) {
  const isPoster = aspectRatio === 'poster';
  
  if (featured) {
    return (
      <motion.div
        whileHover={{ scale: 1.05, zIndex: 10 }}
        whileTap={{ scale: 0.98 }}
        className={`relative group cursor-pointer overflow-hidden bg-[var(--axis-surface)] ${
          fillWidth ? 'w-full' : `shrink-0 w-[400px] md:w-[600px]`
        }`}
        onClick={() => onClick(item)}
      >
        <div className={`w-full relative ${isPoster ? 'aspect-[2/3]' : 'aspect-video'}`}>
          <img 
            src={item.heroUrl} 
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          
          {item.badge && (
            <div className="absolute top-2 left-2 flex gap-1.5">
              <span className="px-1.5 py-px rounded-sm text-[10px] font-bold uppercase tracking-wider shadow-lg" style={{ background: '#000', color: '#fff' }}>
                {item.badge}
              </span>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 md:p-5">
            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="text-white font-bold text-base md:text-lg line-clamp-2 leading-tight mb-2">
                {item.title}
              </h3>
              <div className="flex items-center gap-1.5 mb-4">
                {item.year && <span className="axis-metadata-badge">{item.year}</span>}
                {item.rating && <span className="axis-metadata-badge">{item.rating}</span>}
                {item.duration && <span className="axis-metadata-badge">{item.duration}</span>}
                <span className="axis-metadata-badge capitalize" style={{ borderColor: 'var(--axis-brand)', color: 'var(--axis-brand)' }}>{item.type}</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="cta-btn cta-btn--primary flex-1" style={{ height: '36px', padding: '0 16px', fontSize: '13px', fontWeight: 600 }}>
                  <span className="cta-btn__icon"><Play className="w-4 h-4 fill-white stroke-white" /></span>
                  <span className="cta-btn__content"><span className="hidden md:inline">Play</span></span>
                </button>
                <button className="w-9 h-9 rounded-full flex items-center justify-center text-white/80 hover:text-white transition-all" style={{ background: 'var(--axis-overlay)', border: '1px solid #fff' }}>
                  <Plus className="w-4 h-4" />
                </button>
                <button className="w-9 h-9 rounded-full flex items-center justify-center text-white/80 hover:text-white transition-all" style={{ background: 'var(--axis-overlay)', border: '1px solid #fff' }}>
                  <ThumbsUp className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/90 to-transparent group-hover:opacity-0 transition-opacity duration-300 flex items-end p-3">
            <div>
              <h3 className="text-white font-medium text-sm line-clamp-1 mb-1">
                {item.title}
              </h3>
              <div className="flex items-center gap-1">
                {item.year && <span className="text-[11px] text-[var(--axis-text-secondary)]">{item.year}</span>}
                {item.year && item.genre && <span className="text-[11px] text-[var(--axis-text-tertiary)]">·</span>}
                {item.genre && <span className="text-[11px] text-[var(--axis-text-secondary)] capitalize">{item.genre}</span>}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ zIndex: 10 }}
      className={`relative group cursor-pointer ${
        fillWidth ? 'w-full' : `shrink-0 ${isPoster ? 'w-[160px] md:w-[220px]' : 'w-[280px] md:w-[320px]'}`
      }`}
      onClick={() => onClick(item)}
    >
      <div className={`w-full relative ${isPoster ? 'aspect-[2/3]' : 'aspect-video'} overflow-hidden bg-[var(--axis-surface)]`}>
        <img 
          src={item.thumbnailUrl} 
          alt={item.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        
        {item.badge && (
          <div className="absolute top-2 left-2 flex gap-1.5">
            <span className="px-1.5 py-px rounded-sm text-[10px] font-bold uppercase tracking-wider shadow-lg" style={{ background: '#000', color: '#fff' }}>
              {item.badge}
            </span>
          </div>
        )}
      </div>

      <div
        className="absolute bottom-[-32px] left-0 right-0 hidden lg:block opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none p-4 pt-6"
        style={{ background: '#1a1a1a', zIndex: 20 }}
      >
        <h3 className="text-white font-bold text-sm line-clamp-1 leading-tight mb-1.5">
          {item.title}
        </h3>
        <p className="text-[12px] leading-relaxed line-clamp-3" style={{ color: 'var(--axis-text-secondary)' }}>{item.description}</p>
      </div>
    </motion.div>
  );
}
