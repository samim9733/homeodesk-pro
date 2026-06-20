import fs from 'fs';

const restOfFile = `  {
    name: "Eye",
    tr: "চোখ",
    icon: "👁️",
    pages: "235-270",
    rubrics: [
      {
        name: "Inflammation",
        tr: "প্রদাহ",
        em: "🔥",
        sr: [
          {
            name: "Inflammation, general",
            tr: "প্রদাহ, সাধারণ",
            em: "🔥",
            d: {
              location: [{ n: "Acon.", g: 1 }, { n: "Bell.", g: 1 }, { n: "Euphr.", g: 1 }, { n: "Merc.", g: 1 }],
              sensation: [{ n: "Acon.", g: 1 }],
              modality: [{ n: "Euphr.", g: 1 }],
              concomitant: [],
              psychological: [],
              general: {},
              physiological: []
            }
          }
        ]
      }
    ]
  },
  {
    name: "Vision",
    tr: "দৃষ্টিশক্তি",
    icon: "👀",
    pages: "271-285",
    rubrics: [
      {
        name: "Blurred",
        tr: "অস্পষ্ট",
        em: "🌫️",
        sr: [
          {
            name: "Blurred vision",
            tr: "অস্পষ্ট দৃষ্টি",
            em: "🌫️",
            d: {
              location: [{ n: "Gels.", g: 1 }, { n: "Phos.", g: 1 }, { n: "Cycl.", g: 1 }],
              sensation: [{ n: "Gels.", g: 1 }],
              modality: [{ n: "Phos.", g: 1 }],
              concomitant: [],
              psychological: [],
              general: {},
              physiological: []
            }
          }
        ]
      }
    ]
  },
  {
    name: "Ear",
    tr: "কান",
    icon: "👂",
    pages: "285-320",
    rubrics: [
      {
        name: "Noises",
        tr: "শব্দ",
        em: "🔔",
        sr: [
          {
            name: "Noises in ear",
            tr: "কানে শব্দ",
            em: "🔔",
            d: {
              location: [{ n: "Chinas.", g: 1 }, { n: "Graph.", g: 1 }, { n: "Puls.", g: 1 }],
              sensation: [{ n: "Chinas.", g: 1 }],
              modality: [{ n: "Graph.", g: 1 }],
              concomitant: [],
              psychological: [],
              general: {},
              physiological: []
            }
          }
        ]
      }
    ]
  },
  {
    name: "Nose",
    tr: "নাক",
    icon: "👃",
    pages: "324-354",
    rubrics: [
      {
        name: "Coryza",
        tr: "সর্দি",
        em: "🤧",
        sr: [
          {
            name: "Coryza, fluent",
            tr: "সর্দি, তরল",
            em: "💧",
            d: {
              location: [{ n: "Ars.", g: 1 }, { n: "Allium-c.", g: 1 }, { n: "Merc.", g: 1 }, { n: "Puls.", g: 1 }],
              sensation: [{ n: "Ars.", g: 1 }],
              modality: [{ n: "Allium-c.", g: 1 }],
              concomitant: [],
              psychological: [],
              general: {},
              physiological: []
            }
          }
        ]
      }
    ]
  },
  {
    name: "Face",
    tr: "মুখমণ্ডল",
    icon: "🧔",
    pages: "355-396",
    rubrics: [
      {
        name: "Discoloration",
        tr: "বিবর্ণতা",
        em: "🎨",
        sr: [
          {
            name: "Discoloration, pale",
            tr: "বিবর্ণতা, ফ্যাকাশে",
            em: "⚪",
            d: {
              location: [{ n: "Ferr.", g: 1 }, { n: "Ars.", g: 1 }, { n: "Calc.", g: 1 }],
              sensation: [{ n: "Ferr.", g: 1 }],
              modality: [{ n: "Ars.", g: 1 }],
              concomitant: [],
              psychological: [],
              general: {},
              physiological: []
            }
          }
        ]
      }
    ]
  },
  {
    name: "Generalities",
    tr: "সাধারণ লক্ষণ",
    icon: "🌐",
    pages: "1341-1423",
    rubrics: [
      {
        name: "Weakness",
        tr: "দুর্বলতা",
        em: "😩",
        sr: [
          {
            name: "Weakness, morning",
            tr: "দুর্বলতা, সকালে",
            em: "🌅",
            d: {
              location: [{ n: "Sulph.", g: 1 }, { n: "Lach.", g: 1 }, { n: "Sep.", g: 2 }, { n: "Lyc.", g: 2 }, { n: "Calc.", g: 3 }],
              sensation: [{ n: "Sulph.", g: 1 }, { n: "Sep.", g: 2 }, { n: "Lach.", g: 3 }],
              modality: [{ n: "Sulph.", g: 1 }, { n: "Lach.", g: 2 }, { n: "Sep.", g: 2 }, { n: "Calc.", g: 3 }],
              concomitant: [{ n: "Sep.", g: 1 }, { n: "Calc.", g: 2 }],
              psychological: [{ n: "Lach.", g: 1 }, { n: "Sep.", g: 2 }],
              general: {
                g_time: [{ n: "Sulph.", g: 1 }, { n: "Lach.", g: 1 }, { n: "Sep.", g: 2 }],
                g_temp: [{ n: "Sulph.", g: 1 }, { n: "Sep.", g: 2 }],
                g_phys: [{ n: "Sep.", g: 1 }, { n: "Calc.", g: 2 }],
                g_pos: [{ n: "Sulph.", g: 1 }],
                g_patho: [{ n: "Calc.", g: 1 }, { n: "Phos.", g: 2 }],
                g_pfact: [{ n: "Sulph.", g: 1 }],
                g_disc: [{ n: "Nat-m.", g: 1 }, { n: "Sep.", g: 2 }],
                g_side: [{ n: "Lach.", g: 1 }, { n: "Lyc.", g: 2 }],
                g_alt: [{ n: "Ign.", g: 2 }],
                g_crav: [{ n: "Sulph.", g: 1 }, { n: "Calc.", g: 2 }]
              },
              physiological: [{ n: "Sulph.", g: 1 }, { n: "Lach.", g: 2 }, { n: "Sep.", g: 2 }, { n: "Calc.", g: 3 }]
            }
          }
        ]
      }
    ]
  }
];`;

