'use client';

import { useEffect, useState } from 'react';

export function Preloader() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const minDisplayTime = 1200;
    const fadeOutTime = 400;
    const start = Date.now();

    const handleLoad = () => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, minDisplayTime - elapsed);

      setTimeout(() => {
        setIsFading(true);
        setTimeout(() => {
          setIsVisible(false);
        }, fadeOutTime);
      }, remaining);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      const fallback = setTimeout(handleLoad, minDisplayTime + 500);
      return () => {
        window.removeEventListener('load', handleLoad);
        clearTimeout(fallback);
      };
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#94a3b8] transition-opacity duration-[400ms] ease-out"
      style={{ opacity: isFading ? 0 : 1 }}
      aria-hidden="true"
    >
      {/* Spinner */}
      <div className="relative">
        <div className="w-14 h-14 rounded-full border-4 border-white/30 border-t-white animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="material-icons text-white text-2xl" style={{ fontSize: '28px' }}>
            link
          </span>
        </div>
      </div>

      {/* App name */}
      <p className="mt-6 text-white font-semibold text-lg tracking-wide">
        MyDigiLink
      </p>

      {/* Loading text */}
      <p className="mt-2 text-white/80 text-sm">
        Loading...
      </p>
    </div>
  );
}
