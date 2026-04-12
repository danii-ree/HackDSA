import React from 'react';

export default function SyntaxHighlight({ code }: { code: string }) {
    const keywords = ['function', 'const', 'let', 'var', 'return', 'if', 'else', 'for', 'while', 'new', 'class', 'import', 'export', 'default', 'break', 'continue', 'def', 'int', 'void', 'bool', 'true', 'false', 'null', 'undefined', 'this', 'super', 'static'];
    const regex = /(\/\/.*$|#.*$)|(["'`].*?["'`])|\b(\d+)\b|\b([a-zA-Z_]\w*)\b/gm;
    let html = '';
    let lastIndex = 0;
    
    code.replace(regex, (match, comment, str, num, word, offset) => {
        html += code.slice(lastIndex, offset).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        if (comment) {
            html += `<span style="color:#3D4450;font-style:italic">${match.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</span>`;
        } else if (str) {
            html += `<span style="color:#A5D6A7">${match.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</span>`;
        } else if (num) {
            html += `<span style="color:var(--color-warning)">${match}</span>`;
        } else if (word) {
            if (keywords.includes(word)) {
                html += `<span style="color:var(--accent-primary)">${word}</span>`;
            } else {
                html += word;
            }
        }
        lastIndex = offset + match.length;
        return match;
    });
    
    html += code.slice(lastIndex).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return <span dangerouslySetInnerHTML={{ __html: html || '&nbsp;' }} style={{ display: 'block', lineHeight: '1.6', minHeight: '1.6em', paddingRight: 8 }} />;
}
