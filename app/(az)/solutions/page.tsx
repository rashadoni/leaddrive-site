import type { Metadata } from 'next';
import { SolutionsHub } from '@/components/marketing/SolutionsHub';
import { HUB_COPY } from '@/lib/hub-copy';
import { localizedMetadata } from '@/lib/page-seo';
import { forAllLangs, hubPath } from '@/lib/site-paths';

const LANG = 'az' as const;
const c = HUB_COPY[LANG];
export const metadata: Metadata = localizedMetadata({ lang: LANG, paths: forAllLangs(hubPath), title: c.title, description: c.description, keywords: [...c.keywords] });
export default function Page() { return <SolutionsHub lang={LANG} />; }
