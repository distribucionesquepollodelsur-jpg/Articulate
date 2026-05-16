/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Layout } from './components/Layout';
import { IPAChart } from './components/IPAChart';
import { ArticulationLab } from './components/ArticulationLab';
import { VideoLessons } from './components/VideoLessons';
import { Dictionary } from './components/Dictionary';
import { Studio } from './components/Studio';
import { Games } from './components/Games';
import { Leaderboard } from './components/Leaderboard';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Trophy, Flame, ChevronRight, Mic2, Grid3X3, BookOpen, Search, Settings, Music, Gamepad2, Award, Users, Play, ArrowRight, Crown } from 'lucide-react';
import { cn } from './lib/utils';
import { useGame, GameProvider } from './contexts/GameContext';

import { BritishFlag, CommonwealthEmblem } from './components/CulturalSymbols';
import { RoyalHeritageFrame } from './components/RoyalHeritageFrame';
import { RoyalPortrait } from './components/RoyalPortrait';

const RecommendationCard = ({ setView }: { setView: (v: string) => void }) => {
  const { recommendation, fetchRecommendation } = useGame();
  
  if (!recommendation) return null;

  const handleNavigate = () => {
    const viewMap: Record<string, string> = {
      'lab': 'lab',
      'lesson': 'lessons',
      'game': 'games',
      'explore': 'ipa'
    };
    setView(viewMap[recommendation.type] || 'home');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 bg-gradient-to-r from-brand-accent to-[#FF7A52] rounded-[48px] text-white shadow-2xl shadow-brand-accent/30 relative overflow-hidden group cursor-pointer"
      onClick={handleNavigate}
    >
       <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                <Sparkles size={20} />
             </div>
             <span className="text-[10px] uppercase font-mono font-bold tracking-[0.2em]">Adaptive Intelligence Recommendation</span>
          </div>
          <h3 className="text-3xl font-serif font-bold leading-tight max-w-xl">
             {recommendation.recommendation}
          </h3>
          <div className="flex items-center gap-4">
             <div className="px-6 py-3 bg-white text-brand-accent rounded-full font-bold uppercase tracking-widest text-[10px] group-hover:scale-105 transition-transform flex items-center gap-2">
                <span>Start Session</span>
                <ChevronRight size={14} />
             </div>
             <button 
               onClick={(e) => { e.stopPropagation(); fetchRecommendation(); }}
               className="text-[10px] font-mono font-bold uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity"
             >
                Re-Analyze My Level
             </button>
          </div>
       </div>
       <div className="absolute top-1/2 right-[-5%] -translate-y-1/2 opacity-10 group-hover:rotate-6 group-hover:scale-110 transition-all duration-700">
          <Mic2 size={320} />
       </div>
    </motion.div>
  );
};

const Dashboard = ({ setView }: { setView: (v: string) => void }) => {
  const { xp, streak, level, user } = useGame();

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="space-y-2">
          <h2 className="text-5xl font-serif font-bold tracking-tight">
            Welcome back, <br/>
            <span className="italic text-brand-accent">{user?.displayName?.split(' ')[0] || 'Linguist'}</span>
          </h2>
          <p className="text-xl text-brand-primary/40 font-medium tracking-tight">Your pronunciation logs are synced with our RP engine.</p>
        </div>
        <div className="flex gap-4 scroll-hidden overflow-x-auto pb-4 lg:pb-0">
          <div className="p-6 bg-white border border-brand-primary/5 rounded-[32px] flex flex-col items-center min-w-[120px] shadow-sm">
             <span className="text-[10px] uppercase font-mono tracking-widest font-bold opacity-40 mb-1">Level</span>
             <span className="text-3xl font-serif font-bold">{level}</span>
          </div>
          <motion.div 
            whileHover={{ y: -5 }}
            className="p-6 bg-white border border-brand-primary/5 rounded-[42px] flex flex-col items-center min-w-[140px] shadow-xl shadow-brand-primary/5 cursor-pointer"
            onClick={() => setView('leaderboard')}
          >
             <Flame className="text-orange-500 mb-2" size={24} />
             <span className="text-3xl font-serif font-bold">{streak}</span>
             <span className="text-[10px] uppercase font-mono tracking-widest font-bold opacity-40 tracking-tighter">Day Streak</span>
          </motion.div>
          <div className="p-8 bg-brand-primary text-brand-paper rounded-[42px] flex flex-col items-center min-w-[160px] shadow-2xl shadow-brand-primary/20 bg-gradient-to-br from-brand-primary to-[#2A2A2A]">
             <Trophy className="text-brand-accent mb-3" size={32} />
             <span className="text-4xl font-serif font-bold mb-1">{xp.toLocaleString()}</span>
             <span className="text-[10px] uppercase font-mono tracking-[0.2em] font-bold opacity-60">Total LXP</span>
          </div>
        </div>
      </header>

      <RecommendationCard setView={setView} />

      <section className="col-span-full">
         <div className="p-12 bg-white border border-brand-primary/5 rounded-[48px] flex flex-col md:flex-row items-center gap-12 relative overflow-hidden group">
            <div className="flex-1 space-y-6 relative z-10">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-8 rounded-md overflow-hidden shadow-sm">
                     <BritishFlag className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[10px] uppercase font-mono font-bold tracking-[0.3em] text-brand-primary/40">Linguistic Heritage</span>
               </div>
               <h3 className="text-4xl font-serif font-bold leading-tight">Master the <span className="italic">Received Pronunciation</span> Prestige.</h3>
               <p className="text-brand-primary/60 text-lg leading-relaxed max-w-xl">
                  Connect with the articulation patterns used by the BBC, the Royal Family, and esteemed academic institutions across the Commonwealth. 
                  Our AI specifically targets the subtle distinctions of British phonetics.
               </p>
               <div className="flex flex-wrap gap-4">
                  {['England', 'Scotland', 'Wales', 'N. Ireland', 'Canada', 'Australia'].map(territory => (
                    <div key={territory} className="px-4 py-2 bg-brand-primary/5 rounded-full text-[9px] uppercase font-mono font-bold tracking-widest text-brand-primary/60 hover:bg-brand-accent/10 hover:text-brand-accent transition-colors">
                       {territory}
                    </div>
                  ))}
               </div>
            </div>
            <div className="relative w-full md:w-64 flex flex-col items-center gap-4">
               <RoyalPortrait size="lg" className="z-10 group-hover:scale-105 transition-transform duration-700" />
               <div className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-brand-paper rounded-full shadow-lg relative z-20 -mt-6 backdrop-blur-md">
                  <Crown size={14} className="text-brand-accent animate-pulse" />
                  <span className="text-[9px] uppercase font-mono font-bold tracking-widest italic">Official RP Tradition</span>
               </div>
               <div className="absolute inset-0 bg-brand-accent/10 rounded-full blur-3xl scale-125 opacity-30 pointer-events-none" />
            </div>
         </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <motion.button 
          whileHover={{ y: -8, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setView('lab')}
          className="group p-10 bg-white border border-brand-primary/5 rounded-[56px] text-left shadow-sm hover:shadow-2xl hover:shadow-brand-primary/10 transition-all flex flex-col h-[420px] overflow-hidden relative"
        >
          <div className="w-16 h-16 bg-brand-primary/5 rounded-[24px] flex items-center justify-center text-brand-primary mb-8 group-hover:bg-brand-primary group-hover:text-brand-paper transition-all">
            <Mic2 size={32} />
          </div>
          <h3 className="text-3xl font-serif font-bold mb-3">Articulation <span className="italic">Lab</span></h3>
          <p className="text-brand-primary/40 leading-relaxed font-medium mb-8">Test your vocal accuracy with our advanced AI feedback engine. Real-time pitch and formants analysis.</p>
          
          <div className="mt-auto flex items-center justify-between">
             <span className="px-4 py-2 bg-brand-primary/5 rounded-full text-[10px] uppercase font-mono font-bold tracking-widest text-brand-primary/40 group-hover:bg-brand-primary/10 transition-colors">Launch AI Coach</span>
             <div className="w-12 h-12 rounded-full border border-brand-primary/10 flex items-center justify-center group-hover:bg-brand-primary group-hover:text-white transition-all">
                <ChevronRight size={20} />
             </div>
          </div>
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-brand-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.button>

        <motion.button 
          whileHover={{ y: -8, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setView('games')}
          className="group p-10 bg-brand-accent rounded-[56px] text-left shadow-2xl shadow-brand-accent/20 transition-all flex flex-col h-[420px] relative overflow-hidden"
        >
          <div className="w-16 h-16 bg-white/20 rounded-[24px] flex items-center justify-center text-white mb-8 shadow-inner ring-1 ring-white/10">
            <Gamepad2 size={32} />
          </div>
          <h3 className="text-3xl font-serif font-bold text-brand-paper mb-3">Gaming Arena</h3>
          <p className="text-brand-paper/70 leading-relaxed font-medium mb-8">Master sounds through play. Compete for ranks and unlock rare achievement badges.</p>
          
          <div className="mt-auto flex items-center justify-between">
             <span className="px-4 py-2 bg-white/20 rounded-full text-[10px] uppercase font-mono font-bold tracking-widest text-white group-hover:bg-white/30 transition-colors">Start Hunting</span>
             <div className="w-12 h-12 rounded-full bg-white text-brand-accent flex items-center justify-center shadow-lg transition-transform group-hover:translate-x-1">
                <ChevronRight size={20} />
             </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[100px] rounded-full" />
        </motion.button>

        <motion.button 
          whileHover={{ y: -8, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setView('studio')}
          className="group p-10 bg-white border border-brand-primary/5 rounded-[56px] text-left shadow-sm hover:shadow-2xl hover:shadow-brand-primary/10 transition-all flex flex-col h-[420px] relative overflow-hidden"
        >
          <div className="w-16 h-16 bg-brand-primary/5 rounded-[24px] flex items-center justify-center text-brand-primary mb-8 group-hover:bg-brand-primary group-hover:text-brand-paper transition-all">
            <Music size={32} />
          </div>
          <h3 className="text-3xl font-serif font-bold mb-3">Phonetic <span className="italic">Karaoke</span></h3>
          <p className="text-brand-primary/40 leading-relaxed font-medium mb-8">Learn British English through the rhythm of music. Song lyrics presented exclusively in IPA.</p>
          
          <div className="mt-auto flex items-center justify-between">
             <span className="px-4 py-2 bg-brand-primary/5 rounded-full text-[10px] uppercase font-mono font-bold tracking-widest text-brand-primary/40 group-hover:bg-brand-primary/10 transition-colors">Enter Studio</span>
             <div className="w-12 h-12 rounded-full border border-brand-primary/10 flex items-center justify-center group-hover:bg-brand-primary group-hover:text-white transition-all">
                <ChevronRight size={20} />
             </div>
          </div>
        </motion.button>
      </section>

      {/* Social Feed Concept */}
      <section className="p-12 bg-white border border-brand-primary/5 rounded-[64px] shadow-sm flex flex-col lg:flex-row gap-12 items-center">
         <div className="flex-1 space-y-6">
            <div className="flex items-center gap-2">
               <div className="px-3 py-1 bg-brand-accent/10 rounded-full text-[10px] uppercase font-mono font-bold text-brand-accent tracking-widest">Global Status</div>
               <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-brand-primary/20">Updated 2m ago</span>
            </div>
            <h3 className="text-4xl font-serif font-bold leading-tight">Join the Elite <br/><span className="text-brand-accent italic">Phoneticists</span> Circle</h3>
            <div className="flex -space-x-4 mb-6">
               {[1,2,3,4,5].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-brand-primary/5 flex items-center justify-center text-[10px] font-bold text-brand-primary font-mono shadow-xl relative group cursor-pointer">
                     <span className="group-hover:opacity-0 transition-opacity">USER {i}</span>
                     <div className="absolute inset-0 bg-brand-accent opacity-0 group-hover:opacity-100 transition-opacity rounded-full flex items-center justify-center text-white scale-110">
                        <Users size={16} />
                     </div>
                  </div>
               ))}
               <div className="w-12 h-12 rounded-full border-4 border-white bg-brand-accent text-white flex items-center justify-center text-xs font-bold shadow-xl cursor-pointer hover:scale-110 transition-transform">
                  +2.5k
               </div>
            </div>
            <button 
              onClick={() => setView('leaderboard')}
              className="px-8 py-4 bg-brand-primary text-brand-paper rounded-[24px] font-bold uppercase tracking-widest text-[10px] shadow-xl shadow-brand-primary/20 flex items-center gap-3 group"
            >
               <Award size={18} className="text-brand-accent" />
               <span>View Full Leaderboards</span>
               <ArrowRight size={16} className="opacity-40 group-hover:opacity-100 transition-opacity group-hover:translate-x-1" />
            </button>
         </div>
         <div className="w-full lg:w-[450px] aspect-square bg-brand-paper rounded-[48px] border border-brand-primary/5 p-8 flex flex-col justify-center gap-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent opacity-5 blur-[100px] rounded-full" />
            
            <div className="p-6 bg-white rounded-[32px] shadow-xl shadow-brand-primary/5 border border-brand-primary/5 flex items-center gap-4 animate-in slide-in-from-right duration-700">
               <div className="w-12 h-12 rounded-full bg-brand-accent flex items-center justify-center text-white font-bold text-xs uppercase shadow-lg shadow-brand-accent/20">AP</div>
               <div>
                  <p className="text-sm font-bold">Alice Phonetics</p>
                  <p className="text-[9px] uppercase font-mono tracking-widest font-bold opacity-40 italic">Just unlocked "Vowel King"</p>
               </div>
               <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="ml-auto w-10 h-10 rounded-full bg-brand-primary/5 flex items-center justify-center text-brand-accent">
                  <Flame size={18} />
               </motion.div>
            </div>

            <div className="p-6 bg-white rounded-[32px] shadow-xl shadow-brand-primary/5 border border-brand-primary/5 flex items-center gap-4 animate-in slide-in-from-left duration-1000 delay-300">
               <div className="w-12 h-12 rounded-full bg-brand-primary/5 flex items-center justify-center text-brand-primary font-bold text-xs uppercase">JS</div>
               <div>
                  <p className="text-sm font-bold">James Stewart</p>
                  <p className="text-[9px] uppercase font-mono tracking-widest font-bold opacity-40">Earned 500 XP in "Sound Hunter"</p>
               </div>
               <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="ml-auto w-10 h-10 rounded-full bg-brand-primary/5 flex items-center justify-center text-brand-accent">
                  <Trophy size={18} />
               </motion.div>
            </div>
         </div>
      </section>
    </div>
  );
};

export default function App() {
  const [view, setView] = React.useState('home');

  return (
    <GameProvider>
      <Layout activeView={view} setView={setView}>
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="view-switch">
            {view === 'home' && <Dashboard setView={setView} />}
            {view === 'ipa' && <IPAChart />}
            {view === 'lab' && <ArticulationLab />}
            {view === 'lessons' && <VideoLessons />}
            {view === 'games' && <Games />}
            {view === 'leaderboard' && <Leaderboard />}
            {view === 'studio' && <Studio />}
            {view === 'dictionary' && <Dictionary />}
            {view === 'settings' && (
               <div className="flex flex-col items-center justify-center p-24 text-brand-primary/20 space-y-4">
                  <Settings size={64} />
                  <p className="font-serif italic text-2xl">Settings coming soon...</p>
               </div>
            )}
            </div>
          </motion.div>
        </AnimatePresence>
      </Layout>
    </GameProvider>
  );
}
