import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Book, Quote, ArrowLeft, Microscope, Bookmark, Share2, Printer, CheckCircle, Brain, RefreshCw, X, FileText, Download, TrendingUp, TrendingDown, Clock, Activity, Users, Settings, Thermometer, BrainCircuit, Droplets, Zap, ShieldAlert, Heart, Sun, Flame, Apple, Pill, Dna, FileDigit, Stethoscope, Scissors, ChevronLeft, GraduationCap, ArrowRight, Database, User, Calendar, Upload, Eye, ChevronRight, Type, Plus, ClipboardList, Leaf, FlaskConical } from 'lucide-react';
import { ORGANON_DATA, PREFACES_DATA, Aphorism, Preface } from './organonData';
import { PATHOLOGY_DATA, PRACTICE_MEDICINE_DATA, KNOWLEDGE_DATA, DiseaseCategory, CLASSIC_BOOKS, KNOWLEDGE_CATEGORIES, RECENT_ARTICLES, PHYSIOLOGY_ANATOMY_DATA, KnowledgeTopic } from './medicalData';
import { PATHOLOGY_SYSTEMS, PATHOLOGY_CONDITIONS } from './pathologyData';
import ReactMarkdown from 'react-markdown';

export const OrganonTab = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAphorism, setSelectedAphorism] = useState<Aphorism | null>(ORGANON_DATA[0]);
  const [selectedPreface, setSelectedPreface] = useState<Preface | null>(null);
  const [organonSubTab, setOrganonSubTab] = useState<'aphorisms' | 'prefaces'>('aphorisms');
  const [activeFilter, setActiveFilter] = useState<'all' | 'food' | 'dr_choice' | 'case_taking'>('all');
  const [fontSize, setFontSize] = useState(100);
  const [bookmarks, setBookmarks] = useState<number[]>(() => {
    const saved = localStorage.getItem('organon_bookmarks');
    return saved ? JSON.parse(saved) : [];
  });
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);

  const [isReaderOpen, setIsReaderOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('organon_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleBookmark = (id: number) => {
    setBookmarks(prev => 
      prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
    );
  };

  const filteredAphorisms = useMemo(() => {
    let data = ORGANON_DATA;
    
    if (activeFilter === 'food') {
      data = data.filter(a => a.id >= 259 && a.id <= 263);
    } else if (activeFilter === 'dr_choice') {
      data = data.filter(a => (a.id >= 1 && a.id <= 4) || (a.id >= 245 && a.id <= 258));
    } else if (activeFilter === 'case_taking') {
      data = data.filter(a => a.id >= 83 && a.id <= 104);
    }

    if (showBookmarksOnly) {
      data = data.filter(a => bookmarks.includes(a.id));
    }
    if (!searchQuery) return data;
    const query = searchQuery.toLowerCase();
    return data.filter(a => 
      a.text.toLowerCase().includes(query) || 
      (a.title && a.title.toLowerCase().includes(query)) ||
      (a.banglaText && a.banglaText.toLowerCase().includes(query)) ||
      (a.banglaTitle && a.banglaTitle.toLowerCase().includes(query)) ||
      a.id.toString() === query
    );
  }, [searchQuery, bookmarks, showBookmarksOnly, activeFilter]);

  const filteredPrefaces = useMemo(() => {
    if (!searchQuery) return PREFACES_DATA;
    const query = searchQuery.toLowerCase();
    return PREFACES_DATA.filter(p => 
      p.title.toLowerCase().includes(query) || 
      p.banglaTitle.toLowerCase().includes(query) ||
      p.content.toLowerCase().includes(query) ||
      p.banglaContent.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] bg-surface overflow-hidden rounded-[2.5rem] border border-slate-100 shadow-sm">
      {/* Top Bar */}
      <header className="flex flex-col md:flex-row justify-between items-center w-full px-8 py-4 bg-white border-b border-slate-100 shrink-0 gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-2xl">history_edu</span>
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Organon Browser</h2>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-secondary">
              <span className="material-symbols-outlined text-xs">menu_book</span>
              6th Edition
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setOrganonSubTab('aphorisms')}
              className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${organonSubTab === 'aphorisms' ? 'bg-white text-primary shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Aphorisms
            </button>
            <button
              onClick={() => setOrganonSubTab('prefaces')}
              className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${organonSubTab === 'prefaces' ? 'bg-white text-primary shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Introductions
            </button>
          </div>

          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search aphorisms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Panel: List */}
        <section className={`w-full md:w-1/3 bg-slate-50/50 border-r border-slate-100 overflow-y-auto custom-scrollbar flex flex-col transition-all duration-300 ${isReaderOpen ? 'hidden md:flex' : 'flex'}`}>
          <div className="p-6 md:p-8 pb-4">
            <h2 className="text-lg md:text-xl font-black text-slate-900 tracking-tight uppercase">The Core Principles</h2>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Systematic clinical directives</p>
          </div>

          {/* Filters */}
          <div className="px-6 md:px-8 mb-6">
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'All', bn: 'সব' },
                { id: 'food', label: 'Food Note', bn: 'খাদ্য নোট' },
                { id: 'dr_choice', label: 'Dr Choice', bn: 'চিকিৎসকের পছন্দ' },
                { id: 'case_taking', label: 'Case Taking', bn: 'কেস টেকিং' }
              ].map(filter => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id as any)}
                  className={`px-3 md:px-4 py-2 rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all border ${
                    activeFilter === filter.id 
                      ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' 
                      : 'bg-white text-slate-500 border-slate-200 hover:border-primary/30'
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <span>{filter.label}</span>
                    <span className="text-[7px] md:text-[8px] opacity-70">{filter.bn}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="px-4 md:px-6 space-y-3 pb-12">
            {organonSubTab === 'aphorisms' ? (
              filteredAphorisms.map((a) => (
                <motion.div
                  key={a.id}
                  layoutId={`aphorism-card-${a.id}`}
                  onClick={() => { setSelectedAphorism(a); setIsReaderOpen(true); }}
                  className={`p-4 md:p-5 rounded-3xl cursor-pointer transition-all border-2 ${
                    selectedAphorism?.id === a.id 
                      ? 'bg-white border-primary shadow-xl shadow-primary/5' 
                      : 'bg-white/50 border-transparent hover:border-slate-200'
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className={`text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] ${selectedAphorism?.id === a.id ? 'text-primary' : 'text-slate-400'}`}>
                      Aphorism {a.id}
                    </span>
                    {bookmarks.includes(a.id) && (
                      <span className="material-symbols-outlined text-primary text-lg">verified</span>
                    )}
                  </div>
                  <h3 className="text-xs md:text-sm font-black text-slate-900 leading-tight mb-2">{a.title || `Aphorism ${a.id}`}</h3>
                  <p className="text-[9px] md:text-[10px] text-slate-500 font-bold line-clamp-2 leading-relaxed">{a.text}</p>
                </motion.div>
              ))
            ) : (
              filteredPrefaces.map((p) => (
                <motion.div
                  key={p.id}
                  onClick={() => { setSelectedPreface(p); setIsReaderOpen(true); }}
                  className={`p-4 md:p-5 rounded-3xl cursor-pointer transition-all border-2 ${
                    selectedPreface?.id === p.id 
                      ? 'bg-white border-primary shadow-xl shadow-primary/5' 
                      : 'bg-white/50 border-transparent hover:border-slate-200'
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className={`text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] ${selectedPreface?.id === p.id ? 'text-primary' : 'text-slate-400'}`}>
                      Introduction
                    </span>
                  </div>
                  <h3 className="text-xs md:text-sm font-black text-slate-900 leading-tight mb-2">{p.title}</h3>
                  <p className="text-[9px] md:text-[10px] text-slate-500 font-bold line-clamp-2 leading-relaxed">{p.content}</p>
                </motion.div>
              ))
            )}
          </div>
        </section>

        {/* Right Panel: Reader Workspace */}
        <section className={`flex-1 flex flex-col bg-white overflow-y-auto custom-scrollbar transition-all duration-300 ${isReaderOpen ? 'flex' : 'hidden md:flex'}`}>
          <AnimatePresence mode="wait">
            {(organonSubTab === 'aphorisms' && selectedAphorism) || (organonSubTab === 'prefaces' && selectedPreface) ? (
              <motion.div
                key={organonSubTab === 'aphorisms' ? `aphorism-${selectedAphorism?.id}` : `preface-${selectedPreface?.id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col h-full"
              >
                {/* Reader Actions */}
                <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md px-6 md:px-10 py-4 flex justify-between items-center border-b border-slate-100">
                  <div className="flex items-center gap-2 md:gap-4">
                    <button 
                      onClick={() => setIsReaderOpen(false)}
                      className="p-2 text-slate-400 hover:text-primary md:hidden"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button className="hidden sm:flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all hover:shadow-lg hover:shadow-primary/20">
                      <span className="material-symbols-outlined text-sm">auto_stories</span>
                      Reading Mode
                    </button>
                    <div className="flex items-center bg-slate-100 px-2 md:px-3 py-1.5 rounded-2xl gap-2 md:gap-4">
                      <button 
                        onClick={() => setFontSize(prev => Math.max(70, prev - 10))}
                        className="material-symbols-outlined text-base md:text-lg text-slate-400 hover:text-primary transition-colors"
                      >
                        text_decrease
                      </button>
                      <span className="text-[9px] md:text-[10px] font-black text-slate-900 w-8 md:w-10 text-center">{fontSize}%</span>
                      <button 
                        onClick={() => setFontSize(prev => Math.min(150, prev + 10))}
                        className="material-symbols-outlined text-base md:text-lg text-slate-400 hover:text-primary transition-colors"
                      >
                        text_increase
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 md:gap-2">
                    <button className="p-2 md:p-3 rounded-2xl hover:bg-slate-100 transition-colors text-slate-400 hover:text-primary">
                      <span className="material-symbols-outlined text-lg md:text-xl">share</span>
                    </button>
                    <button 
                      onClick={() => window.print()}
                      className="p-2 md:p-3 rounded-2xl hover:bg-slate-100 transition-colors text-slate-400 hover:text-primary"
                    >
                      <span className="material-symbols-outlined text-lg md:text-xl">print</span>
                    </button>
                    {organonSubTab === 'aphorisms' && (
                      <button 
                        onClick={() => toggleBookmark(selectedAphorism!.id)}
                        className={`p-2 md:p-3 rounded-2xl transition-colors ${bookmarks.includes(selectedAphorism!.id) ? 'text-primary bg-primary/10' : 'text-slate-400 hover:bg-slate-100 hover:text-primary'}`}
                      >
                        <span className="material-symbols-outlined text-lg md:text-xl">{bookmarks.includes(selectedAphorism!.id) ? 'bookmark_added' : 'bookmark'}</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Content Display */}
                <div className="px-6 md:px-12 py-10 md:py-16 max-w-5xl mx-auto w-full">
                  <div className="mb-12 md:mb-20">
                    <span className="text-[9px] md:text-[10px] font-black text-primary tracking-[0.4em] uppercase block mb-4 md:mb-6">
                      {organonSubTab === 'aphorisms' ? `Aphorism ${selectedAphorism?.id}` : 'Introduction'}
                    </span>
                    <h1 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight mb-8 md:mb-12 leading-tight">
                      {organonSubTab === 'aphorisms' ? selectedAphorism?.title : selectedPreface?.title}
                    </h1>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start">
                      {/* English Text */}
                      <div className="space-y-6 md:space-y-8">
                        <div className="flex items-center gap-3 mb-4 md:mb-6">
                          <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                            <span className="text-[9px] md:text-[10px] font-black text-primary">EN</span>
                          </div>
                          <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400">English Translation</span>
                        </div>
                        <p 
                          className="text-lg md:text-xl font-medium text-slate-800 leading-[1.8] italic border-l-4 border-primary/20 pl-4 md:pl-6"
                          style={{ fontSize: `${(fontSize / 100) * (window.innerWidth < 768 ? 1.1 : 1.25)}rem` }}
                        >
                          "{organonSubTab === 'aphorisms' ? selectedAphorism?.text : selectedPreface?.content}"
                        </p>
                      </div>

                      {/* Bengali Text */}
                      <div className="space-y-6 md:space-y-8">
                        <div className="flex items-center gap-3 mb-4 md:mb-6">
                          <div className="w-8 h-8 rounded-xl bg-secondary/10 flex items-center justify-center">
                            <span className="text-[9px] md:text-[10px] font-black text-secondary">BN</span>
                          </div>
                          <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400">Bengali Translation</span>
                        </div>
                        <p 
                          className="text-xl md:text-2xl font-bold text-slate-900 leading-[1.8]"
                          style={{ fontSize: `${(fontSize / 100) * (window.innerWidth < 768 ? 1.3 : 1.5)}rem` }}
                        >
                          "{organonSubTab === 'aphorisms' ? selectedAphorism?.banglaText : selectedPreface?.banglaContent}"
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Commentary Section */}
                  <div className="mt-24 pt-16 border-t border-slate-100">
                    <div className="flex items-center justify-between mb-10">
                      <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-4">
                        <span className="material-symbols-outlined text-primary text-2xl">comment</span>
                        Clinical Commentary
                      </h3>
                      <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">Add Note</button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 group hover:border-primary/20 transition-all">
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-2xl bg-primary text-white flex items-center justify-center font-black text-xs shadow-lg shadow-primary/20">JT</div>
                            <div>
                              <p className="text-sm font-black text-slate-900">Dr. James T. Kent</p>
                              <p className="text-[9px] text-slate-400 uppercase font-black tracking-widest">Historical Reference</p>
                            </div>
                          </div>
                          <span className="text-[10px] text-slate-400 italic font-bold">Lectures</span>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed font-medium">
                          The first paragraph of the Organon is the most important for every practitioner to realize. It defines the 'mission'—not a mere job, but a high duty to the suffering humanity.
                        </p>
                      </div>

                      <div className="p-8 rounded-[2rem] bg-white border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-300 group hover:border-primary/40 hover:text-primary cursor-pointer transition-all">
                        <span className="material-symbols-outlined text-4xl mb-3 group-hover:scale-110 transition-transform">add_circle</span>
                        <p className="text-[10px] font-black uppercase tracking-widest">Personal Clinical Note</p>
                      </div>
                    </div>
                  </div>

                  {/* Cross References Bento Grid */}
                  <div className="mt-32 mb-20">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-10">Cross References</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="md:col-span-2 bg-slate-900 p-10 rounded-[2.5rem] group hover:bg-primary transition-all duration-500 cursor-pointer relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32" />
                        <div className="flex justify-between items-start mb-16 relative z-10">
                          <span className="material-symbols-outlined text-4xl text-primary group-hover:text-white transition-colors">medical_information</span>
                          <span className="material-symbols-outlined text-white/30 group-hover:text-white transition-colors">north_east</span>
                        </div>
                        <h5 className="text-2xl font-black text-white mb-3 relative z-10">Constitutional Prescribing</h5>
                        <p className="text-sm text-white/60 group-hover:text-white/80 leading-relaxed max-w-md relative z-10">
                          How Aphorism 1 informs the selection of a deep-acting remedy based on the totality.
                        </p>
                      </div>

                      <div className="bg-emerald-500 p-10 rounded-[2.5rem] group hover:shadow-2xl hover:shadow-emerald-500/20 transition-all cursor-pointer text-white">
                        <span className="material-symbols-outlined text-4xl mb-16 block">vital_signs</span>
                        <h5 className="text-xl font-black leading-tight">Vitals & Miasms</h5>
                        <p className="text-[10px] font-black uppercase tracking-widest mt-4 opacity-70">Chronic Diseases Vol 1</p>
                      </div>

                      <div className="bg-amber-500 p-10 rounded-[2.5rem] group hover:shadow-2xl hover:shadow-amber-500/20 transition-all cursor-pointer text-white">
                        <span className="material-symbols-outlined text-4xl mb-16 block">science</span>
                        <h5 className="text-xl font-black leading-tight">Pharmacy Standards</h5>
                        <p className="text-[10px] font-black uppercase tracking-widest mt-4 opacity-70">Aphorism 264-271</p>
                      </div>

                      <div className="md:col-span-2 bg-slate-100 p-10 rounded-[2.5rem] group hover:bg-slate-200 transition-all cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h5 className="text-xl font-black text-slate-900">Case Analysis Hub</h5>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Apply Aphorism 1 to active case files</p>
                          </div>
                          <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-3xl">folder_shared</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center bg-slate-50/30 p-12 text-center">
                <div className="w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center text-slate-200 mb-8 shadow-xl shadow-slate-100">
                  <span className="material-symbols-outlined text-5xl">auto_stories</span>
                </div>
                <h3 className="text-2xl font-black text-slate-400 uppercase tracking-tight">
                  {organonSubTab === 'aphorisms' ? 'Select an Aphorism' : 'Select an Introduction'}
                </h3>
                <p className="text-slate-300 text-sm max-w-xs mt-4 font-bold">
                  {organonSubTab === 'aphorisms' 
                    ? 'Choose an aphorism from the list to read the foundational principles of Homeopathy.' 
                    : 'Explore the historical prefaces and introductions to the Organon.'}
                </p>
              </div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </div>
  );
};

export const PracticeMedicineTab = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<DiseaseCategory | null>(null);
  
  const filteredCategories = PRACTICE_MEDICINE_DATA.filter(cat => 
    cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.banglaName.includes(searchQuery) ||
    cat.diseases.some(d => d.name.toLowerCase().includes(searchQuery.toLowerCase()) || d.banglaName.includes(searchQuery))
  );

  return (
    <div className="space-y-12 pb-24">
      {/* Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="col-span-1 lg:col-span-8">
          <h3 className="font-headline text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight tracking-tight mb-4">
            Systemic Therapeutics & <br/><span className="text-[#005f6f]">Differential Diagnosis</span>
          </h3>
          <p className="text-slate-600 max-w-2xl leading-relaxed text-sm md:text-base">
            Access the Editorial Guide for internal medicine. This repository links physiological systems to clinical pathologies, designed specifically for homeopathic repertorization and acute case management. 
          </p>
        </div>
        <div className="col-span-1 lg:col-span-4 bg-[#98f994]/20 p-6 rounded-xl relative overflow-hidden shadow-sm border border-[#006519]/10">
          <div className="relative z-10">
            <span className="text-[#006519] font-bold text-xs uppercase tracking-widest block mb-2">Practice Vitality</span>
            <p className="text-[#002204] text-lg font-semibold leading-snug">642 Diagnoses Integrated with Repertory Rubrics</p>
          </div>
          <span className="material-symbols-outlined absolute -bottom-4 -right-4 text-8xl text-[#006519]/10 rotate-12" style={{ fontVariationSettings: "'FILL' 1" }}>medical_services</span>
        </div>
      </section>

      {/* Body Systems Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCategories.map((cat, i) => (
          <motion.div 
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white p-6 rounded-2xl shadow-apothecary hover:shadow-apothecary-hover transition-all duration-500 border border-slate-100 flex flex-col h-full group"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#c8e5ea] rounded-xl flex items-center justify-center text-[#005f6f] shadow-inner group-hover:scale-110 transition-transform duration-500">
                  <span className="material-symbols-outlined text-3xl">{cat.materialIcon || 'medical_services'}</span>
                </div>
                <div>
                  <h4 className="font-headline font-bold text-xl text-slate-900">{cat.name}</h4>
                  <p className="text-[#005f6f] text-xs font-bold uppercase tracking-wide">{cat.banglaName}</p>
                </div>
              </div>
              {cat.miasm && (
                <span className={`miasm-badge ${
                  cat.miasm.includes('Psora') ? 'bg-blue-100 text-blue-700' : 
                  cat.miasm.includes('Syc') ? 'bg-orange-100 text-orange-700' : 
                  cat.miasm.includes('Syph') ? 'bg-red-100 text-red-700' : 
                  'bg-purple-100 text-purple-700'
                }`}>
                  {cat.miasm}
                </span>
              )}
            </div>

            <div className="flex-grow space-y-4">
              {cat.clinicalKeys && cat.clinicalKeys.length > 0 && (
                <div className="bg-[#f1f4f4] p-3 rounded-lg border border-[#e6e9e9]">
                  <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">analytics</span> Clinical Keys
                  </h5>
                  <ul className="text-xs space-y-1 text-slate-700">
                    {cat.clinicalKeys.map((key, idx) => (
                      <li key={idx} className="flex items-start gap-2">• {key}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="space-y-2 border-t border-slate-50 pt-3">
                <h5 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Common Conditions</h5>
                {cat.diseases.slice(0, 3).map((disease, idx) => (
                  <div key={idx} className="flex items-center justify-between text-sm group/item cursor-pointer">
                    <span className="text-slate-600 font-medium group-hover/item:text-[#005f6f]">{disease.name}</span>
                    <span className="material-symbols-outlined text-slate-300 text-lg group-hover/item:text-[#005f6f] transition-colors">chevron_right</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <button 
                onClick={() => setSelectedCategory(cat)}
                className="flex-1 text-[10px] font-bold uppercase tracking-wider py-2 bg-[#005f6f]/5 text-[#005f6f] border border-[#005f6f]/10 rounded-lg hover:bg-[#005f6f] hover:text-white transition-all"
              >
                View All {cat.diseases.length}
              </button>
              <button className="flex-1 text-[10px] font-bold uppercase tracking-wider py-2 bg-slate-50 text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-100 transition-all">
                MM Ref
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Category Detail Modal */}
      <AnimatePresence>
        {selectedCategory && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCategory(null)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-3xl rounded-[2.5rem] shadow-2xl overflow-hidden z-10"
            >
              <div className="p-8 bg-gradient-to-br from-[#c8e5ea] to-blue-50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#005f6f]/10 rounded-full blur-3xl -mr-24 -mt-24 opacity-40" />
                <button 
                  onClick={() => setSelectedCategory(null)}
                  className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 hover:bg-white rounded-xl transition shadow-sm"
                >
                  <X size={20} />
                </button>
                
                <div className="flex items-center gap-6 relative z-10">
                  <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-5xl shadow-xl shadow-[#005f6f]/10 text-[#005f6f]">
                    <span className="material-symbols-outlined text-5xl">{selectedCategory.materialIcon || 'medical_services'}</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">{selectedCategory.name}</h3>
                    <p className="text-sm text-[#005f6f] font-black uppercase tracking-widest">{selectedCategory.banglaName}</p>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Complete Disease List</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                  {selectedCategory.diseases.map((disease, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-[#005f6f]/20 hover:bg-white transition-all group">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center text-[#005f6f] font-black text-xs shadow-sm group-hover:bg-[#005f6f] group-hover:text-white transition-all">
                          {i + 1}
                        </div>
                        <span className="text-sm font-black text-slate-800">{disease.name}</span>
                      </div>
                      <span className="text-xs font-bold text-slate-400 group-hover:text-[#005f6f]">{disease.banglaName}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total: {selectedCategory.diseases.length} Conditions</p>
                <button 
                  onClick={() => setSelectedCategory(null)}
                  className="px-8 py-3 bg-slate-900 text-white rounded-2xl text-xs font-black hover:bg-slate-800 transition shadow-lg shadow-slate-200"
                >
                  CLOSE VIEW
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const KnowledgeTab = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<KnowledgeTopic | null>(null);
  const [activeFilter, setActiveFilter] = useState<'All' | 'Research' | 'Case Study' | 'Protocol'>('All');
  
  const [showAllBooks, setShowAllBooks] = useState(false);
  
  const filteredArticles = RECENT_ARTICLES.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'All' || article.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const filteredTopics = KNOWLEDGE_DATA.filter(topic => 
    topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.banglaTitle.includes(searchQuery)
  );

  const filteredBooks = CLASSIC_BOOKS.filter(book => 
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, showAllBooks ? undefined : 3);

  return (
    <div className="px-4 py-8 lg:px-10 lg:py-12 space-y-16 overflow-y-auto h-[calc(100vh-180px)] custom-scrollbar">
      {/* Search & Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white shadow-xl shadow-primary/20 rotate-3">
            <GraduationCap size={32} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Knowledge Repository</h2>
            <p className="text-xs text-primary font-black uppercase tracking-widest mt-1">Educational Resources & Foundations</p>
          </div>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search resources / খুঁজুন..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>
      </div>

      {/* Quick Stats / Highlights */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Classic Books', value: CLASSIC_BOOKS.length, icon: <Book size={16} />, color: 'bg-blue-50 text-blue-600' },
          { label: 'Research Papers', value: RECENT_ARTICLES.filter(a => a.type === 'Research').length, icon: <FileText size={16} />, color: 'bg-emerald-50 text-emerald-600' },
          { label: 'Anatomy Systems', value: PHYSIOLOGY_ANATOMY_DATA.length, icon: <Activity size={16} />, color: 'bg-rose-50 text-rose-600' },
          { label: 'Clinical Topics', value: KNOWLEDGE_DATA.length, icon: <Brain size={16} />, color: 'bg-indigo-50 text-indigo-600' },
        ].map((stat, i) => (
          <div key={i} className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-lg font-black text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Core Knowledge Topics */}
      <section className="space-y-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
            <Brain size={24} />
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Core Foundations</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTopics.map((topic, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedTopic(topic)}
              className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  {topic.icon}
                </div>
                <div>
                  <h3 className="font-black text-slate-900 group-hover:text-indigo-600 transition-colors">{topic.title}</h3>
                  <p className="text-[10px] text-indigo-600 font-black uppercase tracking-widest">{topic.banglaTitle}</p>
                </div>
              </div>
              <p className="text-xs text-slate-500 font-medium leading-relaxed line-clamp-2">
                {topic.desc}
              </p>
              <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Learn More</span>
                <ArrowRight size={14} className="text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Hero / Featured Section */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-3 block">Curated Selection</span>
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">Classic Texts</h2>
          </div>
          <button 
            onClick={() => setShowAllBooks(!showAllBooks)}
            className="text-xs font-black text-primary uppercase tracking-widest flex items-center gap-2 group hover:opacity-80 transition-all"
          >
            {showAllBooks ? 'Show Featured' : 'Browse Full Collection'} 
            <ArrowRight size={16} className={`group-hover:translate-x-1 transition-transform ${showAllBooks ? 'rotate-90' : ''}`} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBooks.map((book, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group relative bg-white rounded-[2rem] overflow-hidden shadow-sm border border-slate-100 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
            >
              <div className="aspect-[3/4] overflow-hidden bg-slate-50 relative">
                <img 
                  src={book.image} 
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[10px] font-black text-primary uppercase tracking-widest rounded-full shadow-sm">
                    {book.category}
                  </span>
                </div>
              </div>
              <div className="p-8 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{book.author}</span>
                </div>
                <h3 className="text-xl font-black text-slate-900 leading-tight group-hover:text-primary transition-colors">
                  {book.title}
                </h3>
                <p className="text-sm text-slate-500 font-medium line-clamp-2 leading-relaxed">
                  {book.description}
                </p>
                <div className="pt-4 flex items-center justify-between">
                  <button className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-2 group/btn">
                    Read Online <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                  <Bookmark size={16} className="text-slate-300 hover:text-primary cursor-pointer transition-colors" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Categories Bento Grid */}
      <section className="space-y-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
            <Database size={24} />
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Resource Categories</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[160px]">
          {KNOWLEDGE_CATEGORIES.map((cat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              className={`${cat.span || ''} ${cat.color} rounded-[2.5rem] p-8 flex flex-col justify-between group cursor-pointer relative overflow-hidden border border-black/5 hover:shadow-xl transition-all`}
            >
              <span className="material-symbols-outlined text-6xl text-black/5 absolute -right-4 -bottom-4 scale-150 rotate-12 group-hover:rotate-0 transition-transform duration-700">
                {cat.icon}
              </span>
              <div className="relative z-10">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">{cat.title}</h3>
                <p className="text-sm text-slate-600 font-medium mt-2 max-w-[240px] opacity-80 leading-relaxed">
                  {cat.description}
                </p>
              </div>
              <div className="flex items-center justify-between relative z-10">
                {cat.count && (
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-white/50 px-3 py-1 rounded-full">
                    {cat.count}
                  </span>
                )}
                <div className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center text-slate-900 group-hover:bg-primary group-hover:text-white transition-all">
                  <ArrowRight size={20} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Recently Added Articles */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
              <FileText size={24} />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Recent Publications</h2>
          </div>
          <div className="flex bg-slate-100 p-1 rounded-xl">
            {['All', 'Research', 'Case Study', 'Protocol'].map(tab => (
              <button 
                key={tab} 
                onClick={() => setActiveFilter(tab as any)}
                className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${activeFilter === tab ? 'bg-white text-primary shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-6 rounded-[2rem] border border-slate-100 flex flex-col md:flex-row md:items-center justify-between group hover:bg-slate-50 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
              >
                <div className="flex gap-6 items-center">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                    article.type === 'Research' ? 'bg-blue-50 text-blue-600' : 
                    article.type === 'Case Study' ? 'bg-emerald-50 text-emerald-600' : 
                    'bg-amber-50 text-amber-600'
                  }`}>
                    <FileText size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-slate-900 group-hover:text-primary transition-colors leading-tight mb-2">
                      {article.title}
                    </h4>
                    <div className="flex flex-wrap gap-4">
                      <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1.5 uppercase tracking-widest">
                        <User size={12} /> {article.author}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1.5 uppercase tracking-widest">
                        <Calendar size={12} /> {article.date}
                      </span>
                      {article.isPeerReviewed && (
                        <span className="text-[10px] font-black text-emerald-600 px-2.5 py-0.5 bg-emerald-50 rounded-full uppercase tracking-widest border border-emerald-100">
                          Peer Reviewed
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-4 md:mt-0">
                  <button className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all">
                    <Upload size={20} className="rotate-180" />
                  </button>
                  <button className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white transition-all">
                    <Eye size={20} />
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12 bg-slate-50 rounded-[2rem] border border-dashed border-slate-200">
              <p className="text-slate-400 font-bold">No articles found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Topic Detail Modal */}
      <AnimatePresence>
        {selectedTopic && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTopic(null)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden z-10"
            >
              <div className="p-8 bg-indigo-50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-600/10 rounded-full blur-3xl -mr-24 -mt-24 opacity-40" />
                <button 
                  onClick={() => setSelectedTopic(null)}
                  className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 hover:bg-white rounded-xl transition shadow-sm"
                >
                  <X size={20} />
                </button>
                
                <div className="flex items-center gap-6 relative z-10">
                  <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-5xl shadow-xl shadow-indigo-500/10 text-indigo-600">
                    {selectedTopic.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">{selectedTopic.title}</h3>
                    <p className="text-sm text-indigo-600 font-black uppercase tracking-widest">{selectedTopic.banglaTitle}</p>
                  </div>
                </div>
              </div>

              <div className="p-8 space-y-6">
                <div>
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Topic Description</h4>
                  <p className="text-lg text-slate-700 font-medium leading-relaxed">
                    {selectedTopic.desc}
                  </p>
                </div>
                <div>
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Bengali Explanation</h4>
                  <p className="text-lg text-indigo-600 font-bold leading-relaxed">
                    {selectedTopic.banglaDesc}
                  </p>
                </div>

                {selectedTopic.details && (
                  <div className="space-y-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {selectedTopic.details.map((section, sIdx) => (
                      <div key={sIdx} className="space-y-3">
                        <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]">{section.title}</h4>
                        <ul className="grid grid-cols-1 gap-2">
                          {section.items.map((item, iIdx) => (
                            <li key={iIdx} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs font-bold text-slate-700">
                              <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Related Resources</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <button className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200 hover:border-indigo-500 transition-all group">
                      <Book size={16} className="text-indigo-600" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 group-hover:text-indigo-600">Classic Texts</span>
                    </button>
                    <button className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200 hover:border-indigo-500 transition-all group">
                      <FileText size={16} className="text-indigo-600" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 group-hover:text-indigo-600">Case Studies</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
                <button 
                  onClick={() => setSelectedTopic(null)}
                  className="px-8 py-3 bg-slate-900 text-white rounded-2xl text-xs font-black hover:bg-slate-800 transition shadow-lg shadow-slate-200"
                >
                  CLOSE TOPIC
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const PathologyTab = () => {
  const [activeSubTab, setActiveSubTab] = useState<'clinical' | 'diagnostic'>('clinical');
  const [selectedSystem, setSelectedSystem] = useState<string>('respiratory');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConditions = PATHOLOGY_CONDITIONS.filter(c => 
    c.system === selectedSystem && 
    (c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
     c.banglaName.includes(searchQuery))
  );

  const [selectedConditionId, setSelectedConditionId] = useState<string>(filteredConditions[0]?.id || '');

  // Update selected condition when system changes if current selection is not in the new system
  useEffect(() => {
    if (filteredConditions.length > 0 && !filteredConditions.find(c => c.id === selectedConditionId)) {
      setSelectedConditionId(filteredConditions[0].id);
    }
  }, [selectedSystem, filteredConditions, selectedConditionId]);

  const selectedCondition = PATHOLOGY_CONDITIONS.find(c => c.id === selectedConditionId) || filteredConditions[0] || PATHOLOGY_CONDITIONS[0];

  const getSystemCount = (systemId: string) => {
    return PATHOLOGY_CONDITIONS.filter(c => c.system === systemId).length;
  };

  const filteredTests = PATHOLOGY_DATA.filter(test => 
    test.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    test.banglaName.includes(searchQuery) ||
    test.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    test.banglaCategory.includes(searchQuery)
  );

  const groupedTests = useMemo(() => {
    const groups: Record<string, { tests: typeof PATHOLOGY_DATA, banglaCategory: string }> = {};
    filteredTests.forEach(test => {
      if (!groups[test.category]) {
        groups[test.category] = { tests: [], banglaCategory: test.banglaCategory };
      }
      groups[test.category].tests.push(test);
    });
    return groups;
  }, [filteredTests]);

  return (
    <div className="space-y-6">
      {/* Sub-Tab Toggle */}
      <div className="flex justify-center px-4">
        <div className="bg-slate-100 p-1.5 rounded-2xl flex gap-1 shadow-inner w-full max-w-md overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveSubTab('clinical')}
            className={`flex-1 px-4 sm:px-8 py-2.5 rounded-xl text-[10px] sm:text-xs font-black transition-all whitespace-nowrap ${
              activeSubTab === 'clinical' 
                ? 'bg-white text-emerald-600 shadow-sm' 
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            CLINICAL BROWSER
          </button>
          <button
            onClick={() => setActiveSubTab('diagnostic')}
            className={`flex-1 px-4 sm:px-8 py-2.5 rounded-xl text-[10px] sm:text-xs font-black transition-all whitespace-nowrap ${
              activeSubTab === 'diagnostic' 
                ? 'bg-white text-rose-600 shadow-sm' 
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            DIAGNOSTIC TESTS
          </button>
        </div>
      </div>

      {activeSubTab === 'clinical' ? (
        <div className="flex flex-col lg:flex-row h-auto lg:h-[calc(100vh-240px)] gap-6 overflow-hidden">
          {/* Sidebar: Systems & Conditions */}
          <aside className="w-full lg:w-80 flex flex-col gap-6 lg:overflow-y-auto lg:pr-2 custom-scrollbar">
            {/* Systems Selection */}
            <div className="space-y-3">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2">Systems</h3>
              <div className="flex lg:grid lg:grid-cols-1 gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 no-scrollbar">
                {PATHOLOGY_SYSTEMS.map((system) => {
                  const count = getSystemCount(system.id);
                  return (
                    <button
                      key={system.id}
                      onClick={() => setSelectedSystem(system.id)}
                      className={`flex items-center justify-between p-4 rounded-2xl transition-all group shrink-0 lg:shrink ${
                        selectedSystem === system.id 
                          ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' 
                          : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`material-symbols-outlined ${selectedSystem === system.id ? 'text-white' : 'text-emerald-600'}`}>
                          {system.icon}
                        </span>
                        <span className="text-sm font-black tracking-tight whitespace-nowrap">{system.name}</span>
                      </div>
                      <span className={`hidden lg:block text-[10px] font-black px-2 py-0.5 rounded-full ${
                        selectedSystem === system.id ? 'bg-white/20' : 'bg-slate-100 text-slate-400'
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Conditions List */}
            <div className="flex-1 space-y-3">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Conditions</h3>
                <div className="relative">
                  <Search size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-6 pr-2 py-1 bg-slate-100 border-none rounded-lg text-[10px] font-bold focus:ring-1 focus:ring-emerald-500/20 outline-none w-32"
                  />
                </div>
              </div>
              <div className="space-y-1">
                {filteredConditions.map((condition) => (
                  <button
                    key={condition.id}
                    onClick={() => setSelectedConditionId(condition.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all text-left ${
                      selectedConditionId === condition.id 
                        ? 'bg-emerald-50 text-emerald-700 border-l-4 border-emerald-600' 
                        : 'hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-bold">{condition.name}</span>
                      <span className="text-[10px] opacity-60 font-medium">{condition.banglaName}</span>
                    </div>
                    <ChevronRight size={14} className={selectedConditionId === condition.id ? 'opacity-100' : 'opacity-0'} />
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Detail View */}
          <main className="flex-1 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-y-auto custom-scrollbar p-8 lg:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCondition.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-full">
                        Clinical Review
                      </span>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        ICD-10: {selectedCondition.icd10}
                      </span>
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-4">
                      {selectedCondition.name}
                    </h1>
                    <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-2xl">
                      {selectedCondition.description}
                    </p>
                    
                    {/* Bengali Translation Card */}
                    <div className="mt-8 p-6 bg-slate-50 rounded-3xl border border-slate-100 flex gap-4 items-start">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm shrink-0">
                        <Type size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Bengali Translation</p>
                        <p className="text-sm font-bold text-slate-700 leading-relaxed">
                          {selectedCondition.banglaDescription}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-4 shrink-0">
                    <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-xs font-black hover:bg-slate-800 transition shadow-xl shadow-slate-200">
                      <Plus size={16} /> ADD TO CASE
                    </button>
                    <div className="flex -space-x-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-black border-4 border-white shadow-sm" title="Systemic">S</div>
                      <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-black border-4 border-white shadow-sm" title="Acute">A</div>
                    </div>
                  </div>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
                  {/* Diagnostic Indicators */}
                  <div className="lg:col-span-7 bg-slate-50 rounded-[2rem] p-8 border border-slate-100">
                    <h3 className="text-xs font-black text-emerald-600 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
                      <ClipboardList size={16} /> Diagnostic Indicators
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {selectedCondition.diagnosticIndicators.map((indicator, idx) => (
                        <div key={idx} className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm group hover:border-emerald-200 transition-colors">
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2">{indicator.label}</span>
                          <p className="text-xs font-bold text-slate-700 leading-relaxed">{indicator.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Visual Context */}
                  <div className="lg:col-span-5 rounded-[2rem] overflow-hidden relative min-h-[300px] shadow-xl">
                    <img 
                      src={selectedCondition.visualContext.image} 
                      alt={selectedCondition.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex items-end p-8">
                      <p className="text-white text-xs font-bold leading-relaxed opacity-90">
                        {selectedCondition.visualContext.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Homeopathic Correlation */}
                <div className="bg-white rounded-[2.5rem] p-8 lg:p-10 border border-slate-100 shadow-sm">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                        <Leaf size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Homeopathic Correlation</h3>
                        <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest">Suggested Remedies & Potencies</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <span className="px-4 py-1.5 bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-100">
                        Filtered: {selectedSystem} Focus
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {selectedCondition.homeopathicRemedies.map((remedy, idx) => (
                      <div key={idx} className="group cursor-pointer">
                        <div className="p-6 rounded-3xl bg-slate-50 group-hover:bg-emerald-50 transition-all duration-500 border-l-4 border-emerald-600 mb-4">
                          <div className="flex justify-between items-start mb-4">
                            <h4 className="text-lg font-black text-emerald-700 group-hover:scale-105 transition-transform origin-left">
                              {remedy.name}
                            </h4>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{remedy.potency}</span>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed font-medium mb-4">
                            {remedy.description}
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {remedy.keySymptoms.map((symptom, sIdx) => (
                              <span key={sIdx} className="px-2 py-0.5 bg-white text-[9px] font-bold text-slate-500 rounded-md border border-slate-100">
                                {symptom}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex justify-between items-center px-2">
                          <span className="text-[9px] font-black uppercase tracking-widest text-emerald-600/60">Miasm: {remedy.miasm}</span>
                          <button className="p-2 text-slate-300 hover:text-emerald-600 transition-colors">
                            <Bookmark size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      ) : (
        <div className="space-y-8 pb-12 h-[calc(100vh-240px)] overflow-y-auto custom-scrollbar pr-2">
          {/* Header Section */}
          <div className="relative overflow-hidden bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className="absolute top-0 right-0 w-64 h-64 bg-rose-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-60" />
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 bg-rose-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-rose-200 rotate-6">
                  <FlaskConical size={32} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Pathology Menu</h2>
                  <p className="text-xs text-rose-600 font-black uppercase tracking-widest mt-1">Diagnostic Tests & Lab Reports</p>
                </div>
              </div>

              <div className="relative w-full md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search tests / খুঁজুন..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
                />
              </div>
            </div>
          </div>

          <div className="space-y-10">
            {Object.entries(groupedTests).map(([category, group], i) => {
              const g = group as { tests: typeof PATHOLOGY_DATA, banglaCategory: string };
              return (
                <motion.div 
                  key={category}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between px-2">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-8 bg-rose-500 rounded-full" />
                      <div>
                        <h4 className="text-lg font-black text-slate-800 uppercase tracking-tight">
                          {category}
                        </h4>
                        <p className="text-[10px] text-rose-600 font-black uppercase tracking-widest">{g.banglaCategory}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full">
                      {g.tests.length} Tests
                    </span>
                  </div>

                  <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-50/50">
                            <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest w-1/2">Test Name & Description</th>
                            <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Reference / Normal Range</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                          {g.tests.map((test, idx) => (
                            <tr key={idx} className="hover:bg-rose-50/30 transition-colors group">
                              <td className="p-6">
                                <div className="flex items-center gap-4">
                                  <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-rose-600 font-black text-xs group-hover:bg-rose-600 group-hover:text-white transition-all">
                                    {idx + 1}
                                  </div>
                                  <div>
                                    <div className="font-black text-slate-800 text-sm">{test.name}</div>
                                    <div className="text-xs text-slate-400 font-bold">{test.banglaName}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="p-6">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-700 rounded-xl text-xs font-black border border-rose-100">
                                  <Activity size={14} className="opacity-50" />
                                  {test.normal}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {Object.keys(groupedTests).length === 0 && (
              <div className="py-20 text-center bg-white rounded-[2.5rem] border border-dashed border-slate-200">
                <FlaskConical size={48} className="mx-auto text-slate-200 mb-4" />
                <p className="text-slate-400 font-bold">No diagnostic tests found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

