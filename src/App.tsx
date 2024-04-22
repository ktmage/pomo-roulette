import { useState, useEffect } from 'react';

const PomodoroTimer = () => {
    // const WorkTime = 25 * 60;
    const WorkTime = 0.05 * 60;
    // const BreakTime = 5 * 60;
    const BreakTime = 0.05 * 60;

    // タイマーの残り時間を管理するstate
    const [timeLeft, setTimeLeft] = useState<number>(WorkTime);

    // タイマーが動いているかどうかを管理するstate
    const [isRunning, setIsRunning] = useState<boolean>(false);

    // 作業中かどうかを管理するstate
    const [isWorking, setIsWorking] = useState<boolean>(true);
    
    useEffect(() => {
        // intervalのIDを保持する変数
        let interval_id: number | undefined;

        // もしタイマーが動いていて、かつ時間が残っている場合
        if (isRunning && timeLeft > 0) {
            // 1秒ごとにtimeLeftを処理をセットする
            interval_id = setInterval(() => {
                setTimeLeft((timeLeft: number) => timeLeft - 1);
            }, 1000);
        
        // 残り時間が0の場合 
        } else if (timeLeft === 0) {
            // タイマーを止めて、残り時間をリセットする
            clearInterval(interval_id);
            setIsRunning(false);
            if (isWorking) {
                setTimeLeft(BreakTime);
            }
            else {
                setTimeLeft(WorkTime);
            }
            setIsWorking((isWorking) => !isWorking);
        }

        // クリーンアップ時にintervalをクリアする
        return () => {
            if (interval_id) {
                clearInterval(interval_id);
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
            className={`text-white p-8 rounded-lg flex flex-col items-center justify-center min-h-screen min-w-full transition-all duration-500 ${isWorking ? 'bg-gradient-to-r from-red-500 to-orange-500' : 'bg-gradient-to-r from-emerald-400 to-cyan-400'}`}
            // style={{ background: 'linear-gradient(to right, #ff6b6b, #c44569)' }}
        >
            <div className='flex flex-col items-center justify-center backdrop-blur-sm bg-white/30 px-24 py-14 rounded-md'>
                <h1 className="text-4xl font-bold mb-4">Pomodoro Timer</h1>
                <div className="text-8xl mb-8">{formatTime()}</div>
                <div className='space-x-8'>
                    <button
                        className="bg-white text-red-500 px-6 py-2 rounded-md mr-2"
                        onClick={handleStart}
                    >
                        Start
                    </button>
                    <button
                        className="bg-white text-red-500 px-6 py-2 rounded-md"
                        onClick={handleStop}
                    >
                        Stop
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PomodoroTimer;