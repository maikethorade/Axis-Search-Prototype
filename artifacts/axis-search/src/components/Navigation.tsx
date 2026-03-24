import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Search, Bell, User, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavigationProps {
  onOpenSearch: () => void;
}

export function Navigation({ onOpenSearch }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-out ${
        scrolled ? 'bg-background/90 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-2 group cursor-pointer">
            {/* Using text logo for fallback, but ideally use generated image if available */}
            <span className="font-display font-black text-3xl tracking-tighter text-white group-hover:text-primary transition-colors">
              AXIS
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-white/70">
            <Link href="/" className="hover:text-white transition-colors cursor-pointer text-white font-semibold">Home</Link>
            <span className="hover:text-white transition-colors cursor-pointer">Sports</span>
            <span className="hover:text-white transition-colors cursor-pointer">Movies</span>
            <span className="hover:text-white transition-colors cursor-pointer">Series</span>
            <span className="hover:text-white transition-colors cursor-pointer">Live</span>
          </nav>
        </div>

        <div className="flex items-center gap-6">
          <button 
            onClick={onOpenSearch}
            className="text-white/80 hover:text-white transition-colors hover:scale-110 active:scale-95 flex items-center gap-2"
            aria-label="Search"
          >
            <Search className="w-6 h-6" />
          </button>
          
          <button className="hidden md:block text-white/80 hover:text-white transition-colors">
            <Bell className="w-6 h-6" />
          </button>
          
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-accent border-2 border-background shadow-lg shadow-primary/20 overflow-hidden hidden md:block cursor-pointer">
            <User className="w-full h-full p-1.5 text-white/90" />
          </div>

          <button className="md:hidden text-white/80 hover:text-white">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </motion.header>
  );
}
