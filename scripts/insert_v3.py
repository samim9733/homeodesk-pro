#!/usr/bin/env python3
"""Final version: Replace 5 small chapters + add 14 new ones using bracket-aware parsing."""
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

def find_chapter_block(content, ch_id, ch_name):
    """Find the exact start and end of a chapter block { id: ..., chapter: ..., rubrics: [...] }."""
    # Find chapter header
    header = f"id: '{ch_id}',\n  chapter: '{ch_name}'"
    # Try with different whitespace
    patterns = [
        f"id: '{ch_id}',\n\s*chapter: '{re.escape(ch_name)}'",
        f"id: '{ch_id}',\s*\n\s*chapter: '{re.escape(ch_name)}'",
    ]
    header_pos = None
    for pat in patterns:
        m = re.search(pat, content)
        if m:
            header_pos = m.start()
            break
    if header_pos is None:
        return None, None, None
    
    # Find the opening { before the header
    brace_pos = content.rfind('{', 0, header_pos)
    if brace_pos < 0:
        return None, None, None
    
    # Now count brackets to find the matching }
    pos = brace_pos + 1
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
    
    # pos is now right after the closing }
    return brace_pos, pos, header_pos

def build_chapter_block(ch_name, ch_id, rubrics):
    """Build a complete chapter block string."""
    entries = make_entries(ch_name, ch_id, rubrics)
    arr = ',\n    '.join(entries)
    return f"  {{\n    id: '{ch_id}',\n    chapter: '{ch_name}',\n    rubrics: [\n    {arr}\n    ]\n  }}"

# Step 1: Replace 5 existing small chapters
REPLACE = [
    ('HEARING', 'hearing', 'HEARING'),
    ('VISION', 'vision', 'VISION'),
    ('EXTREMITIES', 'extremities', 'EXTREMITIES'),
    ('GENERALITIES', 'generalities', 'GENERALITIES'),
    ('PROSTATE GLAND', 'prostate-gland', 'Prostate Gland'),
]

print("=== REPLACING EXISTING CHAPTERS ===")
# Process in reverse order to maintain positions
for jk, cid, cn in reversed(REPLACE):
    if jk not in parsed:
        continue
    start, end, _ = find_chapter_block(c, cid, cn)
    if start is None:
        print(f"  {jk}: NOT FOUND")
        continue
    new_block = build_chapter_block(cn, cid, parsed[jk])
    c = c[:start] + new_block + c[end:]
    print(f"  {jk}: replaced ({len(parsed[jk])} rubrics)")

# Step 2: Insert 14 new chapters before the final ]; 
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
# Find the last }; before ];
marker = '  }\n];'
marker_pos = c.rfind(marker)
if marker_pos < 0:
    print("ERROR: marker not found"); exit(1)

blocks = []
total = 0
for jk, cid in NEW:
    if jk not in parsed:
        continue
    block = build_chapter_block(jk, cid, parsed[jk])
    blocks.append(block)
    total += len(parsed[jk])
    print(f"  {jk}: {len(parsed[jk])} rubrics")

insert_text = ',\n'.join(blocks) + ',\n'
c = c[:marker_pos + 4] + insert_text + c[marker_pos + 4:]

with open(DATA, 'w') as f:
    f.write(c)

# Verify
with open(DATA, 'r') as f:
    v = f.read()
chs = re.findall(r"id:\s*'([^']+)',\s*\n\s*chapter:\s*'([^']+)'\s*,", v)
print(f"\n=== VERIFICATION ===")
print(f"Total chapters: {len(chs)}")
for cid, cn in chs:
    print(f"  {cn} ({cid})")
print(f"Total new rubrics: {total}")