import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Info, ChevronRight, Play, BookOpen, Mic2 } from 'lucide-react';
import { VOWELS, CONSONANTS, cn } from '../lib/utils';
import { audioService } from '../lib/audio';

interface SoundCardProps {
  sound: any;
  onClick: () => void;
}

const SoundCard = ({ sound, onClick }: SoundCardProps) => (
  <motion.button
    whileHover={{ y: -4 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="group relative flex flex-col items-center justify-center p-6 bg-white border border-brand-primary/5 rounded-2xl transition-all hover:border-brand-accent/30 hover:shadow-2xl hover:shadow-brand-accent/10"
  >
    <span className="text-4xl font-serif text-brand-primary mb-2 tracking-tight group-hover:scale-110 transition-transform">{sound.symbol}</span>
    <span className="text-[10px] uppercase tracking-widest text-brand-primary/40 font-mono font-medium">{sound.name}</span>
    
    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
      <Info size={14} className="text-brand-accent" />
    </div>
  </motion.button>
);

export const IPAChart = () => {
  const [selectedSound, setSelectedSound] = React.useState<any>(VOWELS[0]);

  return (
    <div className="space-y-12">
      <header className="max-w-2xl">
        <h2 className="text-4xl md:text-5xl lg:text-6xl mb-4 font-serif leading-tight">
          Sound <span className="italic">Systems</span>
        </h2>
        <p className="text-brand-primary/60 text-lg">
          In British Received Pronunciation, we distinguish 44 unique phonemes. 
          Use this interactive chart to explore the articulation of each sound.
        </p>
      </header>

      {/* Vowels Section */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1 bg-brand-primary/10"></div>
          <h3 className="text-sm uppercase tracking-[0.2em] font-medium text-brand-primary/40">Vowels & Diphthongs</h3>
          <div className="h-px flex-1 bg-brand-primary/10"></div>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
          {VOWELS.map((v) => (
            <SoundCard key={v.symbol} sound={v} onClick={() => setSelectedSound(v)} />
          ))}
        </div>
      </section>

      {/* Consonants Section */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1 bg-brand-primary/10"></div>
          <h3 className="text-sm uppercase tracking-[0.2em] font-medium text-brand-primary/40">Consonants</h3>
          <div className="h-px flex-1 bg-brand-primary/10"></div>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
          {CONSONANTS.map((c) => (
            <SoundCard key={c.symbol} sound={c} onClick={() => setSelectedSound(c)} />
          ))}
        </div>
      </section>

      {/* Detailed Sound Modal / Panel */}
      {selectedSound && (
        <AnimatePresence>
          <div className="fixed inset-0 z-[200] flex items-center justify-end p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSound(null)}
              className="absolute inset-0 bg-brand-primary/40 backdrop-blur-sm"
            />
            <motion.div
              layoutId={`sound-${selectedSound.symbol}`}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-xl h-full bg-brand-paper rounded-[32px] overflow-hidden flex flex-col shadow-2xl border-l border-brand-primary/5"
            >
              <div className="p-8 md:p-12 overflow-y-auto flex-1 space-y-10">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-8xl font-serif text-brand-primary leading-none mb-4">/{selectedSound.symbol}/</h4>
                    <p className="text-2xl font-serif italic text-brand-primary/60">{selectedSound.name}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedSound(null)}
                    className="p-3 bg-brand-primary/5 rounded-full hover:bg-brand-primary hover:text-brand-paper transition-colors"
                  >
                    <ChevronRight className="rotate-180" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 bg-white rounded-3xl border border-brand-primary/5">
                    <span className="block text-[10px] uppercase font-mono tracking-widest text-brand-primary/40 mb-2">Category</span>
                    <span className="text-lg font-medium capitalize">{selectedSound.category || selectedSound.manner}</span>
                  </div>
                  <div className="p-6 bg-white rounded-3xl border border-brand-primary/5">
                    <span className="block text-[10px] uppercase font-mono tracking-widest text-brand-primary/40 mb-2">Place</span>
                    <span className="text-lg font-medium capitalize">{selectedSound.place}</span>
                  </div>
                </div>

                <div className="space-y-6">
                  <h5 className="text-lg flex items-center gap-2">
                    <Volume2 size={20} className="text-brand-accent" />
                    Examples
                  </h5>
                  <div className="flex flex-wrap gap-3">
                    {selectedSound.examples.map((ex: string) => (
                      <button 
                        key={ex} 
                        onClick={() => audioService.speak(ex, 0.7)}
                        className="group flex items-center gap-2 px-6 py-3 bg-brand-primary text-brand-paper rounded-full text-lg font-medium shadow-lg shadow-brand-primary/10 hover:bg-brand-accent transition-all hover:scale-105"
                      >
                        <Play size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        {ex}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h5 className="text-lg flex items-center gap-2">
                    <BookOpen size={20} className="text-brand-accent" />
                    Articulation Guidance
                  </h5>
                  <div className="space-y-4">
                    <p className="text-brand-primary/70 leading-relaxed text-lg">
                      {selectedSound.description}
                    </p>
                    {selectedSound.articulation && (
                      <div className="grid gap-4 mt-4">
                        {selectedSound.articulation.instruction && (
                          <div className="p-4 bg-brand-accent/5 rounded-2xl border border-brand-accent/10 italic">
                            <span className="block text-[10px] uppercase font-mono tracking-widest text-brand-accent mb-1 font-bold">How to produce</span>
                            {selectedSound.articulation.instruction}
                          </div>
                        )}
                        <div className="grid grid-cols-2 gap-3">
                          {selectedSound.articulation.tongue && (
                            <div className="p-3 bg-white rounded-xl text-sm">
                              <span className="block text-[10px] uppercase font-mono tracking-widest text-brand-primary/40 mb-1">Tongue</span>
                              {selectedSound.articulation.tongue}
                            </div>
                          )}
                          {selectedSound.articulation.lips && (
                            <div className="p-3 bg-white rounded-xl text-sm">
                              <span className="block text-[10px] uppercase font-mono tracking-widest text-brand-primary/40 mb-1">Lips</span>
                              {selectedSound.articulation.lips}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-8">
                  <button className="w-full py-6 bg-brand-accent text-brand-paper rounded-full font-bold text-xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-brand-accent/20">
                    <Mic2 size={24} />
                    Practice in Articulation Lab
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </AnimatePresence>
      )}
    </div>
  );
};