const mindRubricsRaw = [
  "Abandoned", "Abrupt", "Absent-minded", "Absorbed", "Abstraction", "Abusive", "Activity", "Acuteness", "Admonition", "Affectation", "Affectionate", "Agitation", "Air castles", "Ambition", "Amorous", "Amusement", "Anger", "Anguish", "Answers", "Antagonism", "Anthropophobia", "Anticipation", "Antics", "Anxiety", "Apathy", "Apprehensions", "Ardent", "Arrogance", "Asks", "Attention", "Attitudes", "Audacity", "Automatic", "Avarice", "Aversion", "Bad news", "Barking", "Bashful", "Battles", "Bed", "Begging", "Bellowing", "Bemoaning", "Benevolence", "Benumbed", "Bewildered", "Biting", "Black", "Blindness", "Blood", "Boldness", "Break", "Brooding", "Buffoonery", "Business", "Busy", "Calmness", "Calumniate", "Capriciousness", "Carefulness", "Careless", "Cares", "Carphologia", "Carried", "Cautious", "Censorious", "Chagrin", "Changeable", "Chaotic", "Chases", "Cheerful", "Childish", "Children", "Circumspection", "Clairvoyance", "Clinging", "Closing", "Cloudiness", "Color", "Company", "Complaining", "Comprehension", "Concentration", "Confidence", "Confiding", "Confounding", "Confusion", "Conscientious", "Consolation", "Contemptuous", "Contented", "Contentions", "Contradict", "Contradiction", "Contrary", "Conversation", "Cosmopolitan", "Counting", "Courageous", "Covetous", "Cowardice", "Crawling", "Crazy", "Critical", "Croaking", "Cruelty", "Cursing", "Cut", "Dancing", "Darkness", "Deafness", "Death", "Deceitful", "Deeds", "Defiant", "Dejection", "Delirium", "Delusions", "Deserted", "Desires", "Despair", "Despises", "Despondency", "Destructiveness", "Dictatorial", "Dipsomania", "Disagreeable", "Disconcerted", "Discontented", "Discouraged", "Disgust", "Disobedience", "Displeased", "Dissatisfied", "Distance", "Distraction", "Distrustful", "Disturbed", "Diversion", "Dogmatic", "Domineering", "Doubtful", "Dread", "Dream", "Drinking", "Drunken", "Dulness", "Duplicity", "Dwells", "Earnestness", "Eat", "Eccentricity", "Ecstacy", "Egotism", "Embarrassed", "Embraces", "Emotional", "Ennui", "Entertainment", "Envy", "Escape", "Estranged", "Exaltation", "Excitement", "Exclamation", "Exercise", "Exertion", "Exhilaration", "Extravagance", "Facetiousness", "Faces", "Fanaticism", "Fancies", "Fastidious", "Faultfinding", "Fear", "Feces", "Feigning", "Fickle", "Fidgety", "Fight", "Fire", "Fitful", "Fixed notions", "Flattery", "Foolish", "Forebodings", "Forgetful", "Forgotten", "Forsaken", "Forsakes", "Frantic", "Fright", "Frightened", "Frivolous", "Frown", "Fur", "Fury", "Gayety", "Gentleness", "Gestures", "Giggling", "Gloomy", "Godless", "Going out", "Good humor", "Gossiping", "Gravity", "Grief", "Grimaces", "Groaning", "Groping", "Growling", "Grumbling", "Grunting", "Happy", "Hardhearted", "Hastiness", "Hatred", "Haughty", "Headstrong", "Heedless", "Helplessness", "Hide", "Hides", "High places", "High-spirited", "Hilarity", "Home", "Home-sickness", "Honor", "Hopeful", "Hopeless", "Horrible", "Horror", "Howling", "Humor", "Humorous", "Hurry", "Husband", "Hydrophobia", "Hypochondriacal", "Hypocrisy", "Hysteria", "Ideas", "Idiocy", "Imbecility", "Impatience", "Imperious", "Impertinence", "Impetuous", "Imprudence", "Impulse", "Impulsive", "Inciting", "Inconsolable", "Inconstancy", "Indifference", "Indignation", "Indiscretion", "Indolence", "Industrious", "Inhumanity", "Injure", "Inquisitive", "Insanity", "Insensibility", "Insolent", "Instability", "Intoxication", "Introspection", "Irascibility", "Irksome", "Irresolution", "Irritability", "Isolation", "Jealousy", "Jesting", "Joy", "Joyless", "Joyous", "Jumping", "Kicks", "Kill", "Killed", "Kisses", "Kleptomania", "Kneeling", "Lamenting", "Lasciviousness", "Laughing", "Lewdness", "Libertinism", "Lie", "Light", "Listless", "Lively", "Loathing", "Locality", "Loneliness", "Longing", "Looked", "Loquacity", "Love", "Low-minded", "Low-spirits", "Ludicrous", "Magnetized", "Malicious", "Mania", "Mania-a-potu", "Marriage", "Meddlesome", "Meditation", "Melancholy", "Memory", "Men", "Mental", "Mesmerized", "Mildness", "Mirth", "Misanthropy", "Mischievous", "Miserly", "Mistakes", "Moaning", "Mocking", "Monomania", "Mood", "Moonlight", "Moral", "Morose", "Mortification", "Motions", "Murder", "Music", "Mutilating", "Muttering", "Naked", "Narrating", "New", "Noise", "Nymphomania", "Obscene", "Obstinate", "Occupation", "Offended", "Over-sensitive", "Pertinacity", "Petulant", "Phlegmatic", "Picking", "Piety", "Pities", "Plans", "Playful", "Pleasure", "Positiveness", "Power", "Praying", "Precocity", "Pre-occupied", "Presumptuous", "Pride", "Prophesying", "Prostration", "Pull", "Quarrelsome", "Questions", "Quick", "Quiet", "Rage", "Rashness", "Reading", "Recognize", "Refuses", "Religious", "Remorse", "Reproaches", "Repulsive", "Reserved", "Resolute", "Rest", "Restlessness", "Reveals", "Revengeful", "Reverence", "Reveries", "Ridicule", "Ridiculous", "Riding", "Rocking", "Rolling", "Roving", "Rudeness", "Runs", "Sadness", "Scolding", "Scorn", "Scratches", "Scream", "Scrupulous", "Searching", "Secretive", "Secrets", "Selfishness", "Senses", "Sensitive", "Sentimental", "Serene", "Serious", "Sexual", "Shameless", "Shining", "Shrieking", "Shy", "Sighing", "Silent", "Silly", "Singing", "Sit", "Sitting", "Size", "Slander", "Slowness", "Sluggishness", "Smaller", "Smiling", "Sneers", "Sobbing", "Society", "Solemn", "Solitude", "Somnambulism", "Sorrowful", "Speech", "Spiteful", "Spits", "Spoken", "Squanders", "Starting", "Stories", "Strange", "Stranger", "Striking", "Stubborn", "Study", "Stunned", "Stupefaction", "Stupidity", "Stupor", "Succeeds", "Suggestions", "Suicidal", "Sulky", "Sullen", "Superstitious", "Surprises", "Suspicious", "Swearing", "Sympathetic", "Talk", "Talkative", "Talking", "Talks", "Tears", "Theorizing", "Thinking", "Thoughts", "Throws", "Thunder", "Time", "Timidity", "Torpor", "Touch", "Touched", "Tranquility", "Travel", "Trifles", "Unattractive", "Unconsciousness", "Undertakes", "Unfeeling", "Unfortunate", "Unfriendly", "Unobserving", "Unreal", "Unsympathetic", "Untruthful", "Unworthy", "Vacillation", "Veneration", "Verses", "Vexation", "Vindictive", "Violent", "Visions", "Vivacious", "Wailing", "Walking", "Wander", "Wants", "Washing", "Weakness", "Wearisome", "Weary", "Weeping", "Well", "Whimsical", "Whining", "Whistling", "Wicked", "Wild", "Wildness", "Will", "Witty", "Women", "Work", "Writing", "Wrong"
];
const vertigoRubricsRaw = [
  "Morning", "Forenoon", "Noon", "Afternoon", "Evening", "Night", "Air", "Alcoholic", "Anger", "Anxiety", "Ascending", "Back", "Balancing", "Bathing", "Bed", "Beer", "Bending", "Blowing", "Bread", "Breakfast", "Breath", "Child", "Chill", "Chilliness", "Chronic", "Closing", "Coffee", "Coition", "Cold", "Colic", "Colored", "Concussion", "Constipation", "Continuous", "Coryza", "Coughing", "Crossing", "Crowd", "Damp", "Dark", "Descending", "Dilated", "Dinner", "Diplopia", "Drinking", "Eating", "Elevated", "Emission", "Epilepsy", "Epileptic", "Erections", "Eructations", "Eruptions", "Exercising", "Exertion", "Falling", "Fall", "Floating", "Fright", "Fulness", "Gargling", "Gaslight", "Headache", "Heat", "High", "House", "Hungry", "Injuries", "Inspiration", "Intoxicated", "Kneading", "Kneeling", "Leaning", "Left", "Lifting", "Lights", "Lightning", "Looking", "Loss", "Lying", "Meditating", "Menses", "Mental", "Mirror", "Motion", "Moving", "Nausea", "Noise", "Objects", "Occipital", "Odor", "Old", "Opening", "Painful", "Paroxysmal", "Periodical", "Pregnancy", "Raising", "Reaching", "Reading", "Reeling", "Relaxation", "Rest", "Resting", "Riding", "Right", "Rising", "Rocking", "Rubbing", "Sewing", "Shaking", "Shaving", "Sinking", "Sitting", "Sleep", "Sleepiness", "Smoking", "Sneezing", "Spring", "Staggering", "Standing", "Stars", "Stomach", "Stool", "Stooping", "Supper", "Stretching", "Stupefaction", "Sudden", "Summer", "Sunlight", "Supporting", "Suspension", "Swimming", "Swinging", "Syncope", "Syphilitic", "Talking", "Tea", "Thinking", "Touch", "Trembling", "Turned", "Turning", "Urination", "Vertex", "Vexation", "Vision", "Vomiting", "Walking", "Warm", "Warmth", "Washing", "Watching", "Water", "Will", "Windy", "Wine", "Wiping", "Writing", "Yawning"
];
const headRubricsRaw = [
  "Air or Wind", "Alive", "Asleep", "Balancing", "Baldness", "Ball", "Band", "Beats", "Bend", "Board", "Boiling", "Bores", "Bubbling", "Caries", "Cephalematoma", "Clucking", "Coldness", "Coition", "Cold", "Commotion", "Compression", "Concussion", "Congestion", "Constriction", "Contraction", "Covers", "Crackling", "Crawling", "Dandruff", "Dilated", "Distention", "Dragging", "Drawn", "Elongated", "Empty", "Enlarged", "Eruption", "Erysipelas", "Exostoses", "Expanded", "Falling", "Flapping", "Flattened", "Fluctuation", "Fontanelles", "Formication", "Fringe", "Fullness", "Fungus", "Gurgling", "Hair", "Hands", "Hat", "Headless", "Heat", "Heaviness", "Heaving", "Hold", "Hollow", "Horripilation", "Hydrocephalus", "Inflammation", "Injuries", "Intoxication", "Itching", "Jerking", "Knocking", "Knocks", "Large", "Lean", "Lice", "Lifting", "Lightness", "Looseness", "Lump", "Lupus", "Lying", "Marble", "Motions", "Nodding", "Numbness", "Edema", "Oily", "Open", "Opening", "Pain"
];

