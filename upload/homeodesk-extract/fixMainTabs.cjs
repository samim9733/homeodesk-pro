const fs = require('fs');

// src/MainTabs.tsx - add User
let mainContent = fs.readFileSync('src/MainTabs.tsx', 'utf-8');
mainContent = mainContent.replace(/import \{ \n  Users, UserPlus, Bell/, 'import {\n  Users, UserPlus, Bell, User,');
mainContent = mainContent.replace(/import \{ Patient, Reminder, AnalysisItem, RubricData, Remedy as RepertoryRemedy \}/, 'import { Patient, Reminder, AnalysisItem, RubricData, Remedy as RepertoryRemedy, Rubric }');
// Fix unknown type error
mainContent = mainContent.replace(/subs\.map\(/, '(subs as any[]).map(');

fs.writeFileSync('src/MainTabs.tsx', mainContent);

console.log('Fixed MainTabs.');
