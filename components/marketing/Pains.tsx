'use client';

import { TypedH2 } from './Typewriter';

import { ArrowRight, Camera, Check, Clock3, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { MODULES, PAINS, siteNumbers, type Lang, type SceneKind } from '@/lib/product-map';
import { solutionPath } from '@/lib/solutions';

const SOLUTION_BY_DOMAIN: Record<string, string> = { omni: 'whatsapp-crm', sales: 'sales-crm', contracts: 'contract-management', finance: 'invoicing-finance', field: 'field-sales-crm', support: 'support-helpdesk-crm' };

const COPY = {
  ru: { eyebrow: 'ЧТО МЕНЯЕТСЯ С LEADDRIVE', t1: 'Шесть привычных', t2: 'потерь. И как их закрыть.', intro: 'Каждая карточка — реальный экран CRM, а не обещание. Нажмите на модуль, чтобы увидеть его в карте продукта.', pain: 'Боль', solution: 'Решение', more: 'Подробнее о решении', n: { domains: 'направлений', modules: 'модулей', sections: 'разделов', channels: 'каналов', autopilot: 'AI-сценариев', industries: 'отраслей' } },
  az: { eyebrow: 'LEADDRIVE İLƏ NƏ DƏYİŞİR', t1: 'Altı tanış itki.', t2: 'Və onları necə bağlamaq.', intro: 'Hər kart vəd deyil, CRM-in real ekranıdır. Modulu məhsul xəritəsində görmək üçün ona toxunun.', pain: 'Ağrı', solution: 'Həll', more: 'Həll haqqında ətraflı', n: { domains: 'istiqamət', modules: 'modul', sections: 'bölmə', channels: 'kanal', autopilot: 'AI ssenarisi', industries: 'sahə' } },
  en: { eyebrow: 'WHAT CHANGES WITH LEADDRIVE', t1: 'Six familiar losses.', t2: 'And how to close them.', intro: 'Every card is a real CRM screen, not a promise. Tap a module to see it on the product map.', pain: 'Pain', solution: 'Solution', more: 'More about the solution', n: { domains: 'areas', modules: 'modules', sections: 'sections', channels: 'channels', autopilot: 'AI scenarios', industries: 'industries' } },
} as const;

const SCENE: Record<Lang, Record<string, string>> = {
  az: { s0: 'dəq', s1: 'Qiyməti deyə bilərsiniz?', s2: 'cavabsız', s3: 'AI qaralama', s4: 'Zəng növbəsi', s5: 'Leyla — geri zəng', s6: 'Rauf — təklif', s7: 'Tapşırıq yaradıldı: 2 gün', s8: 'Hüquqşünas', s9: 'Maliyyə', s10: 'Rəhbər', s11: 'İmza', s12: 'Əməkdaşlıq şərtləri', s13: 'Uzadılma: 30 gün', s14: 'Gecikir', s15: 'Xatırlatma göndərildi', s16: 'Gəlirlilik: müştəri üzrə', s17: 'Fotohesabat təsdiqləndi', s18: 'L2-yə eskalasiya', s19: 'Makro: sürətli bağlama', s20: 'Bilik bazası: 22 məqalə' },
  ru: { s0: 'мин', s1: 'Подскажите цену?', s2: 'без ответа', s3: 'AI-черновик', s4: 'Очередь звонков', s5: 'Лейла — перезвонить', s6: 'Рауф — предложение', s7: 'Задача создана: срок 2 дня', s8: 'Юрист', s9: 'Финансы', s10: 'Руководитель', s11: 'Подпись', s12: 'Условия сотрудничества', s13: 'Продление через 30 дней', s14: 'Просрочен', s15: 'Напоминание отправлено', s16: 'Рентабельность: по клиенту', s17: 'Фотоотчёт подтверждён', s18: 'Эскалация на L2', s19: 'Макрос: быстрое закрытие', s20: 'База знаний: 22 статьи' },
  en: { s0: 'min', s1: 'Could you tell me the price?', s2: 'unanswered', s3: 'AI draft', s4: 'Call queue', s5: 'Leyla — call back', s6: 'Rauf — proposal', s7: 'Task created: due in 2 days', s8: 'Legal', s9: 'Finance', s10: 'Head', s11: 'Signature', s12: 'Terms of cooperation', s13: 'Renewal in 30 days', s14: 'Overdue', s15: 'Reminder sent', s16: 'Profitability: per customer', s17: 'Photo report approved', s18: 'Escalated to L2', s19: 'Macro: quick close', s20: 'Knowledge base: 22 articles' },
};

/** Small CSS-only scenes. Copy inside is illustrative, values are not real CRM data. */
export function Scene({ kind, lang }: { kind: SceneKind; lang: Lang }) {
  const w = SCENE[lang];
  switch (kind) {
    case 'inbox':
      return (
        <div className="mini mini-inbox" aria-hidden="true">
          <div className="mini-row"><span className="dot wa" /><b>WhatsApp</b><em>2 {w.s0}</em></div>
          <div className="mini-bubble">{w.s1}</div>
          <div className="mini-row"><span className="dot ig" /><b>Instagram</b><em className="warn">{w.s2}</em></div>
          <div className="mini-row"><span className="dot tg" /><b>Telegram</b><em>{w.s3}</em></div>
        </div>
      );
    case 'calls':
      return (
        <div className="mini mini-calls" aria-hidden="true">
          <div className="mini-head"><Phone size={13} />{w.s4}<em>3</em></div>
          <div className="mini-line"><span className="ok" />{w.s5}<i>14:30</i></div>
          <div className="mini-line"><span className="ok" />{w.s6}<i>15:00</i></div>
          <div className="mini-task"><Check size={12} />{w.s7}</div>
        </div>
      );
    case 'contract':
      return (
        <div className="mini mini-contract" aria-hidden="true">
          <div className="mini-steps"><span className="done">{w.s8}</span><span className="done">{w.s9}</span><span className="now">{w.s10}</span><span>{w.s11}</span></div>
          <div className="mini-line"><b>v3</b>{w.s12}<i>e-imza</i></div>
          <div className="mini-line muted"><Clock3 size={12} />{w.s13}</div>
        </div>
      );
    case 'invoice':
      return (
        <div className="mini mini-invoice" aria-hidden="true">
          <div className="mini-head">INV-0148<em className="late">{w.s14}</em></div>
          <div className="mini-bar"><span style={{ width: '62%' }} /></div>
          <div className="mini-line"><span className="ok" />{w.s15}</div>
          <div className="mini-line muted">{w.s16}</div>
        </div>
      );
    case 'field':
      return (
        <div className="mini mini-field" aria-hidden="true">
          <div className="mini-map"><span className="pin p1"><MapPin size={12} /></span><span className="pin p2"><MapPin size={12} /></span><span className="pin p3"><MapPin size={12} /></span><i className="route" /></div>
          <div className="mini-line"><Camera size={12} />{w.s17}<i>GPS</i></div>
        </div>
      );
    case 'support':
      return (
        <div className="mini mini-support" aria-hidden="true">
          <div className="mini-head"><ShieldCheck size={13} />TK-0911<em>SLA 3:40</em></div>
          <div className="mini-line"><span className="ok" />{w.s18}</div>
          <div className="mini-line"><span className="ok" />{w.s19}</div>
          <div className="mini-line muted">{w.s20}</div>
        </div>
      );
  }
}

export function Pains({ lang }: { lang: Lang }) {
  const c = COPY[lang];
  const n = siteNumbers();
  const numbers: [string, string][] = [[String(n.modules), c.n.modules], [`${n.sections}+`, c.n.sections], [String(n.channels), c.n.channels], [String(n.autopilot), c.n.autopilot], [String(n.industries), c.n.industries]];
  return (
    <section className="pains" id="pains">
      <div className="wrap">
        <div className="section-heading">
          <div>
            <span className="eyebrow">{c.eyebrow}</span>
            <TypedH2 a={c.t1} b={c.t2} />
          </div>
          <p>{c.intro}</p>
        </div>
        <ul className="numbers" aria-label="LeadDrive">
          {numbers.map(([v, label]) => (<li key={label}><strong>{v}</strong><span>{label}</span></li>))}
        </ul>
        <div className="pain-grid">
          {PAINS.map((p) => {
            const mods = p.modules.map((id) => MODULES.find((m) => m.id === id)).filter((m): m is NonNullable<typeof m> => !!m && m.status === 'confirmed');
            return (
              <article className="pain-card" key={p.id}>
                <Scene kind={p.scene} lang={lang} />
                <div className="pain-body">
                  <span className="pain-label">{c.pain}</span>
                  <p className="pain-text">{p.pain[lang]}</p>
                  <span className="pain-label sol"><ArrowRight size={13} />{c.solution}</span>
                  <p className="pain-sol">{p.solution[lang]}</p>
                  <div className="pain-chips">
                    {mods.map((m) => (<a key={m.id} href={`#map-${p.domainId}`}>{m.title[lang]}</a>))}
                  </div>
                  {SOLUTION_BY_DOMAIN[p.domainId] && <a className="pain-more" href={solutionPath(lang, SOLUTION_BY_DOMAIN[p.domainId])}>{c.more}<ArrowRight size={14} /></a>}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
