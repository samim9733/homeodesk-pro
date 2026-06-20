const fs = require('fs');

function addImports(file, newImports) {
  let content = fs.readFileSync(file, 'utf-8');
  let match = content.match(/import \{([^}]+)\} from 'lucide-react';/);
  if (match) {
    let existing = match[1];
    let toAdd = newImports.split(',').map(s => s.trim()).filter(s => s && !existing.includes(s));
    if (toAdd.length > 0) {
      existing += ', ' + toAdd.join(', ');
      content = content.replace(match[0], `import {${existing}} from 'lucide-react';`);
    }
  } else {
    content = `import { ${newImports} } from 'lucide-react';\n` + content;
  }
  fs.writeFileSync(file, content);
}

function addTypeImports(file, newImports) {
  let content = fs.readFileSync(file, 'utf-8');
  let match = content.match(/import \{([^}]+)\} from '.\/types';/);
  if (match) {
    let existing = match[1];
    let toAdd = newImports.split(',').map(s => s.trim()).filter(s => s && !existing.includes(s));
    if (toAdd.length > 0) {
      existing += ', ' + toAdd.join(', ');
      content = content.replace(match[0], `import {${existing}} from './types';`);
    }
  } else {
    content = `import { ${newImports} } from './types';\n` + content;
  }
  fs.writeFileSync(file, content);
}

// AnalysisRemindersTabs.tsx
addImports('src/AnalysisRemindersTabs.tsx', 'Users, FlaskConical, History, BookmarkCheck, Thermometer, Activity, Move, Zap, Droplets, ArrowRightLeft, Utensils, ChevronDown, Loader2, Brain, Bookmark');

// App.tsx
let appContent = fs.readFileSync('src/App.tsx', 'utf-8');
appContent = `import { Sidebar, ActiveSelectionCard, AttributeItem } from './AppComponents';\nimport { PrescriptionCanvas, PatientDetailsCanvas } from './PatientModals';\nimport { QRScannerModal, AnalysisResultModal, ImageEditorModal } from './Modals';\nimport { Dashboard, PatientsTab, RepertoryTab } from './MainTabs';\nimport { RemindersTab, AnalysisTab } from './AnalysisRemindersTabs';\nimport { MateriaMedicaTab, ComparisonSection } from './MateriaMedicaTab';\nimport { PhysiologyAnatomyTab } from './PhysiologyAnatomyTab';\n` + appContent;
fs.writeFileSync('src/App.tsx', appContent);

// MainTabs.tsx
addImports('src/MainTabs.tsx', 'Microscope, Leaf, BookOpen, GraduationCap, Scroll, Quote, ArrowRight, User, Activity, Filter, FileText, ListFilter, ArrowUpDown, Database, Bookmark, MoreHorizontal, ChevronDown');
addTypeImports('src/MainTabs.tsx', 'Rubric');

// MateriaMedicaTab.tsx
let mmContent = fs.readFileSync('src/MateriaMedicaTab.tsx', 'utf-8');
mmContent = mmContent.replace(/import React, \{ useState, useMemo \} from 'react';/, "import React, { useState, useMemo, useEffect } from 'react';");
fs.writeFileSync('src/MateriaMedicaTab.tsx', mmContent);
addImports('src/MateriaMedicaTab.tsx', 'Bell, HelpCircle, RotateCcw, Zap, TrendingDown, Brain, Clock, Utensils, FlaskConical, Plus, User, Leaf');

// Modals.tsx
let modalContent = fs.readFileSync('src/Modals.tsx', 'utf-8');
modalContent = `import { Html5QrcodeScanner } from 'html5-qrcode';\nimport ReactMarkdown from 'react-markdown';\nimport { GoogleGenAI } from "@google/genai";\n` + modalContent;
fs.writeFileSync('src/Modals.tsx', modalContent);
addImports('src/Modals.tsx', 'QrCode, Loader2, Edit, Sparkles');

// PatientModals.tsx
let pmContent = fs.readFileSync('src/PatientModals.tsx', 'utf-8');
pmContent = pmContent.replace(/import React, \{ useState, useEffect \} from 'react';/, "import React, { useState, useEffect, useMemo } from 'react';\nimport { CHAPTER_INDEX } from './constants';");
fs.writeFileSync('src/PatientModals.tsx', pmContent);
addImports('src/PatientModals.tsx', 'Settings, Stethoscope, Activity, ArrowRightLeft, RefreshCw, Utensils, ClipboardList, ChevronLeft, ChevronRight, Users, Database, Calendar, Plus, FlaskConical, BookmarkCheck, ChevronDown, TrendingUp, Bookmark');

// PhysiologyAnatomyTab.tsx
addImports('src/PhysiologyAnatomyTab.tsx', 'Brain, Activity, Zap, Utensils, Bone, ArrowRight, Edit');

console.log('Fixed imports.');
