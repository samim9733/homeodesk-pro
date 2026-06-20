export interface PathologyTest {
  name: string;
  banglaName: string;
  category: string;
  banglaCategory: string;
  normal: string;
}

export interface DiseaseCategory {
  id: string;
  name: string;
  banglaName: string;
  icon: string;
  materialIcon?: string;
  miasm?: string;
  clinicalKeys?: string[];
  diseases: { name: string; banglaName: string }[];
}

export interface KnowledgeTopic {
  title: string;
  banglaTitle: string;
  desc: string;
  banglaDesc: string;
  icon: string;
  details?: {
    title: string;
    items: string[];
  }[];
}

export interface ClassicBook {
  title: string;
  author: string;
  description: string;
  image: string;
  category: string;
}

export interface KnowledgeArticle {
  title: string;
  author: string;
  date: string;
  type: 'Research' | 'Case Study' | 'Protocol';
  isPeerReviewed: boolean;
}

export interface KnowledgeCategory {
  title: string;
  description: string;
  icon: string;
  count?: string;
  color: string;
  span?: string;
}

export const PATHOLOGY_DATA: PathologyTest[] = [
  { name: 'Complete Blood Count (CBC)', banglaName: 'কমপ্লিট ব্লাড কাউন্ট (সিবিসি)', category: 'Hematology', banglaCategory: 'হেমাটোলজি', normal: 'Varies' },
  { name: 'Hemoglobin (Hb)', banglaName: 'হিমোগ্লোবিন', category: 'Hematology', banglaCategory: 'হেমাটোলজি', normal: '13.5-17.5 g/dL (M), 12.0-15.5 g/dL (F)' },
  { name: 'ESR (Westergren)', banglaName: 'ইএসআর', category: 'Hematology', banglaCategory: 'হেমাটোলজি', normal: '0-15 mm/hr (M), 0-20 mm/hr (F)' },
  { name: 'Platelet Count', banglaName: 'প্লাটিলেট কাউন্ট', category: 'Hematology', banglaCategory: 'হেমাটোলজি', normal: '150,000 - 450,000 /mcL' },
  { name: 'Liver Function Test (LFT)', banglaName: 'লিভার ফাংশন টেস্ট (এলএফটি)', category: 'Biochemistry', banglaCategory: 'বায়োকেমিস্ট্রি', normal: 'Varies' },
  { name: 'SGPT (ALT)', banglaName: 'এসজিপিটি', category: 'Biochemistry', banglaCategory: 'বায়োকেমিস্ট্রি', normal: '7 to 55 units/L' },
  { name: 'SGOT (AST)', banglaName: 'এসজিওটি', category: 'Biochemistry', banglaCategory: 'বায়োকেমিস্ট্রি', normal: '8 to 48 units/L' },
  { name: 'Bilirubin (Total)', banglaName: 'বিলিরুবিন (টোটাল)', category: 'Biochemistry', banglaCategory: 'বায়োকেমিস্ট্রি', normal: '0.1 to 1.2 mg/dL' },
  { name: 'Kidney Function Test (KFT)', banglaName: 'কিডনি ফাংশন টেস্ট (কেএফটি)', category: 'Biochemistry', banglaCategory: 'বায়োকেমিস্ট্রি', normal: 'Varies' },
  { name: 'Serum Creatinine', banglaName: 'সিরাম ক্রিয়েটিনিন', category: 'Biochemistry', banglaCategory: 'বায়োকেমিস্ট্রি', normal: '0.7 to 1.3 mg/dL' },
  { name: 'Blood Urea', banglaName: 'ব্লাড ইউরিয়া', category: 'Biochemistry', banglaCategory: 'বায়োকেমিস্ট্রি', normal: '7 to 20 mg/dL' },
  { name: 'Blood Sugar (Fasting)', banglaName: 'ব্লাড সুগার (ফাস্টিং)', category: 'Biochemistry', banglaCategory: 'বায়োকেমিস্ট্রি', normal: '70-99 mg/dL' },
  { name: 'Blood Sugar (PP)', banglaName: 'ব্লাড সুগার (পিপি)', category: 'Biochemistry', banglaCategory: 'বায়োকেমিস্ট্রি', normal: '< 140 mg/dL' },
  { name: 'HbA1c', banglaName: 'এইচবিএ১সি', category: 'Biochemistry', banglaCategory: 'বায়োকেমিস্ট্রি', normal: 'Below 5.7%' },
  { name: 'Lipid Profile', banglaName: 'লিপিড প্রোফাইল', category: 'Biochemistry', banglaCategory: 'বায়োকেমিস্ট্রি', normal: 'Varies' },
  { name: 'Total Cholesterol', banglaName: 'টোটাল কোলেস্টেরল', category: 'Biochemistry', banglaCategory: 'বায়োকেমিস্ট্রি', normal: '< 200 mg/dL' },
  { name: 'Urine Analysis', banglaName: 'ইউরিন অ্যানালাইসিস (প্রস্রাব পরীক্ষা)', category: 'Clinical Pathology', banglaCategory: 'ক্লিনিক্যাল প্যাথলজি', normal: 'Clear/Straw colored' },
  { name: 'Urine Sugar', banglaName: 'ইউরিন সুগার', category: 'Clinical Pathology', banglaCategory: 'ক্লিনিক্যাল প্যাথলজি', normal: 'Nil' },
  { name: 'Urine Albumin', banglaName: 'ইউরিন অ্যালবুমিন', category: 'Clinical Pathology', banglaCategory: 'ক্লিনিক্যাল প্যাথলজি', normal: 'Nil' },
  { name: 'Chest X-Ray', banglaName: 'চেস্ট এক্স-রে (বুকের এক্স-রে)', category: 'Radiology', banglaCategory: 'রেডিওলজি', normal: 'Normal findings' },
  { name: 'USG of Whole Abdomen', banglaName: 'ইউএসজি (পেট)', category: 'Radiology', banglaCategory: 'রেডিওলজি', normal: 'Normal' },
  { name: 'TSH (Thyroid)', banglaName: 'টিএসএইচ (থাইরয়েড)', category: 'Hormone', banglaCategory: 'হরমোন', normal: '0.4 to 4.0 mIU/L' },
  { name: 'T3 (Total)', banglaName: 'টি৩', category: 'Hormone', banglaCategory: 'হরমোন', normal: '80-200 ng/dL' },
  { name: 'T4 (Total)', banglaName: 'টি৪', category: 'Hormone', banglaCategory: 'হরমোন', normal: '5.0-12.0 ug/dL' },
  { name: 'Vitamin D (25-OH)', banglaName: 'ভিটামিন ডি', category: 'Biochemistry', banglaCategory: 'বায়োকেমিস্ট্রি', normal: '30-100 ng/mL' },
  { name: 'Vitamin B12', banglaName: 'ভিটামিন বি১২', category: 'Biochemistry', banglaCategory: 'বায়োকেমিস্ট্রি', normal: '200-900 pg/mL' },
  { name: 'C-Reactive Protein (CRP)', banglaName: 'সিআরপি', category: 'Hematology', banglaCategory: 'হেমাটোলজি', normal: '< 10 mg/L' },
  { name: 'Widal Test', banglaName: 'উইডাল টেস্ট (টাইফয়েড)', category: 'Hematology', banglaCategory: 'হেমাটোলজি', normal: 'Negative' },
  { name: 'Dengue NS1 Antigen', banglaName: 'ডেঙ্গু এনএস১', category: 'Hematology', banglaCategory: 'হেমাটোলজি', normal: 'Negative' },
  { name: 'Malaria Parasite (MP)', banglaName: 'ম্যালেরিয়া প্যারাসাইট', category: 'Hematology', banglaCategory: 'হেমাটোলজি', normal: 'Not Found' },
];

