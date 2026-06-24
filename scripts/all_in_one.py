#!/usr/bin/env python3
"""
ALL-IN-ONE: Fix Urinary Organs duplicates, replace 5 small chapters, add 14 new chapters.
Reads original file once, makes all changes, writes once.
"""
import re, json

DATA = '/home/z/my-project/homeodesk-pro/src/kentRepertoryData.ts'
PARSED = '/home/z/my-project/scripts/parsed_all_chapters.json'

with open(DATA, 'r') as f:
    c = f.read()
with open(PARSED, 'r') as f:
    parsed = json.load(f)

def esc(t):
    return t.replace('\\', '\\\\').replace("'", "\\'")

def make_entries(ch_name, ch_id, rubrics):
    out = []
    for i, r in enumerate(rubrics, 1):
        txt = esc(r['text'])
        rems = json.dumps(r['remedies'])
        out.append(f"      {{ id: '{ch_id}-{i}', text: '{txt}', chapter: '{ch_name}', remedies: {rems} as string[], grade: 1 }}")
    return out

def build_chapter(ch_name, ch_id, rubrics):
    entries = make_entries(ch_name, ch_id, rubrics)
    arr = ',\n    '.join(entries)
    return f"  {{\n    id: '{ch_id}',\n    chapter: '{ch_name}',\n    rubrics: [\n    {arr}\n    ]\n  }}"

# ============================================================
# STEP 1: Fix Urinary Organs - remove duplicates and empty remedies
# ============================================================
print("=== FIXING URINARY ORGANS ===")
uo_pat = re.compile(r"id:\s*'urinary-organs'\s*,\s*\n\s*chapter:\s*'Urinary Organs'\s*,\s*\n\s*rubrics:\s*\[")
uo_match = uo_pat.search(c)
uo_arr_start = uo_match.end()

# Find array end with bracket counting
pos = uo_arr_start
bc, ins, esc_n = 1, False, False
while pos < len(c) and bc > 0:
    ch = c[pos]
    if esc_n: esc_n = False; pos += 1; continue
    if ch == '\\' and ins: esc_n = True; pos += 1; continue
    if ch == "'": ins = not ins; pos += 1; continue
    if ins: pos += 1; continue
    if ch == '[': bc += 1
    elif ch == ']': bc -= 1
    pos += 1
uo_arr_end = pos  # right after ]

# Parse individual entries
arr_content = c[uo_arr_start:uo_arr_end-1]
entries = []
e_start = 0
in_s, es, brace_c = False, False, 0
for i, ch in enumerate(arr_content):
    if es: es = False; continue
    if ch == '\\' and in_s: es = True; continue
    if ch == "'": in_s = not in_s; continue
    if in_s: continue
    if ch == '{':
        if brace_c == 0: e_start = i
        brace_c += 1
    elif ch == '}':
        brace_c -= 1
        if brace_c == 0:
            entries.append(arr_content[e_start:i+1])

# Deduplicate and remove empty remedies
seen = set()
unique = []
for e in entries:
    tm = re.search(r"text:\s*'((?:[^'\\]|\\.)*)'", e)
    if tm:
        t = tm.group(1)
        if 'remedies: [] as string[]' in e:
            continue  # skip empty
        if t not in seen:
            seen.add(t)
            unique.append(e)

new_uo_arr = '\n    '.join(unique)
c = c[:uo_arr_start] + new_uo_arr + '\n  ' + c[uo_arr_end-1:]
print(f"  Urinary Organs: {len(unique)} rubrics (was 652)")

# ============================================================
# STEP 2: Find all chapter block positions
# ============================================================
print("\n=== FINDING CHAPTER BLOCKS ===")

# Find all chapter ID lines
ch_id_lines = []
for m in re.finditer(r"id:\s*'([^']+)'", c):
    # Check if next non-whitespace line has "chapter:"
    after = c[m.end():m.end()+200]
    ch_match = re.match(r"\s*,\s*\n\s*chapter:\s*'([^']+)'", after)
    if ch_match:
        ch_id_lines.append((m.start(), m.group(1), ch_match.group(1)))

print(f"Found {len(ch_id_lines)} chapters")

