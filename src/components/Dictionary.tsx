import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Volume2, ArrowRight, Sparkles, BookOpen } from 'lucide-react';
import { VOWELS, CONSONANTS, cn } from '../lib/utils';
import { audioService } from '../lib/audio';

export const Dictionary = () => {
  const [query, setQuery] = React.useState('');
  const [searchingAI, setSearchingAI] = React.useState(false);
  const [aiResult, setAiResult] = React.useState<any>(null);
  
  const allSounds = [...VOWELS, ...CONSONANTS];
  const soundsMatch = allSounds.filter(s => 
    s.symbol.toLowerCase().includes(query.toLowerCase()) || 
    s.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleAISearch = async () => {
    if (!query) return;
    setSearchingAI(true);
    setAiResult(null);
    try {
      const resp = await fetch('/api/lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ word: query })
      });
      const data = await resp.json();
      setAiResult(data);
    } catch (e) {
      console.error(e);
    } finally {
      setSearchingAI(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleAISearch();
  };

  return (
    <div className="space-y-12 pb-24">
      <header className="max-w-2xl">
        <div className="flex items-center gap-2 mb-4">
           <div className="p-2 bg-brand-accent/10 rounded-lg">
              <Sparkles className="text-brand-accent" size={20} />
           </div>
           <span className="text-[10px] uppercase font-mono tracking-widest font-bold text-brand-accent">AI-Powered Linguistics Engine</span>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl mb-4 font-serif leading-tight">
          Phonetic <span className="italic">Dictionary</span>
        </h2>
        <p className="text-brand-primary/60 text-lg">
          Search for IPA symbols or enter any word to generate its Received Pronunciation (RP) transcription and audio.
        </p>
      </header>

      <div className="flex flex-col md:flex-row gap-4 max-w-4xl">
        <div className="relative flex-1">
          <div className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-primary/20">
            <Search size={24} />
          </div>
          <input 
            type="text"
            value={query}
            onKeyDown={handleKeyDown}
            onChange={(e) => {
              setQuery(e.target.value);
              setAiResult(null);
            }}
            placeholder="Symbol (e.g. θ) or word (e.g. rendezvous)..."
            className="w-full pl-16 pr-8 py-6 bg-white border border-brand-primary/10 rounded-[32px] text-xl font-serif focus:outline-none focus:ring-4 focus:ring-brand-accent/20 focus:border-brand-accent transition-all shadow-sm"
          />
        </div>
        <button 
          onClick={handleAISearch}
          disabled={searchingAI || !query}
          className="px-10 py-6 bg-brand-primary text-brand-paper rounded-[32px] font-bold uppercase tracking-widest text-[12px] flex items-center justify-center gap-3 disabled:opacity-50 hover:bg-[#222] transition-all shadow-xl shadow-brand-primary/10"
        >
          {searchingAI ? <Loader2 className="animate-spin" /> : <Sparkles size={20} className="text-brand-accent" />}
          {searchingAI ? 'Analyzing...' : 'AI Lookup'}
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {aiResult && (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="col-span-full mb-4 p-12 bg-brand-primary text-brand-paper rounded-[48px] shadow-2xl shadow-brand-primary/30 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8"
            >
               <div className="relative z-10 space-y-4 text-center md:text-left">
                  <span className="text-[10px] uppercase font-mono tracking-widest font-bold text-brand-accent">AI Generated RP Transcription</span>
                  <h3 className="text-6xl font-serif font-bold italic tracking-tight">{aiResult.word}</h3>
                  <p className="text-4xl font-serif text-brand-accent tracking-[0.1em]">{aiResult.ipa}</p>
               </div>
               <div className="relative z-10 flex gap-4">
                  <button 
                    onClick={() => audioService.speak(aiResult.word)}
                    className="w-24 h-24 rounded-full bg-brand-accent text-brand-paper flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all"
                  >
                    <Volume2 size={32} />
                  </button>
               </div>
               <div className="absolute top-1/2 right-[-5%] -translate-y-1/2 opacity-5 scale-150 rotate-12">
                  <BookOpen size={400} />
               </div>
            </motion.div>
          )}

          {soundsMatch.map((item, i) => (
            <motion.div 
              key={item.symbol}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 bg-white border border-brand-primary/5 rounded-[40px] space-y-6 hover:shadow-2xl hover:shadow-brand-primary/10 transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="text-6xl font-serif group-hover:text-brand-accent transition-colors">/{item.symbol}/</span>
                <button 
                  onClick={() => audioService.speakIPASound(item.symbol, item.examples)}
                  className="w-12 h-12 bg-brand-primary/5 rounded-full flex items-center justify-center text-brand-accent hover:bg-brand-accent hover:text-white transition-colors"
                >
                  <Volume2 size={20} />
                </button>
              </div>

              <div>
                <h4 className="text-xl font-serif mb-1 capitalize group-hover:italic">{item.name}</h4>
                <span className="text-[10px] uppercase font-mono tracking-widest text-brand-primary/40 font-bold">
                  {(item as any).category || (item as any).manner}
                </span>
              </div>

              <div className="pt-6 border-t border-brand-primary/5 flex flex-wrap gap-2">
                {item.examples.map((ex: string) => (
                  <button 
                    key={ex} 
                    onClick={() => audioService.speak(ex, 0.7)}
                    className="px-4 py-2 bg-brand-primary/5 rounded-2xl text-sm font-medium flex items-center gap-2 group/btn cursor-pointer hover:bg-brand-primary hover:text-brand-paper transition-all"
                  >
                    {ex}
                    <ArrowRight size={12} className="opacity-0 group-hover/btn:opacity-100 -translate-x-2 group-hover/btn:translate-x-0 transition-all" />
                  </button>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {query && soundsMatch.length === 0 && !aiResult && !searchingAI && (
          <div className="col-span-full py-24 flex flex-col items-center justify-center text-brand-primary/20 space-y-4">
             <Search size={64} />
             <p className="font-serif italic text-2xl text-center">No symbols found. <br/><span className="text-sm font-sans not-italic font-bold text-brand-accent">Try clicking "AI Lookup" for word analysis.</span></p>
          </div>
        )}
      </div>
    </div>
  );
};

const Loader2 = ({ className }: { className?: string }) => (
  <svg className={cn("animate-spin", className)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
);
