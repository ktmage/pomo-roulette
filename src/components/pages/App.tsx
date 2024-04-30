import { useTask, useTimer } from '@/hooks';
import { QuestionIcon, TaskIcon } from '../../utils/icons';

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
	const { formatTime, handleClicked, isRunning, isWorking, isAlertPlaying } = useTimer({
		onTimerStart() {
			if (isWorking) {
				drawTask();
			}
		},
	});

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
												// setTasks(tasks.filter((t) => t.id !== task.id));
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
										onChange={(e) =>
											updatePriority(index, Number(e.target.value))
										}
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
								onClick={addTask}
							>
								Add Task
							</button>
						</li>
					</ul>
				</div>
			</div>

			<dialog className='modal'>
				<div className='modal-box'>
					<div className='form-control'></div>
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
						onClick={handleClicked}
					>
						{isAlertPlaying ? 'Stop Alert' : isRunning ? 'Stop' : 'Start'}
					</button>
				</div>
			</div>
		</div>
	);
};

export default App;
