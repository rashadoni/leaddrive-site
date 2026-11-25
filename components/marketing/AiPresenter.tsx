'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Check, Pause, Phone, Play } from 'lucide-react';
import type { Lang } from '@/lib/product-map';
import { TypedText, useTypewriter } from './Typewriter';

/*
 * The AI operator: one assistant answers Instagram, WhatsApp and phone calls and writes everything to the CRM.
 * Tabs follow the real share of inbound requests across LeadDrive tenants (prod, 90 days to 2026-11-25):
 * Instagram first, then WhatsApp, then calls. TikTok is left out on purpose: replies there were not
 * reaching customers when this was written, so the page must not promise them.
 * The chats are samples and say so. The call is a real recording from the line's test stand with a
 * made-up pharmacy name; its words stay in Azerbaijani, with a translation for ru/en readers.
 */

type Msg = { ai?: boolean; text: string; at: string };
type ChatTab = { kind: 'chat'; id: 'ig' | 'wa'; label: string; title: string; msgs: readonly Msg[]; did: readonly string[] };
type Line = { ai?: boolean; a: number; b: number; az: string; tr: string };
type CallTab = { kind: 'call'; id: 'call'; label: string; title: string; who: string; lines: Line[]; did: readonly string[] };

const CALL_SRC = '/media/ai-calls/aptek.mp3';
const CALL_DUR = 36.1;
// Loudness of the recording, three bars per second (measured from the file), to draw its real waveform.
const ENV = [0,0,0,5,78,61,78,55,69,68,71,43,71,79,61,73,79,64,64,46,56,63,71,67,53,57,23,2,0,0,0,0,0,0,0,71,39,2,8,7,86,81,81,60,54,20,0,0,0,0,0,0,83,86,80,84,85,83,56,56,100,89,65,72,74,40,0,0,0,0,0,0,0,0,72,98,81,84,70,24,3,80,90,50,3,2,72,78,42,0,0,0,0,0,52,78,61,78,67,77,58,37,81,78,68,51,3,0];
const CALL_AZ = [
  { ai: true, a: 1.3, b: 8.8, az: 'Dərman anbarı, satış şöbəsi, salam! Nömrəniz «Mərkəzi aptek» kimi qeydə alınıb. Düzdürsə, sifarişinizi deyin.' },
  { ai: false, a: 11.7, b: 15.1, az: 'Düzdür. Parasetamol beş yüz, on qutu.' },
  { ai: true, a: 17.4, b: 21.8, az: 'Parasetamol 500 hazırda tükənib. Başqa əvəzedicisini təklif edim?' },
  { ai: false, a: 24.9, b: 29.6, az: 'Yox, əvəzedici lazım deyil. Gələndə xəbər verin, on qutu yazın.' },
  { ai: true, a: 31.7, b: 35.4, az: 'Qeyd etdim, gələn kimi xəbər verəcəyik. Daha nə əlavə edək?' },
];
const CALL_TR: Record<Lang, string[]> = {
  az: ['', '', '', '', ''],
  ru: ['Аптечный склад, отдел продаж, здравствуйте! Ваш номер записан как «Mərkəzi aptek». Если верно — говорите заказ.', 'Верно. Парацетамол 500, десять коробок.', 'Парацетамол 500 сейчас закончился. Предложить замену?', 'Нет, замена не нужна. Сообщите, когда придёт, запишите десять коробок.', 'Записала, сообщим, как только поступит. Что ещё добавим?'],
  en: ['Pharmacy warehouse, sales desk, hello! Your number is on file as «Mərkəzi aptek». If that is right, go ahead with your order.', 'Right. Paracetamol 500, ten boxes.', 'Paracetamol 500 is sold out right now. Shall I offer a substitute?', 'No substitute. Let us know when it arrives — put down ten boxes.', 'Noted, we will tell you as soon as it arrives. What else shall we add?'],
};

