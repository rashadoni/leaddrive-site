import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  metadataBase: new URL('https://leaddrivecrm.org'),
  title: { default: 'LeadDrive CRM', template: '%s' },
  applicationName: 'LeadDrive CRM',
  robots: { index: true, follow: true },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="az"><body>{children}</body></html>;
}
