import React from 'react';
import { motion } from 'motion/react';
import { Search, HelpCircle, UserCircle, Activity, HeartPulse, Stethoscope, Droplet, MoveRight, Printer } from 'lucide-react';

export const SurgeryTab = () => {
  return (
    <div className="p-8 space-y-12">
      <header className="flex justify-between items-center w-full sticky top-0 z-40 bg-slate-50 pb-8">
        <div className="flex items-center gap-6">
          <h2 className="font-headline font-bold text-lg tracking-tight text-emerald-600">Surgery Hub</h2>
          <div className="hidden lg:flex items-center gap-4 text-sm text-slate-400">
            <span className="hover:text-emerald-700 cursor-pointer">Procedure Log</span>
            <span className="hover:text-emerald-700 cursor-pointer">Remedy Guide</span>
            <span className="hover:text-emerald-700 cursor-pointer">Anatomy Reference</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input 
              className="bg-slate-100 border-none rounded-full px-6 py-2 text-sm w-64 focus:ring-2 focus:ring-emerald-500/20 transition-all focus:outline-none" 
              placeholder="Search conditions..." 
              type="text"
            />
            <Search className="absolute right-4 top-2 text-slate-400" size={18} />
          </div>
          <HelpCircle className="text-slate-500 cursor-pointer" size={24} />
          <UserCircle className="text-slate-500 cursor-pointer" size={24} />
        </div>
      </header>

      {/* Hero Header */}
      <section className="relative overflow-hidden rounded-[2rem] bg-slate-900 p-12 text-white shadow-2xl">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold tracking-widest uppercase rounded-full mb-6">
            Advanced Clinical Module
          </span>
          <h1 className="font-serif text-5xl font-black tracking-tight mb-4">
            Clinical Surgery & Minor Procedures
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed">
            Integrated homeopathic management for surgical conditions, from acute intervention to restorative post-operative care.
          </p>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/2 opacity-30 pointer-events-none">
          <img 
            className="object-cover h-full w-full" 
            alt="Surgical theater" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDiwgH_CYHPuWrJCkWdXUwHQKeHSHqUGpMr-Q_ir_hZ5BcxVKtZ10CFsK329yQUWBhbj6U6j_GlXmEJoywGXkY8FSqc_Qv0SxXwR3EiwxL95MYDAU4mTwGzwjhhStm70Cq8vonGTjUTZYSUA4HWcRU_f3rKB8eHxfJ_Skl6HHZAQWffRLR8hp4eTMkEDxxyQBPmPX9yNtDKWoxNzFTd1z2hW4mN3SeHDqKIl1jevgqxPqXb-W4elj22X6-kEjc9yqYwSwCGiWijg-As"
          />
        </div>
      </section>

      {/* Categorized Surgery Bento Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* General Surgery */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 group hover:-translate-y-1 transition-transform">
          <div className="flex justify-between items-start mb-8">
            <div className="p-3 bg-red-50 rounded-2xl text-red-600">
              <Activity size={32} />
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Section 01</span>
          </div>
          <h3 className="font-serif text-2xl font-black mb-2 text-slate-900">General Surgery</h3>
          <p className="text-sm text-slate-500 mb-6 font-medium">Common visceral and soft tissue conditions.</p>
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-xl hover:bg-emerald-50 hover:text-emerald-700 transition-all flex justify-between items-center cursor-pointer group/item">
              <div>
                <p className="font-bold text-slate-900 group-hover/item:text-emerald-700 transition-colors">Abscess</p>
                <p className="text-xs text-slate-400 group-hover/item:text-emerald-600/70">ফোঁড়া (Phonṛa)</p>
              </div>
              <MoveRight size={18} className="text-emerald-600 opacity-0 group-hover/item:opacity-100 transition-opacity translate-x-2 group-hover/item:translate-x-0" />
            </div>
            <div className="p-4 bg-slate-50 rounded-xl hover:bg-emerald-50 hover:text-emerald-700 transition-all flex justify-between items-center cursor-pointer group/item">
              <div>
                <p className="font-bold text-slate-900 group-hover/item:text-emerald-700 transition-colors">Fistula</p>
                <p className="text-xs text-slate-400 group-hover/item:text-emerald-600/70">ভগন্দর (Bhogondor)</p>
              </div>
              <MoveRight size={18} className="text-emerald-600 opacity-0 group-hover/item:opacity-100 transition-opacity translate-x-2 group-hover/item:translate-x-0" />
            </div>
            <div className="p-4 bg-slate-50 rounded-xl hover:bg-emerald-50 hover:text-emerald-700 transition-all flex justify-between items-center cursor-pointer group/item">
              <div>
                <p className="font-bold text-slate-900 group-hover/item:text-emerald-700 transition-colors">Hemorrhoids</p>
                <p className="text-xs text-slate-400 group-hover/item:text-emerald-600/70">অর্শ (Orsho)</p>
              </div>
              <MoveRight size={18} className="text-emerald-600 opacity-0 group-hover/item:opacity-100 transition-opacity translate-x-2 group-hover/item:translate-x-0" />
            </div>
          </div>
        </div>

        {/* Orthopedic */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 group hover:-translate-y-1 transition-transform">
          <div className="flex justify-between items-start mb-8">
            <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
              <Stethoscope size={32} />
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Section 02</span>
          </div>
          <h3 className="font-serif text-2xl font-black mb-2 text-slate-900">Orthopedic</h3>
          <p className="text-sm text-slate-500 mb-6 font-medium">Skeletal trauma and bone pathology.</p>
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition-all flex justify-between items-center cursor-pointer group/item">
              <div>
                <p className="font-bold text-slate-900 group-hover/item:text-blue-700 transition-colors">Fractures</p>
                <p className="text-xs text-slate-400 group-hover/item:text-blue-600/70">অস্থিভঙ্গ (Osthobhong-go)</p>
              </div>
              <MoveRight size={18} className="text-blue-600 opacity-0 group-hover/item:opacity-100 transition-opacity translate-x-2 group-hover/item:translate-x-0" />
            </div>
            <div className="p-4 bg-slate-50 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition-all flex justify-between items-center cursor-pointer group/item">
              <div>
                <p className="font-bold text-slate-900 group-hover/item:text-blue-700 transition-colors">Dislocations</p>
                <p className="text-xs text-slate-400 group-hover/item:text-blue-600/70">সন্ধিচ্যুতি (Sondhichyuti)</p>
              </div>
              <MoveRight size={18} className="text-blue-600 opacity-0 group-hover/item:opacity-100 transition-opacity translate-x-2 group-hover/item:translate-x-0" />
            </div>
          </div>
        </div>

        {/* ENT & Dental */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 group hover:-translate-y-1 transition-transform">
          <div className="flex justify-between items-start mb-8">
            <div className="p-3 bg-purple-50 rounded-2xl text-purple-600">
              <HeartPulse size={32} />
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Section 03</span>
          </div>
          <h3 className="font-serif text-2xl font-black mb-2 text-slate-900">ENT & Dental</h3>
          <p className="text-sm text-slate-500 mb-6 font-medium">Specialized regional surgical conditions.</p>
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-xl hover:bg-purple-50 hover:text-purple-700 transition-all flex justify-between items-center cursor-pointer group/item">
              <div>
                <p className="font-bold text-slate-900 group-hover/item:text-purple-700 transition-colors">Tonsillitis</p>
                <p className="text-xs text-slate-400 group-hover/item:text-purple-600/70">টনসিলাইটিস (Tonsillitis)</p>
              </div>
              <MoveRight size={18} className="text-purple-600 opacity-0 group-hover/item:opacity-100 transition-opacity translate-x-2 group-hover/item:translate-x-0" />
            </div>
            <div className="p-4 bg-slate-50 rounded-xl hover:bg-purple-50 hover:text-purple-700 transition-all flex justify-between items-center cursor-pointer group/item">
              <div>
                <p className="font-bold text-slate-900 group-hover/item:text-purple-700 transition-colors">Dental Caries</p>
                <p className="text-xs text-slate-400 group-hover/item:text-purple-600/70">দন্তক্ষয় (Dontokkhoy)</p>
              </div>
              <MoveRight size={18} className="text-purple-600 opacity-0 group-hover/item:opacity-100 transition-opacity translate-x-2 group-hover/item:translate-x-0" />
            </div>
          </div>
        </div>
      </section>

      {/* Pre/Post Op Care Section */}
      <section className="bg-white rounded-[2.5rem] p-12 shadow-xl border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-60 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
            <div className="max-w-xl">
              <h2 className="font-serif text-4xl font-black text-slate-900 mb-4 tracking-tight">Perioperative Care</h2>
              <p className="text-slate-500 font-medium leading-relaxed">
                Strategic homeopathic protocol for optimizing patient outcomes before and after surgical intervention. Minimizing trauma and accelerating recovery.
              </p>
            </div>
            <div className="flex gap-4">
              <button className="bg-slate-50 p-4 rounded-2xl hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600 border border-slate-100">
                <Printer size={20} />
              </button>
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-2xl font-black text-sm tracking-widest uppercase transition-all shadow-xl shadow-emerald-600/20">
                View Protocol
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Arnica */}
            <div className="relative p-8 rounded-3xl bg-amber-50 border border-amber-100/50 overflow-hidden group hover:scale-[1.02] transition-transform cursor-pointer">
              <div className="absolute -right-4 -top-4 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
                <HeartPulse size={160} strokeWidth={1} className="text-amber-900" />
              </div>
              <h4 className="font-serif font-black text-2xl text-amber-900 mb-2">Arnica Montana</h4>
              <span className="inline-block px-3 py-1 bg-amber-100/80 rounded-full text-[10px] font-black uppercase tracking-wider text-amber-800 mb-6">Trauma Specialist</span>
              <p className="text-sm font-medium text-amber-800/80 mb-6 leading-relaxed">
                The premier remedy for mechanical injuries, reducing hematoma, and controlling post-surgical shock and pain.
              </p>
              <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-amber-900">
                <span>200C / 1M</span>
                <span className="h-1 w-1 bg-amber-900 rounded-full"></span>
                <span>Pre-Op</span>
              </div>
            </div>
            
            {/* Staphysagria */}
            <div className="relative p-8 rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden group hover:scale-[1.02] transition-transform cursor-pointer">
              <div className="absolute -right-4 -top-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Stethoscope size={160} strokeWidth={1} className="text-white" />
              </div>
              <h4 className="font-serif font-black text-2xl text-white mb-2">Staphysagria</h4>
              <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-wider text-slate-300 mb-6">Incision Healing</span>
              <p className="text-sm font-medium text-slate-400 mb-6 leading-relaxed">
                Specific for clean-cut wounds from surgical instruments. Alleviates post-operative pain and psychological resentment.
              </p>
              <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-white">
                <span>30C Potency</span>
                <span className="h-1 w-1 bg-white rounded-full"></span>
                <span>Post-Op</span>
              </div>
            </div>

            {/* Hypericum */}
            <div className="relative p-8 rounded-3xl bg-blue-50 border border-blue-100/50 overflow-hidden group hover:scale-[1.02] transition-transform cursor-pointer">
              <div className="absolute -right-4 -top-4 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
                <Activity size={160} strokeWidth={1} className="text-blue-900" />
              </div>
              <h4 className="font-serif font-black text-2xl text-blue-900 mb-2">Hypericum</h4>
              <span className="inline-block px-3 py-1 bg-blue-100/80 rounded-full text-[10px] font-black uppercase tracking-wider text-blue-800 mb-6">Nerve Trauma</span>
              <p className="text-sm font-medium text-blue-800/80 mb-6 leading-relaxed">
                The 'Arnica of the nerves'. Indicated when surgery involves areas rich in nerves or sharp shooting pains occur post-surgery.
              </p>
              <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-blue-900">
                <span>200C Potency</span>
                <span className="h-1 w-1 bg-blue-900 rounded-full"></span>
                <span>Restorative</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Surgical Case Studies Feed */}
      <section className="space-y-8 pb-12">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-3xl font-black text-slate-900 tracking-tight">Surgical Case Studies</h2>
          <button className="text-sm font-bold text-emerald-600 flex items-center gap-2 cursor-pointer hover:text-emerald-700 bg-emerald-50 px-4 py-2 rounded-xl transition-all">
            View Archives <MoveRight size={16} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Case 1 */}
          <article className="flex gap-6 bg-white p-6 rounded-3xl border border-slate-100 hover:shadow-2xl hover:border-emerald-100 transition-all group cursor-pointer shadow-sm">
            <div className="w-40 h-40 rounded-2xl overflow-hidden shrink-0 shadow-inner">
              <img 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                alt="Healing" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYBDhskGHDe2IvGVLqIYWA5Vkiyp8nAZUWBoBjsrlKRp9eMUAjODDsvNPVzMyNBFqrtAPLgRUpY7r9MpTvsc8bUO0IbQsza2JuLYXEuIAOEWqVy5feGzwqQzevTBqbda_BHtMlXIjqfT1DeEyjrWsFKx3zFyenmxjW2GuQ7-FgNRyzY321nKvhkgvKanXnk7P_4S0QStRdyb3mvyrPwXaE-JTYVlIiAA0tsxYJrSXWuB-ZB0veHs_bzgSNbgekrh-TAH8F9RzMK24k"
              />
            </div>
            <div className="flex flex-col justify-between py-1">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-widest">
                    Post-Op Healing
                  </span>
                  <span className="text-[10px] font-bold text-slate-400">Oct 12, 2024</span>
                </div>
                <h3 className="font-serif text-xl font-black text-slate-900 mb-2 leading-tight group-hover:text-emerald-700 transition-colors">
                  Rapid resolution of post-appendectomy cicatrices with Staphysagria 200C
                </h3>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm font-bold text-emerald-600">
                Read Case <MoveRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </article>
          
          {/* Case 2 Placeholder */}
          <article className="flex gap-6 bg-white p-6 rounded-3xl border border-slate-100 hover:shadow-2xl hover:border-blue-100 transition-all group cursor-pointer shadow-sm">
            <div className="w-40 h-40 rounded-2xl overflow-hidden shrink-0 bg-slate-100 flex items-center justify-center text-slate-300">
               <Activity size={40} />
            </div>
            <div className="flex flex-col justify-between py-1">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-widest">
                    Trauma Case
                  </span>
                  <span className="text-[10px] font-bold text-slate-400">Oct 05, 2024</span>
                </div>
                <h3 className="font-serif text-xl font-black text-slate-900 mb-2 leading-tight group-hover:text-blue-700 transition-colors">
                  Management of compound fracture pain and swelling using Arnica 1M
                </h3>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm font-bold text-blue-600">
                Read Case <MoveRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
};
