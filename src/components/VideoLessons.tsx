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
  Sparkles,
  Crown
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useGame } from '../contexts/GameContext';
import { useCulture } from '../contexts/CultureContext';
import { VideoPlayer } from './VideoPlayer';
import { BritishFlag } from './CulturalSymbols';

interface Lesson {
  id: string;
  title: string;
  duration: string;
  level: string;
  thumbnail: string;
  videoUrl: string;
  videoType: string;
  tags: string[];
  isLocked?: boolean;
}

const LESSONS: Lesson[] = [
  {
    id: 'intro-ipa',
    title: 'The Architecture of British Sounds',
    duration: '12:40',
    level: 'Beginner',
    thumbnail: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=400',
    videoUrl: 'https://vjs.zencdn.net/v/oceans.mp4', // Still a placeholder but will update text to emphasize RP
    videoType: 'video/mp4',
    tags: ['IPA', 'Royal Academy']
  },
  {
    id: 'vowels-mastery',
    title: 'Precision Vowels: The Queen\'s English',
    duration: '18:25',
    level: 'Intermediate',
    thumbnail: 'https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&q=80&w=400',
    videoUrl: 'https://vjs.zencdn.net/v/oceans.mp4', 
    videoType: 'video/mp4',
    tags: ['Vowels', 'RP Accent']
  },
  {
    id: 'th-consonants',
    title: 'The Fricative Mastery: /θ/ and /ð/',
    duration: '08:15',
    level: 'Beginner',
    thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=400',
    videoUrl: 'https://vjs.zencdn.net/v/oceans.mp4',
    videoType: 'video/mp4',
    tags: ['Consonants', 'Phonetics']
  },
  {
    id: 'connected-speech',
    title: 'Cultural Fluency: Linking & Intonation',
    duration: '24:50',
    level: 'Advanced',
    thumbnail: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=400',
    videoUrl: 'https://vjs.zencdn.net/v/oceans.mp4',
    videoType: 'video/mp4',
    tags: ['Rhythm', 'Diplomatic English'],
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

      {/* Production-Grade Video Player Overlay */}
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
                    <div className="hidden sm:block text-white">
                       <h4 className="font-serif text-xl font-bold">{selectedLesson.title}</h4>
                       <p className="text-[10px] uppercase font-mono tracking-widest opacity-40">Production Stream • {selectedLesson.videoType}</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-4">
                    <button 
                      onClick={handleFinishLesson}
                      className="px-6 py-3 bg-brand-accent text-brand-paper rounded-full font-bold uppercase tracking-widest text-[10px] shadow-xl shadow-brand-accent/20 hover:scale-105 active:scale-95 transition-all"
                    >
                       Finish Lesson
                    </button>
                 </div>
              </div>

              <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
                 <div className="flex-1 bg-black relative flex flex-col items-center justify-center overflow-hidden">
                    <div className="w-full max-w-5xl aspect-video relative z-10 p-4 lg:p-12">
                       <VideoPlayer 
                          src={selectedLesson.videoUrl} 
                          type={selectedLesson.videoType}
                          poster={selectedLesson.thumbnail}
                          title={selectedLesson.title}
                          onEnded={handleFinishLesson}
                       />
                    </div>
                    
                    {/* Atmospheric background */}
                    <div className="absolute inset-0 z-0">
                       <img 
                          src={selectedLesson.thumbnail} 
                          className="w-full h-full object-cover opacity-20 blur-[100px] scale-150" 
                          alt="bg"
                       />
                    </div>
                 </div>

                 <div className="w-full lg:w-[450px] bg-white p-12 overflow-y-auto space-y-12">
                    <section className="space-y-6">
                       <div className="flex items-center justify-between">
                          <h5 className="font-serif font-bold text-2xl">Linguistic Analysis</h5>
                          <div className="w-10 h-10 bg-brand-accent/10 rounded-full flex items-center justify-center text-brand-accent">
                             <Crown size={20} />
                          </div>
                       </div>
                       <p className="text-brand-primary/60 leading-relaxed font-medium">This adaptive lesson focuses on <strong>Received Pronunciation (RP)</strong>. Our AI has detected minor deviations in your vowel length; pay special attention to the lateral mouth movement demonstrated in section 2.</p>
                       <div className="p-8 bg-brand-primary text-brand-paper rounded-[40px] shadow-2xl shadow-brand-primary/20 relative overflow-hidden">
                          <div className="relative z-10">
                             <div className="flex items-center gap-2 mb-4">
                                <BritishFlag className="w-6 h-4 rounded-sm" />
                                <p className="text-[10px] font-bold text-brand-accent uppercase tracking-widest">RP Smart Target</p>
                             </div>
                             <p className="text-lg font-serif italic mb-6">"Master the rhythmic stress of British discourse."</p>
                             <div className="w-full h-1 bg-white/10 rounded-full">
                                <div className="h-full w-1/4 bg-brand-accent" />
                             </div>
                          </div>
                          <div className="absolute top-0 right-0 p-4 opacity-10">
                             <Play size={48} />
                          </div>
                       </div>
                    </section>

                    <section className="space-y-6">
                       <h5 className="font-serif font-bold text-xl">Interactive Milestones</h5>
                       <div className="space-y-3">
                          {[
                             { label: 'Phonetic Foundation', xp: 50, done: true },
                             { label: 'Articulation Accuracy Test', xp: 150 },
                             { label: 'Shadowing Challenge', xp: 75 }
                          ].map(t => (
                             <button key={t.label} className={cn(
                                "w-full p-8 rounded-[32px] border text-left flex items-center justify-between transition-all group",
                                t.done ? "bg-green-50 border-green-100" : "bg-white border-brand-primary/5 hover:border-brand-primary/20 hover:shadow-xl hover:shadow-brand-primary/5"
                             )}>
                                <div>
                                   <p className={cn("font-bold text-base mb-1", t.done ? "text-green-700" : "text-brand-primary")}>{t.label}</p>
                                   <div className="flex items-center gap-2">
                                      <div className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
                                      <p className="text-[10px] uppercase font-mono tracking-widest font-bold opacity-40">{t.xp} LXP Reward</p>
                                   </div>
                                </div>
                                {t.done ? <CheckCircle className="text-green-500" size={24} /> : <div className="w-6 h-6 rounded-full border border-brand-primary/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><ChevronRight size={16} /></div>}
                             </button>
                          ))}
                       </div>
                    </section>
                 </div>
              </div>
           </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
