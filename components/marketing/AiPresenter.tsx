'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Check, Pause, Play } from 'lucide-react';
import type { Lang } from '@/lib/product-map';
import { TypedText, useTypewriter } from './Typewriter';

/*
 * The AI operator: one assistant answers Instagram, WhatsApp and phone calls and writes everything to the CRM.
 * The demo is a row of business directions, each with its own conversation. The directions are the ones that
 * actually wrote to LeadDrive's own Instagram (Fanumsec inbox, November 2026): a flower shop that cannot keep
 * up with order peaks, a car rental, a barbershop; the pharmacy is the live order line; the hotel was the
 * owner's own ask. TikTok is left out on purpose: replies there were not reaching customers.
 * The chats are samples and say so; prices in them are the business's, not LeadDrive's.
 * The call opens first: it is the one thing a visitor can hear, behind a breathing orb (owner, after
 * syncallai.com). It is the dialogue of a real test-stand call (made-up pharmacy name), voiced again at studio
 * quality: the AI in the line's own voice (Sulafat), the pharmacy in another female voice. Its words stay in
 * Azerbaijani, translated for ru/en readers.
 */

type Msg = { ai?: boolean; text: string; at: string };
type Channel = 'call' | 'ig' | 'wa';
type ChatTab = { kind: 'chat'; id: string; channel: Channel; label: string; title: string; msgs: readonly Msg[]; did: readonly string[] };
type Line = { ai?: boolean; a: number; b: number; az: string; tr: string };
type CallTab = { kind: 'call'; id: string; channel: Channel; label: string; title: string; who: string; lines: Line[]; did: readonly string[] };

