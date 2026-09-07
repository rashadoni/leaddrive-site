'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, BellRing, CalendarClock, Check, MessageCircle, Sparkles, UserRound } from 'lucide-react';
import type { Lang } from '@/lib/product-map';
import { TypedText, useTypewriter } from './Typewriter';

const COPY = {
  ru: { eyebrow: 'AI-агент в вашей CRM', h1: 'AI-агент', h2: 'LeadDrive.', sub: 'Скажите, что нужно сделать. Агент соберёт сценарий из модулей CRM и покажет его на проверку.', prompt: 'Оцени новые лиды из WhatsApp, назначь горячие менеджеру и подготовь резюме к встрече', agent: 'AI-агент LeadDrive', result: 'Вот сценарий, собранный из модулей вашей CRM:', steps: [['Оценка лидов', 'Inbox → лид'], ['Горячий лид → менеджер', 'эскалация'], ['Черновик ответа', 'WhatsApp'], ['Задача: встреча', 'календарь'], ['Резюме после звонка', 'Da Vinci']], review: 'Режим «проверка»: ничего не отправляется без подтверждения сотрудника.', cta: 'Показать на демо' },
  az: { eyebrow: 'CRM-inizdə AI agent', h1: 'LeadDrive', h2: 'AI agenti.', sub: 'Nə etmək lazım olduğunu deyin. Agent CRM modullarından ssenari yığıb yoxlamağa göstərəcək.', prompt: 'WhatsApp-dan gələn yeni lidləri qiymətləndir, qaynarları menecerə təyin et və görüşə xülasə hazırla', agent: 'LeadDrive AI agenti', result: 'CRM-inizin modullarından yığılmış ssenari:', steps: [['Lid qiymətləndirmə', 'Inbox → lid'], ['Qaynar lid → menecer', 'eskalasiya'], ['Cavab qaralaması', 'WhatsApp'], ['Tapşırıq: görüş', 'təqvim'], ['Zəngdən sonra xülasə', 'Da Vinci']], review: '«Yoxla» rejimi: əməkdaşın təsdiqi olmadan heç nə göndərilmir.', cta: 'Demoda göstərək' },
  en: { eyebrow: 'An AI agent in your CRM', h1: 'LeadDrive', h2: 'AI agent.', sub: 'Say what needs to be done. The agent assembles a scenario from CRM modules and shows it for review.', prompt: 'Score new WhatsApp leads, assign the hot ones to a manager and prepare a meeting summary', agent: 'LeadDrive AI agent', result: 'Here is the scenario assembled from your CRM modules:', steps: [['Lead scoring', 'inbox → lead'], ['Hot lead → manager', 'escalation'], ['Reply draft', 'WhatsApp'], ['Task: meeting', 'calendar'], ['Post-call summary', 'Da Vinci']], review: 'Review mode: nothing is sent without an employee confirming it.', cta: 'Show on a demo' },
} as const;

const ICONS = [Sparkles, UserRound, MessageCircle, CalendarClock, BellRing];

export function AiPresenter({ lang, demoHref }: { lang: Lang; demoHref: string }) {
  const c = COPY[lang];
  const ref = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [seen, setSeen] = useState(false);
  const [hasVideo, setHasVideo] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const title = useTypewriter([c.h1, c.h2], { active: seen, speed: 55, startDelay: 300 });
  const prompt = useTypewriter([c.prompt], { active: title.done, speed: 22, startDelay: 300 });
  // The presenter starts when the prompt starts typing, so her open-palm gesture lands as the scenario appears.
  useEffect(() => { if (title.done && video.current) video.current.play().catch(() => {}); }, [title.done]);
  const stepsOn = prompt.done;
  return (
    <section className={`ai-presenter ${seen ? 'is-seen' : ''} ${stepsOn ? 'is-done' : ''}`} id="ai-agent" ref={ref}>
      <div className="wrap ai-presenter-grid">
        <div className="ai-presenter-copy">
          <span className="eyebrow">{c.eyebrow}</span>
          <h2 className="typewriter"><TypedText text={c.h1} shown={title.shown[0]} /><br /><em><TypedText text={c.h2} shown={title.shown[1]} cursor={title.started && !title.done} /></em></h2>
          <p className="ai-presenter-sub">{c.sub}</p>
          <div className="ai-prompt" aria-label={c.prompt}>
            <p><TypedText text={c.prompt} shown={prompt.shown[0]} cursor={prompt.started && !prompt.done} /></p>
            <span className="ai-prompt-send"><ArrowRight size={16} /></span>
          </div>
          <div className="ai-agent-reply">
            <div className="ai-agent-head"><span className="ai-agent-mark">ai</span><div><strong>{c.agent}</strong><small>{c.result}</small></div></div>
            <ol className="ai-steps">
              {c.steps.map(([t, s], i) => { const Icon = ICONS[i]; return (<li key={t} style={{ transitionDelay: `${i * 220}ms` }}><span className="ai-step-icon"><Icon size={16} /></span><b>{t}</b><small>{s}</small><i className="ai-step-check"><Check size={12} /></i></li>); })}
            </ol>
            <p className="ai-review">{c.review}</p>
          </div>
          <a className="cta" href={demoHref} target="_blank" rel="noopener">{c.cta}<span><ArrowRight size={18} /></span></a>
        </div>
        <div className="ai-presenter-media" aria-hidden="true">
          {hasVideo && <video ref={video} muted playsInline preload="auto" onError={() => setHasVideo(false)}><source src="/presenter.mp4" type="video/mp4" /></video>}
        </div>
      </div>
    </section>
  );
}
