// src/components/HeroSection.jsx
import { useEffect, useCallback, useMemo, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import CharacterInfo from './CharacterInfo';
import { useColorTheme } from '../ColorThemeContext';
import { getCharacterTrailer } from '../utils/characterTrailers';

const getCategories = (count = 1000) => [
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
    name.includes('corvus glaive') || name.includes('supergiant') || name.includes('alexander pierce') ||
    name.includes('akihiko') || name.includes('jasper sitwell') || name.includes('justin hammer') ||
    name.includes('carnage') || name.includes('juggernaut') || name.includes('bullseye') ||
    name.includes('kraven') || name.includes('cassandra nova') || name.includes('silver samurai') ||
    name.includes('prowler') || name.includes('morbius') || name.includes('scorpion') ||
    name.includes('rhino') || name.includes('chameleon') || name.includes('hobgoblin') ||
    name.includes('sabretooth') || name.includes('pyro') || name.includes('toad') ||
    name.includes('lady deathstrike') || name.includes('mephisto') || name.includes('the spot') ||
    name.includes('shocker') || name.includes('tombstone') || name.includes('hydro-man') ||
    name.includes('omega red') || name.includes('sebastian shaw') || name.includes('blob') ||
    name.includes('avalanche') || name.includes('apocalypse') || name.includes('mister sinister') ||
    name.includes('baron strucker') || name.includes('madame hydra') || name.includes('knull') ||
    name.includes('annihilus') || name.includes('the leader') || name.includes('typhoid mary') ||
    name.includes('deacon frost') || name.includes('dracula') || name.includes('toxin') ||
    name.includes('moonstone') || name.includes('crimson dynamo') || name.includes('shriek') ||
    name.includes('doppelganger') || name.includes('the jackal') || name.includes('vermin') ||
    name.includes('carrion') || name.includes('the wizard') || name.includes('trapster') ||
    name.includes('puppet master') || name.includes('diablo') || name.includes('red ghost') ||
    name.includes('the fixer') || name.includes('alkhema') || name.includes('super-adaptoid') ||
    name.includes('sym') || name.includes('nastirh') || name.includes('centurious') ||
    name.includes('blackout') || name.includes('bi-beast') || name.includes('zarathos') ||
    name.includes('dweller-in-darkness')
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
    name.includes('x-23') || name.includes('beast') || name.includes('mystique') ||
    name.includes('iceman') || name.includes('psylocke') || name.includes('domino') ||
    name.includes('bishop') || name.includes('havok') || name.includes('banshee') ||
    name.includes('polaris') || name.includes('shadowcat') || name.includes('emma frost') ||
    name.includes('magik') || name.includes('jubilee') || name.includes('sunspot') ||
    name.includes('cannonball') || name.includes('mirage') || name.includes('wolfsbane') ||
    name.includes('warlock') || name.includes('forge') || name.includes('dazzler') ||
    name.includes('longshot') || name.includes('legion') || name.includes('hope summers') ||
    name.includes('x-man') || name.includes('destiny') || name.includes('callisto') ||
    name.includes('warpath') || name.includes('sunfire') || name.includes('armor') ||
    name.includes('northstar') || name.includes('aurora') || name.includes('guardian') ||
    name.includes('sasquatch') || name.includes('puck') || name.includes('firestar') ||
    name.includes('archangel') || name.includes('meggan') || name.includes('captain britain') ||
    name.includes('isca') || name.includes('genesis') || name.includes('tarn') ||
    name.includes('solemn') || name.includes('bei') || name.includes('redroot') ||
    name.includes('greycrow') || name.includes('arclight') || name.includes('harpoon') ||
    name.includes('riptide') || name.includes('blockbuster') || name.includes('scrambler') ||
    name.includes('erg') || name.includes('leech') || name.includes('artie') ||
    name.includes('gateway') || name.includes('stacy x') || name.includes('indra') ||
    name.includes('loa') || name.includes('match') || name.includes('bling') ||
    name.includes('trance') || name.includes('graymalkin') || name.includes('onyxx') ||
    name.includes('broo') || name.includes('kid gladiator') || name.includes('eye-boy') ||
    name.includes('nature girl') || name.includes('forgetmenot') || name.includes('shark-girl') ||
    name.includes('triage') || name.includes('benjamin deeds') || name.includes('hijack') ||
    name.includes('cerise') || name.includes('kylun') || name.includes('micromax') ||
    name.includes('thunderbird') || desc.includes('mutant') || desc.includes('x-man') ||
    desc.includes('x-men') || desc.includes('krakoa') || desc.includes('new mutant') ||
    desc.includes('alpha flight')
  ) {
    return 'xmen';
  }

  if (
    name.includes('watcher') || name.includes('eternals') || name.includes('ikaris') ||
    name.includes('thena') || name.includes('sersi') || name.includes('makkari') ||
    name.includes('druig') || name.includes('phastos') || name.includes('kingo') ||
    name.includes('ajak') || name.includes('gilgamesh') || name.includes('silver surfer') ||
    name.includes('ego') || name.includes('clea') || name.includes('america chavez') ||
    name.includes('galactus') || name.includes('beta ray bill') || name.includes('nova') ||
    name.includes('2099') || name.includes('spider-punk') || name.includes('spider-noir') ||
    name.includes('man-thing') || name.includes('the living tribunal') || name.includes('eternity') ||
    name.includes('the beyonder') || name.includes('arishem') || name.includes('eson') ||
    name.includes('gladiator') || name.includes('super-skrull') || name.includes('quasar') ||
    name.includes('phyla-vell') || name.includes('moondragon') || name.includes('genis-vell') ||
    name.includes('infinity') || name.includes('annihilus') || name.includes('captain mar-vell') ||
    name.includes('bug') || name.includes('love') || name.includes('knull') ||
    name.includes('death') || name.includes('starhawk') || name.includes('martinex') ||
    name.includes('talon') || name.includes('captain universe') || name.includes('lady sif') ||
    name.includes('molecule man') || name.includes('black swan') || name.includes('korvac') ||
    name.includes('ex nihilo') || name.includes('abyss') || name.includes('pod') ||
    name.includes('death\'s head') || name.includes('starbolt') || name.includes('fang') ||
    name.includes('nightside') || name.includes('flashfire') || name.includes('mentor') ||
    name.includes('plutonia') || name.includes('earthquake') || name.includes('hussar') ||
    name.includes('astra') || name.includes('scintilla') || name.includes('uranian') ||
    name.includes('kaluu')
  ) {
    return 'cosmic';
  }

  return 'avengers';
};

