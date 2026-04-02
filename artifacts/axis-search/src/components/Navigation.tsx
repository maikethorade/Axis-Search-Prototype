import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Link } from 'wouter';
import { Search, User, Menu, X, Mic } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavigationProps {
  onOpenSearch: () => void;
  onOpenVoice?: () => void;
  searchQuery?: string;
  onSearchQueryChange?: (query: string) => void;
}

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Movies', href: '#' },
  { label: 'TV', href: '#' },
  { label: 'Live', href: '#' },
  { label: 'Sports', href: '#' },
];

export function Navigation({ onOpenSearch, onOpenVoice, searchQuery, onSearchQueryChange }: NavigationProps) {
  const currentPath = window.location.pathname;
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const mobileSearchInputRef = useRef<HTMLInputElement>(null);
  const inputHasFocusRef = useRef(false);
  const hasExpandedSearch = searchQuery !== undefined;

  const handleSearchFocus = () => { inputHasFocusRef.current = true; };
  const handleSearchBlur = () => {
    setTimeout(() => {
      if (!document.activeElement || document.activeElement === document.body) {
        return;
      }
      inputHasFocusRef.current = false;
    }, 0);
  };

  useLayoutEffect(() => {
    if (inputHasFocusRef.current) {
      const ref = isMobile ? mobileSearchInputRef : searchInputRef;
      if (ref.current && document.activeElement !== ref.current) {
        ref.current.focus();
      }
    }
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
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
        initial={{ y: -96 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-out ${
          isMobile ? 'pt-0 pb-0' : ''
        }`}
        style={{
          background: (isMobile || scrolled) ? '#4A6AF7' : 'transparent',
          borderBottom: isMobile ? 'none' : (scrolled ? '1px solid hsla(0, 0%, 100%, 0.15)' : '1px solid transparent'),
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between relative h-12 md:h-auto">
          <div className="md:hidden flex items-center">
            {hasExpandedSearch ? (
              <Link href="/" className="flex items-center cursor-pointer">
                <img src="/axis-logo.svg" alt="AXIS" className="h-5" />
              </Link>
            ) : (
              <button
                onClick={onOpenSearch}
                className="text-white/90 hover:text-white transition-colors flex items-center justify-center w-8 h-8 cursor-pointer"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
          </div>

          {!hasExpandedSearch && (
            <Link href="/" className="md:hidden absolute left-1/2 -translate-x-1/2 flex items-center cursor-pointer">
              <img src="/axis-logo.svg" alt="AXIS" className="h-6" />
            </Link>
          )}

          {hasExpandedSearch ? (
            <nav className="md:hidden flex items-center gap-6">
              {NAV_ITEMS.slice(0, 3).map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-xs font-bold tracking-wide uppercase transition-colors ${currentPath === item.href ? 'text-white' : 'text-white/70 hover:text-white'}`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          ) : null}

          <div className="md:hidden flex items-center">
            {hasExpandedSearch ? (
              <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center cursor-pointer" style={{ background: '#F57C00' }}>
                <span className="text-white text-sm" style={{ fontWeight: 700 }}>M</span>
              </div>
            ) : (
              <button
                className="text-white/90 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>

        {hasExpandedSearch ? (
          <div className="md:hidden px-4 py-3" style={{ background: '#2544D0' }}>
            <form className="relative flex items-center" onSubmit={(e) => e.preventDefault()}>
              <div className="absolute left-3 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-white/50" />
              </div>
              <input
                ref={mobileSearchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchQueryChange?.(e.target.value)}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
                placeholder="Search"
                className="h-10 w-full rounded-full pl-10 pr-20 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-white/30 transition-all border border-white/30"
                style={{ background: 'var(--axis-overlay)' }}
              />
              <div className="absolute right-1.5 flex items-center gap-1">
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => onSearchQueryChange?.('')}
                    aria-label="Clear search"
                    className="w-7 h-7 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors hover:bg-white/10"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={onOpenVoice || onOpenSearch}
                  aria-label="Voice search"
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors hover:bg-white/10"
                >
                  <Mic className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        ) : (
          <nav className="md:hidden flex items-end justify-center gap-6 px-6 h-12" style={{ background: '#2544D0' }}>
            {NAV_ITEMS.slice(0, 3).map((item) => {
              const isActive = currentPath === item.href;
              return isActive ? (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-white text-xs font-bold tracking-wide uppercase pb-3"
                  style={{ borderBottom: '2px solid white' }}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  key={item.label}
                  className="text-white/70 text-xs font-bold tracking-wide uppercase pb-3 cursor-pointer hover:text-white transition-colors"
                  style={{ borderBottom: '2px solid transparent' }}
                >
                  {item.label}
                </span>
              );
            })}
          </nav>
        )}

        <div className="hidden md:flex max-w-7xl mx-auto px-6 md:px-12 items-center justify-between relative h-16">
          <div className="flex items-center gap-10 h-full">
            <Link href="/" className="flex items-center cursor-pointer">
              <img src="/axis-logo.svg" alt="AXIS" className="h-6" />
            </Link>

            <nav className="hidden lg:flex items-center gap-7 h-full">
              {NAV_ITEMS.map((item) => {
                const isActive = currentPath === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`axis-nav-item${isActive ? ' axis-nav-item--active' : ''}`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <nav className="flex lg:hidden items-center justify-center gap-7 absolute left-1/2 -translate-x-1/2 h-full">
            {NAV_ITEMS.map((item) => {
              const isActive = currentPath === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`axis-nav-item${isActive ? ' axis-nav-item--active' : ''}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            {hasExpandedSearch ? (
              <form className="relative flex items-center" onSubmit={(e) => e.preventDefault()}>
                <div className="absolute left-2.5 flex items-center pointer-events-none">
                  <Search className="w-3.5 h-3.5 text-white/50" />
                </div>
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchQueryChange?.(e.target.value)}
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                  placeholder="Search"
                  className="h-8 w-52 lg:w-64 rounded-full pl-8 pr-16 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-white/30 transition-all border border-white/30"
                  style={{ background: 'var(--axis-overlay)' }}
                />
                <div className="absolute right-1 flex items-center gap-0.5">
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => onSearchQueryChange?.('')}
                      aria-label="Clear search"
                      className="w-6 h-6 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors hover:bg-white/10"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={onOpenVoice || onOpenSearch}
                    aria-label="Voice search"
                    className="w-6 h-6 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors hover:bg-white/10"
                  >
                    <Mic className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            ) : (
              <button 
                onClick={onOpenSearch}
                className="text-white/90 hover:text-white transition-colors hover:scale-105 active:scale-95 flex items-center justify-center w-8 h-8 rounded-full border border-white/30 cursor-pointer"
                style={{ background: 'var(--axis-overlay)' }}
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>
            )}
            
            <div className="w-8 h-8 rounded-full overflow-hidden hidden md:flex items-center justify-center cursor-pointer" style={{ background: '#F57C00' }}>
              <span className="text-white text-sm" style={{ fontWeight: 700 }}>M</span>
            </div>
          </div>
        </div>
        <div
          className="absolute left-0 right-0 top-full h-8 pointer-events-none transition-opacity duration-300"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)',
            opacity: (isMobile || scrolled) ? 1 : 0,
          }}
        />
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
                <img src="/axis-logo.svg" alt="AXIS" className="h-5" />
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
                  <div className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center" style={{ background: '#F57C00' }}>
                    <span className="text-white text-sm" style={{ fontWeight: 700 }}>M</span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Maike Thorade</p>
                    <p className="text-white/50 text-xs">SWITCH</p>
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
