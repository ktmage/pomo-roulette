import { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/modules';
import AppProvider from '@/providers/AppProvider/AppProvider';
import { Background } from '@/components/modules';

export const metadata: Metadata = {
	title: 'Pomodoro Timer - Pomomate',
	description: 'Pomomate is a simple Pomodoro timer app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body>
				<AppProvider>
					<div id='root'>
						<Background>
							<Navbar title='Pomomate' />
							{children}
						</Background>
					</div>
				</AppProvider>
			</body>
		</html>
	);
}
