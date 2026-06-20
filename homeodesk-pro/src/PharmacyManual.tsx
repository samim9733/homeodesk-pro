import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FlaskConical, Search, Book, ChevronRight } from 'lucide-react';

interface PharmacyManualEntry {
  id: string;
  name: string;
  description: string;
  uses: string[];
  preparation: string;
  potencies: string[];
}

const PHARMACY_MANUAL_DATA: PharmacyManualEntry[] = [
  {
    id: 'pm-1',
    name: 'Nux Vomica',
    description: 'The Poison Nut - prepared from the seeds of Strychnos nux-vomica.',
    uses: ['Digestive complaints', 'Headache from overindulgence', 'Constipation', 'Irritability', 'Hangover'],
    preparation: 'Mother tincture from seeds. Trituration process for solid forms.',
    potencies: ['6C', '12C', '30C', '200C', '1M', 'Q (LM)'],
  },
  {
    id: 'pm-2',
    name: 'Pulsatilla',
    description: 'Wind Flower - prepared from the fresh plant of Anemone pulsatilla.',
    uses: ['Colds with thick yellow discharge', 'Changeable symptoms', 'Weeping disposition', 'Thirstless fever', 'Menstrual irregularities'],
    preparation: 'Mother tincture from whole fresh plant in flowering stage.',
    potencies: ['6C', '12C', '30C', '200C', '1M'],
  },
  {
    id: 'pm-3',
    name: 'Sulphur',
    description: 'Sublimated Sulphur - one of Hahnemann\'s greatest polychrests.',
    uses: ['Skin diseases', 'Burning sensations', 'Diarrhea', 'Constipation', 'Eczema', 'Psoriasis'],
    preparation: 'Triturated with sugar of milk for solid forms. Solution form from purified sulphur.',
    potencies: ['6X', '12X', '30C', '200C', '1M', '10M'],
  },
];

export function PharmacyManual() {
  const [search, setSearch] = useState('');
  const [selectedEntry, setSelectedEntry] = useState<string | null>(null);

  const filtered = PHARMACY_MANUAL_DATA.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.description.toLowerCase().includes(search.toLowerCase())
  );

  const current = PHARMACY_MANUAL_DATA.find(e => e.id === selectedEntry);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Pharmacy Manual</h2>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Remedy preparation & reference</p>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          placeholder="Search remedies..."
        />
      </div>

      {!current ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(entry => (
            <motion.div
              key={entry.id}
              whileHover={{ scale: 1.01 }}
              onClick={() => setSelectedEntry(entry.id)}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 cursor-pointer hover:border-slate-300 transition"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <FlaskConical size={18} className="text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">{entry.name}</h3>
                  <p className="text-[9px] text-slate-400">{entry.uses.length} clinical uses</p>
                </div>
              </div>
              <p className="text-xs text-slate-500 line-clamp-2">{entry.description}</p>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-emerald-700 to-slate-900 text-white flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black uppercase tracking-tight">{current.name}</h3>
              <p className="text-sm text-emerald-200">{current.description}</p>
            </div>
            <button onClick={() => setSelectedEntry(null)} className="p-2 hover:bg-white/10 rounded-xl transition text-xs font-bold">
              ← Back
            </button>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Clinical Uses</h4>
              <div className="flex flex-wrap gap-1">
                {current.uses.map(u => (
                  <span key={u} className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded">{u}</span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Preparation</h4>
              <p className="text-xs text-slate-600">{current.preparation}</p>
            </div>
            <div>
              <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Available Potencies</h4>
              <div className="flex flex-wrap gap-1">
                {current.potencies.map(p => (
                  <span key={p} className="text-[10px] font-bold bg-slate-50 text-slate-700 px-2 py-0.5 rounded">{p}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
