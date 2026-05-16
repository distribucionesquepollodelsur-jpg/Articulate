import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Music, Play, Pause, SkipForward, Mic2, Sparkles, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { audioService } from '../lib/audio';

const SONGS = [
  {
    id: 1,
    title: "Greensleeves",
    artist: "Traditional British",
    ipa: "ə-læs maɪ lʌv juː duː miː rɒŋ",
    lyrics: "Alas, my love, you do me wrong",
    difficulty: "Beginner"
  },
  {
    id: 2,
    title: "London Bridge",
    artist: "Nursery Rhyme",
    ipa: "lʌndən brɪdʒ ɪz fɔːlɪŋ daʊn",
    lyrics: "London Bridge is falling down",
    difficulty: "Beginner"
  }
];

export const Studio = () => {
  const [activeSong, setActiveSong] = React.useState<any>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

  return (
    <div className="space-y-12">
      <header className="max-w-2xl">
        <h2 className="text-4xl md:text-5xl lg:text-6xl mb-4 font-serif leading-tight">
          Pronunciation <span className="italic">Studio</span>
        </h2>
        <p className="text-brand-primary/60 text-lg">
          Master the rhythm and intonation of British English through music. 
          Sing along with phonetically transcribed lyrics.
        </p>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-sm uppercase tracking-widest font-bold opacity-40 mb-6">Playlist</h3>
          {SONGS.map(song => (
            <button
              key={song.id}
              onClick={() => setActiveSong(song)}
              className={cn(
                "w-full p-6 rounded-3xl border flex items-center gap-4 transition-all hover:scale-[1.02]",
                activeSong?.id === song.id 
                  ? "bg-brand-primary text-brand-paper border-brand-primary shadow-xl shadow-brand-primary/20" 
                  : "bg-white border-brand-primary/5 text-brand-primary hover:border-brand-accent/30"
              )}
            >
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
                activeSong?.id === song.id ? "bg-white/10" : "bg-brand-primary/5"
              )}>
                <Music size={20} />
              </div>
              <div className="text-left overflow-hidden">
                <p className="font-bold truncate">{song.title}</p>
                <p className={cn("text-xs opacity-60 truncate", activeSong?.id === song.id ? "text-brand-paper/60" : "text-brand-primary/40")}>{song.artist}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {!activeSong ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full min-h-[400px] border-2 border-dashed border-brand-primary/10 rounded-[48px] flex flex-col items-center justify-center text-center p-12"
              >
                <Music size={64} className="text-brand-primary/10 mb-4" />
                <p className="font-serif italic text-2xl text-brand-primary/40">Select a song to start training</p>
              </motion.div>
            ) : (
              <motion.div
                key={activeSong.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white border border-brand-primary/5 rounded-[48px] p-8 md:p-12 shadow-sm space-y-12"
              >
                <div className="flex justify-between items-center">
                   <div>
                     <h3 className="text-4xl font-serif">{activeSong.title}</h3>
                     <p className="text-brand-primary/40 italic">{activeSong.artist}</p>
                   </div>
                   <div className="px-4 py-2 bg-brand-accent text-brand-paper rounded-full text-[10px] font-mono tracking-widest font-bold uppercase">
                     {activeSong.difficulty}
                   </div>
                </div>

                <div className="space-y-12 py-12 border-y border-brand-primary/5">
                  <div className="space-y-8 text-center">
                    <p className="text-5xl font-serif text-brand-primary/80 animate-pulse">
                      {activeSong.lyrics}
                    </p>
                    <p className="text-3xl font-serif text-brand-accent italic tracking-tight">
                      [{activeSong.ipa}]
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-8">
                  <div className="flex items-center gap-6">
                    <button className="w-12 h-12 rounded-full flex items-center justify-center bg-brand-primary/5 text-brand-primary hover:bg-brand-primary hover:text-brand-paper transition-all">
                      <SkipForward className="rotate-180" size={20} />
                    </button>
                    <button 
                      onClick={() => {
                        setIsPlaying(!isPlaying);
                        if (!isPlaying) audioService.speak(activeSong.lyrics);
                      }}
                      className="w-20 h-20 rounded-full bg-brand-primary text-brand-paper flex items-center justify-center shadow-2xl shadow-brand-primary/30 hover:scale-105 active:scale-95 transition-all"
                    >
                      {isPlaying ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
                    </button>
                    <button className="w-12 h-12 rounded-full flex items-center justify-center bg-brand-primary/5 text-brand-primary hover:bg-brand-primary hover:text-brand-paper transition-all">
                      <SkipForward size={20} />
                    </button>
                  </div>

                  <div className="w-full space-y-4">
                    <button className="w-full py-6 bg-brand-accent text-brand-paper rounded-[32px] font-bold text-xl flex items-center justify-center gap-3 shadow-xl shadow-brand-accent/20 hover:scale-[1.02] active:scale-95 transition-all">
                      <Mic2 size={24} />
                      Start Karaoke Mode
                    </button>
                    <div className="flex justify-center gap-2">
                       <Sparkles size={16} className="text-brand-accent animate-spin-slow" />
                       <span className="text-[10px] uppercase font-mono tracking-widest font-bold text-brand-primary/40">AI-Powered Fluency Scoring Active</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
