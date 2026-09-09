import type { Metadata } from 'next';
import '../globals.css';
export const metadata: Metadata = { metadataBase: new URL('https://leaddrivecrm.org'), applicationName: 'LeadDrive CRM', robots: { index: true, follow: true }, verification: { other: { 'msvalidate.01': '90CA6566E60DFB66F31A32E9CAE89227' } } };
export default function RuLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body>{children}</body></html>;
}
