export interface Aphorism {
  id: number;
  text: string;
  title?: string;
  banglaTitle?: string;
  banglaText?: string;
}

export interface Preface {
  id: string;
  title: string;
  banglaTitle: string;
  content: string;
  banglaContent: string;
}

export const PREFACES_DATA: Preface[] = [
  {
    id: 'foreword',
    title: "Foreword (by J. N. Majumdar)",
    banglaTitle: "প্রস্তাবনা (জে. এন. মজুমদার দ্বারা)",
    content: "The Organon of Medicine embodies the maturest thoughts of Hahnemann. The directions regarding dose repetition and potentisation are distinctly stated in the sixth edition. This volume contains the precise text of the last edition, enriched with a historical appendix tracing the origin and growth of homeopathy. Hahnemann’s denunciation of old-school practices, though severe, was historically justified; modern medicine still struggles to achieve the scientific simplicity of homeopathy.",
    banglaContent: "অর্গানন অফ মেডিসিন হ্যানিম্যানের সবচেয়ে পরিপক্ক চিন্তাধারাকে ধারণ করে। ষষ্ঠ সংস্করণে ডোজ পুনরাবৃত্তি এবং শক্তিকরণ সংক্রান্ত নির্দেশাবলী স্পষ্টভাবে উল্লেখ করা হয়েছে। এই খণ্ডে শেষ সংস্করণের সঠিক পাঠ্য রয়েছে, যা হোমিওপ্যাথির উৎপত্তি ও বিকাশের ইতিহাস সম্বলিত একটি ঐতিহাসিক পরিশিষ্ট দ্বারা সমৃদ্ধ। পুরাতন চিকিৎসা পদ্ধতির প্রতি হ্যানিম্যানের সমালোচনা কঠোর হলেও ঐতিহাসিকভাবে তা যুক্তিযুক্ত ছিল; আধুনিক চিকিৎসা বিজ্ঞান আজও হোমিওপ্যাথির বৈজ্ঞানিক সরলতা অর্জনে সংগ্রাম করছে।"
  },
  {
    id: 'preface5',
    title: "Preface to the Fifth Edition (1833)",
    banglaTitle: "পঞ্চম সংস্করণের ভূমিকা (১৮৩৩)",
    content: "The old school (allopathy) presupposes morbid matters and acridities, treating with venesections, purgatives, and powerful drugs, often creating incurable medicinal diseases. Homeopathy, by contrast, recognises that diseases are spirit-like (dynamic) derangements of the vital force. It avoids everything enfeebling and employs only those medicines whose pathogenetic effects are known, selected by similarity (similia similibus) in minute doses.",
    banglaContent: "পুরাতন চিকিৎসা পদ্ধতি (অ্যালোপ্যাথি) রোগাক্রান্ত পদার্থ এবং তিক্ততাকে রোগের কারণ হিসেবে ধরে নেয়, এবং রক্তমোক্ষণ, জোলাপ ও শক্তিশালী ওষুধের মাধ্যমে চিকিৎসা করে, যা প্রায়ই নিরাময় অযোগ্য ঔষধি রোগ সৃষ্টি করে। বিপরীতে, হোমিওপ্যাথি স্বীকার করে যে রোগ হলো জীবনী শক্তির আধ্যাত্মিক (গতিশীল) বিশৃঙ্খলা। এটি শরীরকে দুর্বল করে এমন সবকিছু এড়িয়ে চলে এবং কেবল সেই ওষুধগুলো ব্যবহার করে যার রোগসৃজনকারী প্রভাব জানা আছে, যা ক্ষুদ্র মাত্রায় সদৃশ বিধান (সিমিলিয়া সিমিলিবাস) অনুযায়ী নির্বাচিত।"
  },
  {
    id: 'preface6',
    title: "Preface to the Sixth Edition (1842)",
    banglaTitle: "ষষ্ঠ সংস্করণের ভূমিকা (১৮৪২)",
    content: "This sixth edition has been delayed by various circumstances but is now completed. It contains the most perfect method of preparing medicines (the 50-millesimal scale) and the most precise rules for their administration. The dynamic nature of disease and the necessity of the smallest doses are further elucidated. Homeopathy is now a complete system of medicine, based on eternal laws of nature.",
    banglaContent: "বিভিন্ন পরিস্থিতির কারণে এই ষষ্ঠ সংস্করণটি বিলম্বিত হয়েছে তবে এখন এটি সম্পন্ন। এতে ওষুধ তৈরির সবচেয়ে নিখুঁত পদ্ধতি (৫০ সহস্রতমিক পদ্ধতি) এবং সেগুলো প্রয়োগের সবচেয়ে সুনির্দিষ্ট নিয়ম রয়েছে। রোগের গতিশীল প্রকৃতি এবং ক্ষুদ্রতম মাত্রার প্রয়োজনীয়তা আরও ব্যাখ্যা করা হয়েছে। হোমিওপ্যাথি এখন প্রকৃতির চিরন্তন নিয়মের ওপর ভিত্তি করে একটি পূর্ণাঙ্গ চিকিৎসা পদ্ধতি।"
  },
  {
    id: 'introduction',
    title: "Introduction by Samuel Hahnemann",
    banglaTitle: "স্যামুয়েল হ্যানিম্যানের ভূমিকা",
    content: "It is impossible to divine the internal nature of diseases and their invisible changes. We can only perceive the symptoms. The totality of these symptoms is the only guide to the choice of the remedy. The past supplies the key to the present. Science advances not by accumulation alone but by developing new concepts. Medicine, dealing with Man, must recognise that man is a composite of material, vital, and mental orders.",
    banglaContent: "রোগের অভ্যন্তরীণ প্রকৃতি এবং তাদের অদৃশ্য পরিবর্তনগুলি অনুমান করা অসম্ভব। আমরা কেবল লক্ষণগুলি অনুভব করতে পারি। এই লক্ষণগুলির সমষ্টিই হলো ওষুধ নির্বাচনের একমাত্র নির্দেশিকা। অতীত বর্তমানের চাবিকাঠি সরবরাহ করে। বিজ্ঞান কেবল তথ্য সংগ্রহের মাধ্যমে নয়, বরং নতুন ধারণা বিকাশের মাধ্যমে অগ্রসর হয়। চিকিৎসা বিজ্ঞান মানুষের সাথে কাজ করার সময় অবশ্যই স্বীকার করবে যে মানুষ জড় দেহ, জীবনী শক্তি এবং মানসিক অবস্থার এক সমন্বয়।"
  },
  {
    id: 'sarkar_intro',
    title: "Introduction by B. K. Sarkar",
    banglaTitle: "বি. কে. সরকারের ভূমিকা",
    content: "The past supplies the key to the present. Science advances not by accumulation alone but by developing new concepts. Medicine, dealing with Man, must recognise that man is a composite of material, vital, and mental orders — each requiring its own set of concepts. The scientific spirit demands unprejudiced inquiry, connection between effect and cause, and fidelity to facts. The inductive method of Bacon, the Novum Organum, inspired Hahnemann’s Organon. Hahnemann exposed the fallacies and introduced the only true method: proving drugs on the healthy and applying the law Similia Similibus Curentur.",
    banglaContent: "অতীত বর্তমানের চাবিকাঠি সরবরাহ করে। বিজ্ঞান কেবল তথ্য সংগ্রহের মাধ্যমে নয়, বরং নতুন ধারণা বিকাশের মাধ্যমে অগ্রসর হয়। চিকিৎসা বিজ্ঞান মানুষের সাথে কাজ করার সময় অবশ্যই স্বীকার করবে যে মানুষ জড় দেহ, জীবনী শক্তি এবং মানসিক অবস্থার এক সমন্বয় - যার প্রত্যেকটির নিজস্ব ধারণা প্রয়োজন। বৈজ্ঞানিক চেতনা কুসংস্কারমুক্ত অনুসন্ধান, কার্যকারণ সম্পর্ক এবং তথ্যের প্রতি বিশ্বস্ততা দাবি করে। বেকনের আরোহী পদ্ধতি (Inductive method) হ্যানিম্যানের অর্গাননকে অনুপ্রাণিত করেছিল। হ্যানিম্যান প্রচলিত ভুলগুলো উন্মোচন করেন এবং একমাত্র সঠিক পদ্ধতি প্রবর্তন করেন: সুস্থ মানুষের ওপর ওষুধের পরীক্ষণ এবং সদৃশ বিধান প্রয়োগ।"
  }
];

