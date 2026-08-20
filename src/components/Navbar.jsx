// src/components/Navbar.jsx
import { useState, useRef, useEffect } from "react";
import { useColorTheme } from '../ColorThemeContext';
import characters from '../assets/characters';

const Navbar = ({ onHomeClick, onTimelineClick, onMoviesClick, onSearchCharacter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { color } = useColorTheme();
  const searchRef = useRef(null);

  // Filter character suggestions based on input
  const suggestions = searchTerm.trim()
    ? characters.filter((char) =>
        char.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (char.originalName && char.originalName.toLowerCase().includes(searchTerm.toLowerCase()))
      ).slice(0, 5)
    : [];

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (onSearchCharacter && searchTerm.trim()) {
      onSearchCharacter(searchTerm.trim());
      setSearchTerm('');
      setShowSuggestions(false);
      setIsOpen(false);
    }
  };

  const handleSelectCharacter = (name) => {
    if (onSearchCharacter) {
      onSearchCharacter(name);
      setSearchTerm('');
      setShowSuggestions(false);
      setIsOpen(false);
    }
  };

  // Close search suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prevent scrolling when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0d0e15]/85 backdrop-blur-xl border-b border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <button
          onClick={onHomeClick}
          className="flex items-center space-x-2 sm:space-x-3 group text-left border-none bg-transparent p-0 cursor-pointer focus:outline-none"
          aria-label="Avengers Home"
        >
          <img
            src="/avengers.png"
            alt="Avengers Logo"
            className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <div className="flex flex-col justify-center">
            <span
              className="font-[Avengers] text-2xl sm:text-3xl md:text-4xl tracking-wider text-white group-hover:text-gray-200 transition-colors"
              style={{ textShadow: `0 0 16px ${color}66` }}
            >
              AVENGERS
            </span>
          </div>
        </button>

        {/* Desktop Navigation & Search */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8 font-[Avengers] text-lg lg:text-xl tracking-wide">
          <button
            onClick={onHomeClick}
            className="text-gray-300 hover:text-white transition-colors duration-200 relative py-1 focus:outline-none uppercase border-none bg-transparent cursor-pointer"
          >
            Home
          </button>
          <button
            onClick={onTimelineClick}
            className="text-gray-300 hover:text-white transition-colors duration-200 relative py-1 focus:outline-none uppercase border-none bg-transparent cursor-pointer"
          >
            Timeline
          </button>
          <button
            onClick={onMoviesClick}
            className="text-gray-300 hover:text-white transition-colors duration-200 relative py-1 focus:outline-none uppercase border-none bg-transparent cursor-pointer"
          >
            Movies
          </button>

          {/* Desktop Search Bar */}
          <div className="relative font-sans text-sm" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="flex items-center">
              <div className="relative flex items-center bg-white/10 hover:bg-white/15 focus-within:bg-white/20 rounded-full px-3 py-1.5 transition-all duration-200 border border-white/10 focus-within:border-white/30">
                <span className="text-gray-400 mr-2">🔍</span>
                <input
                  type="text"
                  placeholder="Search character..."
                  value={searchTerm}
                  onFocus={() => setShowSuggestions(true)}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setShowSuggestions(true);
                  }}
                  className="bg-transparent text-white text-sm placeholder-gray-400 outline-none w-32 lg:w-44 focus:w-48 lg:focus:w-56 transition-all duration-300"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm('')}
                    className="text-gray-400 hover:text-white p-0.5 ml-1 border-none bg-transparent cursor-pointer text-xs"
                  >
                    ✕
                  </button>
                )}
              </div>
            </form>

            {/* Autocomplete Dropdown for Desktop */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute right-0 mt-2 w-64 bg-[#141624] border border-white/15 rounded-xl shadow-2xl overflow-hidden z-50 backdrop-blur-xl">
                <div className="px-3 py-2 text-xs font-semibold text-gray-400 border-b border-white/10 uppercase tracking-wider">
                  Matching Characters
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {suggestions.map((char) => (
                    <button
                      key={char.id}
                      onClick={() => handleSelectCharacter(char.name)}
                      className="w-full px-3 py-2.5 flex items-center space-x-3 text-left hover:bg-white/10 transition-colors border-none bg-transparent cursor-pointer"
                    >
                      <img
                        src={char.photo}
                        alt={char.name}
                        className="w-8 h-8 rounded-full object-cover bg-black/40 border border-white/20"
                      />
                      <div className="truncate">
                        <div className="text-sm font-medium text-white truncate">{char.name}</div>
                        {char.originalName && (
                          <div className="text-xs text-gray-400 truncate">{char.originalName}</div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center space-x-2">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2.5 rounded-xl text-white bg-white/10 hover:bg-white/20 active:scale-95 transition-all border border-white/10 focus:outline-none"
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {isOpen && (
        <div className="md:hidden fixed inset-x-0 top-16 sm:top-20 bg-[#0d0e15]/98 backdrop-blur-2xl border-b border-white/15 shadow-2xl p-4 sm:p-6 transition-all animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-4 max-h-[calc(100vh-5rem)] overflow-y-auto pb-6 font-sans">
            
            {/* Mobile Search Bar */}
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <div className="flex items-center bg-white/10 rounded-xl px-3.5 py-2.5 border border-white/15">
                <span className="text-gray-400 mr-2.5 text-base">🔍</span>
                <input
                  type="text"
                  placeholder="Search any Avenger (e.g. Iron Man, Thor)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-transparent text-white text-base placeholder-gray-400 outline-none w-full"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm('')}
                    className="text-gray-400 hover:text-white p-1 ml-1 border-none bg-transparent"
                  >
                    ✕
                  </button>
                )}
              </div>
            </form>

            {/* Mobile Search Autocomplete Results */}
            {suggestions.length > 0 && (
              <div className="bg-white/5 rounded-xl p-2 border border-white/10 space-y-1">
                <div className="px-2 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Suggestions
                </div>
                {suggestions.map((char) => (
                  <button
                    key={char.id}
                    onClick={() => handleSelectCharacter(char.name)}
                    className="w-full p-2 flex items-center space-x-3 text-left rounded-lg hover:bg-white/10 transition-colors border-none bg-transparent cursor-pointer"
                  >
                    <img
                      src={char.photo}
                      alt={char.name}
                      className="w-9 h-9 rounded-full object-cover bg-black/40 border border-white/20"
                    />
                    <div className="truncate">
                      <div className="text-sm font-medium text-white truncate">{char.name}</div>
                      {char.originalName && (
                        <div className="text-xs text-gray-400 truncate">{char.originalName}</div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Mobile Navigation Links */}
            <div className="flex flex-col space-y-2 pt-2 border-t border-white/10 font-[Avengers] text-xl">
              <button
                onClick={() => {
                  setIsOpen(false);
                  if (onHomeClick) onHomeClick();
                }}
                className="w-full text-left py-3 px-4 rounded-xl hover:bg-white/10 text-white transition-colors border-none bg-transparent cursor-pointer flex items-center justify-between"
              >
                <span>Home</span>
                <span className="text-sm text-gray-400">⚡</span>
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  if (onTimelineClick) onTimelineClick();
                }}
                className="w-full text-left py-3 px-4 rounded-xl hover:bg-white/10 text-white transition-colors border-none bg-transparent cursor-pointer flex items-center justify-between"
              >
                <span>Timeline</span>
                <span className="text-sm text-gray-400">📅</span>
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  if (onMoviesClick) onMoviesClick();
                }}
                className="w-full text-left py-3 px-4 rounded-xl hover:bg-white/10 text-white transition-colors border-none bg-transparent cursor-pointer flex items-center justify-between"
              >
                <span>Movies Section</span>
                <span className="text-sm text-gray-400">🎬</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
