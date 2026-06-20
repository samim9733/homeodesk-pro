#!/usr/bin/env python3
"""
Extract rubrics with empty remedies and use AI to fill them.
"""
import re
import json
import subprocess
import time

DATA_FILE = "/home/z/my-project/homeodesk-pro/src/kentRepertoryData.ts"

def extract_empty_rubrics(filepath):
    """Extract all rubric IDs and texts that have empty remedies."""
    empty_rubrics = []
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find lines with empty remedies
    pattern = r"\{ id: '([^']+)', text: '([^']+)', chapter: '([^']+)', remedies: \[\], grade: (\d+) \}"
    for match in re.finditer(pattern, content):
        rubric_id = match.group(1)
        rubric_text = match.group(2)
        chapter = match.group(3)
        empty_rubrics.append({
            'id': rubric_id,
            'text': rubric_text,
            'chapter': chapter
        })
    
    return empty_rubrics

def get_ai_remedies_batch(rubrics_batch, chapter):
    """Use z-ai CLI to get remedies for a batch of rubrics."""
    rubric_list = "\n".join([f"- {r['id']}: {r['text']}" for r in rubrics_batch])
    
    prompt = f"""You are a Kent's Homeopathic Repertory expert. For each rubric below from the "{chapter}" chapter, provide the appropriate homeopathic remedies in abbreviated form (e.g., Nux-v., Sulph., Puls., Lyc., Bell., etc.).

Return ONLY a JSON object where keys are the rubric IDs and values are arrays of remedy abbreviations. Include 3-15 most relevant remedies per rubric based on Kent's Repertory.

Rubrics:
{rubric_list}

Return format example:
{{"id1": ["Nux-v.", "Sulph.", "Puls."], "id2": ["Bell.", "Ars.", "Stram."]}}
Return ONLY valid JSON, nothing else."""

    try:
        result = subprocess.run(
            ["z-ai", "chat", "-p", prompt, "--json"],
            capture_output=True, text=True, timeout=60
        )
        
        if result.returncode == 0:
            output = result.stdout.strip()
            # Parse JSON from the output
            try:
                # Try to parse the whole output
                data = json.loads(output)
                return data
            except json.JSONDecodeError:
                # Try to find JSON in the output
                json_match = re.search(r'\{[\s\S]*\}', output)
                if json_match:
                    data = json.loads(json_match.group())
                    return data
        return {}
    except Exception as e:
        print(f"  Error: {e}")
        return {}

def main():
    print("Extracting empty rubrics...")
    empty_rubrics = extract_empty_rubrics(DATA_FILE)
    print(f"Found {len(empty_rubrics)} rubrics with empty remedies")
    
    if not empty_rubrics:
        print("No empty rubrics found!")
        return
    
    # Group by chapter
    chapters = {}
    for r in empty_rubrics:
        ch = r['chapter']
        if ch not in chapters:
            chapters[ch] = []
        chapters[ch].append(r)
    
    print(f"Across {len(chapters)} chapters")
    
    # Process in batches of 10
    all_remedies = {}
    batch_size = 8
    
    for chapter, rubrics in sorted(chapters.items()):
        print(f"\n=== {chapter} ({len(rubrics)} rubrics) ===")
        
        for i in range(0, len(rubrics), batch_size):
            batch = rubrics[i:i+batch_size]
            batch_num = i // batch_size + 1
            total_batches = (len(rubrics) + batch_size - 1) // batch_size
            print(f"  Batch {batch_num}/{total_batches} ({len(batch)} rubrics)...", end=" ", flush=True)
            
            remedies = get_ai_remedies_batch(batch, chapter)
            
            if remedies:
                count = 0
                for rubric in batch:
                    rid = rubric['id']
                    if rid in remedies and isinstance(remedies[rid], list) and len(remedies[rid]) > 0:
                        all_remedies[rid] = remedies[rid]
                        count += 1
                print(f"got {count} remedies")
            else:
                print("FAILED")
            
            time.sleep(0.5)  # Rate limiting
    
    print(f"\nTotal remedies generated: {len(all_remedies)}")
    
    # Save the remedies map
    output_path = "/home/z/my-project/scripts/remedies_map.json"
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(all_remedies, f, indent=2, ensure_ascii=False)
    
    print(f"Saved to {output_path}")

if __name__ == "__main__":
    main()
