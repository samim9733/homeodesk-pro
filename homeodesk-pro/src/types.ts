// HomeoDesk Pro - Type Definitions

export interface ChiefSymptom {
  id: string;
  symptom: string;
  duration?: string;
  modality?: string;
  severity?: 'Mild' | 'Moderate' | 'Severe';
}

export interface PhysicalGeneral {
  id: string;
  attribute: string;
  value: string;
  category?: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other' | 'Unspecified';
  phone: string;
  date: string;
  chiefSymptoms: ChiefSymptom[];
  physicalGenerals: PhysicalGeneral[];
  status?: 'Active' | 'Inactive' | 'Follow-up';
  lastVisit?: string;
  address?: string;
  email?: string;
  notes?: string;
  prescriptions?: Prescription[];
  allergies?: string[];
  pastHistory?: string;
  familyHistory?: string;
  mentalSymptoms?: string[];
  thermal?: string;
  thirst?: string;
  craving?: string;
  aversion?: string;
  sleep?: string;
  dreams?: string;
  tongue?: string;
  pulse?: string;
  bp?: string;
}

export interface Prescription {
  id: string;
  date: string;
  remedy: string;
  potency: string;
  dosage: string;
  instructions: string;
  followUp?: string;
}

export interface AnalysisItem {
  text: string;
  chapter: string;
  remedies?: string[];
  grade?: number;
}

export interface Reminder {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  time?: string;
  message: string;
  type: 'Follow-up' | 'Appointment' | 'Medication' | 'Lab';
  completed?: boolean;
}

export interface Rubric {
  id: string;
  text: string;
  chapter: string;
  remedies: string[];
  grade?: number;
}

export interface RubricData {
  id: string;
  chapter: string;
  rubrics: Rubric[];
}

export interface Remedy {
  name: string;
  abbrev?: string;
  remedies?: string[];
}

export interface PharmacyRemedy {
  id: string;
  name: string;
  potency: string;
  stock: number;
  price: number;
  supplier?: string;
  batchNo?: string;
  expiryDate?: string;
  minStock?: number;
}

export interface Supplier {
  id: string;
  name: string;
  contact: string;
  email?: string;
  phone?: string;
  address?: string;
}

export interface Invoice {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  items: InvoiceItem[];
  total: number;
  status: 'Paid' | 'Pending' | 'Overdue';
  notes?: string;
}

export interface InvoiceItem {
  remedy: string;
  potency: string;
  quantity: number;
  price: number;
  total: number;
}

export interface PharmacyStats {
  totalRemedies: number;
  lowStock: number;
  totalValue: number;
  pendingInvoices: number;
}

export interface AnatomySystem {
  id: string;
  name: string;
  image: string;
  description: string;
  parts: AnatomyPart[];
}

export interface AnatomyPart {
  name: string;
  description: string;
}

export interface RubricSearchResult {
  rubric: string;
  chapter: string;
  remedies: string[];
}

export interface RepertorizationResult {
  name: string;
  score: number;
  count: number;
  rubrics: string[];
}

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  category: string;
}

export interface Article {
  id: string;
  title: string;
  summary: string;
  date: string;
  category: string;
  content?: string;
}
