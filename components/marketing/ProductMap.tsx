'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight, Bell, BriefcaseBusiness, CalendarDays, ChartNoAxesColumn, Check, FileText, Funnel, Gift, HeartPulse, Landmark, Layers, Lock, MessageCircle, Newspaper, Package, Plug, Quote, Radio, Route, Settings, ShieldCheck, Sparkles, SquareKanban, Target, Timer, Umbrella, Users, Workflow, Zap } from 'lucide-react';
import { publicDomains, publicModules, type IconKey, type Lang } from '@/lib/product-map';

export const ICONS: Record<IconKey, React.ComponentType<{ size?: number }>> = {
  briefcase: BriefcaseBusiness, users: Users, target: Target, file: FileText, gift: Gift, message: MessageCircle, chart: ChartNoAxesColumn, layers: Layers, sparkles: Sparkles, kanban: SquareKanban, package: Package, bell: Bell, funnel: Funnel, calendar: CalendarDays, radio: Radio, timer: Timer, zap: Zap, quote: Quote, route: Route, shield: ShieldCheck,
  settings: Settings, plug: Plug, lock: Lock, workflow: Workflow, heart: HeartPulse, umbrella: Umbrella, landmark: Landmark, newspaper: Newspaper,
};

export type ProductMapCopy = { eyebrow: string; title1: string; title2: string; intro: string; domainsLabel: string; demo: string };

const HASH_PREFIX = '#map-';

export function ProductMap({ lang, copy, demoHref }: { lang: Lang; copy: ProductMapCopy; demoHref: string }) {
  const domains = publicDomains();
  const [active, setActive] = useState(domains[0]?.id ?? '');

  // Footer/domain links use #map-<domain>: select the domain and bring the section into view.
  useEffect(() => {
    const apply = () => {
      const id = window.location.hash.startsWith(HASH_PREFIX) ? window.location.hash.slice(HASH_PREFIX.length) : '';
      if (id && domains.some((d) => d.id === id)) {
        setActive(id);
        // Instant jump: a smooth scroll started inside a hashchange handler can be cancelled by the browser.
        requestAnimationFrame(() => document.getElementById('product-map')?.scrollIntoView({ block: 'start', behavior: 'instant' }));
      }
    };
    apply();
    window.addEventListener('hashchange', apply);
    return () => window.removeEventListener('hashchange', apply);
  }, [domains]);

  const domain = domains.find((d) => d.id === active) ?? domains[0];
  if (!domain) return null;
  const modules = publicModules(domain.id);
  const DomainIcon = ICONS[domain.icon];

  return (
    <section className="product-map wrap" id="product-map">
      <div className="section-heading">
        <div>
          <span className="eyebrow">{copy.eyebrow}</span>
          <h2>{copy.title1}<br /><em>{copy.title2}</em></h2>
        </div>
        <p>{copy.intro}</p>
      </div>
      <div className="map-layout">
        <div className="map-rail" role="tablist" aria-label={copy.domainsLabel}>
          {domains.map((d) => {
            const Icon = ICONS[d.icon];
            return (
              <button key={d.id} role="tab" type="button" aria-selected={d.id === domain.id} className={d.id === domain.id ? 'active' : ''} onClick={() => setActive(d.id)}>
                <Icon size={18} />
                <span>{d.title[lang]}</span>
              </button>
            );
          })}
        </div>
        <div className="map-panel" role="tabpanel" key={domain.id}>
          <header className="map-panel-head">
            <span className="map-domain-icon"><DomainIcon size={22} /></span>
            <div>
              <h3>{domain.title[lang]}</h3>
              <p>{domain.summary[lang]}</p>
            </div>
            <a href={demoHref} className="text-link">{copy.demo}<ArrowUpRight size={18} /></a>
          </header>
          <div className="map-grid">
            {modules.map((m) => {
              const Icon = ICONS[m.icon];
              return (
                <article className="map-card" key={m.id}>
                  <span className="map-card-icon"><Icon size={19} /></span>
                  <h4>{m.title[lang]}</h4>
                  <p>{m.description[lang]}</p>
                  <ul>
                    {m.capabilities.map((c) => (
                      <li key={c.ru}><Check size={15} />{c[lang]}</li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
