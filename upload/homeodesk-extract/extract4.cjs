const fs = require('fs');

let appFile = fs.readFileSync('src/App.tsx', 'utf-8');

const m1 = appFile.search(/const Dashboard = /);
const m2 = appFile.search(/const PatientsTab = /);
const m3 = appFile.search(/const RepertoryTab = /);
const m4 = appFile.search(/const AttributeItem = /);

if (m1 > -1 && m4 > -1) {
  const extractedSrc = appFile.substring(m1, m4);
  
  const imports = `import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, UserPlus, Bell, Calendar, ChevronRight, ChevronLeft, Search, Plus, Trash2, Edit, X, RefreshCw, AlertCircle, Clock, Stethoscope, Save, QrCode, ClipboardList, Move, ArrowLeft, Play
} from 'lucide-react';
import { Patient, Reminder, AnalysisItem, RubricData, Remedy as RepertoryRemedy } from './types';
import { CHAPTER_INDEX, REPERTORY_DATA, CATEGORIES, CHAPTER_CATEGORIES } from './constants';
import ReactMarkdown from 'react-markdown';
import { GoogleGenAI } from "@google/genai";

`;

  let fixedSrc = extractedSrc
    .replace(/const Dashboard/g, 'export const Dashboard')
    .replace(/const PatientsTab/g, 'export const PatientsTab')
    .replace(/const RepertoryTab/g, 'export const RepertoryTab');

  fs.writeFileSync('src/MainTabs.tsx', imports + fixedSrc);
  
  appFile = appFile.substring(0, m1) + appFile.substring(m4);
  fs.writeFileSync('src/App.tsx', appFile);
  console.log('Extracted MainTabs.');
}

const n1 = appFile.search(/const RemindersTab = /);
const n2 = appFile.search(/export default function App\(\) \{/);

if (n1 > -1 && n2 > -1) {
  const extractedSrc = appFile.substring(n1, n2);
  
  const imports = `import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bell, Calendar, Search, Plus, Trash2, Edit, X, RefreshCw, AlertCircle, Clock, Save, ChevronRight, ChevronLeft, Play, Database, Stethoscope, Eraser, FileText, Share2, ClipboardList
} from 'lucide-react';
import { Patient, Reminder, AnalysisItem, ChiefSymptom, PhysicalGeneral } from './types';
import { CHAPTER_INDEX } from './constants';
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';

`;

  let fixedSrc = extractedSrc
    .replace(/const RemindersTab/g, 'export const RemindersTab')
    .replace(/const AnalysisTab/g, 'export const AnalysisTab');

  fs.writeFileSync('src/AnalysisRemindersTabs.tsx', imports + fixedSrc);
  
  appFile = appFile.substring(0, n1) + appFile.substring(n2);
  fs.writeFileSync('src/App.tsx', appFile);
  console.log('Extracted AnalysisRemindersTabs.');
}
