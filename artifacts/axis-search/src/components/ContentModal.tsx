import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Plus, Share2 } from 'lucide-react';
import { ContentItem } from '../lib/mock-data';
import { useEffect } from 'react';

interface ContentModalProps {
  item: ContentItem | null;
  onClose: () => void;
}

export function ContentModal({ item, onClose }: ContentModalProps) {
  useEffect(() => {
    if (item) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [item]);

  return (
    <AnimatePresence>
      {item && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 pt-12 pb-4 md:p-8">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 backdrop-blur-sm"
            style={{ background: 'rgba(0, 0, 0, 0.8)' }}
            onClick={onClose}
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl max-h-[90vh] rounded-lg shadow-2xl overflow-y-auto no-scrollbar z-10"
            style={{ background: 'var(--axis-nav)', border: '1px solid hsla(0, 0%, 100%, 0.1)' }}
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              style={{ background: 'var(--axis-overlay)' }}
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative w-full aspect-video md:aspect-[21/9]">
              <img 
                src={item.heroUrl} 
                alt={item.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--axis-nav)] via-[var(--axis-nav)]/50 to-transparent" />
              
              <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full md:w-2/3">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-[1.2]">
                  {item.title}
                </h2>
                <div className="flex items-center gap-3 mb-6">
                  <button className="px-6 py-3 rounded-sm font-bold flex items-center gap-2 transition-colors shadow-lg text-sm" style={{ background: 'var(--axis-brand)', color: '#fff' }}>
                    <Play className="w-5 h-5 fill-white" /> Play
                  </button>
                  <button className="w-11 h-11 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors" style={{ background: 'var(--axis-overlay)', border: '1px solid #fff' }}>
                    <Plus className="w-5 h-5" />
                  </button>
                  <button className="w-11 h-11 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors" style={{ background: 'var(--axis-overlay)', border: '1px solid #fff' }}>
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-5">
                <div className="flex flex-wrap items-center gap-2">
                  {item.year && <span className="axis-metadata-badge">{item.year}</span>}
                  {item.rating && <span className="axis-metadata-badge">{item.rating}</span>}
                  {item.duration && <span className="axis-metadata-badge">{item.duration}</span>}
                  <span className="axis-metadata-badge capitalize" style={{ borderColor: 'var(--axis-brand)', color: 'var(--axis-brand)' }}>{item.type}</span>
                </div>
                
                <p className="text-base leading-relaxed" style={{ color: 'var(--axis-text-secondary)', fontWeight: 400, lineHeight: 1.5 }}>
                  {item.description}
                </p>
              </div>

              <div className="space-y-4 text-sm">
                {item.cast && (
                  <div>
                    <span className="block mb-1" style={{ color: 'var(--axis-text-tertiary)' }}>Cast</span>
                    <span className="text-white/90">{item.cast.join(', ')}</span>
                  </div>
                )}
                <div>
                  <span className="block mb-1" style={{ color: 'var(--axis-text-tertiary)' }}>Genres</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {item.genre.map(g => (
                      <span key={g} className="axis-metadata-badge">{g}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="px-6 md:px-10 pb-10">
              <h3 className="text-lg font-bold text-white mb-5">More Like This</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1,2,3,4].map(i => (
                  <div key={i} className="aspect-video rounded animate-pulse" style={{ background: 'var(--axis-surface)' }} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