# For each chapter, find the { ... } block
# Strategy: find the { before the id line, then bracket-count to find }
chapter_blocks = {}  # ch_id -> (block_start, block_end)
for idx, (line_start, ch_id, ch_name) in enumerate(ch_id_lines):
    # Find the opening { for this chapter
    # Search backwards from line_start for a { at column 2 (2-space indent)
    search_start = max(0, line_start - 5)
    found = False
    for p in range(line_start, search_start - 1, -1):
        if c[p] == '{' and (p == 0 or c[p-1] == '\n'):
            block_start = p
            found = True
            break
    
    if not found:
        # Try looking for { preceded by newline
        for p in range(line_start, max(0, line_start - 10), -1):
            if c[p] == '{':
                block_start = p
                found = True
                break
    
    if not found:
        print(f"  WARNING: No opening {{ for {ch_id}")
        continue
    
    # Count brackets to find matching }
    pos = block_start + 1
    bc, ins, esc_n = 1, False, False
    while pos < len(c) and bc > 0:
        ch = c[pos]
        if esc_n: esc_n = False; pos += 1; continue
        if ch == '\\' and ins: esc_n = True; pos += 1; continue
        if ch == "'": ins = not ins; pos += 1; continue
        if ins: pos += 1; continue
        if ch == '[': bc += 1
        elif ch == ']': bc -= 1
        pos += 1
    
    chapter_blocks[ch_id] = (block_start, pos)
    if (pos - block_start) > 100000:
        print(f"  WARNING: {ch_id} block is {(pos-block_start)//1000}KB (might be wrong)")

# Verify: blocks should not overlap
sorted_blocks = sorted(chapter_blocks.items(), key=lambda x: x[1][0])
for i in range(len(sorted_blocks) - 1):
    _, (_, end1) = sorted_blocks[i]
    next_id, (start2, _) = sorted_blocks[i+1]
    if end1 > start2:
        print(f"  OVERLAP: {sorted_blocks[i][0]} ends at {end1}, {next_id} starts at {start2}")

# ============================================================
# STEP 3: Replace 5 small chapters
# ============================================================
REPLACE_MAP = {
    'hearing': ('HEARING', 'HEARING', 'HEARING'),
    'vision': ('VISION', 'VISION', 'VISION'),
    'extremities': ('EXTREMITIES', 'EXTREMITIES', 'EXTREMITIES'),
    'generalities': ('GENERALITIES', 'GENERALITIES', 'GENERALITIES'),
    'prostate-gland': ('PROSTATE GLAND', 'Prostate Gland', 'PROSTATE GLAND'),
}

print("\n=== REPLACING CHAPTERS ===")
for ch_id, (json_key, data_ch_name, parsed_ch_name) in REPLACE_MAP.items():
    if ch_id not in chapter_blocks:
        print(f"  {json_key}: NOT IN BLOCKS")
        continue
    if parsed_ch_name not in parsed:
        print(f"  {json_key}: NOT IN PARSED DATA")
        continue
    
    block_start, block_end = chapter_blocks[ch_id]
    new_block = build_chapter(data_ch_name, ch_id, parsed[parsed_ch_name])
    c = c[:block_start] + new_block + c[block_end:]
    
    # Recalculate all block positions after this change
    size_diff = len(new_block) - (block_end - block_start)
    for key in chapter_blocks:
        bs, be = chapter_blocks[key]
        if bs > block_start:
            chapter_blocks[key] = (bs + size_diff, be + size_diff)
    
    print(f"  {json_key}: {len(parsed[parsed_ch_name])} rubrics")

# ============================================================
# STEP 4: Insert 14 new chapters before ]; 
# ============================================================
NEW = [
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

print("\n=== INSERTING NEW CHAPTERS ===")
marker = '  }\n];'
marker_pos = c.rfind(marker)
if marker_pos < 0:
    print("ERROR: marker not found"); exit(1)

blocks = []
total_new = 0
for json_key, cid in NEW:
    if json_key not in parsed: continue
    blocks.append(build_chapter(json_key, cid, parsed[json_key]))
    total_new += len(parsed[json_key])
    print(f"  {json_key}: {len(parsed[json_key])} rubrics")

insert_text = ',\n'.join(blocks) + ',\n'
c = c[:marker_pos+4] + insert_text + c[marker_pos+4:]

# ============================================================
# WRITE & VERIFY
# ============================================================
with open(DATA, 'w') as f:
    f.write(c)

with open(DATA, 'r') as f:
    v = f.read()

chs = re.findall(r"id:\s*'([^']+)',\s*\n\s*chapter:\s*'([^']+)'\s*,", v)
print(f"\n{'='*60}")
print(f"TOTAL CHAPTERS: {len(chs)}")
for cid, cn in chs:
    print(f"  {cn} ({cid})")
print(f"\nTotal new rubrics added: {total_new}")
print(f"File size: {len(c)} bytes")