const COPY = {
  az: {
    eyebrow: 'AI operator · Azərbaycan dilində', h1: 'Müştəri yazır,', h2: 'AI cavab verir.',
    sub: 'Instagram, WhatsApp və telefon zəngləri — hamısına bir AI operator cavab verir, sifarişi və müraciəti CRM-ə yazır. Gecə də.',
    sample: 'nümunə', recording: 'test zəngi', play: 'Zəngi dinlə', pause: 'Dayandır', ai: 'AI', review: 'Əmin olmadığı cavabı göndərmir — işçiyə qaralama kimi verir. Lazım olanda söhbəti menecerə ötürür.', cta: 'Demoda göstərək',
    tabs: [
      { kind: 'chat', id: 'ig', label: 'Instagram', title: 'Dərman brendi · Direct', did: ['Şirkətin biliyindən cavab', 'Gecə, saniyələrdə', 'Söhbət CRM-də'], msgs: [
        { text: 'Salam, bu krem hansı apteklərdə var?', at: '23:41' },
        { ai: true, text: 'Salam! Krem Bakıdakı tərəfdaş apteklərdə satılır. Hansı rayondasınız — ən yaxınını deyim.', at: '23:41' },
        { text: 'Nəsimi', at: '23:42' },
        { ai: true, text: 'Nəsimidə iki aptekdə var. Ünvanları və iş saatlarını göndərirəm.', at: '23:42' }] },
      { kind: 'chat', id: 'wa', label: 'WhatsApp', title: 'Tikinti materialları · WhatsApp', did: ['Hesablayır', 'Sövdələşmə yaradır', 'Menecerə tapşırıq'], msgs: [
        { text: 'Salam. 2000 ədəd blok lazımdır, çatdırılma var?', at: '07:05' },
        { ai: true, text: 'Salam! Var. 2000 ədəd 20-lik blok — 1 200 AZN. Ünvanı yazın, çatdırılmanı hesablayım.', at: '07:05' },
        { text: 'Masazır', at: '07:06' },
        { ai: true, text: 'Masazıra çatdırılma 40 AZN. Sifarişi qeyd edim? Menecer zəng edib təsdiqləyəcək.', at: '07:06' }] },
      { kind: 'call', id: 'call', label: 'Zəng', title: 'Aptek zəng edib sifariş verir', who: 'Aptek', did: ['Apteki nömrədən tanıdı', '1C kataloqunda tapdı', 'Gözləmə siyahısına yazdı'] },
    ],
  },
  ru: {
    eyebrow: 'ИИ-оператор · на азербайджанском', h1: 'Клиент пишет,', h2: 'ИИ отвечает.',
    sub: 'Instagram, WhatsApp и телефонные звонки — на всё отвечает один ИИ-оператор и записывает заказ и обращение в CRM. Даже ночью.',
    sample: 'пример', recording: 'тестовый звонок', play: 'Слушать звонок', pause: 'Пауза', ai: 'ИИ', review: 'Ответ, в котором не уверен, не отправляет — отдаёт сотруднику черновиком. Когда нужно, передаёт разговор менеджеру.', cta: 'Показать на демо',
    tabs: [
      { kind: 'chat', id: 'ig', label: 'Instagram', title: 'Фарм-бренд · Direct', did: ['Ответ из знаний компании', 'Ночью, за секунды', 'Разговор в CRM'], msgs: [
        { text: 'Здравствуйте, в каких аптеках есть этот крем?', at: '23:41' },
        { ai: true, text: 'Здравствуйте! Крем продаётся в аптеках-партнёрах по Баку. В каком вы районе — подскажу ближайшую.', at: '23:41' },
        { text: 'Насими', at: '23:42' },
        { ai: true, text: 'В Насими есть в двух аптеках. Отправляю адреса и часы работы.', at: '23:42' }] },
      { kind: 'chat', id: 'wa', label: 'WhatsApp', title: 'Стройматериалы · WhatsApp', did: ['Считает', 'Создаёт сделку', 'Задача менеджеру'], msgs: [
        { text: 'Здравствуйте. Нужно 2000 блоков, доставка есть?', at: '07:05' },
        { ai: true, text: 'Здравствуйте! Есть. 2000 блоков 20 — 1 200 AZN. Напишите адрес, посчитаю доставку.', at: '07:05' },
        { text: 'Масазыр', at: '07:06' },
        { ai: true, text: 'Доставка в Масазыр — 40 AZN. Записать заказ? Менеджер позвонит и подтвердит.', at: '07:06' }] },
      { kind: 'call', id: 'call', label: 'Звонок', title: 'Аптека звонит и заказывает', who: 'Аптека', did: ['Узнал аптеку по номеру', 'Нашёл в каталоге 1С', 'Записал в лист ожидания'] },
    ],
  },
  en: {
    eyebrow: 'AI operator · in Azerbaijani', h1: 'Customers write,', h2: 'AI answers.',
    sub: 'Instagram, WhatsApp and phone calls — one AI operator answers them all and writes every order and request to the CRM. At night too.',
    sample: 'sample', recording: 'test call', play: 'Play the call', pause: 'Pause', ai: 'AI', review: 'A reply it is not sure about is not sent — it goes to an employee as a draft. When needed, the conversation is handed to a manager.', cta: 'Show on a demo',
    tabs: [
      { kind: 'chat', id: 'ig', label: 'Instagram', title: 'Pharma brand · Direct', did: ['Answers from company knowledge', 'At night, in seconds', 'Conversation in the CRM'], msgs: [
        { text: 'Hi, which pharmacies have this cream?', at: '23:41' },
        { ai: true, text: 'Hello! The cream is sold in partner pharmacies across Baku. Which district are you in? I will name the nearest one.', at: '23:41' },
        { text: 'Nasimi', at: '23:42' },
        { ai: true, text: 'Two pharmacies in Nasimi have it. Sending you the addresses and opening hours.', at: '23:42' }] },
      { kind: 'chat', id: 'wa', label: 'WhatsApp', title: 'Building materials · WhatsApp', did: ['Calculates', 'Creates a deal', 'Task for a manager'], msgs: [
        { text: 'Hello. I need 2000 blocks, do you deliver?', at: '07:05' },
        { ai: true, text: 'Hello! Yes. 2000 blocks (20) — 1 200 AZN. Send the address and I will price the delivery.', at: '07:05' },
        { text: 'Masazir', at: '07:06' },
        { ai: true, text: 'Delivery to Masazir is 40 AZN. Shall I place the order? A manager will call to confirm.', at: '07:06' }] },
      { kind: 'call', id: 'call', label: 'Call', title: 'A pharmacy calls in an order', who: 'Pharmacy', did: ['Knew the pharmacy by its number', 'Found it in the 1C catalogue', 'Put it on the waiting list'] },
    ],
  },
} as const;

