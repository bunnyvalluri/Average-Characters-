import React from 'react';

const Movies = () => {
  return (
    <section className="w-full max-w-6xl mx-auto my-8 px-4 sm:px-8" id="movies-section">
      <div className="w-full flex flex-col items-center py-10 sm:py-14 px-4 sm:px-10 bg-black/80 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl text-white">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-center text-white" style={{ fontFamily: 'Avengers' }}>
          Movies Section
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-gray-200 max-w-2xl text-center mb-6 sm:mb-8 leading-relaxed">
          Explore the Marvel Cinematic Universe and beyond! Here you can add a list, grid, or gallery of all movies, filter by character, or show movie posters and details. This is a placeholder for your movies content.
        </p>
        {/* Movies Cards Container */}
        <div className="w-full flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8">
          {/* Example movie poster card */}
          <div className="bg-[#18181b] rounded-xl shadow-lg p-3 sm:p-4 w-36 sm:w-44 md:w-48 flex flex-col items-center border border-white/20 hover:scale-105 transition-transform">
            <img src="/marvel.png" alt="The Avengers" className="w-28 sm:w-32 h-36 sm:h-44 object-cover rounded mb-2" loading="lazy" />
            <span className="text-base sm:text-lg font-bold mt-1 text-center text-white">Marvel</span>
            <span className="text-xs sm:text-sm text-yellow-400 font-medium">2002-2019</span>
          </div>
        </div>
        <p className="text-sm sm:text-base text-gray-300 max-w-2xl text-center mt-6 sm:mt-8">
          We will update this section with list of movies soon!
        </p>
      </div>
    </section>
  );
};

export default Movies;