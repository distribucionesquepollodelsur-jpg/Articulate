import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Play, Lock, CheckCircle2, ChevronRight, Clock, Star, Mic2 } from 'lucide-react';
import { cn } from '../lib/utils';

const CourseCard = ({ title, level, lessons, progress, locked, description, icon: Icon, onClick }: any) => (
  <div className={cn(
    "group relative p-8 bg-white border border-brand-primary/5 rounded-[40px] transition-all hover:shadow-2xl hover:shadow-brand-accent/10 overflow-hidden",
    locked && "opacity-60 grayscale"
  )}>
    <div className="relative z-10 space-y-6">
      <div className="flex justify-between items-start">
        <div className={cn(
          "w-12 h-12 rounded-2xl flex items-center justify-center text-brand-paper",
          locked ? "bg-brand-primary/20" : "bg-brand-primary"
        )}>
           <Icon size={24} />
        </div>
        {locked ? <Lock size={20} className="text-brand-primary/20" /> : <div className="text-[10px] uppercase font-mono tracking-widest text-brand-accent font-bold px-3 py-1 bg-brand-accent/10 rounded-full">{level}</div>}
      </div>

      <div>
        <h4 className="text-2xl font-serif mb-2">{title}</h4>
        <p className="text-brand-primary/50 text-sm leading-relaxed">{description}</p>
      </div>

      <div className="flex items-center gap-4 text-[10px] uppercase font-mono tracking-widest text-brand-primary/40 font-bold">
        <span className="flex items-center gap-1.5"><Clock size={12} /> {lessons * 15} MIN</span>
        <span className="flex items-center gap-1.5"><Star size={12} /> {lessons} LESSONS</span>
      </div>

      <div className="pt-4">
        {locked ? (
          <button disabled className="w-full py-4 border border-brand-primary/10 rounded-2xl text-brand-primary/20 font-bold text-sm uppercase tracking-widest cursor-not-allowed">Locked</button>
        ) : (
          <button 
            onClick={onClick}
            className="w-full py-4 bg-brand-primary text-brand-paper rounded-2xl font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2 group-hover:scale-[1.02] active:scale-95 transition-all"
          >
            Continue <ChevronRight size={16} />
          </button>
        )}
      </div>
    </div>

    {/* Background Pattern */}
    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500 blur-2xl"></div>
  </div>
);

export const CoursePortal = ({ setView }: { setView: (v: string) => void }) => {
  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-5xl lg:text-6xl mb-4 font-serif leading-tight">
            Learning <span className="italic">Pathways</span>
          </h2>
          <p className="text-brand-primary/60 text-lg">
            Structured courses designed by university linguists to take you from 
            absolute beginner to native-level British fluency.
          </p>
        </div>
        
        <div className="p-6 glass-card border border-brand-accent/20 flex flex-col items-center">
          <span className="text-4xl font-serif font-bold text-brand-accent">12%</span>
          <span className="text-[10px] uppercase font-mono tracking-widest font-bold opacity-40">Total Mastery</span>
        </div>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <CourseCard 
          title="The Foundations"
          level="Beginner"
          lessons={8}
          description="Master the 12 pure vowels and basic mouth positioning for Received Pronunciation."
          icon={GraduationCap}
          onClick={() => setView('ipa')}
        />
        <CourseCard 
          title="Consonant Clusters"
          level="Intermediate"
          lessons={12}
          description="Focus on plosives, fricatives and the complex transitions between speech sounds."
          icon={Mic2}
          onClick={() => setView('lab')}
        />
        <CourseCard 
          title="Connected Speech"
          level="Advanced"
          lessons={15}
          description="Learn elision, assimilation, and the 'Linking R' to achieve native-like fluidity."
          icon={Play}
          locked={true}
        />
      </div>

      <section className="p-8 md:p-12 bg-white rounded-[48px] border border-brand-primary/5 flex flex-col md:flex-row items-center gap-12 overflow-hidden relative">
        <div className="flex-1 space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1 bg-brand-accent text-brand-paper rounded-full text-[10px] font-mono tracking-widest font-bold uppercase">
            New Feature
          </div>
          <h3 className="text-4xl font-serif">Daily <span className="italic">Articulation</span> Challenges</h3>
          <p className="text-brand-primary/60 text-lg leading-relaxed max-w-lg">
            Every day we release a new selection of minimal pairs to test your listening 
            and recording accuracy. Complete 7 days in a row to earn the 'Linguist' badge.
          </p>
          <button 
            onClick={() => setView('lab')}
            className="px-8 py-4 bg-brand-primary text-brand-paper rounded-2xl font-bold uppercase tracking-widest text-sm flex items-center gap-2 hover:bg-brand-accent transition-colors shadow-2xl shadow-brand-primary/20"
          >
            Start Daily Challenge <ChevronRight size={18} />
          </button>
        </div>
        <div className="md:w-1/3 relative">
           <div className="w-64 h-64 bg-brand-paper rounded-[48px] shadow-2xl border border-brand-primary/10 flex items-center justify-center transform rotate-12 group-hover:rotate-6 transition-transform">
              <CheckCircle2 size={80} className="text-brand-accent opacity-20" />
           </div>
           {/* Decorative elements */}
           <div className="absolute -top-4 -right-4 w-12 h-12 bg-brand-accent rounded-full animate-bounce"></div>
        </div>
      </section>
    </div>
  );
};
