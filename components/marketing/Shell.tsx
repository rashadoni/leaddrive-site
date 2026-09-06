'use client';

import { Footer, Header, TEXT } from '@/app/home';
import type { Lang } from '@/lib/product-map';
import { PATHS } from '@/lib/seo';

/** Header + footer for secondary pages. `paths` gives the same page in each language for the switcher. */
export function Shell({ lang, paths, jsonLd, children }: { lang: Lang; paths: Record<Lang, string>; jsonLd?: object[]; children: React.ReactNode }) {
  const t = TEXT[lang];
  const base = PATHS[lang];
  return (
    <div className="page" id="top">
      {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
      <Header t={t} lang={lang} setLang={(l) => { window.location.href = paths[l]; }} onModuleSelect={() => { window.location.href = `${base}#possibilities`; }} base={base} langHref={(l) => paths[l]} />
      <main>{children}</main>
      <Footer t={t} lang={lang} base={base} />
    </div>
  );
}
