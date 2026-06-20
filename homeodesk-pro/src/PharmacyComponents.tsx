import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  FlaskConical, Settings, Database, Search, Plus, Trash2, ShoppingCart,
  TrendingUp, Package, AlertCircle, Save, X, Printer
} from 'lucide-react';

// ==================== PHARMACY TAB ====================
export function PharmacyTab() {
  const [search, setSearch] = useState('');
  const [activeSection, setActiveSection] = useState<'inventory' | 'suppliers' | 'invoices'>('inventory');

  const stats = [
    { label: 'Total Remedies', value: 156, icon: Package, color: 'emerald' },
    { label: 'Low Stock', value: 8, icon: AlertCircle, color: 'rose' },
    { label: 'Total Value', value: '₨ 245,000', icon: TrendingUp, color: 'blue' },
    { label: 'Pending Orders', value: 3, icon: ShoppingCart, color: 'amber' },
  ];

  const colorClasses: Record<string, { icon: string }> = {
    emerald: { icon: 'bg-emerald-500' },
    rose: { icon: 'bg-rose-500' },
    blue: { icon: 'bg-blue-500' },
    amber: { icon: 'bg-amber-500' },
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Pharmacy Management</h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Inventory & Stock Control</p>
        </div>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          className="px-4 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg flex items-center gap-2"
        >
          <Plus size={14} /> Add Remedy
        </motion.button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map(stat => {
          const Icon = stat.icon;
          const colors = colorClasses[stat.color];
          return (
            <div key={stat.label} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                  <p className="text-2xl font-black text-slate-900 mt-1">{stat.value}</p>
                </div>
                <div className={`w-10 h-10 rounded-xl ${colors.icon} flex items-center justify-center`}>
                  <Icon size={18} className="text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Section Tabs */}
      <div className="flex gap-2">
        {(['inventory', 'suppliers', 'invoices'] as const).map(section => (
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

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          placeholder="Search inventory..."
        />
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-900 text-white">
                <th className="text-left p-3 text-[10px] uppercase tracking-widest font-bold">Remedy</th>
                <th className="text-left p-3 text-[10px] uppercase tracking-widest font-bold">Potency</th>
                <th className="text-center p-3 text-[10px] uppercase tracking-widest font-bold">Stock</th>
                <th className="text-right p-3 text-[10px] uppercase tracking-widest font-bold">Price</th>
                <th className="text-center p-3 text-[10px] uppercase tracking-widest font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {[
                { name: 'Nux Vomica', potency: '30C', stock: 50, price: 150 },
                { name: 'Nux Vomica', potency: '200C', stock: 25, price: 250 },
                { name: 'Pulsatilla', potency: '30C', stock: 40, price: 150 },
                { name: 'Sulphur', potency: '30C', stock: 3, price: 120 },
                { name: 'Sulphur', potency: '200C', stock: 20, price: 200 },
                { name: 'Lycopodium', potency: '30C', stock: 35, price: 160 },
                { name: 'Arsenicum Album', potency: '30C', stock: 45, price: 140 },
                { name: 'Bryonia Alba', potency: '30C', stock: 2, price: 130 },
              ].map((item, i) => (
                <tr key={i} className="hover:bg-slate-50 transition">
                  <td className="p-3 text-xs font-bold text-slate-900">{item.name}</td>
                  <td className="p-3 text-xs font-bold text-slate-500">{item.potency}</td>
                  <td className="p-3 text-xs font-black text-center text-slate-900">{item.stock}</td>
                  <td className="p-3 text-xs font-black text-right text-slate-900">₨ {item.price}</td>
                  <td className="p-3 text-center">
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                      item.stock <= 5 ? 'bg-rose-50 text-rose-600' :
                      item.stock <= 20 ? 'bg-amber-50 text-amber-600' :
                      'bg-emerald-50 text-emerald-600'
                    }`}>
                      {item.stock <= 5 ? 'Low Stock' : item.stock <= 20 ? 'Medium' : 'In Stock'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ==================== SETTINGS TAB ====================
export function SettingsTab() {
  const [doctorName, setDoctorName] = useState('Dr. Rahim Ahmed');
  const [clinicName, setClinicName] = useState('HomeoDesk Clinic');
  const [qualification, setQualification] = useState('DHMS, RMP');
  const [geminiKey, setGeminiKey] = useState('');

  const sections = [
    { title: 'Doctor Profile', description: 'Your professional information for prescriptions' },
    { title: 'Clinic Details', description: 'Clinic name and address for invoices' },
    { title: 'AI Integration', description: 'Gemini API key for AI-powered analysis' },
    { title: 'Preferences', description: 'App behavior and display settings' },
    { title: 'Data Management', description: 'Backup, restore, and data export' },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Settings & Preferences</h2>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Configure your clinical suite</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Settings Navigation */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-2">
          <div className="space-y-1">
            {sections.map((section, i) => (
              <button key={i} className="w-full text-left p-3 rounded-xl hover:bg-slate-50 transition">
                <p className="text-xs font-bold text-slate-700">{section.title}</p>
                <p className="text-[9px] text-slate-400 mt-0.5">{section.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Settings Content */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 lg:col-span-2 space-y-6">
          <div>
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Doctor Profile</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Doctor Name</label>
                <input
                  type="text"
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
                  className="w-full mt-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Qualification</label>
                <input
                  type="text"
                  value={qualification}
                  onChange={(e) => setQualification(e.target.value)}
                  className="w-full mt-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Clinic Name</label>
                <input
                  type="text"
                  value={clinicName}
                  onChange={(e) => setClinicName(e.target.value)}
                  className="w-full mt-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">AI Integration (Gemini)</h3>
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">API Key</label>
              <input
                type="password"
                value={geminiKey}
                onChange={(e) => setGeminiKey(e.target.value)}
                className="w-full mt-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                placeholder="Enter your Gemini API key..."
              />
              <p className="text-[9px] text-slate-400 mt-1">Used for QR analysis and AI-powered features</p>
            </div>
          </div>

          <div className="flex gap-3 justify-end border-t border-slate-100 pt-6">
            <button className="px-5 py-2.5 bg-white text-slate-500 border border-slate-200 rounded-xl text-xs font-black uppercase tracking-widest">Reset</button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-5 py-2.5 bg-emerald-500 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg flex items-center gap-2"
            >
              <Save size={14} /> Save Settings
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
