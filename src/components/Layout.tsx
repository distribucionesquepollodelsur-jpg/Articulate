import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Mic2, 
  BookOpen, 
  Settings, 
  Grid3X3, 
  Search, 
  GraduationCap, 
  ChevronRight,
  Menu,
  X,
  Music,
  Gamepad2,
  Trophy,
  Flame,
  User,
  Sparkles
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useGame } from '../contexts/GameContext';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  onClick: () => void;
  collapsed?: boolean;
}

const NavItem = ({ icon: Icon, label, active, onClick, collapsed }: NavItemProps) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center gap-3 w-full p-4 rounded-xl transition-all duration-300 group",
      active 
        ? "bg-brand-primary text-brand-paper shadow-xl shadow-brand-primary/20 scale-[1.02]" 
        : "text-brand-primary/60 hover:bg-brand-primary/5 hover:text-brand-primary"
    )}
  >
    <Icon size={20} className={cn("shrink-0", active ? "text-brand-accent scale-110" : "text-brand-primary/40 group-hover:text-brand-primary group-hover:scale-110 transition-transform")} />
    {!collapsed && <span className={cn("font-bold text-xs uppercase tracking-widest truncate transition-opacity", active ? "opacity-100" : "opacity-60 group-hover:opacity-100")}>{label}</span>}
  </button>
);

