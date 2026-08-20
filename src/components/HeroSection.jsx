// src/components/HeroSection.jsx
import { useEffect, useCallback, useMemo, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CharacterInfo from './CharacterInfo';
import { useColorTheme } from '../ColorThemeContext';

const getCategories = (count = 179) => [
  { id: 'all', label: `All Heroes (${count})` },
  { id: 'endgame', label: 'Endgame (Battle & Heist)' },
  { id: 'avengers', label: 'Avengers' },
  { id: 'guardians', label: 'Guardians' },
  { id: 'xmen', label: 'X-Men & Mutants' },
  { id: 'villains', label: 'Villains & Anti-Heroes' },
  { id: 'cosmic', label: 'Cosmic & Multiverse' },
];

const ENDGAME_HERO_NAMES = new Set([
  'iron man', 'captain america', 'thor', 'hulk', 'black widow', 'hawkeye',
  'war machine', 'ant-man', 'rocket raccoon', 'nebula', 'captain marvel',
  'thanos', 'spider-man', 'doctor strange', 'black panther', 'wasp',
  'star-lord', 'gamora', 'drax the destroyer', 'mantis', 'groot',
  'scarlet witch', 'winter soldier', 'falcon', 'valkyrie', 'wong',
  'okoye', 'shuri', "m'baku", 'pepper potts', 'korg', 'miek', 'kraglin',
  'howard the duck', 'ancient one', 'red skull', 'crossbones', 'ned leeds',
  'aunt may', 'happy hogan', 'maria hill', 'nick fury', 'cassie lang',
  'loki', 'mighty thor', 'ebony maw', 'cull obsidian', 'proxima midnight',
  'corvus glaive', 'peggy carter', 'howard stark', 'edwin jarvis', 'frigga',
  'morgan stark', 'hank pym', 'dr. hank pym', 'janet van dyne', 'alexander pierce',
  'harley keener', 'thunderbolt ross', 'general thunderbolt ross', 'queen ramonda',
  'akihiko', 'laura barton', 'jasper sitwell', 'agent jasper sitwell'
]);

const isEndgameCharacter = (char) => {
  if (!char) return false;
  const name = char.name.toLowerCase();
  return (
    ENDGAME_HERO_NAMES.has(name) ||
    name.includes('endgame') ||
    (char.description || '').toLowerCase().includes('endgame') ||
    (char.description || '').toLowerCase().includes('battle of earth') ||
    (char.description || '').toLowerCase().includes('time heist')
  );
};

// Helper to categorize characters by name/powers
const getCategoryForCharacter = (char) => {
  const name = char.name.toLowerCase();
  const desc = (char.description || '').toLowerCase();

  if (
    name.includes('thanos') || name.includes('loki') || name.includes('ultron') ||
    name.includes('hela') || name.includes('kang') || name.includes('killmonger') ||
    name.includes('green goblin') || name.includes('doctor octopus') || name.includes('mysterio') ||
    name.includes('vulture') || name.includes('electro') || name.includes('sandman') ||
    name.includes('lizard') || name.includes('ronan') || name.includes('kaecilius') ||
    name.includes('yellowjacket') || name.includes('whiplash') || name.includes('zemo') ||
    name.includes('red skull') || name.includes('crossbones') || name.includes('kingpin') ||
    name.includes('abomination') || name.includes('gorr') || name.includes('high evolutionary') ||
    name.includes('ebony maw') || name.includes('cull obsidian') || name.includes('proxima midnight') ||
    name.includes('corvus glaive') || name.includes('alexander pierce') || name.includes('akihiko') ||
    name.includes('jasper sitwell') || name.includes('justin hammer') || name.includes('carnage') ||
    name.includes('juggernaut') || name.includes('bullseye')
  ) {
    return 'villains';
  }

  if (
    name.includes('star-lord') || name.includes('gamora') || name.includes('drax') ||
    name.includes('rocket') || name.includes('groot') || name.includes('mantis') ||
    name.includes('nebula') || name.includes('yondu') || name.includes('kraglin') ||
    name.includes('cosmo') || name.includes('adam warlock')
  ) {
    return 'guardians';
  }

  if (
    name.includes('wolverine') || name.includes('deadpool') || name.includes('cyclops') ||
    name.includes('storm') || name.includes('jean grey') || name.includes('professor x') ||
    name.includes('magneto') || name.includes('rogue') || name.includes('gambit') ||
    name.includes('colossus') || name.includes('cable') || name.includes('nightcrawler') ||
    desc.includes('mutant')
  ) {
    return 'xmen';
  }

  if (
    name.includes('watcher') || name.includes('eternals') || name.includes('ikaris') ||
    name.includes('thena') || name.includes('sersi') || name.includes('makkari') ||
    name.includes('druig') || name.includes('phastos') || name.includes('kingo') ||
    name.includes('ajak') || name.includes('gilgamesh') || name.includes('silver surfer') ||
    name.includes('ego') || name.includes('clea') || name.includes('america chavez') ||
    name.includes('galactus') || name.includes('beta ray bill')
  ) {
    return 'cosmic';
  }

  return 'avengers';
};

const HeroSection = ({ currentCharacter, setCurrentCharacterIdx, currentCharacterIdx, characters }) => {
  const { setColor } = useColorTheme();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const rosterRef = useRef(null);

  // Synchronize color theme on character change without heavy DOM re-renders
  useEffect(() => {
    if (currentCharacter?.bgColor) {
      setColor(currentCharacter.bgColor);
    }
  }, [currentCharacter, setColor]);

  // Intelligent Image Preload Cache for 0ms transition latency
  useEffect(() => {
    if (!characters || characters.length === 0) return;
    const total = characters.length;
    // Preload previous 2 and next 2 characters in memory
    const preloadIndices = [
      (currentCharacterIdx + 1) % total,
      (currentCharacterIdx + 2) % total,
      (currentCharacterIdx - 1 + total) % total,
      (currentCharacterIdx - 2 + total) % total,
    ];

    preloadIndices.forEach((idx) => {
      const char = characters[idx];
      if (char?.photo) {
        const img = new Image();
        img.src = char.photo;
      }
    });
  }, [currentCharacterIdx, characters]);

  // Navigation handlers
  const handleNextCharacter = useCallback(() => {
    setCurrentCharacterIdx((prev) => (prev + 1) % characters.length);
  }, [characters.length, setCurrentCharacterIdx]);

  const handlePrevCharacter = useCallback(() => {
    setCurrentCharacterIdx((prev) => (prev - 1 + characters.length) % characters.length);
  }, [characters.length, setCurrentCharacterIdx]);

  // Keyboard navigation support (ArrowLeft / ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore if user is typing in an input
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) {
        return;
      }
      if (e.key === 'ArrowRight') {
        handleNextCharacter();
      } else if (e.key === 'ArrowLeft') {
        handlePrevCharacter();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNextCharacter, handlePrevCharacter]);

  // Filter characters by category for the quick-roster bar
  const filteredRoster = useMemo(() => {
    if (selectedCategory === 'all') {
      return characters;
    }
    if (selectedCategory === 'endgame') {
      return characters.filter((c) => isEndgameCharacter(c));
    }
    return characters.filter((c) => getCategoryForCharacter(c) === selectedCategory);
  }, [characters, selectedCategory]);

  // Auto-scroll active hero into view in the roster bar
  useEffect(() => {
    if (rosterRef.current) {
      const activeEl = rosterRef.current.querySelector('[data-active="true"]');
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }, [currentCharacterIdx]);

  // Prev and next character names for background aesthetics
  const prevChar = characters[(currentCharacterIdx - 1 + characters.length) % characters.length];
  const nextChar = characters[(currentCharacterIdx + 1) % characters.length];

  return (
    <div className="relative flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-3 sm:px-6 md:px-12 py-4">
      {/* Background Character Names Watermark (GPU accelerated) */}
      <div className="hidden md:flex absolute top-16 inset-x-0 justify-between items-center text-white/10 text-4xl sm:text-6xl lg:text-8xl font-black uppercase pointer-events-none select-none z-0 px-6 overflow-hidden tracking-tighter">
        <span className="w-1/3 truncate text-left opacity-30">{prevChar.name}</span>
        <span className="w-1/3 truncate text-center opacity-40 font-extrabold">{currentCharacter.name}</span>
        <span className="w-1/3 truncate text-right opacity-30">{nextChar.name}</span>
      </div>

      {/* Main Character Stage Row */}
      <div className="flex flex-col lg:flex-row items-center justify-between w-full z-10 gap-6 lg:gap-10 min-h-[460px] sm:min-h-[520px]">
        {/* Desktop Left Nav Button */}
        <div className="hidden lg:flex items-center justify-center flex-shrink-0">
          <button
            onClick={handlePrevCharacter}
            className="group flex items-center justify-center w-13 h-13 rounded-full bg-white/10 hover:bg-white/20 active:scale-90 border border-white/20 text-white text-2xl transition-all duration-200 backdrop-blur-md shadow-2xl hover:border-white/40"
            aria-label="Previous character"
            title="Previous (or press Left Arrow)"
          >
            <svg className="w-6 h-6 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>

        {/* Character Image Display Stage */}
        <div className="relative flex flex-col items-center justify-center w-full lg:w-1/2">
          {/* Hero Counter Badge */}
          <div className="mb-2 flex items-center gap-2 bg-black/40 border border-white/15 px-3 py-1 rounded-full backdrop-blur-md shadow-md text-xs font-semibold text-gray-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Character #{currentCharacter.id} of {characters.length}</span>
          </div>

          <div className="relative flex justify-center items-center w-full h-[36vh] sm:h-[46vh] md:h-[50vh] lg:h-[58vh] max-h-[520px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCharacter.id}
                initial={{ opacity: 0, scale: 0.94, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -15 }}
                transition={{ duration: 0.28, ease: [0.25, 1, 0.5, 1] }}
                className="relative h-full w-full flex items-center justify-center"
              >
                <img
                  src={currentCharacter.photo}
                  alt={currentCharacter.name}
                  decoding="async"
                  fetchPriority="high"
                  className="h-full w-auto max-h-full max-w-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.7)] select-none transition-transform duration-300 hover:scale-[1.03]"
                />
              </motion.div>
            </AnimatePresence>

            {/* Mobile Touch Quick Arrows */}
            <div className="lg:hidden absolute inset-y-0 left-0 flex items-center pl-1 z-20 pointer-events-auto">
              <button
                onClick={handlePrevCharacter}
                className="p-3 bg-black/50 hover:bg-black/75 active:scale-90 text-white rounded-full backdrop-blur-md border border-white/20 transition-all shadow-lg"
                aria-label="Previous character"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>
            <div className="lg:hidden absolute inset-y-0 right-0 flex items-center pr-1 z-20 pointer-events-auto">
              <button
                onClick={handleNextCharacter}
                className="p-3 bg-black/50 hover:bg-black/75 active:scale-90 text-white rounded-full backdrop-blur-md border border-white/20 transition-all shadow-lg"
                aria-label="Next character"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Character Info Panel */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-start items-center z-10">
          <CharacterInfo character={currentCharacter} />
        </div>

        {/* Desktop Right Nav Button */}
        <div className="hidden lg:flex items-center justify-center flex-shrink-0">
          <button
            onClick={handleNextCharacter}
            className="group flex items-center justify-center w-13 h-13 rounded-full bg-white/10 hover:bg-white/20 active:scale-90 border border-white/20 text-white text-2xl transition-all duration-200 backdrop-blur-md shadow-2xl hover:border-white/40"
            aria-label="Next character"
            title="Next (or press Right Arrow)"
          >
            <svg className="w-6 h-6 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Quick Interactive Roster Selector Strip (Fixes Lazy Browsing) */}
      <div className="w-full mt-8 pt-4 border-t border-white/10 z-20">
        {/* Category Filter Pills */}
        <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 hide-scrollbar max-w-full">
            {getCategories(characters?.length || 179).map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 border ${
                  selectedCategory === cat.id
                    ? 'bg-white text-black border-white shadow-md scale-105'
                    : 'bg-white/5 hover:bg-white/15 text-gray-300 border-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <span className="text-xs text-gray-400 font-medium hidden sm:inline-block">
            Keyboard: Use <kbd className="px-1.5 py-0.5 bg-white/10 rounded border border-white/20 text-[10px]">←</kbd> <kbd className="px-1.5 py-0.5 bg-white/10 rounded border border-white/20 text-[10px]">→</kbd> to browse
          </span>
        </div>

        {/* Horizontal Character Thumbnail Strip */}
        <div
          ref={rosterRef}
          className="flex items-center gap-3 overflow-x-auto pb-3 pt-1 hide-scrollbar scroll-smooth"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {filteredRoster.map((char) => {
            const isActive = char.id === currentCharacter.id;
            const originalIndex = characters.findIndex((c) => c.id === char.id);
            return (
              <button
                key={char.id}
                data-active={isActive}
                onClick={() => setCurrentCharacterIdx(originalIndex)}
                className={`flex-shrink-0 flex flex-col items-center p-2 rounded-xl transition-all duration-200 border cursor-pointer select-none group ${
                  isActive
                    ? 'bg-white/20 border-white shadow-xl scale-105 ring-2 ring-white/50'
                    : 'bg-black/30 hover:bg-white/10 border-white/10 hover:border-white/30 opacity-70 hover:opacity-100'
                }`}
                style={{ width: '84px', scrollSnapAlign: 'center' }}
                title={char.name}
              >
                <div className="w-12 h-12 rounded-lg flex items-center justify-center overflow-hidden mb-1.5 bg-black/40">
                  <img
                    src={char.photo}
                    alt={char.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain filter drop-shadow group-hover:scale-110 transition-transform"
                  />
                </div>
                <span className="text-[11px] font-medium text-white truncate w-full text-center leading-tight">
                  {char.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;