'use client';

import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Cta, DEMO, Footer, Header, TEXT } from '@/app/home';
import { DOMAINS, INDUSTRIES, MODULES, type Lang, type SceneKind } from '@/lib/product-map';
import { PATHS, SITE_URL } from '@/lib/seo';
import { SOLUTIONS, SOLUTION_LABEL, solutionPath, type Solution } from '@/lib/solutions';
import { SOLUTION_STEPS, STEPS_LABEL } from '@/lib/solution-steps';
import { hubPath } from '@/lib/site-paths';
import { ICONS } from './ProductMap';
import { Scene } from './Pains';

const COPY = {
  ru: { home: 'Главная', pains: 'Что болит сегодня', painsSub: 'Три ситуации, с которыми к нам приходят чаще всего.', modules: 'Какие модули это закрывают', modulesSub: 'Экраны CRM, которые вы увидите на демо.', map: 'Смотреть на карте продукта', faq: 'Вопросы по этому решению', more: 'Другие решения', demo: 'Показать на демо', industry: 'Отраслевой раздел', all: 'Все решения' },
  az: { home: 'Ana səhifə', pains: 'Bu gün nə ağrıdır', painsSub: 'Bizə ən çox müraciət olunan üç vəziyyət.', modules: 'Bunu hansı modullar bağlayır', modulesSub: 'Demoda görəcəyiniz CRM ekranları.', map: 'Məhsul xəritəsində bax', faq: 'Bu həll üzrə suallar', more: 'Digər həllər', demo: 'Demoda göstərək', industry: 'Sahə bölməsi', all: 'Bütün həllər' },
  en: { home: 'Home', pains: 'What hurts today', painsSub: 'The three situations people most often come to us with.', modules: 'Which modules close it', modulesSub: 'CRM screens you will see on the demo.', map: 'See on the product map', faq: 'Questions about this solution', more: 'Other solutions', demo: 'Show on a demo', industry: 'Industry section', all: 'All solutions' },
} as const;

const SCENE_BY_DOMAIN: Record<string, SceneKind> = { omni: 'inbox', sales: 'calls', contracts: 'contract', finance: 'invoice', field: 'field', support: 'support' };

export const shortTitle = (s: Solution, lang: Lang) => s.copy[lang].h1.replace(/[:：]\s*$/, '');

export function solutionJsonLd(s: Solution, lang: Lang) {
  const c = s.copy[lang];
  const url = SITE_URL + solutionPath(lang, s.slug);
  return [
    { '@context': 'https://schema.org', '@type': 'WebPage', name: c.title, description: c.description, url, inLanguage: lang, isPartOf: { '@type': 'WebSite', name: 'LeadDrive CRM', url: SITE_URL }, about: { '@type': 'SoftwareApplication', name: 'LeadDrive CRM', applicationCategory: 'BusinessApplication', operatingSystem: 'Web', url: SITE_URL + PATHS[lang] } },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'LeadDrive CRM', item: SITE_URL + PATHS[lang] }, { '@type': 'ListItem', position: 2, name: SOLUTION_LABEL[lang], item: SITE_URL + hubPath(lang) }, { '@type': 'ListItem', position: 3, name: shortTitle(s, lang), item: url }] },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: c.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
  ];
}

