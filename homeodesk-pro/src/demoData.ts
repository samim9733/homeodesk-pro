import { Patient, Reminder } from './types';

export const DEMO_PATIENTS: Patient[] = [
  {
    id: 'PT-100001',
    name: 'Fatima Khan',
    age: 35,
    gender: 'Female',
    phone: '+92-300-1234567',
    date: '2025-01-15',
    status: 'Active',
    lastVisit: '2025-06-10',
    chiefSymptoms: [
      { id: 'cs1', symptom: 'Migraine headache', duration: '3 months', modality: '< from sunlight', severity: 'Severe' },
      { id: 'cs2', symptom: 'Nausea with headache', duration: '3 months', severity: 'Moderate' },
    ],
    physicalGenerals: [
      { id: 'pg1', attribute: 'Thermal', value: 'Chilly', category: 'Thermal' },
      { id: 'pg2', attribute: 'Thirst', value: 'Increased', category: 'Thirst' },
      { id: 'pg3', attribute: 'Craving', value: 'Sour things', category: 'Desires' },
    ],
    address: '123 Gulberg, Lahore',
    notes: 'Patient responds well to Natrum Mur.',
    prescriptions: [
      { id: 'rx1', date: '2025-01-15', remedy: 'Natrum Muriaticum', potency: '200C', dosage: '3 doses', instructions: 'Weekly' },
    ],
  },
  {
    id: 'PT-100002',
    name: 'Ahmed Ali',
    age: 50,
    gender: 'Male',
    phone: '+92-321-9876543',
    date: '2025-02-20',
    status: 'Follow-up',
    lastVisit: '2025-06-08',
    chiefSymptoms: [
      { id: 'cs3', symptom: 'Joint pain - knees', duration: '6 months', modality: '> from movement', severity: 'Moderate' },
      { id: 'cs4', symptom: 'Stiffness in morning', duration: '1 hour after waking', severity: 'Mild' },
    ],
    physicalGenerals: [
      { id: 'pg4', attribute: 'Thermal', value: 'Hot patient', category: 'Thermal' },
      { id: 'pg5', attribute: 'Craving', value: 'Sweets', category: 'Desires' },
    ],
    notes: 'Improving on Bryonia Alba.',
    prescriptions: [
      { id: 'rx2', date: '2025-02-20', remedy: 'Bryonia Alba', potency: '30C', dosage: 'BD for 2 weeks', instructions: 'Empty stomach' },
    ],
  },
  {
    id: 'PT-100003',
    name: 'Zainab Noor',
    age: 28,
    gender: 'Female',
    phone: '+92-333-5556666',
    date: '2025-03-05',
    status: 'Active',
    lastVisit: '2025-05-28',
    chiefSymptoms: [
      { id: 'cs5', symptom: 'Recurrent cold', duration: '2 months', severity: 'Mild' },
      { id: 'cs6', symptom: 'Post nasal drip', duration: '1 month', severity: 'Mild' },
    ],
    physicalGenerals: [
      { id: 'pg6', attribute: 'Thermal', value: 'Chilly', category: 'Thermal' },
      { id: 'pg7', attribute: 'Sleep', value: 'Disturbed', category: 'Sleep' },
    ],
  },
  {
    id: 'PT-100004',
    name: 'Hassan Raza',
    age: 42,
    gender: 'Male',
    phone: '+92-345-1112222',
    date: '2025-04-12',
    status: 'Active',
    lastVisit: '2025-06-01',
    chiefSymptoms: [
      { id: 'cs7', symptom: 'Acid reflux / Heartburn', duration: '4 months', modality: '> after cold water', severity: 'Moderate' },
    ],
    physicalGenerals: [
      { id: 'pg8', attribute: 'Craving', value: 'Spicy food', category: 'Desires' },
      { id: 'pg9', attribute: 'Thirst', value: 'Increased', category: 'Thirst' },
    ],
  },
];

export const DEMO_REMINDERS: Reminder[] = [
  {
    id: 'rem1',
    patientId: 'PT-100001',
    patientName: 'Fatima Khan',
    date: '2025-06-15',
    time: '10:00 AM',
    message: 'Follow-up appointment for migraine treatment',
    type: 'Follow-up',
    completed: false,
  },
  {
    id: 'rem2',
    patientId: 'PT-100002',
    patientName: 'Ahmed Ali',
    date: '2025-06-18',
    time: '2:00 PM',
    message: 'Medication review - Bryonia Alba response check',
    type: 'Medication',
    completed: false,
  },
  {
    id: 'rem3',
    patientId: 'PT-100003',
    patientName: 'Zainab Noor',
    date: '2025-06-20',
    time: '11:30 AM',
    message: 'Review cold symptoms and consider potency change',
    type: 'Appointment',
    completed: false,
  },
];
