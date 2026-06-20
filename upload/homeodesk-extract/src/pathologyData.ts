export interface DiagnosticIndicator {
  label: string;
  value: string;
}

export interface HomeopathicRemedy {
  name: string;
  potency: string;
  description: string;
  miasm: string;
  keySymptoms: string[];
}

export interface PathologyCondition {
  id: string;
  name: string;
  banglaName: string;
  icd10: string;
  description: string;
  banglaDescription: string;
  system: string;
  diagnosticIndicators: DiagnosticIndicator[];
  visualContext: {
    image: string;
    description: string;
  };
  homeopathicRemedies: HomeopathicRemedy[];
}

export interface PathologySystem {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export const PATHOLOGY_SYSTEMS: PathologySystem[] = [
  { id: 'respiratory', name: 'Respiratory', icon: 'pulmonology', count: 12 },
  { id: 'gastrointestinal', name: 'Gastrointestinal', icon: 'gastroenterology', count: 8 },
  { id: 'cardiology', name: 'Cardiology', icon: 'cardiology', count: 5 },
  { id: 'dermatology', name: 'Dermatology', icon: 'dermatology', count: 14 },
  { id: 'nervous', name: 'Nervous System', icon: 'neurology', count: 6 },
  { id: 'urinary', name: 'Urinary System', icon: 'nephrology', count: 4 },
];

export const PATHOLOGY_CONDITIONS: PathologyCondition[] = [
  {
    id: 'acute-bronchitis',
    name: 'Acute Bronchitis',
    banglaName: 'তীব্র ব্রঙ্কাইটিস',
    icd10: 'J20.9',
    system: 'respiratory',
    description: 'Inflammation of the bronchial tubes, often following a viral upper respiratory infection.',
    banglaDescription: 'এটি শ্বাসনালীর প্রদাহ, সাধারণত ভাইরাসজনিত সংক্রমণের ফলে হয়।',
    diagnosticIndicators: [
      { label: 'Cough Profile', value: 'Dry, hacking initially; progressing to productive with yellow/green phlegm.' },
      { label: 'Physical Signs', value: 'Chest tightness, wheezing, mild fever, and soreness in the sternal region.' },
      { label: 'Auscultation', value: 'Coarse crackles or rhonchi that clear or change with coughing.' },
      { label: 'Duration', value: 'Typically resolves in 10-21 days. Persistence suggests underlying issues.' },
    ],
    visualContext: {
      image: 'https://images.unsplash.com/photo-1559757117-574196d2d752?auto=format&fit=crop&q=80&w=2070',
      description: 'Cross-section showing mucosal thickening and inflammatory exudate in the primary bronchi.'
    },
    homeopathicRemedies: [
      {
        name: 'Bryonia Alba',
        potency: '200C / 1M',
        description: 'Hard, dry cough; worse from any movement. Patient holds chest while coughing. Extreme thirst for large quantities.',
        miasm: 'Psoric',
        keySymptoms: ['Worse from movement', 'Thirst for large quantities']
      },
      {
        name: 'Antimonium Tart.',
        potency: '30C / 200C',
        description: 'Great rattling of mucus but very little is expectorated. Drowsiness, debility and sweat.',
        miasm: 'Sycotic',
        keySymptoms: ['Rattling of mucus', 'Drowsiness']
      },
      {
        name: 'Ipecacuanha',
        potency: '30C',
        description: 'Spasmodic cough with nausea and vomiting. Chest seems full of phlegm but does not yield to coughing.',
        miasm: 'Psoric',
        keySymptoms: ['Nausea', 'Spasmodic cough']
      }
    ]
  },
  {
    id: 'pneumonia',
    name: 'Pneumonia',
    banglaName: 'নিউমোনিয়া',
    icd10: 'J18.9',
    system: 'respiratory',
    description: 'Infection that inflames the air sacs in one or both lungs, which may fill with fluid or pus.',
    banglaDescription: 'ফুসফুসের এক বা উভয় ফুসফুসের বায়ু থলিতে সংক্রমণ যা পুঁজ বা তরল দিয়ে পূর্ণ হতে পারে।',
    diagnosticIndicators: [
      { label: 'Fever', value: 'High grade fever with chills and rigors.' },
      { label: 'Cough', value: 'Productive cough with rusty or blood-stained sputum.' },
      { label: 'Chest Pain', value: 'Pleuritic chest pain that worsens with deep breathing or coughing.' },
      { label: 'Oxygen Saturation', value: 'May show decreased SpO2 levels (hypoxia).' },
    ],
    visualContext: {
      image: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&q=80&w=2070',
      description: 'Chest X-ray showing consolidation in the lower lobe of the right lung.'
    },
    homeopathicRemedies: [
      {
        name: 'Phosphorus',
        potency: '200C',
        description: 'Tightness in chest; worse lying on left side. Sensation of weight on chest.',
        miasm: 'Tubercular',
        keySymptoms: ['Worse lying on left side', 'Craving for cold drinks']
      },
      {
        name: 'Chelidonium',
        potency: '30C',
        description: 'Right-sided pneumonia with liver complications. Pain under right scapula.',
        miasm: 'Psoric',
        keySymptoms: ['Right-sided', 'Pain under right scapula']
      }
    ]
  },
  {
    id: 'hypertension',
    name: 'Hypertension',
    banglaName: 'উচ্চ রক্তচাপ',
    icd10: 'I10',
    system: 'cardiology',
    description: 'A condition in which the force of the blood against the artery walls is too high.',
    banglaDescription: 'এমন একটি অবস্থা যেখানে ধমনীর দেয়ালের বিরুদ্ধে রক্তের চাপ খুব বেশি থাকে।',
    diagnosticIndicators: [
      { label: 'BP Reading', value: 'Systolic > 140 mmHg and/or Diastolic > 90 mmHg consistently.' },
      { label: 'Symptoms', value: 'Often asymptomatic; may cause headaches, dizziness, or blurred vision.' },
      { label: 'Risk Factors', value: 'Obesity, high salt intake, lack of exercise, and stress.' },
      { label: 'Complications', value: 'Heart attack, stroke, and kidney disease.' },
    ],
    visualContext: {
      image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=2070',
      description: 'Diagram showing increased pressure within the arterial system.'
    },
    homeopathicRemedies: [
      {
        name: 'Glonoinum',
        potency: '30C',
        description: 'Congestive headaches with bursting sensation. Face red and hot.',
        miasm: 'Psoric',
        keySymptoms: ['Bursting headache', 'Red face']
      },
      {
        name: 'Rauwolfia Serp.',
        potency: 'Q (Mother Tincture)',
        description: 'Specific for lowering blood pressure. Calms the nervous system.',
        miasm: 'Psoric',
        keySymptoms: ['High BP', 'Insomnia']
      }
    ]
  },
  {
    id: 'gastritis',
    name: 'Gastritis',
    banglaName: 'গ্যাস্ট্রাইটিস',
    icd10: 'K29.7',
    system: 'gastrointestinal',
    description: 'Inflammation, irritation, or erosion of the lining of the stomach.',
    banglaDescription: 'পাকস্থলীর আস্তরণের প্রদাহ, জ্বালা বা ক্ষয়।',
    diagnosticIndicators: [
      { label: 'Pain Type', value: 'Gnawing or burning ache or pain (indigestion) in your upper abdomen.' },
      { label: 'Associated Symptoms', value: 'Nausea, vomiting, and a feeling of fullness in your upper abdomen after eating.' },
      { label: 'Physical Signs', value: 'Tenderness in the epigastric region upon palpation.' },
      { label: 'Complications', value: 'If left untreated, can lead to ulcers and stomach cancer.' },
    ],
    visualContext: {
      image: 'https://images.unsplash.com/photo-1559757175-013fe5899ef8?auto=format&fit=crop&q=80&w=2070',
      description: 'Endoscopic view showing erythema and erosion of the gastric mucosa.'
    },
    homeopathicRemedies: [
      {
        name: 'Nux Vomica',
        potency: '30C / 200C',
        description: 'Weight and pain in stomach; worse after eating. Sour taste and nausea in the morning.',
        miasm: 'Psoric',
        keySymptoms: ['Worse after eating', 'Sedentary habits']
      },
      {
        name: 'Arsenicum Album',
        potency: '30C / 200C',
        description: 'Burning pain in stomach; better by warm drinks. Intense thirst for small sips of cold water.',
        miasm: 'Psoric',
        keySymptoms: ['Burning pain', 'Thirst for small sips']
      },
      {
        name: 'Pulsatilla',
        potency: '30C',
        description: 'Aversion to fatty foods. Flatulence and heartburn. Thirstlessness with all complaints.',
        miasm: 'Psoric',
        keySymptoms: ['Thirstlessness', 'Aversion to fat']
      }
    ]
  },
  {
    id: 'peptic-ulcer',
    name: 'Peptic Ulcer',
    banglaName: 'পেপটিক আলসার',
    icd10: 'K27',
    system: 'gastrointestinal',
    description: 'Sores that develop on the lining of the stomach, lower esophagus, or small intestine.',
    banglaDescription: 'পাকস্থলী, নিম্ন খাদ্যনালী বা ক্ষুদ্রান্ত্রের আস্তরণে তৈরি হওয়া ক্ষত।',
    diagnosticIndicators: [
      { label: 'Pain Pattern', value: 'Burning stomach pain, often worse when stomach is empty.' },
      { label: 'Relief', value: 'Pain may be temporarily relieved by eating certain foods or taking antacids.' },
      { label: 'Severe Signs', value: 'Vomiting blood or dark, tarry stools (melena).' },
      { label: 'Causes', value: 'H. pylori infection or long-term use of NSAIDs.' },
    ],
    visualContext: {
      image: 'https://images.unsplash.com/photo-1559757175-013fe5899ef8?auto=format&fit=crop&q=80&w=2070',
      description: 'Illustration of a gastric ulcer showing a clear break in the mucosal lining.'
    },
    homeopathicRemedies: [
      {
        name: 'Argentum Nit.',
        potency: '200C',
        description: 'Great flatulence; painful swelling at pit of stomach. Desire for sweets.',
        miasm: 'Sycotic',
        keySymptoms: ['Desire for sweets', 'Belching']
      },
      {
        name: 'Kali Bich.',
        potency: '30C',
        description: 'Ulcer with "punched-out" appearance. Pain in small spots.',
        miasm: 'Syphilitic',
        keySymptoms: ['Punched-out ulcers', 'Pain in small spots']
      }
    ]
  },
  {
    id: 'psoriasis',
    name: 'Psoriasis',
    banglaName: 'সোরিয়াসিস',
    icd10: 'L40.9',
    system: 'dermatology',
    description: 'A condition in which skin cells build up and form scales and itchy, dry patches.',
    banglaDescription: 'এমন একটি অবস্থা যেখানে ত্বকের কোষগুলি তৈরি হয় এবং আঁশযুক্ত এবং চুলকানিযুক্ত, শুষ্ক তালি তৈরি করে।',
    diagnosticIndicators: [
      { label: 'Skin Appearance', value: 'Red patches of skin covered with thick, silvery scales.' },
      { label: 'Sensation', value: 'Itching, burning or soreness. Dry, cracked skin that may bleed.' },
      { label: 'Common Sites', value: 'Elbows, knees, scalp, back and buttocks.' },
      { label: 'Triggers', value: 'Stress, cold weather, infections and certain medications.' },
    ],
    visualContext: {
      image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=2071',
      description: 'Clinical presentation of plaque psoriasis showing well-demarcated erythematous plaques with silvery scales.'
    },
    homeopathicRemedies: [
      {
        name: 'Graphites',
        potency: '30C / 200C',
        description: 'Rough, hard, persistent dryness of skin. Eruptions oozing a sticky, honey-like fluid.',
        miasm: 'Psoric',
        keySymptoms: ['Sticky discharge', 'Rough skin']
      },
      {
        name: 'Arsenicum Iod.',
        potency: '3x / 6x',
        description: 'Dry, scaly, itching skin. Large scales leave a raw surface when removed.',
        miasm: 'Psoric',
        keySymptoms: ['Large scales', 'Itching']
      },
      {
        name: 'Sulphur',
        potency: '200C',
        description: 'Burning and itching; worse from heat of bed. Skin dry, scaly and unhealthy.',
        miasm: 'Psoric',
        keySymptoms: ['Worse from heat of bed', 'Burning']
      }
    ]
  },
  {
    id: 'eczema',
    name: 'Eczema (Dermatitis)',
    banglaName: 'একজিমা',
    icd10: 'L30.9',
    system: 'dermatology',
    description: 'A condition that makes your skin red and itchy.',
    banglaDescription: 'এমন একটি অবস্থা যা আপনার ত্বককে লাল এবং চুলকানিযুক্ত করে তোলে।',
    diagnosticIndicators: [
      { label: 'Symptoms', value: 'Dry skin, itching (which may be severe, especially at night).' },
      { label: 'Appearance', value: 'Red to brownish-gray patches, small raised bumps which may leak fluid.' },
      { label: 'Common Sites', value: 'Hands, feet, ankles, wrists, neck, upper chest, eyelids.' },
      { label: 'Triggers', value: 'Soaps, detergents, stress, and allergens.' },
    ],
    visualContext: {
      image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=2071',
      description: 'Erythematous, scaly patches on the flexural surfaces of the skin.'
    },
    homeopathicRemedies: [
      {
        name: 'Mezereum',
        potency: '30C',
        description: 'Intolerable itching; worse from warmth of bed. Eruptions with thick crusts.',
        miasm: 'Psoric',
        keySymptoms: ['Thick crusts', 'Worse from warmth']
      },
      {
        name: 'Petroleum',
        potency: '30C',
        description: 'Skin dry, constricted, very sensitive, rough and cracked. Worse in winter.',
        miasm: 'Psoric',
        keySymptoms: ['Cracked skin', 'Worse in winter']
      }
    ]
  },
  {
    id: 'angina-pectoris',
    name: 'Angina Pectoris',
    banglaName: 'এনজাইনা পেক্টোরিস',
    icd10: 'I20.9',
    system: 'cardiology',
    description: 'A type of chest pain caused by reduced blood flow to the heart.',
    banglaDescription: 'হৃদপিণ্ডে রক্ত প্রবাহ কমে যাওয়ার কারণে এক ধরণের বুকে ব্যথা।',
    diagnosticIndicators: [
      { label: 'Pain Character', value: 'Squeezing, pressure, heaviness, tightness or pain in the chest.' },
      { label: 'Location', value: 'Often felt behind the breastbone; may radiate to arms, neck, jaw, or back.' },
      { label: 'Triggers', value: 'Physical exertion, emotional stress, heavy meals, or cold weather.' },
      { label: 'Relief', value: 'Usually relieved by rest or nitroglycerin.' },
    ],
    visualContext: {
      image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=2070',
      description: 'Illustration showing myocardial ischemia due to narrowed coronary arteries.'
    },
    homeopathicRemedies: [
      {
        name: 'Cactus Grand.',
        potency: '30C / 200C',
        description: 'Sensation as if an iron band is constricting the heart. Palpitations.',
        miasm: 'Psoric',
        keySymptoms: ['Iron band sensation', 'Palpitations']
      },
      {
        name: 'Latrodectus Mac.',
        potency: '30C',
        description: 'Violent precordial pain extending to the left arm. Numbness of left arm.',
        miasm: 'Syphilitic',
        keySymptoms: ['Pain radiating to left arm', 'Numbness']
      }
    ]
  },
  {
    id: 'migraine',
    name: 'Migraine',
    banglaName: 'মাইগ্রেন',
    icd10: 'G43.9',
    system: 'nervous',
    description: 'A neurological condition that can cause multiple symptoms, most notably a throbbing headache.',
    banglaDescription: 'একটি স্নায়বিক অবস্থা যা একাধিক লক্ষণের কারণ হতে পারে, বিশেষ করে একটি স্পন্দিত মাথাব্যথা।',
    diagnosticIndicators: [
      { label: 'Headache Type', value: 'Pulsating or throbbing pain, usually on one side of the head.' },
      { label: 'Sensitivity', value: 'Extreme sensitivity to light (photophobia) and sound (phonophobia).' },
      { label: 'Aura', value: 'Visual disturbances like flashes of light or blind spots before the headache starts.' },
      { label: 'Duration', value: 'Can last for hours to days, often accompanied by nausea and vomiting.' },
    ],
    visualContext: {
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80&w=2070',
      description: 'Diagram showing the cortical spreading depression associated with migraine aura.'
    },
    homeopathicRemedies: [
      {
        name: 'Belladonna',
        potency: '30C / 200C',
        description: 'Sudden onset; throbbing pain. Red face and hot skin. Worse from light and noise.',
        miasm: 'Psoric',
        keySymptoms: ['Sudden onset', 'Throbbing pain']
      },
      {
        name: 'Sanguinaria Can.',
        potency: '30C',
        description: 'Right-sided migraine. Pain starts in the back of the head and settles over the right eye.',
        miasm: 'Psoric',
        keySymptoms: ['Right-sided', 'Sun headache']
      },
      {
        name: 'Spigelia',
        potency: '30C',
        description: 'Left-sided migraine. Pain settles over the left eye. Sensation as if needles are piercing the eye.',
        miasm: 'Psoric',
        keySymptoms: ['Left-sided', 'Neuralgic pain']
      }
    ]
  },
  {
    id: 'uti',
    name: 'Urinary Tract Infection (UTI)',
    banglaName: 'মূত্রনালীর সংক্রমণ',
    icd10: 'N39.0',
    system: 'urinary',
    description: 'An infection in any part of the urinary system, the kidneys, bladder, or urethra.',
    banglaDescription: 'মূত্রতন্ত্রের যেকোনো অংশে সংক্রমণ, যেমন কিডনি, মূত্রথলি বা মূত্রনালী।',
    diagnosticIndicators: [
      { label: 'Urination', value: 'Strong, persistent urge to urinate; burning sensation when urinating.' },
      { label: 'Urine Appearance', value: 'Cloudy, red, bright pink or cola-colored urine (sign of blood).' },
      { label: 'Pain', value: 'Pelvic pain, especially in the center of the pelvis and around the area of the pubic bone.' },
      { label: 'Smell', value: 'Strong-smelling urine.' },
    ],
    visualContext: {
      image: 'https://images.unsplash.com/photo-1559757175-013fe5899ef8?auto=format&fit=crop&q=80&w=2070',
      description: 'Microscopic view showing bacteria (e.g., E. coli) and white blood cells in the urine.'
    },
    homeopathicRemedies: [
      {
        name: 'Cantharis',
        potency: '30C / 200C',
        description: 'Intense burning and cutting pain during and after urination. Constant urge to urinate.',
        miasm: 'Sycotic',
        keySymptoms: ['Burning pain', 'Constant urge']
      },
      {
        name: 'Sarsaparilla',
        potency: '30C',
        description: 'Severe pain at the conclusion of urination. Urine passes in a thin stream.',
        miasm: 'Sycotic',
        keySymptoms: ['Pain at end of urination', 'Thin stream']
      },
      {
        name: 'Apis Mellifica',
        potency: '30C',
        description: 'Stinging pain; worse from heat. Scanty, high-colored urine.',
        miasm: 'Psoric',
        keySymptoms: ['Stinging pain', 'Thirstlessness']
      }
    ]
  },
  {
    id: 'asthma',
    name: 'Bronchial Asthma',
    banglaName: 'ব্রঙ্কিয়াল হাঁপানি',
    icd10: 'J45.9',
    system: 'respiratory',
    description: 'A condition in which your airways narrow and swell and may produce extra mucus.',
    banglaDescription: 'এমন একটি অবস্থা যেখানে আপনার শ্বাসনালী সংকুচিত হয় এবং ফুলে যায় এবং অতিরিক্ত শ্লেষ্মা তৈরি করতে পারে।',
    diagnosticIndicators: [
      { label: 'Symptoms', value: 'Shortness of breath, chest tightness or pain, wheezing when exhaling.' },
      { label: 'Triggers', value: 'Airborne allergens, physical activity, cold air, air pollutants and irritants.' },
      { label: 'Physical Signs', value: 'Use of accessory muscles for breathing, prolonged expiratory phase.' },
      { label: 'Peak Flow', value: 'Reduced peak expiratory flow rate (PEFR).' },
    ],
    visualContext: {
      image: 'https://images.unsplash.com/photo-1559757117-574196d2d752?auto=format&fit=crop&q=80&w=2070',
      description: 'Illustration showing bronchoconstriction and mucus plugging in the airways.'
    },
    homeopathicRemedies: [
      {
        name: 'Arsenicum Album',
        potency: '30C / 200C',
        description: 'Worse at midnight; must sit up to breathe. Great anxiety and restlessness.',
        miasm: 'Psoric',
        keySymptoms: ['Worse at midnight', 'Restlessness']
      },
      {
        name: 'Blatta Orientalis',
        potency: 'Q / 30C',
        description: 'Specific for asthma with much cough and dyspnoea. Worse in rainy weather.',
        miasm: 'Psoric',
        keySymptoms: ['Rainy weather aggravation', 'Dyspnoea']
      }
    ]
  },
  {
    id: 'ibs',
    name: 'Irritable Bowel Syndrome (IBS)',
    banglaName: 'ইরিটেবল বাওয়েল সিনড্রোম (আইবিএস)',
    icd10: 'K58.9',
    system: 'gastrointestinal',
    description: 'A common disorder that affects the large intestine.',
    banglaDescription: 'একটি সাধারণ ব্যাধি যা বৃহদান্ত্রকে প্রভাবিত করে।',
    diagnosticIndicators: [
      { label: 'Pain', value: 'Abdominal pain, cramping or bloating that is typically relieved or partially relieved by passing a bowel movement.' },
      { label: 'Bowel Habits', value: 'Excess gas, diarrhea or constipation — sometimes alternating bouts of both.' },
      { label: 'Stool Appearance', value: 'Mucus in the stool.' },
      { label: 'Triggers', value: 'Food, stress and hormones.' },
    ],
    visualContext: {
      image: 'https://images.unsplash.com/photo-1559757175-013fe5899ef8?auto=format&fit=crop&q=80&w=2070',
      description: 'Diagram showing the hypersensitivity of the gut-brain axis in IBS.'
    },
    homeopathicRemedies: [
      {
        name: 'Lycopodium',
        potency: '30C / 200C',
        description: 'Bloating and gas; worse from 4 PM to 8 PM. Desire for warm drinks.',
        miasm: 'Psoric',
        keySymptoms: ['4-8 PM aggravation', 'Desire for sweets']
      },
      {
        name: 'Argentum Nit.',
        potency: '30C',
        description: 'Diarrhea from anticipation or anxiety. Great flatulence.',
        miasm: 'Sycotic',
        keySymptoms: ['Anticipatory anxiety', 'Greenish stools']
      }
    ]
  },
  {
    id: 'acne',
    name: 'Acne Vulgaris',
    banglaName: 'ব্রণ',
    icd10: 'L70.0',
    system: 'dermatology',
    description: 'A skin condition that occurs when your hair follicles become plugged with oil and dead skin cells.',
    banglaDescription: 'একটি ত্বকের অবস্থা যা ঘটে যখন আপনার চুলের ফলিকলগুলি তেল এবং মৃত ত্বকের কোষ দিয়ে আটকে যায়।',
    diagnosticIndicators: [
      { label: 'Lesions', value: 'Whiteheads, blackheads, small red, tender bumps (papules), pimples (pustules).' },
      { label: 'Location', value: 'Face, forehead, chest, upper back and shoulders.' },
      { label: 'Causes', value: 'Excess oil production, hair follicles clogged by oil and dead skin cells, bacteria, inflammation.' },
      { label: 'Triggers', value: 'Hormonal changes, certain medications, diet, and stress.' },
    ],
    visualContext: {
      image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=2071',
      description: 'Clinical image showing inflammatory papules and pustules on the facial skin.'
    },
    homeopathicRemedies: [
      {
        name: 'Kali Bromatum',
        potency: '30C',
        description: 'Acne on face, shoulders, and chest. Itching; worse at night.',
        miasm: 'Sycotic',
        keySymptoms: ['Pustular acne', 'Itching']
      },
      {
        name: 'Asterias Rubens',
        potency: '30C',
        description: 'Acne at puberty. Redness of face.',
        miasm: 'Psoric',
        keySymptoms: ['Puberty acne', 'Red face']
      },
      {
        name: 'Berberis Aqui.',
        potency: 'Q (Mother Tincture)',
        description: 'Clears the complexion. Specific for acne scars.',
        miasm: 'Psoric',
        keySymptoms: ['Acne scars', 'Rough skin']
      }
    ]
  }
];
