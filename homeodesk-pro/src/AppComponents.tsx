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
            className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full z-50 flex flex-col transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] print:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 ${isCollapsed ? 'w-[76px]' : 'w-[272px]'}`}
        style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)', borderRight: '1px solid #f1f5f9', boxShadow: '4px 0 24px rgba(0,0,0,0.03)' }}
      >
        {/* Logo */}
        <div className="h-[72px] flex items-center gap-3 px-5" style={{ borderBottom: '1px solid #f1f5f9' }}>
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-white flex-shrink-0" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', boxShadow: '0 4px 12px rgba(16,185,129,0.3)' }}>
            <Leaf size={20} />
          </div>
          {!isCollapsed && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h1 className="text-[15px] font-extrabold text-slate-900 tracking-tight">
                HomeoDesk <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">Pro</span>
              </h1>
              <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-[0.15em]">Clinical Suite</p>
            </motion.div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-0.5 custom-scrollbar">
          {!isCollapsed && (
            <p className="text-[9px] font-bold text-slate-300 uppercase tracking-[0.15em] px-3 pt-2 pb-2">Main Menu</p>
          )}
          {menuItems.map((item, idx) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <motion.button
                key={item.id}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setActiveTab(item.id);
                  if (isOpen) toggleMenu();
                }}
                className={`nav-item ${isActive ? 'active' : ''} ${isCollapsed ? 'justify-center' : ''}`}
                title={isCollapsed ? item.label : undefined}
                style={{ animationDelay: `${idx * 30}ms` }}
              >
                <Icon size={18} className="flex-shrink-0" style={{ opacity: isActive ? 1 : 0.6 }} />
                {!isCollapsed && <span>{item.label}</span>}
                {!isCollapsed && isActive && (
                  <motion.div
                    layoutId="sidebar-indicator"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400"
                  />
                )}
              </motion.button>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="p-3 space-y-0.5" style={{ borderTop: '1px solid #f1f5f9' }}>
          {!isCollapsed && (
            <p className="text-[9px] font-bold text-slate-300 uppercase tracking-[0.15em] px-3 pt-1 pb-2">System</p>
          )}
          <button
            onClick={() => {
              setActiveTab('settings');
              if (isOpen) toggleMenu();
            }}
            className={`nav-item ${activeTab === 'settings' ? 'active' : ''} ${isCollapsed ? 'justify-center' : ''}`}
          >
            <Settings size={18} className="flex-shrink-0" style={{ opacity: activeTab === 'settings' ? 1 : 0.6 }} />
            {!isCollapsed && <span>Settings</span>}
          </button>

          {/* Collapse toggle */}
          <button
            onClick={toggleCollapse}
            className="nav-item hidden lg:flex justify-center !gap-2 !text-slate-300 hover:!text-slate-500"
          >
            {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
            {!isCollapsed && <span className="!text-[10px]">Collapse</span>}
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
  const colorMap: Record<string, { bg: string; border: string; text: string }> = {
    emerald: { bg: 'bg-emerald-50/80', border: 'border-emerald-100', text: 'text-emerald-700' },
    blue: { bg: 'bg-blue-50/80', border: 'border-blue-100', text: 'text-blue-700' },
    amber: { bg: 'bg-amber-50/80', border: 'border-amber-100', text: 'text-amber-700' },
    rose: { bg: 'bg-rose-50/80', border: 'border-rose-100', text: 'text-rose-700' },
  };
  const c = colorMap[color] || colorMap.emerald;

  return (
    <div className="modern-card overflow-hidden">
      <div className="px-5 py-4 flex items-center justify-between" style={{ background: 'linear-gradient(135deg, #0f172a, #1e293b)' }}>
        <h3 className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-white">{title}</h3>
        <span className="text-[10px] font-bold bg-white/10 text-white/80 px-2.5 py-1 rounded-full">{items.length}</span>
      </div>
      <div className="p-3 space-y-1.5 max-h-48 overflow-y-auto custom-scrollbar">
        {items.length === 0 ? (
          <p className="text-xs text-slate-400 text-center py-6 font-medium">No selections yet</p>
        ) : (
          items.map((item, idx) => (
            <div key={idx} className={`flex items-center justify-between p-2.5 rounded-xl border ${c.bg} ${c.border}`}>
              <span className="text-[10px] font-semibold truncate flex-1">{item}</span>
              {onRemove && (
                <button onClick={() => onRemove(idx)} className="ml-2 text-slate-300 hover:text-rose-500 transition flex-shrink-0">
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
    <div className="flex items-center justify-between py-3" style={{ borderBottom: '1px solid #f8fafc' }}>
      <div className="flex items-center gap-2">
        {category && (
          <span className="text-[9px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-lg uppercase tracking-[0.1em]">{category}</span>
        )}
        <span className="text-xs font-semibold text-slate-500">{label}</span>
      </div>
      <span className="text-xs font-bold text-slate-900">{value}</span>
    </div>
  );
}
