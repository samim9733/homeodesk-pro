#!/usr/bin/env python3
"""Step 3: Replace Prostate Gland chapter"""

import re

FILE_PATH = '/home/z/my-project/homeodesk-pro/src/kentRepertoryData.ts'

def read_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        return f.read()

def write_file(path, content):
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

def find_chapter_block(content, chapter_name):
    lines = content.split('\n')
    chapter_line_idx = None
    for i, line in enumerate(lines):
        if re.search(rf"^\s+chapter:\s+'{re.escape(chapter_name)}',\s*$", line):
            chapter_line_idx = i
            break
    if chapter_line_idx is None:
        return None, None
    start_idx = chapter_line_idx
    while start_idx >= 0 and '{' not in lines[start_idx]:
        start_idx -= 1
    depth = 0
    end_idx = start_idx
    for i in range(start_idx, len(lines)):
        depth += lines[i].count('{') - lines[i].count('}')
        if depth == 0 and i > start_idx:
            end_idx = i
            break
    return start_idx, end_idx

def replace_chapter(content, chapter_name, new_data):
    start_idx, end_idx = find_chapter_block(content, chapter_name)
    if start_idx is None:
        print(f"Chapter '{chapter_name}' not found!")
        return content
    lines = content.split('\n')
    new_lines = ['  ' + line for line in new_data.strip().split('\n')]
    new_content = '\n'.join(lines[:start_idx]) + '\n' + '\n'.join(new_lines) + '\n' + '\n'.join(lines[end_idx+1:])
    print(f"Replaced chapter '{chapter_name}' (lines {start_idx+1}-{end_idx+1})")
    return new_content

content = read_file(FILE_PATH)

