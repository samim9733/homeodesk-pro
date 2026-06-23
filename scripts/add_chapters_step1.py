#!/usr/bin/env python3
"""
Script to add/fix chapters in Kent's Repertory data.
This script replaces placeholder chapters and adds missing ones.
"""

import re

FILE_PATH = '/home/z/my-project/homeodesk-pro/src/kentRepertoryData.ts'

def read_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        return f.read()

def write_file(path, content):
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

def find_chapter_block(content, chapter_name):
    """Find the start and end of a chapter block in the data array."""
    # Find the chapter: 'CHAPTER_NAME' line
    pattern = rf"^\s+chapter:\s+'{re.escape(chapter_name)}',\s*$"
    
    # Find start: look for the { before the chapter line
    lines = content.split('\n')
    chapter_line_idx = None
    for i, line in enumerate(lines):
        if re.search(pattern, line):
            chapter_line_idx = i
            break
    
    if chapter_line_idx is None:
        return None, None
    
    # Find the opening { for this chapter object
    start_idx = chapter_line_idx
    while start_idx >= 0 and '{' not in lines[start_idx]:
        start_idx -= 1
    
    # Find matching closing }
    # Look for the pattern:   }  (end of chapter object) followed by comma
    depth = 0
    end_idx = start_idx
    found_start = False
    for i in range(start_idx, len(lines)):
        depth += lines[i].count('{') - lines[i].count('}')
        if depth == 0 and i > start_idx:
            end_idx = i
            break
    
    return start_idx, end_idx

def replace_chapter(content, chapter_name, new_data):
    """Replace an existing chapter block with new data."""
    start_idx, end_idx = find_chapter_block(content, chapter_name)
    
    if start_idx is None:
        print(f"Chapter '{chapter_name}' not found!")
        return content
    
    lines = content.split('\n')
    indent = '  '
    new_lines = [indent + line for line in new_data.strip().split('\n')]
    
    # Replace the old block with new data
    new_content = '\n'.join(lines[:start_idx]) + '\n' + '\n'.join(new_lines) + '\n' + '\n'.join(lines[end_idx+1:])
    
    print(f"Replaced chapter '{chapter_name}' (lines {start_idx+1}-{end_idx+1})")
    return new_content

def insert_before_closing(content, new_chapters_data):
    """Insert new chapter data before the closing '];' of the array."""
    # Find the last '];' or ']'
    closing_pattern = r"\n\];\s*$"
    
    # Build the new chapter entries
    new_entries = []
    for ch_data in new_chapters_data:
        lines = ch_data.strip().split('\n')
        indented = ['  ' + line for line in lines]
        new_entries.append('\n'.join(indented))
    
    insert_text = ',\n' + '\n,\n'.join(new_entries)
    
    new_content = re.sub(closing_pattern, insert_text + '\n];', content)
    return new_content

# Read the file
print("Reading kentRepertoryData.ts...")
content = read_file(FILE_PATH)
original_lines = content.count('\n')

