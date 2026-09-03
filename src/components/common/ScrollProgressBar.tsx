import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';

export const ScrollProgressBar: React.FC = () => {
  const { currentPage } = useApp();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateScrollProgress = () => {
      const scrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      const totalScrollableDistance = scrollHeight - clientHeight;

      if (totalScrollableDistance > 0) {
        const progress = (scrollY / totalScrollableDistance) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      } else {
        setScrollProgress(0);
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollProgress);
        ticking = true;
      }
    };

    // Calculate immediately on mount or route change
    updateScrollProgress();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    // Handle initial delay in case images or fonts render and change height
    const timer = setTimeout(updateScrollProgress, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      clearTimeout(timer);
    };
  }, [currentPage]);

  return (
    <div
      id="scroll-progress-container"
      className="fixed top-0 left-0 right-0 h-[3px] z-[100] pointer-events-none bg-slate-900/10"
      aria-hidden="true"
    >
      <div
        id="scroll-progress-bar"
        className="h-full bg-gradient-to-r from-blue-600 via-blue-500 to-amber-400 shadow-[0_1px_6px_rgba(37,99,235,0.4)] transition-[width] duration-75 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};
