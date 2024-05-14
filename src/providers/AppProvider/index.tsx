import { SettingsProvider } from '../SettingsProvider';
import { TaskProvider } from '../TaskProvider';
import { TimerProvider } from '../TimerProvider';

interface AppProviderProps {
	children: React.ReactNode;
}

export default function AppProvider(props: AppProviderProps) {
	return (
		<SettingsProvider>
			<TaskProvider>
				<TimerProvider>{props.children}</TimerProvider>
			</TaskProvider>
		</SettingsProvider>
	);
}
