import type { Metadata } from 'next';
import { TermsPage } from '@/components/marketing/TermsPage';
import { localizedMetadata } from '@/lib/page-seo';
import { forAllLangs, termsPath } from '@/lib/site-paths';
import { TERMS_COPY } from '@/lib/terms-copy';

const LANG = 'az' as const;
const c = TERMS_COPY[LANG];
export const metadata: Metadata = localizedMetadata({ lang: LANG, paths: forAllLangs(termsPath), title: c.title, description: c.description });
export default function Page() { return <TermsPage lang={LANG} />; }
