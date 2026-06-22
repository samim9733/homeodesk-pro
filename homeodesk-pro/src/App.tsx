import { Sidebar, ActiveSelectionCard, AttributeItem } from './AppComponents';
import { PrescriptionCanvas, PatientDetailsCanvas } from './PatientModals';
import { QRScannerModal, AnalysisResultModal, ImageEditorModal } from './Modals';
import { Dashboard, PatientsTab, RepertoryTab } from './MainTabs';
import { RemindersTab, AnalysisTab } from './AnalysisRemindersTabs';
import { MateriaMedicaTab, ComparisonSection } from './MateriaMedicaTab';
import { PhysiologyAnatomyTab } from './PhysiologyAnatomyTab';
import React, { useState, useEffect, useMemo } from 'react';
import { LayoutDashboard, Users, User, UserPlus, Filter, Stethoscope, Leaf, Bell, Calendar, Menu, X, ChevronRight, ChevronLeft, ChevronDown, ArrowLeft, Microscope, Plus, Trash2, Eye, Save, Search, History, BookOpen, Book, FileText, Eraser, GraduationCap, FlaskConical, Bookmark, BookmarkCheck, Printer, ClipboardList, QrCode, AlertCircle, Loader2, Sparkles, Edit, Upload, RotateCcw, Pencil, Type, Square, Settings, Database, Brain, Clock, Thermometer, Activity, Move, Zap, Droplets, ArrowRightLeft, RefreshCw, Utensils, ListFilter, ArrowUpDown, MoreHorizontal, Star, HelpCircle, TrendingUp, TrendingDown, Smile, ArrowRight, CheckCircle, Bone, ShoppingCart, Flame, Wind, CloudRain, Heart, Sun, Scroll, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { GoogleGenAI, Type as GenAIType } from "@google/genai";
import { DEMO_PATIENTS, DEMO_REMINDERS } from './demoData';
import { PharmacyTab, SettingsTab } from './PharmacyComponents';
import { OrganonTab, PracticeMedicineTab, KnowledgeTab, PathologyTab } from './LibraryTabs';
import { SurgeryTab } from './SurgeryTab';
import { Patient, AnalysisItem, Reminder, Rubric, RubricData, Remedy as RepertoryRemedy, ChiefSymptom, PhysicalGeneral, PharmacyRemedy, Supplier, Invoice, PharmacyStats } from './types';
import { CHAPTER_INDEX, REPERTORY_DATA, CATEGORIES, GENERAL_SUB_CATEGORIES, CHAPTER_CATEGORIES } from './constants';
import { ORGANON_DATA, Aphorism, PREFACES_DATA, Preface } from './organonData';
import { PATHOLOGY_DATA, PRACTICE_MEDICINE_DATA, KNOWLEDGE_DATA, PHYSIOLOGY_ANATOMY_DATA, KnowledgeTopic, DiseaseCategory, CLASSIC_BOOKS, KNOWLEDGE_CATEGORIES, RECENT_ARTICLES } from './medicalData';
import { MATERIA_MEDICA_DATA, Remedy as MateriaRemedy } from './materiaMedicaData';
import { PATHOLOGY_SYSTEMS, PATHOLOGY_CONDITIONS, PathologyCondition, PathologySystem } from './pathologyData';
// --- Components ---
export default function App() {
const [activeTab, setActiveTab] = useState('dashboard');
const [isSidebarOpen, setIsSidebarOpen] = useState(false);
const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
const [patients, setPatients] = useState<Patient[]>(DEMO_PATIENTS);
const [reminders, setReminders] = useState<Reminder[]>(DEMO_REMINDERS);
const [analysis, setAnalysis] = useState<AnalysisItem[]>([]);
const [totalAnalysisRun, setTotalAnalysisRun] = useState(0);
const [isLoading, setIsLoading] = useState(true);
const [repertorizationResults, setRepertorizationResults] = useState<any[] | null>(null);
const [selectedPatientForRx, setSelectedPatientForRx] = useState<Patient | null>(null);
const [quickRemedyForRx, setQuickRemedyForRx] = useState<string | undefined>(undefined);
const [selectedPatientForPD, setSelectedPatientForPD] = useState<Patient | null>(null);
const [preSelectedPatientId, setPreSelectedPatientId] = useState<string | null>(null);
const [isQRScannerOpen, setIsQRScannerOpen] = useState(false);
const [isAnalyzing, setIsAnalyzing] = useState(false);
const [analysisResult, setAnalysisResult] = useState<string | null>(null);
const [isAIEditorOpen, setIsAIEditorOpen] = useState(false);
const [editingSystemId, setEditingSystemId] = useState<string | null>(null);
const [anatomySystems, setAnatomySystems] = useState(PHYSIOLOGY_ANATOMY_DATA);
const [materiaComparison, setMateriaComparison] = useState<string[]>([]);
useEffect(() => {
const timer = setTimeout(() => setIsLoading(false), 1200);
return () => clearTimeout(timer);
}, []);
const addPatient = (p: Omit<Patient, 'id' | 'date'>) => {
const newPatient: Patient = {
...p,
id: `PT-${Math.floor(100000 + Math.random() * 900000)}`,
date: new Date().toLocaleDateString(),
status: p.status || 'Active',
lastVisit: new Date().toLocaleDateString()
};
setPatients(prev => [...prev, newPatient]);
setPreSelectedPatientId(newPatient.id);
setActiveTab('analysis');
};
const removePatient = (id: string) => {
setPatients(patients.filter(p => p.id !== id));
setReminders(reminders.filter(r => r.patientId !== id));
};
const handleQRScan = async (data: string) => {
setIsQRScannerOpen(false);
setIsAnalyzing(true);
try {
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const response = await ai.models.generateContent({
model: "gemini-3-flash-preview",
contents: `Analyze the following data from a QR code scan. If it's a medical report or clinical data, identify any "faults" (abnormalities, issues, or concerns). If it's not medical data, summarize it and state that it's not a medical report. Provide the analysis in a clear, structured format using Markdown.
Data: ${data}`,
});
setAnalysisResult(response.text || "No analysis generated.");
} catch (error) {
console.error("Analysis failed:", error);
setAnalysisResult("Failed to analyze the QR code data. Please try again.");
} finally {
setIsAnalyzing(false);
}
};
const addToAnalysis = (item: AnalysisItem) => {
if (analysis.some(a => a.text === item.text)) return;
setAnalysis([...analysis, item]);
};
const removeFromAnalysis = (idx: number) => {
setAnalysis(analysis.filter((_, i) => i !== idx));
};
const runRepertorization = (results: any[]) => {
setTotalAnalysisRun(prev => prev + 1);
setRepertorizationResults(results);
};
const getPageTitle = () => {
switch(activeTab) {
case 'dashboard': return 'Dashboard';
case 'patients': return 'Patient Database';
case 'reminders': return 'Reminders';
case 'repertory': return "Kent's Repertory";
case 'analysis': return 'Case Analysis';
case 'organon': return 'Organon of Medicine';
case 'practice': return 'Practice of Medicine';
case 'knowledge': return 'Knowledge Menu';
case 'pathology': return 'Pathology Menu';
case 'materia': return 'Materia Medica';
case 'physiology': return 'Physiology & Anatomy';
case 'settings': return 'Settings & Preferences';
case 'pharmacy': return 'Pharmacy Management';
default: return 'HomeoDesk Pro';
}
};
if (isLoading) {
return (
<div className="fixed inset-0 flex flex-col items-center justify-center z-[9999]" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #064e3b 100%)' }}>
<motion.div 
animate={{ scale: [1, 1.08, 1], rotate: [0, 3, -3, 0] }}
transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
className="mb-6"
>
<div className="w-20 h-20 rounded-3xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #10b981, #059669)', boxShadow: '0 8px 32px rgba(16,185,129,0.4)' }}>
<Leaf size={36} className="text-white" />
</div>
</motion.div>
<h1 className="text-white text-3xl font-black tracking-tight">
HomeoDesk <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">Pro</span>
</h1>
<p className="text-slate-500 mt-2 text-[11px] font-semibold tracking-[0.2em] uppercase">Advanced Clinical Suite</p>
<div className="mt-8 flex items-center gap-1.5">
<motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0 }} className="w-2 h-2 rounded-full bg-emerald-400" />
<motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }} className="w-2 h-2 rounded-full bg-emerald-400" />
<motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.4 }} className="w-2 h-2 rounded-full bg-emerald-400" />
</div>
</div>
);
}
return (
<div className="flex h-screen text-slate-800 overflow-hidden" style={{ background: '#f8fafc' }}>
<Sidebar 
activeTab={activeTab} 
setActiveTab={(tab) => {
if (tab === 'materia') setMateriaComparison([]);
setActiveTab(tab);
}} 
isOpen={isSidebarOpen} 
toggleMenu={() => setIsSidebarOpen(!isSidebarOpen)} 
isCollapsed={isSidebarCollapsed}
toggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
/>
<main className={`flex-1 flex flex-col min-w-0 overflow-hidden print:overflow-visible print:h-auto transition-all duration-500 ${isSidebarCollapsed ? 'lg:ml-[76px]' : 'lg:ml-[272px]'} ml-0`}>
<header className="h-[68px] bg-white/80 backdrop-blur-xl border-b border-slate-100/80 flex items-center px-4 lg:px-8 gap-8 justify-between z-10 print:hidden" style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.03)' }}>
<div className="flex items-center gap-4 flex-1">
<button 
onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
className="p-2.5 text-slate-500 hover:bg-slate-100 rounded-xl transition lg:hidden"
>
<Menu size={22} />
</button>
<div className="relative flex-1 max-w-lg hidden md:block">
<Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
<input 
type="text" 
placeholder="Search symptoms, remedies, or patients..." 
className="modern-input w-full !py-2.5 !pl-11 !pr-4 !rounded-2xl !text-sm"
/>
</div>
</div>
<div className="flex items-center gap-6">
<div className="hidden xl:flex items-center gap-2.5 px-4 py-2 bg-slate-50/80 rounded-2xl text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em] border border-slate-100/60">
<Calendar size={13} className="text-emerald-500" />
<span>{new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
</div>
<div className="flex items-center gap-2">
<button 
onClick={() => setIsQRScannerOpen(true)}
className="w-10 h-10 rounded-2xl bg-slate-50 text-slate-400 hover:bg-emerald-50 hover:text-emerald-600 transition-all flex items-center justify-center border border-slate-100/60"
title="Scan QR Code"
>
<QrCode size={18} />
</button>
<button className="w-10 h-10 rounded-2xl bg-slate-50 text-slate-400 hover:bg-amber-50 hover:text-amber-600 transition-all flex items-center justify-center border border-slate-100/60 relative">
<Bell size={18} />
<span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-rose-500 rounded-full border-2 border-white" />
</button>
<button 
onClick={() => setActiveTab('settings')}
className={`w-10 h-10 rounded-2xl transition-all flex items-center justify-center border border-slate-100/60 ${activeTab === 'settings' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
>
<Settings size={18} />
</button>
</div>
<div className="h-8 w-px bg-slate-100 hidden sm:block" />
<div className="flex items-center gap-3 pl-2">
<div className="text-right hidden sm:block">
<p className="text-xs font-black text-slate-900 tracking-tight">Dr. Rahim Ahmed</p>
<p className="text-[9px] font-bold text-primary uppercase tracking-widest">Available</p>
</div>
<div className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold text-sm" style={{ background: 'linear-gradient(135deg, #0f172a, #1e293b)', boxShadow: '0 4px 12px rgba(15,23,42,0.2)' }}>
RA
</div>
</div>
</div>
</header>
<section className="flex-1 p-5 lg:p-8 overflow-y-auto print:hidden" style={{ background: '#f8fafc' }}>
<AnimatePresence mode="wait">
{isQRScannerOpen && (
<QRScannerModal 
onClose={() => setIsQRScannerOpen(false)} 
onScan={handleQRScan} 
/>
)}
{isAnalyzing && (
<div className="fixed inset-0 modal-overlay z-[90] flex items-center justify-center">
<div className="modal-container p-8 flex flex-col items-center gap-4">
<div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mb-2">
<Loader2 className="animate-spin text-emerald-500" size={32} />
</div>
<p className="font-bold text-slate-800 text-sm">Analyzing QR Data...</p>
<p className="text-xs text-slate-400">Gemini AI is processing the information</p>
</div>
</div>
)}
{analysisResult && (
<AnalysisResultModal 
result={analysisResult} 
onClose={() => setAnalysisResult(null)} 
/>
)}
{isAIEditorOpen && editingSystemId && (
<ImageEditorModal 
imageUrl={anatomySystems.find(s => s.id === editingSystemId)?.image || ''}
onClose={() => {
setIsAIEditorOpen(false);
setEditingSystemId(null);
}}
onUpdate={(newUrl) => {
setAnatomySystems(prev => prev.map(s => 
s.id === editingSystemId ? { ...s, image: newUrl } : s
));
}}
/>
)}
{activeTab === 'dashboard' && (
<motion.div
key="dashboard"
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: -20 }}
transition={{ duration: 0.2 }}
>
<Dashboard 
patients={patients} 
analysisCount={totalAnalysisRun} 
reminders={reminders}
setActiveTab={setActiveTab}
onOpenPD={setSelectedPatientForPD}
/>
</motion.div>
)}
{activeTab === 'patients' && (
<motion.div
key="patients"
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: -20 }}
transition={{ duration: 0.2 }}
>
<PatientsTab 
patients={patients} 
addPatient={addPatient} 
removePatient={removePatient}
setSelectedPatientForRx={setSelectedPatientForRx}
onOpenPD={setSelectedPatientForPD}
onSetReminder={(p) => {
setPreSelectedPatientId(p.id);
setActiveTab('reminders');
}}
/>
</motion.div>
)}
{activeTab === 'reminders' && (
<motion.div
key="reminders"
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: -20 }}
transition={{ duration: 0.2 }}
>
<RemindersTab 
reminders={reminders} 
setReminders={setReminders} 
patients={patients} 
preSelectedPatientId={preSelectedPatientId}
setPreSelectedPatientId={setPreSelectedPatientId}
/>
</motion.div>
)}
{activeTab === 'repertory' && (
<motion.div
key="repertory"
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: -20 }}
transition={{ duration: 0.2 }}
>
<RepertoryTab 
analysis={analysis} 
addToAnalysis={addToAnalysis} 
removeFromAnalysis={removeFromAnalysis}
clearAnalysis={() => setAnalysis([])}
runRepertorization={runRepertorization}
onTransferToRx={(patient) => {
setSelectedPatientForRx(patient);
}}
setActiveTab={setActiveTab}
patients={patients}
/>
</motion.div>
)}
{activeTab === 'analysis' && (
<motion.div
key="analysis"
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: -20 }}
transition={{ duration: 0.2 }}
>
<AnalysisTab 
patients={patients} 
analysis={analysis} 
preSelectedPatientId={preSelectedPatientId}
onClearAnalysis={() => setAnalysis([])}
onRemoveRubric={removeFromAnalysis}
onTransferToRx={(patient) => {
setSelectedPatientForRx(patient);
}}
onCompare={(remedyA, remedyB) => {
setMateriaComparison([remedyA, remedyB]);
setActiveTab('materia');
}}
onUpdatePatient={(updatedPatient) => {
setPatients(patients.map(p => p.id === updatedPatient.id ? updatedPatient : p));
}}
onAddPatient={addPatient}
setActiveTab={setActiveTab}
/>
</motion.div>
)}
{activeTab === 'organon' && (
<motion.div
key="organon"
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: -20 }}
transition={{ duration: 0.2 }}
>
<OrganonTab />
</motion.div>
)}
{activeTab === 'practice' && (
<motion.div
key="practice"
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: -20 }}
transition={{ duration: 0.2 }}
>
<PracticeMedicineTab />
</motion.div>
)}
{activeTab === 'knowledge' && (
<motion.div
key="knowledge"
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: -20 }}
transition={{ duration: 0.2 }}
>
<KnowledgeTab />
</motion.div>
)}
{activeTab === 'pathology' && (
<motion.div
key="pathology"
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: -20 }}
transition={{ duration: 0.2 }}
>
<PathologyTab />
</motion.div>
)}
{activeTab === 'materia' && (
<motion.div
key="materia"
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: -20 }}
transition={{ duration: 0.2 }}
>
<MateriaMedicaTab 
initialComparison={materiaComparison} 
onQuickPrescribe={(remedyName) => {
setQuickRemedyForRx(remedyName);
setSelectedPatientForRx({
id: `QUICK-${Math.floor(1000 + Math.random() * 9000)}`,
name: 'Walk-in Patient',
age: 0,
gender: 'Unspecified',
phone: '',
date: new Date().toLocaleDateString(),
chiefSymptoms: [],
physicalGenerals: []
});
}}
/>
</motion.div>
)}
{activeTab === 'physiology' && (
<motion.div
key="physiology"
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: -20 }}
transition={{ duration: 0.2 }}
>
<PhysiologyAnatomyTab 
anatomySystems={anatomySystems}
setAnatomySystems={setAnatomySystems}
onEditImage={(id) => {
setEditingSystemId(id);
setIsAIEditorOpen(true);
}}
/>
</motion.div>
)}
{activeTab === 'surgery' && (
<motion.div
key="surgery"
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: -20 }}
transition={{ duration: 0.2 }}
>
<SurgeryTab />
</motion.div>
)}
{activeTab === 'settings' && (
<motion.div
key="settings"
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: -20 }}
transition={{ duration: 0.2 }}
>
<SettingsTab />
</motion.div>
)}
{activeTab === 'pharmacy' && (
<motion.div
key="pharmacy"
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: -20 }}
transition={{ duration: 0.2 }}
>
<PharmacyTab />
</motion.div>
)}
</AnimatePresence>
</section>
{/* Repertorization Results Modal */}
<AnimatePresence>
{repertorizationResults && (
<div className="fixed inset-0 z-[100] flex items-center justify-center p-4 modal-overlay print:hidden">
<motion.div 
initial={{ opacity: 0, scale: 0.95, y: 20 }}
animate={{ opacity: 1, scale: 1, y: 0 }}
exit={{ opacity: 0, scale: 0.95, y: 20 }}
className="modal-container w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]"
>
<div className="modal-header-dark flex justify-between items-center">
<div>
<h3 className="text-lg font-extrabold uppercase tracking-tight">Repertorization Results</h3>
<p className="text-slate-400 text-[10px] font-semibold uppercase tracking-[0.12em] mt-1">Top remedies covering your selected rubrics</p>
</div>
<motion.button 
whileHover={{ scale: 1.1, rotate: 90 }}
whileTap={{ scale: 0.9 }}
onClick={() => setRepertorizationResults(null)}
className="p-2 hover:bg-white/10 rounded-xl transition-all"
>
<X size={22} />
</motion.button>
</div>
<div className="flex-1 overflow-y-auto p-5 space-y-3 custom-scrollbar">
<div className="grid grid-cols-1 gap-2.5">
{repertorizationResults.map((res, i) => (
<motion.div 
initial={{ opacity: 0, x: -20 }}
animate={{ opacity: 1, x: 0 }}
transition={{ delay: i * 0.1 }}
key={res.name} 
className="modern-card flex items-center gap-4 p-4 !rounded-2xl group cursor-default"
>
<div className="w-11 h-11 rounded-2xl flex items-center justify-center font-extrabold text-sm text-white shadow-lg group-hover:scale-105 transition-transform" style={{ background: i === 0 ? 'linear-gradient(135deg, #f59e0b, #d97706)' : i === 1 ? 'linear-gradient(135deg, #94a3b8, #64748b)' : i === 2 ? 'linear-gradient(135deg, #f97316, #ea580c)' : 'linear-gradient(135deg, #0f172a, #1e293b)' }}>
{i + 1}
</div>
<div className="flex-1 min-w-0">
<div className="flex justify-between items-center">
<h4 className="font-black text-slate-900 text-lg uppercase tracking-tight truncate">{res.name}</h4>
<div className="text-right">
<span className="text-slate-900 font-black text-xl">{res.score}</span>
<span className="text-slate-400 text-[10px] font-bold uppercase ml-1">pts</span>
</div>
</div>
<div className="flex items-center gap-4 mt-2">
<div className="flex-1 progress-bar">
<motion.div 
initial={{ width: 0 }}
animate={{ width: `${(res.score / repertorizationResults[0].score) * 100}%` }}
transition={{ duration: 1, ease: "easeOut" }}
className="progress-bar-fill" style={{ background: i === 0 ? 'linear-gradient(90deg, #f59e0b, #d97706)' : i === 1 ? 'linear-gradient(90deg, #94a3b8, #64748b)' : i === 2 ? 'linear-gradient(90deg, #f97316, #ea580c)' : 'linear-gradient(90deg, #10b981, #059669)' }}
/>
</div>
<span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.1em] whitespace-nowrap">
Covers {res.count} / {analysis.length}
</span>
</div>
</div>
</motion.div>
))}
</div>
{repertorizationResults.length === 0 && (
<div className="text-center py-10 text-slate-400">
<p className="text-xs font-bold uppercase tracking-widest">No matching remedies found</p>
</div>
)}
</div>
<div className="p-4 md:p-5 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-center gap-3">
<div className="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto">
<motion.button 
whileHover={{ scale: 1.02 }}
whileTap={{ scale: 0.98 }}
onClick={() => window.print()}
className="btn-primary flex items-center justify-center gap-2 w-full sm:w-auto"
>
<Printer size={14} /> Print
</motion.button>
<motion.button 
whileHover={{ scale: 1.02 }}
whileTap={{ scale: 0.98 }}
onClick={() => {
if (patients.length > 0) {
setSelectedPatientForRx(patients[0]);
setRepertorizationResults(null);
} else {
alert("Please add a patient first to create a prescription.");
setActiveTab('patients');
}
}}
className="btn-emerald flex items-center justify-center gap-2 w-full sm:w-auto"
>
<FileText size={14} /> Transfer to Rx
</motion.button>
</div>
<motion.button 
whileTap={{ scale: 0.98 }}
onClick={() => setRepertorizationResults(null)}
className="btn-ghost w-full sm:w-auto"
>
Close
</motion.button>
</div>
</motion.div>
</div>
)}
</AnimatePresence>
{/* Print-only Analysis View */}
<div className="hidden print:block p-10 bg-white min-h-screen text-slate-900">
<div className="text-center mb-10 pb-6 border-b-2 border-slate-900">
<h1 className="text-4xl font-black text-slate-900 mb-2 uppercase tracking-tighter">HomeoDesk Pro Analysis Report</h1>
<p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Kent's Repertory Clinical Analysis</p>
<p className="text-[10px] text-slate-400 mt-2 font-mono">Generated on: {new Date().toLocaleString()}</p>
</div>
<div className="mb-10">
<h2 className="text-xl font-black text-slate-900 mb-4 border-l-4 border-slate-900 pl-3 uppercase tracking-tight">Selected Rubrics</h2>
<div className="grid grid-cols-1 gap-2">
{analysis.map((item, idx) => (
<div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
<span className="font-black text-slate-900">{idx + 1}.</span>
<div>
<p className="font-black text-slate-900 uppercase tracking-tight">{item.text}</p>
<p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{item.chapter}</p>
</div>
</div>
))}
</div>
</div>
<div>
<h2 className="text-xl font-black text-slate-900 mb-4 border-l-4 border-slate-900 pl-3 uppercase tracking-tight">Repertorization Results</h2>
<table className="w-full border-collapse border border-slate-900">
<thead>
<tr className="bg-slate-900 text-white">
<th className="border border-slate-900 p-3 text-left text-[10px] uppercase tracking-widest">Rank</th>
<th className="border border-slate-900 p-3 text-left text-[10px] uppercase tracking-widest">Remedy Name</th>
<th className="border border-slate-900 p-3 text-center text-[10px] uppercase tracking-widest">Score (pts)</th>
<th className="border border-slate-900 p-3 text-center text-[10px] uppercase tracking-widest">Rubrics Covered</th>
</tr>
</thead>
<tbody>
{repertorizationResults?.map((res, i) => (
<tr key={res.name}>
<td className="border border-slate-200 p-3 font-black text-xs">{i + 1}</td>
<td className="border border-slate-200 p-3 font-black text-slate-900 text-xs uppercase tracking-tight">{res.name}</td>
<td className="border border-slate-200 p-3 text-center font-black text-xs">{res.score}</td>
<td className="border border-slate-200 p-3 text-center text-xs font-bold">{res.count} / {analysis.length}</td>
</tr>
))}
</tbody>
</table>
</div>
<div className="mt-20 flex justify-between items-end">
<div className="text-xs text-slate-400">
<p>HomeoDesk Pro - Advanced Homeopathic Software</p>
<p>Clinical Decision Support System</p>
</div>
<div className="text-center">
<div className="w-48 border-b border-slate-400 mb-2" />
<p className="text-sm font-bold text-slate-700">Doctor's Signature</p>
</div>
</div>
</div>
<AnimatePresence>
{selectedPatientForRx && (
<PrescriptionCanvas 
patient={selectedPatientForRx} 
onClose={() => {
setSelectedPatientForRx(null);
setQuickRemedyForRx(undefined);
}} 
initialAnalysis={analysis}
initialResults={repertorizationResults || undefined}
quickRemedy={quickRemedyForRx}
/>
)}
{selectedPatientForPD && (
<PatientDetailsCanvas 
patient={selectedPatientForPD}
onClose={() => setSelectedPatientForPD(null)}
onNext={() => {
const currentIndex = patients.findIndex(p => p.id === selectedPatientForPD.id);
if (currentIndex < patients.length - 1) {
setSelectedPatientForPD(patients[currentIndex + 1]);
}
}}
onPrevious={() => {
const currentIndex = patients.findIndex(p => p.id === selectedPatientForPD.id);
if (currentIndex > 0) {
setSelectedPatientForPD(patients[currentIndex - 1]);
}
}}
onSave={(updatedPatient) => {
setPatients(patients.map(p => p.id === updatedPatient.id ? updatedPatient : p));
setSelectedPatientForPD(updatedPatient);
}}
/>
)}
</AnimatePresence>
</main>
</div>
);
}
