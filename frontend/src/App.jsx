// src/App.jsx
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { ColorThemeProvider } from './ColorThemeContext';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Timeline from './components/Timeline';
import Movies from './components/Movies';
import { useState, useRef, useCallback, useEffect } from 'react';
import characters from './assets/characters';

function Home() {
  const [currentCharacterIdx, setCurrentCharacterIdx] = useState(0);
  const currentCharacter = characters[currentCharacterIdx] || characters[0];

  // Refs for smooth navigation
  const heroRef = useRef(null);
  const timelineRef = useRef(null);
  const moviesRef = useRef(null);

  // Ensure scroll is at top on mount so character image is visible first
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Smooth scroll handlers
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const scrollToTimeline = useCallback(() => {
    const el = document.getElementById('timeline-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const scrollToMovies = useCallback(() => {
    const el = document.getElementById('movies-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleSearchCharacter = useCallback((name) => {
    const index = characters.findIndex((char) =>
      char.name.toLowerCase().includes(name.toLowerCase()) ||
      (char.originalName && char.originalName.toLowerCase().includes(name.toLowerCase()))
    );
    if (index !== -1) {
      setCurrentCharacterIdx(index);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, []);

  return (
    <div className="min-h-screen text-white w-full overflow-x-hidden flex flex-col justify-between">
      <Navbar
        onHomeClick={scrollToTop}
        onTimelineClick={scrollToTimeline}
        onMoviesClick={scrollToMovies}
        onSearchCharacter={handleSearchCharacter}
      />
      <main className="pt-20 sm:pt-22 md:pt-24 w-full flex-1 flex flex-col">
        <div ref={heroRef} />
        <HeroSection
          currentCharacter={currentCharacter}
          setCurrentCharacterIdx={setCurrentCharacterIdx}
          currentCharacterIdx={currentCharacterIdx}
          characters={characters}
        />
        <div ref={timelineRef} />
        <Timeline character={currentCharacter} />
        <div ref={moviesRef} />
        <Movies />
      </main>
      <footer className="w-full text-center py-6 px-4 text-xs sm:text-sm text-gray-300 bg-black/60 backdrop-blur-md border-t border-white/10 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-400">
            Marvel Characters & Cinematic Universe Explorer
          </p>
          <p className="text-gray-400">
            Created with passion by{' '}
            <a
              href="https://valluri-rahul-portfolio.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-white font-semibold hover:text-cyan-300 transition-colors"
            >
              VALLURI RAHUL
            </a>
            {' '}• 2026
          </p>
        </div>
      </footer>
    </div>
  );
}

function Landing() {
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const [muted, setMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleVideoEnd = useCallback(() => {
    navigate("/home");
  }, [navigate]);

  const handleEnterClick = useCallback(() => {
    navigate("/home");
  }, [navigate]);

  const handleMuteToggle = useCallback(() => {
    setMuted((prev) => {
      const next = !prev;
      if (videoRef.current) {
        videoRef.current.muted = next;
      }
      return next;
    });
  }, []);

  const handleManualPlay = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => console.warn("Play error:", err));
    }
  }, []);

  return (
    <div className="relative w-full h-[100dvh] min-h-[100dvh] font-sans overflow-hidden bg-black flex items-center justify-center">
      <video
        ref={videoRef}
        className="w-full h-full object-contain md:object-cover z-0 select-none pointer-events-none"
        autoPlay
        muted={muted}
        playsInline
        webkit-playsinline="true"
        preload="auto"
        controls={false}
        disablePictureInPicture
        disableRemotePlayback
        loop={false}
        onEnded={handleVideoEnd}
        onPlay={() => setIsPlaying(true)}
        style={{ transform: 'translateZ(0)', willChange: 'transform' }}
      >
        <source src="/landing-mobile.mp4" type="video/mp4" media="(max-width: 768px)" />
        <source src="/landing.mp4" type="video/mp4" />
      </video>

      {/* Tap to play overlay fallback for mobile */}
      {!isPlaying && (
        <div
          onClick={handleManualPlay}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/60 cursor-pointer backdrop-blur-sm"
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/20 hover:bg-white/30 border border-white/40 flex items-center justify-center text-white transition-all transform active:scale-95 shadow-2xl">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <span className="text-white text-sm sm:text-base font-semibold mt-4 tracking-wider uppercase drop-shadow-md">
            Tap to Play Video
          </span>
        </div>
      )}

      {/* Skip button top right */}
      <div className="absolute top-4 sm:top-8 right-4 sm:right-8 z-20">
        <button
          onClick={handleEnterClick}
          className="px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm md:text-base font-bold bg-black/70 hover:bg-black/90 text-white border border-white/30 rounded-xl backdrop-blur-md transition-all shadow-xl active:scale-95 cursor-pointer flex items-center gap-1.5"
        >
          <span>Explore Heroes</span>
          <span>➔</span>
        </button>
      </div>

      {/* Mute/Unmute button top left */}
      <button
        onClick={handleMuteToggle}
        className="absolute top-4 sm:top-8 left-4 sm:left-8 z-20 p-2.5 sm:p-3 bg-black/70 hover:bg-black/90 text-white border border-white/30 transition-all rounded-full backdrop-blur-md shadow-xl active:scale-95 cursor-pointer"
        aria-label={muted ? 'Unmute video' : 'Mute video'}
      >
        {muted ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 9v6h4l5 5V4l-5 5H9z" />
            <line x1="19" y1="5" x2="5" y2="19" stroke="currentColor" strokeWidth="2" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 5.25L6 9H3.75A.75.75 0 003 9.75v4.5c0 .414.336.75.75.75H6l5.25 3.75V5.25zM16.5 8.25a6 6 0 010 7.5M19.5 6a9 9 0 010 12" />
          </svg>
        )}
      </button>
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
