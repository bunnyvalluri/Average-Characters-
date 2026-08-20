// src/components/HeroSection.jsx
import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CharacterInfo from './CharacterInfo';
import { useColorTheme } from '../ColorThemeContext';

const HeroSection = ({
  currentCharacter,
  setCurrentCharacterIdx,
  currentCharacterIdx,
  characters,
  onExploreTimeline,
  onExploreMovies,
}) => {
  const { setColor, color } = useColorTheme();
  const thumbnailScrollRef = useRef(null);

  // Update color theme context when character changes
  useEffect(() => {
    if (currentCharacter?.bgColor) {
      setColor(currentCharacter.bgColor);
    }
  }, [currentCharacter, setColor]);

  // Keyboard navigation for desktop (Left / Right arrow keys)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowRight') {
        handleNextCharacter();
      } else if (e.key === 'ArrowLeft') {
        handlePrevCharacter();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentCharacterIdx, characters.length]);

  // Scroll active thumbnail into view
  useEffect(() => {
    if (thumbnailScrollRef.current) {
      const activeEl = thumbnailScrollRef.current.children[currentCharacterIdx];
      if (activeEl) {
        activeEl.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest',
        });
      }
    }
  }, [currentCharacterIdx]);

  const handleNextCharacter = () => {
    setCurrentCharacterIdx((currentCharacterIdx + 1) % characters.length);
  };

  const handlePrevCharacter = () => {
    setCurrentCharacterIdx((currentCharacterIdx - 1 + characters.length) % characters.length);
  };

  const getPrevCharacter = () => {
    const prevId = currentCharacterIdx === 0 ? characters.length - 1 : currentCharacterIdx - 1;
    return characters[prevId];
  };

  const getNextCharacter = () => {
    const nextId = (currentCharacterIdx + 1) % characters.length;
    return characters[nextId];
  };

  return (
    <section className="relative w-full min-h-[calc(100vh-5rem)] flex flex-col justify-between items-center overflow-hidden pt-4 sm:pt-6 pb-6 px-3 sm:px-6 lg:px-12">
      
      {/* Background Dynamic Ambient Radial Glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-700 ease-out"
        style={{
          background: `radial-gradient(circle at 50% 40%, ${color}33 0%, transparent 70%)`,
        }}
      />

      {/* Ghost Background Character Names (Desktop & Large Tablets) */}
      <div className="hidden lg:flex absolute inset-0 items-center justify-between pointer-events-none select-none opacity-10 font-black text-6xl xl:text-8xl uppercase tracking-widest text-white px-8 z-0">
        <span className="truncate max-w-[28%]">{getPrevCharacter()?.name}</span>
        <span className="truncate max-w-[35%] text-center" style={{ color }}>{currentCharacter?.name}</span>
        <span className="truncate max-w-[28%] text-right">{getNextCharacter()?.name}</span>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex-1 flex flex-col md:flex-row items-center justify-center gap-6 lg:gap-12 my-auto">
        
        {/* Left Chevron Button (Desktop / Tablet) */}
        <div className="hidden md:flex items-center justify-center z-20">
          <button
            type="button"
            onClick={handlePrevCharacter}
            className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-white/10 hover:bg-white/20 active:scale-90 text-white text-2xl flex items-center justify-center backdrop-blur-md border border-white/15 shadow-xl transition-all duration-200 focus:outline-none cursor-pointer"
            aria-label={`Previous character: ${getPrevCharacter()?.name}`}
          >
            &#10094;
          </button>
        </div>

        {/* Character Image Container */}
        <div className="w-full md:w-1/2 flex items-center justify-center relative min-h-[300px] xs:min-h-[340px] sm:min-h-[400px] md:min-h-[480px] lg:min-h-[550px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCharacter.id}
              initial={{ opacity: 0, scale: 0.85, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.85, x: -50 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="relative flex items-center justify-center w-full h-full"
            >
              {/* Backlight halo */}
              <div
                className="absolute w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full blur-3xl opacity-50 -z-10 transition-all duration-700"
                style={{ backgroundColor: color }}
              />

              <img
                src={currentCharacter.photo}
                alt={currentCharacter.name}
                className="h-[34vh] xs:h-[40vh] sm:h-[48vh] md:h-[58vh] lg:h-[68vh] max-h-[640px] w-auto max-w-full object-contain cursor-grab active:cursor-grabbing select-none drop-shadow-[0_15px_35px_rgba(0,0,0,0.6)]"
                loading="eager"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.4}
                onDragEnd={(e, info) => {
                  if (info.offset.x < -60) {
                    handleNextCharacter();
                  } else if (info.offset.x > 60) {
                    handlePrevCharacter();
                  }
                }}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Character Info Box */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <CharacterInfo
            character={currentCharacter}
            onExploreTimeline={onExploreTimeline}
            onExploreMovies={onExploreMovies}
          />
        </div>

        {/* Right Chevron Button (Desktop / Tablet) */}
        <div className="hidden md:flex items-center justify-center z-20">
          <button
            type="button"
            onClick={handleNextCharacter}
            className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-white/10 hover:bg-white/20 active:scale-90 text-white text-2xl flex items-center justify-center backdrop-blur-md border border-white/15 shadow-xl transition-all duration-200 focus:outline-none cursor-pointer"
            aria-label={`Next character: ${getNextCharacter()?.name}`}
          >
            &#10095;
          </button>
        </div>
      </div>

      {/* Mobile-Friendly Navigation Bar (Prev / Next Buttons on Phones) */}
      <div className="md:hidden flex items-center justify-between w-full max-w-sm px-4 my-3 z-20">
        <button
          type="button"
          onClick={handlePrevCharacter}
          className="flex-1 py-2.5 px-4 mr-2 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-white font-medium text-xs sm:text-sm flex items-center justify-center space-x-1.5 backdrop-blur-md border border-white/15 transition-all shadow-md"
        >
          <span>&#10094;</span>
          <span className="truncate">{getPrevCharacter()?.name}</span>
        </button>

        <button
          type="button"
          onClick={handleNextCharacter}
          className="flex-1 py-2.5 px-4 ml-2 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-white font-medium text-xs sm:text-sm flex items-center justify-center space-x-1.5 backdrop-blur-md border border-white/15 transition-all shadow-md"
        >
          <span className="truncate">{getNextCharacter()?.name}</span>
          <span>&#10095;</span>
        </button>
      </div>

      {/* Bottom Horizontal Thumbnail Strip (For All Devices: Mobile, Tablet, Laptop, Desktop) */}
      <div className="w-full max-w-7xl mx-auto mt-2 sm:mt-4 z-20">
        <div className="flex items-center justify-between px-2 mb-2">
          <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-gray-400">
            Heroes & Villains ({characters.length})
          </span>
          <span className="text-[11px] sm:text-xs text-gray-400 font-medium">
            Swipe or Click to switch
          </span>
        </div>

        <div
          ref={thumbnailScrollRef}
          className="flex items-center space-x-2 sm:space-x-3 overflow-x-auto py-2 px-1 hide-scrollbar"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {characters.map((char, idx) => {
            const isActive = idx === currentCharacterIdx;
            return (
              <button
                key={char.id}
                type="button"
                onClick={() => setCurrentCharacterIdx(idx)}
                style={{
                  scrollSnapAlign: 'center',
                  borderColor: isActive ? color : 'rgba(255, 255, 255, 0.12)',
                  boxShadow: isActive ? `0 0 16px ${color}88` : 'none',
                }}
                className={`flex-shrink-0 flex items-center space-x-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl border transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-white/20 scale-105'
                    : 'bg-white/5 hover:bg-white/10 opacity-75 hover:opacity-100'
                }`}
                aria-label={`Select ${char.name}`}
              >
                <img
                  src={char.photo}
                  alt={char.name}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover bg-black/40 border border-white/20 flex-shrink-0"
                />
                <span className="text-xs sm:text-sm font-medium text-white whitespace-nowrap font-sans">
                  {char.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;