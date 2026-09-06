import type { Metadata } from 'next';
import '../globals.css';
export const metadata: Metadata = { metadataBase: new URL('https://leaddrivecrm.org'), applicationName: 'LeadDrive CRM', robots: { index: true, follow: true } };
export default function EnLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
