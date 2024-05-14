'use client';

import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { SettingsContext } from '../SettingsProvider';
import { useLocalStorage } from '@/hooks';
import useSound from 'node_modules/use-sound/dist';
import alertSfxUrl from '@/assets/alert.mp3';
import buttonSfxUrl from '@/assets/button.mp3';
import noiseSfxUrl from '@/assets/noise.mp3';
import { TaskContext } from '../TaskProvider';

interface TimerContextProps {
	formatTime: () => string;
	play: () => void;
	isRunning: boolean;
	isAlertPlaying: boolean;
	isWorking?: boolean;
}

export const TimerContext = createContext<TimerContextProps>({} as TimerContextProps);

export const TimerProvider = ({ children }: { children: ReactNode }) => {
	const { isNoiseMode, isLongBreak } = useContext(SettingsContext);
	const { drawTask } = useContext(TaskContext);

	// const WorkTime = 25 * 60;
	// const BreakTime = 5 * 60;
	// const LongBreakTime = 15 * 60;

	const WorkTime = 5;
	const BreakTime = 3;
	const LongBreakTime = 2;

	const [lapCount, setLapCount] = useLocalStorage({
		key: 'lapCount',
		initialValue: 0,
	});
	const [timeLeft, setTimeLeft] = useState(WorkTime);
	const [isRunning, setIsRunning] = useState(false);
	const [isWorking, setIsWorking] = useState(true);
	const [isAlertPlaying, setIsAlertPlaying] = useState(false);
	const [isReady, setIsReady] = useState(true);

	const [playAlertSFX, { stop: stopAlertSFX }] = useSound(alertSfxUrl, {
		loop: true,
	});
	const [playButtonSFX] = useSound(buttonSfxUrl);
	const [playNoiseSFX, { stop: stopNoiseSFX }] = useSound(noiseSfxUrl, {
		loop: true,
	});

	const playAlert = useCallback(() => {
		setIsAlertPlaying(true);
		playAlertSFX();
	}, [playAlertSFX]);

	const stopAlert = useCallback(() => {
		setIsAlertPlaying(false);
		stopAlertSFX();
	}, [stopAlertSFX]);

	const resetTimer = useCallback(() => {
		if (isWorking) {
			setIsWorking(false);
			if (isLongBreak && lapCount % 3 === 0) {
				setTimeLeft(LongBreakTime);
			} else {
				setTimeLeft(BreakTime);
			}
		} else {
			setLapCount(lapCount + 1);
			setIsWorking(true);
			setTimeLeft(WorkTime);
		}
	}, [isWorking, lapCount, isLongBreak, LongBreakTime, BreakTime, WorkTime, setLapCount]);

	const timeUp = useCallback(() => {
		if (!isWorking) {
			setIsReady(true);
		}
		setIsRunning(false);
		playAlert();
		resetTimer();
		if (isNoiseMode) {
			stopNoiseSFX();
		}
	}, [isWorking, isNoiseMode, resetTimer, playAlert, stopNoiseSFX]);

	const startTimer = useCallback(() => {
		setIsRunning(true);
		playButtonSFX();
		if (isWorking && isNoiseMode) {
			playNoiseSFX();
		}
	}, [isWorking, isNoiseMode, playButtonSFX, playNoiseSFX]);

	const stopTimer = useCallback(() => {
		setIsRunning(false);
		playButtonSFX();
		if (isNoiseMode) {
			stopNoiseSFX();
		}
	}, [isNoiseMode, playButtonSFX, stopNoiseSFX]);

	const formatTime = useCallback((): string => {
		const minutes = Math.floor(timeLeft / 60);
		const seconds = timeLeft % 60;
		return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
	}, [timeLeft]);

	useEffect(() => {
		let intervalId: number | NodeJS.Timeout | undefined;

		if (isRunning && timeLeft > 0) {
			intervalId = setInterval(() => {
				setTimeLeft((timeLeft) => timeLeft - 1);
			}, 1000);
		} else if (timeLeft <= 0) {
			setIsRunning(false);
			timeUp();
		}

		return () => {
			clearInterval(intervalId);
		};
	}, [isRunning, timeLeft, timeUp]);

	const play = useCallback(() => {
		if (isAlertPlaying) {
			stopAlert();
		} else if (isRunning) {
			stopTimer();
		} else if (isReady) {
			drawTask();
			setIsReady(false);
			startTimer();
		} else {
			startTimer();
		}
	}, [isAlertPlaying, isRunning, isReady, startTimer, stopAlert, stopTimer, drawTask]);

	return (
		<TimerContext.Provider
			value={{
				formatTime,
				play,
				isRunning,
				isAlertPlaying,
				isWorking,
			}}
		>
			{children}
		</TimerContext.Provider>
	);
};
