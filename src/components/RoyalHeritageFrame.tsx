import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCulture } from '../contexts/CultureContext';
import { Crown, Sparkles, X } from 'lucide-react';

import { RoyalPortrait } from './RoyalPortrait';

export const RoyalHeritageFrame = () => {
  const { monarchyState, showRoyalHeritage, setShowRoyalHeritage } = useCulture();

  if (!showRoyalHeritage) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8, x: 50 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      className="fixed bottom-8 right-8 z-[100] hidden lg:block"
    >
      <div className="relative group">
        <button 
          onClick={() => setShowRoyalHeritage(false)}
          className="absolute -top-4 -left-4 w-10 h-10 bg-brand-primary text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-[110] shadow-xl hover:bg-brand-accent transition-colors"
        >
          <X size={18} />
        </button>

        <div className="bg-brand-primary p-1.5 rounded-[40px] shadow-2xl shadow-brand-primary/40 overflow-hidden backdrop-blur-xl">
          <div className="bg-brand-paper rounded-[36px] p-3 flex flex-col items-center">
            <RoyalPortrait size="md" className="mb-4" />
            
            <div className="flex items-center gap-2 mb-2">
              <Crown size={14} className="text-brand-accent animate-pulse" />
              <span className="text-[11px] font-serif font-bold uppercase tracking-widest text-brand-primary">Royal Heritage</span>
            </div>
            <p className="text-[9px] font-mono text-brand-primary/40 uppercase font-bold text-center leading-tight">
              Upholding the <br/> Received Pronunciation
            </p>
          </div>
        </div>
        
        {monarchyState === 'mourning' && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-5 py-1.5 bg-black text-white text-[9px] font-mono font-bold rounded-full uppercase tracking-widest border border-white/20 whitespace-nowrap shadow-2xl">
            In Remembrance
          </div>
        )}
      </div>
    </motion.div>
  );
};

