'use client';

import { TasksContext } from '@/providers';
import { useContext } from 'react';

export default function TasksPage() {
	const { tasks, newTask, setNewTask, addTask, deleteTask, updatePriority } =
		useContext(TasksContext);

	return (
		<div className='flex flex-col gap-4 py-16 items-center'>
			<h2 className='mb-8'>Tasks</h2>

			<div className='flex flex-col gap-4'>
				{tasks.map((task) => (
					<div
						key={task.id}
						className='flex gap-4 items-center w-80 justify-between'
					>
						<span>{task.name}</span>
						<div
							className='flex gap-2
                        items-center
                        justify-between
                    '
						>
							<input
								type='number'
								className='input input-bordered w-16'
								value={task.priority}
								onChange={(e) => updatePriority(task.id, parseInt(e.target.value))}
							/>
							<button
								className='btn btn-sm'
								onClick={() => deleteTask(task.id)}
							>
								Delete
							</button>
						</div>
					</div>
				))}
			</div>

			<div className='flex gap-4 mt-8'>
				<input
					type='text'
					className='input input-bordered'
					placeholder='New Task'
					value={newTask}
					onChange={(e) => setNewTask(e.target.value)}
				/>
				<button
					className='btn'
					onClick={addTask}
				>
					Add
				</button>
			</div>
		</div>
	);
}
