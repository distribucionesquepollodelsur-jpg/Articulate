import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { useCulture } from '../contexts/CultureContext';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface RoyalPortraitProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
}

// Verified public domain stable URLs for King Charles III
const PORTRAIT_SOURCES = [
  'https://www.royal.uk/sites/default/files/images/monarch/king_charles_iii_official_portrait.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/King_Charles_III_official_portrait.jpg/600px-King_Charles_III_official_portrait.jpg',
  'https://www.gov.uk/government/uploads/system/uploads/image_data/file/181515/s300_King_Charles_III_official_portrait.jpg'
];

export const RoyalPortrait: React.FC<RoyalPortraitProps> = ({ className, size = 'md' }) => {
  const { currentMonarch, monarchyState } = useCulture();
  const [sourceIndex, setSourceIndex] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  const sizes = {
    sm: 'w-16 h-20',
    md: 'w-32 h-44',
    lg: 'w-48 h-64',
    hero: 'w-64 h-80'
  };

  const handleImageError = () => {
    if (sourceIndex < PORTRAIT_SOURCES.length - 1) {
      setSourceIndex(prev => prev + 1);
    } else {
      setHasError(true);
    }
    setIsLoading(false);
  };

  const handleRetry = () => {
    setHasError(false);
    setSourceIndex(0);
    setIsLoading(true);
    setRetryCount(prev => prev + 1);
  };

  return (
    <div className={cn(
      "relative rounded-[32px] overflow-hidden border-2 border-brand-accent/20 shadow-2xl bg-brand-primary/5",
      sizes[size],
      className
    )}>
      <AnimatePresence mode="wait">
        {!hasError ? (
          <motion.div 
            key={PORTRAIT_SOURCES[sourceIndex]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full"
          >
            <img 
              src={PORTRAIT_SOURCES[sourceIndex]}
              alt={currentMonarch.name}
              onLoad={() => setIsLoading(false)}
              onError={handleImageError}
              className={cn(
                "w-full h-full object-cover transition-all duration-1000",
                isLoading && "blur-sm scale-110",
                monarchyState === 'mourning' && "grayscale brightness-75",
                monarchyState === 'celebration' && "sepia-[0.3] brightness-110"
              )}
            />
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full h-full flex flex-col items-center justify-center p-4 bg-brand-primary/10 text-brand-primary/40 text-center space-y-2"
          >
            <AlertCircle size={24} />
            <p className="text-[8px] font-mono font-bold uppercase tracking-widest">Asset Unavailable</p>
            <button 
              onClick={handleRetry}
              className="p-2 hover:bg-white rounded-full transition-colors"
            >
              <RefreshCw size={12} className={cn(isLoading && "animate-spin")} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Loading Shimmer */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer" />
      )}
      
      {/* Decorative Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/80 via-transparent to-transparent pointer-events-none" />
      
      <div className="absolute bottom-4 left-0 right-0 text-center px-2 pointer-events-none">
        <p className="text-[10px] font-serif font-bold text-white uppercase tracking-widest drop-shadow-md">
          {currentMonarch.name}
        </p>
        <p className="text-[7px] font-mono font-bold text-brand-accent uppercase tracking-widest opacity-80 truncate">
          {currentMonarch.reignStart.split('-')[0]} — {monarchyState === 'mourning' ? '2026' : 'Present'}
        </p>
      </div>

      {/* Mourning Band if applicable */}
      {monarchyState === 'mourning' && (
        <div className="absolute top-4 -right-8 w-32 bg-black py-1 text-center rotate-45 border-y border-white/20">
          <span className="text-[8px] font-bold text-white uppercase tracking-[0.2em]">In Memoriam</span>
        </div>
      )}
    </div>
  );
};
