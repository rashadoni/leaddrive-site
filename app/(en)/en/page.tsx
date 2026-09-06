import { Home } from '../../home';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata('en');
export default function Page() { return <Home initialLang="en" />; }
