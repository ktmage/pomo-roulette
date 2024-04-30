import useSound from 'use-sound';
import alertSfxUrl from '@/assets/alert.mp3';
import buttonSfxUrl from '@/assets/button.mp3';
import { useEffect, useState } from 'react';

interface useTimerProps {
	onTimeUp?: () => void;
	onTimerStart?: () => void;
	onTimerStop?: () => void;
}

export default function useTimer(props?: useTimerProps) {
	// // 作業時間と休憩時間を定義
	const WorkTime = 25 * 60;
	const BreakTime = 5 * 60;

	const [rap, setRap] = useState(0);
	const [timeLeft, setTimeLeft] = useState(WorkTime);
	const [isRunning, setIsRunning] = useState(false);
	const [isWorking, setIsWorking] = useState(true);
	const [isAlertPlaying, setIsAlertPlaying] = useState(false);
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
			onTimeUp();
		}

		return () => {
			clearInterval(interval_id);
		};
	}, [isRunning, timeLeft]);

	// タイマーが0になった時の処理
	function onTimeUp() {
		props?.onTimeUp && props.onTimeUp();
		onTimerStop();
		playAlert();
		if (isWorking) {
			setIsWorking(false);
			setTimeLeft(BreakTime);
		} else {
			setRap((rap) => rap + 1);
			setIsWorking(true);
			setTimeLeft(WorkTime);
		}
	}

	// タイマーをスタートする関数
	function onTimerStart() {
		props?.onTimerStart && props.onTimerStart();
		setIsRunning(true);
		playButtonSFX();
	}

	// タイマーをストップする関数
	function onTimerStop() {
		props?.onTimerStop && props.onTimerStop();
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

	function handleClicked() {
		if (isAlertPlaying) {
			stopAlert();
		} else if (isRunning) {
			onTimerStop();
		} else {
			onTimerStart();
		}
	}

	return { formatTime, handleClicked, isRunning, isWorking, isAlertPlaying, rap };
}
