import type { Metadata } from 'next';
import '../globals.css';
export const metadata: Metadata = { metadataBase: new URL('https://leaddrivecrm.org'), applicationName: 'LeadDrive CRM', robots: { index: true, follow: true }, verification: { other: { 'msvalidate.01': '90CA6566E60DFB66F31A32E9CAE89227', 'facebook-domain-verification': 'miq59ri5qoifagmf9wn3pa24cseh8s' } } };
export default function EnLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
