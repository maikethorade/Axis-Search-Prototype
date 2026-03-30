import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Search, User, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavigationProps {
  onOpenSearch: () => void;
}

const NAV_ITEMS = [
  { label: 'Home', href: '/', active: true },
  { label: 'Sports', href: '#' },
  { label: 'Movies', href: '#' },
  { label: 'Series', href: '#' },
  { label: 'Live', href: '#' },
];

export function Navigation({ onOpenSearch }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-out ${
          scrolled ? 'py-2.5' : 'py-4'
        }`}
        style={{
          background: isMobile ? '#4A6AF7' : (scrolled ? '#4A6AF7' : 'transparent'),
          borderBottom: scrolled || isMobile ? '1px solid hsla(0, 0%, 100%, 0.15)' : '1px solid transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between relative">
          <div className="md:hidden flex-1 flex items-center justify-start">
            <button
              onClick={onOpenSearch}
              className="text-white/90 hover:text-white transition-colors flex items-center justify-center w-8 h-8 cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          <Link href="/" className="md:hidden flex items-center justify-center cursor-pointer">
            <img
              src="https://images.deltatre.com/image/private/t_q_best/v1711553662/prd/assets/products/logos/axis-logo.png"
              alt="AXIS"
              className="h-6"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </Link>

          <div className="md:hidden flex-1 flex items-center justify-end">
            <button
              className="text-white/90 hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          <div className="hidden md:flex items-center gap-10">
            <Link href="/" className="flex items-center cursor-pointer">
              <img
                src="https://images.deltatre.com/image/private/t_q_best/v1711553662/prd/assets/products/logos/axis-logo.png"
                alt="AXIS"
                className="h-6"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </Link>

            <nav className="hidden lg:flex items-center gap-7">
              {NAV_ITEMS.map((item) => (
                item.active ? (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="axis-nav-item axis-nav-item--active"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span key={item.label} className="axis-nav-item">{item.label}</span>
                )
              ))}
            </nav>
          </div>

          <nav className="hidden md:flex lg:hidden items-center justify-center gap-7 absolute left-1/2 -translate-x-1/2">
            {NAV_ITEMS.slice(0, 3).map((item) => (
              item.active ? (
                <Link
                  key={item.label}
                  href={item.href}
                  className="axis-nav-item axis-nav-item--active"
                >
                  {item.label}
                </Link>
              ) : (
                <span key={item.label} className="axis-nav-item">{item.label}</span>
              )
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-5">
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
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-50"
              style={{ background: 'rgba(0, 0, 0, 0.6)' }}
              onClick={() => setMobileMenuOpen(false)}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[280px] flex flex-col"
              style={{ background: '#1a1a1a' }}
            >
              <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid hsla(0, 0%, 100%, 0.1)' }}>
                <img
                  src="https://images.deltatre.com/image/private/t_q_best/v1711553662/prd/assets/products/logos/axis-logo.png"
                  alt="AXIS"
                  className="h-5"
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white/70 hover:text-white transition-colors p-1"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto py-2">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="mobile-menu-item"
                    data-active={item.active || undefined}
                  >
                    {item.active && <span className="mobile-menu-active-bar" />}
                    <span>{item.label}</span>
                  </a>
                ))}
              </nav>

              <div className="px-5 py-5" style={{ borderTop: '1px solid hsla(0, 0%, 100%, 0.1)' }}>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full border border-white/30 overflow-hidden flex items-center justify-center" style={{ background: 'var(--axis-overlay)' }}>
                    <User className="w-full h-full p-2 text-white/90" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">My Account</p>
                    <p className="text-white/50 text-xs">Sign in</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
