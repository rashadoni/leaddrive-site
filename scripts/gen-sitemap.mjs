// Generates public/sitemap.xml from the language roots, solutions, hub, blog, articles and comparisons.
import { readFileSync, writeFileSync } from 'node:fs';
const SITE = 'https://leaddrivecrm.org';
const PATHS = { az: '', ru: '/ru', en: '/en' };
const slugsOf = (file) => [...readFileSync(new URL(file, import.meta.url), 'utf8').matchAll(/^\s*slug: '([a-z0-9-]+)'/gm)].map((m) => m[1]);
const solutions = slugsOf('../lib/solutions.ts');
const articles = [...slugsOf('../lib/articles-a.ts'), ...slugsOf('../lib/articles-b.ts')];
const comparisons = slugsOf('../lib/compare.ts');
const today = new Date().toISOString().slice(0, 10);
const urls = [];
const push = (path, lang, prio, freq) => {
  const href = (l) => (PATHS[l] + path) || '/';
  urls.push(`  <url>\n    <loc>${SITE}${href(lang)}</loc>\n` + ['az', 'ru', 'en'].map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${SITE}${href(l)}"/>`).join('\n') + `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}${href('az')}"/>\n    <lastmod>${today}</lastmod><changefreq>${freq}</changefreq><priority>${prio}</priority>\n  </url>`);
};
const L = ['az', 'ru', 'en'];
for (const lang of L) push('', lang, lang === 'az' ? '1.0' : '0.9', 'weekly');
for (const lang of L) push('/solutions', lang, '0.9', 'weekly');
for (const slug of solutions) for (const lang of L) push(`/solutions/${slug}`, lang, '0.8', 'monthly');
for (const slug of comparisons) for (const lang of L) push(`/compare/${slug}`, lang, '0.8', 'monthly');
for (const lang of L) push('/blog', lang, '0.8', 'weekly');
for (const lang of L) push('/terms', lang, '0.5', 'monthly');
for (const slug of articles) for (const lang of L) push(`/blog/${slug}`, lang, '0.7', 'monthly');
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`;
writeFileSync(new URL('../public/sitemap.xml', import.meta.url), xml);
writeFileSync(new URL('./urls.txt', import.meta.url), urls.map((u) => u.match(/<loc>([^<]+)/)[1]).join('\n') + '\n');
console.log(`sitemap: ${urls.length} URLs (${solutions.length} solutions, ${articles.length} articles, ${comparisons.length} comparisons)`);
