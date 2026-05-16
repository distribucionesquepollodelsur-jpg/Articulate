import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  ChevronLeft, 
  Crown, 
  Shield, 
  Map, 
  ScrollText, 
  Sparkles, 
  Info,
  Clock,
  Play
} from 'lucide-react';
import { cn } from '../lib/utils';
import { MONARCHY_HISTORY, MonarchHistory } from '../services/historyService';
import { RoyalPortrait } from './RoyalPortrait';

export const RoyalGallery = () => {
  const [selectedMonarch, setSelectedMonarch] = useState<MonarchHistory>(MONARCHY_HISTORY[0]);
  const [filter, setFilter] = useState<'All' | 'England' | 'Scotland' | 'United Kingdom'>('All');

  const filteredMonarchs = MONARCHY_HISTORY.filter(m => filter === 'All' || m.kingdom === filter);

  return (
    <div className="space-y-12 pb-24 h-full">
      <header className="space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-brand-primary/5 rounded-lg">
                <Crown className="text-brand-accent" size={24} />
              </div>
              <h2 className="text-[10px] uppercase font-mono tracking-[0.3em] font-bold text-brand-primary/40">Cultural Heritage Archive</h2>
            </div>
            <h1 className="text-6xl font-serif font-bold tracking-tight">The <span className="italic text-brand-accent">Royal</span> Gallery</h1>
            <p className="text-xl text-brand-primary/60 max-w-2xl font-medium">Explore the historical rulers and the linguistic evolution of the British Isles through our curated archive.</p>
          </div>
          
          <div className="flex bg-brand-primary/5 p-1.5 rounded-full overflow-x-auto no-scrollbar whitespace-nowrap">
            {['All', 'England', 'Scotland', 'United Kingdom'].map((k) => (
              <button
                key={k}
                onClick={() => setFilter(k as any)}
                className={cn(
                  "px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all",
                  filter === k 
                    ? "bg-brand-primary text-brand-paper shadow-xl" 
                    : "text-brand-primary/40 hover:text-brand-primary"
                )}
              >
                {k}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="grid lg:grid-cols-[1fr_400px] gap-12 items-start">
        {/* Main Display Area */}
        <div className="space-y-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedMonarch.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="relative group"
            >
              <div className="bg-white rounded-[48px] p-12 border border-brand-primary/5 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                  <Shield size={200} />
                </div>
                
                <div className="flex flex-col md:flex-row gap-12 relative z-10">
                  <div className="w-full md:w-64 shrink-0">
                    <RoyalPortrait size="hero" className="shadow-2xl ring-8 ring-brand-primary/5" />
                  </div>
                  
                  <div className="flex-1 space-y-8">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <span className="px-4 py-1.5 bg-brand-accent text-brand-paper rounded-full text-[10px] font-bold uppercase tracking-widest">
                          {selectedMonarch.kingdom}
                        </span>
                        <span className="text-brand-primary/40 font-mono text-[10px] uppercase font-bold tracking-widest">
                          {selectedMonarch.dynasty} Dynasty
                        </span>
                      </div>
                      <h2 className="text-5xl font-serif font-bold">{selectedMonarch.name}</h2>
                      <div className="flex items-center gap-2 text-brand-accent">
                        <Play size={16} fill="currentColor" className="cursor-pointer hover:scale-110 transition-transform" />
                        <span className="font-mono text-lg italic">{selectedMonarch.ipa}</span>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-brand-primary/40">
                          <Clock size={16} />
                          <span className="text-[10px] uppercase font-mono font-bold tracking-widest">Reign</span>
                        </div>
                        <p className="font-serif text-xl">{selectedMonarch.reign}</p>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-brand-primary/40">
                          <ScrollText size={16} />
                          <span className="text-[10px] uppercase font-mono font-bold tracking-widest">Full Title</span>
                        </div>
                        <p className="text-sm font-medium leading-relaxed italic">{selectedMonarch.title}</p>
                      </div>
                    </div>

                    <div className="p-8 bg-brand-primary/5 rounded-[32px] space-y-4">
                      <div className="flex items-center gap-2 text-brand-accent">
                        <Sparkles size={16} />
                        <span className="text-[10px] uppercase font-mono font-bold tracking-widest">Linguistic Impact</span>
                      </div>
                      <p className="text-brand-primary/70 leading-relaxed font-medium">
                        {selectedMonarch.linguisticImpact}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="space-y-4">
            <h3 className="font-serif font-bold text-2xl px-2">Historical Biography</h3>
            <p className="text-brand-primary/60 leading-relaxed px-2 line-clamp-4 hover:line-clamp-none transition-all cursor-pointer">
              {selectedMonarch.summary}
            </p>
          </div>
        </div>

        {/* Sidebar Browser */}
        <div className="space-y-8">
          <div className="flex items-center justify-between px-2">
            <h3 className="font-serif font-bold text-xl uppercase tracking-tight">Timeline</h3>
            <span className="text-[10px] font-mono font-bold text-brand-accent">{filteredMonarchs.length} Rulers</span>
          </div>
          
          <div className="space-y-4 max-h-[800px] overflow-y-auto pr-4 custom-scrollbar">
            {filteredMonarchs.map((monarch) => (
              <button
                key={monarch.id}
                onClick={() => setSelectedMonarch(monarch)}
                className={cn(
                  "w-full text-left p-6 rounded-[32px] transition-all group flex items-center gap-6 border-2",
                  selectedMonarch.id === monarch.id 
                    ? "bg-brand-primary border-brand-primary shadow-2xl scale-[1.02]" 
                    : "bg-white border-brand-primary/5 hover:border-brand-primary/20 hover:shadow-xl hover:shadow-brand-primary/5"
                )}
              >
                <div className={cn(
                  "w-16 h-20 rounded-2xl overflow-hidden shrink-0 transition-transform group-hover:scale-105",
                  selectedMonarch.id === monarch.id ? "ring-2 ring-brand-accent ring-offset-4 ring-offset-brand-primary" : ""
                )}>
                  <img src={monarch.portrait} alt={monarch.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className={cn(
                      "text-[8px] uppercase font-mono font-bold tracking-widest px-2 py-0.5 rounded-full",
                      selectedMonarch.id === monarch.id ? "bg-white/10 text-brand-accent" : "bg-brand-primary/5 text-brand-primary/40"
                    )}>
                      {monarch.dynasty}
                    </span>
                    <span className={cn(
                      "text-[9px] font-mono",
                      selectedMonarch.id === monarch.id ? "text-white/40" : "text-brand-primary/20"
                    )}>
                      {monarch.reign.split(' – ')[0]}
                    </span>
                  </div>
                  <h4 className={cn(
                    "text-lg font-serif font-bold truncate",
                    selectedMonarch.id === monarch.id ? "text-white" : "text-brand-primary"
                  )}>
                    {monarch.name}
                  </h4>
                  <p className={cn(
                    "text-[10px] font-mono font-semibold uppercase tracking-widest",
                    selectedMonarch.id === monarch.id ? "text-brand-accent" : "text-brand-primary/40"
                  )}>
                    {monarch.kingdom}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
