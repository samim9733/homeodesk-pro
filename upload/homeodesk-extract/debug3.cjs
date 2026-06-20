const fs = require('fs');
let text = fs.readFileSync('parse_file.cjs', 'utf8');
let t_match = text.match(/let text = `([\s\S]*?)`;/);
if (t_match) {
  let extractText = t_match[1];
  const regex = /================================================================================\n([A-Z]+)\n================================================================================\n([\s\S]*?)(?=\n================================================================================|$)/g;
  let match;
  let chapters = [];
  while ((match = regex.exec(extractText)) !== null) {
     if(match[1] === 'END OF OUTLINE') continue;
     let ctitle = match[1];
     ctitle = ctitle.split(' ').map(w => w.charAt(0) + w.slice(1).toLowerCase()).join(' ');
     const lineRegex = /^(?:\d+\.)?\s*([A-Z0-9][^\n]+)/gm;
     let matchLine;
     let entries = [];
     while ((matchLine = lineRegex.exec(match[2])) !== null) {
            let rName = matchLine[1].split('(')[0].trim();
            if(rName.includes('see ') || rName.includes('General')) continue;
            if (matchLine[0].startsWith('   ') || matchLine[0].match(/^\d+\.\d+/)) continue;
            rName = rName.charAt(0).toUpperCase() + rName.slice(1).toLowerCase();
            entries.push(rName);
     }
     entries = entries.map(e => e.replace(/ agg\.$| amel\.$|, sensation$| sensation$| sensation as of$| sensation of$| feeling$| feels$/, "").trim());
     chapters.push({ title: ctitle, entries });
  }

  const titles = chapters.map(c => c.title);
  for (const c of chapters) {
        for (const e of c.entries) {
            if (titles.includes(e)) {
                 console.log(`Chapter ${c.title} has rubric that matches a chapter title: ${e}`);
            }
        }
  }
}
