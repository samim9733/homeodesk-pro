#!/usr/bin/env python3
"""Replace 5 small chapters + add 14 new. Uses exact pattern for chapter start."""
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

def find_chapter_bracket_aware(content, ch_id):
    """Find chapter block using the exact pattern '  {{\n    id: 'ch_id'' and bracket counting."""
    # Try multiple patterns
    for pat in [
        "  {\n    id: '" + ch_id + "'",
        ",\n  {\n    id: '" + ch_id + "'",
    ]:
        start = content.find(pat)
        if start >= 0:
            # Adjust to the { position
            if start > 0 and content[start-1] == ',':
                start -= 2  # skip ,\n
            break
    if start < 0:
        return None, None
    
    # Count brackets from the opening {
    pos = start + 1  # skip the {
    bc = 1
    ins = False
    esc_n = False
    while pos < len(content) and bc > 0:
        ch = content[pos]
        if esc_n: esc_n = False; pos += 1; continue
        if ch == '\\' and ins: esc_n = True; pos += 1; continue
        if ch == "'": ins = not ins; pos += 1; continue
        if ins: pos += 1; continue
        if ch == '{': bc += 1
        elif ch == '}': bc -= 1
        pos += 1
    # pos is right after the closing }
    return start, pos

def build_chapter(ch_name, ch_id, rubrics):
    entries = make_entries(ch_name, ch_id, rubrics)
    arr = ',\n    '.join(entries)
    return f"  {{\n    id: '{ch_id}',\n    chapter: '{ch_name}',\n    rubrics: [\n    {arr}\n    ]\n  }}"

# Step 1: Replace existing chapters (reverse order to preserve positions)
REPLACE = [
    ('PROSTATE GLAND', 'prostate-gland', 'Prostate Gland'),
    ('GENERALITIES', 'generalities', 'GENERALITIES'),
    ('EXTREMITIES', 'extremities', 'EXTREMITIES'),
    ('VISION', 'vision', 'VISION'),
    ('HEARING', 'hearing', 'HEARING'),
]

print("=== REPLACING ===")
for jk, cid, cn in REPLACE:
    if jk not in parsed: continue
    start, end = find_chapter_bracket_aware(c, cid)
    if start is None:
        print(f"  {jk}: NOT FOUND"); continue
    block = build_chapter(cn, cid, parsed[jk])
    c = c[:start] + block + c[end:]
    print(f"  {jk}: OK ({len(parsed[jk])})")

# Step 2: Insert new chapters
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

print("\n=== INSERTING ===")
marker = '  }\n];'
pos = c.rfind(marker)
if pos < 0:
    print("ERROR"); exit(1)

blocks = []
total = 0
for jk, cid in NEW:
    if jk not in parsed: continue
    blocks.append(build_chapter(jk, cid, parsed[jk]))
    total += len(parsed[jk])
    print(f"  {jk}: {len(parsed[jk])}")

insert_str = ',\n'.join(blocks) + ',\n'
c = c[:pos+4] + insert_str + c[pos+4:]

with open(DATA, 'w') as f:
    f.write(c)

# Verify
with open(DATA, 'r') as f:
    v = f.read()
chs = re.findall(r"id:\s*'([^']+)',\s*\n\s*chapter:\s*'([^']+)'\s*,", v)
print(f"\nTotal chapters: {len(chs)}")
for cid, cn in chs:
    print(f"  {cn}")
print(f"New rubrics: {total}")