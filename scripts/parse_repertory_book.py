#!/usr/bin/env python3
"""
Parse 14 missing chapters from Kent's Repertory digitized book.
Extracts rubrics with remedies for: SLEEP, BLADDER, GENITALIA, LARYNX & TRACHEA,
RESPIRATION, COUGH, EXPECTORATION, CHEST, BACK, EXTREMITIES, CHILL, FEVER,
PERSPIRATION, SKIN, GENERALITIES
"""
import re
import json

BOOK = '/home/z/my-project/upload/Repertory_of_the_Homoeopathic_Materia_Me-compressed_extracted.txt'
OUT = '/home/z/my-project/scripts/parsed_chapters.json'

with open(BOOK, 'r') as f:
    lines = f.readlines()

print(f"Total lines: {len(lines)}")

# Determine chapter boundaries
# First, find ALL potential chapter starts
chapter_order = [
    'MIND', 'VERTIGO', 'HEAD', 'EYE', 'VISION', 'EAR', 'HEARING', 'NOSE',
    'FACE', 'MOUTH', 'TEETH', 'THROAT', 'EXTERNAL THROAT', 'STOMACH',
    'ABDOMEN', 'RECTUM', 'STOOL', 'BLADDER', 'KIDNEYS', 'URETHRA',
    'URINARY ORGANS', 'GENITALIA', 'PROSTATE', 'LARYNX', 'RESPIRATION',
    'COUGH', 'EXPECTORATION', 'CHEST', 'BACK', 'EXTREMITIES', 'CHILL',
    'FEVER', 'PERSPIRATION', 'SKIN', 'SLEEP', 'GENERALITIES'
]

# Find actual chapter header lines
def find_chapter_lines():
    """Find lines that are likely chapter headers."""
    results = {}
    for i, line in enumerate(lines):
        stripped = line.strip()
        if not stripped:
            continue
        # Skip page markers
        if stripped.startswith('--- PAGE'):
            continue
        # Skip short lines that are just numbers or page artifacts
        if re.match(r'^\d+$', stripped):
            continue
        # Skip OCR artifacts
        if len(stripped) < 3:
            continue
        # Chapter header: ALL CAPS, possibly with & and spaces, short
        clean = re.sub(r'[^A-Z& ]', '', stripped)
        if clean == stripped and 3 < len(stripped) < 40:
            for ch in chapter_order:
                if stripped == ch or stripped == ch.replace(' & ', ' '):
                    if ch not in results:
                        results[ch] = i
    return results

ch_lines = find_chapter_lines()
print("Chapter positions found:")
for ch in chapter_order:
    if ch in ch_lines:
        print(f"  {ch}: line {ch_lines[ch]}")
    else:
        print(f"  {ch}: NOT FOUND")

# Now find chapter boundaries
chapters_boundaries = {}
sorted_chs = sorted(ch_lines.items(), key=lambda x: x[1])
for i, (ch, start) in enumerate(sorted_chs):
    if i + 1 < len(sorted_chs):
        end = sorted_chs[i + 1][1]
    else:
        end = len(lines)
    chapters_boundaries[ch] = (start, end)

# The 14 missing chapters
MISSING = ['SLEEP', 'BLADDER', 'GENITALIA', 'PROSTATE', 'LARYNX', 'RESPIRATION',
           'COUGH', 'EXPECTORATION', 'CHEST', 'BACK', 'EXTREMITIES', 'CHILL',
           'FEVER', 'PERSPIRATION', 'SKIN', 'GENERALITIES']

