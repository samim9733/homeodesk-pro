const fs = require('fs');

let appFile = fs.readFileSync('src/App.tsx', 'utf-8');

const t2 = appFile.search(/const Sidebar = /);
const t3 = appFile.search(/export default function App/);

if (t2 > -1 && t3 > -1) {
  const extractedSrc = appFile.substring(t2, t3);
  
  const imports = `import React, { useState } from 'react';
import { motion } from 'motion/react';
import { LayoutDashboard, Users, Bell, Stethoscope, TrendingUp, BookOpen, Microscope, GraduationCap, FlaskConical, Leaf, Database, Settings, X, ChevronRight, ChevronLeft, Pencil, Brain, Clock, Activity, ClipboardList } from 'lucide-react';
import { Patient } from './types';

`;

  let fixedSrc = extractedSrc
    .replace(/const Sidebar/g, 'export const Sidebar')
    .replace(/const ActiveSelectionCard/g, 'export const ActiveSelectionCard')
    .replace(/const AttributeItem/g, 'export const AttributeItem');

  fs.writeFileSync('src/AppComponents.tsx', imports + fixedSrc);
  
  appFile = appFile.substring(0, t2) + appFile.substring(t3);
  fs.writeFileSync('src/App.tsx', appFile);
  console.log('Extracted AppComponents.');
}
