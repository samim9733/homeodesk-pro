import { Html5QrcodeScanner } from 'html5-qrcode';
import ReactMarkdown from 'react-markdown';
import { GoogleGenAI } from "@google/genai";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Camera, AlertCircle, RefreshCw, Maximize, Settings, FileText, Download, RotateCcw, Pencil, Type, Square, Upload, Save, Eraser, Move
, QrCode, Loader2, Edit, Sparkles} from 'lucide-react';

export const QRScannerModal = ({ onClose, onScan }: { onClose: () => void, onScan: (data: string) => void }) => {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      /* verbose= */ false
    );

    scanner.render(
      (decodedText) => {
        scanner.clear();
        onScan(decodedText);
      },
      (error) => {
        // console.warn(error);
      }
    );

    return () => {
      scanner.clear().catch(error => console.error("Failed to clear scanner", error));
    };
  }, [onScan]);

  return (
    <div className="fixed inset-0 bg-black/60 z-[70] flex items-center justify-center p-4 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col"
      >
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white shadow-md">
              <QrCode size={16} />
            </div>
            <h3 className="font-bold text-slate-800">Scan QR Code</h3>
          </div>
          <button onClick={onClose} className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition">
            <X size={18} />
          </button>
        </div>
        <div className="p-6">
          <div id="reader" className="w-full overflow-hidden rounded-xl border-2 border-dashed border-slate-200"></div>
          <p className="mt-4 text-center text-sm text-slate-500">
            Position the QR code within the frame to scan.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export const AnalysisResultModal = ({ result, onClose }: { result: string, onClose: () => void }) => {
  return (
    <div className="fixed inset-0 bg-black/60 z-[80] flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col my-8"
      >
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white shadow-md">
              <AlertCircle size={16} />
            </div>
            <h3 className="font-bold text-slate-800">Analysis Report</h3>
          </div>
          <button onClick={onClose} className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition">
            <X size={18} />
          </button>
        </div>
        <div className="p-8 overflow-y-auto max-h-[70vh]">
          <div className="prose prose-slate max-w-none">
            <ReactMarkdown>{result}</ReactMarkdown>
          </div>
        </div>
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-slate-800 text-white rounded-xl font-semibold hover:bg-slate-700 transition"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export const ImageEditorModal = ({ 
  imageUrl, 
  onClose, 
  onUpdate 
}: { 
  imageUrl: string, 
  onClose: () => void, 
  onUpdate: (newUrl: string) => void 
}) => {
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newUrl, setNewUrl] = useState('');
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdate(reader.result as string);
        onClose();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlUpdate = () => {
    if (newUrl.trim()) {
      onUpdate(newUrl.trim());
      onClose();
    }
  };

  const handleAIEdit = async () => {
    if (!prompt.trim()) return;
    setIsProcessing(true);
    setError(null);

    try {
      // 1. Fetch the image and convert to base64
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const reader = new FileReader();
      
      const base64Data = await new Promise<string>((resolve, reject) => {
        reader.onloadend = () => {
          const result = reader.result as string;
          resolve(result.split(',')[1]);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });

      // 2. Call Gemini for image editing
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const editResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              inlineData: {
                data: base64Data,
                mimeType: blob.type,
              },
            },
            {
              text: `Edit this medical/anatomical image based on this request: ${prompt}. If the request is to highlight something, make it clear. If it's a style change (like X-ray), apply that style. Return the edited image.`,
            },
          ],
        },
      });

      // 3. Extract the result image
      let resultImageUrl = '';
      for (const part of editResponse.candidates[0].content.parts) {
        if (part.inlineData) {
          resultImageUrl = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
          break;
        }
      }

      if (resultImageUrl) {
        onUpdate(resultImageUrl);
        onClose();
      } else {
        setError("AI could not generate an edited image. Please try a different prompt.");
      }
    } catch (err) {
      console.error("AI Edit failed:", err);
      setError("Failed to edit image. This might be due to image access restrictions or AI limits.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col lg:flex-row h-[90vh] lg:h-auto max-h-[90vh]"
      >
        <div className="flex-1 bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
          <img 
            src={imageUrl} 
            alt="Editing" 
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            referrerPolicy="no-referrer"
          />
          {isProcessing && (
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white gap-4 backdrop-blur-sm">
              <Loader2 className="animate-spin text-emerald-400" size={48} />
              <p className="font-bold text-lg">AI is editing your image...</p>
              <p className="text-sm text-slate-300">Applying your requested changes</p>
            </div>
          )}
        </div>
        
        <div className="w-full lg:w-80 p-6 flex flex-col bg-white overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-xl text-slate-800 flex items-center gap-2">
              <Edit className="text-emerald-500" size={20} />
              Image Editor
            </h3>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 space-y-6">
            {/* Upload Section */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Upload size={16} className="text-blue-500" />
                Change Image
              </h4>
              <div className="space-y-2">
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-2 px-4 bg-blue-50 text-blue-600 rounded-xl text-sm font-bold hover:bg-blue-100 transition flex items-center justify-center gap-2 border border-blue-100"
                >
                  <Upload size={14} />
                  Upload from Device
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileUpload} 
                  accept="image/*" 
                  className="hidden" 
                />
                
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Paste Image URL..."
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    className="flex-1 p-2 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button 
                    onClick={handleUrlUpdate}
                    className="px-3 py-2 bg-slate-800 text-white rounded-lg text-xs font-bold hover:bg-slate-700 transition"
                  >
                    Set
                  </button>
                </div>
              </div>
            </div>

            <div className="h-px bg-slate-100" />

            {/* AI Edit Section */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Sparkles size={16} className="text-emerald-500" />
                Edit with AI
              </h4>
              <div>
                <label className="block text-[10px] font-semibold text-slate-500 mb-1 uppercase tracking-wider">What to change?</label>
                <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., Highlight the spine in red, Change to X-ray style..."
                  className="w-full h-24 p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none text-xs"
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 text-red-600 text-[10px] rounded-lg border border-red-100 flex items-start gap-2">
                  <AlertCircle size={12} className="mt-0.5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button 
                onClick={handleAIEdit}
                disabled={isProcessing || !prompt.trim()}
                className="w-full py-2.5 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-lg shadow-emerald-200 flex items-center justify-center gap-2 text-sm"
              >
                {isProcessing ? <Loader2 className="animate-spin" size={16} /> : <Sparkles size={16} />}
                Apply AI Edits
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

