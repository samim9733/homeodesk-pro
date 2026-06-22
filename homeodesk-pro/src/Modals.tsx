import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { X, Camera, CheckCircle, Upload, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface QRScannerModalProps {
  onClose: () => void;
  onScan: (data: string) => void;
}

export function QRScannerModal({ onClose, onScan }: QRScannerModalProps) {
  const [manualInput, setManualInput] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 modal-overlay">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white modal-container w-full max-w-lg overflow-hidden"
      >
        <div className="modal-header-dark flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Camera size={24} />
            <div>
              <h3 className="text-lg font-black uppercase tracking-widest">QR Scanner</h3>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Scan or enter data</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-all">
            <X size={24} />
          </button>
        </div>
        <div className="p-6 space-y-4">
          {/* Scanner placeholder */}
          <div className="w-full aspect-square max-h-64 bg-slate-50/80 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-3">
            <Camera size={48} className="text-slate-300" />
            <p className="text-xs font-bold text-slate-400">Camera feed will appear here</p>
            <p className="text-[10px] text-slate-300">QR code scanning requires camera access</p>
          </div>

          {/* Manual input */}
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Or paste data manually</label>
            <textarea
              value={manualInput}
              onChange={(e) => setManualInput(e.target.value)}
              rows={4}
              className="w-full mt-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none"
              placeholder="Paste QR code data here..."
            />
          </div>

          <div className="flex gap-3">
            <button onClick={onClose} className="btn-ghost flex-1">
              Cancel
            </button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => manualInput && onScan(manualInput)}
              disabled={!manualInput}
              className="btn-emerald flex-1 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <CheckCircle size={14} /> Process Data
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

interface AnalysisResultModalProps {
  result: string;
  onClose: () => void;
}

export function AnalysisResultModal({ result, onClose }: AnalysisResultModalProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 modal-overlay">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white modal-container w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="modal-header-dark flex justify-between items-center">
          <div>
            <h3 className="text-xl font-black uppercase tracking-widest">AI Analysis Result</h3>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">Powered by Gemini AI</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-all">
            <X size={24} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar prose prose-slate prose-sm max-w-none">
          <ReactMarkdown>{result}</ReactMarkdown>
        </div>
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button onClick={onClose} className="btn-primary">
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
}

interface ImageEditorModalProps {
  imageUrl: string;
  onClose: () => void;
  onUpdate: (newUrl: string) => void;
}

export function ImageEditorModal({ imageUrl, onClose, onUpdate }: ImageEditorModalProps) {
  const [newUrl, setNewUrl] = useState(imageUrl);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUpdate = () => {
    setIsProcessing(true);
    setTimeout(() => {
      onUpdate(newUrl);
      setIsProcessing(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 modal-overlay">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white modal-container w-full max-w-xl overflow-hidden"
      >
        <div className="modal-header-dark flex justify-between items-center">
          <div>
            <h3 className="text-xl font-black uppercase tracking-widest">Image Editor</h3>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">Update or replace image</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-all">
            <X size={24} />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div className="w-full aspect-video bg-slate-50/80 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center">
            {imageUrl ? (
              <img src={imageUrl} alt="Preview" className="max-w-full max-h-full object-contain rounded-xl" />
            ) : (
              <Upload size={48} className="text-slate-300" />
            )}
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Image URL</label>
            <input
              type="text"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              className="w-full mt-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              placeholder="Enter image URL..."
            />
          </div>
          <div className="flex gap-3">
            <button onClick={onClose} className="btn-ghost flex-1">
              Cancel
            </button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleUpdate}
              className="btn-emerald flex-1 flex items-center justify-center gap-2"
            >
              {isProcessing ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle size={14} />}
              {isProcessing ? 'Processing...' : 'Update'}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}