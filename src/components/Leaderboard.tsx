import React from 'react';
import { motion } from 'motion/react';
import { 
  Trophy, 
  Crown, 
  Trophy as TrophyIcon, 
  ChevronUp, 
  Flame, 
  Sparkles,
  Users,
  Search,
  ArrowUpRight
} from 'lucide-react';
import { cn } from '../lib/utils';

interface LeaderboardUser {
  rank: number;
  name: string;
  avatar: string;
  xp: number;
  streak: number;
  isCurrentUser?: boolean;
}

const LEADERBOARD_DATA: LeaderboardUser[] = [
  { rank: 1, name: 'Alice Phonetics', avatar: 'AP', xp: 12450, streak: 84 },
  { rank: 2, name: 'Bob Glottal', avatar: 'BG', xp: 11800, streak: 42 },
  { rank: 3, name: 'Charlie Schwa', avatar: 'CS', xp: 10200, streak: 12 },
  { rank: 4, name: 'James Stewart', avatar: 'JS', xp: 9850, streak: 14, isCurrentUser: true },
  { rank: 5, name: 'Diana Vowel', avatar: 'DV', xp: 8700, streak: 7 },
  { rank: 6, name: 'Edward RP', avatar: 'ER', xp: 7200, streak: 3 },
  { rank: 7, name: 'Fiona Accent', avatar: 'FA', xp: 6400, streak: 21 },
  { rank: 8, name: 'George Stress', avatar: 'GS', xp: 5100, streak: 5 }
];

