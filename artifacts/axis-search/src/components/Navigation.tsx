import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Search, Bell, User, Menu } from 'lucide-react';
import { motion } from 'framer-motion';

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
        scrolled ? 'py-3' : 'py-5'
      }`}
      style={{ background: scrolled ? 'var(--axis-nav)' : 'rgba(26, 26, 26, 0.6)' }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-2 group cursor-pointer">
            <span className="font-bold text-2xl tracking-tight text-white group-hover:text-[var(--axis-brand)] transition-colors">
              AXIS
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm" style={{ color: 'hsla(0, 0%, 100%, 0.7)' }}>
            <Link href="/" className="hover:text-white transition-colors cursor-pointer text-white font-medium">Home</Link>
            <span className="hover:text-[var(--axis-brand)] transition-colors cursor-pointer">Sports</span>
            <span className="hover:text-[var(--axis-brand)] transition-colors cursor-pointer">Movies</span>
            <span className="hover:text-[var(--axis-brand)] transition-colors cursor-pointer">Series</span>
            <span className="hover:text-[var(--axis-brand)] transition-colors cursor-pointer">Live</span>
          </nav>
        </div>

        <div className="flex items-center gap-5">
          <button 
            onClick={onOpenSearch}
            className="text-white/80 hover:text-white transition-colors hover:scale-105 active:scale-95 flex items-center gap-2 rounded-full px-3 py-2"
            style={{ background: 'hsla(0, 0%, 100%, 0.2)' }}
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
          
          <button className="hidden md:block text-white/80 hover:text-white transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          
          <div className="w-8 h-8 rounded-full border border-white/30 overflow-hidden hidden md:flex items-center justify-center cursor-pointer" style={{ background: 'var(--axis-overlay)' }}>
            <User className="w-full h-full p-1.5 text-white/90" />
          </div>

          <button className="md:hidden text-white/80 hover:text-white">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.header>
  );
}
