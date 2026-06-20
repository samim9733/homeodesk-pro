import React from 'react';
import { motion } from 'motion/react';
import { X, Eye } from 'lucide-react';

interface QuickDetailsModalProps {
  title: string;
  content: string;
  onClose: () => void;
}

export function QuickDetailsModal({ title, content, onClose }: QuickDetailsModalProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
      >
        <div className="p-6 bg-slate-900 text-white flex justify-between items-center">
          <h3 className="text-lg font-black uppercase tracking-widest">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full transition-all">
            <X size={24} />
          </button>
        </div>
        <div className="p-6">
          <p className="text-sm text-slate-700 whitespace-pre-wrap">{content}</p>
        </div>
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button onClick={onClose} className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg transition-all">
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
}
