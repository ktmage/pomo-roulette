'use client';
import useSound from 'use-sound';
import alertSfxUrl from '@/assets/alert.mp3';
import buttonSfxUrl from '@/assets/button.mp3';
import noiseSfxUrl from '@/assets/noise.mp3';
import { useContext, useEffect, useState, useCallback } from 'react';
import useLocalStorage from './useLocalStorage';
import { SettingsContext } from '@/providers/SettingsProvider';

interface useTimerProps {
	onTimeUp?: () => void;
	onStartTimer?: () => void;
	onStopTimer?: () => void;
	onResetTimer?: () => void;
	onStartLap?: () => void;
}

export default function useTimer(props?: useTimerProps) {
	const { isNoiseMode, isLongBreak } = useContext(SettingsContext);

	const WorkTime = 25 * 60;
	const BreakTime = 5 * 60;
	const LongBreakTime = 15 * 60;

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
			setLapCount((lap) => lap + 1);
			setIsWorking(true);
			setTimeLeft(WorkTime);
		}
	}, [isWorking, lapCount, isLongBreak, LongBreakTime, BreakTime, WorkTime, setLapCount]);

	const timeUp = useCallback(() => {
		props?.onTimeUp && props.onTimeUp();
		if (!isWorking) {
			setIsReady(true);
		}
		setIsRunning(false);
		playAlert();
		resetTimer();
		if (isNoiseMode) {
			stopNoiseSFX();
		}
	}, [isWorking, isNoiseMode, props, resetTimer, playAlert, stopNoiseSFX]);

	const startTimer = useCallback(() => {
		props?.onStartTimer && props.onStartTimer();
		setIsRunning(true);
		playButtonSFX();
		if (isWorking && isNoiseMode) {
			playNoiseSFX();
		}
	}, [isWorking, isNoiseMode, props, playButtonSFX, playNoiseSFX]);

	const stopTimer = useCallback(() => {
		props?.onStopTimer && props.onStopTimer();
		setIsRunning(false);
		playButtonSFX();
		if (isNoiseMode) {
			stopNoiseSFX();
		}
	}, [isNoiseMode, props, playButtonSFX, stopNoiseSFX]);

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
			props?.onStartLap && props.onStartLap();
			setIsReady(false);
			startTimer();
		} else {
			startTimer();
		}
	}, [isAlertPlaying, isRunning, isReady, startTimer, stopAlert, stopTimer, props]);

	return { formatTime, play, isRunning, isWorking, isAlertPlaying, lapCount };
}
