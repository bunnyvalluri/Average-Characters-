// src/components/Movies.jsx
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { mcuMoviesCatalog } from '../assets/timelineData';
import { useColorTheme } from '../ColorThemeContext';

const PHASES = ['All', 'Phase 1', 'Phase 2', 'Phase 3', 'Phase 4', 'Phase 5'];

const Movies = () => {
  const [selectedPhase, setSelectedPhase] = useState('All');
  const [movieQuery, setMovieQuery] = useState('');
  const [activeTrailerMovie, setActiveTrailerMovie] = useState(null);
  const { color } = useColorTheme();

  // Close trailer modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveTrailerMovie(null);
      }
    };
    if (activeTrailerMovie) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [activeTrailerMovie]);

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

  const openTrailer = useCallback((movie) => {
    setActiveTrailerMovie(movie);
  }, []);

  const closeTrailer = useCallback(() => {
    setActiveTrailerMovie(null);
  }, []);

  return (
    <section
      id="movies-section"
      className="w-full flex flex-col items-center py-12 sm:py-16 px-4 sm:px-8 max-w-7xl mx-auto scroll-mt-20"
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-gray-300 mb-3 backdrop-blur-md">
          <span>Marvel Cinematic Universe</span>
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
          <span>Official HD Trailers Available</span>
        </div>
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-3 tracking-wide drop-shadow-md"
          style={{ fontFamily: 'Avengers' }}
        >
          Marvel Movies Vault
        </h2>
        <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-xl mx-auto">
          Explore blockbuster films across Phase 1 to Phase 5. Click on any movie card to watch its official HD trailer!
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
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 border whitespace-nowrap cursor-pointer ${
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

      {/* Movies Grid with Trailer Action */}
      {filteredMovies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5 w-full">
          {filteredMovies.map((movie) => (
            <div
              key={movie.id}
              onClick={() => openTrailer(movie)}
              className="group bg-black/40 hover:bg-black/60 rounded-2xl p-3 flex flex-col justify-between border border-white/10 hover:border-white/35 transition-all duration-300 backdrop-blur-md shadow-xl hover:-translate-y-1.5 hover:shadow-2xl cursor-pointer select-none"
            >
              {/* Poster Container with Play Icon Overlay */}
              <div className="w-full overflow-hidden rounded-xl bg-black/60 aspect-[2/3] relative mb-2.5">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                
                {/* Year Badge */}
                <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md text-[10px] font-bold text-white border border-white/20 z-10">
                  {movie.year}
                </span>

                {/* Hover Play Button Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center backdrop-blur-[2px]">
                  <div className="w-12 h-12 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-2xl transform scale-75 group-hover:scale-100 transition-transform duration-200 border border-white/40">
                    <svg className="w-6 h-6 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Card Meta & Trailer Button */}
              <div className="flex flex-col flex-1 justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-0.5">
                    {movie.phase}
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-white leading-tight line-clamp-2 group-hover:text-amber-300 transition-colors">
                    {movie.title}
                  </h3>
                </div>

                <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] text-gray-400 font-medium truncate">
                    {movie.hero}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] text-red-400 font-semibold group-hover:text-red-300">
                    <span>Trailer</span>
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </div>
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

      {/* Official HD Trailer Modal */}
      {activeTrailerMovie && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-fadeIn"
          onClick={closeTrailer}
        >
          <div
            className="relative w-full max-w-4xl bg-[#121218] border border-white/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col transform transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-white/5">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-600 text-white uppercase tracking-wider">
                  Official Trailer
                </span>
                <h3 className="text-base sm:text-xl font-bold text-white truncate max-w-md sm:max-w-xl">
                  {activeTrailerMovie.title} ({activeTrailerMovie.year})
                </h3>
              </div>
              <button
                onClick={closeTrailer}
                className="p-2 text-gray-400 hover:text-white rounded-full bg-white/5 hover:bg-white/15 transition-colors"
                aria-label="Close trailer modal"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* 16:9 HD Video Container */}
            <div className="relative w-full bg-black aspect-video">
              {activeTrailerMovie.trailerId ? (
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${activeTrailerMovie.trailerId}?autoplay=1&rel=0&modestbranding=1`}
                  title={`${activeTrailerMovie.title} Official Trailer`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 p-6 text-center">
                  <p className="text-base font-semibold text-white mb-2">Trailer Preview Unavailable</p>
                  <p className="text-sm">Please check back soon for the official trailer stream.</p>
                </div>
              )}
            </div>

            {/* Modal Footer Description */}
            <div className="p-4 sm:p-5 bg-black/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-white/10">
              <div className="flex-1">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
                  {activeTrailerMovie.phase} • Starring {activeTrailerMovie.hero}
                </span>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal">
                  {activeTrailerMovie.description}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto justify-end">
                {activeTrailerMovie.trailerId && (
                  <a
                    href={`https://www.youtube.com/watch?v=${activeTrailerMovie.trailerId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-red-600/90 hover:bg-red-600 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-md active:scale-95"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    <span>Watch on YouTube</span>
                  </a>
                )}
                <button
                  onClick={closeTrailer}
                  className="px-4 py-2 bg-white text-black font-semibold text-xs sm:text-sm rounded-xl hover:bg-gray-200 transition-colors flex-shrink-0 cursor-pointer"
                >
                  Done Watching
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Movies;