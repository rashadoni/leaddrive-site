import type { Metadata } from 'next';
import '../globals.css';
export const metadata: Metadata = { metadataBase: new URL('https://leaddrivecrm.org'), applicationName: 'LeadDrive CRM', robots: { index: true, follow: true } };
export default function RuLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body>{children}</body></html>;
}
