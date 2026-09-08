'use client';

import { useEffect, useRef } from 'react';
import { ArrowRight, Bot, Grid2x2, HelpCircle, Kanban, LayoutGrid, Plus, Search, Send, Sparkles, FileText, Handshake } from 'lucide-react';
import type { Lang } from '@/lib/product-map';

/** The CRM dashboard wallpaper is served by the product itself; the page only plays it. */
const WALLPAPER = 'https://app.leaddrivecrm.org/wallpapers/alpine-v2.mp4';
const POSTER = '/screens/home.webp';

const CAPTION: Record<Lang, string> = { az: 'Real ekran: LeadDrive-ın idarə paneli, canlı fon və Da Vinci iş icmalı', ru: 'Реальный экран: главная панель LeadDrive, живой фон и сводка Da Vinci', en: 'Real screen: the LeadDrive dashboard with its live backdrop and the Da Vinci briefing' };
const MENU = ['ƏSAS', 'SATIŞ', 'MÜQAVİLƏ NƏZARƏTİ', 'MARKETİNQ', 'SADİQLİK PROQRAMI', 'OMNİ-CHANNEL', 'SOSİAL MONİTORİNQ', 'VOIP', 'DƏSTƏK', 'MALİYYƏ', 'ANALİTİKA'];
const AZ_MONTHS = ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avqust', 'sentyabr', 'oktyabr', 'noyabr', 'dekabr'];
const AZ_DAYS = ['bazar', 'bazar ertəsi', 'çərşənbə axşamı', 'çərşənbə', 'cümə axşamı', 'cümə', 'şənbə'];

function greeting(h: number) { return h < 12 ? 'Sabahınız xeyir' : h < 18 ? 'Gününüz xeyir' : 'Axşamınız xeyir'; }

export function LiveHero({ lang }: { lang: Lang }) {
  const video = useRef<HTMLVideoElement>(null);
  const dateRef = useRef<HTMLSpanElement>(null);
  const greetRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const now = new Date();
    if (dateRef.current) dateRef.current.textContent = `${now.getDate()} ${AZ_MONTHS[now.getMonth()]}, ${AZ_DAYS[now.getDay()]}, ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    if (greetRef.current) greetRef.current.textContent = `${greeting(now.getHours())}, Leyla!`;
    video.current?.play().catch(() => {});
  }, []);
  return (
    <figure className="hero-shot hero-live" id="product">
      <div className="shot-frame crm">
        <aside className="crm-side">
          <div className="crm-logo"><span className="crm-mark">lD</span><b>LeadDrive</b><small>CRM</small></div>
          <div className="crm-search"><Search size={12} /><span>Menyu axtarışı… (⌘K)</span></div>
          <ul>{MENU.map((m) => <li key={m}>{m}<i /></li>)}</ul>
        </aside>
        <div className="crm-main">
          <video ref={video} className="crm-wallpaper" src={WALLPAPER} poster={POSTER} muted loop playsInline autoPlay preload="metadata" aria-hidden="true" />
          <header className="crm-top">
            <b>LeadDrive Inc.</b>
            <span className="crm-top-search"><Search size={12} />Axtar… <kbd>⌘K</kbd></span>
            <span className="crm-chip crm-chip-blue"><LayoutGrid size={12} />Bütün tətbiqlər</span>
            <span className="crm-chip"><HelpCircle size={12} />Kömək</span>
            <span className="crm-user"><i>L</i>Leyla</span>
          </header>
          <div className="crm-body">
            <div className="crm-left">
              <span className="crm-date" ref={dateRef}>8 sentyabr, çərşənbə axşamı, 10:17</span>
              <h3><span ref={greetRef}>Sabahınız xeyir, Leyla!</span></h3>
              <p>Biznesin əsas siqnalları və növbəti addımlar bir iş icmalında.</p>
              <span className="crm-label">Da Vinci-dən soruşun</span>
              <div className="crm-ask"><Sparkles size={14} /><span>Məsələn: hansı sövdələr diqqət tələb edir?</span><i><Send size={13} /></i></div>
              <div className="crm-actions">
                <span className="crm-btn crm-btn-orange"><Plus size={13} />Yeni lid</span>
                <span className="crm-btn"><Handshake size={13} />Sövdələşmələr</span>
                <span className="crm-btn"><Kanban size={13} />Lövhələr</span>
                <span className="crm-btn"><FileText size={13} />Kommersiya təklifləri</span>
              </div>
            </div>
            <div className="crm-card">
              <div className="crm-card-head"><i><Bot size={16} /></i><div><small>DA VINCI · İŞ İCMALI</small><strong>Bu günün fokusu</strong></div></div>
              <ol>
                <li><span>01</span>Reaksiya tələb edən SLA pozuntuları: 66.</li>
                <li><span>02</span>Hazırda 63 aktiv lid üzərində iş gedir.</li>
                <li><span>03</span>Satış xəttində 28 sövdə var, cari konversiya 77%-dir.</li>
              </ol>
              <span className="crm-link">İcmalı Da Vinci ilə müzakirə et<ArrowRight size={14} /></span>
            </div>
          </div>
        </div>
        <span className="crm-fab" aria-hidden="true"><Grid2x2 size={14} /></span>
      </div>
      <figcaption>{CAPTION[lang]}</figcaption>
    </figure>
  );
}
