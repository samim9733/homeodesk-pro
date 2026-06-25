#!/usr/bin/env python3
"""Generate TypeScript chapter entries and insert into kentRepertoryData.ts."""
import re
import json

DATA_FILE = '/home/z/my-project/homeodesk-pro/src/kentRepertoryData.ts'
PARSED = '/home/z/my-project/scripts/parsed_all_chapters.json'

with open(PARSED, 'r') as f:
    parsed = json.load(f)

with open(DATA_FILE, 'r') as f:
    content = f.read()

def esc(text):
    """Escape for TypeScript string."""
    return text.replace('\\', '\\\\').replace("'", "\\'")

# Chapter definitions: (json_key, data_chapter_name, data_chapter_id, insert_after_chapter_id)
CHAPTER_DEFS = [
    ('HEARING', 'HEARING', 'hearing', 'ear'),
    ('VISION', 'VISION', 'vision', 'hearing'),
    ('BLADDER', 'BLADDER', 'bladder', 'urinary-organs'),
    ('GENITALIA Male', 'GENITALIA Male', 'genitalia-male', 'bladder'),
    ('GENITALIA Female', 'GENITALIA Female', 'genitalia-female', 'genitalia-male'),
    ('PROSTATE GLAND', 'PROSTATE GLAND', 'prostate-gland', 'genitalia-female'),
    ('LARYNX AND TRACHEA', 'LARYNX AND TRACHEA', 'larynx-trachea', 'prostate-gland'),
    ('RESPIRATION', 'RESPIRATION', 'respiration', 'larynx-trachea'),
    ('COUGH', 'COUGH', 'cough', 'respiration'),
    ('EXPECTORATION', 'EXPECTORATION', 'expectoration', 'cough'),
    ('CHEST', 'CHEST', 'chest', 'expectoration'),
    ('BACK', 'BACK', 'back', 'chest'),
    ('EXTREMITIES', 'EXTREMITIES', 'extremities', 'back'),
    ('SLEEP', 'SLEEP', 'sleep', 'extremities'),
    ('CHILL', 'CHILL', 'chill', 'sleep'),
    ('FEVER', 'FEVER', 'fever', 'chill'),
    ('PERSPIRATION', 'PERSPIRATION', 'perspiration', 'fever'),
    ('SKIN', 'SKIN', 'skin', 'perspiration'),
    ('GENERALITIES', 'GENERALITIES', 'generalities', 'skin'),
]

def generate_chapter_ts(ch_name, ch_id, rubrics):
    """Generate TypeScript for a chapter."""
    entries = []
    for i, r in enumerate(rubrics, 1):
        rid = f"{ch_id}-{i}"
        txt = esc(r['text'])
        rems = json.dumps(r['remedies'])
        entries.append(
            f"      {{ id: '{rid}', text: '{txt}', chapter: '{ch_name}', "
            f"remedies: {rems} as string[], grade: 1 }}"
        )
    return entries

# For chapters that already exist, we need to find and replace
# For new chapters, we insert after the specified chapter
EXISTING_REPLACE = {
    'HEARING': ('hearing', 'HEARING'),
    'VISION': ('vision', 'VISION'),
    'EXTREMITIES': ('extremities', 'EXTREMITIES'),
    'GENERALITIES': ('generalities', 'GENERALITIES'),
    'PROSTATE GLAND': ('prostate-gland', 'PROSTATE GLAND'),
}

