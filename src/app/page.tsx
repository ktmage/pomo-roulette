import { SettingsProvider } from '@/providers';
import App from '@/components/pages/App';

export default function RootPage() {
	return (
		<SettingsProvider>
			<App />
		</SettingsProvider>
	);
}
