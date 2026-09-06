import type { Metadata } from 'next';

export type Lang = 'ru' | 'az';
export const SITE_URL = 'https://leaddrivecrm.org';
export const PATHS: Record<Lang, string> = { az: '/', ru: '/ru' };

const META: Record<Lang, { title: string; description: string; keywords: string[]; locale: string; ogImage: string }> = {
  az: {
    title: 'LeadDrive CRM — Azərbaycan üçün CRM sistemi: satış, WhatsApp, AI',
    description: 'LeadDrive — Azərbaycan şirkətləri üçün CRM: WhatsApp, Instagram və Telegram bir Inbox-da, satış hunisi, müqavilələr, fakturalar, dəstək və AI köməkçiləri. Demo — WhatsApp ilə.',
    keywords: ['CRM', 'CRM sistemi', 'CRM Azərbaycan', 'CRM Bakı', 'CRM proqramı', 'WhatsApp CRM', 'satış idarəetməsi', 'müştəri bazası', 'AI CRM', 'LeadDrive'],
    locale: 'az_AZ',
    ogImage: '/og-az.png',
  },
  ru: {
    title: 'LeadDrive CRM — CRM-система для Азербайджана: продажи, WhatsApp, AI',
    description: 'LeadDrive — CRM для компаний в Азербайджане: WhatsApp, Instagram и Telegram в одном Inbox, воронка продаж, договоры, счета, поддержка и AI-помощники. Демо — в WhatsApp.',
    keywords: ['CRM', 'CRM система', 'CRM Азербайджан', 'CRM Баку', 'WhatsApp CRM', 'управление продажами', 'клиентская база', 'AI CRM', 'LeadDrive'],
    locale: 'ru_RU',
    ogImage: '/og-ru.png',
  },
};

export function pageMetadata(lang: Lang): Metadata {
  const m = META[lang];
  const other: Lang = lang === 'az' ? 'ru' : 'az';
  return {
    metadataBase: new URL(SITE_URL),
    title: m.title,
    description: m.description,
    keywords: m.keywords,
    alternates: { canonical: PATHS[lang], languages: { az: PATHS.az, ru: PATHS.ru, 'x-default': PATHS.az } },
    openGraph: { type: 'website', url: PATHS[lang], siteName: 'LeadDrive CRM', title: m.title, description: m.description, locale: m.locale, alternateLocale: [META[other].locale], images: [{ url: m.ogImage, width: 1200, height: 630, alt: 'LeadDrive CRM' }] },
    twitter: { card: 'summary_large_image', title: m.title, description: m.description, images: [m.ogImage] },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
    icons: { icon: '/favicon.svg' },
  };
}

/** JSON-LD: organisation, website, software product and the visible FAQ. Only facts shown on the page. */
export function jsonLd(lang: Lang, questions: string[][]) {
  const m = META[lang];
  const url = SITE_URL + PATHS[lang];
  return [
    { '@context': 'https://schema.org', '@type': 'Organization', name: 'LeadDrive', url: SITE_URL, logo: SITE_URL + '/favicon.svg', contactPoint: [{ '@type': 'ContactPoint', contactType: 'sales', telephone: '+994512060838', availableLanguage: ['az', 'ru', 'en'] }] },
    { '@context': 'https://schema.org', '@type': 'WebSite', name: 'LeadDrive CRM', url: SITE_URL, inLanguage: lang },
    { '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'LeadDrive CRM', applicationCategory: 'BusinessApplication', operatingSystem: 'Web', url, description: m.description, inLanguage: lang, offers: { '@type': 'Offer', availability: 'https://schema.org/InStock', url: 'https://wa.me/994512060838' } },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: questions.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
  ];
}
