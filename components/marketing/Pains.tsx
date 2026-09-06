'use client';

import { ArrowRight, Camera, Check, Clock3, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { MODULES, PAINS, siteNumbers, type Lang, type SceneKind } from '@/lib/product-map';

const COPY = {
  ru: { eyebrow: 'ЧТО МЕНЯЕТСЯ С LEADDRIVE', t1: 'Шесть привычных', t2: 'потерь. И как их закрыть.', intro: 'Каждая карточка — реальный экран CRM, а не обещание. Нажмите на модуль, чтобы увидеть его в карте продукта.', pain: 'Боль', solution: 'Решение', n: { domains: 'направлений', modules: 'модулей', channels: 'каналов', autopilot: 'AI-сценариев', industries: 'отраслей' } },
  az: { eyebrow: 'LEADDRIVE İLƏ NƏ DƏYİŞİR', t1: 'Altı tanış itki.', t2: 'Və onları necə bağlamaq.', intro: 'Hər kart vəd deyil, CRM-in real ekranıdır. Modulu məhsul xəritəsində görmək üçün ona toxunun.', pain: 'Ağrı', solution: 'Həll', n: { domains: 'istiqamət', modules: 'modul', channels: 'kanal', autopilot: 'AI ssenarisi', industries: 'sahə' } },
} as const;

/** Small CSS-only scenes. Copy inside is illustrative, values are not real CRM data. */
function Scene({ kind, lang }: { kind: SceneKind; lang: Lang }) {
  const az = lang === 'az';
  switch (kind) {
    case 'inbox':
      return (
        <div className="mini mini-inbox" aria-hidden="true">
          <div className="mini-row"><span className="dot wa" /><b>WhatsApp</b><em>2 {az ? 'dəq' : 'мин'}</em></div>
          <div className="mini-bubble">{az ? 'Qiyməti deyə bilərsiniz?' : 'Подскажите цену?'}</div>
          <div className="mini-row"><span className="dot ig" /><b>Instagram</b><em className="warn">{az ? 'cavabsız' : 'без ответа'}</em></div>
          <div className="mini-row"><span className="dot tg" /><b>Telegram</b><em>{az ? 'AI qaralama' : 'AI-черновик'}</em></div>
        </div>
      );
    case 'calls':
      return (
        <div className="mini mini-calls" aria-hidden="true">
          <div className="mini-head"><Phone size={13} />{az ? 'Zəng növbəsi' : 'Очередь звонков'}<em>3</em></div>
          <div className="mini-line"><span className="ok" />{az ? 'Leyla — geri zəng' : 'Лейла — перезвонить'}<i>14:30</i></div>
          <div className="mini-line"><span className="ok" />{az ? 'Rauf — təklif' : 'Рауф — предложение'}<i>15:00</i></div>
          <div className="mini-task"><Check size={12} />{az ? 'Tapşırıq yaradıldı: 2 gün' : 'Задача создана: срок 2 дня'}</div>
        </div>
      );
    case 'contract':
      return (
        <div className="mini mini-contract" aria-hidden="true">
          <div className="mini-steps"><span className="done">{az ? 'Hüquqşünas' : 'Юрист'}</span><span className="done">{az ? 'Maliyyə' : 'Финансы'}</span><span className="now">{az ? 'Rəhbər' : 'Руководитель'}</span><span>{az ? 'İmza' : 'Подпись'}</span></div>
          <div className="mini-line"><b>v3</b>{az ? 'Əməkdaşlıq şərtləri' : 'Условия сотрудничества'}<i>e-imza</i></div>
          <div className="mini-line muted"><Clock3 size={12} />{az ? 'Uzadılma: 30 gün' : 'Продление через 30 дней'}</div>
        </div>
      );
    case 'invoice':
      return (
        <div className="mini mini-invoice" aria-hidden="true">
          <div className="mini-head">INV-0148<em className="late">{az ? 'Gecikir' : 'Просрочен'}</em></div>
          <div className="mini-bar"><span style={{ width: '62%' }} /></div>
          <div className="mini-line"><span className="ok" />{az ? 'Xatırlatma göndərildi' : 'Напоминание отправлено'}</div>
          <div className="mini-line muted">{az ? 'Gəlirlilik: müştəri üzrə' : 'Рентабельность: по клиенту'}</div>
        </div>
      );
    case 'field':
      return (
        <div className="mini mini-field" aria-hidden="true">
          <div className="mini-map"><span className="pin p1"><MapPin size={12} /></span><span className="pin p2"><MapPin size={12} /></span><span className="pin p3"><MapPin size={12} /></span><i className="route" /></div>
          <div className="mini-line"><Camera size={12} />{az ? 'Fotohesabat təsdiqləndi' : 'Фотоотчёт подтверждён'}<i>GPS</i></div>
        </div>
      );
    case 'support':
      return (
        <div className="mini mini-support" aria-hidden="true">
          <div className="mini-head"><ShieldCheck size={13} />TK-0911<em>SLA 3:40</em></div>
          <div className="mini-line"><span className="ok" />{az ? 'L2-yə eskalasiya' : 'Эскалация на L2'}</div>
          <div className="mini-line"><span className="ok" />{az ? 'Makro: sürətli bağlama' : 'Макрос: быстрое закрытие'}</div>
          <div className="mini-line muted">{az ? 'Bilik bazası: 22 məqalə' : 'База знаний: 22 статьи'}</div>
        </div>
      );
  }
}

export function Pains({ lang }: { lang: Lang }) {
  const c = COPY[lang];
  const n = siteNumbers();
  const numbers: [number, string][] = [[n.domains, c.n.domains], [n.modules, c.n.modules], [n.channels, c.n.channels], [n.autopilot, c.n.autopilot], [n.industries, c.n.industries]];
  return (
    <section className="pains" id="pains">
      <div className="wrap">
        <div className="section-heading">
          <div>
            <span className="eyebrow">{c.eyebrow}</span>
            <h2>{c.t1}<br /><em>{c.t2}</em></h2>
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
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
