#!/usr/bin/env python3
"""Insert 14 new chapters before the final ]; in kentRepertoryData.ts"""
import re, json

DATA_FILE = '/home/z/my-project/homeodesk-pro/src/kentRepertoryData.ts'
PARSED = '/home/z/my-project/scripts/parsed_all_chapters.json'

with open(DATA_FILE, 'r') as f:
    content = f.read()
with open(PARSED, 'r') as f:
    parsed = json.load(f)

def esc(t):
    return t.replace('\\', '\\\\').replace("'", "\\'")

# Chapters to add in correct order
CHAPTERS = [
    ('SLEEP', 'sleep'),
    ('BLADDER', 'bladder'),
    ('GENITALIA Male', 'genitalia-male'),
    ('GENITALIA Female', 'genitalia-female'),
    ('LARYNX AND TRACHEA', 'larynx-trachea'),
    ('RESPIRATION', 'respiration'),
    ('COUGH', 'cough'),
    ('EXPECTORATION', 'expectoration'),
    ('CHEST', 'chest'),
    ('BACK', 'back'),
    ('CHILL', 'chill'),
    ('FEVER', 'fever'),
    ('PERSPIRATION', 'perspiration'),
    ('SKIN', 'skin'),
]

# Also replace existing small chapters
REPLACE = {
    'HEARING': ('hearing', 'HEARING'),
    'VISION': ('vision', 'VISION'),
    'EXTREMITIES': ('extremities', 'EXTREMITIES'),
    'GENERALITIES': ('generalities', 'GENERALITIES'),
    'PROSTATE GLAND': ('prostate-gland', 'Prostate Gland'),
}

def make_entries(ch_name, ch_id, rubrics):
    entries = []
    for i, r in enumerate(rubrics, 1):
        txt = esc(r['text'])
        rems = json.dumps(r['remedies'])
        entries.append(f"      {{ id: '{ch_id}-{i}', text: '{txt}', chapter: '{ch_name}', remedies: {rems} as string[], grade: 1 }}")
    return entries

def find_array_end(ch_id, ch_name):
    """Find end position of a chapter's rubrics array."""
    pat = re.compile(r"id:\s*'" + re.escape(ch_id) + r"'\s*,\s*\n\s*chapter:\s*'" + re.escape(ch_name) + r"'")
    m = pat.search(content)
    if not m: return None, None
    ra = content.find('rubrics: [', m.start())
    pos = ra + len('rubrics: [')
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
    return m.start(), pos

# Step 1: Replace existing small chapters
print("=== REPLACING EXISTING CHAPTERS ===")
for json_key, (ch_id, ch_name) in REPLACE.items():
    if json_key not in parsed or not parsed[json_key]:
        print(f"  SKIP {json_key}")
        continue
    entries = make_entries(ch_name, ch_id, parsed[json_key])
    start, end = find_array_end(ch_id, ch_name)
    if start is None:
        print(f"  ERROR: {json_key} not found")
        continue
    arr_content = content.find('rubrics: [', start)
    new_arr = '\n    '.join(entries)
    new_sec = content[start:arr_content + len('rubrics: [')] + '\n    ' + new_arr + '\n  ' + content[end-1:]
    content = content[:start] + new_sec + content[end-1:]
    print(f"  {json_key}: {len(entries)} rubrics")

# Step 2: Insert new chapters before the final ];
print("\n=== INSERTING NEW CHAPTERS ===")
insert_pos = content.rfind('];')
if insert_pos < 0:
    print("ERROR: Could not find ];")
    exit(1)

# Find the position to insert (before the last },\n])
# We need to add after the last chapter entry
last_entry_end = content.rfind('  },\n', 0, insert_pos)
if last_entry_end < 0:
    last_entry_end = insert_pos - 4
else:
    last_entry_end += 4  # after },\n

chapters_code = []
total_rubrics = 0
for json_key, ch_id in CHAPTERS:
    if json_key not in parsed or not parsed[json_key]:
        print(f"  SKIP {json_key}")
        continue
    entries = make_entries(json_key, ch_id, parsed[json_key])
    total_rubrics += len(entries)
    
    arr_str = ',\n    '.join(entries)
    ch_code = (
        f"  {{\n"
        f"    id: '{ch_id}',\n"
        f"    chapter: '{json_key}',\n"
        f"    rubrics: [\n    {arr_str}\n    ]\n"
        f"  }},\n"
    )
    chapters_code.append(ch_code)
    print(f"  {json_key}: {len(entries)} rubrics")

all_new = ''.join(chapters_code)
content = content[:last_entry_end] + all_new + content[last_entry_end:]

with open(DATA_FILE, 'w') as f:
    f.write(content)

print(f"\n{'='*60}")
print(f"Inserted {len(chapters_code)} new chapters, {total_rubrics} rubrics total")

# Verify
with open(DATA_FILE, 'r') as f:
    verify = f.read()
ch_count = len(re.findall(r"chapter:\s*'[^']+'\s*,\s*\n\s*rubrics:\s*\[", verify))
print(f"Total chapters in file: {ch_count}")