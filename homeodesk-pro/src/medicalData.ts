export interface KnowledgeTopic {
  id: string;
  title: string;
  summary: string;
  category: string;
  date?: string;
  content?: string;
  tags?: string[];
}

export interface DiseaseCategory {
  id: string;
  name: string;
  description: string;
  conditions: string[];
}

export const CLASSIC_BOOKS = [
  { id: 'cb1', title: 'Organon of Medicine', author: 'Samuel Hahnemann', description: 'The foundational text of homeopathy', category: 'Philosophy' },
  { id: 'cb2', title: 'Materia Medica Pura', author: 'Samuel Hahnemann', description: 'Comprehensive materia medica by Hahnemann', category: 'Materia Medica' },
  { id: 'cb3', title: 'Chronic Diseases', author: 'Samuel Hahnemann', description: 'Theory of chronic miasms', category: 'Philosophy' },
  { id: 'cb4', title: 'Lesser Writings', author: 'Samuel Hahnemann', description: 'Collection of essays and articles', category: 'Philosophy' },
  { id: 'cb5', title: 'Kent\'s Lectures on Materia Medica', author: 'James Tyler Kent', description: 'Classic lectures on homeopathic remedies', category: 'Materia Medica' },
  { id: 'cb6', title: 'Repertory of the Homoeopathic Materia Medica', author: 'James Tyler Kent', description: 'The standard repertory of homeopathic medicine', category: 'Repertory' },
  { id: 'cb7', title: 'Boericke\'s Materia Medica with Repertory', author: 'William Boericke', description: 'Popular pocket materia medica and repertory', category: 'Materia Medica' },
  { id: 'cb8', title: 'Allen\'s Keynotes', author: 'Henry C. Allen', description: 'Keynotes and characteristics with comparisons', category: 'Materia Medica' },
  { id: 'cb9', title: 'Dictionary of Practical Materia Medica', author: 'John Henry Clarke', description: 'Three-volume dictionary of materia medica', category: 'Materia Medica' },
  { id: 'cb10', title: 'Principles and Art of Cure by Homeopathy', author: 'Herbert A. Roberts', description: 'Comprehensive guide to homeopathic practice', category: 'Philosophy' },
  { id: 'cb11', title: 'The Principles of Homeopathic Philosophy', author: 'Roger D. D. Theophilus', description: 'Study of homeopathic principles', category: 'Philosophy' },
  { id: 'cb12', title: 'Science of Homeopathy', author: 'George Vithoulkas', description: 'Modern scientific approach to homeopathy', category: 'Philosophy' },
  { id: 'cb13', title: 'Synthesis Repertory', author: 'Frederik Schroyens', description: 'Expanded and updated repertory', category: 'Repertory' },
  { id: 'cb14', title: 'Nature of Drugs', author: 'C.M. Boger', description: 'Study of drug action and relationship', category: 'Materia Medica' },
  { id: 'cb15', title: 'A Study on Miasm', author: 'J.H. Allen', description: 'Comprehensive study of miasms', category: 'Philosophy' },
];

export const KNOWLEDGE_CATEGORIES = [
  'Homeopathic Philosophy',
  'Materia Medica',
  'Repertory',
  'Case Taking',
  'Potency Selection',
  'Miasms',
  'Clinical Practice',
  'Research',
  'Pharmacology',
  'History of Homeopathy',
];

