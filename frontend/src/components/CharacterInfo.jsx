// src/components/CharacterInfo.jsx
import { memo } from 'react';
import { motion } from 'framer-motion';

const CharacterInfo = ({ character, onWatchTrailer }) => {
  if (!character) return null;

  const scrollToTimeline = (e) => {
    e.preventDefault();
    const el = document.getElementById('timeline-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      key={character.id}
      initial={{ opacity: 0, x: 15 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
      className="w-full max-w-xl space-y-3 sm:space-y-4 px-2 sm:px-4 text-center sm:text-left flex flex-col items-center sm:items-start"
    >
      {/* Identity Badges & Hero Mini-Portrait */}
      <div className="flex items-center gap-3 w-full justify-center sm:justify-start">
        {character.photo && (
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-black/40 border border-white/30 p-1 flex-shrink-0 shadow-lg flex items-center justify-center overflow-hidden">
            <img
              src={character.photo}
              alt={character.name}
              className="w-full h-full object-contain filter drop-shadow"
              onError={(e) => {
                if (e.target.src !== window.location.origin + '/marvel.png') {
                  e.target.src = '/marvel.png';
                }
              }}
            />
          </div>
        )}
        <div className="flex flex-col items-center sm:items-start gap-1">
          <div className="flex items-center gap-1.5 flex-wrap justify-center sm:justify-start">
            <span className="bg-white/10 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border border-white/20">
              Marvel Character
            </span>
            {character.id && (
              <span className="bg-black/40 text-gray-300 text-[10px] font-mono font-medium px-2 py-0.5 rounded-md border border-white/10">
                ID #{String(character.id).padStart(4, '0')}
              </span>
            )}
            <span className="bg-red-600/80 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-red-500/40 flex items-center gap-1 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
              {character.trailerCategory || 'HD Trailer Ready'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Name */}
      <h1
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-tight tracking-wide break-words drop-shadow-lg"
        style={{ fontFamily: character.fontFamily || 'Avengers' }}
      >
        {character.name}
      </h1>

      {/* Real Name */}
      {character.originalName && (
        <h2 className="text-base sm:text-lg md:text-xl font-medium text-gray-200/90 -mt-1">
          <span className="text-sm sm:text-base md:text-lg font-normal text-gray-300 block italic">
            "{character.originalName}"
          </span>
        </h2>
      )}

      {/* Description */}
      <p className="text-gray-200 text-xs sm:text-sm md:text-base max-w-lg leading-relaxed font-normal backdrop-blur-xs">
        {character.description}
      </p>

      {/* Powers & Abilities */}
      {character.powers && (
        <div className="bg-black/30 border border-white/10 rounded-xl p-3 max-w-lg w-full text-left backdrop-blur-md">
          <span className="text-xs uppercase font-bold tracking-wider text-white/70 block mb-1">
            ⚡ Powers & Abilities
          </span>
          <p className="text-gray-200 text-xs sm:text-sm leading-relaxed">
            {character.powers}
          </p>
        </div>
      )}

      {/* Origin & Timeline Metadata */}
      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 text-xs text-gray-300 mt-1">
        {character.birth && (
          <div className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/15 backdrop-blur-sm flex items-center gap-1.5 shadow-sm">
            <span className="text-emerald-400">✦</span>
            <span><strong className="text-white">Origin:</strong> {character.birth}</span>
          </div>
        )}
        {character.death && (
          <div className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/15 backdrop-blur-sm flex items-center gap-1.5 shadow-sm">
            <span className="text-rose-400">✦</span>
            <span><strong className="text-white">Status:</strong> {character.death}</span>
          </div>
        )}
      </div>

      {/* Interactive Actions: Watch Trailer & View Film Timeline */}
      <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-3">
        {/* Watch Character Trailer Button */}
        <button
          type="button"
          onClick={() => onWatchTrailer && onWatchTrailer(character)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white font-bold text-xs sm:text-sm uppercase tracking-wider hover:from-red-500 hover:to-rose-600 active:scale-95 transition-all shadow-lg hover:shadow-red-600/40 cursor-pointer border border-red-400/30 group"
          id="character-trailer-btn"
          title="Watch Official HD Trailer (Press 'T')"
        >
          <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
            <svg className="w-3 h-3 text-white fill-current ml-0.5" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
          <span>Watch Official Trailer</span>
          <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-black/40 text-[10px] text-gray-300 font-mono">T</span>
        </button>

        {/* Jump to Timeline Action */}
        <a
          href="#timeline-section"
          onClick={scrollToTimeline}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm uppercase tracking-wider active:scale-95 transition-all border border-white/20 shadow-md backdrop-blur-sm"
        >
          <span>View Film Timeline</span>
          <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </motion.div>
  );
};

export default memo(CharacterInfo);