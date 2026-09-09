import type { Metadata } from 'next';
import { LegalPage } from '@/components/marketing/LegalPage';
import { LEGAL, LEGAL_PATH } from '@/lib/legal-copy';
import { localizedMetadata } from '@/lib/page-seo';
import { forAllLangs, langPrefix } from '@/lib/site-paths';

const LANG = 'en' as const;
const KEY = 'terms-of-use' as const;
const c = LEGAL[KEY][LANG];
export const metadata: Metadata = localizedMetadata({ lang: LANG, paths: forAllLangs((l) => `${langPrefix(l)}${LEGAL_PATH[KEY]}`), title: c.title, description: c.description });
export default function Page() { return <LegalPage lang={LANG} page={KEY} />; }
