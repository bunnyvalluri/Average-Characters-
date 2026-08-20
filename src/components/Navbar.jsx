import { useState, useEffect } from "react";
import { useColorTheme } from '../ColorThemeContext';

const Navbar = ({ onHomeClick, onTimelineClick, onMoviesClick, onSearchCharacter  }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { color } = useColorTheme();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearchCharacter && searchTerm.trim()) {
      onSearchCharacter(searchTerm.trim());
      setSearchTerm('');
      setIsOpen(false);
    }
  };
  return (
    <nav className={`fixed top-0 left-0 h-16 sm:h-20 md:h-24 w-full z-50 flex justify-between items-center px-4 sm:px-6 md:px-10 lg:px-16 transition-all duration-300 ${
      isScrolled
        ? 'bg-[#121214] shadow-2xl border-b border-white/15'
        : 'bg-[#121214]/95 backdrop-blur-lg border-b border-white/10'
    }`}>
      {/* Logo */}
      <div className="flex items-center space-x-2 sm:space-x-4 cursor-pointer" onClick={onHomeClick}>
        <div className="flex-shrink-0">
          <img
            src="/avengers.png"
            alt="Avengers"
            className="h-10 sm:h-12 md:h-16 w-auto object-contain"
            loading="lazy"
          />
        </div>
        <div className="flex items-center">
          <h2 className="font-[Avengers] text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-wider" loading="lazy">Avengers</h2>
        </div>
      </div>

      {/* Hamburger for mobile */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{ backgroundColor: color, transition: 'background-color 0.6s cubic-bezier(0.4,0,0.2,1)' }}
          className="text-white p-2 rounded-lg shadow-lg focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
      </div>

      {/* Navigation Links & Search */}
      <div
        className={`font-[Avengers] ${
          isOpen
            ? "flex absolute top-full left-0 right-0 w-full bg-[#18181b]/95 backdrop-blur-xl border-b border-white/10 p-5 shadow-2xl flex-col items-center space-y-3 z-50 animate-fadeIn"
            : "hidden"
        } md:flex md:static md:w-auto md:bg-transparent md:border-none md:p-0 md:flex-row md:space-y-0 md:space-x-6 lg:space-x-10 md:items-center md:shadow-none`}
      >
        <button
          onClick={() => { setIsOpen(false); onHomeClick && onHomeClick(); }}
          style={{ backgroundColor: isOpen ? color : 'transparent', transition: 'background-color 0.6s cubic-bezier(0.4,0,0.2,1)' }}
          className="w-full md:w-auto block md:inline-block text-lg sm:text-xl md:text-2xl hover:text-gray-300 py-2 md:py-0 text-white border-none cursor-pointer rounded-lg md:rounded-none shadow-sm md:shadow-none px-4 md:px-0 transition-all duration-200 text-center"
        >
          home
        </button>
        <button
          onClick={() => { setIsOpen(false); onTimelineClick && onTimelineClick(); }}
          style={{ backgroundColor: isOpen ? color : 'transparent', transition: 'background-color 0.6s cubic-bezier(0.4,0,0.2,1)' }}
          className="w-full md:w-auto block md:inline-block text-lg sm:text-xl md:text-2xl hover:text-gray-300 py-2 md:py-0 text-white border-none cursor-pointer rounded-lg md:rounded-none shadow-sm md:shadow-none px-4 md:px-0 transition-all duration-200 text-center"
        >
          time line
        </button>
        <button
          onClick={() => { setIsOpen(false); onMoviesClick && onMoviesClick(); }}
          style={{ backgroundColor: isOpen ? color : 'transparent', transition: 'background-color 0.6s cubic-bezier(0.4,0,0.2,1)' }}
          className="w-full md:w-auto block md:inline-block text-lg sm:text-xl md:text-2xl hover:text-gray-300 py-2 md:py-0 text-white border-none cursor-pointer rounded-lg md:rounded-none shadow-sm md:shadow-none px-4 md:px-0 transition-all duration-200 text-center"
        >
          movies
        </button>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="w-full sm:w-auto flex items-center bg-white/10 px-3 py-1.5 rounded-full border border-white/10 max-w-xs justify-between">
          <input
            type="text"
            placeholder="Search character..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-28 lg:w-40 bg-transparent text-white placeholder-gray-400 outline-none text-sm px-1"
          />
          <button
            type="submit"
            style={{ backgroundColor: color, transition: 'background-color 0.6s cubic-bezier(0.4,0,0.2,1)' }}
            className="text-white px-2.5 py-1 rounded-full text-xs hover:opacity-90 transition-opacity flex-shrink-0"
            aria-label="Search"
          >
            🔍
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
