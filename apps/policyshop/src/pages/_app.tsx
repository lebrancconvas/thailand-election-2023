import '@/styles/globals.css';
import '@thailand-election-2023/styles/dist/index.css';
import type { AppProps } from 'next/app';
import SafeHydrate from '../components/SafeHydrate';
import Metadata from '@/components/Metadata';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<SafeHydrate>
			<Metadata />
			<Component {...pageProps} />
		</SafeHydrate>
	);
}
