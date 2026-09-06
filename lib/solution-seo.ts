import type { Metadata } from 'next';
import type { Lang } from './product-map';
import { localizedMetadata } from './page-seo';
import { forAllLangs } from './site-paths';
import { solutionPath, type Solution } from './solutions';

/** Per-slug metadata: canonical + hreflang for the three language versions of the same solution, own OG image. */
export function solutionMetadata(s: Solution, lang: Lang): Metadata {
  const c = s.copy[lang];
  return localizedMetadata({ lang, paths: forAllLangs((l) => solutionPath(l, s.slug)), title: c.title, description: c.description, keywords: c.keywords, ogImage: `/og/${lang}-${s.slug}.png` });
}
