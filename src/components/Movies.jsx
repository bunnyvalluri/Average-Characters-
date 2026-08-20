// src/components/Movies.jsx
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useColorTheme } from '../ColorThemeContext';

const mcuMoviesList = [
  // Phase 1
  { id: 1, title: 'Iron Man', year: 2008, phase: 'Phase 1', poster: '/movies/iron-man.jpg', lead: 'Iron Man', desc: 'After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.' },
  { id: 2, title: 'The Incredible Hulk', year: 2008, phase: 'Phase 1', poster: '/movies/the-incredible-hulk.jpg', lead: 'Hulk', desc: 'Bruce Banner, a scientist on the run from the U.S. Government, must find a cure for the monster he turns into whenever he loses his temper.' },
  { id: 3, title: 'Iron Man 2', year: 2010, phase: 'Phase 1', poster: '/movies/iron-man-2.jpg', lead: 'Iron Man', desc: 'With the world now aware of his identity as Iron Man, Tony Stark must contend with both his declining health and a vengeful mad man.' },
  { id: 4, title: 'Thor', year: 2011, phase: 'Phase 1', poster: '/movies/thor.jpg', lead: 'Thor', desc: 'The powerful but arrogant god Thor is cast out of Asgard to live amongst humans in Midgard (Earth), where he soon becomes one of their finest defenders.' },
  { id: 5, title: 'Captain America: The First Avenger', year: 2011, phase: 'Phase 1', poster: '/movies/the-first-avenger.jpg', lead: 'Captain America', desc: 'Steve Rogers, a rejected military soldier, transforms into Captain America after taking a dose of a Super-Soldier serum.' },
  { id: 6, title: 'The Avengers', year: 2012, phase: 'Phase 1', poster: '/movies/the-avengers.jpg', lead: 'Avengers', desc: 'Earth\'s mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army.' },
  
  // Phase 2
  { id: 7, title: 'Iron Man 3', year: 2013, phase: 'Phase 2', poster: '/movies/iron-man-3.jpg', lead: 'Iron Man', desc: 'When Tony Stark\'s world is torn apart by a formidable terrorist called the Mandarin, he starts an odyssey of rebuilding and retribution.' },
  { id: 8, title: 'Thor: The Dark World', year: 2013, phase: 'Phase 2', poster: '/movies/the-dark-world.jpg', lead: 'Thor', desc: 'When the Dark Elves attempt to plunge the universe into darkness, Thor must embark on a perilous and personal journey.' },
  { id: 9, title: 'Captain America: The Winter Soldier', year: 2014, phase: 'Phase 2', poster: '/movies/the-winter-soldier.jpg', lead: 'Captain America', desc: 'As Steve Rogers struggles to embrace his role in the modern world, he teams up with Black Widow and Falcon to battle a shadow conspiracy.' },
  { id: 10, title: 'Guardians of the Galaxy', year: 2014, phase: 'Phase 2', poster: '/movies/guardians-of-the-galaxy.jpg', lead: 'Star-Lord', desc: 'A group of intergalactic criminals must pull together to stop a fanatical warrior with plans to purge the universe.' },
  { id: 11, title: 'Avengers: Age of Ultron', year: 2015, phase: 'Phase 2', poster: '/movies/age-of-ultron.jpg', lead: 'Avengers', desc: 'When Tony Stark and Bruce Banner try to jump-start a dormant peacekeeping program called Ultron, things go horribly wrong.' },
  { id: 12, title: 'Ant-Man', year: 2015, phase: 'Phase 2', poster: '/movies/ant-man.jpg', lead: 'Ant-Man', desc: 'Armed with a super-suit with the astonishing ability to shrink in scale but increase in strength, cat burglar Scott Lang must embrace his inner hero.' },

  // Phase 3
  { id: 13, title: 'Captain America: Civil War', year: 2016, phase: 'Phase 3', poster: '/movies/civil-war.jpg', lead: 'Captain America', desc: 'Political involvement in the Avengers\' affairs causes a rift between former allies Captain America and Iron Man.' },
  { id: 14, title: 'Doctor Strange', year: 2016, phase: 'Phase 3', poster: '/movies/dr-strange.jpg', lead: 'Doctor Strange', desc: 'While on a journey of physical and spiritual healing, a brilliant neurosurgeon is drawn into the world of the mystic arts.' },
  { id: 15, title: 'Guardians of the Galaxy Vol. 2', year: 2017, phase: 'Phase 3', poster: '/movies/guardians-of-the-galaxy-2.jpg', lead: 'Star-Lord', desc: 'The Guardians struggle to keep their newfound family together as they unravel the mystery of Peter Quill\'s true parentage.' },
  { id: 16, title: 'Spider-Man: Homecoming', year: 2017, phase: 'Phase 3', poster: '/movies/spiderman-homecoming.jpg', lead: 'Spider-Man', desc: 'Peter Parker balances his life as an ordinary high school student in Queens with his superhero alter-ego Spider-Man.' },
  { id: 17, title: 'Thor: Ragnarok', year: 2017, phase: 'Phase 3', poster: '/movies/ragnarok.jpg', lead: 'Thor', desc: 'Imprisoned on the planet Sakaar, Thor must race against time to return to Asgard and stop Ragnarök at the hands of the ruthless Hela.' },
  { id: 18, title: 'Black Panther', year: 2018, phase: 'Phase 3', poster: '/movies/black-panther.jpg', lead: 'Black Panther', desc: 'T\'Challa, heir to the hidden kingdom of Wakanda, must step forward to lead his people and confront a challenger from his country\'s past.' },
  { id: 19, title: 'Avengers: Infinity War', year: 2018, phase: 'Phase 3', poster: '/movies/infinity-war.jpg', lead: 'Avengers', desc: 'The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation.' },
  { id: 20, title: 'Ant-Man and the Wasp', year: 2018, phase: 'Phase 3', poster: '/movies/ant-man-and-the-wasp.jpg', lead: 'Ant-Man', desc: 'As Scott Lang balances being both a superhero and a father, Hope van Dyne and Dr. Hank Pym present an urgent new mission.' },
  { id: 21, title: 'Captain Marvel', year: 2019, phase: 'Phase 3', poster: '/movies/captain-marvel.jpg', lead: 'Captain Marvel', desc: 'Carol Danvers becomes one of the universe\'s most powerful heroes when Earth is caught in the middle of a galactic war.' },
  { id: 22, title: 'Avengers: Endgame', year: 2019, phase: 'Phase 3', poster: '/movies/endgame.jpg', lead: 'Avengers', desc: 'After the devastating events of Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more.' },
  { id: 23, title: 'Spider-Man: Far From Home', year: 2019, phase: 'Phase 3', poster: '/movies/far-from-home.jpg', lead: 'Spider-Man', desc: 'Following the events of Endgame, Spider-Man must step up to take on new threats in a world that has changed forever.' },

  // Multiverse & Legacy
  { id: 24, title: 'Spider-Man: No Way Home', year: 2021, phase: 'Multiverse', poster: '/movies/no-way-home.jpg', lead: 'Spider-Man', desc: 'With Spider-Man\'s identity now revealed, Peter asks Doctor Strange for help, unleashing villains from across the multiverse.' },
  { id: 25, title: 'Black Widow', year: 2021, phase: 'Phase 4', poster: '/movies/black-widow.jpg', lead: 'Black Widow', desc: 'Natasha Romanoff confronts the darker parts of her ledger when a dangerous conspiracy with ties to her past arises.' },
  { id: 26, title: 'Deadpool & Wolverine', year: 2024, phase: 'Multiverse', poster: '/movies/deadpool-&-wolverine.jpg', lead: 'Deadpool', desc: 'Wade Wilson\'s peaceful existence comes crashing down when the Time Variance Authority recruits him to help safeguard the multiverse.' },
  { id: 27, title: 'Venom: The Last Dance', year: 2024, phase: 'Multiverse', poster: '/movies/the-last-dance.jpg', lead: 'Venom', desc: 'Eddie Brock and Venom are on the run. Hunted by both of their worlds and with the net closing in, the duo are forced into a devastating decision.' },
  { id: 28, title: 'Spider-Man (2002)', year: 2002, phase: 'Legacy', poster: '/movies/spiderman.jpg', lead: 'Spider-Man', desc: 'After being bitten by a genetically-modified spider, a shy teenager gains spider-like abilities.' },
  { id: 29, title: 'Deadpool', year: 2016, phase: 'Legacy', poster: '/movies/deadpool.jpg', lead: 'Deadpool', desc: 'A wisecracking mercenary gets experimented on and becomes immortal but ugly, and sets out to track down the man who ruined his looks.' }
];

