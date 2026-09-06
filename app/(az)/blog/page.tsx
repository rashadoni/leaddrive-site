import type { Metadata } from 'next';
import { BlogIndex } from '@/components/marketing/ArticlePage';
import { BLOG_COPY } from '@/lib/articles';
import { localizedMetadata } from '@/lib/page-seo';
import { blogPath, forAllLangs } from '@/lib/site-paths';

const LANG = 'az' as const;
const c = BLOG_COPY[LANG];
export const metadata: Metadata = localizedMetadata({ lang: LANG, paths: forAllLangs((l) => blogPath(l)), title: c.title, description: c.description, keywords: c.keywords });
export default function Page() { return <BlogIndex lang={LANG} />; }
