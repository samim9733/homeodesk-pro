#!/usr/bin/env python3
"""
Parse uploaded Kent's Repertory text files into a hierarchical TypeScript data structure.
Properly groups sub-sections under parent chapters.
"""

import re
import os

UPLOAD_DIR = "/home/z/my-project/upload"
OUTPUT_FILE = "/home/z/my-project/homeodesk-pro/src/kentRepertoryData.ts"

FILES = [
    ("1 mind to vtgo .txt", "numbered"),
    ("head to face .txt", "equals_separated"),
    ("face (dis colour)to abdomen (dis colour).txt", "outline"),
    ("abdomen(dis colour)to menas.txt", "indented"),
]

def escape_ts(s):
    """Escape string for TypeScript single quotes."""
    s = s.replace('\\', '\\\\')
    s = s.replace("'", "\\'")
    s = s.replace('"', '\\"')
    # Remove problematic unicode
    s = s.replace('\u2013', '-')  # en dash
    s = s.replace('\u2014', '-')  # em dash
    s = s.replace('\u2018', "'")  # left single quote
    s = s.replace('\u2019', "'")  # right single quote
    s = s.replace('\u201c', '"')  # left double quote
    s = s.replace('\u201d', '"')  # right double quote
    return s

def slugify(name):
    """Convert chapter name to slug."""
    s = re.sub(r'[^a-zA-Z0-9]', '-', name.lower())
    return re.sub(r'-+', '-', s).strip('-')

def parse_numbered_file(filepath):
    """Parse file with numbered hierarchy like: 1. chp-MIND, 1.1. RUBRIC, 1.1.1. subrubric"""
    chapters = []
    current_chapter = None
    current_rubric = None
    
    with open(filepath, 'r', encoding='utf-8', errors='replace') as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            
            # Match chapter: "1. chp-MIND" or "1. MIND"  
            if re.match(r'^\d+\.\s+chp-', line):
                ch_match = re.match(r'^\d+\.\s+chp-(.+)', line)
                if ch_match:
                    chapter_name = ch_match.group(1).strip()
                    current_chapter = {
                        'name': chapter_name,
                        'rubrics': []
                    }
                    chapters.append(current_chapter)
                    current_rubric = None
                    continue
            
            if current_chapter is None:
                continue
            
            # Match rubric: 1.1. TEXT
            rub_match = re.match(r'^\d+\.\d+\.\s+(.*)', line)
            if rub_match:
                text = rub_match.group(1).strip()
                if text:
                    current_rubric = {
                        'text': text,
                        'children': []
                    }
                    current_chapter['rubrics'].append(current_rubric)
                    continue
            
            # Match sub-rubric: 1.1.1. TEXT (any deeper level)
            sub_match = re.match(r'^\d+(\.\d+){2,}\.\s+(.*)', line)
            if sub_match and current_rubric:
                text = sub_match.group(2).strip()
                if text:
                    current_rubric['children'].append(text)
                    continue
    
    return chapters

def parse_equals_separated_file(filepath):
    """Parse files with ==== separators for chapter headings and numbered items.
    Format:
    ========
    HEAD
    ========
    1. PAIN
       1.1. Temples
            - Modalities: ...
    """
    chapters = []
    current_chapter = None
    current_rubric = None
    in_header = False
    header_name = ""
    
    with open(filepath, 'r', encoding='utf-8', errors='replace') as f:
        for line in f:
            stripped = line.strip()
            
            # Skip empty lines, source comments, and opening header
            if not stripped or stripped.startswith('Source:') or stripped.startswith('HOMEOPATHIC'):
                continue
            
            # Detect ==== separator
            if stripped.startswith('====') or stripped.startswith('---'):
                if in_header and header_name:
                    current_chapter = {
                        'name': header_name,
                        'rubrics': []
                    }
                    chapters.append(current_chapter)
                    current_rubric = None
                    in_header = False
                    header_name = ""
                else:
                    in_header = True
                continue
            
            # If we're in a header area (between ==== lines), capture chapter name
            if in_header and stripped and not stripped.startswith('====') and not stripped.startswith('---'):
                header_name = stripped.strip().upper()
                continue
            
            if current_chapter is None:
                continue
            
            # Numbered rubric: handle "1. TEXT", "1.1. TEXT", "1.1.1. TEXT" etc.
            num_match = re.match(r'^(\d+(?:\.\d+)*)\.\s+(.*)', stripped)
            if num_match:
                full_num = num_match.group(1)
                text = num_match.group(2).strip()
                if text:
                    dot_count = full_num.count('.')
                    if dot_count == 0:
                        # Main rubric: "1. PAIN"
                        current_rubric = {
                            'text': text,
                            'children': []
                        }
                        current_chapter['rubrics'].append(current_rubric)
                    elif current_rubric:
                        # Sub-rubric: "1.1. Temples" or deeper
                        current_rubric['children'].append(text)
                continue
            
            # Bullet items under current rubric
            bullet_match = re.match(r'^-\s+(.+)', stripped)
            if bullet_match and current_rubric:
                bullet_text = bullet_match.group(1).strip()
                if bullet_text.startswith('Modalities:'):
                    items = bullet_text.replace('Modalities:', '').strip().split(',')
                    for item in items:
                        item = item.strip()
                        if item and len(item) > 1:
                            current_rubric['children'].append(item)
                elif bullet_text.startswith('Time:'):
                    items = bullet_text.replace('Time:', '').strip().split(',')
                    for item in items:
                        item = item.strip()
                        if item and len(item) > 1:
                            current_rubric['children'].append(item)
                elif bullet_text.startswith('Locations:'):
                    items = bullet_text.replace('Locations:', '').strip().split(',')
                    for item in items:
                        item = item.strip()
                        if item and len(item) > 1:
                            current_rubric['children'].append(item)
                elif bullet_text.startswith('Extending to:'):
                    items = bullet_text.replace('Extending to:', '').strip().split(',')
                    for item in items:
                        item = item.strip()
                        if item and len(item) > 1:
                            current_rubric['children'].append(item)
                elif bullet_text.startswith('Types:'):
                    items = bullet_text.replace('Types:', '').strip().split(',')
                    for item in items:
                        item = item.strip()
                        if item and len(item) > 1:
                            current_rubric['children'].append(item)
                elif bullet_text.startswith('Laterality:'):
                    items = bullet_text.replace('Laterality:', '').strip().split(',')
                    for item in items:
                        item = item.strip()
                        if item and len(item) > 1:
                            current_rubric['children'].append(item)
                else:
                    current_rubric['children'].append(bullet_text)
                continue
            
            # Indented text lines that are sub-items (not numbered, not bullets)
            indent = len(line) - len(line.lstrip())
            if indent > 2 and current_rubric and stripped:
                current_rubric['children'].append(stripped)
    
    # Remove empty chapters
    chapters = [ch for ch in chapters if len(ch['rubrics']) > 0]
    return chapters

