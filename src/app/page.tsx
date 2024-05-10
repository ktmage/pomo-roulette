'use client';

import { SettingsProvider } from '@/providers';
import App from '@/components/pages/App';

export default function RootPage() {
	return (
		<div>
			<SettingsProvider>
				<App />
			</SettingsProvider>
		</div>
	);
}
