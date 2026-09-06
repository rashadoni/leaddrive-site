import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SolutionPage } from '@/components/marketing/SolutionPage';
import { solutionMetadata } from '@/lib/solution-seo';
import { SOLUTIONS, solutionBySlug } from '@/lib/solutions';

const LANG = 'en' as const;
type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return SOLUTIONS.map((s) => ({ slug: s.slug })); }

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug } = await props.params;
  const s = solutionBySlug(slug);
  return s ? solutionMetadata(s, LANG) : { title: 'LeadDrive CRM', robots: { index: false, follow: false } };
}

export default async function Page(props: Props) {
  const { slug } = await props.params;
  const s = solutionBySlug(slug);
  if (!s) notFound();
  return <SolutionPage solution={s} lang={LANG} />;
}
