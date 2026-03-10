const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
    });
}

const colorMap = {
    'blue': 'amber',
    'cyan': 'rose',
    'violet': 'orange',
    'purple': 'rose',
    'fuchsia': 'red'
};

const regex = /(blue|cyan|violet|purple|fuchsia)-(\d{2,3}(\/\d{2,3})?|\[.*?\]|[a-z]+)/g;

['c:/Users/Gabriel/Desktop/portfolio/components', 'c:/Users/Gabriel/Desktop/portfolio/app'].forEach(dir => {
    walk(dir, function (filePath) {
        if (!filePath.endsWith('.tsx') && !filePath.endsWith('.css') && !filePath.endsWith('.ts')) return;
        let content = fs.readFileSync(filePath, 'utf8');
        let newContent = content.replace(regex, (match, p1, p2) => {
            return `${colorMap[p1]}-${p2}`;
        });
        if (content !== newContent) {
            fs.writeFileSync(filePath, newContent, 'utf8');
            console.log(`Updated ${filePath}`);
        }
    });
});
