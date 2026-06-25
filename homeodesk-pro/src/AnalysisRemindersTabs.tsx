import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import {
  Bell, Calendar, Clock, Plus, X, Trash2, Eye, UserPlus, Filter, Save, CheckCircle,
  ArrowRightLeft, ChevronRight, AlertCircle, Star, Trophy, Award, Zap, Pill, Send, Stethoscope
} from 'lucide-react';
import { Patient, AnalysisItem, Reminder, SavedAnalysis } from './types';

// ==================== REMINDERS TAB ====================
interface RemindersTabProps {
  reminders: Reminder[];
  setReminders: React.Dispatch<React.SetStateAction<Reminder[]>>;
  patients: Patient[];
  preSelectedPatientId: string | null;
  setPreSelectedPatientId?: (id: string | null) => void;
}

export function RemindersTab({ reminders, setReminders, patients, preSelectedPatientId, setPreSelectedPatientId }: RemindersTabProps) {
  const [showAdd, setShowAdd] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState('');
  const [reminderDate, setReminderDate] = useState(new Date().toISOString().split('T')[0]);
  const [reminderTime, setReminderTime] = useState('10:00');
  const [reminderMessage, setReminderMessage] = useState('');
  const [reminderType, setReminderType] = useState<Reminder['type']>('Follow-up');

  const handleAdd = () => {
    if (!reminderMessage.trim()) return;
    const patient = patients.find(p => p.id === selectedPatient);
    const newReminder: Reminder = {
      id: `rem-${Date.now()}`,
      patientId: selectedPatient || 'unknown',
      patientName: patient?.name || 'Unknown Patient',
      date: reminderDate,
      time: reminderTime,
      message: reminderMessage,
      type: reminderType,
      completed: false,
    };
    setReminders(prev => [...prev, newReminder]);
    setShowAdd(false);
    setReminderMessage('');
  };

  const toggleComplete = (id: string) => {
    setReminders(prev => prev.map(r => r.id === id ? { ...r, completed: !r.completed } : r));
  };

  const removeReminder = (id: string) => {
    setReminders(prev => prev.filter(r => r.id !== id));
  };

  const typeColors: Record<string, string> = {
    'Follow-up': 'bg-emerald-50 text-emerald-600',
    'Appointment': 'bg-blue-50 text-blue-600',
    'Medication': 'bg-amber-50 text-amber-600',
    'Lab': 'bg-rose-50 text-rose-600',
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="section-title">Reminders</h2>
          <p className="section-subtitle">{reminders.filter(r => !r.completed).length} Pending</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          onClick={() => setShowAdd(true)}
          className="btn-primary"
        >
          <Plus size={14} /> New Reminder
        </motion.button>
      </div>

      {/* Add Reminder */}
      {showAdd && (
        <div className="bg-white rounded-2xl border border-emerald-200 shadow-sm p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black text-emerald-700 uppercase tracking-widest">New Reminder</h3>
            <button onClick={() => setShowAdd(false)} className="text-slate-400 hover:text-slate-600"><X size={18} /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <select value={selectedPatient} onChange={e => setSelectedPatient(e.target.value)} className="modern-input">
              <option value="">Select Patient</option>
              {patients.map(p => <option key={p.id} value={p.id}>{p.name} ({p.id})</option>)}
            </select>
            <select value={reminderType} onChange={e => setReminderType(e.target.value as Reminder['type'])} className="modern-input">
              <option>Follow-up</option><option>Appointment</option><option>Medication</option><option>Lab</option>
            </select>
            <input type="date" value={reminderDate} onChange={e => setReminderDate(e.target.value)} className="modern-input" />
            <input type="time" value={reminderTime} onChange={e => setReminderTime(e.target.value)} className="modern-input" />
          </div>
          <textarea value={reminderMessage} onChange={e => setReminderMessage(e.target.value)} rows={2} className="modern-input resize-none w-full" placeholder="Reminder message..." />
          <div className="flex gap-3 justify-end">
            <button onClick={() => setShowAdd(false)} className="btn-ghost">Cancel</button>
            <button onClick={handleAdd} className="btn-emerald">Add</button>
          </div>
        </div>
      )}

      {/* Reminders List */}
      <div className="space-y-3">
        {reminders.map(reminder => (
          <div key={reminder.id} className={`modern-card p-4 ${reminder.completed ? '!opacity-60 border-slate-100' : 'border-slate-200'}`}>
            <div className="flex items-start gap-4">
              <button onClick={() => toggleComplete(reminder.id)} className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition ${reminder.completed ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300 hover:border-emerald-500'}`}>
                {reminder.completed && <CheckCircle size={12} className="text-white" />}
              </button>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${typeColors[reminder.type] || 'bg-slate-50 text-slate-500'}`}>{reminder.type}</span>
                  <span className="text-[9px] font-bold text-slate-400">{reminder.patientName}</span>
                </div>
                <p className="text-xs font-bold text-slate-800">{reminder.message}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1"><Calendar size={10} /> {reminder.date}</span>
                  {reminder.time && <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1"><Clock size={10} /> {reminder.time}</span>}
                </div>
              </div>
              <button onClick={() => removeReminder(reminder.id)} className="text-slate-300 hover:text-rose-500 transition"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
        {reminders.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
            <Bell size={40} className="mx-auto mb-3 text-slate-200" />
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">No reminders yet</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ==================== ANALYSIS TAB ====================
interface AnalysisTabProps {
  patients: Patient[];
  analysis: AnalysisItem[];
  preSelectedPatientId: string | null;
  onClearAnalysis: () => void;
  onRemoveRubric: (idx: number) => void;
  onTransferToRx: (patient: Patient) => void;
  onCompare: (remedyA: string, remedyB: string) => void;
  onUpdatePatient: (updatedPatient: Patient) => void;
  onAddPatient: (p: Omit<Patient, 'id' | 'date'>) => void;
  setActiveTab: (tab: string) => void;
  onOpenSymptomCanvas?: (patient: Patient) => void;
}

export function AnalysisTab({ patients, analysis, preSelectedPatientId, onClearAnalysis, onRemoveRubric, onTransferToRx, onCompare, onUpdatePatient, onAddPatient, setActiveTab, onOpenSymptomCanvas }: AnalysisTabProps) {
  const [selectedPatient, setSelectedPatient] = useState(preSelectedPatientId);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Compute top remedies across all selected rubrics (grade-weighted scoring)
  const remedyScores = useMemo(() => {
    const scores = new Map<string, number>();
    for (const item of analysis) {
      const seen = new Set<string>();
      for (const remedy of (item.remedies || [])) {
        if (seen.has(remedy.name)) continue;
        seen.add(remedy.name);
        const points = remedy.grade === 1 ? 3 : remedy.grade === 2 ? 2 : 1;
        scores.set(remedy.name, (scores.get(remedy.name) || 0) + points);
      }
    }
    return Array.from(scores.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [analysis]);

  // Get top 3 remedy names for highlighting
  const top3Remedies = useMemo(() => remedyScores.slice(0, 3).map(r => r.name), [remedyScores]);

  // Get top 5 remedies for focused save
  const top5Remedies = useMemo(() => remedyScores.slice(0, 5).map(r => ({
    name: r.name,
    count: r.count,
    percentage: Math.round((r.count / analysis.length) * 100),
  })), [remedyScores, analysis.length]);

  // Save analysis to patient
  const handleSaveAnalysis = () => {
    if (!selectedPatient || analysis.length === 0) return;
    const patient = patients.find(p => p.id === selectedPatient);
    if (!patient) return;

    const topRemediesData = top5Remedies;

    const newSavedAnalysis: SavedAnalysis = {
      id: `sa-${Date.now()}`,
      date: new Date().toLocaleDateString(),
      rubrics: [...analysis],
      topRemedies: topRemediesData,
    };

    const updatedPatient: Patient = {
      ...patient,
      savedAnalysis: [...(patient.savedAnalysis || []), newSavedAnalysis],
      lastVisit: new Date().toLocaleDateString(),
    };

    onUpdatePatient(updatedPatient);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  // Add top remedy to Rx
  const handleAddToRx = () => {
    if (!selectedPatient || remedyScores.length === 0) return;
    const patient = patients.find(p => p.id === selectedPatient);
    if (patient) onTransferToRx(patient);
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="section-title">Case Analysis</h2>
        <p className="section-subtitle">{analysis.length} rubrics selected</p>
      </div>

      {/* Patient Selection & Actions */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3">Assign to Patient</h3>
        <select
          value={selectedPatient || ''}
          onChange={(e) => setSelectedPatient(e.target.value)}
          className="modern-input w-full"
        >
          <option value="">Select patient...</option>
          {patients.map(p => (
            <option key={p.id} value={p.id}>{p.name} ({p.id})</option>
          ))}
        </select>
        {selectedPatient && (
          <div className="flex flex-wrap gap-2 mt-3">
            {/* Save Analysis Button */}
            <motion.button 
              whileHover={{ scale: 1.02 }} 
              whileTap={{ scale: 0.98 }}
              onClick={handleSaveAnalysis}
              disabled={analysis.length === 0}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                saveSuccess 
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' 
                  : analysis.length === 0 
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    : 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
              }`}
            >
              {saveSuccess ? (
                <>
                  <CheckCircle size={14} /> Saved!
                </>
              ) : (
                <>
                  <Save size={14} /> Save Analysis
                </>
              )}
            </motion.button>

            {/* Add to Rx Button - auto adds top remedy */}
            <motion.button 
              whileHover={{ scale: 1.02 }} 
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToRx}
              disabled={remedyScores.length === 0}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                remedyScores.length === 0 
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40'
              }`}
            >
              <Send size={14} /> Add to Rx
            </motion.button>

            {/* Transfer to Rx Button (original) */}
            <motion.button 
              whileHover={{ scale: 1.02 }} 
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                const patient = patients.find(p => p.id === selectedPatient);
                if (patient) onTransferToRx(patient);
              }}
              disabled={analysis.length === 0}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                analysis.length === 0 
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  : 'bg-slate-900 text-white hover:bg-slate-800'
              }`}
            >
              <Pill size={14} /> Transfer to Rx
            </motion.button>

            {/* Symptom Button - Opens Symptom Canvas */}
            <motion.button 
              whileHover={{ scale: 1.02 }} 
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                const patient = patients.find(p => p.id === selectedPatient);
                if (patient && onOpenSymptomCanvas) onOpenSymptomCanvas(patient);
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100"
            >
              <Stethoscope size={14} /> Add Symptoms
            </motion.button>
          </div>
        )}
        {saveSuccess && (
          <motion.p 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] font-bold text-emerald-600 mt-2 flex items-center gap-1"
          >
            <CheckCircle size={12} /> Analysis saved to patient record successfully
          </motion.p>
        )}
      </div>

      {/* Top 3 Remedy Spotlight */}
      {top3Remedies.length > 0 && (
        <div
          className="rounded-2xl border border-emerald-500/30 shadow-lg shadow-emerald-500/10 overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #065f46 100%)' }}
        >
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy size={18} className="text-amber-400" />
              <h3 className="text-xs font-black text-white uppercase tracking-widest">Top Remedies</h3>
            </div>
            <span className="text-[9px] font-bold text-emerald-300 uppercase tracking-wider">Based on {analysis.length} rubrics</span>
          </div>
          <div className="px-4 pb-4 flex gap-3">
            {top3Remedies.map((remedy, i) => {
              const count = remedyScores[i].count;
              const percentage = Math.round((count / analysis.length) * 100);
              const medals = ['bg-amber-500/20 border-amber-400/50 text-amber-300', 'bg-slate-400/20 border-slate-300/50 text-slate-300', 'bg-orange-700/20 border-orange-600/50 text-orange-300'];
              const icons = [<Star key="s" size={12} className="text-amber-400" />, <Star key="s2" size={12} className="text-slate-400" />, <Star key="s3" size={12} className="text-orange-400" />];
              return (
                <motion.div
                  key={remedy}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`flex-1 rounded-xl border p-3 ${medals[i]}`}
                >
                  <div className="flex items-center gap-1.5 mb-2">
                    {icons[i]}
                    <span className="text-[9px] font-black uppercase tracking-widest">#{i + 1}</span>
                  </div>
                  <p className="text-sm font-black truncate mb-1.5">{remedy}</p>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[9px] font-bold opacity-70">{count}/{analysis.length} rubrics</span>
                    <span className="text-[9px] font-black">{percentage}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-black/20 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }}
                      className="h-full bg-current rounded-full"
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Remedy Analysis Table */}
      {remedyScores.length > 0 && (
        <div className="modern-card overflow-hidden">
          <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap size={16} className="text-emerald-400" />
              <h3 className="text-xs font-black uppercase tracking-widest">Remedy Ranking ({remedyScores.length})</h3>
            </div>
          </div>
          <div className="max-h-80 overflow-y-auto">
            <table className="modern-table w-full">
              <thead className="bg-slate-50 sticky top-0">
                <tr className="text-left">
                  <th className="px-4 py-2 text-[9px] font-black text-slate-400 uppercase tracking-widest w-10">#</th>
                  <th className="px-4 py-2 text-[9px] font-black text-slate-400 uppercase tracking-widest">Remedy</th>
                  <th className="px-4 py-2 text-[9px] font-black text-slate-400 uppercase tracking-widest w-20 text-center">Coverage</th>
                  <th className="px-4 py-2 text-[9px] font-black text-slate-400 uppercase tracking-widest w-24 text-center">Rubrics</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {remedyScores.slice(0, 20).map((remedy, i) => {
                  const isTop3 = i < 3;
                  const pct = Math.round((remedy.count / analysis.length) * 100);
                  const barColors = ['bg-amber-500', 'bg-slate-500', 'bg-orange-600'];
                  return (
                    <tr key={remedy.name} className={`transition ${isTop3 ? 'bg-emerald-50/50 hover:bg-emerald-50' : 'hover:bg-slate-50'}`}>
                      <td className="px-4 py-2.5">
                        {isTop3 ? (
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black text-white ${i === 0 ? 'bg-amber-500' : i === 1 ? 'bg-slate-500' : 'bg-orange-600'}`}>{i + 1}</span>
                        ) : (
                          <span className="text-[10px] font-bold text-slate-400">{i + 1}</span>
                        )}
                      </td>
                      <td className="px-4 py-2.5">
                        <p className={`text-xs font-black truncate ${isTop3 ? 'text-emerald-800' : 'text-slate-700'}`}>{remedy.name}</p>
                      </td>
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${isTop3 ? barColors[i] : 'bg-emerald-400'}`} style={{ width: `${Math.min(pct, 100)}%` }} />
                          </div>
                          <span className={`text-[9px] font-black ${isTop3 ? 'text-emerald-700' : 'text-slate-500'}`}>{pct}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isTop3 ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>{remedy.count}/{analysis.length}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Selected Rubrics */}
      <div className="modern-card overflow-hidden">
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter size={16} />
            <h3 className="text-xs font-black uppercase tracking-widest">Analysis Rubrics ({analysis.length})</h3>
          </div>
          {analysis.length > 0 && (
            <button onClick={onClearAnalysis} className="text-[10px] font-bold text-slate-400 hover:text-white transition">Clear All</button>
          )}
        </div>
        <div className="p-3 space-y-1.5 max-h-96 overflow-y-auto custom-scrollbar">
          {analysis.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl hover:bg-slate-100 transition">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-900 truncate">{item.text}</p>
                <p className="text-[9px] font-bold text-slate-400">{item.chapter}</p>
                {item.remedies && item.remedies.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {item.remedies.slice(0, 8).map((r, i) => {
                      const rank = top3Remedies.indexOf(r.name);
                      const isTop3 = rank >= 0;
                      return (
                        <span
                          key={i}
                          className={`text-[8px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5 ${
                            isTop3
                              ? rank === 0
                                ? 'bg-amber-100 text-amber-700 ring-1 ring-amber-300'
                                : rank === 1
                                ? 'bg-slate-200 text-slate-700 ring-1 ring-slate-300'
                                : 'bg-orange-100 text-orange-700 ring-1 ring-orange-300'
                              : 'bg-emerald-50 text-emerald-600'
                          }`}
                        >
                          {isTop3 && <Star size={7} className="" />}
                          {r.name}
                        </span>
                      );
                    })}
                    {item.remedies.length > 8 && (
                      <span className="text-[8px] font-bold text-slate-400">+{item.remedies.length - 8} more</span>
                    )}
                  </div>
                )}
              </div>
              <button onClick={() => onRemoveRubric(idx)} className="text-slate-400 hover:text-rose-500 transition ml-2"><X size={14} /></button>
            </div>
          ))}
          {analysis.length === 0 && (
            <div className="text-center py-12">
              <AlertCircle size={40} className="mx-auto mb-3 text-slate-200" />
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">No rubrics selected</p>
              <p className="text-[10px] text-slate-300 mt-1">Go to Repertory tab to add rubrics</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
