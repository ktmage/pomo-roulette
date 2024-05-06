import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/components/pages/App.tsx';
import './index.css';
import { SettingsProvider } from './providers';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<SettingsProvider>
			<App />
		</SettingsProvider>
	</React.StrictMode>,
);
