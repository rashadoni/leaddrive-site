import type { Metadata } from 'next';
import type { Lang } from './product-map';
import { SITE_URL } from './seo';

const LOCALE: Record<Lang, string> = { az: 'az_AZ', ru: 'ru_RU', en: 'en_US' };

export type LocalizedPageMeta = { lang: Lang; paths: Record<Lang, string>; title: string; description: string; keywords?: string[]; ogImage?: string; type?: 'website' | 'article'; published?: string; modified?: string };

/** Metadata for a page that exists in the three languages: canonical, hreflang, OG, Twitter, robots. */
export function localizedMetadata(m: LocalizedPageMeta): Metadata {
  const path = m.paths[m.lang];
  const others = (['az', 'ru', 'en'] as Lang[]).filter((x) => x !== m.lang);
  const og = m.ogImage ?? `/og-${m.lang}.png`;
  return {
    metadataBase: new URL(SITE_URL),
    title: m.title,
    description: m.description,
    keywords: m.keywords,
    alternates: { canonical: path, languages: { az: m.paths.az, ru: m.paths.ru, en: m.paths.en, 'x-default': m.paths.az } },
    openGraph: { type: m.type ?? 'website', url: path, siteName: 'LeadDrive CRM', title: m.title, description: m.description, locale: LOCALE[m.lang], alternateLocale: others.map((x) => LOCALE[x]), images: [{ url: og, width: 1200, height: 630, alt: 'LeadDrive CRM' }], ...(m.type === 'article' ? { publishedTime: m.published, modifiedTime: m.modified ?? m.published, authors: ['LeadDrive'] } : {}) },
    twitter: { card: 'summary_large_image', title: m.title, description: m.description, images: [og] },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
    icons: { icon: '/favicon.svg' },
  };
}

export const breadcrumbLd = (items: { name: string; path: string }[]) => ({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: SITE_URL + it.path })) });
export const faqLd = (faq: [string, string][]) => ({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) });