const HeroSection = ({ currentCharacter, setCurrentCharacterIdx, currentCharacterIdx, characters }) => {
  const { setColor } = useColorTheme();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeTrailerChar, setActiveTrailerChar] = useState(null);
  const rosterRef = useRef(null);
  const stageRef = useRef(null);

  // Synchronize color theme on character change without heavy DOM re-renders
  useEffect(() => {
    if (currentCharacter?.bgColor) {
      setColor(currentCharacter.bgColor);
    }
  }, [currentCharacter, setColor]);

  // Intelligent Image Preload Cache: Preloads 10 characters (5 ahead, 5 behind)
  useEffect(() => {
    if (!characters || characters.length === 0) return;
    const total = characters.length;
    const preloadIndices = [];
    for (let offset = 1; offset <= 5; offset++) {
      preloadIndices.push((currentCharacterIdx + offset) % total);
      preloadIndices.push((currentCharacterIdx - offset + total) % total);
    }

    preloadIndices.forEach((idx) => {
      const char = characters[idx];
      if (char?.photo) {
        const img = new Image();
        img.src = char.photo;
      }
    });
  }, [currentCharacterIdx, characters]);

  // Auto-scroll to top of hero stage immediately on character change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, [currentCharacterIdx]);

  // Navigation handlers with instant response & top lock
  const handleNextCharacter = useCallback(() => {
    setCurrentCharacterIdx((prev) => (prev + 1) % characters.length);
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [characters.length, setCurrentCharacterIdx]);

  const handlePrevCharacter = useCallback(() => {
    setCurrentCharacterIdx((prev) => (prev - 1 + characters.length) % characters.length);
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [characters.length, setCurrentCharacterIdx]);

  // Keyboard navigation support (ArrowLeft / ArrowRight / T for trailer / Escape to close)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activeTrailerChar) {
        setActiveTrailerChar(null);
        return;
      }
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) {
        return;
      }
      if (e.key === 'ArrowRight') {
        handleNextCharacter();
      } else if (e.key === 'ArrowLeft') {
        handlePrevCharacter();
      } else if ((e.key === 't' || e.key === 'T') && !activeTrailerChar && currentCharacter) {
        setActiveTrailerChar(currentCharacter);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNextCharacter, handlePrevCharacter, activeTrailerChar, currentCharacter]);

  // Body scroll lock during trailer modal
  useEffect(() => {
    if (activeTrailerChar) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeTrailerChar]);

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

  const currentTrailer = activeTrailerChar ? getCharacterTrailer(activeTrailerChar) : null;

  return (
    <div
      ref={stageRef}
      className="relative flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-3 sm:px-6 md:px-12 py-1 sm:py-3"
    >
      {/* Background Character Names Watermark (GPU accelerated) */}
      <div className="hidden md:flex absolute top-10 inset-x-0 justify-between items-center text-white/10 text-4xl sm:text-6xl lg:text-8xl font-black uppercase pointer-events-none select-none z-0 px-6 overflow-hidden tracking-tighter">
        <span className="w-1/3 truncate text-left opacity-30">{prevChar.name}</span>
        <span className="w-1/3 truncate text-center opacity-40 font-extrabold">{currentCharacter.name}</span>
        <span className="w-1/3 truncate text-right opacity-30">{nextChar.name}</span>
      </div>

      {/* Main Character Stage Row (Responsive Split: Character Image Front-and-Center) */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full z-10 gap-4 sm:gap-6 md:gap-8 lg:gap-12 min-h-[460px] sm:min-h-[520px]">
        {/* Desktop Left Nav Button */}
        <div className="hidden md:flex items-center justify-center flex-shrink-0">
          <button
            onClick={handlePrevCharacter}
            className="group flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-white/15 hover:bg-white/25 active:scale-90 border border-white/30 text-white text-2xl transition-all duration-200 backdrop-blur-md shadow-2xl hover:border-white/50 cursor-pointer"
            aria-label="Previous character"
            title="Previous (or press Left Arrow)"
          >
            <svg className="w-6 h-6 lg:w-7 lg:h-7 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>

        {/* Character Image Display Stage (Visually Prominent & Guaranteed 100% Sized) */}
        <div className="relative flex flex-col items-center justify-center w-full md:w-1/2 order-1 md:order-1 flex-shrink-0">
          {/* Hero Counter Badge */}
          <div className="mb-2 sm:mb-3 flex items-center gap-2 bg-black/50 border border-white/20 px-3.5 py-1 rounded-full backdrop-blur-md shadow-lg text-xs font-bold text-gray-200">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Character #{currentCharacter.id} of {characters.length}</span>
          </div>

          <div className="relative flex justify-center items-center w-full min-h-[320px] sm:min-h-[420px] md:min-h-[480px] lg:min-h-[560px] h-[45vh] sm:h-[50vh] md:h-[55vh] lg:h-[60vh] max-h-[600px] overflow-visible">
            {/* Instant High-Priority Character Portrait */}
            <motion.div
              key={currentCharacter.id}
              initial={{ opacity: 0.85, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.12, ease: 'easeOut' }}
              className="relative h-full w-full flex items-center justify-center overflow-visible"
            >
              <img
                src={currentCharacter.photo}
                alt={currentCharacter.name}
                loading="eager"
                decoding="sync"
                fetchPriority="high"
                onError={(e) => {
                  if (e.target.src !== window.location.origin + '/marvel.png') {
                    e.target.src = '/marvel.png';
                  }
                }}
                style={{
                  minHeight: '260px',
                  maxHeight: '560px'
                }}
                className="h-full w-auto max-w-[92vw] sm:max-w-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)] select-none transition-transform duration-200 hover:scale-[1.04]"
              />
            </motion.div>

            {/* Mobile Touch Quick Arrows directly on Image Stage */}
            <div className="md:hidden absolute inset-y-0 left-0 flex items-center pl-1 z-20 pointer-events-auto">
              <button
                onClick={handlePrevCharacter}
                className="p-3 bg-black/60 hover:bg-black/85 active:scale-90 text-white rounded-full backdrop-blur-md border border-white/30 transition-all shadow-xl cursor-pointer"
                aria-label="Previous character"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>
            <div className="md:hidden absolute inset-y-0 right-0 flex items-center pr-1 z-20 pointer-events-auto">
              <button
                onClick={handleNextCharacter}
                className="p-3 bg-black/60 hover:bg-black/85 active:scale-90 text-white rounded-full backdrop-blur-md border border-white/30 transition-all shadow-xl cursor-pointer"
                aria-label="Next character"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Character Info Panel */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-start items-center z-10 order-2 md:order-2">
          <CharacterInfo
            character={currentCharacter}
            onWatchTrailer={(char) => setActiveTrailerChar(char)}
          />
        </div>

        {/* Desktop Right Nav Button */}
        <div className="hidden md:flex items-center justify-center flex-shrink-0">
          <button
            onClick={handleNextCharacter}
            className="group flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-white/15 hover:bg-white/25 active:scale-90 border border-white/30 text-white text-2xl transition-all duration-200 backdrop-blur-md shadow-2xl hover:border-white/50 cursor-pointer"
            aria-label="Next character"
            title="Next (or press Right Arrow)"
          >
            <svg className="w-6 h-6 lg:w-7 lg:h-7 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Quick Interactive Roster Selector Strip */}
      <div className="w-full mt-8 pt-4 border-t border-white/10 z-20">
        {/* Category Filter Pills */}
        <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 hide-scrollbar max-w-full">
            {getCategories(characters?.length || 1000).map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 border cursor-pointer ${
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
                    onError={(e) => {
                      if (e.target.src !== window.location.origin + '/marvel.png') {
                        e.target.src = '/marvel.png';
                      }
                    }}
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

      {/* Official HD Character Trailer Modal for All 1000 Characters */}
      {activeTrailerChar && currentTrailer && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-fadeIn"
          onClick={() => setActiveTrailerChar(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-[#121218] border border-white/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col transform transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-white/5">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-600 text-white uppercase tracking-wider shadow-sm">
                  Official Spotlight Trailer
                </span>
                <h3 className="text-base sm:text-xl font-bold text-white truncate max-w-md sm:max-w-xl">
                  {activeTrailerChar.name} {activeTrailerChar.originalName ? `("${activeTrailerChar.originalName}")` : ''}
                </h3>
              </div>
              <button
                onClick={() => setActiveTrailerChar(null)}
                className="p-2 text-gray-400 hover:text-white rounded-full bg-white/5 hover:bg-white/15 transition-colors cursor-pointer"
                aria-label="Close character trailer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* 16:9 HD Video Container */}
            <div className="relative w-full bg-black aspect-video">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${currentTrailer.id}?autoplay=1&rel=0&modestbranding=1`}
                title={`${activeTrailerChar.name} Official Trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            {/* Modal Footer Description */}
            <div className="p-4 sm:p-5 bg-black/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-white/10">
              <div className="flex-1">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
                  {currentTrailer.category} • {currentTrailer.title}
                </span>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal line-clamp-2">
                  {activeTrailerChar.description}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto justify-end">
                <a
                  href={`https://www.youtube.com/watch?v=${currentTrailer.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-red-600 hover:bg-red-500 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-md active:scale-95"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  <span>Watch on YouTube</span>
                </a>
                <button
                  onClick={() => setActiveTrailerChar(null)}
                  className="px-4 py-2 bg-white text-black font-semibold text-xs sm:text-sm rounded-xl hover:bg-gray-200 transition-colors flex-shrink-0 cursor-pointer"
                >
                  Done Watching
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSection;