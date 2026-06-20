import React, { useState, useEffect, useMemo } from 'react';
import { CHAPTER_INDEX } from './constants';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Printer, Save, FileText, CheckCircle, Clock, Trash2, Edit, Square, Upload, Type, Brain, AlertCircle, RotateCcw, Droplets, Zap, Pencil, Download, Eraser, Move, ShieldAlert, Thermometer
, Settings, Stethoscope, Activity, ArrowRightLeft, RefreshCw, Utensils, ClipboardList, ChevronLeft, ChevronRight, Users, Database, Calendar, Plus, FlaskConical, BookmarkCheck, ChevronDown, TrendingUp, Bookmark} from 'lucide-react';
import { Patient, AnalysisItem, ChiefSymptom, PhysicalGeneral } from './types';
import ReactMarkdown from 'react-markdown';
import { GoogleGenAI } from "@google/genai";

export const PrescriptionCanvas = ({ patient, onClose, initialAnalysis, initialResults, quickRemedy }: { 
  patient: Patient, 
  onClose: () => void,
  initialAnalysis?: AnalysisItem[],
  initialResults?: any[],
  quickRemedy?: string
}) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [advice, setAdvice] = useState(quickRemedy ? `Rx:\n${quickRemedy}\n\n` : '');
  const [penColor, setPenColor] = useState('#1e293b');
  const [penSize, setPenSize] = useState(2);
  const [history, setHistory] = useState<string[]>([]);
  const [startPos, setStartPos] = useState<{x: number, y: number} | null>(null);
  const [previewShape, setPreviewShape] = useState<{x: number, y: number, w: number, h: number} | null>(null);

  useEffect(() => {
    if (initialResults && initialResults.length > 0) {
      const topRemedies = initialResults.slice(0, 3).map(r => `${r.name} (${r.score} pts)`).join(', ');
      setAdvice(prev => prev ? `${prev}\n\nSuggested Remedies: ${topRemedies}` : `Suggested Remedies: ${topRemedies}`);
    }
  }, [initialResults]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      // Save current content
      const tempImage = canvas.toDataURL();
      
      canvas.width = rect.width;
      canvas.height = rect.height;
      
      ctx.strokeStyle = penColor;
      ctx.lineWidth = penSize;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Restore content
      const img = new Image();
      img.onload = () => ctx.drawImage(img, 0, 0);
      img.src = tempImage;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.strokeStyle = penColor;
    ctx.lineWidth = penSize;
  }, [penColor, penSize]);

  const saveToHistory = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setHistory(prev => [...prev, canvas.toDataURL()]);
  };

  const undo = () => {
    if (history.length === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const newHistory = [...history];
    newHistory.pop();
    setHistory(newHistory);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (newHistory.length > 0) {
      const img = new Image();
      img.onload = () => ctx.drawImage(img, 0, 0);
      img.src = newHistory[newHistory.length - 1];
    }
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    if (selectedTool !== 'pencil' && selectedTool !== 'shape') return;
    saveToHistory();
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let x, y;

    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = (e as React.MouseEvent).clientX - rect.left;
      y = (e as React.MouseEvent).clientY - rect.top;
    }

    if (selectedTool === 'pencil') {
      ctx.beginPath();
      ctx.moveTo(x, y);
    } else if (selectedTool === 'shape') {
      setStartPos({ x, y });
    }
  };

  const stopDrawing = () => {
    if (selectedTool === 'shape' && previewShape) {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.beginPath();
          ctx.rect(previewShape.x, previewShape.y, previewShape.w, previewShape.h);
          ctx.stroke();
        }
      }
      setPreviewShape(null);
    }
    setStartPos(null);
    setIsDrawing(false);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let x, y;

    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = (e as React.MouseEvent).clientX - rect.left;
      y = (e as React.MouseEvent).clientY - rect.top;
    }

    if (selectedTool === 'pencil') {
      ctx.lineTo(x, y);
      ctx.stroke();
    } else if (selectedTool === 'shape' && startPos) {
      setPreviewShape({
        x: Math.min(startPos.x, x),
        y: Math.min(startPos.y, y),
        w: Math.abs(x - startPos.x),
        h: Math.abs(y - startPos.y)
      });
    }
  };

  const clearCanvas = () => {
    saveToHistory();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 z-[60] flex items-center justify-center p-0 sm:p-2 md:p-4 backdrop-blur-md overflow-hidden print:p-0 print:bg-white print:static">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-none sm:rounded-3xl shadow-2xl w-full max-w-[1400px] overflow-hidden flex flex-col h-full print:h-auto print:w-auto print:shadow-none print:rounded-none"
      >
        {/* Floating Tools - Hidden on Print */}
        <div className="absolute top-6 aspect-auto right-1/2 translate-x-1/2 sm:translate-x-0 sm:right-6 sm:top-6 z-[60] flex items-center gap-2 print:hidden bg-white/80 backdrop-blur-xl p-2 rounded-2xl shadow-xl border border-slate-200/60 max-w-[90vw] overflow-x-auto">
          <div className="flex items-center gap-2 px-2 shrink-0">
            {['#1e293b', '#2563eb', '#dc2626', '#059669'].map(color => (
              <button
                key={color}
                onClick={() => setPenColor(color)}
                className={`w-5 h-5 rounded-full transition-transform hover:scale-110 ${penColor === color ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-200 scale-110 shadow-sm' : ''}`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <div className="w-px h-6 bg-slate-200 mx-1 shrink-0" />
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => setSelectedTool('pencil')}
              className={`p-2 rounded-xl transition-all hover:scale-110 ${selectedTool === 'pencil' ? 'bg-emerald-500 text-white shadow-md' : 'text-slate-500 hover:bg-slate-100'}`}
              title="Pen"
            >
              <Pencil size={16} />
            </button>
            <button
              onClick={() => setSelectedTool('text')}
              className={`p-2 rounded-xl transition-all hover:scale-110 ${selectedTool === 'text' ? 'bg-emerald-500 text-white shadow-md' : 'text-slate-500 hover:bg-slate-100'}`}
              title="Text"
            >
              <Type size={16} />
            </button>
            <button
              onClick={() => setSelectedTool('shape')}
              className={`p-2 rounded-xl transition-all hover:scale-110 ${selectedTool === 'shape' ? 'bg-emerald-500 text-white shadow-md' : 'text-slate-500 hover:bg-slate-100'}`}
              title="Shape"
            >
              <Square size={16} />
            </button>
          </div>
          <div className="w-px h-6 bg-slate-200 mx-1 shrink-0" />
          <div className="flex items-center gap-1 shrink-0">
            <button onClick={undo} disabled={history.length === 0} className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition disabled:opacity-30">
              <RotateCcw size={16} />
            </button>
            <button onClick={clearCanvas} className="p-2 text-slate-500 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition">
              <Eraser size={16} />
            </button>
          </div>
          <div className="w-px h-6 bg-slate-200 mx-1 shrink-0" />
          <div className="flex items-center gap-1 pl-1 shrink-0">
            <button onClick={handlePrint} className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition shadow-md flex items-center gap-2">
              <Printer size={14} /> PRINT
            </button>
            <button onClick={onClose} className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition">
              <X size={18} />
            </button>
          </div>
        </div>
        
        {/* Main Content Area */}
        <div className="flex-1 flex overflow-hidden bg-slate-50 print:block print:bg-white relative">
          {/* A4 Page Container */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-12 md:p-16 flex justify-center bg-slate-50/50 print:p-0 print:bg-white">
            <div className="bg-white w-full max-w-[210mm] min-h-[297mm] shadow-xl border border-slate-200/60 p-[15mm] flex flex-col relative print:shadow-none print:border-none print:max-w-none print:w-full print:min-h-0 print:p-[10mm]">
              
              {/* Header Section */}
              <div className="flex justify-between items-start mb-8 border-b-2 border-emerald-900/10 pb-8">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-emerald-900 rounded-full flex items-center justify-center text-emerald-50 shadow-inner">
                    <Stethoscope size={40} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h1 className="text-4xl font-serif text-emerald-950 font-bold tracking-tight mb-1">Dr. Samim Ahamed</h1>
                    <p className="text-sm font-semibold text-emerald-700 tracking-[0.1em] mb-1">B.H.M.S. (C.U.) | HOMEOPATHIC PHYSICIAN</p>
                    <p className="text-[11px] font-medium text-slate-500 uppercase tracking-widest">HomeoDesk Clinic & Research Center</p>
                  </div>
                </div>
                <div className="text-right flex flex-col justify-end space-y-1.5">
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full ml-auto mb-2 tracking-widest uppercase">
                    <Activity size={12} className="text-emerald-600" />
                    <span>Reg No: WB/2024/00123</span>
                  </div>
                  <p className="text-xs font-medium text-slate-600 tracking-tight">Ph: +91 9876543210</p>
                  <p className="text-xs font-medium text-slate-600 tracking-tight">Email: dr.samim@homeodesk.pro</p>
                  <p className="text-xs font-medium text-slate-600 tracking-tight">Kolkata, West Bengal, India</p>
                </div>
              </div>

              {/* Patient Info Grid */}
              <div className="flex flex-wrap items-end gap-x-8 gap-y-6 text-sm mb-10 pb-6 border-b border-slate-200">
                <div className="flex items-end gap-2 flex-1 min-w-[200px]">
                  <span className="font-bold text-slate-500 uppercase tracking-widest text-[10px] mb-0.5">Patient Name</span>
                  <span className="font-bold text-slate-900 border-b border-dotted border-slate-400 pb-0.5 flex-1">{patient.name}</span>
                </div>
                <div className="flex items-end gap-2">
                  <span className="font-bold text-slate-500 uppercase tracking-widest text-[10px] mb-0.5">Age</span>
                  <span className="font-bold text-slate-900 border-b border-dotted border-slate-400 pb-0.5 text-center px-2">{patient.age} Y</span>
                </div>
                <div className="flex items-end gap-2">
                  <span className="font-bold text-slate-500 uppercase tracking-widest text-[10px] mb-0.5">Gender</span>
                  <span className="font-bold text-slate-900 border-b border-dotted border-slate-400 pb-0.5 text-center px-2">{patient.gender}</span>
                </div>
                <div className="flex items-end gap-2">
                  <span className="font-bold text-slate-500 uppercase tracking-widest text-[10px] mb-0.5">Date</span>
                  <span className="font-bold text-slate-900 border-b border-dotted border-slate-400 pb-0.5 text-center px-2">{new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                </div>
              </div>

              {/* Main Content Grid */}
              <div className="flex-1 flex gap-10">
                {/* Left Column: Symptoms/Findings */}
                <div className="w-[32%] border-r-2 border-emerald-900/5 pr-8 space-y-10">
                  <div>
                    <h4 className="text-[11px] font-bold text-emerald-900 bg-emerald-50 px-3 py-1.5 rounded uppercase tracking-[0.2em] mb-4 inline-block">
                      Clinical Notes
                    </h4>
                    <div className="space-y-4 pl-1">
                      {initialAnalysis && initialAnalysis.length > 0 ? (
                        initialAnalysis.map((item, idx) => (
                          <div key={idx} className="text-xs font-medium text-slate-700 leading-relaxed border-l-2 border-emerald-200 pl-3">
                            {item.text}
                          </div>
                        ))
                      ) : (
                        [1, 2, 3, 4, 5].map(i => (
                          <div key={i} className="h-6 border-b border-slate-200 border-dotted" />
                        ))
                      )}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-[11px] font-bold text-emerald-900 bg-emerald-50 px-3 py-1.5 rounded uppercase tracking-[0.2em] mb-4 inline-block">
                      Vitals & Findings
                    </h4>
                    <div className="space-y-4 pl-1">
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} className="h-6 border-b border-slate-200 border-dotted" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: Rx Area */}
                <div className="flex-1 relative flex flex-col pl-2">
                  {/* Rx Symbol */}
                  <div className="mb-4">
                    <span className="text-6xl font-serif font-bold text-emerald-900 italic select-none">Rx</span>
                  </div>

                  {/* Canvas Area */}
                  <div className="flex-1 relative z-10 w-full rounded-xl overflow-hidden group">
                    <canvas
                      ref={canvasRef}
                      onMouseDown={startDrawing}
                      onMouseUp={stopDrawing}
                      onMouseMove={draw}
                      onMouseOut={stopDrawing}
                      onTouchStart={startDrawing}
                      onTouchEnd={stopDrawing}
                      onTouchMove={draw}
                      className={`w-full h-full touch-none relative z-10 ${selectedTool === 'pencil' ? 'cursor-crosshair' : 'cursor-default'}`}
                    />
                    {previewShape && (
                      <div 
                        className="absolute pointer-events-none z-20 border-2"
                        style={{
                          left: previewShape.x,
                          top: previewShape.y,
                          width: previewShape.w,
                          height: previewShape.h,
                          borderColor: penColor
                        }}
                      />
                    )}
                    {/* Subtle Grid Lines for Canvas */}
                    <div className="absolute inset-0 pointer-events-none opacity-[0.05]" 
                      style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '30px 30px' }} 
                    />
                    {/* Writing baseline rules */}
                    <div className="absolute inset-0 pointer-events-none opacity-[0.04] bg-[length:100%_30px] bg-[linear-gradient(transparent_29px,#000_30px)]" />
                  </div>
                </div>
              </div>

              {/* Footer Section */}
              <div className="mt-12 pt-8 border-t-2 border-emerald-900/10">
                <div className="flex flex-col md:flex-row justify-between items-end gap-12">
                  <div className="flex-1 w-full max-w-lg">
                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Advice & Instructions</h4>
                    <textarea 
                      value={advice}
                      onChange={(e) => setAdvice(e.target.value)}
                      placeholder="Enter diet, restrictions, or special instructions here..."
                      className="w-full bg-slate-50 rounded-xl p-4 text-xs font-medium text-slate-700 border border-transparent focus:border-emerald-300 focus:bg-white focus:outline-none transition-all resize-none h-28 print:bg-white print:border-none print:p-0 print:h-auto print:resize-none"
                    />
                  </div>
                  <div className="text-center min-w-[220px]">
                    <div className="h-20 flex items-center justify-center italic text-slate-300 font-serif text-2xl select-none">
                      {/* Space for actual signature */}
                      Signature
                    </div>
                    <div className="w-full border-b border-slate-900 mb-2" />
                    <p className="text-[10px] font-bold text-slate-900 uppercase tracking-widest">Dr. Samim Ahamed</p>
                    <p className="text-[9px] font-medium text-slate-500 uppercase tracking-widest mt-0.5">Consultant Homeopath</p>
                  </div>
                </div>
                
                <div className="mt-12 text-center pb-2">
                  <p className="text-[9px] font-bold text-emerald-800/40 uppercase tracking-[0.4em]">Thank you for choosing HomeoDesk Clinic</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const PatientDetailsCanvas = ({ 
  patient, 
  onClose, 
  onNext, 
  onPrevious,
  onSave
}: { 
  patient: Patient, 
  onClose: () => void,
  onNext?: () => void,
  onPrevious?: () => void,
  onSave: (updatedPatient: Patient) => void
}) => {
  const [activeTab, setActiveTab] = useState<'chief' | 'mental' | 'physical' | 'analysis'>('chief');
  const [chiefSymptoms, setChiefSymptoms] = useState<ChiefSymptom[]>([]);
  const [mentalSymptoms, setMentalSymptoms] = useState<string[]>([]);
  const [physicalGeneralsState, setPhysicalGeneralsState] = useState<PhysicalGeneral[]>([]);
  const [caseAnalysis, setCaseAnalysis] = useState('');

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
    { label: "Time", icon: <Clock size={14} />, placeholder: "Aggravation/Amelioration time..." },
    { label: "Temperature", icon: <Thermometer size={14} />, placeholder: "Sun, summer, winter, air..." },
    { label: "Physiological", icon: <Activity size={14} />, placeholder: "Urination, menses, breathing..." },
    { label: "Position", icon: <Move size={14} />, placeholder: "Lying, walking, standing..." },
    { label: "Pathological", icon: <AlertCircle size={14} />, placeholder: "Hemorrhage, injury, etc..." },
    { label: "Physical Factors", icon: <Zap size={14} />, placeholder: "Pressure, light, noise..." },
    { label: "Discharges", icon: <Droplets size={14} />, placeholder: "Character, color, odor..." },
    { label: "Sides", icon: <ArrowRightLeft size={14} />, placeholder: "Right, left, diagonal..." },
    { label: "Alterations", icon: <RefreshCw size={14} />, placeholder: "Alternating symptoms..." },
    { label: "Craving/Aversion", icon: <Utensils size={14} />, placeholder: "Food desires/dislikes..." }
  ];

  useEffect(() => {
    setChiefSymptoms(patient.chiefSymptoms || Array(5).fill({ complaint: '', location: '', sensation: '', modality: '', concomitant: '' }));
    setMentalSymptoms(patient.mentalSymptoms || Array(5).fill(''));
    setPhysicalGeneralsState(patient.physicalGenerals || physicalGeneralsMeta.map(m => ({ label: m.label, value: '' })));
    setCaseAnalysis(patient.caseAnalysis || '');
  }, [patient]);

  const handleSave = () => {
    const updatedPatient: Patient = {
      ...patient,
      chiefSymptoms,
      mentalSymptoms,
      physicalGenerals: physicalGeneralsState,
      caseAnalysis
    };
    onSave(updatedPatient);
    onClose();
  };

  const updateChiefSymptom = (idx: number, field: keyof ChiefSymptom, value: string) => {
    const newSymptoms = [...chiefSymptoms];
    newSymptoms[idx] = { ...newSymptoms[idx], [field]: value };
    setChiefSymptoms(newSymptoms);
  };

  const updateMentalSymptom = (idx: number, value: string) => {
    const newSymptoms = [...mentalSymptoms];
    newSymptoms[idx] = value;
    setMentalSymptoms(newSymptoms);
  };

  const updatePhysicalGeneral = (idx: number, value: string) => {
    const newGenerals = [...physicalGeneralsState];
    newGenerals[idx] = { ...newGenerals[idx], value };
    setPhysicalGeneralsState(newGenerals);
  };

  const analysisResults = useMemo(() => {
    if (!patient.coreRubrics || patient.coreRubrics.length === 0) return [];
    
    const remedyMap: { [key: string]: { 
      name: string, 
      score: number, 
      coverage: number
    } } = {};

    patient.coreRubrics.forEach((item) => {
      item.remedies.forEach(r => {
        if (!remedyMap[r.n]) {
          remedyMap[r.n] = {
            name: r.n,
            score: 0,
            coverage: 0
          };
        }
        
        const points = r.g === 1 ? 3 : (r.g === 2 ? 2 : 1);
        remedyMap[r.n].score += points;
        remedyMap[r.n].coverage += 1;
      });
    });

    return Object.values(remedyMap)
      .sort((a, b) => b.score - a.score || b.coverage - a.coverage)
      .slice(0, 5);
  }, [patient.coreRubrics]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-0 sm:p-2 md:p-4 print:p-0 print:bg-white print:static"
    >
      <motion.div 
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white w-full max-w-[1400px] h-full rounded-none sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col print:h-auto print:w-full print:shadow-none print:rounded-none"
      >
        {/* Header - Professional Medical Style */}
        <div className="p-8 border-b border-slate-100 bg-white relative overflow-hidden print:p-4">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-60 print:hidden" />
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 bg-emerald-600 rounded-[1.5rem] flex items-center justify-center text-white shadow-xl shadow-emerald-200 rotate-3 print:w-12 print:h-12">
                <ClipboardList size={32} className="print:w-6 print:h-6" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight print:text-xl">Clinical Case Record</h2>
                  <div className="flex items-center gap-2 print:hidden">
                    {onPrevious && (
                      <button 
                        onClick={onPrevious}
                        className="p-1.5 hover:bg-slate-100 rounded-xl transition text-slate-400 hover:text-slate-900"
                        title="Previous Patient"
                      >
                        <ChevronLeft size={18} />
                      </button>
                    )}
                    {onNext && (
                      <button 
                        onClick={onNext}
                        className="p-1.5 hover:bg-slate-100 rounded-xl transition text-slate-400 hover:text-slate-900"
                        title="Next Patient"
                      >
                        <ChevronRight size={18} />
                      </button>
                    )}
                  </div>
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-full print:hidden">Official Document</span>
                </div>
                <div className="flex items-center gap-4 text-slate-400 text-xs font-bold">
                  <span className="flex items-center gap-1.5"><Users size={14} /> {patient.name}</span>
                  <div className="w-1 h-1 bg-slate-200 rounded-full" />
                  <span className="flex items-center gap-1.5"><Database size={14} /> ID: {patient.id}</span>
                  <div className="w-1 h-1 bg-slate-200 rounded-full" />
                  <span className="flex items-center gap-1.5"><Calendar size={14} /> {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 print:hidden">
              <button 
                onClick={() => window.print()}
                className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-xs font-black hover:bg-slate-800 transition shadow-xl shadow-slate-200 group"
              >
                <Printer size={16} className="group-hover:scale-110 transition-transform" />
                EXPORT AS PDF
              </button>
              <button 
                onClick={onClose}
                className="p-3 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-2xl transition"
              >
                <X size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs - Hidden on Print */}
        <div className="px-8 py-4 bg-slate-50/50 border-b border-slate-100 flex gap-2 overflow-x-auto custom-scrollbar print:hidden">
          {[
            { id: 'chief', label: 'Chief Symptoms', icon: <Plus size={14} />, count: 5 },
            { id: 'mental', label: 'Mental State', icon: <Brain size={14} />, count: 5 },
            { id: 'physical', label: 'Physical Generals', icon: <Activity size={14} />, count: 10 },
            { id: 'analysis', label: 'Case Analysis', icon: <FlaskConical size={14} />, count: null }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black transition-all whitespace-nowrap ${
                activeTab === tab.id 
                  ? 'bg-white text-emerald-600 shadow-sm border border-emerald-100' 
                  : 'text-slate-400 hover:text-slate-600 hover:bg-white/50'
              }`}
            >
              {tab.icon}
              {tab.label}
              {tab.count && <span className={`ml-1 px-1.5 py-0.5 rounded-md text-[9px] ${activeTab === tab.id ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-500'}`}>{tab.count}</span>}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-white print:overflow-visible print:p-0">
          <div className="max-w-5xl mx-auto space-y-16 print:space-y-8">
            
            {/* Case Summary Section */}
            {(patient.remedy || patient.coreRubrics) && (
              <section className="bg-slate-50 rounded-[2.5rem] p-8 border border-slate-100 print:p-4 print:bg-white print:border-slate-200">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-1 space-y-6">
                    <div>
                      <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <BookmarkCheck size={16} className="text-emerald-600" />
                        Active Selection
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {patient.coreRubrics?.map((rubric, i) => (
                          <span key={i} className="px-3 py-1.5 bg-white text-slate-700 text-[10px] font-bold rounded-lg border border-slate-200 shadow-sm">
                            {rubric.text}
                          </span>
                        ))}
                      </div>
                    </div>
                    {patient.notes && (
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Clinical Notes</p>
                        <p className="text-xs text-slate-600 leading-relaxed font-medium bg-white p-4 rounded-2xl border border-slate-100">
                          {patient.notes}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="md:w-64 space-y-4">
                    <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Prescribed Remedy</p>
                      <p className="text-lg font-black text-emerald-700">{patient.remedy || 'Not set'}</p>
                      <div className="mt-4 pt-4 border-t border-slate-50 flex justify-between items-center">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Potency</span>
                        <span className="text-xs font-black text-slate-900">{patient.currentPotency || 'N/A'}</span>
                      </div>
                    </div>
                    <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Case Status</p>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${patient.caseStatus === 'Improving' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                        <p className="text-sm font-black text-slate-800">{patient.caseStatus || 'Active'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Chief (Chip) Symptoms Section */}
            <section className={activeTab === 'chief' ? 'block' : 'hidden print:block'}>
              <div className="flex items-center justify-between mb-8 print:mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                    <Plus size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Chief (Chip) Symptoms</h3>
                    <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest">প্রধান লক্ষণসমূহ (L/S/M/C)</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6 print:space-y-4">
                {chiefSymptoms.map((symptom, i) => (
                  <div key={i} className="group p-8 bg-slate-50/50 rounded-[2rem] border-2 border-transparent hover:border-emerald-100 hover:bg-white hover:shadow-2xl hover:shadow-emerald-100/20 transition-all duration-500 print:p-4 print:bg-white print:border-slate-200 print:rounded-xl">
                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="md:w-1/4 space-y-4">
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 bg-emerald-600 text-white rounded-lg flex items-center justify-center text-xs font-black shadow-lg shadow-emerald-200">
                            {i + 1}
                          </span>
                          <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Complaint</h4>
                        </div>
                        <div className="relative">
                          <input 
                            type="text" 
                            list={`canvas-complaint-options-${i}`}
                            placeholder="Enter main complaint..." 
                            value={symptom.complaint}
                            onChange={(e) => updateChiefSymptom(i, 'complaint', e.target.value)}
                            className="w-full bg-white border-b-2 border-slate-200 focus:border-emerald-500 outline-none py-2 pr-8 text-sm font-black text-slate-800 placeholder:text-slate-300 transition-colors print:border-slate-100"
                          />
                          <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-emerald-500 pointer-events-none" />
                          <datalist id={`canvas-complaint-options-${i}`}>
                            {COMPLAINT_OPTIONS.map(opt => <option key={opt} value={opt} />)}
                          </datalist>
                        </div>
                        <div className="mt-2 print:hidden">
                          <select 
                            className="w-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-lg px-3 py-1.5 outline-none border border-emerald-100 cursor-pointer hover:bg-emerald-100 transition-all"
                            onChange={(e) => {
                              if (e.target.value) {
                                const current = symptom.complaint;
                                const newValue = current ? `${current}, ${e.target.value}` : e.target.value;
                                updateChiefSymptom(i, 'complaint', newValue);
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
                      </div>
                      
                      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                          { label: 'Location (L)', field: 'location', placeholder: 'Where is it felt?', color: 'emerald', options: LOCATION_OPTIONS },
                          { label: 'Sensation (S)', field: 'sensation', placeholder: 'Burning, stitching...', color: 'blue', options: SENSATION_OPTIONS },
                          { label: 'Modality (M)', field: 'modality', placeholder: '< Agg / > Amel', color: 'amber', options: MODALITY_OPTIONS },
                          { label: 'Concomitant (C)', field: 'concomitant', placeholder: 'Associated symptoms', color: 'rose', options: CONCOMITANT_OPTIONS }
                        ].map((field) => (
                          <div key={field.label} className="space-y-2">
                            <label className={`text-[9px] font-black text-slate-400 uppercase tracking-widest`}>{field.label}</label>
                            <div className="relative group/field">
                              <div className="relative">
                                <input 
                                  list={`canvas-${field.field}-options-${i}`}
                                  className="w-full p-4 pr-10 rounded-2xl bg-white border border-slate-100 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none text-xs font-bold text-slate-600 transition-all print:border-slate-100"
                                  placeholder={field.placeholder}
                                  value={symptom[field.field as keyof ChiefSymptom]}
                                  onChange={(e) => updateChiefSymptom(i, field.field as keyof ChiefSymptom, e.target.value)}
                                />
                                <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-500 pointer-events-none" />
                              </div>
                              <datalist id={`canvas-${field.field}-options-${i}`}>
                                {field.options.map(opt => <option key={opt} value={opt} />)}
                              </datalist>
                              
                              <div className="mt-2 print:hidden">
                                <select 
                                  className={`w-full bg-${field.color}-50 text-${field.color}-600 text-[10px] font-black uppercase tracking-widest rounded-lg px-3 py-1.5 outline-none border border-${field.color}-100 cursor-pointer hover:bg-${field.color}-100 transition-all`}
                                  onChange={(e) => {
                                    if (e.target.value) {
                                      const current = symptom[field.field as keyof ChiefSymptom];
                                      const newValue = current ? `${current}, ${e.target.value}` : e.target.value;
                                      updateChiefSymptom(i, field.field as keyof ChiefSymptom, newValue);
                                      e.target.value = ""; 
                                    }
                                  }}
                                >
                                  <option value="">+ Quick Add {field.label.split(' ')[0]}</option>
                                  {field.options.map(opt => (
                                    <option key={opt} value={opt}>{opt}</option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Mental Symptoms Section */}
            <section className={activeTab === 'mental' ? 'block pt-16 border-t border-slate-50' : 'hidden print:block'}>
              <div className="flex items-center gap-3 mb-8 print:mb-4">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                  <Brain size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Psychological State (Mental)</h3>
                  <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest">মানসিক লক্ষণসমূহ</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 print:grid-cols-2">
                {mentalSymptoms.map((symptom, i) => (
                  <div key={i} className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black text-slate-300">0{i + 1}</span>
                      <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Symptom Box</label>
                    </div>
                    <textarea 
                      className="w-full h-48 p-5 rounded-[1.5rem] bg-blue-50/30 border-2 border-transparent focus:border-blue-200 focus:bg-white outline-none text-xs font-bold text-slate-700 resize-none transition-all shadow-sm print:h-32 print:bg-white print:border-slate-100"
                      placeholder="Emotions, intellect, memory, fears..."
                      value={symptom}
                      onChange={(e) => updateMentalSymptom(i, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Physical Generals Section */}
            <section className={activeTab === 'physical' ? 'block pt-16 border-t border-slate-50' : 'hidden print:block'}>
              <div className="flex items-center gap-3 mb-8 print:mb-4">
                <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
                  <Activity size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Physical General Symptoms</h3>
                  <p className="text-[10px] text-amber-600 font-bold uppercase tracking-widest">শারীরিক সাধারণ লক্ষণসমূহ</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 print:grid-cols-2">
                {physicalGeneralsMeta.map((pg, i) => (
                  <div key={i} className="group space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-white border border-slate-100 rounded-lg flex items-center justify-center text-amber-500 shadow-sm group-hover:bg-amber-500 group-hover:text-white transition-colors">
                        {pg.icon}
                      </div>
                      <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{pg.label}</label>
                    </div>
                    <textarea 
                      className="w-full h-36 p-5 rounded-[1.5rem] bg-amber-50/30 border-2 border-transparent focus:border-amber-200 focus:bg-white outline-none text-xs font-bold text-slate-700 resize-none transition-all shadow-sm print:h-24 print:bg-white print:border-slate-100"
                      placeholder={pg.placeholder}
                      value={physicalGeneralsState[i]?.value || ''}
                      onChange={(e) => updatePhysicalGeneral(i, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Totality & Analysis Section */}
            <section className={activeTab === 'analysis' ? 'block pt-16 border-t border-slate-50 pb-12' : 'hidden print:block'}>
              <div className="flex items-center gap-3 mb-8 print:mb-4">
                <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white">
                  <FlaskConical size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Case Totality & Analysis</h3>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">কেস টোটালিটি এবং বিশ্লেষণ</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
                <div>
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <TrendingUp size={14} className="text-emerald-500" />
                    Repertorization Summary
                  </h4>
                  <div className="bg-slate-50 rounded-3xl border border-slate-100 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-100/50">
                          <th className="px-6 py-4 text-[9px] font-black text-slate-500 uppercase tracking-widest">Remedy</th>
                          <th className="px-6 py-4 text-[9px] font-black text-slate-500 uppercase tracking-widest text-center">Score</th>
                          <th className="px-6 py-4 text-[9px] font-black text-slate-500 uppercase tracking-widest text-center">Coverage</th>
                          <th className="px-6 py-4 text-[9px] font-black text-slate-500 uppercase tracking-widest text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {analysisResults.length > 0 ? (
                          analysisResults.map((res, i) => (
                            <tr key={res.name} className={`hover:bg-white transition-colors ${patient.remedy === res.name ? 'bg-emerald-50/50' : ''}`}>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                  {patient.remedy === res.name && <BookmarkCheck size={12} className="text-emerald-600" />}
                                  <span className={`text-xs font-black ${patient.remedy === res.name ? 'text-emerald-700' : 'text-slate-900'}`}>{res.name}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-center">
                                <span className={`px-2 py-1 text-[10px] font-black rounded-md ${patient.remedy === res.name ? 'bg-emerald-100 text-emerald-800' : 'bg-emerald-50 text-emerald-700'}`}>{res.score}</span>
                              </td>
                              <td className="px-6 py-4 text-center">
                                <span className="text-xs font-bold text-slate-600">{res.coverage}/{patient.coreRubrics?.length}</span>
                              </td>
                              <td className="px-6 py-4 text-right">
                                <button 
                                  onClick={() => onSave({ ...patient, remedy: res.name })}
                                  className={`p-1.5 rounded-lg transition-all ${patient.remedy === res.name ? 'text-emerald-600 bg-emerald-100' : 'text-slate-300 hover:text-emerald-600 hover:bg-emerald-50'}`}
                                >
                                  {patient.remedy === res.name ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={3} className="px-6 py-12 text-center">
                              <p className="text-xs font-bold text-slate-400 italic">No analysis data available.</p>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <FileText size={14} className="text-blue-500" />
                    Clinical Synthesis
                  </h4>
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-[2.5rem] blur opacity-10 group-hover:opacity-20 transition duration-1000 print:hidden" />
                    <textarea 
                      className="relative w-full h-64 p-10 rounded-[2.5rem] bg-slate-50 border-2 border-slate-100 focus:border-slate-900 focus:bg-white outline-none text-base font-medium text-slate-800 leading-relaxed resize-none transition-all print:h-auto print:p-4 print:border-slate-200"
                      placeholder="Synthesize the case findings, determine the totality, and outline the therapeutic plan..."
                      value={caseAnalysis}
                      onChange={(e) => setCaseAnalysis(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Footer - Professional Branding */}
        <div className="p-8 border-t border-slate-100 bg-slate-50 flex flex-col md:flex-row justify-between items-center gap-6 print:p-4 print:bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm border border-slate-100">
              <Stethoscope size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest">HomeoDesk Pro</p>
              <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">Clinical Intelligence System v2.0</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 print:hidden">
            <button 
              onClick={onClose}
              className="px-8 py-3 text-slate-500 text-xs font-black uppercase tracking-widest hover:bg-slate-100 rounded-2xl transition"
            >
              Discard
            </button>
            <button 
              onClick={handleSave}
              className="px-10 py-3 bg-emerald-600 text-white text-xs font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-emerald-200 hover:bg-emerald-700 transition transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Save Record
            </button>
          </div>

          <div className="hidden print:block text-right">
            <p className="text-[10px] font-black text-slate-900 uppercase">Authorized Signature</p>
            <div className="w-48 h-px bg-slate-900 mt-8 ml-auto" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

