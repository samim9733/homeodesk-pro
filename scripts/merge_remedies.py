#!/usr/bin/env python3
"""
Merge parsed remedies from Kent's Repertory book into kentRepertoryData.ts
Uses fuzzy matching to handle OCR/formatting differences.
"""
import re
import json
import os

PARSED_REMEDIES = "/home/z/my-project/upload/parsed_remedies.json"
KENT_DATA = "/home/z/my-project/homeodesk-pro/src/kentRepertoryData.ts"
OUTPUT = KENT_DATA  # Overwrite the data file

def normalize(s):
    """Aggressive normalization for matching."""
    s = s.strip()
    # Unicode normalization
    s = s.replace('\u2013', '-').replace('\u2014', '-')
    s = s.replace('\u2018', "'").replace('\u2019', "'")
    s = s.replace('\u201c', '"').replace('\u201d', '"')
    s = s.replace('\u00ad', '')
    s = s.replace('\\', '')
    # Remove quotes, parens for matching
    s = re.sub(r'[""\u00b4]', '', s)
    # Lowercase
    s = s.lower()
    # Normalize whitespace
    s = re.sub(r'\s+', ' ', s)
    # Remove trailing period
    s = s.rstrip('.').strip()
    # Remove "see ..." cross-references for better matching
    # s = re.sub(r'\s*\(?\s*see\s+[^)]+\)?', '', s)
    return s

def starts_with_match(norm_existing, norm_parsed):
    """Check if existing rubric starts with parsed key."""
    ne = norm_existing.strip()
    np = norm_parsed.strip()
    if ne.startswith(np + ' ') or ne.startswith(np + '-'):
        return True
    if np.startswith(ne + ' ') or np.startswith(ne + '-'):
        return True
    return False

def contains_key_match(norm_existing, norm_parsed):
    """Check if one contains key words from the other."""
    ne_words = set(re.findall(r'[a-z]{3,}', norm_existing))
    np_words = set(re.findall(r'[a-z]{3,}', norm_parsed))
    if not ne_words or not np_words:
        return False
    # Check significant overlap
    overlap = ne_words & np_words
    if len(overlap) >= min(3, min(len(ne_words), len(np_words))):
        return True
    # Check if parsed key words are subset of existing
    if np_words.issubset(ne_words) and len(np_words) >= 3:
        return True
    return False

def main():
    # Load parsed remedies
    print("Loading parsed remedies...")
    with open(PARSED_REMEDIES, 'r', encoding='utf-8') as f:
        parsed = json.load(f)
    print(f"  {len(parsed)} rubrics with remedies")
    
    # Normalize parsed keys
    norm_parsed = {}
    for key in parsed:
        nk = normalize(key)
        if nk:
            norm_parsed[nk] = key
    
    # Read existing kentRepertoryData.ts
    print("Reading kentRepertoryData.ts...")
    with open(KENT_DATA, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract all rubric entries
    pattern = r"(\{ id: '([^']+)', text: '([^']*)', chapter: '([^']*)', remedies: \[\][^}]* grade: (\d+) \})"
    matches = list(re.finditer(pattern, content))
    print(f"  Found {len(matches)} rubric entries")
    
    # Build replacement map
    replacements = {}
    match_stats = {'exact': 0, 'starts_with': 0, 'contains': 0, 'fuzzy': 0, 'no_match': 0}
    
    for m in matches:
        full_match = m.group(0)
        rubric_id = m.group(2)
        rubric_text = m.group(3)
        chapter = m.group(4)
        grade = m.group(5)
        
        norm_rubric = normalize(rubric_text)
        
        # Try exact match
        if norm_rubric in norm_parsed:
            key = norm_parsed[norm_rubric]
            remedies = parsed[key]
            replacements[full_match] = (rubric_id, rubric_text, chapter, grade, remedies)
            match_stats['exact'] += 1
            continue
        
        # Try starts-with match
        found = False
        for nk, ok in norm_parsed.items():
            if starts_with_match(norm_rubric, nk):
                remedies = parsed[ok]
                replacements[full_match] = (rubric_id, rubric_text, chapter, grade, remedies)
                match_stats['starts_with'] += 1
                found = True
                break
        if found:
            continue
        
        # Try parent rubric match (for sub-rubrics like "ABSENT-MINDED - morning")
        # The parsed data might have "ABSENT-MINDED (compare Forgetful)" as main rubric
        # with "morning" as sub-rubric remedies
        if ' - ' in rubric_text:
            main_part = rubric_text.split(' - ')[0]
            sub_part = rubric_text.split(' - ', 1)[1]
            norm_main = normalize(main_part)
            
            # Try to find sub-rubric remedies in parsed data
            # Check if parsed has "main_rubric - sub_part" or just "sub_part" under the main
            for nk, ok in norm_parsed.items():
                if nk == norm_main or nk.startswith(norm_main):
                    # Check if parsed has this sub-rubric
                    sub_norm = normalize(f"{main_part} - {sub_part}")
                    if sub_norm in norm_parsed:
                        remedies = parsed[norm_parsed[sub_norm]]
                        replacements[full_match] = (rubric_id, rubric_text, chapter, grade, remedies)
                        match_stats['starts_with'] += 1
                        found = True
                        break
                    # Also try: the parsed key might be the sub-part with the main prefix
                    if sub_part.lower() in nk.lower():
                        remedies = parsed[ok]
                        replacements[full_match] = (rubric_id, rubric_text, chapter, grade, remedies)
                        match_stats['fuzzy'] += 1
                        found = True
                        break
            if found:
                continue
        
        # Try contains/fuzzy match (less strict)
        for nk, ok in norm_parsed.items():
            if contains_key_match(norm_rubric, nk):
                remedies = parsed[ok]
                replacements[full_match] = (rubric_id, rubric_text, chapter, grade, remedies)
                match_stats['contains'] += 1
                found = True
                break
        if found:
            continue
        
        match_stats['no_match'] += 1
    
    print(f"\nMatch statistics:")
    for k, v in match_stats.items():
        print(f"  {k}: {v}")
    total_matched = match_stats['exact'] + match_stats['starts_with'] + match_stats['contains'] + match_stats['fuzzy']
    print(f"  Total matched: {total_matched}/{len(matches)} ({total_matched*100//len(matches)}%)")
    
    # Generate new content
    def escape_ts(s):
        s = s.replace('\\', '\\\\')
        s = s.replace("'", "\\'")
        s = s.replace('"', '\\"')
        s = s.replace('\u2013', '-').replace('\u2014', '-')
        s = s.replace('\u2018', "'").replace('\u2019', "'")
        s = s.replace('\u201c', '"').replace('\u201d', '"')
        return s
    
    def replace_entry(match_obj):
        full = match_obj.group(0)
        if full in replacements:
            rid, rtext, chapter, grade, remedies = replacements[full]
            rem_list = ', '.join(f"'{escape_ts(r)}'" for r in remedies[:30])  # Max 30 remedies per rubric
            return f"{{ id: '{rid}', text: '{escape_ts(rtext)}', chapter: '{escape_ts(chapter)}', remedies: [{rem_list}], grade: {grade} }}"
        return full
    
    new_content = re.sub(pattern, replace_entry, content)
    
    with open(OUTPUT, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"\nUpdated {OUTPUT}")
    
    # Count total remedies added
    total_remedies = sum(len(v[4]) for v in replacements.values())
    print(f"Total remedy entries added: {total_remedies}")

if __name__ == '__main__':
    main()
