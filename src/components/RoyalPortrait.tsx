import React, { useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { useCulture } from '../contexts/CultureContext';

interface RoyalPortraitProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
}

export const RoyalPortrait: React.FC<RoyalPortraitProps> = ({ className, size = 'md' }) => {
  const { currentMonarch, monarchyState } = useCulture();
  const [hasError, setHasError] = useState(false);

  const sizes = {
    sm: 'w-16 h-20',
    md: 'w-32 h-44',
    lg: 'w-48 h-64',
    hero: 'w-64 h-80'
  };

  // Wikipedia hosted image is usually hotlink-safe
  const fallbackUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/King_Charles_III_official_portrait.jpg/600px-King_Charles_III_official_portrait.jpg';
  
  return (
    <div className={cn(
      "relative rounded-[32px] overflow-hidden border-2 border-brand-accent/20 shadow-2xl",
      sizes[size],
      className
    )}>
      <motion.img 
        key={currentMonarch.portraitUrl}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        src={hasError ? fallbackUrl : currentMonarch.portraitUrl}
        alt={currentMonarch.name}
        onError={() => setHasError(true)}
        className={cn(
          "w-full h-full object-cover transition-all duration-1000",
          monarchyState === 'mourning' && "grayscale brightness-75",
          monarchyState === 'celebration' && "sepia-[0.3] brightness-110"
        )}
      />
      
      {/* Decorative Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/80 via-transparent to-transparent pointer-events-none" />
      
      <div className="absolute bottom-4 left-0 right-0 text-center px-2 pointer-events-none">
        <p className="text-[10px] font-serif font-bold text-white uppercase tracking-widest drop-shadow-md">
          {currentMonarch.name}
        </p>
        <p className="text-[7px] font-mono font-bold text-brand-accent uppercase tracking-widest opacity-80 truncate">
          {currentMonarch.reignStart.split('-')[0]} — Present
        </p>
      </div>

      {/* Mourning Band if applicable */}
      {monarchyState === 'mourning' && (
        <div className="absolute top-4 -right-8 w-32 bg-black py-1 text-center rotate-45 border-y border-white/20">
          <span className="text-[8px] font-bold text-white uppercase tracking-[0.2em]">Memorial</span>
        </div>
      )}
    </div>
  );
};