export const Leaderboard = () => {
  return (
    <div className="space-y-12 pb-24 font-sans max-w-5xl mx-auto">
      <header className="space-y-6 text-center">
        <div className="flex items-center justify-center gap-3">
          <div className="p-2 bg-brand-primary/5 rounded-lg">
            <Trophy className="text-brand-primary" size={24} />
          </div>
          <h2 className="text-[10px] uppercase font-mono tracking-[0.3em] font-bold text-brand-primary/40">Global Standings</h2>
        </div>
        <h1 className="text-5xl font-serif font-bold tracking-tight">The <span className="italic text-brand-accent">Pronunciation</span> Hall of Fame</h1>
        <p className="text-xl text-brand-primary/60 max-w-2xl mx-auto font-medium">Join the elite circle of IPA masters. The top 3 performers this month receive a free session with a Master Vocal Coach.</p>
      </header>

      {/* Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end py-12 px-6">
         {/* Silver */}
         <div className="relative p-10 bg-white border border-brand-primary/5 rounded-[48px] flex flex-col items-center text-center shadow-sm order-2 md:order-1 h-[280px]">
            <div className="absolute top-0 right-0 p-6">
               <span className="px-3 py-1 bg-brand-primary/5 rounded-full text-[10px] font-mono font-bold text-brand-primary/40">SILVER</span>
            </div>
            <div className="w-20 h-20 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-2xl shadow-xl mb-6 relative">
               {LEADERBOARD_DATA[1].avatar}
               <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[10px] font-bold italic">2</div>
               </div>
            </div>
            <h4 className="text-xl font-serif font-bold mb-1">{LEADERBOARD_DATA[1].name}</h4>
            <div className="flex items-center gap-2 text-brand-primary/40 text-[10px] uppercase font-mono font-bold tracking-widest">
               <Sparkles size={12} className="text-brand-accent" />
               <span>{LEADERBOARD_DATA[1].xp.toLocaleString()} XP</span>
            </div>
         </div>

         {/* Gold */}
         <div className="relative p-12 bg-brand-primary text-brand-paper rounded-[56px] flex flex-col items-center text-center shadow-2xl scale-110 z-10 order-1 md:order-2 h-[340px]">
            <div className="absolute top-0 right-0 p-6">
               <Crown className="text-brand-accent" size={32} />
               <span className="block text-[8px] font-mono font-bold tracking-widest text-brand-accent uppercase mt-2">Champion</span>
            </div>
            <div className="w-24 h-24 rounded-full bg-brand-accent flex items-center justify-center text-brand-paper font-bold text-3xl shadow-2xl shadow-brand-accent/30 mb-8 relative">
               {LEADERBOARD_DATA[0].avatar}
               <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-brand-accent text-white flex items-center justify-center text-sm font-bold italic">1</div>
               </div>
            </div>
            <h4 className="text-2xl font-serif font-bold mb-2">{LEADERBOARD_DATA[0].name}</h4>
            <div className="flex items-center gap-3 px-4 py-2 bg-white/10 rounded-full">
               <Flame size={16} className="text-orange-500" />
               <span className="text-[10px] uppercase font-mono font-bold tracking-[0.2em]">{LEADERBOARD_DATA[0].xp.toLocaleString()} XP</span>
            </div>
         </div>

         {/* Bronze */}
         <div className="relative p-10 bg-white border border-brand-primary/5 rounded-[48px] flex flex-col items-center text-center shadow-sm order-3 h-[240px]">
            <div className="absolute top-0 right-0 p-6 text-[10px] font-mono font-bold text-orange-800/40 tracking-widest">BRONZE</div>
            <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center text-orange-800 font-bold text-xl shadow-lg mb-4 relative">
               {LEADERBOARD_DATA[2].avatar}
               <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-orange-200 text-orange-800 flex items-center justify-center text-[8px] font-bold italic">3</div>
               </div>
            </div>
            <h4 className="text-lg font-serif font-bold mb-1">{LEADERBOARD_DATA[2].name}</h4>
            <div className="text-brand-primary/40 text-[10px] uppercase font-mono font-bold tracking-widest">
               {LEADERBOARD_DATA[2].xp.toLocaleString()} XP
            </div>
         </div>
      </div>

      {/* Search & Actions */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-white p-4 rounded-[32px] border border-brand-primary/5 shadow-sm">
         <div className="relative flex-1 w-full md:max-w-md">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-primary/20" size={20} />
            <input 
               type="text" 
               placeholder="Find your friends..."
               className="w-full pl-14 pr-6 py-4 bg-brand-primary/5 rounded-[24px] outline-none focus:ring-2 ring-brand-accent/20 transition-all font-medium"
            />
         </div>
         <div className="flex gap-4 w-full md:w-auto">
            <button className="flex-1 md:flex-none px-8 py-4 bg-brand-primary/5 text-brand-primary font-bold rounded-[24px] hover:bg-brand-primary/10 transition-all uppercase tracking-widest text-[10px] flex items-center justify-center gap-3">
               <Users size={16} />
               <span>Friends Only</span>
            </button>
            <button className="flex-1 md:flex-none px-8 py-4 bg-brand-primary text-brand-paper font-bold rounded-[24px] shadow-xl shadow-brand-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-widest text-[10px] flex items-center justify-center gap-3">
               <TrophyIcon size={16} className="text-brand-accent" />
               <span>Your Stats</span>
            </button>
         </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        {LEADERBOARD_DATA.slice(3).map((user) => (
          <motion.div
            key={user.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "p-6 rounded-[32px] flex items-center gap-6 transition-all group",
              user.isCurrentUser ? "bg-brand-primary text-brand-paper shadow-2xl scale-[1.02]" : "bg-white border border-brand-primary/5 hover:border-brand-primary/10"
            )}
          >
             <div className={cn("w-10 text-center font-mono font-bold text-lg", user.isCurrentUser ? "text-brand-accent" : "text-brand-primary/20")}>
                {user.rank}
             </div>
             
             <div className="flex items-center gap-4 flex-1">
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm shadow-md",
                  user.isCurrentUser ? "bg-brand-paper text-brand-primary" : "bg-brand-primary/5 text-brand-primary"
                )}>
                   {user.avatar}
                </div>
                <div>
                   <p className="font-bold tracking-tight">{user.name}</p>
                   {user.isCurrentUser && <p className="text-[9px] uppercase font-mono tracking-widest font-bold text-brand-accent">That's You!</p>}
                </div>
             </div>

             <div className="hidden sm:flex flex-col items-end mr-8">
                <p className="text-[9px] uppercase font-mono tracking-widest font-bold opacity-40">Active Streak</p>
                <div className="flex items-center gap-2">
                   <Flame size={14} className={user.isCurrentUser ? "text-brand-accent" : "text-orange-500"} />
                   <span className="font-bold">{user.streak} Days</span>
                </div>
             </div>

             <div className="flex flex-col items-end">
                <p className="text-[9px] uppercase font-mono tracking-widest font-bold opacity-40">Total LXP</p>
                <p className={cn("text-xl font-serif font-bold", user.isCurrentUser ? "text-brand-accent" : "text-brand-primary")}>
                   {user.xp.toLocaleString()}
                </p>
             </div>

             {!user.isCurrentUser && (
               <button className="w-10 h-10 rounded-full bg-brand-primary/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight size={18} className="text-brand-primary/40" />
               </button>
             )}
          </motion.div>
        ))}
      </div>

      <div className="p-12 text-center text-brand-primary/40 text-xs font-mono uppercase tracking-[0.4em] font-bold">
         Season ends in 04 Days 12h 45m
      </div>
    </div>
  );
};