export const PRACTICE_MEDICINE_DATA: DiseaseCategory[] = [
  { 
    id: 'psora', 
    name: 'Psora', 
    banglaName: 'সোরা (Psora)',
    icon: '📋', 
    materialIcon: 'clinical_notes',
    miasm: 'Psora',
    clinicalKeys: ['Foundational chronic miasm', 'Functional disturbances', 'Skin manifestations'],
    diseases: [
      { name: 'Ancient Homeopathy', banglaName: 'সমশাস্ত্রের প্রাচীনতম কথা' },
      { name: 'How Remedies Work', banglaName: 'এক ফোঁটা ঔষধেই কাজ কি করে হয়' },
      { name: 'Life of Hahnemann', banglaName: 'হ্যানিম্যানের জীবন কাহিনী' },
      { name: 'Homeopathic Medicine', banglaName: 'হোমিওপ্যাথিক ঔষধ' },
      { name: 'Dosage of Medicine', banglaName: 'ঔষধের মাত্রা' },
      { name: 'External Application', banglaName: 'বাহ্য প্রয়োগের ঔষধ' },
      { name: 'Symptoms & Intake', banglaName: 'রোগ লক্ষণ ও ঔষধ সেবন' },
      { name: 'Remedy Selection', banglaName: 'ঔষধ নির্বাচন' },
      { name: 'Patient Examination', banglaName: 'রোগীর পরীক্ষা' },
      { name: 'Temperature Test', banglaName: 'রোগীর তাপ পরীক্ষা' },
      { name: 'Tongue Examination', banglaName: 'জিহ্বা পরীক্ষা' },
      { name: 'Face & Chest Exam', banglaName: 'মুখমণ্ডল ও বক্ষ পরীক্ষা' },
      { name: 'Skin Examination', banglaName: 'গায়ের চর্ম পরীক্ষা' },
      { name: 'Vomit & Stool Exam', banglaName: 'বমি, মল পরীক্ষা' },
      { name: 'Urine Test', banglaName: 'মূত্র (Urine) পরীক্ষা' },
      { name: 'Blood Analysis', banglaName: 'রক্তের স্বাভাবিক বিশ্লেষণ' },
      { name: 'Cholesterol', banglaName: 'কোলেস্টরল' },
      { name: 'Uric Acid', banglaName: 'ইউরিক অ্যাসিড' },
      { name: 'Sputum Test', banglaName: 'স্বাভাবিক থু থু (Sputum) পরীক্ষা' },
      { name: 'Blood Pressure Report', banglaName: 'রক্তের চাপ পরীক্ষার রিপোর্ট' },
      { name: 'Patient Nursing', banglaName: 'রোগীর শুশ্রূষা ব্যবস্থা' },
      { name: 'Diet Preparation', banglaName: 'পথ্য ও তার প্রস্তুত প্রণালী' },
      { name: 'Indigestion', banglaName: 'অজীর্ণ রোগ' },
      { name: 'Acidity', banglaName: 'অম্লরোগ' },
      { name: 'Glossitis', banglaName: 'জিহ্বা প্রদাহ' },
      { name: 'Mouth Ulcer', banglaName: 'মুখের মধ্যে ক্ষত' },
      { name: 'Pregnancy Care', banglaName: 'গর্ভাবস্থা ও তৎকালীন ব্যবস্থা' },
      { name: 'Hysteria', banglaName: 'হিস্টিরিয়া' },
      { name: 'Dermatitis', banglaName: 'ডার্মাটাইটিস' },
      { name: 'Eczema', banglaName: 'একজিমা' },
      { name: 'Psoriasis', banglaName: 'সোরিয়াসিস্' }
    ] 
  },
  { 
    id: 'syc', 
    name: 'Sycosis (Syc)', 
    banglaName: 'সাইকোসিস - Syc',
    icon: '🧬', 
    materialIcon: 'biotech',
    miasm: 'Sycosis',
    clinicalKeys: ['Overgrowth & Infiltration', 'Slow recovery', 'Dampness aggravation'],
    diseases: [
      { name: 'Liver & Gallbladder', banglaName: 'যকৃত ও পিস্তকোষ' },
      { name: 'Urinary Organs', banglaName: 'মুত্র যন্ত্রাদি' },
      { name: 'Jaundice', banglaName: 'পাণ্ডু বা ন্যাবা রোগ' },
      { name: 'Liver Cirrhosis', banglaName: 'লিভারেব সিরোসিস' },
      { name: 'Gallstones', banglaName: 'পিও পাথরী' },
      { name: 'Splenomegaly', banglaName: 'প্লীহা বৃদ্ধি' },
      { name: 'Piles', banglaName: 'অর্ণ (Piles)' },
      { name: 'Worms', banglaName: 'ক্রিমি রোগ' },
      { name: 'Nephritis', banglaName: 'মূত্রগ্রন্থি প্রদাহ' },
      { name: 'Kidney Stones', banglaName: 'মৃত পাথরী' },
      { name: 'Rheumatism', banglaName: 'বাত ব্যাধি' },
      { name: 'Gout', banglaName: 'গে টেবাত' },
      { name: 'Lumbago', banglaName: 'কৃটিবাত' },
      { name: 'Dropsy', banglaName: 'শোথ (Dropsy)' },
      { name: 'Filariasis', banglaName: 'ফাইলেরিয়াসিস্' },
      { name: 'Hydrocele', banglaName: 'হাইড্রোসিল' },
      { name: 'Ovarian Cyst', banglaName: 'ওভারিয়ানসিস্ট ও টিউমার' }
    ] 
  },
  { 
    id: 'sycotic', 
    name: 'Sycotic', 
    banglaName: 'সাইকোটিক (Sycotic)',
    icon: '🦠', 
    materialIcon: 'microbiology',
    miasm: 'Sycotic',
    clinicalKeys: ['Venereal origin', 'Structural changes', 'Fixed ideas'],
    diseases: [
      { name: 'Gonorrhea', banglaName: 'গনোরিয়া' },
      { name: 'Prostate Cancer', banglaName: 'প্রস্টেটের ক্যানসার' },
      { name: 'Impotence', banglaName: 'ধ্বজভঙ্গ' },
      { name: 'Phimosis', banglaName: 'ফাইমোসিস রোগ' },
      { name: 'Spermatorrhoea', banglaName: ' শুরুতাবল্য বা ধাতু দৌর্বল্য' },
      { name: 'Uterine Prolapse', banglaName: 'জরায়ু নেমে আসা' },
      { name: 'Salpingitis', banglaName: 'ডিম্বনালীর প্রদাহ' },
      { name: 'Vaginitis', banglaName: 'যোনির প্রদাহ' },
      { name: 'Uterine Polyp', banglaName: 'জরায়ুর পলিপাস' },
      { name: 'Warts', banglaName: 'আঁচিল' },
      { name: 'Stomach Cancer', banglaName: 'পাকস্থলীর ক্যানসার' },
      { name: 'Thrombosis', banglaName: 'করোনারী, সেরিব্রাল থম্বোসিস' }
    ] 
  },
  { 
    id: 'tuberculosis', 
    name: 'Tuberculosis', 
    banglaName: 'টিউবারকুলোসিস (Tubercular)',
    icon: '🫁', 
    materialIcon: 'pulmonology',
    miasm: 'Tubercular',
    clinicalKeys: ['Wasting & Debility', 'Respiratory focus', 'Changing symptoms'],
    diseases: [
      { name: 'Tuberculosis', banglaName: 'যক্ষা বা ক্ষয়রোগ' },
      { name: 'Asthma', banglaName: 'হাঁপানি' },
      { name: 'Bronchitis', banglaName: 'ব্রঙ্কাইটিস' },
      { name: 'Chronic Cold', banglaName: 'পুরানো সর্দি' },
      { name: 'Pneumonia', banglaName: 'নিউমোনিয়া বা ফুসফুস প্রদাহ' },
      { name: 'Pleurisy', banglaName: 'পুরিসি' },
      { name: 'Pulmonary Abscess', banglaName: 'পালমোনাবী অ্যাবসেস' },
      { name: 'Bronchiectasis', banglaName: 'ব্রঙ্কিয়েকটাসিস' },
      { name: 'Anemia (Child)', banglaName: 'শিশুদের রক্তশূন্যতা' },
      { name: 'Rickets', banglaName: 'শিশুদের রিকেটস্ রোগ' },
      { name: 'Diabetes', banglaName: 'ডায়াবেটিস বা বহুমূত্র রোগ' },
      { name: 'Vitiligo', banglaName: 'শ্বেতী' }
    ] 
  },
  { 
    id: 'acute', 
    name: 'Acute', 
    banglaName: 'অ্যাকিউট (Acute)',
    icon: '🚑', 
    materialIcon: 'emergency',
    miasm: 'Acute',
    clinicalKeys: ['Sudden onset', 'Rapid progress', 'Intense symptoms'],
    diseases: [
      { name: 'Fever (Pyrexia)', banglaName: 'জর (Pyrexia বা Fever)' },
      { name: 'Cold & Flu', banglaName: 'সর্দি ও সর্দি জর' },
      { name: 'Malaria', banglaName: 'ম্যালেরিয়া' },
      { name: 'Typhoid', banglaName: 'টাইফয়েড ও প্যারাটাইফযেড জর' },
      { name: 'Dengue', banglaName: 'ডেঙ্গু জর' },
      { name: 'Cholera', banglaName: 'কলেরা বোগ' },
      { name: 'Dysentery', banglaName: 'আমাশয' },
      { name: 'Appendicitis', banglaName: 'অ্যাপেনডিসাইটিস' },
      { name: 'Emergency Treatment', banglaName: 'আকস্মিক দুর্ঘটনার চিকিৎসা' },
      { name: 'Burns & Injuries', banglaName: 'আগুেন পোড়া, আঘাত' },
      { name: 'Poisoning', banglaName: 'বিষ খাওয়া, সর্প দংশন' },
      { name: 'Snake Bite', banglaName: 'সর্প দংশন' },
      { name: 'Drowning', banglaName: 'জলে ডোবা' },
      { name: 'Sprain & Fracture', banglaName: 'মচকে বা ভেঙ্গে যাওয়া' },
      { name: 'Sunstroke', banglaName: 'সদি\'গমি' },
      { name: 'Tetanus', banglaName: 'ধনুষ্টঙ্কার' },
      { name: 'Chickenpox', banglaName: 'জলবসন্ত' },
      { name: 'Smallpox', banglaName: 'গুটিবসন্ত' },
      { name: 'Measles', banglaName: 'হামজার' }
    ] 
  },
];