export const ORGANON_DATA: Aphorism[] = [
  {
    id: 1,
    title: "The Physician's Mission",
    banglaTitle: "চিকিৎসকের লক্ষ্য",
    text: "The physician's high and only mission is to restore the sick to health, to cure, as it is termed.",
    banglaText: "চিকিৎসকের একমাত্র এবং উচ্চতর লক্ষ্য হলো অসুস্থ ব্যক্তিকে স্বাস্থ্যে ফিরিয়ে আনা, যাকে আরোগ্য বলা হয়।"
  },
  {
    id: 2,
    title: "The Ideal of Cure",
    banglaTitle: "আরোগ্যের আদর্শ",
    text: "The highest ideal of cure is rapid, gentle and permanent restoration of the health, or removal and annihilation of the disease in its whole extent, in the shortest, most reliable, and most harmless way, on easily comprehensible principles.",
    banglaText: "আরোগ্যের সর্বোচ্চ আদর্শ হলো দ্রুত, মৃদু এবং স্থায়ীভাবে স্বাস্থ্যের পুনরুদ্ধার করা, অথবা রোগের সম্পূর্ণ বিস্তারকে সংক্ষিপ্ততম, নির্ভরযোগ্য এবং ক্ষতিকর নয় এমন উপায়ে নির্মূল করা, যা সহজে বোধগম্য নীতির ওপর ভিত্তি করে।"
  },
  {
    id: 3,
    title: "Knowledge of the Physician",
    banglaTitle: "চিকিৎসকের জ্ঞান",
    text: "If the physician clearly perceives what is to be cured in diseases, that is to say, in every individual case of disease (knowledge of disease, indication), if he clearly perceives what is curative in medicines, that is to say, in each individual medicine (knowledge of medicinal powers), and if he knows how to adapt, according to clearly defined principles, what is curative in medicines to what he has discovered to be undoubtedly morbid in the patient, so that the recovery must ensue - to adapt it, as well in respect to the suitability of the medicine most appropriate according to its mode of action to the case before him (choice of the remedy, the medicine indicated), as also in respect to the exact mode of preparation and quantity of it required (proper dose), and the proper period for repeating the dose; - if, finally, he knows the obstacles to recovery in each case and is aware how to remove them, so that the restoration may be permanent, then he understands how to treat judiciously and rationally, and he is a true practitioner of the healing art.",
    banglaText: "যদি চিকিৎসক স্পষ্টভাবে বুঝতে পারেন রোগের মধ্যে কী আরোগ্য করতে হবে (রোগের জ্ঞান), যদি তিনি স্পষ্টভাবে বুঝতে পারেন ওষুধের মধ্যে কী আরোগ্যকারী শক্তি আছে (ওষুধের জ্ঞান), এবং যদি তিনি জানেন কীভাবে সুনির্দিষ্ট নীতি অনুযায়ী ওষুধের আরোগ্যকারী শক্তিকে রোগীর অসুস্থতার সাথে প্রয়োগ করতে হয় যাতে আরোগ্য নিশ্চিত হয় - তবেই তিনি একজন প্রকৃত চিকিৎসক।"
  },
  {
    id: 4,
    title: "Preserver of Health",
    banglaTitle: "স্বাস্থ্য রক্ষক",
    text: "He is likewise a preserver of health if he knows the things that derange health and cause disease, and how to remove them from persons in health.",
    banglaText: "তিনি স্বাস্থ্যের রক্ষকও বটে, যদি তিনি জানেন কোন বিষয়গুলো স্বাস্থ্য নষ্ট করে এবং রোগ সৃষ্টি করে, এবং কীভাবে সুস্থ ব্যক্তিদের থেকে সেগুলো দূর করতে হয়।"
  },
  {
    id: 5,
    title: "Exciting and Fundamental Causes",
    banglaTitle: "উত্তেজক এবং মৌলিক কারণ",
    text: "Useful to the physician in assisting him to cure are the particulars of the most probable exciting cause of the acute disease, as also the most significant points in the whole history of the chronic disease, to enable him to discover its fundamental cause, which is generally due to a chronic miasm. In these investigations, the ascertainable physical constitution of the patient (especially when the disease is chronic), his moral and intellectual character, his occupation, mode of living and habits, his social and domestic relations, his age, sexual function, etc., are to be taken into consideration.",
    banglaText: "চিকিৎসকের জন্য আরোগ্যে সহায়তাকারী হলো তীব্র রোগের সম্ভাব্য উত্তেজক কারণ এবং দীর্ঘস্থায়ী রোগের সম্পূর্ণ ইতিহাসের গুরুত্বপূর্ণ দিকগুলো, যা তাকে রোগের মৌলিক কারণ (মায়াজম) খুঁজে পেতে সাহায্য করে। এই অনুসন্ধানে রোগীর শারীরিক গঠন, নৈতিক ও বুদ্ধিবৃত্তিক চরিত্র, পেশা, জীবনযাপনের ধরণ, অভ্যাস, সামাজিক ও পারিবারিক সম্পর্ক, বয়স, যৌন ক্রিয়া ইত্যাদি বিবেচনা করতে হবে।"
  },
  {
    id: 6,
    title: "The Unprejudiced Observer",
    banglaTitle: "কুসংস্কারমুক্ত পর্যবেক্ষক",
    text: "The unprejudiced observer - well aware of the futility of transcendental speculations which can receive no confirmation from experience - be his powers of penetration ever so great, takes note of nothing in every individual disease, except the changes in the health of the body and of the mind (morbid phenomena, accidents, symptoms) which can be perceived externally by means of the senses; that is to say, he notices only the deviations from the former healthy state of the now diseased individual, which are felt by the patient himself, remarked by those around him and observed by the physician. All these perceptible signs represent the disease in its whole extent, that is, together they form the true and only conceivable portrait of the disease.",
    banglaText: "একজন কুসংস্কারমুক্ত পর্যবেক্ষক রোগীর শরীর ও মনের পরিবর্তনগুলো (লক্ষণ) ছাড়া আর কিছুই লক্ষ্য করেন না। এই দৃশ্যমান লক্ষণগুলোই রোগের সম্পূর্ণ চিত্র তুলে ধরে।"
  },
  {
    id: 7,
    title: "Totality of Symptoms",
    banglaTitle: "লক্ষণ সমষ্টি",
    text: "Now, as in a disease, from which no manifest exciting or maintaining cause (causa occasionalis) has to be removed, we can perceive nothing but the morbid symptoms, it must (regard being had to the possibility of a miasm, and attention being paid to the accessory circumstances, § 5) be the symptoms alone by which the disease demands and points to the remedy suited to relieve it - and, moreover, the totality of these its symptoms, of this outwardly reflected picture of the internal essence of the disease, that is, of the affection of the vital force, must be the principal, or the sole means, whereby the disease can make known what remedy it requires - the only thing that can determine the choice of the most appropriate remedy - and thus, in a word, the totality of the symptoms must be the principal, indeed the only thing the physician has to take note of in every case of disease and to remove by means of his art, in order that it shall be cured and transformed into health.",
    banglaText: "লক্ষণ সমষ্টিই হলো রোগের একমাত্র বহিঃপ্রকাশ এবং এটিই ওষুধের সঠিক নির্বাচনের একমাত্র ভিত্তি।"
  },
  {
    id: 8,
    title: "Cure of the Disease",
    banglaTitle: "রোগের আরোগ্য",
    text: "It is not conceivable, nor can it be proved by any experience in the world, that, after removal of all the symptoms of the disease and of the entire collection of the perceptible phenomena, there should or could remain anything else besides health, or that the morbid alteration in the interior could remain uneradicated.",
    banglaText: "রোগের সমস্ত লক্ষণ দূর হওয়ার পর স্বাস্থ্য ছাড়া আর কিছুই অবশিষ্ট থাকতে পারে না।"
  },
  {
    id: 9,
    title: "The Vital Force",
    banglaTitle: "জীবনী শক্তি",
    text: "In the healthy condition of man, the spiritual vital force (autocracy), the dynamis that animates the material body (organism), rules with unbounded sway, and retains all the parts of the organism in admirable, harmonious, vital operation, as regards both sensations and functions, so that our indwelling, reason-gifted mind can freely employ this living, healthy instrument for the higher purpose of our existence.",
    banglaText: "সুস্থ অবস্থায় মানুষের আধ্যাত্মিক জীবনী শক্তি শরীরকে সজীব রাখে এবং সমস্ত অঙ্গ-প্রত্যঙ্গকে সুশৃঙ্খলভাবে পরিচালনা করে।"
  },
  {
    id: 10,
    title: "The Material Organism",
    banglaTitle: "জড় দেহ",
    text: "The material organism, without the vital force, is capable of no sensation, no function, no self-preservation; it derives all sensation and performs all the functions of life solely by means of the immaterial being (the vital force) which animates the material organism in health and in disease.",
    banglaText: "জীবনী শক্তি ছাড়া জড় দেহ কোনো অনুভূতি বা কাজ করতে সক্ষম নয়।"
  },
  {
    id: 11,
    title: "Vital Force in Disease",
    banglaTitle: "রোগে জীবনী শক্তি",
    text: "When a person falls ill, it is only this spiritual, self-acting (automatic) vital force, everywhere present in his organism, that is primarily deranged by the dynamic influence upon it of a morbific agent inimical to life; it is only the vital force, deranged to such an abnormal state, that can furnish the organism with its disagreeable sensations, and incline it to the irregular processes which we call disease.",
    banglaText: "যখন কোনো ব্যক্তি অসুস্থ হয়, তখন তার জীবনী শক্তিই প্রথমে বিশৃঙ্খল হয় এবং এই বিশৃঙ্খলাই রোগের লক্ষণ হিসেবে প্রকাশ পায়।"
  },
  {
    id: 12,
    title: "Symptomatic Expression",
    banglaTitle: "লক্ষণ প্রকাশ",
    text: "It is only by the spiritual influence of the morbific agent that our spiritual vital force can be diseased; and in like manner, only by the spiritual (dynamic) operation of medicine that health can be restored.",
    banglaText: "কেবলমাত্র রোগ সৃষ্টিকারী শক্তির প্রভাবেই জীবনী শক্তি অসুস্থ হতে পারে এবং একইভাবে ওষুধের গতিশীল প্রভাবেই স্বাস্থ্য পুনরুদ্ধার করা সম্ভব।"
  },
  {
    id: 13,
    title: "Disease as an Absurdity",
    banglaTitle: "রোগ একটি অযৌক্তিক ধারণা",
    text: "Therefore disease considered as a thing separate from the living whole is an absurdity that could only be imagined by minds of a materialistic stamp.",
    banglaText: "অতএব রোগকে জীবন্ত সত্তা থেকে আলাদা কিছু ভাবা একটি অযৌক্তিক ধারণা যা কেবল জড়বাদী মানসিকতার মানুষেরাই কল্পনা করতে পারে।"
  },
  {
    id: 14,
    title: "Manifestation of Disease",
    banglaTitle: "রোগের প্রকাশ",
    text: "There is nothing morbid that is curable which does not make itself known by means of morbid signs and symptoms—an arrangement in conformity with the infinite goodness of the Preserver of life.",
    banglaText: "নিরাময়যোগ্য এমন কোনো রোগ নেই যা লক্ষণ বা চিহ্নের মাধ্যমে নিজেকে প্রকাশ করে না - এটি জীবন রক্ষাকারীর অসীম করুণার এক নিদর্শন।"
  },
  {
    id: 15,
    title: "Unity of Vital Force and Symptoms",
    banglaTitle: "জীবনী শক্তি ও লক্ষণের ঐক্য",
    text: "The affection of the morbidly deranged vital force and the totality of the outwardly cognizable symptoms constitute a whole; they are one and the same. The organism and the vital force are a unity, though thought separates them for easier comprehension.",
    banglaText: "বিশৃঙ্খল জীবনী শক্তি এবং বহিঃপ্রকাশিত লক্ষণ সমষ্টি মিলে একটি অখণ্ড সত্তা গঠন করে; তারা একই জিনিস। শরীর এবং জীবনী শক্তি এক অবিচ্ছেদ্য অংশ, যদিও বোঝার সুবিধার্থে আমরা তাদের আলাদা করে ভাবি।"
  },
  {
    id: 16,
    title: "Dynamic Attack and Cure",
    banglaTitle: "গতিশীল আক্রমণ ও আরোগ্য",
    text: "Our vital force cannot be attacked by inimical forces otherwise than in a spirit-like (dynamic) way; and likewise such morbid derangements cannot be removed except by the spirit-like powers of medicines acting upon the vital force.",
    banglaText: "আমাদের জীবনী শক্তি গতিশীল বা আধ্যাত্মিক উপায় ছাড়া অন্য কোনোভাবে আক্রান্ত হতে পারে না; একইভাবে ওষুধের গতিশীল শক্তি ছাড়া এই বিশৃঙ্খলা দূর করা সম্ভব নয়।"
  },
  {
    id: 17,
    title: "Annihilation of Disease",
    banglaTitle: "রোগ নির্মূল",
    text: "Now, as in the cure effected by removal of the whole perceptible signs the internal alteration is at the same time removed, the physician has only to remove the whole of the symptoms to annihilate the disease.",
    banglaText: "যেহেতু সমস্ত দৃশ্যমান লক্ষণ দূর করার মাধ্যমে অভ্যন্তরীণ পরিবর্তনও দূর হয়ে যায়, তাই চিকিৎসকের কাজ হলো লক্ষণ সমষ্টি দূর করে রোগ নির্মূল করা।"
  },
  {
    id: 18,
    title: "The Only Guide",
    banglaTitle: "একমাত্র পথপ্রদর্শক",
    text: "From this it follows that the totality of the symptoms is the only indication, the only guide to the selection of a remedy.",
    banglaText: "এ থেকে বোঝা যায় যে লক্ষণ সমষ্টিই হলো ওষুধ নির্বাচনের একমাত্র নির্দেশিকা বা পথপ্রদর্শক।"
  },
  {
    id: 19,
    title: "Medicinal Power",
    banglaTitle: "ওষুধের শক্তি",
    text: "The alterations of the state of health in diseases cannot be cured by medicines otherwise than in so far as the latter have the power of also producing alterations in man’s health.",
    banglaText: "রোগের কারণে স্বাস্থ্যের যে পরিবর্তন হয় তা ওষুধের মাধ্যমে তখনই নিরাময় করা সম্ভব যখন ওষুধের মানুষের স্বাস্থ্যের পরিবর্তন করার ক্ষমতা থাকে।"
  },
  {
    id: 20,
    title: "Ascertaining Medicinal Power",
    banglaTitle: "ওষুধের শক্তি নির্ধারণ",
    text: "This power of medicines to alter the state of health can only be ascertained by their effects on healthy persons.",
    banglaText: "ওষুধের স্বাস্থ্যের পরিবর্তন করার এই ক্ষমতা কেবল সুস্থ মানুষের ওপর এর প্রভাব পর্যবেক্ষণের মাধ্যমেই নিশ্চিত করা যায়।"
  },
  {
    id: 21,
    title: "Learning Disease-Curing Power",
    banglaTitle: "রোগ নিরাময় ক্ষমতা জানা",
    text: "The morbid symptoms that medicines produce in healthy individuals are the only thing wherefrom we can learn their disease-curing power.",
    banglaText: "সুস্থ মানুষের ওপর ওষুধ যে লক্ষণগুলো তৈরি করে, তা থেকেই আমরা তাদের রোগ নিরাময় করার ক্ষমতা সম্পর্কে জানতে পারি।"
  },
  {
    id: 22,
    title: "Selection of Similar Remedy",
    banglaTitle: "সদৃশ ওষুধ নির্বাচন",
    text: "If experience shows that by medicines that possess similar symptoms to the disease the latter is most certainly and permanently cured, we must select for the cure medicines with similar symptoms.",
    banglaText: "যদি অভিজ্ঞতা দেখায় যে রোগের লক্ষণের সাথে সদৃশ লক্ষণযুক্ত ওষুধের মাধ্যমে রোগটি সবচেয়ে নিশ্চিতভাবে এবং স্থায়ীভাবে নিরাময় হয়, তবে আমাদের আরোগ্যের জন্য সদৃশ লক্ষণযুক্ত ওষুধ নির্বাচন করতে হবে।"
  },
  {
    id: 23,
    title: "Failure of Antipathic Method",
    banglaTitle: "বিপরীত পদ্ধতির ব্যর্থতা",
    text: "All pure experience convinces us that persistent symptoms are far from being removed by opposite symptoms (antipathic method); after transient alleviation they break forth with increased intensity.",
    banglaText: "বিশুদ্ধ অভিজ্ঞতা আমাদের নিশ্চিত করে যে বিপরীত লক্ষণযুক্ত ওষুধের (বিপরীত পদ্ধতি) মাধ্যমে স্থায়ী লক্ষণগুলো দূর করা সম্ভব নয়; সাময়িক উপশমের পর সেগুলো আরও তীব্রভাবে ফিরে আসে।"
  },
  {
    id: 24,
    title: "Homoeopathic Mode",
    banglaTitle: "হোমিওপ্যাথিক পদ্ধতি",
    text: "There remains, therefore, no other mode of employing medicines that promises to be of service besides the homoeopathic, by which we seek for the totality of the symptoms a medicine that has power to produce an artificial morbid state most similar to that of the case of disease.",
    banglaText: "অতএব, হোমিওপ্যাথিক পদ্ধতি ছাড়া অন্য কোনো পদ্ধতি সেবার প্রতিশ্রুতি দেয় না, যার মাধ্যমে আমরা লক্ষণ সমষ্টির জন্য এমন একটি ওষুধ খুঁজি যা রোগের অবস্থার সাথে সবচেয়ে সদৃশ একটি কৃত্রিম রোগ তৈরি করতে সক্ষম।"
  },
  {
    id: 25,
    title: "Therapeutic Law of Nature",
    banglaTitle: "প্রকৃতির আরোগ্যকারী আইন",
    text: "Pure experience teaches that that medicine which has demonstrated the power of producing the greatest number of symptoms similar to those of the disease does, in suitable doses, rapidly, radically, and permanently remove the totality of the morbid state.",
    banglaText: "বিশুদ্ধ অভিজ্ঞতা শেখায় যে ওষুধটি রোগের লক্ষণের সাথে সবচেয়ে বেশি সংখ্যক সদৃশ লক্ষণ তৈরি করার ক্ষমতা প্রদর্শন করেছে, তা উপযুক্ত মাত্রায় দ্রুত, আমূল এবং স্থায়ীভাবে রোগের অবস্থাকে দূর করে।"
  },
  {
    id: 26,
    title: "Homoeopathic Law of Nature",
    banglaTitle: "প্রকৃতির হোমিওপ্যাথিক আইন",
    text: "A weaker dynamic affection is permanently extinguished in the living organism by a stronger one, if the latter (whilst differing in kind) is very similar to the former in its manifestations.",
    banglaText: "একটি দুর্বল গতিশীল রোগ জীবন্ত শরীরে একটি শক্তিশালী রোগের দ্বারা স্থায়ীভাবে বিলুপ্ত হয়, যদি পরবর্তীটি (ভিন্ন ধরনের হলেও) প্রকাশের ক্ষেত্রে পূর্ববর্তীটির সাথে খুব সদৃশ হয়।"
  },
  {
    id: 27,
    title: "Curative Power of Medicines",
    banglaTitle: "ওষুধের আরোগ্যকারী শক্তি",
    text: "The curative power of medicines, therefore, depends on their symptoms similar to the disease but superior in strength.",
    banglaText: "ওষুধের আরোগ্যকারী শক্তি তাই রোগের সদৃশ কিন্তু শক্তিতে শ্রেষ্ঠ লক্ষণগুলোর ওপর নির্ভর করে।"
  },
  {
    id: 28,
    title: "Scientific Explanation",
    banglaTitle: "বৈজ্ঞানিক ব্যাখ্যা",
    text: "As this natural law manifests itself in every pure experiment, the fact is established; the scientific explanation matters little.",
    banglaText: "যেহেতু এই প্রাকৃতিক আইন প্রতিটি বিশুদ্ধ পরীক্ষায় নিজেকে প্রকাশ করে, তাই সত্যটি প্রতিষ্ঠিত; এর বৈজ্ঞানিক ব্যাখ্যা খুব একটা গুরুত্বপূর্ণ নয়।"
  },
  {
    id: 29,
    title: "Process of Homoeopathic Cure",
    banglaTitle: "হোমিওপ্যাথিক আরোগ্য প্রক্রিয়া",
    text: "Every disease depends on a peculiar morbid derangement of our vital force. When a homoeopathic cure is accomplished, a somewhat stronger, similar artificial morbid affection pushes aside the weaker natural morbid irritation.",
    banglaText: "প্রতিটি রোগ আমাদের জীবনী শক্তির একটি বিশেষ বিশৃঙ্খলার ওপর নির্ভর করে। যখন একটি হোমিওপ্যাথিক আরোগ্য সম্পন্ন হয়, তখন একটি কিছুটা শক্তিশালী, সদৃশ কৃত্রিম রোগ দুর্বল প্রাকৃতিক রোগকে সরিয়ে দেয়।"
  },
  {
    id: 30,
    title: "Medicinal vs Natural Stimuli",
    banglaTitle: "ঔষধি বনাম প্রাকৃতিক উদ্দীপনা",
    text: "The human body appears to admit of being much more powerfully affected in its health by medicines than by natural morbid stimuli.",
    banglaText: "প্রাকৃতিক রোগের উদ্দীপনার চেয়ে ওষুধের মাধ্যমে মানুষের স্বাস্থ্য অনেক বেশি শক্তিশালীভাবে প্রভাবিত হতে পারে বলে মনে হয়।"
  },
  {
    id: 31,
    title: "Susceptibility to Disease",
    banglaTitle: "রোগের প্রতি সংবেদনশীলতা",
    text: "The inimical forces do not possess the power of morbidly deranging the health of man unconditionally; we are made ill only when our organism is sufficiently disposed and susceptible.",
    banglaText: "শত্রুভাবাপন্ন শক্তিগুলো শর্তহীনভাবে মানুষের স্বাস্থ্য নষ্ট করার ক্ষমতা রাখে না; আমরা তখনই অসুস্থ হই যখন আমাদের শরীর যথেষ্ট পরিমাণে সংবেদনশীল থাকে।"
  },
  {
    id: 32,
    title: "Action of Medicines",
    banglaTitle: "ওষুধের ক্রিয়া",
    text: "Every real medicine acts at all times, under all circumstances, on every living human being, and produces in him its peculiar symptoms, if the dose be large enough.",
    banglaText: "প্রতিটি প্রকৃত ওষুধ সব সময়, সব পরিস্থিতিতে, প্রতিটি জীবন্ত মানুষের ওপর কাজ করে এবং তার মধ্যে বিশেষ লক্ষণ তৈরি করে, যদি মাত্রা যথেষ্ট বড় হয়।"
  },
  {
    id: 33,
    title: "Disposition to Medicinal Powers",
    banglaTitle: "ঔষধি শক্তির প্রতি প্রবণতা",
    text: "The living human organism is much more disposed to be acted on by medicinal powers than by morbific noxious agents.",
    banglaText: "জীবন্ত মানুষের শরীর ক্ষতিকারক রোগজীবাণুর চেয়ে ঔষধি শক্তির দ্বারা প্রভাবিত হওয়ার জন্য অনেক বেশি প্রবণ।"
  },
  {
    id: 34,
    title: "Similarity in Cure",
    banglaTitle: "আরোগ্যে সদৃশতা",
    text: "The greater strength of artificial diseases is not the sole cause of cure. It is requisite that they produce an artificial disease as similar as possible to the disease to be cured.",
    banglaText: "কৃত্রিম রোগের অধিক শক্তিই আরোগ্যের একমাত্র কারণ নয়। এটি প্রয়োজনীয় যে তারা নিরাময়যোগ্য রোগের সাথে যতটা সম্ভব সদৃশ একটি কৃত্রিম রোগ তৈরি করবে।"
  },
  {
    id: 35,
    title: "Dissimilar Diseases",
    banglaTitle: "অসদৃশ রোগ",
    text: "Two dissimilar diseases neither cure nor remove one another; the stronger may suspend the weaker temporarily but never annihilates it.",
    banglaText: "দুটি অসদৃশ রোগ একে অপরকে নিরাময় বা দূর করে না; শক্তিশালীটি সাময়িকভাবে দুর্বলটিকে স্থগিত করতে পারে কিন্তু কখনোই নির্মূল করে না।"
  },
  {
    id: 36,
    title: "Repulsion of Dissimilar Disease",
    banglaTitle: "অসদৃশ রোগের বিকর্ষণ",
    text: "If the two dissimilar diseases meeting together be of equal strength, or still more if the older one be the stronger, the new disease will be repelled from the body by the older one and not allowed to affect it.",
    banglaText: "যদি দুটি অসদৃশ রোগ একসাথে মিলিত হয় এবং তাদের শক্তি সমান হয়, অথবা যদি পুরাতনটি বেশি শক্তিশালী হয়, তবে নতুন রোগটি পুরাতনটির দ্বারা শরীর থেকে বিতাড়িত হবে এবং শরীরকে প্রভাবিত করতে পারবে না।"
  },
  {
    id: 37,
    title: "Failure of Allopathic Treatment",
    banglaTitle: "অ্যালোপ্যাথিক চিকিৎসার ব্যর্থতা",
    text: "So also under ordinary medical treatment, an old chronic disease remains uncured and unaltered if it be treated according to the common allopathic method, that is to say, with medicines that are not able to produce in healthy persons a state of health similar to the disease, even though the treatment should last for years and is not of too violent a character.",
    banglaText: "সাধারণ চিকিৎসা পদ্ধতিতে, একটি পুরাতন দীর্ঘস্থায়ী রোগ নিরাময় হয় না যদি এটি সাধারণ অ্যালোপ্যাথিক পদ্ধতিতে চিকিৎসা করা হয়, অর্থাৎ এমন ওষুধ দিয়ে যা সুস্থ মানুষের মধ্যে রোগের সদৃশ অবস্থা তৈরি করতে সক্ষম নয়।"
  },
  {
    id: 38,
    title: "Suspension of Dissimilar Disease",
    banglaTitle: "অসদৃশ রোগের স্থগিতকরণ",
    text: "If the new dissimilar disease be the stronger. In this case the disease under which the patient originally laboured, being the weaker, will be kept back and suspended by the accession of the stronger one, until the latter shall have run its course or been cured, and then the old one reappears uncured.",
    banglaText: "যদি নতুন অসদৃশ রোগটি বেশি শক্তিশালী হয়, তবে রোগীর আগের রোগটি (যা দুর্বল) শক্তিশালী নতুন রোগের আগমনে স্থগিত থাকবে যতক্ষণ না নতুনটি তার গতিপথ শেষ করে বা নিরাময় হয়, এবং তারপর পুরাতনটি আবার ফিরে আসে।"
  },
  {
    id: 39,
    title: "Nature's Inability to Cure by Dissimilars",
    banglaTitle: "অসদৃশ দ্বারা আরোগ্যে প্রকৃতির অক্ষমতা",
    text: "Now the old school has observed all this for many centuries; it has seen that Nature herself cannot cure any existing disease by the accession of another, be it ever so strong, if the new disease be dissimilar to that already present in the body.",
    banglaText: "পুরাতন চিকিৎসা পদ্ধতি বহু শতাব্দী ধরে এটি পর্যবেক্ষণ করেছে; এটি দেখেছে যে প্রকৃতি নিজে অন্য কোনো রোগের আগমনে বিদ্যমান কোনো রোগ নিরাময় করতে পারে না, যদি নতুন রোগটি শরীরে থাকা রোগের অসদৃশ হয়।"
  },
  {
    id: 40,
    title: "Complex Diseases",
    banglaTitle: "জটিল রোগ",
    text: "Or the new disease, after having long acted on the body, joins the old one, which is dissimilar to it, and thence is formed a complex disease, so that each of them occupies a particular locality in the organism, namely, the organs peculiarly adapted for it, and, as it were, only the place specially belonging to it, whilst it leaves the rest to the other dissimilar disease.",
    banglaText: "অথবা নতুন রোগটি দীর্ঘকাল শরীরে কাজ করার পর পুরাতন অসদৃশ রোগের সাথে যুক্ত হয় এবং সেখান থেকে একটি জটিল রোগ তৈরি হয়, যাতে তাদের প্রত্যেকে শরীরের একটি নির্দিষ্ট স্থান দখল করে।"
  },
  {
    id: 41,
    title: "Complication of Diseases",
    banglaTitle: "রোগের জটিলতা",
    text: "In the case of two dissimilar diseases meeting in the organism, the one does not remove the other, but they remain together, each in its own territory.",
    banglaText: "শরীরে দুটি অসদৃশ রোগ মিলিত হলে একটি অন্যটিকে দূর করে না, বরং তারা নিজ নিজ স্থানে একত্রে অবস্থান করে।"
  },
  {
    id: 42,
    title: "Double Diseases",
    banglaTitle: "দ্বৈত রোগ",
    text: "Nature herself allows the coexistence of two (or even more) dissimilar diseases in the same body.",
    banglaText: "প্রকৃতি নিজেই একই শরীরে দুটি (বা তার বেশি) অসদৃশ রোগের সহাবস্থান অনুমোদন করে।"
  },
  {
    id: 43,
    title: "Homoeopathic Cure",
    banglaTitle: "হোমিওপ্যাথিক আরোগ্য",
    text: "But it is quite otherwise with the homoeopathic method. Here the medicine chosen is similar to the disease, and thus the cure is certain.",
    banglaText: "কিন্তু হোমিওপ্যাথিক পদ্ধতিতে বিষয়টি সম্পূর্ণ আলাদা। এখানে নির্বাচিত ওষুধটি রোগের সদৃশ হয়, ফলে আরোগ্য নিশ্চিত হয়।"
  },
  {
    id: 44,
    title: "Annihilation of Disease",
    banglaTitle: "রোগ নির্মূল",
    text: "Two similar diseases can never coexist in the organism; the stronger one always annihilates the weaker one.",
    banglaText: "দুটি সদৃশ রোগ কখনোই শরীরে একত্রে থাকতে পারে না; শক্তিশালীটি সবসময় দুর্বলটিকে নির্মূল করে।"
  },
  {
    id: 45,
    title: "Natural Homoeopathic Cure",
    banglaTitle: "প্রাকৃতিক হোমিওপ্যাথিক আরোগ্য",
    text: "This is the law of nature: a stronger similar dynamic affection permanently extinguishes the weaker one.",
    banglaText: "এটি প্রকৃতির নিয়ম: একটি শক্তিশালী সদৃশ গতিশীল রোগ স্থায়ীভাবে দুর্বলটিকে বিলুপ্ত করে।"
  },
  {
    id: 46,
    title: "Examples of Natural Cure",
    banglaTitle: "প্রাকৃতিক আরোগ্যের উদাহরণ",
    text: "Many examples from history show that one disease was cured by the accidental occurrence of another similar but stronger disease.",
    banglaText: "ইতিহাসের অনেক উদাহরণ দেখায় যে একটি রোগ অন্য একটি সদৃশ কিন্তু শক্তিশালী রোগের আকস্মিক আগমনে নিরাময় হয়েছে।"
  },
  {
    id: 47,
    title: "Nature's Instruction",
    banglaTitle: "প্রকৃতির শিক্ষা",
    text: "Nature herself teaches us the only true way to cure: by using a similar and stronger stimulus.",
    banglaText: "প্রকৃতি নিজেই আমাদের আরোগ্যের একমাত্র সঠিক পথ শেখায়: একটি সদৃশ এবং শক্তিশালী উদ্দীপক ব্যবহারের মাধ্যমে।"
  },
  {
    id: 48,
    title: "The Only True Method",
    banglaTitle: "একমাত্র সঠিক পদ্ধতি",
    text: "Thus, the homoeopathic method is the only one that is based on a law of nature.",
    banglaText: "অতএব, হোমিওপ্যাথিক পদ্ধতিই একমাত্র পদ্ধতি যা প্রকৃতির নিয়মের ওপর ভিত্তি করে প্রতিষ্ঠিত।"
  },
  {
    id: 49,
    title: "Superiority of Homoeopathy",
    banglaTitle: "হোমিওপ্যাথির শ্রেষ্ঠত্ব",
    text: "Homoeopathy is superior because it follows the path that nature itself points out.",
    banglaText: "হোমিওপ্যাথি শ্রেষ্ঠ কারণ এটি সেই পথ অনুসরণ করে যা প্রকৃতি নিজেই নির্দেশ করে।"
  },
  {
    id: 50,
    title: "Small Doses",
    banglaTitle: "ক্ষুদ্র মাত্রা",
    text: "In homoeopathy, we use the smallest possible doses to avoid unnecessary aggravation.",
    banglaText: "হোমিওপ্যাথিতে আমরা অপ্রয়োজনীয় বৃদ্ধি এড়াতে সম্ভাব্য ক্ষুদ্রতম মাত্রা ব্যবহার করি।"
  },
  {
    id: 71,
    title: "Three Points of Cure",
    banglaTitle: "আরোগ্যের তিনটি দিক",
    text: "The operation of cure comprises three points: (I) ascertain what is necessary to know to cure disease; (II) gain knowledge of the pathogenic powers of medicines; (III) employ these artificial morbific agents for cure.",
    banglaText: "আরোগ্য প্রক্রিয়ার তিনটি দিক রয়েছে: (১) রোগ নিরাময়ের জন্য কী জানা প্রয়োজন তা নির্ধারণ করা; (২) ওষুধের রোগসৃজনকারী শক্তি সম্পর্কে জ্ঞান অর্জন করা; (৩) আরোগ্যের জন্য এই কৃত্রিম রোগসৃজনকারী এজেন্টগুলো ব্যবহার করা।"
  },
  {
    id: 72,
    title: "Acute and Chronic Diseases",
    banglaTitle: "তীব্র এবং দীর্ঘস্থায়ী রোগ",
    text: "Diseases are either acute or chronic. Acute diseases are rapid processes, while chronic diseases are slow and often caused by a miasm.",
    banglaText: "রোগ হয় তীব্র অথবা দীর্ঘস্থায়ী। তীব্র রোগগুলো দ্রুত প্রক্রিয়া, আর দীর্ঘস্থায়ী রোগগুলো ধীর এবং প্রায়ই মায়াজমের কারণে হয়।"
  },
  {
    id: 73,
    title: "Acute Diseases",
    banglaTitle: "তীব্র রোগ",
    text: "Acute diseases may be sporadic, endemic, or epidemic.",
    banglaText: "তীব্র রোগগুলো বিক্ষিপ্ত, স্থানিক বা মহামারী হতে পারে।"
  },
  {
    id: 74,
    title: "Medicinal Diseases",
    banglaTitle: "ঔষধি রোগ",
    text: "The most deplorable chronic diseases are those produced by the unskilful treatment of allopathic doctors.",
    banglaText: "সবচেয়ে শোচনীয় দীর্ঘস্থায়ী রোগ হলো সেগুলো যা অ্যালোপ্যাথিক চিকিৎসকদের অদক্ষ চিকিৎসার ফলে তৈরি হয়।"
  },
  {
    id: 75,
    title: "Incurable States",
    banglaTitle: "নিরাময় অযোগ্য অবস্থা",
    text: "These medicinal diseases are often incurable when they have reached a certain height.",
    banglaText: "এই ঔষধি রোগগুলো যখন একটি নির্দিষ্ট পর্যায়ে পৌঁছায়, তখন সেগুলো প্রায়ই নিরাময় অযোগ্য হয়ে পড়ে।"
  },
  {
    id: 76,
    title: "Homoeopathy and Allopathy",
    banglaTitle: "হোমিওপ্যাথি ও অ্যালোপ্যাথি",
    text: "Only homoeopathy can provide relief in these cases, provided the vital force is still strong enough.",
    banglaText: "কেবল হোমিওপ্যাথিই এই ক্ষেত্রে উপশম দিতে পারে, যদি জীবনী শক্তি যথেষ্ট শক্তিশালী থাকে।"
  },
  {
    id: 77,
    title: "Inappropriate Chronic Diseases",
    banglaTitle: "অনুপযুক্ত দীর্ঘস্থায়ী রোগ",
    text: "Diseases caused by bad habits or environment are not true chronic diseases; they disappear when the cause is removed.",
    banglaText: "খারাপ অভ্যাস বা পরিবেশের কারণে সৃষ্ট রোগগুলো প্রকৃত দীর্ঘস্থায়ী রোগ নয়; কারণ দূর করলে সেগুলো চলে যায়।"
  },
  {
    id: 78,
    title: "True Chronic Diseases",
    banglaTitle: "প্রকৃত দীর্ঘস্থায়ী রোগ",
    text: "True chronic diseases are those that arise from a chronic miasm and continue to grow if not cured by specific remedies.",
    banglaText: "প্রকৃত দীর্ঘস্থায়ী রোগ হলো সেগুলো যা দীর্ঘস্থায়ী মায়াজম থেকে উৎপন্ন হয় এবং নির্দিষ্ট ওষুধের মাধ্যমে নিরাময় না হলে বাড়তে থাকে।"
  },
  {
    id: 79,
    title: "Syphilis and Sycosis",
    banglaTitle: "সিফিলিস এবং সাইকোসিস",
    text: "Syphilis and sycosis are two of the chronic miasms.",
    banglaText: "সিফিলিস এবং সাইকোসিস হলো দুটি দীর্ঘস্থায়ী মায়াজম।"
  },
  {
    id: 80,
    title: "Psora",
    banglaTitle: "সোরা",
    text: "Psora is the most ancient and universal chronic miasm, the source of countless diseases.",
    banglaText: "সোরা হলো সবচেয়ে প্রাচীন এবং সর্বজনীন দীর্ঘস্থায়ী মায়াজম, যা অগণিত রোগের উৎস।"
  },
  {
    id: 81,
    title: "Development of Psora",
    banglaTitle: "সোরার বিকাশ",
    text: "Psora has developed over thousands of years into many different forms of disease.",
    banglaText: "সোরা হাজার হাজার বছর ধরে অনেক ভিন্ন ভিন্ন রোগের আকারে বিকশিত হয়েছে।"
  },
  {
    id: 82,
    title: "Individualization",
    banglaTitle: "স্বতন্ত্রীকরণ",
    text: "Every case of disease must be treated as an individual case, with its own unique symptoms.",
    banglaText: "প্রতিটি রোগের কেসকে একটি স্বতন্ত্র কেস হিসেবে বিবেচনা করতে হবে, যার নিজস্ব অনন্য লক্ষণ রয়েছে।"
  },
  {
    id: 83,
    title: "Requirements for Case Taking",
    banglaTitle: "কেস টেকিংয়ের প্রয়োজনীয়তা",
    text: "The physician needs freedom from prejudice, sound senses, and fidelity in tracing the picture of the disease.",
    banglaText: "চিকিৎসকের প্রয়োজন কুসংস্কারমুক্ত মন, সুস্থ ইন্দ্রিয় এবং রোগের চিত্র অঙ্কনে বিশ্বস্ততা।"
  },
  {
    id: 84,
    title: "The Patient's Story",
    banglaTitle: "রোগীর কথা",
    text: "The physician listens to the patient and those around him, without interrupting.",
    banglaText: "চিকিৎসক বাধা না দিয়ে রোগী এবং তার চারপাশের মানুষের কথা শোনেন।"
  },
  {
    id: 105,
    title: "Proving of Medicines",
    banglaTitle: "ওষুধের পরীক্ষণ",
    text: "The pure effects of medicines can only be ascertained by testing them on healthy human beings of both sexes.",
    banglaText: "ওষুধের বিশুদ্ধ প্রভাব কেবল উভয় লিঙ্গের সুস্থ মানুষের ওপর পরীক্ষার মাধ্যমেই নিশ্চিত করা যায়।"
  },
  {
    id: 106,
    title: "Necessity of Proving",
    banglaTitle: "পরীক্ষণের প্রয়োজনীয়তা",
    text: "We must know the pathogenetic effects of every medicine we use.",
    banglaText: "আমাদের ব্যবহৃত প্রতিটি ওষুধের রোগসৃজনকারী প্রভাব আমাদের জানতে হবে।"
  },
  {
    id: 107,
    title: "Healthy Provers",
    banglaTitle: "সুস্থ পরীক্ষক",
    text: "Medicines must be tested on healthy persons to see their true effects.",
    banglaText: "ওষুধের প্রকৃত প্রভাব দেখার জন্য সেগুলো সুস্থ মানুষের ওপর পরীক্ষা করতে হবে।"
  },
  {
    id: 108,
    title: "Hahnemann's Discovery",
    banglaTitle: "হ্যানিম্যানের আবিষ্কার",
    text: "There is no other way to learn the curative power of medicines.",
    banglaText: "ওষুধের আরোগ্যকারী শক্তি জানার আর কোনো উপায় নেই।"
  },
  {
    id: 109,
    title: "Pure Experience",
    banglaTitle: "বিশুদ্ধ অভিজ্ঞতা",
    text: "Only pure experience on the healthy can guide us in the choice of the remedy.",
    banglaText: "কেবল সুস্থ মানুষের ওপর বিশুদ্ধ অভিজ্ঞতাই আমাদের ওষুধ নির্বাচনে সাহায্য করতে পারে।"
  },
  {
    id: 110,
    title: "The Prover's Diet",
    banglaTitle: "পরীক্ষকের পথ্য",
    text: "During the proving, the prover must avoid all medicinal and stimulating substances.",
    banglaText: "পরীক্ষণের সময় পরীক্ষককে সমস্ত ঔষধি এবং উত্তেজক পদার্থ এড়িয়ে চলতে হবে।"
  },
  {
    id: 111,
    title: "Distinctive Symptoms",
    banglaTitle: "স্বতন্ত্র লক্ষণ",
    text: "The symptoms produced by a medicine are its own peculiar and distinctive effects.",
    banglaText: "একটি ওষুধের দ্বারা সৃষ্ট লক্ষণগুলো হলো তার নিজস্ব বিশেষ এবং স্বতন্ত্র প্রভাব।"
  },
  {
    id: 112,
    title: "Small Doses in Proving",
    banglaTitle: "পরীক্ষণে ক্ষুদ্র মাত্রা",
    text: "Even small doses can produce symptoms in very sensitive provers.",
    banglaText: "অত্যন্ত সংবেদনশীল পরীক্ষকদের ক্ষেত্রে ক্ষুদ্র মাত্রাও লক্ষণ তৈরি করতে পারে।"
  },
  {
    id: 113,
    title: "Duration of Action",
    banglaTitle: "ক্রিয়াকাল",
    text: "The duration of action of a medicine can be learned through proving.",
    banglaText: "পরীক্ষণের মাধ্যমে একটি ওষুধের ক্রিয়াকাল জানা যায়।"
  },
  {
    id: 114,
    title: "Primary and Secondary Action",
    banglaTitle: "মুখ্য ও গৌণ ক্রিয়া",
    text: "Every medicine produces a primary action, followed by a secondary action of the vital force.",
    banglaText: "প্রতিটি ওষুধ একটি মুখ্য ক্রিয়া তৈরি করে, যার পরে জীবনী শক্তির একটি গৌণ ক্রিয়া দেখা দেয়।"
  },
  {
    id: 115,
    title: "Alternating Actions",
    banglaTitle: "পর্যায়বৃত্ত ক্রিয়া",
    text: "Some medicines produce alternating states of symptoms.",
    banglaText: "কিছু ওষুধ লক্ষণের পর্যায়বৃত্ত অবস্থা তৈরি করে।"
  },
  {
    id: 116,
    title: "Idiosyncrasies",
    banglaTitle: "ব্যক্তিগত বৈশিষ্ট্য",
    text: "Some symptoms appear only in certain individuals; these are called idiosyncrasies.",
    banglaText: "কিছু লক্ষণ কেবল নির্দিষ্ট ব্যক্তিদের মধ্যে দেখা দেয়; এগুলোকে ব্যক্তিগত বৈশিষ্ট্য বলা হয়।"
  },
  {
    id: 117,
    title: "Universal Effects",
    banglaTitle: "সর্বজনীন প্রভাব",
    text: "Every medicine affects every human being, but the intensity varies.",
    banglaText: "প্রতিটি ওষুধ প্রতিটি মানুষকে প্রভাবিত করে, তবে এর তীব্রতা ভিন্ন হয়।"
  },
  {
    id: 118,
    title: "Specific Effects",
    banglaTitle: "সুনির্দিষ্ট প্রভাব",
    text: "Each medicine has its own specific way of altering health.",
    banglaText: "প্রতিটি ওষুধের স্বাস্থ্যের পরিবর্তন করার নিজস্ব সুনির্দিষ্ট উপায় রয়েছে।"
  },
  {
    id: 119,
    title: "No Substitutes",
    banglaTitle: "কোনো বিকল্প নেই",
    text: "One medicine cannot be substituted for another; each is unique.",
    banglaText: "একটি ওষুধের পরিবর্তে অন্যটি ব্যবহার করা যায় না; প্রতিটি ওষুধ অনন্য।"
  },
  {
    id: 120,
    title: "Careful Observation",
    banglaTitle: "সতর্ক পর্যবেক্ষণ",
    text: "The prover must observe and record every change in health carefully.",
    banglaText: "পরীক্ষককে স্বাস্থ্যের প্রতিটি পরিবর্তন সতর্কতার সাথে পর্যবেক্ষণ এবং রেকর্ড করতে হবে।"
  },
  {
    id: 121,
    title: "Testing on Both Sexes",
    banglaTitle: "উভয় লিঙ্গের ওপর পরীক্ষা",
    text: "Medicines should be tested on both men and women to see the full range of effects.",
    banglaText: "ওষুধের পূর্ণাঙ্গ প্রভাব দেখার জন্য সেগুলো পুরুষ এবং মহিলা উভয়ের ওপর পরীক্ষা করা উচিত।"
  },
  {
    id: 122,
    title: "The Best Prover",
    banglaTitle: "সেরা পরীক্ষক",
    text: "The physician himself is often the best prover, as he can observe his own symptoms accurately.",
    banglaText: "চিকিৎসক নিজেই প্রায়ই সেরা পরীক্ষক হন, কারণ তিনি নিজের লক্ষণগুলো সঠিকভাবে পর্যবেক্ষণ করতে পারেন।"
  },
  {
    id: 123,
    title: "Reliability of Proving",
    banglaTitle: "পরীক্ষণের নির্ভরযোগ্যতা",
    text: "Proving on the healthy is the only reliable way to build a Materia Medica.",
    banglaText: "সুস্থ মানুষের ওপর পরীক্ষণই মেটেরিয়া মেডিকা তৈরির একমাত্র নির্ভরযোগ্য উপায়।"
  },
  {
    id: 124,
    title: "The Totality of Effects",
    banglaTitle: "প্রভাবের সমষ্টি",
    text: "The Materia Medica should contain the totality of symptoms produced by each drug.",
    banglaText: "মেটেরিয়া মেডিকাতে প্রতিটি ওষুধের দ্বারা সৃষ্ট লক্ষণের সমষ্টি থাকা উচিত।"
  },
  {
    id: 125,
    title: "Recording Symptoms",
    banglaTitle: "লক্ষণ রেকর্ড করা",
    text: "Symptoms should be recorded in the prover's own words.",
    banglaText: "লক্ষণগুলো পরীক্ষকের নিজস্ব শব্দে রেকর্ড করা উচিত।"
  },
  {
    id: 126,
    title: "Modality",
    banglaTitle: "হ্রাস-বৃদ্ধি",
    text: "The conditions under which symptoms are better or worse must be noted.",
    banglaText: "লক্ষণগুলো কোন পরিস্থিতিতে কমে বা বাড়ে তা অবশ্যই নোট করতে হবে।"
  },
  {
    id: 127,
    title: "The Dose in Proving",
    banglaTitle: "পরীক্ষণে মাত্রা",
    text: "The dose used in proving should be sufficient to produce symptoms but not cause harm.",
    banglaText: "পরীক্ষণে ব্যবহৃত মাত্রা লক্ষণ তৈরির জন্য যথেষ্ট হওয়া উচিত কিন্তু ক্ষতি করা উচিত নয়।"
  },
  {
    id: 128,
    title: "Repetition in Proving",
    banglaTitle: "পরীক্ষণে পুনরাবৃত্তি",
    text: "The dose may be repeated if no symptoms appear after the first dose.",
    banglaText: "প্রথম মাত্রার পর কোনো লক্ষণ দেখা না দিলে মাত্রা পুনরাবৃত্তি করা যেতে পারে।"
  },
  {
    id: 129,
    title: "Increasing the Dose",
    banglaTitle: "মাত্রা বাড়ানো",
    text: "If necessary, the dose can be increased gradually during proving.",
    banglaText: "প্রয়োজন হলে পরীক্ষণের সময় মাত্রা ধীরে ধীরে বাড়ানো যেতে পারে।"
  },
  {
    id: 130,
    title: "The Full Picture",
    banglaTitle: "পূর্ণাঙ্গ চিত্র",
    text: "The goal of proving is to obtain the full pathogenetic picture of the drug.",
    banglaText: "পরীক্ষণের লক্ষ্য হলো ওষুধের পূর্ণাঙ্গ রোগসৃজনকারী চিত্র পাওয়া।"
  },
  {
    id: 131,
    title: "Individual Sensitivity",
    banglaTitle: "ব্যক্তিগত সংবেদনশীলতা",
    text: "Provers vary in their sensitivity to different drugs.",
    banglaText: "ভিন্ন ভিন্ন ওষুধের প্রতি পরীক্ষকদের সংবেদনশীলতা ভিন্ন হয়।"
  },
  {
    id: 132,
    title: "The Order of Symptoms",
    banglaTitle: "লক্ষণের ক্রম",
    text: "The order in which symptoms appear should be recorded.",
    banglaText: "লক্ষণগুলো যে ক্রমে দেখা দেয় তা রেকর্ড করা উচিত।"
  },
  {
    id: 133,
    title: "The Duration of Proving",
    banglaTitle: "পরীক্ষণের সময়কাল",
    text: "Proving should continue as long as the drug continues to produce symptoms.",
    banglaText: "যতক্ষণ ওষুধ লক্ষণ তৈরি করতে থাকে ততক্ষণ পরীক্ষণ চালিয়ে যাওয়া উচিত।"
  },
  {
    id: 134,
    title: "The Prover's State of Mind",
    banglaTitle: "পরীক্ষকের মানসিক অবস্থা",
    text: "The prover must be in a calm and observant state of mind.",
    banglaText: "পরীক্ষককে শান্ত এবং পর্যবেক্ষণমূলক মানসিক অবস্থায় থাকতে হবে।"
  },
  {
    id: 135,
    title: "The Physician's Role in Proving",
    banglaTitle: "পরীক্ষণে চিকিৎসকের ভূমিকা",
    text: "The physician must supervise the proving and ensure accurate recording.",
    banglaText: "চিকিৎসককে পরীক্ষণ তত্ত্বাবধান করতে হবে এবং সঠিক রেকর্ডিং নিশ্চিত করতে হবে।"
  },
  {
    id: 136,
    title: "The Value of Proving",
    banglaTitle: "পরীক্ষণের মূল্য",
    text: "A well-conducted proving is a permanent contribution to medical science.",
    banglaText: "একটি সুপরিচালিত পরীক্ষণ চিকিৎসা বিজ্ঞানে একটি স্থায়ী অবদান।"
  },
  {
    id: 137,
    title: "Testing on the Sick",
    banglaTitle: "অসুস্থের ওপর পরীক্ষা",
    text: "Testing on the sick is unreliable because the symptoms of the disease mix with the effects of the drug.",
    banglaText: "অসুস্থের ওপর পরীক্ষা করা অনির্ভরযোগ্য কারণ রোগের লক্ষণ ওষুধের প্রভাবের সাথে মিশে যায়।"
  },
  {
    id: 138,
    title: "Pure Materia Medica",
    banglaTitle: "বিশুদ্ধ মেটেরিয়া মেডিকা",
    text: "The Materia Medica Pura contains only the symptoms observed in healthy provers.",
    banglaText: "মেটেরিয়া মেডিকা পিউরা-তে কেবল সুস্থ পরীক্ষকদের মধ্যে পর্যবেক্ষিত লক্ষণগুলো থাকে।"
  },
  {
    id: 139,
    title: "The Physician's Knowledge",
    banglaTitle: "চিকিৎসকের জ্ঞান",
    text: "The physician must know the Materia Medica thoroughly to select the right remedy.",
    banglaText: "সঠিক ওষুধ নির্বাচনের জন্য চিকিৎসককে মেটেরিয়া মেডিকা পুঙ্খানুপুঙ্খভাবে জানতে হবে।"
  },
  {
    id: 140,
    title: "The Choice of Remedy",
    banglaTitle: "ওষুধ নির্বাচন",
    text: "The remedy is chosen by comparing the patient's symptoms with the symptoms in the Materia Medica.",
    banglaText: "রোগীর লক্ষণের সাথে মেটেরিয়া মেডিকার লক্ষণের তুলনা করে ওষুধ নির্বাচন করা হয়।"
  },
  {
    id: 141,
    title: "The Similar Remedy",
    banglaTitle: "সদৃশ ওষুধ",
    text: "The most similar remedy (simillimum) is the one that will cure the patient.",
    banglaText: "সবচেয়ে সদৃশ ওষুধটিই (সিমিলিমাম) রোগীকে আরোগ্য করবে।"
  },
  {
    id: 142,
    title: "The Artificial Disease",
    banglaTitle: "কৃত্রিম রোগ",
    text: "The medicine produces an artificial disease that displaces the natural disease.",
    banglaText: "ওষুধ একটি কৃত্রিম রোগ তৈরি করে যা প্রাকৃতিক রোগকে প্রতিস্থাপন করে।"
  },
  {
    id: 143,
    title: "The Cure",
    banglaTitle: "আরোগ্য",
    text: "When the artificial disease is removed, the patient is restored to health.",
    banglaText: "যখন কৃত্রিম রোগটি দূর হয়, তখন রোগী স্বাস্থ্যে ফিরে আসে।"
  },
  {
    id: 144,
    title: "The Smallest Dose",
    banglaTitle: "ক্ষুদ্রতম মাত্রা",
    text: "The smallest dose is used to minimize the artificial disease and maximize the cure.",
    banglaText: "কৃত্রিম রোগ কমানোর জন্য এবং আরোগ্য বাড়ানোর জন্য ক্ষুদ্রতম মাত্রা ব্যবহার করা হয়।"
  },
  {
    id: 145,
    title: "The Homoeopathic Law",
    banglaTitle: "হোমিওপ্যাথিক নিয়ম",
    text: "Similia Similibus Curentur - let likes be treated by likes.",
    banglaText: "সিমিলিয়া সিমিলিবাস কিউরেন্টার - সদৃশ সদৃশকে আরোগ্য করে।"
  },
  {
    id: 146,
    title: "The Practice of Medicine",
    banglaTitle: "চিকিৎসা অনুশীলন",
    text: "The practice of medicine requires both knowledge and skill in applying the law of cure.",
    banglaText: "চিকিৎসা অনুশীলনের জন্য আরোগ্যের নিয়ম প্রয়োগে জ্ঞান এবং দক্ষতা উভয়ই প্রয়োজন।"
  },
  {
    id: 147,
    title: "The Most Similar Remedy",
    banglaTitle: "সবচেয়ে সদৃশ ওষুধ",
    text: "The most similar remedy is the one that covers the totality of the symptoms.",
    banglaText: "সবচেয়ে সদৃশ ওষুধটি হলো সেটি যা লক্ষণের সমষ্টিকে কভার করে।"
  },
  {
    id: 148,
    title: "The Single Remedy",
    banglaTitle: "একক ওষুধ",
    text: "Only one single, simple medicinal substance should be given at a time.",
    banglaText: "একবারে কেবল একটি একক, সরল ঔষধি পদার্থ দেওয়া উচিত।"
  },
  {
    id: 149,
    title: "The Rapid Cure",
    banglaTitle: "দ্রুত আরোগ্য",
    text: "A well-chosen homoeopathic remedy can produce a rapid and gentle cure.",
    banglaText: "একটি সুনির্বাচিত হোমিওপ্যাথিক ওষুধ দ্রুত এবং মৃদু আরোগ্য তৈরি করতে পারে।"
  },
  {
    id: 150,
    title: "Chronic Diseases",
    banglaTitle: "দীর্ঘস্থায়ী রোগ",
    text: "Chronic diseases require careful management and often a series of remedies.",
    banglaText: "দীর্ঘস্থায়ী রোগের জন্য সতর্ক ব্যবস্থাপনা এবং প্রায়ই ওষুধের একটি সিরিজের প্রয়োজন হয়।"
  },
  {
    id: 151,
    title: "Slight Symptoms",
    banglaTitle: "সামান্য লক্ষণ",
    text: "Slight symptoms do not always require medicinal treatment; diet and lifestyle changes may suffice.",
    banglaText: "সামান্য লক্ষণের জন্য সবসময় ঔষধি চিকিৎসার প্রয়োজন হয় না; পথ্য এবং জীবনযাত্রার পরিবর্তনই যথেষ্ট হতে পারে।"
  },
  {
    id: 152,
    title: "Acute Diseases",
    banglaTitle: "তীব্র রোগ",
    text: "In acute diseases, the symptoms are more prominent and the choice of remedy is often easier.",
    banglaText: "তীব্র রোগে লক্ষণগুলো বেশি স্পষ্ট হয় এবং ওষুধ নির্বাচন প্রায়ই সহজ হয়।"
  },
  {
    id: 153,
    title: "Characteristic Symptoms",
    banglaTitle: "চারিত্রিক লক্ষণ",
    text: "The most striking, singular, uncommon and peculiar (characteristic) symptoms are the most important for selecting the remedy.",
    banglaText: "সবচেয়ে আকর্ষণীয়, একক, অস্বাভাবিক এবং বিশেষ (চারিত্রিক) লক্ষণগুলো ওষুধ নির্বাচনের জন্য সবচেয়ে গুরুত্বপূর্ণ।"
  },
  {
    id: 154,
    title: "The Homoeopathic Aggravation",
    banglaTitle: "হোমিওপ্যাথিক বৃদ্ধি",
    text: "A slight aggravation of symptoms may occur after the first dose; this is a good sign of the right remedy.",
    banglaText: "প্রথম মাত্রার পর লক্ষণের সামান্য বৃদ্ধি হতে পারে; এটি সঠিক ওষুধের একটি ভালো লক্ষণ।"
  },
  {
    id: 155,
    title: "The Amelioration",
    banglaTitle: "উপশম",
    text: "The aggravation is followed by a period of amelioration and restoration of health.",
    banglaText: "বৃদ্ধির পরে উপশম এবং স্বাস্থ্যের পুনরুদ্ধারের সময়কাল আসে।"
  },
  {
    id: 156,
    title: "The Dose in Acute Disease",
    banglaTitle: "তীব্র রোগে মাত্রা",
    text: "In acute diseases, the dose may need to be repeated more frequently.",
    banglaText: "তীব্র রোগে মাত্রা আরও ঘন ঘন পুনরাবৃত্তি করার প্রয়োজন হতে পারে।"
  },
  {
    id: 157,
    title: "The Dose in Chronic Disease",
    banglaTitle: "দীর্ঘস্থায়ী রোগে মাত্রা",
    text: "In chronic diseases, the dose is usually given at longer intervals.",
    banglaText: "দীর্ঘস্থায়ী রোগে মাত্রা সাধারণত দীর্ঘ বিরতিতে দেওয়া হয়।"
  },
  {
    id: 158,
    title: "The Wrong Remedy",
    banglaTitle: "ভুল ওষুধ",
    text: "If the wrong remedy is chosen, new symptoms may appear; these must be carefully noted.",
    banglaText: "যদি ভুল ওষুধ নির্বাচন করা হয়, তবে নতুন লক্ষণ দেখা দিতে পারে; এগুলো সতর্কতার সাথে নোট করতে হবে।"
  },
  {
    id: 159,
    title: "Correcting the Choice",
    banglaTitle: "নির্বাচন সংশোধন করা",
    text: "If the first remedy was not correct, a new remedy must be selected based on the updated totality of symptoms.",
    banglaText: "যদি প্রথম ওষুধটি সঠিক না হয়, তবে লক্ষণের আপডেটেড সমষ্টির ভিত্তিতে একটি নতুন ওষুধ নির্বাচন করতে হবে।"
  },
  {
    id: 160,
    title: "The Progress of Cure",
    banglaTitle: "আরোগ্যের অগ্রগতি",
    text: "The physician must monitor the progress of cure and adjust the treatment as needed.",
    banglaText: "চিকিৎসককে আরোগ্যের অগ্রগতি পর্যবেক্ষণ করতে হবে এবং প্রয়োজন অনুযায়ী চিকিৎসা সমন্বয় করতে হবে।"
  },
  {
    id: 161,
    title: "The Homoeopathic Aggravation in Chronic Disease",
    banglaTitle: "দীর্ঘস্থায়ী রোগে হোমিওপ্যাথিক বৃদ্ধি",
    text: "In chronic diseases, the aggravation may appear later and last longer.",
    banglaText: "দীর্ঘস্থায়ী রোগে বৃদ্ধি দেরিতে দেখা দিতে পারে এবং দীর্ঘকাল স্থায়ী হতে পারে।"
  },
  {
    id: 162,
    title: "Partial Remedies",
    banglaTitle: "আংশিক ওষুধ",
    text: "If only a few symptoms are covered by the remedy, it is a partial remedy.",
    banglaText: "যদি ওষুধের মাধ্যমে কেবল কয়েকটি লক্ষণ কভার করা হয়, তবে সেটি একটি আংশিক ওষুধ।"
  },
  {
    id: 163,
    title: "The Effect of Partial Remedies",
    banglaTitle: "আংশিক ওষুধের প্রভাব",
    text: "A partial remedy may still produce some improvement, but it will not complete the cure.",
    banglaText: "একটি আংশিক ওষুধ কিছুটা উন্নতি করতে পারে, কিন্তু এটি আরোগ্য সম্পন্ন করবে না।"
  },
  {
    id: 164,
    title: "Selecting the Next Remedy",
    banglaTitle: "পরবর্তী ওষুধ নির্বাচন",
    text: "After a partial remedy, a new remedy must be chosen based on the remaining symptoms.",
    banglaText: "আংশিক ওষুধের পর অবশিষ্ট লক্ষণের ভিত্তিতে একটি নতুন ওষুধ নির্বাচন করতে হবে।"
  },
  {
    id: 165,
    title: "Incomplete Totality",
    banglaTitle: "অসম্পূর্ণ সমষ্টি",
    text: "If the totality of symptoms is incomplete, the choice of remedy will be difficult.",
    banglaText: "যদি লক্ষণের সমষ্টি অসম্পূর্ণ হয়, তবে ওষুধ নির্বাচন কঠিন হবে।"
  },
  {
    id: 166,
    title: "The Physician's Skill",
    banglaTitle: "চিকিৎসকের দক্ষতা",
    text: "The skill of the physician lies in obtaining a complete picture of the disease.",
    banglaText: "চিকিৎসকের দক্ষতা রোগের একটি পূর্ণাঙ্গ চিত্র পাওয়ার মধ্যে নিহিত।"
  },
  {
    id: 167,
    title: "Acute Diseases with Few Symptoms",
    banglaTitle: "অল্প লক্ষণযুক্ত তীব্র রোগ",
    text: "In acute diseases with few symptoms, the most characteristic one must guide the choice.",
    banglaText: "অল্প লক্ষণযুক্ত তীব্র রোগে সবচেয়ে চারিত্রিক লক্ষণটিই নির্বাচনকে নির্দেশ করবে।"
  },
  {
    id: 168,
    title: "The Second Remedy",
    banglaTitle: "দ্বিতীয় ওষুধ",
    text: "The second remedy should be chosen only after the action of the first has ceased.",
    banglaText: "প্রথম ওষুধের ক্রিয়া শেষ হওয়ার পরেই কেবল দ্বিতীয় ওষুধটি নির্বাচন করা উচিত।"
  },
  {
    id: 169,
    title: "Complementary Remedies",
    banglaTitle: "পরিপূরক ওষুধ",
    text: "Some remedies complement each other and work well in sequence.",
    banglaText: "কিছু ওষুধ একে অপরের পরিপূরক এবং পর্যায়ক্রমে ভালো কাজ করে।"
  },
  {
    id: 170,
    title: "The Goal of Treatment",
    banglaTitle: "চিকিৎসার লক্ষ্য",
    text: "The goal is to remove all symptoms and restore the patient to perfect health.",
    banglaText: "লক্ষ্য হলো সমস্ত লক্ষণ দূর করা এবং রোগীকে নিখুঁত স্বাস্থ্যে ফিরিয়ে আনা।"
  },
  {
    id: 171,
    title: "Chronic Miasms",
    banglaTitle: "দীর্ঘস্থায়ী মায়াজম",
    text: "In chronic diseases, the underlying miasm must be addressed.",
    banglaText: "দীর্ঘস্থায়ী রোগে অন্তর্নিহিত মায়াজমকে মোকাবিলা করতে হবে।"
  },
  {
    id: 172,
    title: "One-Sided Diseases",
    banglaTitle: "একতরফা রোগ",
    text: "One-sided diseases are those with very few symptoms, making them difficult to treat.",
    banglaText: "একতরফা রোগ হলো সেগুলো যেগুলোতে খুব কম লক্ষণ থাকে, যা সেগুলোকে চিকিৎসা করা কঠিন করে তোলে।"
  },
  {
    id: 173,
    title: "Internal One-Sided Diseases",
    banglaTitle: "অভ্যন্তরীণ একতরফা রোগ",
    text: "Internal one-sided diseases often have only one or two prominent symptoms.",
    banglaText: "অভ্যন্তরীণ একতরফা রোগে প্রায়ই কেবল এক বা দুটি প্রধান লক্ষণ থাকে।"
  },
  {
    id: 174,
    title: "External One-Sided Diseases",
    banglaTitle: "বাহ্যিক একতরফা রোগ",
    text: "External one-sided diseases are those where the symptoms appear mainly on the surface.",
    banglaText: "বাহ্যিক একতরফা রোগ হলো সেগুলো যেখানে লক্ষণগুলো প্রধানত উপরিভাগে দেখা দেয়।"
  },
  {
    id: 175,
    title: "The Choice in One-Sided Diseases",
    banglaTitle: "একতরফা রোগে নির্বাচন",
    text: "In these cases, the physician must search for hidden symptoms to complete the picture.",
    banglaText: "এই ক্ষেত্রে চিকিৎসককে চিত্রটি পূর্ণ করতে লুকানো লক্ষণগুলো খুঁজতে হবে।"
  },
  {
    id: 176,
    title: "The Effect of the Remedy",
    banglaTitle: "ওষুধের প্রভাব",
    text: "The remedy may bring out hidden symptoms, which then help in the further choice of treatment.",
    banglaText: "ওষুধ লুকানো লক্ষণগুলোকে সামনে আনতে পারে, যা পরবর্তীতে চিকিৎসার নির্বাচনে সাহায্য করে।"
  },
  {
    id: 177,
    title: "The Totality in One-Sided Cases",
    banglaTitle: "একতরফা কেসে সমষ্টি",
    text: "The totality is built up as more symptoms are revealed during treatment.",
    banglaText: "চিকিৎসার সময় আরও লক্ষণ প্রকাশিত হওয়ার সাথে সাথে সমষ্টি তৈরি হয়।"
  },
  {
    id: 178,
    title: "Local Maladies",
    banglaTitle: "স্থানীয় ব্যাধি",
    text: "Local maladies are those that appear on external parts of the body.",
    banglaText: "স্থানীয় ব্যাধি হলো সেগুলো যা শরীরের বাহ্যিক অংশে দেখা দেয়।"
  },
  {
    id: 179,
    title: "The Nature of Local Maladies",
    banglaTitle: "স্থানীয় ব্যাধির প্রকৃতি",
    text: "Local maladies are almost always manifestations of an internal, dynamic disease.",
    banglaText: "স্থানীয় ব্যাধিগুলো প্রায় সবসময়ই একটি অভ্যন্তরীণ, গতিশীল রোগের বহিঃপ্রকাশ।"
  },
  {
    id: 180,
    title: "Internal Treatment for Local Maladies",
    banglaTitle: "স্থানীয় ব্যাধির অভ্যন্তরীণ চিকিৎসা",
    text: "Local maladies must be treated with internal remedies that address the whole organism.",
    banglaText: "স্থানীয় ব্যাধিগুলোকে অভ্যন্তরীণ ওষুধের মাধ্যমে চিকিৎসা করতে হবে যা সমগ্র শরীরকে মোকাবিলা করে।"
  },
  {
    id: 181,
    title: "The Danger of Local Applications",
    banglaTitle: "স্থানীয় প্রয়োগের বিপদ",
    text: "Applying medicines locally to a surface symptom can suppress it and drive the disease deeper.",
    banglaText: "একটি উপরিভাগের লক্ষণে স্থানীয়ভাবে ওষুধ প্রয়োগ করলে তা দমিত হতে পারে এবং রোগকে আরও গভীরে নিয়ে যেতে পারে।"
  },
  {
    id: 182,
    title: "Suppression",
    banglaTitle: "দমন",
    text: "Suppression of a local symptom makes the internal disease more difficult to cure.",
    banglaText: "একটি স্থানীয় লক্ষণের দমন অভ্যন্তরীণ রোগ নিরাময় করা আরও কঠিন করে তোলে।"
  },
  {
    id: 183,
    title: "The True Cure of Local Maladies",
    banglaTitle: "স্থানীয় ব্যাধির প্রকৃত আরোগ্য",
    text: "The true cure is achieved when the internal disease is removed by internal homoeopathic remedies.",
    banglaText: "প্রকৃত আরোগ্য তখনই অর্জিত হয় যখন অভ্যন্তরীণ রোগটি অভ্যন্তরীণ হোমিওপ্যাথিক ওষুধের মাধ্যমে দূর হয়।"
  },
  {
    id: 184,
    title: "The Disappearance of Local Symptoms",
    banglaTitle: "স্থানীয় লক্ষণের অন্তর্ধান",
    text: "When the internal disease is cured, the local symptom disappears spontaneously.",
    banglaText: "যখন অভ্যন্তরীণ রোগটি নিরাময় হয়, তখন স্থানীয় লক্ষণটি স্বতঃস্ফূর্তভাবে অদৃশ্য হয়ে যায়।"
  },
  {
    id: 185,
    title: "Surgical Cases",
    banglaTitle: "সার্জিক্যাল কেস",
    text: "Only purely mechanical injuries require surgical intervention; their effects still need dynamic treatment.",
    banglaText: "কেবল বিশুদ্ধ যান্ত্রিক আঘাতের জন্য সার্জিক্যাল হস্তক্ষেপ প্রয়োজন; তাদের প্রভাবের জন্য এখনও গতিশীল চিকিৎসার প্রয়োজন হয়।"
  },
  {
    id: 186,
    title: "External Injuries",
    banglaTitle: "বাহ্যিক আঘাত",
    text: "External injuries that affect the whole body must be treated with internal remedies.",
    banglaText: "বাহ্যিক আঘাত যা সমগ্র শরীরকে প্রভাবিত করে সেগুলোকে অভ্যন্তরীণ ওষুধের মাধ্যমে চিকিৎসা করতে হবে।"
  },
  {
    id: 187,
    title: "Mental Diseases",
    banglaTitle: "মানসিক রোগ",
    text: "Mental and emotional diseases are also dynamic in nature and must be treated homoeopathically.",
    banglaText: "মানসিক এবং আবেগীয় রোগগুলোও প্রকৃতিগতভাবে গতিশীল এবং সেগুলোকে অবশ্যই হোমিওপ্যাথিক উপায়ে চিকিৎসা করতে হবে।"
  },
  {
    id: 188,
    title: "The Origin of Mental Diseases",
    banglaTitle: "মানসিক রোগের উৎস",
    text: "Most mental diseases are developments of physical diseases that have become one-sided.",
    banglaText: "অধিকাংশ মানসিক রোগ হলো শারীরিক রোগের বিকাশ যা একতরফা হয়ে গেছে।"
  },
  {
    id: 189,
    title: "The Totality in Mental Diseases",
    banglaTitle: "মানসিক রোগে সমষ্টি",
    text: "The totality must include both the mental symptoms and the previous physical symptoms.",
    banglaText: "সমষ্টিতে অবশ্যই মানসিক লক্ষণ এবং পূর্ববর্তী শারীরিক লক্ষণ উভয়ই থাকতে হবে।"
  },
  {
    id: 190,
    title: "The Choice of Remedy in Mental Disease",
    banglaTitle: "মানসিক রোগে ওষুধ নির্বাচন",
    text: "The remedy must cover the peculiar mental state of the patient.",
    banglaText: "ওষুধটি অবশ্যই রোগীর বিশেষ মানসিক অবস্থাকে কভার করবে।"
  },
  {
    id: 191,
    title: "The Observation of Mental Symptoms",
    banglaTitle: "মানসিক লক্ষণ পর্যবেক্ষণ",
    text: "The physician must observe the patient's behavior, disposition, and way of thinking carefully.",
    banglaText: "চিকিৎসককে রোগীর আচরণ, মেজাজ এবং চিন্তা করার ধরণ সতর্কতার সাথে পর্যবেক্ষণ করতে হবে।"
  },
  {
    id: 192,
    title: "The Effect of the Remedy on Mind",
    banglaTitle: "মনের ওপর ওষুধের প্রভাব",
    text: "A well-chosen remedy will produce a rapid improvement in the patient's mental state.",
    banglaText: "একটি সুনির্বাচিত ওষুধ রোগীর মানসিক অবস্থায় দ্রুত উন্নতি ঘটাবে।"
  },
  {
    id: 193,
    title: "The Restoration of Health",
    banglaTitle: "স্বাস্থ্যের পুনরুদ্ধার",
    text: "As the mind improves, the physical health also returns to normal.",
    banglaText: "মন উন্নত হওয়ার সাথে সাথে শারীরিক স্বাস্থ্যও স্বাভাবিক অবস্থায় ফিরে আসে।"
  },
  {
    id: 194,
    title: "Acute Mental Diseases",
    banglaTitle: "তীব্র মানসিক রোগ",
    text: "Acute mental diseases caused by fright or grief may require immediate treatment.",
    banglaText: "ভয় বা শোকের কারণে সৃষ্ট তীব্র মানসিক রোগের জন্য তাৎক্ষণিক চিকিৎসার প্রয়োজন হতে পারে।"
  },
  {
    id: 195,
    title: "Chronic Mental Diseases",
    banglaTitle: "দীর্ঘস্থায়ী মানসিক রোগ",
    text: "Chronic mental diseases are usually based on a miasm and require anti-miasmatic treatment.",
    banglaText: "দীর্ঘস্থায়ী মানসিক রোগ সাধারণত মায়াজমের ওপর ভিত্তি করে হয় এবং অ্যান্টি-মায়াজমেটিক চিকিৎসার প্রয়োজন হয়।"
  },
  {
    id: 196,
    title: "The Environment in Mental Disease",
    banglaTitle: "মানসিক রোগে পরিবেশ",
    text: "A supportive environment is important for the recovery of mental patients.",
    banglaText: "মানসিক রোগীদের পুনরুদ্ধারের জন্য একটি সহায়ক পরিবেশ গুরুত্বপূর্ণ।"
  },
  {
    id: 197,
    title: "The Physician's Conduct",
    banglaTitle: "চিকিৎসকের আচরণ",
    text: "The physician must treat mental patients with kindness, patience, and firmness.",
    banglaText: "চিকিৎসককে মানসিক রোগীদের সাথে দয়া, ধৈর্য এবং দৃঢ়তার সাথে আচরণ করতে হবে।"
  },
  {
    id: 198,
    title: "Intermittent Diseases",
    banglaTitle: "পর্যায়বৃত্ত রোগ",
    text: "Intermittent diseases are those that return at regular intervals.",
    banglaText: "পর্যায়বৃত্ত রোগ হলো সেগুলো যা নিয়মিত বিরতিতে ফিরে আসে।"
  },
  {
    id: 199,
    title: "The Nature of Intermittent Diseases",
    banglaTitle: "পর্যায়বৃত্ত রোগের প্রকৃতি",
    text: "Intermittent diseases are often manifestations of psora, sometimes combined with syphilis or sycosis.",
    banglaText: "পর্যায়বৃত্ত রোগগুলো প্রায়ই সোরার বহিঃপ্রকাশ, কখনও কখনও সিফিলিস বা সাইকোসিসের সাথে যুক্ত।"
  },
  {
    id: 200,
    title: "The Treatment of Intermittent Fevers",
    banglaTitle: "পর্যায়বৃত্ত জ্বরের চিকিৎসা",
    text: "The remedy must be chosen based on the totality of symptoms observed during the paroxysm and the interval.",
    banglaText: "আক্রমণ এবং বিরতির সময় পর্যবেক্ষিত লক্ষণের সমষ্টির ভিত্তিতে ওষুধ নির্বাচন করতে হবে।"
  },
  {
    id: 201,
    title: "The Time of Administration",
    banglaTitle: "প্রয়োগের সময়",
    text: "The remedy is best given shortly after the end of the paroxysm.",
    banglaText: "আক্রমণ শেষ হওয়ার অল্প সময় পরেই ওষুধ দেওয়া সবচেয়ে ভালো।"
  },
  {
    id: 202,
    title: "The Effect of the Remedy",
    banglaTitle: "ওষুধের প্রভাব",
    text: "The right remedy will prevent the return of the paroxysm or make it much milder.",
    banglaText: "সঠিক ওষুধ আক্রমণের পুনরাবৃত্তি রোধ করবে অথবা এটিকে অনেক মৃদু করে তুলবে।"
  },
  {
    id: 203,
    title: "Epidemic Intermittent Fevers",
    banglaTitle: "মহামারী পর্যায়বৃত্ত জ্বর",
    text: "In epidemic fevers, the same remedy may often be used for many patients.",
    banglaText: "মহামারী জ্বরে অনেক রোগীর জন্য প্রায়ই একই ওষুধ ব্যবহার করা যেতে পারে।"
  },
  {
    id: 204,
    title: "Chronic Intermittent Diseases",
    banglaTitle: "দীর্ঘস্থায়ী পর্যায়বৃত্ত রোগ",
    text: "Chronic intermittent diseases require deep-acting anti-psoric remedies.",
    banglaText: "দীর্ঘস্থায়ী পর্যায়বৃত্ত রোগের জন্য গভীর ক্রিয়াশীল অ্যান্টি-সোরিক ওষুধের প্রয়োজন হয়।"
  },
  {
    id: 205,
    title: "Alternating Diseases",
    banglaTitle: "পরিবর্তনশীল রোগ",
    text: "Alternating diseases are those where two different states of symptoms alternate with each other.",
    banglaText: "পরিবর্তনশীল রোগ হলো সেগুলো যেখানে লক্ষণের দুটি ভিন্ন অবস্থা একে অপরের সাথে পরিবর্তিত হয়।"
  },
  {
    id: 206,
    title: "The Totality in Alternating Diseases",
    banglaTitle: "পরিবর্তনশীল রোগে সমষ্টি",
    text: "The remedy must cover both states of the alternating disease.",
    banglaText: "ওষুধটি অবশ্যই পরিবর্তনশীল রোগের উভয় অবস্থাকে কভার করবে।"
  },
  {
    id: 207,
    title: "The History of the Patient",
    banglaTitle: "রোগীর ইতিহাস",
    text: "The physician must take a careful history of the patient's previous illnesses and treatments.",
    banglaText: "চিকিৎসককে রোগীর পূর্ববর্তী অসুস্থতা এবং চিকিৎসার একটি সতর্ক ইতিহাস নিতে হবে।"
  },
  {
    id: 208,
    title: "The Investigation of Miasms",
    banglaTitle: "মায়াজম অনুসন্ধান",
    text: "The physician must investigate the presence of chronic miasms in the patient and his family.",
    banglaText: "চিকিৎসককে রোগী এবং তার পরিবারের মধ্যে দীর্ঘস্থায়ী মায়াজমের উপস্থিতি অনুসন্ধান করতে হবে।"
  },
  {
    id: 209,
    title: "The Case Taking in Chronic Disease",
    banglaTitle: "দীর্ঘস্থায়ী রোগে কেস টেকিং",
    text: "Case taking in chronic disease requires great patience and attention to detail.",
    banglaText: "দীর্ঘস্থায়ী রোগে কেস টেকিংয়ের জন্য অনেক ধৈর্য এবং খুঁটিনাটি বিষয়ের প্রতি মনোযোগ প্রয়োজন।"
  },
  {
    id: 210,
    title: "The Mental State in Chronic Disease",
    banglaTitle: "দীর্ঘস্থায়ী রোগে মানসিক অবস্থা",
    text: "The mental state is of paramount importance in the treatment of chronic diseases.",
    banglaText: "দীর্ঘস্থায়ী রোগের চিকিৎসায় মানসিক অবস্থা অত্যন্ত গুরুত্বপূর্ণ।"
  },
  {
    id: 211,
    title: "Mental Symptoms in All Diseases",
    banglaTitle: "সমস্ত রোগে মানসিক লক্ষণ",
    text: "In every case of disease, the state of the patient's mind and disposition is a key factor.",
    banglaText: "রোগের প্রতিটি ক্ষেত্রে রোগীর মানসিক অবস্থা এবং মেজাজ একটি মূল কারণ।"
  },
  {
    id: 212,
    title: "The Effect of Medicines on Mind",
    banglaTitle: "মনের ওপর ওষুধের প্রভাব",
    text: "Every medicine also alters the state of mind and disposition in its own peculiar way.",
    banglaText: "প্রতিটি ওষুধ তার নিজস্ব বিশেষ উপায়ে মানসিক অবস্থা এবং মেজাজ পরিবর্তন করে।"
  },
  {
    id: 213,
    title: "The Importance of Mental Symptoms",
    banglaTitle: "মানসিক লক্ষণের গুরুত্ব",
    text: "We can never cure homoeopathically if we do not attend to the mental symptoms.",
    banglaText: "আমরা যদি মানসিক লক্ষণের প্রতি মনোযোগ না দিই তবে আমরা কখনোই হোমিওপ্যাথিক উপায়ে আরোগ্য করতে পারব না।"
  },
  {
    id: 214,
    title: "The Treatment of Mental Diseases",
    banglaTitle: "মানসিক রোগের চিকিৎসা",
    text: "Mental diseases are treated according to the same principles as other diseases.",
    banglaText: "মানসিক রোগগুলো অন্যান্য রোগের মতো একই নীতি অনুযায়ী চিকিৎসা করা হয়।"
  },
  {
    id: 215,
    title: "Mental Disease as a Somatic Disease",
    banglaTitle: "শারীরিক রোগ হিসেবে মানসিক রোগ",
    text: "Most mental diseases are physical diseases where the symptoms have shifted to the mind.",
    banglaText: "অধিকাংশ মানসিক রোগ হলো শারীরিক রোগ যেখানে লক্ষণগুলো মনে স্থানান্তরিত হয়েছে।"
  },
  {
    id: 216,
    title: "The Transformation of Disease",
    banglaTitle: "রোগের রূপান্তর",
    text: "A physical disease can be transformed into a mental disease as it becomes more chronic.",
    banglaText: "একটি শারীরিক রোগ আরও দীর্ঘস্থায়ী হওয়ার সাথে সাথে মানসিক রোগে রূপান্তরিত হতে পারে।"
  },
  {
    id: 217,
    title: "The Totality in Mental Cases",
    banglaTitle: "মানসিক কেসে সমষ্টি",
    text: "The totality must include the previous physical symptoms to find the right remedy.",
    banglaText: "সঠিক ওষুধ খুঁজে পেতে সমষ্টিতে অবশ্যই পূর্ববর্তী শারীরিক লক্ষণগুলো অন্তর্ভুক্ত করতে হবে।"
  },
  {
    id: 218,
    title: "The Physical Basis of Mental Disease",
    banglaTitle: "মানসিক রোগের শারীরিক ভিত্তি",
    text: "The physical symptoms often remain in a subtle form even when the mental symptoms dominate.",
    banglaText: "মানসিক লক্ষণগুলো প্রধান হলেও শারীরিক লক্ষণগুলো প্রায়ই সূক্ষ্ম আকারে থেকে যায়।"
  },
  {
    id: 219,
    title: "The Choice of Remedy",
    banglaTitle: "ওষুধ নির্বাচন",
    text: "The remedy must cover both the mental and the physical symptoms of the case.",
    banglaText: "ওষুধটি অবশ্যই কেসের মানসিক এবং শারীরিক উভয় লক্ষণকে কভার করবে।"
  },
  {
    id: 220,
    title: "The Observation of the Patient",
    banglaTitle: "রোগী পর্যবেক্ষণ",
    text: "The physician must observe the patient's behavior and disposition very carefully.",
    banglaText: "চিকিৎসককে রোগীর আচরণ এবং মেজাজ খুব সতর্কতার সাথে পর্যবেক্ষণ করতে হবে।"
  },
  {
    id: 221,
    title: "Acute Insanity",
    banglaTitle: "তীব্র উন্মাদনা",
    text: "Acute insanity arising from a sudden cause may require immediate, specific treatment.",
    banglaText: "আকস্মিক কোনো কারণে সৃষ্ট তীব্র উন্মাদনার জন্য তাৎক্ষণিক, সুনির্দিষ্ট চিকিৎসার প্রয়োজন হতে পারে।"
  },
  {
    id: 222,
    title: "The Recovery from Acute Insanity",
    banglaTitle: "তীব্র উন্মাদনা থেকে মুক্তি",
    text: "After recovery from acute insanity, anti-psoric treatment is usually needed to prevent relapse.",
    banglaText: "তীব্র উন্মাদনা থেকে মুক্তির পর পুনরাবৃত্তি রোধ করতে সাধারণত অ্যান্টি-সোরিক চিকিৎসার প্রয়োজন হয়।"
  },
  {
    id: 223,
    title: "Chronic Insanity",
    banglaTitle: "দীর্ঘস্থায়ী উন্মাদনা",
    text: "Chronic insanity is always based on a miasm and requires prolonged treatment.",
    banglaText: "দীর্ঘস্থায়ী উন্মাদনা সবসময় মায়াজমের ওপর ভিত্তি করে হয় এবং দীর্ঘস্থায়ী চিকিৎসার প্রয়োজন হয়।"
  },
  {
    id: 224,
    title: "Mental Diseases from Emotional Causes",
    banglaTitle: "আবেগীয় কারণে মানসিক রোগ",
    text: "Mental diseases caused by emotional factors like grief or worry still need medicinal treatment.",
    banglaText: "শোক বা উদ্বেগের মতো আবেগীয় কারণে সৃষ্ট মানসিক রোগের জন্যও ঔষধি চিকিৎসার প্রয়োজন হয়।"
  },
  {
    id: 225,
    title: "The Role of the Physician's Attitude",
    banglaTitle: "চিকিৎসকের দৃষ্টিভঙ্গির ভূমিকা",
    text: "The physician's attitude can greatly influence the recovery of a mental patient.",
    banglaText: "চিকিৎসকের দৃষ্টিভঙ্গি মানসিক রোগীর পুনরুদ্ধারে অনেক প্রভাব ফেলতে পারে।"
  },
  {
    id: 226,
    title: "Psychological Treatment",
    banglaTitle: "মনস্তাত্ত্বিক চিকিৎসা",
    text: "Psychological support and a calm environment are essential complements to medicinal treatment.",
    banglaText: "মনস্তাত্ত্বিক সমর্থন এবং একটি শান্ত পরিবেশ ঔষধি চিকিৎসার অপরিহার্য পরিপূরক।"
  },
  {
    id: 227,
    title: "The Management of Insane Patients",
    banglaTitle: "উন্মাদ রোগীদের ব্যবস্থাপনা",
    text: "Insane patients must be managed with firmness but without any form of punishment or cruelty.",
    banglaText: "উন্মাদ রোগীদের দৃঢ়তার সাথে পরিচালনা করতে হবে তবে কোনো প্রকার শাস্তি বা নিষ্ঠুরতা ছাড়াই।"
  },
  {
    id: 228,
    title: "The Diet in Mental Disease",
    banglaTitle: "মানসিক রোগে পথ্য",
    text: "A proper diet and lifestyle are important for the success of the treatment.",
    banglaText: "চিকিৎসার সাফল্যের জন্য সঠিক পথ্য এবং জীবনযাত্রা গুরুত্বপূর্ণ।"
  },
  {
    id: 229,
    title: "The Progress of Treatment",
    banglaTitle: "চিকিৎসার অগ্রগতি",
    text: "The physician must be patient and not change the remedy too frequently.",
    banglaText: "চিকিৎসককে ধৈর্যশীল হতে হবে এবং খুব ঘন ঘন ওষুধ পরিবর্তন করা যাবে না।"
  },
  {
    id: 230,
    title: "The Signs of Recovery",
    banglaTitle: "পুনরুদ্ধারের লক্ষণ",
    text: "Improvement in the mental state is the first sign of a correct remedy.",
    banglaText: "মানসিক অবস্থার উন্নতি হলো সঠিক ওষুধের প্রথম লক্ষণ।"
  },
  {
    id: 231,
    title: "Intermittent Diseases",
    banglaTitle: "পর্যায়বৃত্ত রোগ",
    text: "Intermittent diseases are those that return at regular intervals.",
    banglaText: "পর্যায়বৃত্ত রোগ হলো সেগুলো যা নিয়মিত বিরতিতে ফিরে আসে।"
  },
  {
    id: 232,
    title: "The Nature of Intermittent Diseases",
    banglaTitle: "পর্যায়বৃত্ত রোগের প্রকৃতি",
    text: "Intermittent diseases are often manifestations of psora.",
    banglaText: "পর্যায়বৃত্ত রোগগুলো প্রায়ই সোরার বহিঃপ্রকাশ।"
  },
  {
    id: 233,
    title: "Typical Intermittent Fevers",
    banglaTitle: "সাধারণ পর্যায়বৃত্ত জ্বর",
    text: "Typical intermittent fevers have regular stages of chill, heat, and sweat.",
    banglaText: "সাধারণ পর্যায়বৃত্ত জ্বরে শীত, তাপ এবং ঘামের নিয়মিত পর্যায় থাকে।"
  },
  {
    id: 234,
    title: "The Treatment of Intermittent Fevers",
    banglaTitle: "পর্যায়বৃত্ত জ্বরের চিকিৎসা",
    text: "The remedy must be chosen based on the symptoms of the paroxysm and the interval.",
    banglaText: "আক্রমণ এবং বিরতির লক্ষণের ভিত্তিতে ওষুধ নির্বাচন করতে হবে।"
  },
  {
    id: 235,
    title: "The Time of Administration",
    banglaTitle: "প্রয়োগের সময়",
    text: "The remedy should be given when the paroxysm is over.",
    banglaText: "আক্রমণ শেষ হলে ওষুধ দেওয়া উচিত।"
  },
  {
    id: 236,
    title: "The Effect of the Remedy",
    banglaTitle: "ওষুধের প্রভাব",
    text: "The right remedy will prevent the next paroxysm or make it much lighter.",
    banglaText: "সঠিক ওষুধ পরবর্তী আক্রমণ রোধ করবে অথবা এটিকে অনেক হালকা করে দেবে।"
  },
  {
    id: 237,
    title: "The Repetition of the Dose",
    banglaTitle: "মাত্রার পুনরাবৃত্তি",
    text: "The dose may be repeated if the next paroxysm still occurs, but is milder.",
    banglaText: "যদি পরবর্তী আক্রমণটি ঘটে তবে মাত্রা পুনরাবৃত্তি করা যেতে পারে, তবে তা মৃদু হবে।"
  },
  {
    id: 238,
    title: "Epidemic Intermittent Fevers",
    banglaTitle: "মহামারী পর্যায়বৃত্ত জ্বর",
    text: "In epidemic fevers, many patients may require the same remedy.",
    banglaText: "মহামারী জ্বরে অনেক রোগীর একই ওষুধের প্রয়োজন হতে পারে।"
  },
  {
    id: 239,
    title: "The Genus Epidemicus",
    banglaTitle: "জেনাস এপিডেমিকাস",
    text: "The remedy that covers the symptoms of the majority of cases in an epidemic is the genus epidemicus.",
    banglaText: "মহামারীতে অধিকাংশ কেসের লক্ষণ কভার করে এমন ওষুধটিই হলো জেনাস এপিডেমিকাস।"
  },
  {
    id: 240,
    title: "Chronic Intermittent Fevers",
    banglaTitle: "দীর্ঘস্থায়ী পর্যায়বৃত্ত জ্বর",
    text: "Chronic intermittent fevers require anti-psoric treatment.",
    banglaText: "দীর্ঘস্থায়ী পর্যায়বৃত্ত জ্বরের জন্য অ্যান্টি-সোরিক চিকিৎসার প্রয়োজন হয়।"
  },
  {
    id: 241,
    title: "The Investigation of the Case",
    banglaTitle: "কেস অনুসন্ধান",
    text: "The physician must investigate every detail of the intermittent fever carefully.",
    banglaText: "চিকিৎসককে পর্যায়বৃত্ত জ্বরের প্রতিটি খুঁটিনাটি সতর্কতার সাথে অনুসন্ধান করতে হবে।"
  },
  {
    id: 242,
    title: "The Choice of Remedy",
    banglaTitle: "ওষুধ নির্বাচন",
    text: "The remedy must cover the most peculiar symptoms of the fever.",
    banglaText: "ওষুধটি অবশ্যই জ্বরের সবচেয়ে বিশেষ লক্ষণগুলোকে কভার করবে।"
  },
  {
    id: 243,
    title: "The Diet in Intermittent Fever",
    banglaTitle: "পর্যায়বৃত্ত জ্বরে পথ্য",
    text: "A light diet is necessary during the fever.",
    banglaText: "জ্বরের সময় হালকা পথ্য প্রয়োজন।"
  },
  {
    id: 244,
    title: "The Recovery",
    banglaTitle: "আরোগ্য",
    text: "Recovery is complete when the paroxysms stop and the patient's strength returns.",
    banglaText: "যখন আক্রমণ বন্ধ হয় এবং রোগীর শক্তি ফিরে আসে তখন আরোগ্য সম্পন্ন হয়।"
  },
  {
    id: 245,
    title: "The Mode of Administration",
    banglaTitle: "প্রয়োগের ধরণ",
    text: "Medicines can be given in various forms, but the dynamic effect is what matters.",
    banglaText: "ওষুধ বিভিন্ন আকারে দেওয়া যেতে পারে, তবে গতিশীল প্রভাবই আসল।"
  },
  {
    id: 246,
    title: "The Repetition of the Dose",
    banglaTitle: "মাত্রার পুনরাবৃত্তি",
    text: "The dose should be repeated only when the improvement stops.",
    banglaText: "উন্নতি বন্ধ হলেই কেবল মাত্রা পুনরাবৃত্তি করা উচিত।"
  },
  {
    id: 247,
    title: "The Change of Potency",
    banglaTitle: "শক্তির পরিবর্তন",
    text: "Changing the potency can sometimes help when the progress of cure is slow.",
    banglaText: "আরোগ্যের গতি ধীর হলে শক্তির পরিবর্তন কখনও কখনও সাহায্য করতে পারে।"
  },
  {
    id: 248,
    title: "The LM Potencies",
    banglaTitle: "এলএম শক্তি",
    text: "The LM potencies allow for more frequent repetition with less risk of aggravation.",
    banglaText: "এলএম শক্তি বৃদ্ধির ঝুঁকি কমিয়ে আরও ঘন ঘন পুনরাবৃত্তির সুযোগ দেয়।"
  },
  {
    id: 249,
    title: "Antidoting the Remedy",
    banglaTitle: "ওষুধের বিষক্রিয়া নাশক",
    text: "If a remedy produces severe aggravation, it may need to be antidoted.",
    banglaText: "যদি কোনো ওষুধ মারাত্মক বৃদ্ধি ঘটায়, তবে তার বিষক্রিয়া নাশক প্রয়োজন হতে পারে।"
  },
  {
    id: 250,
    title: "The Signs of Improvement",
    banglaTitle: "উন্নতির লক্ষণ",
    text: "The patient's general sense of well-being is a good sign of improvement.",
    banglaText: "রোগীর সাধারণ সুস্থতার অনুভূতি উন্নতির একটি ভালো লক্ষণ।"
  },
  {
    id: 251,
    title: "The Signs of Aggravation",
    banglaTitle: "বৃদ্ধির লক্ষণ",
    text: "An increase in the existing symptoms is a sign of homoeopathic aggravation.",
    banglaText: "বিদ্যমান লক্ষণের বৃদ্ধি হলো হোমিওপ্যাথিক বৃদ্ধির একটি লক্ষণ।"
  },
  {
    id: 252,
    title: "Obstacles to Cure",
    banglaTitle: "আরোগ্যের বাধা",
    text: "The physician must identify and remove any obstacles to cure, such as bad habits or environment.",
    banglaText: "চিকিৎসককে আরোগ্যের যেকোনো বাধা, যেমন খারাপ অভ্যাস বা পরিবেশ, চিহ্নিত এবং দূর করতে হবে।"
  },
  {
    id: 253,
    title: "The Patient's Report",
    banglaTitle: "রোগীর রিপোর্ট",
    text: "The patient's own report of his condition is very important.",
    banglaText: "রোগীর নিজের অবস্থার রিপোর্ট খুব গুরুত্বপূর্ণ।"
  },
  {
    id: 254,
    title: "The Physician's Observation",
    banglaTitle: "চিকিৎসকের পর্যবেক্ষণ",
    text: "The physician must also use his own observation to monitor the progress.",
    banglaText: "চিকিৎসককেও অগ্রগতি পর্যবেক্ষণের জন্য নিজের পর্যবেক্ষণ ব্যবহার করতে হবে।"
  },
  {
    id: 255,
    title: "The False Improvement",
    banglaTitle: "মিথ্যা উন্নতি",
    text: "The physician must be able to distinguish between true improvement and temporary relief.",
    banglaText: "চিকিৎসককে প্রকৃত উন্নতি এবং সাময়িক উপশমের মধ্যে পার্থক্য করতে সক্ষম হতে হবে।"
  },
  {
    id: 256,
    title: "The Patient's Disposition",
    banglaTitle: "রোগীর মেজাজ",
    text: "A change in the patient's disposition is a very important sign of the remedy's action.",
    banglaText: "রোগীর মেজাজের পরিবর্তন ওষুধের ক্রিয়ার একটি খুব গুরুত্বপূর্ণ লক্ষণ।"
  },
  {
    id: 257,
    title: "The Choice of Potency",
    banglaTitle: "শক্তি নির্বাচন",
    text: "The choice of potency depends on the nature of the disease and the sensitivity of the patient.",
    banglaText: "শক্তি নির্বাচন রোগের প্রকৃতি এবং রোগীর সংবেদনশীলতার ওপর নির্ভর করে।"
  },
  {
    id: 258,
    title: "The High Potencies",
    banglaTitle: "উচ্চ শক্তি",
    text: "High potencies are often needed for deep-seated chronic diseases.",
    banglaText: "গভীরভাবে প্রোথিত দীর্ঘস্থায়ী রোগের জন্য প্রায়ই উচ্চ শক্তির প্রয়োজন হয়।"
  },
  {
    id: 259,
    title: "The Diet and Regimen",
    banglaTitle: "পথ্য ও নিয়মাবলী",
    text: "A strict diet and regimen are essential for the success of homoeopathic treatment.",
    banglaText: "হোমিওপ্যাথিক চিকিৎসার সাফল্যের জন্য কঠোর পথ্য এবং নিয়মাবলী অপরিহার্য।"
  },
  {
    id: 260,
    title: "The Avoidance of Stimulants",
    banglaTitle: "উত্তেজক বর্জন",
    text: "The patient must avoid coffee, tea, alcohol, and other stimulants during treatment.",
    banglaText: "চিকিৎসার সময় রোগীকে কফি, চা, অ্যালকোহল এবং অন্যান্য উত্তেজক বর্জন করতে হবে।"
  },
  {
    id: 261,
    title: "The Healthy Lifestyle",
    banglaTitle: "সুস্থ জীবনধারা",
    text: "A healthy lifestyle supports the action of the remedy and promotes recovery.",
    banglaText: "একটি সুস্থ জীবনধারা ওষুধের ক্রিয়াকে সমর্থন করে এবং পুনরুদ্ধারে সহায়তা করে।"
  },
  {
    id: 262,
    title: "The Preparation of Medicines",
    banglaTitle: "ওষুধ প্রস্তুতি",
    text: "Medicines must be prepared with great care and precision according to the pharmacopoeia.",
    banglaText: "ফার্মাকোপিয়া অনুযায়ী অনেক যত্ন এবং সূক্ষ্মতার সাথে ওষুধ প্রস্তুত করতে হবে।"
  },
  {
    id: 263,
    title: "The Purity of Medicines",
    banglaTitle: "ওষুধের বিশুদ্ধতা",
    text: "Only the purest medicinal substances should be used in homoeopathy.",
    banglaText: "হোমিওপ্যাথিতে কেবল বিশুদ্ধতম ঔষধি পদার্থ ব্যবহার করা উচিত।"
  },
  {
    id: 264,
    title: "Preparation and Dynamisation",
    banglaTitle: "প্রস্তুতি এবং শক্তিকরণ",
    text: "Medicines are potentized by trituration and succussion (dynamisation) to develop their dynamic powers.",
    banglaText: "ওষুধের গতিশীল শক্তি বিকাশের জন্য ঘর্ষণ এবং ঝাঁকুনির (শক্তিকরণ) মাধ্যমে সেগুলোকে শক্তিশালী করা হয়।"
  },
  {
    id: 265,
    title: "Physician as Pharmacist",
    banglaTitle: "চিকিৎসক যখন ফার্মাসিস্ট",
    text: "The physician should be able to prepare his own medicines to ensure their purity and efficacy.",
    banglaText: "ওষুধের বিশুদ্ধতা এবং কার্যকারিতা নিশ্চিত করতে চিকিৎসকের নিজের ওষুধ নিজেই প্রস্তুত করতে সক্ষম হওয়া উচিত।"
  },
  {
    id: 266,
    title: "Raw Substances",
    banglaTitle: "কাঁচামাল",
    text: "Raw medicinal substances should be obtained in their most perfect and natural state.",
    banglaText: "ঔষধি কাঁচামালগুলো তাদের সবচেয়ে নিখুঁত এবং প্রাকৃতিক অবস্থায় সংগ্রহ করা উচিত।"
  },
  {
    id: 267,
    title: "Vegetable Substances",
    banglaTitle: "উদ্ভিজ্জ পদার্থ",
    text: "Fresh vegetable substances should be expressed for their juice and mixed with alcohol.",
    banglaText: "তাজা উদ্ভিজ্জ পদার্থ থেকে রস বের করে অ্যালকোহলের সাথে মেশানো উচিত।"
  },
  {
    id: 268,
    title: "Dry Substances",
    banglaTitle: "শুষ্ক পদার্থ",
    text: "Dry vegetable and mineral substances are prepared by trituration with milk sugar.",
    banglaText: "শুষ্ক উদ্ভিজ্জ এবং খনিজ পদার্থগুলো মিল্ক সুগারের সাথে ঘর্ষণের মাধ্যমে প্রস্তুত করা হয়।"
  },
  {
    id: 269,
    title: "Dynamization Process",
    banglaTitle: "শক্তিকরণ প্রক্রিয়া",
    text: "The process of dynamization develops the latent spirit-like powers of medicinal substances.",
    banglaText: "শক্তিকরণ প্রক্রিয়া ঔষধি পদার্থের সুপ্ত আধ্যাত্মিক শক্তিকে বিকশিত করে।"
  },
  {
    id: 270,
    title: "The LM Potency",
    banglaTitle: "এলএম শক্তি",
    text: "The 50-millesimal scale (LM potency) provides a more rapid and gentle cure.",
    banglaText: "৫০ সহস্রতমিক পদ্ধতি (এলএম শক্তি) আরও দ্রুত এবং মৃদু আরোগ্য প্রদান করে।"
  },
  {
    id: 271,
    title: "Self-Preparation",
    banglaTitle: "নিজস্ব প্রস্তুতি",
    text: "The physician should ideally prepare the medicines himself to be certain of their quality.",
    banglaText: "চিকিৎসকের আদর্শভাবে নিজের ওষুধ নিজেই প্রস্তুত করা উচিত যাতে গুণমান সম্পর্কে নিশ্চিত হওয়া যায়।"
  },
  {
    id: 272,
    title: "Single Remedy",
    banglaTitle: "একক ওষুধ",
    text: "Only one single, simple medicinal substance should be administered to the patient at a time.",
    banglaText: "একবারে রোগীকে কেবল একটি মাত্র সরল ঔষধি পদার্থ প্রয়োগ করা উচিত।"
  },
  {
    id: 273,
    title: "No Mixtures",
    banglaTitle: "মিশ্রণ নিষিদ্ধ",
    text: "It is absolutely impermissible to give a mixture of several medicines together.",
    banglaText: "একসাথে বেশ কয়েকটি ওষুধের মিশ্রণ দেওয়া একেবারেই অনুচিত।"
  },
  {
    id: 274,
    title: "Sufficiency of Single Remedy",
    banglaTitle: "একক ওষুধের পর্যাপ্ততা",
    text: "A single, well-selected remedy is sufficient to cover the totality of symptoms.",
    banglaText: "একটি সুনির্বাচিত একক ওষুধ লক্ষণ সমষ্টির জন্য যথেষ্ট।"
  },
  {
    id: 275,
    title: "The Small Dose",
    banglaTitle: "ক্ষুদ্র মাত্রা",
    text: "The dose of the homoeopathic medicine must never be so large as to cause injury.",
    banglaText: "হোমিওপ্যাথিক ওষুধের মাত্রা কখনোই এত বড় হওয়া উচিত নয় যা ক্ষতি করতে পারে।"
  },
  {
    id: 276,
    title: "Injurious Large Doses",
    banglaTitle: "ক্ষতিকারক বড় মাত্রা",
    text: "Too large a dose, even of the right remedy, can cause unnecessary suffering.",
    banglaText: "সঠিক ওষুধেরও খুব বড় মাত্রা অপ্রয়োজনীয় কষ্ট দিতে পারে।"
  },
  {
    id: 277,
    title: "Minimal Dose",
    banglaTitle: "ন্যূনতম মাত্রা",
    text: "The dose should be as small as possible to effect a cure without aggravation.",
    banglaText: "বৃদ্ধি ছাড়াই আরোগ্য লাভের জন্য মাত্রা যতটা সম্ভব ক্ষুদ্র হওয়া উচিত।"
  },
  {
    id: 278,
    title: "Size of the Dose",
    banglaTitle: "মাত্রার আকার",
    text: "The size of the dose is a matter of experience and careful observation.",
    banglaText: "মাত্রার আকার অভিজ্ঞতা এবং সতর্ক পর্যবেক্ষণের বিষয়।"
  },
  {
    id: 279,
    title: "Smallness of Dose",
    banglaTitle: "মাত্রার ক্ষুদ্রতা",
    text: "Experience shows that the dose can hardly be made too small for a sensitive patient.",
    banglaText: "অভিজ্ঞতা দেখায় যে একজন সংবেদনশীল রোগীর জন্য মাত্রা কখনোই খুব বেশি ক্ষুদ্র হতে পারে না।"
  },
  {
    id: 280,
    title: "Gradual Increase",
    banglaTitle: "ধীরে ধীরে বৃদ্ধি",
    text: "If necessary, the dose can be gradually increased in subsequent administrations.",
    banglaText: "প্রয়োজন হলে পরবর্তী প্রয়োগে মাত্রা ধীরে ধীরে বাড়ানো যেতে পারে।"
  },
  {
    id: 281,
    title: "Susceptibility",
    banglaTitle: "সংবেদনশীলতা",
    text: "Every patient is susceptible to the correctly chosen homoeopathic remedy.",
    banglaText: "সঠিকভাবে নির্বাচিত হোমিওপ্যাথিক ওষুধের প্রতি প্রতিটি রোগী সংবেদনশীল।"
  },
  {
    id: 282,
    title: "Homoeopathic Aggravation",
    banglaTitle: "হোমিওপ্যাথিক বৃদ্ধি",
    text: "A slight aggravation of symptoms is a sign that the remedy is acting correctly.",
    banglaText: "লক্ষণের সামান্য বৃদ্ধি একটি লক্ষণ যে ওষুধটি সঠিকভাবে কাজ করছে।"
  },
  {
    id: 283,
    title: "Avoiding Suffering",
    banglaTitle: "কষ্ট এড়ানো",
    text: "The physician's duty is to cure with the least possible suffering to the patient.",
    banglaText: "রোগীর ন্যূনতম কষ্টে আরোগ্য করা চিকিৎসকের দায়িত্ব।"
  },
  {
    id: 284,
    title: "Action on Parts",
    banglaTitle: "অঙ্গের ওপর ক্রিয়া",
    text: "The medicine acts on the whole organism through the vital force.",
    banglaText: "ওষুধ জীবনী শক্তির মাধ্যমে পুরো শরীরের ওপর কাজ করে।"
  },
  {
    id: 285,
    title: "External Application",
    banglaTitle: "বাহ্য প্রয়োগ",
    text: "External application of remedies should be used with caution and only when indicated.",
    banglaText: "ওষুধের বাহ্য প্রয়োগ সতর্কতার সাথে এবং কেবল নির্দেশিত হলেই করা উচিত।"
  },
  {
    id: 286,
    title: "Electricity and Magnetism",
    banglaTitle: "বিদ্যুৎ এবং চুম্বকত্ব",
    text: "Electricity and magnetism can be useful adjuncts in certain cases.",
    banglaText: "কিছু ক্ষেত্রে বিদ্যুৎ এবং চুম্বকত্ব দরকারী সহায়ক হতে পারে।"
  },
  {
    id: 287,
    title: "Mesmerism",
    banglaTitle: "মেসমেরিজম",
    text: "Mesmerism (animal magnetism) can act dynamically on the vital force.",
    banglaText: "মেসমেরিজম (প্রাণিজ চুম্বকত্ব) জীবনী শক্তির ওপর গতিশীলভাবে কাজ করতে পারে।"
  },
  {
    id: 288,
    title: "Curative Mesmerism",
    banglaTitle: "আরোগ্যকারী মেসমেরিজম",
    text: "The curative power of mesmerism can be used to restore balance in the organism.",
    banglaText: "শরীরের ভারসাম্য পুনরুদ্ধারে মেসমেরিজমের আরোগ্যকারী শক্তি ব্যবহার করা যেতে পারে।"
  },
  {
    id: 289,
    title: "Massage",
    banglaTitle: "ম্যাসাজ",
    text: "Massage can be useful in promoting circulation and relieving tension.",
    banglaText: "রক্ত সঞ্চালন এবং উত্তেজনা প্রশমনে ম্যাসাজ দরকারী হতে পারে।"
  },
  {
    id: 290,
    title: "Hydrotherapy",
    banglaTitle: "জলচিকিৎসা",
    text: "The use of water (hydrotherapy) can support the healing process.",
    banglaText: "জলের ব্যবহার (জলচিকিৎসা) আরোগ্য প্রক্রিয়াকে সমর্থন করতে পারে।"
  },
  {
    id: 291,
    title: "Baths",
    banglaTitle: "স্নান",
    text: "Warm or cold baths can be used as part of the patient's regimen.",
    banglaText: "উষ্ণ বা ঠান্ডা স্নান রোগীর নিয়মাবলীর অংশ হিসেবে ব্যবহার করা যেতে পারে।"
  }
];
