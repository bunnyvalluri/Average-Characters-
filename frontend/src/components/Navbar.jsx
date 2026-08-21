// src/components/Navbar.jsx
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useColorTheme } from '../ColorThemeContext';
import characters from '../assets/characters';

const Navbar = ({ onHomeClick, onTimelineClick, onMoviesClick, onSearchCharacter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { color } = useColorTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const searchContainerRef = useRef(null);
  const searchInputRef = useRef(null);

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
    setIsOpen(false);
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
    <nav
      style={{
        backgroundColor: isScrolled ? 'rgba(12, 12, 18, 0.96)' : 'rgba(0, 0, 0, 0.65)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
      className="fixed top-0 left-0 h-16 sm:h-20 w-full z-50 flex justify-between items-center px-4 sm:px-6 md:px-10 lg:px-16 transition-all duration-300 shadow-2xl"
    >
      {/* Brand / Logo */}
      <div
        className="flex items-center space-x-3 cursor-pointer select-none group"
        onClick={onHomeClick}
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
          <h2 className="font-[Avengers] text-xl sm:text-2xl md:text-3xl font-bold tracking-wider text-white drop-shadow-md">
            Avengers
          </h2>
          <span className="text-[10px] text-gray-300 -mt-1 font-sans uppercase tracking-widest hidden sm:block">
            1000 Characters & Cinematic Lore
          </span>
        </div>
      </div>

      {/* Hamburger Toggle on Mobile */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            backgroundColor: color || '#b71c1c',
            boxShadow: `0 4px 16px ${color ? color + '90' : 'rgba(183,28,28,0.6)'}`
          }}
          className="text-white p-2.5 rounded-xl border border-white/30 active:scale-95 transition-all cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? (
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

      {/* Desktop & Mobile Menu Navigation */}
      <div
        className={`${
          isOpen
            ? "flex absolute top-full left-0 right-0 w-full bg-[#0a0a10]/98 backdrop-blur-2xl border-b border-white/20 p-5 shadow-2xl flex-col items-center space-y-3.5 z-50 animate-fadeIn"
            : "hidden"
        } md:flex md:static md:w-auto md:bg-transparent md:border-none md:p-0 md:flex-row md:space-y-0 md:space-x-5 lg:space-x-8 md:items-center md:shadow-none`}
      >
        <button
          onClick={() => { setIsOpen(false); onHomeClick?.(); }}
          style={{
            backgroundColor: isOpen ? 'rgba(255, 255, 255, 0.1)' : undefined,
          }}
          className="w-full md:w-auto text-sm sm:text-base font-bold uppercase tracking-wider text-white hover:text-white border border-white/15 md:border-transparent hover:border-white/30 bg-black/60 md:bg-transparent hover:bg-white/15 px-5 py-3 md:py-1.5 rounded-xl transition-all text-center active:scale-95 cursor-pointer shadow-md md:shadow-none"
        >
          Home
        </button>
        <button
          onClick={() => { setIsOpen(false); onTimelineClick?.(); }}
          style={{
            backgroundColor: isOpen ? 'rgba(255, 255, 255, 0.1)' : undefined,
          }}
          className="w-full md:w-auto text-sm sm:text-base font-bold uppercase tracking-wider text-white hover:text-white border border-white/15 md:border-transparent hover:border-white/30 bg-black/60 md:bg-transparent hover:bg-white/15 px-5 py-3 md:py-1.5 rounded-xl transition-all text-center active:scale-95 cursor-pointer shadow-md md:shadow-none"
        >
          Timeline
        </button>
        <button
          onClick={() => { setIsOpen(false); onMoviesClick?.(); }}
          style={{
            backgroundColor: isOpen ? 'rgba(255, 255, 255, 0.1)' : undefined,
          }}
          className="w-full md:w-auto text-sm sm:text-base font-bold uppercase tracking-wider text-white hover:text-white border border-white/15 md:border-transparent hover:border-white/30 bg-black/60 md:bg-transparent hover:bg-white/15 px-5 py-3 md:py-1.5 rounded-xl transition-all text-center active:scale-95 cursor-pointer shadow-md md:shadow-none"
        >
          Movies
        </button>

        {/* Live Search Input with Dropdown Autocomplete */}
        <div ref={searchContainerRef} className="relative w-full md:w-auto font-sans">
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center bg-black/80 hover:bg-black/90 focus-within:bg-black px-4 py-2.5 rounded-full border border-white/30 focus-within:border-white/70 transition-all duration-200 w-full md:w-64 lg:w-80 shadow-xl"
          >
            <svg className="w-4 h-4 text-gray-200 mr-2.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              ref={searchInputRef}
              type="text"
              placeholder={`Search ${characters.length} heroes (Ctrl+K)...`}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              onKeyDown={handleSearchKeyDown}
              className="w-full bg-transparent text-white placeholder-gray-300 outline-none text-xs sm:text-sm font-medium"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => { setSearchTerm(''); searchInputRef.current?.focus(); }}
                className="text-gray-400 hover:text-white text-xs p-1 focus:outline-none cursor-pointer"
              >
                ✕
              </button>
            )}
          </form>

          {/* Autocomplete Results Dropdown */}
          {isSearchOpen && searchResults.length > 0 && (
            <div className="absolute top-full mt-2 left-0 right-0 md:w-80 bg-[#16161c] border border-white/25 rounded-2xl shadow-2xl overflow-hidden z-50 backdrop-blur-2xl">
              <div className="px-3.5 py-2 bg-white/10 border-b border-white/10 flex items-center justify-between text-[11px] text-gray-300 font-semibold">
                <span>Matching Characters ({searchResults.length})</span>
                <span className="text-[10px] text-gray-400">Use ↑ ↓ to navigate</span>
              </div>
              <ul className="max-h-72 overflow-y-auto py-1 divide-y divide-white/10">
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
                        className="w-9 h-9 object-contain rounded-lg bg-black/50 p-0.5 border border-white/20 flex-shrink-0"
                      />
                      <div className="flex flex-col min-w-0 flex-1">
                        <span className="text-sm font-bold text-white truncate">
                          {char.name}
                        </span>
                        {char.originalName && (
                          <span className="text-xs text-gray-300 truncate">
                            {char.originalName}
                          </span>
                        )}
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
    </nav>
  );
};

export default Navbar;
