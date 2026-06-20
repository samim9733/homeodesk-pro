const fs = require('fs');

let appFile = fs.readFileSync('src/App.tsx', 'utf-8');

const t2 = appFile.search(/const PhysiologyAnatomyTab = /);
const t3 = appFile.search(/const Sidebar = /);

if (t2 > -1 && t3 > -1) {
  const extractedSrc = appFile.substring(t2, t3);
  
  const imports = `import React, { useState } from 'react';
import { Microscope, BookOpen, Quote, ChevronRight, Stethoscope } from 'lucide-react';
import { PHYSIOLOGY_ANATOMY_DATA, KnowledgeTopic } from './medicalData';

`;

  let fixedSrc = extractedSrc.replace(/const PhysiologyAnatomyTab/g, 'export const PhysiologyAnatomyTab');

  fs.writeFileSync('src/PhysiologyAnatomyTab.tsx', imports + fixedSrc);
  
  appFile = appFile.substring(0, t2) + appFile.substring(t3);
  fs.writeFileSync('src/App.tsx', appFile);
  console.log('Extracted PhysiologyAnatomyTab.');
}
