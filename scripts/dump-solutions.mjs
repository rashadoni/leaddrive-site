// Prints slug + h1/h2 per language from lib/solutions.ts (regex, no TS compile needed).
import { readFileSync } from 'node:fs';
const src = readFileSync(new URL('../lib/solutions.ts', import.meta.url), 'utf8');
const blocks = src.split(/\n  \{\n    slug: '/).slice(1);
const out = blocks.map((b) => {
  const slug = b.match(/^([a-z0-9-]+)'/)[1];
  const pick = (lang) => { const m = b.match(new RegExp(`\\n\\s+${lang}: \\{[^\\n]*?h1: '((?:[^'\\\\]|\\\\.)*)', h2: '((?:[^'\\\\]|\\\\.)*)'`)); return [m[1], m[2]]; };
  return { slug, az: pick('az'), ru: pick('ru'), en: pick('en') };
});
console.log(JSON.stringify(out));
