#!/usr/bin/env python3
"""
Parse Kent's Repertory text files → TypeScript for HomeoDesk Pro.
Properly handles indent-based structure in all 4 files.
"""

import re, os, json
from collections import OrderedDict

UPLOAD = "/home/z/my-project/upload"
OUT = "/home/z/my-project/homeodesk-pro/src"

FILES = [
    "1 mind to vtgo .txt",
    "head to face .txt",
    "face (dis colour)to abdomen (dis colour).txt",
    "abdomen(dis colour)to menas.txt",
]

def get_indent(line):
    return len(line) - len(line.lstrip())

def safename(s):
    s = s.lower()
    return re.sub(r'[^a-z0-9]+', '-', s).strip('-')[:60]

def clean(s):
    s = re.sub(r'\s*\((?:See|compare|also|comp\.|with\s.+?)\)\s*', '', s)
    return re.sub(r'\s+', ' ', s).strip()


# ═══════════════════════════════════════════════════════════════
# FILE 1: Numbered outline - "1. chp-MIND", "1.17. ANGER"
# ═══════════════════════════════════════════════════════════════
def parse_file1(path):
    chapters = OrderedDict()
    cur_ch = None
    cur_rub = None
    cur_subs = []

    with open(path, 'r', encoding='utf-8', errors='replace') as f:
        for line in f:
            s = line.strip()
            if not s:
                continue

            # Chapter: "1. chp-MIND"
            m = re.match(r'^(\d+)\.\s*chp-(.+)', s, re.I)
            if m:
                if cur_rub and cur_ch:
                    chapters.setdefault(cur_ch, []).append({'text': cur_rub, 'subs': cur_subs})
                cur_ch = m.group(2).strip().title()
                cur_rub = None
                cur_subs = []
                continue

            # Numbered item
            m = re.match(r'^(\d+(?:\.\d+)+)\.\s+(.+)', s)
            if m:
                depth = len(m.group(1).split('.'))
                text = m.group(2)
                if depth >= 3:
                    cur_subs.append(text)
                else:
                    if cur_rub and cur_ch:
                        chapters.setdefault(cur_ch, []).append({'text': cur_rub, 'subs': cur_subs})
                    cur_rub = text
                    cur_subs = []

    if cur_rub and cur_ch:
        chapters.setdefault(cur_ch, []).append({'text': cur_rub, 'subs': cur_subs})
    return chapters


# ═══════════════════════════════════════════════════════════════
# FILE 2: === markers with chapter name between pairs
# ═══════════════════════════════════════════════════════════════
def parse_file2(path):
    chapters = OrderedDict()
    cur_ch = None
    cur_rub = None
    cur_subs = []
    in_header = False  # True after first ===, waiting for name

    with open(path, 'r', encoding='utf-8', errors='replace') as f:
        for line in f:
            s = line.strip()
            if not s:
                continue

            if s.startswith('Source:') or s.startswith('HOMEOPATHIC'):
                continue

            # === line
            if re.match(r'^={5,}$', s):
                if in_header:
                    # Second === → chapter name was already read
                    in_header = False
                else:
                    # First === → start looking for chapter name
                    if cur_rub and cur_ch:
                        chapters.setdefault(cur_ch, []).append({'text': cur_rub, 'subs': cur_subs})
                    cur_rub = None
                    cur_subs = []
                    in_header = True
                continue

            # Chapter name after ===
            if in_header and not re.match(r'^\d+\.', s):
                cur_ch = s.strip().title()
                continue

            # Numbered rubric
            m = re.match(r'^(\d+)\.\s+(.+)', s)
            if m:
                if cur_rub and cur_ch:
                    chapters.setdefault(cur_ch, []).append({'text': cur_rub, 'subs': cur_subs})
                cur_rub = m.group(2).strip()
                cur_subs = []

    if cur_rub and cur_ch:
        chapters.setdefault(cur_ch, []).append({'text': cur_rub, 'subs': cur_subs})
    return chapters


# ═══════════════════════════════════════════════════════════════
# FILE 3: Markdown ## / ### headers + bullet sub-items
# ═══════════════════════════════════════════════════════════════
def parse_file3(path):
    chapters = OrderedDict()
    cur_ch = None
    cur_rub = None
    cur_subs = []

    with open(path, 'r', encoding='utf-8', errors='replace') as f:
        for line in f:
            s = line.strip()
            if not s:
                continue

            if s.startswith('Source:') or s.startswith('# HOMEOPATHIC') or s.startswith('# Excerpt'):
                continue

            # ## HEADER
            m = re.match(r'^##\s+(.+)', s)
            if m:
                header = m.group(1).strip()
                if cur_rub and cur_ch:
                    chapters.setdefault(cur_ch, []).append({'text': cur_rub, 'subs': cur_subs})

                # Short ALL CAPS = new chapter (e.g. "MOUTH", "TEETH")
                if header == header.upper() and len(header.split()) <= 4 and '(' not in header:
                    cur_ch = header.title()
                    cur_rub = None
                else:
                    # "FACE - DISCOLORATION" → section rubric under Face
                    if '-' in header:
                        first_word = header.split('-')[0].strip().title()
                        if first_word != cur_ch:
                            cur_ch = first_word
                    # Keep as rubric
                    cur_rub = header
                cur_subs = []
                continue

            # ### sub-section
            m = re.match(r'^###\s+(.+)', s)
            if m:
                if cur_rub and cur_ch:
                    chapters.setdefault(cur_ch, []).append({'text': cur_rub, 'subs': cur_subs})
                cur_rub = m.group(1).strip()
                cur_subs = []
                continue

            # Bullet sub-items
            if cur_rub and cur_ch and s.startswith('- '):
                item = s[2:].strip()
                if item and not item.startswith('Modalities:') and not item.startswith('Locations:'):
                    cur_subs.append(item.rstrip(':'))

    if cur_rub and cur_ch:
        chapters.setdefault(cur_ch, []).append({'text': cur_rub, 'subs': cur_subs})
    return chapters


