'use client';

import { ArrowUpRight } from 'lucide-react';
import { Cta } from '@/app/home';
import { DOMAINS, INDUSTRIES, type Lang } from '@/lib/product-map';
import { SITE_URL } from '@/lib/seo';
import { breadcrumbLd } from '@/lib/page-seo';
import { forAllLangs, homePath, hubPath } from '@/lib/site-paths';
import { SOLUTIONS, solutionPath } from '@/lib/solutions';
import { HUB_COPY } from '@/lib/hub-copy';
import { ICONS } from './ProductMap';
import { Shell } from './Shell';
import { shortTitle } from './SolutionPage';


export function SolutionsHub({ lang }: { lang: Lang }) {
  const c = HUB_COPY[lang];
  const paths = forAllLangs(hubPath);
  const scenarios = SOLUTIONS.filter((s) => !s.industryId);
  const industries = SOLUTIONS.filter((s) => s.industryId);
  const jsonLd = [
    { '@context': 'https://schema.org', '@type': 'CollectionPage', name: c.title, description: c.description, url: SITE_URL + paths[lang], inLanguage: lang, mainEntity: { '@type': 'ItemList', itemListElement: SOLUTIONS.map((s, i) => ({ '@type': 'ListItem', position: i + 1, name: shortTitle(s, lang), url: SITE_URL + solutionPath(lang, s.slug) })) } },
    breadcrumbLd([{ name: 'LeadDrive CRM', path: homePath(lang) }, { name: c.eyebrow, path: paths[lang] }]),
  ];
  const Card = ({ s }: { s: (typeof SOLUTIONS)[number] }) => {
    const domain = DOMAINS.find((d) => d.id === s.domainId);
    const industry = s.industryId ? INDUSTRIES.find((i) => i.id === s.industryId) : undefined;
    const Icon = ICONS[(industry ?? domain)?.icon ?? 'layers'];
    return (
      <a className="hub-card" href={solutionPath(lang, s.slug)}>
        <span className="hub-icon"><Icon size={20} /></span>
        <h3>{shortTitle(s, lang)}</h3>
        <strong>{s.copy[lang].h2}</strong>
        <p>{s.copy[lang].description}</p>
        <span className="hub-more">{domain?.title[lang]}<ArrowUpRight size={15} /></span>
      </a>
    );
  };
  return (
    <Shell lang={lang} paths={paths} jsonLd={jsonLd}>
      <section className="sol-hero hub-hero">
        <div className="wrap">
          <nav className="sol-crumbs" aria-label="Breadcrumb"><a href={homePath(lang)}>{c.home}</a><span>/</span><span>{c.eyebrow}</span></nav>
          <h1>{c.h1}<br /><em>{c.h2}</em></h1>
          <p className="sol-intro">{c.intro}</p>
          <div className="sol-actions"><Cta>{c.demo}</Cta></div>
        </div>
      </section>
      <section className="hub wrap">
        <h2 className="hub-group">{c.scenarios}</h2>
        <div className="hub-grid">{scenarios.map((s) => <Card s={s} key={s.slug} />)}</div>
        <h2 className="hub-group">{c.industries}</h2>
        <div className="hub-grid">{industries.map((s) => <Card s={s} key={s.slug} />)}</div>
      </section>
    </Shell>
  );
}
