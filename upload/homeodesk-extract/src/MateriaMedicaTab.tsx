import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, LayoutDashboard, Database, FileText, Download, TrendingUp, Filter, AlertCircle, BookOpen, Star, RefreshCw, X, ChevronRight, Bookmark, Move, Activity, ArrowRightLeft, ArrowLeft, ArrowUpDown , Bell, HelpCircle, RotateCcw, Zap, TrendingDown, Brain, Clock, Utensils, FlaskConical, Plus, User, Leaf} from 'lucide-react';
import { MATERIA_MEDICA_DATA, Remedy as MateriaRemedy } from './materiaMedicaData';
import { QuickDetailsModal } from './QuickDetailsModal';

export const MateriaMedicaTab = ({ initialComparison, onQuickPrescribe }: { initialComparison?: string[], onQuickPrescribe?: (remedyName: string) => void }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRemedy, setSelectedRemedy] = useState<MateriaRemedy | null>(MATERIA_MEDICA_DATA[0] || null);
  const [showMobileDetails, setShowMobileDetails] = useState(false);
  const [quickDetailsRemedy, setQuickDetailsRemedy] = useState<MateriaRemedy | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [compareMode, setCompareMode] = useState(initialComparison && initialComparison.length > 0 ? true : false);
  const resolveRemedies = (names: string[]) => {
    return names.map(name => {
      const cleanName = name.toLowerCase().replace(/\./g, '').trim();
      const parts = cleanName.split('-');
      
      return MATERIA_MEDICA_DATA.find(r => {
        const rName = r.name.toLowerCase();
        const rAbbr = r.abbreviation?.toLowerCase().replace(/\./g, '').trim() || '';
        const rId = r.id.toLowerCase();
        
        if (rAbbr === cleanName || rId === cleanName || rId.includes(cleanName) || rName.startsWith(cleanName)) {
          return true;
        }
        
        if (parts.length > 1) {
          // match "rhus-t", "calc-c" etc.
          const isMatch = parts.every(part => rName.includes(part) || rId.includes(part));
          if (isMatch) return true;
        }
        
        // Match just by ignoring dashes and spaces
        const noDashClean = cleanName.replace(/-/g, '');
        const noDashId = rId.replace(/-/g, '');
        if (noDashId.startsWith(noDashClean) || rName.replace(/ /g, '').startsWith(noDashClean)) {
            return true;
        }

        return false;
      });
    }).filter(Boolean) as MateriaRemedy[];
  };

  const [comparisonList, setComparisonList] = useState<MateriaRemedy[]>(() => {
    if (initialComparison && initialComparison.length > 0) {
      return resolveRemedies(initialComparison).slice(0, 3);
    }
    return [];
  });

  useEffect(() => {
    if (initialComparison && initialComparison.length > 0) {
      const remediesToCompare = resolveRemedies(initialComparison).slice(0, 3);
      
      if (remediesToCompare.length > 0) {
        setCompareMode(true);
        setComparisonList(remediesToCompare);
        setShowMobileDetails(true);
      }
    }
  }, [initialComparison]);

  const filteredRemedies = MATERIA_MEDICA_DATA.filter(remedy => {
    const matchesSearch = remedy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      remedy.banglaName.includes(searchQuery) ||
      remedy.commonName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      remedy.abbreviation?.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;
    
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Polychrest') return remedy.isPolychrest;
    if (activeCategory === 'Plant') return remedy.kingdom?.toLowerCase().includes('plant');
    if (activeCategory === 'Animal') return remedy.kingdom?.toLowerCase().includes('animal');
    if (activeCategory === 'Mineral') return remedy.kingdom?.toLowerCase().includes('mineral');
    
    return true;
  }).sort((a, b) => a.name.localeCompare(b.name));

  const handleSelectRemedy = (remedy: MateriaRemedy) => {
    if (compareMode) {
      if (comparisonList.find(r => r.id === remedy.id)) {
        setComparisonList(comparisonList.filter(r => r.id !== remedy.id));
      } else if (comparisonList.length < 3) {
        setComparisonList([...comparisonList, remedy]);
      }
    } else {
      setSelectedRemedy(remedy);
      setShowMobileDetails(true);
    }
  };

  const toggleCompareMode = () => {
    setCompareMode(!compareMode);
    if (!compareMode && selectedRemedy) {
      setComparisonList([selectedRemedy]);
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col bg-background font-inter overflow-hidden">
      {/* Top App Bar */}
      <header className="flex justify-between items-center px-8 py-4 w-full bg-background sticky top-0 z-40 border-b border-outline-variant/10">
        <div className="flex items-center gap-4">
          <h2 className="font-manrope font-bold text-lg text-primary">Materia Medica Browser</h2>
          <span className="px-2 py-0.5 rounded-full bg-tertiary-container/10 text-tertiary text-[10px] font-bold uppercase tracking-widest">En / Bn</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center bg-surface-container-low px-4 py-2 rounded-full w-72">
            <Search className="text-outline text-lg mr-2" size={18} />
            <input 
              type="text" 
              placeholder="Search remedies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none focus:ring-0 text-sm w-full font-body placeholder:text-outline/50 outline-none"
            />
          </div>
          <div className="flex items-center gap-4 text-primary">
            <Bell className="cursor-pointer hover:opacity-70 transition-all" size={20} />
            <HelpCircle className="cursor-pointer hover:opacity-70 transition-all" size={20} />
            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-primary-container/20">
              <img 
                className="w-full h-full object-cover" 
                src="https://picsum.photos/seed/doctor/100/100" 
                alt="Profile"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Remedy List Panel */}
        <section className={`w-full md:w-80 bg-surface-container-low flex flex-col border-r border-outline-variant/10 ${showMobileDetails && !compareMode ? 'hidden md:flex' : 'flex'}`}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-manrope font-bold text-on-surface text-sm uppercase tracking-widest opacity-60">Directory</h3>
              <div className="flex items-center gap-2">
                <button 
                  onClick={toggleCompareMode}
                  className={`p-1.5 rounded-lg transition-all ${compareMode ? 'bg-primary text-white' : 'bg-white text-primary hover:bg-primary/10'}`}
                  title={compareMode ? "Exit Comparison" : "Compare Remedies"}
                >
                  <ArrowRightLeft size={16} />
                </button>
                <span className="text-[10px] font-bold text-primary px-2 py-0.5 bg-primary-fixed rounded-md">{MATERIA_MEDICA_DATA.length}</span>
              </div>
            </div>
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
              {['All', 'Polychrest', 'Plant', 'Animal', 'Mineral'].map(cat => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`${activeCategory === cat ? 'bg-primary text-white' : 'bg-white text-on-surface-variant hover:bg-white/80'} px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-2 custom-scrollbar">
            {filteredRemedies.map((remedy) => {
              const isSelected = compareMode 
                ? comparisonList.some(r => r.id === remedy.id)
                : selectedRemedy?.id === remedy.id;
                
              return (
                <button
                  key={remedy.id}
                  onClick={() => handleSelectRemedy(remedy)}
                  className={`w-full text-left p-4 rounded-xl transition-all relative ${
                    isSelected 
                      ? compareMode ? 'bg-primary/10 border-l-4 border-primary' : 'bg-surface-container-lowest shadow-sm border-l-4 border-primary' 
                      : 'hover:bg-surface-container-high'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className={`font-manrope font-extrabold text-base ${isSelected ? 'text-primary' : 'text-on-surface'}`}>
                      {remedy.name}
                    </span>
                    <span className="text-[10px] font-label text-outline uppercase tracking-wider">{remedy.abbreviation || remedy.name.substring(0, 4)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <p className="text-xs text-on-surface-variant italic">{remedy.banglaName}</p>
                      <p className="text-[10px] text-outline italic mt-0.5">{remedy.commonName}</p>
                    </div>
                    {compareMode && isSelected && (
                      <div className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[10px] font-bold">
                        {comparisonList.findIndex(r => r.id === remedy.id) + 1}
                      </div>
                    )}
                    {!compareMode && isSelected && (
                      <Star className="text-tertiary" size={12} fill="currentColor" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {compareMode && comparisonList.length >= 2 && (
            <div className="p-4 border-t border-outline-variant/10">
              <button 
                onClick={() => setShowMobileDetails(true)}
                className="w-full py-3 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20"
              >
                Compare {comparisonList.length} Selected
              </button>
            </div>
          )}
        </section>

        {/* Reading Pane / Comparison Pane */}
        <section className={`flex-1 overflow-y-auto bg-surface-container-lowest p-6 md:p-10 custom-scrollbar ${!showMobileDetails && !compareMode ? 'hidden md:block' : 'block'}`}>
          <AnimatePresence mode="wait">
            {compareMode ? (
              <motion.div
                key="comparison"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="max-w-6xl mx-auto"
              >
                {/* Mobile Back Button */}
                <button 
                  onClick={() => setShowMobileDetails(false)}
                  className="md:hidden mb-6 flex items-center gap-2 text-primary font-bold"
                >
                  <ArrowLeft size={20} />
                  Back to Selection
                </button>

                <div className="flex justify-between items-center mb-8">
                  <h2 className="font-manrope font-extrabold text-2xl text-on-surface">Remedy Comparison</h2>
                  <button 
                    onClick={() => setComparisonList([])}
                    className="flex items-center gap-2 text-error text-sm font-bold hover:opacity-70"
                  >
                    <RotateCcw size={16} />
                    Clear All
                  </button>
                </div>

                {comparisonList.length === 0 ? (
                  <div className="py-20 flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 bg-surface-container-low rounded-full flex items-center justify-center text-primary/20 mb-6">
                      <ArrowRightLeft size={40} />
                    </div>
                    <h3 className="text-xl font-bold text-on-surface opacity-40">Select remedies to compare</h3>
                    <p className="text-on-surface-variant text-sm mt-2 max-w-xs">Choose up to 3 remedies from the directory to see side-by-side analysis.</p>
                  </div>
                ) : (
                  <div className="space-y-12">
                    {/* Headers */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {comparisonList.map((remedy) => (
                        <div key={remedy.id} className="bg-surface-container-low p-6 rounded-[2rem] relative border border-outline-variant/10">
                          <button 
                            onClick={() => setComparisonList(comparisonList.filter(r => r.id !== remedy.id))}
                            className="absolute top-4 right-4 p-1.5 bg-white rounded-full text-outline hover:text-error shadow-sm"
                          >
                            <X size={14} />
                          </button>
                          <h3 className="font-manrope font-extrabold text-xl text-primary">{remedy.name}</h3>
                          <p className="text-on-surface font-bold mt-1">{remedy.banglaName}</p>
                          <p className="text-on-surface-variant text-xs mt-1 italic">{remedy.commonName}</p>
                        </div>
                      ))}
                    </div>

                    {/* Comparison Sections */}
                    <div className="space-y-10">
                      <ComparisonSection 
                        title="Key Notes (মূল লক্ষণসমূহ)" 
                        icon={<Star size={18} />}
                        data={comparisonList.map(r => ({
                          text: r.keyIndications?.join(', ') || 'N/A',
                          bangla: r.banglaIndications?.join(', ') || 'N/A'
                        }))}
                      />

                      <ComparisonSection 
                        title="Keynotes & Essence" 
                        icon={<Zap size={18} />}
                        data={comparisonList.map(r => ({
                          text: r.description,
                          bangla: r.banglaDescription
                        }))}
                      />

                      <ComparisonSection 
                        title="Causation (কারণ)" 
                        icon={<HelpCircle size={18} />}
                        data={comparisonList.map(r => ({
                          text: r.causation || 'N/A',
                          bangla: r.banglaCausation || 'N/A'
                        }))}
                      />
                      
                      <ComparisonSection 
                        title="Aggravation (বৃদ্ধি)" 
                        icon={<TrendingUp size={18} />}
                        color="text-error"
                        data={comparisonList.map(r => ({
                          text: r.modalities?.aggravation || r.modality || 'N/A',
                          bangla: r.modalities?.banglaAggravation || r.banglaModality || 'N/A'
                        }))}
                      />

                      <ComparisonSection 
                        title="Amelioration (উপশম)" 
                        icon={<TrendingDown size={18} />}
                        color="text-tertiary"
                        data={comparisonList.map(r => ({
                          text: r.modalities?.amelioration || 'N/A',
                          bangla: r.modalities?.banglaAmelioration || 'N/A'
                        }))}
                      />

                      <ComparisonSection 
                        title="Main Symptoms" 
                        icon={<Activity size={18} />}
                        data={comparisonList.map(r => ({
                          text: r.mainSymptoms?.join(', ') || 'N/A',
                          bangla: r.banglaMainSymptoms?.join(', ') || 'N/A'
                        }))}
                      />

                      <ComparisonSection 
                        title="Mental State (মানসিক অবস্থা)" 
                        icon={<Brain size={18} />}
                        data={comparisonList.map(r => ({
                          text: r.mind?.join(', ') || r.mentalState || 'N/A',
                          bangla: r.banglaMind?.join(', ') || r.banglaMentalState || 'N/A'
                        }))}
                      />

                      <ComparisonSection 
                        title="Physical Details (শারীরিক বিবরণ)" 
                        icon={<Activity size={18} />}
                        data={comparisonList.map(r => ({
                          text: `Location: ${r.location || 'N/A'}\nAppearance: ${r.appearance || 'N/A'}\nSensation: ${r.sensation || 'N/A'}\nPain: ${r.pain || 'N/A'}`,
                          bangla: `স্থান: ${r.banglaLocation || 'N/A'}\nচেহারা: ${r.banglaAppearance || 'N/A'}\nঅনুভূতি: ${r.banglaSensation || 'N/A'}\nব্যথা: ${r.banglaPain || 'N/A'}`
                        }))}
                      />

                      <ComparisonSection 
                        title="Time & Modality (সময় ও মোডালিটি)" 
                        icon={<Clock size={18} />}
                        data={comparisonList.map(r => ({
                          text: `Time: ${r.time || 'N/A'}\nModality: ${r.modality || 'N/A'}`,
                          bangla: `সময়: ${r.banglaTime || 'N/A'}\nমোডালিটি: ${r.banglaModality || 'N/A'}`
                        }))}
                      />

                      <ComparisonSection 
                        title="Desires & Aversions" 
                        icon={<Utensils size={18} />}
                        data={comparisonList.map(r => ({
                          text: `Desire: ${r.desire || 'N/A'}\nAversion: ${r.aversion || 'N/A'}`,
                          bangla: `ইচ্ছা: ${r.banglaDesire || 'N/A'}\nঅনীহা: ${r.banglaAversion || 'N/A'}`
                        }))}
                      />

                      <ComparisonSection 
                        title="Dosage & Usage" 
                        icon={<FlaskConical size={18} />}
                        data={comparisonList.map(r => ({
                          text: r.dosage || 'N/A',
                          bangla: r.banglaDosage || 'N/A'
                        }))}
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            ) : selectedRemedy ? (
              <motion.div 
                key={selectedRemedy.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto"
              >
                {/* Mobile Back Button */}
                <button 
                  onClick={() => setShowMobileDetails(false)}
                  className="md:hidden mb-4 flex items-center gap-2 text-primary font-bold"
                >
                  <ArrowLeft size={20} />
                  Back to Directory
                </button>

                {/* Hero Section */}
                <div className="relative rounded-3xl overflow-hidden mb-12 h-64 flex items-end shadow-xl">
                  <img 
                    className="absolute inset-0 w-full h-full object-cover" 
                    src={selectedRemedy.image || `https://picsum.photos/seed/${selectedRemedy.id}/1200/600`} 
                    alt={selectedRemedy.name}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent"></div>
                  <div className="relative p-8 w-full flex justify-between items-end">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="bg-tertiary-fixed text-on-tertiary-fixed px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest">
                          {selectedRemedy.kingdom || 'Remedy'}
                        </span>
                        <span className="text-white/80 text-sm italic">{selectedRemedy.family || ''}</span>
                      </div>
                      <h1 className="font-manrope font-extrabold text-3xl md:text-4xl text-white tracking-tight">{selectedRemedy.name}</h1>
                      <p className="text-white/90 font-manrope text-xl mt-1">{selectedRemedy.banglaName}</p>
                      <p className="text-white/70 font-manrope text-sm italic mt-1">{selectedRemedy.commonName}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest">
                        Dosage: {selectedRemedy.dosage || 'N/A'}
                      </span>
                      <button 
                        onClick={() => setQuickDetailsRemedy(selectedRemedy)}
                        className="hidden sm:flex bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-full font-label text-xs font-bold uppercase tracking-widest hover:bg-white/30 transition-all items-center gap-2">
                        <Plus size={16} />
                        Quick Details
                      </button>
                    </div>
                  </div>
                </div>

                {/* Content Grid: Bento Layout */}
                <div className="grid grid-cols-12 gap-6">
                  {/* Keynotes Section */}
                  <div className="col-span-12 lg:col-span-8 p-8 bg-surface-container-low rounded-[2rem]">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        <Zap size={20} />
                      </div>
                      <h3 className="font-manrope font-bold text-xl text-primary">Keynotes & Essence</h3>
                    </div>
                    <div className="space-y-6">
                      <p className="text-on-surface font-body leading-relaxed text-lg italic border-l-4 border-tertiary pl-6">
                        "{selectedRemedy.description}"
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-white rounded-2xl">
                          <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Causation (কারণ)</h4>
                          <p className="text-sm text-on-surface-variant font-medium">{selectedRemedy.causation || 'N/A'}</p>
                          <p className="text-[11px] text-outline mt-1 font-manrope">{selectedRemedy.banglaCausation || ''}</p>
                        </div>
                        <div className="p-4 bg-white rounded-2xl">
                          <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Mental State (মানসিক অবস্থা)</h4>
                          <p className="text-sm text-on-surface-variant font-medium">{selectedRemedy.mentalState || 'N/A'}</p>
                          <p className="text-[11px] text-outline mt-1 font-manrope">{selectedRemedy.banglaMentalState || ''}</p>
                        </div>
                      </div>
                      
                      {/* Key Indications / Keynotes */}
                      <div className="p-6 bg-white rounded-2xl">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                          <Star size={14} className="text-tertiary" />
                          Key Notes (মূল লক্ষণসমূহ)
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                          {selectedRemedy.keyIndications.map((item, i) => (
                            <div key={i} className="flex flex-col border-l-2 border-primary/20 pl-3 py-1">
                              <span className="text-sm font-bold text-on-surface">{item}</span>
                              <span className="text-[11px] text-on-surface-variant font-manrope">{selectedRemedy.banglaIndications[i]}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-primary/5 p-6 rounded-2xl">
                        <h4 className="font-manrope font-bold text-sm mb-3 flex items-center gap-2">
                          <BookOpen size={16} className="text-tertiary" />
                          বাংলা বর্ণনা (Bengali Description)
                        </h4>
                        <p className="text-on-surface text-sm leading-relaxed">
                          {selectedRemedy.banglaDescription}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Modalities Section */}
                  <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
                    <div className="p-8 bg-surface-container rounded-[2rem] flex-1">
                      <h3 className="font-manrope font-bold text-lg mb-6 flex items-center gap-2 text-error">
                        <TrendingUp size={20} />
                        Aggravation (বৃদ্ধি)
                      </h3>
                      <ul className="space-y-4 text-sm font-medium">
                        {(selectedRemedy.modalities?.aggravation || selectedRemedy.modality || '').split(',').map((item, i) => (
                          <li key={i} className="flex flex-col gap-0.5">
                            <div className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-error mt-1.5 shrink-0"></span>
                              {item.trim()}
                            </div>
                            {selectedRemedy.modalities?.banglaAggravation && (
                              <span className="text-[10px] text-outline ml-3.5 font-manrope">
                                {selectedRemedy.modalities.banglaAggravation.split(',')[i]?.trim()}
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-8 bg-tertiary-container/10 rounded-[2rem] flex-1">
                      <h3 className="font-manrope font-bold text-lg mb-6 flex items-center gap-2 text-tertiary">
                        <TrendingDown size={20} />
                        Amelioration (উপশম)
                      </h3>
                      <ul className="space-y-4 text-sm font-medium">
                        {(selectedRemedy.modalities?.amelioration || '').split(',').map((item, i) => (
                          <li key={i} className="flex flex-col gap-0.5">
                            <div className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-tertiary mt-1.5 shrink-0"></span>
                              {item.trim() || 'Open air, rest'}
                            </div>
                            {selectedRemedy.modalities?.banglaAmelioration && (
                              <span className="text-[10px] text-outline ml-3.5 font-manrope">
                                {selectedRemedy.modalities.banglaAmelioration.split(',')[i]?.trim()}
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Physical Details Bento */}
                  <div className="col-span-12 lg:col-span-6 p-8 bg-surface-container-low rounded-[2rem]">
                    <h3 className="font-manrope font-bold text-lg mb-6 flex items-center gap-2 text-primary">
                      <User size={20} />
                      Physical Details (শারীরিক বিবরণ)
                    </h3>
                    <div className="space-y-4">
                      <div className="flex flex-col border-b border-outline-variant/10 pb-2">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-bold text-outline uppercase">Appearance (চেহারা)</span>
                          <span className="text-sm font-bold text-on-surface text-right">{selectedRemedy.appearance || 'N/A'}</span>
                        </div>
                        <p className="text-[11px] text-outline text-right font-manrope">{selectedRemedy.banglaAppearance || ''}</p>
                      </div>
                      <div className="flex flex-col border-b border-outline-variant/10 pb-2">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-bold text-outline uppercase">Location (স্থান)</span>
                          <span className="text-sm font-bold text-on-surface text-right">{selectedRemedy.location || 'N/A'}</span>
                        </div>
                        <p className="text-[11px] text-outline text-right font-manrope">{selectedRemedy.banglaLocation || ''}</p>
                      </div>
                      <div className="flex flex-col border-b border-outline-variant/10 pb-2">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-bold text-outline uppercase">Sensation (অনুভূতি)</span>
                          <span className="text-sm font-bold text-on-surface text-right">{selectedRemedy.sensation || 'N/A'}</span>
                        </div>
                        <p className="text-[11px] text-outline text-right font-manrope">{selectedRemedy.banglaSensation || ''}</p>
                      </div>
                      <div className="flex flex-col border-b border-outline-variant/10 pb-2">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-bold text-outline uppercase">Pain Type (ব্যথা)</span>
                          <span className="text-sm font-bold text-on-surface text-right">{selectedRemedy.pain || 'N/A'}</span>
                        </div>
                        <p className="text-[11px] text-outline text-right font-manrope">{selectedRemedy.banglaPain || ''}</p>
                      </div>
                    </div>
                  </div>

                  {/* Desires & Aversions Bento */}
                  <div className="col-span-12 lg:col-span-6 p-8 bg-surface-container-low rounded-[2rem]">
                    <h3 className="font-manrope font-bold text-lg mb-6 flex items-center gap-2 text-tertiary">
                      <Utensils size={20} />
                      Desires & Aversions
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="p-4 bg-white rounded-2xl">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Desires</h4>
                        <p className="text-sm text-on-surface-variant">{selectedRemedy.desire || 'N/A'}</p>
                        <p className="text-[10px] text-outline mt-1">{selectedRemedy.banglaDesire || ''}</p>
                      </div>
                      <div className="p-4 bg-white rounded-2xl">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-error mb-2">Aversions</h4>
                        <p className="text-sm text-on-surface-variant">{selectedRemedy.aversion || 'N/A'}</p>
                        <p className="text-[10px] text-outline mt-1">{selectedRemedy.banglaAversion || ''}</p>
                      </div>
                    </div>
                  </div>

                  {/* Time & Modality Bento */}
                  <div className="col-span-12 lg:col-span-4 p-8 bg-surface-container-low rounded-[2rem]">
                    <h3 className="font-manrope font-bold text-lg mb-6 flex items-center gap-2 text-primary">
                      <Clock size={20} />
                      Time & Modality
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-[10px] font-bold text-outline uppercase mb-1">Time Aggravation</h4>
                        <p className="text-sm text-on-surface">{selectedRemedy.time || 'N/A'}</p>
                        <p className="text-[10px] text-outline">{selectedRemedy.banglaTime || ''}</p>
                      </div>
                      <div>
                        <h4 className="text-[10px] font-bold text-outline uppercase mb-1">General Modality</h4>
                        <p className="text-sm text-on-surface">{selectedRemedy.modality || 'N/A'}</p>
                        <p className="text-[10px] text-outline">{selectedRemedy.banglaModality || ''}</p>
                      </div>
                    </div>
                  </div>

                  {/* Clinical Indications Bento */}
                  <div className="col-span-12 lg:col-span-8 p-8 bg-surface-container-highest/30 rounded-[2rem]">
                    <h3 className="font-manrope font-bold text-xl text-on-surface mb-8">Clinical Indications</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {selectedRemedy.mainSymptoms?.map((symptom, i) => (
                        <div key={i} className="bg-white p-6 rounded-2xl shadow-sm hover:translate-y-[-4px] transition-transform">
                          <Activity className="text-primary mb-3" size={20} />
                          <h4 className="font-bold text-sm mb-1">{symptom}</h4>
                          <p className="text-[11px] text-on-surface-variant">
                            {selectedRemedy.banglaMainSymptoms?.[i] || ''}
                          </p>
                        </div>
                      )) || (
                        <div className="col-span-3 py-10 text-center text-slate-400">
                          No clinical indications listed.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-12">
                <div className="w-20 h-20 bg-surface-container-low rounded-full flex items-center justify-center text-primary/20 mb-6">
                  <Leaf size={40} />
                </div>
                <h3 className="text-xl font-bold text-on-surface opacity-40">Select a remedy to view details</h3>
                <p className="text-on-surface-variant text-sm mt-2 max-w-xs">Browse the directory on the left to explore the Materia Medica.</p>
              </div>
            )}
          </AnimatePresence>
        </section>
      </div>
      {quickDetailsRemedy && (
        <QuickDetailsModal 
          remedy={quickDetailsRemedy} 
          onClose={() => setQuickDetailsRemedy(null)} 
        />
      )}
    </div>
  );
};

export const ComparisonSection = ({ title, icon, data, color = "text-primary" }: { 
  title: string, 
  icon: React.ReactNode, 
  data: { text: string, bangla: string }[],
  color?: string
}) => (
  <section>
    <div className="flex items-center gap-3 mb-6">
      <div className={`w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center ${color}`}>
        {icon}
      </div>
      <h4 className="font-manrope font-bold text-lg text-on-surface">{title}</h4>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((item, i) => (
        <div key={i} className="space-y-3">
          <div className="text-on-surface font-body text-sm leading-relaxed italic border-l-2 border-outline-variant/20 pl-4 whitespace-pre-line">
            {item.text}
          </div>
          <div className="text-on-surface-variant text-xs font-bold bg-surface-container-low p-3 rounded-xl whitespace-pre-line">
            {item.bangla}
          </div>
        </div>
      ))}
    </div>
  </section>
);

import { Html5QrcodeScanner } from 'html5-qrcode';