export const KNOWLEDGE_DATA: KnowledgeTopic[] = [
  { 
    title: 'Homeopathic Philosophy', 
    banglaTitle: 'হোমিওপ্যাথিক দর্শন',
    desc: 'Foundational principles and laws of healing.', 
    banglaDesc: 'আরোগ্যের মৌলিক নীতি ও আইনসমূহ।',
    icon: '📜' 
  },
  { 
    title: 'Materia Medica Studies', 
    banglaTitle: 'মেটেরিয়া মেডিকা অধ্যয়ন',
    desc: 'In-depth study of medicinal properties.', 
    banglaDesc: 'ওষুধের গুণাবলীর বিস্তারিত অধ্যয়ন।',
    icon: '🌿' 
  },
  { 
    title: 'Case Taking Techniques', 
    banglaTitle: 'কেস টেকিং কৌশল',
    desc: 'Art of recording patient symptoms correctly.', 
    banglaDesc: 'রোগীর লক্ষণ সঠিকভাবে লিপিবদ্ধ করার শিল্প।',
    icon: '📝' 
  },
  { 
    title: 'Homeopathic Pharmacy', 
    banglaTitle: 'হোমিওপ্যাথিক ফার্মেসি',
    desc: 'Preparation and potentisation of remedies.', 
    banglaDesc: 'ওষুধের প্রস্তুতি এবং শক্তিকরণ।',
    icon: '🧪' 
  },
  { 
    title: 'Chronic Miasms', 
    banglaTitle: 'ক্রনিক মায়াজম',
    desc: 'Understanding Psora, Syphilis, and Sycosis.', 
    banglaDesc: 'সোরা, সিফিলিস এবং সাইকোসিস বোঝা।',
    icon: '🧬' 
  },
  { 
    title: 'Repertorization', 
    banglaTitle: 'রেপার্টরাইজেশন',
    desc: 'Systematic analysis of symptoms to find the remedy.', 
    banglaDesc: 'ওষুধ খুঁজে পেতে লক্ষণের পদ্ধতিগত বিশ্লেষণ।',
    icon: '🔍' 
  },
  { 
    title: 'Clinical Medicine', 
    banglaTitle: 'ক্লিনিক্যাল মেডিসিন',
    desc: 'Practical application of medical knowledge in clinics.', 
    banglaDesc: 'ক্লিনিকে চিকিৎসা জ্ঞানের ব্যবহারিক প্রয়োগ।',
    icon: '🏥' 
  },
  { 
    title: 'Pathology Interpretation', 
    banglaTitle: 'প্যাথলজি ব্যাখ্যা',
    desc: 'Understanding lab reports and diagnostic tests.', 
    banglaDesc: 'ল্যাব রিপোর্ট এবং ডায়াগনস্টিক পরীক্ষা বোঝা।',
    icon: '🔬' 
  },
  {
    title: 'Ground Plan of Organon',
    banglaTitle: 'অর্গানন গ্রাউন্ড প্ল্যান',
    desc: 'Structural layout of Hahnemann\'s fundamental work.',
    banglaDesc: 'হ্যানিম্যানের মৌলিক কাজের কাঠামোগত বিন্যাস।',
    icon: '🗺️',
    details: [
      {
        title: 'Doctrinal Part (Sec. 1-70)',
        items: [
          'The physician\'s Mission (1-2)',
          'Requisite knowledge of a physician (3-4)',
          'Knowledge of disease (5-18)',
          'Knowledge of drugs (19-21)',
          'Application of drug-knowledge to Disease-knowledge (22-27)',
          'Choice of remedy & modes of administration (28-69)',
          'Summary (70)'
        ]
      },
      {
        title: 'Practical Part (Sec. 71-291)',
        items: [
          'Three-fold items of practical knowledge (71)',
          'What is to be known to cure (72-104)',
          'How to acquire knowledge of medicines (105-145)',
          'Most suitable method of employing medicines (146-285)',
          'Therapeutic agents other than drugs (286-291)'
        ]
      }
    ]
  },
  {
    title: 'Clinical Classification of Diseases',
    banglaTitle: 'রোগের ক্লিনিক্যাল শ্রেণিবিন্যাস',
    desc: 'Hahnemannian classification of acute and chronic diseases.',
    banglaDesc: 'অ্যাকিউট এবং ক্রনিক রোগের হ্যানিম্যানীয় শ্রেণিবিন্যাস।',
    icon: '📊',
    details: [
      {
        title: 'Classification of Illness',
        items: [
          'Indisposition (Sec. 150)',
          'Surgical diseases',
          'Dynamic diseases (Diseases proper)'
        ]
      },
      {
        title: 'Dynamic Diseases',
        items: [
          'Acute diseases (Individual, Epidemic)',
          'Chronic diseases (Non-miasmatic, Miasmatic)',
          'Miasms: Psora, Syphilis, Sycosis',
          'Compound Miasms: Psoro-Syphilitic, Psoro-Sycotic, etc.'
        ]
      }
    ]
  }
];

