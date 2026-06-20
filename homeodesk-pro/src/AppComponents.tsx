import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutDashboard, Users, Stethoscope, Leaf, Bell, Calendar, BookOpen,
  Book, FileText, GraduationCap, FlaskConical, Settings, Menu, X,
  ChevronLeft, ChevronRight, Microscope, Brain, Heart, Activity, Scroll,
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  toggleMenu: () => void;
  isCollapsed: boolean;
  toggleCollapse: () => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'patients', label: 'Patients', icon: Users },
  { id: 'reminders', label: 'Reminders', icon: Bell },
  { id: 'repertory', label: "Kent's Repertory", icon: Stethoscope },
  { id: 'analysis', label: 'Case Analysis', icon: Microscope },
  { id: 'organon', label: 'Organon', icon: Scroll },
  { id: 'practice', label: 'Practice of Medicine', icon: FileText },
  { id: 'knowledge', label: 'Knowledge Menu', icon: BookOpen },
  { id: 'pathology', label: 'Pathology', icon: Brain },
  { id: 'materia', label: 'Materia Medica', icon: Leaf },
  { id: 'physiology', label: 'Physiology & Anatomy', icon: Heart },
  { id: 'surgery', label: 'Surgery', icon: Activity },
  { id: 'pharmacy', label: 'Pharmacy', icon: FlaskConical },
];

export function Sidebar({ activeTab, setActiveTab, isOpen, toggleMenu, isCollapsed, toggleCollapse }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleMenu}
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white border-r border-slate-100 z-50 flex flex-col transition-all duration-300 shadow-sm print:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 ${isCollapsed ? 'w-[80px]' : 'w-[260px]'}`}
      >
        {/* Logo */}
        <div className="h-20 flex items-center gap-3 px-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center text-white shadow-lg flex-shrink-0">
            <Leaf size={20} />
          </div>
          {!isCollapsed && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h1 className="text-sm font-black text-slate-900 tracking-tight">
                HomeoDesk <span className="text-emerald-500">Pro</span>
              </h1>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Clinical Suite</p>
            </motion.div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1 custom-scrollbar">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (isOpen) toggleMenu();
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-lg shadow-slate-200'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                } ${isCollapsed ? 'justify-center' : ''}`}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon size={18} className="flex-shrink-0" />
                {!isCollapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="p-2 border-t border-slate-100 space-y-1">
          <button
            onClick={() => {
              setActiveTab('settings');
              if (isOpen) toggleMenu();
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === 'settings'
                ? 'bg-slate-900 text-white shadow-lg shadow-slate-200'
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
            } ${isCollapsed ? 'justify-center' : ''}`}
          >
            <Settings size={18} className="flex-shrink-0" />
            {!isCollapsed && <span>Settings</span>}
          </button>

          {/* Collapse toggle */}
          <button
            onClick={toggleCollapse}
            className="w-full hidden lg:flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-all uppercase tracking-wider"
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            {!isCollapsed && <span>Collapse</span>}
          </button>
        </div>
      </aside>
    </>
  );
}

interface ActiveSelectionCardProps {
  title: string;
  items: string[];
  onRemove?: (index: number) => void;
  color?: string;
}

export function ActiveSelectionCard({ title, items, onRemove, color = 'emerald' }: ActiveSelectionCardProps) {
  const colorMap: Record<string, string> = {
    emerald: 'bg-emerald-50 border-emerald-200 text-emerald-800',
    blue: 'bg-blue-50 border-blue-200 text-blue-800',
    amber: 'bg-amber-50 border-amber-200 text-amber-800',
    rose: 'bg-rose-50 border-rose-200 text-rose-800',
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
        <h3 className="text-xs font-black uppercase tracking-widest">{title}</h3>
        <span className="text-[10px] font-bold bg-white/10 px-2 py-1 rounded-full">{items.length}</span>
      </div>
      <div className="p-3 space-y-1.5 max-h-48 overflow-y-auto custom-scrollbar">
        {items.length === 0 ? (
          <p className="text-xs text-slate-400 text-center py-4 font-bold">No selections yet</p>
        ) : (
          items.map((item, idx) => (
            <div key={idx} className={`flex items-center justify-between p-2 rounded-lg border ${colorMap[color] || colorMap.emerald}`}>
              <span className="text-[10px] font-bold truncate flex-1">{item}</span>
              {onRemove && (
                <button onClick={() => onRemove(idx)} className="ml-2 text-slate-400 hover:text-rose-500 transition flex-shrink-0">
                  <X size={12} />
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

interface AttributeItemProps {
  label: string;
  value: string;
  category?: string;
}

export function AttributeItem({ label, value, category }: AttributeItemProps) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
      <div className="flex items-center gap-2">
        {category && (
          <span className="text-[9px] font-bold bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded uppercase tracking-widest">{category}</span>
        )}
        <span className="text-xs font-bold text-slate-600">{label}</span>
      </div>
      <span className="text-xs font-black text-slate-900">{value}</span>
    </div>
  );
}
