import fs from 'fs';
import path from 'path';

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = dir + '/' + file;
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.css')) { 
            results.push(file);
        }
    });
    return results;
}

const files = walk('./app');
const FONT = 'system-ui, -apple-system, sans-serif';

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    // Replace in style objects and CSS
    content = content.replace(/'Syne'/g, `'${FONT}'`);
    content = content.replace(/"Syne"/g, `"${FONT}"`);
    content = content.replace(/'DM Sans'/g, `'${FONT}'`);
    content = content.replace(/"DM Sans"/g, `"${FONT}"`);
    // Remove the google fonts link from layout.tsx
    if (file.endsWith('layout.tsx')) {
        content = content.replace(/<link[^>]*href="https:\/\/fonts\.googleapis\.com\/css2\?family=JetBrains\+Mono.*?&display=swap"[^>]*>/s, 
            '<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap" rel="stylesheet" />');
    }
    
    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log('Updated font in:', file);
    }
});
