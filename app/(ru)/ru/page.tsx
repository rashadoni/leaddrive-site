import { Home } from '../../home';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata('ru');
export default function Page() { return <Home initialLang="ru" />; }
