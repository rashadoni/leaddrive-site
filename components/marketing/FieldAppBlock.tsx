import { Check } from 'lucide-react';
import type { Lang } from '@/lib/product-map';
import { LEGAL_PATH } from '@/lib/legal-copy';
import { langPrefix } from '@/lib/site-paths';

/**
 * The agents' Android app on the field sales solution page. Facts only: the
 * screenshot is the real app on a tablet with demo data (2026-09-14), and the
 * app is not on Google Play yet — say "soon", never show a store badge that
 * leads nowhere. Swap the note for a Google Play link once it is published.
 */
const COPY = {
  az: {
    eyebrow: 'Agentlər üçün mobil tətbiq',
    title: 'LeadDrive Route Field — Android telefon və planşet üçün',
    intro: 'Marşrut, ziyarət və tapşırıqlar agentin əlində; rəhbər eyni məlumatları CRM-də görür.',
    points: [
      'Bugünkü marşrut və növbəti nöqtə bir ekranda',
      'GPS ilə ziyarətə giriş-çıxış, tarix, vaxt və koordinatlı fotolar',
      'İnternet olmadan işləyir, bağlantı gələndə göndərir',
      'Azərbaycan, rus və ingilis dilləri',
    ],
    note: 'Yer yalnız iş günü ərzində, bildiriş göstərilərkən toplanır. Tezliklə Google Play-da.',
    privacy: 'Tətbiqin məxfilik siyasəti',
    alt: 'LeadDrive Route Field planşetdə: marşrut nöqtələri və «Marşruta başla»',
  },
  ru: {
    eyebrow: 'Мобильное приложение для агентов',
    title: 'LeadDrive Route Field — для телефонов и планшетов на Android',
    intro: 'Маршрут, визиты и задачи у агента в руках; руководитель видит те же данные в CRM.',
    points: [
      'Сегодняшний маршрут и следующая точка на одном экране',
      'Вход и выход с визита по GPS, фото с датой, временем и координатами',
      'Работает без интернета и отправляет, когда связь вернётся',
      'Азербайджанский, русский и английский',
    ],
    note: 'Местоположение собирается только в рабочий день, при видимом уведомлении. Скоро в Google Play.',
    privacy: 'Политика конфиденциальности приложения',
    alt: 'LeadDrive Route Field на планшете: точки маршрута и «Начать маршрут»',
  },
  en: {
    eyebrow: 'Mobile app for agents',
    title: 'LeadDrive Route Field — for Android phones and tablets',
    intro: 'Route, visits and tasks in the agent’s hands; the manager sees the same data in the CRM.',
    points: [
      "Today's route and the next stop on one screen",
      'GPS check-in and check-out, photos stamped with date, time and coordinates',
      'Works offline and sends when the connection returns',
      'Azerbaijani, Russian and English',
    ],
    note: 'Location is collected only during the workday, while a notification is shown. Coming soon to Google Play.',
    privacy: 'App privacy policy',
    alt: 'LeadDrive Route Field on a tablet: route stops and “Start route”',
  },
} as const;

export function FieldAppBlock({ lang }: { lang: Lang }) {
  const c = COPY[lang];
  return (
    <section className="sol-app wrap" id="mobile-app">
      <div className="sol-app-copy">
        <span className="eyebrow">{c.eyebrow}</span>
        <h2>{c.title}</h2>
        <p>{c.intro}</p>
        <ul>{c.points.map((p) => (<li key={p}><Check size={16} />{p}</li>))}</ul>
        <p className="sol-app-note">{c.note} <a href={`${langPrefix(lang)}${LEGAL_PATH['field-app-privacy']}`}>{c.privacy}</a></p>
      </div>
      <figure className="sol-app-shot">
        <div className="shot-frame"><img src="/screens/field-app-route.webp" width={1400} height={880} alt={c.alt} loading="lazy" decoding="async" /></div>
      </figure>
    </section>
  );
}
