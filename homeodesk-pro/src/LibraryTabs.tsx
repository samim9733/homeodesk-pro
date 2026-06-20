import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Scroll, Book, FileText, BookOpen, GraduationCap, Brain, Search, ChevronRight,
  Star, Clock, Tag, Heart
} from 'lucide-react';
import { ORGANON_DATA } from './organonData';
import { PRACTICE_MEDICINE_DATA, KNOWLEDGE_DATA, PATHOLOGY_DATA, CLASSIC_BOOKS, KNOWLEDGE_CATEGORIES, RECENT_ARTICLES } from './medicalData';
import { PATHOLOGY_SYSTEMS } from './pathologyData';
import ReactMarkdown from 'react-markdown';

// ==================== ORGANON TAB ====================
export function OrganonTab() {
  const [search, setSearch] = useState('');
  const [selectedAphorism, setSelectedAphorism] = useState<number | null>(null);

  const filtered = ORGANON_DATA.filter(a =>
    a.text.toLowerCase().includes(search.toLowerCase()) ||
    a.title?.toLowerCase().includes(search.toLowerCase()) ||
    String(a.number).includes(search)
  );

  const current = ORGANON_DATA.find(a => a.number === selectedAphorism);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Organon of Medicine</h2>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Samuel Hahnemann • {ORGANON_DATA.length} Aphorisms</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Aphorism List */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden lg:col-span-1">
          <div className="p-3 border-b border-slate-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                placeholder="Search aphorisms..."
              />
            </div>
          </div>
          <div className="overflow-y-auto max-h-[600px] custom-scrollbar">
            {filtered.map(aph => (
              <button
                key={aph.number}
                onClick={() => setSelectedAphorism(aph.number)}
                className={`w-full text-left px-4 py-3 transition border-b border-slate-50 ${
                  selectedAphorism === aph.number
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black ${
                    selectedAphorism === aph.number ? 'bg-white/10' : 'bg-slate-100 text-slate-500'
                  }`}>
                    §{aph.number}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold truncate">{aph.title || `Aphorism ${aph.number}`}</p>
                    <p className="text-[9px] opacity-60 line-clamp-1">{aph.text.substring(0, 60)}...</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Aphorism Detail */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden lg:col-span-2">
          {current ? (
            <>
              <div className="p-6 bg-gradient-to-r from-amber-700 to-slate-900 text-white">
                <div className="flex items-center gap-3 mb-2">
                  <Scroll size={20} />
                  <h3 className="text-lg font-black uppercase tracking-tight">§{current.number}</h3>
                </div>
                <h4 className="text-sm font-bold text-amber-200">{current.title || `Aphorism ${current.number}`}</h4>
              </div>
              <div className="p-6">
                <p className="text-sm text-slate-700 leading-relaxed">{current.text}</p>
                {current.footnotes && current.footnotes.length > 0 && (
                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Footnotes</h5>
                    {current.footnotes.map((fn, i) => (
                      <p key={i} className="text-xs text-slate-500 mt-1">[{i + 1}] {fn}</p>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
              <Scroll size={48} className="mb-3 text-slate-200" />
              <p className="text-xs font-bold uppercase tracking-widest">Select an aphorism to read</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ==================== PRACTICE MEDICINE TAB ====================
export function PracticeMedicineTab() {
  const [search, setSearch] = useState('');
  const [selectedCondition, setSelectedCondition] = useState<string | null>(null);

  const filtered = PRACTICE_MEDICINE_DATA.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.category.toLowerCase().includes(search.toLowerCase())
  );

  const current = PRACTICE_MEDICINE_DATA.find(c => c.id === selectedCondition);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Practice of Medicine</h2>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Clinical conditions & homeopathic approach</p>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          placeholder="Search conditions..."
        />
      </div>

      {/* Conditions Grid */}
      {!current && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(condition => (
            <motion.div
              key={condition.id}
              whileHover={{ scale: 1.01 }}
              onClick={() => setSelectedCondition(condition.id)}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 cursor-pointer hover:border-slate-300 transition"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[9px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded uppercase tracking-widest">{condition.category}</span>
                <span className="text-[9px] font-bold text-emerald-600">{condition.remedies.length} remedies</span>
              </div>
              <h3 className="text-sm font-black text-slate-900">{condition.name}</h3>
              <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">{condition.description}</p>
            </motion.div>
          ))}
        </div>
      )}

      {/* Condition Detail */}
      {current && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-blue-700 to-slate-900 text-white flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black uppercase tracking-tight">{current.name}</h3>
              <p className="text-sm text-blue-200">{current.description}</p>
            </div>
            <button onClick={() => setSelectedCondition(null)} className="p-2 hover:bg-white/10 rounded-xl transition text-xs font-bold">
              ← Back
            </button>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3">Homeopathic Approach</h4>
              <p className="text-sm text-slate-700">{current.homeopathicApproach}</p>
            </div>
            <div>
              <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3">Indicated Remedies</h4>
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
        </div>
      )}
    </div>
  );
}

// ==================== KNOWLEDGE TAB ====================
export function KnowledgeTab() {
  const [activeSection, setActiveSection] = useState<'articles' | 'books' | 'categories'>('articles');
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Knowledge Menu</h2>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Articles, books & learning resources</p>
      </div>

      {/* Section Tabs */}
      <div className="flex gap-2">
        {(['articles', 'books', 'categories'] as const).map(section => (
          <button
            key={section}
            onClick={() => setActiveSection(section)}
            className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition ${
              activeSection === section ? 'bg-slate-900 text-white' : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            {section}
          </button>
        ))}
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          placeholder="Search knowledge base..."
        />
      </div>

      {/* Articles */}
      {activeSection === 'articles' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {RECENT_ARTICLES.map(article => (
            <div key={article.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 hover:border-slate-300 transition">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[9px] font-bold bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded">{article.category}</span>
                <span className="text-[9px] font-bold text-slate-400 flex items-center gap-1"><Clock size={10} /> {article.date}</span>
              </div>
              <h3 className="text-sm font-black text-slate-900 mb-2">{article.title}</h3>
              <p className="text-xs text-slate-500 line-clamp-2">{article.summary}</p>
            </div>
          ))}
          {KNOWLEDGE_DATA.map(topic => (
            <div key={topic.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 hover:border-slate-300 transition">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[9px] font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded">{topic.category}</span>
              </div>
              <h3 className="text-sm font-black text-slate-900 mb-2">{topic.title}</h3>
              <p className="text-xs text-slate-500 line-clamp-2">{topic.summary}</p>
              {topic.tags && (
                <div className="flex flex-wrap gap-1 mt-3">
                  {topic.tags.map(tag => (
                    <span key={tag} className="text-[8px] font-bold bg-slate-50 text-slate-500 px-1.5 py-0.5 rounded">#{tag}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Books */}
      {activeSection === 'books' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CLASSIC_BOOKS.map(book => (
            <div key={book.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 hover:border-slate-300 transition">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center">
                  <Book size={18} className="text-white" />
                </div>
                <span className="text-[9px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded">{book.category}</span>
              </div>
              <h3 className="text-sm font-black text-slate-900">{book.title}</h3>
              <p className="text-[10px] text-slate-400 mt-1">{book.author}</p>
              <p className="text-xs text-slate-500 mt-2 line-clamp-2">{book.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Categories */}
      {activeSection === 'categories' && (
        <div className="flex flex-wrap gap-2">
          {KNOWLEDGE_CATEGORIES.map(cat => (
            <span key={cat} className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition cursor-pointer">
              {cat}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// ==================== PATHOLOGY TAB ====================
export function PathologyTab() {
  const [search, setSearch] = useState('');
  const [selectedSystem, setSelectedSystem] = useState<string | null>(null);

  const filteredSystems = PATHOLOGY_SYSTEMS.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.description.toLowerCase().includes(search.toLowerCase())
  );

  const currentSystem = PATHOLOGY_SYSTEMS.find(s => s.id === selectedSystem);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Pathology Menu</h2>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Disease systems & conditions</p>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          placeholder="Search systems or conditions..."
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
                  selectedSystem === system.id ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${selectedSystem === system.id ? 'bg-white/10' : 'bg-rose-50'}`}>
                    <Brain size={18} className={selectedSystem === system.id ? 'text-white' : 'text-rose-500'} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold">{system.name}</p>
                    <p className={`text-[9px] mt-0.5 ${selectedSystem === system.id ? 'text-slate-400' : 'text-slate-400'}`}>
                      {system.conditions.length} conditions
                    </p>
                  </div>
                  <ChevronRight size={14} className={selectedSystem === system.id ? 'text-white' : 'text-slate-300'} />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Conditions */}
        <div className="lg:col-span-2 space-y-4">
          {currentSystem ? (
            <>
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 bg-gradient-to-r from-rose-700 to-slate-900">
                <h3 className="text-lg font-black uppercase tracking-tight text-white">{currentSystem.name}</h3>
                <p className="text-sm text-rose-200">{currentSystem.description}</p>
              </div>
              <div className="space-y-3">
                {currentSystem.conditions.map(condition => (
                  <div key={condition.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-black text-slate-900">{condition.name}</h4>
                        <span className="text-[9px] font-bold text-emerald-600">{condition.homeopathicRemedies.length} remedies</span>
                      </div>
                      <p className="text-xs text-slate-500">{condition.description}</p>
                      <div className="flex flex-wrap gap-1 mt-3">
                        {condition.symptoms.slice(0, 5).map(s => (
                          <span key={s} className="text-[9px] font-bold bg-slate-50 text-slate-500 px-2 py-0.5 rounded">{s}</span>
                        ))}
                        {condition.symptoms.length > 5 && <span className="text-[9px] font-bold text-slate-400">+{condition.symptoms.length - 5}</span>}
                      </div>
                      <div className="mt-3 pt-3 border-t border-slate-100">
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Homeopathic Remedies</p>
                        <div className="flex flex-wrap gap-1">
                          {condition.homeopathicRemedies.map(r => (
                            <span key={r.name} className="text-[9px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded">{r.name}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center py-20 text-slate-400">
              <Brain size={48} className="mb-3 text-slate-200" />
              <p className="text-xs font-bold uppercase tracking-widest">Select a system to explore</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
