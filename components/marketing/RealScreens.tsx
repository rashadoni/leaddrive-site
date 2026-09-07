'use client';

import type { Lang } from '@/lib/product-map';
import { solutionPath } from '@/lib/solutions';

type Shot = { src: string; w: number; h: number; slug: string; title: Record<Lang, string>; text: Record<Lang, string> };

const SHOTS: Shot[] = [
  { src: '/screens/inbox.webp', w: 1470, h: 686, slug: 'whatsapp-crm', title: { az: 'Gələn qutusu: WhatsApp', ru: 'Inbox: WhatsApp', en: 'Inbox: WhatsApp' }, text: { az: 'AI agent cavab verib, lid yaradılıb, məsul şəxs təyin olunub. Adlar və nömrələr gizlədilib.', ru: 'AI-агент ответил, лид создан, ответственный назначен. Имена и номера скрыты.', en: 'The AI agent replied, a lead was created, an owner assigned. Names and numbers are hidden.' } },
  { src: '/screens/forecast.webp', w: 1470, h: 598, slug: 'sales-crm', title: { az: 'Satış proqnozu', ru: 'Прогноз продаж', en: 'Sales forecast' }, text: { az: '6 aylıq gəlir proqnozu və menecerlər üzrə rüblük kvotaların icrası.', ru: 'Прогноз выручки на 6 месяцев и исполнение квартальных квот по менеджерам.', en: 'A six-month revenue forecast and quarterly quota attainment per manager.' } },
  { src: '/screens/leads.webp', w: 1470, h: 596, slug: 'sales-crm', title: { az: 'Lid analitikası', ru: 'Аналитика лидов', en: 'Lead analytics' }, text: { az: 'Konversiya, orta bal, boru kəməri dəyəri və lidlərin status, bal və mənbə üzrə paylanması.', ru: 'Конверсия, средний балл, стоимость пайплайна и распределение лидов по статусу, баллу и источнику.', en: 'Conversion, average score, pipeline value and lead distribution by status, score and source.' } },
  { src: '/screens/deal.webp', w: 1568, h: 690, slug: 'sales-crm', title: { az: 'Sövdələşmə kartı', ru: 'Карточка сделки', en: 'Deal card' }, text: { az: '200 000 USD, mərhələ «Danışıqlar», AI proqnozu 51% və risklər: 999 gündür aktivlik yoxdur. Adlar dəyişdirilib.', ru: '200 000 USD, стадия «Переговоры», AI-прогноз 51% и риски: нет активности 999 дней. Имена изменены.', en: '200,000 USD, stage “Negotiation”, AI forecast 51% and risks: no activity for 999 days. Names changed.' } },
];

const COPY = {
  az: { eyebrow: 'REAL EKRANLAR', t1: 'Bu, təqdimat deyil.', t2: 'CRM-in özüdür.', intro: 'Aşağıdakı şəkillər LeadDrive-ın işləyən ekranlarından çəkilib. Retuş yoxdur, yalnız müştəri adları və nömrələri gizlədilib.', more: 'Həll səhifəsi' },
  ru: { eyebrow: 'РЕАЛЬНЫЕ ЭКРАНЫ', t1: 'Это не презентация.', t2: 'Это сама CRM.', intro: 'Снимки ниже сделаны с работающих экранов LeadDrive. Без ретуши, скрыты только имена и номера клиентов.', more: 'Страница решения' },
  en: { eyebrow: 'REAL SCREENS', t1: 'This is not a mockup.', t2: 'This is the CRM itself.', intro: 'The images below are taken from working LeadDrive screens. No retouching; only customer names and numbers are hidden.', more: 'Solution page' },
} as const;

export const HERO_SHOT: Record<Lang, string> = { az: 'Real ekran: satış hunisi və sövdələşmələr', ru: 'Реальный экран: воронка и сделки', en: 'Real screen: pipeline and deals' };

export function HeroShot({ lang }: { lang: Lang }) {
  return (
    <figure className="hero-shot" id="product">
      <div className="shot-frame"><span className="shot-dots" aria-hidden="true"><i /><i /><i /></span><img src="/screens/deals.webp" width={1470} height={614} alt={HERO_SHOT[lang]} fetchPriority="high" decoding="async" /></div>
      <figcaption>{HERO_SHOT[lang]}</figcaption>
    </figure>
  );
}

export function RealScreens({ lang }: { lang: Lang }) {
  const c = COPY[lang];
  return (
    <section className="screens wrap" id="screens">
      <div className="section-heading">
        <div><span className="eyebrow">{c.eyebrow}</span><h2>{c.t1}<br /><em>{c.t2}</em></h2></div>
        <p>{c.intro}</p>
      </div>
      <div className="screens-grid">
        {SHOTS.map((s) => (
          <figure className="screen" key={s.src}>
            <div className="shot-frame"><span className="shot-dots" aria-hidden="true"><i /><i /><i /></span><img src={s.src} width={s.w} height={s.h} alt={s.title[lang]} loading="lazy" decoding="async" /></div>
            <figcaption><strong>{s.title[lang]}</strong><span>{s.text[lang]}</span><a href={solutionPath(lang, s.slug)}>{c.more} →</a></figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
