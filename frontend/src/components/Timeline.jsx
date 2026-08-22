// src/components/Timeline.jsx
import React, { memo, useState, useEffect, useCallback } from 'react';
import { moviePosters, characterMovieTimeline, movieEvents, movieTrailers } from '../assets/timelineData';
import MarvelImage from './MarvelImage';

const TimelineCard = memo(({ movie, isLeft, index, sectionType, color, fontFamily, onPlayTrailer, defaultTrailerId }) => {
  const posterSrc = moviePosters[movie.title] || '/avengers.png';
  const eventDesc = movieEvents[movie.title];
  const trailerId = movieTrailers[movie.title] || defaultTrailerId || 'TcMBFSGVi1c';

  return (
    <div className="w-full relative mb-8 sm:mb-12">
      {/* Desktop Layout (md and up): Alternating Left/Right */}
      <div className="hidden md:flex justify-between items-center w-full relative">
        {/* Left Slot */}
        {isLeft ? (
          <div className="flex flex-row-reverse items-center gap-4 md:gap-6 max-w-[44%] text-right pr-4 z-10 w-full">
            <div className="flex flex-col items-end w-full group">
              <div
                onClick={() => trailerId && onPlayTrailer(movie.title, trailerId)}
                className={`relative overflow-hidden rounded-xl shadow-xl border-2 border-white/30 bg-black/40 mb-3 transition-all duration-300 group-hover:scale-105 ${
                  trailerId ? 'cursor-pointer' : ''
                }`}
              >
                <MarvelImage
                  src={posterSrc}
                  alt={movie.title}
                  priority={index < 4}
                  className="w-24 sm:w-28 md:w-32 h-auto max-h-44 object-cover"
                  containerClassName="w-24 sm:w-28 md:w-32 h-36 sm:h-40 md:h-44"
                  skeletonClassName="rounded-xl"
                />
                {trailerId && (
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-9 h-9 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg border border-white/40">
                      <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>

              <span
                className="text-lg md:text-xl lg:text-2xl font-bold leading-snug text-white drop-shadow-sm"
                style={{ fontFamily }}
              >
                {movie.title}
              </span>

              <div className="flex items-center gap-2 mt-1">
                <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/15 text-white border border-white/20">
                  {movie.year}
                </span>
                {trailerId && (
                  <button
                    onClick={() => onPlayTrailer(movie.title, trailerId)}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-red-600/80 hover:bg-red-600 text-white border border-red-400/40 cursor-pointer transition-all active:scale-95 shadow-sm"
                  >
                    <span>▶ Trailer</span>
                  </button>
                )}
              </div>

              {eventDesc && (
                <p className="text-xs md:text-sm text-gray-300 italic mt-2 leading-relaxed max-w-sm">
                  {eventDesc}
                </p>
              )}
              {movie.note && (
                <span className="text-[11px] text-yellow-300/90 italic mt-1 font-medium">
                  ★ {movie.note}
                </span>
              )}
            </div>
          </div>
        ) : (
          <div className="max-w-[44%] w-full" />
        )}

        {/* Central Node on Desktop */}
        <div
          className="absolute left-1/2 -translate-x-1/2 w-7 h-7 md:w-8 md:h-8 rounded-full border-4 border-white shadow-xl z-20 flex items-center justify-center transition-transform duration-200 hover:scale-125"
          style={{
            backgroundColor: sectionType === 'mcu' ? color : '#71717a',
            boxShadow: `0 0 16px ${sectionType === 'mcu' ? color : '#71717a'}, 0 2px 10px rgba(0,0,0,0.5)`,
          }}
        >
          <span className="block w-2.5 h-2.5 bg-white rounded-full"></span>
        </div>

        {/* Right Slot */}
        {!isLeft ? (
          <div className="flex flex-row items-center gap-4 md:gap-6 max-w-[44%] text-left pl-4 z-10 w-full">
            <div className="flex flex-col items-start w-full group">
              <div
                onClick={() => trailerId && onPlayTrailer(movie.title, trailerId)}
                className={`relative overflow-hidden rounded-xl shadow-xl border-2 border-white/30 bg-black/40 mb-3 transition-all duration-300 group-hover:scale-105 ${
                  trailerId ? 'cursor-pointer' : ''
                }`}
              >
                <MarvelImage
                  src={posterSrc}
                  alt={movie.title}
                  priority={index < 4}
                  className="w-24 sm:w-28 md:w-32 h-auto max-h-44 object-cover"
                  containerClassName="w-24 sm:w-28 md:w-32 h-36 sm:h-40 md:h-44"
                  skeletonClassName="rounded-xl"
                />
                {trailerId && (
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-9 h-9 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg border border-white/40">
                      <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>

              <span
                className="text-lg md:text-xl lg:text-2xl font-bold leading-snug text-white drop-shadow-sm"
                style={{ fontFamily }}
              >
                {movie.title}
              </span>

              <div className="flex items-center gap-2 mt-1">
                <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/15 text-white border border-white/20">
                  {movie.year}
                </span>
                {trailerId && (
                  <button
                    onClick={() => onPlayTrailer(movie.title, trailerId)}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-red-600/80 hover:bg-red-600 text-white border border-red-400/40 cursor-pointer transition-all active:scale-95 shadow-sm"
                  >
                    <span>▶ Trailer</span>
                  </button>
                )}
              </div>

              {eventDesc && (
                <p className="text-xs md:text-sm text-gray-300 italic mt-2 leading-relaxed max-w-sm">
                  {eventDesc}
                </p>
              )}
              {movie.note && (
                <span className="text-[11px] text-yellow-300/90 italic mt-1 font-medium">
                  ★ {movie.note}
                </span>
              )}
            </div>
          </div>
        ) : (
          <div className="max-w-[44%] w-full" />
        )}
      </div>

      {/* Mobile Layout (< md): Single column with line on left */}
      <div className="flex md:hidden items-start relative pl-8 sm:pl-10 w-full">
        {/* Node on left */}
        <span
          className="absolute left-1 top-4 w-5 h-5 rounded-full border-2 border-white shadow-md z-20 flex items-center justify-center"
          style={{
            backgroundColor: sectionType === 'mcu' ? color : '#71717a',
            boxShadow: `0 0 10px ${sectionType === 'mcu' ? color : '#71717a'}`,
          }}
        >
          <span className="block w-1.5 h-1.5 bg-white rounded-full"></span>
        </span>

        {/* Mobile Content Card */}
        <div className="flex flex-row items-start gap-3 sm:gap-4 bg-black/40 border border-white/15 p-3.5 sm:p-4 rounded-2xl w-full backdrop-blur-md shadow-lg">
          <div
            onClick={() => trailerId && onPlayTrailer(movie.title, trailerId)}
            className="relative flex-shrink-0 cursor-pointer"
          >
            <MarvelImage
              src={posterSrc}
              alt={movie.title}
              priority={index < 3}
              className="w-16 sm:w-20 h-auto max-h-28 object-cover rounded-lg shadow-md border border-white/20"
              containerClassName="w-16 sm:w-20 h-24 sm:h-28"
              skeletonClassName="rounded-lg"
            />
            {trailerId && (
              <span className="absolute bottom-1 right-1 bg-red-600 text-white p-1 rounded-full shadow">
                <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            )}
          </div>

          <div className="flex flex-col items-start min-w-0 flex-1">
            <span
              className="text-base sm:text-lg font-bold leading-tight break-words text-white"
              style={{ fontFamily }}
            >
              {movie.title}
            </span>
            <div className="flex items-center gap-2 mt-1">
              <span className="inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-white/10 text-gray-200">
                {movie.year}
              </span>
              {trailerId && (
                <button
                  onClick={() => onPlayTrailer(movie.title, trailerId)}
                  className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-600 text-white"
                >
                  ▶ Watch Trailer
                </button>
              )}
            </div>
            {eventDesc && (
              <p className="text-xs text-gray-300 italic mt-1.5 leading-relaxed">
                {eventDesc}
              </p>
            )}
            {movie.note && (
              <span className="text-[10px] text-yellow-300/90 italic mt-1 font-medium">
                ★ {movie.note}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

TimelineCard.displayName = 'TimelineCard';

const Timeline = ({ character }) => {
  const [activeTrailer, setActiveTrailer] = useState(null);

  const timelineData = character ? (characterMovieTimeline[character.name] || { beforeMCU: [], mcu: [] }) : { beforeMCU: [], mcu: [] };
  const beforeMCUMovies = timelineData.beforeMCU || [];
  const mcuMovies = timelineData.mcu || [];
  const color = character?.bgColor || '#b71c1c';
  const fontFamily = character?.fontFamily || 'Avengers';

  const totalAppearances = beforeMCUMovies.length + mcuMovies.length;

  const handlePlayTrailer = useCallback((title, trailerId) => {
    setActiveTrailer({ title, trailerId });
  }, []);

  const handleCloseTrailer = useCallback(() => {
    setActiveTrailer(null);
  }, []);

  // Escape key support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveTrailer(null);
      }
    };
    if (activeTrailer) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [activeTrailer]);

  if (!character) return null;

  return (
    <section
      id="timeline-section"
      className="w-full flex justify-center py-12 sm:py-16 px-3 sm:px-6 md:px-10 scroll-mt-20 z-10"
    >
      <div className="w-full max-w-4xl bg-[#0d0d14]/95 border border-white/15 rounded-3xl p-5 sm:p-8 md:p-10 shadow-[0_15px_35px_rgba(0,0,0,0.6)] relative">
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center mb-8 sm:mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-gray-300 mb-3 backdrop-blur-md">
            <span>Filmography Timeline Archive</span>
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span>{totalAppearances} {totalAppearances === 1 ? 'Movie' : 'Cinematic Appearances'}</span>
          </div>

          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-wide text-white drop-shadow-md"
            style={{ fontFamily }}
          >
            {character.name} Timeline
          </h2>
          <p className="text-gray-300 text-xs sm:text-sm mt-2 max-w-lg leading-relaxed">
            Chronological cinematic journey and pivotal franchise events. Click any movie card or trailer button to stream official trailers.
          </p>
        </div>

        {/* Timeline Line Container */}
        <div className="relative flex flex-col items-center w-full min-h-[120px]">
          {/* Vertical Central Line on Desktop */}
          <div
            className="hidden md:block absolute left-1/2 top-4 bottom-4 -translate-x-1/2 w-0.5 bg-gradient-to-b from-white/40 via-white/25 to-transparent z-0"
          />

          {/* Vertical Line on Mobile */}
          <div
            className="md:hidden absolute left-3.5 top-4 bottom-4 w-0.5 bg-gradient-to-b from-white/40 via-white/25 to-transparent z-0"
          />

          {/* Before MCU Section */}
          {beforeMCUMovies.length > 0 && (
            <div className="w-full flex flex-col items-center mb-8">
              <div className="px-4 py-1.5 rounded-full bg-zinc-800/90 border border-white/20 text-xs sm:text-sm font-bold text-gray-200 mb-8 uppercase tracking-wider shadow-lg backdrop-blur-md">
                Classic Era / Pre-MCU Appearances
              </div>
              <div className="w-full">
                {beforeMCUMovies.map((movie, idx) => (
                  <TimelineCard
                    key={`before-${movie.title}-${movie.year}-${idx}`}
                    movie={movie}
                    isLeft={idx % 2 === 0}
                    index={idx}
                    sectionType="beforeMCU"
                    color={color}
                    fontFamily={fontFamily}
                    onPlayTrailer={handlePlayTrailer}
                    defaultTrailerId={character?.trailerId}
                  />
                ))}
              </div>
              <div className="w-3/4 border-t border-white/15 my-6 sm:my-8" />
            </div>
          )}

          {/* MCU Appearances Section */}
          {mcuMovies.length > 0 ? (
            <div className="w-full flex flex-col items-center">
              <div
                className="px-4 py-1.5 rounded-full border text-xs sm:text-sm font-bold uppercase tracking-wider mb-8 shadow-xl text-white backdrop-blur-md"
                style={{
                  backgroundColor: `${color}cc`,
                  borderColor: 'rgba(255, 255, 255, 0.4)',
                }}
              >
                Marvel Cinematic Universe (MCU)
              </div>
              <div className="w-full">
                {mcuMovies.map((movie, idx) => (
                  <TimelineCard
                    key={`mcu-${movie.title}-${movie.year}-${idx}`}
                    movie={movie}
                    isLeft={idx % 2 === 0}
                    index={idx}
                    sectionType="mcu"
                    color={color}
                    fontFamily={fontFamily}
                    onPlayTrailer={handlePlayTrailer}
                    defaultTrailerId={character?.trailerId}
                  />
                ))}
              </div>
            </div>
          ) : beforeMCUMovies.length === 0 ? (
            <div className="bg-black/40 border border-white/10 rounded-2xl p-8 text-center text-sm text-gray-300 max-w-md my-4 backdrop-blur-md">
              <p>No cinematic appearances recorded for this character yet.</p>
            </div>
          ) : null}
        </div>
      </div>

      {/* Timeline Trailer Modal */}
      {activeTrailer && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-fadeIn"
          onClick={handleCloseTrailer}
        >
          <div
            className="relative w-full max-w-4xl bg-[#121218] border border-white/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-white/5">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-600 text-white uppercase tracking-wider">
                  Official Trailer
                </span>
                <h3 className="text-base sm:text-xl font-bold text-white truncate max-w-md sm:max-w-xl">
                  {activeTrailer.title}
                </h3>
              </div>
              <button
                onClick={handleCloseTrailer}
                className="p-2 text-gray-400 hover:text-white rounded-full bg-white/5 hover:bg-white/15 transition-colors"
                aria-label="Close trailer modal"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="relative w-full bg-black aspect-video">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${activeTrailer.trailerId}?autoplay=1&rel=0&modestbranding=1`}
                title={`${activeTrailer.title} Official Trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            <div className="p-4 bg-black/40 flex items-center justify-between gap-3 border-t border-white/10">
              <span className="text-xs text-gray-300 font-medium">
                {activeTrailer.title} — Official Marvel Cinematic Universe Trailer
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={`https://www.youtube.com/watch?v=${activeTrailer.trailerId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-600/90 hover:bg-red-600 text-white font-semibold text-xs rounded-xl transition-all shadow-md active:scale-95"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  <span>Watch on YouTube</span>
                </a>
                <button
                  onClick={handleCloseTrailer}
                  className="px-3.5 py-1.5 bg-white text-black font-semibold text-xs rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default memo(Timeline);
