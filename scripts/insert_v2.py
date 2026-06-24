#!/usr/bin/env python3
"""Insert 14 new chapters + replace 5 small ones. Simple approach: find '  }\n];' and insert before it."""
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

def replace_chapter(c, ch_id, ch_name, rubrics):
    """Replace an existing chapter's rubrics."""
    entries = make_entries(ch_name, ch_id, rubrics)
    # Find chapter start
    pat = re.compile(r"(id:\s*'" + re.escape(ch_id) + r"'\s*,\s*\n\s*chapter:\s*'" + re.escape(ch_name) + r"'\s*,\s*\n\s*rubrics:\s*\[)\n(.*?)\n  \}",
        re.DOTALL)
    m = pat.search(c)
    if not m:
        return c, False
    arr_str = ',\n    '.join(entries)
    replacement = m.group(1) + '\n    ' + arr_str + '\n  }'
    c = c[:m.start()] + replacement + c[m.end():]
    return c, True

# Step 1: Replace existing small chapters
REPLACE = [
    ('HEARING', 'hearing', 'HEARING'),
    ('VISION', 'vision', 'VISION'),
    ('EXTREMITIES', 'extremities', 'EXTREMITIES'),
    ('GENERALITIES', 'generalities', 'GENERALITIES'),
    ('PROSTATE GLAND', 'prostate-gland', 'Prostate Gland'),
]
print("Replacing existing chapters:")
for jk, cid, cn in REPLACE:
    if jk not in parsed: continue
    c, ok = replace_chapter(c, cid, cn, parsed[jk])
    print(f"  {jk}: {'OK' if ok else 'FAIL'} ({len(parsed[jk])} rubrics)")

# Step 2: Insert new chapters before '  }\n];'
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

print("\nInserting new chapters:")
insert_marker = '  }\n];'
insert_pos = c.rfind(insert_marker)
if insert_pos < 0:
    print("ERROR: marker not found"); exit(1)

chapters_ts = []
total = 0
for jk, cid in NEW:
    if jk not in parsed: continue
    entries = make_entries(jk, cid, parsed[jk])
    total += len(entries)
    arr = ',\n    '.join(entries)
    chapters_ts.append(
        f"  {{\n    id: '{cid}',\n    chapter: '{jk}',\n    rubrics: [\n    {arr}\n    ]\n  }},"
    )
    print(f"  {jk}: {len(entries)} rubrics")

new_block = ',\n'.join(chapters_ts)
c = c[:insert_pos] + new_block + ',\n' + c[insert_pos:]

with open(DATA, 'w') as f:
    f.write(c)

# Verify
with open(DATA, 'r') as f:
    v = f.read()
chs = re.findall(r"id:\s*'([^']+)',\s*\n\s*chapter:", v)
print(f"\nTotal chapters: {len(chs)}")
print(f"Total new rubrics inserted: {total}")