type Copy = (typeof COPY)[Lang];

const fmt = (s: number) => { const v = Math.max(0, Math.floor(s)); return `${Math.floor(v / 60)}:${String(v % 60).padStart(2, '0')}`; };

// Brand marks drawn inline: lucide no longer ships brand icons.
function TabIcon({ id }: { id: 'ig' | 'wa' | 'call' }) {
  if (id === 'call') return <Phone size={17} />;
  if (id === 'ig') return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>;
  return <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.4 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.5-3.9-4.7-4.1-.1-.2-1.1-1.5-1.1-2.8 0-1.3.7-2 1-2.3.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.7-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.1 1.3Z" /></svg>;
}

function Chat({ tab, c }: { tab: ChatTab; c: Copy }) {
  return (
    <div className="op-pane">
      <div className="op-pane-head"><b>{tab.title}</b><span className="op-tag">{c.sample}</span></div>
      <div className="op-chat">
        {tab.msgs.map((m, i) => (
          <div key={i} className={`op-msg ${m.ai ? 'is-ai' : ''}`} style={{ animationDelay: `${i * 0.45}s` }}>
            {m.text}<small>{m.at}{m.ai ? ` · ${c.ai}` : ''}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

function Call({ tab, lang, c }: { tab: CallTab; lang: Lang; c: Copy }) {
  const audio = useRef<HTMLAudioElement>(null);
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(false);
  const toggle = () => { const a = audio.current; if (!a) return; if (a.paused) a.play().catch(() => {}); else a.pause(); };
  const seek = (s: number) => { const a = audio.current; if (!a) return; a.currentTime = s; setT(s); a.play().catch(() => {}); };
  const isAi = (x: number) => tab.lines.some((l) => l.ai && x >= l.a - 0.2 && x <= l.b + 0.2);
  return (
    <div className="op-pane">
      <div className="op-pane-head"><b>{tab.title}</b><span className="op-tag">{c.recording}</span></div>
      <audio ref={audio} src={CALL_SRC} preload="none" onTimeUpdate={(e) => setT(e.currentTarget.currentTime)} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => { setPlaying(false); setT(CALL_DUR); }} />
      <div className="op-player">
        <button type="button" className="op-play" onClick={toggle} aria-label={playing ? c.pause : c.play}>{playing ? <Pause size={20} /> : <Play size={20} />}</button>
        <div className="op-wave" aria-hidden="true" onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); seek(((e.clientX - r.left) / r.width) * CALL_DUR); }}>
          {ENV.map((v, i) => { const at = ((i + 0.5) / ENV.length) * CALL_DUR; return <i key={i} className={`${isAi(at) ? 'is-ai' : ''} ${at <= t ? 'is-done' : ''}`} style={{ height: `${Math.max(8, v)}%` }} />; })}
        </div>
        <span className="op-time">{fmt(t)} / {fmt(CALL_DUR)}</span>
      </div>
      <div className="op-lines">
        {tab.lines.map((l, i) => {
          const next = tab.lines[i + 1];
          const now = t > 0 && t >= l.a - 0.15 && t < (next ? next.a - 0.15 : CALL_DUR + 1);
          return (
            <button type="button" key={i} className={`op-line ${l.ai ? 'is-ai' : ''} ${now ? 'is-now' : ''}`} onClick={() => seek(l.a)}>
              <span className="op-who">{l.ai ? c.ai : tab.who}</span>
              <span>{l.az}{lang !== 'az' && <small>{l.tr}</small>}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function AiPresenter({ lang, demoHref }: { lang: Lang; demoHref: string }) {
  const c = COPY[lang];
  const ref = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [seen, setSeen] = useState(false);
  const [hasVideo, setHasVideo] = useState(true);
  const [tabId, setTabId] = useState<'ig' | 'wa' | 'call'>('ig');
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const title = useTypewriter([c.h1, c.h2], { active: seen, speed: 55, startDelay: 300 });
  // The presenter's open-palm gesture lands as the conversation appears.
  useEffect(() => { if (title.done && video.current) video.current.play().catch(() => {}); }, [title.done]);
  const tabs: (ChatTab | CallTab)[] = c.tabs.map((tb) => (tb.kind === 'call'
    ? { ...tb, lines: CALL_AZ.map((l, i) => ({ ...l, tr: CALL_TR[lang][i] })) }
    : tb));
  const tab = tabs.find((tb) => tb.id === tabId) ?? tabs[0];
  return (
    <section className={`ai-presenter ${seen ? 'is-seen' : ''} ${title.done ? 'is-done' : ''}`} id="ai-agent" ref={ref}>
      <div className="wrap ai-presenter-grid">
        <div className="ai-presenter-copy">
          <span className="eyebrow">{c.eyebrow}</span>
          <h2 className="typewriter"><TypedText text={c.h1} shown={title.shown[0]} /><br /><em><TypedText text={c.h2} shown={title.shown[1]} cursor={title.started && !title.done} /></em></h2>
          <p className="ai-presenter-sub">{c.sub}</p>
          <div className="op-card" id="ai-operator">
            <div className="op-tabs" role="tablist" aria-label={c.eyebrow}>
              {tabs.map((tb) => (
                <button type="button" role="tab" key={tb.id} aria-selected={tb.id === tab.id} onClick={() => setTabId(tb.id)}><TabIcon id={tb.id} />{tb.label}</button>
              ))}
            </div>
            {tab.kind === 'chat' ? <Chat key={tab.id} tab={tab} c={c} /> : <Call tab={tab} lang={lang} c={c} />}
            <ul className="op-did">{tab.did.map((d) => <li key={d}><Check size={14} />{d}</li>)}</ul>
          </div>
          <p className="ai-review">{c.review}</p>
          <a className="cta" href={demoHref} target="_blank" rel="noopener">{c.cta}<span><ArrowRight size={18} /></span></a>
        </div>
        <div className="ai-presenter-media" aria-hidden="true">
          {hasVideo && <video ref={video} muted playsInline preload="auto" onError={() => setHasVideo(false)}><source src="/presenter.mp4" type="video/mp4" /></video>}
        </div>
      </div>
    </section>
  );
}
