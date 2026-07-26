const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const replacements = [
  // General colors and classes
  { regex: /bg-\[\#0A0502\]\/80/g, replace: 'bg-background/90' },
  { regex: /border-white\/5/g, replace: 'border-borderDark' },
  { regex: /border-white\/10/g, replace: 'border-borderDark' },
  { regex: /bg-\[\#110B07\]/g, replace: 'bg-card' },
  { regex: /bg-\[\#1A100A\]/g, replace: 'bg-card' },
  { regex: /bg-black\/30/g, replace: 'bg-backgroundSecondary' },
  { regex: /bg-\[\#20130B\]/g, replace: 'bg-background' },
  { regex: /text-yellow-500/g, replace: 'text-primary' },
  { regex: /bg-yellow-500/g, replace: 'bg-primary' },
  { regex: /text-black/g, replace: 'text-textMain' }, // when inside yellow buttons
  { regex: /text-\[\#B8AAA0\]/g, replace: 'text-textMuted' },
  { regex: /placeholder-\[\#B8AAA0\]\/50/g, replace: 'placeholder-textMuted/50' },
  { regex: /rgba\(234,179,8/g, replace: 'rgba(59,130,246' }, // yellow RGB to blue RGB for shadows
  { regex: /rgba\(255,255,255/g, replace: 'rgba(59,130,246' }, // white to blue for shadows
  { regex: /border-red-500/g, replace: 'border-danger' },
  { regex: /text-red-500/g, replace: 'text-danger' },
  { regex: /bg-red-500\/10/g, replace: 'bg-danger/10' },
  
  // Specific tweaks
  { regex: /rounded-\[2rem\]/g, replace: 'rounded-[18px]' },
  { regex: /group-hover:text-black/g, replace: 'group-hover:text-textMain' },
  
  // Transitions
  { regex: /duration-300/g, replace: 'duration-200' },
  { regex: /duration-500/g, replace: 'duration-200' }
];

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      
      for (const { regex, replace } of replacements) {
        content = content.replace(regex, replace);
      }
      
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDirectory(srcDir);
