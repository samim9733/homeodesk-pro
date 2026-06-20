export interface Aphorism {
  number: number;
  title?: string;
  text: string;
  footnotes?: string[];
}

export interface Preface {
  edition: number;
  year: string;
  text: string;
}

export const ORGANON_DATA: Aphorism[] = [
  { number: 1, title: 'The Physician\'s High and Only Mission', text: 'The physician\'s high and only mission is to restore the sick to health, to cure, as it is termed.' },
  { number: 2, title: 'The Ideal Cure', text: 'The highest ideal of cure is the rapid, gentle and permanent restoration of health, or removal and annihilation of the disease in its whole extent, in the shortest, most reliable, and most harmless way, on easily comprehensible principles.' },
  { number: 3, title: 'Knowledge of the Physician', text: 'If the physician clearly perceives what is to be cured in diseases, that is to say, in each individual case of disease (knowledge of disease, individuation), if he clearly perceives what is curative in medicines, that is to say, in each individual medicine (knowledge of medical powers), and if he knows how to apply, according to clearly defined principles, what is curative in medicines to what he has discovered to be undoubtedly morbid in the patient, so that the recovery must ensue.' },
  { number: 4, title: 'What the Physician Needs to Know', text: 'He is likewise a preserver of health if he knows the things that derange health and cause disease, and how to remove them from persons in health.' },
  { number: 5, title: 'Cause of Disease', text: 'Useful to the physician in practice is the attention to the exciting cause and the fundamental cause (miasm), likewise the comprehension of the totality of the symptoms.' },
  { number: 6, title: 'The Precept of Heal', text: 'The unprejudiced observer - well aware of the futility of transcendental speculations which receive no confirmation from experience - perceives in each individual case of disease only the deviations from the state of the healthy body.' },
  { number: 7, title: 'Totality of Symptoms', text: 'Now, as in a disease, from which no manifest exciting or maintaining cause (causa occasionalis) has to be removed, we can perceive nothing but the morbid symptoms, it must be the totality of these symptoms alone that is the only indication for the curative choice of medicine.' },
  { number: 8, title: 'Totality is the External Reflection', text: 'The totality of the symptoms constitutes the outwardly reflected image of the internal essence of the disease, that is, of the suffering of the vital force.' },
  { number: 9, title: 'During Healthy State', text: 'In the healthy condition of man, the spiritual vital force (autocracy), the dynamis that animates the material body (organism), rules with unbounded sway, and retains all the parts of the organism in admirable, harmonious, vital operation.' },
  { number: 10, title: 'The Dynamic Principle', text: 'The material organism, without the vital force, is capable of no sensation, no function, no self-preservation; it derives all sensation and performs all the functions of life solely by means of the immaterial being (the vital principle) which animates the material organism in health and in disease.' },
  { number: 11, title: 'Disease is a Dynamic Derangement', text: 'When a person falls ill, it is only this spiritual, self-acting (automatic) vital force, everywhere present in his organism, that is primarily deranged by the dynamic influence upon it of a morbific agent inimical to life.' },
  { number: 25, title: 'The Physician\'s Duty', text: 'It is a fundamental principle that a pure symptom picture of disease should be obtained before selecting a remedy.' },
  { number: 27, title: 'The Curative Power of Medicines', text: 'The curative power of medicines consists in this, that there is a mutual action between the medicines and the vital force.' },
  { number: 28, title: 'Dynamic Action of Medicines', text: 'This mutual action is of a purely dynamic (spiritual) nature.' },
  { number: 29, title: 'Every Medicine has Unique Action', text: 'Every real medicine, particularly at every homeopathic dose, acts upon the vital force and causes a certain alteration of the healthy condition.' },
  { number: 30, title: 'Medicines as Dynamic Agents', text: 'The dynamic action of medicines, as also of all morbid stimuli, is much more powerful than the mere physical and chemical properties of medicines.' },
  { number: 31, title: 'Morbid Vital Force', text: 'The diseased vital force can be cured only by the dynamic action of medicines.' },
  { number: 34, title: 'Law of Similars', text: 'There is no other way of employing medicine in diseases than that which produces similar symptoms in health.' },
  { number: 35, title: 'Similia Similibus Curentur', text: 'The totality of the symptoms of the disease must be matched with the medicinal symptoms for a cure.' },
  { number: 45, title: 'Acute vs Chronic Diseases', text: 'The acute diseases of man are either acute miasms or acute exacerbations of chronic miasms.' },
  { number: 46, title: 'Nature of Chronic Diseases', text: 'The chronic diseases are those that arise from a chronic miasm, which when left to themselves, and unchecked by the vital force, always tend to increase.' },
  { number: 47, title: 'Fundamental Cause', text: 'The fundamental cause of all chronic diseases is a chronic miasm - psora, sycosis or syphilis.' },
  { number: 50, title: 'Nature of Psora', text: 'Psora is the oldest and most universal chronic miasmatic disease, which has been transmitted from generation to generation.' },
  { number: 53, title: 'Prophylactic Use', text: 'The surest and most harmless way of curing a disease is to use a similar medicine as a prophylactic.' },
  { number: 55, title: 'Minimum Dose', text: 'The smaller the dose, the more gentle and harmless is the cure.' },
  { number: 56, title: 'Potentization', text: 'By means of the process of dynamization (potentization) the curative properties of medicines are developed and brought to their highest activity.' },
  { number: 60, title: 'Aggravation', text: 'The homeopathic aggravation is a sign that the vital force is reacting against the disease.' },
  { number: 70, title: 'Homoeopathic Cure', text: 'The homeopathic cure takes place by a dynamic process, not by a mechanical or chemical action.' },
  { number: 75, title: 'Acute Disease', text: 'Acute diseases are caused by dynamic morbific influences, and are to be cured by a similar dynamic remedy.' },
  { number: 80, title: 'Miasmatic Diseases', text: 'The miasmatic diseases are the most deep-seated and difficult to cure.' },
  { number: 90, title: 'Chronic Treatment', text: 'In chronic diseases, the complete case-taking and repertorization is the most important preliminary step.' },
  { number: 100, title: 'Observation', text: 'The physician must observe the symptoms carefully and record them precisely.' },
  { number: 105, title: 'Case Taking', text: 'The physician should note everything that the patient says about his suffering.' },
  { number: 115, title: 'Repertorization', text: 'The arrangement of symptoms and the selection of the most similar remedy is called repertorization.' },
  { number: 145, title: 'Provings', text: 'The pathogenetic powers of medicines must be ascertained by proving them on healthy individuals.' },
  { number: 150, title: 'Medicine Selection', text: 'The most appropriate remedy for the case at hand is the one whose symptom picture most closely matches the totality.' },
  { number: 153, title: 'Simillimum', text: 'The simillimum is the remedy that most exactly corresponds to the totality of symptoms.' },
  { number: 210, title: 'Mental Symptoms', text: 'The mental symptoms form the most important part of the case and must not be neglected.' },
  { number: 211, title: 'Mental State is Key', text: 'The state of the patient\'s mind is the most important indicator of the choice of remedy.' },
  { number: 250, title: 'Diet During Treatment', text: 'During the treatment, the patient should avoid all medicinal substances and strong stimulants.' },
  { number: 270, title: 'Single Remedy', text: 'In every case of disease, only one remedy should be administered at a time.' },
  { number: 271, title: 'Diet and Regimen', text: 'The physician should also regulate the diet and regimen of the patient during treatment.' },
  { number: 280, title: 'Follow-up', text: 'The physician should observe the changes that occur after the administration of the remedy.' },
  { number: 290, title: 'Second Prescription', text: 'The second prescription depends upon the action of the first remedy.' },
  { number: 291, title: 'When to Repeat', text: 'The remedy should not be repeated while the beneficial action of the previous dose continues.' },
  { number: 295, title: 'Minimum Repetition', text: 'The repetition of the dose should be as infrequent as possible.' },
  { number: 300, title: 'Potency Selection', text: 'The potency of the remedy should be selected according to the susceptibility of the patient.' },
];

