import type { Lang } from './product-map';
import { ARTICLES_A } from './articles-a';
import { ARTICLES_B } from './articles-b';

export type ArticleSection = { h2: string; p?: string[]; list?: string[] };
export type ArticleCopy = { title: string; description: string; keywords: string[]; h1: string; intro: string; sections: ArticleSection[] };
export type Article = { slug: string; date: string; solutions: string[]; copy: Record<Lang, ArticleCopy> };

export const BLOG_COPY: Record<Lang, { title: string; description: string; keywords: string[]; label: string; h1: string; h2: string; intro: string; read: string; related: string; more: string; home: string; published: string; solutions: string }> = {
  ru: { title: 'Блог LeadDrive — CRM, продажи, поддержка и автоматизация для бизнеса в Азербайджане', description: 'Практические статьи о CRM: что такое CRM, как выбрать систему в Азербайджане, WhatsApp Business API, SLA, конверсия воронки, полевые продажи, AI, договоры, дебиторка и NPS.', keywords: ['блог CRM', 'статьи о CRM', 'продажи', 'автоматизация бизнеса', 'CRM Азербайджан'], label: 'Блог', h1: 'Блог LeadDrive.', h2: 'Практика вместо теории.', intro: 'Короткие статьи о том, как устроены продажи, поддержка и автоматизация в компаниях Азербайджана. Каждая заканчивается тем, что можно настроить в CRM уже сегодня.', read: 'Читать', related: 'Решения по теме', more: 'Другие статьи', home: 'Главная', published: 'Опубликовано', solutions: 'Решения' },
  az: { title: 'LeadDrive bloqu — Azərbaycan biznesi üçün CRM, satış, dəstək və avtomatlaşdırma', description: 'CRM haqqında praktik məqalələr: CRM nədir, Azərbaycanda sistem necə seçməli, WhatsApp Business API, SLA, pipeline konversiyası, sahə satışları, AI, müqavilələr, debitor borcu və NPS.', keywords: ['CRM bloq', 'CRM məqalələr', 'satış', 'biznes avtomatlaşdırması', 'CRM Azərbaycan'], label: 'Bloq', h1: 'LeadDrive bloqu.', h2: 'Nəzəriyyə yox, praktika.', intro: 'Azərbaycan şirkətlərində satış, dəstək və avtomatlaşdırmanın necə qurulduğu haqqında qısa məqalələr. Hər biri bu gün CRM-də tənzimlənə biləcək şeylə bitir.', read: 'Oxu', related: 'Mövzu üzrə həllər', more: 'Digər məqalələr', home: 'Ana səhifə', published: 'Dərc olunub', solutions: 'Həllər' },
  en: { title: 'LeadDrive blog — CRM, sales, support and automation for business in Azerbaijan', description: 'Practical articles on CRM: what a CRM is, how to choose one in Azerbaijan, WhatsApp Business API, SLA, funnel conversion, field sales, AI, contracts, receivables and NPS.', keywords: ['CRM blog', 'CRM articles', 'sales', 'business automation', 'CRM Azerbaijan'], label: 'Blog', h1: 'LeadDrive blog.', h2: 'Practice instead of theory.', intro: 'Short articles on how sales, support and automation work in companies in Azerbaijan. Each one ends with something you can configure in the CRM today.', read: 'Read', related: 'Related solutions', more: 'Other articles', home: 'Home', published: 'Published', solutions: 'Solutions' },
};

export const ARTICLES: Article[] = [...ARTICLES_A, ...ARTICLES_B];
export const articleBySlug = (slug: string) => ARTICLES.find((a) => a.slug === slug);
