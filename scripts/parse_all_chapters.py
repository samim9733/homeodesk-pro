#!/usr/bin/env python3
"""
Parse all missing chapters from Kent's Repertory book and generate TypeScript.
Uses known chapter positions for accuracy.
"""
import re
import json

BOOK = '/home/z/my-project/upload/Repertory_of_the_Homoeopathic_Materia_Me-compressed_extracted.txt'
DATA_FILE = '/home/z/my-project/homeodesk-pro/src/kentRepertoryData.ts'

with open(BOOK, 'r') as f:
    lines = [l.rstrip('\n') for l in f.readlines()]

# Known chapter positions (line numbers of chapter headers)
CHAPTERS = {
    'SLEEP': (110922, 113598),
    'BLADDER': (60242, 62289),
    'GENITALIA Male': (64647, 69376),
    'GENITALIA Female': (64647, 69376),  # Same section, will split
    'LARYNX AND TRACHEA': (69376, 70701),
    'RESPIRATION': (70701, 72094),
    'COUGH': (72094, 75116),
    'EXPECTORATION': (75116, 76054),
    'CHEST': (76054, 81379),
    'BACK': (81379, 87217),
    'EXTREMITIES': (87217, 110922),
    'CHILL': (113598, 114921),
    'FEVER': (114921, 116341),
    'PERSPIRATION': (116341, 117261),
    'SKIN': (117261, 120917),
    'GENERALITIES': (120917, len(lines)),
}

# For small chapters, also parse to check/add rubrics
SMALL_CHAPTERS = {
    'HEARING': (30906, 32000),
    'VISION': (26390, 27500),
    'PROSTATE GLAND': (62289, 64647),
}

def clean_remedy(r):
    """Clean a remedy abbreviation."""
    r = r.strip().rstrip('.').strip()
    # Fix common OCR issues
    r = re.sub(r'\s+', '', r)  # remove internal spaces
    r = r.replace('æ', 'ae').replace('Æ', 'Ae')
    if len(r) < 2:
        return None
    if r.lower() in ('see', 'compare', 'also'):
        return None
    return r

def extract_remedies(text):
    """Extract remedy abbreviations from a line of text."""
    if not text:
        return []
    # Split by commas and spaces
    parts = re.split(r'[,\s]+', text)
    remedies = []
    for p in parts:
        p = p.strip().rstrip('.')
        if not p or len(p) < 2:
            continue
        # Skip non-remedy words
        if p.lower() in ('see', 'compare', 'also', 'during', 'after', 'before', 
                         'morning', 'evening', 'night', 'daytime', 'noon', 'forenoon',
                         'afternoon', 'agg', 'amel', 'etc'):
            continue
        # Remedy pattern: starts with uppercase, may have hyphens, numbers
        if re.match(r'^[A-Z][a-zA-Z0-9\-]*$', p):
            # Must look like a remedy (not a regular word)
            if not p.isalpha() or len(p) <= 5 or '-' in p or p[1:3].islower():
                remedies.append(p)
    return remedies