function objToStr(arr) {
  let inner = arr.map(r => `      {
        name: "${r}",
        tr: "",
        em: "🧠",
        sr: [{ name: "${r}, general", tr: "", em: "🧠", d: { general: {}, location: [] } }]
      }`).join(',\n');
  return `[\n${inner}\n    ]`;
}

let result = `import { Chapter } from './types';

export const REPERTORY_DATA: Chapter[] = [
  {
    name: "Mind",
    tr: "মন",
    t: "মন",
    icon: "🧠",
    pages: "1-95",
    rubrics: ${objToStr(mindRubricsRaw).replace(/🧠/g, '🧠')}
  },
  {
    name: "Vertigo",
    tr: "মাথা ঘোরা",
    icon: "💫",
    pages: "96-106",
    rubrics: ${objToStr(vertigoRubricsRaw).replace(/🧠/g, '💫').replace(/psychological/g, 'location')}
  },
  {
    name: "Head",
    tr: "মাথা",
    icon: "🤕",
    pages: "107-234",
    rubrics: ${objToStr(headRubricsRaw).replace(/🧠/g, '🤕').replace(/psychological/g, 'location')}
  },
${restOfFile}
`;

fs.writeFileSync('src/repertoryData.ts', result);
console.log("Successfully restored and updated reportyData.ts");
