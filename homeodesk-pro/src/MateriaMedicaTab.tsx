import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Leaf, Search, Plus, X, Eye, ArrowRightLeft, FileText } from 'lucide-react';
import { MATERIA_MEDICA_DATA } from './materiaMedicaData';

// ==================== MATERIA MEDICA TAB ====================
interface MateriaMedicaTabProps {
  initialComparison?: string[];
  onQuickPrescribe?: (remedyName: string) => void;
}

export function MateriaMedicaTab({ initialComparison, onQuickPrescribe }: MateriaMedicaTabProps) {
  const [search, setSearch] = useState('');
  const [selectedRemedy, setSelectedRemedy] = useState<string | null>(null);
  const [comparisonList, setComparisonList] = useState<string[]>(initialComparison || []);
  const [activeTab, setActiveTab] = useState<'overview' | 'mind' | 'physical' | 'clinical'>('overview');

  const filteredRemedies = MATERIA_MEDICA_DATA.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.abbrev?.toLowerCase().includes(search.toLowerCase())
  );

  const currentRemedy = MATERIA_MEDICA_DATA.find(r => r.name === selectedRemedy);

  const addToComparison = (name: string) => {
    if (comparisonList.includes(name) || comparisonList.length >= 4) return;
    setComparisonList([...comparisonList, name]);
  };

  const removeFromComparison = (name: string) => {
    setComparisonList(comparisonList.filter(r => r !== name));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Materia Medica</h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{MATERIA_MEDICA_DATA.length} Remedies</p>
        </div>
        {onQuickPrescribe && comparisonList.length === 1 && (
          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={() => onQuickPrescribe(comparisonList[0])}
            className="px-4 py-2.5 bg-emerald-500 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg flex items-center gap-2"
          >
            <FileText size={14} /> Quick Rx
          </motion.button>
        )}
      </div>

      {/* Comparison Bar */}
      {comparisonList.length > 0 && (
        <ComparisonSection remedies={comparisonList} onRemove={removeFromComparison} />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Remedy List */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden lg:col-span-1">
          <div className="p-3 border-b border-slate-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                placeholder="Search remedies..."
              />
            </div>
          </div>
          <div className="overflow-y-auto max-h-[500px] custom-scrollbar">
            {filteredRemedies.map((remedy) => (
              <button
                key={remedy.name}
                onClick={() => setSelectedRemedy(remedy.name)}
                className={`w-full text-left px-4 py-3 text-xs font-bold transition border-b border-slate-50 ${
                  selectedRemedy === remedy.name
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{remedy.name}</span>
                  {remedy.abbrev && <span className="text-[9px] opacity-60">{remedy.abbrev}</span>}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Remedy Detail */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden lg:col-span-2">
          {currentRemedy ? (
            <>
              <div className="p-5 bg-gradient-to-r from-slate-800 to-slate-900 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-black uppercase tracking-tight">{currentRemedy.name}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      {currentRemedy.kingdom && <span className="text-[9px] font-bold bg-white/10 px-2 py-0.5 rounded">{currentRemedy.kingdom}</span>}
                      {currentRemedy.family && <span className="text-[9px] font-bold bg-white/10 px-2 py-0.5 rounded">{currentRemedy.family}</span>}
                      {currentRemedy.thermal && <span className="text-[9px] font-bold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded">{currentRemedy.thermal}</span>}
                    </div>
                  </div>
                  <button
                    onClick={() => addToComparison(currentRemedy.name)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition ${
                      comparisonList.includes(currentRemedy.name)
                        ? 'bg-emerald-500 text-white'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {comparisonList.includes(currentRemedy.name) ? 'Added' : 'Compare'}
                  </button>
                </div>
              </div>

              <div className="p-5 border-b border-slate-100">
                <div className="flex gap-2">
                  {(['overview', 'mind', 'physical', 'clinical'] as const).map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-3 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition ${
                        activeTab === tab
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-5 overflow-y-auto max-h-[400px] custom-scrollbar space-y-4">
                {activeTab === 'overview' && (
                  <>
                    {currentRemedy.temperament && (
                      <div>
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Temperament</h4>
                        <p className="text-sm text-slate-700">{currentRemedy.temperament}</p>
                      </div>
                    )}
                    {currentRemedy.thirst && (
                      <div>
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Thirst</h4>
                        <p className="text-sm text-slate-700">{currentRemedy.thirst}</p>
                      </div>
                    )}
                    {currentRemedy.desires && currentRemedy.desires.length > 0 && (
                      <div>
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Desires</h4>
                        <div className="flex flex-wrap gap-1">
                          {currentRemedy.desires.map(d => (
                            <span key={d} className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded">{d}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {currentRemedy.aversions && currentRemedy.aversions.length > 0 && (
                      <div>
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Aversions</h4>
                        <div className="flex flex-wrap gap-1">
                          {currentRemedy.aversions.map(a => (
                            <span key={a} className="text-[10px] font-bold bg-rose-50 text-rose-700 px-2 py-0.5 rounded">{a}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {currentRemedy.modalities && (
                      <div>
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Modalities</h4>
                        {currentRemedy.modalities.better && currentRemedy.modalities.better.length > 0 && (
                          <div className="mb-2">
                            <p className="text-[9px] font-bold text-emerald-600 mb-1">BETTER:</p>
                            <div className="flex flex-wrap gap-1">
                              {currentRemedy.modalities.better.map(m => (
                                <span key={m} className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded">{m}</span>
                              ))}
                            </div>
                          </div>
                        )}
                        {currentRemedy.modalities.worse && currentRemedy.modalities.worse.length > 0 && (
                          <div>
                            <p className="text-[9px] font-bold text-rose-600 mb-1">WORSE:</p>
                            <div className="flex flex-wrap gap-1">
                              {currentRemedy.modalities.worse.map(m => (
                                <span key={m} className="text-[10px] font-bold bg-rose-50 text-rose-700 px-2 py-0.5 rounded">{m}</span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    {currentRemedy.keynotes && currentRemedy.keynotes.length > 0 && (
                      <div>
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Keynotes</h4>
                        <div className="space-y-1">
                          {currentRemedy.keynotes.map((k, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                              {k}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {currentRemedy.relations && (
                      <div>
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Relationships</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {currentRemedy.relations.complementary && (
                            <div className="bg-blue-50 p-2 rounded-lg">
                              <p className="text-[9px] font-bold text-blue-600">Complementary</p>
                              <p className="text-xs font-bold text-blue-800">{currentRemedy.relations.complementary.join(', ')}</p>
                            </div>
                          )}
                          {currentRemedy.relations.followedWellBy && (
                            <div className="bg-emerald-50 p-2 rounded-lg">
                              <p className="text-[9px] font-bold text-emerald-600">Followed Well By</p>
                              <p className="text-xs font-bold text-emerald-800">{currentRemedy.relations.followedWellBy.join(', ')}</p>
                            </div>
                          )}
                          {currentRemedy.relations.antidotes && (
                            <div className="bg-amber-50 p-2 rounded-lg">
                              <p className="text-[9px] font-bold text-amber-600">Antidotes</p>
                              <p className="text-xs font-bold text-amber-800">{currentRemedy.relations.antidotes.join(', ')}</p>
                            </div>
                          )}
                          {currentRemedy.relations.inimical && currentRemedy.relations.inimical.length > 0 && (
                            <div className="bg-rose-50 p-2 rounded-lg">
                              <p className="text-[9px] font-bold text-rose-600">Inimical</p>
                              <p className="text-xs font-bold text-rose-800">{currentRemedy.relations.inimical.join(', ')}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </>
                )}

                {activeTab === 'mind' && currentRemedy.mind && (
                  <div className="space-y-2">
                    {currentRemedy.mind.map((m, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                        {m}
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'physical' && currentRemedy.physical && (
                  <div className="space-y-2">
                    {currentRemedy.physical.map((p, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                        {p}
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'clinical' && currentRemedy.clinical && (
                  <div className="flex flex-wrap gap-2">
                    {currentRemedy.clinical.map((c, i) => (
                      <span key={i} className="text-[10px] font-bold bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg">{c}</span>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
              <Leaf size={48} className="mb-3 text-slate-200" />
              <p className="text-xs font-bold uppercase tracking-widest">Select a remedy to view</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ==================== COMPARISON SECTION ====================
interface ComparisonSectionProps {
  remedies: string[];
  onRemove: (name: string) => void;
}

export function ComparisonSection({ remedies, onRemove }: ComparisonSectionProps) {
  if (remedies.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl border border-blue-200 shadow-sm p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <ArrowRightLeft size={14} className="text-blue-600" />
          <h3 className="text-xs font-black uppercase tracking-widest text-blue-700">Comparison ({remedies.length})</h3>
        </div>
        {remedies.length > 1 && (
          <span className="text-[9px] font-bold text-blue-500">Comparing {remedies.length} remedies</span>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {remedies.map(name => (
          <span key={name} className="flex items-center gap-1.5 bg-blue-50 text-blue-800 px-3 py-1.5 rounded-lg text-xs font-bold">
            {name}
            <button onClick={() => onRemove(name)} className="text-blue-400 hover:text-rose-500 transition"><X size={12} /></button>
          </span>
        ))}
      </div>
    </div>
  );
}
