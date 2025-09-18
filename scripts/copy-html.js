const fs = require('fs');
const path = require('path');

// Simple copy helper for HTML files
const sourceDir = '.';
const distDir = 'dist';

// Ensure dist directory exists
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Copy HTML files
const htmlFiles = ['index.html', 'intel.html', 'concord.html', 'leadership.html', 'fleets.html'];

htmlFiles.forEach(file => {
  if (fs.existsSync(file)) {
    fs.copyFileSync(file, path.join(distDir, file));
    console.log(`Copied ${file} to ${distDir}/`);
  } else {
    console.warn(`Warning: ${file} not found`);
  }
});

// Copy assets directory
function copyRecursive(src, dest) {
  if (fs.existsSync(src)) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    
    const entries = fs.readdirSync(src, { withFileTypes: true });
    
    for (let entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);
      
      if (entry.isDirectory()) {
        copyRecursive(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }
}

copyRecursive('assets', path.join(distDir, 'assets'));
copyRecursive('data', path.join(distDir, 'data'));

console.log('HTML and assets copy completed successfully.');