'use client';

import { ArrowUpRight } from 'lucide-react';
import { Cta, TEXT } from '@/app/home';
import { ARTICLES, BLOG_COPY, type Article } from '@/lib/articles';
import type { Lang } from '@/lib/product-map';
import { breadcrumbLd } from '@/lib/page-seo';
import { SITE_URL } from '@/lib/seo';
import { blogPath, forAllLangs, homePath } from '@/lib/site-paths';
import { SOLUTIONS, solutionPath } from '@/lib/solutions';
import { Shell } from './Shell';
import { shortTitle } from './SolutionPage';

const MONTHS: Record<Lang, string[]> = {
  az: ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avqust', 'sentyabr', 'oktyabr', 'noyabr', 'dekabr'],
  ru: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
};
/** Own month tables: the Workers runtime has no full ICU locale data. */
const fmt = (date: string, lang: Lang) => { const [y, m, d] = date.split('-').map(Number); return `${d} ${MONTHS[lang][m - 1]} ${y}`; };

export function ArticlePage({ article: a, lang }: { article: Article; lang: Lang }) {
  const c = a.copy[lang];
  const b = BLOG_COPY[lang];
  const paths = forAllLangs((l) => blogPath(l, a.slug));
  const related = a.solutions.map((s) => SOLUTIONS.find((x) => x.slug === s)).filter((s): s is NonNullable<typeof s> => !!s);
  const others = ARTICLES.filter((x) => x.slug !== a.slug).slice(0, 6);
  const jsonLd = [
    { '@context': 'https://schema.org', '@type': 'Article', headline: c.h1, description: c.description, url: SITE_URL + paths[lang], inLanguage: lang, datePublished: a.date, dateModified: a.date, author: { '@type': 'Organization', name: 'LeadDrive', url: SITE_URL }, publisher: { '@type': 'Organization', name: 'LeadDrive', logo: { '@type': 'ImageObject', url: SITE_URL + '/favicon.svg' } }, image: SITE_URL + `/og-${lang}.png`, mainEntityOfPage: SITE_URL + paths[lang] },
    breadcrumbLd([{ name: 'LeadDrive CRM', path: homePath(lang) }, { name: b.label, path: blogPath(lang) }, { name: c.h1, path: paths[lang] }]),
  ];
  return (
    <Shell lang={lang} paths={paths} jsonLd={jsonLd}>
      <article className="article wrap">
        <nav className="sol-crumbs" aria-label="Breadcrumb"><a href={homePath(lang)}>{b.home}</a><span>/</span><a href={blogPath(lang)}>{b.label}</a></nav>
        <header className="article-head">
          <h1>{c.h1}</h1>
          <p className="article-intro">{c.intro}</p>
          <p className="article-meta"><time dateTime={a.date}>{b.published}: {fmt(a.date, lang)}</time> · LeadDrive</p>
        </header>
        <div className="article-grid">
          <div className="article-body">
            {c.sections.map((s) => (
              <section key={s.h2}>
                <h2>{s.h2}</h2>
                {s.p?.map((p) => <p key={p}>{p}</p>)}
                {s.list && <ul>{s.list.map((li) => <li key={li}>{li}</li>)}</ul>}
              </section>
            ))}
            <div className="article-cta"><Cta>{TEXT[lang].demo}</Cta></div>
          </div>
          <aside className="article-aside">
            {related.length > 0 && (<div><span className="eyebrow">{b.related}</span><nav>{related.map((s) => <a key={s.slug} href={solutionPath(lang, s.slug)}>{shortTitle(s, lang)}<ArrowUpRight size={14} /></a>)}</nav></div>)}
            <div><span className="eyebrow">{b.more}</span><nav>{others.map((o) => <a key={o.slug} href={blogPath(lang, o.slug)}>{o.copy[lang].h1}</a>)}</nav></div>
          </aside>
        </div>
      </article>
    </Shell>
  );
}

export function BlogIndex({ lang }: { lang: Lang }) {
  const b = BLOG_COPY[lang];
  const paths = forAllLangs((l) => blogPath(l));
  const jsonLd = [
    { '@context': 'https://schema.org', '@type': 'Blog', name: b.title, description: b.description, url: SITE_URL + paths[lang], inLanguage: lang, blogPost: ARTICLES.map((a) => ({ '@type': 'BlogPosting', headline: a.copy[lang].h1, url: SITE_URL + blogPath(lang, a.slug), datePublished: a.date })) },
    breadcrumbLd([{ name: 'LeadDrive CRM', path: homePath(lang) }, { name: b.label, path: paths[lang] }]),
  ];
  return (
    <Shell lang={lang} paths={paths} jsonLd={jsonLd}>
      <section className="sol-hero hub-hero">
        <div className="wrap">
          <nav className="sol-crumbs" aria-label="Breadcrumb"><a href={homePath(lang)}>{b.home}</a><span>/</span><span>{b.label}</span></nav>
          <h1>{b.h1}<br /><em>{b.h2}</em></h1>
          <p className="sol-intro">{b.intro}</p>
        </div>
      </section>
      <section className="hub wrap">
        <div className="blog-grid">
          {ARTICLES.map((a) => (
            <a className="hub-card" href={blogPath(lang, a.slug)} key={a.slug}>
              <time dateTime={a.date} className="blog-date">{fmt(a.date, lang)}</time>
              <h3>{a.copy[lang].h1}</h3>
              <p>{a.copy[lang].description}</p>
              <span className="hub-more">{b.read}<ArrowUpRight size={15} /></span>
            </a>
          ))}
        </div>
      </section>
    </Shell>
  );
}
