// src/components/Timeline.jsx
import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { moviePosters, characterMovieTimeline, movieEvents } from '../assets/timelineData';

const TimelineCard = memo(({ movie, isLeft, index, sectionType, color, fontFamily }) => {
  const posterSrc = moviePosters[movie.title] || '/avengers.png';
  const eventDesc = movieEvents[movie.title];

  return (
    <div className="w-full relative mb-8 sm:mb-12">
      {/* Desktop Layout (md and up): Alternating Left/Right */}
      <div className="hidden md:flex justify-between items-center w-full relative">
        {/* Left Slot */}
        {isLeft ? (
          <div className="flex flex-row-reverse items-center gap-4 md:gap-6 max-w-[44%] text-right pr-4 z-10 w-full">
            <div className="flex flex-col items-end w-full group">
              <div className="relative overflow-hidden rounded-xl shadow-xl border-2 border-white/30 bg-black/40 mb-3 transition-transform duration-300 group-hover:scale-105">
                <img
                  src={posterSrc}
                  alt={movie.title}
                  loading="lazy"
                  decoding="async"
                  className="w-24 sm:w-28 md:w-32 h-auto max-h-44 object-cover"
                />
              </div>
              <span
                className="text-lg md:text-xl lg:text-2xl font-bold leading-snug text-white drop-shadow-sm"
                style={{ fontFamily }}
              >
                {movie.title}
              </span>
              <span className="inline-block px-2.5 py-0.5 mt-1 rounded-full text-xs font-bold bg-white/15 text-white border border-white/20">
                {movie.year}
              </span>
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
              <div className="relative overflow-hidden rounded-xl shadow-xl border-2 border-white/30 bg-black/40 mb-3 transition-transform duration-300 group-hover:scale-105">
                <img
                  src={posterSrc}
                  alt={movie.title}
                  loading="lazy"
                  decoding="async"
                  className="w-24 sm:w-28 md:w-32 h-auto max-h-44 object-cover"
                />
              </div>
              <span
                className="text-lg md:text-xl lg:text-2xl font-bold leading-snug text-white drop-shadow-sm"
                style={{ fontFamily }}
              >
                {movie.title}
              </span>
              <span className="inline-block px-2.5 py-0.5 mt-1 rounded-full text-xs font-bold bg-white/15 text-white border border-white/20">
                {movie.year}
              </span>
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
          <img
            src={posterSrc}
            alt={movie.title}
            loading="lazy"
            decoding="async"
            className="w-16 sm:w-20 h-auto max-h-28 object-cover rounded-lg shadow-md border border-white/20 flex-shrink-0"
          />
          <div className="flex flex-col items-start min-w-0 flex-1">
            <span
              className="text-base sm:text-lg font-bold leading-tight break-words text-white"
              style={{ fontFamily }}
            >
              {movie.title}
            </span>
            <span className="inline-block px-2 py-0.5 mt-1 rounded text-[11px] font-semibold bg-white/10 text-gray-200">
              {movie.year}
            </span>
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
  if (!character) return null;

  const timelineData = characterMovieTimeline[character.name] || { beforeMCU: [], mcu: [] };
  const beforeMCUMovies = timelineData.beforeMCU || [];
  const mcuMovies = timelineData.mcu || [];
  const color = character.bgColor || '#b71c1c';
  const fontFamily = character.fontFamily || 'Avengers';

  const totalAppearances = beforeMCUMovies.length + mcuMovies.length;

  return (
    <section
      id="timeline-section"
      className="w-full flex justify-center py-10 sm:py-16 px-3 sm:px-6 md:px-10 scroll-mt-20"
    >
      <div className="w-full max-w-4xl relative">
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center mb-8 sm:mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-gray-300 mb-3 backdrop-blur-md">
            <span>Filmography Timeline</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            <span>{totalAppearances} Total {totalAppearances === 1 ? 'Movie' : 'Movies'}</span>
          </div>

          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-wide text-white drop-shadow-md"
            style={{ fontFamily }}
          >
            {character.name} Timeline
          </h2>
          <p className="text-gray-300 text-xs sm:text-sm md:text-base mt-2 max-w-lg">
            Chronological cinematic journey and key pivotal events across Marvel sagas.
          </p>
        </div>

        {/* Timeline Line Container */}
        <div className="relative flex flex-col items-center w-full min-h-[120px]">
          {/* Vertical Central Line on Desktop */}
          <div
            className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 h-full w-1 bg-gradient-to-b from-white/30 via-white/20 to-transparent z-0"
          />

          {/* Vertical Line on Mobile */}
          <div
            className="md:hidden absolute left-3.5 top-0 h-full w-0.5 bg-gradient-to-b from-white/30 via-white/20 to-transparent z-0"
          />

          {/* Before MCU Section */}
          {beforeMCUMovies.length > 0 && (
            <div className="w-full flex flex-col items-center mb-8">
              <div className="px-4 py-1.5 rounded-full bg-zinc-800 border border-white/20 text-xs sm:text-sm font-bold text-gray-300 mb-8 uppercase tracking-wider shadow-lg">
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
                  />
                ))}
              </div>
            </div>
          ) : beforeMCUMovies.length === 0 ? (
            <div className="bg-black/30 border border-white/10 rounded-2xl p-8 text-center text-sm sm:text-base text-gray-300 max-w-md my-4">
              <p>No cinematic appearances recorded for this character yet.</p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default memo(Timeline);