export const CLASSIC_BOOKS: ClassicBook[] = [
  {
    title: 'Organon of the Medical Art',
    author: 'Samuel Hahnemann',
    description: 'The fundamental textbook of homeopathic medicine, 6th edition with annotations.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrg5NWc_vyFwvOw8AZnvp0fajNwhUZgVUq0nklcpQdjh7DvqysCasRkgjKTvpd4NWbkMBjiUZ5nC3f4e-8c0Kuwf7H47SJaDnRA_b2pHfFn_v61OBT4AJ17rPWI1lD9XZdArGurYXh0JhYumBW1wYQKIh-JElSpEaIyObnV-qu2fG0air4bBfcMF6_IKUG2XP4cO9yIwIRigpaCjgxPYeO8pj7hN0iypPwIWjHO0ZYeSybA_wmPK0J2s-taYJZACXtMqt1_NzuVIUP',
    category: 'Philosophy'
  },
  {
    title: 'Lectures on Materia Medica',
    author: 'J.T. Kent',
    description: 'Detailed psychological profiles and physical characteristics of primary remedies.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUTGxqzIos6Jbh_7p7IQrho3XZyXcH3M7VaVwMYtSWrhCjZYJYfacT7lSRTgSD9AETg2RVEGrcdOSglow-3J5SZyQLH5swib8HZfOJLHpUa9Zdk7iRAlOf_wCEaiqIpSr5h1yQTugVNYnL-uz1qPVmNxnV-ZIBB4vqJLSWeY-Q5bRMm_HgSRtolIg0HuiFx4wm0C7f1wY6jVbmE5cRukfoZSXKfh4TW31oOr2rS25gRoXGcH_UzsRxYUKGQRIWRjsQPemPt8zWZGR9',
    category: 'Materia Medica'
  },
  {
    title: 'Pocket Manual of Materia Medica',
    author: 'Boericke',
    description: 'The quintessential reference guide for clinical practice and remedy selection.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnBja93wuIhcVnrxwRwCHVBl7trG1FRO-eBmLGDoM3FiHx3qr0KZmbW3A7o3ykKCCajvX6PUs3pE720pPfmC8HBnohNOArWxUCk7yuBCKSU00Vpysup4jvBsv7OBHUYNi-VnBZpoUbo3XkB8AgoGlA99dIRiva3a6tDoevcZR4FYJtrFeSVj0EYJyMZLGlkgiy-D1uZ7qRw-WZsB7A5xkwm6v7CLqxFNQQlofmSvd1GaDfHa3_EIUVAyci3cbnlCqtwxoSa8JeGWdz',
    category: 'Clinical'
  }
];

