import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  LayoutDashboard, Users, UserPlus, Search, Eye, TrendingUp, TrendingDown,
  Bell, Calendar, Star, Filter, Stethoscope, BookOpen, Leaf, Clock, ChevronRight, Plus, Trash2, X
} from 'lucide-react';
import { Patient, AnalysisItem, Reminder } from './types';

// ==================== DASHBOARD ====================
interface DashboardProps {
  patients: Patient[];
  analysisCount: number;
  reminders: Reminder[];
  setActiveTab: (tab: string) => void;
  onOpenPD: (patient: Patient) => void;
}

export function Dashboard({ patients, analysisCount, reminders, setActiveTab, onOpenPD }: DashboardProps) {
  const stats = [
    { label: 'Total Patients', value: patients.length, icon: Users, color: 'emerald', change: '+3 this month' },
    { label: 'Active Cases', value: patients.filter(p => p.status === 'Active').length, icon: Stethoscope, color: 'blue', change: 'Ongoing' },
    { label: 'Analyses Run', value: analysisCount, icon: Filter, color: 'amber', change: 'All time' },
    { label: 'Pending Reminders', value: reminders.filter(r => !r.completed).length, icon: Bell, color: 'rose', change: 'Action needed' },
  ];

  const colorClasses: Record<string, { bg: string; icon: string; border: string }> = {
    emerald: { bg: 'bg-emerald-50', icon: 'bg-emerald-500', border: 'border-emerald-100' },
    blue: { bg: 'bg-blue-50', icon: 'bg-blue-500', border: 'border-blue-100' },
    amber: { bg: 'bg-amber-50', icon: 'bg-amber-500', border: 'border-amber-100' },
    rose: { bg: 'bg-rose-50', icon: 'bg-rose-500', border: 'border-rose-100' },
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const colors = colorClasses[stat.color];
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-white rounded-2xl border border-slate-200 shadow-sm p-5 hover:border-slate-300 transition-all`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                  <p className="text-3xl font-black text-slate-900 mt-2">{stat.value}</p>
                  <p className="text-[10px] font-bold text-slate-400 mt-1">{stat.change}</p>
                </div>
                <div className={`w-12 h-12 rounded-2xl ${colors.icon} flex items-center justify-center shadow-lg`}>
                  <Icon size={22} className="text-white" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Patients */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">Recent Patients</h2>
          <button onClick={() => setActiveTab('patients')} className="text-[10px] font-bold text-emerald-600 hover:text-emerald-700 uppercase tracking-widest flex items-center gap-1">
            View All <ChevronRight size={12} />
          </button>
        </div>
        <div className="divide-y divide-slate-50">
          {patients.slice(0, 5).map((patient) => (
            <div key={patient.id} className="flex items-center gap-4 p-4 hover:bg-slate-50 transition cursor-pointer" onClick={() => onOpenPD(patient)}>
              <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white font-black text-xs">
                {patient.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-black text-slate-900 truncate">{patient.name}</p>
                <p className="text-[10px] font-bold text-slate-400">{patient.id} • {patient.age}y / {patient.gender}</p>
              </div>
              <div className="text-right">
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                  patient.status === 'Active' ? 'bg-emerald-50 text-emerald-600' :
                  patient.status === 'Follow-up' ? 'bg-amber-50 text-amber-600' :
                  'bg-slate-50 text-slate-400'
                }`}>
                  {patient.status || 'Active'}
                </span>
                <p className="text-[9px] font-bold text-slate-300 mt-1">{patient.lastVisit}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'New Patient', icon: UserPlus, action: () => setActiveTab('patients') },
            { label: 'Repertory', icon: Stethoscope, action: () => setActiveTab('repertory') },
            { label: 'Case Analysis', icon: Filter, action: () => setActiveTab('analysis') },
            { label: 'Organon', icon: BookOpen, action: () => setActiveTab('organon') },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.label}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={item.action}
                className="flex flex-col items-center gap-2 p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-all border border-slate-100"
              >
                <Icon size={20} className="text-slate-600" />
                <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{item.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ==================== PATIENTS TAB ====================
interface PatientsTabProps {
  patients: Patient[];
  addPatient: (p: Omit<Patient, 'id' | 'date'>) => void;
  removePatient: (id: string) => void;
  setSelectedPatientForRx: (patient: Patient) => void;
  onOpenPD: (patient: Patient) => void;
  onSetReminder: (patient: Patient) => void;
}

export function PatientsTab({ patients, addPatient, removePatient, setSelectedPatientForRx, onOpenPD, onSetReminder }: PatientsTabProps) {
  const [search, setSearch] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState('');
  const [newGender, setNewGender] = useState('Male');

  const filtered = patients.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.id.toLowerCase().includes(search.toLowerCase()) ||
    p.phone.includes(search)
  );

  const handleAdd = () => {
    if (!newName) return;
    addPatient({
      name: newName,
      age: Number(newAge) || 0,
      gender: newGender as Patient['gender'],
      phone: '',
      chiefSymptoms: [],
      physicalGenerals: [],
      status: 'Active',
    });
    setNewName('');
    setNewAge('');
    setShowAdd(false);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Patient Database</h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{patients.length} Total Patients</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowAdd(true)}
          className="px-4 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg flex items-center gap-2"
        >
          <Plus size={14} /> Add Patient
        </motion.button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          placeholder="Search patients by name, ID, or phone..."
        />
      </div>

      {/* Add Patient Modal */}
      {showAdd && (
        <div className="bg-white rounded-2xl border border-emerald-200 shadow-sm p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black text-emerald-700 uppercase tracking-widest">New Patient</h3>
            <button onClick={() => setShowAdd(false)} className="text-slate-400 hover:text-slate-600"><X size={18} /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input type="text" value={newName} onChange={e => setNewName(e.target.value)} placeholder="Patient Name" className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20" />
            <input type="number" value={newAge} onChange={e => setNewAge(e.target.value)} placeholder="Age" className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20" />
            <select value={newGender} onChange={e => setNewGender(e.target.value)} className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20">
              <option>Male</option><option>Female</option><option>Other</option>
            </select>
          </div>
          <div className="flex gap-3 justify-end">
            <button onClick={() => setShowAdd(false)} className="px-5 py-2.5 bg-white text-slate-500 border border-slate-200 rounded-xl text-xs font-black uppercase tracking-widest">Cancel</button>
            <button onClick={handleAdd} className="px-5 py-2.5 bg-emerald-500 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg">Add Patient</button>
          </div>
        </div>
      )}

      {/* Patient List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="divide-y divide-slate-50">
          {filtered.map((patient) => (
            <div key={patient.id} className="flex items-center gap-4 p-4 hover:bg-slate-50 transition">
              <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white font-black text-xs flex-shrink-0">
                {patient.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-black text-slate-900 truncate">{patient.name}</p>
                <p className="text-[10px] font-bold text-slate-400">{patient.id} • {patient.age}y / {patient.gender}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => setSelectedPatientForRx(patient)} className="px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-bold uppercase tracking-wider hover:bg-emerald-100 transition">Rx</button>
                <button onClick={() => onOpenPD(patient)} className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-bold uppercase tracking-wider hover:bg-blue-100 transition flex items-center gap-1"><Eye size={10} /> View</button>
                <button onClick={() => onSetReminder(patient)} className="px-3 py-1.5 bg-amber-50 text-amber-600 rounded-lg text-[10px] font-bold uppercase tracking-wider hover:bg-amber-100 transition"><Bell size={10} /></button>
                <button onClick={() => removePatient(patient.id)} className="p-1.5 text-slate-300 hover:text-rose-500 transition"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-12 text-slate-400">
              <Users size={40} className="mx-auto mb-3 text-slate-200" />
              <p className="text-xs font-bold uppercase tracking-widest">No patients found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ==================== REPERTORY TAB ====================
interface RepertoryTabProps {
  analysis: AnalysisItem[];
  addToAnalysis: (item: AnalysisItem) => void;
  removeFromAnalysis: (idx: number) => void;
  clearAnalysis: () => void;
  runRepertorization: (results: any[]) => void;
  onTransferToRx: (patient: Patient) => void;
  setActiveTab: (tab: string) => void;
  patients: Patient[];
}

export function RepertoryTab({ analysis, addToAnalysis, removeFromAnalysis, clearAnalysis, runRepertorization, onTransferToRx, setActiveTab, patients }: RepertoryTabProps) {
  const [search, setSearch] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearch = () => {
    if (!search.trim()) return;
    // Simulated search - in real app, would search repertory data
    const results = [
      { id: 'r1', text: search, chapter: selectedChapter || 'Mind', remedies: ['Nux Vomica', 'Sulphur', 'Lycopodium', 'Pulsatilla', 'Natrum Mur'] },
    ];
    setSearchResults(results);
  };

  const handleRepertorize = () => {
    // Simulated repertorization
    const results = [
      { name: 'Nux Vomica', score: 45, count: 3, rubrics: analysis.map(a => a.text) },
      { name: 'Sulphur', score: 38, count: 2, rubrics: analysis.map(a => a.text).slice(0, 2) },
      { name: 'Lycopodium', score: 30, count: 2, rubrics: analysis.map(a => a.text).slice(1, 3) },
    ];
    runRepertorization(results);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Kent's Repertory</h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Browse & search rubrics</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-3">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              placeholder="Search rubrics..."
            />
          </div>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={handleSearch}
            className="px-5 py-3 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg"
          >
            Search
          </motion.button>
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="space-y-2">
            {searchResults.map(r => (
              <div key={r.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <div>
                  <p className="text-xs font-bold text-slate-900">{r.text}</p>
                  <p className="text-[9px] font-bold text-slate-400">{r.chapter}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-bold text-emerald-600">{r.remedies.length} remedies</span>
                  <button
                    onClick={() => addToAnalysis({ text: r.text, chapter: r.chapter, remedies: r.remedies })}
                    className="px-3 py-1.5 bg-emerald-500 text-white rounded-lg text-[10px] font-bold uppercase tracking-wider"
                  >
                    + Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Analysis Panel */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter size={16} />
            <h3 className="text-xs font-black uppercase tracking-widest">Selected Rubrics ({analysis.length})</h3>
          </div>
          <div className="flex gap-2">
            {analysis.length > 0 && (
              <button onClick={clearAnalysis} className="text-[10px] font-bold text-slate-400 hover:text-white transition">Clear All</button>
            )}
          </div>
        </div>
        <div className="p-3 space-y-1.5 max-h-64 overflow-y-auto">
          {analysis.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl border border-emerald-100">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-emerald-800 truncate">{item.text}</p>
                <p className="text-[9px] font-bold text-emerald-500">{item.chapter}</p>
              </div>
              <button onClick={() => removeFromAnalysis(idx)} className="text-emerald-400 hover:text-rose-500 transition ml-2">
                <X size={14} />
              </button>
            </div>
          ))}
          {analysis.length === 0 && (
            <p className="text-xs text-slate-400 text-center py-6 font-bold">Search and add rubrics to build your analysis</p>
          )}
        </div>
        {analysis.length > 0 && (
          <div className="p-4 border-t border-slate-100">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleRepertorize}
              className="w-full py-3 bg-emerald-500 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg flex items-center justify-center gap-2"
            >
              <Filter size={14} /> Run Repertorization
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
}
