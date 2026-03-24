import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Plus, Info, Share2 } from 'lucide-react';
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
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl max-h-[90vh] bg-card border border-white/10 rounded-2xl shadow-2xl overflow-y-auto no-scrollbar z-10"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/70 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Hero Image */}
            <div className="relative w-full aspect-video md:aspect-[21/9]">
              <img 
                src={item.heroUrl} 
                alt={item.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
              
              <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full md:w-2/3">
                <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4 leading-tight">
                  {item.title}
                </h2>
                <div className="flex items-center gap-4 mb-6">
                  <button className="bg-white text-black px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-white/90 transition-colors shadow-lg shadow-white/20">
                    <Play className="w-5 h-5 fill-black" /> Play
                  </button>
                  <button className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                    <Plus className="w-6 h-6" />
                  </button>
                  <button className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-6">
                <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-white/80">
                  {item.year && <span>{item.year}</span>}
                  {item.rating && <span className="px-1.5 py-0.5 border border-white/20 rounded">{item.rating}</span>}
                  {item.duration && <span>{item.duration}</span>}
                  <span className="px-2 py-0.5 bg-primary/20 text-primary rounded-md capitalize">{item.type}</span>
                </div>
                
                <p className="text-lg text-white/90 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="space-y-4 text-sm">
                {item.cast && (
                  <div>
                    <span className="text-white/50 block mb-1">Cast</span>
                    <span className="text-white/90">{item.cast.join(', ')}</span>
                  </div>
                )}
                <div>
                  <span className="text-white/50 block mb-1">Genres</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {item.genre.map(g => (
                      <span key={g} className="px-2 py-1 bg-white/5 rounded-md text-white/80">{g}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Fake Related Content */}
            <div className="px-6 md:px-10 pb-10">
              <h3 className="text-xl font-bold text-white mb-6">More Like This</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1,2,3,4].map(i => (
                  <div key={i} className="aspect-video bg-white/5 rounded-lg animate-pulse" />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