export const KNOWLEDGE_CATEGORIES: KnowledgeCategory[] = [
  {
    title: 'Modern Journals',
    description: 'Peer-reviewed studies and clinical cases from 2020-2024.',
    icon: 'menu_book',
    count: '1,240 Articles',
    color: 'bg-[#c8e5ea]',
    span: 'md:col-span-2 md:row-span-2'
  },
  {
    title: 'Clinical Protocols',
    description: 'Standardized treatment frameworks',
    icon: 'assignment_turned_in',
    color: 'bg-[#98f994]',
    span: 'md:col-span-2'
  },
  {
    title: 'Pharmacology',
    description: 'Drug action and preparation',
    icon: 'biotech',
    color: 'bg-slate-100'
  },
  {
    title: 'Archival Notes',
    description: 'Historical clinical observations',
    icon: 'history_edu',
    color: 'bg-slate-100'
  }
];

export const RECENT_ARTICLES: KnowledgeArticle[] = [
  {
    title: 'Homeopathic Treatment of Chronic Migraine: A Multi-Center Study',
    author: 'Dr. Elena Rossi',
    date: 'Oct 12, 2023',
    type: 'Research',
    isPeerReviewed: true
  },
  {
    title: 'Potency Selection and Miasmatic Analysis in Pediatric Cases',
    author: 'Prof. Marcus Thorne',
    date: 'Sep 28, 2023',
    type: 'Case Study',
    isPeerReviewed: false
  },
  {
    title: 'Standardized Protocol for Post-Viral Fatigue Syndrome',
    author: 'Dr. Sarah Jenkins',
    date: 'Sep 15, 2023',
    type: 'Protocol',
    isPeerReviewed: true
  },
  {
    title: 'Evidence-Based Homeopathy in Rheumatoid Arthritis',
    author: 'Dr. Robert Miller',
    date: 'Jan 05, 2024',
    type: 'Research',
    isPeerReviewed: true
  },
  {
    title: 'Management of Pediatric ADHD with Individualized Homeopathy',
    author: 'Dr. Linda Chen',
    date: 'Feb 12, 2024',
    type: 'Case Study',
    isPeerReviewed: true
  }
];

