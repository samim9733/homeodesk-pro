const fs = require('fs');
let mainContent = fs.readFileSync('src/MainTabs.tsx', 'utf-8');
mainContent = mainContent.replace('User,,', 'User,');
fs.writeFileSync('src/MainTabs.tsx', mainContent);
