import { ChapterIndex, Category, GeneralSubCategory } from './types';

import { REPERTORY_DATA } from './repertoryData';

export { REPERTORY_DATA };

export const CHAPTER_INDEX: ChapterIndex[] = [
  { n: "Mind", p: "1-95", i: "🧠", t: "মন", c: "#f43f5e" },
  { n: "Vertigo", p: "96-106", i: "💫", t: "মাথা ঘোরা", c: "#8b5cf6" },
  { n: "Head", p: "107-234", i: "🤕", t: "মাথা", c: "#3b82f6" },
  { n: "Eye", p: "235-270", i: "👁️", t: "চোখ", c: "#06b6d4" },
  { n: "Vision", p: "271-285", i: "👀", t: "দৃষ্টিশক্তি", c: "#10b981" },
  { n: "Ear", p: "285-320", i: "👂", t: "কান", c: "#f59e0b" },
  { n: "Hearing", p: "321-323", i: "🦻", t: "শ্রবণশক্তি", c: "#ef4444" },
  { n: "Nose", p: "324-354", i: "👃", t: "নাক", c: "#ec4899" },
  { n: "Face", p: "355-396", i: "🧔", t: "মুখমণ্ডল", c: "#6366f1" },
  { n: "Mouth", p: "397-430", i: "👄", t: "মুখ", c: "#d946ef" },
  { n: "Teeth", p: "430-447", i: "🦷", t: "দাঁত", c: "#94a3b8" },
  { n: "Throat", p: "448-470", i: "🗣️", t: "গলা", c: "#14b8a6" },
  { n: "External Throat", p: "471-475", i: "🧣", t: "বাইরের গলা", c: "#f97316" },
  { n: "Stomach", p: "476-540", i: "🍅", t: "পাকস্থলী", c: "#ef4444" },
  { n: "Abdomen", p: "541-605", i: "🫲", t: "পেট", c: "#22c55e" },
  { n: "Rectum", p: "606-635", i: "🍑", t: "মলদ্বার", c: "#f472b6" },
  { n: "Stool", p: "635-644", i: "💩", t: "মল", c: "#78350f" },
  { n: "Bladder", p: "645-662", i: "🎈", t: "মূত্রথলি", c: "#3b82f6" },
  { n: "Kidneys", p: "662-667", i: "🫘", t: "কিডনি", c: "#991b1b" },
  { n: "Urethra", p: "669-680", i: "💧", t: "মূত্রনালী", c: "#60a5fa" },
  { n: "Urine", p: "681-692", i: "🚰", t: "মূত্র", c: "#fbbf24" },
  { n: "Genitalia Male", p: "693-714", i: "🔵", t: "পুরুষ জননেন্দ্রিয়", c: "#2563eb" },
  { n: "Genitalia Female", p: "714-745", i: "🌷", t: "স্ত্রী জননেন্দ্রিয়", c: "#db2777" },
  { n: "Larynx & Trachea", p: "746-762", i: "🎙️", t: "স্বরযন্ত্র ও শ্বাসনালী", c: "#4b5563" },
  { n: "Respiration", p: "762-777", i: "🫁", t: "শ্বাসক্রিয়া", c: "#0ea5e9" },
  { n: "Cough", p: "778-811", i: "😷", t: "কাশি", c: "#84cc16" },
  { n: "Expectoration", p: "812-821", i: "🤧", t: "শ্লেষ্মা", c: "#a855f7" },
  { n: "Chest", p: "822-883", i: "🩻", t: "বুক", c: "#334155" },
  { n: "Back", p: "884-951", i: "🦴", t: "পিঠ", c: "#475569" },
  { n: "Extremities", p: "952-1233", i: "💪", t: "হাত-পা", c: "#ea580c" },
  { n: "Sleep", p: "1234-1258", i: "😴", t: "ঘুম", c: "#1e1b4b" },
  { n: "Chill", p: "1259-1277", i: "🥶", t: "শীতভাব", c: "#06b6d4" },
  { n: "Fever", p: "1278-1292", i: "🤒", t: "জ্বর", c: "#dc2626" },
  { n: "Perspiration", p: "1293-1302", i: "💦", t: "ঘাম", c: "#38bdf8" },
  { n: "Skin", p: "1303-1340", i: "🧴", t: "চামড়া", c: "#d97706" },
  { n: "Generalities", p: "1341-1423", i: "🌐", t: "সাধারণ লক্ষণ", c: "#4f46e5" },
  { n: "Prostate Gland", p: "667-668", i: "🌰", t: "প্রোস্টেট গ্রন্থি", c: "#7c2d12" }
];

