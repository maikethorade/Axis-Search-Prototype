import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, X } from 'lucide-react';

interface VoiceSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onResult: (text: string) => void;
}

export function VoiceSearch({ isOpen, onClose, onResult }: VoiceSearchProps) {
  const [phase, setPhase] = useState<'listening' | 'processing' | 'done'>('listening');

  useEffect(() => {
    if (!isOpen) {
      setPhase('listening');
      return;
    }

    const t1 = setTimeout(() => setPhase('processing'), 3000);
    const t2 = setTimeout(() => {
      setPhase('done');
      onResult("show me highlights from recent matches");
    }, 4500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isOpen, onResult]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 backdrop-blur-xl"
            style={{ background: 'rgba(0, 0, 0, 0.95)' }}
            onClick={onClose}
          />
          
          <motion.div 
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            role="dialog"
            aria-modal="true"
            aria-label="Voice search"
            className="relative z-10 flex flex-col items-center max-w-md w-full px-6"
          >
            <button 
              onClick={onClose}
              aria-label="Close voice search"
              className="absolute -top-16 right-0 w-12 h-12 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              style={{ background: 'hsla(0, 0%, 100%, 0.1)' }}
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative w-40 h-40 flex items-center justify-center mb-12">
              {phase === 'listening' && (
                <>
                  <motion.div 
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 rounded-full"
                    style={{ background: 'rgba(74, 106, 247, 0.4)' }}
                  />
                  <motion.div 
                    animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0, 0.3] }}
                    transition={{ duration: 2, delay: 0.3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 rounded-full"
                    style={{ background: 'rgba(74, 106, 247, 0.3)' }}
                  />
                </>
              )}
              
              <div className="relative z-10 w-24 h-24 rounded-full flex items-center justify-center shadow-2xl transition-colors duration-500" style={{ background: phase === 'processing' ? 'var(--axis-brand-hover)' : 'var(--axis-brand)' }}>
                <Mic className="w-10 h-10 text-white" />
              </div>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-white text-center h-12">
              {phase === 'listening' && "Listening..."}
              {phase === 'processing' && "Thinking..."}
              {phase === 'done' && "Got it!"}
            </h3>
            
            <p className="mt-4 text-center text-lg h-8" style={{ color: 'var(--axis-text-secondary)' }}>
              {phase === 'listening' && "Try saying 'Find exciting action movies'"}
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
