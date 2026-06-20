export interface PathologyCondition {
  id: string;
  name: string;
  systemId: string;
  description: string;
  symptoms: string[];
  homeopathicRemedies: { name: string; indication: string }[];
  investigations?: string[];
  prognosis?: string;
}

export interface PathologySystem {
  id: string;
  name: string;
  description: string;
  icon?: string;
  conditions: PathologyCondition[];
}

export const PATHOLOGY_SYSTEMS: PathologySystem[] = [
  {
    id: 'ps-1',
    name: 'Respiratory System',
    description: 'Diseases of the respiratory tract including upper and lower airways',
    icon: 'Lungs',
    conditions: [
      {
        id: 'pc-1',
        name: 'Asthma',
        systemId: 'ps-1',
        description: 'Chronic inflammatory disease of the airways causing reversible airflow obstruction.',
        symptoms: ['Wheezing', 'Shortness of breath', 'Chest tightness', 'Cough, especially at night'],
        homeopathicRemedies: [
          { name: 'Arsenicum Album', indication: 'Worse midnight, anxious, cold sweat, attacks after midnight' },
          { name: 'Ipecac', indication: 'Persistent nausea with cough, rattling in chest but unable to expectorate' },
          { name: 'Spongia', indication: 'Dry barking cough, wheezing, worse before midnight, dry mucous membranes' },
          { name: 'Natrum Sulph', indication: 'Asthma from damp weather, morning attacks, loose cough' },
          { name: 'Blatta Orientalis', indication: 'Bronchial asthma, especially in children' },
        ],
        investigations: ['Pulmonary function tests', 'Chest X-ray', 'Allergy testing'],
        prognosis: 'Chronic condition requiring long-term management. Homeopathic treatment can reduce frequency and severity.',
      },
      {
        id: 'pc-2',
        name: 'Bronchitis',
        systemId: 'ps-1',
        description: 'Inflammation of the lining of bronchial tubes that carry air to and from lungs.',
        symptoms: ['Cough with mucus', 'Fatigue', 'Shortness of breath', 'Fever and chills', 'Chest discomfort'],
        homeopathicRemedies: [
          { name: 'Bryonia', indication: 'Dry hacking cough, worse movement, thirsty, chest pain' },
          { name: 'Antim Tart', indication: 'Rattling in chest with difficulty expectorating, worse lying down' },
          { name: 'Phosphorus', indication: 'Loose cough, worse cold air, burning in chest, craving cold water' },
          { name: 'Kali Bich', indication: 'Thick stringy yellow-green expectoration, post-nasal drip' },
        ],
        investigations: ['Chest X-ray', 'Sputum culture', 'Pulmonary function tests'],
        prognosis: 'Acute bronchitis usually resolves within 2-3 weeks. Chronic requires ongoing management.',
      },
    ],
  },
  {
    id: 'ps-2',
    name: 'Digestive System',
    description: 'Diseases of the gastrointestinal tract from mouth to anus',
    icon: 'Stomach',
    conditions: [
      {
        id: 'pc-3',
        name: 'Gastritis',
        systemId: 'ps-2',
        description: 'Inflammation of the stomach lining.',
        symptoms: ['Upper abdominal pain', 'Nausea', 'Vomiting', 'Bloating', 'Loss of appetite', 'Indigestion'],
        homeopathicRemedies: [
          { name: 'Nux Vomica', indication: 'Heartburn, nausea, irritable, worse after eating, overindulgence' },
          { name: 'Arsenicum Album', indication: 'Burning pain, anxiety, worse midnight, worse cold food/drinks' },
          { name: 'Pulsatilla', indication: 'Worse after rich/fatty food, thirstless, changeable symptoms' },
          { name: 'Bryonia', indication: 'Worse movement, thirsty, stitching pain in stomach' },
        ],
        investigations: ['Endoscopy', 'H. pylori test', 'Complete blood count'],
        prognosis: 'Good with dietary modifications and appropriate treatment.',
      },
      {
        id: 'pc-4',
        name: 'Irritable Bowel Syndrome (IBS)',
        systemId: 'ps-2',
        description: 'Chronic functional gastrointestinal disorder with abdominal pain and altered bowel habits.',
        symptoms: ['Abdominal pain', 'Bloating', 'Diarrhea', 'Constipation', 'Alternating bowel habits', 'Mucus in stool'],
        homeopathicRemedies: [
          { name: 'Nux Vomica', indication: 'Irritable, constipation with urging, worse after stress/eating' },
          { name: 'Pulsatilla', indication: 'Changeable symptoms, worse after fatty food, weepy' },
          { name: 'Colocynth', indication: 'Cramping pains, better pressure, worse anger' },
          { name: 'Lycopodium', indication: 'Gas, bloating, worse 4-8 PM, right-sided' },
          { name: 'Sulphur', indication: 'Morning diarrhea, red anus, hot patient' },
        ],
        investigations: ['Stool tests', 'Colonoscopy', 'Blood tests'],
        prognosis: 'Chronic condition requiring dietary and lifestyle modifications along with homeopathic treatment.',
      },
    ],
  },
  {
    id: 'ps-3',
    name: 'Nervous System',
    description: 'Diseases of the central and peripheral nervous system',
    icon: 'Brain',
    conditions: [
      {
        id: 'pc-5',
        name: 'Migraine',
        systemId: 'ps-3',
        description: 'Recurrent headache, usually on one side of the head, often with aura.',
        symptoms: ['Throbbing headache', 'Nausea and vomiting', 'Sensitivity to light and sound', 'Aura', 'Visual disturbances'],
        homeopathicRemedies: [
          { name: 'Natrum Mur', indication: 'Throbbing, blinding headache, worse from sun, on coughing' },
          { name: 'Belladonna', indication: 'Throbbing, bursting headache, worse light, noise, jar' },
          { name: 'Sanguinaria', indication: 'Right-sided, settles over right eye, nausea and vomiting' },
          { name: 'Iris Versicolor', indication: 'Burning in stomach, nausea, vomiting of bile' },
          { name: 'Spigelia', indication: 'Left-sided, extending to occiput, worse from motion' },
        ],
        investigations: ['MRI', 'CT scan', 'Blood tests'],
        prognosis: 'Chronic condition. Homeopathic treatment can reduce frequency and severity significantly.',
      },
      {
        id: 'pc-6',
        name: 'Epilepsy',
        systemId: 'ps-3',
        description: 'Neurological disorder characterized by recurrent seizures.',
        symptoms: ['Seizures', 'Loss of consciousness', 'Convulsions', 'Aura', 'Confusion after seizure'],
        homeopathicRemedies: [
          { name: 'Cicuta', indication: 'Violent convulsions, consciousness lost, spasms' },
          { name: 'Artemisia Vulgaris', indication: ' petit mal seizures, after head injury, no aura' },
          { name: 'Cuprum Met', indication: 'Convulsions with cramps, blue face, worse from cold' },
          { name: 'Bufo Rana', indication: 'Seizures during sleep, worse at new moon' },
          { name: 'Calcarea Carb', indication: 'Seizures in children, delayed milestones, sweating head' },
        ],
        investigations: ['EEG', 'MRI', 'Blood tests'],
        prognosis: 'Requires long-term constitutional treatment alongside conventional management.',
      },
    ],
  },
  {
    id: 'ps-4',
    name: 'Musculoskeletal System',
    description: 'Diseases of bones, joints, muscles, and connective tissue',
    icon: 'Bone',
    conditions: [
      {
        id: 'pc-7',
        name: 'Rheumatoid Arthritis',
        systemId: 'ps-4',
        description: 'Chronic inflammatory autoimmune disorder affecting joints.',
        symptoms: ['Joint pain and swelling', 'Morning stiffness', 'Symmetrical joint involvement', 'Fatigue', 'Fever', 'Weight loss'],
        homeopathicRemedies: [
          { name: 'Rhus Tox', indication: 'Worse on initial movement, better continued movement, after getting wet' },
          { name: 'Bryonia', indication: 'Worse from movement, better pressure and rest, stitching pains' },
          { name: 'Ledum', indication: 'Joints affected but cold to touch, better cold application, upward migration of pain' },
          { name: 'Causticum', indication: 'Stiffness, paralysis tendency, worse cold dry weather' },
        ],
        investigations: ['RA factor', 'Anti-CCP antibodies', 'ESR', 'CRP', 'X-ray'],
        prognosis: 'Chronic progressive condition. Homeopathic treatment can slow progression and reduce pain.',
      },
    ],
  },
  {
    id: 'ps-5',
    name: 'Integumentary System',
    description: 'Diseases of skin, hair, and nails',
    icon: 'Skin',
    conditions: [
      {
        id: 'pc-8',
        name: 'Eczema',
        systemId: 'ps-5',
        description: 'Chronic inflammatory skin condition causing itchy, red, dry, and cracked skin.',
        symptoms: ['Itching', 'Dry skin', 'Redness', 'Cracking', 'Bleeding', 'Thickened skin'],
        homeopathicRemedies: [
          { name: 'Sulphur', indication: 'Burning, itching, worse heat of bed, dirty, unhealthy skin' },
          { name: 'Graphites', indication: 'Thick discharge, cracked skin, obesity, constipation' },
          { name: 'Psorinum', indication: 'Chronic eczema, bad smell, winter aggravation, hopeless feeling' },
          { name: 'Petroleum', indication: 'Cracked skin, worse winter, eczema of hands and fingers' },
        ],
        investigations: ['Skin biopsy', 'Patch testing', 'Allergy tests'],
        prognosis: 'Chronic condition. Homeopathic constitutional treatment addresses the underlying susceptibility.',
      },
      {
        id: 'pc-9',
        name: 'Psoriasis',
        systemId: 'ps-5',
        description: 'Chronic autoimmune condition causing rapid buildup of skin cells.',
        symptoms: ['Red patches with silvery scales', 'Itching', 'Dry cracked skin', 'Joint pain', 'Thickened nails'],
        homeopathicRemedies: [
          { name: 'Arsenicum Album', indication: 'Scaly, burning, itching eruptions, worse cold, better warmth' },
          { name: 'Lycopodium', indication: 'Right-sided patches, worse 4-8 PM, digestive issues' },
          { name: 'Sulphur', indication: 'Burning, itching, worse heat, dirty, miasmatic' },
          { name: 'Sepia', indication: 'Ring-shaped patches, itching, worse before menses' },
        ],
        investigations: ['Skin biopsy', 'Blood tests'],
        prognosis: 'Chronic relapsing condition. Homeopathic treatment can achieve significant improvement.',
      },
    ],
  },
];

export const PATHOLOGY_CONDITIONS: PathologyCondition[] = PATHOLOGY_SYSTEMS.flatMap(
  (system) => system.conditions
);