const CALL_SRC = '/media/ai-calls/aptek-sulafat.mp3';
const CALL_DUR = 28.9;
// Loudness of the recording, three bars per second (measured from the file), to draw its real waveform.
const ENV = [0,91,83,75,70,57,43,73,14,82,82,73,9,41,79,74,52,56,46,6,70,73,58,32,0,0,51,41,14,86,83,75,68,66,61,71,60,4,76,39,0,0,66,92,81,84,100,75,69,63,17,74,83,74,84,55,67,19,0,5,91,85,80,77,52,85,68,72,76,59,1,0,8,85,39,57,93,82,58,52,4,64,84,76,65,0];
const CALL_AZ = [
  { ai: true, a: 0.35, b: 8.04, az: 'Dərman anbarı, satış şöbəsi, salam! Nömrəniz «Mərkəzi aptek» kimi qeydə alınıb. Düzdürsə, sifarişinizi deyin.' },
  { ai: false, a: 8.74, b: 13.35, az: 'Düzdür. Parasetamol beş yüz, on qutu.' },
  { ai: true, a: 14.25, b: 19.24, az: 'Parasetamol 500 hazırda tükənib. Başqa əvəzedicisini təklif edim?' },
  { ai: false, a: 19.94, b: 23.51, az: 'Yox, əvəzedici lazım deyil. Gələndə xəbər verin, on qutu yazın.' },
  { ai: true, a: 24.41, b: 28.47, az: 'Qeyd etdim, gələn kimi xəbər verəcəyik. Daha nə əlavə edək?' },
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
    sample: 'nümunə', recording: 'nümunə', play: 'Zəngə qulaq asın', pause: 'Dayandır', listen: 'AI operator aptekdən sifariş qəbul edir', want: 'Biznesimə belə operator istəyirəm', ai: 'AI', review: 'Əmin olmadığı cavabı göndərmir — işçiyə qaralama kimi verir. Lazım olanda söhbəti menecerə ötürür.', cta: 'Demoda göstərək',
    tabs: [
      { kind: 'call', id: 'pharmacy', channel: 'call', label: 'Aptek', title: 'Aptek zəng edib sifariş verir', who: 'Aptek', did: ['Apteki nömrədən tanıdı', '1C kataloqunda tapdı', 'Gözləmə siyahısına yazdı'] },
      { kind: 'chat', id: 'hotel', channel: 'wa', label: 'Otel', title: 'Otel · WhatsApp', did: ['Qiymət otelin məlumatından', 'Bron sorğusu CRM-də', 'Menecerə ötürdü'], msgs: [
        { text: 'Salam, 12–14 dekabr üçün iki nəfərlik otaq var?', at: '22:14' },
        { ai: true, text: 'Salam! Standart otaq gecəsi 90 AZN-dən, səhər yeməyi daxildir. Adınızı yazın — menecer boş otağı təsdiqləsin.', at: '22:14' },
        { text: 'Elvin. Hava limanından transfer olar?', at: '22:15' },
        { ai: true, text: 'Bəli, transfer 25 AZN. Sorğunuzu menecerə ötürdüm, sizə yazacaq.', at: '22:15' }] },
      { kind: 'chat', id: 'car', channel: 'ig', label: 'Rent a car', title: 'Rent a car · Instagram', did: ['Boş maşını dedi', 'Bron sorğusu', 'Lid CRM-də'], msgs: [
        { text: 'Salam, həftəsonu üçün Prado boşdur?', at: '08:30' },
        { ai: true, text: 'Salam! Ağ Prado şənbə və bazar boşdur — gündəlik 120 AZN. Bron edək?', at: '08:30' },
        { text: 'Bəli, hava limanında götürə bilərəm?', at: '08:31' },
        { ai: true, text: 'Əlbəttə. Adınızı və reys nömrəsini yazın — sürücümüz sizi qarşılayacaq.', at: '08:31' }] },
      { kind: 'chat', id: 'flowers', channel: 'ig', label: 'Gül mağazası', title: 'Gül mağazası · Instagram', did: ['Sifariş çoxluğunda da cavab', 'Sifariş CRM-də', 'Floristə tapşırıq'], msgs: [
        { text: 'Salam, bu gün axşama 25 qızılgül çatdıra bilərsiniz?', at: '13:05' },
        { ai: true, text: 'Salam! Bəli, 25 qırmızı qızılgül — 85 AZN, Bakı daxili çatdırılma 5 AZN. Ünvan və saatı yazın.', at: '13:05' },
        { text: 'Nərimanov, saat 19:00', at: '13:06' },
        { ai: true, text: 'Qeyd etdim: Nərimanov, 19:00. Floristimiz təsdiq üçün zəng edəcək.', at: '13:06' }] },
      { kind: 'chat', id: 'barber', channel: 'wa', label: 'Bərbərxana', title: 'Bərbərxana · WhatsApp', did: ['Boş vaxtı dedi', 'Görüş təqvimdə', 'Xatırlatma'], msgs: [
        { text: 'Salam, sabah saç kəsiminə yer var?', at: '21:40' },
        { ai: true, text: 'Salam! Sabah 11:00 və 15:30 boşdur. Hansı saat uyğundur?', at: '21:40' },
        { text: '11:00', at: '21:41' },
        { ai: true, text: 'Yazdım: sabah 11:00, saç kəsimi. Bir gün əvvəl xatırladacağıq.', at: '21:41' }] },
    ],
  },
  ru: {
    eyebrow: 'ИИ-оператор · на азербайджанском', h1: 'Клиент пишет,', h2: 'ИИ отвечает.',
    sub: 'Instagram, WhatsApp и телефонные звонки — на всё отвечает один ИИ-оператор и записывает заказ и обращение в CRM. Даже ночью.',
    sample: 'пример', recording: 'пример', play: 'Послушайте звонок', pause: 'Пауза', listen: 'ИИ-оператор принимает заказ у аптеки', want: 'Хочу такого оператора', ai: 'ИИ', review: 'Ответ, в котором не уверен, не отправляет — отдаёт сотруднику черновиком. Когда нужно, передаёт разговор менеджеру.', cta: 'Показать на демо',
    tabs: [
      { kind: 'call', id: 'pharmacy', channel: 'call', label: 'Аптека', title: 'Аптека звонит и заказывает', who: 'Аптека', did: ['Узнал аптеку по номеру', 'Нашёл в каталоге 1С', 'Записал в лист ожидания'] },
      { kind: 'chat', id: 'hotel', channel: 'wa', label: 'Отель', title: 'Отель · WhatsApp', did: ['Цена из данных отеля', 'Заявка на бронь в CRM', 'Передал менеджеру'], msgs: [
        { text: 'Здравствуйте, есть номер на двоих на 12–14 декабря?', at: '22:14' },
        { ai: true, text: 'Здравствуйте! Стандартный номер — от 90 AZN за ночь, завтрак включён. Напишите имя — менеджер подтвердит свободный номер.', at: '22:14' },
        { text: 'Эльвин. Трансфер из аэропорта есть?', at: '22:15' },
        { ai: true, text: 'Да, трансфер 25 AZN. Передал заявку менеджеру, он вам напишет.', at: '22:15' }] },
      { kind: 'chat', id: 'car', channel: 'ig', label: 'Прокат авто', title: 'Прокат авто · Instagram', did: ['Назвал свободную машину', 'Заявка на бронь', 'Лид в CRM'], msgs: [
        { text: 'Здравствуйте, Прадо на выходные свободен?', at: '08:30' },
        { ai: true, text: 'Здравствуйте! Белый Прадо свободен в субботу и воскресенье — 120 AZN в сутки. Бронируем?', at: '08:30' },
        { text: 'Да, можно забрать в аэропорту?', at: '08:31' },
        { ai: true, text: 'Конечно. Напишите имя и номер рейса — водитель вас встретит.', at: '08:31' }] },
      { kind: 'chat', id: 'flowers', channel: 'ig', label: 'Цветы', title: 'Цветочный магазин · Instagram', did: ['Отвечает и в наплыв заказов', 'Заказ в CRM', 'Задача флористу'], msgs: [
        { text: 'Здравствуйте, доставите сегодня к вечеру 25 роз?', at: '13:05' },
        { ai: true, text: 'Здравствуйте! Да, 25 красных роз — 85 AZN, доставка по Баку 5 AZN. Напишите адрес и время.', at: '13:05' },
        { text: 'Нариманов, 19:00', at: '13:06' },
        { ai: true, text: 'Записал: Нариманов, 19:00. Флорист позвонит подтвердить.', at: '13:06' }] },
      { kind: 'chat', id: 'barber', channel: 'wa', label: 'Барбершоп', title: 'Барбершоп · WhatsApp', did: ['Назвал свободное время', 'Запись в календаре', 'Напоминание'], msgs: [
        { text: 'Здравствуйте, на завтра есть место на стрижку?', at: '21:40' },
        { ai: true, text: 'Здравствуйте! Завтра свободно в 11:00 и 15:30. Какое время удобно?', at: '21:40' },
        { text: '11:00', at: '21:41' },
        { ai: true, text: 'Записал: завтра в 11:00, стрижка. За день напомним.', at: '21:41' }] },
    ],
  },
  en: {
    eyebrow: 'AI operator · in Azerbaijani', h1: 'Customers write,', h2: 'AI answers.',
    sub: 'Instagram, WhatsApp and phone calls — one AI operator answers them all and writes every order and request to the CRM. At night too.',
    sample: 'sample', recording: 'sample', play: 'Listen to the call', pause: 'Pause', listen: 'The AI operator takes a pharmacy order', want: 'I want this operator', ai: 'AI', review: 'A reply it is not sure about is not sent — it goes to an employee as a draft. When needed, the conversation is handed to a manager.', cta: 'Show on a demo',
    tabs: [
      { kind: 'call', id: 'pharmacy', channel: 'call', label: 'Pharmacy', title: 'A pharmacy calls in an order', who: 'Pharmacy', did: ['Knew the pharmacy by its number', 'Found it in the 1C catalogue', 'Put it on the waiting list'] },
      { kind: 'chat', id: 'hotel', channel: 'wa', label: 'Hotel', title: 'Hotel · WhatsApp', did: ['Price from the hotel’s own data', 'Booking request in the CRM', 'Handed to a manager'], msgs: [
        { text: 'Hi, do you have a double room for 12–14 December?', at: '22:14' },
        { ai: true, text: 'Hello! A standard room is from 90 AZN a night, breakfast included. Send your name and a manager will confirm a free room.', at: '22:14' },
        { text: 'Elvin. Is there an airport transfer?', at: '22:15' },
        { ai: true, text: 'Yes, the transfer is 25 AZN. I have passed your request to a manager, who will write to you.', at: '22:15' }] },
      { kind: 'chat', id: 'car', channel: 'ig', label: 'Car rental', title: 'Car rental · Instagram', did: ['Named a free car', 'Booking request', 'Lead in the CRM'], msgs: [
        { text: 'Hi, is the Prado free this weekend?', at: '08:30' },
        { ai: true, text: 'Hello! The white Prado is free on Saturday and Sunday — 120 AZN a day. Shall we book it?', at: '08:30' },
        { text: 'Yes, can I pick it up at the airport?', at: '08:31' },
        { ai: true, text: 'Of course. Send your name and flight number — our driver will meet you.', at: '08:31' }] },
      { kind: 'chat', id: 'flowers', channel: 'ig', label: 'Flowers', title: 'Flower shop · Instagram', did: ['Answers during order rushes', 'Order in the CRM', 'Task for the florist'], msgs: [
        { text: 'Hi, can you deliver 25 roses this evening?', at: '13:05' },
        { ai: true, text: 'Hello! Yes, 25 red roses — 85 AZN, delivery in Baku 5 AZN. Send the address and time.', at: '13:05' },
        { text: 'Narimanov, 7 pm', at: '13:06' },
        { ai: true, text: 'Noted: Narimanov, 7 pm. Our florist will call to confirm.', at: '13:06' }] },
      { kind: 'chat', id: 'barber', channel: 'wa', label: 'Barbershop', title: 'Barbershop · WhatsApp', did: ['Named free slots', 'Appointment in the calendar', 'Reminder'], msgs: [
        { text: 'Hi, any slot for a haircut tomorrow?', at: '21:40' },
        { ai: true, text: 'Hello! Tomorrow 11:00 and 15:30 are free. Which suits you?', at: '21:40' },
        { text: '11:00', at: '21:41' },
        { ai: true, text: 'Booked: tomorrow at 11:00, haircut. We will remind you the day before.', at: '21:41' }] },
    ],
  },
} as const;

