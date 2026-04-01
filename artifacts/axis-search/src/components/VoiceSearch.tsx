import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, X } from 'lucide-react';

interface VoiceSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onResult: (text: string) => void;
}

interface SpeechRecognitionEvent {
  results: { [index: number]: { [index: number]: { transcript: string } } };
  resultIndex: number;
}

export function VoiceSearch({ isOpen, onClose, onResult }: VoiceSearchProps) {
  const [phase, setPhase] = useState<'listening' | 'processing' | 'done' | 'error'>('listening');
  const [transcript, setTranscript] = useState('');
  const [interimText, setInterimText] = useState('');
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (!isOpen) {
      setPhase('listening');
      setTranscript('');
      setInterimText('');
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch {}
        recognitionRef.current = null;
      }
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setPhase('error');
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interim = '';
      let final = '';
      for (let i = event.resultIndex; i < Object.keys(event.results).length; i++) {
        const result = event.results[i];
        if (result && result[0]) {
          const t = result[0].transcript;
          if ((result as any).isFinal) {
            final += t;
          } else {
            interim += t;
          }
        }
      }
      if (final) {
        setTranscript(final);
        setInterimText('');
      } else if (interim) {
        setInterimText(interim);
      }
    };

    recognition.onend = () => {
      setPhase(prev => {
        if (prev === 'listening') {
          return 'processing';
        }
        return prev;
      });
    };

    recognition.onerror = (e: any) => {
      if (e.error === 'no-speech') {
        setPhase('error');
      } else if (e.error !== 'aborted') {
        setPhase('error');
      }
    };

    try {
      recognition.start();
      setPhase('listening');
    } catch {
      setPhase('error');
    }

    return () => {
      try { recognition.abort(); } catch {}
      recognitionRef.current = null;
    };
  }, [isOpen]);

  useEffect(() => {
    if (phase === 'processing' && transcript) {
      const timer = setTimeout(() => {
        setPhase('done');
        onResult(transcript);
      }, 600);
      return () => clearTimeout(timer);
    }
    if (phase === 'processing' && !transcript && interimText) {
      setTranscript(interimText);
      setInterimText('');
      const timer = setTimeout(() => {
        setPhase('done');
        onResult(interimText);
      }, 600);
      return () => clearTimeout(timer);
    }
    if (phase === 'processing' && !transcript && !interimText) {
      setPhase('error');
    }
  }, [phase, transcript, interimText, onResult]);

  const displayText = transcript || interimText;

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
              className="absolute -top-16 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
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
              
              <div className="relative z-10 w-24 h-24 rounded-full flex items-center justify-center shadow-2xl transition-colors duration-500" style={{ background: phase === 'error' ? '#ef4444' : phase === 'processing' ? 'var(--axis-brand-hover)' : 'var(--axis-brand)' }}>
                <Mic className="w-10 h-10 text-white" />
              </div>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-white text-center h-12">
              {phase === 'listening' && "Listening..."}
              {phase === 'processing' && "Thinking..."}
              {phase === 'done' && "Got it!"}
              {phase === 'error' && "Couldn't hear you"}
            </h3>
            
            <p className="mt-4 text-center text-lg min-h-[2rem]" style={{ color: 'var(--axis-text-secondary)' }}>
              {phase === 'listening' && !displayText && "Try saying 'The White Lotus' or 'Dune'"}
              {phase === 'listening' && displayText && (
                <span className="text-white font-medium">"{displayText}"</span>
              )}
              {phase === 'done' && transcript && (
                <span className="text-white font-medium">"{transcript}"</span>
              )}
              {phase === 'error' && (
                <button
                  onClick={() => {
                    setPhase('listening');
                    setTranscript('');
                    setInterimText('');
                    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
                    if (SpeechRecognition) {
                      const recognition = new SpeechRecognition();
                      recognitionRef.current = recognition;
                      recognition.continuous = false;
                      recognition.interimResults = true;
                      recognition.lang = 'en-US';
                      recognition.onresult = (event: SpeechRecognitionEvent) => {
                        let interim = '';
                        let final = '';
                        for (let i = event.resultIndex; i < Object.keys(event.results).length; i++) {
                          const result = event.results[i];
                          if (result && result[0]) {
                            const t = result[0].transcript;
                            if ((result as any).isFinal) {
                              final += t;
                            } else {
                              interim += t;
                            }
                          }
                        }
                        if (final) {
                          setTranscript(final);
                          setInterimText('');
                        } else if (interim) {
                          setInterimText(interim);
                        }
                      };
                      recognition.onend = () => {
                        setPhase(prev => prev === 'listening' ? 'processing' : prev);
                      };
                      recognition.onerror = (e: any) => {
                        if (e.error !== 'aborted') setPhase('error');
                      };
                      try { recognition.start(); } catch { setPhase('error'); }
                    }
                  }}
                  className="text-[var(--axis-brand)] hover:underline"
                >
                  Tap to try again
                </button>
              )}
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