export const RECENT_ARTICLES = [
  {
    id: 'art1',
    title: 'Understanding the Vital Force in Modern Context',
    summary: 'An exploration of Hahnemann\'s vital force concept and its relevance in modern homeopathic practice.',
    date: '2025-06-01',
    category: 'Homeopathic Philosophy',
    content: 'The concept of vital force, introduced by Samuel Hahnemann in the Organon of Medicine, remains central to homeopathic philosophy. This article explores how modern practitioners interpret this fundamental concept...',
  },
  {
    id: 'art2',
    title: 'The Role of Miasms in Chronic Disease',
    summary: 'A comprehensive review of the miasmatic theory and its application in clinical practice.',
    date: '2025-05-20',
    category: 'Miasms',
    content: 'The theory of miasms is one of the most important and controversial aspects of homeopathy. Hahnemann identified three chronic miasms: psora, sycosis, and syphilis...',
  },
  {
    id: 'art3',
    title: 'Potency Selection: A Practical Guide',
    summary: 'Practical guidelines for selecting the appropriate potency in different clinical scenarios.',
    date: '2025-05-15',
    category: 'Potency Selection',
    content: 'The selection of potency is one of the most critical decisions in homeopathic prescribing. This guide provides practical frameworks for choosing between low, medium, and high potencies...',
  },
  {
    id: 'art4',
    title: 'Case Analysis Methods: A Comparison',
    summary: 'Comparative analysis of different methods of homeopathic case analysis.',
    date: '2025-05-01',
    category: 'Case Taking',
    content: 'Several methods exist for analyzing homeopathic cases, from classical totality-based approaches to modern computer-assisted repertorization. This article compares the major approaches...',
  },
];

export const PATHOLOGY_DATA: DiseaseCategory[] = [
  {
    id: 'path-1',
    name: 'Respiratory System',
    description: 'Diseases of the respiratory tract and lungs',
    conditions: ['Asthma', 'Bronchitis', 'Pneumonia', 'Tuberculosis', 'Rhinitis', 'Pharyngitis', 'Tonsillitis', 'Sinusitis', 'Laryngitis', 'COPD'],
  },
  {
    id: 'path-2',
    name: 'Digestive System',
    description: 'Diseases of the gastrointestinal tract',
    conditions: ['Gastritis', 'Peptic Ulcer', 'IBS', 'Crohn\'s Disease', 'Ulcerative Colitis', 'Hepatitis', 'Pancreatitis', 'Gallstones', 'GERD', 'Appendicitis'],
  },
  {
    id: 'path-3',
    name: 'Cardiovascular System',
    description: 'Diseases of the heart and blood vessels',
    conditions: ['Hypertension', 'Coronary Artery Disease', 'Heart Failure', 'Arrhythmia', 'Atherosclerosis', 'Varicose Veins', 'Thrombosis', 'Anemia'],
  },
  {
    id: 'path-4',
    name: 'Nervous System',
    description: 'Diseases of the brain, spinal cord, and nerves',
    conditions: ['Migraine', 'Epilepsy', 'Parkinson\'s Disease', 'Multiple Sclerosis', 'Neuralgia', 'Sciatica', 'Bell\'s Palsy', 'Dementia', 'Anxiety Disorders', 'Depression'],
  },
  {
    id: 'path-5',
    name: 'Musculoskeletal System',
    description: 'Diseases of bones, joints, and muscles',
    conditions: ['Osteoarthritis', 'Rheumatoid Arthritis', 'Gout', 'Osteoporosis', 'Spondylitis', 'Tendinitis', 'Fibromyalgia', 'Bursitis'],
  },
  {
    id: 'path-6',
    name: 'Integumentary System',
    description: 'Diseases of skin, hair, and nails',
    conditions: ['Eczema', 'Psoriasis', 'Acne', 'Urticaria', 'Vitiligo', 'Dermatitis', 'Fungal Infections', 'Warts', 'Herpes', 'Alopecia'],
  },
  {
    id: 'path-7',
    name: 'Urinary System',
    description: 'Diseases of the kidneys and urinary tract',
    conditions: ['UTI', 'Nephrolithiasis', 'Nephritis', 'Cystitis', 'Prostatitis', 'Renal Failure', 'Pyelonephritis', 'Prostatic Hyperplasia'],
  },
  {
    id: 'path-8',
    name: 'Endocrine System',
    description: 'Diseases of glands and hormones',
    conditions: ['Diabetes Mellitus', 'Thyroid Disorders', 'Cushing\'s Syndrome', 'Addison\'s Disease', 'Hypothyroidism', 'Hyperthyroidism', 'PCOS'],
  },
  {
    id: 'path-9',
    name: 'Reproductive System',
    description: 'Diseases of male and female reproductive organs',
    conditions: ['Dysmenorrhea', 'Menorrhagia', 'Amenorrhea', 'PCOS', 'Endometriosis', 'Fibroids', 'Infertility', 'Prostatitis', 'Erectile Dysfunction'],
  },
  {
    id: 'path-10',
    name: 'Hematological System',
    description: 'Diseases of blood and blood-forming organs',
    conditions: ['Anemia', 'Iron Deficiency Anemia', 'Pernicious Anemia', 'Hemophilia', 'Leukemia', 'Lymphoma', 'ITP'],
  },
];

