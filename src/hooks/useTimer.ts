import useSound from 'use-sound';
import alertSfxUrl from '@/assets/alert.mp3';
import buttonSfxUrl from '@/assets/button.mp3';
import { useEffect, useState } from 'react';
import useLocalStorage from './useLocalStorage';

interface useTimerProps {
	onTimeUp?: () => void;
	onStartTimer?: () => void;
	onStopTimer?: () => void;
	onResetTimer?: () => void;
	onStartLap?: () => void;
}

export default function useTimer(props?: useTimerProps) {
	// 作業時間と休憩時間を定義
	const WorkTime = 25 * 60;
	const BreakTime = 5 * 60;
	// const WorkTime = 2;
	// const BreakTime = 1;

	const [lapCount, setLapCount] = useLocalStorage({ key: 'lapCount', initialValue: 0 });
	const [timeLeft, setTimeLeft] = useState(WorkTime);
	const [isRunning, setIsRunning] = useState(false);
	const [isWorking, setIsWorking] = useState(true);
	const [isAlertPlaying, setIsAlertPlaying] = useState(false);
	const [isReady, setIsReady] = useState(true);
	const [playAlertSFX, { stop: stopAlertSFX }] = useSound(alertSfxUrl, { loop: true });
	const [playButtonSFX] = useSound(buttonSfxUrl);

	useEffect(() => {
		let interval_id: number | undefined;

		// タイマーが動いているかどうか、かつ時間が残っている場合
		if (isRunning && timeLeft > 0) {
			interval_id = setInterval(() => {
				setTimeLeft((timeLeft) => timeLeft - 1);
			}, 1000);
		}

		// 残り時間が0秒以下の場合
		else if (timeLeft <= 0) {
			setIsRunning(false);
			timeUp();
		}

		return () => {
			clearInterval(interval_id);
		};
	}, [isRunning, timeLeft]);

	// タイマーが0になった時の処理
	function timeUp() {
		props?.onTimeUp && props.onTimeUp();
		// 休憩時間が終わったらReady状態にする
		if (!isWorking) {
			setIsReady(true);
		}
		setIsRunning(false);
		playAlert();
		resetTimer();
	}

	// タイマーをスタートする関数
	function startTimer() {
		props?.onStartTimer && props.onStartTimer();
		setIsRunning(true);
		playButtonSFX();
	}

	// タイマーをストップする関数
	function stopTimer() {
		props?.onStopTimer && props.onStopTimer();
		setIsRunning(false);
		playButtonSFX();
	}

	// タイマーをリセットする関数
	const formatTime = (): string => {
		const minutes = Math.floor(timeLeft / 60);
		const seconds = timeLeft % 60;
		return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
	};

	const playAlert = () => {
		setIsAlertPlaying(true);
		playAlertSFX();
	};

	const stopAlert = () => {
		setIsAlertPlaying(false);
		stopAlertSFX();
	};

	const resetTimer = () => {
		if (isWorking) {
			setIsWorking(false);
			setTimeLeft(BreakTime);
		} else {
			setLapCount((lap) => lap + 1);
			setIsWorking(true);
			setTimeLeft(WorkTime);
		}
	};

	function play() {
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
	}

	return { formatTime, play, isRunning, isWorking, isAlertPlaying, lapCount };
}
