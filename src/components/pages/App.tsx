import { useTask, useTimer } from '@/hooks';
import { QuestionIcon, TaskIcon } from '../../utils/icons';
import { Background } from '../atoms';

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

	return (
		<div className='drawer'>
			<input
				id='my-drawer'
				type='checkbox'
				className='drawer-toggle'
			/>
			<div className='drawer-content'>
				<Background flag={isWorking}>
					{/* ${isWorking ? 'bg-gradient-to-r from-red-500 to-orange-500' : 'bg-gradient-to-r from-emerald-400 to-cyan-400'}`} */}
					<div
						className={`text-white p-8 rounded-lg flex flex-col items-center justify-center min-h-screen min-w-screen transition-all duration-500 `}
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
									const modal = document.querySelector(
										'.modal',
									) as HTMLDialogElement;
									modal.showModal();
								}}
							>
								<QuestionIcon fontSize={24} />
							</button>
						</div>

						<div className='flex flex-col items-center justify-between min-h-80 space-y-10'>
							<h1 className='text-4xl'>
								{currentTask ? currentTask.name : 'POMOTTE'}
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
			</div>
			<dialog className='modal'>
				<div className='modal-box'>
					<h1>How to use</h1>
					<hr />
					<br />
					<p>
						1. If you want to use the task options, add tasks from the button in the
						upper right.
					</p>
					<br />
					<p>
						2. By setting the priority, you can adjust the lottery degree of the task.
					</p>
					<br />
					<p>3. Start the timer.</p>
				</div>
				<form
					method='dialog'
					className='modal-backdrop'
				>
					<button>close</button>
				</form>
			</dialog>
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
										×
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
