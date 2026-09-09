import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticlePage } from '@/components/marketing/ArticlePage';
import { ARTICLES, articleBySlug } from '@/lib/articles';
import { localizedMetadata } from '@/lib/page-seo';
import { blogPath, forAllLangs } from '@/lib/site-paths';

const LANG = 'az' as const;
type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return ARTICLES.map((a) => ({ slug: a.slug })); }

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug } = await props.params;
  const a = articleBySlug(slug);
  if (!a) return { title: 'LeadDrive CRM', robots: { index: false, follow: false } };
  const c = a.copy[LANG];
  return localizedMetadata({ lang: LANG, paths: forAllLangs((l) => blogPath(l, a.slug)), title: c.title, description: c.description, keywords: c.keywords, type: 'article', published: a.date });
}

export default async function Page(props: Props) {
  const { slug } = await props.params;
  const a = articleBySlug(slug);
  if (!a) notFound();
  return <ArticlePage article={a} lang={LANG} />;
}
