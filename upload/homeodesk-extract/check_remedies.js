import fs from 'fs';

const content = fs.readFileSync('src/materiaMedicaData.ts', 'utf-8');
const remedies = content.match(/\{[\s\S]*?id: '[\s\S]*?\},/g);

if (remedies) {
  remedies.forEach((remedy, index) => {
    if (!remedy.includes('appearance:')) {
      const idMatch = remedy.match(/id: '(.*?)'/);
      if (idMatch) {
        console.log(`Remedy missing appearance: ${idMatch[1]}`);
      }
    }
  });
}
