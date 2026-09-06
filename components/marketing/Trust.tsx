'use client';

import { TRUST, type Lang } from '@/lib/product-map';

const COPY = {
  ru: { eyebrow: 'ПОДКЛЮЧАЕТСЯ К ТОМУ, ЧЕМ ВЫ УЖЕ ПОЛЬЗУЕТЕСЬ', t1: 'Каналы, интеграции,', t2: 'контроль доступа.', intro: 'Всё из каталога каналов и настроек CRM. Состав подключений настраивается под ваш процесс при внедрении.' },
  az: { eyebrow: 'ARTIQ İSTİFADƏ ETDİKLƏRİNİZƏ QOŞULUR', t1: 'Kanallar, inteqrasiyalar,', t2: 'giriş nəzarəti.', intro: 'Hamısı CRM-in kanal kataloqundan və parametrlərindən. Qoşulmaların tərkibi tətbiq zamanı prosesinizə uyğunlaşdırılır.' },
  en: { eyebrow: 'CONNECTS TO WHAT YOU ALREADY USE', t1: 'Channels, integrations,', t2: 'access control.', intro: 'All from the channel catalogue and CRM settings. The set of connections is configured for your process during implementation.' },
} as const;

export function Trust({ lang }: { lang: Lang }) {
  const c = COPY[lang];
  return (
    <section className="trust" id="trust">
      <div className="wrap">
        <div className="section-heading">
          <div>
            <span className="eyebrow">{c.eyebrow}</span>
            <h2>{c.t1}<br /><em>{c.t2}</em></h2>
          </div>
          <p>{c.intro}</p>
        </div>
        <div className="trust-grid">
          {TRUST.map((g) => (
            <div className={`trust-group trust-${g.id}`} key={g.id}>
              <h3>{g.title[lang]}</h3>
              <ul>{g.items.map((i) => (<li key={i.ru}>{i[lang]}</li>))}</ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
