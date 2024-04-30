import { useState } from 'react';

// type Priority = 1 | 2 | 3 | 4 | 5;

interface Task {
	id: number;
	name: string;
	priority: number;
}

export default function useTask() {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [newTask, setNewTask] = useState<string>('');
	const [currentTask, setCurrentTask] = useState<Task | null>(null);

	// タスクを抽選して、currentTaskにセットする関数
	function drawTask() {
		const totalPriority = tasks.reduce((acc, task) => acc + task.priority, 0);
		const random = Math.random() * totalPriority;
		let sum = 0;
		for (let i = 0; i < tasks.length; i++) {
			sum += tasks[i].priority;
			if (random < sum) {
				setCurrentTask(tasks[i]);
				return;
			}
		}
		setCurrentTask(tasks[0]);
	}

	function addTask() {
		const newTaskObj: Task = {
			id: tasks.length,
			name: newTask,
			priority: 1,
		};
		setTasks([...tasks, newTaskObj]);
		setNewTask('');
	}

	function deleteTask(id: number) {
		setTasks(tasks.filter((task) => task.id !== id));
	}

	function updatePriority(id: number, priority: number) {
		const newTasks = tasks.map((task) => {
			if (task.id === id) {
				return { ...task, priority };
			}
			return task;
		});
		setTasks(newTasks);
	}

	return {
		drawTask,
		addTask,
		deleteTask,
		updatePriority,
		tasks,
		newTask,
		setNewTask,
		currentTask,
	};
}
