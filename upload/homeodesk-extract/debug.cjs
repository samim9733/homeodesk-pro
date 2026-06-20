const fs = require('fs');
let text = fs.readFileSync('parse_file.cjs', 'utf8');
let t_match = text.match(/let text = `([\s\S]*?)`;/);
if (t_match) {
  let extractText = t_match[1];
  const regex = /================================================================================\n([A-Z]+)\n================================================================================\n([\s\S]*?)(?=\n================================================================================|$)/g;
  let match;
  while ((match = regex.exec(extractText)) !== null) {
     console.log("CHAPTER:", match[1]);
  }
}
