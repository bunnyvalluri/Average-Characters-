// src/components/CharacterInfo.jsx
import { motion } from 'framer-motion';

const CharacterInfo = ({ character }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-xl space-y-3 sm:space-y-4 p-5 sm:p-7 rounded-3xl bg-black/80 backdrop-blur-md border border-white/20 shadow-2xl text-center sm:text-left flex flex-col items-center sm:items-start text-white"
    >
      <h1
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-tight tracking-wide break-words text-white"
        style={{ fontFamily: character.fontFamily }}
      >
        {character.name}
      </h1>
      {character.originalName && (
        <h2 className="text-base sm:text-lg md:text-xl font-semibold text-yellow-400 mb-1" style={{ fontSize: '1.1rem' }}>
          <span className="text-sm sm:text-base md:text-lg font-normal text-gray-300 block" style={{ fontFamily: character.fontFamily }}>
            {character.originalName}
          </span>
        </h2>
      )}
      <p className="text-gray-100 text-xs sm:text-sm md:text-base max-w-lg leading-relaxed">{character.description}</p>
      {character.powers && (
        <div className="text-gray-200 text-xs sm:text-sm mt-1 max-w-lg">
          <span className="font-semibold text-yellow-400">Powers: </span>{character.powers}
        </div>
      )}
      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-4 text-xs text-gray-300 mt-1">
        {character.birth && (
          <span className="bg-white/10 px-2.5 py-1 rounded-md border border-white/20">
            <span className="font-semibold text-white">Birth:</span> {character.birth}
          </span>
        )}
        {character.death && (
          <span className="bg-white/10 px-2.5 py-1 rounded-md border border-white/20">
            <span className="font-semibold text-white">Death:</span> {character.death}
          </span>
        )}
      </div>
      <div className="pt-2">
        <a href="#" className="inline-block text-white border-b-2 border-white pb-1 uppercase text-xs sm:text-sm tracking-widest hover:text-yellow-400 transition-colors">
          Read More
        </a>
      </div>
    </motion.div>
  );
};

export default CharacterInfo;