# Process existing chapters - replace content
for json_key, (ch_id, ch_name) in EXISTING_REPLACE.items():
    if json_key not in parsed or not parsed[json_key]:
        print(f"  SKIP {json_key}: no parsed data")
        continue
    
    rubrics = parsed[json_key]
    ts_entries = generate_chapter_ts(ch_name, ch_id, rubrics)
    
    # Find the chapter in the data file
    pattern = re.compile(
        r"id:\s*'" + re.escape(ch_id) + r"'\s*,\s*\n\s*chapter:\s*'" + re.escape(ch_name) + r"'"
    )
    match = pattern.search(content)
    if not match:
        print(f"  ERROR: {json_key} not found in data")
        continue
    
    # Find rubrics array
    ra_start = content.find('rubrics: [', match.start())
    # Find end of array
    pos = ra_start + len('rubrics: [')
    bc, ins, esc_n = 1, False, False
    while pos < len(content) and bc > 0:
        c = content[pos]
        if esc_n: esc_n = False; pos += 1; continue
        if c == '\\' and ins: esc_n = True; pos += 1; continue
        if c == "'": ins = not ins; pos += 1; continue
        if ins: pos += 1; continue
        if c == '[': bc += 1
        elif c == ']': bc -= 1
        pos += 1
    
    # Replace array content
    new_array_content = ',\n    '.join(ts_entries)
    new_section = content[match.start():ra_start + len('rubrics: [')] + '\n    ' + new_array_content + '\n  ' + content[pos-1:]
    
    content = content[:match.start()] + new_section + content[pos-1:]
    print(f"  REPLACED {json_key}: {len(rubrics)} rubrics")

# Process new chapters - insert after specified chapter
# Do in reverse order to maintain positions
new_chapters = [(jk, cn, cid, after_id) for jk, cn, cid, after_id in CHAPTER_DEFS 
                if jk not in EXISTING_REPLACE and parsed.get(jk)]

# Sort by position of after_id (reverse)
def get_chapter_pos(ch_id):
    m = re.search(r"id:\s*'" + re.escape(ch_id) + r"'", content)
    return m.start() if m else 0

new_chapters.sort(key=lambda x: get_chapter_pos(x[3]), reverse=True)

total_new = 0
for json_key, ch_name, ch_id, after_id in new_chapters:
    if not parsed.get(json_key):
        continue
    
    rubrics = parsed[json_key]
    ts_entries = generate_chapter_ts(ch_name, ch_id, rubrics)
    total_new += len(rubrics)
    
    # Find end of the "after" chapter
    after_pattern = re.compile(r"id:\s*'" + re.escape(after_id) + r"'")
    after_match = after_pattern.search(content)
    if not after_match:
        print(f"  ERROR: after_id '{after_id}' not found for {json_key}")
        continue
    
    # Find end of this chapter's rubrics array
    ra_start = content.find('rubrics: [', after_match.start())
    pos = ra_start + len('rubrics: [')
    bc, ins, esc_n = 1, False, False
    while pos < len(content) and bc > 0:
        c = content[pos]
        if esc_n: esc_n = False; pos += 1; continue
        if c == '\\' and ins: esc_n = True; pos += 1; continue
        if c == "'": ins = not ins; pos += 1; continue
        if ins: pos += 1; continue
        if c == '[': bc += 1
        elif c == ']': bc -= 1
        pos += 1
    
    # Insert new chapter after the closing },\n of the after chapter
    # Find the closing } of the after chapter object
    chapter_end = content.find('\n},\n', pos)
    if chapter_end < 0:
        chapter_end = content.find('}\n,', pos)
    if chapter_end < 0:
        chapter_end = pos
    
    insert_pos = chapter_end + 3  # after },\n
    
    new_chapter_code = (
        f"  {{\n"
        f"    id: '{ch_id}',\n"
        f"    chapter: '{ch_name}',\n"
        f"    rubrics: [\n"
        f"      {ts_entries[0]}"
    )
    for entry in ts_entries[1:]:
        new_chapter_code += f",\n      {entry}"
    new_chapter_code += "\n    ]\n  },\n"
    
    content = content[:insert_pos] + new_chapter_code + content[insert_pos:]
    print(f"  ADDED {json_key}: {len(rubrics)} rubrics (after {after_id})")

with open(DATA_FILE, 'w') as f:
    f.write(content)

print(f"\n{'='*60}")
print(f"Total new chapters inserted: {len(new_chapters)}")
print(f"Total new rubrics: {total_new}")