type Copy = (typeof COPY)[Lang];

const fmt = (s: number) => { const v = Math.max(0, Math.floor(s)); return `${Math.floor(v / 60)}:${String(v % 60).padStart(2, '0')}`; };

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

/*
 * The call plays through Web Audio, not an <audio> element. The site's static assets answer without byte
 * ranges (no Accept-Ranges), so Chrome cannot seek an <audio> there: clicking a line or the waveform would do
 * nothing. The file is 180 KB, so it is fetched once on the first click and decoded; a decoded buffer seeks
 * anywhere. CSP allows this (connect-src 'self'); a blob: or data: media URL would be blocked by media-src 'self'.
 * The analyser also gives the real loudness of the voice, which drives the orb.
 */
function useCallAudio(src: string, duration: number) {
  const ctx = useRef<AudioContext | null>(null);
  const buf = useRef<AudioBuffer | null>(null);
  const node = useRef<AudioBufferSourceNode | null>(null);
  const an = useRef<AnalyserNode | null>(null);
  const startedAt = useRef(0);
  const offset = useRef(0);
  const [t, setT] = useState(0);
  const [level, setLevel] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [ended, setEnded] = useState(false);
  useEffect(() => {
    if (!playing) return;
    const data = new Uint8Array(256);
    const id = window.setInterval(() => {
      const c = ctx.current;
      if (!c) return;
      setT(Math.min(duration, c.currentTime - startedAt.current));
      if (an.current) { an.current.getByteTimeDomainData(data); let s = 0; for (const v of data) s += ((v - 128) / 128) ** 2; setLevel(Math.min(1, Math.sqrt(s / data.length) * 4)); }
    }, 90);
    return () => window.clearInterval(id);
  }, [playing, duration]);
  useEffect(() => () => { try { node.current?.stop(); } catch {} ctx.current?.close().catch(() => {}); }, []);
  const stopNode = () => { const n = node.current; node.current = null; if (n) { n.onended = null; try { n.stop(); } catch {} } };
  const playFrom = async (at: number) => {
    if (!ctx.current) { const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext; ctx.current = new AC(); an.current = ctx.current.createAnalyser(); an.current.fftSize = 256; an.current.connect(ctx.current.destination); }
    const c = ctx.current;
    if (c.state === 'suspended') await c.resume();
    if (!buf.current) { const r = await fetch(src); buf.current = await c.decodeAudioData(await r.arrayBuffer()); }
    stopNode();
    const n = c.createBufferSource(); n.buffer = buf.current; n.connect(an.current!);
    const from = Math.max(0, Math.min(at, buf.current.duration - 0.05));
    n.onended = () => { if (node.current !== n) return; node.current = null; setPlaying(false); setEnded(true); setT(duration); offset.current = 0; setLevel(0); };
    n.start(0, from); node.current = n; startedAt.current = c.currentTime - from;
    setT(from); setPlaying(true); setStarted(true); setEnded(false);
  };
  const pause = () => { const c = ctx.current; if (!c || !node.current) return; offset.current = c.currentTime - startedAt.current; stopNode(); setPlaying(false); setLevel(0); };
  const toggle = () => { if (playing) pause(); else playFrom(ended ? 0 : offset.current).catch(() => setPlaying(false)); };
  const seek = (s: number) => { offset.current = s; playFrom(s).catch(() => setPlaying(false)); };
  return { t, level, playing, started, ended, toggle, seek };
}

