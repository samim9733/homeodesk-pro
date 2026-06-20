#!/usr/bin/env python3
"""
Improved parser for Kent's Repertory scanned text.
Extracts ALL rubrics with their remedies, not just the main ones.
Strategy: Parse every line, identify rubric headings vs remedy lines.
"""
import re
import json
import os

INPUT = "/home/z/my-project/upload/Repertory_of_the_Homoeopathic_Materia_Me-compressed_extracted.txt"
OUTPUT = "/home/z/my-project/upload/parsed_remedies.json"

CHAPTERS = [
    "MIND", "VERTIGO", "HEAD", "EYE", "VISION", "EAR", "HEARING",
    "NOSE", "FACE", "MOUTH", "TASTE", "TEETH", "THROAT", "EXTERNAL THROAT",
    "STOMACH", "HYPOCHONDRIUM", "UMBILICUS", "ABDOMEN", "RECTUM", "STOOL",
    "URINE", "KIDNEY", "URETHRA", "MALE", "FEMALE", "LARYNX",
    "RESPIRATION", "COUGH", "EXPECTORATION", "CHEST", "HEART", "BACK",
    "EXTREMITIES", "SLEEP", "CHILLS", "FEVER", "PERSPIRATION", "SKIN", "GENERALITIES"
]

def is_page_header(line):
    """Check if line is a page header."""
    s = line.strip()
    if s.startswith('--- PAGE') or s.startswith('---  PAGE'):
        return True
    if re.match(r'^\d{1,3}$', s):
        return True
    # Roman numerals
    if re.match(r'^[ivxlc]+$', s):
        return True
    return False

def count_remedy_abbrs(text):
    """Count how many comma-separated items look like remedy abbreviations."""
    parts = re.split(r'[,;]\s*', text)
    count = 0
    for p in parts:
        p = p.strip()
        if re.match(r'^[A-Za-z][A-Za-z0-9\-]{0,7}\.$', p):
            count += 1
    return count

def extract_remedies(text):
    """Extract remedy abbreviations from text."""
    found = []
    parts = re.split(r'[,;]\s*', text)
    for p in parts:
        p = p.strip()
        if re.match(r'^[A-Za-z][A-Za-z0-9\-]{0,7}\.$', p):
            if len(p) >= 3:  # At least 3 chars (e.g., "Op.")
                found.append(p)
    return found

def is_remedy_heavy_line(text):
    """Check if line is mostly remedy abbreviations."""
    s = text.strip()
    if not s:
        return False
    # Count comma-separated parts
    parts = s.split(',')
    if len(parts) < 2:
        return False
    # Check if most parts end with period
    period_count = sum(1 for p in parts if p.strip().endswith('.'))
    return period_count >= len(parts) * 0.6

def has_uppercase_words(text):
    """Check if text contains significant uppercase words (not all caps)."""
    words = re.findall(r'[A-Za-z]+', text)
    upper_words = [w for w in words if w[0].isupper()]
    return len(upper_words) >= 2

def normalize(text):
    """Normalize text for matching."""
    text = re.sub(r'\s+', ' ', text).strip()
    text = text.replace('"', '"').replace('"', '"').replace(''', "'").replace(''', "'")
    text = text.replace('–', '-').replace('—', '-').replace('\u00ad', '')
    text = text.rstrip('.').strip()
    return text

def is_rubric_heading(text):
    """Check if text looks like a rubric heading."""
    s = text.strip()
    if not s or len(s) < 3:
        return False
    # Skip if it's clearly a remedy list (many comma-period items)
    if is_remedy_heavy_line(s) and count_remedy_abbrs(s) >= 3:
        return False
    # Skip single-word chapter names
    if s.rstrip('.') in CHAPTERS:
        return False
    # Check if it has at least some uppercase text and descriptive content
    # Rubric headings contain words, parentheses, possibly colons
    # They typically don't have many comma-separated period-ending items
    has_text = bool(re.search(r'[A-Za-z]{2,}', s))
    # Check for common rubric patterns
    if re.search(r'\(.*\)', s):  # Has parens like "See Forsaken"
        return has_text
    if ':' in s and not s.endswith(':.'):  # Has colon (sub-rubric)
        return has_text
    # Main rubric: mostly uppercase, not just abbreviations
    alpha_chars = sum(1 for c in s if c.isalpha())
    if alpha_chars < 4:
        return False
    return has_text

