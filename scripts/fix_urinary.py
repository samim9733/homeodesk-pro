#!/usr/bin/env python3
"""Fix Urinary Organs duplicates - keep first occurrence, remove rest."""
import re

DATA_FILE = '/home/z/my-project/homeodesk-pro/src/kentRepertoryData.ts'

with open(DATA_FILE, 'r') as f:
    content = f.read()

# Find Urinary Organs rubrics array
uo_start_pat = re.compile(r"id:\s*'urinary-organs'\s*,\s*\n\s*chapter:\s*'Urinary Organs'\s*,\s*\n\s*rubrics:\s*\[")
uo_start_match = uo_start_pat.search(content)
uo_array_start = uo_start_match.end()

# Find array end
pos = uo_array_start
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
uo_array_end = pos  # position right after ']'

# Extract the array content (between [ and ])
array_content = content[uo_array_start:uo_array_end-1]

# Parse individual rubric entries - they start with { id: '
# Split by finding each { ... } block
entries = []
entry_start = 0
in_str = False
esc = False
brace_count = 0

for i, c in enumerate(array_content):
    if esc: esc = False; continue
    if c == '\\' and in_str: esc = True; continue
    if c == "'": in_str = not in_str; continue
    if in_str: continue
    if c == '{': 
        if brace_count == 0:
            entry_start = i
        brace_count += 1
    elif c == '}':
        brace_count -= 1
        if brace_count == 0:
            entries.append(array_content[entry_start:i+1])

print(f"Total entries parsed: {len(entries)}")

# Extract text from each entry and deduplicate
seen_texts = set()
unique_entries = []
dupes_removed = 0

for entry in entries:
    text_match = re.search(r"text:\s*'((?:[^'\\]|\\.)*)'", entry)
    if text_match:
        text = text_match.group(1)
        if text not in seen_texts:
            seen_texts.add(text)
            unique_entries.append(entry)
        else:
            dupes_removed += 1
    else:
        unique_entries.append(entry)

print(f"Unique entries: {len(unique_entries)}")
print(f"Duplicates removed: {dupes_removed}")

# Rebuild the array content
# Also remove the 588 entries that have empty remedies AND were added from reference
# (keep only entries that either have remedies OR were in the original 64)
# Actually, let's keep unique entries but also filter out the obviously bad ones
# that have empty remedies and are sub-rubrics of BLADDER

# Remove ALL entries with empty remedies (they have no clinical value)
final_entries = []
empty_removed = 0
for entry in unique_entries:
    if 'remedies: [] as string[]' in entry:
        empty_removed += 1
        continue
    final_entries.append(entry)

print(f"Empty-remedy BLADDER subs removed: {empty_removed}")
print(f"Final entries: {len(final_entries)}")

# Rebuild
new_array = '\n    ' + ',\n    '.join(final_entries) + '\n  '
new_section = content[uo_start_match.start():uo_array_start] + new_array + content[uo_array_end-1:]

# Replace in content
content = content[:uo_start_match.start()] + new_section + content[uo_array_end-1:]

with open(DATA_FILE, 'w') as f:
    f.write(content)

print(f"\nDone! File updated.")