# ============================================================
# 1. Replace EXTERNAL THROAT
# ============================================================
EXTERNAL_THROAT = '''{
    id: 'external-throat',
    chapter: 'EXTERNAL THROAT',
    rubrics: [
      { id: 'external-throat-1', text: 'EXTERNAL THROAT - ABSCESS', chapter: 'EXTERNAL THROAT', remedies: ['Bell.', 'Bry.', 'Calc.', 'Carb-an.', 'Carb-v.', 'Caust.', 'Hep.', 'Lach.', 'Merc.', 'Phos.', 'Rhus-t.', 'Sil.', 'Sulph.'], grade: 1 },
      { id: 'external-throat-1-1', text: 'EXTERNAL THROAT - ABSCESS - cervical glands', chapter: 'EXTERNAL THROAT', remedies: ['Bell.', 'Bry.', 'Calc.', 'Carb-an.', 'Hep.', 'Lach.', 'Merc.', 'Phos.', 'Sil.', 'Sulph.'], grade: 1 },
      { id: 'external-throat-2', text: 'EXTERNAL THROAT - AIR, sensitive to', chapter: 'EXTERNAL THROAT', remedies: ['Bar-c.', 'Bov.', 'Calc.', 'Caust.', 'Cham.', 'Nux-v.', 'Phos.', 'Rhus-t.', 'Spong.'], grade: 1 },
      { id: 'external-throat-2-1', text: 'EXTERNAL THROAT - AIR, sensitive to - open air amel.', chapter: 'EXTERNAL THROAT', remedies: ['Puls.', 'Rhus-t.', 'Spong.'], grade: 1 },
      { id: 'external-throat-3', text: 'EXTERNAL THROAT - COLDNESS', chapter: 'EXTERNAL THROAT', remedies: ['Calc.', 'Carb-v.', 'Caust.', 'Lach.', 'Phos.', 'Sep.', 'Sil.', 'Spong.'], grade: 1 },
      { id: 'external-throat-3-1', text: 'EXTERNAL THROAT - COLDNESS - evening', chapter: 'EXTERNAL THROAT', remedies: ['Carb-v.', 'Sep.'], grade: 1 },
      { id: 'external-throat-4', text: 'EXTERNAL THROAT - CONSTRICTION', chapter: 'EXTERNAL THROAT', remedies: ['Alum.', 'Bary-c.', 'Brom.', 'Cactus.', 'Calc.', 'Chel.', 'Ign.', 'Lach.', 'Lyc.', 'Nat-m.', 'Nux-v.', 'Spong.', 'Thuj.'], grade: 1 },
      { id: 'external-throat-4-1', text: 'EXTERNAL THROAT - CONSTRICTION - globus hystericus', chapter: 'EXTERNAL THROAT', remedies: ['Arg-n.', 'Ign.', 'Lach.', 'Lyc.', 'Nat-m.'], grade: 1 },
      { id: 'external-throat-5', text: 'EXTERNAL THROAT - EMACIATION of neck', chapter: 'EXTERNAL THROAT', remedies: ['Abrot.', 'Calc.', 'Iod.', 'Lyc.', 'Nat-m.', 'Phos.', 'Tub.'], grade: 1 },
      { id: 'external-throat-6', text: 'EXTERNAL THROAT - ERUPTIONS', chapter: 'EXTERNAL THROAT', remedies: ['Ant-c.', 'Ars.', 'Bov.', 'Calc.', 'Graph.', 'Hep.', 'Lyc.', 'Mez.', 'Nit-ac.', 'Pet.', 'Rhus-t.', 'Sulph.'], grade: 1 },
      { id: 'external-throat-6-1', text: 'EXTERNAL THROAT - ERUPTIONS - boils', chapter: 'EXTERNAL THROAT', remedies: ['Ars.', 'Bell.', 'Calc.', 'Echin.', 'Hep.', 'Lyc.', 'Sil.', 'Sulph.'], grade: 1 },
      { id: 'external-throat-6-2', text: 'EXTERNAL THROAT - ERUPTIONS - herpes', chapter: 'EXTERNAL THROAT', remedies: ['Agar.', 'Apis.', 'Rhus-t.', 'Sulph.'], grade: 1 },
      { id: 'external-throat-6-3', text: 'EXTERNAL THROAT - ERUPTIONS - pimples', chapter: 'EXTERNAL THROAT', remedies: ['Ars.', 'Bov.', 'Calc.', 'Sulph.'], grade: 1 },
      { id: 'external-throat-6-4', text: 'EXTERNAL THROAT - ERUPTIONS - urticaria', chapter: 'EXTERNAL THROAT', remedies: ['Apis.', 'Ars.', 'Dulc.', 'Rhus-t.', 'Urt-u.'], grade: 1 },
      { id: 'external-throat-7', text: 'EXTERNAL THROAT - FORMICATION', chapter: 'EXTERNAL THROAT', remedies: ['Agar.', 'Alum.', 'Bary-c.', 'Calc.', 'Nat-m.', 'Phos.', 'Rhus-t.', 'Sulph.'], grade: 1 },
      { id: 'external-throat-8', text: 'EXTERNAL THROAT - FULLNESS in throat pit', chapter: 'EXTERNAL THROAT', remedies: ['Bary-c.'], grade: 1 },
      { id: 'external-throat-9', text: 'EXTERNAL THROAT - GOITRE', chapter: 'EXTERNAL THROAT', remedies: ['Bary-c.', 'Brom.', 'Calc.', 'Con.', 'Fucus.', 'Iod.', 'Lyc.', 'Nat-m.', 'Phos.', 'Spong.', 'Thyr.'], grade: 1 },
      { id: 'external-throat-9-1', text: 'EXTERNAL THROAT - GOITRE - enlarged', chapter: 'EXTERNAL THROAT', remedies: ['Brom.', 'Calc.', 'Con.', 'Fucus.', 'Iod.', 'Lyc.', 'Phos.', 'Spong.', 'Thyr.'], grade: 1 },
      { id: 'external-throat-9-2', text: 'EXTERNAL THROAT - GOITRE - indurated', chapter: 'EXTERNAL THROAT', remedies: ['Aur.', 'Bary-c.', 'Brom.', 'Calc.', 'Con.', 'Iod.', 'Lyc.', 'Spong.', 'Thuj.'], grade: 1 },
      { id: 'external-throat-9-3', text: 'EXTERNAL THROAT - GOITRE - exophthalmic', chapter: 'EXTERNAL THROAT', remedies: ['Bary-c.', 'Brom.', 'Con.', 'Iod.', 'Lyc.', 'Phos.', 'Spong.', 'Thyr.'], grade: 1 },
      { id: 'external-throat-9-4', text: 'EXTERNAL THROAT - GOITRE - pulsating', chapter: 'EXTERNAL THROAT', remedies: ['Calc.', 'Iod.', 'Lyc.', 'Spong.'], grade: 1 },
      { id: 'external-throat-9-5', text: 'EXTERNAL THROAT - GOITRE - painful', chapter: 'EXTERNAL THROAT', remedies: ['Bary-c.', 'Brom.', 'Calc.', 'Con.', 'Iod.', 'Lyc.', 'Phos.', 'Spong.'], grade: 1 },
      { id: 'external-throat-9-6', text: 'EXTERNAL THROAT - GOITRE - right side', chapter: 'EXTERNAL THROAT', remedies: ['Brom.', 'Calc.', 'Con.', 'Iod.', 'Lyc.', 'Phos.', 'Spong.'], grade: 1 },
      { id: 'external-throat-9-7', text: 'EXTERNAL THROAT - GOITRE - left side', chapter: 'EXTERNAL THROAT', remedies: ['Bary-c.', 'Calc.', 'Con.', 'Lyc.', 'Phos.', 'Spong.'], grade: 1 },
      { id: 'external-throat-9-8', text: 'EXTERNAL THROAT - GOITRE - on swallowing agg.', chapter: 'EXTERNAL THROAT', remedies: ['Bary-c.', 'Brom.', 'Con.', 'Iod.', 'Lyc.', 'Spong.'], grade: 1 },
      { id: 'external-throat-10', text: 'EXTERNAL THROAT - GRASPING sensation in throat', chapter: 'EXTERNAL THROAT', remedies: ['Arg-n.', 'Ign.', 'Lach.', 'Lyc.', 'Nat-m.', 'Nux-v.', 'Spong.'], grade: 1 },
      { id: 'external-throat-10-1', text: 'EXTERNAL THROAT - GRASPING sensation in throat - Thyroid gland', chapter: 'EXTERNAL THROAT', remedies: ['Arg-n.', 'Calc.', 'Iod.', 'Lyc.', 'Phos.', 'Spong.'], grade: 1 },
      { id: 'external-throat-11', text: 'EXTERNAL THROAT - INDURATION of glands', chapter: 'EXTERNAL THROAT', remedies: ['Aur.', 'Bary-c.', 'Calc.', 'Con.', 'Fluor.', 'Lyc.', 'Phos.', 'Sil.', 'Spong.', 'Thuj.'], grade: 1 },
      { id: 'external-throat-11-1', text: 'EXTERNAL THROAT - INDURATION of glands - cervical', chapter: 'EXTERNAL THROAT', remedies: ['Aur.', 'Bary-c.', 'Calc.', 'Con.', 'Sil.', 'Thuj.'], grade: 1 },
      { id: 'external-throat-11-2', text: 'EXTERNAL THROAT - INDURATION of glands - like knotted cords', chapter: 'EXTERNAL THROAT', remedies: ['Alum.', 'Aur.', 'Bary-c.', 'Calc.', 'Con.', 'Sil.', 'Thuj.'], grade: 1 },
      { id: 'external-throat-12', text: 'EXTERNAL THROAT - ITCHING', chapter: 'EXTERNAL THROAT', remedies: ['Alum.', 'Apis.', 'Ars.', 'Bov.', 'Graph.', 'Lyc.', 'Mez.', 'Nit-ac.', 'Psor.', 'Rhus-t.', 'Sulph.', 'Staph.'], grade: 1 },
      { id: 'external-throat-12-1', text: 'EXTERNAL THROAT - ITCHING - evening', chapter: 'EXTERNAL THROAT', remedies: ['Ars.', 'Mez.', 'Nit-ac.', 'Staph.', 'Sulph.'], grade: 1 },
      { id: 'external-throat-12-2', text: 'EXTERNAL THROAT - ITCHING - scratching amel.', chapter: 'EXTERNAL THROAT', remedies: ['Nit-ac.', 'Sulph.'], grade: 1 },
      { id: 'external-throat-13', text: 'EXTERNAL THROAT - LUMP in throat pit', chapter: 'EXTERNAL THROAT', remedies: ['Bary-c.', 'Calc.', 'Lyc.', 'Phos.', 'Spong.', 'Thuj.'], grade: 1 },
      { id: 'external-throat-14', text: 'EXTERNAL THROAT - NUMBNESS', chapter: 'EXTERNAL THROAT', remedies: ['Alum.'], grade: 1 },
      { id: 'external-throat-15', text: 'EXTERNAL THROAT - PAIN', chapter: 'EXTERNAL THROAT', remedies: ['Bell.', 'Bry.', 'Calc.', 'Cimic.', 'Con.', 'Dros.', 'Lach.', 'Nit-ac.', 'Nux-v.', 'Phos.', 'Rhus-t.', 'Ruta.', 'Sanguin.', 'Sil.', 'Spong.', 'Sulph.'], grade: 1 },
      { id: 'external-throat-15-1', text: 'EXTERNAL THROAT - PAIN - Cervical glands', chapter: 'EXTERNAL THROAT', remedies: ['Bell.', 'Calc.', 'Con.', 'Lyc.', 'Merc.', 'Nit-ac.', 'Phos.', 'Sil.', 'Sulph.'], grade: 1 },
      { id: 'external-throat-15-2', text: 'EXTERNAL THROAT - PAIN - morning', chapter: 'EXTERNAL THROAT', remedies: ['Bry.', 'Lach.', 'Lyc.', 'Nux-v.', 'Sulph.'], grade: 1 },
      { id: 'external-throat-15-3', text: 'EXTERNAL THROAT - PAIN - night', chapter: 'EXTERNAL THROAT', remedies: ['Calc.', 'Lach.', 'Merc.', 'Sulph.'], grade: 1 },
      { id: 'external-throat-15-4', text: 'EXTERNAL THROAT - PAIN - Thyroid gland', chapter: 'EXTERNAL THROAT', remedies: ['Bary-c.', 'Brom.', 'Calc.', 'Iod.', 'Lyc.', 'Phos.', 'Spong.'], grade: 1 },
      { id: 'external-throat-15-5', text: 'EXTERNAL THROAT - PAIN - Sides', chapter: 'EXTERNAL THROAT', remedies: ['Bell.', 'Bry.', 'Cimic.', 'Chel.', 'Lach.', 'Spong.', 'Sulph.'], grade: 1 },
      { id: 'external-throat-15-6', text: 'EXTERNAL THROAT - PAIN - Burning', chapter: 'EXTERNAL THROAT', remedies: ['Ars.', 'Brom.', 'Canth.', 'Lach.', 'Merc.', 'Sulph.'], grade: 1 },
      { id: 'external-throat-15-7', text: 'EXTERNAL THROAT - PAIN - Pressing', chapter: 'EXTERNAL THROAT', remedies: ['Bry.', 'Chel.', 'Cimic.', 'Con.', 'Lach.', 'Nat-m.', 'Nux-v.'], grade: 1 },
      { id: 'external-throat-15-8', text: 'EXTERNAL THROAT - PAIN - Stitching', chapter: 'EXTERNAL THROAT', remedies: ['Arg-n.', 'Bry.', 'Calc.', 'Lach.', 'Spong.', 'Sulph.'], grade: 1 },
      { id: 'external-throat-15-9', text: 'EXTERNAL THROAT - PAIN - Tearing', chapter: 'EXTERNAL THROAT', remedies: ['Chel.', 'Cimic.', 'Guaj.', 'Nat-m.', 'Rhus-t.', 'Sanguin.', 'Sulph.'], grade: 1 },
      { id: 'external-throat-15-10', text: 'EXTERNAL THROAT - PAIN - Soreness', chapter: 'EXTERNAL THROAT', remedies: ['Bell.', 'Bry.', 'Calc.', 'Eup-per.', 'Lach.', 'Nit-ac.', 'Phytol.', 'Rhus-t.', 'Sulph.'], grade: 1 },
      { id: 'external-throat-16', text: 'EXTERNAL THROAT - PARALYSIS', chapter: 'EXTERNAL THROAT', remedies: ['Alum.', 'Ars.', 'Caust.', 'Gels.', 'Phos.', 'Plb.', 'Rhus-t.', 'Sec.'], grade: 1 },
      { id: 'external-throat-16-1', text: 'EXTERNAL THROAT - PARALYSIS - sterno-mastoid', chapter: 'EXTERNAL THROAT', remedies: ['Alum.', 'Caust.', 'Gels.', 'Phos.', 'Rhus-t.', 'Sec.'], grade: 1 },
      { id: 'external-throat-17', text: 'EXTERNAL THROAT - PERSPIRATION', chapter: 'EXTERNAL THROAT', remedies: ['Amb.', 'Amyl.', 'Bar-c.', 'Bry.', 'Calc.', 'Iod.', 'Lyc.', 'Nat-m.', 'Nit-ac.', 'Nux-v.', 'Phos.', 'Sep.', 'Sulph.'], grade: 1 },
      { id: 'external-throat-17-1', text: 'EXTERNAL THROAT - PERSPIRATION - cervical glands', chapter: 'EXTERNAL THROAT', remedies: ['Amb.', 'Bar-c.', 'Bry.', 'Calc.', 'Iod.', 'Lyc.', 'Nit-ac.', 'Sulph.'], grade: 1 },
      { id: 'external-throat-17-2', text: 'EXTERNAL THROAT - PERSPIRATION - evening', chapter: 'EXTERNAL THROAT', remedies: ['Amb.', 'Bar-c.', 'Calc.', 'Lyc.', 'Sulph.'], grade: 1 },
      { id: 'external-throat-17-3', text: 'EXTERNAL THROAT - PERSPIRATION - on waking', chapter: 'EXTERNAL THROAT', remedies: ['Amb.', 'Bar-c.', 'Bry.', 'Calc.', 'Nit-ac.', 'Sulph.'], grade: 1 },
      { id: 'external-throat-18', text: 'EXTERNAL THROAT - PULSATION, carotids', chapter: 'EXTERNAL THROAT', remedies: ['Acon.', 'Bell.', 'Cham.', 'Cimic.', 'Iod.', 'Lach.', 'Lyc.', 'Nux-v.', 'Phos.', 'Puls.', 'Spong.', 'Sulph.'], grade: 1 },
      { id: 'external-throat-18-1', text: 'EXTERNAL THROAT - PULSATION, carotids - visible', chapter: 'EXTERNAL THROAT', remedies: ['Acon.', 'Bell.', 'Cimic.', 'Iod.', 'Lach.', 'Lyc.', 'Spong.'], grade: 1 },
      { id: 'external-throat-18-2', text: 'EXTERNAL THROAT - PULSATION, carotids - lying amel.', chapter: 'EXTERNAL THROAT', remedies: ['Calc.', 'Iod.', 'Lyc.', 'Phos.'], grade: 1 },
      { id: 'external-throat-19', text: 'EXTERNAL THROAT - SENSITIVE to touch', chapter: 'EXTERNAL THROAT', remedies: ['Bell.', 'Bry.', 'Lach.', 'Nux-v.', 'Phos.', 'Rhus-t.', 'Sulph.'], grade: 1 },
      { id: 'external-throat-20', text: 'EXTERNAL THROAT - STIFFNESS of neck', chapter: 'EXTERNAL THROAT', remedies: ['Bry.', 'Calc.', 'Cimic.', 'Con.', 'Lach.', 'Nux-v.', 'Rhus-t.', 'Ruta.', 'Sanguin.', 'Sulph.'], grade: 1 },
      { id: 'external-throat-20-1', text: 'EXTERNAL THROAT - STIFFNESS of neck - morning', chapter: 'EXTERNAL THROAT', remedies: ['Bry.', 'Calc.', 'Lach.', 'Nux-v.', 'Rhus-t.', 'Sulph.'], grade: 1 },
      { id: 'external-throat-20-2', text: 'EXTERNAL THROAT - STIFFNESS of neck - right side', chapter: 'EXTERNAL THROAT', remedies: ['Bry.', 'Cimic.', 'Con.', 'Lach.', 'Nux-v.', 'Rhus-t.', 'Sulph.'], grade: 1 },
      { id: 'external-throat-20-3', text: 'EXTERNAL THROAT - STIFFNESS of neck - left side', chapter: 'EXTERNAL THROAT', remedies: ['Bry.', 'Cimic.', 'Lach.', 'Spong.', 'Sulph.'], grade: 1 },
      { id: 'external-throat-21', text: 'EXTERNAL THROAT - SWELLING', chapter: 'EXTERNAL THROAT', remedies: ['Apis.', 'Bary-c.', 'Bell.', 'Bry.', 'Calc.', 'Carb-v.', 'Con.', 'Hep.', 'Lach.', 'Lyc.', 'Merc.', 'Nit-ac.', 'Phos.', 'Rhus-t.', 'Sil.', 'Spong.', 'Sulph.'], grade: 1 },
      { id: 'external-throat-21-1', text: 'EXTERNAL THROAT - SWELLING - Cervical glands', chapter: 'EXTERNAL THROAT', remedies: ['Apis.', 'Bary-c.', 'Bell.', 'Bry.', 'Calc.', 'Con.', 'Hep.', 'Lyc.', 'Merc.', 'Phos.', 'Sil.', 'Sulph.'], grade: 1 },
      { id: 'external-throat-21-2', text: 'EXTERNAL THROAT - SWELLING - evening agg.', chapter: 'EXTERNAL THROAT', remedies: ['Bry.', 'Lach.', 'Merc.', 'Sulph.'], grade: 1 },
      { id: 'external-throat-21-3', text: 'EXTERNAL THROAT - SWELLING - hard', chapter: 'EXTERNAL THROAT', remedies: ['Aur.', 'Bary-c.', 'Calc.', 'Con.', 'Fluor.', 'Sil.', 'Thuj.'], grade: 1 },
      { id: 'external-throat-21-4', text: 'EXTERNAL THROAT - SWELLING - suppurating', chapter: 'EXTERNAL THROAT', remedies: ['Bell.', 'Bry.', 'Calc.', 'Carb-v.', 'Hep.', 'Lyc.', 'Merc.', 'Phos.', 'Sil.', 'Sulph.'], grade: 1 },
      { id: 'external-throat-21-5', text: 'EXTERNAL THROAT - SWELLING - Thyroid gland', chapter: 'EXTERNAL THROAT', remedies: ['Bary-c.', 'Brom.', 'Calc.', 'Con.', 'Iod.', 'Lyc.', 'Phos.', 'Spong.', 'Thyr.'], grade: 1 },
      { id: 'external-throat-21-6', text: 'EXTERNAL THROAT - SWELLING - Veins', chapter: 'EXTERNAL THROAT', remedies: ['Aur.', 'Bary-c.', 'Calc.', 'Fluor.', 'Lyc.', 'Phos.', 'Spong.'], grade: 1 },
      { id: 'external-throat-22', text: 'EXTERNAL THROAT - TENSION', chapter: 'EXTERNAL THROAT', remedies: ['Bry.', 'Cimic.', 'Con.', 'Lach.', 'Lyc.', 'Nat-m.', 'Nux-v.', 'Rhus-t.', 'Spong.', 'Sulph.'], grade: 1 },
      { id: 'external-throat-22-1', text: 'EXTERNAL THROAT - TENSION - Sides', chapter: 'EXTERNAL THROAT', remedies: ['Bry.', 'Cimic.', 'Lach.', 'Nux-v.', 'Spong.', 'Sulph.'], grade: 1 },
      { id: 'external-throat-23', text: 'EXTERNAL THROAT - TORTICOLLIS (wry neck)', chapter: 'EXTERNAL THROAT', remedies: ['Acon.', 'Bell.', 'Bry.', 'Calc.', 'Cimic.', 'Con.', 'Cupr.', 'Lach.', 'Lyc.', 'Nux-v.', 'Rhus-t.', 'Ruta.', 'Sanguin.', 'Spong.', 'Stram.', 'Sulph.'], grade: 1 },
      { id: 'external-throat-23-1', text: 'EXTERNAL THROAT - TORTICOLLIS - from cold', chapter: 'EXTERNAL THROAT', remedies: ['Acon.', 'Bry.', 'Calc.', 'Cimic.', 'Nux-v.', 'Rhus-t.', 'Sulph.'], grade: 1 },
      { id: 'external-throat-23-2', text: 'EXTERNAL THROAT - TORTICOLLIS - after fright', chapter: 'EXTERNAL THROAT', remedies: ['Acon.', 'Bell.', 'Cupr.', 'Ign.', 'Stram.'], grade: 1 },
      { id: 'external-throat-23-3', text: 'EXTERNAL THROAT - TORTICOLLIS - right side', chapter: 'EXTERNAL THROAT', remedies: ['Bry.', 'Cimic.', 'Con.', 'Lach.', 'Lyc.', 'Nux-v.', 'Rhus-t.', 'Sulph.'], grade: 1 },
      { id: 'external-throat-23-4', text: 'EXTERNAL THROAT - TORTICOLLIS - left side', chapter: 'EXTERNAL THROAT', remedies: ['Bry.', 'Calc.', 'Cimic.', 'Lach.', 'Spong.', 'Sulph.'], grade: 1 },
      { id: 'external-throat-24', text: 'EXTERNAL THROAT - TUMORS', chapter: 'EXTERNAL THROAT', remedies: ['Aur.', 'Bary-c.', 'Calc.', 'Carb-v.', 'Con.', 'Fluor.', 'Iod.', 'Lyc.', 'Phos.', 'Sil.', 'Thuj.'], grade: 1 },
      { id: 'external-throat-25', text: 'EXTERNAL THROAT - TWITCHING of muscles', chapter: 'EXTERNAL THROAT', remedies: ['Agar.', 'Arg-n.', 'Cupr.', 'Ign.', 'Nat-m.', 'Nux-v.', 'Plb.', 'Zinc.'], grade: 1 },
      { id: 'external-throat-26', text: 'EXTERNAL THROAT - ULCERS', chapter: 'EXTERNAL THROAT', remedies: ['Ars.', 'Aur.', 'Bary-c.', 'Calc.', 'Carb-an.', 'Caust.', 'Con.', 'Fluor.', 'Lyc.', 'Merc.', 'Nit-ac.', 'Phos.', 'Sil.', 'Sulph.', 'Thuj.'], grade: 1 },
      { id: 'external-throat-27', text: 'EXTERNAL THROAT - WARTS', chapter: 'EXTERNAL THROAT', remedies: ['Caust.', 'Dulc.', 'Nit-ac.', 'Staph.', 'Thuj.'], grade: 1 },
      { id: 'external-throat-27-1', text: 'EXTERNAL THROAT - WARTS - bleeding', chapter: 'EXTERNAL THROAT', remedies: ['Caust.', 'Dulc.', 'Nit-ac.', 'Staph.', 'Thuj.'], grade: 1 },
    ]
  }'''

content = replace_chapter(content, 'EXTERNAL THROAT', EXTERNAL_THROAT)

print("Step 1 done: EXTERNAL THROAT replaced")
print(f"Content size so far: {len(content)} chars")

# Save intermediate
write_file(FILE_PATH, content)
print("Saved intermediate result")
