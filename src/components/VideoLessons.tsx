import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  BookOpen, 
  ChevronRight, 
  Lock, 
  CheckCircle, 
  Clock, 
  Flame,
  Volume2,
  Maximize2,
  FastForward,
  MessageCircle,
  HelpCircle,
  X,
  Sparkles
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useGame } from '../contexts/GameContext';

interface Lesson {
  id: string;
  title: string;
  duration: string;
  level: string;
  thumbnail: string;
  tags: string[];
  isLocked?: boolean;
  isCompleted?: boolean;
}

const LESSONS: Lesson[] = [
  {
    id: 'intro-ipa',
    title: 'The Architecture of English Sounds',
    duration: '12:40',
    level: 'Beginner',
    thumbnail: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=400',
    tags: ['IPA', 'Theory'],
    isCompleted: true
  },
  {
    id: 'vowels-mastery',
    title: 'Vowel Placement & Mouth Shapes',
    duration: '18:25',
    level: 'Beginner',
    thumbnail: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=400',
    tags: ['Vowels', 'Articulation']
  },
  {
    id: 'th-consonants',
    title: 'Mastering the British /θ/ and /ð/',
    duration: '08:15',
    level: 'Intermediate',
    thumbnail: 'https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&q=80&w=400',
    tags: ['Consonants', 'British RP']
  },
  {
    id: 'connected-speech',
    title: 'Rhythm and Linking in Natural Speech',
    duration: '24:50',
    level: 'Advanced',
    thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=400',
    tags: ['Rhythm', 'Fluency'],
    isLocked: true
  }
];

