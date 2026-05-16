import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Gamepad2, 
  Trophy, 
  Flame, 
  Volume2, 
  CheckCircle2, 
  XCircle, 
  ArrowRight,
  RefreshCcw,
  Sparkles,
  Play,
  Pause,
  Timer,
  Award
} from 'lucide-react';
import { cn, VOWELS, CONSONANTS } from '../lib/utils';
import { audioService } from '../lib/audio';
import { useGame } from '../contexts/GameContext';

const ALL_SOUNDS = [...VOWELS, ...CONSONANTS];

interface GameScore {
  correct: number;
  total: number;
  streak: number;
}

export const Games = () => {
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const { xp, level, streak } = useGame();

  const gameModes = [
    {
      id: 'sound-hunter',
      title: 'Sound Hunter',
      description: 'Listen to the sound and find the correct IPA symbol.',
      icon: Volume2,
      color: 'bg-brand-accent',
      difficulty: 'Beginner'
    },
    {
      id: 'ipa-memory',
      title: 'IPA Memory',
      description: 'Match symbols with their illustrative word examples.',
      icon: Award,
      color: 'bg-blue-500',
      difficulty: 'Intermediate'
    },
    {
      id: 'speed-speak',
      title: 'Speed Speak',
      description: 'Can you recognize 20 sounds in under 60 seconds?',
      icon: Timer,
      color: 'bg-orange-500',
      difficulty: 'Advanced'
    }
  ];

  if (activeGame === 'sound-hunter') {
    return <SoundHunter onExit={() => setActiveGame(null)} />;
  }

  return (
    <div className="space-y-12 pb-24">
      <header className="space-y-4">
         <div className="flex items-center gap-3">
            <div className="p-2 bg-brand-primary/5 rounded-lg">
               <Gamepad2 className="text-brand-primary" size={24} />
            </div>
            <h2 className="text-[10px] uppercase font-mono tracking-[0.3em] font-bold text-brand-primary/40">Gaming Arena</h2>
         </div>
         <h1 className="text-5xl font-serif font-bold tracking-tight">Challenge Your <span className="italic text-brand-accent">Ears</span></h1>
         <p className="text-xl text-brand-primary/60 max-w-2xl font-medium">Test your phonetic awareness in our custom-built training games. Earn XP, climb ranks, and master the sounds of English.</p>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {gameModes.map((game) => (
          <motion.button
            key={game.id}
            whileHover={{ y: -8, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveGame(game.id)}
            className="group relative flex flex-col items-start text-left p-8 bg-white border border-brand-primary/5 rounded-[48px] shadow-sm hover:shadow-2xl hover:shadow-brand-primary/10 transition-all overflow-hidden"
          >
             <div className={cn("w-16 h-16 rounded-[24px] flex items-center justify-center text-brand-paper shadow-xl mb-8 group-hover:rotate-6 transition-transform", game.color)}>
                <game.icon size={32} />
             </div>
             
             <div className="mb-8">
                <span className="px-3 py-1 bg-brand-primary/5 rounded-full text-[10px] uppercase font-mono tracking-widest font-bold text-brand-primary/40 mb-3 inline-block">
                   {game.difficulty}
                </span>
                <h3 className="text-2xl font-serif font-bold mb-2">{game.title}</h3>
                <p className="text-brand-primary/40 leading-relaxed">{game.description}</p>
             </div>

             <div className="mt-auto w-full flex items-center justify-between">
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
                   <span className="text-[10px] uppercase font-mono tracking-widest font-bold opacity-40">Ready to Play</span>
                </div>
                <div className="w-12 h-12 rounded-full bg-brand-primary/5 flex items-center justify-center group-hover:bg-brand-primary group-hover:text-brand-paper transition-all">
                   <ArrowRight size={20} />
                </div>
             </div>

             <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.button>
        ))}
      </div>

      {/* Stats Summary */}
      <section className="p-12 bg-brand-primary text-brand-paper rounded-[64px] shadow-2xl flex flex-col md:flex-row items-center gap-12 relative overflow-hidden">
         <div className="relative z-10 space-y-6 flex-1 text-center md:text-left">
            <h3 className="text-3xl font-serif font-bold">Your Performance</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
               <div>
                  <p className="text-[10px] uppercase font-mono tracking-widest opacity-60 mb-2">Total LXP</p>
                  <p className="text-4xl font-serif font-bold">{xp.toLocaleString()}</p>
               </div>
               <div>
                  <p className="text-[10px] uppercase font-mono tracking-widest opacity-60 mb-2">Current Level</p>
                  <p className="text-4xl font-serif font-bold text-brand-accent">{level}</p>
               </div>
               <div>
                  <p className="text-[10px] uppercase font-mono tracking-widest opacity-60 mb-2">Global Rank</p>
                  <p className="text-4xl font-serif font-bold">--</p>
               </div>
               <div>
                  <p className="text-[10px] uppercase font-mono tracking-widest opacity-60 mb-2">Achievements</p>
                  <p className="text-4xl font-serif font-bold">0</p>
               </div>
            </div>
         </div>
         <div className="relative z-10 w-48 h-48 rounded-full bg-white/10 backdrop-blur-3xl border border-white/20 flex flex-col items-center justify-center p-8 shadow-2xl">
            <Flame size={48} className="text-orange-500 mb-2" />
            <span className="text-3xl font-bold">{streak}</span>
            <span className="text-[8px] uppercase tracking-[0.2em] opacity-60">Day Streak</span>
         </div>

         {/* Decorative Background Elements */}
         <div className="absolute -top-24 -left-24 w-64 h-64 bg-brand-accent opacity-20 blur-[100px] rounded-full" />
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </section>
    </div>
  );
};

const SoundHunter = ({ onExit }: { onExit: () => void }) => {
  const [currentSound, setCurrentSound] = useState<any>(null);
  const [options, setOptions] = useState<any[]>([]);
  const [score, setScore] = useState<GameScore>({ correct: 0, total: 0, streak: 0 });
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [gameState, setGameState] = useState<'playing' | 'ended'>('playing');
  const { addXP } = useGame();

  const nextQuestion = useCallback(() => {
    const target = ALL_SOUNDS[Math.floor(Math.random() * ALL_SOUNDS.length)];
    const others = [...ALL_SOUNDS]
      .filter(s => s.symbol !== target.symbol)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    
    setCurrentSound(target);
    setOptions([target, ...others].sort(() => 0.5 - Math.random()));
    setFeedback(null);
    
    // Auto play audio
    setTimeout(() => {
      audioService.speakIPASound(target.symbol, []);
    }, 500);
  }, []);

  useEffect(() => {
    nextQuestion();
  }, [nextQuestion]);

  const handleGuess = (symbol: string) => {
    if (feedback) return;

    if (symbol === currentSound.symbol) {
      setFeedback('correct');
      setScore(s => ({ ...s, correct: s.correct + 1, total: s.total + 1, streak: s.streak + 1 }));
      addXP(15, 'game', 'sound-hunter');
      setTimeout(nextQuestion, 1200);
    } else {
      setFeedback('wrong');
      setScore(s => ({ ...s, total: s.total + 1, streak: 0 }));
      setTimeout(nextQuestion, 2000);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center max-w-4xl mx-auto space-y-12">
      <header className="w-full flex items-center justify-between">
        <button 
          onClick={onExit}
          className="px-6 py-3 bg-brand-primary/5 rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-brand-primary/10 transition-all"
        >
          End Game
        </button>

        <div className="flex gap-8">
           <div className="flex items-center gap-3">
              <Trophy className="text-yellow-500" size={20} />
              <div>
                <p className="text-[10px] uppercase font-mono tracking-widest font-bold opacity-40">Score</p>
                <p className="text-xl font-serif font-bold">{score.correct}/{score.total}</p>
              </div>
           </div>
           <div className="flex items-center gap-3">
              <Flame className="text-orange-500" size={20} />
              <div>
                <p className="text-[10px] uppercase font-mono tracking-widest font-bold opacity-40">Streak</p>
                <p className="text-xl font-serif font-bold">{score.streak}</p>
              </div>
           </div>
        </div>
      </header>

      <div className="flex-1 w-full bg-white border border-brand-primary/5 rounded-[64px] shadow-xl p-12 lg:p-24 flex flex-col items-center gap-12 relative overflow-hidden">
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-2 bg-brand-primary/5">
           <motion.div 
             className="h-full bg-brand-accent"
             initial={{ width: 0 }}
             animate={{ width: `${(score.correct / 10) * 100}%` }}
           />
        </div>

        <motion.div 
          key={currentSound?.symbol}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-8 flex flex-col items-center"
        >
           <button 
             onClick={() => audioService.speakIPASound(currentSound.symbol, [])}
             className="w-32 h-32 rounded-full bg-brand-primary text-brand-paper flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all group"
           >
              <Volume2 size={48} className="group-hover:animate-pulse" />
           </button>
           <p className="text-[10px] uppercase font-mono tracking-[0.3em] font-bold text-brand-primary/40">Listen Closely</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
           {options.map((opt) => (
             <motion.button
               key={opt.symbol}
               whileHover={{ y: -4 }}
               whileTap={{ scale: 0.95 }}
               onClick={() => handleGuess(opt.symbol)}
               disabled={!!feedback}
               className={cn(
                 "p-10 rounded-[40px] text-4xl font-serif font-bold border-2 transition-all flex items-center justify-center relative",
                 feedback === 'correct' && opt.symbol === currentSound.symbol
                   ? "bg-green-500 border-green-500 text-white shadow-xl shadow-green-500/30"
                   : feedback === 'wrong' && opt.symbol === currentSound.symbol
                   ? "bg-brand-accent border-brand-accent text-white"
                   : "bg-white border-brand-primary/5 hover:border-brand-primary/20 text-brand-primary"
               )}
             >
                {opt.symbol}
                {feedback === 'correct' && opt.symbol === currentSound.symbol && (
                  <CheckCircle2 className="absolute top-4 right-4 text-white" size={24} />
                )}
             </motion.button>
           ))}
        </div>

        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={cn(
                "px-8 py-4 rounded-full font-bold shadow-lg flex items-center gap-3",
                feedback === 'correct' ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              )}
            >
               {feedback === 'correct' ? (
                 <>
                   <Sparkles size={20} />
                   <span>Perfect Recognition! (+15 XP)</span>
                 </>
               ) : (
                 <>
                   <XCircle size={20} />
                   <span>Not quite. That was /{currentSound.symbol}/</span>
                 </>
               )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex gap-4">
         <div className="px-6 py-3 bg-brand-primary/5 rounded-2xl flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-brand-primary/60">Live Analytics Active</span>
         </div>
         <div className="px-6 py-3 bg-brand-primary font-bold text-brand-paper rounded-2xl flex items-center gap-3 shadow-lg shadow-brand-primary/20">
            <Award size={18} className="text-brand-accent" />
            <span className="text-xs uppercase tracking-widest">Global Ranking: #1,242</span>
         </div>
      </div>
    </div>
  );
};
