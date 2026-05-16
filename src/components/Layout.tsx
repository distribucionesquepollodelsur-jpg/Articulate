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
  X
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
      "flex items-center gap-3 w-full p-3 rounded-xl transition-all duration-200 group",
      active 
        ? "bg-brand-primary text-brand-paper shadow-lg shadow-brand-primary/20" 
        : "text-brand-primary/60 hover:bg-brand-primary/5 hover:text-brand-primary"
    )}
  >
    <Icon size={20} className={cn("shrink-0", active ? "text-brand-paper" : "text-brand-primary/60 group-hover:text-brand-primary")} />
    {!collapsed && <span className="font-medium text-sm tracking-tight capitalize">{label}</span>}
  </button>
);

export const Layout = ({ children, activeView, setView }: { children: React.ReactNode, activeView: string, setView: (v: string) => void }) => {
  const [collapsed, setCollapsed] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'home', label: 'Dashboard', icon: Home },
    { id: 'ipa', label: 'IPA Chart', icon: Grid3X3 },
    { id: 'lab', label: 'Articulation Lab', icon: Mic2 },
    { id: 'lessons', label: 'Courses', icon: GraduationCap },
    { id: 'dictionary', label: 'Dictionary', icon: Search },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-brand-paper selection:bg-brand-accent selection:text-brand-paper font-sans">
      {/* Desktop Sidebar */}
      <aside 
        className={cn(
          "hidden md:flex flex-col border-r border-brand-primary/10 transition-all duration-300",
          collapsed ? "w-20" : "w-64"
        )}
      >
        <div className="p-6 flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center text-brand-paper shrink-0 shadow-xl shadow-brand-primary/20">
            <GraduationCap size={20} />
          </div>
          {!collapsed && (
            <span className="font-serif font-bold text-lg tracking-tight">Articulate</span>
          )}
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
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

        <div className="p-4 border-t border-brand-primary/10">
           <button 
             onClick={() => setCollapsed(!collapsed)}
             className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-brand-primary/5 text-brand-primary/40"
           >
             <ChevronRight className={cn("transition-transform duration-300", collapsed ? "" : "rotate-180")} />
           </button>
        </div>
      </aside>

      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-brand-paper border-b border-brand-primary/10 z-50 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center text-brand-paper">
             <GraduationCap size={18} />
           </div>
           <span className="font-serif font-bold text-lg tracking-tight">Articulate</span>
        </div>
        <button onClick={() => setMobileMenuOpen(true)} className="p-2">
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-brand-paper z-[100] md:hidden p-6 flex flex-col"
          >
            <div className="flex items-center justify-between mb-8">
              <span className="font-serif font-bold text-2xl tracking-tight">Articulate</span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2">
                <X size={24} />
              </button>
            </div>
            <nav className="space-y-4 flex-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setView(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={cn(
                    "flex items-center gap-4 w-full p-4 rounded-2xl text-xl font-medium",
                    activeView === item.id ? "bg-brand-primary/5 text-brand-primary border border-brand-primary/10" : "text-brand-primary/60"
                  )}
                >
                  <item.icon size={24} />
                  {item.label}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 relative overflow-y-auto pt-16 md:pt-0">
        <div className="max-w-6xl mx-auto p-4 md:p-8 lg:p-12">
          {children}
        </div>
      </main>
    </div>
  );
};
