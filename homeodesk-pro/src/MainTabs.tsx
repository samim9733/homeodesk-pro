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

  const gradientMap: Record<string, string> = {
    emerald: 'linear-gradient(135deg, #10b981, #059669)',
    blue: 'linear-gradient(135deg, #3b82f6, #2563eb)',
    amber: 'linear-gradient(135deg, #f59e0b, #d97706)',
    rose: 'linear-gradient(135deg, #ef4444, #dc2626)',
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`stat-card stat-card-${stat.color}`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                  <p className="text-3xl font-black text-slate-900 mt-2">{stat.value}</p>
                  <p className="text-[10px] font-bold text-slate-400 mt-1">{stat.change}</p>
                </div>
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
                  style={{ background: gradientMap[stat.color] }}
                >
                  <Icon size={22} className="text-white" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Patients */}
      <div className="modern-card overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">Recent Patients</h2>
          <button onClick={() => setActiveTab('patients')} className="text-[10px] font-bold text-emerald-600 hover:text-emerald-700 uppercase tracking-widest flex items-center gap-1">
            View All <ChevronRight size={12} />
          </button>
        </div>
        <div className="divide-y divide-slate-50">
          {patients.slice(0, 5).map((patient) => (
            <div key={patient.id} className="flex items-center gap-4 p-4 hover:bg-slate-50 transition cursor-pointer" onClick={() => onOpenPD(patient)}>
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-black text-xs" style={{ background: 'linear-gradient(135deg, #0f172a, #1e293b)' }}>
                {patient.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-black text-slate-900 truncate">{patient.name}</p>
                <p className="text-[10px] font-bold text-slate-400">{patient.id} • {patient.age}y / {patient.gender}</p>
              </div>
              <div className="text-right">
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                  patient.status === 'Active' ? 'badge-active' :
                  patient.status === 'Follow-up' ? 'badge-followup' :
                  'badge-inactive'
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
      <div className="modern-card p-5">
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
                className="flex flex-col items-center gap-2 p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-all border border-slate-100 hover:!shadow-md"
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
          <h2 className="section-title">Patient Database</h2>
          <p className="section-subtitle">{patients.length} Total Patients</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowAdd(true)}
          className="btn-primary shadow-lg flex items-center gap-2"
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
          className="modern-input"
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
            <input type="text" value={newName} onChange={e => setNewName(e.target.value)} placeholder="Patient Name" className="modern-input" />
            <input type="number" value={newAge} onChange={e => setNewAge(e.target.value)} placeholder="Age" className="modern-input" />
            <select value={newGender} onChange={e => setNewGender(e.target.value)} className="modern-input">
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
      <div className="modern-card overflow-hidden">
        <div className="divide-y divide-slate-50">
          {filtered.map((patient) => (
            <div key={patient.id} className="flex items-center gap-4 p-4 hover:bg-slate-50 transition">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-black text-xs flex-shrink-0" style={{ background: 'linear-gradient(135deg, #0f172a, #1e293b)' }}>
                {patient.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-black text-slate-900 truncate">{patient.name}</p>
                <p className="text-[10px] font-bold text-slate-400">{patient.id} • {patient.age}y / {patient.gender}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => setSelectedPatientForRx(patient)} className="px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-2xl text-[10px] font-bold uppercase tracking-wider hover:bg-emerald-100 transition">Rx</button>
                <button onClick={() => onOpenPD(patient)} className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-2xl text-[10px] font-bold uppercase tracking-wider hover:bg-blue-100 transition flex items-center gap-1"><Eye size={10} /> View</button>
                <button onClick={() => onSetReminder(patient)} className="px-3 py-1.5 bg-amber-50 text-amber-600 rounded-2xl text-[10px] font-bold uppercase tracking-wider hover:bg-amber-100 transition"><Bell size={10} /></button>
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
import { KENT_REPERTORY_DATA } from './kentRepertoryData';

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
  const [selectedChapterId, setSelectedChapterId] = useState('');
  const [searchResults, setSearchResults] = useState<{id: string; text: string; chapter: string; remedies: {name: string, grade: number}[]}[]>([]);
  const [expandedRubrics, setExpandedRubrics] = useState<Set<string>>(new Set());
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [rubricPage, setRubricPage] = useState(0);
  const RUBRICS_PER_PAGE = 100;

  const toggleExpand = (rubricId: string) => {
    setExpandedRubrics(prev => {
      const next = new Set(prev);
      if (next.has(rubricId)) next.delete(rubricId);
      else next.add(rubricId);
      return next;
    });
  };

  const handleSearch = () => {
    if (!search.trim()) {
      setSearchResults([]);
      return;
    }
    const q = search.toLowerCase();
    const results: {id: string; text: string; chapter: string; remedies: {name: string, grade: number}[]}[] = [];
    for (const ch of KENT_REPERTORY_DATA) {
      for (const r of ch.rubrics) {
        if (r.text.toLowerCase().includes(q)) {
          results.push({ id: r.id, text: r.text, chapter: ch.chapter, remedies: r.remedies || [] });
          if (results.length >= 200) break;
        }
      }
      if (results.length >= 200) break;
    }
    setSearchResults(results);
  };

  const selectedChapter = KENT_REPERTORY_DATA.find(ch => ch.id === selectedChapterId);
  const chapterRubrics = selectedChapter ? selectedChapter.rubrics : [];
  const pagedRubrics = chapterRubrics.slice(rubricPage * RUBRICS_PER_PAGE, (rubricPage + 1) * RUBRICS_PER_PAGE);
  const totalPages = Math.ceil(chapterRubrics.length / RUBRICS_PER_PAGE);

  // Group sub-rubrics under parent rubrics for tree view
  const buildRubricTree = (rubrics: typeof chapterRubrics, chapterId: string) => {
    const mainRubrics: typeof chapterRubrics = [];
    const subMap = new Map<string, typeof chapterRubrics>();

    // Auto-detect the actual prefix used in rubric IDs.
    // Chapter ID may differ from rubric prefix (e.g. chapter 'extremities' uses 'ext-',
    // chapter 'generalities' uses 'gen-', chapter 'prostate-gland' uses 'prostate-gland-').
    let prefix = chapterId + '-';
    if (rubrics.length > 0 && !rubrics[0].id.startsWith(prefix)) {
      // Derive prefix from first rubric: everything before the trailing number
      const parts = rubrics[0].id.split('-');
      prefix = parts.slice(0, -1).join('-') + '-';
    }

    for (const r of rubrics) {
      // Strip the detected prefix, then check numeric suffix
      const afterPrefix = r.id.startsWith(prefix) ? r.id.slice(prefix.length) : r.id;
      const numParts = afterPrefix.split('-');
      if (numParts.length >= 2) {
        // Has sub-number → sub-rubric (e.g. "1-1", "2-1", "2-1-1")
        const parentId = prefix + numParts.slice(0, -1).join('-');
        if (!subMap.has(parentId)) subMap.set(parentId, []);
        subMap.get(parentId)!.push(r);
      } else {
        mainRubrics.push(r);
      }
    }
    return { mainRubrics, subMap };
  };

  const { mainRubrics, subMap } = buildRubricTree(pagedRubrics, selectedChapterId);

  const handleRepertorize = () => {
    if (analysis.length === 0) return;
    const results = [
      { name: 'Nux Vomica', score: 45, count: 3, rubrics: analysis.map(a => a.text) },
      { name: 'Sulphur', score: 38, count: 2, rubrics: analysis.map(a => a.text).slice(0, 2) },
      { name: 'Lycopodium', score: 30, count: 2, rubrics: analysis.map(a => a.text).slice(1, 3) },
    ];
    runRepertorization(results);
  };

  const isInAnalysis = (text: string) => analysis.some(a => a.text === text);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="section-title">Kent&apos;s Repertory</h2>
          <p className="section-subtitle">Browse &amp; search rubrics</p>
        </div>
        <button
          onClick={() => setShowAnalysis(!showAnalysis)}
          className="btn-emerald relative shadow-lg flex items-center gap-1.5"
        >
          <Filter size={14} />
          Analysis {analysis.length > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-rose-500 text-white rounded-full text-[9px] font-black flex items-center justify-center">{analysis.length}</span>
          )}
        </button>
      </div>

      {/* Search */}
      <div className="modern-card p-4 space-y-3">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); if (!e.target.value.trim()) setSearchResults([]); }}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="modern-input"
              placeholder="Search rubrics across all chapters..."
            />
          </div>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={handleSearch}
            className="btn-primary shadow-lg"
          >
            Search
          </motion.button>
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <div className="px-3 py-2 bg-emerald-50 border-b border-slate-200">
              <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                {searchResults.length} results found
                {searchResults.length >= 200 && ' (showing first 200)'}
              </p>
            </div>
            <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
              {searchResults.map(r => (
                <div key={r.id} className="flex items-center justify-between px-3 py-2.5 hover:bg-slate-50 transition">
                  <div className="flex-1 min-w-0 mr-3">
                    <p className="text-xs font-bold text-slate-900 truncate">{r.text}</p>
                    <p className="text-[9px] font-bold text-emerald-600">{r.chapter}</p>
                  </div>
                  <button
                    onClick={() => addToAnalysis({ text: r.text, chapter: r.chapter, remedies: r.remedies || [] })}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition flex-shrink-0 ${
                      isInAnalysis(r.text)
                        ? 'bg-emerald-100 text-emerald-700 cursor-default'
                        : 'bg-emerald-500 text-white hover:bg-emerald-600'
                    }`}
                  >
                    {isInAnalysis(r.text) ? 'Added' : '+ Add'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Chapter Browser + Rubric Tree */}
      <div className="grid grid-cols-12 gap-4">
        {/* Chapter List */}
        <div className="col-span-4 modern-card overflow-hidden">
          <div className="p-3 gradient-dark text-white">
            <h3 className="text-[10px] font-black uppercase tracking-widest">Chapters ({KENT_REPERTORY_DATA.length})</h3>
          </div>
          <div className="max-h-[500px] overflow-y-auto divide-y divide-slate-50">
            {KENT_REPERTORY_DATA.map(ch => (
              <button
                key={ch.id}
                onClick={() => { setSelectedChapterId(ch.id); setRubricPage(0); setExpandedRubrics(new Set()); }}
                className={`w-full text-left px-3 py-2.5 flex items-center justify-between transition ${
                  selectedChapterId === ch.id
                    ? 'bg-emerald-50 border-l-3 border-emerald-500 hover:bg-emerald-100'
                    : 'hover:bg-slate-50 border-l-3 border-transparent'
                }`}
              >
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-bold truncate ${selectedChapterId === ch.id ? 'text-emerald-800' : 'text-slate-700'}`}>{ch.chapter}</p>
                  <p className="text-[9px] font-bold text-slate-400">{ch.rubrics.length} rubrics</p>
                </div>
                {selectedChapterId === ch.id && <ChevronRight size={14} className="text-emerald-500 flex-shrink-0" />}
              </button>
            ))}
          </div>
        </div>

        {/* Rubric Tree */}
        <div className="col-span-8 modern-card overflow-hidden">
          {selectedChapter ? (
            <>
              <div className="p-3 gradient-primary text-white flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest">{selectedChapter.chapter}</h3>
                  <p className="text-[9px] font-bold text-emerald-200">
                    {chapterRubrics.length} rubrics total
                    {totalPages > 1 && ` - Page ${rubricPage + 1} of ${totalPages}`}
                  </p>
                </div>
              </div>
              <div className="max-h-[500px] overflow-y-auto divide-y divide-slate-100">
                {mainRubrics.map(r => {
                  const subs = subMap.get(r.id) || [];
                  const isExpanded = expandedRubrics.has(r.id);
                  return (
                    <div key={r.id}>
                      <div className="flex items-center justify-between px-3 py-2 hover:bg-slate-50 hover:pl-4 transition-all">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          {subs.length > 0 && (
                            <button
                              onClick={() => toggleExpand(r.id)}
                              className="flex-shrink-0 text-slate-400 hover:text-emerald-600 transition"
                            >
                              <ChevronRight size={12} className={`transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                            </button>
                          )}
                          {subs.length === 0 && <span className="w-3 flex-shrink-0" />}
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-slate-800 truncate">{r.text}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => addToAnalysis({ text: r.text, chapter: selectedChapter.chapter, remedies: r.remedies || [] })}
                          className={`ml-2 px-2 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider transition flex-shrink-0 ${
                            isInAnalysis(r.text)
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-slate-100 text-slate-600 hover:bg-emerald-500 hover:text-white'
                          }`}
                        >
                          {isInAnalysis(r.text) ? 'Added' : '+ Add'}
                        </button>
                      </div>
                      {isExpanded && subs.length > 0 && (
                        <div className="bg-slate-50/50 border-l-2 border-emerald-200 ml-4 mr-2 mb-1 divide-y divide-slate-100">
                          {subs.map(sub => (
                            <div key={sub.id} className="flex items-center justify-between px-3 py-1.5 hover:bg-emerald-50 transition">
                              <p className="text-[11px] text-slate-600 truncate flex-1 min-w-0">{sub.text}</p>
                              <button
                                onClick={() => addToAnalysis({ text: sub.text, chapter: selectedChapter.chapter, remedies: sub.remedies || [] })}
                                className={`ml-2 px-2 py-0.5 rounded text-[9px] font-bold transition flex-shrink-0 ${
                                  isInAnalysis(sub.text)
                                    ? 'text-emerald-700'
                                    : 'text-slate-400 hover:text-emerald-600 hover:bg-emerald-100'
                                }`}
                              >
                                {isInAnalysis(sub.text) ? 'Added' : '+'}
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="p-3 border-t border-slate-200 flex items-center justify-between">
                  <button
                    onClick={() => setRubricPage(Math.max(0, rubricPage - 1))}
                    disabled={rubricPage === 0}
                    className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-bold uppercase disabled:opacity-40"
                  >
                    Previous
                  </button>
                  <span className="text-[10px] font-bold text-slate-500">
                    Page {rubricPage + 1} / {totalPages}
                  </span>
                  <button
                    onClick={() => setRubricPage(Math.min(totalPages - 1, rubricPage + 1))}
                    disabled={rubricPage >= totalPages - 1}
                    className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-bold uppercase disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-slate-300">
              <BookOpen size={48} />
              <p className="text-xs font-bold mt-4">Select a chapter to browse rubrics</p>
            </div>
          )}
        </div>
      </div>

      {/* Analysis Panel (expandable) */}
      {showAnalysis && (
        <div className="modern-card overflow-hidden">
          <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter size={16} />
              <h3 className="text-xs font-black uppercase tracking-widest">Selected Rubrics ({analysis.length})</h3>
            </div>
            <div className="flex gap-3">
              {analysis.length > 0 && (
                <button onClick={clearAnalysis} className="text-[10px] font-bold text-slate-400 hover:text-white transition">Clear All</button>
              )}
              <button onClick={() => setShowAnalysis(false)} className="text-slate-400 hover:text-white transition">
                <X size={14} />
              </button>
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
              <p className="text-xs text-slate-400 text-center py-6 font-bold">Browse chapters or search to add rubrics</p>
            )}
          </div>
          {analysis.length > 0 && (
            <div className="p-4 border-t border-slate-100">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleRepertorize}
                className="btn-emerald w-full flex items-center justify-center gap-2"
              >
                <Filter size={14} /> Run Repertorization
              </motion.button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}