'use client';

import { Eye, Sparkles, UserCheck } from 'lucide-react';
import { AI_LEVELS, AUTOPILOT_SCENARIOS, type Lang } from '@/lib/product-map';

const COPY = {
  ru: { eyebrow: 'AI ПОД ВАШИМ КОНТРОЛЕМ', t1: 'Сколько доверить AI,', t2: 'решаете вы.', intro: 'Три уровня делегирования настраиваются в CRM. Автопилот включается по отдельным сценариям и работает в пределах дневного бюджета.', scen: 'Сценарии автопилота', budget: 'Дневной бюджет и лимиты ответов задаются в настройках. При превышении диалог передаётся человеку.' },
  az: { eyebrow: 'AI SİZİN NƏZARƏTİNİZDƏ', t1: 'AI-yə nə qədər etibar etmək —', t2: 'siz qərar verirsiniz.', intro: 'Üç həvalə səviyyəsi CRM-də tənzimlənir. Avtopilot ayrı-ayrı ssenarilər üzrə işə salınır və gündəlik büdcə çərçivəsində işləyir.', scen: 'Avtopilot ssenariləri', budget: 'Gündəlik büdcə və cavab limitləri parametrlərdə təyin olunur. Limit aşıldıqda dialoq insana ötürülür.' },
} as const;

const ICONS = [Eye, UserCheck, Sparkles];

export function Automation({ lang }: { lang: Lang }) {
  const c = COPY[lang];
  return (
    <section className="automation" id="automation">
      <div className="wrap">
        <div className="section-heading">
          <div>
            <span className="eyebrow">{c.eyebrow}</span>
            <h2>{c.t1}<br /><em>{c.t2}</em></h2>
          </div>
          <p>{c.intro}</p>
        </div>
        <ol className="levels">
          {AI_LEVELS.map((lvl, i) => {
            const Icon = ICONS[i];
            return (
              <li className={`level level-${lvl.id}`} key={lvl.id}>
                <span className="level-icon"><Icon size={20} /></span>
                <span className="level-badge">{lvl.badge[lang]}</span>
                <h3>{lvl.title[lang]}</h3>
                <p>{lvl.text[lang]}</p>
                <span className="level-switch" aria-hidden="true"><i /></span>
              </li>
            );
          })}
        </ol>
        <div className="scenarios">
          <span className="scen-label">{c.scen}</span>
          <ul>
            {AUTOPILOT_SCENARIOS.map((s) => (<li key={s.ru}>{s[lang]}</li>))}
          </ul>
          <p>{c.budget}</p>
        </div>
      </div>
    </section>
  );
}
