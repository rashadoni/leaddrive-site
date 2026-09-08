'use client';

import { ArrowUpRight } from 'lucide-react';
import { DEMO } from '@/app/home';
import type { Lang } from '@/lib/product-map';
import { breadcrumbLd } from '@/lib/page-seo';
import { SITE_URL } from '@/lib/seo';
import { forAllLangs, homePath, termsPath } from '@/lib/site-paths';
import { TERMS_COPY } from '@/lib/terms-copy';
import { Shell } from './Shell';

export function TermsPage({ lang }: { lang: Lang }) {
  const c = TERMS_COPY[lang];
  const paths = forAllLangs(termsPath);
  const jsonLd = [
    { '@context': 'https://schema.org', '@type': 'WebPage', name: c.title, description: c.description, url: SITE_URL + paths[lang], inLanguage: lang },
    breadcrumbLd([{ name: 'LeadDrive CRM', path: homePath(lang) }, { name: c.label, path: paths[lang] }]),
  ];
  return (
    <Shell lang={lang} paths={paths} jsonLd={jsonLd}>
      <section className="sol-hero hub-hero">
        <div className="wrap">
          <nav className="sol-crumbs" aria-label="Breadcrumb"><a href={homePath(lang)}>{c.home}</a><span>/</span><span>{c.label}</span></nav>
          <h1>{c.h1}<br /><em>{c.h2}</em></h1>
          <p className="sol-intro">{c.intro}</p>
        </div>
      </section>
      <section className="terms wrap">
        <div className="terms-grid">
          {c.blocks.map((b) => (<article className="terms-block" key={b.h}><h2>{b.h}</h2>{b.p.map((p) => <p key={p}>{p}</p>)}</article>))}
        </div>
        <div className="terms-cta">
          <a className="cta" href={DEMO} target="_blank" rel="noopener">{c.cta}<span><ArrowUpRight size={18} /></span></a>
          <p>{c.note}</p>
        </div>
      </section>
    </Shell>
  );
}
