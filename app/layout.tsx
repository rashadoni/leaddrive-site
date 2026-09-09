import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'LeadDrive — клиенты, продажи и AI в одной CRM',
  description: 'Клиентская база, сделки, общение, маркетинг и AI-помощники в одном рабочем пространстве LeadDrive.',
  robots: { index: false, follow: false },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body>{children}</body></html>;
}
