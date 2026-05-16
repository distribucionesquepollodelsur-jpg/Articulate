/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Layout } from './components/Layout';
import { IPAChart } from './components/IPAChart';
import { ArticulationLab } from './components/ArticulationLab';
import { CoursePortal } from './components/CoursePortal';
import { Dictionary } from './components/Dictionary';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Trophy, Flame, ChevronRight, Mic2, Grid3X3, BookOpen, Search, Settings } from 'lucide-react';
import { cn } from './lib/utils';

const Dashboard = ({ setView }: { setView: (v: string) => void }) => {
  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif leading-tight">
            Good morning, <br />
            <span className="italic">Linguist.</span>
          </h1>
          <p className="text-brand-primary/40 mt-4 text-xl font-serif italic">
            "Speech is a mirror of the soul." — Publilius Syrus
          </p>
        </div>
        <div className="flex gap-4">
          <div className="p-6 bg-white border border-brand-primary/5 rounded-[32px] flex flex-col items-center min-w-[120px] shadow-sm">
             <Flame className="text-orange-500 mb-2" size={24} />
             <span className="text-3xl font-serif font-bold">14</span>
             <span className="text-[10px] uppercase font-mono tracking-widest font-bold opacity-40">Day Streak</span>
          </div>
          <div className="p-6 bg-white border border-brand-primary/5 rounded-[32px] flex flex-col items-center min-w-[120px] shadow-sm">
             <Trophy className="text-yellow-500 mb-2" size={24} />
             <span className="text-3xl font-serif font-bold">2,450</span>
             <span className="text-[10px] uppercase font-mono tracking-widest font-bold opacity-40">LXP Points</span>
          </div>
        </div>
      </header>

      {/* Quick Actions */}
      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.button 
          whileHover={{ y: -5 }}
          onClick={() => setView('ipa')}
          className="p-8 bg-brand-primary text-brand-paper rounded-[40px] text-left space-y-6 shadow-2xl shadow-brand-primary/30 group"
        >
          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
            <Grid3X3 size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-serif mb-2">Explore the IPA</h3>
            <p className="text-brand-paper/60 text-sm leading-relaxed">Discover 44 phonemes of British English articulation.</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest font-bold text-brand-accent">
            Open Chart <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </motion.button>

        <motion.button 
          whileHover={{ y: -5 }}
          onClick={() => setView('lab')}
          className="p-8 bg-white border border-brand-primary/5 rounded-[40px] text-left space-y-6 shadow-sm group"
        >
          <div className="w-12 h-12 bg-brand-primary/5 rounded-2xl flex items-center justify-center text-brand-primary">
            <Mic2 size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-serif mb-2">Articulation Lab</h3>
            <p className="text-brand-primary/40 text-sm leading-relaxed">Practice your pronunciation with our AI-powered coach.</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest font-bold text-brand-primary/60">
            Start Recording <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </motion.button>

        <motion.button 
          whileHover={{ y: -5 }}
          onClick={() => setView('lessons')}
          className="p-8 bg-brand-accent text-brand-paper rounded-[40px] text-left space-y-6 shadow-2xl shadow-brand-accent/30 group"
        >
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
            <BookOpen size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-serif mb-2">Continue Learning</h3>
            <p className="text-brand-paper/80 text-sm leading-relaxed">Resume: "Vowels of South-East England" lesson.</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest font-bold text-brand-paper">
            Go to Lesson <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </motion.button>
      </section>

      {/* Progress Section */}
      <section className="grid lg:grid-cols-2 gap-8">
        <div className="p-10 bg-white rounded-[48px] border border-brand-primary/5 space-y-8">
          <div className="flex items-center justify-between">
            <h4 className="text-2xl font-serif uppercase tracking-tight">Recent <span className="italic">History</span></h4>
            <button className="text-xs font-mono uppercase tracking-widest font-bold opacity-40 hover:opacity-100 transition-opacity">View All</button>
          </div>
          
          <div className="space-y-6">
            {[
              { sound: 'θ', name: 'Voiceless Dental Fricative', score: 92, time: '2 hours ago' },
              { sound: 'æ', name: 'Near-Open Front Unrounded', score: 78, time: 'Daily Challenge' },
              { sound: 'ʃ', name: 'Voiceless Postalveolar Fricative', score: 85, time: 'Yesterday' },
            ].map((item, i) => (
              <div 
                key={i} 
                onClick={() => setView('lab')}
                className="flex items-center gap-6 group cursor-pointer"
              >
                <div className="text-3xl font-serif w-12 h-12 flex items-center justify-center bg-brand-primary/5 rounded-2xl group-hover:bg-brand-primary group-hover:text-brand-paper transition-all">
                  {item.sound}
                </div>
                <div className="flex-1">
                  <h5 className="font-medium text-sm text-brand-primary tracking-tight">{item.name}</h5>
                  <span className="text-[10px] text-brand-primary/40 font-mono font-bold uppercase tracking-widest">{item.time}</span>
                </div>
                <div className="text-right">
                  <div className="text-xl font-serif font-bold">{item.score}%</div>
                  <div className="w-16 h-1.5 bg-brand-primary/5 rounded-full overflow-hidden mt-1">
                    <div className="h-full bg-brand-accent transition-all duration-1000" style={{ width: `${item.score}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-10 bg-brand-primary text-brand-paper rounded-[48px] space-y-8 shadow-2xl relative overflow-hidden">
          <Sparkles className="absolute top-10 right-10 text-brand-accent opacity-20" size={120} />
          <div className="relative z-10 space-y-6">
            <h4 className="text-5xl font-serif leading-tight">Master <br /> <span className="italic text-brand-accent">Connected</span> Speech.</h4>
            <p className="text-brand-paper/60 text-lg leading-relaxed max-w-sm">
              Unlock the secrets of British fluidity by learning how sounds transform when we speak at natural speeds.
            </p>
            <div className="pt-4">
              <button 
                onClick={() => setView('lessons')}
                className="px-10 py-5 bg-white text-brand-primary rounded-full font-bold text-lg uppercase tracking-widest hover:scale-105 transition-transform shadow-xl shadow-brand-primary/40"
              >
                Unlock Course
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default function App() {
  const [view, setView] = React.useState('home');

  return (
    <Layout activeView={view} setView={setView}>
      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        >
          {view === 'home' && <Dashboard setView={setView} />}
          {view === 'ipa' && <IPAChart />}
          {view === 'lab' && <ArticulationLab />}
          {view === 'lessons' && <CoursePortal setView={setView} />}
          {view === 'dictionary' && <Dictionary />}
          {view === 'settings' && (
             <div className="flex flex-col items-center justify-center p-24 text-brand-primary/20 space-y-4">
                <Settings size={64} />
                <p className="font-serif italic text-2xl">Settings coming soon...</p>
             </div>
          )}
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
}
