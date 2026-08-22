// src/components/MarvelImage.jsx
import React, { useState, useEffect, useRef, memo } from 'react';

// In-memory cache set to track already loaded and decoded image URLs across the session
const loadedImageCache = new Set();

const MarvelImage = ({
  src,
  alt = 'Marvel Character',
  className = '',
  containerClassName = '',
  skeletonClassName = '',
  fallbackSrc = '/marvel.png',
  priority = false,
  showSkeleton = true,
  onClick,
  style = {},
  ...props
}) => {
  const isPreCached = src ? loadedImageCache.has(src) : false;
  const [isLoaded, setIsLoaded] = useState(isPreCached);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const imgRef = useRef(null);

  // When src prop changes
  useEffect(() => {
    if (!src) return;
    setCurrentSrc(src);
    setHasError(false);

    if (loadedImageCache.has(src)) {
      setIsLoaded(true);
      return;
    }

    setIsLoaded(false);

    // If priority is high, pre-decode for buttery smooth 60fps render
    let isCancelled = false;
    const img = new Image();
    img.src = src;

    if (img.decode) {
      img
        .decode()
        .then(() => {
          if (!isCancelled) {
            loadedImageCache.add(src);
            setIsLoaded(true);
          }
        })
        .catch(() => {
          // If decode fails or is cancelled, normal onLoad handles it
        });
    }

    return () => {
      isCancelled = true;
    };
  }, [src]);

  const handleLoad = () => {
    if (src) loadedImageCache.add(src);
    setIsLoaded(true);
  };

  const handleError = () => {
    if (!hasError && currentSrc !== fallbackSrc) {
      setHasError(true);
      setCurrentSrc(fallbackSrc);
      setIsLoaded(true);
    }
  };

  return (
    <div
      className={`relative overflow-hidden flex items-center justify-center ${containerClassName}`}
      onClick={onClick}
      style={style}
    >
      {/* Sleek Cinematic Marvel Shimmer Skeleton */}
      {showSkeleton && !isLoaded && (
        <div
          className={`absolute inset-0 z-10 flex items-center justify-center bg-gradient-to-r from-white/5 via-white/12 to-white/5 animate-pulse rounded-inherit ${skeletonClassName}`}
          aria-hidden="true"
        >
          <div className="w-8 h-8 rounded-full border border-white/20 border-t-red-500/80 animate-spin opacity-50" />
        </div>
      )}

      {/* Main Image */}
      <img
        ref={imgRef}
        src={currentSrc}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={handleLoad}
        onError={handleError}
        className={`transition-all duration-250 ease-out will-change-transform ${
          isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.98]'
        } ${className}`}
        style={{ transform: 'translateZ(0)' }}
        {...props}
      />
    </div>
  );
};

export default memo(MarvelImage);
