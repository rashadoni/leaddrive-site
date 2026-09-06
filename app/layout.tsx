import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'LeadDrive — müştərilər, satışlar və AI bir CRM-də',
  description: 'Müştəri bazası, sövdələşmələr, ünsiyyət, marketinq və AI köməkçiləri LeadDrive-ın bir iş məkanında.',
  robots: { index: false, follow: false },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="az"><body>{children}</body></html>;
}
