import { SettingsProvider } from '../SettingsProvider/SettingsProvider';
import { TasksProvider } from '../TasksProvider/TasksProvider';
import { TimerProvider } from '../TimerProvider/TimerProvider';

interface AppProviderProps {
	children: React.ReactNode;
}

export default function AppProvider(props: AppProviderProps) {
	return (
		<SettingsProvider>
			<TasksProvider>
				<TimerProvider>{props.children}</TimerProvider>
			</TasksProvider>
		</SettingsProvider>
	);
}
