'use client';

import { ArrowUpRight, Check } from 'lucide-react';
import { Cta } from '@/app/home';
import { COMPARE_COPY, COMPARISONS, type Comparison } from '@/lib/compare';
import type { Lang } from '@/lib/product-map';
import { breadcrumbLd, faqLd } from '@/lib/page-seo';
import { SITE_URL } from '@/lib/seo';
import { comparePath, forAllLangs, homePath } from '@/lib/site-paths';
import { SOLUTIONS, solutionPath } from '@/lib/solutions';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Shell } from './Shell';
import { shortTitle } from './SolutionPage';

export function ComparePage({ comparison: cmp, lang }: { comparison: Comparison; lang: Lang }) {
  const c = cmp.copy[lang];
  const w = COMPARE_COPY[lang];
  const paths = forAllLangs((l) => comparePath(l, cmp.slug));
  const related = cmp.solutions.map((s) => SOLUTIONS.find((x) => x.slug === s)).filter((s): s is NonNullable<typeof s> => !!s);
  const others = COMPARISONS.filter((x) => x.slug !== cmp.slug);
  const jsonLd = [
    { '@context': 'https://schema.org', '@type': 'WebPage', name: c.title, description: c.description, url: SITE_URL + paths[lang], inLanguage: lang, isPartOf: { '@type': 'WebSite', name: 'LeadDrive CRM', url: SITE_URL } },
    breadcrumbLd([{ name: 'LeadDrive CRM', path: homePath(lang) }, { name: w.label, path: paths[lang] }]),
    faqLd(c.faq),
  ];
  return (
    <Shell lang={lang} paths={paths} jsonLd={jsonLd}>
      <section className="sol-hero hub-hero">
        <div className="wrap">
          <nav className="sol-crumbs" aria-label="Breadcrumb"><a href={homePath(lang)}>{w.home}</a><span>/</span><span>{w.label}</span></nav>
          <h1>{c.h1}<br /><em>{c.h2}</em></h1>
          <p className="sol-intro">{c.intro}</p>
          <div className="sol-actions"><Cta>{w.demo}</Cta></div>
        </div>
      </section>
      <section className="cmp wrap">
        <div className="cmp-table-wrap">
          <table className="cmp-table">
            <thead><tr><th>{w.feature}</th><th className="cmp-us">LeadDrive</th><th>{c.otherName}</th></tr></thead>
            <tbody>{c.rows.map((r) => (<tr key={r.feature}><th scope="row">{r.feature}</th><td className="cmp-us">{r.leaddrive}</td><td>{r.other}</td></tr>))}</tbody>
          </table>
        </div>
        <div className="cmp-when">
          <div><h2>{w.whenTitle}</h2><ul>{c.when.map((x) => <li key={x}><Check size={16} />{x}</li>)}</ul></div>
          <div><h2>{w.whenOtherTitle} {c.otherName}</h2><ul>{c.whenOther.map((x) => <li key={x}><Check size={16} />{x}</li>)}</ul></div>
        </div>
        <p className="cmp-note">{c.note}</p>
      </section>
      <section className="faq wrap">
        <h2>{w.faq}</h2>
        <Accordion className="faq-list" multiple={false}>{c.faq.map(([q, a], i) => (<AccordionItem value={i} key={q}><AccordionTrigger>{q}</AccordionTrigger><AccordionContent>{a}</AccordionContent></AccordionItem>))}</Accordion>
      </section>
      <section className="sol-more wrap">
        <span className="eyebrow">{w.solutions}</span>
        <nav>{related.map((s) => <a key={s.slug} href={solutionPath(lang, s.slug)}>{shortTitle(s, lang)}<ArrowUpRight size={15} /></a>)}</nav>
        <span className="eyebrow">{w.others}</span>
        <nav>{others.map((o) => <a key={o.slug} href={comparePath(lang, o.slug)}>{o.copy[lang].h1.replace(/[:：]\s*$/, '')}<ArrowUpRight size={15} /></a>)}</nav>
      </section>
    </Shell>
  );
}
