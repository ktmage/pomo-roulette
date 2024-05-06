import { createContext, ReactNode, useState } from 'react';

interface SettingsContextProps {
	isTaskMode: boolean;
	setIsTaskMode: (value: boolean) => void;
	isNoiseMode: boolean;
	setIsNoiseMode: (value: boolean) => void;
	isAutoStart: boolean;
	setIsAutoStart: (value: boolean) => void;
	isLongBreak: boolean;
	setIsLongBreak: (value: boolean) => void;
}

const SettingsContext = createContext<SettingsContextProps>({} as SettingsContextProps);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
	const [isTaskMode, setIsTaskMode] = useState(false);
	const [isNoiseMode, setIsNoiseMode] = useState(false);
	const [isAutoStart, setIsAutoStart] = useState(false);
	const [isLongBreak, setIsLongBreak] = useState(false);

	return (
		<SettingsContext.Provider
			value={{
				isTaskMode,
				setIsTaskMode,
				isNoiseMode,
				setIsNoiseMode,
				isAutoStart,
				setIsAutoStart,
				isLongBreak,
				setIsLongBreak,
			}}
		>
			{children}
		</SettingsContext.Provider>
	);
};
