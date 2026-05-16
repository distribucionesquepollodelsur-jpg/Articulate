import React from 'react';
import { motion } from 'motion/react';
import { Search, Volume2, ArrowRight } from 'lucide-react';
import { VOWELS, CONSONANTS, cn } from '../lib/utils';
import { audioService } from '../lib/audio';

export const Dictionary = () => {
  const [query, setQuery] = React.useState('');
  
  const allSounds = [...VOWELS, ...CONSONANTS];
  const filtered = allSounds.filter(s => 
    s.symbol.toLowerCase().includes(query.toLowerCase()) || 
    s.name.toLowerCase().includes(query.toLowerCase()) ||
    s.examples.some(ex => ex.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="space-y-12">
      <header className="max-w-2xl">
        <h2 className="text-4xl md:text-5xl lg:text-6xl mb-4 font-serif leading-tight">
          Sound <span className="italic">Dictionary</span>
        </h2>
        <p className="text-brand-primary/60 text-lg">
          Search for IPA symbols, keywords, or examples to find the exact British RP pronunciation.
        </p>
      </header>

      <div className="relative max-w-2xl">
        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-primary/20">
          <Search size={24} />
        </div>
        <input 
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search symbols (e.g. θ) or words (e.g. heat)..."
          className="w-full pl-16 pr-8 py-6 bg-white border border-brand-primary/10 rounded-[32px] text-xl font-serif focus:outline-none focus:ring-4 focus:ring-brand-accent/20 focus:border-brand-accent transition-all"
        />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="p-8 bg-white border border-brand-primary/5 rounded-[40px] space-y-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between">
              <span className="text-6xl font-serif">/{item.symbol}/</span>
              <button 
                onClick={() => audioService.speakIPASound(item.symbol, item.examples)}
                className="w-10 h-10 bg-brand-primary/5 rounded-full flex items-center justify-center text-brand-accent hover:bg-brand-accent hover:text-white transition-colors"
              >
                <Volume2 size={20} />
              </button>
            </div>

            <div>
              <h4 className="text-xl font-serif mb-1 capitalize">{item.name}</h4>
              <span className="text-[10px] uppercase font-mono tracking-widest text-brand-primary/40 font-bold">
                {(item as any).category || (item as any).manner}
              </span>
            </div>

            <div className="pt-4 border-t border-brand-primary/5 flex flex-wrap gap-2">
              {item.examples.map((ex: string) => (
                <button 
                  key={ex} 
                  onClick={() => audioService.speak(ex, 0.7)}
                  className="px-4 py-2 bg-brand-primary/5 rounded-xl text-sm font-medium flex items-center gap-2 group cursor-pointer hover:bg-brand-primary hover:text-brand-paper transition-colors"
                >
                  {ex}
                  <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                </button>
              ))}
            </div>
          </motion.div>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full py-24 flex flex-col items-center justify-center text-brand-primary/20 space-y-4">
             <Search size={64} />
             <p className="font-serif italic text-2xl">No symbols found matching "{query}"</p>
          </div>
        )}
      </div>
    </div>
  );
};