export const PRACTICE_MEDICINE_DATA = [
  {
    id: 'pm1',
    name: 'Fever',
    category: 'General',
    description: 'Body temperature above normal range',
    homeopathicApproach: 'Fever is a defense mechanism. The remedy should be selected based on the type of fever, accompanying symptoms, and modalities.',
    remedies: [
      { name: 'Belladonna', indication: 'Sudden onset, high fever, throbbing headache, dilated pupils, red face, worse from light and noise' },
      { name: 'Aconite', indication: 'Sudden onset from cold exposure, anxiety, restlessness, hot and dry skin, thirsty' },
      { name: 'Bryonia', indication: 'Slow onset, body aches worse from movement, thirst for large quantities of cold water, irritability' },
      { name: 'Rhus Tox', indication: 'Restlessness, worse on initial movement but better on continued movement, after getting wet' },
      { name: 'Gelsemium', indication: 'Slow onset with weakness, trembling, dullness, no thirst, heavy eyes and droopy eyelids' },
      { name: 'Arsenicum Album', indication: 'High fever with anxiety and restlessness, periodic fever, worse at midnight, thirsty for small sips' },
    ],
  },
  {
    id: 'pm2',
    name: 'Common Cold',
    category: 'Respiratory',
    description: 'Acute viral infection of the upper respiratory tract',
    homeopathicApproach: 'Remedy selection based on nasal discharge, body aches, throat symptoms, and modalities.',
    remedies: [
      { name: 'Arsenicum Album', indication: 'Watery, burning discharge from nose, worse at night, sneezing without relief, chilly patient' },
      { name: 'Allium Cepa', indication: 'Bland watery discharge from nose, burning discharge from eyes, sneezing, better in open air' },
      { name: 'Natrum Mur', indication: 'Watery discharge like raw white of egg, loss of smell and taste, sneezing in morning, frontal headache' },
      { name: 'Nux Vomica', indication: 'Dry nose, stuffed up feeling, sneezing, body aches, irritability, worse from cold' },
      { name: 'Pulsatilla', indication: 'Thick yellowish-green discharge, worse in warm room, better in open air, changeable symptoms, weeping' },
    ],
  },
  {
    id: 'pm3',
    name: 'Diarrhea',
    category: 'Digestive',
    description: 'Frequent loose or watery bowel movements',
    homeopathicApproach: 'Selection based on the character of stool, associated symptoms, thirst, and modalities.',
    remedies: [
      { name: 'Arsenicum Album', indication: 'Burning stools, worse after eating or drinking, restless, anxious, worse at midnight' },
      { name: 'Ipecac', indication: 'Nausea that does not respond to vomiting, greenish stools, cutting pains around navel' },
      { name: 'Nux Vomica', indication: 'Frequent urge with small amounts, ineffectual urging, after overeating or stimulants' },
      { name: 'Podophyllum', indication: 'Profuse, gushing, painless diarrhea, worse morning, drives patient out of bed, offensive' },
      { name: 'Sulphur', indication: 'Early morning diarrhea driving patient out of bed, redness around anus, changeable symptoms' },
    ],
  },
  {
    id: 'pm4',
    name: 'Headache / Migraine',
    category: 'Nervous',
    description: 'Pain in the head, can be acute or chronic',
    homeopathicApproach: 'Remedy based on location, type of pain (throbbing, pressing, boring), aggravation and amelioration factors.',
    remedies: [
      { name: 'Natrum Mur', indication: 'Throbbing, blinding headache, as if hammers beating, worse from sun, on coughing, better after sleep' },
      { name: 'Belladonna', indication: 'Throbbing, bursting headache, worse from light, noise, jar, better from pressure, red face, dilated pupils' },
      { name: 'Sanguinaria', indication: 'Right-sided headache, begins in occiput and settles over right eye, nausea and vomiting' },
      { name: 'Nux Vomica', indication: 'Frontal headache, over eyes, splitting, worse from mental exertion, stooping, moving eyes' },
      { name: 'Iris Versicolor', indication: 'Temporal headache, burning in stomach, nausea, vomiting of bile, visual disturbances' },
      { name: 'Spigelia', indication: 'Left-sided headache, stitching pain extending to occiput, worse from motion, touch' },
    ],
  },
  {
    id: 'pm5',
    name: 'Arthritis',
    category: 'Musculoskeletal',
    description: 'Inflammation of one or more joints causing pain and stiffness',
    homeopathicApproach: 'Based on the affected joints, type of pain, swelling, modalities of movement and rest.',
    remedies: [
      { name: 'Rhus Tox', indication: 'Pain and stiffness worse on initial movement, better on continued movement, after getting wet, rheumatism from sprains' },
      { name: 'Bryonia', indication: 'Joints red, swollen, hot, stitching pain, every movement aggravates, better from pressure and rest' },
      { name: 'Ledum', indication: 'Pain travels upward, affected parts cold to touch but better from cold application, after injuries' },
      { name: 'Arnica', indication: 'Sore, bruised feeling, after injuries, worse from touch, rheumatism with cardiac complications' },
      { name: 'Apis', indication: 'Swollen, hot joints with stinging pain, better from cold application, worse from heat' },
    ],
  },
];

