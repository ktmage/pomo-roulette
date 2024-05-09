import { useTask, useTimer } from '@/hooks';
import { CloseIcon, QuestionIcon, SettingsIcon, TaskIcon } from '../../utils/icons';
import { Background } from '../atoms';
import { Instructions, Settings } from '../modules';
import { useContext } from 'react';
import { SettingsContext } from '@/providers/SettingsProvider';

const App = () => {
	const {
		drawTask,
		addTask,
		deleteTask,
		updatePriority,
		tasks,
		newTask,
		setNewTask,
		currentTask,
	} = useTask();
	const { formatTime, play, isRunning, isWorking, isAlertPlaying } = useTimer({
		onStartLap: () => {
			drawTask();
		},
	});

	const { isTaskMode } = useContext(SettingsContext);

	return (
		<div className='drawer'>
			<input
				id='my-drawer'
				type='checkbox'
				className='drawer-toggle'
			/>

			{/* 本体 */}
			<div className='drawer-content'>
				{/* メイン画面 */}
				<Background flag={isWorking}>
					<div
						className={`text-white p-8 rounded-lg flex flex-col items-center justify-center min-h-screen min-w-screen transition-all duration-500`}
					>
						<div className='absolute top-4 right-4 space-x-4'>
							<button
								className='btn btn-circle'
								onClick={() => {
									const modal = document.getElementById(
										'instruction-modal',
									) as HTMLDialogElement;
									modal.showModal();
								}}
							>
								<QuestionIcon fontSize={24} />
							</button>
							<label
								htmlFor='my-drawer'
								className='btn btn-circle drawer-button'
							>
								<TaskIcon fontSize={24} />
							</label>
							<button
								className='btn btn-circle'
								onClick={() => {
									const modal = document.getElementById(
										'settings-modal',
									) as HTMLDialogElement;
									modal.showModal();
								}}
							>
								<SettingsIcon fontSize={24} />
							</button>
						</div>

						{/* <div className='flex flex-col items-center justify-between min-h-80 space-y-10'> */}
						<div
							className={`flex flex-col items-center justify-between space-y-10 ${isTaskMode ? 'min-h-80' : 'min-h-72'}`}
						>
							<h1 className={`text-4xl ${isTaskMode ? 'block' : 'hidden'}`}>
								{currentTask ? currentTask.name : 'No task available'}
							</h1>
							<div className=' text-9xl'>{formatTime()}</div>
							<div className='space-x-8'>
								<button
									className='btn btn-neutral px-6 py-2 '
									onClick={play}
								>
									{isAlertPlaying ? 'Stop Alert' : isRunning ? 'Stop' : 'Start'}
								</button>
							</div>
						</div>
					</div>
				</Background>

				{/* モーダルで表示する画面 */}
				<dialog
					className='modal'
					id='instruction-modal'
				>
					<div className='modal-box'>
						<Instructions />
					</div>
					<form
						method='dialog'
						className='modal-backdrop'
					>
						<button />
					</form>
				</dialog>
				<dialog
					className='modal'
					id='settings-modal'
				>
					<div className='modal-box'>
						<Settings />
					</div>
					<form
						method='dialog'
						className='modal-backdrop'
					>
						<button />
					</form>
				</dialog>
			</div>

			{/* ドロワーのメイン画面 */}
			<div className='drawer-side'>
				<label
					htmlFor='my-drawer'
					aria-label='close sidebar'
					className='drawer-overlay'
				></label>
				<ul className='menu p-4 w-80 min-h-full bg-base-200 text-base-content'>
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
											deleteTask(task.id);
										}}
									>
										<CloseIcon fontSize={12} />
									</button>
								</div>
								<input
									type='range'
									min={1}
									max='5'
									value={task.priority}
									onChange={(e) => updatePriority(index, Number(e.target.value))}
									className='range range-xs'
								/>
							</div>
							<div className='divider'></div>
						</div>
					))}
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
							onClick={addTask}
						>
							Add Task
						</button>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default App;