def parse_chapter_section(ch_name, start, end, ch_id_prefix):
    """Parse a chapter section and return TypeScript rubric entries."""
    section_lines = lines[start:end]
    
    rubrics = []
    current_main = None
    current_main_remedies = []
    rubric_num = 1
    
    i = 0
    while i < len(section_lines):
        line = section_lines[i]
        stripped = line.strip()
        
        # Skip empty, page markers, standalone numbers
        if not stripped or stripped.startswith('--- PAGE') or re.match(r'^\d+$', stripped):
            i += 1
            continue
        
        # Skip chapter header
        header_variants = [
            ch_name, ch_name + '.', ch_name + ' .',
            ch_name.rstrip('.'), ch_name.replace(' AND ', ' and '),
        ]
        if stripped.rstrip('.') in [ch_name, ch_name.replace(' AND ', ' and ')]:
            i += 1
            continue
        
        # Determine if this line is a rubric heading or remedy continuation
        # Rubric headings: relatively short, end with . or :, have few commas
        is_rubric_heading = False
        is_sub_rubric = False
        
        if len(stripped) < 120:
            ends_with_punct = stripped.endswith('.') or stripped.endswith(':')
            
            if ends_with_punct:
                # Count commas (remedies have many commas)
                comma_count = stripped.count(',')
                # Count potential remedy abbreviations (Word.)
                remedy_pattern_count = len(re.findall(r'\b[A-Z][a-z]?[a-z]?[\-]?\w*\.?\b', stripped))
                
                # If few commas and starts with uppercase, it's likely a heading
                if comma_count < 5 and re.match(r'^[A-Z]', stripped):
                    # Check for colon (sub-rubric) vs period (main rubric)
                    if ':' in stripped and stripped.endswith(':'):
                        is_sub_rubric = True
                    elif '.' in stripped and stripped.endswith('.'):
                        # Could be main rubric - check if it's not all remedies
                        # Main rubrics typically have descriptive text
                        has_desc = any(c.islower() for c in stripped if c.isalpha())
                        if has_desc:
                            is_rubric_heading = True
        
        # Handle sub-rubric (ends with colon)
        if is_sub_rubric and current_main:
            # Save previous main rubric if not yet saved
            if current_main_remedies and not any(r['text'].endswith(current_main) for r in rubrics):
                rubrics.append({
                    'id': f'{ch_id_prefix}-{rubric_num}',
                    'text': f'{ch_name} - {current_main}',
                    'remedies': current_main_remedies,
                })
                rubric_num += 1
                current_main_remedies = []
            
            # Parse sub-rubric
            parts = stripped.rsplit(':', 1)
            sub_text = parts[0].strip().rstrip('.')
            after_colon = parts[1].strip() if len(parts) > 1 else ''
            sub_remedies = extract_remedies(after_colon)
            
            # Collect more remedies from following lines if needed
            if not sub_remedies:
                j = i + 1
                while j < len(section_lines):
                    next_l = section_lines[j].strip()
                    if not next_l or next_l.startswith('--- PAGE') or re.match(r'^\d+$', next_l):
                        j += 1
                        continue
                    next_rems = extract_remedies(next_l)
                    if next_rems:
                        sub_remedies = next_rems
                        break
                    # Check if next line is a new heading
                    if (next_l.endswith('.') or next_l.endswith(':')) and len(next_l) < 100:
                        n_comma = next_l.count(',')
                        if n_comma < 5 and re.match(r'^[A-Z]', next_l):
                            break
                    j += 1
            
            if sub_remedies:
                rubrics.append({
                    'id': f'{ch_id_prefix}-{rubric_num}',
                    'text': f'{ch_name} - {current_main} - {sub_text}',
                    'remedies': sub_remedies,
                })
                rubric_num += 1
            
            i += 1
            continue
        
        # Handle main rubric heading
        if is_rubric_heading:
            # Save previous main rubric
            if current_main and current_main_remedies:
                rubrics.append({
                    'id': f'{ch_id_prefix}-{rubric_num}',
                    'text': f'{ch_name} - {current_main}',
                    'remedies': current_main_remedies,
                })
                rubric_num += 1
            
            current_main = stripped.rstrip('.').strip()
            current_main_remedies = []
            
            # Check if remedies follow on same line (after .)
            # Actually for main rubrics ending with ., remedies are on next lines
            i += 1
            continue
        
        # If we have a current main rubric, collect remedies
        if current_main:
            rems = extract_remedies(stripped)
            if rems:
                current_main_remedies.extend(rems)
            elif stripped.endswith(':') and not re.match(r'^[a-z]', stripped):
                # This might be a sub-rubric we missed
                sub_text = stripped.rstrip(':').strip()
                if len(sub_text) < 60:
                    # Treat as sub-rubric
                    j = i + 1
                    sub_rems = []
                    while j < len(section_lines):
                        next_l = section_lines[j].strip()
                        if not next_l or next_l.startswith('--- PAGE'):
                            j += 1
                            continue
                        nr = extract_remedies(next_l)
                        if nr:
                            sub_rems = nr
                            break
                        if (next_l.endswith('.') or next_l.endswith(':')) and len(next_l) < 100 and next_l.count(',') < 5:
                            break
                        j += 1
                    
                    if sub_rems:
                        rubrics.append({
                            'id': f'{ch_id_prefix}-{rubric_num}',
                            'text': f'{ch_name} - {current_main} - {sub_text}',
                            'remedies': sub_rems,
                        })
                        rubric_num += 1
        
        i += 1
    
    # Save last rubric
    if current_main and current_main_remedies:
        rubrics.append({
            'id': f'{ch_id_prefix}-{rubric_num}',
            'text': f'{ch_name} - {current_main}',
            'remedies': current_main_remedies,
        })
    
    return rubrics


# Parse all chapters
all_results = {}
for ch_name, (start, end) in CHAPTERS.items():
    ch_id = ch_name.lower().replace(' ', '-').replace('&', 'and')
    print(f"Parsing {ch_name} (lines {start}-{end})...")
    rubrics = parse_chapter_section(ch_name, start, end, ch_id)
    all_results[ch_name] = rubrics
    print(f"  -> {len(rubrics)} rubrics")

# Also parse small chapters for comparison
print("\n--- Small chapters (for enrichment) ---")
for ch_name, (start, end) in SMALL_CHAPTERS.items():
    ch_id = ch_name.lower().replace(' ', '-')
    rubrics = parse_chapter_section(ch_name, start, end, ch_id)
    all_results[ch_name] = rubrics
    print(f"  {ch_name}: {len(rubrics)} rubrics extracted")

# Save parsed data
with open('/home/z/my-project/scripts/parsed_all_chapters.json', 'w') as f:
    json.dump(all_results, f, indent=2, ensure_ascii=False)

total = sum(len(v) for v in all_results.values())
print(f"\n{'='*60}")
print(f"TOTAL: {total} rubrics across {len(all_results)} chapters")