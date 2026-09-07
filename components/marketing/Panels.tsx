'use client';

import { Plus } from 'lucide-react';
import type { Lang } from '@/lib/product-map';
import { hubPath } from '@/lib/site-paths';
import { solutionPath } from '@/lib/solutions';

type Panel = { id: string; img?: string; tone: 'photo' | 'orange' | 'green'; title: Record<Lang, string>; chips: Record<Lang, string[]>; href: (lang: Lang) => string };

const PANELS: Panel[] = [
  { id: 'people', img: '/presenter-office.webp', tone: 'photo', title: { ru: 'Люди и AI', az: 'İnsanlar və AI', en: 'People and AI' }, chips: { ru: ['работают вместе'], az: ['birlikdə işləyir'], en: ['working together'] }, href: (l) => solutionPath(l, 'ai-crm') },
  { id: 'cycle', img: '/team-work.webp', tone: 'photo', title: { ru: 'Продажи, поддержка, поле', az: 'Satış, dəstək, sahə', en: 'Sales, support, field' }, chips: { ru: ['одна карточка клиента'], az: ['bir müştəri kartı'], en: ['one customer card'] }, href: (l) => hubPath(l) },
  { id: 'platform', tone: 'orange', title: { ru: 'Одна платформа:', az: 'Bir platforma:', en: 'One platform:' }, chips: { ru: ['12 направлений', '60 модулей'], az: ['12 istiqamət', '60 modul'], en: ['12 areas', '60 modules'] }, href: () => '#product-map' },
  { id: 'industries', img: '/client-meeting.webp', tone: 'photo', title: { ru: 'Отрасли', az: 'Sahələr', en: 'Industries' }, chips: { ru: ['5 готовых разделов'], az: ['5 hazır bölmə'], en: ['5 ready sections'] }, href: () => '#industries' },
  { id: 'local', tone: 'green', title: { ru: 'На азербайджанском', az: 'Azərbaycan dilində', en: 'In Azerbaijani' }, chips: { ru: ['поддержка и внедрение'], az: ['dəstək və tətbiq'], en: ['support and rollout'] }, href: () => '#start' },
];

const LABEL: Record<Lang, string> = { ru: 'Что даёт LeadDrive', az: 'LeadDrive nə verir', en: 'What LeadDrive gives' };

export function Panels({ lang }: { lang: Lang }) {
  return (
    <section className="panels" aria-label={LABEL[lang]}>
      {PANELS.map((p) => (
        <a className={`panel panel-${p.tone} panel-${p.id}`} href={p.href(lang)} key={p.id} style={p.img ? { backgroundImage: `url(${p.img})` } : undefined}>
          {p.tone === 'orange' && <span className="panel-mark" aria-hidden="true">lD</span>}
          {p.tone === 'green' && <span className="panel-az" aria-hidden="true">AZ</span>}
          <span className="panel-body">
            <strong>{p.title[lang]}</strong>
            {p.chips[lang].map((ch) => <span className="panel-chip" key={ch}>{ch}</span>)}
          </span>
          <span className="panel-plus"><Plus size={18} /></span>
        </a>
      ))}
    </section>
  );
}