PROSTATE_GLAND = '''{
    id: 'prostate-gland',
    chapter: 'Prostate Gland',
    rubrics: [
      { id: 'prostate-gland-1', text: 'PROSTATE GLAND - AFFECTIONS of', chapter: 'Prostate Gland', remedies: ['Agn.', 'Alum.', 'Aur.', 'Bary-c.', 'Bry.', 'Calc.', 'Calc-s.', 'Camph.', 'Canth.', 'Carb-v.', 'Caust.', 'Chel.', 'Con.', 'Dig.', 'Ery-a.', 'Fluor.', 'Hep.', 'Iod.', 'Kali-c.', 'Lach.', 'Lyc.', 'Med.', 'Merc.', 'Nat-m.', 'Nit-ac.', 'Nux-v.', 'Puls.', 'Sars.', 'Sep.', 'Sil.', 'Spig.', 'Spong.', 'Staph.', 'Sulph.', 'Thuj.', 'Zinc.'], grade: 1 },
      { id: 'prostate-gland-1-1', text: 'PROSTATE GLAND - AFFECTIONS of - enlarged', chapter: 'Prostate Gland', remedies: ['Aur.', 'Bary-c.', 'Calc.', 'Con.', 'Ferr-p.', 'Fluor.', 'Iod.', 'Lyc.', 'Med.', 'Nat-m.', 'Nit-ac.', 'Nux-v.', 'Puls.', 'Sars.', 'Sep.', 'Sil.', 'Spig.', 'Spong.', 'Staph.', 'Sulph.', 'Thuj.'], grade: 1 },
      { id: 'prostate-gland-1-2', text: 'PROSTATE GLAND - AFFECTIONS of - induration', chapter: 'Prostate Gland', remedies: ['Aur.', 'Bary-c.', 'Calc.', 'Calc-s.', 'Carb-v.', 'Con.', 'Fluor.', 'Iod.', 'Kali-c.', 'Lyc.', 'Nat-m.', 'Nit-ac.', 'Sil.', 'Thuj.'], grade: 1 },
      { id: 'prostate-gland-1-3', text: 'PROSTATE GLAND - AFFECTIONS of - inflammation', chapter: 'Prostate Gland', remedies: ['Acon.', 'Apis.', 'Ars.', 'Bell.', 'Canth.', 'Caust.', 'Con.', 'Eup-pur.', 'Lyc.', 'Merc.', 'Nit-ac.', 'Puls.', 'Sars.', 'Sep.', 'Sulph.', 'Thuj.'], grade: 1 },
      { id: 'prostate-gland-1-4', text: 'PROSTATE GLAND - AFFECTIONS of - suppuration', chapter: 'Prostate Gland', remedies: ['Aur.', 'Bary-c.', 'Bell.', 'Calc.', 'Carb-v.', 'Con.', 'Fluor.', 'Hep.', 'Lyc.', 'Merc.', 'Nit-ac.', 'Phos.', 'Sil.', 'Sulph.', 'Thuj.'], grade: 1 },
      { id: 'prostate-gland-1-5', text: 'PROSTATE GLAND - AFFECTIONS of - after gonorrhoea', chapter: 'Prostate Gland', remedies: ['Agn.', 'Alum.', 'Aur.', 'Bary-c.', 'Calc.', 'Carb-v.', 'Caust.', 'Con.', 'Cund.', 'Fluor.', 'Kali-c.', 'Lyc.', 'Med.', 'Merc.', 'Nat-m.', 'Nit-ac.', 'Puls.', 'Sars.', 'Sep.', 'Sil.', 'Spong.', 'Staph.', 'Sulph.', 'Thuj.'], grade: 1 },
      { id: 'prostate-gland-1-6', text: 'PROSTATE GLAND - AFFECTIONS of - after suppressed gonorrhoea', chapter: 'Prostate Gland', remedies: ['Agn.', 'Alum.', 'Aur.', 'Calc.', 'Carb-v.', 'Con.', 'Fluor.', 'Kali-c.', 'Lyc.', 'Nat-m.', 'Nit-ac.', 'Puls.', 'Sars.', 'Sep.', 'Sil.', 'Staph.', 'Sulph.', 'Thuj.'], grade: 1 },
      { id: 'prostate-gland-2', text: 'PROSTATE GLAND - BALL, sensation of sitting on a', chapter: 'Prostate Gland', remedies: ['Aur.', 'Bary-c.', 'Calc.', 'Con.', 'Lyc.', 'Med.', 'Nat-m.', 'Nit-ac.', 'Nux-v.', 'Puls.', 'Sars.', 'Sep.', 'Sil.', 'Sulph.', 'Thuj.', 'Zinc.'], grade: 1 },
      { id: 'prostate-gland-3', text: 'PROSTATE GLAND - EMISSION, prostatic fluid', chapter: 'Prostate Gland', remedies: ['Agar.', 'Am-c.', 'Aur.', 'Bary-c.', 'Calc.', 'Canth.', 'Cann-i.', 'Cann-s.', 'Caust.', 'Con.', 'Dig.', 'Ery-a.', 'Fluor.', 'Hep.', 'Iod.', 'Kali-c.', 'Lyc.', 'Lyss.', 'Mag-c.', 'Med.', 'Nat-c.', 'Nit-ac.', 'Nux-v.', 'Phos.', 'Puls.', 'Sars.', 'Sep.', 'Sil.', 'Spig.', 'Spong.', 'Staph.', 'Sulph.', 'Tab.', 'Thuj.', 'Zinc.'], grade: 1 },
      { id: 'prostate-gland-3-1', text: 'PROSTATE GLAND - EMISSION - dribbling', chapter: 'Prostate Gland', remedies: ['Agn.', 'Agar.', 'Aur.', 'Calc.', 'Con.', 'Fluor.', 'Kali-bi.', 'Lyc.', 'Nat-m.', 'Nit-ac.', 'Sep.', 'Sil.', 'Sulph.', 'Thuj.'], grade: 1 },
      { id: 'prostate-gland-3-2', text: 'PROSTATE GLAND - EMISSION - during stool', chapter: 'Prostate Gland', remedies: ['Agar.', 'Aur.', 'Calc.', 'Con.', 'Lyc.', 'Nat-m.', 'Nit-ac.', 'Nux-v.', 'Sep.', 'Sulph.', 'Thuj.', 'Zinc.'], grade: 1 },
      { id: 'prostate-gland-3-3', text: 'PROSTATE GLAND - EMISSION - during urination', chapter: 'Prostate Gland', remedies: ['Agar.', 'Aur.', 'Calc.', 'Con.', 'Fluor.', 'Lyc.', 'Nat-m.', 'Nit-ac.', 'Sep.', 'Sulph.', 'Thuj.'], grade: 1 },
      { id: 'prostate-gland-3-4', text: 'PROSTATE GLAND - EMISSION - after urination', chapter: 'Prostate Gland', remedies: ['Agar.', 'Aur.', 'Calc.', 'Con.', 'Fluor.', 'Lyc.', 'Nat-m.', 'Nit-ac.', 'Sep.', 'Sil.', 'Spong.', 'Sulph.', 'Thuj.'], grade: 1 },
      { id: 'prostate-gland-3-5', text: 'PROSTATE GLAND - EMISSION - without erection', chapter: 'Prostate Gland', remedies: ['Agar.', 'Aur.', 'Calc.', 'Con.', 'Fluor.', 'Lyc.', 'Nat-m.', 'Nit-ac.', 'Sep.', 'Sil.', 'Spong.', 'Sulph.', 'Thuj.', 'Zinc.'], grade: 1 },
      { id: 'prostate-gland-3-6', text: 'PROSTATE GLAND - EMISSION - on sitting down', chapter: 'Prostate Gland', remedies: ['Agar.', 'Aur.', 'Calc.', 'Con.', 'Fluor.', 'Kali-c.', 'Lyc.', 'Nat-m.', 'Nit-ac.', 'Sep.', 'Sulph.', 'Thuj.'], grade: 1 },
      { id: 'prostate-gland-3-7', text: 'PROSTATE GLAND - EMISSION - walking agg.', chapter: 'Prostate Gland', remedies: ['Aur.', 'Bary-c.', 'Calc.', 'Con.', 'Lyc.', 'Nat-m.', 'Nit-ac.', 'Nux-v.', 'Sep.', 'Sil.', 'Sulph.', 'Thuj.'], grade: 1 },
      { id: 'prostate-gland-3-8', text: 'PROSTATE GLAND - EMISSION - on thinking of it', chapter: 'Prostate Gland', remedies: ['Agar.', 'Aur.', 'Calc.', 'Con.', 'Lyc.', 'Nat-m.', 'Nit-ac.', 'Sep.', 'Sil.', 'Sulph.', 'Thuj.'], grade: 1 },
      { id: 'prostate-gland-4', text: 'PROSTATE GLAND - HEAVINESS', chapter: 'Prostate Gland', remedies: ['Aur.', 'Bary-c.', 'Calc.', 'Con.', 'Fluor.', 'Lyc.', 'Med.', 'Nat-m.', 'Nit-ac.', 'Nux-v.', 'Puls.', 'Sars.', 'Sep.', 'Sil.', 'Spong.', 'Sulph.', 'Thuj.', 'Zinc.'], grade: 1 },
      { id: 'prostate-gland-5', text: 'PROSTATE GLAND - PAIN', chapter: 'Prostate Gland', remedies: ['Acon.', 'Agar.', 'Apis.', 'Arg-n.', 'Ars.', 'Aur.', 'Bell.', 'Bry.', 'Bary-c.', 'Calc.', 'Canth.', 'Caust.', 'Chel.', 'Con.', 'Dig.', 'Fluor.', 'Hep.', 'Ign.', 'Kali-c.', 'Lach.', 'Lyc.', 'Laur.', 'Med.', 'Merc.', 'Nat-m.', 'Nit-ac.', 'Nux-v.', 'Op.', 'Phos.', 'Puls.', 'Sars.', 'Sep.', 'Sil.', 'Spig.', 'Spong.', 'Staph.', 'Sulph.', 'Thuj.', 'Zinc.'], grade: 1 },
      { id: 'prostate-gland-5-1', text: 'PROSTATE GLAND - PAIN - aching', chapter: 'Prostate Gland', remedies: ['Agar.', 'Aur.', 'Bary-c.', 'Calc.', 'Con.', 'Fluor.', 'Kali-c.', 'Lyc.', 'Med.', 'Nat-m.', 'Nit-ac.', 'Nux-v.', 'Puls.', 'Sars.', 'Sep.', 'Sil.', 'Spong.', 'Sulph.', 'Thuj.'], grade: 1 },
      { id: 'prostate-gland-5-2', text: 'PROSTATE GLAND - PAIN - burning', chapter: 'Prostate Gland', remedies: ['Agn.', 'Apis.', 'Ars.', 'Canth.', 'Caust.', 'Con.', 'Eup-pur.', 'Lyc.', 'Merc.', 'Nit-ac.', 'Sars.', 'Sep.', 'Sulph.', 'Thuj.'], grade: 1 },
      { id: 'prostate-gland-5-3', text: 'PROSTATE GLAND - PAIN - cutting', chapter: 'Prostate Gland', remedies: ['Agar.', 'Apis.', 'Canth.', 'Con.', 'Lyc.', 'Nat-m.', 'Nit-ac.', 'Nux-v.', 'Sep.', 'Spong.', 'Sulph.', 'Thuj.'], grade: 1 },
      { id: 'prostate-gland-5-4', text: 'PROSTATE GLAND - PAIN - drawing', chapter: 'Prostate Gland', remedies: ['Agar.', 'Aur.', 'Bary-c.', 'Bry.', 'Calc.', 'Con.', 'Fluor.', 'Kali-c.', 'Lyc.', 'Nat-m.', 'Nit-ac.', 'Nux-v.', 'Puls.', 'Sep.', 'Sil.', 'Sulph.', 'Thuj.'], grade: 1 },
      { id: 'prostate-gland-5-5', text: 'PROSTATE GLAND - PAIN - pressing', chapter: 'Prostate Gland', remedies: ['Agar.', 'Aur.', 'Bary-c.', 'Calc.', 'Con.', 'Fluor.', 'Kali-c.', 'Lyc.', 'Nat-m.', 'Nit-ac.', 'Nux-v.', 'Puls.', 'Sep.', 'Sil.', 'Spong.', 'Sulph.', 'Thuj.'], grade: 1 },
      { id: 'prostate-gland-5-6', text: 'PROSTATE GLAND - PAIN - shooting', chapter: 'Prostate Gland', remedies: ['Agar.', 'Acon.', 'Arg-n.', 'Aur.', 'Bary-c.', 'Calc.', 'Con.', 'Kali-c.', 'Lyc.', 'Nat-m.', 'Nit-ac.', 'Sep.', 'Sil.', 'Staph.', 'Sulph.', 'Thuj.'], grade: 1 },
      { id: 'prostate-gland-5-7', text: 'PROSTATE GLAND - PAIN - stitching', chapter: 'Prostate Gland', remedies: ['Agar.', 'Acon.', 'Arg-n.', 'Aur.', 'Bary-c.', 'Calc.', 'Con.', 'Kali-c.', 'Lyc.', 'Nat-m.', 'Nit-ac.', 'Sep.', 'Sil.', 'Staph.', 'Sulph.', 'Thuj.'], grade: 1 },
      { id: 'prostate-gland-5-8', text: 'PROSTATE GLAND - PAIN - soreness', chapter: 'Prostate Gland', remedies: ['Agar.', 'Apis.', 'Aur.', 'Bary-c.', 'Calc.', 'Con.', 'Fluor.', 'Lyc.', 'Nat-m.', 'Nit-ac.', 'Nux-v.', 'Puls.', 'Sars.', 'Sep.', 'Sil.', 'Spong.', 'Sulph.', 'Thuj.'], grade: 1 },
      { id: 'prostate-gland-5-9', text: 'PROSTATE GLAND - PAIN - tearing', chapter: 'Prostate Gland', remedies: ['Agar.', 'Aur.', 'Bary-c.', 'Bry.', 'Calc.', 'Con.', 'Fluor.', 'Kali-c.', 'Lyc.', 'Nat-m.', 'Nit-ac.', 'Puls.', 'Sep.', 'Sil.', 'Sulph.', 'Thuj.'], grade: 1 },
      { id: 'prostate-gland-5-10', text: 'PROSTATE GLAND - PAIN - throbbing', chapter: 'Prostate Gland', remedies: ['Agar.', 'Apis.', 'Aur.', 'Bary-c.', 'Calc.', 'Con.', 'Lyc.', 'Nat-m.', 'Nit-ac.', 'Sep.', 'Sil.', 'Spong.', 'Sulph.', 'Thuj.'], grade: 1 },
      { id: 'prostate-gland-5-11', text: 'PROSTATE GLAND - PAIN - after urination', chapter: 'Prostate Gland', remedies: ['Agar.', 'Apis.', 'Aur.', 'Bary-c.', 'Canth.', 'Con.', 'Lyc.', 'Nit-ac.', 'Sars.', 'Sep.', 'Sil.', 'Spong.', 'Sulph.', 'Thuj.'], grade: 1 },
      { id: 'prostate-gland-5-12', text: 'PROSTATE GLAND - PAIN - during urination', chapter: 'Prostate Gland', remedies: ['Agar.', 'Apis.', 'Aur.', 'Bary-c.', 'Canth.', 'Con.', 'Lyc.', 'Nit-ac.', 'Sars.', 'Sep.', 'Sil.', 'Spong.', 'Sulph.', 'Thuj.'], grade: 1 },
      { id: 'prostate-gland-5-13', text: 'PROSTATE GLAND - PAIN - walking agg.', chapter: 'Prostate Gland', remedies: ['Agar.', 'Aur.', 'Bary-c.', 'Calc.', 'Con.', 'Fluor.', 'Lyc.', 'Nat-m.', 'Nit-ac.', 'Puls.', 'Sep.', 'Sulph.', 'Thuj.', 'Zinc.'], grade: 1 },
      { id: 'prostate-gland-5-14', text: 'PROSTATE GLAND - PAIN - sitting amel.', chapter: 'Prostate Gland', remedies: ['Agar.', 'Aur.', 'Bary-c.', 'Calc.', 'Con.', 'Lyc.', 'Med.', 'Nat-m.', 'Nit-ac.', 'Puls.', 'Sep.', 'Sulph.', 'Thuj.'], grade: 1 },
      { id: 'prostate-gland-6', text: 'PROSTATE GLAND - PULSATION', chapter: 'Prostate Gland', remedies: ['Acon.', 'Agar.', 'Apis.', 'Arg-n.', 'Aur.', 'Bary-c.', 'Calc.', 'Con.', 'Iod.', 'Lyc.', 'Nat-m.', 'Nit-ac.', 'Phos.', 'Sars.', 'Sep.', 'Sil.', 'Spong.', 'Sulph.', 'Thuj.'], grade: 1 },
      { id: 'prostate-gland-7', text: 'PROSTATE GLAND - PRESSURE', chapter: 'Prostate Gland', remedies: ['Agar.', 'Aur.', 'Bary-c.', 'Calc.', 'Con.', 'Fluor.', 'Lyc.', 'Med.', 'Nat-m.', 'Nit-ac.', 'Nux-v.', 'Puls.', 'Sars.', 'Sep.', 'Sil.', 'Spong.', 'Sulph.', 'Thuj.', 'Zinc.'], grade: 1 },
      { id: 'prostate-gland-8', text: 'PROSTATE GLAND - SWELLING', chapter: 'Prostate Gland', remedies: ['Aur.', 'Bary-c.', 'Calc.', 'Calc-s.', 'Con.', 'Fluor.', 'Iod.', 'Lyc.', 'Med.', 'Nat-m.', 'Nit-ac.', 'Puls.', 'Sars.', 'Sep.', 'Sil.', 'Spong.', 'Staph.', 'Sulph.', 'Thuj.'], grade: 1 },
      { id: 'prostate-gland-8-1', text: 'PROSTATE GLAND - SWELLING - indurated', chapter: 'Prostate Gland', remedies: ['Aur.', 'Bary-c.', 'Calc.', 'Calc-s.', 'Con.', 'Fluor.', 'Iod.', 'Kali-c.', 'Lyc.', 'Nat-m.', 'Nit-ac.', 'Sil.', 'Thuj.'], grade: 1 },
      { id: 'prostate-gland-9', text: 'PROSTATE GLAND - TENESMUS', chapter: 'Prostate Gland', remedies: ['Agar.', 'Apis.', 'Arg-n.', 'Aur.', 'Bary-c.', 'Canth.', 'Con.', 'Lyc.', 'Nat-m.', 'Nit-ac.', 'Nux-v.', 'Sars.', 'Sep.', 'Sil.', 'Spong.', 'Sulph.', 'Thuj.', 'Zinc.'], grade: 1 },
      { id: 'prostate-gland-10', text: 'PROSTATE GLAND - TICKLING', chapter: 'Prostate Gland', remedies: ['Agar.', 'Aur.', 'Bary-c.', 'Calc.', 'Con.', 'Lyc.', 'Nat-m.', 'Nit-ac.', 'Sars.', 'Sep.', 'Sil.', 'Spong.', 'Sulph.', 'Thuj.'], grade: 1 },
      { id: 'prostate-gland-11', text: 'PROSTATE GLAND - WEAKNESS', chapter: 'Prostate Gland', remedies: ['Agn.', 'Agar.', 'Alum.', 'Aur.', 'Bary-c.', 'Calc.', 'Con.', 'Fluor.', 'Iod.', 'Kali-c.', 'Lyc.', 'Med.', 'Nat-m.', 'Nit-ac.', 'Nux-v.', 'Phos.', 'Puls.', 'Sars.', 'Sep.', 'Sil.', 'Spig.', 'Spong.', 'Sulph.', 'Thuj.', 'Zinc.'], grade: 1 },
    ]
  }'''

content = replace_chapter(content, 'Prostate Gland', PROSTATE_GLAND)
write_file(FILE_PATH, content)
print("Step 3 done: Prostate Gland replaced")
