import ts from 'typescript';
import fs from 'fs';

const code = fs.readFileSync('src/repertoryData.ts', 'utf8');
const sourceFile = ts.createSourceFile('src/repertoryData.ts', code, ts.ScriptTarget.Latest, true);

function printDiagnostics(diagnostics) {
  diagnostics.forEach(diagnostic => {
    if (diagnostic.file) {
      let { line, character } = ts.getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start);
      let message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
      console.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
    } else {
      console.log(ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'));
    }
  });
}

// Check syntax errors
const diagnostics = sourceFile.parseDiagnostics;
printDiagnostics(diagnostics);