export function SolutionPage({ solution: s, lang }: { solution: Solution; lang: Lang }) {
  const t = TEXT[lang];
  const c = s.copy[lang];
  const w = COPY[lang];
  const base = PATHS[lang];
  const domain = DOMAINS.find((d) => d.id === s.domainId);
  const industry = s.industryId ? INDUSTRIES.find((i) => i.id === s.industryId) : undefined;
  const mods = s.moduleIds.map((id) => MODULES.find((m) => m.id === id)).filter((m): m is NonNullable<typeof m> => !!m && m.status === 'confirmed');
  const scene = SCENE_BY_DOMAIN[s.domainId];
  const others = SOLUTIONS.filter((x) => x.slug !== s.slug);
  const go = (l: Lang) => { window.location.href = solutionPath(l, s.slug); };
  return (
    <div className="page" id="top">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(solutionJsonLd(s, lang)) }} />
      <Header t={t} lang={lang} setLang={go} onModuleSelect={() => { window.location.href = `${base}#possibilities`; }} base={base} langHref={(l) => solutionPath(l, s.slug)} />
      <main>
        <section className="sol-hero">
          <div className="wrap sol-hero-grid">
            <div>
              <nav className="sol-crumbs" aria-label="Breadcrumb"><a href={base}>{w.home}</a><span>/</span><a href={hubPath(lang)}>{SOLUTION_LABEL[lang]}</a>{domain && <><span>/</span><a href={`${base}#map-${domain.id}`}>{domain.title[lang]}</a></>}</nav>
              <h1>{c.h1}<br /><em>{c.h2}</em></h1>
              <p className="sol-intro">{c.intro}</p>
              <div className="sol-actions"><Cta>{w.demo}</Cta><a className="text-link" href={`${base}#product-map`}>{w.map}<ArrowUpRight size={20} /></a></div>
            </div>
            <div className="sol-visual" aria-hidden="true">
              {scene ? <Scene kind={scene} lang={lang} /> : (
                <div className="mini mini-support"><div className="mini-head">LeadDrive<em>AI</em></div>{mods.slice(0, 3).map((m) => (<div className="mini-line" key={m.id}><span className="ok" />{m.title[lang]}</div>))}</div>
              )}
              {industry && <span className="sol-industry">{w.industry}: {industry.title[lang]}</span>}
            </div>
          </div>
        </section>

        <section className="sol-pains">
          <div className="wrap">
            <div className="section-heading"><div><span className="eyebrow">{w.pains}</span><h2>{w.painsSub}</h2></div></div>
            <ol className="sol-pain-list">{c.pains.map((p, i) => (<li key={p}><span>{String(i + 1).padStart(2, '0')}</span><p>{p}</p></li>))}</ol>
          </div>
        </section>

        <section className="sol-modules wrap" id="modules">
          <div className="section-heading"><div><span className="eyebrow">{w.modules}</span><h2>{w.modulesSub}</h2></div>{domain && <a className="text-link" href={`${base}#map-${domain.id}`}>{domain.title[lang]}<ArrowRight size={18} /></a>}</div>
          <div className="sol-module-grid">
            {mods.map((m) => {
              const Icon = ICONS[m.icon];
              return (
                <article className="sol-module" key={m.id}>
                  <span className="sol-module-icon"><Icon size={20} /></span>
                  <h3>{m.title[lang]}</h3>
                  <p>{m.description[lang]}</p>
                  <ul>{m.capabilities.slice(0, 4).map((cap) => (<li key={cap[lang]}><Check size={14} />{cap[lang]}</li>))}</ul>
                </article>
              );
            })}
          </div>
        </section>

        {SOLUTION_STEPS[s.slug] && (
          <section className="sol-steps wrap">
            <div className="section-heading"><div><span className="eyebrow">{STEPS_LABEL[lang].eyebrow}</span><h2>{STEPS_LABEL[lang].title}</h2></div></div>
            <ol className="sol-step-list">{SOLUTION_STEPS[s.slug][lang].map(([title, text], i) => (<li key={title}><span>{i + 1}</span><div><h3>{title}</h3><p>{text}</p></div></li>))}</ol>
          </section>
        )}
        <section className="faq wrap">
          <h2>{w.faq}</h2>
          <Accordion className="faq-list" multiple={false}>{c.faq.map(([q, a], i) => (<AccordionItem value={i} key={q}><AccordionTrigger>{q}</AccordionTrigger><AccordionContent>{a}</AccordionContent></AccordionItem>))}</Accordion>
        </section>

        <section className="sol-more wrap">
          <span className="eyebrow">{w.more}</span> <a className="sol-more-all" href={hubPath(lang)}>{w.all}<ArrowRight size={14} /></a>
          <nav>{others.map((o) => (<a key={o.slug} href={solutionPath(lang, o.slug)}>{shortTitle(o, lang)}<ArrowUpRight size={15} /></a>))}</nav>
          <p><a className="text-link" href={DEMO} target="_blank" rel="noopener">{t.demo}<ArrowUpRight size={20} /></a></p>
        </section>
      </main>
      <Footer t={t} lang={lang} base={base} />
    </div>
  );
}