def parse_outline_file(filepath):
    """Parse structured outline files with ## CHAPTER, ### SECTION, - bullet items.
    Groups FACE - DISCOLORATION, FACE - DISTORTION, etc. under FACE chapter."""
    chapters = []
    current_chapter = None
    current_section = None
    
    with open(filepath, 'r', encoding='utf-8', errors='replace') as f:
        for line in f:
            stripped = line.strip()
            if not stripped or stripped.startswith('Source:') or stripped.startswith('# HOMEOPATHIC') or stripped.startswith('====') or stripped == '---':
                continue
            
            # Chapter heading: ## CHAPTER or ## CHAPTER (continued)
            ch_match = re.match(r'^##\s+([A-Z][A-Za-z\s&,/()\-]+?)(?:\s*\(continued\))?\s*$', stripped)
            if ch_match:
                raw_name = ch_match.group(1).strip()
                # Extract base chapter name (e.g., "FACE" from "FACE - DISCOLORATION")
                base_match = re.match(r'^([A-Z][A-Za-z\s]+?)(?:\s*-\s+)', raw_name)
                if base_match:
                    base_name = base_match.group(1).strip()
                else:
                    base_name = raw_name
                
                # Find or create chapter
                found = None
                for ch in chapters:
                    if ch['name'] == base_name:
                        found = ch
                        break
                
                if not found:
                    found = {
                        'name': base_name,
                        'rubrics': []
                    }
                    chapters.append(found)
                
                current_chapter = found
                # Create a section for the sub-heading
                current_section = {
                    'text': raw_name,
                    'children': []
                }
                current_chapter['rubrics'].append(current_section)
                continue
            
            # Section heading: ### SECTION
            sec_match = re.match(r'^###\s+(.+)', stripped)
            if sec_match and current_chapter:
                section_text = sec_match.group(1).strip()
                current_section = {
                    'text': section_text,
                    'children': []
                }
                current_chapter['rubrics'].append(current_section)
                continue
            
            # Bullet items
            bullet_match = re.match(r'^-\s+(.+)', stripped)
            if bullet_match and current_section and current_chapter:
                bullet_text = bullet_match.group(1).strip()
                if bullet_text.startswith('Modalities:'):
                    items = bullet_text.replace('Modalities:', '').strip().split(',')
                    for item in items:
                        item = item.strip()
                        if item:
                            current_section['children'].append(item)
                elif bullet_text.startswith('Locations:'):
                    items = bullet_text.replace('Locations:', '').strip().split(',')
                    for item in items:
                        item = item.strip()
                        if item:
                            current_section['children'].append(item)
                else:
                    current_section['children'].append(bullet_text)
                continue
    
    return chapters

