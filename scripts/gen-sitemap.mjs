// Generates public/sitemap.xml from the language roots and lib/solutions.ts slugs.
import { readFileSync, writeFileSync } from 'node:fs';
const SITE = 'https://leaddrivecrm.org';
const PATHS = { az: '', ru: '/ru', en: '/en' };
const src = readFileSync(new URL('../lib/solutions.ts', import.meta.url), 'utf8');
const slugs = [...src.matchAll(/^\s*slug: '([a-z0-9-]+)'/gm)].map((m) => m[1]);
const today = new Date().toISOString().slice(0, 10);
const urls = [];
const push = (path, lang, prio, freq) => {
  const href = (l) => (PATHS[l] + path) || '/';
  urls.push(`  <url>\n    <loc>${SITE}${href(lang)}</loc>\n` + ['az', 'ru', 'en'].map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${SITE}${href(l)}"/>`).join('\n') + `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}${href('az')}"/>\n    <lastmod>${today}</lastmod><changefreq>${freq}</changefreq><priority>${prio}</priority>\n  </url>`);
};
for (const lang of ['az', 'ru', 'en']) push('', lang, lang === 'az' ? '1.0' : '0.9', 'weekly');
for (const slug of slugs) for (const lang of ['az', 'ru', 'en']) push(`/solutions/${slug}`, lang, '0.8', 'monthly');
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`;
writeFileSync(new URL('../public/sitemap.xml', import.meta.url), xml);
console.log(`sitemap: ${urls.length} URLs (${slugs.length} solutions)`);
