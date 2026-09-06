import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ComparePage } from '@/components/marketing/ComparePage';
import { COMPARISONS, comparisonBySlug } from '@/lib/compare';
import { localizedMetadata } from '@/lib/page-seo';
import { comparePath, forAllLangs } from '@/lib/site-paths';

const LANG = 'en' as const;
type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return COMPARISONS.map((c) => ({ slug: c.slug })); }

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug } = await props.params;
  const cmp = comparisonBySlug(slug);
  if (!cmp) return { title: 'LeadDrive CRM', robots: { index: false, follow: false } };
  const c = cmp.copy[LANG];
  return localizedMetadata({ lang: LANG, paths: forAllLangs((l) => comparePath(l, cmp.slug)), title: c.title, description: c.description, keywords: c.keywords });
}

export default async function Page(props: Props) {
  const { slug } = await props.params;
  const cmp = comparisonBySlug(slug);
  if (!cmp) notFound();
  return <ComparePage comparison={cmp} lang={LANG} />;
}
