const fs = require('fs');
let text = fs.readFileSync('parse_file.cjs', 'utf8');
let t_match = text.match(/let text = `([\s\S]*?)`;/);
if (t_match) {
  let extractText = t_match[1];
  const regex = /================================================================================\n([A-Z]+)\n================================================================================\n([\s\S]*?)(?=\n================================================================================|$)/g;
  let match;
  while ((match = regex.exec(extractText)) !== null) {
     let ctitle = match[1];
     if (ctitle === "HEAD" || ctitle === "EYE") {
        const lineRegex = /^(?:\d+\.)?\s*([A-Z0-9][^\n]+)/gm;
        let matchLine;
        let entries = [];
        while ((matchLine = lineRegex.exec(match[2])) !== null) {
            let rName = matchLine[1].split('(')[0].trim();
            if(rName.includes('see ') || rName.includes('General')) continue;
            if (matchLine[0].startsWith('   ') || matchLine[0].match(/^\d+\.\d+/)) continue;
            entries.push(rName);
        }
        console.log(ctitle, entries.find(x => x.toLowerCase() === "eye"));
     }
  }
}