export const CHAPTER_CATEGORIES = [
  { name: 'Mind & Nervous System', t: 'মন ও স্নায়ুতন্ত্র', chapters: ['Mind', 'Vertigo', 'Sleep'] },
  { name: 'Head & Senses', t: 'মাথা ও ইন্দ্রিয়', chapters: ['Head', 'Eye', 'Vision', 'Ear', 'Hearing', 'Nose', 'Face', 'Mouth', 'Teeth', 'Throat', 'External Throat'] },
  { name: 'Gastrointestinal', t: 'পরিপাকতন্ত্র', chapters: ['Stomach', 'Abdomen', 'Rectum', 'Stool'] },
  { name: 'Urinary System', t: 'মূত্রতন্ত্র', chapters: ['Bladder', 'Kidneys', 'Urethra', 'Urine'] },
  { name: 'Reproductive System', t: 'প্রজননতন্ত্র', chapters: ['Genitalia Male', 'Genitalia Female', 'Prostate Gland'] },
  { name: 'Respiratory & Chest', t: 'শ্বসনতন্ত্র ও বুক', chapters: ['Larynx & Trachea', 'Respiration', 'Cough', 'Expectoration', 'Chest'] },
  { name: 'Extremities & Back', t: 'হাত-পা ও পিঠ', chapters: ['Back', 'Extremities'] },
  { name: 'Generalities & Skin', t: 'সাধারণ ও চামড়া', chapters: ['Chill', 'Fever', 'Perspiration', 'Skin', 'Generalities'] }
];

export const CATEGORIES: Category[] = [
  { key: "location", e: "📍", n: "Location", t: "অবস্থান", d: "শরীরের কোন অংশে লক্ষণ অনুভব হয়" },
  { key: "sensation", e: "💭", n: "Sensation", t: "অনুভূতি", d: "জ্বালা, ছুরির মতো, স্পন্দন ইত্যাদি" },
  { key: "modality", e: "⚖️", n: "Modality", t: "মডালিটি (< >)", d: "বৃদ্ধি (<) বা হ্রাস (>) পাওয়ার কারণ" },
  { key: "time", e: "⏰", n: "Time", t: "সময়", d: "বিশেষ সময়ে বৃদ্ধি বা হ্রাস" },
  { key: "concomitant", e: "🔗", n: "Concomitant", t: "সহগামী লক্ষণ", d: "মূল লক্ষণের সাথে যে সহযোগী লক্ষণ দেখা দেয়" },
  { key: "psychological", e: "🧠", n: "Psychological State", t: "মানসিক অবস্থা", d: "চিন্তা, আবেগ, ভয়, রাগ — রোগীর মানসিক বৈশিষ্ট্য" },
  { key: "general", e: "🌐", n: "General Symptoms", t: "সাধারণ লক্ষণ", d: "সামগ্রিক অবস্থা — সময়, তাপ, স্রাব (১০ উপভাগ)", hasSub: true },
  { key: "physiological", e: "🔬", n: "Physiological Status", t: "শারীরবৃত্তীয় অবস্থা", d: "শারীরিক গঠন, ঘুম, ঘাম, মল-মূত্রের বিশেষত্ব" }
];

export const GENERAL_SUB_CATEGORIES: GeneralSubCategory[] = [
  { key: "g_temp", e: "🌡️", n: "1. Temperature, Weather, Air, Season", t: "তাপমাত্রা, আবহাওয়া, বায়ু, ঋতু", d: "গরম, ঠান্ডা পরিবর্তন" },
  { key: "g_phys", e: "🔄", n: "2. Physiological Process", t: "শারীরবৃত্তীয় প্রক্রিয়া", d: "প্রস্রাব, ঋতুস্রাব, শ্বাসের আগে/পরে লক্ষণ" },
  { key: "g_pos", e: "🧘", n: "3. Position of Body & Movements", t: "শরীরের অবস্থান ও নড়াচড়া", d: "শোয়া, বসা, হাঁটায় বিশেষ পরিবর্তন" },
  { key: "g_patho", e: "🏥", n: "4. Pathological Condition", t: "রোগতাত্ত্বিক অবস্থা", d: "রক্তক্ষরণ, আঘাত, অপারেশনের পরে" },
  { key: "g_pfact", e: "⚡", n: "5. Physical Factors", t: "ভৌত কারণ", d: "চাপ, ঘষা, আলো — সাধারণ প্রতিক্রিয়া" },
  { key: "g_disc", e: "💧", n: "6. Discharges", t: "স্রাব / নিঃসরণ", d: "রং, গন্ধ, ঘনত্ব ও বিশেষ প্রকৃতি" },
  { key: "g_side", e: "↔️", n: "7. Sides of Body & Radiation", t: "শরীরের পাশ ও বিকিরণ", d: "ডান/বাম পাশ, তির্যক বিকিরণ" },
  { key: "g_alt", e: "🔁", n: "8. Alterations", t: "পর্যায়ক্রমিক লক্ষণ", d: "একটি পর্যায়ক্রমে অন্যটির সাথে দেখা দেয়" },
  { key: "g_crav", e: "🍽️", n: "9. Craving & Aversion (Food)", t: "ইচ্ছা ও অনিচ্ছা (খাদ্য)", d: "বিশেষ খাবারের প্রতি আকাঙ্ক্ষা বা বিতৃষ্ণা" }
];
