import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, BookOpen, ClipboardList, ArrowRight, FlaskConical, Bell, Type, Upload, User, Filter, AlertCircle, ShoppingCart, Sparkles, Zap, Droplets, Flame, Thermometer, Leaf, Bone, Wind, Smile, CloudRain, Eye, Brain, Pencil, Heart, Sun, Star, ChevronRight, ChevronLeft, Search, Plus, Trash2, Printer, Activity, CheckCircle, Database } from 'lucide-react';
import { PharmacyRemedy, Supplier, Invoice, PharmacyStats } from './types';
import { PHARMACY_DEMO_DATA } from './demoData';
import { ORGANON_DATA } from './organonData';
import { PharmacyManual } from './PharmacyManual';

export const PharmacyKnowledgeHub = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDetail, setSelectedDetail] = useState<any>(null);
  const [currentRemedyIndex, setCurrentRemedyIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState(1); // 1 for next, -1 for prev
  const [showFullLibrary, setShowFullLibrary] = useState(false);
  
  const [currentAphorismIndex, setCurrentAphorismIndex] = useState(0);
  const [isAphorismFlipping, setIsAphorismFlipping] = useState(false);
  const [aphorismFlipDirection, setAphorismFlipDirection] = useState(1);

  const nextAphorism = () => {
    if (isAphorismFlipping) return;
    setAphorismFlipDirection(1);
    setIsAphorismFlipping(true);
    setTimeout(() => {
      setCurrentAphorismIndex((prev) => (prev + 1) % ORGANON_DATA.length);
      setIsAphorismFlipping(false);
    }, 300);
  };

  const prevAphorism = () => {
    if (isAphorismFlipping) return;
    setAphorismFlipDirection(-1);
    setIsAphorismFlipping(true);
    setTimeout(() => {
      setCurrentAphorismIndex((prev) => (prev - 1 + ORGANON_DATA.length) % ORGANON_DATA.length);
      setIsAphorismFlipping(false);
    }, 300);
  };

  const currentAphorism = ORGANON_DATA[currentAphorismIndex];

  const detailData: Record<string, any> = {
    'Plant Kingdom': {
      title: 'Plant Kingdom (উদ্ভিদ জগত)',
      desc: 'The largest source of homeopathic medicines.',
      details: [
        'Whole plants: Aconite, Belladonna, Pulsatilla.',
        'Roots: Bryonia, Rheum.',
        'Leaves: Digitalis, Rhus Tox.',
        'Flowers: Arnica, Calendula.',
        'Bark: Cinchona, Mezereum.',
        'Seeds: Nux Vomica, Ignatia.'
      ],
      prep: 'Fresh plants are usually preferred. Tinctures are prepared by maceration or percolation with alcohol.',
      bn: 'হোমিওপ্যাথিক ওষুধের সবচেয়ে বড় উৎস। সম্পূর্ণ উদ্ভিদ, মূল, পাতা, ফুল, ছাল বা বীজ থেকে ওষুধ তৈরি করা হয়।'
    },
    'Animal Kingdom': {
      title: 'Animal Kingdom (প্রাণী জগত)',
      desc: 'Medicines derived from animals and their secretions.',
      details: [
        'Whole organisms: Apis Mel (Honey bee), Formica Rufa.',
        'Venoms: Lachesis, Naja, Crotalus.',
        'Secretions: Sepia (Ink of Cuttlefish), Moschus.',
        'Milk & Milk products: Lac Caninum, Lac Defloratum.'
      ],
      prep: 'Venoms are collected and preserved in glycerine or alcohol. Whole animals are often macerated.',
      bn: 'প্রাণী এবং তাদের নিঃসরণ থেকে প্রাপ্ত ওষুধ। বিষ, দুধ বা সম্পূর্ণ প্রাণী থেকে এগুলো তৈরি করা হয়।'
    },
    'Mineral Kingdom': {
      title: 'Mineral Kingdom (খনিজ জগত)',
      desc: 'Metals, non-metals, and their compounds.',
      details: [
        'Metals: Aurum Met (Gold), Argentum Met (Silver).',
        'Non-metals: Sulphur, Phosphorus, Iodine.',
        'Salts: Natrum Mur (Common salt), Calc Carb.',
        'Acids: Nitric Acid, Sulphuric Acid.'
      ],
      prep: 'Insoluble minerals are prepared by Trituration. Soluble ones by solution.',
      bn: 'ধাতু, অধাতু এবং তাদের যৌগ। অদ্রবণীয় খনিজগুলো ট্রাইচুরেশনের মাধ্যমে প্রস্তুত করা হয়।'
    },
    'Nosodes': {
      title: 'Nosodes (নোসোডস)',
      desc: 'Prepared from diseased tissues or secretions.',
      details: [
        'Psorinum: From scabies vesicle.',
        'Tuberculinum: From tubercular abscess.',
        'Medorrhinum: From gonorrheal discharge.',
        'Syphilinum: From syphilitic lesion.'
      ],
      prep: 'Strictly sterilized before potentization. Usually prepared by trituration first if solid.',
      bn: 'রোগাক্রান্ত টিস্যু বা নিঃসরণ থেকে প্রস্তুত। শক্তিকরণের আগে এগুলো কঠোরভাবে জীবাণুমুক্ত করা হয়।'
    },
    'Sarcodes': {
      title: 'Sarcodes (সারকোডস)',
      desc: 'Prepared from healthy animal tissues or secretions.',
      details: [
        'Thyroidinum: From thyroid gland.',
        'Adrenalinum: From adrenal gland.',
        'Pancreatinum: From pancreas.',
        'Insulinum: From insulin hormone.'
      ],
      prep: 'Prepared from fresh, healthy glands or tissues of animals.',
      bn: 'সুস্থ প্রাণীর টিস্যু বা নিঃসরণ থেকে প্রস্তুত। সাধারণত তাজা গ্রন্থি থেকে তৈরি করা হয়।'
    },
    'Imponderabilia': {
      title: 'Imponderabilia (ইমপন্ডারেবিলিয়া)',
      desc: 'Prepared from energy sources.',
      details: [
        'Sol: From Sunlight.',
        'Luna: From Moonlight.',
        'Magnetis Poli Ambo: From Magnet.',
        'X-Ray: From X-ray energy.'
      ],
      prep: 'Sugar of milk or alcohol is exposed to the energy source for a specific duration.',
      bn: 'শক্তির উৎস থেকে প্রস্তুত। চিনি বা অ্যালকোহলকে নির্দিষ্ট সময়ের জন্য শক্তির উৎসের সংস্পর্শে রাখা হয়।'
    },
    'Trituration': {
      title: 'Trituration (ট্রাইচুরেশন)',
      desc: 'Process for insoluble substances.',
      details: [
        'Ratio: 1 part drug to 99 parts Sugar of Milk (Centesimal).',
        'Time: 1 hour for each potency.',
        'Process: Grinding in a mortar and pestle.',
        'Stages: 3 stages of 20 minutes each (Grinding, Scraping, Mixing).'
      ],
      prep: 'Used for substances that do not dissolve in alcohol or water in their crude state.',
      bn: 'অদ্রবণীয় পদার্থের জন্য প্রক্রিয়া। হামানদিস্তায় পিষে গুঁড়ো করা হয়। প্রতিটি শক্তির জন্য ১ ঘণ্টা সময় লাগে।'
    },
    'Succussion': {
      title: 'Succussion (সাকশন)',
      desc: 'Process for soluble substances.',
      details: [
        'Action: Vigorous shaking with downward strokes.',
        'Medium: Usually Dispensing Alcohol.',
        'Purpose: To release the latent dynamic power of the drug.',
        'Hahnemannian method: 10 powerful strokes for each potency.'
      ],
      prep: 'Performed after mixing the drug substance with the vehicle (alcohol).',
      bn: 'দ্রবণীয় পদার্থের জন্য প্রক্রিয়া। অ্যালকোহলের সাথে জোরে ঝাঁকানো হয় ওষুধের সুপ্ত শক্তি জাগ্রত করতে।'
    },
    'Dilution': {
      title: 'Dilution (ডাইলিউশন)',
      desc: 'Serial reduction of material concentration.',
      details: [
        'Process: Step-by-step reduction of the drug substance.',
        'Vehicle: Water or Alcohol.',
        'Result: Higher potencies have less material but more dynamic power.',
        'Safety: Removes toxic effects of the crude drug.'
      ],
      prep: 'Essential part of potentization to reach infinitesimal doses.',
      bn: 'উপাদানের ঘনত্ব ক্রমান্বয়ে কমানো। এর ফলে ওষুধের বিষাক্ততা কমে কিন্তু আরোগ্য ক্ষমতা বাড়ে।'
    },
    'Decimal Scale (X)': {
      title: 'Decimal Scale (X) (ডেসিমাল স্কেল)',
      desc: 'Introduced by Constantine Hering.',
      details: [
        'Ratio: 1:9 (1 part drug, 9 parts vehicle).',
        'Notation: 1X, 2X, 3X or 1D, 2D, 3D.',
        'Drug Strength: 1/10th of the previous potency.',
        'Common use: Lower potencies and biochemical medicines.'
      ],
      prep: '1 part of mother tincture/trituration to 9 parts of vehicle.',
      bn: 'কনস্টানটাইন হেরিং এটি প্রবর্তন করেন। অনুপাত ১:৯। সাধারণত নিম্ন শক্তির ওষুধের জন্য ব্যবহৃত হয়।'
    },
    'Centesimal Scale (C)': {
      title: 'Centesimal Scale (C) (সেন্টিসিমাল স্কেল)',
      desc: 'Introduced by Samuel Hahnemann.',
      details: [
        'Ratio: 1:99 (1 part drug, 99 parts vehicle).',
        'Notation: 1C, 2C, 3C or simply 6, 30, 200.',
        'Drug Strength: 1/100th of the previous potency.',
        'Standard: Most widely used scale in homeopathy.'
      ],
      prep: '1 part of drug to 99 parts of vehicle at each step.',
      bn: 'স্যামুয়েল হ্যানিম্যান এটি প্রবর্তন করেন। অনুপাত ১:৯৯। এটি সবচেয়ে বেশি ব্যবহৃত স্কেল।'
    },
    '50 Millesimal (LM)': {
      title: '50 Millesimal (LM) (৫০ মিলিসিমাল)',
      desc: 'Introduced in the 6th edition of Organon.',
      details: [
        'Ratio: 1:50,000.',
        'Notation: LM/1, LM/2 or 0/1, 0/2.',
        'Advantage: Rapid action, minimal medicinal aggravation.',
        'Preparation: Complex process involving both trituration and liquid dilution.'
      ],
      prep: 'Starts with 3C trituration, then specific dilution steps to reach 1:50,000.',
      bn: 'অর্গাননের ৬ষ্ঠ সংস্করণে প্রবর্তিত। অনুপাত ১:৫০,০০০। এটি দ্রুত কাজ করে এবং ওষুধের বৃদ্ধি কম হয়।'
    }
  };

  const exploreRemedies = [
    { name: 'Aconite', nameBn: 'অ্যাকোনাইট', commonName: 'Monkshood', commonNameBn: 'মঙ্কশুড', keynote: 'Sudden Onset', keynoteBn: 'হঠাৎ আক্রমণ', disposition: 'Fear of Death', dispositionBn: 'মৃত্যুভয়', icon: Zap, color: 'from-blue-500 to-blue-700' },
    { name: 'Antim Tart', nameBn: 'অ্যান্টিম টার্ট', commonName: 'Tartar Emetic', commonNameBn: 'টার্টার এমেটিক', keynote: 'Rattling mucus', keynoteBn: 'ঘড়ঘড়ে শ্লেষ্মা', disposition: 'Drowsy, Debilitated', dispositionBn: 'তন্দ্রাচ্ছন্ন, দুর্বল', icon: Activity, color: 'from-cyan-500 to-cyan-700' },
    { name: 'Apis Mel', nameBn: 'এপিস মেল', commonName: 'Honey Bee', commonNameBn: 'মৌমাছি', keynote: 'Stinging pains', keynoteBn: 'হুল ফোটানো ব্যথা', disposition: 'Busy, Restless', dispositionBn: 'ব্যস্ত, অস্থির', icon: Droplets, color: 'from-yellow-500 to-yellow-700' },
    { name: 'Arnica', nameBn: 'আর্নিকা', commonName: 'Leopard\'s Bane', commonNameBn: 'লিওপার্ডস বেন', keynote: 'Traumatic Injury', keynoteBn: 'আঘাতজনিত ক্ষত', disposition: 'Says nothing is wrong', dispositionBn: 'বলে কিছু হয়নি', icon: Activity, color: 'from-amber-500 to-amber-700' },
    { name: 'Arsenic Alb', nameBn: 'আর্সেনিক অ্যালব', commonName: 'White Oxide of Arsenic', commonNameBn: 'আর্সেনিক অক্সাইড', keynote: 'Burning, Restless', keynoteBn: 'জ্বালা, অস্থিরতা', disposition: 'Anxious, Fastidious', dispositionBn: 'উদ্বিগ্ন, খুঁতখুঁতে', icon: Flame, color: 'from-slate-700 to-slate-900' },
    { name: 'Belladonna', nameBn: 'বেলেডোনা', commonName: 'Deadly Nightshade', commonNameBn: 'ডেডলি নাইটশেড', keynote: 'Heat, Redness', keynoteBn: 'উত্তাপ, লালভাব', disposition: 'Violent Delirium', dispositionBn: 'প্রচণ্ড প্রলাপ', icon: Thermometer, color: 'from-red-500 to-red-700' },
    { name: 'Bryonia', nameBn: 'ব্রায়োনিয়া', commonName: 'Wild Hop', commonNameBn: 'ওয়াইল্ড হপ', keynote: 'Worse by motion', keynoteBn: 'নড়াচড়ায় বৃদ্ধি', disposition: 'Irritable, Business-minded', dispositionBn: 'খিটখিটে, বৈষয়িক', icon: Leaf, color: 'from-emerald-600 to-emerald-800' },
    { name: 'Calcarea Carb', nameBn: 'ক্যালকেরিয়া কার্ব', commonName: 'Oyster Shell', commonNameBn: 'ঝিনুকের খোলস', keynote: 'Sweat on head', keynoteBn: 'মাথায় ঘাম', disposition: 'Apprehensive, Fearful', dispositionBn: 'শঙ্কিত, ভীতু', icon: Bone, color: 'from-blue-400 to-blue-600' },
    { name: 'Cantharis', nameBn: 'ক্যান্থারিস', commonName: 'Spanish Fly', commonNameBn: 'স্প্যানিশ ফ্লাই', keynote: 'Burning urination', keynoteBn: 'প্রস্রাবে জ্বালা', disposition: 'Intense irritation', dispositionBn: 'তীব্র উত্তেজনা', icon: Flame, color: 'from-orange-600 to-orange-800' },
    { name: 'Carbo Veg', nameBn: 'কার্বো ভেজ', commonName: 'Vegetable Charcoal', commonNameBn: 'উদ্ভিজ্জ কয়লা', keynote: 'Air hunger', keynoteBn: 'বাতাসের আকাঙ্ক্ষা', disposition: 'Collapsed, Cold', dispositionBn: 'অবসন্ন, শীতল', icon: Wind, color: 'from-gray-600 to-gray-800' },
    { name: 'Causticum', nameBn: 'কস্টিকাম', commonName: 'Hahnemann\'s Tincture', commonNameBn: 'হ্যানিম্যানস টিংচার', keynote: 'Paralytic weakness', keynoteBn: 'পক্ষাঘাতগ্রস্ত দুর্বলতা', disposition: 'Sympathetic, Intense', dispositionBn: 'সহানুভূতিশীল, তীব্র', icon: Activity, color: 'from-indigo-500 to-indigo-700' },
    { name: 'Chamomilla', nameBn: 'ক্যামোমিলা', commonName: 'German Chamomile', commonNameBn: 'জার্মান ক্যামোমাইল', keynote: 'Unbearable pain', keynoteBn: 'অসহ্য ব্যথা', disposition: 'Extremely irritable', dispositionBn: 'অত্যন্ত খিটখিটে', icon: Smile, color: 'from-teal-500 to-teal-700' },
    { name: 'China', nameBn: 'চায়না', commonName: 'Cinchona Bark', commonNameBn: 'সিনকোনা ছাল', keynote: 'Loss of fluids', keynoteBn: 'তরল পদার্থের ক্ষয়', disposition: 'Apathetic, Moody', dispositionBn: 'উদাসীন, খামখেয়ালী', icon: Droplets, color: 'from-brown-500 to-brown-700' },
    { name: 'Colocynth', nameBn: 'কোলোসিন্থ', commonName: 'Bitter Apple', commonNameBn: 'তেতো আপেল', keynote: 'Doubling up pain', keynoteBn: 'দ্বিগুণ হওয়া ব্যথা', disposition: 'Anger, Indignation', dispositionBn: 'রাগ, বিরক্তি', icon: Activity, color: 'from-lime-600 to-lime-800' },
    { name: 'Drosera', nameBn: 'ড্রোসেরা', commonName: 'Sundew', commonNameBn: 'সানডিউ', keynote: 'Barking cough', keynoteBn: 'ঘেউ ঘেউ কাশি', disposition: 'Suspicious', dispositionBn: 'সন্দেহপ্রবণ', icon: Wind, color: 'from-red-400 to-red-600' },
    { name: 'Dulcamara', nameBn: 'ডালকামারা', commonName: 'Bittersweet', commonNameBn: 'বিটারসুইট', keynote: 'Damp cold weather', keynoteBn: 'স্যাঁতসেঁতে ঠান্ডা আবহাওয়া', disposition: 'Quarrelsome', dispositionBn: 'ঝগড়াটে', icon: CloudRain, color: 'from-blue-300 to-blue-500' },
    { name: 'Euphrasia', nameBn: 'ইউফ্রেসিয়া', commonName: 'Eyebright', commonNameBn: 'আইব্রাইট', keynote: 'Acrid lacrimation', keynoteBn: 'তীক্ষ্ণ অশ্রুপাত', disposition: 'Indolent', dispositionBn: 'অলস', icon: Eye, color: 'from-cyan-400 to-cyan-600' },
    { name: 'Ferrum Phos', nameBn: 'ফেরাম ফস', commonName: 'Phosphate of Iron', commonNameBn: 'লোহার ফসফেট', keynote: 'First stage fever', keynoteBn: 'জ্বরের প্রথম পর্যায়', disposition: 'Sensitive, Nervous', dispositionBn: 'সংবেদনশীল, স্নায়বিক', icon: Thermometer, color: 'from-rose-500 to-rose-700' },
    { name: 'Gelsemium', nameBn: 'জেলসেমিয়াম', commonName: 'Yellow Jasmine', commonNameBn: 'হলুদ জেসমিন', keynote: 'Dullness, Dizziness', keynoteBn: 'জড়তা, মাথা ঘোরা', disposition: 'Cowardice, Stage fright', dispositionBn: 'ভীরুতা, মঞ্চভীতি', icon: Brain, color: 'from-yellow-400 to-yellow-600' },
    { name: 'Graphites', nameBn: 'গ্রাফাইটিস', commonName: 'Black Lead', commonNameBn: 'কালো সীসা', keynote: 'Sticky discharge', keynoteBn: 'আঠালো নিঃসরণ', disposition: 'Sad, Despondent', dispositionBn: 'দুঃখিত, হতাশ', icon: Pencil, color: 'from-zinc-500 to-zinc-700' },
    { name: 'Hepar Sulph', nameBn: 'হিপার সালফ', commonName: 'Calcium Sulphide', commonNameBn: 'ক্যালসিয়াম সালফাইড', keynote: 'Hypersensitive', keynoteBn: 'অতি সংবেদনশীল', disposition: 'Angry, Impulsive', dispositionBn: 'রাগী, আবেগপ্রবণ', icon: Zap, color: 'from-orange-400 to-orange-600' },
    { name: 'Hyoscyamus', nameBn: 'হায়োসাইয়ামাস', commonName: 'Henbane', commonNameBn: 'হেনবেন', keynote: 'Jealousy, Suspicion', keynoteBn: 'ঈর্ষা, সন্দেহ', disposition: 'Shameless, Obscene', dispositionBn: 'লজ্জাহীন, অশ্লীল', icon: Brain, color: 'from-purple-500 to-purple-700' },
    { name: 'Ignatia', nameBn: 'ইগ্নেশিয়া', commonName: 'St. Ignatius Bean', commonNameBn: 'সেন্ট ইগ্নেশিয়া বিন', keynote: 'Grief, Paradoxical', keynoteBn: 'শোক, বৈপরীত্য', disposition: 'Emotional, Moody', dispositionBn: 'আবেগপ্রবণ, খামখেয়ালী', icon: Heart, color: 'from-pink-500 to-pink-700' },
    { name: 'Ipecac', nameBn: 'ইপিকাক', commonName: 'Ipecacuanha', commonNameBn: 'ইপিকাকুয়ানহা', keynote: 'Constant nausea', keynoteBn: 'ক্রমাগত বমিভাব', disposition: 'Hard to please', dispositionBn: 'খুশি করা কঠিন', icon: Activity, color: 'from-green-400 to-green-600' },
    { name: 'Kali Bich', nameBn: 'কালি বাইক্রোম', commonName: 'Potassium Bichromate', commonNameBn: 'পটাশিয়াম বাইক্রোমেট', keynote: 'Stringy mucus', keynoteBn: 'আঠালো শ্লেষ্মা', disposition: 'Methodical', dispositionBn: 'নিয়মতান্ত্রিক', icon: FlaskConical, color: 'from-orange-700 to-orange-900' },
    { name: 'Kali Carb', nameBn: 'কালি কার্ব', commonName: 'Potassium Carbonate', commonNameBn: 'পটাশিয়াম কার্বনেট', keynote: 'Stitching pains', keynoteBn: 'সুঁই ফোটানো ব্যথা', disposition: 'Rigid, Duty-bound', dispositionBn: 'কঠোর, কর্তব্যপরায়ণ', icon: Database, color: 'from-blue-700 to-blue-900' },
    { name: 'Lachesis', nameBn: 'ল্যাকেসিস', commonName: 'Surukuku Venom', commonNameBn: 'সুরুকুকু বিষ', keynote: 'Left-sided, Loquacity', keynoteBn: 'বাম দিকের, বাচালতা', disposition: 'Jealous, Suspicious', dispositionBn: 'ঈর্ষান্বিত, সন্দেহপ্রবণ', icon: Zap, color: 'from-purple-700 to-purple-900' },
    { name: 'Ledum Pal', nameBn: 'লিডাম পাল', commonName: 'Marsh Tea', commonNameBn: 'মার্শ টি', keynote: 'Puncture wounds', keynoteBn: 'ছিদ্রযুক্ত ক্ষত', disposition: 'Misanthropic', dispositionBn: 'মানুষবিদ্বেষী', icon: Leaf, color: 'from-teal-600 to-teal-800' },
    { name: 'Lycopodium', nameBn: 'লাইকোপোডিয়াম', commonName: 'Club Moss', commonNameBn: 'ক্লাব মস', keynote: 'Right-sided symptoms', keynoteBn: 'ডান দিকের লক্ষণ', disposition: 'Lack of confidence', dispositionBn: 'আত্মবিশ্বাসের অভাব', icon: Leaf, color: 'from-yellow-600 to-yellow-800' },
    { name: 'Mag Phos', nameBn: 'ম্যাগ ফস', commonName: 'Phosphate of Magnesia', commonNameBn: 'ম্যাগনেসিয়া ফসফেট', keynote: 'Cramping pains', keynoteBn: 'খিঁচুনিযুক্ত ব্যথা', disposition: 'Nervous, Tired', dispositionBn: 'স্নায়বিক, ক্লান্ত', icon: Activity, color: 'from-orange-300 to-orange-500' },
    { name: 'Mercurius Sol', nameBn: 'মারকিউরিয়াস সল', commonName: 'Quicksilver', commonNameBn: 'পারদ', keynote: 'Profuse sweating', keynoteBn: 'প্রচুর ঘাম', disposition: 'Hurried, Slow', dispositionBn: 'তাড়াহুড়ো, ধীর', icon: Droplets, color: 'from-slate-400 to-slate-600' },
    { name: 'Natrum Mur', nameBn: 'ন্যাট্রাম মিউর', commonName: 'Common Salt', commonNameBn: 'লবণ', keynote: 'Sun headache', keynoteBn: 'রোদে মাথাব্যথা', disposition: 'Reserved, Introverted', dispositionBn: 'সংযত, অন্তর্মুখী', icon: Sun, color: 'from-blue-500 to-blue-700' },
    { name: 'Nitric Acid', nameBn: 'নাইট্রিক অ্যাসিড', commonName: 'Aqua Fortis', commonNameBn: 'অ্যাকুয়া ফোর্টিস', keynote: 'Splinter-like pain', keynoteBn: 'কাঁটা ফোটার মতো ব্যথা', disposition: 'Vindictive, Unforgiving', dispositionBn: 'প্রতিহিংসাপরায়ণ, ক্ষমাহীন', icon: FlaskConical, color: 'from-emerald-700 to-emerald-900' },
    { name: 'Nux Vomica', nameBn: 'নাক্স ভূমিকা', commonName: 'Poison Nut', commonNameBn: 'পয়জন নাট', keynote: 'Sedentary life', keynoteBn: 'বসে থাকা জীবনযাপন', disposition: 'Irritable, Impatient', dispositionBn: 'খিটখিটে, অধৈর্য', icon: Zap, color: 'from-slate-600 to-slate-800' },
    { name: 'Phosphorus', nameBn: 'ফসফরাস', commonName: 'Phosphorus', commonNameBn: 'ফসফরাস', keynote: 'Burning, Bleeding', keynoteBn: 'জ্বালা, রক্তপাত', disposition: 'Sympathetic, Social', dispositionBn: 'সহানুভূতিশীল, সামাজিক', icon: Flame, color: 'from-yellow-500 to-yellow-700' },
    { name: 'Phytolacca', nameBn: 'ফাইটোলাক্কা', commonName: 'Poke Root', commonNameBn: 'পোক রুট', keynote: 'Glandular swelling', keynoteBn: 'গ্রন্থি ফোলা', disposition: 'Indifferent to life', dispositionBn: 'জীবনের প্রতি উদাসীন', icon: Activity, color: 'from-purple-400 to-purple-600' },
    { name: 'Platina', nameBn: 'প্লাটিনা', commonName: 'Platinum', commonNameBn: 'প্লাটিনাম', keynote: 'Numbness, Pride', keynoteBn: 'অসারতা, অহংকার', disposition: 'Haughty, Arrogant', dispositionBn: 'উদ্ধত, অহংকারী', icon: Star, color: 'from-slate-300 to-slate-500' },
    { name: 'Pulsatilla', nameBn: 'পালসেটিলা', commonName: 'The Wind Flower', commonNameBn: 'উইন্ড ফ্লাওয়ার', keynote: 'Thirstlessness', keynoteBn: 'তৃষ্ণাহীনতা', disposition: 'Mild, Yielding', dispositionBn: 'নরম, নম্র স্বভাব', icon: Droplets, color: 'from-emerald-500 to-emerald-700' },
    { name: 'Rhus Tox', nameBn: 'রাস টক্স', commonName: 'Poison Ivy', commonNameBn: 'পয়জন আইভি', keynote: 'Better by motion', keynoteBn: 'নড়াচড়ায় উপশম', disposition: 'Restless, Anxious', dispositionBn: 'অস্থির, উদ্বিগ্ন', icon: Activity, color: 'from-red-600 to-red-800' },
    { name: 'Ruta Grav', nameBn: 'রুটা গ্রাভ', commonName: 'Garden Rue', commonNameBn: 'গার্ডেন রু', keynote: 'Injured periosteum', keynoteBn: 'অস্থিবেষ্টনীতে আঘাত', disposition: 'Dissatisfied', dispositionBn: 'অসন্তুষ্ট', icon: Leaf, color: 'from-green-600 to-green-800' },
    { name: 'Sepia', nameBn: 'সিপিয়া', commonName: 'Ink of Cuttlefish', commonNameBn: 'কাটলফিশের কালি', keynote: 'Bearing down', keynoteBn: 'নিচের দিকে চাপ', disposition: 'Indifferent to family', dispositionBn: 'পরিবারের প্রতি উদাসীন', icon: Droplets, color: 'from-indigo-600 to-indigo-800' },
    { name: 'Silicea', nameBn: 'সিলিশিয়া', commonName: 'Pure Flint', commonNameBn: 'বিশুদ্ধ চকমকি পাথর', keynote: 'Suppuration', keynoteBn: 'পুঁজ হওয়া', disposition: 'Yielding but obstinate', dispositionBn: 'নম্র কিন্তু একগুঁয়ে', icon: Database, color: 'from-blue-200 to-blue-400' },
    { name: 'Spongia', nameBn: 'স্পঞ্জিয়া', commonName: 'Roasted Sponge', commonNameBn: 'রোস্টেড স্পঞ্জ', keynote: 'Dry, Croupy cough', keynoteBn: 'শুকনো, ক্রুপ কাশি', disposition: 'Fear of suffocation', dispositionBn: 'দমবন্ধ হওয়ার ভয়', icon: Wind, color: 'from-orange-500 to-orange-700' },
    { name: 'Staphysagria', nameBn: 'স্ট্যাফিসেগ্রিয়া', commonName: 'Stavesacre', commonNameBn: 'স্ট্যাভেসাক্রে', keynote: 'Suppressed anger', keynoteBn: 'দমিত রাগ', disposition: 'Sensitive, Dignified', dispositionBn: 'সংবেদনশীল, মর্যাদাবান', icon: Heart, color: 'from-purple-300 to-purple-500' },
    { name: 'Sulphur', nameBn: 'সালফার', commonName: 'Brimstone', commonNameBn: 'ব্রিমস্টোন', keynote: 'Burning sensations', keynoteBn: 'জ্বালাপোড়া অনুভূতি', disposition: 'Philosophical ragpicker', dispositionBn: 'দার্শনিক স্বভাব', icon: Flame, color: 'from-orange-500 to-orange-700' },
    { name: 'Thuja', nameBn: 'থুজা', commonName: 'Arbor Vitae', commonNameBn: 'আর্বার ভিটা', keynote: 'Warts, Sycosis', keynoteBn: 'আঁচিল, সাইকোসিস', disposition: 'Fixed ideas', dispositionBn: 'বদ্ধমূল ধারণা', icon: Leaf, color: 'from-green-700 to-green-900' },
    { name: 'Veratrum Alb', nameBn: 'ভেরেট্রাম অ্যালব', commonName: 'White Hellebore', commonNameBn: 'সাদা হেলিবোর', keynote: 'Cold sweat on forehead', keynoteBn: 'কপালে ঠান্ডা ঘাম', disposition: 'Religious insanity', dispositionBn: 'ধর্মীয় উন্মাদনা', icon: Droplets, color: 'from-blue-100 to-blue-300' },
    { name: 'Zincum Met', nameBn: 'জিঙ্কাম মেট', commonName: 'Zinc', commonNameBn: 'দস্তা', keynote: 'Fidgety feet', keynoteBn: 'অস্থির পা', disposition: 'Brain fag', dispositionBn: 'মস্তিষ্কের ক্লান্তি', icon: Activity, color: 'from-slate-400 to-slate-600' }
  ];

  const filteredExplore = exploreRemedies.filter(r => 
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    r.nameBn.includes(searchQuery)
  );

  const nextRemedy = () => {
    if (isFlipping) return;
    setFlipDirection(1);
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentRemedyIndex((prev) => (prev + 1) % filteredExplore.length);
      setIsFlipping(false);
    }, 300);
  };

  const prevRemedy = () => {
    if (isFlipping) return;
    setFlipDirection(-1);
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentRemedyIndex((prev) => (prev - 1 + filteredExplore.length) % filteredExplore.length);
      setIsFlipping(false);
    }, 300);
  };

  const currentRemedy = filteredExplore[currentRemedyIndex] || exploreRemedies[0];

  const variants = {
    enter: (direction: number) => ({
      rotateY: direction > 0 ? 90 : -90,
      opacity: 0,
    }),
    center: {
      rotateY: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      rotateY: direction > 0 ? -90 : 90,
      opacity: 0,
    }),
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Section 1: Clinical Knowledge Hub */}
      <section className="space-y-6">
        <div className="flex flex-col lg:flex-row items-baseline justify-between border-b border-slate-200 pb-4 gap-4">
          <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
            Clinical Knowledge Hub <span className="text-sm md:text-lg font-medium text-slate-400 ml-2">(ক্লিনিক্যাল নলেজ হাব)</span>
          </h2>
          <div className="flex items-center gap-4 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input 
                type="text" 
                placeholder="Search remedies... (অনুসন্ধান করুন)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
            <span className="hidden md:inline-block text-[10px] uppercase tracking-widest font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              Updated: Oct 24, 2023
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Aphorism of the Day */}
          <div className="lg:col-span-8 bg-white rounded-[2.5rem] p-6 md:p-10 shadow-sm border border-slate-100 relative overflow-hidden group perspective-1000">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-40 group-hover:scale-110 transition-transform duration-1000" />
            
            <div className="flex items-center justify-between mb-8 relative z-10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-500 rounded-2xl text-white shadow-lg shadow-emerald-200">
                  <BookOpen size={20} />
                </div>
                <span className="font-black text-sm uppercase tracking-widest text-emerald-600">Aphorism of the Day (আজকের অ্যাফোরিজম)</span>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={prevAphorism}
                  className="p-2 bg-slate-50 border border-slate-100 rounded-xl hover:bg-slate-100 transition-colors text-slate-400 hover:text-emerald-600"
                >
                  <ChevronLeft size={16} />
                </button>
                <button 
                  onClick={nextAphorism}
                  className="p-2 bg-slate-50 border border-slate-100 rounded-xl hover:bg-slate-100 transition-colors text-slate-400 hover:text-emerald-600"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
            
            <div className="relative min-h-[350px] md:h-[220px]">
              <AnimatePresence mode="wait" custom={aphorismFlipDirection}>
                <motion.div
                  key={currentAphorismIndex}
                  custom={aphorismFlipDirection}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute inset-0 space-y-4 md:space-y-6 z-10"
                >
                  {/* Directional Click Zones */}
                  <div className="absolute inset-0 z-20 flex">
                    <div className="w-1/2 h-full cursor-w-resize" onClick={(e) => { e.stopPropagation(); prevAphorism(); }} />
                    <div className="w-1/2 h-full cursor-e-resize" onClick={(e) => { e.stopPropagation(); nextAphorism(); }} />
                  </div>

                  <div className="relative pl-6 md:pl-8 border-l-4 border-emerald-500/20">
                    <p className="text-base md:text-xl font-bold text-slate-800 leading-relaxed italic tracking-tight">
                      "{currentAphorism.text}"
                    </p>
                    <p className="mt-2 text-[9px] md:text-xs text-slate-400 font-black uppercase tracking-widest">— Organon of Medicine, Aphorism {currentAphorism.id}</p>
                  </div>
                  <div className="pt-4 md:pt-6 border-t border-slate-50">
                    <p className="text-sm md:text-lg text-slate-600 leading-relaxed font-medium">
                      "{currentAphorism.banglaText}"
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Featured Remedy */}
          <div className="lg:col-span-4 bg-gradient-to-br from-slate-800 to-slate-900 rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between shadow-xl shadow-slate-200 relative overflow-hidden group text-white">
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl -mb-24 -mr-24" />
            
            <div className="relative z-10">
              <span className="text-[10px] uppercase tracking-widest font-black text-emerald-400 mb-2 block">Quick Fact (দ্রুত তথ্য)</span>
              <h3 className="text-3xl font-black mb-1 tracking-tighter">Dynamization</h3>
              <p className="text-sm text-slate-400 font-medium italic">The process of potentization (শক্তিকরণ প্রক্রিয়া)</p>
              
              <div className="mt-8 space-y-4">
                <p className="text-sm leading-relaxed text-slate-300">
                  "Homeopathic dynamizations are processes by which the medicinal properties, which are latent in natural substances while in their crude state, become awakened and developed into activity to an incredible degree."
                </p>
                <p className="text-xs text-emerald-400 font-bold">— Organon §269</p>
              </div>
            </div>
          </div>
        </div>

        {/* Explore Remedies Grid - Interactive Flip Card */}
        <div className="space-y-12">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <h3 className="text-lg md:text-xl font-black text-slate-900 tracking-tight">Featured Study Card <span className="text-xs md:text-sm font-medium text-slate-400 ml-2">(নির্বাচিত পাঠ কার্ড)</span></h3>
                <button 
                  onClick={() => setShowFullLibrary(!showFullLibrary)}
                  className={`p-2 rounded-xl transition-all duration-300 ${showFullLibrary ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200' : 'bg-white border border-slate-200 text-slate-400 hover:border-emerald-200 hover:text-emerald-500'}`}
                  title={showFullLibrary ? "Hide Library" : "Show Full Library"}
                >
                  <ClipboardList size={20} />
                </button>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Card {currentRemedyIndex + 1} of {filteredExplore.length}
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={prevRemedy}
                    className="p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-slate-600"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button 
                    onClick={nextRemedy}
                    className="p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-slate-600"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <div className="relative w-full max-w-md h-[550px] md:h-[500px] perspective-1000">
                <AnimatePresence mode="wait" custom={flipDirection}>
                  <motion.div
                    key={currentRemedyIndex}
                    custom={flipDirection}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className={`absolute inset-0 bg-gradient-to-br ${currentRemedy.color} rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between shadow-2xl group overflow-hidden preserve-3d`}
                  >
                    {/* Directional Click Zones */}
                    <div className="absolute inset-0 z-30 flex">
                      <div className="w-1/2 h-full cursor-w-resize" onClick={(e) => { e.stopPropagation(); prevRemedy(); }} />
                      <div className="w-1/2 h-full cursor-e-resize" onClick={(e) => { e.stopPropagation(); nextRemedy(); }} />
                    </div>

                    <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -mr-24 -mt-24 group-hover:scale-110 transition-transform duration-700" />
                    
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-8">
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase tracking-widest font-black text-white/70 block">Study Card (পাঠ কার্ড)</span>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                            <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Left: Prev | Right: Next</span>
                          </div>
                        </div>
                        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-white backdrop-blur-md border border-white/20 shadow-lg">
                          <currentRemedy.icon size={24} />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-4xl font-black text-white tracking-tighter leading-none">{currentRemedy.name}</h4>
                        <p className="text-lg text-white/90 font-bold tracking-tight">{currentRemedy.nameBn}</p>
                        <div className="pt-2">
                          <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-black text-white/80 uppercase tracking-widest border border-white/10">
                            {currentRemedy.commonName} • {currentRemedy.commonNameBn}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-12 space-y-6">
                        <div className="bg-white/10 p-5 rounded-[1.5rem] backdrop-blur-md border border-white/10 group-hover:bg-white/15 transition-colors">
                          <p className="text-[9px] uppercase tracking-widest font-black text-white/60 mb-2">Keynote (মূল কথা)</p>
                          <p className="text-sm font-bold text-white leading-relaxed">{currentRemedy.keynote}</p>
                          <p className="text-xs font-medium text-white/80 mt-1">{currentRemedy.keynoteBn}</p>
                        </div>
                        <div className="bg-white/10 p-5 rounded-[1.5rem] backdrop-blur-md border border-white/10 group-hover:bg-white/15 transition-colors">
                          <p className="text-[9px] uppercase tracking-widest font-black text-white/60 mb-2">Disposition (স্বভাব)</p>
                          <p className="text-sm font-bold text-white leading-relaxed">{currentRemedy.disposition}</p>
                          <p className="text-xs font-medium text-white/80 mt-1">{currentRemedy.dispositionBn}</p>
                        </div>
                      </div>
                    </div>

                    <div className="relative z-10 flex justify-between items-center mt-8">
                      <button className="text-[10px] font-black text-white flex items-center gap-2 uppercase tracking-widest group/btn">
                        View Full Materia Medica <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                      <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <div key={i} className={`w-1 h-1 rounded-full bg-white/40 ${i === 0 ? 'bg-white w-3' : ''}`} />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Full Explore Remedies Box - Grid View (Conditional) */}
          <AnimatePresence>
            {showFullLibrary && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="space-y-6 overflow-hidden"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">Full Remedy Library <span className="text-sm font-medium text-slate-400 ml-2">(সম্পূর্ণ ঔষধ লাইব্রেরি)</span></h3>
                  <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 uppercase tracking-widest">
                    {filteredExplore.length} Remedies Available
                  </span>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                  {filteredExplore.map((remedy, idx) => (
                    <div 
                      key={idx}
                      onClick={() => {
                        setCurrentRemedyIndex(idx);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`group relative bg-white rounded-3xl p-4 border border-slate-100 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-500/5 transition-all cursor-pointer ${currentRemedyIndex === idx ? 'ring-2 ring-emerald-500 border-transparent' : ''}`}
                    >
                      <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${remedy.color} flex items-center justify-center text-white mb-3 shadow-lg shadow-slate-200 group-hover:scale-110 transition-transform`}>
                        <remedy.icon size={18} />
                      </div>
                      <h4 className="font-black text-sm text-slate-900 truncate">{remedy.name}</h4>
                      <p className="text-[10px] text-slate-400 font-bold truncate mb-2">{remedy.nameBn}</p>
                      <div className="pt-2 border-t border-slate-50">
                        <p className="text-[8px] uppercase tracking-widest font-black text-slate-300 mb-1">Keynote</p>
                        <p className="text-[9px] font-bold text-slate-600 line-clamp-1">{remedy.keynote}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Section 2: Sources of Medicines */}
      <section className="space-y-6">
        <div className="flex flex-col gap-1 border-b border-slate-200 pb-4">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Sources of Medicines <span className="text-lg font-medium text-slate-400 ml-2">(ঔষধের উৎস)</span>
          </h2>
          <p className="text-sm text-emerald-600 font-bold italic">Explicitly described in the Organon of Medicine (অর্গানন অফ মেডিসিন অনুযায়ী)</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Plant Kingdom */}
          <div 
            onClick={() => setSelectedDetail(detailData['Plant Kingdom'])}
            className="group bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-100 hover:border-emerald-200 transition-all flex flex-col cursor-pointer"
          >
            <div className="mb-6 aspect-square rounded-[2rem] overflow-hidden relative shrink-0">
              <div className="grid grid-cols-2 gap-1 h-full w-full">
                <img alt="Aconite" className="w-full h-full object-cover" src="https://picsum.photos/seed/aconite/200/200" referrerPolicy="no-referrer" />
                <img alt="Belladonna" className="w-full h-full object-cover" src="https://picsum.photos/seed/belladonna/200/200" referrerPolicy="no-referrer" />
                <img alt="Pulsatilla" className="w-full h-full object-cover" src="https://picsum.photos/seed/pulsatilla/200/200" referrerPolicy="no-referrer" />
                <img alt="Herbs" className="w-full h-full object-cover" src="https://picsum.photos/seed/herbs/200/200" referrerPolicy="no-referrer" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-4 text-white font-black text-xs uppercase tracking-widest">Plant Kingdom</span>
            </div>
            <div className="flex-1 flex flex-col">
              <h4 className="font-black text-lg mb-2 text-slate-900">উদ্ভিদ জগত (Plant Kingdom)</h4>
              <p className="text-xs text-slate-500 leading-relaxed mb-6">Most extensive source using whole plants, roots, flowers, or leaves.</p>
              <div className="space-y-3 mt-auto">
                <div className="flex items-center gap-2 text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                  <CheckCircle size={14} />
                  <span>Thuja, Pulsatilla, Aconite</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <Leaf size={14} />
                  <span>Roots & Whole plant prep</span>
                </div>
              </div>
            </div>
          </div>

          {/* Animal Kingdom */}
          <div 
            onClick={() => setSelectedDetail(detailData['Animal Kingdom'])}
            className="group bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-100 hover:border-emerald-200 transition-all flex flex-col cursor-pointer"
          >
            <div className="mb-6 aspect-square rounded-[2rem] overflow-hidden relative shrink-0">
              <img alt="Honey bee" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" src="https://picsum.photos/seed/bee/400/400" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-4 text-white font-black text-xs uppercase tracking-widest">Animal Kingdom</span>
            </div>
            <div className="flex-1 flex flex-col">
              <h4 className="font-black text-lg mb-2 text-slate-900">প্রাণী জগত (Animal Kingdom)</h4>
              <p className="text-xs text-slate-500 leading-relaxed mb-6">Derived from secretions, venoms, milk, or whole organisms.</p>
              <div className="space-y-3 mt-auto">
                <div className="flex items-center gap-2 text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                  <CheckCircle size={14} />
                  <span>Apis (Bees), Lachesis (Venom)</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <Droplets size={14} />
                  <span>Secretions & Milk sources</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mineral Kingdom */}
          <div 
            onClick={() => setSelectedDetail(detailData['Mineral Kingdom'])}
            className="group bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-100 hover:border-emerald-200 transition-all flex flex-col cursor-pointer"
          >
            <div className="mb-6 aspect-square rounded-[2rem] overflow-hidden relative shrink-0">
              <img alt="Crystals" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" src="https://picsum.photos/seed/crystals/400/400" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-4 text-white font-black text-xs uppercase tracking-widest">Mineral Kingdom</span>
            </div>
            <div className="flex-1 flex flex-col">
              <h4 className="font-black text-lg mb-2 text-slate-900">খনিজ জগত (Mineral Kingdom)</h4>
              <p className="text-xs text-slate-500 leading-relaxed mb-6">Metals, salts, and chemical compounds in pure or compounded forms.</p>
              <div className="space-y-3 mt-auto">
                <div className="flex items-center gap-2 text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                  <CheckCircle size={14} />
                  <span>Natrum Mur, Calc Carb</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <Database size={14} />
                  <span>Metals & Chemical Salts</span>
                </div>
              </div>
            </div>
          </div>

          {/* Other Sources */}
          <div className="flex flex-col gap-4">
            {[
              { title: 'Nosodes', titleBn: 'নোসোডস', desc: 'Disease products', descBn: 'রোগজ পণ্য', icon: FlaskConical, color: 'emerald' },
              { title: 'Sarcodes', titleBn: 'সারকোডস', desc: 'Healthy tissues', descBn: 'সুস্থ টিস্যু', icon: Activity, color: 'blue' },
              { title: 'Imponderabilia', titleBn: 'ইমপন্ডারেবিলিয়া', desc: 'Energy sources', descBn: 'শক্তির উৎস', icon: Zap, color: 'amber' },
            ].map((item, idx) => (
              <div 
                key={idx} 
                onClick={() => setSelectedDetail(detailData[item.title])}
                className="bg-white rounded-3xl p-5 flex items-center gap-4 border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/30 transition-all cursor-pointer group"
              >
                <div className={`w-12 h-12 rounded-2xl bg-${item.color}-50 flex items-center justify-center text-${item.color}-600 group-hover:scale-110 transition-transform`}>
                  <item.icon size={20} />
                </div>
                <div>
                  <h5 className="text-sm font-black text-slate-800 tracking-tight">{item.title} ({item.titleBn})</h5>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.desc} ({item.descBn})</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Pharmacy Knowledge */}
      <section className="space-y-6">
        <div className="flex items-baseline gap-4 border-b border-slate-200 pb-4">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Pharmacy Knowledge <span className="text-lg font-medium text-slate-400 ml-2">(ফার্মেসি নলেজ)</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Medicine Preparation */}
          <div className="lg:col-span-5 bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl -mr-16 -mt-16" />
            
            <h3 className="text-xl font-black mb-6 text-slate-900 tracking-tight relative z-10">Medicine Preparation (ঔষধ প্রস্তুতি)</h3>
            <p className="text-sm leading-relaxed text-slate-500 mb-8 relative z-10">
              Homeopathic medicines are prepared through **Dynamization** or **Potentization**, reducing the material quantity while enhancing therapeutic power.
            </p>
            
            <div className="space-y-6 relative z-10">
              {[
                { step: 1, title: 'Trituration', titleBn: 'ট্রাইচুরেশন', desc: 'Grinding with milk sugar (Insoluble substances).' },
                { step: 2, title: 'Succussion', titleBn: 'সাকশন', desc: 'Vigorous shaking with alcohol (Soluble substances).' },
                { step: 3, title: 'Dilution', titleBn: 'ডাইলিউশন', desc: 'Serial reduction of material concentration.' },
              ].map((item) => (
                <div 
                  key={item.step} 
                  onClick={() => setSelectedDetail(detailData[item.title])}
                  className="flex items-start gap-5 group cursor-pointer p-2 rounded-2xl hover:bg-slate-50 transition-all"
                >
                  <span className="bg-slate-100 p-2 rounded-xl text-xs font-black w-10 h-10 flex items-center justify-center shrink-0 text-slate-400 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                    {item.step}
                  </span>
                  <div>
                    <p className="text-sm font-black text-slate-800 mb-1">{item.title} ({item.titleBn})</p>
                    <p className="text-xs text-slate-400 font-medium leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scales of Potentization */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { scale: 'Decimal Scale (X)', scaleBn: 'ডেসিমাল স্কেল', ratio: '1:9', founder: 'Constantine Hering', desc: 'Denoted by X or D. Each step reduces by 1/10.' },
              { scale: 'Centesimal Scale (C)', scaleBn: 'সেন্টিসিমাল স্কেল', ratio: '1:99', founder: 'Samuel Hahnemann', desc: 'Denoted by C. Most common scale. Each step reduces by 1/100.' },
              { scale: '50 Millesimal (LM)', scaleBn: '৫০ মিলিসিমাল', ratio: '1:50,000', founder: 'Samuel Hahnemann', desc: 'Introduced in 6th edition of Organon. Denoted by LM or 0/n.' },
            ].map((item, idx) => (
              <div 
                key={idx} 
                onClick={() => setSelectedDetail(detailData[item.scale])}
                className={`bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm hover:border-emerald-200 transition-all cursor-pointer ${idx === 2 ? 'md:col-span-2' : ''}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-lg font-black text-slate-900 tracking-tight">{item.scale} ({item.scaleBn})</h4>
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black rounded-lg border border-emerald-100 uppercase tracking-widest">
                    Ratio {item.ratio}
                  </span>
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Founder: {item.founder}</p>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedDetail && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDetail(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 md:p-12">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">{selectedDetail.title}</h3>
                    <p className="text-emerald-600 font-bold italic text-sm">{selectedDetail.desc}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedDetail(null)}
                    className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-400"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-8">
                  <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
                    <p className="text-sm text-slate-600 leading-relaxed font-medium">
                      {selectedDetail.bn}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h4 className="text-[10px] uppercase tracking-widest font-black text-slate-400">Key Information (মূল তথ্য)</h4>
                      <ul className="space-y-3">
                        {selectedDetail.details.map((detail: string, i: number) => (
                          <li key={i} className="flex items-start gap-3 text-sm font-bold text-slate-700">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-[10px] uppercase tracking-widest font-black text-slate-400">Preparation (প্রস্তুতি)</h4>
                      <p className="text-sm font-medium text-slate-500 leading-relaxed">
                        {selectedDetail.prep}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 flex justify-end">
                  <button 
                    onClick={() => setSelectedDetail(null)}
                    className="px-8 py-3 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg shadow-slate-200"
                  >
                    Got it
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const PharmacyTab = () => {
  return (
    <div className="p-4 md:p-8 space-y-8 max-w-[1600px] mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Pharmacy Knowledge Hub</h1>
            <span className="hidden sm:inline-block px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded border border-emerald-100">Digital Apothecary</span>
          </div>
          <p className="text-slate-500 text-sm font-medium">
            Educational resources and medicine preparation standards.
          </p>
        </div>
      </div>

      <PharmacyKnowledgeHub />
      
      {/* Complete Pharmacy Manual based on prompt */}
      <PharmacyManual />
      
      <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
        <p>© 2024 HomeoDesk Pro. All pharmaceutical data conforms to HPI & HPUS standards.</p>
        <div className="flex gap-6">
          <button className="hover:text-emerald-600 transition-colors">Privacy Policy</button>
          <button className="hover:text-emerald-600 transition-colors">Sync Logs</button>
        </div>
      </div>
    </div>
  );
};

export const PharmacySalesTab = () => {
  const [salesSearch, setSalesSearch] = useState('');
  const [cart, setCart] = useState<any[]>([]);
  const { remedies } = PHARMACY_DEMO_DATA;

  const addToCart = (remedy: any) => {
    const existing = cart.find(item => item.id === remedy.id);
    if (existing) {
      setCart(cart.map(item => item.id === remedy.id ? { ...item, qty: item.qty + 1 } : item));
    } else {
      setCart([...cart, { ...remedy, qty: 1 }]);
    }
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Product Selection */}
      <div className="lg:col-span-7 space-y-6">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Select Remedies</h2>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input 
                type="text" 
                placeholder="Search for sales..."
                value={salesSearch}
                onChange={(e) => setSalesSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {remedies.filter(r => r.name.toLowerCase().includes(salesSearch.toLowerCase())).map(remedy => (
              <div 
                key={remedy.id}
                onClick={() => addToCart(remedy)}
                className="p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-emerald-500 hover:bg-white transition-all cursor-pointer group"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-sm font-black text-slate-900 group-hover:text-emerald-600 transition-colors">{remedy.name}</p>
                    <p className="text-[10px] font-bold text-slate-400">{remedy.potency}</p>
                  </div>
                  <p className="text-sm font-black text-slate-900">৳{remedy.price}</p>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{remedy.quantity} {remedy.unit} left</span>
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-emerald-600 shadow-sm group-hover:bg-emerald-600 group-hover:text-white transition-all">
                    <Plus size={16} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cart / Checkout */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col h-full min-h-[500px]">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Current Bill</h2>
            <button onClick={() => setCart([])} className="text-[10px] font-black text-red-500 uppercase tracking-widest">Clear</button>
          </div>

          <div className="flex-1 space-y-4 mb-8 overflow-y-auto custom-scrollbar pr-2">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-slate-300 space-y-4">
                <ShoppingCart size={48} strokeWidth={1} />
                <p className="text-xs font-bold uppercase tracking-widest">Cart is empty</p>
              </div>
            ) : (
              cart.map((item, i) => (
                <div key={i} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-sm font-black text-emerald-600 shadow-sm">
                      {item.qty}x
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-900">{item.name}</p>
                      <p className="text-[10px] font-bold text-slate-400">{item.potency}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-slate-900">৳{item.price * item.qty}</p>
                    <button 
                      onClick={() => setCart(cart.filter(c => c.id !== item.id))}
                      className="text-[9px] font-black text-red-400 uppercase tracking-widest hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="space-y-4 pt-6 border-t border-slate-100">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Subtotal</span>
              <span className="text-sm font-black text-slate-900">৳{total}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Discount</span>
              <span className="text-sm font-black text-emerald-600">-৳0</span>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-slate-100">
              <span className="text-lg font-black text-slate-900 tracking-tight">Total Amount</span>
              <span className="text-2xl font-black text-slate-900 tracking-tighter">৳{total}</span>
            </div>
            <button className="w-full py-5 bg-emerald-600 text-white rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-200 hover:bg-emerald-700 transition-all mt-4">
              Complete Transaction & Print
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SettingsTab = () => {
  const [activeSection, setActiveSection] = useState('profile');

  const sections = [
    { id: 'profile', label: 'Clinical Profile', icon: User },
    { id: 'preferences', label: 'Preferences', icon: Filter },
    { id: 'database', label: 'Database & Security', icon: Database },
    { id: 'about', label: 'About System', icon: AlertCircle },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="w-full md:w-64 space-y-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl transition-all duration-300 ${
                activeSection === section.id
                  ? 'bg-primary text-white shadow-lg shadow-primary/20'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              <section.icon size={20} />
              <span className="font-manrope font-bold text-sm tracking-tight">{section.label}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-surface-container-lowest rounded-[2.5rem] p-8 md:p-12 shadow-sm min-h-[600px]">
          <AnimatePresence mode="wait">
            {activeSection === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-10"
              >
                <div>
                  <h2 className="font-manrope font-extrabold text-3xl text-on-surface tracking-tight mb-2">Clinical Profile</h2>
                  <p className="text-on-surface-variant text-sm">Manage your professional identity and clinic details.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1">Full Name</label>
                    <input 
                      type="text" 
                      defaultValue="Dr. Rahim Ahmed"
                      className="w-full bg-surface-container-highest px-6 py-4 rounded-2xl font-bold text-on-surface focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1">Specialization</label>
                    <input 
                      type="text" 
                      defaultValue="Chief Homeopathic Physician"
                      className="w-full bg-surface-container-highest px-6 py-4 rounded-2xl font-bold text-on-surface focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1">Clinic Name</label>
                    <input 
                      type="text" 
                      defaultValue="HomeoDesk Pro Clinic"
                      className="w-full bg-surface-container-highest px-6 py-4 rounded-2xl font-bold text-on-surface focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1">Email Address</label>
                    <input 
                      type="email" 
                      defaultValue="dr.rahim@homeodesk.pro"
                      className="w-full bg-surface-container-highest px-6 py-4 rounded-2xl font-bold text-on-surface focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="pt-6">
                  <button className="px-8 py-4 bg-gradient-to-br from-primary to-primary-container text-white rounded-2xl font-manrope font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all">
                    Save Profile Changes
                  </button>
                </div>
              </motion.div>
            )}

            {activeSection === 'preferences' && (
              <motion.div
                key="preferences"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-10"
              >
                <div>
                  <h2 className="font-manrope font-extrabold text-3xl text-on-surface tracking-tight mb-2">System Preferences</h2>
                  <p className="text-on-surface-variant text-sm">Customize your workspace for maximum efficiency.</p>
                </div>

                <div className="space-y-8">
                  <div className="flex items-center justify-between p-6 bg-surface-container-low rounded-3xl">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-tertiary-fixed rounded-2xl flex items-center justify-center text-on-tertiary-fixed">
                        <Sparkles size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-on-surface">AI Assistance</h4>
                        <p className="text-xs text-on-surface-variant">Enable Gemini-powered clinical insights.</p>
                      </div>
                    </div>
                    <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-6 bg-surface-container-low rounded-3xl">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-secondary-container rounded-2xl flex items-center justify-center text-on-secondary-container">
                        <Bell size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-on-surface">Smart Notifications</h4>
                        <p className="text-xs text-on-surface-variant">Get alerted for follow-ups and critical updates.</p>
                      </div>
                    </div>
                    <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-6 bg-surface-container-low rounded-3xl">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-surface-container-highest rounded-2xl flex items-center justify-center text-on-surface-variant">
                        <Type size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-on-surface">Interface Language</h4>
                        <p className="text-xs text-on-surface-variant">Select your preferred system language.</p>
                      </div>
                    </div>
                    <select className="bg-white px-4 py-2 rounded-xl font-bold text-sm border-none focus:ring-2 focus:ring-primary/20 outline-none">
                      <option>English (US)</option>
                      <option>Bengali (BN)</option>
                      <option>Hindi (HI)</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}

            {activeSection === 'database' && (
              <motion.div
                key="database"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-10"
              >
                <div>
                  <h2 className="font-manrope font-extrabold text-3xl text-on-surface tracking-tight mb-2">Database & Security</h2>
                  <p className="text-on-surface-variant text-sm">Secure your clinical data and manage backups.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-8 bg-surface-container-low rounded-[2rem] space-y-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                      <Upload size={24} />
                    </div>
                    <h4 className="font-bold text-on-surface">Cloud Backup</h4>
                    <p className="text-xs text-on-surface-variant leading-relaxed">Sync your patient records to the secure cloud for multi-device access.</p>
                    <button className="w-full py-3 bg-primary text-white rounded-xl font-bold text-xs uppercase tracking-widest mt-4">Sync Now</button>
                  </div>

                  <div className="p-8 bg-surface-container-low rounded-[2rem] space-y-4">
                    <div className="w-12 h-12 bg-secondary-container rounded-2xl flex items-center justify-center text-on-secondary-container">
                      <Database size={24} />
                    </div>
                    <h4 className="font-bold text-on-surface">Export Data</h4>
                    <p className="text-xs text-on-surface-variant leading-relaxed">Download all clinical records in encrypted JSON or CSV format.</p>
                    <button className="w-full py-3 bg-secondary-container text-on-secondary-container rounded-xl font-bold text-xs uppercase tracking-widest mt-4">Export All</button>
                  </div>
                </div>

                <div className="p-8 bg-error/5 rounded-[2rem] border border-error/10">
                  <h4 className="font-bold text-error mb-2">Danger Zone</h4>
                  <p className="text-xs text-on-surface-variant mb-6">These actions are permanent and cannot be undone.</p>
                  <button className="px-6 py-3 bg-error text-white rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                    <Trash2 size={16} />
                    Wipe All Clinical Data
                  </button>
                </div>
              </motion.div>
            )}

            {activeSection === 'about' && (
              <motion.div
                key="about"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-10"
              >
                <div className="flex flex-col items-center text-center py-12">
                  <div className="w-24 h-24 bg-emerald-500 rounded-[2rem] flex items-center justify-center text-white shadow-2xl shadow-emerald-200 mb-8 rotate-3">
                    <Leaf size={48} />
                  </div>
                  <h2 className="font-manrope font-black text-4xl text-slate-900 tracking-tight mb-2">HomeoDesk Pro</h2>
                  <p className="text-emerald-600 font-black uppercase tracking-[0.3em] text-xs mb-8">Clinical Editorial Edition</p>
                  
                  <div className="max-w-md space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-slate-100">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Version</span>
                      <span className="text-sm font-black text-slate-900">2.4.0-stable</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-slate-100">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Build ID</span>
                      <span className="text-sm font-mono text-slate-600">AD-99636397355</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-slate-100">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">License</span>
                      <span className="text-sm font-black text-emerald-600">Professional Enterprise</span>
                    </div>
                  </div>

                  <p className="mt-12 text-[10px] text-slate-400 font-bold uppercase tracking-widest max-w-xs leading-relaxed">
                    Designed for practitioners who value precision, serenity, and the art of clinical observation.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};


