import { Patient, Reminder, PharmacyRemedy, Supplier, Invoice, PharmacyStats } from './types';

export const DEMO_PATIENTS: Patient[] = [
  { 
    id: 'PT-998877', 
    name: 'Clara Oswald', 
    age: 28, 
    gender: 'Female', 
    date: '2023-11-02',
    status: 'Active',
    lastVisit: '2023-09-28',
    coreRubrics: [
      { chapter: 'Mind', rubric: 'Anxiety', text: 'Anxiety, health about', page: 1, remedies: [] },
      { chapter: 'Sleep', rubric: 'Sleeplessness', text: 'Sleeplessness, after 3 AM', page: 1, remedies: [] },
      { chapter: 'Chest', rubric: 'Palpitations', text: 'Palpitations, anxiety with', page: 1, remedies: [] }
    ],
    currentPotency: '200C',
    remedy: 'Arsenicum Album',
    notes: 'Administered 3c doses over 24 hours. Follow-up scheduled for 14 days to observe sycotic discharge.',
    caseStatus: 'Improving',
    nextFollowUp: '2023-10-12',
    chiefSymptoms: [
      { complaint: 'Burning pain in stomach', location: 'Epigastric region', sensation: 'Burning, like fire', modality: '< midnight, > warm drinks', concomitant: 'Restlessness' },
      { complaint: 'Palpitations', location: 'Heart region', sensation: 'Fluttering', modality: '< lying on left side', concomitant: 'Anxiety' },
      { complaint: '', location: '', sensation: '', modality: '', concomitant: '' },
      { complaint: '', location: '', sensation: '', modality: '', concomitant: '' },
      { complaint: '', location: '', sensation: '', modality: '', concomitant: '' }
    ],
    mentalSymptoms: ['Great anxiety and restlessness', 'Fear of death', 'Fastidious', 'Desire for company', ''],
    physicalGenerals: [
      { label: 'Time', value: 'Aggravation at midnight (1-2 AM)' },
      { label: 'Temperature', value: 'Very chilly, wants to be wrapped up' },
      { label: 'Physiological', value: 'Thirst for small quantities at frequent intervals' },
      { label: 'Position', value: 'Cannot lie down, must sit up' },
      { label: 'Pathological', value: '' },
      { label: 'Physical Factors', value: '' },
      { label: 'Discharges', value: 'Acrid, burning discharges' },
      { label: 'Sides', value: 'Right sided' },
      { label: 'Alterations', value: '' },
      { label: 'Craving/Aversion', value: 'Craves warm drinks, aversion to cold' }
    ],
    caseAnalysis: 'The totality of symptoms strongly indicates Arsenicum Album. The burning pains, midnight aggravation, and characteristic thirst are key pointers.'
  },
  { id: 'PT-102345', name: 'John Doe', age: 45, gender: 'Male', date: '2024-03-15' },
  { id: 'PT-203456', name: 'Jane Smith', age: 32, gender: 'Female', date: '2024-03-18' },
  { id: 'PT-304567', name: 'Robert Brown', age: 58, gender: 'Male', date: '2024-03-20' },
  { id: 'PT-405678', name: 'Emily Davis', age: 24, gender: 'Female', date: '2024-03-22' },
  { id: 'PT-506789', name: 'Michael Wilson', age: 41, gender: 'Male', date: '2024-03-25' },
  { id: 'PT-607890', name: 'Sarah Miller', age: 29, gender: 'Female', date: '2024-03-28' },
  { id: 'PT-708901', name: 'William Taylor', age: 63, gender: 'Male', date: '2024-04-01' },
  { id: 'PT-809012', name: 'Linda Anderson', age: 52, gender: 'Female', date: '2024-04-02' },
  { id: 'PT-910123', name: 'David Thomas', age: 37, gender: 'Male', date: '2024-04-03' },
  { id: 'PT-021234', name: 'Barbara Moore', age: 48, gender: 'Female', date: '2024-04-04' },
  { id: 'PT-132345', name: 'Richard Jackson', age: 55, gender: 'Male', date: '2024-04-04' },
  { id: 'PT-243456', name: 'Susan White', age: 31, gender: 'Female', date: '2024-04-05' },
];

export const DEMO_REMINDERS: Reminder[] = [
  { id: 'REM-1', patientId: 'PT-102345', patientName: 'John Doe', type: 'Follow-up', date: '2024-04-10', time: '10:00', note: 'Check progress after 2 weeks of Pulsatilla', completed: false },
  { id: 'REM-2', patientId: 'PT-203456', patientName: 'Jane Smith', type: 'Medication', date: '2024-04-06', time: '08:00', note: 'Start morning dose of Lycopodium', completed: false },
  { id: 'REM-3', patientId: 'PT-304567', patientName: 'Robert Brown', type: 'Appointment', date: '2024-04-15', time: '15:30', note: 'Monthly review for chronic cough', completed: false },
];


export const PHARMACY_DEMO_DATA: {
  remedies: PharmacyRemedy[];
  suppliers: Supplier[];
  invoices: Invoice[];
  stats: PharmacyStats;
} = {
  remedies: [
    { id: '1', name: 'Aconitum Napellus', nameBn: 'একোনাইট ন্যাপেলাস', kingdom: 'Plant', potency: '200C', quantity: 12, unit: 'bottles', status: 'OPTIMAL', price: 450 },
    { id: '2', name: 'Arsenicum Album', nameBn: 'আর্সেনিকাম অ্যালবাম', kingdom: 'Mineral', potency: '30C', quantity: 5, unit: 'bottles', status: 'REORDER SOON', price: 380 },
    { id: '3', name: 'Calcarea Carbonica', nameBn: 'ক্যালকেরিয়া কার্বোনিকা', kingdom: 'Animal', potency: '1M', quantity: 28, unit: 'bottles', status: 'OPTIMAL', price: 520 },
    { id: '4', name: 'Pulsatilla Nigricans', nameBn: 'পালসেটিলা নাইগ্রিক্যানস', kingdom: 'Plant', potency: 'Q', quantity: 140, unit: 'ml', status: 'OPTIMAL', price: 850 },
  ],
  suppliers: [
    { id: 'S1', name: 'Apex Homeo Labs', phone: '+880 1711-223344', location: 'Dhaka', verified: true },
    { id: 'S2', name: 'Schwabe Distribution', phone: '+49 721 4005-0', location: 'Germany', verified: false },
    { id: 'S3', name: 'B. Jain Pharmaceuticals', phone: '+91 120 4512333', location: 'Delhi', verified: true },
  ],
  invoices: [
    { id: 'INV #7829-HP', supplierName: 'Apex Homeo Labs', amount: 12500, currency: 'BDT', status: 'PAID', date: '2024-03-28' },
    { id: 'INV #7810-HP', supplierName: 'Direct Import (DE)', amount: 420, currency: 'EUR', status: 'PENDING', date: '2024-04-02' },
  ],
  stats: {
    totalRemedies: 1248,
    monthlyGrowth: 12,
    activeStockValue: 482500,
    criticalShortages: [
      { name: 'Amica Montana', potency: '200C', unitsLeft: 2 },
      { name: 'Nux Vomica', potency: '30C', unitsLeft: 0 },
      { name: 'Lycopodium', potency: '1M', unitsLeft: 1 },
    ],
    stockByKingdom: [
      { kingdom: 'Plant', percentage: 65, color: '#10b981' },
      { kingdom: 'Mineral', percentage: 25, color: '#3b82f6' },
      { kingdom: 'Animal', percentage: 10, color: '#f59e0b' },
    ]
  }
};