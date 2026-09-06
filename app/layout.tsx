import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'LeadDrive — управляйте продажами, делегируйте рутину AI',
  description: 'Обращения, сделки, звонки и задачи — в одной CRM. Узнайте, как LeadDrive помогает команде работать с клиентами.',
  robots: { index: false, follow: false },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body>{children}</body></html>;
}
