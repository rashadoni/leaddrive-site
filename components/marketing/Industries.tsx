'use client';

import { TypedH2 } from './Typewriter';

import { Check } from 'lucide-react';
import { ICONS } from '@/components/marketing/ProductMap';
import { publicIndustries, type Lang } from '@/lib/product-map';

export type IndustriesCopy = { eyebrow: string; title1: string; title2: string; intro: string; sectionsLabel: string; note: string };

/**
 * Industry sections that exist in the CRM (M14–M18). Shown as scenarios with the
 * sections they contain; no packaged-vertical promises.
 */
export function Industries({ lang, copy }: { lang: Lang; copy: IndustriesCopy }) {
  const items = publicIndustries();
  if (!items.length) return null;
  return (
    <section className="industries" id="industries">
      <div className="wrap">
        <div className="section-heading">
          <div>
            <span className="eyebrow">{copy.eyebrow}</span>
            <TypedH2 a={copy.title1} b={copy.title2} />
          </div>
          <p>{copy.intro}</p>
        </div>
        <div className="industry-grid">
          {items.map((i) => {
            const Icon = ICONS[i.icon];
            return (
              <article className="industry-card" key={i.id}>
                <span className="industry-icon"><Icon size={20} /></span>
                <h3>{i.title[lang]}</h3>
                <p>{i.summary[lang]}</p>
                <span className="industry-label">{copy.sectionsLabel}</span>
                <ul>
                  {i.sections.map((s) => (
                    <li key={s.ru}><Check size={14} />{s[lang]}</li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
        <p className="industry-note">{copy.note}</p>
      </div>
    </section>
  );
}
