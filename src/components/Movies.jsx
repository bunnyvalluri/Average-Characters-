// src/components/Movies.jsx
import React, { useState, useMemo } from 'react';
import { mcuMoviesCatalog } from '../assets/timelineData';
import { useColorTheme } from '../ColorThemeContext';

const PHASES = ['All', 'Phase 1', 'Phase 2', 'Phase 3', 'Phase 4', 'Phase 5'];

const Movies = () => {
  const [selectedPhase, setSelectedPhase] = useState('All');
  const [movieQuery, setMovieQuery] = useState('');
  const { color } = useColorTheme();

  const filteredMovies = useMemo(() => {
    return mcuMoviesCatalog.filter((m) => {
      const matchPhase = selectedPhase === 'All' || m.phase === selectedPhase;
      const matchQuery =
        !movieQuery ||
        m.title.toLowerCase().includes(movieQuery.toLowerCase()) ||
        m.hero.toLowerCase().includes(movieQuery.toLowerCase()) ||
        String(m.year).includes(movieQuery);
      return matchPhase && matchQuery;
    });
  }, [selectedPhase, movieQuery]);

  return (
    <section
      id="movies-section"
      className="w-full flex flex-col items-center py-12 sm:py-16 px-4 sm:px-8 max-w-7xl mx-auto scroll-mt-20"
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-gray-300 mb-3 backdrop-blur-md">
          <span>Marvel Cinematic Universe</span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
          <span>Phase 1 - 5 Archive</span>
        </div>
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-3 tracking-wide drop-shadow-md"
          style={{ fontFamily: 'Avengers' }}
        >
          Marvel Movies Vault
        </h2>
        <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-xl mx-auto">
          Explore blockbuster films across the Infinity Saga and Multiverse Saga. Filter by Phase or search by title.
        </p>
      </div>

      {/* Filter and Search Bar Controls */}
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        {/* Phase Filter Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 max-w-full hide-scrollbar">
          {PHASES.map((phase) => (
            <button
              key={phase}
              onClick={() => setSelectedPhase(phase)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 border whitespace-nowrap ${
                selectedPhase === phase
                  ? 'bg-white text-black border-white shadow-lg scale-105'
                  : 'bg-black/30 hover:bg-white/10 text-gray-300 border-white/15'
              }`}
            >
              {phase}
            </button>
          ))}
        </div>

        {/* Live Movie Search */}
        <div className="w-full md:w-64 relative">
          <input
            type="text"
            placeholder="Search movie or hero..."
            value={movieQuery}
            onChange={(e) => setMovieQuery(e.target.value)}
            className="w-full bg-black/40 border border-white/20 focus:border-white/50 text-white placeholder-gray-400 text-xs sm:text-sm rounded-full px-4 py-2 outline-none backdrop-blur-md transition-all shadow-inner"
          />
          {movieQuery && (
            <button
              onClick={() => setMovieQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Movies Grid */}
      {filteredMovies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5 w-full">
          {filteredMovies.map((movie) => (
            <div
              key={movie.id}
              className="group bg-black/40 hover:bg-black/60 rounded-2xl p-3 flex flex-col justify-between border border-white/10 hover:border-white/30 transition-all duration-300 backdrop-blur-md shadow-xl hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="w-full overflow-hidden rounded-xl bg-black/60 aspect-[2/3] relative mb-2.5">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[10px] font-bold text-white border border-white/20">
                  {movie.year}
                </span>
              </div>

              <div className="flex flex-col flex-1 justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-0.5">
                    {movie.phase}
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-white leading-tight line-clamp-2 group-hover:text-amber-300 transition-colors">
                    {movie.title}
                  </h3>
                </div>

                <p className="text-[11px] text-gray-400 mt-1.5 line-clamp-2 leading-relaxed font-normal">
                  {movie.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-12 text-center text-gray-400 bg-black/20 border border-white/10 rounded-2xl w-full max-w-md">
          <p className="text-sm font-medium">No movies found matching "{movieQuery}".</p>
          <button
            onClick={() => { setMovieQuery(''); setSelectedPhase('All'); }}
            className="mt-3 px-4 py-1.5 text-xs bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/20"
          >
            Clear Filters
          </button>
        </div>
      )}
    </section>
  );
};

export default Movies;