# Parse a chapter section
def parse_chapter(ch_name, start_line, end_line):
    """Parse rubrics and remedies from a chapter section."""
    ch_lines_text = [l.rstrip('\n') for l in lines[start_line:end_line]]
    
    rubrics = []
    current_main = None
    current_remedies = []
    
    i = 0
    while i < len(ch_lines_text):
        line = ch_lines_text[i]
        stripped = line.strip()
        
        # Skip empty lines, page markers
        if not stripped or stripped.startswith('--- PAGE'):
            i += 1
            continue
        
        # Skip the chapter header itself
        if stripped == ch_name or stripped == ch_name.replace(' & ', ' '):
            i += 1
            continue
        
        # Skip lines that are just numbers (page numbers)
        if re.match(r'^\d+$', stripped):
            i += 1
            continue
        
        # Check if this is a main rubric (ends with . or : and is relatively short)
        # Main rubrics are typically UPPERCASE or have initial caps
        # They end with . or : at the end of line
        
        is_main = False
        # Pattern: short line ending with . or : (not a remedy line)
        if (stripped.endswith('.') or stripped.endswith(':')) and len(stripped) < 100:
            # Check if it looks like a rubric (not a continuation of remedies)
            # Rubrics don't have many commas followed by abbreviations
            # Check if it has the pattern of a heading
            has_colon_end = stripped.endswith(':')
            has_period_end = stripped.endswith('.')
            
            # Count potential remedy abbreviations (word.)
            remedy_count = len(re.findall(r'\b[A-Z][a-z]?[a-z]?\.-', stripped))
            
            # If it has few or no remedy patterns, it's likely a rubric
            if remedy_count <= 2 and not re.match(r'^[a-z]', stripped):
                is_main = True
        
        # Also check for lines that start with uppercase and have : or . 
        # but are clearly headings (no remedy abbreviations)
        if not is_main and re.match(r'^[A-Z][A-Za-z &(),\-]+[.:]$', stripped):
            if len(re.findall(r'\b[A-Z][a-z]?[a-z]?-\w*\.', stripped)) <= 1:
                is_main = True
        
        if is_main:
            # Save previous rubric if any
            if current_main and current_remedies:
                rubrics.append({
                    'text': f"{ch_name} - {current_main}",
                    'remedies': current_remedies
                })
            
            # Start new main rubric
            current_main = stripped.rstrip('.').rstrip(':')
            current_remedies = []
            
            # Check if remedies are on the same line after :
            if ':' in stripped:
                after_colon = stripped.split(':', 1)[1].strip()
                if after_colon:
                    rems = parse_remedies(after_colon)
                    if rems:
                        current_remedies = rems
            
            i += 1
            continue
        
        # Check if this is a sub-rubric (indented or starts with lowercase)
        is_sub = False
        if stripped.endswith(':') and len(stripped) < 80:
            # Check if it's a sub-rubric vs a continuation
            remedy_count = len(re.findall(r'\b[A-Z][a-z]?[a-z]?-\w*\.', stripped))
            if remedy_count <= 2:
                is_sub = True
        
        if is_sub and current_main:
            sub_text = stripped.rstrip(':')
            after_colon = stripped.split(':', 1)[1].strip() if ':' in stripped else ''
            rems = parse_remedies(after_colon) if after_colon else []
            
            if rems:
                rubrics.append({
                    'text': f"{ch_name} - {current_main} - {sub_text}",
                    'remedies': rems
                })
            else:
                # Sub-rubric with no remedies on this line, collect from next lines
                all_text = sub_text
                j = i + 1
                collected_rems = []
                while j < len(ch_lines_text):
                    next_line = ch_lines_text[j].strip()
                    if not next_line or next_line.startswith('--- PAGE'):
                        j += 1
                        continue
                    # Check if next line is a new rubric or sub-rubric
                    if (next_line.endswith('.') or next_line.endswith(':')) and len(next_line) < 100:
                        next_rems = len(re.findall(r'\b[A-Z][a-z]?[a-z]?-\w*\.', next_line))
                        if next_rems <= 2 and not re.match(r'^[a-z]', next_line):
                            break
                    # It's a remedy continuation
                    line_rems = parse_remedies(next_line)
                    if line_rems:
                        collected_rems.extend(line_rems)
                        j += 1
                    else:
                        break
                
                if collected_rems:
                    rubrics.append({
                        'text': f"{ch_name} - {current_main} - {all_text}",
                        'remedies': collected_rems
                    })
                i = j
                continue
        elif current_main:
            # This might be remedies for the current rubric
            rems = parse_remedies(stripped)
            if rems:
                current_remedies.extend(rems)
        
        i += 1
    
    # Save last rubric
    if current_main and current_remedies:
        rubrics.append({
            'text': f"{ch_name} - {current_main}",
            'remedies': current_remedies
        })
    
    return rubrics


def parse_remedies(text):
    """Extract remedy abbreviations from text."""
    if not text:
        return []
    # Pattern: word ending with . (like Acon., Nux-v., etc.)
    # Also handle plain words separated by commas
    parts = re.split(r'[,\s]+', text)
    remedies = []
    for p in parts:
        p = p.strip().rstrip('.')
        if not p:
            continue
        # Skip common non-remedy words
        if p.lower() in ('see', 'compare', 'also', 'and', 'or', 'etc', 'agg', 'amel'):
            continue
        # Remedy abbreviations: start with uppercase, may contain hyphens
        if re.match(r'^[A-ZÆ][a-z]?[a-z]?-?[a-zA-Z]*$', p) and len(p) >= 2:
            remedies.append(p + '.')
        # Also catch all-caps abbreviations
        elif re.match(r'^[A-ZÆ]{2,}$', p):
            remedies.append(p + '.')
    return remedies


# Parse all missing chapters
result = {}
for ch in MISSING:
    if ch not in chapters_boundaries:
        print(f"WARNING: {ch} boundaries not found!")
        continue
    
    start, end = chapters_boundaries[ch]
    print(f"\nParsing {ch} (lines {start}-{end})...")
    rubrics = parse_chapter(ch, start, end)
    result[ch] = rubrics
    print(f"  Extracted {len(rubrics)} rubrics")
    if rubrics:
        print(f"  First: {rubrics[0]['text'][:80]}")
        print(f"  Last: {rubrics[-1]['text'][:80]}")

with open(OUT, 'w') as f:
    json.dump(result, f, indent=2, ensure_ascii=False)

total = sum(len(v) for v in result.values())
print(f"\n{'='*60}")
print(f"TOTAL: {total} rubrics extracted across {len(result)} chapters")
print(f"Saved to: {OUT}")