# ═══════════════════════════════════════════════════════════════
# FILE 4: Indent-based - Indent 0=chapter, Indent 2=rubric, Indent 4=sub
# ═══════════════════════════════════════════════════════════════

# Map known ALL CAPS top-level words to canonical chapter names
CHAPTER_MAP = {
    'ABDOMEN': 'Abdomen',
    'RECTUM': 'Stool',
    'STOOL': 'Stool',
    'URINARY': 'Urine',
    'URINARY ORGANS': 'Urine',
    'KIDNEYS': 'Kidney',
    'PROSTATE': 'Male Genitalia',
    'PROSTATE GLAND': 'Male Genitalia',
    'URETHRA': 'Urethra',
    'GENITALIA': 'Female Genitalia',
    'GENITALIA - FEMALE': 'Female Genitalia',
    'MALE GENITALIA': 'Male Genitalia',
    'FEMALE GENITALIA': 'Female Genitalia',
    'BLADDER': 'Bladder',
    'LARYNX': 'Larynx and Trachea',
    'RESPIRATION': 'Respiration',
    'COUGH': 'Cough',
    'EXPECTORATION': 'Expectoration',
    'CHEST': 'Chest',
    'HEART': 'Heart',
    'BACK': 'Back',
    'EXTREMITIES': 'Extremities',
    'UPPER LIMBS': 'Extremities',
    'LOWER LIMBS': 'Extremities',
    'SLEEP': 'Sleep',
    'DREAMS': 'Sleep',
    'CHILL': 'Chills',
    'FEVER': 'Fever',
    'PERSPIRATION': 'Perspiration',
    'SWEAT': 'Perspiration',
    'SKIN': 'Skin',
    'GENERALITIES': 'Generalities',
    'THROAT': 'Throat',
    'EXTERNAL THROAT': 'External Throat',
    'MOUTH': 'Mouth',
    'TEETH': 'Teeth',
    'TASTE': 'Taste',
    'NOSE': 'Nose',
    'SMELL': 'Smell',
    'EYE': 'Eye',
    'VISION': 'Vision',
    'EAR': 'Ear',
    'HEARING': 'Hearing',
    'FACE': 'Face',
    'HEAD': 'Head',
    'MIND': 'Mind',
    'VERTIGO': 'Vertigo',
    'STOMACH': 'Stomach',
    'HYPOCHONDRIUM': 'Hypochondrium',
    'UMBILICUS': 'Umbilicus',
    'UMBILICAL REGION': 'Umbilicus',
    'HYPOGASTRIUM': 'Hypochondrium',
    'MALE': 'Male Genitalia',
    'FEMALE': 'Female Genitalia',
    'MENSTRUATION': 'Female Genitalia',
    'LEUCORRHOEA': 'Female Genitalia',
    'DYSMENORRHOEA': 'Female Genitalia',
    'PREGNANCY': 'Female Genitalia',
    'LABOR': 'Female Genitalia',
    'MENOPAUSE': 'Female Genitalia',
    'UTERUS': 'Female Genitalia',
    'OVARY': 'Female Genitalia',
    'OVARIES': 'Female Genitalia',
    'VAGINA': 'Female Genitalia',
    'MAMMAE': 'Female Genitalia',
    'SCROTUM': 'Male Genitalia',
    'TESTES': 'Male Genitalia',
    'TESTICLES': 'Male Genitalia',
    'PENIS': 'Male Genitalia',
    'SEMINAL': 'Male Genitalia',
    'SEXUAL': 'Male Genitalia',
}

