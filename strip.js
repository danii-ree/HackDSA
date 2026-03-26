import fs from 'fs';
import path from 'path';

const dir = './app';
const regex = /\/\/\s*──\s+(.*?)\s+─+/g;

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
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

const files = walk(dir);
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (content.match(regex)) {
        content = content.replace(regex, '// $1');
        fs.writeFileSync(file, content);
        console.log(`Replaced in ${file}`);
    }
});