def main():
    print(f"Reading {INPUT}...")
    with open(INPUT, 'r', encoding='utf-8', errors='replace') as f:
        lines = f.readlines()
    print(f"Total lines: {len(lines)}")
    
    rubrics = {}  # normalized_text -> remedies
    current_rubric_key = None
    
    skip_until_data = True  # Skip preamble until we find actual rubric data
    
    for i, line in enumerate(lines):
        stripped = line.strip()
        raw = line.rstrip('\n\r')
        
        # Skip empty lines and page headers
        if not stripped or is_page_header(stripped):
            continue
        
        # Skip preamble (before MIND data starts ~line 744)
        if skip_until_data:
            if 'ABANDONED' in stripped or 'ABRUPT' in stripped:
                skip_until_data = False
            else:
                continue
        
        # Skip remedy abbreviation table entries
        if re.match(r'^[A-Za-z][A-Za-z0-9\-]{1,7}\.\s*,\s*[A-Z]', stripped):
            continue
        
        # Skip standalone chapter page headers
        clean = stripped.rstrip('.')
        if clean in CHAPTERS and len(clean) < 20:
            continue
        
        # Skip lines that are purely page footers/numbers
        if re.match(r'^\d{1,4}\s*$', stripped):
            continue
        
        # Strategy: 
        # 1. If line is clearly remedy abbreviations (comma-separated, ending with periods),
        #    add them to the current rubric
        # 2. If line looks like a rubric heading, start a new rubric
        
        # Check if it's a remedy line
        remedy_count = count_remedy_abbrs(stripped)
        if remedy_count >= 2:
            # This is a remedy line - add to current rubric
            remedies = extract_remedies(stripped)
            if remedies and current_rubric_key:
                if current_rubric_key not in rubrics:
                    rubrics[current_rubric_key] = []
                rubrics[current_rubric_key].extend(remedies)
            continue
        
        # Check if line has remedies embedded after a colon
        if ':' in stripped:
            colon_idx = stripped.index(':')
            heading = stripped[:colon_idx].strip()
            after_colon = stripped[colon_idx+1:].strip()
            
            after_remedies = extract_remedies(after_colon)
            
            if heading and len(heading) > 2:
                norm_heading = normalize(heading)
                current_rubric_key = norm_heading
                
                if norm_heading not in rubrics:
                    rubrics[norm_heading] = []
                if after_remedies:
                    rubrics[norm_heading].extend(after_remedies)
                continue
        
        # If not a remedy line and not a heading with colon, it might be:
        # - A rubric heading without colon (some rubrics don't have colons)
        # - A continuation line
        
        # Check if it could be a new rubric heading
        if is_rubric_heading(stripped):
            # Determine if this is a continuation of previous rubric or a new one
            # New rubrics typically start with uppercase or have descriptive text
            words = stripped.split()
            first_word = words[0] if words else ''
            
            # If first word is all caps and long enough, it's likely a new rubric
            if first_word.isupper() and len(first_word) > 2:
                norm_key = normalize(stripped)
                current_rubric_key = norm_key
                # Don't create entry yet - wait for remedies
                continue
    
    # Deduplicate
    for key in rubrics:
        seen = set()
        deduped = []
        for r in rubrics[key]:
            rl = r.lower()
            if rl not in seen:
                seen.add(rl)
                deduped.append(r)
        rubrics[key] = deduped
    
    # Stats
    print(f"\nTotal rubrics with remedies: {len(rubrics)}")
    all_rems = set()
    for rem_list in rubrics.values():
        for r in rem_list:
            all_rems.add(r.lower())
    print(f"Unique remedy abbreviations: {len(all_rems)}")
    
    # Check against existing kentRepertoryData.ts
    existing_rubrics = set()
    with open('/home/z/my-project/homeodesk-pro/src/kentRepertoryData.ts', 'r', encoding='utf-8') as f:
        for line in f:
            m = re.search(r"text: '([^']+)', chapter:", line)
            if m:
                existing_rubrics.add(m.group(1))
    
    print(f"\nExisting rubrics in kentRepertoryData.ts: {len(existing_rubrics)}")
    
    # Try matching
    def norm_match(s):
        s = re.sub(r'[\u2013\u2014]', '-', s)
        s = re.sub(r'[\u2018\u2019\u201c\u201d]', '', s)
        s = re.sub(r'\s+', ' ', s).strip().lower()
        s = re.sub(r'[\"()\[\]{}]', '', s)
        s = s.rstrip('.').strip()
        return s
    
    norm_parsed = {norm_match(k): k for k in rubrics}
    norm_existing = {}
    for t in existing_rubrics:
        n = norm_match(t)
        if n not in norm_existing:
            norm_existing[n] = []
        norm_existing[n].append(t)
    
    matches = set(norm_parsed.keys()) & set(norm_existing.keys())
    print(f"Normalized matches: {len(matches)}")
    
    # Show some examples
    print("\nMatch examples:")
    for m in sorted(list(matches))[:10]:
        parsed_key = norm_parsed[m]
        existing = norm_existing[m][0]
        print(f"  Parsed: [{parsed_key}]")
        print(f"  Existing: [{existing}]")
        print(f"  Remedies: {rubrics[parsed_key][:5]}")
        print()
    
    # Save
    with open(OUTPUT, 'w', encoding='utf-8') as f:
        json.dump(rubrics, f, indent=2, ensure_ascii=False)
    print(f"Saved {len(rubrics)} rubrics to {OUTPUT}")

if __name__ == '__main__':
    main()
