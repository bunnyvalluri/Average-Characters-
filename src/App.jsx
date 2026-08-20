// src/App.jsx
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { ColorThemeProvider } from './ColorThemeContext';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Timeline from './components/Timeline';
import Movies from './components/Movies';
import { useState, useRef, useEffect } from 'react';
import characters from './assets/characters';

function Home() {
  // Lift currentCharacter state up from HeroSection
  const [currentCharacterIdx, setCurrentCharacterIdx] = useState(0);
  const currentCharacter = characters[currentCharacterIdx];

  // Refs for scrolling
  const heroRef = useRef(null);
  const timelineRef = useRef(null);
  const moviesRef = useRef(null);

  // Scroll handlers
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const scrollToTimeline = () => {
    if (timelineRef.current) {
      timelineRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const scrollToMovies = () => {
    if (moviesRef.current) {
      moviesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearchCharacter = (name) => {
    const index = characters.findIndex((char) =>
      char.name.toLowerCase().includes(name.toLowerCase())
    );
    if (index !== -1) {
      setCurrentCharacterIdx(index);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      alert(`Character "${name}" not found.`);
    }
  };

  return (
    <div className="min-h-screen text-white w-full overflow-x-hidden flex flex-col justify-between">
      <Navbar
        onHomeClick={scrollToTop}
        onTimelineClick={scrollToTimeline}
        onMoviesClick={scrollToMovies}
        onSearchCharacter={handleSearchCharacter}
      />
      <div className="pt-20 sm:pt-24 md:pt-28 w-full flex-1 flex flex-col">
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
      </div>
      <footer className="w-full text-center py-4 px-2 text-xs sm:text-sm text-gray-300">
        Copyright © <a href="https://valluri-rahul-portfolio.vercel.app/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white font-semibold transition-colors">VALLURI RAHUL</a>. 2026
      </footer>
    </div>
  );
}

function Landing() {
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const [muted, setMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  // Auto navigate to Home after video ends
  const handleVideoEnd = () => {
    navigate("/home");
  };

  const handleEnterClick = () => {
    navigate("/home");
  };

  // Toggle mute state
  const handleMuteToggle = () => {
    setMuted((prev) => !prev);
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
    }
  };

  const handleManualPlay = () => {
    if (videoRef.current) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => console.warn("Play error:", err));
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = muted;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.warn("Mobile autoplay policy:", err);
            setIsPlaying(false);
          });
      }
    }
  }, [muted]);

  return (
    <div className="relative w-full h-[100dvh] min-h-[100dvh] font-sans overflow-hidden bg-black flex items-center justify-center">
      <video
        ref={videoRef}
        className="w-full h-full object-contain md:object-cover z-0 select-none pointer-events-none"
        src="/landing.mp4"
        autoPlay
        muted={muted}
        playsInline
        webkit-playsinline="true"
        x5-playsinline="true"
        preload="auto"
        controls={false}
        disablePictureInPicture
        loop={false}
        onEnded={handleVideoEnd}
        onPlay={() => setIsPlaying(true)}
      />

      {/* Tap to play overlay fallback for mobile if browser blocks autoplay */}
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

      {/* Skip button, top right, mobile responsive */}
      <div className="absolute top-4 sm:top-8 right-4 sm:right-8 z-20">
        <button
          onClick={handleEnterClick}
          className="px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base font-semibold bg-black/60 hover:bg-black/80 text-white border border-white/20 rounded-lg backdrop-blur-md transition-all shadow-lg active:scale-95"
          style={{ boxShadow: '0 4px 20px 0 rgba(0,0,0,0.6)' }}
        >
          Skip ➔
        </button>
      </div>

      {/* Mute/Unmute button, top left, mobile responsive */}
      <button
        onClick={handleMuteToggle}
        className="absolute top-4 sm:top-8 left-4 sm:left-8 z-20 p-2.5 sm:p-3 bg-black/60 hover:bg-black/80 text-white border border-white/20 transition-all rounded-full backdrop-blur-md shadow-lg active:scale-95"
        style={{ outline: 'none' }}
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
