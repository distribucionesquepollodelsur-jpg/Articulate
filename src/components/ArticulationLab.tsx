import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic2, Play, Square, Loader2, RefreshCcw, Sparkles, AlertCircle, Volume2, ChevronDown } from 'lucide-react';
import { cn, VOWELS, CONSONANTS } from '../lib/utils';
import { audioService } from '../lib/audio';
import { useGame } from '../contexts/GameContext';

// Simple Articulation Animation (SVG based)
const MouthVisualizer = ({ active, sound }: { active: boolean, sound: any }) => {
  return (
    <div className="relative aspect-square w-full max-w-md mx-auto bg-white/40 rounded-[48px] border border-brand-primary/5 flex items-center justify-center p-12">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {/* Mouth Profile Outline */}
        <motion.path
          d="M 40,100 Q 40,40 100,40 Q 160,40 160,100 Q 160,160 100,160 Q 40,160 40,100"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-brand-primary/10"
        />
        
        {/* Tongue */}
        <motion.path
          animate={active ? {
            d: sound?.place === 'alveolar' 
              ? "M 100,140 Q 100,100 80,60 Q 40,110 100,140" 
              : "M 100,140 Q 120,110 140,80 Q 60,110 100,140",
            scale: [1, 1.05, 1]
          } : {
            d: "M 100,140 Q 100,110 100,100 Q 60,110 100,140",
            scale: 1
          }}
          fill="currentColor"
          className="text-brand-accent/40"
        />

        {/* Airflow */}
        {active && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.path
              d="M 100,80 Q 140,80 180,80"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="5 10"
              className="text-brand-accent"
              animate={{ strokeDashoffset: [0, -30] }}
              transition={{ repeat: Infinity, duration: 0.5, ease: 'linear' }}
            />
          </motion.g>
        )}
      </svg>
      
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <AnimatePresence>
          {active && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="w-32 h-32 rounded-full border-4 border-brand-accent/20 animate-ping"
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export const ArticulationLab = () => {
  const [isRecording, setIsRecording] = React.useState(false);
  const [recordingBlob, setRecordingBlob] = React.useState<Blob | null>(null);
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);
  const [feedback, setFeedback] = React.useState<any>(null);
  const [selectedSound, setSelectedSound] = React.useState<any>(VOWELS[0]);
  const [showSoundPicker, setShowSoundPicker] = React.useState(false);
  
  const mediaRecorderRef = React.useRef<MediaRecorder | null>(null);
  const chunksRef = React.useRef<Blob[]>([]);

  const { addXP } = useGame();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setRecordingBlob(blob);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setFeedback(null);
    } catch (err) {
      console.error("Recording failed:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const analyzePronunciation = async () => {
    if (!recordingBlob) return;
    setIsAnalyzing(true);
    
    try {
      const reader = new FileReader();
      reader.readAsDataURL(recordingBlob);
      reader.onloadend = async () => {
        const base64Audio = (reader.result as string).split(',')[1];
        
        const response = await fetch('/api/pronunciation-feedback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            audio: base64Audio,
            soundSymbol: selectedSound?.symbol || 'ə',
            contextWord: selectedSound?.examples?.[0] || 'schwa'
          })
        });
        
        const data = await response.json();
        setFeedback(data);
        addXP(50);
        setIsAnalyzing(false);
      };
    } catch (err) {
      console.error("Analysis failed:", err);
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-12">
      <header className="max-w-2xl">
        <h2 className="text-4xl md:text-5xl lg:text-6xl mb-4 font-serif leading-tight">
          Articulation <span className="italic">Lab</span>
        </h2>
        <p className="text-brand-primary/60 text-lg">
          Master the physical production of British sounds. 
          Record your speech and receive real-time AI feedback on your articulation.
        </p>
      </header>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Left: Visualizer & Controls */}
        <div className="space-y-8">
          <MouthVisualizer active={isRecording} sound={selectedSound} />
          
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-full max-w-xs">
              <button 
                onClick={() => setShowSoundPicker(!showSoundPicker)}
                className="w-full px-6 py-4 bg-white border border-brand-primary/10 rounded-2xl flex items-center justify-between hover:border-brand-primary/30 transition-all font-serif text-xl"
              >
                Practice: /{selectedSound?.symbol}/
                <ChevronDown className={cn("transition-transform", showSoundPicker && "rotate-180")} />
              </button>

              <AnimatePresence>
                {showSoundPicker && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 right-0 mt-2 p-4 bg-white border border-brand-primary/10 rounded-2xl shadow-2xl z-[100] max-h-[300px] overflow-y-auto grid grid-cols-4 gap-2"
                  >
                    {[...VOWELS, ...CONSONANTS].map((s) => (
                      <button
                        key={s.symbol}
                        onClick={() => {
                          setSelectedSound(s);
                          setShowSoundPicker(false);
                          setFeedback(null);
                        }}
                        className={cn(
                          "p-3 rounded-xl border flex items-center justify-center font-serif text-xl hover:bg-brand-primary/5 transition-colors",
                          selectedSound?.symbol === s.symbol ? "bg-brand-primary text-white border-brand-primary" : "border-brand-primary/5"
                        )}
                      >
                        {s.symbol}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button 
              onClick={() => audioService.speakIPASound(selectedSound?.symbol, selectedSound?.examples)}
              className="flex items-center gap-2 px-6 py-3 bg-brand-light text-brand-primary rounded-full font-medium hover:bg-brand-primary hover:text-white transition-all"
            >
              <Volume2 size={18} />
              Play Reference Sound
            </button>
          </div>

          <div className="flex items-center justify-center gap-6">
            {!isRecording ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startRecording}
                className="w-20 h-20 rounded-full bg-brand-primary text-brand-paper flex items-center justify-center shadow-2xl shadow-brand-primary/20"
              >
                <Mic2 size={32} />
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={stopRecording}
                className="w-20 h-20 rounded-full bg-red-500 text-brand-paper flex items-center justify-center shadow-2xl shadow-red-500/20"
              >
                <Square size={32} />
              </motion.button>
            )}

            {recordingBlob && !isRecording && (
              <button 
                onClick={() => {
                  const audio = new Audio(URL.createObjectURL(recordingBlob));
                  audio.play();
                }}
                className="w-16 h-16 rounded-full bg-brand-accent/10 text-brand-accent flex items-center justify-center hover:bg-brand-accent/20 transition-colors"
              >
                <Play size={24} />
              </button>
            )}
          </div>

          {recordingBlob && !isRecording && !feedback && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={analyzePronunciation}
              disabled={isAnalyzing}
              className="w-full py-6 bg-brand-primary text-brand-paper rounded-3xl font-bold text-xl flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isAnalyzing ? <Loader2 className="animate-spin" /> : <Sparkles />}
              {isAnalyzing ? 'Analyzing Articulation...' : 'Get AI Feedback'}
            </motion.button>
          )}

          {feedback && (
            <button 
              onClick={() => {
                setFeedback(null);
                setRecordingBlob(null);
              }}
              className="w-full py-4 text-brand-primary/40 font-medium flex items-center justify-center gap-2 hover:text-brand-primary transition-colors"
            >
              <RefreshCcw size={18} />
              Try Again
            </button>
          )}
        </div>

        {/* Right: Feedback & Analysis */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {!feedback ? (
              <motion.div 
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-12 border-2 border-dashed border-brand-primary/10 rounded-[48px] flex flex-col items-center justify-center text-center space-y-4"
              >
                <Mic2 size={48} className="text-brand-primary/10" />
                <p className="text-xl font-serif italic text-brand-primary/40 max-w-xs">
                  Record your pronunciation to see AI analysis and feedback.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="feedback"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: 'spring', damping: 20 }}
                className="space-y-6"
              >
                <div className={cn(
                  "p-8 rounded-[40px] border-l-8",
                  feedback.isCorrect ? "bg-green-50 border-green-500" : "bg-brand-accent/5 border-brand-accent"
                )}>
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="text-2xl font-serif">Articulation Score</h4>
                    <span className="text-5xl font-serif font-bold text-brand-primary">{feedback.score}<span className="text-xl opacity-40">/100</span></span>
                  </div>
                  <p className="text-lg leading-relaxed text-brand-primary/70">
                    {feedback.generalFeedback}
                  </p>
                </div>

                <div className="p-8 bg-white/40 border border-brand-primary/5 rounded-[40px] space-y-6">
                   <h5 className="text-lg font-serif flex items-center gap-2">
                     <AlertCircle size={20} className="text-brand-accent" />
                     Key Corrections
                   </h5>
                   <ul className="space-y-4">
                     {feedback.corrections?.map((c: string, i: number) => (
                       <li key={i} className="flex gap-4 group">
                         <span className="w-8 h-8 rounded-full bg-brand-primary/5 flex items-center justify-center text-sm font-mono shrink-0 group-hover:bg-brand-primary group-hover:text-brand-paper transition-colors">0{i+1}</span>
                         <span className="text-brand-primary/80">{c}</span>
                       </li>
                     ))}
                   </ul>
                </div>

                <div className="p-8 bg-brand-primary text-brand-paper rounded-[40px] space-y-4 shadow-xl shadow-brand-primary/20">
                  <h5 className="text-lg font-serif italic opacity-60">Articulation Pro-Tip</h5>
                  <p className="text-xl leading-relaxed font-light italic">
                    {feedback.articulationTips}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