export interface AnatomySystem {
  id: string;
  name: string;
  banglaName: string;
  description: string;
  banglaDescription: string;
  image: string;
  details: string[];
  banglaDetails: string[];
}

export const PHYSIOLOGY_ANATOMY_DATA: AnatomySystem[] = [
  {
    id: 'skeletal',
    name: 'Skeletal System',
    banglaName: 'কঙ্কালতন্ত্র',
    description: 'The framework of the body, consisting of bones and other connective tissues.',
    banglaDescription: 'শরীরের কাঠামো, যা হাড় এবং অন্যান্য সংযোজক কলা নিয়ে গঠিত।',
    image: 'https://images.unsplash.com/photo-1530213786676-41ad9f7736f6?auto=format&fit=crop&q=80&w=2070',
    details: [
      'Provides support and protection for internal organs.',
      'Enables movement through attachment of muscles.',
      'Produces blood cells in the bone marrow.',
      'Stores minerals like calcium and phosphorus.'
    ],
    banglaDetails: [
      'অভ্যন্তরীণ অঙ্গগুলির সহায়তা এবং সুরক্ষা প্রদান করে।',
      'পেশী সংযুক্তির মাধ্যমে চলাচলে সক্ষম করে।',
      'অস্থিমজ্জায় রক্তকণিকা তৈরি করে।',
      'ক্যালসিয়াম এবং ফসফরাসের মতো খনিজ জমা রাখে।'
    ]
  },
  {
    id: 'muscular',
    name: 'Muscular System',
    banglaName: 'পেশীতন্ত্র',
    description: 'Responsible for the movement of the human body.',
    banglaDescription: 'মানবদেহের চলাচলের জন্য দায়ী।',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=2071',
    details: [
      'Skeletal muscles move the bones.',
      'Smooth muscles control internal organ functions.',
      'Cardiac muscle pumps blood through the heart.',
      'Maintains posture and produces body heat.'
    ],
    banglaDetails: [
      'কঙ্কাল পেশী হাড় নাড়াচাড়া করে।',
      'মসৃণ পেশী অভ্যন্তরীণ অঙ্গের কাজ নিয়ন্ত্রণ করে।',
      'হৃদপেশী হৃদপিণ্ডের মাধ্যমে রক্ত পাম্প করে।',
      'ভঙ্গি বজায় রাখে এবং শরীরের তাপ উৎপন্ন করে।'
    ]
  },
  {
    id: 'nervous_system',
    name: 'Nervous System',
    banglaName: 'স্নায়ুতন্ত্র',
    description: 'The network of nerve cells and fibers that transmits nerve impulses between parts of the body.',
    banglaDescription: 'স্নায়ু কোষ এবং তন্তুর নেটওয়ার্ক যা শরীরের অংশগুলির মধ্যে স্নায়ু আবেগ প্রেরণ করে।',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80&w=2070',
    details: [
      'Central Nervous System (CNS): Brain and spinal cord.',
      'Peripheral Nervous System (PNS): Nerves connecting CNS to limbs.',
      'Controls voluntary and involuntary actions.',
      'Processes sensory information.'
    ],
    banglaDetails: [
      'কেন্দ্রীয় স্নায়ুতন্ত্র (CNS): মস্তিষ্ক এবং মেরুদণ্ড।',
      'প্রান্তীয় স্নায়ুতন্ত্র (PNS): স্নায়ু যা CNS-কে অঙ্গপ্রত্যঙ্গের সাথে সংযুক্ত করে।',
      'স্বেচ্ছায় এবং অনিচ্ছাকৃত কাজগুলি নিয়ন্ত্রণ করে।',
      'সংবেদনশীল তথ্য প্রক্রিয়া করে।'
    ]
  },
  {
    id: 'circulatory',
    name: 'Circulatory System',
    banglaName: 'রক্তসংবহনতন্ত্র',
    description: 'Circulates blood and transports nutrients, oxygen, and hormones to cells.',
    banglaDescription: 'রক্ত সঞ্চালন করে এবং পুষ্টি, অক্সিজেন এবং হরমোন কোষে পরিবহন করে।',
    image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=2070',
    details: [
      'Heart acts as a pump.',
      'Arteries carry oxygenated blood away from the heart.',
      'Veins carry deoxygenated blood back to the heart.',
      'Capillaries facilitate exchange of gases and nutrients.'
    ],
    banglaDetails: [
      'হৃদপিণ্ড পাম্প হিসেবে কাজ করে।',
      'ধমনী হৃদপিণ্ড থেকে অক্সিজেনযুক্ত রক্ত বহন করে।',
      'শিরা অক্সিজেনহীন রক্ত হৃদপিণ্ডে ফিরিয়ে আনে।',
      'কৈশিক নালী গ্যাস এবং পুষ্টির বিনিময়ে সহায়তা করে।'
    ]
  },
  {
    id: 'respiratory_system',
    name: 'Respiratory System',
    banglaName: 'শ্বসনতন্ত্র',
    description: 'A series of organs responsible for taking in oxygen and expelling carbon dioxide.',
    banglaDescription: 'অক্সিজেন গ্রহণ এবং কার্বন ডাই অক্সাইড ত্যাগের জন্য দায়ী অঙ্গগুলির একটি সিরিজ।',
    image: 'https://images.unsplash.com/photo-1559757117-574196d2d752?auto=format&fit=crop&q=80&w=2070',
    details: [
      'Lungs are the primary organs for gas exchange.',
      'Diaphragm helps in breathing process.',
      'Trachea (windpipe) filters and transports air.',
      'Alveoli are where oxygen enters the blood.'
    ],
    banglaDetails: [
      'ফুসফুস গ্যাস বিনিময়ের প্রাথমিক অঙ্গ।',
      'মধ্যচ্ছদা শ্বাস-প্রশ্বাসের প্রক্রিয়ায় সাহায্য করে।',
      'শ্বাসনালী বাতাস ফিল্টার এবং পরিবহন করে।',
      'অ্যালভিওলাইতে অক্সিজেন রক্তে প্রবেশ করে।'
    ]
  },
  {
    id: 'digestive_system',
    name: 'Digestive System',
    banglaName: 'পরিপাকতন্ত্র',
    description: 'Breaks down food into nutrients that the body can absorb.',
    banglaDescription: 'খাবারকে পুষ্টিতে ভেঙে দেয় যা শরীর শোষণ করতে পারে।',
    image: 'https://images.unsplash.com/photo-1559757175-013fe5899ef8?auto=format&fit=crop&q=80&w=2070',
    details: [
      'Mouth starts mechanical and chemical digestion.',
      'Stomach uses acid to break down food.',
      'Small intestine absorbs most nutrients.',
      'Large intestine absorbs water and forms waste.'
    ],
    banglaDetails: [
      'মুখ যান্ত্রিক এবং রাসায়নিক হজম শুরু করে।',
      'পাকস্থলী খাবার ভাঙতে অ্যাসিড ব্যবহার করে।',
      'ক্ষুদ্রান্ত্র বেশিরভাগ পুষ্টি শোষণ করে।',
      'বৃহদান্ত্র জল শোষণ করে এবং বর্জ্য তৈরি করে।'
    ]
  },
  {
    id: 'endocrine',
    name: 'Endocrine System',
    banglaName: 'অন্তঃক্ষরা গ্রন্থিতন্ত্র',
    description: 'The collection of glands that produce hormones that regulate metabolism, growth and development.',
    banglaDescription: 'গ্রন্থিগুলির সংগ্রহ যা হরমোন তৈরি করে যা বিপাক, বৃদ্ধি এবং বিকাশ নিয়ন্ত্রণ করে।',
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=2070',
    details: [
      'Pituitary gland: The master gland.',
      'Thyroid gland: Regulates metabolism.',
      'Adrenal glands: Produce adrenaline.',
      'Pancreas: Regulates blood sugar.'
    ],
    banglaDetails: [
      'পিটুইটারি গ্রন্থি: প্রধান গ্রন্থি।',
      'থাইরয়েড গ্রন্থি: বিপাক নিয়ন্ত্রণ করে।',
      'অ্যাড্রিনাল গ্রন্থি: অ্যাড্রেনালিন তৈরি করে।',
      'অগ্ন্যাশয়: রক্তে শর্করা নিয়ন্ত্রণ করে।'
    ]
  },
  {
    id: 'reproductive',
    name: 'Reproductive System',
    banglaName: 'প্রজননতন্ত্র',
    description: 'The system of organs within an organism which work together for the purpose of reproduction.',
    banglaDescription: 'একটি জীবের মধ্যে অঙ্গগুলির সিস্টেম যা প্রজননের উদ্দেশ্যে একসাথে কাজ করে।',
    image: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&q=80&w=2070',
    details: [
      'Male: Testes, prostate, and penis.',
      'Female: Ovaries, fallopian tubes, and uterus.',
      'Responsible for producing gametes.',
      'Supports fetal development in females.'
    ],
    banglaDetails: [
      'পুরুষ: অণ্ডকোষ, প্রোস্টেট এবং লিঙ্গ।',
      'মহিলা: ডিম্বাশয়, ফ্যালোপিয়ান টিউব এবং জরায়ু।',
      'গ্যামেট তৈরির জন্য দায়ী।',
      'মহিলাদের মধ্যে ভ্রূণের বিকাশ সমর্থন করে।'
    ]
  }
];
