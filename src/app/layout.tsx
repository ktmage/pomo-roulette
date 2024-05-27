import './globals.css';
import { Navbar } from '@/components/modules';
import AppProvider from '@/providers/AppProvider/AppProvider';
import { GoogleAnalytics } from '@next/third-parties/google';

// export const metadata: Metadata = {
// 	title: 'Pomodoro Timer - Pomomate',
// 	description: 'Pomomate is a simple Pomodoro timer app',
// };

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID ?? ''} />
			<head>
				<meta
					name='description'
					content='Pomomate is a simple Pomodoro timer app'
				/>
				<title>Pomodoro Timer - Pomomate</title>
			</head>
			<body>
				<div
					id='root'
					className='flex flex-col min-h-screen min-w-screen  transition-all duration-500 bg-base-100'
				>
					<AppProvider>
						<Navbar />
						{children}
					</AppProvider>
				</div>
			</body>
		</html>
	);
}
