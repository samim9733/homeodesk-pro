import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Bell, Calendar, Clock, Plus, X, Trash2, Eye, UserPlus, Filter, Save, CheckCircle,
  ArrowRightLeft, ChevronRight, AlertCircle
} from 'lucide-react';
import { Patient, AnalysisItem, Reminder } from './types';

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
          <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Reminders</h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{reminders.filter(r => !r.completed).length} Pending</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          onClick={() => setShowAdd(true)}
          className="px-4 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg flex items-center gap-2"
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
            <select value={selectedPatient} onChange={e => setSelectedPatient(e.target.value)} className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20">
              <option value="">Select Patient</option>
              {patients.map(p => <option key={p.id} value={p.id}>{p.name} ({p.id})</option>)}
            </select>
            <select value={reminderType} onChange={e => setReminderType(e.target.value as Reminder['type'])} className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20">
              <option>Follow-up</option><option>Appointment</option><option>Medication</option><option>Lab</option>
            </select>
            <input type="date" value={reminderDate} onChange={e => setReminderDate(e.target.value)} className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20" />
            <input type="time" value={reminderTime} onChange={e => setReminderTime(e.target.value)} className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20" />
          </div>
          <textarea value={reminderMessage} onChange={e => setReminderMessage(e.target.value)} rows={2} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 resize-none" placeholder="Reminder message..." />
          <div className="flex gap-3 justify-end">
            <button onClick={() => setShowAdd(false)} className="px-5 py-2.5 bg-white text-slate-500 border border-slate-200 rounded-xl text-xs font-black uppercase tracking-widest">Cancel</button>
            <button onClick={handleAdd} className="px-5 py-2.5 bg-emerald-500 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg">Add</button>
          </div>
        </div>
      )}

      {/* Reminders List */}
      <div className="space-y-3">
        {reminders.map(reminder => (
          <div key={reminder.id} className={`bg-white rounded-2xl border shadow-sm p-4 transition ${reminder.completed ? 'border-slate-100 opacity-60' : 'border-slate-200'}`}>
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
}

export function AnalysisTab({ patients, analysis, preSelectedPatientId, onClearAnalysis, onRemoveRubric, onTransferToRx, onCompare, onUpdatePatient, onAddPatient, setActiveTab }: AnalysisTabProps) {
  const [selectedPatient, setSelectedPatient] = useState(preSelectedPatientId);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Case Analysis</h2>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{analysis.length} rubrics selected</p>
      </div>

      {/* Patient Selection */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3">Assign to Patient</h3>
        <select
          value={selectedPatient || ''}
          onChange={(e) => setSelectedPatient(e.target.value)}
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
        >
          <option value="">Select patient...</option>
          {patients.map(p => (
            <option key={p.id} value={p.id}>{p.name} ({p.id})</option>
          ))}
        </select>
        {selectedPatient && (
          <div className="flex gap-2 mt-3">
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={() => {
                const patient = patients.find(p => p.id === selectedPatient);
                if (patient) onTransferToRx(patient);
              }}
              className="px-4 py-2 bg-emerald-500 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg"
            >
              Transfer to Rx
            </motion.button>
          </div>
        )}
      </div>

      {/* Selected Rubrics */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
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
            <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-900 truncate">{item.text}</p>
                <p className="text-[9px] font-bold text-slate-400">{item.chapter}</p>
                {item.remedies && item.remedies.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {item.remedies.slice(0, 5).map((r, i) => (
                      <span key={i} className="text-[8px] font-bold bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded">{r}</span>
                    ))}
                    {item.remedies.length > 5 && (
                      <span className="text-[8px] font-bold text-slate-400">+{item.remedies.length - 5} more</span>
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