export const Layout = ({ children, activeView, setView }: { children: React.ReactNode, activeView: string, setView: (v: string) => void }) => {
  const [collapsed, setCollapsed] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const { user, loading, login, logout } = useGame();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'ipa', label: 'IPA Chart', icon: Grid3X3 },
    { id: 'lab', label: 'Articulation Lab', icon: Mic2 },
    { id: 'studio', label: 'Studio', icon: Music },
    { id: 'games', label: 'Games', icon: Gamepad2 },
    { id: 'lessons', label: 'Courses', icon: GraduationCap },
    { id: 'dictionary', label: 'Search', icon: Search },
  ];

  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-brand-paper gap-8 overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-brand-primary)/0.03_1px,transparent_1px)] bg-[size:32px_32px] animate-pulse" />
        <div className="relative">
          <div className="w-24 h-24 bg-brand-primary rounded-[32px] flex items-center justify-center text-brand-paper shadow-2xl animate-bounce">
            <Mic2 size={40} />
          </div>
          <div className="absolute -inset-8 bg-brand-primary/10 rounded-full blur-2xl animate-ping opacity-40" />
        </div>
        <div className="space-y-4 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] font-bold text-brand-primary/60">Initializing Phonetic Core...</p>
          <div className="w-48 h-1 bg-brand-primary/10 rounded-full mx-auto overflow-hidden">
             <motion.div 
               className="h-full bg-brand-accent shadow-[0_0_10px_var(--color-brand-accent)]"
               initial={{ x: '-100%' }}
               animate={{ x: '100%' }}
               transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
             />
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-brand-paper p-6 relative overflow-hidden font-sans">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-primary/5 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/2 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-accent/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,var(--color-brand-primary)/0.02_2px,transparent_0)] bg-[size:100px_100px]" />

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          className="max-w-xl w-full space-y-12 text-center relative z-10"
        >
          <div className="flex flex-col items-center gap-8">
            <motion.div 
              whileHover={{ rotate: -8, scale: 1.05 }}
              className="w-32 h-32 bg-brand-primary rounded-[40px] flex items-center justify-center text-brand-paper shadow-2xl relative group"
            >
              <Mic2 size={64} className="group-hover:scale-110 transition-transform" />
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-brand-accent rounded-2xl flex items-center justify-center shadow-xl rotate-12">
                 <Sparkles className="text-white" size={24} />
              </div>
            </motion.div>
            <div className="space-y-4">
              <h1 className="text-7xl font-serif font-bold tracking-tight mb-2">Articulate</h1>
              <div className="flex items-center justify-center gap-4">
                <div className="h-px w-8 bg-brand-primary/20" />
                <p className="text-[12px] uppercase font-mono tracking-[0.4em] font-bold text-brand-accent">Beyond Pronunciation</p>
                <div className="h-px w-8 bg-brand-primary/20" />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-tight leading-tight">
              Master the architecture of <br/>
              <span className="italic text-brand-primary/40 underline decoration-brand-accent decoration-wavy underline-offset-8">vocal performance.</span>
            </h2>
            <p className="text-brand-primary/60 text-lg md:text-xl leading-relaxed font-medium max-w-md mx-auto">
              Join the elite ecosystem for high-precision British pronunciation training powered by server-side AI.
            </p>
          </div>

          <motion.div 
             className="flex flex-col gap-4 max-w-sm mx-auto"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.5 }}
          >
            <button 
              onClick={login}
              className="w-full py-6 bg-brand-primary text-brand-paper rounded-[28px] font-bold uppercase tracking-widest text-[12px] shadow-2xl shadow-brand-primary/20 hover:bg-[#222] hover:shadow-brand-primary/40 active:scale-[0.98] transition-all flex items-center justify-center gap-4 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <img src="https://www.google.com/favicon.ico" className="w-5 h-5 grayscale group-hover:grayscale-0 transition-all" alt="G" />
              <span>Continue with Google</span>
              <ChevronRight size={18} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </button>
            <div className="flex items-center justify-center gap-6 pt-4">
               {[Trophy, Flame, GraduationCap].map((Icon, i) => (
                 <div key={i} className="flex flex-col items-center gap-2 opacity-30">
                    <Icon size={20} />
                 </div>
               ))}
            </div>
          </motion.div>

          <div className="pt-12 space-y-2">
             <p className="text-[10px] text-brand-primary/20 uppercase font-mono tracking-widest font-bold">
               Authenticated via Firebase Security
             </p>
             <div className="flex justify-center gap-1">
                {[1,2,3,4,5].map(i => <div key={i} className="w-1 h-1 rounded-full bg-brand-primary/10" />)}
             </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-brand-paper selection:bg-brand-accent selection:text-brand-paper font-sans">
      {/* Desktop Sidebar - Premium Style */}
      <aside 
        className={cn(
          "hidden md:flex flex-col border-r border-brand-primary/5 transition-all duration-500 ease-[0.23,1,0.32,1] bg-white z-50",
          collapsed ? "w-24" : "w-72"
        )}
      >
        <div className={cn("p-8 flex items-center gap-4 mb-8 transition-all duration-300", collapsed ? "justify-center" : "")}>
          <div className="w-12 h-12 bg-brand-primary rounded-[18px] flex items-center justify-center text-brand-paper shrink-0 shadow-2xl shadow-brand-primary/20 rotate-[-4deg]">
            <Mic2 size={24} />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-serif font-bold text-xl tracking-tight leading-none">Articulate</span>
              <span className="text-[10px] uppercase font-mono tracking-[0.2em] font-bold text-brand-accent">Studio AI</span>
            </div>
          )}
        </div>

        <nav className="flex-1 px-6 space-y-3 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => (
            <NavItem 
              key={item.id}
              {...item}
              active={activeView === item.id}
              onClick={() => setView(item.id)}
              collapsed={collapsed}
            />
          ))}
        </nav>

        <div className="p-6 space-y-4">
           {!collapsed && (
              <div className="p-5 bg-brand-primary/5 rounded-[24px] space-y-3">
                 <div className="flex justify-between items-center text-[10px] uppercase font-mono tracking-widest font-bold opacity-40">
                    <span>Account</span>
                    <button onClick={logout} className="text-[9px] hover:text-brand-accent transition-colors">LOGOUT</button>
                 </div>
                 <div className="flex items-center gap-3">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt="Avatar" className="w-10 h-10 rounded-full shadow-lg border border-white" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-brand-accent flex items-center justify-center text-brand-paper font-bold shadow-lg">
                        {user.displayName?.charAt(0) || 'U'}
                      </div>
                    )}
                    <div className="min-w-0">
                       <p className="text-xs font-bold truncate">{user.displayName || 'Linguist'}</p>
                       <p className="text-[10px] text-brand-primary/40 uppercase font-mono">Student</p>
                    </div>
                 </div>
              </div>
           )}
           <button 
             onClick={() => setCollapsed(!collapsed)}
             className="w-full flex items-center justify-center p-3 rounded-xl hover:bg-brand-primary/5 text-brand-primary/40 transition-all active:scale-95"
           >
             <ChevronRight className={cn("transition-transform duration-500", collapsed ? "" : "rotate-180")} />
           </button>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 relative h-full">
        {/* Mobile Header (Top) */}
        <div className="md:hidden sticky top-0 left-0 right-0 h-20 bg-brand-paper/80 backdrop-blur-2xl border-b border-brand-primary/5 z-[60] flex items-center justify-between px-6 transition-all">
          <div className="flex items-center gap-3 text-brand-primary">
             <div className="w-10 h-10 bg-brand-primary rounded-2xl flex items-center justify-center text-brand-paper shadow-xl shadow-brand-primary/10">
               <Mic2 size={18} />
             </div>
             <span className="font-serif font-bold text-xl italic leading-none">Articulate</span>
          </div>
          <div className="flex items-center gap-3">
             <button onClick={() => setMobileMenuOpen(true)} className="w-10 h-10 rounded-full bg-brand-primary text-brand-paper flex items-center justify-center shadow-lg active:scale-90 transition-transform">
               <Menu size={20} />
             </button>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <main className="flex-1 relative overflow-y-auto pb-32 md:pb-0 scroll-smooth">
          <div className="max-w-[1400px] mx-auto p-6 md:p-12 lg:p-16">
            {children}
          </div>
        </main>

        {/* Mobile Bottom Navigation - Floating App Bar */}
        <div className="md:hidden fixed bottom-8 inset-x-6 z-[60] animate-in fade-in slide-in-from-bottom-4 duration-500">
           <nav className="bg-brand-primary/95 backdrop-blur-3xl rounded-[32px] p-2 flex items-center justify-between shadow-2xl border border-white/10 ring-1 ring-black/5">
             {navItems.filter(i => ['home', 'ipa', 'lab', 'studio', 'games'].includes(i.id)).map((item) => (
                <button
                  key={item.id}
                  onClick={() => setView(item.id)}
                  className={cn(
                    "relative flex-1 py-4 flex flex-col items-center gap-1 transition-all duration-300",
                    activeView === item.id ? "text-white" : "text-brand-paper/40"
                  )}
                >
                  {activeView === item.id && (
                     <motion.div 
                        layoutId="active-pill"
                        className="absolute inset-0 bg-brand-accent/20 rounded-2xl mx-1"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                     />
                  )}
                  <item.icon size={22} className={cn("relative z-10", activeView === item.id ? "text-brand-accent" : "")} />
                  {activeView === item.id && (
                     <motion.span 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-[9px] font-bold uppercase tracking-widest relative z-10"
                     >
                        {item.id}
                     </motion.span>
                  )}
                </button>
             ))}
             <button 
                onClick={() => setView('settings')}
                className="w-12 h-12 flex items-center justify-center"
             >
                <div className={cn(
                   "w-10 h-10 rounded-full border-2 transition-all p-0.5",
                   activeView === 'settings' ? "border-brand-accent" : "border-transparent"
                )}>
                   {user.photoURL ? (
                     <img src={user.photoURL} alt="Avatar" className="w-full h-full rounded-full" />
                   ) : (
                     <div className="w-full h-full rounded-full bg-brand-accent flex items-center justify-center text-[10px] font-bold text-white shadow-inner">
                        {user.displayName?.charAt(0) || 'U'}
                     </div>
                   )}
                </div>
             </button>
           </nav>
        </div>
      </div>

      {/* Full-Screen Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-brand-paper z-[200] md:hidden p-8 flex flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center gap-3">
                 <div className="w-12 h-12 bg-brand-primary rounded-[18px] flex items-center justify-center text-brand-paper shadow-2xl shadow-brand-primary/20">
                   <Mic2 size={24} />
                 </div>
                 <span className="font-serif font-bold text-2xl italic">Articulate</span>
              </div>
              <button 
                onClick={() => setMobileMenuOpen(false)} 
                className="w-14 h-14 rounded-full bg-brand-primary/5 flex items-center justify-center active:bg-brand-primary/10 transition-colors"
              >
                <X size={28} className="text-brand-primary" />
              </button>
            </div>
            
            <nav className="space-y-3 flex-1 overflow-y-auto">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setView(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={cn(
                    "flex items-center gap-6 w-full p-6 rounded-[32px] text-xl font-bold transition-all",
                    activeView === item.id 
                      ? "bg-brand-primary text-brand-paper shadow-2xl shadow-brand-primary/30 active:scale-[0.98]" 
                      : "bg-brand-primary/5 text-brand-primary hover:bg-brand-primary/10"
                  )}
                >
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center",
                    activeView === item.id ? "bg-white/10" : "bg-brand-primary/5"
                  )}>
                    <item.icon size={26} className={activeView === item.id ? "text-brand-accent" : ""} />
                  </div>
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="mt-8 p-8 bg-brand-accent/10 rounded-[40px] border border-brand-accent/20 flex items-center justify-between">
               <div className="flex items-center gap-4">
                  {user.photoURL ? (
                    <img src={user.photoURL} className="w-14 h-14 rounded-full shadow-xl" alt="Avatar" />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-brand-accent flex items-center justify-center text-brand-paper font-bold text-xl shadow-xl">{user.displayName?.charAt(0) || 'U'}</div>
                  )}
                  <div>
                     <p className="font-bold text-lg leading-tight">{user.displayName || 'Linguist'}</p>
                     <p className="text-xs uppercase font-mono tracking-widest font-bold text-brand-accent">Student</p>
                  </div>
               </div>
               <button onClick={logout}><X className="text-brand-primary/40" /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
