import React, { useState } from 'react';
import { motion } from 'motion/react';
import { LayoutDashboard, Users, Bell, Stethoscope, TrendingUp, BookOpen, Microscope, GraduationCap, FlaskConical, Leaf, Database, Settings, X, ChevronRight, ChevronLeft, Pencil, Brain, Clock, Activity, ClipboardList, BriefcaseMedical } from 'lucide-react';
import { Patient } from './types';

export const Sidebar = ({ activeTab, setActiveTab, isOpen, toggleMenu, isCollapsed, toggleCollapse }: { 
  activeTab: string, 
  setActiveTab: (t: string) => void, 
  isOpen: boolean, 
  toggleMenu: () => void,
  isCollapsed: boolean,
  toggleCollapse: () => void
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'patients', label: 'Patients', icon: Users },
    { id: 'reminders', label: 'Reminders', icon: Bell },
    { id: 'repertory', label: "Kent's Repertory", icon: Stethoscope },
    { id: 'surgery', label: 'Surgery', icon: BriefcaseMedical },
    { id: 'analysis', label: 'Analysis', icon: TrendingUp },
    { id: 'organon', label: 'Organon', icon: BookOpen },
    { id: 'practice', label: 'Practice of Medicine', icon: Microscope },
    { id: 'knowledge', label: 'Knowledge', icon: GraduationCap },
    { id: 'pathology', label: 'Pathology', icon: FlaskConical },
    { id: 'materia', label: 'Materia Medica', icon: Leaf },
    { id: 'physiology', label: 'Physiology & Anatomy', icon: Microscope },
    { id: 'pharmacy', label: 'Pharmacy', icon: Database },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 print:hidden ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={toggleMenu}
      />
      <aside 
        className={`fixed top-0 left-0 bottom-0 bg-white border-r border-slate-100 text-slate-600 flex flex-col shadow-sm z-50 transition-all duration-300 cubic-bezier(0.4, 0, 0.2, 1) lg:translate-x-0 print:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'} ${isCollapsed ? 'lg:w-[80px]' : 'lg:w-[260px]'} w-[260px]`}
      >
        <div className={`p-6 border-b border-slate-50 flex items-center ${isCollapsed ? 'lg:justify-center' : 'justify-between'}`}>
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-white shadow-lg shrink-0">
              <Leaf size={18} />
            </div>
            {!isCollapsed && <span className="font-black text-slate-900 text-lg whitespace-nowrap tracking-tight">HomeoDesk <span className="text-primary">Pro</span></span>}
          </div>
          <button onClick={toggleMenu} className="lg:hidden text-slate-400 hover:text-slate-900">
            <X size={20} />
          </button>
          {!isOpen && (
            <button 
              onClick={toggleCollapse} 
              className="hidden lg:flex p-1.5 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-slate-900 transition-colors"
            >
              {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>
          )}
        </div>
        <nav className="flex-1 py-4 space-y-1 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); if(window.innerWidth < 1024) toggleMenu(); }}
              title={isCollapsed ? item.label : ''}
              className={`w-full flex items-center transition-all duration-200 ${activeTab === item.id ? 'bg-primary/5 text-primary font-bold' : 'hover:bg-slate-50 text-slate-500'} ${isCollapsed ? 'lg:justify-center lg:px-0' : 'px-6'} py-3.5`}
            >
              <item.icon className={`${isCollapsed ? 'lg:mr-0' : 'mr-3'} ${activeTab === item.id ? 'text-primary' : 'text-slate-400'}`} size={20} />
              {!isCollapsed && <span className="whitespace-nowrap text-sm tracking-tight">{item.label}</span>}
              {!isCollapsed && activeTab === item.id && (
                <div className="ml-auto w-1.5 h-1.5 bg-primary rounded-full" />
              )}
            </button>
          ))}
        </nav>
        <div className={`p-4 bg-slate-50/50 text-xs flex items-center gap-3 border-t border-slate-100 ${isCollapsed ? 'lg:justify-center lg:px-0' : ''}`}>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-container flex items-center justify-center font-bold text-white shadow shrink-0">
            RA
          </div>
          {!isCollapsed && (
            <div className="overflow-hidden">
              <p className="text-slate-900 font-black text-sm whitespace-nowrap tracking-tight">Dr. Rahim Ahmed</p>
              <p className="text-primary font-bold whitespace-nowrap text-[10px] uppercase tracking-widest">Chief Physician</p>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export const ActiveSelectionCard = ({ patient, onOpenPD }: { patient: Patient, onOpenPD: (p: Patient) => void }) => {
  if (!patient) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-60" />
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] mb-1">Clinical Case Record</p>
            <h3 className="text-4xl font-black text-slate-900 tracking-tight">{patient.name}</h3>
          </div>
          <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all">
            <Pencil size={20} />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Core Rubrics</p>
            <div className="space-y-2">
              {patient.coreRubrics?.map((rubric, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-emerald-200 transition-all">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm">
                    {i === 0 ? <Brain size={18} /> : i === 1 ? <Clock size={18} /> : <Activity size={18} />}
                  </div>
                  <span className="text-sm font-bold text-slate-700">{rubric.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-slate-50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Current Potency</span>
              <span className="text-sm font-black text-emerald-600">{patient.currentPotency}</span>
            </div>
            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 w-2/3 rounded-full" />
            </div>
          </div>

          <div className="pt-6 border-t border-slate-50">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Remedy</span>
              <span className="text-sm font-black text-emerald-700">{patient.remedy}</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              {patient.notes}
            </p>
          </div>

          <button 
            onClick={() => onOpenPD(patient)}
            className="w-full mt-4 py-5 bg-slate-900 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 group"
          >
            <ClipboardList size={18} className="group-hover:scale-110 transition-transform" />
            Open Full Case File
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export const AttributeItem = ({ label, banglaLabel, value, banglaValue, highlight, danger }: { 
  label: string, 
  banglaLabel: string, 
  value?: string, 
  banglaValue?: string,
  highlight?: boolean,
  danger?: boolean
}) => {
  if (!value && !banglaValue) return null;
  return (
    <div className={`p-4 rounded-xl border transition-all ${
      danger ? 'bg-red-50 border-red-100 text-red-700' :
      highlight ? 'bg-emerald-50 border-emerald-100 text-emerald-700 font-bold' :
      'bg-slate-50 border-slate-100 text-slate-700 hover:border-slate-200'
    }`}>
      <div className="flex justify-between items-start mb-1">
        <span className="text-[10px] font-bold uppercase tracking-wider opacity-60">{label}</span>
        <span className="text-[10px] font-bold text-emerald-600">{banglaLabel}</span>
      </div>
      {value && <p className="text-sm">{value}</p>}
      {banglaValue && <p className="text-xs mt-1 opacity-70 font-medium">{banglaValue}</p>}
    </div>
  );
};

