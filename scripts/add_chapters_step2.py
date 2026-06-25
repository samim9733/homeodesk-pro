#!/usr/bin/env python3
"""Step 2: Replace Urinary Organs chapter"""

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

URINARY_ORGANS = '''{
    id: 'urinary-organs',
    chapter: 'Urinary Organs',
    rubrics: [
      { id: 'urinary-organs-1', text: 'URINARY ORGANS - BLADDER', chapter: 'Urinary Organs', remedies: ['Acon.', 'Apis.', 'Arg-n.', 'Bell.', 'Bry.', 'Caust.', 'Con.', 'Eup-pur.', 'Ferr.', 'Lyc.', 'Med.', 'Merc.', 'Nat-c.', 'Nux-v.', 'Phos.', 'Puls.', 'Rhus-t.', 'Sars.', 'Sep.', 'Sulph.', 'Thuja.'], grade: 1 },
      { id: 'urinary-organs-1-1', text: 'URINARY ORGANS - BLADDER - atony', chapter: 'Urinary Organs', remedies: ['Alum.', 'Calc.', 'Caust.', 'Con.', 'Ferr.', 'Lyc.', 'Mur-ac.', 'Nat-m.', 'Nux-v.', 'Phos.', 'Rhus-t.', 'Sars.', 'Sep.', 'Sulph.'], grade: 1 },
      { id: 'urinary-organs-1-2', text: 'URINARY ORGANS - BLADDER - Ball, sensation of', chapter: 'Urinary Organs', remedies: ['Arg-n.', 'Lyc.', 'Med.', 'Mur-ac.', 'Nat-m.', 'Nux-v.', 'Sars.', 'Sep.', 'Spong.', 'Sulph.'], grade: 1 },
      { id: 'urinary-organs-1-3', text: 'URINARY ORGANS - BLADDER - CATARRH of', chapter: 'Urinary Organs', remedies: ['Ars.', 'Canth.', 'Lyc.', 'Merc.', 'Merc-c.', 'Nat-m.', 'Nit-ac.', 'Phos.', 'Sars.', 'Sep.', 'Sulph.', 'Thuja.'], grade: 1 },
      { id: 'urinary-organs-1-4', text: 'URINARY ORGANS - BLADDER - COLD sensation in', chapter: 'Urinary Organs', remedies: ['Acon.', 'Apis.', 'Calc.', 'Camph.', 'Carb-v.', 'Caust.', 'Lyc.', 'Mur-ac.', 'Phos.', 'Sep.', 'Sulph.'], grade: 1 },
      { id: 'urinary-organs-1-5', text: 'URINARY ORGANS - BLADDER - CONSTRICTION', chapter: 'Urinary Organs', remedies: ['Alum.', 'Arg-n.', 'Bary-c.', 'Caust.', 'Lyc.', 'Nux-v.', 'Phos.', 'Sars.', 'Sep.', 'Sulph.', 'Thuja.'], grade: 1 },
      { id: 'urinary-organs-1-6', text: 'URINARY ORGANS - BLADDER - DISTENSION', chapter: 'Urinary Organs', remedies: ['Apis.', 'Arg-n.', 'Bell.', 'Bry.', 'Lyc.', 'Nat-m.', 'Nit-ac.', 'Nux-v.', 'Phos.', 'Puls.', 'Sars.', 'Sep.', 'Sulph.'], grade: 1 },
      { id: 'urinary-organs-1-7', text: 'URINARY ORGANS - BLADDER - ENLARGED', chapter: 'Urinary Organs', remedies: ['Apis.', 'Ars.', 'Bary-c.', 'Calc.', 'Con.', 'Lyc.', 'Med.', 'Nat-m.', 'Phos.', 'Sars.', 'Sep.', 'Sil.', 'Sulph.'], grade: 1 },
      { id: 'urinary-organs-1-8', text: 'URINARY ORGANS - BLADDER - FULLNESS, sensation of', chapter: 'Urinary Organs', remedies: ['Ars.', 'Bry.', 'Caust.', 'Lyc.', 'Mur-ac.', 'Nat-m.', 'Nux-v.', 'Phos.', 'Sars.', 'Sep.', 'Sulph.'], grade: 1 },
      { id: 'urinary-organs-1-9', text: 'URINARY ORGANS - BLADDER - HEAT in', chapter: 'Urinary Organs', remedies: ['Apis.', 'Ars.', 'Canth.', 'Nit-ac.', 'Sulph.', 'Thuja.'], grade: 1 },
      { id: 'urinary-organs-1-10', text: 'URINARY ORGANS - BLADDER - INFLAMMATION of', chapter: 'Urinary Organs', remedies: ['Apis.', 'Arg-n.', 'Ars.', 'Bell.', 'Canth.', 'Con.', 'Eup-pur.', 'Lyc.', 'Merc.', 'Nit-ac.', 'Sars.', 'Sep.', 'Sulph.', 'Tarent.'], grade: 1 },
      { id: 'urinary-organs-1-11', text: 'URINARY ORGANS - BLADDER - IRRITABILITY of', chapter: 'Urinary Organs', remedies: ['Acon.', 'Apis.', 'Bell.', 'Canth.', 'Lyc.', 'Nux-v.', 'Phos.', 'Sars.', 'Sulph.', 'Thuja.'], grade: 1 },
      { id: 'urinary-organs-1-12', text: 'URINARY ORGANS - BLADDER - NUMBNESS', chapter: 'Urinary Organs', remedies: ['Alum.', 'Ars.', 'Caust.', 'Lyc.', 'Mur-ac.', 'Phos.', 'Rhus-t.', 'Sars.', 'Sep.', 'Sulph.'], grade: 1 },
      { id: 'urinary-organs-1-13', text: 'URINARY ORGANS - BLADDER - PAIN', chapter: 'Urinary Organs', remedies: ['Apis.', 'Ars.', 'Bell.', 'Berb.', 'Canth.', 'Caust.', 'Con.', 'Eup-pur.', 'Lyc.', 'Merc.', 'Nat-m.', 'Nit-ac.', 'Nux-v.', 'Phos.', 'Sars.', 'Sep.', 'Sulph.', 'Thuja.'], grade: 1 },
      { id: 'urinary-organs-1-14', text: 'URINARY ORGANS - BLADDER - PAIN - Burning', chapter: 'Urinary Organs', remedies: ['Apis.', 'Ars.', 'Berb.', 'Canth.', 'Caust.', 'Con.', 'Eup-pur.', 'Lyc.', 'Med.', 'Merc.', 'Nat-m.', 'Nit-ac.', 'Phos.', 'Sars.', 'Sep.', 'Sulph.', 'Thuja.'], grade: 1 },
      { id: 'urinary-organs-1-15', text: 'URINARY ORGANS - BLADDER - PAIN - Pressing', chapter: 'Urinary Organs', remedies: ['Ars.', 'Bell.', 'Bry.', 'Con.', 'Lyc.', 'Nux-v.', 'Phos.', 'Puls.', 'Sars.', 'Sep.', 'Sulph.'], grade: 1 },
      { id: 'urinary-organs-1-16', text: 'URINARY ORGANS - BLADDER - PAIN - Stitching', chapter: 'Urinary Organs', remedies: ['Arg-n.', 'Ars.', 'Berb.', 'Canth.', 'Con.', 'Lyc.', 'Nat-m.', 'Nit-ac.', 'Phos.', 'Sars.', 'Sep.', 'Sulph.', 'Thuja.'], grade: 1 },
      { id: 'urinary-organs-1-17', text: 'URINARY ORGANS - BLADDER - PAIN - after urination', chapter: 'Urinary Organs', remedies: ['Ars.', 'Berb.', 'Canth.', 'Con.', 'Lyc.', 'Sars.', 'Sep.', 'Sulph.', 'Thuja.'], grade: 1 },
      { id: 'urinary-organs-1-18', text: 'URINARY ORGANS - BLADDER - PARALYSIS', chapter: 'Urinary Organs', remedies: ['Alum.', 'Ars.', 'Caust.', 'Con.', 'Ferr.', 'Lyc.', 'Mur-ac.', 'Nat-m.', 'Nux-v.', 'Phos.', 'Rhus-t.', 'Sars.', 'Sep.', 'Sulph.'], grade: 1 },
      { id: 'urinary-organs-1-19', text: 'URINARY ORGANS - BLADDER - PRESSURE', chapter: 'Urinary Organs', remedies: ['Acon.', 'Arg-n.', 'Bry.', 'Caust.', 'Lyc.', 'Mur-ac.', 'Nat-m.', 'Nux-v.', 'Phos.', 'Puls.', 'Sars.', 'Sep.', 'Sulph.'], grade: 1 },
      { id: 'urinary-organs-1-20', text: 'URINARY ORGANS - BLADDER - RETENTION of urine', chapter: 'Urinary Organs', remedies: ['Acon.', 'Apis.', 'Ars.', 'Bell.', 'Berb.', 'Camph.', 'Canth.', 'Caust.', 'Con.', 'Cupr.', 'Dig.', 'Eup-per.', 'Ferr.', 'Helon.', 'Lach.', 'Lyc.', 'Med.', 'Merc.', 'Nat-m.', 'Nit-ac.', 'Nux-v.', 'Op.', 'Phos.', 'Puls.', 'Rhus-t.', 'Sars.', 'Sep.', 'Sil.', 'Spong.', 'Stram.', 'Sulph.', 'Thuja.', 'Tarent.'], grade: 1 },
      { id: 'urinary-organs-1-21', text: 'URINARY ORGANS - BLADDER - RETENTION - after operation', chapter: 'Urinary Organs', remedies: ['Acon.', 'Arn.', 'Bell.', 'Caust.', 'Con.', 'Lach.', 'Nux-v.', 'Op.', 'Phos.', 'Rhus-t.', 'Staph.', 'Sulph.'], grade: 1 },
      { id: 'urinary-organs-1-22', text: 'URINARY ORGANS - BLADDER - RETENTION - with fever', chapter: 'Urinary Organs', remedies: ['Acon.', 'Apis.', 'Bell.', 'Bry.', 'Canth.', 'Nux-v.', 'Rhus-t.', 'Sulph.'], grade: 1 },
      { id: 'urinary-organs-1-23', text: 'URINARY ORGANS - BLADDER - STONE in', chapter: 'Urinary Organs', remedies: ['Berb.', 'Calc.', 'Canth.', 'Hep.', 'Lyc.', 'Nat-m.', 'Nit-ac.', 'Ocim.', 'Phos.', 'Sars.', 'Sep.', 'Sil.', 'Sulph.'], grade: 1 },
      { id: 'urinary-organs-1-24', text: 'URINARY ORGANS - BLADDER - TENESMUS', chapter: 'Urinary Organs', remedies: ['Ars.', 'Canth.', 'Con.', 'Eup-pur.', 'Lyc.', 'Med.', 'Merc.', 'Nat-m.', 'Nux-v.', 'Phos.', 'Sars.', 'Sep.', 'Sulph.', 'Thuja.'], grade: 1 },
      { id: 'urinary-organs-1-25', text: 'URINARY ORGANS - BLADDER - TUMOR', chapter: 'Urinary Organs', remedies: ['Aur.', 'Calc.', 'Con.', 'Lyc.', 'Nit-ac.', 'Phos.', 'Sars.', 'Sep.', 'Sil.', 'Thuja.'], grade: 1 },
      { id: 'urinary-organs-1-26', text: 'URINARY ORGANS - BLADDER - WEAKNESS', chapter: 'Urinary Organs', remedies: ['Alum.', 'Ars.', 'Calc.', 'Caust.', 'Con.', 'Ferr.', 'Lyc.', 'Mur-ac.', 'Nat-m.', 'Nux-v.', 'Phos.', 'Rhus-t.', 'Sars.', 'Sep.', 'Sulph.'], grade: 1 },
      { id: 'urinary-organs-2', text: 'URINARY ORGANS - URINATION - FREQUENT', chapter: 'Urinary Organs', remedies: ['Acon.', 'Apis.', 'Arg-n.', 'Ars.', 'Bell.', 'Bry.', 'Calc.', 'Canth.', 'Carb-v.', 'Caust.', 'Con.', 'Eup-pur.', 'Iod.', 'Lyc.', 'Med.', 'Merc.', 'Nat-c.', 'Nat-m.', 'Nit-ac.', 'Nux-v.', 'Phos.', 'Puls.', 'Rhus-t.', 'Sars.', 'Sep.', 'Sulph.', 'Thuja.', 'Zinc.'], grade: 1 },
      { id: 'urinary-organs-2-1', text: 'URINARY ORGANS - URINATION - frequent - day', chapter: 'Urinary Organs', remedies: ['Arg-n.', 'Bry.', 'Calc.', 'Con.', 'Lyc.', 'Nat-m.', 'Phos.', 'Puls.', 'Sars.', 'Sep.', 'Sulph.'], grade: 1 },
      { id: 'urinary-organs-2-2', text: 'URINARY ORGANS - URINATION - frequent - night', chapter: 'Urinary Organs', remedies: ['Acon.', 'Apis.', 'Ars.', 'Bry.', 'Calc.', 'Con.', 'Lyc.', 'Med.', 'Merc.', 'Nat-m.', 'Nit-ac.', 'Nux-v.', 'Phos.', 'Puls.', 'Rhus-t.', 'Sars.', 'Sep.', 'Sulph.'], grade: 1 },
      { id: 'urinary-organs-2-3', text: 'URINARY ORGANS - URINATION - frequent - in children', chapter: 'Urinary Organs', remedies: ['Acon.', 'Apis.', 'Bell.', 'Calc.', 'Lyc.', 'Puls.', 'Sulph.'], grade: 1 },
      { id: 'urinary-organs-3', text: 'URINARY ORGANS - URINATION - DIFFICULT', chapter: 'Urinary Organs', remedies: ['Acon.', 'Alum.', 'Apis.', 'Arg-n.', 'Ars.', 'Bell.', 'Berb.', 'Bry.', 'Calc.', 'Caust.', 'Con.', 'Dig.', 'Eup-per.', 'Ferr.', 'Lach.', 'Lyc.', 'Med.', 'Merc.', 'Nat-m.', 'Nit-ac.', 'Nux-v.', 'Op.', 'Phos.', 'Puls.', 'Rhus-t.', 'Sars.', 'Sep.', 'Sil.', 'Spong.', 'Sulph.', 'Thuja.'], grade: 1 },
      { id: 'urinary-organs-3-1', text: 'URINARY ORGANS - URINATION - difficult - slow stream', chapter: 'Urinary Organs', remedies: ['Alum.', 'Bary-c.', 'Calc.', 'Caust.', 'Con.', 'Lyc.', 'Mur-ac.', 'Nat-m.', 'Nux-v.', 'Phos.', 'Sars.', 'Sep.', 'Sulph.', 'Thuja.'], grade: 1 },
      { id: 'urinary-organs-3-2', text: 'URINARY ORGANS - URINATION - difficult - must strain', chapter: 'Urinary Organs', remedies: ['Alum.', 'Bary-c.', 'Calc.', 'Caust.', 'Con.', 'Lyc.', 'Mur-ac.', 'Nat-m.', 'Nux-v.', 'Phos.', 'Sars.', 'Sep.', 'Sulph.', 'Thuja.'], grade: 1 },
      { id: 'urinary-organs-3-3', text: 'URINARY ORGANS - URINATION - difficult - intermittent', chapter: 'Urinary Organs', remedies: ['Alum.', 'Bary-c.', 'Calc.', 'Caust.', 'Con.', 'Lyc.', 'Mur-ac.', 'Nat-m.', 'Nux-v.', 'Phos.', 'Sars.', 'Sep.', 'Sulph.', 'Thuja.'], grade: 1 },
      { id: 'urinary-organs-4', text: 'URINARY ORGANS - URINATION - INFREQUENT', chapter: 'Urinary Organs', remedies: ['Acon.', 'Apis.', 'Bry.', 'Calc.', 'Camph.', 'Canth.', 'Carb-v.', 'Caust.', 'Con.', 'Lach.', 'Lyc.', 'Mur-ac.', 'Nat-m.', 'Nux-v.', 'Op.', 'Phos.', 'Puls.', 'Sars.', 'Sep.', 'Sil.', 'Spong.', 'Sulph.', 'Thuja.'], grade: 1 },
      { id: 'urinary-organs-5', text: 'URINARY ORGANS - URINATION - INCONTINENCE', chapter: 'Urinary Organs', remedies: ['Acon.', 'Alum.', 'Apis.', 'Ars.', 'Bell.', 'Bov.', 'Bry.', 'Calc.', 'Caust.', 'Con.', 'Eup-per.', 'Ferr.', 'Gels.', 'Lyc.', 'Med.', 'Merc.', 'Nat-m.', 'Nit-ac.', 'Nux-v.', 'Phos.', 'Puls.', 'Rhus-t.', 'Sars.', 'Sep.', 'Sil.', 'Sulph.', 'Zinc.'], grade: 1 },
      { id: 'urinary-organs-5-1', text: 'URINARY ORGANS - URINATION - incontinence - when coughing', chapter: 'Urinary Organs', remedies: ['Alum.', 'Bry.', 'Caust.', 'Con.', 'Ferr.', 'Nat-m.', 'Nux-v.', 'Puls.', 'Rhus-t.', 'Sep.', 'Sulph.', 'Zinc.'], grade: 1 },
      { id: 'urinary-organs-5-2', text: 'URINARY ORGANS - URINATION - incontinence - when sneezing', chapter: 'Urinary Organs', remedies: ['Bry.', 'Caust.', 'Con.', 'Nat-m.', 'Nux-v.', 'Puls.', 'Rhus-t.', 'Sep.', 'Sulph.', 'Zinc.'], grade: 1 },
      { id: 'urinary-organs-5-3', text: 'URINARY ORGANS - URINATION - incontinence - when walking', chapter: 'Urinary Organs', remedies: ['Alum.', 'Caust.', 'Con.', 'Ferr.', 'Nat-m.', 'Puls.', 'Sep.', 'Sulph.'], grade: 1 },
      { id: 'urinary-organs-5-4', text: 'URINARY ORGANS - URINATION - incontinence - during sleep', chapter: 'Urinary Organs', remedies: ['Acon.', 'Alum.', 'Apis.', 'Ars.', 'Bell.', 'Bov.', 'Bry.', 'Calc.', 'Caust.', 'Con.', 'Lyc.', 'Med.', 'Nat-m.', 'Nux-v.', 'Phos.', 'Puls.', 'Rhus-t.', 'Sars.', 'Sep.', 'Sulph.', 'Zinc.'], grade: 1 },
      { id: 'urinary-organs-5-5', text: 'URINARY ORGANS - URINATION - incontinence - first sleep', chapter: 'Urinary Organs', remedies: ['Acon.', 'Ars.', 'Bell.', 'Bov.', 'Calc.', 'Lyc.', 'Med.', 'Nat-m.', 'Nux-v.', 'Phos.', 'Rhus-t.', 'Sars.', 'Sep.', 'Sulph.', 'Zinc.'], grade: 1 },
      { id: 'urinary-organs-5-6', text: 'URINARY ORGANS - URINATION - incontinence - old age', chapter: 'Urinary Organs', remedies: ['Alum.', 'Bary-c.', 'Calc.', 'Caust.', 'Con.', 'Ferr.', 'Lyc.', 'Nat-m.', 'Nux-v.', 'Phos.', 'Sars.', 'Sep.', 'Sulph.', 'Zinc.'], grade: 1 },
      { id: 'urinary-organs-6', text: 'URINARY ORGANS - URINATION - URGENCY', chapter: 'Urinary Organs', remedies: ['Acon.', 'Apis.', 'Arg-n.', 'Ars.', 'Bell.', 'Bry.', 'Calc.', 'Canth.', 'Caust.', 'Con.', 'Eup-pur.', 'Lyc.', 'Merc.', 'Nat-m.', 'Nit-ac.', 'Nux-v.', 'Phos.', 'Puls.', 'Sars.', 'Sep.', 'Sulph.', 'Thuja.'], grade: 1 },
      { id: 'urinary-organs-6-1', text: 'URINARY ORGANS - URINATION - urgency - sudden', chapter: 'Urinary Organs', remedies: ['Acon.', 'Apis.', 'Ars.', 'Bry.', 'Calc.', 'Canth.', 'Caust.', 'Con.', 'Lyc.', 'Nat-m.', 'Nux-v.', 'Phos.', 'Puls.', 'Sars.', 'Sulph.', 'Thuja.'], grade: 1 },
      { id: 'urinary-organs-7', text: 'URINARY ORGANS - URINATION - SUPPRESSED', chapter: 'Urinary Organs', remedies: ['Acon.', 'Apis.', 'Ars.', 'Bell.', 'Bry.', 'Camph.', 'Canth.', 'Caust.', 'Con.', 'Cupr.', 'Dig.', 'Eup-per.', 'Ferr.', 'Lach.', 'Lyc.', 'Med.', 'Merc.', 'Nat-m.', 'Nit-ac.', 'Nux-v.', 'Op.', 'Phos.', 'Puls.', 'Rhus-t.', 'Sars.', 'Sep.', 'Sil.', 'Spong.', 'Sulph.', 'Thuja.'], grade: 1 },
      { id: 'urinary-organs-7-1', text: 'URINARY ORGANS - URINATION - suppressed - after surgery', chapter: 'Urinary Organs', remedies: ['Acon.', 'Arn.', 'Bell.', 'Caust.', 'Con.', 'Lach.', 'Nux-v.', 'Op.', 'Phos.', 'Rhus-t.', 'Staph.', 'Sulph.'], grade: 1 },
      { id: 'urinary-organs-7-2', text: 'URINARY ORGANS - URINATION - suppressed - from cold', chapter: 'Urinary Organs', remedies: ['Acon.', 'Bry.', 'Camph.', 'Caust.', 'Con.', 'Dulc.', 'Lyc.', 'Nux-v.', 'Puls.', 'Rhus-t.', 'Sulph.'], grade: 1 },
      { id: 'urinary-organs-8', text: 'URINARY ORGANS - URINATION - BLOODY', chapter: 'Urinary Organs', remedies: ['Acon.', 'Apis.', 'Ars.', 'Canth.', 'Con.', 'Ham.', 'Lyc.', 'Merc.', 'Nit-ac.', 'Phos.', 'Sec.', 'Sep.', 'Tereb.', 'Thuja.'], grade: 1 },
      { id: 'urinary-organs-8-1', text: 'URINARY ORGANS - URINATION - bloody - clots', chapter: 'Urinary Organs', remedies: ['Apis.', 'Ars.', 'Canth.', 'Con.', 'Ham.', 'Lyc.', 'Merc.', 'Nit-ac.', 'Phos.', 'Sec.', 'Sep.', 'Thuja.'], grade: 1 },
      { id: 'urinary-organs-9', text: 'URINARY ORGANS - URINATION - CLOUDY', chapter: 'Urinary Organs', remedies: ['Apis.', 'Ars.', 'Bry.', 'Calc.', 'Canth.', 'Con.', 'Lyc.', 'Med.', 'Nat-m.', 'Nit-ac.', 'Phos.', 'Puls.', 'Sars.', 'Sep.', 'Sulph.'], grade: 1 },
      { id: 'urinary-organs-10', text: 'URINARY ORGANS - URINATION - DARK', chapter: 'Urinary Organs', remedies: ['Ars.', 'Bry.', 'Calc.', 'Carb-v.', 'Lyc.', 'Med.', 'Nat-m.', 'Nux-v.', 'Phos.', 'Puls.', 'Sep.', 'Sulph.'], grade: 1 },
      { id: 'urinary-organs-11', text: 'URINARY ORGANS - URINATION - OFFENSIVE', chapter: 'Urinary Organs', remedies: ['Ars.', 'Bry.', 'Calc.', 'Canth.', 'Con.', 'Ind.', 'Lyc.', 'Med.', 'Merc.', 'Nit-ac.', 'Phos.', 'Puls.', 'Sars.', 'Sep.', 'Sulph.', 'Thuja.'], grade: 1 },
      { id: 'urinary-organs-12', text: 'URINARY ORGANS - URINATION - PALE', chapter: 'Urinary Organs', remedies: ['Acon.', 'Apis.', 'Ars.', 'Bry.', 'Calc.', 'Puls.', 'Sep.', 'Sulph.'], grade: 1 },
      { id: 'urinary-organs-13', text: 'URINARY ORGANS - URINATION - SCANTY', chapter: 'Urinary Organs', remedies: ['Acon.', 'Apis.', 'Ars.', 'Bell.', 'Bry.', 'Calc.', 'Canth.', 'Caust.', 'Con.', 'Lyc.', 'Med.', 'Merc.', 'Nat-m.', 'Nit-ac.', 'Nux-v.', 'Phos.', 'Puls.', 'Rhus-t.', 'Sars.', 'Sep.', 'Sulph.', 'Thuja.'], grade: 1 },
      { id: 'urinary-organs-14', text: 'URINARY ORGANS - URINATION - COPIOUS', chapter: 'Urinary Organs', remedies: ['Acon.', 'Apis.', 'Ars.', 'Bry.', 'Calc.', 'Con.', 'Iod.', 'Lyc.', 'Med.', 'Nat-m.', 'Nit-ac.', 'Nux-v.', 'Phos.', 'Puls.', 'Sars.', 'Sep.', 'Sulph.'], grade: 1 },
      { id: 'urinary-organs-15', text: 'URINARY ORGANS - URINATION - DROPSICAL', chapter: 'Urinary Organs', remedies: ['Apis.', 'Ars.', 'Bry.', 'Calc.', 'Carb-v.', 'Hell.', 'Lyc.', 'Phos.', 'Sulph.'], grade: 1 },
      { id: 'urinary-organs-16', text: 'URINARY ORGANS - URINATION - NIGHT', chapter: 'Urinary Organs', remedies: ['Acon.', 'Apis.', 'Ars.', 'Bry.', 'Calc.', 'Con.', 'Lyc.', 'Med.', 'Merc.', 'Nat-m.', 'Nit-ac.', 'Nux-v.', 'Phos.', 'Puls.', 'Rhus-t.', 'Sars.', 'Sep.', 'Sulph.', 'Zinc.'], grade: 1 },
      { id: 'urinary-organs-17', text: 'URINARY ORGANS - URINATION - GRAVEL passes', chapter: 'Urinary Organs', remedies: ['Berb.', 'Calc.', 'Canth.', 'Hep.', 'Lyc.', 'Nat-m.', 'Nit-ac.', 'Ocim.', 'Phos.', 'Sars.', 'Sep.', 'Sil.', 'Sulph.'], grade: 1 },
      { id: 'urinary-organs-18', text: 'URINARY ORGANS - URINATION - SPASMODIC', chapter: 'Urinary Organs', remedies: ['Acon.', 'Apis.', 'Ars.', 'Bell.', 'Canth.', 'Caust.', 'Con.', 'Cupr.', 'Lyc.', 'Mag-c.', 'Nux-v.', 'Phos.', 'Puls.', 'Sars.', 'Sulph.'], grade: 1 },
      { id: 'urinary-organs-19', text: 'URINARY ORGANS - URINATION - UNCONSCIOUS', chapter: 'Urinary Organs', remedies: ['Alum.', 'Calc.', 'Caust.', 'Con.', 'Ferr.', 'Lyc.', 'Mur-ac.', 'Nat-m.', 'Nux-v.', 'Phos.', 'Rhus-t.', 'Sars.', 'Sep.', 'Sulph.'], grade: 1 },
      { id: 'urinary-organs-20', text: 'URINARY ORGANS - URINATION - dribbling', chapter: 'Urinary Organs', remedies: ['Agar.', 'Alum.', 'Aur.', 'Bary-c.', 'Calc.', 'Con.', 'Fluor.', 'Kali-bi.', 'Lyc.', 'Nat-m.', 'Nit-ac.', 'Nux-v.', 'Sep.', 'Sil.', 'Spong.', 'Sulph.', 'Thuja.'], grade: 1 },
      { id: 'urinary-organs-21', text: 'URINARY ORGANS - URINATION - must wait', chapter: 'Urinary Organs', remedies: ['Alum.', 'Bary-c.', 'Calc.', 'Caust.', 'Con.', 'Lyc.', 'Med.', 'Nat-m.', 'Nux-v.', 'Phos.', 'Sars.', 'Sep.', 'Sulph.', 'Thuja.'], grade: 1 },
      { id: 'urinary-organs-22', text: 'URINARY ORGANS - URINATION - straining', chapter: 'Urinary Organs', remedies: ['Alum.', 'Bary-c.', 'Bry.', 'Calc.', 'Caust.', 'Con.', 'Lyc.', 'Nat-m.', 'Nux-v.', 'Phos.', 'Sars.', 'Sep.', 'Sulph.', 'Thuja.'], grade: 1 },
    ]
  }'''

content = replace_chapter(content, 'Urinary Organs', URINARY_ORGANS)
write_file(FILE_PATH, content)
print("Step 2 done: Urinary Organs replaced")
