import { useState, useEffect } from 'react';

const PomodoroTimer = () => {
    // タイマーの残り時間を管理するstate
    const [timeLeft, setTimeLeft] = useState<number>(25 * 60);

    // タイマーが動いているかどうかを管理するstate
    const [isRunning, setIsRunning] = useState<boolean>(false);
    
    useEffect(() => {
        // intervalを保持する変数
        let interval: number | undefined;

        // もしタイマーが動いていて、かつ時間が残っている場合
        if (isRunning && timeLeft > 0) {
            // 1秒ごとにtimeLeftを処理をセットする
            interval = setInterval(() => {
                setTimeLeft((timeLeft: number) => timeLeft - 1);
            }, 1000);
        
        // 残り時間が0の場合 
        } else if (timeLeft === 0) {
            // タイマーを止めて、残り時間をリセットする
            clearInterval(interval);
            setTimeLeft(1 * 60);
            setIsRunning(false);
        }

        // クリーンアップ時にintervalをクリアする
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    
    }, [isRunning, timeLeft]);

    // 残り時間を分:秒の形式にフォーマットする関数
    const formatTime = (): string => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleStart = (): void => {
        setIsRunning(true);
    };

    const handleStop = (): void => {
        setIsRunning(false);
    };

    return (
        <div
            className="text-white p-8 rounded-lg flex flex-col items-center justify-center min-h-screen min-w-full"
            style={{ background: 'linear-gradient(to right, #ff6b6b, #c44569)' }}
        >
            <h1 className="text-4xl font-bold mb-4">Pomodoro Timer</h1>
            <div className="text-8xl mb-8">{formatTime()}</div>
            <div>
                <button
                    className="bg-white text-red-500 px-4 py-2 rounded-md mr-2"
                    onClick={handleStart}
                >
                    Start
                </button>
                <button
                    className="bg-white text-red-500 px-4 py-2 rounded-md"
                    onClick={handleStop}
                >
                    Stop
                </button>
            </div>
        </div>
    );
};

export default PomodoroTimer;