def parse_file4(path):
    chapters = OrderedDict()
    cur_ch = 'Abdomen'
    cur_rub = None
    cur_subs = []

    with open(path, 'r', encoding='utf-8', errors='replace') as f:
        for line in f:
            s = line.strip()
            if not s:
                continue

            ind = get_indent(line)

            # Indent 0: chapter header (ALL CAPS, short)
            if ind == 0 and s == s.upper() and any(c.isalpha() for c in s) and len(s) < 40:
                if not s.startswith('extending') and not s.startswith('turning') and not s.startswith('(') and not s.startswith('ring'):
                    # Try to match to a known chapter
                    matched = False
                    for key, ch_name in CHAPTER_MAP.items():
                        if key in s.upper():
                            if cur_rub:
                                chapters.setdefault(cur_ch, []).append({'text': cur_rub, 'subs': cur_subs})
                            cur_ch = ch_name
                            cur_rub = None
                            cur_subs = []
                            matched = True
                            break
                    if matched:
                        continue

            # Indent 2: rubric name
            if ind == 2:
                if cur_rub:
                    chapters.setdefault(cur_ch, []).append({'text': cur_rub, 'subs': cur_subs})
                cur_rub = s.rstrip(':').strip()
                cur_subs = []
                continue

            # Indent 4+: sub-rubric
            if ind >= 4 and cur_rub:
                sub = s.rstrip(':').strip()
                if sub and not sub.startswith('('):
                    cur_subs.append(sub)

    if cur_rub:
        chapters.setdefault(cur_ch, []).append({'text': cur_rub, 'subs': cur_subs})
    return chapters


# ═══════════════════════════════════════════════════════════════
# MERGE & OUTPUT
# ═══════════════════════════════════════════════════════════════

def build_categories(all_chapters):
    cats = {}
    for ch, rubs in all_chapters.items():
        items = []
        for r in rubs:
            t = clean(r['text'])
            if t:
                items.append(t)
            for sub in r['subs'][:10]:
                st = clean(f"{r['text']} - {sub}")
                if st and len(st) < 80:
                    items.append(st)
        if items:
            cats[ch] = items
    return cats


def build_data(all_chapters):
    data = []
    for ch, rubs in all_chapters.items():
        cid = safename(ch)
        entries = []
        n = 0
        for r in rubs:
            t = clean(r['text'])
            if not t:
                continue
            n += 1
            entries.append({'id': f'{cid}-{n}', 'text': t, 'chapter': ch})
            for sub in r['subs'][:15]:
                st = clean(f"{t} - {sub}")
                if st:
                    n += 1
                    entries.append({'id': f'{cid}-{n}', 'text': st, 'chapter': ch})
        if entries:
            data.append({'id': cid, 'chapter': ch, 'rubrics': entries})
    return data


def to_ts(data):
    lines = ["import { RubricData } from './types';", "",
             "export const KENT_REPERTORY_DATA: RubricData[] = ["]
    for entry in data:
        lines.append("  {")
        lines.append(f"    id: '{entry['id']}',")
        lines.append(f"    chapter: '{entry['chapter']}',")
        lines.append("    rubrics: [")
        for r in entry['rubrics']:
            txt = r['text'].replace("\\", "\\\\").replace("'", "\\'").replace('"', '\\"').replace('\n', ' ').replace('\r', '')
            lines.append(f"      {{ id: '{r['id']}', text: '{txt}', chapter: '{r['chapter']}', remedies: [] as string[], grade: 1 }},")
        lines.append("    ],")
        lines.append("  },")
    lines.append("];")
    return '\n'.join(lines)


def main():
    all = OrderedDict()

    print("=== File 1: Mind/Vertigo/Head ===")
    ch1 = parse_file1(os.path.join(UPLOAD, FILES[0]))
    for c, r in ch1.items():
        all.setdefault(c, []).extend(r)
        print(f"  {c}: {len(r)} rubrics")

    print("\n=== File 2: Head/Eye/Vision/Ear/Hearing/Nose/Face ===")
    ch2 = parse_file2(os.path.join(UPLOAD, FILES[1]))
    for c, r in ch2.items():
        all.setdefault(c, []).extend(r)
        print(f"  {c}: {len(r)} rubrics")

    print("\n=== File 3: Face/Mouth/Teeth/Throat/Stomach/Abdomen ===")
    ch3 = parse_file3(os.path.join(UPLOAD, FILES[2]))
    for c, r in ch3.items():
        all.setdefault(c, []).extend(r)
        print(f"  {c}: {len(r)} rubrics")

    print("\n=== File 4: Abdomen/Menstruation ===")
    ch4 = parse_file4(os.path.join(UPLOAD, FILES[3]))
    for c, r in ch4.items():
        all.setdefault(c, []).extend(r)
        print(f"  {c}: {len(r)} rubrics")

    print(f"\n{'='*50}")
    print(f"MERGED: {len(all)} chapters")
    for c, r in all.items():
        print(f"  {c}: {len(r)} rubrics")

    cats = build_categories(all)
    data = build_data(all)
    total = sum(len(e['rubrics']) for e in data)
    print(f"\nTotal entries (with sub-rubrics): {total:,}")

    # Write TypeScript
    ts = to_ts(data)
    p = os.path.join(OUT, "kentRepertoryData.ts")
    with open(p, 'w', encoding='utf-8') as f:
        f.write(ts)
    print(f"\nWrote {p} ({os.path.getsize(p):,} bytes)")

    # Write categories JSON
    jp = os.path.join(OUT, "_repertory_categories.json")
    with open(jp, 'w', encoding='utf-8') as f:
        json.dump(cats, f, indent=2, ensure_ascii=False)
    print(f"Wrote {jp}")

    print("\nDone!")


if __name__ == '__main__':
    main()
