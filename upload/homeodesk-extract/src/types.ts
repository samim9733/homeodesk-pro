export interface ChiefSymptom {
  complaint: string;
  location: string;
  sensation: string;
  modality: string;
  concomitant: string;
}

export interface PhysicalGeneral {
  label: string;
  value: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  date: string;
  phone?: string;
  status?: 'Active' | 'Follow-up' | 'Completed' | 'Inactive';
  lastVisit?: string;
  coreRubrics?: AnalysisItem[];
  currentPotency?: string;
  remedy?: string;
  notes?: string;
  nextFollowUp?: string;
  caseStatus?: 'Improving' | 'Stable' | 'Aggravating' | 'Declining';
  chiefSymptoms?: ChiefSymptom[];
  mentalSymptoms?: string[];
  physicalGenerals?: PhysicalGeneral[];
  caseAnalysis?: string;
}

export interface Remedy {
  n: string;
  g: 1 | 2 | 3;
}

export interface GeneralSymptomData {
  [key: string]: Remedy[];
}

export interface RubricData {
  location?: Remedy[];
  sensation?: Remedy[];
  modality?: Remedy[];
  concomitant?: Remedy[];
  psychological?: Remedy[];
  general: GeneralSymptomData;
  physiological?: Remedy[];
  mind?: Remedy[];
  pain?: Remedy[];
  desire?: Remedy[];
  aversion?: Remedy[];
  appearance?: Remedy[];
  symptoms?: Remedy[];
  time?: Remedy[];
}

export interface SubRubric {
  name: string;
  tr: string;
  em: string;
  d: RubricData;
}

export interface Rubric {
  name: string;
  tr: string;
  em: string;
  sr: SubRubric[];
}

export interface Chapter {
  name: string;
  tr: string;
  t?: string;
  icon: string;
  pages: string;
  rubrics: Rubric[];
}

export interface ChapterIndex {
  n: string;
  p: string;
  i: string;
  t?: string;
  c?: string; // Color hex or tailwind class
}

export interface Category {
  key: string;
  e: string;
  n: string;
  t: string;
  d: string;
  hasSub?: boolean;
}

export interface GeneralSubCategory {
  key: string;
  e: string;
  n: string;
  t: string;
  d: string;
}

export interface AnalysisItem {
  chapter: string;
  rubric: string;
  subrubric?: string;
  text: string;
  category?: string;
  page: string | number;
  remedies: Remedy[];
}

export interface Reminder {
  id: string;
  patientId: string;
  patientName: string;
  type: 'Appointment' | 'Medication' | 'Follow-up' | 'Other';
  date: string;
  time: string;
  note: string;
  completed: boolean;
}

export interface PharmacyRemedy {
  id: string;
  name: string;
  nameBn: string;
  kingdom: 'Plant' | 'Mineral' | 'Animal' | 'Nosode' | 'Sarcode' | 'Imponderabilia';
  potency: string;
  quantity: number;
  unit: 'bottles' | 'ml' | 'grams' | 'units';
  status: 'OPTIMAL' | 'REORDER SOON' | 'CRITICAL' | 'OUT OF STOCK';
  price: number;
}

export interface Supplier {
  id: string;
  name: string;
  phone: string;
  location: string;
  verified: boolean;
}

export interface Invoice {
  id: string;
  supplierName: string;
  amount: number;
  currency: 'BDT' | 'USD' | 'EUR';
  status: 'PAID' | 'PENDING' | 'CANCELLED';
  date: string;
}

export interface PharmacyStats {
  totalRemedies: number;
  monthlyGrowth: number;
  activeStockValue: number;
  criticalShortages: {
    name: string;
    potency: string;
    unitsLeft: number;
  }[];
  stockByKingdom: {
    kingdom: string;
    percentage: number;
    color: string;
  }[];
}