const phases = ['All', 'Phase 1', 'Phase 2', 'Phase 3', 'Phase 4', 'Multiverse', 'Legacy'];

const Movies = ({ onSelectCharacter }) => {
  const { color } = useColorTheme();
  const [selectedPhase, setSelectedPhase] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);

  const filteredMovies = useMemo(() => {
    return mcuMoviesList.filter((movie) => {
      const matchesPhase = selectedPhase === 'All' || movie.phase === selectedPhase;
      const matchesSearch =
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.lead.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.year.toString().includes(searchQuery);
      return matchesPhase && matchesSearch;
    });
  }, [selectedPhase, searchQuery]);

  return (
    <section id="movies-section" className="w-full py-12 sm:py-16 px-3 sm:px-6 lg:px-12 bg-gradient-to-b from-transparent via-[#0d0e15]/50 to-[#07080d]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Title Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold uppercase tracking-wider text-gray-300 mb-3 border border-white/10 backdrop-blur-md">
            <span>Marvel Cinematic Universe</span>
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-wide text-white font-[Avengers]"
            style={{ textShadow: `0 4px 24px ${color}66` }}
          >
            MCU Movie Hub
          </h2>
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto mt-2 font-sans">
            Explore the Infinity Saga, Multiverse Saga, and standalone Marvel blockbusters with complete filmography details.
          </p>

          {/* Phase Filter Tabs */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap mt-6">
            {phases.map((phase) => (
              <button
                key={phase}
                onClick={() => setSelectedPhase(phase)}
                style={{
                  backgroundColor: selectedPhase === phase ? color : undefined,
                  borderColor: selectedPhase === phase ? 'white' : 'rgba(255,255,255,0.12)',
                }}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer border ${
                  selectedPhase === phase
                    ? 'text-white shadow-lg scale-105'
                    : 'text-gray-300 bg-white/5 hover:bg-white/10 hover:text-white'
                }`}
              >
                {phase}
              </button>
            ))}
          </div>

          {/* Movie Search Bar */}
          <div className="max-w-md mx-auto mt-5">
            <div className="flex items-center bg-white/10 rounded-full px-4 py-2 border border-white/15 focus-within:border-white/40 transition-all">
              <span className="text-gray-400 mr-2 text-sm">🔍</span>
              <input
                type="text"
                placeholder="Filter by movie name, year, hero..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-white placeholder-gray-400 outline-none w-full text-xs sm:text-sm font-sans"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-gray-400 hover:text-white text-xs p-1"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Movies Responsive Grid */}
        {filteredMovies.length === 0 ? (
          <div className="text-center py-16 bg-white/5 rounded-3xl border border-white/10 p-8 max-w-lg mx-auto">
            <span className="text-4xl mb-3 block">🎬</span>
            <h3 className="text-lg font-bold text-white mb-1 font-sans">No movies match your filter</h3>
            <p className="text-xs sm:text-sm text-gray-400 font-sans">
              Try searching with a different term or resetting the phase filter.
            </p>
            <button
              onClick={() => { setSelectedPhase('All'); setSearchQuery(''); }}
              className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-5 lg:gap-6">
            {filteredMovies.map((movie) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-20px' }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                onClick={() => setSelectedMovie(movie)}
                className="group relative bg-[#131522] rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 shadow-lg cursor-pointer flex flex-col transition-all duration-300"
              >
                {/* Poster container */}
                <div className="relative aspect-[2/3] w-full overflow-hidden bg-black/40">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = '/avengers.png';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#131522] via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                  {/* Year & Phase badges */}
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    <span className="px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[10px] sm:text-xs font-bold text-white border border-white/20">
                      {movie.year}
                    </span>
                  </div>

                  <div className="absolute top-2 right-2">
                    <span
                      className="px-2 py-0.5 rounded-md text-[10px] sm:text-xs font-bold text-white border border-white/20 backdrop-blur-md"
                      style={{ backgroundColor: `${color}cc` }}
                    >
                      {movie.phase}
                    </span>
                  </div>
                </div>

                {/* Movie card info */}
                <div className="p-3 flex-1 flex flex-col justify-between font-sans">
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-yellow-400 transition-colors line-clamp-2 leading-snug">
                      {movie.title}
                    </h3>
                    <span className="text-[11px] text-gray-400 block mt-1">
                      Lead: <span className="text-gray-200">{movie.lead}</span>
                    </span>
                  </div>
                  <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-400 group-hover:text-white">
                    <span>View Details</span>
                    <span>→</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Interactive Movie Details Modal */}
        <AnimatePresence>
          {selectedMovie && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative bg-[#141624] border border-white/20 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-5 sm:p-8 font-sans"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedMovie(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-base border-none cursor-pointer z-10 transition-colors"
                  aria-label="Close modal"
                >
                  ✕
                </button>

                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  {/* Modal Poster */}
                  <img
                    src={selectedMovie.poster}
                    alt={selectedMovie.title}
                    className="w-36 sm:w-48 aspect-[2/3] object-cover rounded-2xl border border-white/20 shadow-xl mx-auto sm:mx-0 flex-shrink-0"
                  />

                  {/* Modal Info */}
                  <div className="flex-1 text-left space-y-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/10 text-white border border-white/15">
                        {selectedMovie.year}
                      </span>
                      <span
                        className="px-2.5 py-0.5 rounded-full text-xs font-bold text-white"
                        style={{ backgroundColor: color }}
                      >
                        {selectedMovie.phase}
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight font-[Avengers]">
                      {selectedMovie.title}
                    </h2>

                    <div className="text-xs sm:text-sm text-gray-300">
                      <strong className="text-white">Featured Hero / Group: </strong>
                      {selectedMovie.lead}
                    </div>

                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed pt-1">
                      {selectedMovie.desc}
                    </p>

                    <div className="pt-4 flex flex-wrap gap-3">
                      {onSelectCharacter && (
                        <button
                          onClick={() => {
                            onSelectCharacter(selectedMovie.lead);
                            setSelectedMovie(null);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          style={{ backgroundColor: color }}
                          className="px-4 py-2 rounded-xl text-white text-xs sm:text-sm font-semibold hover:brightness-110 active:scale-95 transition-all cursor-pointer border-none"
                        >
                          Explore {selectedMovie.lead} →
                        </button>
                      )}
                      <button
                        onClick={() => setSelectedMovie(null)}
                        className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer border border-white/10"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default Movies;