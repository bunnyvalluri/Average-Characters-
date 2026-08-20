// src/components/HeroSection.jsx
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CharacterInfo from './CharacterInfo';
import { useColorTheme } from '../ColorThemeContext';

const HeroSection = ({ currentCharacter, setCurrentCharacterIdx, currentCharacterIdx, characters }) => {
  const { setColor } = useColorTheme();

  // Update color theme context when character changes
  useEffect(() => {
    setColor(currentCharacter.bgColor);
  }, [currentCharacter, setColor]);

  // Helper to get prev/next character names
  const getPrevCharacter = () => {
    const prevId = currentCharacter.id === 1 ? characters.length : currentCharacter.id - 1;
    return characters[prevId - 1];
  };
  const getNextCharacter = () => {
    const nextId = currentCharacter.id % characters.length + 1;
    return characters[nextId - 1];
  };
  const getNextNextCharacter = () => {
    const nextId = getNextCharacter().id % characters.length + 1;
    return characters[nextId - 1];
  };

  const handleNextCharacter = () => {
    setCurrentCharacterIdx((currentCharacterIdx + 1) % characters.length);
  };

  const handlePrevCharacter = () => {
    setCurrentCharacterIdx((currentCharacterIdx - 1 + characters.length) % characters.length);
  };

  return (
    <div className="relative flex flex-col lg:flex-row items-center justify-center min-h-[65vh] sm:min-h-[75vh] lg:min-h-[85vh] px-3 sm:px-6 md:px-12 lg:px-16 w-full max-w-7xl mx-auto py-6">
      {/* Background Character Names (Desktop and large tablets) */}
      <div className="hidden md:flex absolute inset-0 justify-between items-center text-gray-500 opacity-20 text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold uppercase pointer-events-none select-none z-0 w-full px-4 overflow-hidden">
        <span className="text-center w-1/3 truncate leading-tight">{getPrevCharacter().name}</span>
        <span className="text-white drop-shadow-lg w-1/3 text-center opacity-25 leading-tight truncate">{currentCharacter.name}</span>
        <span className="text-center w-1/3 truncate leading-tight">{getNextCharacter().name}</span>
      </div>

      {/* Main Content Row: Arrows, Image, Info */}
      <div className="flex flex-col lg:flex-row items-center justify-center w-full z-10 gap-6 lg:gap-8">
        {/* Desktop Left Arrow */}
        <div className="hidden lg:flex items-center justify-center w-12 lg:w-16 flex-shrink-0">
          <button
            onClick={handlePrevCharacter}
            className="flex items-center justify-center w-12 h-12 bg-white/10 hover:bg-white/25 text-white text-2xl rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/40 z-20 border-none shadow-lg backdrop-blur-md"
            aria-label="Previous character"
            style={{ userSelect: 'none' }}
          >
            <span className="drop-shadow-lg">&#60;</span>
          </button>
        </div>

        {/* Character Image & Mobile Navigation Container */}
        <div className="relative flex flex-col items-center justify-center w-full lg:w-1/2">
          <div className="relative flex justify-center items-center w-full h-[35vh] sm:h-[45vh] md:h-[50vh] lg:h-[62vh] max-h-[520px]">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentCharacter.id}
                src={currentCharacter.photo}
                alt={currentCharacter.name}
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -80 }}
                transition={{ duration: 0.4 }}
                className="h-full w-auto max-h-full max-w-full object-contain cursor-grab active:cursor-grabbing drop-shadow-2xl select-none"
                loading="lazy"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.7}
                onDragEnd={(e, info) => {
                  if (info.offset.x < -80) {
                    handleNextCharacter();
                  } else if (info.offset.x > 80) {
                    handlePrevCharacter();
                  }
                }}
              />
            </AnimatePresence>

            {/* Mobile Touch Arrows (Overlayed on sides for mobile/tablets) */}
            <div className="lg:hidden absolute inset-y-0 left-0 flex items-center pl-1 z-20 pointer-events-auto">
              <button
                onClick={handlePrevCharacter}
                className="p-2 sm:p-3 bg-black/40 hover:bg-black/60 text-white rounded-full backdrop-blur-sm border border-white/10 transition-all active:scale-95"
                aria-label="Previous character"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>
            <div className="lg:hidden absolute inset-y-0 right-0 flex items-center pr-1 z-20 pointer-events-auto">
              <button
                onClick={handleNextCharacter}
                className="p-2 sm:p-3 bg-black/40 hover:bg-black/60 text-white rounded-full backdrop-blur-sm border border-white/10 transition-all active:scale-95"
                aria-label="Next character"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Swipe / Tap Hint on mobile */}
          <span className="lg:hidden text-[11px] text-gray-400 mt-2 font-medium tracking-wide uppercase">
            Swipe or tap arrows to explore
          </span>
        </div>

        {/* Character Info */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-start items-center">
          <CharacterInfo character={currentCharacter} />
        </div>

        {/* Desktop Right Arrow */}
        <div className="hidden lg:flex items-center justify-center w-12 lg:w-16 flex-shrink-0">
          <button
            onClick={handleNextCharacter}
            className="flex items-center justify-center w-12 h-12 bg-white/10 hover:bg-white/25 text-white text-2xl rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/40 z-20 border-none shadow-lg backdrop-blur-md"
            aria-label="Next character"
            style={{ userSelect: 'none' }}
          >
            <span className="drop-shadow-lg">&#62;</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;