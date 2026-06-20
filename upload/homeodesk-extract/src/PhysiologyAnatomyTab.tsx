import React, { useState } from 'react';
import { Microscope, BookOpen, Quote, ChevronRight, Stethoscope , Brain, Activity, Zap, Utensils, Bone, ArrowRight, Edit} from 'lucide-react';
import { PHYSIOLOGY_ANATOMY_DATA, KnowledgeTopic } from './medicalData';

export const PhysiologyAnatomyTab = ({ 
  anatomySystems, 
  setAnatomySystems,
  onEditImage
}: { 
  anatomySystems: typeof PHYSIOLOGY_ANATOMY_DATA, 
  setAnatomySystems: React.Dispatch<React.SetStateAction<typeof PHYSIOLOGY_ANATOMY_DATA>>,
  onEditImage: (id: string) => void
}) => {
  const [selectedSystem, setSelectedSystem] = useState<typeof PHYSIOLOGY_ANATOMY_DATA[0]>(anatomySystems[0]);

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      {/* Vitals HUD */}
      <section className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] mb-2 block">Section Overview</span>
          <h3 className="text-4xl font-black text-slate-900 tracking-tight">
            Physiology & Anatomy / <span className="text-emerald-600">শরীরবিদ্যা ও শারীরস্থান</span>
          </h3>
        </div>
        <div className="flex gap-4">
          <div className="text-right">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Active Filters</p>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black rounded-full border border-emerald-100 uppercase tracking-wider">Clinical</span>
              <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black rounded-full border border-blue-100 uppercase tracking-wider">Homeopathic Link</span>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid: Body Systems */}
      <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {anatomySystems.map((system, index) => {
          const isLarge = index === 0 || index === 3; // Make some cards larger for bento feel
          return (
            <div 
              key={system.id}
              onClick={() => setSelectedSystem(system)}
              className={`${isLarge ? 'md:col-span-2' : 'col-span-1'} group cursor-pointer bg-white p-6 rounded-3xl border border-slate-100 shadow-sm transition-all hover:shadow-xl hover:shadow-emerald-500/5 hover:-translate-y-1 relative overflow-hidden`}
            >
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div>
                  <h4 className="font-black text-xl text-slate-900 tracking-tight">{system.name}</h4>
                  <p className="text-emerald-600 font-bold text-sm">{system.banglaName}</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                  {system.id === 'nervous_system' ? <Brain size={24} /> : 
                   system.id === 'circulatory' ? <Activity size={24} /> :
                   system.id === 'respiratory_system' ? <Zap size={24} /> :
                   system.id === 'digestive_system' ? <Utensils size={24} /> :
                   system.id === 'skeletal' ? <Bone size={24} /> : <Microscope size={24} />}
                </div>
              </div>
              
              <div className={`rounded-2xl overflow-hidden mb-4 bg-slate-50 ${isLarge ? 'aspect-[21/9]' : 'aspect-square'}`}>
                <img 
                  src={system.image} 
                  alt={system.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">{system.description}</p>
              
              <div className="mt-6 flex items-center justify-between">
                <div className="flex gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600">{system.details.length} Rubrics</span>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-300">•</span>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Critical System</span>
                </div>
                <ArrowRight size={16} className="text-slate-300 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          );
        })}
      </section>

      {/* Detailed Structure View */}
      {selectedSystem && (
        <section className="flex flex-col lg:flex-row gap-12 pt-8 border-t border-slate-100">
          <div className="flex-1 space-y-8">
            <div>
              <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] mb-2 block">Deep Dive Analysis</span>
              <h3 className="text-5xl font-black text-slate-900 leading-tight tracking-tighter">
                The Anatomy of the {selectedSystem.name.replace(' System', '')}<br/>
                <span className="text-emerald-600 text-2xl font-bold">{selectedSystem.banglaName}</span>
              </h3>
            </div>
            
            <div className="space-y-6">
              <p className="text-lg text-slate-600 leading-relaxed">
                {selectedSystem.description}
              </p>
              <p className="text-slate-500 italic">
                {selectedSystem.banglaDescription}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedSystem.details.map((detail, i) => (
                  <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-sm font-bold text-slate-800 mb-1">{detail}</p>
                    <p className="text-xs text-slate-400">{selectedSystem.banglaDetails[i]}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Rubric Integration Cards */}
            <div className="space-y-4 pt-4">
              <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Relevant Homeopathic Rubrics</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white border-l-4 border-emerald-500 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer group">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-black text-slate-900 group-hover:text-emerald-600 transition-colors">{selectedSystem.name}: Clinical Pathologies</p>
                      <p className="text-xs text-slate-400 mt-1">ক্লিনিক্যাল প্যাথলজি</p>
                    </div>
                    <span className="bg-emerald-50 text-emerald-600 px-2 py-1 rounded-lg text-[10px] font-black uppercase">42 Remedies</span>
                  </div>
                </div>
                <div className="bg-white border-l-4 border-blue-500 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer group">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-black text-slate-900 group-hover:text-blue-600 transition-colors">Constitutional: {selectedSystem.name} Weakness</p>
                      <p className="text-xs text-slate-400 mt-1">সাংবিধানিক দুর্বলতা</p>
                    </div>
                    <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded-lg text-[10px] font-black uppercase">18 Remedies</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/3">
            <div className="sticky top-8 bg-slate-50 rounded-[2.5rem] p-3 border border-slate-100">
              <div className="aspect-[3/4] rounded-[2rem] overflow-hidden relative group">
                <img 
                  src={selectedSystem.image} 
                  alt={selectedSystem.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                  <p className="text-white/60 text-[10px] font-black uppercase tracking-widest mb-1">Anatomy Figure</p>
                  <p className="text-white font-black text-2xl tracking-tight">{selectedSystem.name} Sectioning</p>
                  <button 
                    onClick={() => onEditImage(selectedSystem.id)}
                    className="mt-4 flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all w-fit"
                  >
                    <Edit size={14} /> Update Diagram
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Anatomy Tag</span>
                  <span className="text-[10px] font-black px-3 py-1 bg-white text-emerald-600 rounded-full shadow-sm border border-slate-100">#SYS-{selectedSystem.id.toUpperCase().slice(0, 3)}</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                    <p className="text-xs font-bold text-slate-700">Primary Structure</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
                    <p className="text-xs font-bold text-slate-700">Connective Tissue</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]"></div>
                    <p className="text-xs font-bold text-slate-700">Neural Interface</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      
      {/* Breathing Room */}
      <div className="h-12"></div>
    </div>
  );
};