def parse_indented_file(filepath):
    """Parse indented flat files with UPPERCASE chapter headings and indented rubrics/sub-rubrics."""
    chapters = []
    current_chapter = None
    current_rubric = None
    
    with open(filepath, 'r', encoding='utf-8', errors='replace') as f:
        for line in f:
            stripped = line.rstrip('\n\r')
            if not stripped.strip():
                continue
            
            indent = len(stripped) - len(stripped.lstrip())
            text = stripped.strip()
            
            if not text or text.startswith('#') or text.startswith('=='):
                continue
            
            # Chapter heading: ALL CAPS, no indent, no leading number
            if indent == 0 and text == text.upper() and len(text) > 2 and not text.startswith('(') and not text[0].isdigit():
                # Only treat as chapter if it looks like a body part name
                if re.match(r'^[A-Z][A-Z\s&]+$', text):
                    current_chapter = {
                        'name': text.title(),
                        'rubrics': []
                    }
                    chapters.append(current_chapter)
                    current_rubric = None
                    continue
            
            if current_chapter is None:
                continue
            
            # Main rubric: starts with uppercase, not a sub-item
            if indent <= 2:
                if text and text[0].isupper() and not text.startswith('('):
                    current_rubric = {
                        'text': text,
                        'children': []
                    }
                    current_chapter['rubrics'].append(current_rubric)
                    continue
            
            # Sub-rubric: indented
            if indent > 2 and current_rubric:
                sub_text = text.rstrip(':').strip()
                if sub_text:
                    current_rubric['children'].append(sub_text)
                continue
    
    return chapters

def generate_typescript(all_chapters):
    """Generate TypeScript file from parsed chapters."""
    lines = []
    lines.append("import { RubricData } from './types';")
    lines.append("")
    lines.append("export const KENT_REPERTORY_DATA: RubricData[] = [")
    
    total_rubrics = 0
    total_subs = 0
    
    for ci, ch in enumerate(all_chapters):
        ch_id = slugify(ch['name'])
        
        lines.append(f"  {{")
        lines.append(f"    id: '{ch_id}',")
        lines.append(f"    chapter: '{escape_ts(ch['name'])}',")
        lines.append(f"    rubrics: [")
        
        for ri, rub in enumerate(ch['rubrics'], 1):
            rub_id = f"{ch_id}-{ri}"
            rub_text = escape_ts(rub['text'])
            
            lines.append(f"      {{ id: '{rub_id}', text: '{rub_text}', chapter: '{escape_ts(ch['name'])}', remedies: [] as string[], grade: 1 }},")
            total_rubrics += 1
            
            for si, sub in enumerate(rub.get('children', []), 1):
                sub_id = f"{ch_id}-{ri}-{si}"
                sub_text = escape_ts(f"{rub['text']} - {sub}")
                if sub_text:
                    lines.append(f"      {{ id: '{sub_id}', text: '{sub_text}', chapter: '{escape_ts(ch['name'])}', remedies: [] as string[], grade: 1 }},")
                    total_subs += 1
        
        if ci < len(all_chapters) - 1:
            lines.append(f"    ],")
        else:
            lines.append(f"    ]")
        if ci < len(all_chapters) - 1:
            lines.append(f"  }},")
        else:
            lines.append(f"  }}")
    
    lines.append("];")
    lines.append("")
    lines.append(f"// Generated: {len(all_chapters)} chapters, {total_rubrics} rubrics, {total_subs} sub-rubrics")
    
    return '\n'.join(lines)

def main():
    all_chapters = []
    
    for filename, fmt in FILES:
        filepath = os.path.join(UPLOAD_DIR, filename)
        if not os.path.exists(filepath):
            print(f"  WARNING: File not found: {filepath}")
            continue
        
        print(f"Parsing: {filename} (format: {fmt})")
        if fmt == 'numbered':
            chapters = parse_numbered_file(filepath)
        elif fmt == 'equals_separated':
            chapters = parse_equals_separated_file(filepath)
        elif fmt == 'outline':
            chapters = parse_outline_file(filepath)
        elif fmt == 'indented':
            chapters = parse_indented_file(filepath)
        else:
            chapters = []
        
        print(f"  Found {len(chapters)} chapters")
        for ch in chapters:
            print(f"    - {ch['name']}: {len(ch['rubrics'])} main rubrics, "
                  f"{sum(len(r.get('children', [])) for r in ch['rubrics'])} sub-rubrics")
        all_chapters.extend(chapters)
    
    # Merge chapters with same name
    merged = {}
    for ch in all_chapters:
        name = ch['name']
        if name in merged:
            merged[name]['rubrics'].extend(ch['rubrics'])
        else:
            merged[name] = ch
    
    unique_chapters = list(merged.values())
    print(f"\nMerged: {len(unique_chapters)} unique chapters")
    
    total_main = sum(len(ch['rubrics']) for ch in unique_chapters)
    total_sub = sum(sum(len(r.get('children', [])) for r in ch['rubrics']) for ch in unique_chapters)
    print(f"Total: {total_main} main rubrics, {total_sub} sub-rubrics")
    
    ts_content = generate_typescript(unique_chapters)
    
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write(ts_content)
    
    print(f"\nGenerated: {OUTPUT_FILE}")

if __name__ == '__main__':
    main()