export const KNOWLEDGE_DATA: KnowledgeTopic[] = [
  {
    id: 'k1',
    title: 'Principles of Homeopathic Philosophy',
    summary: 'The fundamental principles that guide homeopathic practice including the Law of Similars, Minimum Dose, and Single Remedy.',
    category: 'Homeopathic Philosophy',
    date: '2025-01-10',
    tags: ['basics', 'principles', 'organon'],
  },
  {
    id: 'k2',
    title: 'Understanding Potency Selection',
    summary: 'A guide to choosing between different potencies (6C, 30C, 200C, 1M, LM) based on case characteristics.',
    category: 'Potency Selection',
    date: '2025-02-15',
    tags: ['potency', 'prescribing', 'guide'],
  },
  {
    id: 'k3',
    title: 'Case Taking Methodology',
    summary: 'Comprehensive guide to homeopathic case taking including physical, mental, and general symptoms.',
    category: 'Case Taking',
    date: '2025-03-01',
    tags: ['case-taking', 'methodology', 'symptoms'],
  },
  {
    id: 'k4',
    title: 'Miasmatic Theory in Practice',
    summary: 'Understanding psora, sycosis, and syphilis as fundamental causes of chronic disease.',
    category: 'Miasms',
    date: '2025-03-20',
    tags: ['miasms', 'psora', 'sycosis', 'syphilis'],
  },
  {
    id: 'k5',
    title: 'Repertorization Techniques',
    summary: 'Modern and traditional methods of repertorization for accurate remedy selection.',
    category: 'Repertory',
    date: '2025-04-10',
    tags: ['repertory', 'techniques', 'analysis'],
  },
  {
    id: 'k6',
    title: 'Homeopathic Pharmacology',
    summary: 'Principles of homeopathic drug preparation, potentization, and quality control.',
    category: 'Pharmacology',
    date: '2025-04-25',
    tags: ['pharmacology', 'potentization', 'preparation'],
  },
  {
    id: 'k7',
    title: 'Second Prescription: When and How',
    summary: 'Guidelines for follow-up prescriptions based on remedy response patterns.',
    category: 'Clinical Practice',
    date: '2025-05-10',
    tags: ['prescription', 'follow-up', 'clinical'],
  },
  {
    id: 'k8',
    title: 'History of Homeopathy',
    summary: 'From Hahnemann to modern homeopathy: the evolution of a medical science.',
    category: 'History of Homeopathy',
    date: '2025-05-30',
    tags: ['history', 'hahnemann', 'evolution'],
  },
];

