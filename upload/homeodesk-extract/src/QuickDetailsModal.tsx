import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Filter, Search, ArrowRightLeft, History } from 'lucide-react';
import { Remedy as MateriaRemedy } from './materiaMedicaData';

export const QuickDetailsModal = ({ remedy, onClose }: { remedy: MateriaRemedy, onClose: () => void }) => {
  const [activeBilingualTab, setActiveBilingualTab] = useState(0);
  const [language, setLanguage] = useState<'en' | 'bn'>('en');

  if (!remedy) return null;

  const bilingualData = [
    {
      enLabel: 'Key Indications',
      bnLabel: 'প্রধান লক্ষণসমূহ',
      enData: remedy.keyIndications,
      bnData: remedy.banglaIndications,
    },
    {
      enLabel: 'Main Symptoms',
      bnLabel: 'প্রধান উপসর্গসমূহ',
      enData: remedy.mainSymptoms,
      bnData: remedy.banglaMainSymptoms,
    },
    {
      enLabel: 'Mind & Mental Symptoms',
      bnLabel: 'মানসিক লক্ষণসমূহ',
      enData: remedy.mind,
      bnData: remedy.banglaMind,
    }
  ];

  const currentTab = bilingualData[activeBilingualTab];

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm overflow-y-auto"
      >
        <div className="min-h-screen py-10 px-4 md:px-8 flex justify-center">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="w-full max-w-6xl bg-surface rounded-2xl shadow-2xl relative overflow-hidden flex flex-col font-inter"
          >
            {/* Top Bar inside modal */}
            <header className="sticky top-0 z-40 bg-[#f7fafa]/90 backdrop-blur-md flex justify-between items-center w-full px-8 py-4 border-b border-outline-variant/20">
              <div className="flex items-center gap-8">
                <h1 className="text-xl font-bold text-[#181c1d] tracking-tight">The Clinical Editorial</h1>
              </div>
              <div className="flex items-center gap-4">
                <button onClick={onClose} className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface hover:bg-surface-container-highest transition-colors">
                  <X size={18} />
                </button>
              </div>
            </header>

            <div className="p-8 space-y-12 flex-1 overflow-y-auto">
              {/* Browser Header & Filters */}
              <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
                <div className="md:col-span-7">
                  <h2 className="font-manrope text-3xl font-extrabold text-on-surface tracking-tight mb-2">Materia Medica Reference</h2>
                  <p className="text-on-surface-variant font-body max-w-xl">Comprehensive clinical references for homeopathic remedies, integrating classical pathogenesis with modern clinical observations.</p>
                </div>
                <div className="md:col-span-5 flex flex-wrap gap-2 justify-end">
                  <div className="flex gap-1 p-1 bg-surface-container-low rounded-xl">
                    <button 
                      onClick={() => setLanguage('en')}
                      className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${language === 'en' ? 'bg-white shadow-sm text-primary' : 'hover:bg-white/50 text-outline'}`}
                    >
                      English
                    </button>
                    <button 
                      onClick={() => setLanguage('bn')}
                      className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${language === 'bn' ? 'bg-white shadow-sm text-primary' : 'hover:bg-white/50 text-outline'}`}
                    >
                      Bengali (বাংলা)
                    </button>
                  </div>
                </div>
              </section>

              {/* Main Workspace Layout: Bento Grid */}
              <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Remedy Detail Header Card */}
                <div className="md:col-span-8 bg-surface-container-lowest rounded-xl p-8 shadow-[0_12px_40px_rgba(0,31,38,0.04)] border border-outline-variant/10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-full -mr-20 -mt-20"></div>
                  <div className="flex items-start justify-between relative z-10">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-2 py-0.5 bg-tertiary-fixed text-on-tertiary-fixed text-[10px] font-bold uppercase tracking-widest rounded">{remedy.kingdom || 'Remedy'}</span>
                        <span className="text-outline text-[10px] font-bold uppercase tracking-widest">{remedy.isPolychrest ? 'Polychrest' : 'Standard'}</span>
                      </div>
                      <h3 className="font-manrope text-5xl font-black text-on-surface leading-none mb-4">{remedy.name}</h3>
                      <p className="text-lg text-primary font-medium italic">{remedy.commonName}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-outline uppercase tracking-widest mb-1">Common Potency</p>
                      <p className="font-manrope text-2xl font-bold text-on-surface">{remedy.dosage || '30c - 200c'}</p>
                    </div>
                  </div>
                  
                  <div className="mt-8 grid grid-cols-2 gap-8 border-t border-outline-variant/20 pt-8 relative z-10">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
                        {language === 'en' ? 'Sphere of Action' : 'কর্মক্ষেত্র'}
                      </h4>
                      <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                        {language === 'en' 
                          ? (remedy.appearance || remedy.location || 'Not specified')
                          : (remedy.banglaAppearance || remedy.banglaLocation || remedy.appearance || remedy.location || 'উল্লেখ নেই')
                        }
                      </p>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
                        {language === 'en' ? 'Pathogenesis' : 'রোগতত্ত্ব'}
                      </h4>
                      <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                        {language === 'en'
                          ? (remedy.description || 'Not specified')
                          : (remedy.banglaDescription || remedy.description || 'উল্লেখ নেই')
                        }
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 grid grid-cols-2 gap-8 border-t border-outline-variant/20 pt-8 relative z-10">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
                        {language === 'en' ? 'Sensation & Pain' : 'অনুভূতি ও ব্যথা'}
                      </h4>
                      <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                        {language === 'en' ? (
                          <>
                            <strong>Sensation:</strong> {remedy.sensation || 'Not specified'}<br/>
                            <strong>Pain:</strong> {remedy.pain || 'Not specified'}
                          </>
                        ) : (
                          <>
                            <strong>অনুভূতি:</strong> {remedy.banglaSensation || remedy.sensation || 'উল্লেখ নেই'}<br/>
                            <strong>ব্যথা:</strong> {remedy.banglaPain || remedy.pain || 'উল্লেখ নেই'}
                          </>
                        )}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
                        {language === 'en' ? 'Desires & Aversions' : 'ইচ্ছা ও অনীহা'}
                      </h4>
                      <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                        {language === 'en' ? (
                          <>
                            <strong>Desire:</strong> {remedy.desire || 'Not specified'}<br/>
                            <strong>Aversion:</strong> {remedy.aversion || 'Not specified'}
                          </>
                        ) : (
                          <>
                            <strong>ইচ্ছা:</strong> {remedy.banglaDesire || remedy.desire || 'উল্লেখ নেই'}<br/>
                            <strong>অনীহা:</strong> {remedy.banglaAversion || remedy.aversion || 'উল্লেখ নেই'}
                          </>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 grid grid-cols-2 gap-8 border-t border-outline-variant/20 pt-8 relative z-10">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
                        {language === 'en' ? 'Modalities & Time' : 'হ্রাস-বৃদ্ধি ও সময়'}
                      </h4>
                      <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                        {language === 'en' ? (
                          <>
                            <strong>Modality:</strong> {remedy.modality || 'Not specified'}<br/>
                            <strong>Time:</strong> {remedy.time || 'Not specified'}
                          </>
                        ) : (
                          <>
                            <strong>হ্রাস-বৃদ্ধি:</strong> {remedy.banglaModality || remedy.modality || 'উল্লেখ নেই'}<br/>
                            <strong>সময়:</strong> {remedy.banglaTime || remedy.time || 'উল্লেখ নেই'}
                          </>
                        )}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
                        {language === 'en' ? 'Therapeutic Guidelines' : 'চিকিৎসা নির্দেশিকা'}
                      </h4>
                      <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                        {language === 'en' ? (
                          <>
                            <strong>Contraindications:</strong> {remedy.contraindications || 'None specified'}
                          </>
                        ) : (
                          <>
                            <strong>প্রতিনির্দেশ:</strong> {remedy.banglaContraindications || remedy.contraindications || 'উল্লেখ নেই'}
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Authors & Authorities */}
                <div className="md:col-span-4 bg-surface-container-low rounded-xl p-6 flex flex-col">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-6">
                    {language === 'en' ? 'Preparation Details' : 'প্রস্তুতি ও অন্য বিষয়'}
                  </h4>
                  <div className="space-y-6 flex-1">
                    <div className="p-4 bg-white/60 rounded-xl border-l-4 border-primary mt-4">
                      <p className="text-[10px] font-bold text-outline uppercase tracking-tighter mb-1">
                        {language === 'en' ? 'Observation (Mind)' : 'পর্যবেক্ষণ (মন)'}
                      </p>
                      <p className="font-body text-xs text-on-surface leading-snug">
                        {language === 'en' 
                          ? (remedy.mentalState || remedy.mind?.join(', ') || 'Known for acute, sudden manifestations.')
                          : (remedy.banglaMentalState || remedy.banglaMind?.join(', ') || remedy.mentalState || remedy.mind?.join(', ') || 'উল্লেখ নেই')
                        }
                      </p>
                    </div>
                    <div className="p-4 bg-white/40 rounded-xl">
                      <p className="text-[10px] font-bold text-outline uppercase tracking-tighter mb-1">
                        {language === 'en' ? 'Key Note (Causation)' : 'প্রধান কারণ'}
                      </p>
                      <p className="font-body text-xs text-on-surface leading-snug">
                        {language === 'en'
                          ? (remedy.causation || 'Sudden onset. Extreme restlessness.')
                          : (remedy.banglaCausation || remedy.causation || 'উল্লেখ নেই')
                        }
                      </p>
                    </div>
                    <div className="p-4 bg-white/40 rounded-xl">
                      <p className="text-[10px] font-bold text-outline uppercase tracking-tighter mb-1">
                        {language === 'en' ? 'Pharmacology' : 'ফার্মাকোলজি'}
                      </p>
                      <p className="font-body text-xs text-on-surface leading-snug">
                        {language === 'en' ? 'Requires meticulous serial dilution.' : 'সতর্কতার সাথে ধারাবাহিক লঘুকরণ প্রয়োজন।'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Disease Classification Section */}
                <div className="md:col-span-4 bg-surface-container-highest/40 rounded-xl p-6">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-6">
                    {language === 'en' ? 'Disease Classification' : 'রোগের শ্রেণীবিভাগ'}
                  </h4>
                  <div className="space-y-3">
                    {(language === 'en' ? remedy.mainSymptoms : (remedy.banglaMainSymptoms || remedy.mainSymptoms))?.slice(0, 4).map((symptom, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-white rounded-lg group hover:bg-primary-container hover:text-white transition-colors cursor-pointer">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium">{symptom}</span>
                        </div>
                      </div>
                    )) || (
                      <>
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg"><span className="text-sm font-medium">{language === 'en' ? 'Respiratory' : 'শ্বসনতন্ত্র'}</span></div>
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg"><span className="text-sm font-medium">{language === 'en' ? 'Circulatory' : 'সংবহনতন্ত্র'}</span></div>
                      </>
                    )}
                  </div>
                </div>

                {/* Bilingual Comparison Canvas - Only show if language is English, or conditionally show only Bengali if active */}
                <div className="md:col-span-8 space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-primary">
                      {language === 'en' ? 'Detailed Symptomatology (Bilingual)' : 'বিস্তারিত লক্ষণসমূহ'}
                    </h4>
                    <div className="flex gap-1">
                      {bilingualData.map((tab, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setActiveBilingualTab(i)}
                          className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${activeBilingualTab === i ? 'bg-primary text-white shadow-sm' : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'}`}
                          aria-label={`Show ${language === 'en' ? tab.enLabel : tab.bnLabel}`}
                        >
                          {language === 'en' ? tab.enLabel : tab.bnLabel}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className={`grid grid-cols-1 ${language === 'en' ? 'md:grid-cols-2' : ''} gap-px bg-outline-variant/20 rounded-xl overflow-hidden`}>
                    {/* English Content */}
                    {language === 'en' && (
                      <div className="bg-white p-6 space-y-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[10px] font-bold text-outline uppercase tracking-widest">{currentTab.enLabel}</span>
                        </div>
                        <div className="space-y-4">
                          {currentTab.enData?.length ? currentTab.enData.map((ind, i) => (
                            <div key={`en-${i}`} className="pb-4 border-b border-surface-container last:border-0 last:pb-0">
                              <p className="font-body text-xs text-on-surface-variant leading-relaxed">{ind}</p>
                            </div>
                          )) : (
                            <div className="pb-4">
                              <p className="font-body text-xs text-on-surface-variant/50 italic leading-relaxed">No data available.</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {/* Bengali Content */}
                    <div className="bg-[#fcfdfe] p-6 space-y-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-bold text-outline uppercase tracking-widest">{currentTab.bnLabel}</span>
                      </div>
                      <div className="space-y-4">
                        {currentTab.bnData?.length ? currentTab.bnData.map((ind, i) => (
                          <div key={`bn-${i}`} className="pb-4 border-b border-surface-container last:border-0 last:pb-0">
                            <p className="font-body text-xs text-on-surface-variant leading-relaxed">{ind}</p>
                          </div>
                        )) : (
                          <div className="pb-4">
                            <p className="font-body text-xs text-on-surface-variant/50 italic leading-relaxed">তথ্য পাওয়া যায়নি।</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            
            {/* Bottom Action Drawer */}
            <div className="flex justify-center py-6 border-t border-outline-variant/10 bg-white/50 backdrop-blur-md">
              <div className="bg-white/80 backdrop-blur-md px-6 py-4 rounded-full flex items-center gap-8 shadow-xl border border-outline-variant/20">
                <button className="flex items-center gap-2 text-on-surface font-manrope text-sm font-semibold hover:text-primary transition-colors">
                  <ArrowRightLeft className="w-4 h-4" /> Compare Remedy
                </button>
                <div className="w-px h-6 bg-outline-variant/30"></div>
                <button className="flex items-center gap-2 text-on-surface font-manrope text-sm font-semibold hover:text-primary transition-colors">
                  <History className="w-4 h-4" /> Clinical Case Study
                </button>
              </div>
            </div>

          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
