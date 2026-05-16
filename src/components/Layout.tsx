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
  User
} from 'lucide-react';
import { cn } from '../lib/utils';

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

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'ipa', label: 'IPA Chart', icon: Grid3X3 },
    { id: 'lab', label: 'Articulation Lab', icon: Mic2 },
    { id: 'studio', label: 'Studio', icon: Music },
    { id: 'games', label: 'Games', icon: Gamepad2 },
    { id: 'lessons', label: 'Courses', icon: GraduationCap },
    { id: 'dictionary', label: 'Search', icon: Search },
  ];

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
                    <Settings size={12} className="cursor-pointer hover:text-brand-primary transition-colors" onClick={() => setView('settings')} />
                 </div>
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-accent flex items-center justify-center text-brand-paper font-bold shadow-lg">
                      JS
                    </div>
                    <div>
                       <p className="text-xs font-bold truncate">James Stewart</p>
                       <p className="text-[10px] text-brand-primary/40 uppercase font-mono">Expert</p>
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
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-brand-primary rounded-2xl flex items-center justify-center text-brand-paper shadow-xl shadow-brand-primary/10">
               <Mic2 size={18} />
             </div>
             <span className="font-serif font-bold text-xl italic leading-none">Articulate</span>
          </div>
          <div className="flex items-center gap-3">
             <div className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-primary/5 rounded-full">
                <Flame size={14} className="text-orange-500" />
                <span className="text-xs font-bold">14</span>
             </div>
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
                   <div className="w-full h-full rounded-full bg-brand-accent flex items-center justify-center text-[10px] font-bold text-white shadow-inner">
                      JS
                   </div>
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
                <X size={28} />
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
                  <div className="w-14 h-14 rounded-full bg-brand-accent flex items-center justify-center text-brand-paper font-bold text-xl shadow-xl">JS</div>
                  <div>
                     <p className="font-bold text-lg leading-tight">James Stewart</p>
                     <p className="text-xs uppercase font-mono tracking-widest font-bold text-brand-accent">Rank: Pronunciation King</p>
                  </div>
               </div>
               <Settings className="text-brand-primary/40" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
