'use client';
import { useContext } from 'react';
import { SettingsContext, TasksContext, TimerContext } from '@/providers';

export default function AppPage() {
	const { currentTask } = useContext(TasksContext);
	const { formatTime, play, isRunning, isAlertPlaying } = useContext(TimerContext);
	const { isTaskMode } = useContext(SettingsContext);

	return (
		<div className={`flex flex-grow justify-center items-center`}>
			<div
				className={`flex flex-col justify-center items-center ${isTaskMode ? 'gap-10' : 'gap-16'}`}
			>
				<p className={`text-4xl ${isTaskMode ? 'block' : 'hidden'}`}>
					{currentTask ? currentTask.name : 'No task available'}
				</p>
				<p className='text-9xl text-base-content'>{formatTime()}</p>
				<button
					className='btn px-6 py-2'
					onClick={play}
				>
					{isAlertPlaying ? 'Stop Alert' : isRunning ? 'Stop' : 'Start'}
				</button>
			</div>
		</div>
	);
}
