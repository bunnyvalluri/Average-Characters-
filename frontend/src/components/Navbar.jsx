// src/components/Navbar.jsx
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useColorTheme } from '../ColorThemeContext';
import characters from '../assets/characters';

const Navbar = ({ onHomeClick, onTimelineClick, onMoviesClick, onSearchCharacter }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { color } = useColorTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const searchContainerRef = useRef(null);
  const searchInputRef = useRef(null);
  const mobileSearchInputRef = useRef(null);

  // Throttled scroll listener
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Automatically close mobile menu on resize to desktop (>= 768px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Global search shortcut (Ctrl+K or /)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
        setIsSearchOpen(true);
      } else if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
        e.preventDefault();
        searchInputRef.current?.focus();
        setIsSearchOpen(true);
      } else if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Lock body scroll when mobile full-screen menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Instant fuzzy search results across all 1000 characters
  const searchResults = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return [];

    return characters
      .filter((char) => {
        const nameMatch = char.name.toLowerCase().includes(query);
        const originalNameMatch = (char.originalName || '').toLowerCase().includes(query);
        const powersMatch = (char.powers || '').toLowerCase().includes(query);
        return nameMatch || originalNameMatch || powersMatch;
      })
      .slice(0, 8);
  }, [searchTerm]);

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [searchResults]);

  const selectCharacter = useCallback((name) => {
    if (onSearchCharacter) {
      onSearchCharacter(name);
    }
    setSearchTerm('');
    setIsSearchOpen(false);
    setIsMobileMenuOpen(false);
  }, [onSearchCharacter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      selectCharacter(searchResults[selectedIndex]?.name || searchResults[0].name);
    } else if (searchTerm.trim()) {
      selectCharacter(searchTerm.trim());
    }
  };

  const handleSearchKeyDown = (e) => {
    if (!isSearchOpen || searchResults.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % searchResults.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + searchResults.length) % searchResults.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (searchResults[selectedIndex]) {
        selectCharacter(searchResults[selectedIndex].name);
      }
    } else if (e.key === 'Escape') {
      setIsSearchOpen(false);
    }
  };

  return (
    <>
      {/* Top Fixed Main Navigation Bar */}
      <nav
        className={`fixed top-0 left-0 right-0 h-16 sm:h-20 w-full z-50 flex justify-between items-center px-4 sm:px-6 md:px-10 lg:px-16 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#08080d]/95 shadow-[0_4px_30px_rgba(0,0,0,0.85)] border-b border-white/20 backdrop-blur-2xl'
            : 'bg-[#0a0a10]/85 shadow-[0_2px_20px_rgba(0,0,0,0.6)] border-b border-white/10 backdrop-blur-xl'
        }`}
      >
        {/* Brand / Logo */}
        <div
          className="flex items-center space-x-3 cursor-pointer select-none group flex-shrink-0"
          onClick={() => { setIsMobileMenuOpen(false); onHomeClick?.(); }}
        >
          <div className="flex-shrink-0 relative">
            <img
              src="/avengers.png"
              alt="Avengers"
              className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105 duration-200 filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]"
              loading="eager"
              decoding="async"
            />
          </div>
          <div className="flex flex-col">
            <h2 className="font-[Avengers] text-xl sm:text-2xl md:text-3xl font-bold tracking-wider text-white drop-shadow-md group-hover:text-red-400 transition-colors">
              Avengers
            </h2>
            <span className="text-[10px] text-gray-400 -mt-1 font-sans uppercase tracking-widest hidden sm:block font-semibold">
              1000 Characters Roster
            </span>
          </div>
        </div>

        {/* Desktop Horizontal Navigation Links & Search (hidden on mobile, visible md and up) */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-10">
          {/* Navigation Links */}
          <div className="flex items-center space-x-5 lg:space-x-8 font-[Avengers]">
            <button
              onClick={onHomeClick}
              className="text-lg sm:text-xl text-gray-200 hover:text-white bg-transparent border-none cursor-pointer px-2 py-1 transition-all hover:scale-105 active:scale-95"
            >
              home
            </button>
            <button
              onClick={onTimelineClick}
              className="text-lg sm:text-xl text-gray-200 hover:text-white bg-transparent border-none cursor-pointer px-2 py-1 transition-all hover:scale-105 active:scale-95"
            >
              timeline
            </button>
            <button
              onClick={onMoviesClick}
              className="text-lg sm:text-xl text-gray-200 hover:text-white bg-transparent border-none cursor-pointer px-2 py-1 transition-all hover:scale-105 active:scale-95"
            >
              movies
            </button>
          </div>

          {/* Desktop Live Search Input with Dropdown Autocomplete */}
          <div ref={searchContainerRef} className="relative font-sans">
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center bg-black/80 hover:bg-black/95 focus-within:bg-black px-4 py-2 rounded-full border-2 border-white/40 focus-within:border-white focus-within:ring-2 focus-within:ring-white/30 transition-all duration-200 w-64 lg:w-80 shadow-2xl"
            >
              <svg className="w-4 h-4 text-white mr-2.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search 1000 Marvel Heroes (Ctrl+K)..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setIsSearchOpen(true);
                }}
                onFocus={() => setIsSearchOpen(true)}
                onKeyDown={handleSearchKeyDown}
                className="w-full bg-transparent text-white placeholder-gray-200 font-medium outline-none text-xs sm:text-sm"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => { setSearchTerm(''); searchInputRef.current?.focus(); }}
                  className="text-gray-300 hover:text-white text-xs p-1 focus:outline-none cursor-pointer"
                >
                  ✕
                </button>
              )}
            </form>

            {/* Autocomplete Results Dropdown */}
            {isSearchOpen && searchResults.length > 0 && (
              <div className="absolute top-full mt-2 right-0 w-80 sm:w-96 bg-[#121218]/98 border border-white/25 rounded-2xl shadow-2xl overflow-hidden z-50 backdrop-blur-2xl">
                <div className="px-3.5 py-2 bg-white/10 border-b border-white/10 flex items-center justify-between text-[11px] text-gray-300 font-semibold">
                  <span>Matching Characters ({searchResults.length})</span>
                  <span className="text-[10px] text-gray-400">Use ↑ ↓ to navigate</span>
                </div>
                <ul className="max-h-72 overflow-y-auto py-1 divide-y divide-white/5 hide-scrollbar">
                  {searchResults.map((char, index) => {
                    const isHighlighted = index === selectedIndex;
                    return (
                      <li
                        key={char.id}
                        onClick={() => selectCharacter(char.name)}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`flex items-center gap-3 px-3.5 py-2.5 cursor-pointer transition-colors ${
                          isHighlighted ? 'bg-white/20' : 'hover:bg-white/10'
                        }`}
                      >
                        <img
                          src={char.photo}
                          alt={char.name}
                          className="w-10 h-10 object-contain rounded-lg bg-black/50 p-0.5 border border-white/15 flex-shrink-0"
                          onError={(e) => {
                            if (e.target.src !== window.location.origin + '/marvel.png') {
                              e.target.src = '/marvel.png';
                            }
                          }}
                        />
                        <div className="flex flex-col min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-white truncate">
                              {char.name}
                            </span>
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-red-600 font-bold uppercase tracking-wider text-white flex-shrink-0">
                              ▶ Trailer
                            </span>
                          </div>
                          <span className="text-xs text-gray-400 truncate">
                            {char.trailerCategory || char.originalName || 'Marvel Hero'}
                          </span>
                        </div>
                        <span className="text-[11px] text-gray-400 font-mono font-bold">
                          #{char.id}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Hamburger Toggle Button (visible ONLY on mobile < md) */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              backgroundColor: color || '#b71c1c',
              boxShadow: `0 4px 16px ${color ? color + '90' : 'rgba(183,28,28,0.6)'}`
            }}
            className="text-white p-2.5 rounded-xl border border-white/30 active:scale-95 transition-all cursor-pointer shadow-lg"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Dedicated Mobile Fullscreen Drawer (Renders ONLY on mobile < md when explicitly toggled) */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-[#0c0c12]/98 backdrop-blur-3xl z-40 flex flex-col justify-between p-6 animate-fadeIn font-[Avengers]">
          <div className="flex flex-col items-center space-y-6 pt-4">
            {/* Mobile Search Input */}
            <div className="w-full font-sans">
              <form
                onSubmit={handleSearchSubmit}
                className="flex items-center bg-black/90 px-4 py-3 rounded-full border-2 border-white/50 w-full shadow-2xl"
              >
                <svg className="w-5 h-5 text-white mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  ref={mobileSearchInputRef}
                  type="text"
                  placeholder="Search 1000 Marvel Heroes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-transparent text-white placeholder-gray-200 font-medium outline-none text-base"
                />
              </form>

              {/* Mobile search results preview */}
              {searchTerm && searchResults.length > 0 && (
                <div className="mt-3 bg-[#181822] border border-white/20 rounded-2xl overflow-hidden max-h-60 overflow-y-auto">
                  {searchResults.map((char) => (
                    <div
                      key={char.id}
                      onClick={() => selectCharacter(char.name)}
                      className="flex items-center gap-3 p-3 border-b border-white/10 hover:bg-white/10 cursor-pointer"
                    >
                      <img
                        src={char.photo}
                        alt={char.name}
                        className="w-8 h-8 object-contain rounded bg-black/40"
                        onError={(e) => {
                          if (e.target.src !== window.location.origin + '/marvel.png') {
                            e.target.src = '/marvel.png';
                          }
                        }}
                      />
                      <span className="text-white text-sm font-semibold truncate flex-1">{char.name}</span>
                      <span className="text-xs text-red-400 font-bold">▶ Trailer</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Navigation Links */}
            <div className="flex flex-col items-center space-y-4 w-full pt-4">
              <button
                onClick={() => { setIsMobileMenuOpen(false); onHomeClick?.(); }}
                className="w-full text-2xl font-bold tracking-wider text-white hover:text-red-400 py-3 border-b border-white/10 transition-colors text-center cursor-pointer"
              >
                home
              </button>
              <button
                onClick={() => { setIsMobileMenuOpen(false); onTimelineClick?.(); }}
                className="w-full text-2xl font-bold tracking-wider text-white hover:text-red-400 py-3 border-b border-white/10 transition-colors text-center cursor-pointer"
              >
                timeline
              </button>
              <button
                onClick={() => { setIsMobileMenuOpen(false); onMoviesClick?.(); }}
                className="w-full text-2xl font-bold tracking-wider text-white hover:text-red-400 py-3 border-b border-white/10 transition-colors text-center cursor-pointer"
              >
                movies
              </button>
            </div>
          </div>

          {/* Close mobile menu button */}
          <div className="w-full pb-6 font-sans">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl border border-white/20 transition-all cursor-pointer text-sm"
            >
              ✕ Close Menu
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
