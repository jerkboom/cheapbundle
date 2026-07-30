const fs = require('fs');
const path = require('path');

function updateFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/price:\s*([\d.]+)/g, (match, p1) => {
    const num = parseFloat(p1);
    const instant = num + 5;
    return `standardPrice: ${num}, instantPrice: ${instant}`;
  });
  fs.writeFileSync(filePath, content, 'utf8');
}

updateFile(path.join(__dirname, 'frontend/src/pages/Bundles.tsx'));
updateFile(path.join(__dirname, 'frontend/src/pages/Home.tsx'));
console.log('Done updating bundles');
