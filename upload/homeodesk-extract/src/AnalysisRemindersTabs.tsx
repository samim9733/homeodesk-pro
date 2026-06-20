import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bell, Calendar, Search, Plus, Trash2, Edit, X, RefreshCw, AlertCircle, Clock, Save, ChevronRight, ChevronLeft, Play, Database, Stethoscope, Eraser, FileText, Share2, ClipboardList
, Users, FlaskConical, History, BookmarkCheck, Thermometer, Activity, Move, Zap, Droplets, ArrowRightLeft, Utensils, ChevronDown, Loader2, Brain, Bookmark} from 'lucide-react';
import { Patient, Reminder, AnalysisItem, ChiefSymptom, PhysicalGeneral } from './types';
import { CHAPTER_INDEX } from './constants';
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';

export const RemindersTab = ({ reminders, setReminders, patients, preSelectedPatientId, setPreSelectedPatientId }: { 
  reminders: Reminder[], 
  setReminders: React.Dispatch<React.SetStateAction<Reminder[]>>,
  patients: Patient[],
  preSelectedPatientId: string | null,
  setPreSelectedPatientId: (id: string | null) => void
}) => {
  const [showAddForm, setShowAddForm] = useState(!!preSelectedPatientId);
  const [newReminder, setNewReminder] = useState<Omit<Reminder, 'id' | 'completed'>>({
    patientId: preSelectedPatientId || '',
    patientName: '',
    type: 'Follow-up',
    date: '',
    time: '',
    note: ''
  });

  useEffect(() => {
    if (preSelectedPatientId) {
      setShowAddForm(true);
      setNewReminder(prev => ({ ...prev, patientId: preSelectedPatientId }));
    }
  }, [preSelectedPatientId]);

  const handleAddReminder = (e: React.FormEvent) => {
    e.preventDefault();
    const patient = patients.find(p => p.id === newReminder.patientId);
    const reminder: Reminder = {
      ...newReminder,
      id: `REM-${Math.floor(Math.random() * 10000)}`,
      patientName: patient ? patient.name : 'Unknown Patient',
      completed: false
    };
    setReminders(prev => [reminder, ...prev]);
    setShowAddForm(false);
    setPreSelectedPatientId(null);
    setNewReminder({
      patientId: '',
      patientName: '',
      type: 'Follow-up',
      date: '',
      time: '',
      note: ''
    });
  };

  const toggleComplete = (id: string) => {
    setReminders(prev => prev.map(r => r.id === id ? { ...r, completed: !r.completed } : r));
  };

  const deleteReminder = (id: string) => {
    setReminders(prev => prev.filter(r => r.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-200">
              <Bell size={20} />
            </div>
            Patient Reminders
          </h2>
          <p className="text-slate-500 text-sm font-medium mt-1 ml-13">Manage clinical follow-ups and medication schedules</p>
        </div>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center justify-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-2xl hover:bg-slate-800 transition shadow-xl shadow-slate-200 font-bold text-sm"
        >
          {showAddForm ? <X size={18} /> : <Plus size={18} />}
          <span>{showAddForm ? 'Close Form' : 'Set New Reminder'}</span>
        </button>
      </div>

      <AnimatePresence>
        {showAddForm && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="bg-white p-8 rounded-3xl shadow-2xl border border-slate-100 mb-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full -mr-16 -mt-16 blur-3xl opacity-50" />
            
            <form onSubmit={handleAddReminder} className="relative z-10 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Select Patient</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <select 
                      required
                      value={newReminder.patientId}
                      onChange={(e) => setNewReminder({ ...newReminder, patientId: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none bg-slate-50/50 text-sm font-bold transition-all"
                    >
                      <option value="">Choose patient...</option>
                      {patients.map(p => (
                        <option key={p.id} value={p.id}>{p.name} ({p.id})</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Reminder Type</label>
                  <div className="relative">
                    <ClipboardList className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <select 
                      value={newReminder.type}
                      onChange={(e) => setNewReminder({ ...newReminder, type: e.target.value as any })}
                      className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none bg-slate-50/50 text-sm font-bold transition-all"
                    >
                      <option value="Appointment">Appointment</option>
                      <option value="Medication">Medication</option>
                      <option value="Follow-up">Follow-up</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                      type="date"
                      required
                      value={newReminder.date}
                      onChange={(e) => setNewReminder({ ...newReminder, date: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none bg-slate-50/50 text-sm font-bold transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Time</label>
                  <div className="relative">
                    <Bell className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                      type="time"
                      required
                      value={newReminder.time}
                      onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none bg-slate-50/50 text-sm font-bold transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Note / Instructions</label>
                <div className="relative">
                  <Edit className="absolute left-3 top-4 text-slate-400" size={16} />
                  <textarea 
                    placeholder="e.g., Check progress after 2 weeks of medication..."
                    value={newReminder.note}
                    onChange={(e) => setNewReminder({ ...newReminder, note: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none bg-slate-50/50 text-sm font-bold transition-all h-20 resize-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-2">
                <button 
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-8 py-3 text-slate-500 font-bold hover:bg-slate-100 rounded-2xl transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-10 py-3 bg-emerald-600 text-white rounded-2xl hover:bg-emerald-700 transition shadow-xl shadow-emerald-200 font-black uppercase tracking-widest text-xs"
                >
                  Save Reminder
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reminders.length === 0 ? (
          <div className="col-span-full py-20 text-center bg-white rounded-[2.5rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center">
            <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-300 mb-6">
              <Bell size={40} />
            </div>
            <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">No Active Reminders</h3>
            <p className="text-slate-400 font-medium mt-2">Your clinical schedule is currently clear.</p>
            <button 
              onClick={() => setShowAddForm(true)}
              className="mt-8 px-8 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition shadow-xl shadow-slate-200 text-sm"
            >
              Create First Reminder
            </button>
          </div>
        ) : (
          reminders.map((reminder) => (
            <motion.div 
              layout
              key={reminder.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`group relative p-6 rounded-[2rem] border-2 transition-all duration-300 ${
                reminder.completed 
                  ? 'bg-slate-50 border-slate-100 opacity-60 grayscale' 
                  : 'bg-white border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-200 hover:-translate-y-1'
              }`}
            >
              <div className="flex items-start justify-between mb-6">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${
                  reminder.type === 'Appointment' ? 'bg-blue-500 text-white shadow-blue-200' :
                  reminder.type === 'Medication' ? 'bg-emerald-500 text-white shadow-emerald-200' :
                  reminder.type === 'Follow-up' ? 'bg-purple-500 text-white shadow-purple-200' :
                  'bg-amber-500 text-white shadow-amber-200'
                }`}>
                  {reminder.type === 'Appointment' ? <Calendar size={20} /> :
                   reminder.type === 'Medication' ? <FlaskConical size={20} /> :
                   reminder.type === 'Follow-up' ? <History size={20} /> :
                   <Bell size={20} />}
                </div>
                <div className="flex gap-1">
                  <button 
                    onClick={() => toggleComplete(reminder.id)}
                    className={`p-2.5 rounded-xl transition-all ${
                      reminder.completed 
                        ? 'bg-emerald-500 text-white' 
                        : 'bg-slate-50 text-slate-400 hover:bg-emerald-50 hover:text-emerald-600'
                    }`}
                    title={reminder.completed ? "Mark as Pending" : "Mark as Completed"}
                  >
                    <BookmarkCheck size={18} />
                  </button>
                  <button 
                    onClick={() => deleteReminder(reminder.id)}
                    className="p-2.5 bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all"
                    title="Delete Reminder"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
                      reminder.type === 'Appointment' ? 'bg-blue-100 text-blue-700' :
                      reminder.type === 'Medication' ? 'bg-emerald-100 text-emerald-700' :
                      reminder.type === 'Follow-up' ? 'bg-purple-100 text-purple-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {reminder.type}
                    </span>
                    {new Date(reminder.date) < new Date() && !reminder.completed && (
                      <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-red-100 text-red-700 animate-pulse">
                        Overdue
                      </span>
                    )}
                  </div>
                  <h4 className="text-lg font-black text-slate-900 uppercase tracking-tight truncate">{reminder.patientName}</h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ID: {reminder.patientId}</p>
                </div>

                <div className="flex items-center gap-4 py-3 border-y border-slate-50">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-slate-400" />
                    <span className="text-xs font-bold text-slate-600">{new Date(reminder.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bell size={14} className="text-slate-400" />
                    <span className="text-xs font-bold text-slate-600">{reminder.time}</span>
                  </div>
                </div>

                {reminder.note && (
                  <div className="bg-slate-50 p-3 rounded-xl">
                    <p className="text-xs font-medium text-slate-500 italic line-clamp-2">"{reminder.note}"</p>
                  </div>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export const AnalysisTab = ({ patients, analysis, onClearAnalysis, onRemoveRubric, onTransferToRx, onCompare, onUpdatePatient, onAddPatient, setActiveTab, preSelectedPatientId }: { 
  patients: Patient[], 
  analysis: AnalysisItem[],
  onClearAnalysis: () => void,
  onRemoveRubric: (idx: number) => void,
  onTransferToRx: (patient: Patient) => void,
  onCompare: (remedyA: string, remedyB: string) => void,
  onUpdatePatient: (updatedPatient: Patient) => void,
  onAddPatient: (p: Omit<Patient, 'id' | 'date'>) => void,
  setActiveTab: (tab: string) => void,
  preSelectedPatientId?: string | null
}) => {
  const [selectedPatient, setSelectedPatient] = useState<Patient>(patients[0]);
  const [sortMode, setSortMode] = useState<'score' | 'coverage'>('score');
  const [potency, setPotency] = useState('200');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (preSelectedPatientId && patients.length > 0) {
      const p = patients.find(p => p.id === preSelectedPatientId);
      if (p) setSelectedPatient(p);
    }
  }, [preSelectedPatientId, patients]);

  const [showPatientSelector, setShowPatientSelector] = useState(false);
  const [showIntake, setShowIntake] = useState(false);
  const [selectedRemedy, setSelectedRemedy] = useState<string | null>(selectedPatient.remedy || null);
  const [caseAnalysis, setCaseAnalysis] = useState('');

  // Symptom States
  const [chiefSymptoms, setChiefSymptoms] = useState<ChiefSymptom[]>([]);
  const [mentalSymptoms, setMentalSymptoms] = useState<string[]>([]);
  const [physicalGenerals, setPhysicalGenerals] = useState<PhysicalGeneral[]>([]);

  const COMPLAINT_OPTIONS = useMemo(() => CHAPTER_INDEX.map(c => c.n), []);
  const LOCATION_OPTIONS = [
    "Head", "Forehead", "Temples", "Vertex", "Occiput", "Eyes", "Ears", "Nose", "Face", "Mouth", "Teeth", "Tongue", "Throat", 
    "Stomach", "Abdomen", "Hypochondrium", "Umbilical Region", "Iliac Region", "Rectum", "Anus", "Bladder", "Kidneys", "Urethra", 
    "Genitalia", "Larynx", "Trachea", "Chest", "Heart", "Lungs", "Back", "Spine", "Lumbar", "Sacrum", "Extremities", "Shoulders", 
    "Arms", "Hands", "Fingers", "Hips", "Legs", "Knees", "Feet", "Toes", "Skin", "Nerves", "Blood Vessels"
  ];
  const SENSATION_OPTIONS = [
    "Aching", "Biting", "Burning", "Bursting", "Clutching", "Constricting", "Cramping", "Crawling", "Crushing", "Cutting", 
    "Digging", "Distending", "Dragging", "Drawing", "Dull", "Empty feeling", "Gnawing", "Griping", "Hammering", "Heaviness", 
    "Itching", "Jerking", "Lacerating", "Numbness", "Paralytic", "Pinching", "Pressing", "Prickling", "Pulsating", "Rawness", 
    "Shooting", "Smarting", "Soreness", "Spasmodic", "Splinter-like", "Squeezing", "Stabbing", "Sticking", "Stinging", 
    "Stitching", "Tearing", "Tension", "Throbbing", "Tickling", "Tingling", "Twitching", "Wandering"
  ];
  const MODALITY_OPTIONS = [
    "< Morning", "< Forenoon", "< Noon", "< Afternoon", "< Evening", "< Night", "< Midnight", 
    "< Cold", "< Heat", "< Dampness", "< Dryness", "< Change of weather", "< Draft of air", 
    "< Motion", "< Rest", "< Standing", "< Sitting", "< Lying", "< Walking", "< Running", 
    "< Eating", "< Drinking", "< After sleep", "< Touch", "< Pressure", "< Tight clothing", 
    "> Cold", "> Heat", "> Motion", "> Rest", "> Pressure", "> Rubbing", "> Open air", "> Warm room", 
    "> Eating", "> Drinking", "> Sleep", "> Perspiration", "> Discharge"
  ];
  const CONCOMITANT_OPTIONS = [
    "Thirst", "Thirstless", "Nausea", "Vomiting", "Sweat", "Chills", "Fever", "Weakness", "Prostration", 
    "Restlessness", "Anxiety", "Fear", "Sadness", "Drowsiness", "Sleeplessness", 
    "Headache", "Vertigo", "Palpitation", "Cough", "Diarrhea", "Constipation"
  ];

  const physicalGeneralsMeta = [
    { label: "Time", icon: <Clock size={14} /> },
    { label: "Temperature", icon: <Thermometer size={14} /> },
    { label: "Physiological", icon: <Activity size={14} /> },
    { label: "Position", icon: <Move size={14} /> },
    { label: "Pathological", icon: <AlertCircle size={14} /> },
    { label: "Physical Factors", icon: <Zap size={14} /> },
    { label: "Discharges", icon: <Droplets size={14} /> },
    { label: "Sides", icon: <ArrowRightLeft size={14} /> },
    { label: "Alterations", icon: <RefreshCw size={14} /> },
    { label: "Craving/Aversion", icon: <Utensils size={14} /> }
  ];

  useEffect(() => {
    setChiefSymptoms(selectedPatient.chiefSymptoms || Array.from({ length: 5 }, () => ({ complaint: '', location: '', sensation: '', modality: '', concomitant: '' })));
    setMentalSymptoms(selectedPatient.mentalSymptoms || Array(5).fill(''));
    setPhysicalGenerals(selectedPatient.physicalGenerals || physicalGeneralsMeta.map(m => ({ label: m.label, value: '' })));
    setCaseAnalysis(selectedPatient.caseAnalysis || '');
    setSelectedRemedy(selectedPatient.remedy || null);
  }, [selectedPatient]);

  // Calculate Repertorization Results
  const analysisResults = useMemo(() => {
    if (analysis.length === 0) return [];
    
    const remedyMap: { [key: string]: { 
      name: string, 
      short: string, 
      score: number, 
      coverage: number, 
      degrees: (number | null)[] 
    } } = {};

    analysis.forEach((item, rubricIdx) => {
      item.remedies.forEach(r => {
        if (!remedyMap[r.n]) {
          remedyMap[r.n] = {
            name: r.n,
            short: r.n.substring(0, 4).toUpperCase(),
            score: 0,
            coverage: 0,
            degrees: new Array(analysis.length).fill(null)
          };
        }
        
        const points = r.g === 1 ? 3 : (r.g === 2 ? 2 : 1);
        remedyMap[r.n].score += points;
        remedyMap[r.n].coverage += 1;
        remedyMap[r.n].degrees[rubricIdx] = r.g === 1 ? 3 : (r.g === 2 ? 2 : 1); // Map grade to degree points
      });
    });

    return Object.values(remedyMap)
      .sort((a, b) => {
        if (sortMode === 'score') {
          return b.score - a.score || b.coverage - a.coverage;
        } else {
          return b.coverage - a.coverage || b.score - a.score;
        }
      })
      .slice(0, 10);
  }, [analysis, sortMode]);

  const handleSave = () => {
    setIsSaving(true);
    
    // Update patient with core rubrics from analysis and symptom data
    const updatedPatient: Patient = {
      ...selectedPatient,
      coreRubrics: [...analysis],
      chiefSymptoms,
      mentalSymptoms,
      physicalGenerals,
      caseAnalysis,
      remedy: selectedRemedy || undefined
    };
    
    onUpdatePatient(updatedPatient);

    setTimeout(() => {
      setIsSaving(false);
      alert(`Analysis and Clinical Record for ${selectedPatient.name} updated successfully.`);
    }, 1500);
  };

  const handleTransfer = () => {
    onTransferToRx(selectedPatient);
  };

  const getMiasmInfo = () => {
    if (analysisResults.length === 0) return { miasm: 'Unknown', load: 0, desc: 'Add rubrics to analyze miasmatic load.' };
    
    const topRemedy = analysisResults[0].name.toLowerCase();
    if (topRemedy.includes('calc') || topRemedy.includes('lyc') || topRemedy.includes('sulph')) {
      return { 
        miasm: 'Psoric', 
        load: 85, 
        desc: 'The predominance of functional disturbances and structural sensitivity points to a strong Psoric load. Focus on constitutional stability.' 
      };
    }
    if (topRemedy.includes('merc') || topRemedy.includes('aur') || topRemedy.includes('nit-ac')) {
      return { 
        miasm: 'Syphilitic', 
        load: 65, 
        desc: 'Destructive tendencies and deep-seated tissue changes suggest a Syphilitic miasm. Anti-syphilitic remedies may be required.' 
      };
    }
    return { 
      miasm: 'Sycotic', 
      load: 75, 
      desc: 'Overgrowth, coordination issues, and slow progression indicate a Sycotic miasmatic influence.' 
    };
  };

  const miasmInfo = getMiasmInfo();

  return (
    <div className="space-y-10 max-w-7xl mx-auto pb-20">
      {/* Vitals HUD */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
        <div className="relative">
          <span className="text-[10px] uppercase tracking-[0.2em] font-black text-primary mb-2 block">Active Case Analysis</span>
          <div className="flex items-center gap-4 group cursor-pointer" onClick={() => setShowPatientSelector(!showPatientSelector)}>
            <h2 className="text-5xl font-manrope font-extrabold text-on-surface tracking-tight group-hover:text-primary transition-colors">{selectedPatient.name}</h2>
            <ChevronDown size={32} className={`text-outline transition-transform ${showPatientSelector ? 'rotate-180' : ''}`} />
          </div>
          
          <AnimatePresence>
            {showPatientSelector && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-0 mt-4 w-80 bg-white rounded-3xl shadow-2xl border border-surface-container-low z-50 overflow-hidden"
              >
                <div className="p-4 border-b border-surface-container-low bg-surface-container-low/30">
                  <p className="text-[10px] font-black uppercase tracking-widest text-outline">Switch Patient</p>
                </div>
                <div className="max-h-64 overflow-y-auto custom-scrollbar">
                  {patients.map(p => (
                    <button 
                      key={p.id}
                      onClick={() => {
                        setSelectedPatient(p);
                        setShowPatientSelector(false);
                      }}
                      className={`w-full text-left px-6 py-4 hover:bg-surface-container-low transition-all flex items-center justify-between ${selectedPatient.id === p.id ? 'bg-primary/5 text-primary' : 'text-on-surface'}`}
                    >
                      <span className="font-bold text-sm">{p.name}</span>
                      {selectedPatient.id === p.id && <div className="w-2 h-2 bg-primary rounded-full" />}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex flex-wrap gap-3 mt-4">
            <span className="bg-secondary-container text-on-secondary-container px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">Miasm: {miasmInfo.miasm}</span>
            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${selectedRemedy ? 'bg-primary text-white shadow-md' : 'bg-tertiary-fixed text-on-tertiary-fixed'}`}>
              {selectedRemedy ? `Selected: ${selectedRemedy}` : `Indicated: ${analysisResults[0]?.name || 'None'}`}
            </span>
            <span className="text-outline text-[11px] flex items-center gap-2 font-bold ml-2">
              <Calendar size={14} /> Last Visit: {selectedPatient.lastVisit}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setShowIntake(!showIntake)}
            className={`px-6 py-3 font-black text-[10px] uppercase tracking-widest rounded-xl transition-all flex items-center gap-2 ${
              showIntake ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
            }`}
          >
            <ClipboardList size={14} />
            {showIntake ? 'Hide Case Intake' : 'Show Case Intake'}
          </button>
          <div className="h-10 w-px bg-surface-container-low" />
          <div className="flex gap-3">
            <button 
              onClick={onClearAnalysis}
              className="px-6 py-3 bg-error/10 text-error font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-error/20 transition-all flex items-center gap-2"
            >
              <Trash2 size={14} /> Clear
            </button>
            <button 
              onClick={handleTransfer}
              className="px-6 py-3 bg-tertiary text-white font-black text-[10px] uppercase tracking-widest rounded-xl shadow-lg shadow-tertiary/20 hover:bg-tertiary-container transition-all flex items-center gap-2"
            >
              <Stethoscope size={14} /> Prescribe
            </button>
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className={`px-6 py-3 font-black text-[10px] uppercase tracking-widest rounded-xl transition-all flex items-center gap-2 ${
                isSaving ? 'bg-surface-container-high text-outline cursor-not-allowed' : 'bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary-container'
              }`}
            >
              {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
              {isSaving ? 'Saving...' : 'Save Analysis'}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showIntake && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-surface-container-lowest rounded-[3rem] p-10 border border-surface-container-low shadow-xl space-y-12">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-manrope font-black text-on-surface uppercase tracking-tight">Clinical Intake</h3>
                  <p className="text-xs text-outline font-bold uppercase tracking-widest mt-1">Record symptoms for {selectedPatient.name}</p>
                </div>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full">5 Chief</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-widest rounded-full">5 Mental</span>
                  <span className="px-3 py-1 bg-amber-100 text-amber-700 text-[10px] font-black uppercase tracking-widest rounded-full">10 Physical</span>
                </div>
              </div>

              {/* Chief Symptoms */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
                    <Plus size={18} />
                  </div>
                  <h4 className="text-sm font-black text-on-surface uppercase tracking-widest">Chief Symptoms (L/S/M/C)</h4>
                </div>
                <div className="grid grid-cols-1 gap-6">
                  {chiefSymptoms.map((symptom, i) => (
                    <div key={i} className="bg-surface-container-low/30 p-6 rounded-3xl border border-surface-container-low flex flex-col lg:flex-row gap-6">
                      <div className="lg:w-1/5">
                        <label className="text-[9px] font-black text-outline uppercase tracking-widest mb-2 block">Complaint {i+1}</label>
                        <div className="relative">
                          <input 
                            type="text"
                            list={`complaint-options-${i}`}
                            value={symptom.complaint}
                            onChange={(e) => {
                              const newSymptoms = [...chiefSymptoms];
                              newSymptoms[i] = { ...newSymptoms[i], complaint: e.target.value };
                              setChiefSymptoms(newSymptoms);
                            }}
                            placeholder="Main complaint..."
                            className="w-full bg-white border border-surface-container-low rounded-xl px-4 py-2 pr-10 text-xs font-bold outline-none focus:border-primary transition-colors"
                          />
                          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-primary pointer-events-none" />
                        </div>
                        <div className="mt-2">
                          <select 
                            className="w-full bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest rounded-lg px-3 py-1.5 outline-none border border-primary/10 cursor-pointer hover:bg-primary/10 transition-all"
                            onChange={(e) => {
                              if (e.target.value) {
                                const current = symptom.complaint;
                                const newValue = current ? `${current}, ${e.target.value}` : e.target.value;
                                const newSymptoms = [...chiefSymptoms];
                                newSymptoms[i] = { ...newSymptoms[i], complaint: newValue };
                                setChiefSymptoms(newSymptoms);
                                e.target.value = ""; 
                              }
                            }}
                          >
                            <option value="">+ Quick Add Complaint</option>
                            {COMPLAINT_OPTIONS.map(opt => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                        </div>
                        <datalist id={`complaint-options-${i}`}>
                          {COMPLAINT_OPTIONS.map(opt => <option key={opt} value={opt} />)}
                        </datalist>
                      </div>
                      <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                          { label: 'Location', field: 'location', options: LOCATION_OPTIONS, color: 'primary' },
                          { label: 'Sensation', field: 'sensation', options: SENSATION_OPTIONS, color: 'blue' },
                          { label: 'Modality', field: 'modality', options: MODALITY_OPTIONS, color: 'amber' },
                          { label: 'Concomitant', field: 'concomitant', options: CONCOMITANT_OPTIONS, color: 'rose' }
                        ].map(f => (
                          <div key={f.field}>
                            <label className="text-[9px] font-black text-outline uppercase tracking-widest mb-2 block">{f.label}</label>
                            <div className="relative">
                              <input 
                                type="text"
                                list={`${f.field}-options-${i}`}
                                value={symptom[f.field as keyof ChiefSymptom]}
                                onChange={(e) => {
                                  const newSymptoms = [...chiefSymptoms];
                                  newSymptoms[i] = { ...newSymptoms[i], [f.field]: e.target.value };
                                  setChiefSymptoms(newSymptoms);
                                }}
                                placeholder={f.label + "..."}
                                className="w-full bg-white border border-surface-container-low rounded-xl px-4 py-2 pr-10 text-xs font-bold outline-none focus:border-primary transition-colors"
                              />
                              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-primary pointer-events-none" />
                            </div>
                            <datalist id={`${f.field}-options-${i}`}>
                              {f.options.map(opt => <option key={opt} value={opt} />)}
                            </datalist>
                            
                            <div className="mt-2">
                              <select 
                                className={`w-full bg-${f.color === 'primary' ? 'primary/5' : f.color + '-50'} text-${f.color === 'primary' ? 'primary' : f.color + '-600'} text-[10px] font-black uppercase tracking-widest rounded-lg px-3 py-1.5 outline-none border border-${f.color === 'primary' ? 'primary/10' : f.color + '-100'} cursor-pointer hover:bg-${f.color === 'primary' ? 'primary/10' : f.color + '-100'} transition-all`}
                                onChange={(e) => {
                                  if (e.target.value) {
                                    const current = symptom[f.field as keyof ChiefSymptom];
                                    const newValue = current ? `${current}, ${e.target.value}` : e.target.value;
                                    const newSymptoms = [...chiefSymptoms];
                                    newSymptoms[i] = { ...newSymptoms[i], [f.field]: newValue };
                                    setChiefSymptoms(newSymptoms);
                                    e.target.value = ""; 
                                  }
                                }}
                              >
                                <option value="">+ Quick Add {f.label}</option>
                                {f.options.map(opt => (
                                  <option key={opt} value={opt}>{opt}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Mental State */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                      <Brain size={18} />
                    </div>
                    <h4 className="text-sm font-black text-on-surface uppercase tracking-widest">Mental State (5 Box)</h4>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    {mentalSymptoms.map((s, i) => (
                      <textarea 
                        key={i}
                        value={s}
                        onChange={(e) => {
                          const newSymptoms = [...mentalSymptoms];
                          newSymptoms[i] = e.target.value;
                          setMentalSymptoms(newSymptoms);
                        }}
                        placeholder={`Mental symptom ${i+1}...`}
                        className="w-full h-20 bg-blue-50/30 border border-blue-100 rounded-2xl p-4 text-xs font-bold outline-none focus:bg-white focus:border-blue-300 transition-all resize-none"
                      />
                    ))}
                  </div>
                </div>

                {/* Physical Generals */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center text-white">
                      <Activity size={18} />
                    </div>
                    <h4 className="text-sm font-black text-on-surface uppercase tracking-widest">Physical Generals (10 Box)</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {physicalGenerals.map((pg, i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-amber-600">{physicalGeneralsMeta[i].icon}</span>
                          <label className="text-[9px] font-black text-outline uppercase tracking-widest">{pg.label}</label>
                        </div>
                        <input 
                          type="text"
                          value={pg.value}
                          onChange={(e) => {
                            const newGenerals = [...physicalGenerals];
                            newGenerals[i] = { ...newGenerals[i], value: e.target.value };
                            setPhysicalGenerals(newGenerals);
                          }}
                          placeholder={pg.label + "..."}
                          className="w-full bg-amber-50/30 border border-amber-100 rounded-xl px-4 py-2 text-xs font-bold outline-none focus:bg-white focus:border-amber-300 transition-all"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-surface-container-low flex justify-end">
                <button 
                  onClick={handleSave}
                  className="px-8 py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:bg-primary-container transition-all flex items-center gap-3"
                >
                  <Save size={18} />
                  Save Clinical Intake & Analysis
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-12 gap-8 items-start">
        {/* Left Column: Case Rubrics */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="font-manrope text-xl font-extrabold tracking-tight">Case Rubrics <span className="text-outline font-bold ml-2 text-sm">({analysis.length})</span></h3>
            <button 
              onClick={() => setActiveTab('repertory')}
              className="text-primary hover:underline text-xs font-black uppercase tracking-widest"
            >
              + Add New
            </button>
          </div>
          <div className="space-y-4">
            {analysis.length === 0 ? (
              <div className="bg-surface-container-low/30 border-2 border-dashed border-surface-container-low rounded-[2rem] p-12 text-center">
                <ClipboardList size={48} className="mx-auto text-outline/30 mb-4" />
                <p className="text-sm text-outline font-bold">No rubrics selected for analysis.</p>
                <p className="text-[10px] text-outline/60 uppercase tracking-widest mt-2">Go to Repertory to add rubrics</p>
              </div>
            ) : (
              analysis.map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="group bg-surface-container-lowest p-6 rounded-[1.5rem] border-l-[6px] border-primary shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] font-black uppercase tracking-widest text-outline">{item.chapter}</span>
                    <button 
                      onClick={() => onRemoveRubric(idx)}
                      className="text-outline hover:text-error transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <p className="text-sm font-bold text-on-surface leading-relaxed mb-4">{item.text}</p>
                  <div className="flex gap-2">
                    <span className="bg-surface-container-low text-on-surface-variant text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">{item.remedies.length} Remedies</span>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Visual Analysis */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
          {/* Repertorization Matrix */}
          <div className="bg-surface-container-lowest rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-surface-container-low">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
              <div>
                <h3 className="font-manrope text-2xl font-black text-on-surface tracking-tight">Repertorization Matrix</h3>
                <p className="text-sm text-outline font-medium mt-1">Cross-reference of rubrics vs. indicated remedies</p>
              </div>
              <div className="flex items-center gap-2 bg-surface-container-low p-1.5 rounded-2xl">
                <button 
                  onClick={() => setSortMode('score')}
                  className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-colors ${sortMode === 'score' ? 'bg-white text-primary shadow-sm' : 'text-outline hover:text-primary'}`}
                >
                  By Score
                </button>
                <button 
                  onClick={() => setSortMode('coverage')}
                  className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-colors ${sortMode === 'coverage' ? 'bg-white text-primary shadow-sm' : 'text-outline hover:text-primary'}`}
                >
                  By Coverage
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto custom-scrollbar pb-4">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-outline border-b border-surface-container-low">
                    <th className="pb-6 min-w-[220px]">Remedy</th>
                    <th className="pb-6 text-center">Score</th>
                    <th className="pb-6 text-center">Coverage</th>
                    {analysis.map((item, i) => (
                      <th key={i} className="pb-6 text-center max-w-[100px] truncate" title={item.text}>
                        {item.text.split(',')[0]}
                      </th>
                    ))}
                    <th className="pb-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {analysisResults.length === 0 ? (
                    <tr>
                      <td colSpan={5 + analysis.length} className="py-20 text-center text-outline font-bold italic opacity-50">
                        No analysis data available. Please add rubrics to the case.
                      </td>
                    </tr>
                  ) : (
                    analysisResults.map((res, idx) => (
                      <tr 
                        key={idx} 
                        onClick={() => setSelectedRemedy(res.name)}
                        className={`group cursor-pointer transition-all ${selectedRemedy === res.name ? 'bg-primary/5' : 'hover:bg-surface-container-low/30'}`}
                      >
                        <td className="py-6">
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-[11px] shadow-sm transition-all ${
                              selectedRemedy === res.name ? 'bg-primary text-white' : 'bg-primary/10 text-primary'
                            }`}>
                              {res.short}
                            </div>
                            <div>
                              <p className={`font-black tracking-tight transition-colors ${selectedRemedy === res.name ? 'text-primary' : 'text-on-surface'}`}>{res.name}</p>
                              <p className="text-[10px] text-outline font-bold uppercase tracking-widest">Remedy</p>
                            </div>
                          </div>
                        </td>
                        <td className={`text-center font-black text-base transition-colors ${selectedRemedy === res.name ? 'text-primary' : 'text-primary/60'}`}>{res.score}</td>
                        <td className="text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            {Array.from({ length: Math.min(analysis.length, 5) }).map((_, i) => (
                              <span key={i} className={`w-2.5 h-2.5 rounded-full transition-all ${
                                i < res.coverage ? (selectedRemedy === res.name ? 'bg-primary scale-125 shadow-md' : 'bg-primary/60 scale-110') : 'bg-outline-variant/20'
                              }`} />
                            ))}
                          </div>
                        </td>
                        {res.degrees.map((deg, dIdx) => (
                          <td key={dIdx} className="text-center">
                            {deg ? (
                              <span className={`inline-block w-8 h-8 leading-8 rounded-xl text-[11px] font-black shadow-sm transition-all ${
                                deg === 3 ? (selectedRemedy === res.name ? 'bg-primary text-white scale-110' : 'bg-primary/80 text-white') : 
                                deg === 2 ? (selectedRemedy === res.name ? 'bg-primary/60 text-white' : 'bg-primary/40 text-white') : 
                                'bg-secondary-container text-on-secondary-container'
                              }`}>
                                {deg}
                              </span>
                            ) : (
                              <span className="text-outline/30 font-bold">—</span>
                            )}
                          </td>
                        ))}
                        <td className="py-6 text-right pr-4">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedRemedy(selectedRemedy === res.name ? null : res.name);
                            }}
                            className={`p-2 rounded-xl transition-all ${
                              selectedRemedy === res.name 
                                ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                                : 'bg-surface-container-high text-outline hover:text-primary hover:bg-primary/10'
                            }`}
                          >
                            {selectedRemedy === res.name ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Strategic Clinical Insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Miasmatic Analysis */}
            <div className="bg-surface-container-lowest rounded-[2.5rem] p-8 shadow-sm border border-surface-container-low">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <Activity size={20} />
                </div>
                <h4 className="font-manrope font-black text-on-surface tracking-tight">Miasmatic Analysis</h4>
              </div>
              <p className="text-xs text-on-surface-variant font-medium leading-relaxed mb-8">
                {miasmInfo.desc}
              </p>
              <div className="space-y-4">
                <div className="flex justify-between items-end mb-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-outline">{miasmInfo.miasm} Load</span>
                  <span className="text-xs font-black text-primary">{miasmInfo.load}%</span>
                </div>
                <div className="h-2.5 bg-surface-container-low rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${miasmInfo.load}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
              </div>
            </div>

            {/* Remedy Comparison */}
            <div className="bg-primary-container rounded-[2.5rem] p-8 shadow-xl shadow-primary/10 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center">
                    <ArrowRightLeft size={20} />
                  </div>
                  <h4 className="font-manrope font-black tracking-tight">Remedy Comparison</h4>
                </div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-70">
                    {analysisResults[0]?.name || 'Remedy A'} vs {analysisResults[1]?.name || 'Remedy B'}
                  </span>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">
                    Top 2 Indicated
                  </span>
                </div>
                <div className="min-h-[60px] flex flex-col justify-center mb-6">
                  <p className="text-xs font-medium leading-relaxed opacity-90">
                    {analysisResults.length >= 2 
                      ? `Compare the top two indicated remedies, ${analysisResults[0].name} and ${analysisResults[1].name}, side-by-side in the Materia Medica browser for a precise differential diagnosis.`
                      : "Add more rubrics to see comparison between top indicated remedies."}
                  </p>
                </div>
                <button 
                  onClick={() => {
                    if (analysisResults.length >= 2) {
                      onCompare(analysisResults[0].name, analysisResults[1].name);
                    }
                  }}
                  disabled={analysisResults.length < 2}
                  className={`w-full py-4 bg-white text-primary rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg transition-all ${
                    analysisResults.length < 2 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-fixed'
                  }`}
                >
                  Compare Top 2 Remedies
                </button>
              </div>
            </div>
          </div>

          {/* Potency Prescription Guide */}
          <div id="potency-guide-container" className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-surface-container-low relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 relative z-10">
              <div>
                <h4 className="flex items-center gap-2 font-manrope font-black text-xl text-on-surface tracking-tight">
                  <Activity className="w-5 h-5 text-primary" />
                  Potency Prescription Guide
                </h4>
                <p className="text-xs text-outline font-bold uppercase tracking-widest mt-1">Select indicated potency for the case</p>
              </div>
              <button 
                onClick={() => {
                  const updatedPatient = { ...selectedPatient, currentPotency: potency };
                  onUpdatePatient(updatedPatient);
                  alert(`Potency ${potency} prescribed for ${selectedPatient.name}`);
                }}
                className="px-6 py-2.5 bg-primary hover:bg-tertiary text-white rounded-2xl font-black text-sm shadow-lg shadow-primary/20 shrink-0 transition-all active:scale-95 flex items-center gap-2"
              >
                Apply: {potency}
              </button>
            </div>
            
            <div className="space-y-12 relative z-10">
              {/* Main Guide Slider */}
              <div className="px-4">
                <div className="relative h-2.5 bg-surface-container-low rounded-full mb-10 max-w-2xl mx-auto">
                  <motion.div 
                    className="absolute left-0 top-0 h-full bg-primary rounded-full"
                    animate={{ 
                      width: potency === '6' ? '0%' : potency === '30' ? '33.33%' : potency === '200' ? '66.66%' : potency === '10M' ? '100%' : '0%' 
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                  <div className="absolute inset-0 flex justify-between items-center -mx-[10px]">
                    {['6', '30', '200', '10M'].map((p) => (
                      <div 
                        key={p} 
                        onClick={() => setPotency(p)}
                        className={`w-7 h-7 rounded-full cursor-pointer transition-all z-10 border-[6px] border-white flex items-center justify-center ${
                          potency === p ? 'bg-primary scale-125 shadow-lg shadow-primary/30' : 'bg-outline-variant hover:bg-outline hover:scale-110'
                        }`} 
                      />
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-outline max-w-2xl mx-auto px-2">
                  <div className="text-center cursor-pointer -ml-4 w-12" onClick={() => setPotency('6')}>
                    <p className={`mb-1 transition-colors ${potency === '6' ? 'text-primary' : 'text-on-surface'}`}>6</p>
                    <p className="opacity-50">Physical</p>
                  </div>
                  <div className="text-center cursor-pointer w-16" onClick={() => setPotency('30')}>
                    <p className={`mb-1 transition-colors ${potency === '30' ? 'text-primary' : 'text-on-surface'}`}>30</p>
                    <p className="opacity-50">Functional</p>
                  </div>
                  <div className="text-center cursor-pointer w-16" onClick={() => setPotency('200')}>
                    <p className={`mb-1 transition-colors ${potency === '200' ? 'text-primary' : 'text-on-surface'}`}>200</p>
                    <p className="opacity-50">Emotional</p>
                  </div>
                  <div className="text-center cursor-pointer -mr-4 w-12" onClick={() => setPotency('10M')}>
                    <p className={`mb-1 transition-colors ${potency === '10M' ? 'text-primary' : 'text-on-surface'}`}>10M</p>
                    <p className="opacity-50">Spiritual</p>
                  </div>
                </div>
              </div>

              {/* Extended Potency Selection */}
              <div className="pt-8 border-t border-surface-container-low">
                <div className="flex items-center justify-between mb-6">
                  <p className="text-[10px] font-black text-outline uppercase tracking-widest">Extended Potency Selection (Q, LM, X, C)</p>
                  <div className="h-px flex-1 bg-surface-container-low mx-4 hidden sm:block" />
                </div>
                
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-9 gap-2">
                  {[
                    'Q', 
                    '0/1', '0/2', '0/3', '0/4', '0/5', '0/6', '0/7', '0/8', '0/9', '0/10', 
                    '0/11', '0/12', '0/13', '0/14', '0/15', '0/16', '0/17', '0/18', '0/19', '0/20',
                    '1x', '2x', '3x', '3', '1M', 'CM'
                  ].map((p) => (
                    <button
                      key={p}
                      id={`potency-${p.replace('/', '-')}`}
                      onClick={() => setPotency(p)}
                      className={`h-10 flex items-center justify-center rounded-xl text-[11px] font-black transition-all border ${
                        potency === p 
                          ? 'bg-primary text-white border-primary shadow-md scale-105 z-10' 
                          : 'bg-slate-50 text-on-surface-variant border-surface-container-low hover:border-primary/30 hover:bg-primary-container/10'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



