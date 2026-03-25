import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Search, User, Menu } from 'lucide-react';
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
        scrolled ? 'py-2.5' : 'py-4'
      }`}
      style={{
        background: scrolled ? '#4A6AF7' : 'transparent',
        borderBottom: scrolled ? '1px solid hsla(0, 0%, 100%, 0.15)' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center cursor-pointer">
            <img
              src="https://images.deltatre.com/image/private/t_q_best/v1711553662/prd/assets/products/logos/axis-logo.png"
              alt="AXIS"
              className="h-6"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </Link>

          <nav className="hidden md:flex items-center gap-7">
            <Link
              href="/"
              className="axis-nav-item axis-nav-item--active"
            >
              Home
            </Link>
            <span className="axis-nav-item">Sports</span>
            <span className="axis-nav-item">Movies</span>
            <span className="axis-nav-item">Series</span>
            <span className="axis-nav-item">Live</span>
          </nav>
        </div>

        <div className="flex items-center gap-5">
          <button 
            onClick={onOpenSearch}
            className="text-white/90 hover:text-white transition-colors hover:scale-105 active:scale-95 flex items-center justify-center w-8 h-8 rounded-full border border-white/30 cursor-pointer"
            style={{ background: 'var(--axis-overlay)' }}
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
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
