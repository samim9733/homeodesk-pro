import ts from 'typescript';
import fs from 'fs';

const code = fs.readFileSync('src/repertoryData.ts', 'utf8');
const regex = new RegExp(`(name:\\s*"Head"[\\s\\S]*?rubrics:\\s*\\[)([\\s\\S]*?)(\\n\\s*\\]\\s*\\},?\\s*\\{)` , 'g');
const match = regex.exec(code);
if (match) {
  const headStr = `const a = [{\n${match[1]}${match[2]}\n]\n}];`;
  const sf = ts.createSourceFile('test.ts', headStr, ts.ScriptTarget.Latest, true);
  sf.parseDiagnostics.forEach(d => console.log(ts.flattenDiagnosticMessageText(d.messageText, '\n')));
  console.log("AST generated for Head.");
}
