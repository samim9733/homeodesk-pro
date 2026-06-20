import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Users, UserPlus, Bell, User, Calendar, ChevronRight, ChevronLeft, Search, Plus, Trash2, Edit, X, RefreshCw, AlertCircle, Clock, Stethoscope, Save, QrCode, ClipboardList, Move, ArrowLeft, Play
, Microscope, Leaf, BookOpen, GraduationCap, Scroll, Quote, ArrowRight, Activity, Filter, FileText, ListFilter, ArrowUpDown, Database, Bookmark, MoreHorizontal, ChevronDown} from 'lucide-react';
import { Patient, Reminder, AnalysisItem, RubricData, Remedy as RepertoryRemedy, Rubric } from './types';
import { CHAPTER_INDEX, REPERTORY_DATA, CATEGORIES, CHAPTER_CATEGORIES } from './constants';
import ReactMarkdown from 'react-markdown';
import { GoogleGenAI } from "@google/genai";

export const Dashboard = ({ patients, analysisCount, reminders, setActiveTab, onOpenPD }: { 
  patients: Patient[], 
  analysisCount: number, 
  reminders: Reminder[],
  setActiveTab: (t: string) => void,
  onOpenPD: (p: Patient) => void
}) => {
  const recentPatients = useMemo(() => patients.slice(-3).reverse(), [patients]);
  const upcomingReminders = useMemo(() => 
    reminders.filter(r => !r.completed).slice(0, 3), 
    [reminders]
  );

  const stats = [
    { label: 'Total Patients', value: patients.length, icon: Users, color: 'text-emerald-600', bgColor: 'bg-emerald-50' },
    { label: 'Analyses Run', value: analysisCount, icon: Microscope, color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { label: 'Active Reminders', value: reminders.filter(r => !r.completed).length, icon: Bell, color: 'text-amber-600', bgColor: 'bg-amber-50' },
    { label: 'Quick Search', value: 'Ready', icon: Search, color: 'text-purple-600', bgColor: 'bg-purple-50' },
  ];

  const actionButtons = [
    { id: 'patients', label: 'Add Patient', icon: Plus, color: 'text-emerald-500', desc: 'Register new patient' },
    { id: 'repertory', label: "Kent's Repertory", icon: Stethoscope, color: 'text-blue-500', desc: 'Browse rubrics' },
    { id: 'materia', label: 'Materia Medica', icon: Leaf, color: 'text-emerald-600', desc: 'Study remedies' },
    { id: 'organon', label: 'Organon', icon: BookOpen, color: 'text-amber-500', desc: 'Philosophy' },
    { id: 'practice', label: 'Practice', icon: Microscope, color: 'text-rose-500', desc: 'Clinical guide' },
    { id: 'knowledge', label: 'Knowledge', icon: GraduationCap, color: 'text-indigo-500', desc: 'Medical library' },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 group cursor-default transition-all hover:shadow-md"
          >
            <div className={`w-12 h-12 ${stat.bgColor} ${stat.color} rounded-xl flex items-center justify-center shrink-0`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest leading-none mb-1.5">{stat.label}</p>
              <h3 className="text-xl font-black text-slate-800 leading-none">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-8 md:p-10 rounded-[2.5rem] shadow-xl text-white relative overflow-hidden group">
            <div className="relative z-10 text-center md:text-left">
              <h4 className="text-2xl md:text-3xl font-black mb-4 tracking-tight">Welcome to the Advanced Suite</h4>
              <p className="text-emerald-50/80 max-w-xl font-medium leading-relaxed mb-8">
                Manage patient records and access Kent's Repertory with full hierarchical drill-down browsing.
              </p>
              <button 
                onClick={() => setActiveTab('repertory')}
                className="px-10 py-4 bg-white text-emerald-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-50 transition-all shadow-xl shadow-black/5"
              >
                Open Repertory
              </button>
            </div>
            <div className="absolute right-0 bottom-0 opacity-10 group-hover:scale-110 transition-transform duration-700 -mr-12 -mb-12 pointer-events-none">
              <Stethoscope size={320} />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {actionButtons.map((btn, i) => (
              <motion.button
                key={btn.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + (i * 0.1) }}
                onClick={() => setActiveTab(btn.id)}
                className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all flex flex-col items-center gap-3 group"
              >
                <div className={`w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center ${btn.color} group-hover:scale-110 transition-transform shadow-inner`}>
                  <btn.icon size={24} />
                </div>
                <div className="text-center">
                  <span className="block text-[10px] font-black text-slate-700 uppercase tracking-tight">{btn.label}</span>
                  <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{btn.desc}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          {/* Apothecary Note Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col h-full min-h-[400px]"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Scroll size={120} className="text-emerald-500" />
            </div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400">
                  <Quote size={20} />
                </div>
                <h3 className="text-white font-black text-xs uppercase tracking-[0.2em]">Apothecary Note</h3>
              </div>

              <div className="flex-1 flex flex-col justify-center">
                <p className="text-2xl md:text-3xl font-black text-white leading-tight mb-6 italic font-serif">
                  "The highest ideal of cure is rapid, gentle and permanent restoration of health."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-0.5 bg-emerald-500 rounded-full" />
                  <span className="text-emerald-400 text-[10px] font-black uppercase tracking-widest">Samuel Hahnemann</span>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-white/10">
                <button 
                  onClick={() => setActiveTab('organon')}
                  className="w-full group flex items-center justify-between p-5 bg-white/5 hover:bg-white/10 rounded-2xl transition-all border border-white/5"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white">
                      <BookOpen size={20} />
                    </div>
                    <div className="text-left">
                      <p className="text-white font-black text-[10px] uppercase tracking-widest leading-none mb-1">Philosophy</p>
                      <p className="text-slate-400 text-[9px] font-bold uppercase tracking-widest">Read Organon</p>
                    </div>
                  </div>
                  <ArrowRight size={18} className="text-emerald-500 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
        <div className="flex items-center gap-3 mb-8">
          <Bell className="text-amber-500" size={24} />
          <h3 className="text-xl font-black text-slate-800 tracking-tight">Upcoming Reminders</h3>
        </div>
        
        <div className="space-y-4">
          {upcomingReminders.length === 0 ? (
            <p className="text-slate-400 text-sm italic py-8 text-center">No active reminders.</p>
          ) : (
            upcomingReminders.map((r) => (
              <div key={r.id} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:border-amber-200 transition-all relative group">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest px-2 py-1 bg-amber-50 rounded-lg">{r.type}</span>
                      <h4 className="font-black text-slate-800 text-lg">{r.patientName}</h4>
                    </div>
                    <p className="text-sm text-slate-500 font-medium">{r.note}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-slate-400 font-bold tracking-widest uppercase">{r.date}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export const PatientsTab = ({ patients, addPatient, removePatient, setSelectedPatientForRx, onSetReminder, onOpenPD }: { 
  patients: Patient[], 
  addPatient: (p: Omit<Patient, 'id' | 'date'>) => void,
  removePatient: (id: string) => void,
  setSelectedPatientForRx: (p: Patient | null) => void,
  onSetReminder: (p: Patient) => void,
  onOpenPD: (p: Patient) => void
}) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Male');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<'Active' | 'Follow-up' | 'Completed' | 'Inactive'>('Active');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'age'>('date');
  const [patientToDelete, setPatientToDelete] = useState<Patient | null>(null);

  const stats = useMemo(() => {
    const total = patients.length;
    const male = patients.filter(p => p.gender === 'Male').length;
    const female = patients.filter(p => p.gender === 'Female').length;
    const avgAge = total > 0 ? Math.round(patients.reduce((acc, p) => acc + p.age, 0) / total) : 0;
    return { total, male, female, avgAge };
  }, [patients]);

  const filteredPatients = useMemo(() => {
    let result = [...patients];
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.id.toLowerCase().includes(query) ||
        (p.phone && p.phone.includes(query))
      );
    }
    
    return result.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'age') return b.age - a.age;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [patients, searchQuery, sortBy]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !age) return;
    addPatient({ name, age: parseInt(age), gender, phone, status });
    setName('');
    setAge('');
    setGender('Male');
    setPhone('');
    setStatus('Active');
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800">Patient Database</h2>
          <p className="text-slate-500 text-sm">Manage your patient records and clinical history</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text"
              placeholder="Search patients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-sm"
            />
          </div>
          <button 
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl font-bold transition shadow-lg shadow-emerald-500/20 flex items-center gap-2 whitespace-nowrap"
          >
            {isFormOpen ? <X size={18} /> : <Plus size={18} />}
            <span>{isFormOpen ? 'Close Form' : 'New Patient'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Records', value: stats.total, icon: Users, color: 'text-emerald-600', bgColor: 'bg-emerald-50' },
          { label: 'Male Patients', value: stats.male, icon: User, color: 'text-blue-600', bgColor: 'bg-blue-50' },
          { label: 'Female Patients', value: stats.female, icon: User, color: 'text-rose-600', bgColor: 'bg-rose-50' },
          { label: 'Average Age', value: `${stats.avgAge} Yrs`, icon: Activity, color: 'text-amber-600', bgColor: 'bg-amber-50' },
        ].map((s) => (
          <div key={s.label} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className={`w-10 h-10 ${s.bgColor} ${s.color} rounded-xl flex items-center justify-center`}>
              <s.icon size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.label}</p>
              <p className="text-lg font-black text-slate-800">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {isFormOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden"
        >
          <div className="p-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <UserPlus size={20} /> Register New Patient
            </h3>
            <p className="text-emerald-50/80 text-xs mt-1">Fill in the details to add a new patient to the database</p>
          </div>
          <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Full Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required 
                placeholder="Enter patient name..."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-colors" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Age</label>
              <input 
                type="number" 
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required 
                placeholder="Age"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-colors" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Gender</label>
              <select 
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-colors appearance-none"
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Phone Number</label>
              <input 
                type="tel" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter phone number..."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-colors" 
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Initial Status</label>
              <select 
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-colors appearance-none"
              >
                <option value="Active">Active Case</option>
                <option value="Follow-up">Needs Follow-up</option>
                <option value="Completed">Treatment Completed</option>
                <option value="Inactive">Inactive/On Hold</option>
              </select>
            </div>
            <div className="md:col-span-4 flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button 
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="px-6 py-2 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition"
              >
                Cancel
              </button>
              <button type="submit" className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-2 rounded-xl font-bold transition shadow-lg shadow-emerald-500/20 flex items-center gap-2">
                <Save size={18} /> Save Record
              </button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-slate-400" />
            <span className="text-xs font-bold text-slate-500">Sort by:</span>
            <div className="flex gap-1">
              {[
                { id: 'date', label: 'Date' },
                { id: 'name', label: 'Name' },
                { id: 'age', label: 'Age' }
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSortBy(s.id as any)}
                  className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                    sortBy === s.id ? 'bg-emerald-500 text-white shadow-md' : 'bg-white text-slate-400 hover:text-slate-600 border border-slate-200'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Showing {filteredPatients.length} of {patients.length}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse hidden md:table">
            <thead>
              <tr className="bg-slate-50/80 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
                <th className="p-4 border-b border-slate-100">ID</th>
                <th className="p-4 border-b border-slate-100">Patient Details</th>
                <th className="p-4 border-b border-slate-100">Demographics</th>
                <th className="p-4 border-b border-slate-100">Current Treatment</th>
                <th className="p-4 border-b border-slate-100">Registered On</th>
                <th className="p-4 border-b border-slate-100 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-slate-100">
              {filteredPatients.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-12 text-center">
                    <div className="flex flex-col items-center gap-2 text-slate-400">
                      <Users size={48} className="opacity-20 mb-2" />
                      <p className="font-bold">No patients found</p>
                      <p className="text-xs">Try adjusting your search or add a new patient</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredPatients.map((p) => (
                  <tr key={p.id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="p-4">
                      <span className="font-mono text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded-md font-bold">
                        {p.id.slice(0, 8)}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-sm">
                          {p.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800">{p.name}</p>
                          <div className="flex items-center gap-2">
                            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Patient Record</p>
                            {p.phone && (
                              <>
                                <span className="w-1 h-1 rounded-full bg-slate-200" />
                                <p className="text-[10px] text-slate-500 font-bold">{p.phone}</p>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-700 font-medium">{p.age} Yrs</span>
                          <span className="w-1 h-1 rounded-full bg-slate-300" />
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            p.gender === 'Male' ? 'bg-blue-50 text-blue-600' : 
                            p.gender === 'Female' ? 'bg-rose-50 text-rose-600' : 
                            'bg-slate-100 text-slate-600'
                          }`}>
                            {p.gender}
                          </span>
                        </div>
                        <span className={`w-fit px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest ${
                          p.status === 'Active' ? 'bg-emerald-100 text-emerald-700' :
                          p.status === 'Follow-up' ? 'bg-amber-100 text-amber-700' :
                          p.status === 'Completed' ? 'bg-blue-100 text-blue-700' :
                          'bg-slate-100 text-slate-500'
                        }`}>
                          {p.status || 'Active'}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col gap-1">
                        {p.remedy ? (
                          <>
                            <span className="text-emerald-700 font-black text-xs uppercase tracking-tight">{p.remedy}</span>
                            <span className="text-[10px] text-slate-400 font-bold">{p.currentPotency || 'N/A'}</span>
                          </>
                        ) : (
                          <span className="text-slate-300 italic text-[10px]">No remedy set</span>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-slate-500">
                        <Calendar size={14} />
                        <span className="text-xs">{p.date}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => onOpenPD(p)}
                          className="p-2 text-indigo-500 hover:bg-indigo-50 rounded-lg transition-colors" 
                          title="Patient Details (PD)"
                        >
                          <ClipboardList size={18} />
                        </button>
                        <button 
                          onClick={() => setSelectedPatientForRx(p)}
                          className="p-2 text-emerald-500 hover:bg-emerald-50 rounded-lg transition-colors" 
                          title="Write Prescription (Rx)"
                        >
                          <FileText size={18} />
                        </button>
                        <button 
                          onClick={() => onSetReminder(p)}
                          className="p-2 text-amber-500 hover:bg-amber-50 rounded-lg transition-colors" 
                          title="Set Reminder"
                        >
                          <Bell size={18} />
                        </button>
                        <button 
                          onClick={() => setPatientToDelete(p)}
                          className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors" 
                          title="Delete Patient"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Mobile Card View */}
          <div className="md:hidden divide-y divide-slate-100">
            {filteredPatients.length === 0 ? (
              <div className="p-12 text-center">
                <div className="flex flex-col items-center gap-2 text-slate-400">
                  <Users size={48} className="opacity-20 mb-2" />
                  <p className="font-bold">No patients found</p>
                </div>
              </div>
            ) : (
              filteredPatients.map((p) => (
                <div key={p.id} className="p-4 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-sm">
                        {p.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{p.name}</p>
                        <p className="text-[10px] text-slate-500 font-bold">{p.phone || 'No Phone'}</p>
                      </div>
                    </div>
                    <span className="font-mono text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded-md font-bold">
                      {p.id.slice(0, 8)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 bg-slate-50/50 p-3 rounded-xl">
                    <div>
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Demographics</p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-700">{p.age}Y</span>
                        <span className={`px-1.5 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider ${
                          p.gender === 'Male' ? 'bg-blue-50 text-blue-600' : 
                          p.gender === 'Female' ? 'bg-rose-50 text-rose-600' : 
                          'bg-slate-100 text-slate-600'
                        }`}>
                          {p.gender}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                      <span className={`px-1.5 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest ${
                        p.status === 'Active' ? 'bg-emerald-100 text-emerald-700' :
                        p.status === 'Follow-up' ? 'bg-amber-100 text-amber-700' :
                        p.status === 'Completed' ? 'bg-blue-100 text-blue-700' :
                        'bg-slate-100 text-slate-500'
                      }`}>
                        {p.status || 'Active'}
                      </span>
                    </div>
                    <div>
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Remedy</p>
                      <p className="text-[10px] font-black text-emerald-700 uppercase">{p.remedy || 'None'}</p>
                    </div>
                    <div>
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Registered</p>
                      <p className="text-[10px] font-bold text-slate-700">{p.date}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-end gap-2 pt-2">
                    <button 
                      onClick={() => onOpenPD(p)}
                      className="flex-1 flex items-center justify-center gap-2 py-2 bg-slate-100 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest"
                    >
                      <ClipboardList size={14} /> PD
                    </button>
                    <button 
                      onClick={() => setSelectedPatientForRx(p)}
                      className="flex-1 flex items-center justify-center gap-2 py-2 bg-emerald-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-200"
                    >
                      <FileText size={14} /> Rx
                    </button>
                    <button 
                      onClick={() => onSetReminder(p)}
                      className="p-2 text-amber-500 bg-amber-50 rounded-xl"
                    >
                      <Bell size={14} />
                    </button>
                    <button 
                      onClick={() => setPatientToDelete(p)}
                      className="p-2 text-rose-500 bg-rose-50 rounded-xl"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {patientToDelete && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPatientToDelete(null)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden z-10"
            >
              <div className="p-8 text-center">
                <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <AlertCircle size={40} />
                </div>
                <h3 className="text-2xl font-black text-slate-800 mb-2">Delete Patient?</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Are you sure you want to delete <span className="font-bold text-slate-800">{patientToDelete.name}</span>? 
                  This action cannot be undone and all associated clinical data will be permanently removed.
                </p>
              </div>
              <div className="flex border-t border-slate-100">
                <button 
                  onClick={() => setPatientToDelete(null)}
                  className="flex-1 py-5 text-sm font-bold text-slate-500 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    removePatient(patientToDelete.id);
                    setPatientToDelete(null);
                  }}
                  className="flex-1 py-5 text-sm font-bold text-rose-500 hover:bg-rose-50 transition-colors border-l border-slate-100"
                >
                  Confirm Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const RepertoryTab = ({ analysis, addToAnalysis, removeFromAnalysis, clearAnalysis, runRepertorization, onTransferToRx, setActiveTab, patients }: { 
  analysis: AnalysisItem[], 
  addToAnalysis: (item: AnalysisItem) => void, 
  removeFromAnalysis: (idx: number) => void, 
  clearAnalysis: () => void, 
  runRepertorization: (results: any[]) => void, 
  onTransferToRx: (patient: Patient) => void, 
  setActiveTab: (tab: string) => void, 
  patients: Patient[] 
}) => {
  const [selectedChapter, setSelectedChapter] = useState<string>('Mind');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatientId, setSelectedPatientId] = useState<string>('');
  const [sortBy, setSortBy] = useState<'name' | 'subrubrics'>('name');
  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const [selectedRubric, setSelectedRubric] = useState<Rubric | null>(null);
  const [isPanelExpanded, setIsPanelExpanded] = useState(false);

  const selectedPatient = useMemo(() => patients.find(p => p.id === selectedPatientId), [patients, selectedPatientId]);

  const currentChapter = REPERTORY_DATA.find(c => c.name === selectedChapter);
  const currentChapterIndex = CHAPTER_INDEX.find(c => c.n === selectedChapter);

  const filteredRubrics = useMemo(() => {
    if (!currentChapter) return [];
    let rubrics = currentChapter.rubrics.filter(r => {
      const matchesSearch = !searchQuery || 
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.tr.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (!matchesSearch) return false;

      if (activeFilter === 'ALL') return true;

      return r.sr.some(s => {
        const data = s.d;
        if (!data) return false;

        if (activeFilter === 'MIND') {
          return (data.mind && data.mind.length > 0) || (data.psychological && data.psychological.length > 0);
        }
        if (activeFilter === 'TIME') {
          return (data.general?.g_time && data.general.g_time.length > 0) || (data.time && data.time.length > 0);
        }
        if (activeFilter === 'SIDE') {
          return (data.general?.g_side && data.general.g_side.length > 0);
        }
        if (activeFilter === 'MODALITIES') {
          return (data.modality && data.modality.length > 0);
        }
        if (activeFilter === 'PHYSICAL GENERALS') {
          return (data.general?.g_temp && data.general.g_temp.length > 0) || 
                 (data.sensation && data.sensation.length > 0) || 
                 (data.pain && data.pain.length > 0) || 
                 (data.desire && data.desire.length > 0) || 
                 (data.aversion && data.aversion.length > 0) ||
                 (data.general?.g_phys && data.general.g_phys.length > 0);
        }
        return true;
      });
    });

    if (sortBy === 'name') {
      rubrics.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      rubrics.sort((a, b) => b.sr.length - a.sr.length);
    }

    return rubrics;
  }, [currentChapter, searchQuery, sortBy, activeFilter]);

  const getAllRemedies = (data: RubricData): RepertoryRemedy[] => {
    const remedies: RepertoryRemedy[] = [];
    if (!data) return remedies;
    const seen = new Set<string>();

    const addRemedies = (list?: RepertoryRemedy[]) => {
      if (!list) return;
      list.forEach(r => {
        if (!seen.has(r.n)) {
          remedies.push({ ...r });
          seen.add(r.n);
        } else {
          // Update grade if higher
          const existing = remedies.find(ex => ex.n === r.n);
          if (existing && r.g < existing.g) {
            existing.g = r.g;
          }
        }
      });
    };

    addRemedies(data.location);
    addRemedies(data.sensation);
    addRemedies(data.modality);
    addRemedies(data.concomitant);
    addRemedies(data.psychological);
    addRemedies(data.physiological);
    addRemedies(data.mind);
    addRemedies(data.pain);
    addRemedies(data.desire);
    addRemedies(data.aversion);
    addRemedies(data.time);
    
    if (data.general) {
      Object.values(data.general).forEach(list => addRemedies(list as RepertoryRemedy[]));
    }

    return remedies;
  };

  const calculateRepertorization = () => {
    if (analysis.length === 0) return;
    const remedyScores: { [key: string]: { score: number, count: number } } = {};
    analysis.forEach(item => {
      item.remedies.forEach(r => {
        if (!remedyScores[r.n]) {
          remedyScores[r.n] = { score: 0, count: 0 };
        }
        const points = r.g === 1 ? 3 : (r.g === 2 ? 2 : 1);
        remedyScores[r.n].score += points;
        remedyScores[r.n].count += 1;
      });
    });
    const results = Object.entries(remedyScores)
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => b.score - a.score || b.count - a.count)
      .slice(0, 10);
    runRepertorization(results);
  };

  const topRemedies = useMemo(() => {
    if (analysis.length === 0) return [];
    const remedyScores: { [key: string]: { score: number, count: number } } = {};
    analysis.forEach(item => {
      item.remedies.forEach(r => {
        if (!remedyScores[r.n]) remedyScores[r.n] = { score: 0, count: 0 };
        remedyScores[r.n].score += (r.g === 1 ? 3 : (r.g === 2 ? 2 : 1));
        remedyScores[r.n].count += 1;
      });
    });
    return Object.entries(remedyScores)
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  }, [analysis]);

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 lg:h-[calc(100vh-12rem)] min-h-[500px] lg:overflow-hidden">
      {/* Left Sidebar: Chapters */}
      <div className="w-full lg:w-72 flex flex-col gap-4 md:gap-6 shrink-0 lg:overflow-hidden">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col overflow-hidden flex-1 lg:min-h-0">
          <div className="p-4 md:p-6 border-b border-slate-50 bg-slate-50/30">
            <h3 className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Chapters (অধ্যায়)</h3>
            <p className="text-[8px] md:text-[10px] text-slate-400 font-bold uppercase tracking-widest">Kent's Repertory Index</p>
          </div>
          <div className="flex lg:flex-col overflow-x-auto lg:overflow-y-auto p-2 custom-scrollbar gap-4 lg:gap-4">
            {CHAPTER_CATEGORIES.map((cat) => (
              <div key={cat.name} className="flex-shrink-0 lg:w-full space-y-1">
                <div className="px-2 pb-1 mb-1 border-b border-slate-100 hidden lg:block">
                  <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.1em]">{cat.name}</h4>
                </div>
                <div className="flex lg:flex-col gap-2 lg:gap-0">
                  {cat.chapters.map(chapterName => {
                    const ch = CHAPTER_INDEX.find(c => c.n === chapterName);
                    if (!ch) return null;
                    const isActive = selectedChapter === ch.n;
                    const hasData = REPERTORY_DATA.some(rd => rd.name === ch.n);
                    return (
                      <button
                        key={ch.n}
                        onClick={() => {
                          if (hasData) {
                            setSelectedChapter(ch.n);
                            setSelectedRubric(null);
                          }
                        }}
                        disabled={!hasData}
                        className={`flex-shrink-0 lg:w-full flex items-center gap-3 p-2 md:p-3 rounded-2xl transition-all group ${
                          isActive 
                            ? 'bg-slate-900 text-white shadow-lg shadow-slate-200' 
                            : hasData 
                              ? 'hover:bg-slate-50 text-slate-600' 
                              : 'opacity-30 cursor-not-allowed'
                        }`}
                      >
                        <div className={`w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center text-lg transition-transform group-hover:scale-110 ${
                          isActive ? 'bg-white/10' : 'bg-slate-100'
                        }`}>
                          {ch.i}
                        </div>
                        <div className="text-left flex-1 min-w-[80px] lg:min-w-0 flex flex-col justify-center">
                          <p className={`text-[10px] md:text-xs font-black uppercase tracking-tight truncate ${isActive ? 'text-white' : 'text-slate-900'}`}>{ch.n}</p>
                          <p className={`text-[8px] md:text-[9px] font-bold uppercase tracking-widest ${isActive ? 'text-slate-400' : 'text-slate-400'}`}>{ch.t}</p>
                        </div>
                        {isActive && <ChevronRight size={14} className="hidden lg:block text-emerald-400" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Apothecary Note Card */}
        <div className="bg-emerald-600 rounded-3xl p-6 text-white shadow-xl shadow-emerald-100 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12 blur-2xl group-hover:scale-150 transition-transform duration-700" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Leaf size={20} />
              </div>
              <h4 className="font-black text-[10px] md:text-xs uppercase tracking-[0.2em]">Apothecary Note</h4>
            </div>
            <p className="text-sm md:text-base font-black text-white leading-tight mb-4 italic font-serif">
              "The highest ideal of cure is rapid, gentle and permanent restoration of health."
            </p>
            <button 
              onClick={() => setActiveTab('organon')}
              className="w-full py-3 bg-white text-emerald-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-50 transition-all shadow-lg shadow-black/5 flex items-center justify-center gap-2"
            >
              <BookOpen size={14} />
              Read Organon
            </button>
          </div>
        </div>
      </div>

      {/* Main Content: Rubric Browser */}
      <div className="flex-1 flex flex-col gap-4 md:gap-6 min-w-0 lg:overflow-hidden">
        {/* Header & Quick Filters */}
        <div className="bg-white rounded-3xl md:rounded-[2.5rem] p-4 md:p-8 border border-slate-100 shadow-sm space-y-4 md:space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-4">
              {selectedRubric && (
                <button 
                  onClick={() => setSelectedRubric(null)}
                  className="p-2 md:p-3 bg-slate-50 text-slate-600 rounded-2xl hover:bg-slate-100 transition-all border border-slate-100"
                >
                  <ChevronLeft size={20} />
                </button>
              )}
              <div>
                <p className="text-[8px] md:text-[10px] font-black text-emerald-600 uppercase tracking-[0.3em] mb-1">
                  {selectedRubric ? 'Rubric Details' : 'Central Repertory'}
                </p>
                <h2 className="text-xl md:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                  {selectedRubric ? selectedRubric.name : 'Repertory Browser'}
                  <span className="hidden sm:inline-block px-3 py-1 bg-slate-100 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-full">v4.2</span>
                </h2>
              </div>
            </div>
            {!selectedRubric && (
              <div className="flex flex-wrap items-center gap-2 md:gap-3 w-full md:w-auto">
                <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 md:px-5 py-2 md:py-2.5 bg-slate-50 text-slate-600 rounded-2xl text-[9px] md:text-[10px] font-black uppercase tracking-widest border border-slate-100 hover:bg-slate-100 transition-all">
                  <ListFilter size={14} /> Filters
                </button>
                <button 
                  onClick={() => setSortBy(sortBy === 'name' ? 'subrubrics' : 'name')}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 md:px-5 py-2 md:py-2.5 bg-slate-900 text-white rounded-2xl text-[9px] md:text-[10px] font-black uppercase tracking-widest shadow-lg shadow-slate-200 hover:bg-slate-800 transition-all"
                >
                  <ArrowUpDown size={14} /> Sort
                </button>
              </div>
            )}
          </div>

          {!selectedRubric && (
            <div className="flex flex-wrap items-center gap-2">
              {['ALL', 'MIND', 'TIME', 'SIDE', 'MODALITIES', 'PHYSICAL GENERALS'].map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-3 md:px-5 py-1.5 md:py-2 rounded-xl md:rounded-2xl text-[8px] md:text-[10px] font-black uppercase tracking-widest transition-all ${
                    activeFilter === f 
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-100' 
                      : 'bg-slate-50 text-slate-400 hover:text-slate-600 border border-slate-100'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Rubric List or Subrubric List */}
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4">
          {!selectedRubric ? (
            filteredRubrics.map((rubric, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                key={rubric.name}
                onClick={() => setSelectedRubric(rubric)}
                className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group relative overflow-hidden cursor-pointer"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="flex justify-between items-start relative z-10">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-lg">
                        {rubric.em}
                      </div>
                      <h4 className="text-md md:text-lg font-black text-slate-900 uppercase tracking-tight truncate">
                        {rubric.name} <span className="text-slate-400 font-bold">({rubric.tr})</span>
                      </h4>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 md:gap-4 text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      <span className="flex items-center gap-1.5"><Database size={12} /> Chapter: {selectedChapter}</span>
                      <span className="flex items-center gap-1.5"><ClipboardList size={12} /> Subrubrics: {rubric.sr.length}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-slate-300 hover:text-amber-500 hover:bg-amber-50 rounded-xl transition-all">
                      <Bookmark size={18} />
                    </button>
                    <button className="p-2 text-slate-300 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all">
                      <MoreHorizontal size={18} />
                    </button>
                  </div>
                </div>

                <div className="mt-6 space-y-4 relative z-10">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0" />
                    <p className="text-[11px] font-bold text-slate-500 leading-relaxed">
                      <span className="text-slate-900 uppercase font-black mr-2">Top Remedies:</span>
                      {getAllRemedies(rubric.sr[0]?.d).slice(0, 8).map((r, i) => (
                        <span key={i} className={`mr-2 ${r.g === 1 ? 'text-emerald-600 font-black' : r.g === 2 ? 'text-blue-600 font-black' : 'text-slate-400'}`}>
                          {r.n}{i < 7 ? ',' : '...'}
                        </span>
                      ))}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {['TIME', 'SIDE', 'MODALITIES'].map(tag => (
                        <span key={tag} className="px-3 py-1 bg-slate-50 text-slate-400 text-[9px] font-black uppercase tracking-widest rounded-lg border border-slate-100">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="text-[10px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-2">
                      View Subrubrics <ChevronRight size={14} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            Object.entries(
              selectedRubric.sr.reduce((acc, sub) => {
                // Determine primary category by looking at keys in sub.d
                let primaryKey = 'general';
                const keys = Object.keys(sub.d).filter(k => k !== 'general' && Array.isArray((sub.d as any)[k]) && (sub.d as any)[k].length > 0);
                if (keys.length > 0) {
                  primaryKey = keys[0];
                }
                const categoryDef = CATEGORIES.find(c => c.key === primaryKey) || CATEGORIES.find(c => c.key === 'general');
                const catName = categoryDef ? categoryDef.n : 'General Symptoms';
                
                if (!acc[catName]) acc[catName] = [];
                acc[catName].push(sub);
                return acc;
              }, {} as Record<string, typeof selectedRubric.sr>)
            ).sort((a, b) => a[0].localeCompare(b[0])).map(([catName, subs]) => (
              <div key={catName} className="space-y-4">
                <div className="flex items-center gap-3 py-2 border-b border-slate-100">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                  <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">{catName}</h4>
                </div>
                <div className="space-y-4">
                  {(subs as any[]).map((sub, idx) => (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      key={sub.name}
                      className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all group"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg">
                              {sub.em}
                            </div>
                            <h5 className="text-sm md:text-md font-black text-slate-900 uppercase tracking-tight">
                              {sub.name} <span className="text-slate-400 font-bold">({sub.tr})</span>
                            </h5>
                          </div>
                          
                          <div className="space-y-4">
                            <div className="flex items-start gap-3">
                              <div className="mt-1 w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0" />
                              <p className="text-[10px] md:text-[11px] font-bold text-slate-500 leading-relaxed">
                                <span className="text-slate-900 uppercase font-black mr-2">Remedies:</span>
                                {getAllRemedies(sub.d).map((r, i, arr) => (
                                  <span key={i} className={`mr-2 ${r.g === 1 ? 'text-emerald-600 font-black' : r.g === 2 ? 'text-blue-600 font-black' : 'text-slate-400'}`}>
                                    {r.n}{i < arr.length - 1 ? ',' : ''}
                                  </span>
                                ))}
                              </p>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                              <div className="flex flex-wrap gap-2">
                                {Object.entries(sub.d).map(([key, val]) => {
                                  if (key === 'general' || !val || (Array.isArray(val) && val.length === 0)) return null;
                                  return (
                                    <span key={key} className="px-2 py-0.5 bg-slate-50 text-slate-400 text-[8px] font-black uppercase tracking-widest rounded-md border border-slate-100">
                                      {key}
                                    </span>
                                  );
                                })}
                              </div>
                              <button 
                                onClick={() => addToAnalysis({
                                  chapter: selectedChapter,
                                  rubric: selectedRubric.name,
                                  subrubric: sub.name,
                                  text: `${selectedRubric.name}, ${sub.name}`,
                                  category: 'General',
                                  page: currentChapterIndex?.p.split('-')[0] ? parseInt(currentChapterIndex.p.split('-')[0]) : 0,
                                  remedies: getAllRemedies(sub.d)
                                })}
                                className="flex items-center justify-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-100 hover:bg-emerald-600 transition-all w-full sm:w-auto"
                              >
                                <Plus size={12} /> Add to Selection
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Floating Active Repertorization Panel */}
      <AnimatePresence>
        {!isPanelExpanded ? (
          <motion.button
            key="floating-icon"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsPanelExpanded(true)}
            className="fixed bottom-4 right-4 md:bottom-8 md:right-8 w-16 h-16 bg-slate-900 rounded-full shadow-2xl shadow-slate-900/40 flex items-center justify-center text-white z-50 border border-slate-800 group"
          >
            <div className="relative">
              <Activity size={24} className="group-hover:text-emerald-400 transition-colors" />
              {analysis.length > 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full text-[10px] font-black flex items-center justify-center border-2 border-slate-900">
                  {analysis.length}
                </span>
              )}
            </div>
          </motion.button>
        ) : (
          <motion.div 
            key="expanded-panel"
            drag
            dragMomentum={false}
            initial={{ y: 100, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 100, opacity: 0, scale: 0.8 }}
            className="fixed bottom-4 right-4 md:bottom-8 md:right-8 w-[calc(100vw-2rem)] md:w-80 z-50 bg-slate-900 rounded-[2.5rem] shadow-2xl shadow-slate-900/40 overflow-hidden border border-slate-800 cursor-grab active:cursor-grabbing"
          >
            <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50 backdrop-blur-md">
              <div>
                <h3 className="text-white font-black text-xs uppercase tracking-[0.2em]">Active Repertorization</h3>
                <p className="text-slate-500 text-[9px] font-bold uppercase tracking-widest mt-1">{analysis.length} Rubrics Selected</p>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); setIsPanelExpanded(false); }}
                className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-2xl flex items-center justify-center text-white transition-colors"
              >
                <ChevronDown size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="space-y-3">
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Top Remedy Matches</p>
                {topRemedies.length > 0 ? (
                  topRemedies.map((r, i) => (
                    <div key={r.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-emerald-500 font-black text-xs">{i + 1}.</span>
                        <span className="text-white font-black text-[11px] uppercase tracking-tight">{r.name}</span>
                      </div>
                      <span className="text-slate-400 font-black text-[11px]">{r.score} <span className="text-[8px] uppercase tracking-widest ml-0.5">pts</span></span>
                    </div>
                  ))
                ) : (
                  <p className="text-[10px] text-slate-600 italic">No rubrics added yet...</p>
                )}
              </div>

              <div className="pt-4 border-t border-slate-800">
                <button 
                  onClick={calculateRepertorization}
                  disabled={analysis.length === 0}
                  className="w-full py-4 bg-white text-slate-900 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  View Detailed Analysis
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

