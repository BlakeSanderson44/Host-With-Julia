import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const exts = new Set(['.ts', '.tsx', '.js', '.jsx']);
const offenders = [];
const ignoreDirs = new Set(['.git', '.next', 'node_modules']);

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ignoreDirs.has(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }
    if (!exts.has(path.extname(entry.name))) continue;

    const content = fs.readFileSync(fullPath, 'utf8');
    const attrRegex = /className\s*=\s*(\{?)\s*(["'`])([^"'`]*?)\2\s*(\}?)/g;
    let match;
    while ((match = attrRegex.exec(content)) !== null) {
      const [, openBrace, , literal] = match;
      const hasClosingBrace = Boolean(match[4]);
      if ((openBrace && !hasClosingBrace) || literal.length === 0) continue;
      if (literal.includes('...')) {
        offenders.push(path.relative(ROOT, fullPath));
        break;
      }
    }
  }
}

walk(ROOT);

if (offenders.length > 0) {
  console.error('❌ Sanity check failed: found "..." inside className strings in:');
  for (const file of offenders) {
    console.error(` - ${file}`);
  }
  process.exit(1);
}

console.log('✅ Sanity check passed.');
