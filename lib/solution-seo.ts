import type { Metadata } from 'next';
import type { Lang } from './product-map';
import { SITE_URL } from './seo';
import { solutionPath, type Solution } from './solutions';

const LOCALE: Record<Lang, string> = { az: 'az_AZ', ru: 'ru_RU', en: 'en_US' };

/** Per-slug metadata: canonical + hreflang for the three language versions of the same solution. */
export function solutionMetadata(s: Solution, lang: Lang): Metadata {
  const c = s.copy[lang];
  const path = solutionPath(lang, s.slug);
  const others = (['az', 'ru', 'en'] as Lang[]).filter((x) => x !== lang);
  return {
    metadataBase: new URL(SITE_URL),
    title: c.title,
    description: c.description,
    keywords: c.keywords,
    alternates: { canonical: path, languages: { az: solutionPath('az', s.slug), ru: solutionPath('ru', s.slug), en: solutionPath('en', s.slug), 'x-default': solutionPath('az', s.slug) } },
    openGraph: { type: 'website', url: path, siteName: 'LeadDrive CRM', title: c.title, description: c.description, locale: LOCALE[lang], alternateLocale: others.map((x) => LOCALE[x]), images: [{ url: `/og-${lang}.png`, width: 1200, height: 630, alt: 'LeadDrive CRM' }] },
    twitter: { card: 'summary_large_image', title: c.title, description: c.description, images: [`/og-${lang}.png`] },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
    icons: { icon: '/favicon.svg' },
  };
}
