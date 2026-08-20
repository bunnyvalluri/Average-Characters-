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
        className="min-h-screen w-full transition-colors duration-500 ease-out"
        style={{
          backgroundColor: color,
          backgroundImage: 'radial-gradient(ellipse at 50% 20%, rgba(255,255,255,0.06) 0%, rgba(0,0,0,0.45) 85%, rgba(0,0,0,0.8) 100%)',
          willChange: 'background-color'
        }}
      >
        {children}
      </div>
    </ColorThemeContext.Provider>
  );
}