export const PREFACES_DATA: Preface[] = [
  {
    edition: 1,
    year: '1810',
    text: 'The Organon of the Rational Art of Healing, as it is presented in the first edition, laid the foundation for a new system of medicine based on natural laws. Hahnemann introduced the concept of Similia Similibus Curentur - let likes be cured by likes.',
  },
  {
    edition: 2,
    year: '1819',
    text: 'In the second edition, Hahnemann expanded on the concept of vital force and further refined the principles of homeopathic prescribing. He introduced the concept of miasms and their role in chronic diseases.',
  },
  {
    edition: 3,
    year: '1824',
    text: 'The third edition further refined the principles, with additional aphorisms and clearer explanations of the vital force concept. Hahnemann emphasized the importance of the totality of symptoms.',
  },
  {
    edition: 4,
    year: '1829',
    text: 'The fourth edition saw significant additions, including the theory of chronic miasms - psora, sycosis, and syphilis - as the fundamental cause of chronic diseases.',
  },
  {
    edition: 5,
    year: '1833',
    text: 'The fifth edition, published near the end of Hahnemann\'s life, introduced the concept of the vital force more explicitly and refined the principles of potentization and the minimum dose. The theory of dynamic action was further elaborated.',
  },
  {
    edition: 6,
    year: '1921',
    text: 'The sixth edition, published posthumously, contained the most significant revisions, including the introduction of the 50 millesimal (LM) scale of potencies and more refined principles of case taking and remedy selection. This edition is considered the most complete expression of Hahnemann\'s medical philosophy.',
  },
];
