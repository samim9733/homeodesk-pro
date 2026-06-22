import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Printer, Save, FileText, Plus, ChevronRight, ChevronLeft, Eye, Clock, Microscope, Star, Trophy, Zap, Trash2, CheckCircle } from 'lucide-react';
import { Patient, AnalysisItem } from './types';

interface PrescriptionCanvasProps {
  patient: Patient;
  onClose: () => void;
  initialAnalysis?: AnalysisItem[];
  initialResults?: { name: string; score: number; count: number }[];
  quickRemedy?: string;
}

export function PrescriptionCanvas({ patient, onClose, initialAnalysis, initialResults, quickRemedy }: PrescriptionCanvasProps) {
  // Auto-fill top remedy from analysis results
  const topRemedy = useMemo(() => {
    if (quickRemedy) return quickRemedy;
    if (initialResults && initialResults.length > 0) return initialResults[0].name;
    return '';
  }, [quickRemedy, initialResults]);

  const [remedy, setRemedy] = useState(topRemedy);
  const [potency, setPotency] = useState('30C');
  const [dosage, setDosage] = useState('BD × 7 days');
  const [instructions, setInstructions] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  // Quick-fill remedy from results
  const handleSelectRemedy = (name: string) => {
    setRemedy(name);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 modal-overlay print:bg-white print:p-0 print:backdrop-blur-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white modal-container w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="modal-header-dark flex justify-between items-center print:bg-white print:text-slate-900 print:border-b print:border-slate-200">
          <div>
            <h3 className="text-xl font-black uppercase tracking-widest">Prescription</h3>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">
              {patient.name} • {patient.id}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-all print:hidden">
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {/* Patient Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-slate-50/80 rounded-2xl p-4">
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Name</p>
              <p className="text-sm font-black text-slate-900 mt-1">{patient.name}</p>
            </div>
            <div className="bg-slate-50/80 rounded-2xl p-4">
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Age / Gender</p>
              <p className="text-sm font-black text-slate-900 mt-1">{patient.age} / {patient.gender}</p>
            </div>
            <div className="bg-slate-50/80 rounded-2xl p-4">
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Date</p>
              <p className="text-sm font-black text-slate-900 mt-1">{new Date().toLocaleDateString()}</p>
            </div>
            <div className="bg-slate-50/80 rounded-2xl p-4">
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Phone</p>
              <p className="text-sm font-black text-slate-900 mt-1">{patient.phone || 'N/A'}</p>
            </div>
          </div>

          {/* Chief Symptoms */}
          {patient.chiefSymptoms.length > 0 && (
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Chief Symptoms</h4>
              <div className="space-y-1">
                {patient.chiefSymptoms.map((cs, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                    <span className="text-slate-400 font-bold">{i + 1}.</span>
                    <span className="font-bold">{cs.symptom}</span>
                    {cs.severity && (
                      <span className="text-[9px] font-bold bg-slate-100 px-1.5 py-0.5 rounded">{cs.severity}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Rx Form */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden">
            <div className="px-5 py-4 bg-emerald-50/80 border-b border-emerald-100">
              <div className="flex items-center gap-2">
                <FileText size={16} className="text-emerald-600" />
                <h4 className="text-xs font-black uppercase tracking-widest text-emerald-800">Prescription</h4>
              </div>
            </div>
            <div className="p-4 space-y-3">
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Remedy</label>
                <input
                  type="text"
                  value={remedy}
                  onChange={(e) => setRemedy(e.target.value)}
                  className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  placeholder="Enter remedy name..."
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Potency</label>
                  <select
                    value={potency}
                    onChange={(e) => setPotency(e.target.value)}
                    className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  >
                    {['6C', '12C', '30C', '200C', '1M', '10M', 'LM1', 'LM2', 'LM3', 'Q (LM)', '0/1', '0/2', '0/3'].map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Dosage</label>
                  <input
                    type="text"
                    value={dosage}
                    onChange={(e) => setDosage(e.target.value)}
                    className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Instructions</label>
                <textarea
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  rows={3}
                  className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none"
                  placeholder="Special instructions..."
                />
              </div>
            </div>
          </div>

          {/* Repertorization Results - Click to select */}
          {initialResults && initialResults.length > 0 && (
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2 flex items-center gap-2">
                <Zap size={14} className="text-emerald-500" />
                Suggested Remedies (click to select)
              </h4>
              <div className="space-y-2">
                {initialResults.slice(0, 5).map((res, i) => {
                  const isSelected = remedy === res.name;
                  const medalColors = ['bg-amber-500', 'bg-slate-500', 'bg-orange-600'];
                  return (
                    <motion.button
                      key={res.name}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleSelectRemedy(res.name)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                        isSelected
                          ? 'bg-emerald-50 border-emerald-300 shadow-sm shadow-emerald-500/10'
                          : 'bg-slate-50 border-slate-100 hover:bg-slate-100'
                      }`}
                    >
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black text-white flex-shrink-0 ${
                        i < 3 ? medalColors[i] : 'bg-slate-900'
                      }`}>
                        {i + 1}
                      </span>
                      <span className={`text-xs font-bold flex-1 ${isSelected ? 'text-emerald-800' : 'text-slate-900'}`}>{res.name}</span>
                      <span className="text-xs font-black text-slate-500">{res.score}pts</span>
                      {isSelected && <CheckCircle size={16} className="text-emerald-500 flex-shrink-0" />}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 md:p-6 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-center gap-3 print:hidden">
          <div className="flex gap-3">
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={() => window.print()}
              className="btn-primary flex items-center gap-2"
            >
              <Printer size={14} /> Print
            </motion.button>
            <motion.button whileHover={{ scale: 1.02, backgroundColor: '#10b981' }} whileTap={{ scale: 0.98 }}
              onClick={handleSave}
              className="btn-emerald flex items-center gap-2"
            >
              <Save size={14} /> {saved ? 'Saved!' : 'Save'}
            </motion.button>
          </div>
          <button onClick={onClose} className="btn-ghost">
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
}

interface PatientDetailsCanvasProps {
  patient: Patient;
  onClose: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  onSave?: (updatedPatient: Patient) => void;
}

export function PatientDetailsCanvas({ patient, onClose, onNext, onPrevious, onSave }: PatientDetailsCanvasProps) {
  const [activeSection, setActiveSection] = useState<'details' | 'symptoms' | 'generals' | 'prescriptions' | 'notes' | 'analysis'>('details');
  const [expandedAnalysis, setExpandedAnalysis] = useState<string | null>(null);

  const sections = [
    { id: 'details' as const, label: 'Details' },
    { id: 'symptoms' as const, label: 'Symptoms' },
    { id: 'generals' as const, label: 'Generals' },
    { id: 'analysis' as const, label: 'Analysis', badge: patient.savedAnalysis?.length || 0 },
    { id: 'prescriptions' as const, label: 'Rx History' },
    { id: 'notes' as const, label: 'Notes' },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 modal-overlay print:bg-white print:p-0 print:backdrop-blur-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white modal-container w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="modal-header-dark flex justify-between items-center">
          <div>
            <h3 className="text-xl font-black uppercase tracking-widest">Patient Details</h3>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">
              {patient.name} • {patient.id}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {onPrevious && (
              <button onClick={onPrevious} className="p-2 hover:bg-white/10 rounded-xl transition-all">
                <ChevronLeft size={20} />
              </button>
            )}
            {onNext && (
              <button onClick={onNext} className="p-2 hover:bg-white/10 rounded-xl transition-all">
                <ChevronRight size={20} />
              </button>
            )}
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-all">
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-100 px-4 overflow-x-auto">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`px-4 py-3 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-all border-b-2 flex items-center gap-1.5 ${
                activeSection === s.id
                  ? 'border-slate-900 text-slate-900'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              {s.label}
              {s.badge ? (
                <span className={`text-[8px] font-black px-1.5 py-0.5 rounded-full ${
                  activeSection === s.id ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
                }`}>{s.badge}</span>
              ) : null}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          {activeSection === 'details' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: 'Name', value: patient.name },
                { label: 'Age', value: String(patient.age) },
                { label: 'Gender', value: patient.gender },
                { label: 'Phone', value: patient.phone || 'N/A' },
                { label: 'Date', value: patient.date },
                { label: 'Status', value: patient.status || 'Active' },
                { label: 'Last Visit', value: patient.lastVisit || 'N/A' },
                { label: 'Address', value: patient.address || 'N/A' },
              ].map((item) => (
                <div key={item.label} className="bg-slate-50 rounded-xl p-4">
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{item.label}</p>
                  <p className="text-sm font-black text-slate-900 mt-1">{item.value}</p>
                </div>
              ))}
            </div>
          )}

          {activeSection === 'symptoms' && (
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-500">Chief Symptoms</h4>
              {patient.chiefSymptoms.length === 0 ? (
                <p className="text-sm text-slate-400 text-center py-8">No chief symptoms recorded</p>
              ) : (
                patient.chiefSymptoms.map((cs, i) => (
                  <div key={cs.id || i} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-black text-slate-900">{cs.symptom}</p>
                        <div className="flex gap-2 mt-2">
                          {cs.duration && <span className="text-[9px] font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded">{cs.duration}</span>}
                          {cs.severity && <span className="text-[9px] font-bold bg-rose-50 text-rose-600 px-2 py-0.5 rounded">{cs.severity}</span>}
                          {cs.modality && <span className="text-[9px] font-bold bg-amber-50 text-amber-600 px-2 py-0.5 rounded">{cs.modality}</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeSection === 'generals' && (
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-500">Physical Generals</h4>
              {patient.physicalGenerals.length === 0 ? (
                <p className="text-sm text-slate-400 text-center py-8">No physical generals recorded</p>
              ) : (
                <div className="space-y-2">
                  {patient.physicalGenerals.map((pg, i) => (
                    <div key={pg.id || i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                      <span className="text-xs font-bold text-slate-600">{pg.attribute}</span>
                      <span className="text-xs font-black text-slate-900">{pg.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeSection === 'analysis' && (
            <div className="space-y-4">
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                <Microscope size={14} className="text-emerald-500" />
                Saved Case Analysis History
              </h4>
              {(!patient.savedAnalysis || patient.savedAnalysis.length === 0) ? (
                <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-100">
                  <Microscope size={40} className="mx-auto mb-3 text-slate-200" />
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">No analysis saved yet</p>
                  <p className="text-[10px] text-slate-300 mt-1">Save analysis from the Case Analysis tab</p>
                </div>
              ) : (
                patient.savedAnalysis.map((sa) => (
                  <div key={sa.id} className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
                    {/* Analysis Header */}
                    <div 
                      className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition"
                      onClick={() => setExpandedAnalysis(expandedAnalysis === sa.id ? null : sa.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center">
                          <Trophy size={16} className="text-emerald-600" />
                        </div>
                        <div>
                          <p className="text-xs font-black text-slate-900">Case Analysis</p>
                          <p className="text-[9px] font-bold text-slate-400">{sa.date} • {sa.rubrics.length} rubrics</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {/* Top remedy badge */}
                        {sa.topRemedies.length > 0 && (
                          <span className="text-[9px] font-black bg-amber-100 text-amber-700 px-2 py-1 rounded-lg flex items-center gap-1">
                            <Star size={8} className="text-amber-500" />
                            {sa.topRemedies[0].name} ({sa.topRemedies[0].percentage}%)
                          </span>
                        )}
                        <ChevronRight size={16} className={`text-slate-400 transition-transform ${expandedAnalysis === sa.id ? 'rotate-90' : ''}`} />
                      </div>
                    </div>

                    {/* Expanded Content */}
                    {expandedAnalysis === sa.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="px-4 pb-4 space-y-3"
                      >
                        {/* Top Remedies */}
                        {sa.topRemedies.length > 0 && (
                          <div>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Top Remedies</p>
                            <div className="flex flex-wrap gap-1.5">
                              {sa.topRemedies.slice(0, 5).map((r, i) => {
                                const medalBg = i === 0 ? 'bg-amber-100 text-amber-700 ring-1 ring-amber-300' : i === 1 ? 'bg-slate-200 text-slate-700 ring-1 ring-slate-300' : i === 2 ? 'bg-orange-100 text-orange-700 ring-1 ring-orange-300' : 'bg-emerald-50 text-emerald-600';
                                return (
                                  <span key={r.name} className={`text-[9px] font-bold px-2 py-1 rounded-lg flex items-center gap-1 ${medalBg}`}>
                                    {i < 3 && <Star size={7} />}
                                    {r.name}
                                    <span className="opacity-60">({r.percentage}%)</span>
                                  </span>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* Rubrics List */}
                        <div>
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Selected Rubrics ({sa.rubrics.length})</p>
                          <div className="space-y-1">
                            {sa.rubrics.map((rubric, i) => (
                              <div key={i} className="flex items-center gap-2 text-[10px] bg-white rounded-lg px-3 py-2 border border-slate-100">
                                <span className="font-bold text-slate-400">{i + 1}.</span>
                                <span className="font-bold text-slate-700 flex-1 truncate">{rubric.text}</span>
                                <span className="text-[8px] font-bold text-slate-400">{rubric.chapter}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {activeSection === 'prescriptions' && (
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-500">Prescription History</h4>
              {(!patient.prescriptions || patient.prescriptions.length === 0) ? (
                <p className="text-sm text-slate-400 text-center py-8">No prescriptions recorded</p>
              ) : (
                patient.prescriptions.map((rx) => (
                  <div key={rx.id} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-black text-slate-900">{rx.remedy} {rx.potency}</p>
                      <span className="text-[9px] font-bold text-slate-400">{rx.date}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">{rx.dosage} - {rx.instructions}</p>
                  </div>
                ))
              )}
            </div>
          )}

          {activeSection === 'notes' && (
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">Clinical Notes</h4>
              <div className="bg-slate-50 rounded-xl p-6 min-h-[200px]">
                <p className="text-sm text-slate-700 whitespace-pre-wrap">{patient.notes || 'No notes recorded for this patient.'}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 md:p-6 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3 print:hidden">
          <button onClick={onClose} className="btn-ghost">
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
}
