const fs = require('fs');
const path = require('path');

function injectScriptToHtmlFiles(directory) {
  const files = fs.readdirSync(directory);

  files.forEach(file => {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      injectScriptToHtmlFiles(filePath);
    } else if (file.endsWith('.html')) {
      let content = fs.readFileSync(filePath, 'utf8');
      
      if (!content.includes('dashboard-console-capture.js')) {
        content = content.replace(
          '</head>',
          '  <script src="/dashboard-console-capture.js"></script>\n  </head>'
        );
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Injected console capture script into: ${filePath}`);
      }
    }
  });
}

const outDir = path.join(__dirname, '..', 'out');
if (fs.existsSync(outDir)) {
  injectScriptToHtmlFiles(outDir);
  console.log('Console capture script injection complete!');
} else {
  console.log('No out directory found. Skipping injection.');
}