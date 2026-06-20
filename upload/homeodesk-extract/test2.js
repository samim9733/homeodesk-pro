import fs from 'fs';
let c = fs.readFileSync('src/repertoryData.ts', 'utf8');

const regex = new RegExp(`(name:\\s*"Head"[\\s\\S]*?rubrics:\\s*\\[)([\\s\\S]*?)(\\n\\s*\\]\\s*\\},?\\s*\\{)` , 'g');
let match = regex.exec(c);
if (match) {
  console.log("MATCHED p1 length:", match[1].length);
  console.log("MATCHED p2 length:", match[2].length);
  console.log("MATCHED p3 length:", match[3].length);
  console.log("MATCHED p1 end:", match[1].slice(-50));
  console.log("MATCHED p3 start:", match[3].slice(0, 50));
} else {
  console.log("NO MATCH");
}
