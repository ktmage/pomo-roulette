import { TaskIcon } from '@/utils/icons';
import { useState } from 'react';

export default function TutorialButton() {
	interface Task {
		id: number;
		name: string;
		priority: number;
	}

	const [tasks, setTasks] = useState<Task[]>([]);
	const [newTask, setNewTask] = useState<string>('');

	const handleValueChange = (index: number, value: string) => {
		const newTasks = tasks.map((task, i) => {
			if (i === index) {
				return { ...task, priority: Number(value) };
			}
			return task;
		});
		setTasks(newTasks);
	};

	return (
		<>
			<label
				htmlFor='my-drawer'
				className='btn btn-circle drawer-button'
			>
				<TaskIcon fontSize={24} />
			</label>

			<div className='drawer z-10 hidden'>
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
		</>
	);
}
