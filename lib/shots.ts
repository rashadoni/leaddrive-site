import type { Lang } from './product-map';

/** Real CRM screens captured during the audit (names and numbers hidden where needed). */
export type Shot = { src: string; w: number; h: number; caption: Record<Lang, string> };

export const SHOTS: Record<string, Shot> = {
  deals: { src: '/screens/deals.webp', w: 1470, h: 614, caption: { az: 'Real ekran: satış hunisi və sövdələşmələr', ru: 'Реальный экран: воронка и сделки', en: 'Real screen: pipeline and deals' } },
  inbox: { src: '/screens/inbox.webp', w: 1470, h: 686, caption: { az: 'Real ekran: Gələn qutusu, WhatsApp söhbəti və lid kartı', ru: 'Реальный экран: Inbox, диалог WhatsApp и карточка лида', en: 'Real screen: inbox, a WhatsApp chat and the lead card' } },
  deal: { src: '/screens/deal.webp', w: 1568, h: 690, caption: { az: 'Real ekran: sövdələşmə kartı və AI proqnozu', ru: 'Реальный экран: карточка сделки и AI-прогноз', en: 'Real screen: deal card and AI forecast' } },
  forecast: { src: '/screens/forecast.webp', w: 1470, h: 598, caption: { az: 'Real ekran: satış proqnozu və kvotalar', ru: 'Реальный экран: прогноз продаж и квоты', en: 'Real screen: sales forecast and quotas' } },
  leads: { src: '/screens/leads.webp', w: 1470, h: 596, caption: { az: 'Real ekran: lid analitikası', ru: 'Реальный экран: аналитика лидов', en: 'Real screen: lead analytics' } },
  contract: { src: '/screens/contract.webp', w: 1470, h: 686, caption: { az: 'Real ekran: müqavilə kartı və Advisor riski', ru: 'Реальный экран: карточка договора и риск от Advisor', en: 'Real screen: contract card and Advisor risk' } },
  invoices: { src: '/screens/invoices.webp', w: 1568, h: 701, caption: { az: 'Real ekran: hesab-fakturalar', ru: 'Реальный экран: счета', en: 'Real screen: invoices' } },
  routes: { src: '/screens/routes.webp', w: 1568, h: 701, caption: { az: 'Real ekran: marşrut təqvimi', ru: 'Реальный экран: календарь маршрутов', en: 'Real screen: route calendar' } },
  map: { src: '/screens/map.webp', w: 1568, h: 701, caption: { az: 'Real ekran: canlı xəritə sahə komandası üçün', ru: 'Реальный экран: живая карта полевой команды', en: 'Real screen: live map of the field team' } },
  agent: { src: '/screens/agent.webp', w: 1568, h: 701, caption: { az: 'Real ekran: dəstək agentinin masaüstü, SLA və KPI', ru: 'Реальный экран: рабочий стол агента поддержки, SLA и KPI', en: 'Real screen: support agent desktop, SLA and KPI' } },
  sla: { src: '/screens/sla.webp', w: 1568, h: 701, caption: { az: 'Real ekran: SLA siyasətləri', ru: 'Реальный экран: политики SLA', en: 'Real screen: SLA policies' } },
  kb: { src: '/screens/kb.webp', w: 1568, h: 701, caption: { az: 'Real ekran: bilik bazası', ru: 'Реальный экран: база знаний', en: 'Real screen: knowledge base' } },
  campaign: { src: '/screens/campaign.webp', w: 1470, h: 686, caption: { az: 'Real ekran: kampaniya analitikası', ru: 'Реальный экран: аналитика кампаний', en: 'Real screen: campaign analytics' } },
  advisor: { src: '/screens/advisor.webp', w: 1470, h: 686, caption: { az: 'Real ekran: Da Vinci idarəetmə mərkəzi', ru: 'Реальный экран: центр управления Da Vinci', en: 'Real screen: Da Vinci control centre' } },
  dashboard: { src: '/screens/dashboard.webp', w: 1470, h: 686, caption: { az: 'Real ekran: idarə paneli', ru: 'Реальный экран: панель управления', en: 'Real screen: dashboard' } },
};

export const SOLUTION_SHOT: Record<string, string> = { 'whatsapp-crm': 'inbox', 'sales-crm': 'deals', 'support-helpdesk-crm': 'agent', 'field-sales-crm': 'routes', 'contract-management': 'contract', 'invoicing-finance': 'invoices', 'marketing-automation': 'campaign', 'ai-crm': 'advisor', 'crm-for-clinics': 'dashboard', 'crm-for-insurance': 'sla', 'crm-for-public-sector': 'kb', 'crm-for-media': 'campaign', 'crm-for-utilities': 'map' };

export const ARTICLE_SHOT: Record<string, string> = { 'what-is-crm': 'dashboard', 'how-to-choose-crm-azerbaijan': 'inbox', 'whatsapp-business-api-crm': 'inbox', 'what-is-sla': 'sla', 'sales-funnel-conversion': 'leads', 'field-sales-control': 'routes', 'crm-implementation-steps': 'deals', 'ai-in-crm': 'advisor', 'why-leads-get-lost': 'leads', 'contract-approval-speed': 'contract', 'receivables-reminders': 'invoices', 'nps-customer-feedback': 'campaign' };
