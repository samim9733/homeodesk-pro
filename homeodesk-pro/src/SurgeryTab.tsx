import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Activity, Search, Eye, Heart, Bone } from 'lucide-react';

export function SurgeryTab() {
  const [search, setSearch] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const surgeryTopics = [
    {
      id: 's1',
      name: 'Homeopathic Management of Surgical Conditions',
      category: 'General',
      description: 'Principles of homeopathic approach to surgical conditions and when to refer.',
      remedies: [
        { name: 'Arnica Montana', indication: 'Pre and post surgical trauma, bruising, swelling' },
        { name: 'Staphysagria', indication: 'Surgical wounds, clean cuts, post-operative pain' },
        { name: 'Calendula', indication: 'Wound healing, prevention of infection, promotes granulation' },
        { name: 'Hypericum', indication: 'Nerve injuries, lacerations, crush injuries' },
        { name: 'Bellis Perennis', indication: 'Deep tissue surgery, abdominal surgery, bruising of deeper tissues' },
      ],
    },
    {
      id: 's2',
      name: 'Pre-operative Preparation',
      category: 'Pre-operative',
      description: 'Homeopathic remedies for preparing patients before surgery.',
      remedies: [
        { name: 'Arnica Montana', indication: 'Given night before and morning of surgery to minimize trauma' },
        { name: 'Gelsemium', indication: 'Pre-surgery anxiety and anticipation' },
        { name: 'Phosphorus', indication: 'Pre-operative bleeding tendency' },
      ],
    },
    {
      id: 's3',
      name: 'Post-operative Recovery',
      category: 'Post-operative',
      description: 'Remedies for recovery and healing after surgical procedures.',
      remedies: [
        { name: 'Arnica', indication: 'First remedy after surgery - shock, bruising, pain' },
        { name: 'Staphysagria', indication: 'Clean incisional pain, urinary retention after surgery' },
        { name: 'Rhus Tox', indication: 'Joint stiffness after surgery, immobilization' },
        { name: 'Ruta Graveolens', indication: 'Periosteal pain, eye surgery recovery' },
        { name: 'China', indication: 'Fluid loss, weakness after surgery' },
      ],
    },
    {
      id: 's4',
      name: 'Wound Healing & Management',
      category: 'Wounds',
      description: 'Homeopathic remedies for various types of wounds and their healing.',
      remedies: [
        { name: 'Calendula', indication: 'Topical and internal for all types of wounds' },
        { name: 'Hypericum', indication: 'Wounds with nerve involvement, shooting pain' },
        { name: 'Ledum', indication: 'Puncture wounds, insect bites, tetanus tendency' },
        { name: 'Silicea', indication: 'Non-healing wounds, splinters, abscesses' },
        { name: 'Lachesis', indication: 'Bites, hemorrhagic wounds' },
      ],
    },
    {
      id: 's5',
      name: 'Conditions to Avoid Surgery',
      category: 'Alternative',
      description: 'Conditions where homeopathic treatment may help avoid surgical intervention.',
      remedies: [
        { name: 'Thuja', indication: 'Warts, polyps, condylomata' },
        { name: 'Calcarea Fluorica', indication: 'Fibroids, hard glands, adhesions' },
        { name: 'Conium', indication: 'Prostatic enlargement, hard indurations' },
        { name: 'Asterias Rubens', indication: 'Breast tumors' },
      ],
    },
  ];

  const filtered = surgeryTopics.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.category.toLowerCase().includes(search.toLowerCase())
  );

  const current = surgeryTopics.find(t => t.id === selectedTopic);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Surgery & Surgical Conditions</h2>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Homeopathic surgical management</p>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          placeholder="Search surgical topics..."
        />
      </div>

      {!current ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(topic => (
            <motion.div
              key={topic.id}
              whileHover={{ scale: 1.01 }}
              onClick={() => setSelectedTopic(topic.id)}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 cursor-pointer hover:border-slate-300 transition"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[9px] font-bold bg-rose-50 text-rose-600 px-2 py-0.5 rounded uppercase tracking-widest">{topic.category}</span>
                <span className="text-[9px] font-bold text-emerald-600">{topic.remedies.length} remedies</span>
              </div>
              <h3 className="text-sm font-black text-slate-900">{topic.name}</h3>
              <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">{topic.description}</p>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-rose-700 to-slate-900 text-white flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black uppercase tracking-tight">{current.name}</h3>
              <p className="text-sm text-rose-200">{current.description}</p>
            </div>
            <button onClick={() => setSelectedTopic(null)} className="p-2 hover:bg-white/10 rounded-xl transition text-xs font-bold">
              ← Back
            </button>
          </div>
          <div className="p-6">
            <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3">Homeopathic Remedies</h4>
            <div className="space-y-3">
              {current.remedies.map((remedy, i) => (
                <div key={i} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-black">{i + 1}</span>
                    <h5 className="text-sm font-black text-slate-900">{remedy.name}</h5>
                  </div>
                  <p className="text-xs text-slate-600">{remedy.indication}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
