// src/components/CharacterInfo.jsx
import { motion } from 'framer-motion';
import { useColorTheme } from '../ColorThemeContext';

const CharacterInfo = ({ character, onExploreTimeline, onExploreMovies }) => {
  const { color } = useColorTheme();

  return (
    <motion.div
      key={character.id}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.45 }}
      className="w-full flex flex-col space-y-4 sm:space-y-5 text-left z-20 px-2 sm:px-4 md:px-6"
    >
      {/* Super Hero Name */}
      <div>
        <h1
          className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-none text-white break-words"
          style={{
            fontFamily: character.fontFamily || 'Avengers',
            textShadow: `0 4px 24px ${color}88, 0 1px 3px rgba(0,0,0,0.8)`,
          }}
        >
          {character.name}
        </h1>

        {/* Real / Original Name Badge */}
        {character.originalName && (
          <div className="mt-2 inline-flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full border border-white/15 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }}></span>
            <span className="text-xs sm:text-sm font-medium text-gray-300 font-sans tracking-wide">
              {character.originalName}
            </span>
          </div>
        )}
      </div>

      {/* Bio / Description */}
      <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl font-sans">
        {character.description}
      </p>

      {/* Powers & Abilities Pill Card */}
      {character.powers && (
        <div className="p-3 sm:p-4 rounded-xl bg-white/[0.06] border border-white/10 backdrop-blur-md font-sans">
          <div className="flex items-center space-x-2 mb-1.5">
            <span className="text-sm">⚡</span>
            <span className="text-xs uppercase font-bold tracking-wider text-gray-400">
              Powers & Capabilities
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-200 leading-snug">
            {character.powers}
          </p>
        </div>
      )}

      {/* Vital Details (Birth / Death / Status) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-xs text-gray-300 font-sans">
        {character.birth && (
          <div className="flex items-center space-x-2 bg-white/5 p-2 rounded-lg border border-white/5">
            <span className="text-sm">🎂</span>
            <span className="truncate">
              <strong className="text-gray-400">Birth:</strong> {character.birth}
            </span>
          </div>
        )}
        {character.death && (
          <div className="flex items-center space-x-2 bg-white/5 p-2 rounded-lg border border-white/5">
            <span className="text-sm">⭐</span>
            <span className="truncate">
              <strong className="text-gray-400">Status:</strong> {character.death}
            </span>
          </div>
        )}
      </div>

      {/* Quick Action CTA Buttons */}
      <div className="flex flex-wrap items-center gap-3 pt-2 font-[Avengers] text-sm sm:text-base">
        <button
          type="button"
          onClick={() => {
            const el = document.getElementById('timeline-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
            else if (onExploreTimeline) onExploreTimeline();
          }}
          style={{
            backgroundColor: color,
            boxShadow: `0 4px 20px ${color}66`,
          }}
          className="px-5 py-2.5 rounded-xl text-white font-medium hover:brightness-110 active:scale-95 transition-all duration-200 border-none cursor-pointer flex items-center space-x-2 tracking-wider"
        >
          <span>View Timeline</span>
          <span>↓</span>
        </button>

        <button
          type="button"
          onClick={() => {
            const el = document.getElementById('movies-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
            else if (onExploreMovies) onExploreMovies();
          }}
          className="px-5 py-2.5 rounded-xl text-white font-medium bg-white/10 hover:bg-white/20 active:scale-95 transition-all duration-200 border border-white/15 cursor-pointer flex items-center space-x-2 tracking-wider backdrop-blur-sm"
        >
          <span>Explore MCU</span>
          <span>🎬</span>
        </button>
      </div>
    </motion.div>
  );
};

export default CharacterInfo;