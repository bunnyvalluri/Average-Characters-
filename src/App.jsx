// src/App.jsx
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { ColorThemeProvider, useColorTheme } from './ColorThemeContext';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Timeline from './components/Timeline';
import Movies from './components/Movies';
import { useState, useRef, useEffect } from 'react';
import characters from './assets/characters';

function Home() {
  const [currentCharacterIdx, setCurrentCharacterIdx] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const currentCharacter = characters[currentCharacterIdx] || characters[0];
  const { color } = useColorTheme();

  // Scroll position listener for Back-to-Top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTimeline = () => {
    const el = document.getElementById('timeline-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToMovies = () => {
    const el = document.getElementById('movies-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearchCharacter = (name) => {
    const query = name.toLowerCase().trim();
    const index = characters.findIndex((char) =>
      char.name.toLowerCase().includes(query) ||
      (char.originalName && char.originalName.toLowerCase().includes(query))
    );
    if (index !== -1) {
      setCurrentCharacterIdx(index);
      scrollToTop();
    } else {
      alert(`Character "${name}" was not found in the Avengers roster.`);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0e15] text-white flex flex-col justify-between selection:bg-red-600 selection:text-white">
      {/* Navigation */}
      <Navbar
        onHomeClick={scrollToTop}
        onTimelineClick={scrollToTimeline}
        onMoviesClick={scrollToMovies}
        onSearchCharacter={handleSearchCharacter}
      />

      {/* Main Content Area */}
      <main className="pt-16 sm:pt-20 flex-1 flex flex-col">
        {/* Hero Section */}
        <HeroSection
          currentCharacter={currentCharacter}
          setCurrentCharacterIdx={setCurrentCharacterIdx}
          currentCharacterIdx={currentCharacterIdx}
          characters={characters}
          onExploreTimeline={scrollToTimeline}
          onExploreMovies={scrollToMovies}
        />

        {/* Timeline Section */}
        <Timeline character={currentCharacter} />

        {/* MCU Movies Section */}
        <Movies onSelectCharacter={handleSearchCharacter} />
      </main>

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          style={{
            backgroundColor: color || '#e50914',
            boxShadow: `0 4px 20px ${color || '#e50914'}88`,
          }}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full text-white hover:scale-110 active:scale-95 transition-all duration-300 border border-white/20 cursor-pointer backdrop-blur-md"
          aria-label="Back to top"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}

      {/* Footer */}
      <footer>
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center space-x-2">
            <img src="/avengers.png" alt="Avengers" className="h-6 w-auto object-contain" />
            <span className="font-[Avengers] text-base text-gray-300">AVENGERS ARCHIVE</span>
          </div>
          <p className="text-gray-400 text-center">
            Designed with Marvel Cinematic Universe Data. All trademarks and characters belong to Marvel Studios.
          </p>
          <div className="text-gray-300">
            © 2025{' '}
            <a
              href="https://valluri-rahul-portfolio.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-yellow-400 font-semibold transition-colors underline decoration-dotted decoration-white/40 hover:decoration-yellow-400"
            >
              VALLURI RAHUL
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Landing() {
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const [muted, setMuted] = useState(true);

  const handleVideoEnd = () => {
    navigate("/home");
  };

  const handleEnterClick = () => {
    navigate("/home");
  };

  const handleMuteToggle = () => {
    setMuted((prev) => {
      const nextState = !prev;
      if (videoRef.current) {
        videoRef.current.muted = nextState;
      }
      return nextState;
    });
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current
        .play()
        .catch((err) => console.warn("Autoplay blocked:", err));
      videoRef.current.muted = muted;
    }
  }, [muted]);

  return (
    <div className="relative w-full h-screen font-sans overflow-hidden bg-black flex items-center justify-center">
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/landing.mp4"
        autoPlay
        muted={muted}
        playsInline
        controls={false}
        disablePictureInPicture
        loop={false}
        onEnded={handleVideoEnd}
      />

      {/* Subtle Dark Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60 pointer-events-none z-10" />

      {/* Mute/Unmute Control (Top Left Safe Area) */}
      <div className="absolute top-4 sm:top-8 left-4 sm:left-8 z-20">
        <button
          type="button"
          onClick={handleMuteToggle}
          className="p-3 sm:p-3.5 bg-black/40 hover:bg-black/60 active:scale-95 backdrop-blur-xl rounded-2xl border border-white/15 transition-all text-white cursor-pointer shadow-xl flex items-center justify-center"
          aria-label={muted ? 'Unmute video' : 'Mute video'}
        >
          {muted ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 9v6h4l5 5V4l-5 5H9z" />
              <line x1="19" y1="5" x2="5" y2="19" stroke="currentColor" strokeWidth="2" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 5.25L6 9H3.75A.75.75 0 003 9.75v4.5c0 .414.336.75.75.75H6l5.25 3.75V5.25zM16.5 8.25a6 6 0 010 7.5M19.5 6a9 9 0 010 12" />
            </svg>
          )}
        </button>
      </div>

      {/* Skip Button (Top Right Safe Area) */}
      <div className="absolute top-4 sm:top-8 right-4 sm:right-8 z-20">
        <button
          type="button"
          onClick={handleEnterClick}
          className="px-4 sm:px-6 py-2.5 sm:py-3 bg-black/40 hover:bg-black/70 active:scale-95 backdrop-blur-xl rounded-2xl border border-white/20 text-white text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all shadow-xl cursor-pointer flex items-center space-x-2"
        >
          <span>Skip Intro</span>
          <span>→</span>
        </button>
      </div>

      {/* Centered Mobile/Desktop Action Prompt */}
      <div className="relative z-20 text-center px-4 max-w-lg mt-auto pb-12 sm:pb-16 animate-in fade-in slide-in-from-bottom-6 duration-700">
        <div className="mb-4">
          <span className="font-[Avengers] text-3xl sm:text-5xl lg:text-6xl text-white tracking-widest block drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
            AVENGERS
          </span>
          <span className="text-xs sm:text-sm text-gray-300 font-medium tracking-widest uppercase mt-1 block">
            Character Archives & Cinematic Timeline
          </span>
        </div>

        <button
          type="button"
          onClick={handleEnterClick}
          className="px-8 py-3.5 bg-red-600 hover:bg-red-500 active:scale-95 text-white font-bold text-sm sm:text-base rounded-2xl shadow-[0_0_30px_rgba(220,38,38,0.7)] transition-all cursor-pointer uppercase tracking-wider font-[Avengers] flex items-center justify-center space-x-2 mx-auto"
        >
          <span>Enter Universe</span>
          <span>⚡</span>
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ColorThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </ColorThemeProvider>
  );
}
