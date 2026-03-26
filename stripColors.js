import fs from 'fs';

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = dir + '/' + file;
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else if (file.endsWith('.ts') || file.endsWith('.tsx')) { 
            results.push(file);
        }
    });
    return results;
}

const colors = {
  // Fix the missed glass and borders
  "rgba(22, 27, 34, 0.8)": "var(--bg-glass)",
  "rgba(48, 54, 61, 0.8)": "var(--border-glass)",
  "rgba(48,54,61,0.8)": "var(--border-glass)",
  "rgba(22,27,34,0.6)": "var(--bg-panel-trans)",
  "rgba(48,54,61,0.5)": "var(--border-glass)",

  // Fix missed hover/accents
  "rgba(80,250,123,0.15)": "var(--color-success-bg)",
  "rgba(255,107,107,0.15)": "var(--color-danger-bg)",
  "rgba(0,245,255,0.3)": "var(--accent-primary-border)",
  "rgba(0,245,255,0.4)": "var(--accent-primary-border)",
  "rgba(0,245,255,0.1)": "var(--accent-primary-bg)",
  "rgba(80,250,123,0.1)": "var(--color-success-bg)",
  "rgba(255,107,107,0.1)": "var(--color-danger-bg)",
  "rgba(255,255,255,0.05)": "var(--bg-panel-hover)",

  // Grid dots
  "rgba(255,255,255,0.04)": "var(--grid-dot)",
  "rgba(0,0,0,0.07)": "var(--grid-line)",

  // Special text colors missed
  "#FF9E9E": "var(--color-danger)"
};

const mapEntries = Object.entries(colors).sort((a, b) => b[0].length - a[0].length);
const files = walk('./app');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    
    for (const [key, val] of mapEntries) {
        content = content.split(key).join(val);
    }
    
    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log('Fixed missed colors in:', file);
    }
});
