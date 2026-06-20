import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Eye, Edit, Upload, ChevronRight, X, Save } from 'lucide-react';
import { PHYSIOLOGY_ANATOMY_DATA } from './medicalData';
import { AnatomySystem } from './types';

interface PhysiologyAnatomyTabProps {
  anatomySystems: AnatomySystem[];
  setAnatomySystems: React.Dispatch<React.SetStateAction<AnatomySystem[]>>;
  onEditImage: (id: string) => void;
}

export function PhysiologyAnatomyTab({ anatomySystems, setAnatomySystems, onEditImage }: PhysiologyAnatomyTabProps) {
  const [selectedSystem, setSelectedSystem] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const filteredSystems = anatomySystems.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.description.toLowerCase().includes(search.toLowerCase())
  );

  const currentSystem = anatomySystems.find(s => s.id === selectedSystem);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Physiology & Anatomy</h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{anatomySystems.length} Body Systems</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Eye className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          placeholder="Search body systems..."
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Systems List */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden lg:col-span-1">
          <div className="overflow-y-auto max-h-[600px] custom-scrollbar">
            {filteredSystems.map(system => (
              <button
                key={system.id}
                onClick={() => setSelectedSystem(system.id)}
                className={`w-full text-left px-4 py-4 transition border-b border-slate-50 ${
                  selectedSystem === system.id
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${selectedSystem === system.id ? 'bg-white/10' : 'bg-slate-100'}`}>
                    <Heart size={18} className={selectedSystem === system.id ? 'text-white' : 'text-slate-500'} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold">{system.name}</p>
                    <p className={`text-[9px] mt-0.5 ${selectedSystem === system.id ? 'text-slate-400' : 'text-slate-400'}`}>
                      {system.parts?.length || 0} parts
                    </p>
                  </div>
                  <ChevronRight size={14} className={selectedSystem === system.id ? 'text-white' : 'text-slate-300'} />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* System Detail */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden lg:col-span-2">
          {currentSystem ? (
            <>
              <div className="p-6 bg-gradient-to-r from-rose-800 to-slate-900 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-black uppercase tracking-tight">{currentSystem.name}</h3>
                    <p className="text-sm text-slate-300 mt-1">{currentSystem.description}</p>
                  </div>
                  <button
                    onClick={() => onEditImage(currentSystem.id)}
                    className="p-2 bg-white/10 rounded-xl hover:bg-white/20 transition flex items-center gap-1.5 text-[10px] font-bold"
                  >
                    <Edit size={12} /> Edit Image
                  </button>
                </div>
              </div>

              {/* Image */}
              <div className="aspect-video bg-slate-50 flex items-center justify-center relative">
                {currentSystem.image ? (
                  <img src={currentSystem.image} alt={currentSystem.name} className="max-w-full max-h-full object-contain" />
                ) : (
                  <div className="text-center">
                    <Upload size={48} className="mx-auto text-slate-200 mb-2" />
                    <p className="text-xs font-bold text-slate-400">No image uploaded</p>
                    <button onClick={() => onEditImage(currentSystem.id)} className="mt-2 text-[10px] font-bold text-emerald-600 hover:text-emerald-700">
                      Upload Image
                    </button>
                  </div>
                )}
              </div>

              {/* Parts */}
              <div className="p-5">
                <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3">Anatomical Parts</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {currentSystem.parts?.map((part, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-slate-50 rounded-xl p-4 border border-slate-100"
                    >
                      <p className="text-xs font-bold text-slate-900">{part.name}</p>
                      <p className="text-[10px] text-slate-500 mt-1">{part.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
              <Heart size={48} className="mb-3 text-slate-200" />
              <p className="text-xs font-bold uppercase tracking-widest">Select a body system</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
