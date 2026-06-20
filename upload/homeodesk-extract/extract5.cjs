const fs = require('fs');

let appFile = fs.readFileSync('src/App.tsx', 'utf-8');

const t2 = appFile.search(/const MateriaMedicaTab = /);
const t3 = appFile.search(/const QRScannerModal = /);

if (t2 > -1 && t3 > -1) {
  const extractedSrc = appFile.substring(t2, t3);
  
  const imports = `import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, LayoutDashboard, Database, FileText, Download, TrendingUp, Filter, AlertCircle, BookOpen, Star, RefreshCw, X, ChevronRight, Bookmark, Move, Activity, ArrowRightLeft, ArrowLeft, ArrowUpDown } from 'lucide-react';
import { MATERIA_MEDICA_DATA, Remedy as MateriaRemedy } from './materiaMedicaData';

`;

  let fixedSrc = extractedSrc.replace(/const MateriaMedicaTab/g, 'export const MateriaMedicaTab');
  fixedSrc = fixedSrc.replace(/const ComparisonSection/g, 'export const ComparisonSection');

  fs.writeFileSync('src/MateriaMedicaTab.tsx', imports + fixedSrc);
  
  appFile = appFile.substring(0, t2) + appFile.substring(t3);
  fs.writeFileSync('src/App.tsx', appFile);
  console.log('Extracted MateriaMedicaTab.');
}

const u1 = appFile.search(/const PrescriptionCanvas = /);
const u2 = appFile.search(/const Sidebar = /);

if (u1 > -1 && u2 > -1) {
  const extractedSrc = appFile.substring(u1, u2);
  
  const imports = `import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Printer, Save, FileText, CheckCircle, Clock, Trash2, Edit, Square, Upload, Type, Brain, AlertCircle, RotateCcw, Droplets, Zap, Pencil, Download, Eraser, Move, ShieldAlert, Thermometer
} from 'lucide-react';
import { Patient, AnalysisItem, ChiefSymptom, PhysicalGeneral } from './types';
import ReactMarkdown from 'react-markdown';
import { GoogleGenAI } from "@google/genai";

`;

  let fixedSrc = extractedSrc
    .replace(/const PrescriptionCanvas/g, 'export const PrescriptionCanvas')
    .replace(/const PatientDetailsCanvas/g, 'export const PatientDetailsCanvas');

  fs.writeFileSync('src/PatientModals.tsx', imports + fixedSrc);
  
  appFile = appFile.substring(0, u1) + appFile.substring(u2);
  fs.writeFileSync('src/App.tsx', appFile);
  console.log('Extracted PatientModals.');
}

const v1 = appFile.search(/const QRScannerModal = /);
const v2 = appFile.search(/export default function App\(\) \{/);

if (v1 > -1 && v2 > -1) {
  const extractedSrc = appFile.substring(v1, v2);
  
  const imports = `import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Camera, AlertCircle, RefreshCw, Maximize, Settings, FileText, Download, RotateCcw, Pencil, Type, Square, Upload, Save, Eraser, Move
} from 'lucide-react';

`;

  let fixedSrc = extractedSrc
    .replace(/const QRScannerModal/g, 'export const QRScannerModal')
    .replace(/const AnalysisResultModal/g, 'export const AnalysisResultModal')
    .replace(/const ImageEditorModal/g, 'export const ImageEditorModal');

  fs.writeFileSync('src/Modals.tsx', imports + fixedSrc);
  
  appFile = appFile.substring(0, v1) + appFile.substring(v2);
  fs.writeFileSync('src/App.tsx', appFile);
  console.log('Extracted Modals.');
}
