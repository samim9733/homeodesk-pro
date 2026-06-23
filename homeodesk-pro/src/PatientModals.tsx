import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Printer, Save, FileText, Plus, ChevronRight, ChevronLeft, Eye, Clock, Microscope, Star, Trophy, Zap, Trash2, CheckCircle, Stethoscope, Brain, Thermometer, ChevronDown } from 'lucide-react';
import { Patient, AnalysisItem, ChiefSymptom, PhysicalGeneral } from './types';

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
  const [potency, setPotency] = useState('200C');
  const [dosage, setDosage] = useState('4 Drops');
  const [frequency, setFrequency] = useState('Twice daily (Empty stomach)');
  const [duration, setDuration] = useState('7 Days');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [regimen, setRegimen] = useState('');
  const [followUp, setFollowUp] = useState('');
  const [patientNote, setPatientNote] = useState('');
  const [saved, setSaved] = useState(false);

  // Calculate miasmatic analysis from analysis items
  const miasmaticAnalysis = useMemo(() => {
    const miasms = { Psora: 0, Sycosis: 0, Syphilis: 0 };
    if (!initialAnalysis || initialAnalysis.length === 0) {
      return { Psora: 52, Sycosis: 21, Syphilis: 27 };
    }
    const total = initialAnalysis.length;
    initialAnalysis.forEach(item => {
      const text = item.text.toLowerCase();
      if (text.includes('anxiety') || text.includes('fear') || text.includes('worry') ||
          text.includes('sad') || text.includes('grief') || text.includes('nervous') ||
          text.includes('restless') || text.includes('itching') || text.includes('skin') ||
          text.includes('desire') || text.includes('aversion') || text.includes('thirst')) {
        miasms.Psora++;
      }
      if (text.includes('swelling') || text.includes('thick') || text.includes('sticky') ||
          text.includes('discharge') || text.includes('growth') || text.includes('tumor') ||
          text.includes('poly') || text.includes('excess') || text.includes('warts') ||
          text.includes('cyst') || text.includes('mucus')) {
        miasms.Sycosis++;
      }
      if (text.includes('pain') || text.includes('destruct') || text.includes('ulcer') ||
          text.includes('bleeding') || text.includes('inflammation') || text.includes('burning') ||
          text.includes('cracks') || text.includes('fissures') || text.includes('violent') ||
          text.includes('sudden') || text.includes('intense')) {
        miasms.Syphilis++;
      }
    });
    if (total === 0) return { Psora: 52, Sycosis: 21, Syphilis: 27 };
    const sum = miasms.Psora + miasms.Sycosis + miasms.Syphilis;
    if (sum === 0) return { Psora: 52, Sycosis: 21, Syphilis: 27 };
    return {
      Psora: Math.round((miasms.Psora / sum) * 100),
      Sycosis: Math.round((miasms.Sycosis / sum) * 100),
      Syphilis: 100 - Math.round((miasms.Psora / sum) * 100) - Math.round((miasms.Sycosis / sum) * 100),
    };
  }, [initialAnalysis]);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  // Quick-fill remedy from results
  const handleSelectRemedy = (name: string) => {
    setRemedy(name);
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 modal-overlay print:bg-white print:p-0 print:backdrop-blur-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white modal-container w-full max-w-4xl overflow-hidden flex flex-col max-h-[95vh]"
      >
        {/* Top Action Bar */}
        <div className="flex items-center gap-2 px-3 sm:px-5 py-3 bg-white border-b border-slate-200 print:hidden flex-wrap">
          <button onClick={onClose} className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 transition">
            <ChevronLeft size={14} /> Back to Patient
          </button>
          <button onClick={() => window.print()} className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 transition">
            <Printer size={14} /> Print Prescription
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 transition">
            <Save size={14} /> Save as JPG
          </button>
          <div className="flex-1" />
          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 rounded-lg text-xs font-bold text-white hover:bg-emerald-700 transition shadow-sm"
          >
            {saved ? <><CheckCircle size={14} /> Saved!</> : 'PRESCRIBE & FINALISE'}
          </motion.button>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition print:hidden">
            <X size={20} className="text-slate-500" />
          </button>
        </div>

        {/* Prescription Body */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-4 sm:p-6 space-y-5">

            {/* ===== DOCTOR / CLINIC HEADER ===== */}
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg sm:text-xl font-black text-emerald-900 tracking-wide">DR. SAMIM AHAMED</h2>
                <p className="text-xs text-slate-500 mt-0.5">Chief Physician</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-slate-800">Clinical Center</p>
                <p className="text-xs text-slate-500">Medical District</p>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-slate-300" />

            {/* ===== PATIENT INFO ===== */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 bg-slate-50 rounded-xl p-3 sm:p-4">
              <div>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Patient Name</p>
                <p className="text-xs sm:text-sm font-black text-slate-900 mt-0.5">{patient.name}</p>
              </div>
              <div>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Case ID</p>
                <p className="text-xs sm:text-sm font-black text-slate-900 mt-0.5">#{patient.id}</p>
              </div>
              <div>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Age / Gender</p>
                <p className="text-xs sm:text-sm font-black text-slate-900 mt-0.5">{patient.age} Years / {patient.gender}</p>
              </div>
              <div>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Date</p>
                <p className="text-xs sm:text-sm font-black text-slate-900 mt-0.5">{today}</p>
              </div>
            </div>

            {/* ===== CHIEF COMPLAINTS ===== */}
            {patient.chiefSymptoms.length > 0 && (
              <div>
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-700 mb-2 flex items-center gap-2">
                  <Stethoscope size={14} className="text-emerald-600" />
                  Chief Complaints
                </h4>
                <div className="space-y-1.5">
                  {patient.chiefSymptoms.map((cs, i) => (
                    <div key={cs.id || i} className="flex items-start gap-2 text-xs text-slate-700">
                      <span className="text-slate-400 font-bold mt-0.5">&#8226;</span>
                      <span className="font-semibold">
                        {cs.symptom}
                        {cs.duration && <span className="text-slate-400 ml-1">({cs.duration})</span>}
                      </span>
                      {cs.severity && (
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ml-auto flex-shrink-0 ${
                          cs.severity === 'Severe' ? 'bg-rose-50 text-rose-600' :
                          cs.severity === 'Moderate' ? 'bg-amber-50 text-amber-600' :
                          'bg-blue-50 text-blue-600'
                        }`}>{cs.severity}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ===== GENERAL COMPLAINTS ===== */}
            {patient.physicalGenerals.length > 0 && (
              <div>
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-700 mb-2 flex items-center gap-2">
                  <Thermometer size={14} className="text-blue-600" />
                  General Complaints
                </h4>
                <div className="space-y-1.5">
                  {patient.physicalGenerals.map((pg, i) => (
                    <div key={pg.id || i} className="flex items-start gap-2 text-xs text-slate-700">
                      <span className="text-slate-400 font-bold mt-0.5">&#8226;</span>
                      <span className="font-semibold">
                        {pg.attribute}: {pg.value}
                      </span>
                      {pg.category && (
                        <span className="text-[9px] font-bold bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded ml-auto flex-shrink-0">
                          {pg.category}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ===== MENTAL SYMPTOMS ===== */}
            {patient.mentalSymptoms && patient.mentalSymptoms.length > 0 && (
              <div>
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-700 mb-2 flex items-center gap-2">
                  <Brain size={14} className="text-purple-600" />
                  Mental Symptoms
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {patient.mentalSymptoms.map((ms, i) => (
                    <span key={i} className="flex items-center gap-1 text-[10px] sm:text-xs font-semibold bg-purple-50 text-purple-700 px-2.5 py-1 rounded-lg border border-purple-200">
                      <Brain size={10} />
                      {ms}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* ===== MIASMATIC ANALYSIS ===== */}
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-700 mb-3 flex items-center gap-2">
                <Microscope size={14} className="text-emerald-600" />
                Miasmatic Analysis
              </h4>
              <div className="space-y-2.5">
                {[
                  { name: 'Psora', value: miasmaticAnalysis.Psora, color: 'bg-emerald-500' },
                  { name: 'Sycosis', value: miasmaticAnalysis.Sycosis, color: 'bg-blue-500' },
                  { name: 'Syphilis', value: miasmaticAnalysis.Syphilis, color: 'bg-rose-500' },
                ].map((m) => (
                  <div key={m.name} className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-600 w-16 text-right">{m.name}</span>
                    <div className="flex-1 h-4 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${m.value}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className={`h-full ${m.color} rounded-full`}
                      />
                    </div>
                    <span className="text-xs font-black text-slate-700 w-10 text-right">{m.value}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ===== PATIENT NOTE ===== */}
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Patient Note</label>
              <textarea
                value={patientNote}
                onChange={(e) => setPatientNote(e.target.value)}
                rows={2}
                className="w-full mt-1 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs italic text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none"
                placeholder="Patient observations, modalities, general state..."
              />
            </div>

            {/* ===== Rx PRESCRIPTION TABLE ===== */}
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <div className="px-4 py-3 bg-emerald-50/80 border-b border-emerald-100">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-black text-emerald-800" style={{ fontFamily: 'serif' }}>Rx</span>
                  <span className="text-xs font-black uppercase tracking-widest text-emerald-700">Prescription</span>
                </div>
              </div>
              <div className="p-3 sm:p-4 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Remedy</label>
                    <input
                      type="text"
                      value={remedy}
                      onChange={(e) => setRemedy(e.target.value)}
                      className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                      placeholder="Enter remedy name..."
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Potency</label>
                    <select
                      value={potency}
                      onChange={(e) => setPotency(e.target.value)}
                      className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    >
                      {['6C', '12C', '30C', '200C', '1M', '10M', 'LM1', 'LM2', 'LM3', 'Q (LM)', '0/1', '0/2', '0/3'].map(p => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Dosage</label>
                    <input
                      type="text"
                      value={dosage}
                      onChange={(e) => setDosage(e.target.value)}
                      className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Frequency</label>
                    <input
                      type="text"
                      value={frequency}
                      onChange={(e) => setFrequency(e.target.value)}
                      className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Duration</label>
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>
                {remedy && potency && (
                  <div className="bg-slate-50 rounded-lg p-3 mt-2">
                    <p className="text-[9px] font-bold text-slate-400 uppercase">Prescribed Medicine</p>
                    <p className="text-sm font-black text-emerald-800 mt-0.5">{remedy} {potency}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">Liquid dilution</p>
                  </div>
                )}
              </div>
            </div>

            {/* ===== SUGGESTED REMEDIES ===== */}
            {initialResults && initialResults.length > 0 && (
              <div>
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2 flex items-center gap-2">
                  <Zap size={14} className="text-emerald-500" />
                  Suggested Remedies (click to select)
                </h4>
                <div className="space-y-1.5">
                  {initialResults.slice(0, 5).map((res, i) => {
                    const isSelected = remedy === res.name;
                    const medalColors = ['bg-amber-500', 'bg-slate-500', 'bg-orange-600'];
                    return (
                      <motion.button
                        key={res.name}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => handleSelectRemedy(res.name)}
                        className={`w-full flex items-center gap-3 p-2.5 rounded-lg border transition-all text-left ${
                          isSelected
                            ? 'bg-emerald-50 border-emerald-300 shadow-sm shadow-emerald-500/10'
                            : 'bg-slate-50 border-slate-100 hover:bg-slate-100'
                        }`}
                      >
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black text-white flex-shrink-0 ${
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

            {/* ===== SPECIAL INSTRUCTIONS ===== */}
            <div className="bg-emerald-50/60 border border-emerald-200/60 rounded-xl p-4">
              <h4 className="text-xs font-black uppercase tracking-widest text-emerald-800 mb-3 flex items-center gap-2">
                <span className="text-sm">&#9432;</span>
                Special Instructions
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Dietary Restrictions</p>
                  <textarea
                    value={dietaryRestrictions}
                    onChange={(e) => setDietaryRestrictions(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none"
                    placeholder="e.g. Avoid raw onion and garlic, No coffee..."
                  />
                </div>
                <div>
                  <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Regimen</p>
                  <textarea
                    value={regimen}
                    onChange={(e) => setRegimen(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none"
                    placeholder="e.g. Take medicines 30 mins before food..."
                  />
                </div>
              </div>
            </div>

            {/* ===== FOLLOW-UP ===== */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-emerald-600" />
                <span className="text-xs font-black uppercase tracking-widest text-slate-700">Next Follow-up</span>
              </div>
              <input
                type="date"
                value={followUp}
                onChange={(e) => setFollowUp(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 sm:w-auto"
              />
              {followUp && (
                <span className="text-xs font-semibold text-emerald-600">
                  {new Date(followUp).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
              )}
            </div>

            {/* ===== FOOTER ===== */}
            <div className="border-t border-slate-200 pt-4 mt-2">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                <div className="text-[9px] text-slate-400 leading-relaxed max-w-xs">
                  <p>This is a computer-generated prescription signed electronically. Scan QR code to verify authenticity.</p>
                </div>
                <div className="text-right">
                  <div className="w-36 border-b border-slate-400 mb-1 mx-auto sm:mx-0" />
                  <p className="text-xs font-bold text-slate-700">Dr. Samim Ahamed</p>
                  <p className="text-[9px] text-slate-400">Digital Signature</p>
                </div>
              </div>
            </div>

          </div>
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

// ==================== SYMPTOM CANVAS ====================
interface SymptomCanvasProps {
  patient: Patient;
  onClose: () => void;
  onSave: (updatedPatient: Patient) => void;
}

// Predefined symptom data for dropdowns
const CHIEF_SYMPTOM_OPTIONS = [
  'Headache', 'Migraine', 'Fever', 'Body ache', 'Joint pain', 'Back pain',
  'Neck pain', 'Stomach pain', 'Abdominal cramps', 'Nausea', 'Vomiting',
  'Diarrhea', 'Constipation', 'Cough', 'Cold', 'Sore throat',
  'Difficulty breathing', 'Chest pain', 'Skin rash', 'Itching',
  'Burning sensation', 'Dizziness', 'Vertigo', 'Weakness', 'Fatigue',
  'Loss of appetite', 'Weight loss', 'Weight gain', 'Swelling',
  'Bleeding', 'Throat pain', 'Ear pain', 'Eye pain',
  'Frequent urination', 'Excessive thirst', 'Excessive hunger',
  'Insomnia', 'Hair fall', 'Palpitation', 'Trembling',
  'Numbness', 'Tingling sensation', 'Menstrual problems',
  'Discharge', 'Sinusitis', 'Allergy symptoms', 'Asthma',
  'Hypertension', 'Diabetes symptoms', 'Acidity', 'Heartburn',
  'Bloating', 'Gas trouble', 'Piles', 'Fissure',
];

const GENERAL_SYMPTOM_OPTIONS = [
  { attribute: 'Thermal', value: 'Hot patient', category: 'Thermal' },
  { attribute: 'Thermal', value: 'Chilly patient', category: 'Thermal' },
  { attribute: 'Thermal', value: 'Amelioration from heat', category: 'Thermal' },
  { attribute: 'Thermal', value: 'Amelioration from cold', category: 'Thermal' },
  { attribute: 'Thermal', value: 'Worse from humidity', category: 'Thermal' },
  { attribute: 'Thermal', value: 'Worse from dry weather', category: 'Thermal' },
  { attribute: 'Thermal', value: 'Worse from damp weather', category: 'Thermal' },
  { attribute: 'Thermal', value: 'Worse from change of weather', category: 'Thermal' },
  { attribute: 'Thermal', value: 'Worse in summer', category: 'Thermal' },
  { attribute: 'Thermal', value: 'Worse in winter', category: 'Thermal' },
  { attribute: 'Thermal', value: 'Worse in monsoon', category: 'Thermal' },
  { attribute: 'Thirst', value: 'Increased thirst', category: 'Thirst' },
  { attribute: 'Thirst', value: 'Decreased thirst', category: 'Thirst' },
  { attribute: 'Thirst', value: 'Thirst for small quantities', category: 'Thirst' },
  { attribute: 'Thirst', value: 'Thirst for large quantities', category: 'Thirst' },
  { attribute: 'Thirst', value: 'Thirstless', category: 'Thirst' },
  { attribute: 'Desires', value: 'Sour things', category: 'Desires' },
  { attribute: 'Desires', value: 'Sweets', category: 'Desires' },
  { attribute: 'Desires', value: 'Spicy food', category: 'Desires' },
  { attribute: 'Desires', value: 'Salt', category: 'Desires' },
  { attribute: 'Desires', value: 'Cold drinks', category: 'Desires' },
  { attribute: 'Desires', value: 'Hot drinks', category: 'Desires' },
  { attribute: 'Desires', value: 'Milk', category: 'Desires' },
  { attribute: 'Desires', value: 'Meat', category: 'Desires' },
  { attribute: 'Desires', value: 'Fruits', category: 'Desires' },
  { attribute: 'Desires', value: 'Chocolate', category: 'Desires' },
  { attribute: 'Aversions', value: 'Fats/Greasy food', category: 'Aversions' },
  { attribute: 'Aversions', value: 'Milk', category: 'Aversions' },
  { attribute: 'Aversions', value: 'Eggs', category: 'Aversions' },
  { attribute: 'Aversions', value: 'Onion/Garlic', category: 'Aversions' },
  { attribute: 'Aversions', value: 'Sweet things', category: 'Aversions' },
  { attribute: 'Aversions', value: 'Meat', category: 'Aversions' },
  { attribute: 'Sleep', value: 'Sleepless', category: 'Sleep' },
  { attribute: 'Sleep', value: 'Sleepy during day', category: 'Sleep' },
  { attribute: 'Sleep', value: 'Disturbed sleep', category: 'Sleep' },
  { attribute: 'Sleep', value: 'Sleeps on back', category: 'Sleep' },
  { attribute: 'Sleep', value: 'Sleeps on abdomen', category: 'Sleep' },
  { attribute: 'Sleep', value: 'Sleeps on left side', category: 'Sleep' },
  { attribute: 'Sleep', value: 'Sleeps on right side', category: 'Sleep' },
  { attribute: 'Sleep', value: 'Wakes at 3 AM', category: 'Sleep' },
  { attribute: 'Perspiration', value: 'Profuse sweating', category: 'Perspiration' },
  { attribute: 'Perspiration', value: 'Offensive sweat', category: 'Perspiration' },
  { attribute: 'Perspiration', value: 'Sweat on palms', category: 'Perspiration' },
  { attribute: 'Perspiration', value: 'Sweat on soles', category: 'Perspiration' },
  { attribute: 'Perspiration', value: 'Cold sweat', category: 'Perspiration' },
  { attribute: 'Urine', value: 'Frequent urination', category: 'Urine' },
  { attribute: 'Urine', value: 'Scanty urination', category: 'Urine' },
  { attribute: 'Stool', value: 'Constipation', category: 'Stool' },
  { attribute: 'Stool', value: 'Loose stool', category: 'Stool' },
  { attribute: 'Appetite', value: 'Increased appetite', category: 'Appetite' },
  { attribute: 'Appetite', value: 'Loss of appetite', category: 'Appetite' },
];

const MENTAL_SYMPTOM_OPTIONS = [
  'Anxiety', 'Fear of death', 'Fear of disease', 'Fear of dark', 'Fear of heights',
  'Fear of being alone', 'Fear of crowds', 'Fear of water', 'Claustrophobia',
  'Depression', 'Sadness', 'Weeping tendency', 'Hopelessness', 'Suicidal thoughts',
  'Irritability', 'Anger easily', 'Violent anger', 'Quarrelsome',
  'Restlessness', 'Hurry', 'Impatience', 'Nervousness',
  'Despair of recovery', 'Indifference', 'Apathy', 'Lack of confidence',
  'Memory weakness', 'Forgetfulness', 'Difficulty concentrating',
  'Mood swings', 'Emotional sensitivity', 'Easily offended',
  'Jealousy', 'Suspicious', 'Miserly', 'Fastidious',
  'Grief from loss', 'Homesickness', 'Religious mania',
  'Obsessive thoughts', 'Compulsive behavior', 'Phobias',
  'Delusions', 'Hallucinations', 'Mental exhaustion',
  'Talkative', 'Silent', 'Desires company', 'Desires solitude',
  'Laughing without reason', 'Crying without reason',
  'Timidity', 'Shyness', 'Low self-esteem',
  'Dreams of death', 'Dreams of falling', 'Nightmares',
  'Sleepwalking', 'Teeth grinding in sleep', 'Talking in sleep',
];

export function SymptomCanvas({ patient, onClose, onSave }: SymptomCanvasProps) {
  const [activeSymTab, setActiveSymTab] = useState<'chief' | 'general' | 'mental'>('chief');
  const [saved, setSaved] = useState(false);

  // Chief Symptoms state
  const [chiefSymptom, setChiefSymptom] = useState('');
  const [severity, setSeverity] = useState<ChiefSymptom['severity']>('Moderate');
  const [duration, setDuration] = useState('');
  const [modality, setModality] = useState('');

  // General Symptoms state
  const [generalAttr, setGeneralAttr] = useState('');
  const [generalValue, setGeneralValue] = useState('');

  // Mental Symptoms state
  const [mentalSymptom, setMentalSymptom] = useState('');

  // Live preview of what will be saved
  const addedChief: ChiefSymptom[] = patient.chiefSymptoms || [];
  const addedGeneral: PhysicalGeneral[] = patient.physicalGenerals || [];
  const addedMental: string[] = patient.mentalSymptoms || [];

  // Add chief symptom
  const handleAddChief = () => {
    if (!chiefSymptom.trim()) return;
    const cs: ChiefSymptom = {
      id: `cs-${Date.now()}`,
      symptom: chiefSymptom.trim(),
      severity,
      duration: duration.trim() || undefined,
      modality: modality.trim() || undefined,
    };
    onSave({ ...patient, chiefSymptoms: [...addedChief, cs] });
    setChiefSymptom('');
    setSeverity('Moderate');
    setDuration('');
    setModality('');
  };

  // Add general symptom
  const handleAddGeneral = () => {
    if (!generalAttr || !generalValue) return;
    const found = GENERAL_SYMPTOM_OPTIONS.find(o => `${o.attribute}: ${o.value}` === generalValue);
    const pg: PhysicalGeneral = {
      id: `pg-${Date.now()}`,
      attribute: found?.attribute || generalAttr,
      value: found?.value || generalValue,
      category: found?.category || generalAttr,
    };
    onSave({ ...patient, physicalGenerals: [...addedGeneral, pg] });
    setGeneralAttr('');
    setGeneralValue('');
  };

  // Add mental symptom
  const handleAddMental = () => {
    if (!mentalSymptom.trim() || addedMental.includes(mentalSymptom.trim())) return;
    onSave({ ...patient, mentalSymptoms: [...addedMental, mentalSymptom.trim()] });
    setMentalSymptom('');
  };

  // Remove chief
  const removeChief = (id: string) => {
    onSave({ ...patient, chiefSymptoms: addedChief.filter(c => c.id !== id) });
  };

  // Remove general
  const removeGeneral = (id: string) => {
    onSave({ ...patient, physicalGenerals: addedGeneral.filter(g => g.id !== id) });
  };

  // Remove mental
  const removeMental = (symptom: string) => {
    onSave({ ...patient, mentalSymptoms: addedMental.filter(m => m !== symptom) });
  };

  // Final save and close
  const handleFinalSave = () => {
    setSaved(true);
    setTimeout(() => { setSaved(false); onClose(); }, 1500);
  };

  const symTabs = [
    { id: 'chief' as const, label: 'Chief Symptoms', icon: Stethoscope, count: addedChief.length, color: 'text-emerald-600 bg-emerald-50' },
    { id: 'general' as const, label: 'General Symptoms', icon: Thermometer, count: addedGeneral.length, color: 'text-blue-600 bg-blue-50' },
    { id: 'mental' as const, label: 'Mental Symptoms', icon: Brain, count: addedMental.length, color: 'text-purple-600 bg-purple-50' },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 modal-overlay">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white modal-container w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="modal-header-dark flex justify-between items-center">
          <div>
            <h3 className="text-xl font-black uppercase tracking-widest">Add Symptoms</h3>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">
              {patient.name} ({patient.id})
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-all">
            <X size={24} />
          </button>
        </div>

        {/* Symptom Tabs */}
        <div className="flex border-b border-slate-100 px-4 bg-slate-50/50">
          {symTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSymTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSymTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-xs font-bold uppercase tracking-widest transition-all border-b-2 ${
                  isActive ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                <Icon size={14} className={isActive ? 'text-emerald-500' : ''} />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="hidden xs:inline text-[8px] sm:hidden">{tab.label.split(' ')[0]}</span>
                {tab.count > 0 && (
                  <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full ${tab.color}`}>{tab.count}</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">

          {/* ====== CHIEF SYMPTOMS ====== */}
          {activeSymTab === 'chief' && (
            <div className="space-y-4">
              {/* Add Form */}
              <div className="bg-emerald-50/50 rounded-2xl border border-emerald-200/60 p-4 space-y-3">
                <h4 className="text-[10px] font-black text-emerald-700 uppercase tracking-widest flex items-center gap-2">
                  <Plus size={12} /> Add Chief Symptom
                </h4>
                <div>
                  <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Symptom</label>
                  <select
                    value={chiefSymptom}
                    onChange={(e) => setChiefSymptom(e.target.value)}
                    className="modern-input w-full mt-1"
                  >
                    <option value="">Select or type symptom...</option>
                    {CHIEF_SYMPTOM_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Severity</label>
                    <select value={severity} onChange={e => setSeverity(e.target.value as ChiefSymptom['severity'])} className="modern-input mt-1 w-full">
                      <option>Mild</option><option>Moderate</option><option>Severe</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Duration</label>
                    <input type="text" value={duration} onChange={e => setDuration(e.target.value)} className="modern-input mt-1 w-full" placeholder="e.g. 3 months" />
                  </div>
                  <div>
                    <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Modality</label>
                    <input type="text" value={modality} onChange={e => setModality(e.target.value)} className="modern-input mt-1 w-full" placeholder="e.g. > from rest" />
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={handleAddChief}
                  disabled={!chiefSymptom.trim()}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    chiefSymptom.trim() ? 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-sm' : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <Plus size={13} /> Add Symptom
                </motion.button>
              </div>

              {/* Added Symptoms List */}
              <div>
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
                  Added Chief Symptoms ({addedChief.length})
                </h4>
                {addedChief.length === 0 ? (
                  <div className="text-center py-8 bg-slate-50 rounded-xl border border-slate-100">
                    <Stethoscope size={28} className="mx-auto mb-2 text-slate-200" />
                    <p className="text-[10px] font-bold text-slate-400">No chief symptoms added yet</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {addedChief.map((cs) => (
                      <div key={cs.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 group">
                        <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-black flex-shrink-0">{addedChief.indexOf(cs) + 1}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-slate-900">{cs.symptom}</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {cs.severity && <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded ${cs.severity === 'Severe' ? 'bg-rose-50 text-rose-600' : cs.severity === 'Moderate' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'}`}>{cs.severity}</span>}
                            {cs.duration && <span className="text-[8px] font-bold bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded">{cs.duration}</span>}
                            {cs.modality && <span className="text-[8px] font-bold bg-amber-50 text-amber-600 px-1.5 py-0.5 rounded">{cs.modality}</span>}
                          </div>
                        </div>
                        <button onClick={() => removeChief(cs.id)} className="text-slate-300 hover:text-rose-500 transition opacity-0 group-hover:opacity-100">
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ====== GENERAL SYMPTOMS ====== */}
          {activeSymTab === 'general' && (
            <div className="space-y-4">
              {/* Add Form */}
              <div className="bg-blue-50/50 rounded-2xl border border-blue-200/60 p-4 space-y-3">
                <h4 className="text-[10px] font-black text-blue-700 uppercase tracking-widest flex items-center gap-2">
                  <Plus size={12} /> Add General Symptom
                </h4>
                <div>
                  <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Symptom Category & Value</label>
                  <select
                    value={generalValue}
                    onChange={(e) => {
                      setGeneralValue(e.target.value);
                      const found = GENERAL_SYMPTOM_OPTIONS.find(o => `${o.attribute}: ${o.value}` === e.target.value);
                      if (found) setGeneralAttr(found.attribute);
                    }}
                    className="modern-input w-full mt-1"
                  >
                    <option value="">Select symptom...</option>
                    {GENERAL_SYMPTOM_OPTIONS.map((opt, i) => (
                      <option key={i} value={`${opt.attribute}: ${opt.value}`}>{opt.attribute}: {opt.value}</option>
                    ))}
                  </select>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={handleAddGeneral}
                  disabled={!generalValue}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    generalValue ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-sm' : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <Plus size={13} /> Add Symptom
                </motion.button>
              </div>

              {/* Added List */}
              <div>
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
                  Added General Symptoms ({addedGeneral.length})
                </h4>
                {addedGeneral.length === 0 ? (
                  <div className="text-center py-8 bg-slate-50 rounded-xl border border-slate-100">
                    <Thermometer size={28} className="mx-auto mb-2 text-slate-200" />
                    <p className="text-[10px] font-bold text-slate-400">No general symptoms added yet</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {addedGeneral.map((pg) => (
                      <div key={pg.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 group">
                        <div className="flex items-center gap-2">
                          <span className="text-[8px] font-bold bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded">{pg.category}</span>
                          <span className="text-xs font-bold text-slate-700">{pg.attribute}: {pg.value}</span>
                        </div>
                        <button onClick={() => removeGeneral(pg.id)} className="text-slate-300 hover:text-rose-500 transition opacity-0 group-hover:opacity-100">
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ====== MENTAL SYMPTOMS ====== */}
          {activeSymTab === 'mental' && (
            <div className="space-y-4">
              {/* Add Form */}
              <div className="bg-purple-50/50 rounded-2xl border border-purple-200/60 p-4 space-y-3">
                <h4 className="text-[10px] font-black text-purple-700 uppercase tracking-widest flex items-center gap-2">
                  <Plus size={12} /> Add Mental Symptom
                </h4>
                <div>
                  <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Mental State / Emotion</label>
                  <select
                    value={mentalSymptom}
                    onChange={(e) => setMentalSymptom(e.target.value)}
                    className="modern-input w-full mt-1"
                  >
                    <option value="">Select mental symptom...</option>
                    {MENTAL_SYMPTOM_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={handleAddMental}
                  disabled={!mentalSymptom.trim() || addedMental.includes(mentalSymptom.trim())}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    mentalSymptom.trim() && !addedMental.includes(mentalSymptom.trim())
                      ? 'bg-purple-500 text-white hover:bg-purple-600 shadow-sm'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <Plus size={13} /> Add Symptom
                </motion.button>
              </div>

              {/* Added List */}
              <div>
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
                  Added Mental Symptoms ({addedMental.length})
                </h4>
                {addedMental.length === 0 ? (
                  <div className="text-center py-8 bg-slate-50 rounded-xl border border-slate-100">
                    <Brain size={28} className="mx-auto mb-2 text-slate-200" />
                    <p className="text-[10px] font-bold text-slate-400">No mental symptoms added yet</p>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {addedMental.map((m) => (
                      <span key={m} className="flex items-center gap-1.5 text-[10px] font-bold bg-purple-50 text-purple-700 px-2.5 py-1.5 rounded-lg border border-purple-200 group">
                        <Brain size={10} />
                        {m}
                        <button onClick={() => removeMental(m)} className="text-purple-300 hover:text-rose-500 transition ml-0.5 opacity-0 group-hover:opacity-100">
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 md:p-5 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex flex-wrap gap-3 text-[9px] font-bold text-slate-400">
            <span className="flex items-center gap-1"><Stethoscope size={10} className="text-emerald-500" /> {addedChief.length} Chief</span>
            <span className="flex items-center gap-1"><Thermometer size={10} className="text-blue-500" /> {addedGeneral.length} General</span>
            <span className="flex items-center gap-1"><Brain size={10} className="text-purple-500" /> {addedMental.length} Mental</span>
          </div>
          <div className="flex gap-3">
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={handleFinalSave}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                saved ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' : 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-sm'
              }`}
            >
              {saved ? <><CheckCircle size={14} /> Saved!</> : <><Save size={14} /> Save All</>}
            </motion.button>
            <button onClick={onClose} className="btn-ghost">Close</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
