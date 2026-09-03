import React from 'react';

interface BrandLogoProps {
  variant?: 'full' | 'compact' | 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'full',
  size = 'md',
  className = ''
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl md:text-3xl'
  };

  const isLight = variant === 'light';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Sechel Custom Stepped Geometric Prism Icon matching user's slide brand */}
      <div className={`relative ${iconSizes[size]} flex-shrink-0 flex items-center justify-center`}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm transition-transform duration-300 hover:scale-105"
        >
          {/* Segment 1: Bottom Left Warm Orange/Gold */}
          <path
            d="M10 82L35 32L48 55L23 95L10 82Z"
            fill="url(#grad_orange_yellow)"
          />
          {/* Segment 2: Middle Vibrant Magenta/Violet */}
          <path
            d="M30 68L55 18L68 41L43 81L30 68Z"
            fill="url(#grad_purple_pink)"
          />
          {/* Segment 3: Top Right Electric Cyan/Royal Blue */}
          <path
            d="M50 54L75 4L88 27L63 67L50 54Z"
            fill="url(#grad_blue_cyan)"
          />

          <defs>
            <linearGradient id="grad_orange_yellow" x1="10" y1="95" x2="48" y2="32" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F97316" />
              <stop offset="1" stopColor="#FBBF24" />
            </linearGradient>
            <linearGradient id="grad_purple_pink" x1="30" y1="81" x2="68" y2="18" gradientUnits="userSpaceOnUse">
              <stop stopColor="#9333EA" />
              <stop offset="1" stopColor="#EC4899" />
            </linearGradient>
            <linearGradient id="grad_blue_cyan" x1="50" y1="67" x2="88" y2="4" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2563EB" />
              <stop offset="1" stopColor="#06B6D4" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {variant !== 'compact' && (
        <div className="flex flex-col leading-tight">
          <div className="flex items-baseline gap-1.5">
            <span
              className={`font-serif-display font-bold tracking-tight ${textSizes[size]} ${
                isLight ? 'text-white' : 'text-slate-900'
              }`}
            >
              SECHEL <span className="font-semibold text-blue-600">CONSULTING</span>
            </span>
          </div>
          <span
            className={`text-[9px] uppercase tracking-[0.2em] font-bold font-mono ${
              isLight ? 'text-amber-400' : 'text-slate-500'
            }`}
          >
            Stratégie & Ingénierie d'Affaires
          </span>
        </div>
      )}
    </div>
  );
};
