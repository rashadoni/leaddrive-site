'use client';

import type { Lang } from '@/lib/product-map';
import { COMPANY } from '@/lib/company';
import { LEGAL, LEGAL_KEYS, LEGAL_LABELS, LEGAL_PATH, type LegalKey } from '@/lib/legal-copy';
import { breadcrumbLd } from '@/lib/page-seo';
import { SITE_URL } from '@/lib/seo';
import { forAllLangs, homePath, langPrefix } from '@/lib/site-paths';
import { Shell } from './Shell';

export const legalPath = (lang: Lang, key: LegalKey) => `${langPrefix(lang)}${LEGAL_PATH[key]}`;

export function LegalPage({ lang, page }: { lang: Lang; page: LegalKey }) {
  const c = LEGAL[page][lang];
  const w = LEGAL_LABELS[lang];
  const paths = forAllLangs((l) => legalPath(l, page));
  const jsonLd = [
    { '@context': 'https://schema.org', '@type': 'WebPage', name: c.title, description: c.description, url: SITE_URL + paths[lang], inLanguage: lang, dateModified: COMPANY.updated },
    breadcrumbLd([{ name: 'LeadDrive CRM', path: homePath(lang) }, { name: c.label, path: paths[lang] }]),
  ];
  const operator = [COMPANY.legalName, COMPANY.brand, COMPANY.taxId && `VÖEN ${COMPANY.taxId}`, COMPANY.address, COMPANY.city[lang]].filter(Boolean).join(' · ');
  return (
    <Shell lang={lang} paths={paths} jsonLd={jsonLd}>
      <article className="article legal wrap">
        <nav className="sol-crumbs" aria-label="Breadcrumb"><a href={homePath(lang)}>{w.home}</a><span>/</span><span>{w.legal}</span></nav>
        <header className="article-head">
          <h1>{c.h1}</h1>
          <p className="article-intro">{c.intro}</p>
          <p className="article-meta">{w.updated}: <time dateTime={COMPANY.updated}>{COMPANY.updated}</time></p>
        </header>
        <div className="article-grid">
          <div className="article-body">
            {c.sections.map((s) => (
              <section key={s.h}>
                <h2>{s.h}</h2>
                {s.p?.map((p) => <p key={p}>{p}</p>)}
                {s.list && <ul>{s.list.map((li) => <li key={li}>{li}</li>)}</ul>}
              </section>
            ))}
            <section className="legal-operator">
              <h2>{w.operator}</h2>
              <p>{operator}</p>
              <p>{w.contactLine} <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> · <a href={COMPANY.phoneHref}>{COMPANY.phone}</a></p>
            </section>
          </div>
          <aside className="article-aside">
            <div><span className="eyebrow">{w.legal}</span><nav>{LEGAL_KEYS.map((k) => <a key={k} href={legalPath(lang, k)} aria-current={k === page ? 'page' : undefined}>{LEGAL[k][lang].label}</a>)}</nav></div>
          </aside>
        </div>
      </article>
    </Shell>
  );
}
