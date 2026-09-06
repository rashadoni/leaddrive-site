import type { Lang } from './product-map';

/** Language prefix: az is the default language and lives at the root. */
export const langPrefix = (lang: Lang) => (lang === 'az' ? '' : `/${lang}`);
export const homePath = (lang: Lang) => langPrefix(lang) || '/';
export const hubPath = (lang: Lang) => `${langPrefix(lang)}/solutions`;
export const blogPath = (lang: Lang, slug?: string) => `${langPrefix(lang)}/blog${slug ? `/${slug}` : ''}`;
export const comparePath = (lang: Lang, slug: string) => `${langPrefix(lang)}/compare/${slug}`;
export const forAllLangs = (fn: (l: Lang) => string): Record<Lang, string> => ({ az: fn('az'), ru: fn('ru'), en: fn('en') });