function Call({ tab, lang, c, demoHref }: { tab: CallTab; lang: Lang; c: Copy; demoHref: string }) {
  const { t, level, playing, started, ended, toggle, seek } = useCallAudio(CALL_SRC, CALL_DUR);
  const isAi = (x: number) => tab.lines.some((l) => l.ai && x >= l.a - 0.2 && x <= l.b + 0.2);
  return (
    <div className="op-pane">
      <div className="op-pane-head"><b>{tab.title}</b><span className="op-tag">{c.recording}</span></div>
      <div className={`op-orb-row ${playing ? 'is-playing' : ''}`}>
        <button type="button" className="op-orb" onClick={toggle} aria-label={playing ? c.pause : c.play}>
          <span className="op-orb-halo" /><span className="op-orb-ring" /><span className="op-orb-ring op-orb-ring-2" />
          <span className="op-orb-sphere" style={playing ? { transform: `scale(${(1 + 0.18 * level).toFixed(3)})` } : undefined}>{playing ? <Pause size={22} /> : <Play size={24} />}</span>
        </button>
        <div className="op-orb-copy">
          <button type="button" className="op-orb-title" onClick={toggle}>{c.play}</button>
          <p>{c.listen} · {fmt(CALL_DUR)}</p>
          {started && (
            <div className="op-progress">
              <div className="op-wave" aria-hidden="true" onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); seek(((e.clientX - r.left) / r.width) * CALL_DUR); }}>
                {ENV.map((v, i) => { const at = ((i + 0.5) / ENV.length) * CALL_DUR; return <i key={i} className={`${isAi(at) ? 'is-ai' : ''} ${at <= t ? 'is-done' : ''}`} style={{ height: `${Math.max(10, v)}%` }} />; })}
              </div>
              <span className="op-time">{fmt(t)} / {fmt(CALL_DUR)}</span>
            </div>
          )}
          {ended && <a className="op-want" href={demoHref} target="_blank" rel="noopener">{c.want}<ArrowRight size={16} /></a>}
        </div>
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
  const [tabId, setTabId] = useState('pharmacy');
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
                <button type="button" role="tab" key={tb.id} aria-selected={tb.id === tab.id} onClick={() => setTabId(tb.id)}>{tb.label}</button>
              ))}
            </div>
            {tab.kind === 'chat' ? <Chat key={tab.id} tab={tab} c={c} /> : <Call tab={tab} lang={lang} c={c} demoHref={demoHref} />}
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
