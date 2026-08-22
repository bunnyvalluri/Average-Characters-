// src/ColorThemeContext.jsx
import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';

const ColorThemeContext = createContext({
  color: '#b71c1c',
  setColor: () => {},
});

export function useColorTheme() {
  return useContext(ColorThemeContext);
}

export function ColorThemeProvider({ children, initialColor = '#b71c1c' }) {
  const [color, setColor] = useState(initialColor);

  // Apply CSS custom variable to root for ultra-fast GPU rendering without DOM thrashing
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty('--theme-color', color);
    }
  }, [color]);

  const handleSetColor = useCallback((newColor) => {
    if (newColor && newColor !== color) {
      setColor(newColor);
    }
  }, [color]);

  const value = useMemo(() => ({
    color,
    setColor: handleSetColor
  }), [color, handleSetColor]);

  return (
    <ColorThemeContext.Provider value={value}>
      <div
        id="app-theme-wrapper"
        className="min-h-screen w-full relative overflow-x-hidden text-white bg-[#08080c]"
        style={{ transform: 'translateZ(0)' }}
      >
        {/* Dynamic Character Atmospheric Spotlight Aura - Static GPU Layer */}
        <div
          className="absolute top-0 inset-x-0 h-[1000px] pointer-events-none z-0 transition-all duration-700 ease-out"
          style={{
            background: `radial-gradient(circle at 50% 260px, ${color}99 0%, ${color}33 35%, transparent 70%), linear-gradient(180deg, ${color}26 0%, transparent 400px)`,
            transform: 'translateZ(0)',
            willChange: 'background',
          }}
        />

        {/* Subtle HUD Grid Overlay */}
        <div
          className="absolute top-0 inset-x-0 h-[1200px] pointer-events-none z-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />

        {/* Main Content Container */}
        <div className="relative z-10 w-full flex flex-col justify-between min-h-screen">
          {children}
        </div>
      </div>
    </ColorThemeContext.Provider>
  );
}

