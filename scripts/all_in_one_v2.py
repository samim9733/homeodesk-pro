#!/usr/bin/env python3
"""
ALL-IN-ONE v2: Fix Urinary + Replace 5 + Add 14.
Uses the exact pattern '  },\n  {\n    id: 'ch_id'' to find chapter boundaries.
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
# STEP 1: Fix Urinary Organs
# ============================================================
print("=== FIXING URINARY ORGANS ===")
uo_pat = re.compile(r"id:\s*'urinary-organs'\s*,\s*\n\s*chapter:\s*'Urinary Organs'\s*,\s*\n\s*rubrics:\s*\[")
uo_m = uo_pat.search(c)
uo_arr_s = uo_m.end()
pos = uo_arr_s
bc, ins, es = 1, False, False
while pos < len(c) and bc > 0:
    ch = c[pos]
    if es: es = False; pos += 1; continue
    if ch == '\\' and ins: es = True; pos += 1; continue
    if ch == "'": ins = not ins; pos += 1; continue
    if ins: pos += 1; continue
    if ch == '[': bc += 1
    elif ch == ']': bc -= 1
    pos += 1
uo_arr_e = pos

arr = c[uo_arr_s:uo_arr_e-1]
entries, e_s, in_s, es2, brc = [], 0, False, False, 0
for i, ch in enumerate(arr):
    if es2: es2 = False; continue
    if ch == '\\' and in_s: es2 = True; continue
    if ch == "'": in_s = not in_s; continue
    if in_s: continue
    if ch == '{':
        if brc == 0: e_s = i
        brc += 1
    elif ch == '}':
        brc -= 1
        if brc == 0: entries.append(arr[e_s:i+1])

seen, unique = set(), []
for e in entries:
    tm = re.search(r"text:\s*'((?:[^'\\]|\\.)*)'", e)
    if tm and 'remedies: [] as string[]' not in e and tm.group(1) not in seen:
        seen.add(tm.group(1)); unique.append(e)

new_arr = '\n    '.join(unique)
c = c[:uo_arr_s] + new_arr + '\n  ' + c[uo_arr_e-1:]
print(f"  OK: {len(unique)} rubrics")

# ============================================================
# STEP 2: Find chapter blocks using EXACT pattern
# ============================================================
# Each chapter block starts with "  },\n  {\n    id: 'ch_id'" (or for first: "[\n  {\n    id: 'ch_id'")
# and ends with "    ]\n  }"
# Strategy: find all id+chapter lines, then find the block boundaries

chapters = []  # list of (ch_id, ch_name, block_start, block_end)

# Find all chapter id lines (not rubric id lines - those are followed by 'text:', not 'chapter:')
for m in re.finditer(r"id:\s*'([^']+)'", c):
    after = c[m.end():m.end()+100]
    cm = re.match(r"\s*,\s*\n\s*chapter:\s*'([^']+)'", after)
    if cm:
        ch_id, ch_name = m.group(1), cm.group(1)
        
        # Find the "  {" before id using exact pattern
        pat = "\n  {\n    id: '" + ch_id + "'"
        p = c.find(pat)
        if p >= 0:
            block_start = p + 3  # position of {
        else:
            # First chapter: "[\n  {\n    id: 'ch_id'"
            pat2 = "[\n  {\n    id: '" + ch_id + "'"
            p2 = c.find(pat2)
            if p2 >= 0:
                block_start = p2 + 3
            else:
                # Try with 6-space indent: "\n  {\n      id: 'ch_id'"
                pat3 = "\n  {\n      id: '" + ch_id + "'"
                p3 = c.find(pat3)
                if p3 >= 0:
                    block_start = p3 + 3
                else:
                    continue
        
        # Bracket-count to find matching }
        pos = block_start + 1
        bc, ins, es3 = 1, False, False
        while pos < len(c) and bc > 0:
            ch = c[pos]
            if es3: es3 = False; pos += 1; continue
            if ch == '\\' and ins: es3 = True; pos += 1; continue
            if ch == "'": ins = not ins; pos += 1; continue
            if ins: pos += 1; continue
            if ch == '[': bc += 1
            elif ch == ']': bc -= 1
            elif ch == '{': bc += 1
            elif ch == '}': bc -= 1
            pos += 1
        
        chapters.append((ch_id, ch_name, block_start, pos))

print(f"\nFound {len(chapters)} chapters")
for cid, cn, bs, be in chapters:
    print(f"  {cn} ({cid}): {bs}-{be} ({(be-bs)//1024}KB)")

# ============================================================
# STEP 3: Replace 5 small chapters (reverse order!)
# ============================================================
REPLACE = [
    ('generalities', 'GENERALITIES', 'GENERALITIES'),
    ('extremities', 'EXTREMITIES', 'EXTREMITIES'),
    ('prostate-gland', 'Prostate Gland', 'PROSTATE GLAND'),
    ('vision', 'VISION', 'VISION'),
    ('hearing', 'HEARING', 'HEARING'),
]

print("\n=== REPLACING CHAPTERS ===")
for ch_id, data_name, parsed_name in REPLACE:
    if parsed_name not in parsed:
        print(f"  {data_name}: not in parsed"); continue
    if parsed_name not in parsed:
        print(f"  {data_name}: not in parsed"); continue
    
    # Find block
    block = None
    for i, (cid, cn, bs, be) in enumerate(chapters):
        if cid == ch_id:
            block = (i, bs, be)
            break
    
    if not block:
        print(f"  {data_name}: block not found"); continue
    
    idx, bs, be = block
    new_block = build_chapter(data_name, ch_id, parsed[parsed_name])
    c = c[:bs] + new_block + c[be:]
    
    # Update positions of subsequent blocks
    diff = len(new_block) - (be - bs)
    for j in range(idx + 1, len(chapters)):
        cid2, cn2, bs2, be2 = chapters[j]
        chapters[j] = (cid2, cn2, bs2 + diff, be2 + diff)
    
    print(f"  {data_name}: {len(parsed[parsed_name])} rubrics")

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
# Find "  }\n];"
marker_pos = c.rfind('  }\n];')
if marker_pos < 0:
    print("ERROR"); exit(1)

blocks, total = [], 0
for parsed_name, cid in NEW:
    if parsed_name not in parsed: continue
    blocks.append(build_chapter(parsed_name, cid, parsed[parsed_name]))
    total += len(parsed[parsed_name])
    print(f"  {parsed_name}: {len(parsed[parsed_name])}")

ins = ',\n'.join(blocks) + ',\n'
c = c[:marker_pos+4] + ins + c[marker_pos+4:]

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
print(f"New rubrics: {total}")
print(f"File: {len(c)} bytes")