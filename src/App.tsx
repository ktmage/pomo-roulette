import { useState, useEffect } from 'react';
import buttonSfxUrl from './assets/button.mp3';
import alertSfxUrl from './assets/alert.mp3';
import useSound from 'use-sound';
import { QuestionIcon, TaskIcon } from './components/icons';

const PomodoroTimer = () => {
	interface Task {
		id: number;
		name: string;
		priority: number;
	}

	const [tasks, setTasks] = useState<Task[]>([]);

	const [playButtonSFX] = useSound(buttonSfxUrl);
	const [playAlertSFX, { stop: stopAlertSFX }] = useSound(alertSfxUrl, { loop: true });

	// const WorkTime = 25 * 60;
	const WorkTime = 0.05 * 60;
	// const BreakTime = 5 * 60;
	const BreakTime = 0.05 * 60;

	// タイマーの残り時間を管理するstate
	const [timeLeft, setTimeLeft] = useState<number>(WorkTime);

	// タイマーが動いているかどうかを管理するstate
	const [isRunning, setIsRunning] = useState<boolean>(false);

	// アラート音が再生中かどうかを管理するstate
	const [isAlertPlaying, setIsAlertPlaying] = useState<boolean>(false);

	// 作業中かどうかを管理するstate
	const [isWorking, setIsWorking] = useState<boolean>(true);

	// タスクの追加用のstate
	const [newTask, setNewTask] = useState<string>('');

	// 現在のタスク
	const [currentTask, setCurrentTask] = useState<Task | null>(null);

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
			console.log('timeLeft === 0');

			// アラート音を再生する
			setIsAlertPlaying(true);
			playAlertSFX();

			// インターバルをクリアして、タイマーを止める。
			clearInterval(interval_id);
			setIsRunning(false);

			// 一個前の状態によって次の時間をセットする
			if (isWorking) {
				setTimeLeft(BreakTime);
			} else {
				// 次のタスクをランダムで選択する
				// const nextTask = tasks[Math.floor(Math.random() * tasks.length)];
				const nextTask = getNewTask();
				setCurrentTask(nextTask);

				setTimeLeft(WorkTime);
			}

			// 作業中かどうかをトグルする
			setIsWorking((isWorking) => !isWorking);
		}

		// クリーンアップ時にintervalをクリアする
		return () => {
			if (interval_id) {
				clearInterval(interval_id);
			}
		};
	}, [isRunning, timeLeft]);

	const getNewTask = (): Task => {
		// すべてのタスクからランダムで一つを選択する。しかし、priorityで重みづけを行う。
		const totalPriority = tasks.reduce((acc, task) => acc + task.priority, 0);
		const random = Math.random() * totalPriority;
		let sum = 0;
		for (let i = 0; i < tasks.length; i++) {
			sum += tasks[i].priority;
			if (random < sum) {
				return tasks[i];
			}
		}
		return tasks[0];
	};

	// 残り時間を分:秒の形式にフォーマットする関数
	const formatTime = (): string => {
		const minutes = Math.floor(timeLeft / 60);
		const seconds = timeLeft % 60;
		return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
	};

	const startTimer = (): void => {
		playButtonSFX();
		setIsRunning(true);
	};

	const stopTimer = (): void => {
		playButtonSFX();
		setIsRunning(false);
	};

	const stopAlert = (): void => {
		playButtonSFX();
		stopAlertSFX();
		setIsAlertPlaying(false);
	};

	const handleButtonClick = (): void => {
		if (isAlertPlaying) {
			stopAlert();
		} else if (isRunning) {
			stopTimer();
		} else {
			startTimer();
		}
	};

	const handleValueChange = (index: number, value: string) => {
		const newTasks = tasks.map((task, i) => {
			if (i === index) {
				return { ...task, priority: Number(value) };
			}
			return task;
		});
		setTasks(newTasks);
	};

	// ${isWorking ? 'bg-gradient-to-r from-slate-900 to-slate-700' : 'bg-gradient-to-b from-neutral-300 to-stone-400'}`}
	return (
		<div
			className={`text-white p-8 rounded-lg flex flex-col items-center justify-center min-h-screen min-w-screen transition-all duration-500 
        ${isWorking ? 'bg-gradient-to-r from-red-500 to-orange-500' : 'bg-gradient-to-r from-emerald-400 to-cyan-400'}`}
		>
			<div className='absolute top-4 right-4 space-x-4'>
				<label
					htmlFor='my-drawer'
					className='btn btn-circle drawer-button'
				>
					<TaskIcon fontSize={24} />
				</label>
				<button
					className='btn btn-circle'
					onClick={() => {
						playButtonSFX();
						const modal = document.querySelector('.modal') as HTMLDialogElement;
						modal.showModal();
					}}
				>
					<QuestionIcon fontSize={24} />
				</button>
			</div>

			<div className='drawer z-10'>
				<input
					id='my-drawer'
					type='checkbox'
					className='drawer-toggle'
				/>
				<div className='drawer-side'>
					<label
						htmlFor='my-drawer'
						aria-label='close sidebar'
						className='drawer-overlay'
					></label>
					<ul className='menu p-4 w-80 min-h-full bg-base-200 text-base-content'>
						{/* Sidebar content here */}
						{/* Sidebar content here */}
						{tasks.map((task, index) => (
							<div key={index}>
								<div
									className='
                                bg-base-300 p-2 rounded-md
                                transition-all duration-500 hover:bg-base-400
                                '
								>
									<div className='flex justify-between items-center h-8'>
										<li className='font-bold'>{task.name}</li>
										<button
											className='btn btn-circle btn-xs'
											onClick={() => {
												setTasks(tasks.filter((t) => t.id !== task.id));
											}}
										>
											×
										</button>
									</div>
									<input
										type='range'
										min={1}
										max='5'
										value={task.priority}
										onChange={(e) => handleValueChange(index, e.target.value)}
										className='range range-xs'
									/>
								</div>
								<div className='divider'></div>
							</div>
						))}
						{/* Task creation form */}
						<li>
							<input
								type='text'
								className='input input-primary mt-4'
								placeholder='New task'
								value={newTask}
								onChange={(e) => setNewTask(e.target.value)}
							/>
							<button
								className='btn btn-primary mt-4'
								onClick={() => {
									setTasks([
										...tasks,
										{ id: tasks.length, name: newTask, priority: 1 },
									]);
									setNewTask('');
								}}
							>
								Add Task
							</button>
						</li>
					</ul>
				</div>
			</div>

			<dialog className='modal'>
				<div className='modal-box'>
					<div className='form-control'>
						<label className='label'>
							<span className='label-text'>Work Time</span>
						</label>
						<input
							type='number'
							className='input input-primary'
							value={WorkTime}
							onChange={(e) => {
								setTimeLeft(Number(e.target.value));
							}}
						/>
					</div>
				</div>
				<form
					method='dialog'
					className='modal-backdrop'
				>
					<button>close</button>
				</form>
			</dialog>

			<div className='flex flex-col items-center justify-between min-h-80 space-y-10'>
				<h1 className='text-4xl'>{currentTask ? currentTask.name : 'POMO-ROULETTE'}</h1>
				<div className=' text-9xl'>{formatTime()}</div>
				<div className='space-x-8'>
					<button
						className='btn btn-neutral px-6 py-2 '
						onClick={handleButtonClick}
					>
						{isAlertPlaying ? 'Stop Alert' : isRunning ? 'Stop' : 'Start'}
					</button>
				</div>
			</div>
		</div>
	);
};

export default PomodoroTimer;
