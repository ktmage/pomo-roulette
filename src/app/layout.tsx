import { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
	title: 'Pomomate',
	description: 'Pomomate is a simple Pomodoro timer app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body>
				<div id='root'>{children}</div>
			</body>
		</html>
	);
}
