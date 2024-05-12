'use client';

import { useLocalStorage } from '@/hooks';
import { createContext, ReactNode } from 'react';

interface SettingsContextProps {
	isTaskMode: boolean;
	setIsTaskMode: (value: boolean) => void;
	isNoiseMode: boolean;
	setIsNoiseMode: (value: boolean) => void;
	isLongBreak: boolean;
	setIsLongBreak: (value: boolean) => void;
}

export const SettingsContext = createContext<SettingsContextProps>({} as SettingsContextProps);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
	const [isTaskMode, setIsTaskMode] = useLocalStorage({ key: 'isTaskMode', initialValue: false });
	const [isNoiseMode, setIsNoiseMode] = useLocalStorage({
		key: 'isNoiseMode',
		initialValue: false,
	});
	const [isLongBreak, setIsLongBreak] = useLocalStorage({
		key: 'isLongBreak',
		initialValue: false,
	});

	return (
		<SettingsContext.Provider
			value={{
				isTaskMode,
				setIsTaskMode,
				isNoiseMode,
				setIsNoiseMode,
				isLongBreak,
				setIsLongBreak,
			}}
		>
			{children}
		</SettingsContext.Provider>
	);
};