export const VideoLessons = () => {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const { addXP, completedLessons, completeLesson } = useGame();

  const handleLessonStart = (lesson: Lesson) => {
    if (lesson.isLocked) return;
    setSelectedLesson(lesson);
    addXP(10, 'lesson', lesson.id);
  };

  const handleFinishLesson = () => {
    if (selectedLesson) {
      completeLesson(selectedLesson.id);
      setSelectedLesson(null);
    }
  };

  return (
    <div className="space-y-12 pb-24 font-sans">
      <header className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-brand-primary/5 rounded-lg">
            <BookOpen className="text-brand-primary" size={24} />
          </div>
          <h2 className="text-[10px] uppercase font-mono tracking-[0.3em] font-bold text-brand-primary/40">Masterclass Series</h2>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
           <div className="space-y-4">
              <h1 className="text-5xl font-serif font-bold tracking-tight">Interactive <span className="italic text-brand-accent">Learning</span></h1>
              <p className="text-xl text-brand-primary/60 max-w-2xl font-medium">Step-by-step video courses designed by world-class linguists and speech therapists.</p>
           </div>
           <div className="flex gap-4">
              <div className="px-6 py-4 bg-white border border-brand-primary/5 rounded-[24px] shadow-sm flex items-center gap-4">
                 <Clock className="text-brand-primary/40" size={20} />
                 <div>
                    <p className="text-[10px] uppercase font-mono font-bold tracking-widest opacity-40">Study Time</p>
                    <p className="text-lg font-serif font-bold">--h --m</p>
                 </div>
              </div>
              <div className="px-6 py-4 bg-brand-accent text-brand-paper rounded-[24px] shadow-xl shadow-brand-accent/20 flex items-center gap-4">
                 <CheckCircle size={20} />
                 <div>
                    <p className="text-[10px] uppercase font-mono font-bold tracking-widest opacity-60">Completed</p>
                    <p className="text-lg font-serif font-bold">{completedLessons.length} Lessons</p>
                 </div>
              </div>
           </div>
        </div>
      </header>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
        {LESSONS.map((lesson) => {
          const isDone = completedLessons.includes(lesson.id);
          return (
            <motion.div
              key={lesson.id}
              whileHover={{ y: -10 }}
              className="group relative flex flex-col bg-white border border-brand-primary/5 rounded-[40px] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-brand-primary/10 transition-all cursor-pointer"
              onClick={() => handleLessonStart(lesson)}
            >
               <div className="relative aspect-[16/10] overflow-hidden">
                  <img 
                    src={lesson.thumbnail} 
                    alt={lesson.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-brand-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                     <div className="w-16 h-16 rounded-full bg-white text-brand-primary flex items-center justify-center shadow-2xl animate-in zoom-in-50 duration-300">
                        {lesson.isLocked ? <Lock size={24} /> : <Play size={24} fill="currentColor" />}
                     </div>
                  </div>
                  {isDone && (
                     <div className="absolute top-4 right-4 bg-green-500 text-white p-2 rounded-full shadow-lg">
                        <CheckCircle size={14} />
                     </div>
                  )}
                  <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-lg text-[10px] font-mono text-white font-bold">
                     {lesson.duration}
                  </div>
               </div>

               <div className="p-8 flex-1 flex flex-col">
                  <div className="flex gap-2 mb-4">
                     {lesson.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-brand-primary/5 rounded-full text-[9px] uppercase font-mono font-bold tracking-widest text-brand-primary/40">
                           {tag}
                        </span>
                     ))}
                  </div>
                  <h3 className="text-xl font-serif font-bold mb-4 leading-tight group-hover:text-brand-accent transition-colors">{lesson.title}</h3>
                  <div className="mt-auto pt-6 border-t border-brand-primary/5 flex items-center justify-between text-[10px] uppercase font-mono font-bold tracking-widest text-brand-primary/40">
                     <span>{lesson.level}</span>
                     <ChevronRight size={14} />
                  </div>
               </div>
            </motion.div>
          );
        })}
      </div>

      {/* Interactive Player Simulation */}
      <AnimatePresence>
        {selectedLesson && (
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 bg-brand-primary z-[200] flex flex-col overflow-hidden"
           >
              <div className="flex items-center justify-between p-8 border-b border-white/5">
                 <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setSelectedLesson(null)}
                      className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-colors"
                    >
                       <X size={24} />
                    </button>
                    <div className="hidden sm:block">
                       <h4 className="text-white font-serif text-lg font-bold">{selectedLesson.title}</h4>
                       <p className="text-white/40 text-xs font-mono uppercase tracking-widest">Section 1: Theoretical Foundation</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-4">
                    <button 
                      onClick={handleFinishLesson}
                      className="px-6 py-3 bg-brand-accent text-brand-paper rounded-full font-bold uppercase tracking-widest text-[10px] hover:scale-105 transition-transform"
                    >
                       Finish Lesson
                    </button>
                 </div>
              </div>

              <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
                 <div className="flex-1 bg-black relative flex flex-col items-center justify-center group overflow-hidden">
                    <img 
                      src={selectedLesson.thumbnail} 
                      className="w-full h-full object-cover opacity-60 blur-2xl absolute inset-0 scale-110" 
                      alt="bg"
                    />
                    <div className="relative z-10 w-full max-w-4xl aspect-video bg-brand-paper rounded-[48px] shadow-2xl overflow-hidden group">
                       <img src={selectedLesson.thumbnail} className="w-full h-full object-cover" alt="video" />
                       <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <button className="w-24 h-24 rounded-full bg-white/90 backdrop-blur-xl text-brand-primary flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all">
                             <Play size={40} fill="currentColor" />
                          </button>
                       </div>
                    </div>
                    
                    {/* Floating Controls */}
                    <div className="absolute bottom-12 inset-x-12 z-20 flex flex-col gap-6">
                       <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden cursor-pointer group/seek">
                          <div className="h-full w-1/3 bg-brand-accent relative">
                             <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-xl opacity-0 group-hover/seek:opacity-100 transition-opacity" />
                          </div>
                       </div>
                       <div className="flex items-center justify-between text-white">
                          <div className="flex items-center gap-8">
                             <button><FastForward size={24} className="rotate-180" /></button>
                             <button><Play size={28} fill="currentColor" /></button>
                             <button><FastForward size={24} /></button>
                             <div className="flex items-center gap-4 ml-4">
                                <Volume2 size={20} />
                                <div className="w-24 h-1 bg-white/20 rounded-full">
                                   <div className="w-2/3 h-full bg-white" />
                                </div>
                             </div>
                             <span className="text-sm font-mono opacity-60">04:20 / {selectedLesson.duration}</span>
                          </div>
                          <div className="flex items-center gap-8">
                             <button className="px-3 py-1 rounded bg-white/10 text-xs font-bold font-mono">1.0x</button>
                             <button><Maximize2 size={20} /></button>
                          </div>
                       </div>
                    </div>
                 </div>

                 <div className="w-full lg:w-[450px] bg-white p-12 overflow-y-auto space-y-12">
                    <section className="space-y-6">
                       <div className="flex items-center justify-between">
                          <h5 className="font-serif font-bold text-2xl">Lesson Notes</h5>
                          <button className="p-3 rounded-full bg-brand-primary/5 text-brand-primary/40 hover:text-brand-primary transition-colors">
                             <HelpCircle size={20} />
                          </button>
                       </div>
                       <p className="text-brand-primary/60 leading-relaxed font-medium">In this lesson, we explore the physiological basis of phonetics. We'll identify the key articulators used in British English and how their positioning creates distinct sounds on the IPA chart.</p>
                       <div className="p-6 bg-brand-accent/10 rounded-3xl border border-brand-accent/20">
                          <p className="text-xs font-bold text-brand-accent uppercase tracking-widest mb-2">Pro Tip</p>
                          <p className="text-brand-primary/80 text-sm font-medium italic">Focus on the vibration of your vocal cords during the voiced consonants. Use your hand to feel the difference.</p>
                       </div>
                    </section>

                    <section className="space-y-6">
                       <h5 className="font-serif font-bold text-xl">Interactive Tasks</h5>
                       <div className="space-y-3">
                          {[
                             { label: 'Identify the Glottal Stop', xp: 50, done: true },
                             { label: 'Map the Vowel Quadrilateral', xp: 100 },
                             { label: 'Practice /th/ Minimal Pairs', xp: 75 }
                          ].map(t => (
                             <button key={t.label} className={cn(
                                "w-full p-6 rounded-3xl border text-left flex items-center justify-between transition-all",
                                t.done ? "bg-green-50 border-green-100" : "bg-white border-brand-primary/5 hover:border-brand-primary/10"
                             )}>
                                <div>
                                   <p className={cn("font-bold text-sm", t.done ? "text-green-700" : "text-brand-primary")}>{t.label}</p>
                                   <p className="text-[10px] uppercase font-mono tracking-widest font-bold opacity-40">Challenge: {t.xp} XP</p>
                                </div>
                                {t.done ? <CheckCircle className="text-green-500" size={20} /> : <div className="w-6 h-6 rounded-full border-2 border-brand-primary/10" />}
                             </button>
                          ))}
                       </div>
                    </section>

                    <button className="w-full py-6 bg-brand-primary text-brand-paper rounded-3xl font-bold uppercase tracking-widest shadow-2xl shadow-brand-primary/20 flex items-center justify-center gap-4 group">
                       <Sparkles size={20} className="text-brand-accent" />
                       <span>Ask AI Tutor</span>
                       <MessageCircle size={20} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                    </button>
                 </div>
              </div>
           </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