export const PHYSIOLOGY_ANATOMY_DATA = [
  {
    id: 'sys-1',
    name: 'Skeletal System',
    image: '',
    description: 'The skeletal system consists of 206 bones and provides structure, protection, and movement.',
    parts: [
      { name: 'Skull', description: 'Protects the brain and supports facial structures.' },
      { name: 'Spine', description: 'Protects the spinal cord and provides support for upright posture.' },
      { name: 'Ribcage', description: 'Protects the heart, lungs, and other vital organs.' },
      { name: 'Limbs', description: 'Arms and legs - provide movement and dexterity.' },
    ],
  },
  {
    id: 'sys-2',
    name: 'Circulatory System',
    image: '',
    description: 'The circulatory system transports blood, nutrients, oxygen, and waste products throughout the body.',
    parts: [
      { name: 'Heart', description: 'Pumps blood throughout the body via rhythmic contractions.' },
      { name: 'Arteries', description: 'Carry oxygenated blood away from the heart to the body tissues.' },
      { name: 'Veins', description: 'Return deoxygenated blood from the tissues back to the heart.' },
      { name: 'Capillaries', description: 'Microscopic vessels where gas and nutrient exchange occurs.' },
    ],
  },
  {
    id: 'sys-3',
    name: 'Nervous System',
    image: '',
    description: 'The nervous system coordinates body functions through electrical signals.',
    parts: [
      { name: 'Brain', description: 'Central processing unit controlling thought, memory, and movement.' },
      { name: 'Spinal Cord', description: 'Major nerve pathway between brain and the rest of the body.' },
      { name: 'Peripheral Nerves', description: 'Network of nerves connecting CNS to limbs and organs.' },
      { name: 'Autonomic Nervous System', description: 'Controls involuntary functions like heart rate and digestion.' },
    ],
  },
  {
    id: 'sys-4',
    name: 'Digestive System',
    image: '',
    description: 'The digestive system breaks down food into nutrients for energy and body functions.',
    parts: [
      { name: 'Stomach', description: 'Secretes acid and enzymes for protein digestion.' },
      { name: 'Liver', description: 'Processes nutrients, detoxifies blood, produces bile.' },
      { name: 'Small Intestine', description: 'Primary site of nutrient absorption.' },
      { name: 'Large Intestine', description: 'Absorbs water and forms waste products.' },
    ],
  },
  {
    id: 'sys-5',
    name: 'Respiratory System',
    image: '',
    description: 'The respiratory system facilitates gas exchange - oxygen in, carbon dioxide out.',
    parts: [
      { name: 'Lungs', description: 'Main organs of respiration where gas exchange occurs.' },
      { name: 'Trachea', description: 'Windpipe carrying air to and from the lungs.' },
      { name: 'Bronchi', description: 'Branches from trachea leading to lung lobes.' },
      { name: 'Diaphragm', description: 'Primary muscle controlling breathing.' },
    ],
  },
  {
    id: 'sys-6',
    name: 'Endocrine System',
    image: '',
    description: 'The endocrine system produces hormones that regulate metabolism, growth, and reproduction.',
    parts: [
      { name: 'Thyroid', description: 'Regulates metabolic rate and energy production.' },
      { name: 'Adrenals', description: 'Produce cortisol, adrenaline, and aldosterone.' },
      { name: 'Pancreas', description: 'Produces insulin and glucagon for blood sugar regulation.' },
      { name: 'Pituitary', description: 'Master gland controlling other endocrine glands.' },
    ],
  },
];
