import { Home } from '../home';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata('az');
export default function Page() { return <Home initialLang="az" />; }
