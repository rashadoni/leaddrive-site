'use client';

import { Bell, Check, MessageCircle, Music2 } from 'lucide-react';
import type { Lang } from '@/lib/product-map';

export type CapKind = 'social' | 'risk' | 'score' | 'call' | 'remind' | 'tasks';

export const CAPS: Record<Lang, { kind: CapKind; title: string; sub: string }[]> = {
  az: [
    { kind: 'social', title: 'Müştərilərlə sosial şəbəkələrdə yazışır', sub: 'WhatsApp, Instagram, TikTok, Facebook' },
    { kind: 'risk', title: 'Sövdələşmə risklərini təhlil edir', sub: 'Da Vinci siqnalları' },
    { kind: 'score', title: 'Lidləri qiymətləndirir, qaynarları eskalasiya edir', sub: 'Inbox → lid → menecer' },
    { kind: 'call', title: 'Zəngi dinləyib xülasə yazır', sub: 'mövzular, əhval, tapşırıqlar' },
    { kind: 'remind', title: 'Ödəniş və uzadılma xatırlatmaları göndərir', sub: 'faktura, müqavilə' },
    { kind: 'tasks', title: 'Tapşırıq yaradır və görüşə hazırlayır', sub: 'təqvim, xülasə' },
  ],
  ru: [
    { kind: 'social', title: 'Общается с клиентами в соцсетях', sub: 'WhatsApp, Instagram, TikTok, Facebook' },
    { kind: 'risk', title: 'Анализирует риски по сделкам', sub: 'сигналы Da Vinci' },
    { kind: 'score', title: 'Оценивает лиды, эскалирует горячие', sub: 'Inbox → лид → менеджер' },
    { kind: 'call', title: 'Слушает звонок и пишет резюме', sub: 'темы, настроение, задачи' },
    { kind: 'remind', title: 'Напоминает об оплате и продлении', sub: 'счёт, договор' },
    { kind: 'tasks', title: 'Создаёт задачи и готовит к встрече', sub: 'календарь, резюме' },
  ],
  en: [
    { kind: 'social', title: 'Talks to customers on social channels', sub: 'WhatsApp, Instagram, TikTok, Facebook' },
    { kind: 'risk', title: 'Analyses deal risks', sub: 'Da Vinci signals' },
    { kind: 'score', title: 'Scores leads, escalates the hot ones', sub: 'inbox → lead → manager' },
    { kind: 'call', title: 'Listens to the call and writes a summary', sub: 'topics, mood, tasks' },
    { kind: 'remind', title: 'Sends payment and renewal reminders', sub: 'invoice, contract' },
    { kind: 'tasks', title: 'Creates tasks and prepares the meeting', sub: 'calendar, summary' },
  ],
};

/** Small animated illustrations. Brand marks are simplified colour glyphs, not official logos. */
export function CapArt({ kind }: { kind: CapKind }) {
  switch (kind) {
    case 'social':
      return (
        <span className="cap-art cap-social" aria-hidden="true">
          <i className="s-wa"><MessageCircle size={13} /></i>
          <i className="s-ig"><b /></i>
          <i className="s-tt"><Music2 size={12} /></i>
          <i className="s-fb"><span>f</span></i>
        </span>
      );
    case 'risk':
      return (
        <span className="cap-art cap-risk" aria-hidden="true">
          <svg viewBox="0 0 64 40">
            <rect x="0" y="0" width="64" height="40" rx="6" fill="#fff4ef" />
            <polyline className="risk-line" points="4,30 14,24 24,27 34,16 44,20 54,8 60,10" fill="none" stroke="#e84820" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            <circle className="risk-dot" cx="54" cy="8" r="3.2" fill="#e84820" />
          </svg>
        </span>
      );
    case 'score':
      return (
        <span className="cap-art cap-score" aria-hidden="true">
          <i style={{ ['--h' as string]: '35%' }} /><i style={{ ['--h' as string]: '60%' }} /><i className="hot" style={{ ['--h' as string]: '95%' }} />
        </span>
      );
    case 'call':
      return (
        <span className="cap-art cap-call" aria-hidden="true">
          <i /><i /><i /><i /><i />
        </span>
      );
    case 'remind':
      return (
        <span className="cap-art cap-remind" aria-hidden="true">
          <Bell size={20} /><b>2</b>
        </span>
      );
    case 'tasks':
      return (
        <span className="cap-art cap-tasks" aria-hidden="true">
          <i><Check size={10} /></i><i><Check size={10} /></i><i><Check size={10} /></i>
        </span>
      );
  }
}
