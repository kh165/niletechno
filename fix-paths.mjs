import fs from 'fs';
import path from 'path';

function walk(dir, out = []) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name);
    if (f.isDirectory()) walk(p, out);
    else if (/\.(js|jsx)$/.test(f.name)) out.push(p);
  }
  return out;
}

const rules = [
  [/(['"`])\/(images\/|yg_trading|el_malizia|sky_hold|Nile%20Techno)/g, '$1./$2'],
  [/`\/\?page=partners/g, '`./index.html?page=partners'],
  [/href="\/"/g, 'href="./index.html"'],
];

let changed = 0;
for (const file of walk('src')) {
  let s = fs.readFileSync(file, 'utf8');
  const before = s;
  for (const [re, rep] of rules) s = s.replace(re, rep);
  if (s !== before) {
    fs.writeFileSync(file, s);
    changed++;
    console.log('fixed', file);
  }
}
console.log(`Done. ${changed} file(s) updated.`);