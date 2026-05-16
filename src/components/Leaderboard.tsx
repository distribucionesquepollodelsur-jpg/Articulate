import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  Crown, 
  Flame, 
  Sparkles,
  Search,
  ArrowUpRight,
  Medal
} from 'lucide-react';
import { cn } from '../lib/utils';
import { db } from '../lib/firebase';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '../lib/firestore-utils';

interface LeaderboardUser {
  userId: string;
  displayName: string;
  avatarUrl?: string;
  xp: number;
  streak: number;
  level: number;
}

export const Leaderboard = () => {
  const [entries, setEntries] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, 'leaderboard', 'global', 'entries'),
      orderBy('xp', 'desc'),
      limit(10)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        userId: doc.id,
        ...doc.data()
      })) as LeaderboardUser[];
      setEntries(data);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'leaderboard/global/entries');
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-brand-paper gap-6 animate-pulse">
        <Trophy size={48} className="text-brand-primary animate-bounce" />
        <p className="font-mono text-[10px] uppercase tracking-[0.4em] font-bold text-brand-primary/40">Fetching Hall of Fame...</p>
      </div>
    );
  }

  const topThree = entries.slice(0, 3);
  const remaining = entries.slice(3);

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
        <p className="text-xl text-brand-primary/60 max-w-2xl mx-auto font-medium">Join the elite circle of IPA masters. All rankings are calculated from real-time activity sessions.</p>
      </header>

      {/* Podium */}
      {entries.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end py-12 px-6">
          {/* Silver - 2nd Place */}
          {topThree[1] && (
            <motion.div 
               initial={{ opacity: 0, y: 50 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.1, duration: 0.8 }}
               className="relative p-10 bg-white border border-brand-primary/5 rounded-[48px] flex flex-col items-center text-center shadow-sm order-2 md:order-1 h-[280px]"
            >
              <div className="absolute top-0 right-0 p-6">
                <span className="px-3 py-1 bg-brand-primary/5 rounded-full text-[10px] font-mono font-bold text-brand-primary/40 uppercase">Silver</span>
              </div>
              <div className="relative mb-6">
                {topThree[1].avatarUrl ? (
                  <img src={topThree[1].avatarUrl} alt="Avatar" className="w-20 h-20 rounded-full shadow-xl border-2 border-white" />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-2xl shadow-xl">{topThree[1].displayName.charAt(0)}</div>
                )}
                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center">
                   <Medal size={16} className="text-slate-400" />
                </div>
              </div>
              <h4 className="text-xl font-serif font-bold mb-1 truncate w-full px-4">{topThree[1].displayName}</h4>
              <div className="text-brand-primary/40 text-[10px] uppercase font-mono font-bold tracking-widest">
                {topThree[1].xp.toLocaleString()} XP
              </div>
            </motion.div>
          )}

          {/* Gold - 1st Place */}
          {topThree[0] && (
            <motion.div 
               initial={{ opacity: 0, y: 70 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0, duration: 0.8, type: 'spring', bounce: 0.4 }}
               className="relative p-12 bg-brand-primary text-brand-paper rounded-[56px] flex flex-col items-center text-center shadow-2xl scale-110 z-10 order-1 md:order-2 h-[340px]"
            >
              <div className="absolute top-0 right-0 p-6">
                <Crown className="text-brand-accent animate-pulse" size={32} />
              </div>
              <div className="relative mb-8">
                {topThree[0].avatarUrl ? (
                  <img src={topThree[0].avatarUrl} alt="Avatar" className="w-24 h-24 rounded-full shadow-2xl border-4 border-brand-accent/30" />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-brand-accent flex items-center justify-center text-brand-paper font-bold text-3xl shadow-2xl">{topThree[0].displayName.charAt(0)}</div>
                )}
                <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center">
                   <Trophy size={18} className="text-brand-accent" />
                </div>
              </div>
              <h4 className="text-2xl font-serif font-bold mb-2 truncate w-full px-4">{topThree[0].displayName}</h4>
              <div className="flex items-center gap-3 px-4 py-2 bg-white/10 rounded-full">
                <Flame size={16} className="text-orange-500" />
                <span className="text-[10px] uppercase font-mono font-bold tracking-[0.2em]">{topThree[0].xp.toLocaleString()} XP</span>
              </div>
            </motion.div>
          )}

          {/* Bronze - 3rd Place */}
          {topThree[2] && (
            <motion.div 
               initial={{ opacity: 0, y: 50 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2, duration: 0.8 }}
               className="relative p-10 bg-white border border-brand-primary/5 rounded-[48px] flex flex-col items-center text-center shadow-sm order-3 h-[240px]"
            >
              <div className="absolute top-0 right-0 p-6">
                 <span className="px-3 py-1 bg-brand-primary/5 rounded-full text-[10px] font-mono font-bold text-amber-800/40 uppercase">Bronze</span>
              </div>
              <div className="relative mb-4">
                {topThree[2].avatarUrl ? (
                  <img src={topThree[2].avatarUrl} alt="Avatar" className="w-16 h-16 rounded-full shadow-lg border-2 border-white" />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center text-orange-800 font-bold text-xl shadow-lg">{topThree[2].displayName.charAt(0)}</div>
                )}
                <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center">
                   <Medal size={12} className="text-amber-600" />
                </div>
              </div>
              <h4 className="text-lg font-serif font-bold mb-1 truncate w-full px-4">{topThree[2].displayName}</h4>
              <div className="text-brand-primary/40 text-[10px] uppercase font-mono font-bold tracking-widest">
                {topThree[2].xp.toLocaleString()} XP
              </div>
            </motion.div>
          )}
        </div>
      ) : (
        <div className="py-24 text-center space-y-4 bg-brand-primary/5 rounded-[64px] border-2 border-dashed border-brand-primary/10">
           <Trophy size={64} className="mx-auto text-brand-primary/10" />
           <p className="font-serif text-xl font-bold text-brand-primary/40">No entries yet. Be the first!</p>
        </div>
      )}

      {/* Remaining List */}
      <div className="space-y-4">
        {remaining.map((user, index) => (
          <motion.div
            key={user.userId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="p-6 bg-white border border-brand-primary/5 rounded-[32px] flex items-center gap-6 hover:border-brand-primary/10 transition-all group"
          >
             <div className="w-10 text-center font-mono font-bold text-lg text-brand-primary/20">
                {index + 4}
             </div>
             
             <div className="flex items-center gap-4 flex-1">
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt="Avatar" className="w-12 h-12 rounded-full shadow-md border border-white" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-brand-primary/5 flex items-center justify-center text-brand-primary font-bold text-sm shadow-md">
                    {user.displayName.charAt(0)}
                  </div>
                )}
                <div>
                   <p className="font-bold tracking-tight">{user.displayName}</p>
                   <p className="text-[9px] uppercase font-mono tracking-widest font-bold text-brand-primary/30">Level {user.level}</p>
                </div>
             </div>

             <div className="hidden sm:flex flex-col items-end mr-8">
                <p className="text-[9px] uppercase font-mono tracking-widest font-bold opacity-40">Streak</p>
                <div className="flex items-center gap-2">
                   <Flame size={14} className="text-orange-500" />
                   <span className="font-bold">{user.streak} Days</span>
                </div>
             </div>

             <div className="flex flex-col items-end">
                <p className="text-[9px] uppercase font-mono tracking-widest font-bold opacity-40">Total LXP</p>
                <p className="text-xl font-serif font-bold text-brand-primary">
                   {user.xp.toLocaleString()}
                </p>
             </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
