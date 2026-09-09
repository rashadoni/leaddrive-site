'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, CheckCircle2, X } from 'lucide-react';
import type { Lang } from '@/lib/product-map';
import { DEMO_ENDPOINT, DEMO_FORM } from '@/lib/demo-form-copy';
import { langPrefix } from '@/lib/site-paths';

const WA = 'https://wa.me/994512060838';
type State = 'idle' | 'sending' | 'ok' | 'error';

/**
 * Global demo-request modal. Any link to wa.me (the "demo" CTAs) opens it instead; WhatsApp stays as the
 * secondary path inside. Submissions go straight into LeadDrive CRM through its public Web-to-Lead endpoint.
 */
export function DemoModal({ lang }: { lang: Lang }) {
  const c = DEMO_FORM[lang];
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<State>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const dialog = useRef<HTMLDialogElement>(null);
  const first = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="https://wa.me/"]');
      if (!a || a.hasAttribute('data-wa-direct')) return;
      e.preventDefault(); setState('idle'); setErrors({}); setOpen(true);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    const t = window.setTimeout(() => first.current?.focus(), 50);
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; window.clearTimeout(t); };
  }, [open]);

  async function submit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const v = (k: string) => { const x = f.get(k); return typeof x === 'string' ? x.trim() : ''; };
    const errs: Record<string, string> = {};
    if (!v('name')) errs.name = c.required;
    if (!v('phone')) errs.phone = c.required;
    if (!v('email')) errs.email = c.required; else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v('email'))) errs.email = c.badEmail;
    if (f.get('consent') !== 'on') errs.consent = c.consentRequired;
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setState('sending');
    const message = [v('message'), '', `— Dil / язык: ${lang}`, `— Səhifə: ${window.location.href}`, `— Razılıq / согласие: ${new Date().toISOString()}`].join('\n');
    try {
      const r = await fetch(DEMO_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: v('name'), email: v('email'), phone: v('phone'), company: v('company'), message, website: v('website'), source: 'web_form', org_slug: 'leaddrive' }) });
      setState(r.ok ? 'ok' : 'error');
    } catch { setState('error'); }
  }

  if (!open) return null;
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) setOpen(false); }}>
      <dialog className="modal" open aria-modal="true" aria-labelledby="demo-title" ref={dialog}>
        <button type="button" className="modal-close" aria-label={c.close} onClick={() => setOpen(false)}><X size={20} /></button>
        {state === 'ok' ? (
          <div className="modal-ok"><CheckCircle2 size={44} /><h2>{c.okTitle}</h2><p>{c.okText}</p><a className="cta" href={WA} target="_blank" rel="noopener" data-wa-direct>{c.whatsapp}<span><ArrowUpRight size={18} /></span></a></div>
        ) : (
          <form onSubmit={submit} noValidate>
            <h2 id="demo-title">{c.title}</h2>
            <p className="modal-sub">{c.sub}</p>
            <div className="modal-grid">
              <label className={errors.name ? 'is-err' : ''}><span>{c.name} *</span><input ref={first} name="name" autoComplete="name" />{errors.name && <em>{errors.name}</em>}</label>
              <label><span>{c.company}</span><input name="company" autoComplete="organization" /></label>
              <label className={errors.email ? 'is-err' : ''}><span>{c.email} *</span><input name="email" type="email" autoComplete="email" inputMode="email" />{errors.email && <em>{errors.email}</em>}</label>
              <label className={errors.phone ? 'is-err' : ''}><span>{c.phone} *</span><input name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="+994 …" />{errors.phone && <em>{errors.phone}</em>}</label>
              <label className="modal-full"><span>{c.message}</span><textarea name="message" rows={3} placeholder={c.messagePh} /></label>
              <input name="website" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />
            </div>
            <label className={`modal-consent-row ${errors.consent ? 'is-err' : ''}`}><input type="checkbox" name="consent" /><span>{c.consentLabel} <a href={`${langPrefix(lang)}/privacy`} target="_blank" rel="noopener">{c.consentLink}</a>. *</span>{errors.consent && <em>{errors.consent}</em>}</label>
            {state === 'error' && <p className="modal-err"><strong>{c.errTitle}</strong> {c.errText}</p>}
            <div className="modal-actions">
              <button type="submit" className="cta" disabled={state === 'sending'}>{state === 'sending' ? c.sending : c.submit}<span><ArrowUpRight size={18} /></span></button>
              <span className="modal-or">{c.or}</span>
              <a className="text-link" href={WA} target="_blank" rel="noopener" data-wa-direct>{c.whatsapp}<ArrowUpRight size={16} /></a>
            </div>
          </form>
        )}
      </dialog>
    </div>
  );
}
